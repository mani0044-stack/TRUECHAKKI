import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

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
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
});
