import dotenv from 'dotenv';
dotenv.config();

import { query } from '../server/src/db/index.js';

async function test() {
  console.log('Testing Database Connection...');
  console.log('DATABASE_URL present:', Boolean(process.env.DATABASE_URL));
  try {
    const cats = await query('SELECT count(*) FROM categories');
    console.log('Categories Count:', cats.rows[0].count);

    const prods = await query('SELECT count(*) FROM products');
    console.log('Products Count:', prods.rows[0].count);

    const firstProd = await query('SELECT * FROM products LIMIT 1');
    console.log('First Product:', firstProd.rows[0]);
    process.exit(0);
  } catch (err: any) {
    console.error('DATABASE TEST FAILED:', err);
    process.exit(1);
  }
}

test();
