import dotenv from 'dotenv';
dotenv.config();

import { query } from '../server/src/db/index.js';

async function testCategoryQuery() {
  try {
    const sql = `
      SELECT 
        c.*,
        COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id, c.name, c.slug, c.description, c.image, c.created_at
      ORDER BY c.name ASC
    `;
    const res = await query(sql);
    console.log('Category Query OK, count:', res.rows.length);
    process.exit(0);
  } catch (err: any) {
    console.error('Category Query Error:', err.message);
    process.exit(1);
  }
}

testCategoryQuery();
