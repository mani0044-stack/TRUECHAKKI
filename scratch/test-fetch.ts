import { query } from '../server/src/db/index.js';

async function test() {
  try {
    console.log('--- TESTING CATEGORIES ---');
    const catSql = `
      SELECT 
        c.*,
        COUNT(p.id)::int AS product_count
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `;
    const catRes = await query(catSql);
    console.log(`Categories fetched: ${catRes.rows.length}`);
    console.log(catRes.rows.map(r => ({ id: r.id, name: r.name, slug: r.slug, count: r.product_count })));

    console.log('\n--- TESTING PRODUCTS ---');
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
      GROUP BY p.id, c.id
      ORDER BY p.created_at DESC
    `;
    const prodRes = await query(SELECT_PRODUCTS_SQL);
    console.log(`Products fetched: ${prodRes.rows.length}`);
    console.log(`First product: ${prodRes.rows[0]?.name}, category: ${prodRes.rows[0]?.category_name}, variants: ${prodRes.rows[0]?.variants?.length}`);
    process.exit(0);
  } catch (err) {
    console.error('FETCH ERROR:', err);
    process.exit(1);
  }
}

test();
