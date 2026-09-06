import fs from 'fs';
import path from 'path';
import { pool } from './index.js';

const initialCategories = [
  {
    name: 'Stone Ground Atta',
    slug: 'atta',
    description: 'Freshly ground 100% natural stone chakki flour preserving all bran, fiber, and aroma.',
    image: '/images/hero-bg.jpg',
  },
  {
    name: 'Wood-Pressed Oils',
    slug: 'oils',
    description: 'Traditional cold-pressed unrefined oils extracted in wooden kolhu at low RPM.',
    image: '/images/hero-bg.jpg',
  },
  {
    name: 'Authentic Pickles',
    slug: 'pickles',
    description: 'Sun-dried homemade pickles crafted with cold-pressed oils and heritage spices.',
    image: '/images/hero-bg.jpg',
  },
  {
    name: 'Pure Spices',
    slug: 'spices',
    description: 'Whole & stone-ground single origin aromatic Indian spices without artificial colors.',
    image: '/images/hero-bg.jpg',
  },
];

const initialProducts = [
  {
    name: 'Whole Wheat Atta (Stone Ground)',
    slug: 'whole-wheat-atta',
    categorySlug: 'atta',
    description: '100% Natural Sharbati whole wheat ground using traditional stone chakki at slow RPM. Slow milling preserves natural bran, fiber, germ nutrients, and rich traditional aroma. No maida, no bleached flour, and zero chemical preservatives.',
    basePrice: 380,
    rating: 4.9,
    reviewCount: 248,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: JSON.stringify(['/images/hero-bg.jpg']),
    ingredients: JSON.stringify(['100% Single-Origin Sharbati Whole Wheat Grains']),
    nutritionalInfo: JSON.stringify({
      calories: '364 kcal',
      protein: '12.8g',
      carbs: '71.2g',
      fat: '1.9g',
      fiber: '11.5g',
    }),
    variants: [
      { weightSize: '1kg Pack', price: 85, stock: 150, sku: 'TC-ATTA-1K' },
      { weightSize: '5kg Bag', price: 380, stock: 80, sku: 'TC-ATTA-5K' },
      { weightSize: '10kg Family Bag', price: 720, stock: 45, sku: 'TC-ATTA-10K' },
    ],
  },
  {
    name: 'Cold-Pressed Mustard Oil (Kachi Ghani)',
    slug: 'cold-pressed-mustard-oil',
    categorySlug: 'oils',
    description: 'Extracted from premium yellow mustard seeds using traditional wooden press (Kolhu) without heat generation or solvent extraction. Retains natural pungency, golden clarity, high MUFA, and essential Omega-3 fatty acids.',
    basePrice: 245,
    rating: 4.95,
    reviewCount: 194,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: JSON.stringify(['/images/hero-bg.jpg']),
    ingredients: JSON.stringify(['100% Cold Pressed Yellow Mustard Seeds']),
    nutritionalInfo: JSON.stringify({
      calories: '884 kcal',
      protein: '0g',
      carbs: '0g',
      fat: '100g',
      fiber: '0g',
    }),
    variants: [
      { weightSize: '500ml Bottle', price: 130, stock: 120, sku: 'TC-OIL-500M' },
      { weightSize: '1 Litre Glass Bottle', price: 245, stock: 95, sku: 'TC-OIL-1L' },
      { weightSize: '5 Litre Can', price: 1150, stock: 30, sku: 'TC-OIL-5L' },
    ],
  },
  {
    name: 'Traditional Mango Pickle (Aam Ka Achar)',
    slug: 'traditional-mango-pickle',
    categorySlug: 'pickles',
    description: 'Handcrafted raw Ramkela mangoes marinated in raw mustard oil, fenugreek, nigella, and rock salt. Sun-cured in traditional ceramic jars (Barnis) for 21 days for authentic home flavor.',
    basePrice: 290,
    rating: 4.88,
    reviewCount: 162,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: JSON.stringify(['/images/hero-bg.jpg']),
    ingredients: JSON.stringify(['Raw Mangoes', 'Cold-Pressed Mustard Oil', 'Fenugreek', 'Fennel', 'Nigella Seeds', 'Rock Salt', 'Turmeric']),
    nutritionalInfo: JSON.stringify({
      calories: '180 kcal',
      protein: '2.1g',
      carbs: '14.5g',
      fat: '12.8g',
      fiber: '3.2g',
    }),
    variants: [
      { weightSize: '350g Glass Jar', price: 290, stock: 60, sku: 'TC-MANGO-350G' },
      { weightSize: '700g Heritage Jar', price: 540, stock: 40, sku: 'TC-MANGO-700G' },
    ],
  },
  {
    name: 'Stone-Ground Turmeric Powder (Haldi)',
    slug: 'stone-ground-turmeric-powder',
    categorySlug: 'spices',
    description: 'High-curcumin Lakadong turmeric rhizomes slow-milled on granite stones. Rich deep golden yellow color with high medicinal potency and zero artificial food dyes.',
    basePrice: 190,
    rating: 4.92,
    reviewCount: 118,
    isFeatured: false,
    image: '/images/hero-bg.jpg',
    gallery: JSON.stringify(['/images/hero-bg.jpg']),
    ingredients: JSON.stringify(['100% Pure Single-Origin Lakadong Turmeric Roots']),
    nutritionalInfo: JSON.stringify({
      calories: '349 kcal',
      protein: '7.8g',
      carbs: '65g',
      fat: '9.9g',
      fiber: '21g',
    }),
    variants: [
      { weightSize: '250g Pouch', price: 190, stock: 90, sku: 'TC-HALDI-250G' },
      { weightSize: '500g Eco Pack', price: 350, stock: 50, sku: 'TC-HALDI-500G' },
    ],
  },
];

async function main() {
  console.log('🌱 Starting direct SQL database setup & seed...');

  // 1. Run DDL schema
  const schemaPath = path.join(process.cwd(), 'server', 'src', 'db', 'schema.sql');
  const ddlSql = fs.readFileSync(schemaPath, 'utf-8');
  await pool.query(ddlSql);
  console.log('✓ DDL schema initialized');

  // 2. Seed Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of initialCategories) {
    const res = await pool.query(
      `INSERT INTO categories (name, slug, description, image)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description
       RETURNING id, slug`,
      [cat.name, cat.slug, cat.description, cat.image]
    );
    categoryMap[cat.slug] = res.rows[0].id;
    console.log(`✓ Category ready: ${cat.name}`);
  }

  // 3. Seed Products & Variants
  for (const prod of initialProducts) {
    const categoryId = categoryMap[prod.categorySlug];
    if (!categoryId) continue;

    const prodRes = await pool.query(
      `INSERT INTO products (name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, base_price = EXCLUDED.base_price
       RETURNING id`,
      [
        prod.name,
        prod.slug,
        categoryId,
        prod.description,
        prod.basePrice,
        prod.rating,
        prod.reviewCount,
        prod.isFeatured,
        prod.image,
        prod.gallery,
        prod.ingredients,
        prod.nutritionalInfo,
      ]
    );

    const productId = prodRes.rows[0].id;

    for (const v of prod.variants) {
      await pool.query(
        `INSERT INTO product_variants (product_id, weight_size, price, stock, sku)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (sku) DO NOTHING`,
        [productId, v.weightSize, v.price, v.stock, v.sku]
      );
    }
    console.log(`✓ Product ready with variants: ${prod.name}`);
  }

  console.log('✅ Direct SQL Database Setup & Seed completed successfully!');
}

main()
  .catch((err) => {
    console.error('❌ SQL Database setup error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
