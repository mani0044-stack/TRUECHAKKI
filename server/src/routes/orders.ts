import { Router, Request, Response } from 'express';
import { query, getClient } from '../db/index.js';

export const orderRouter = Router();

function formatAddress(address: any): Record<string, string> | string {
  if (!address) return '';
  if (typeof address === 'object') return address;
  // Attempt to parse a stored "street, city, state - zip" string
  const match = String(address).match(/(.*?),\s*(.*?),\s*(.*?)\s*-\s*(\d+)/);
  if (match) {
    return { street: match[1], city: match[2], state: match[3], zipCode: match[4] };
  }
  return { street: String(address) };
}

function buildAddressString(address: any): string {
  if (typeof address === 'string') return address;
  if (address && typeof address === 'object') {
    return [address.street, address.city, address.state, address.zipCode].filter(Boolean).join(', ');
  }
  return '';
}

function storedAddressToFrontend(storeAddress: any): Record<string, string> | string {
  // If the raw stored value was a JSON object (from POST), parse it back
  if (typeof storeAddress === 'string' && storeAddress.startsWith('{')) {
    try {
      return JSON.parse(storeAddress);
    } catch {
      // fall through to string formatting
    }
  }
  return formatAddress(storeAddress);
}

// POST /api/orders - Create new customer order with SQL Transaction
orderRouter.post('/', async (req: Request, res: Response) => {
  const client = await getClient();
  try {
    const {
      userId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      totalAmount,
      paymentMethod,
      items,
    } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    const orderNumber = `TC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedAddress =
      typeof shippingAddress === 'object' && shippingAddress !== null
        ? JSON.stringify({
            street: shippingAddress.street || '',
            city: shippingAddress.city || '',
            state: shippingAddress.state || '',
            zipCode: shippingAddress.zipCode || '',
            country: shippingAddress.country || 'India',
          })
        : buildAddressString(shippingAddress);

    await client.query('BEGIN');

    const orderRes = await client.query(
      `INSERT INTO orders (order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, payment_method, status, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING', 'PENDING')
       RETURNING *`,
      [
        orderNumber,
        userId || null,
        customerName || 'Valued Customer',
        customerEmail || 'customer@example.com',
        customerPhone || '',
        formattedAddress,
        totalAmount,
        paymentMethod || 'COD',
      ]
    );

    const order = orderRes.rows[0];

    interface ItemsRow {
      id: string;
      productId: string;
      productName: string;
      productImage: string;
      variantName: string;
      unitPrice: number;
      quantity: number;
    }

    const persistedItems: ItemsRow[] = [];

    for (const item of items) {
      const variantId = item.variantId || null;
      const quantity = Number(item.quantity) || 1;
      const unitPrice = Number(item.unitPrice) || 0;

      // Persist the item snapshot so order history survives product changes
      await client.query(
        `INSERT INTO order_items (order_id, product_id, variant_id, product_name, product_image, variant_name, unit_price, quantity)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          order.id,
          item.productId || null,
          variantId,
          item.productName || 'Product',
          item.productImage || null,
          item.variantName || 'Standard Pack',
          unitPrice,
          quantity,
        ]
      );

      // Decrement stock on the ordered variant (business logic, scoped to a row lock)
      if (variantId) {
        const stockRes = await client.query(
          `UPDATE product_variants SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock`,
          [quantity, variantId]
        );
        if (stockRes.rowCount === 0) {
          throw new Error(`Insufficient stock for variant ${variantId}`);
        }
      }

      persistedItems.push({
        id: `${order.id}-${variantId || item.productId || ''}-${persistedItems.length}`,
        productId: item.productId || '',
        productName: item.productName || 'Product',
        productImage: item.productImage || '',
        variantName: item.variantName || 'Standard Pack',
        unitPrice,
        quantity,
      });
    }

    await client.query('COMMIT');

    const addressForResponse =
      typeof shippingAddress === 'object' && shippingAddress !== null
        ? shippingAddress
        : formatAddress(formattedAddress);

    res.status(201).json({
      id: order.id,
      orderNumber: order.order_number,
      date: new Date(order.created_at).toISOString().split('T')[0],
      items: persistedItems,
      subtotal: persistedItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0),
      shippingFee: 0,
      totalAmount: Number(order.total_amount),
      status: order.status,
      shippingAddress: addressForResponse,
      paymentMethod: order.payment_method,
    });
  } catch (error: any) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  } finally {
    client.release();
  }
});

// GET /api/orders - Fetch orders (with items)
orderRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const params: any[] = [];
    let whereClause = '';

    if (userId) {
      params.push(userId);
      whereClause = `WHERE o.user_id = $1`;
    }

    const sql = `
      SELECT
        o.*,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', oi.id,
              'productId', oi.product_id,
              'productName', oi.product_name,
              'productImage', oi.product_image,
              'variantName', oi.variant_name,
              'unitPrice', oi.unit_price,
              'quantity', oi.quantity
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      ${whereClause}
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;

    const result = await query(sql, params);

    res.json(
      result.rows.map((order) => ({
        id: order.id,
        orderNumber: order.order_number,
        date: new Date(order.created_at).toISOString().split('T')[0],
        items: (order.items || []).map((it: any) => ({
          id: it.id,
          productId: it.productId,
          productName: it.productName || 'Product',
          productImage: it.productImage || '',
          variantName: it.variantName || 'Standard Pack',
          unitPrice: Number(it.unitPrice),
          quantity: Number(it.quantity),
        })),
        subtotal: Number(order.total_amount),
        shippingFee: 0,
        totalAmount: Number(order.total_amount),
        status: order.status,
        shippingAddress: storedAddressToFrontend(order.shipping_address),
        paymentMethod: order.payment_method,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});

// PATCH /api/orders/:id/status - Update order status
orderRouter.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const result = await query(
      `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ success: true, order: result.rows[0] });
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update order status', details: error.message });
  }
});