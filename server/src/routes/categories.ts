import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

export const categoryRouter = Router();

const FALLBACK_CATEGORIES = [
  { id: '1', name: 'Stone Ground Atta', slug: 'atta', description: 'Freshly ground 100% natural stone chakki flour preserving all bran, fiber, and aroma.', image: '/images/hero-bg.jpg', product_count: 4 },
  { id: '2', name: 'Wood-Pressed Oils', slug: 'oils', description: 'Traditional cold-pressed unrefined oils extracted in wooden kolhu at low RPM.', image: '/images/hero-bg.jpg', product_count: 3 },
  { id: '3', name: 'Authentic Pickles', slug: 'pickles', description: 'Sun-dried homemade pickles crafted with cold-pressed oils and heritage spices.', image: '/images/hero-bg.jpg', product_count: 2 },
  { id: '4', name: 'Pure Spices', slug: 'spices', description: 'Whole & stone-ground single origin aromatic Indian spices without artificial colors.', image: '/images/hero-bg.jpg', product_count: 1 },
];

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
    if (result.rows.length > 0) {
      return res.json(result.rows);
    }
    res.json(FALLBACK_CATEGORIES);
  } catch (error: any) {
    console.error('⚠️ DB fetch error for categories, returning fallback:', error.message);
    res.json(FALLBACK_CATEGORIES);
  }
});
