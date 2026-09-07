import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

export const productRouter = Router();

// Helper to format DB product row into Frontend Product interface
function formatProduct(row: any) {
  let gallery = [];
  try {
    gallery = typeof row.gallery === 'string' ? JSON.parse(row.gallery) : (row.gallery || [row.image]);
  } catch {
    gallery = [row.image];
  }

  let nutritionalInfo = undefined;
  try {
    nutritionalInfo = typeof row.nutritional_info === 'string' ? JSON.parse(row.nutritional_info) : row.nutritional_info;
  } catch {
    nutritionalInfo = undefined;
  }

  let ingredients = [];
  try {
    ingredients = typeof row.ingredients === 'string' ? JSON.parse(row.ingredients) : (row.ingredients || []);
  } catch {
    ingredients = [];
  }

  const variants = Array.isArray(row.variants) ? row.variants.filter((v: any) => v && v.id) : [];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category_slug || '',
    categoryName: row.category_name || 'Category',
    description: row.description,
    shortDescription: row.description ? row.description.split('.')[0] + '.' : '',
    basePrice: Number(row.base_price),
    rating: Number(row.rating || 4.9),
    reviewCount: Number(row.review_count || 0),
    isFeatured: Boolean(row.is_featured),
    image: row.image,
    gallery,
    variants: variants.map((v: any) => ({
      id: v.id,
      weightSize: v.weight_size,
      price: Number(v.price),
      stock: Number(v.stock),
      sku: v.sku,
    })),
    ingredients,
    nutritionalInfo,
  };
}

// SQL Query template for joining product, category, and variants
const SELECT_PRODUCTS_SQL = `
  SELECT 
    p.*,
    c.name AS category_name,
    c.slug AS category_slug,
    COALESCE(
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', v.id,
          'weight_size', v.weight_size,
          'price', v.price,
          'stock', v.stock,
          'sku', v.sku
        )
      ) FILTER (WHERE v.id IS NOT NULL),
      '[]'::json
    ) AS variants
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id
  LEFT JOIN product_variants v ON v.product_id = p.id
`;

// GET /api/products - Get all products with optional filters
productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;

    const conditions: string[] = [];
    const params: any[] = [];

    if (category && category !== 'all') {
      params.push(category);
      conditions.push(`c.slug = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`(p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const sql = `${SELECT_PRODUCTS_SQL} ${whereClause} GROUP BY p.id, c.id ORDER BY p.created_at DESC`;

    const result = await query(sql, params);
    res.json(result.rows.map(formatProduct));
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch products', details: error.message });
  }
});

// GET /api/products/:slug - Get product by slug
productRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const sql = `${SELECT_PRODUCTS_SQL} WHERE p.slug = $1 GROUP BY p.id, c.id`;

    const result = await query(sql, [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(formatProduct(result.rows[0]));
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch product', details: error.message });
  }
});

// POST /api/products - Create new product
productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      category,
      categoryId,
      basePrice,
      rating,
      isFeatured,
      image,
      gallery,
      ingredients,
      nutritionalInfo,
      variants,
    } = req.body;

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Resolve the actual category id: prefer explicit categoryId, otherwise map from category slug/name
    let resolvedCategoryId = categoryId || null;
    if (!resolvedCategoryId && category) {
      const catRes = await query(`SELECT id FROM categories WHERE slug = $1 OR LOWER(name) = LOWER($1)`, [category]);
      resolvedCategoryId = catRes.rows[0]?.id || null;
    }

    const insertSql = `
      INSERT INTO products (name, slug, description, category_id, base_price, rating, is_featured, image, gallery, ingredients, nutritional_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `;

    const prodRes = await query(insertSql, [
      name,
      generatedSlug,
      description,
      resolvedCategoryId,
      basePrice,
      rating || 4.9,
      isFeatured || false,
      image,
      JSON.stringify(gallery || [image]),
      JSON.stringify(ingredients || []),
      JSON.stringify(nutritionalInfo || {}),
    ]);

    const productId = prodRes.rows[0].id;

    if (variants && Array.isArray(variants)) {
      for (const v of variants) {
        await query(
          `INSERT INTO product_variants (product_id, weight_size, price, stock, sku)
           VALUES ($1, $2, $3, $4, $5)`,
          [productId, v.weightSize, v.price, v.stock || 100, v.sku || `SKU-${Date.now()}`]
        );
      }
    }

    const createdSql = `${SELECT_PRODUCTS_SQL} WHERE p.id = $1 GROUP BY p.id, c.id`;
    const finalResult = await query(createdSql, [productId]);
    res.status(201).json(formatProduct(finalResult.rows[0]));
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
});

// PUT /api/products/:id - Update product & variants
productRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      description,
      category,
      categoryId,
      basePrice,
      rating,
      isFeatured,
      image,
      gallery,
      ingredients,
      nutritionalInfo,
      variants,
    } = req.body;

    let resolvedCategoryId = categoryId || null;
    if (!resolvedCategoryId && category) {
      const catRes = await query(`SELECT id FROM categories WHERE slug = $1 OR LOWER(name) = LOWER($1)`, [category]);
      resolvedCategoryId = catRes.rows[0]?.id || null;
    }

    const updateSql = `
      UPDATE products
      SET
        name = COALESCE($1, name),
        slug = COALESCE($2, slug),
        description = COALESCE($3, description),
        category_id = COALESCE($4, category_id),
        base_price = COALESCE($5, base_price),
        rating = COALESCE($6, rating),
        is_featured = COALESCE($7, is_featured),
        image = COALESCE($8, image),
        gallery = CASE WHEN $9::text IS NOT NULL THEN $9::jsonb ELSE gallery END,
        ingredients = CASE WHEN $10::text IS NOT NULL THEN $10::jsonb ELSE ingredients END,
        nutritional_info = CASE WHEN $11::text IS NOT NULL THEN $11::jsonb ELSE nutritional_info END,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING id
    `;

    const prodRes = await query(updateSql, [
      name,
      slug,
      description,
      resolvedCategoryId,
      basePrice,
      rating,
      isFeatured,
      image,
      gallery ? JSON.stringify(gallery) : null,
      ingredients ? JSON.stringify(ingredients) : null,
      nutritionalInfo ? JSON.stringify(nutritionalInfo) : null,
      id,
    ]);

    if (prodRes.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (variants && Array.isArray(variants)) {
      // Re-sync variants for this product
      await query(`DELETE FROM product_variants WHERE product_id = $1`, [id]);
      for (const v of variants) {
        await query(
          `INSERT INTO product_variants (product_id, weight_size, price, stock, sku)
           VALUES ($1, $2, $3, $4, $5)`,
          [id, v.weightSize, v.price, v.stock || 100, v.sku || `SKU-${Date.now()}-${Math.floor(Math.random()*1000)}`]
        );
      }
    }

    const updatedSql = `${SELECT_PRODUCTS_SQL} WHERE p.id = $1 GROUP BY p.id, c.id`;
    const finalResult = await query(updatedSql, [id]);
    res.json(formatProduct(finalResult.rows[0]));
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update product', details: error.message });
  }
});

// DELETE /api/products/:id - Delete product
productRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await query(`DELETE FROM products WHERE id = $1`, [id]);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete product', details: error.message });
  }
});

