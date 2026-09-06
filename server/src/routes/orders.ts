import { Router, Request, Response } from 'express';
import { query, getClient } from '../db/index.js';

export const orderRouter = Router();

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

    const orderNumber = `TC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedAddress = typeof shippingAddress === 'string'
      ? shippingAddress
      : `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.zipCode}`;

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
        customerPhone || '9876543210',
        formattedAddress,
        totalAmount,
        paymentMethod || 'COD',
      ]
    );

    const order = orderRes.rows[0];

    if (items && Array.isArray(items)) {
      for (const item of items) {
        await client.query(
          `INSERT INTO order_items (order_id, product_id, variant_id, variant_name, unit_price, quantity)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            order.id,
            item.productId,
            item.variantId || null,
            item.variantName || 'Standard Pack',
            item.unitPrice,
            item.quantity,
          ]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      id: order.id,
      orderNumber: order.order_number,
      date: new Date(order.created_at).toISOString().split('T')[0],
      items: items || [],
      subtotal: Number(order.total_amount),
      shippingFee: 0,
      totalAmount: Number(order.total_amount),
      status: order.status,
      shippingAddress: typeof shippingAddress === 'object' ? shippingAddress : { street: formattedAddress },
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
              'productName', p.name,
              'productImage', p.image,
              'variantName', oi.variant_name,
              'unitPrice', oi.unit_price,
              'quantity', oi.quantity
            )
          ) FILTER (WHERE oi.id IS NOT NULL),
          '[]'::json
        ) AS items
      FROM orders o
      LEFT JOIN order_items oi ON oi.order_id = o.id
      LEFT JOIN products p ON oi.product_id = p.id
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
        items: order.items,
        subtotal: Number(order.total_amount),
        shippingFee: 0,
        totalAmount: Number(order.total_amount),
        status: order.status,
        shippingAddress: order.shipping_address,
        paymentMethod: order.payment_method,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
  }
});
