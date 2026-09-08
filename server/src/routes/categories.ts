import { Router, Request, Response } from 'express';
import { query } from '../db/index';


export const categoryRouter = Router();

// GET /api/categories - Get all categories with product count using SQL JOIN
categoryRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const sql = `
      SELECT 
        c.*,
        COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `;
    const result = await query(sql);
    res.json(result.rows);
  } catch (error: any) {
    console.error('[categories] DB fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
});

// POST /api/categories - Create new category
categoryRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const generatedSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const defaultImage = image || '/images/hero-bg.jpg';

    const result = await query(
      `INSERT INTO categories (name, slug, description, image)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, generatedSlug, description || '', defaultImage]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to create category', details: error.message });
  }
});

// PUT /api/categories/:id - Update existing category
categoryRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image } = req.body;

    const generatedSlug = slug || (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);

    const result = await query(
      `UPDATE categories
       SET 
         name = COALESCE($1, name),
         slug = COALESCE($2, slug),
         description = COALESCE($3, description),
         image = COALESCE($4, image)
       WHERE id = $5
       RETURNING *`,
      [name, generatedSlug, description, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to update category', details: error.message });
  }
});

// DELETE /api/categories/:id - Delete category
categoryRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await query(`DELETE FROM categories WHERE id = $1`, [id]);
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to delete category', details: error.message });
  }
});


