-- True Chakki PostgreSQL Category & Product Insert Script
-- Works with any PostgreSQL client (pgAdmin, DBeaver, Neon Console, psql)

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. INSERT CATEGORIES
-- ============================================================================
INSERT INTO categories (name, slug, description, image)
VALUES 
  (
    'Stone Ground Atta', 
    'atta', 
    'Freshly ground 100% natural stone chakki flour preserving all bran, fiber, and aroma.', 
    '/images/hero-bg.jpg'
  ),
  (
    'Wood-Pressed Oils', 
    'oils', 
    'Traditional cold-pressed unrefined oils extracted in wooden kolhu at low RPM.', 
    '/images/hero-bg.jpg'
  ),
  (
    'Authentic Pickles', 
    'pickles', 
    'Sun-dried homemade pickles crafted with cold-pressed oils and heritage spices.', 
    '/images/hero-bg.jpg'
  ),
  (
    'Pure Spices', 
    'spices', 
    'Whole & stone-ground single origin aromatic Indian spices without artificial colors.', 
    '/images/hero-bg.jpg'
  )
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, description = EXCLUDED.description, image = EXCLUDED.image;


-- ============================================================================
-- 2. INSERT PRODUCTS
-- ============================================================================

-- Product 1: Whole Wheat Atta (Stone Ground)
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Whole Wheat Atta (Stone Ground)',
  'whole-wheat-atta',
  (SELECT id FROM categories WHERE slug = 'atta'),
  '100% Natural Sharbati whole wheat ground using traditional stone chakki at slow RPM. Slow milling preserves natural bran, fiber, germ nutrients, and rich traditional aroma. No maida, no bleached flour, and zero chemical preservatives.',
  380.00,
  4.90,
  248,
  TRUE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["100% Single-Origin Sharbati Whole Wheat Grains"]'::jsonb,
  '{"calories": "364 kcal", "protein": "12.8g", "carbs": "71.2g", "fat": "1.9g", "fiber": "11.5g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 2: Cold-Pressed Mustard Oil (Kachi Ghani)
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Cold-Pressed Mustard Oil (Kachi Ghani)',
  'cold-pressed-mustard-oil',
  (SELECT id FROM categories WHERE slug = 'oils'),
  'Extracted from premium yellow mustard seeds using traditional wooden press (Kolhu) without heat generation or solvent extraction. Retains natural pungency, golden clarity, high MUFA, and essential Omega-3 fatty acids.',
  245.00,
  4.95,
  194,
  TRUE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["100% Cold Pressed Yellow Mustard Seeds"]'::jsonb,
  '{"calories": "884 kcal", "protein": "0g", "carbs": "0g", "fat": "100g", "fiber": "0g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 3: Traditional Mango Pickle (Aam Ka Achar)
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Traditional Mango Pickle (Aam Ka Achar)',
  'traditional-mango-pickle',
  (SELECT id FROM categories WHERE slug = 'pickles'),
  'Handcrafted raw Ramkela mangoes marinated in raw mustard oil, fenugreek, nigella, and rock salt. Sun-cured in traditional ceramic jars (Barnis) for 21 days for authentic home flavor.',
  290.00,
  4.88,
  162,
  TRUE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["Raw Mangoes", "Cold-Pressed Mustard Oil", "Fenugreek", "Fennel", "Nigella Seeds", "Rock Salt", "Turmeric"]'::jsonb,
  '{"calories": "180 kcal", "protein": "2.1g", "carbs": "14.5g", "fat": "12.8g", "fiber": "3.2g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 4: Stone-Ground Turmeric Powder (Haldi)
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Stone-Ground Turmeric Powder (Haldi)',
  'stone-ground-turmeric-powder',
  (SELECT id FROM categories WHERE slug = 'spices'),
  'High-curcumin Lakadong turmeric rhizomes slow-milled on granite stones. Rich deep golden yellow color with high medicinal potency and zero artificial food dyes.',
  190.00,
  4.92,
  118,
  FALSE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["100% Pure Single-Origin Lakadong Turmeric Roots"]'::jsonb,
  '{"calories": "349 kcal", "protein": "7.8g", "carbs": "65g", "fat": "9.9g", "fiber": "21g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 5: 7 Grains Multigrain Super Atta
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  '7 Grains Multigrain Super Atta',
  'multigrain-super-atta',
  (SELECT id FROM categories WHERE slug = 'atta'),
  'A nutrient-dense blend of 7 ancient grains: Sharbati Wheat, Desi Chana, Jowar, Bajra, Ragi, Oats, and Soybeans. Formulated for high dietary fiber, low glycemic index, and soft fluffy rotis.',
  490.00,
  4.85,
  165,
  FALSE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["Sharbati Wheat", "Desi Chana", "Jowar", "Bajra", "Ragi", "Oats", "Defatted Soy"]'::jsonb,
  '{"calories": "372 kcal", "protein": "15.4g", "carbs": "68.5g", "fat": "3.1g", "fiber": "14.2g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 6: Cold-Pressed Groundnut (Peanut) Oil
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Cold-Pressed Groundnut (Peanut) Oil',
  'cold-pressed-groundnut-oil',
  (SELECT id FROM categories WHERE slug = 'oils'),
  'Cold-pressed from handpicked Saurashtra groundnuts. High smoke point makes it perfect for everyday Indian cooking and deep frying while retaining sweet nutty aroma.',
  280.00,
  4.91,
  142,
  FALSE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["100% Native Groundnut Seeds"]'::jsonb,
  '{"calories": "884 kcal", "protein": "0g", "carbs": "0g", "fat": "100g", "fiber": "0g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;

