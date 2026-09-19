import dotenv from 'dotenv';
dotenv.config();

import { query } from '../server/src/db/index.js';

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

async function testProductsQuery() {
  console.log('Testing SELECT_PRODUCTS_SQL query...');
  try {
    const sql = `${SELECT_PRODUCTS_SQL} GROUP BY p.id, c.id, c.name, c.slug ORDER BY p.created_at DESC`;
    const result = await query(sql, []);
    console.log('Query Succeeded! Rows fetched:', result.rows.length);
    console.log('Sample Row 1:', result.rows[0]);
    process.exit(0);
  } catch (err: any) {
    console.error('QUERY FAILED WITH ERROR:', err.message);
    process.exit(1);
  }
}

testProductsQuery();