-- Product 7: Sun-Cured Spiced Lemon Pickle
INSERT INTO products (
  name, slug, category_id, description, base_price, rating, review_count, is_featured, image, gallery, ingredients, nutritional_info
)
VALUES (
  'Sun-Cured Spiced Lemon Pickle',
  'sun-cured-lemon-pickle',
  (SELECT id FROM categories WHERE slug = 'pickles'),
  'Juicy Kagzi lemons aged under the sun in earthen pots with digestive carom seeds (ajwain), black salt, and dry roasted spices. Oil-free traditional digestive pickles.',
  230.00,
  4.79,
  88,
  FALSE,
  '/images/hero-bg.jpg',
  '["/images/hero-bg.jpg"]'::jsonb,
  '["Kagzi Lemons", "Sendha Namak (Rock Salt)", "Ajwain", "Black Pepper", "Cumin", "Asafoetida (Hing)"]'::jsonb,
  '{"calories": "92 kcal", "protein": "1.2g", "carbs": "18.4g", "fat": "0.4g", "fiber": "5.2g"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, base_price = EXCLUDED.base_price, description = EXCLUDED.description;


-- ============================================================================
-- 3. INSERT PRODUCT VARIANTS
-- ============================================================================

-- Variants for Whole Wheat Atta
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'whole-wheat-atta'), '1kg Pack', 85.00, 150, 'TC-ATTA-1K'),
  ((SELECT id FROM products WHERE slug = 'whole-wheat-atta'), '5kg Bag', 380.00, 80, 'TC-ATTA-5K'),
  ((SELECT id FROM products WHERE slug = 'whole-wheat-atta'), '10kg Family Bag', 720.00, 45, 'TC-ATTA-10K')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for Cold-Pressed Mustard Oil
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'cold-pressed-mustard-oil'), '500ml Bottle', 130.00, 120, 'TC-OIL-500M'),
  ((SELECT id FROM products WHERE slug = 'cold-pressed-mustard-oil'), '1 Litre Glass Bottle', 245.00, 95, 'TC-OIL-1L'),
  ((SELECT id FROM products WHERE slug = 'cold-pressed-mustard-oil'), '5 Litre Can', 1150.00, 30, 'TC-OIL-5L')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for Traditional Mango Pickle
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'traditional-mango-pickle'), '350g Glass Jar', 290.00, 60, 'TC-MANGO-350G'),
  ((SELECT id FROM products WHERE slug = 'traditional-mango-pickle'), '700g Heritage Jar', 540.00, 40, 'TC-MANGO-700G')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for Stone-Ground Turmeric Powder
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'stone-ground-turmeric-powder'), '250g Pouch', 190.00, 90, 'TC-HALDI-250G'),
  ((SELECT id FROM products WHERE slug = 'stone-ground-turmeric-powder'), '500g Eco Pack', 350.00, 50, 'TC-HALDI-500G')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for 7 Grains Multigrain Super Atta
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'multigrain-super-atta'), '5kg Bag', 490.00, 75, 'TC-MULTI-5K'),
  ((SELECT id FROM products WHERE slug = 'multigrain-super-atta'), '10kg Bag', 920.00, 30, 'TC-MULTI-10K')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for Cold-Pressed Groundnut Oil
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'cold-pressed-groundnut-oil'), '1 Litre Bottle', 280.00, 85, 'TC-GNOIL-1L'),
  ((SELECT id FROM products WHERE slug = 'cold-pressed-groundnut-oil'), '5 Litre Can', 1320.00, 25, 'TC-GNOIL-5L')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Variants for Sun-Cured Spiced Lemon Pickle
INSERT INTO product_variants (product_id, weight_size, price, stock, sku) VALUES
  ((SELECT id FROM products WHERE slug = 'sun-cured-lemon-pickle'), '300g Jar', 150.00, 75, 'TC-LMN-300G'),
  ((SELECT id FROM products WHERE slug = 'sun-cured-lemon-pickle'), '500g Jar', 230.00, 40, 'TC-LMN-500G')
ON CONFLICT (sku) DO UPDATE SET price = EXCLUDED.price, stock = EXCLUDED.stock;

-- Done
