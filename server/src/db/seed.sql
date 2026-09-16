-- True Chakki seed.sql
-- IDs use simple deterministic UUIDs because schema.sql defines UUID primary/foreign keys.
-- Category IDs: C001-C006 conceptually; Product IDs: P001-P035 conceptually.
-- Seeds categories, products, and product variants from the supplied product catalogue.
-- Run after schema.sql.

BEGIN;

-- Clean existing catalogue data so this seed can be safely re-run.
-- Product variants and products are removed before categories because of FK constraints.
DELETE FROM product_variants;
DELETE FROM products;
DELETE FROM categories;

-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (id, name, slug, description, image)
VALUES
  ('00000000-0000-0000-0000-100000000001', 'Fresh Atta', 'fresh-atta',
   'Stone Ground • No Preservatives • Freshly Milled', '/images/categories/fresh-atta.jpg'),
  ('00000000-0000-0000-0000-100000000002', 'Fresh Biscuits', 'fresh-biscuits',
   'Freshly baked biscuits made with wholesome ingredients.', '/images/categories/fresh-biscuits.jpg'),
  ('00000000-0000-0000-0000-100000000003', 'Wood-Pressed Oils', 'wood-pressed-oils',
   'Traditional wood-pressed oils made for everyday cooking and wellness.', '/images/categories/wood-pressed-oils.jpg'),
  ('00000000-0000-0000-0000-100000000004', 'Achaar & Chutneys', 'achaar-chutneys',
   'Traditional pickles, chutneys, dips and sauces.', '/images/categories/achaar-chutneys.jpg'),
  ('00000000-0000-0000-0000-100000000005', 'Masalas & Tea', 'masalas-tea',
   'Aromatic masalas and tea essentials for your kitchen.', '/images/categories/masalas-tea.jpg'),
  ('00000000-0000-0000-0000-100000000006', 'Sharbat, Gulkand & Honey', 'sharbat-gulkand-honey',
   'Traditional sharbats, gulkand and natural honey.', '/images/categories/sharbat-gulkand-honey.jpg');

-- ============================================================
-- PRODUCTS + VARIANTS
-- base_price = price of the first/default variant
-- ============================================================

-- Fresh Atta
INSERT INTO products
  (id, name, slug, description, category_id, base_price, rating, review_count, is_featured, image, gallery, nutritional_info, ingredients)
VALUES
  ('00000000-0000-0000-0001-100000000001', 'MP Sharbati Atta', 'mp-sharbati-atta',
   'Freshly milled MP Sharbati Atta, stone ground with no preservatives.',
   '00000000-0000-0000-0000-100000000001', 60, 4.9, 0, TRUE,
   '/images/products/mp-sharbati-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000002', 'Farm Fresh Atta', 'farm-fresh-atta',
   'Freshly milled farm fresh atta, stone ground with no preservatives.',
   '00000000-0000-0000-0000-100000000001', 46, 4.9, 0, TRUE,
   '/images/products/farm-fresh-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000003', 'Bajra Atta', 'bajra-atta',
   'Freshly milled stone-ground Bajra Atta.',
   '00000000-0000-0000-0000-100000000001', 80, 4.9, 0, FALSE,
   '/images/products/bajra-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000004', 'Ragi Atta', 'ragi-atta',
   'Freshly milled stone-ground Ragi Atta.',
   '00000000-0000-0000-0000-100000000001', 90, 4.9, 0, FALSE,
   '/images/products/ragi-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000005', 'Kangni Atta', 'kangni-atta',
   'Freshly milled stone-ground Kangni Atta.',
   '00000000-0000-0000-0000-100000000001', 90, 4.9, 0, FALSE,
   '/images/products/kangni-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000006', 'Jowar Atta', 'jowar-atta',
   'Freshly milled stone-ground Jowar Atta.',
   '00000000-0000-0000-0000-100000000001', 90, 4.9, 0, FALSE,
   '/images/products/jowar-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000007', 'Jau Atta', 'jau-atta',
   'Freshly milled stone-ground Jau Atta.',
   '00000000-0000-0000-0000-100000000001', 90, 4.9, 0, FALSE,
   '/images/products/jau-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000008', 'Multigrain Atta', 'multigrain-atta',
   'Freshly milled multigrain atta, stone ground with no preservatives.',
   '00000000-0000-0000-0000-100000000001', 90, 4.9, 0, TRUE,
   '/images/products/multigrain-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000009', 'Black Chana Atta', 'black-chana-atta',
   'Freshly milled Black Chana Atta.',
   '00000000-0000-0000-0000-100000000001', 120, 4.9, 0, FALSE,
   '/images/products/black-chana-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000010', 'Kodra Atta', 'kodra-atta',
   'Freshly milled stone-ground Kodra Atta.',
   '00000000-0000-0000-0000-100000000001', 110, 4.9, 0, FALSE,
   '/images/products/kodra-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000011', 'Quinoa Atta', 'quinoa-atta',
   'Freshly milled Quinoa Atta.',
   '00000000-0000-0000-0000-100000000001', 160, 4.9, 0, FALSE,
   '/images/products/quinoa-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000012', 'Sugar-Free Atta', 'sugar-free-atta',
   'Freshly milled Sugar-Free Atta.',
   '00000000-0000-0000-0000-100000000001', 200, 4.9, 0, TRUE,
   '/images/products/sugar-free-atta.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000013', 'Khapli Atta', 'khapli-atta',
   'Freshly milled Khapli Atta.',
   '00000000-0000-0000-0000-100000000001', 200, 4.9, 0, TRUE,
   '/images/products/khapli-atta.jpg', '[]', '{}', '[]'),

-- Fresh Biscuits
  ('00000000-0000-0000-0001-100000000014', 'Atta Biscuits', 'atta-biscuits',
   'Fresh Atta Biscuits.', '00000000-0000-0000-0000-100000000002', 150, 4.9, 0, FALSE,
   '/images/products/atta-biscuits.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000015', 'Multigrain Biscuits', 'multigrain-biscuits',
   'Fresh Multigrain Biscuits.', '00000000-0000-0000-0000-100000000002', 150, 4.9, 0, FALSE,
   '/images/products/multigrain-biscuits.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000016', 'Oats & Almond Biscuits', 'oats-almond-biscuits',
   'Fresh Oats & Almond Biscuits.', '00000000-0000-0000-0000-100000000002', 150, 4.9, 0, TRUE,
   '/images/products/oats-almond-biscuits.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000017', 'Namkeen Biscuits', 'namkeen-biscuits',
   'Fresh savoury Namkeen Biscuits.', '00000000-0000-0000-0000-100000000002', 140, 4.9, 0, FALSE,
   '/images/products/namkeen-biscuits.jpg', '[]', '{}', '[]'),

-- Wood-Pressed Oils
  ('00000000-0000-0000-0001-100000000018', 'Yellow Mustard Oil', 'yellow-mustard-oil',
   'Traditional wood-pressed Yellow Mustard Oil.', '00000000-0000-0000-0000-100000000003', 420, 4.9, 0, TRUE,
   '/images/products/yellow-mustard-oil.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000019', 'Black Mustard Oil', 'black-mustard-oil',
   'Traditional wood-pressed Black Mustard Oil.', '00000000-0000-0000-0000-100000000003', 320, 4.9, 0, FALSE,
   '/images/products/black-mustard-oil.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000020', 'Coconut Oil', 'coconut-oil',
   'Traditional wood-pressed Coconut Oil.', '00000000-0000-0000-0000-100000000003', 1200, 4.9, 0, TRUE,
   '/images/products/coconut-oil.jpg', '[]', '{}', '[]'),

-- Achaar & Chutneys
  ('00000000-0000-0000-0001-100000000021', 'Lemon Achaar', 'lemon-achaar',
   'Traditional Lemon Achaar.', '00000000-0000-0000-0000-100000000004', 200, 4.9, 0, FALSE,
   '/images/products/lemon-achaar.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000022', 'Garlic Achaar', 'garlic-achaar',
   'Traditional Garlic Achaar.', '00000000-0000-0000-0000-100000000004', 280, 4.9, 0, TRUE,
   '/images/products/garlic-achaar.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000023', 'Green Chilli Achaar', 'green-chilli-achaar',
   'Traditional Green Chilli Achaar.', '00000000-0000-0000-0000-100000000004', 200, 4.9, 0, FALSE,
   '/images/products/green-chilli-achaar.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000024', 'Plum Chutney', 'plum-chutney',
   'Traditional Plum Chutney.', '00000000-0000-0000-0000-100000000004', 200, 4.9, 0, FALSE,
   '/images/products/plum-chutney.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000025', 'Red Chilli Dip', 'red-chilli-dip',
   'Rich and flavourful Red Chilli Dip.', '00000000-0000-0000-0000-100000000004', 250, 4.9, 0, FALSE,
   '/images/products/red-chilli-dip.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000026', 'Amla Chutney', 'amla-chutney',
   'Traditional Amla Chutney.', '00000000-0000-0000-0000-100000000004', 200, 4.9, 0, FALSE,
   '/images/products/amla-chutney.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000027', 'Tomato Sauce', 'tomato-sauce',
   'Rich Tomato Sauce.', '00000000-0000-0000-0000-100000000004', 160, 4.9, 0, FALSE,
   '/images/products/tomato-sauce.jpg', '[]', '{}', '[]'),

-- Masalas & Tea
  ('00000000-0000-0000-0001-100000000028', 'Chai Masala', 'chai-masala',
   'Aromatic Chai Masala.', '00000000-0000-0000-0000-100000000005', 100, 4.9, 0, FALSE,
   '/images/products/chai-masala.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000029', 'Garam Masala', 'garam-masala',
   'Aromatic Garam Masala.', '00000000-0000-0000-0000-100000000005', 200, 4.9, 0, TRUE,
   '/images/products/garam-masala.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000030', 'Chai Patti', 'chai-patti',
   'Everyday Chai Patti.', '00000000-0000-0000-0000-100000000005', 600, 4.9, 0, TRUE,
   '/images/products/chai-patti.jpg', '[]', '{}', '[]'),

-- Sharbat, Gulkand & Honey
  ('00000000-0000-0000-0001-100000000031', 'Rose Sharbat', 'rose-sharbat',
   'Traditional Rose Sharbat.', '00000000-0000-0000-0000-100000000006', 270, 4.9, 0, TRUE,
   '/images/products/rose-sharbat.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000032', 'Bel Sharbat', 'bel-sharbat',
   'Traditional Bel Sharbat.', '00000000-0000-0000-0000-100000000006', 250, 4.9, 0, FALSE,
   '/images/products/bel-sharbat.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000033', 'Plum Sharbat', 'plum-sharbat',
   'Traditional Plum Sharbat.', '00000000-0000-0000-0000-100000000006', 300, 4.9, 0, FALSE,
   '/images/products/plum-sharbat.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000034', 'Multiflora Honey', 'multiflora-honey',
   'Natural Multiflora Honey.', '00000000-0000-0000-0000-100000000006', 800, 4.9, 0, TRUE,
   '/images/products/multiflora-honey.jpg', '[]', '{}', '[]'),

  ('00000000-0000-0000-0001-100000000035', 'Mishri Gulkand', 'mishri-gulkand',
   'Traditional Mishri Gulkand.', '00000000-0000-0000-0000-100000000006', 300, 4.9, 0, TRUE,
   '/images/products/mishri-gulkand.jpg', '[]', '{}', '[]');

-- ============================================================
-- PRODUCT VARIANTS
-- ============================================================

INSERT INTO product_variants (product_id, weight_size, price, stock, sku)
VALUES
  -- Fresh Atta
  ('00000000-0000-0000-0001-100000000001', '1 kg', 60, 100, 'TC-MSA-1KG'),
  ('00000000-0000-0000-0001-100000000001', '5 kg Bag', 300, 100, 'TC-MSA-5KG'),

  ('00000000-0000-0000-0001-100000000002', '1 kg', 46, 100, 'TC-FFA-1KG'),
  ('00000000-0000-0000-0001-100000000002', '5 kg Bag', 230, 100, 'TC-FFA-5KG'),

  ('00000000-0000-0000-0001-100000000003', '1 kg', 80, 100, 'TC-BAJRA-1KG'),
  ('00000000-0000-0000-0001-100000000004', '1 kg', 90, 100, 'TC-RAGI-1KG'),
  ('00000000-0000-0000-0001-100000000005', '1 kg', 90, 100, 'TC-KANGNI-1KG'),
  ('00000000-0000-0000-0001-100000000006', '1 kg', 90, 100, 'TC-JOWAR-1KG'),
  ('00000000-0000-0000-0001-100000000007', '1 kg', 90, 100, 'TC-JAU-1KG'),
  ('00000000-0000-0000-0001-100000000008', '1 kg', 90, 100, 'TC-MULTIGRAIN-1KG'),
  ('00000000-0000-0000-0001-100000000009', '1 kg', 120, 100, 'TC-BLACKCHANA-1KG'),
  ('00000000-0000-0000-0001-100000000010', '1 kg', 110, 100, 'TC-KODRA-1KG'),
  ('00000000-0000-0000-0001-100000000011', '1 kg', 160, 100, 'TC-QUINOA-1KG'),
  ('00000000-0000-0000-0001-100000000012', '1 kg', 200, 100, 'TC-SUGARFREE-1KG'),
  ('00000000-0000-0000-0001-100000000013', '1 kg', 200, 100, 'TC-KHAPLI-1KG'),

  -- Fresh Biscuits (catalogue prices are per kg)
  ('00000000-0000-0000-0001-100000000014', '1 kg', 150, 100, 'TC-ATTA-BISCUITS-1KG'),
  ('00000000-0000-0000-0001-100000000015', '1 kg', 150, 100, 'TC-MULTIGRAIN-BISCUITS-1KG'),
  ('00000000-0000-0000-0001-100000000016', '1 kg', 150, 100, 'TC-OATS-ALMOND-BISCUITS-1KG'),
  ('00000000-0000-0000-0001-100000000017', '1 kg', 140, 100, 'TC-NAMKEEN-BISCUITS-1KG'),

  -- Wood-Pressed Oils
  ('00000000-0000-0000-0001-100000000018', '1 L', 420, 100, 'TC-YMO-1L'),
  ('00000000-0000-0000-0001-100000000018', '5 L', 1950, 100, 'TC-YMO-5L'),

  ('00000000-0000-0000-0001-100000000019', '1 L', 320, 100, 'TC-BMO-1L'),
  ('00000000-0000-0000-0001-100000000019', '5 L', 1450, 100, 'TC-BMO-5L'),

  ('00000000-0000-0000-0001-100000000020', '1 L', 1200, 100, 'TC-CO-1L'),
  ('00000000-0000-0000-0001-100000000020', '500 ml', 600, 100, 'TC-CO-500ML'),
  ('00000000-0000-0000-0001-100000000020', '250 ml', 300, 100, 'TC-CO-250ML'),

  -- Achaar & Chutneys
  ('00000000-0000-0000-0001-100000000021', '400 g', 200, 100, 'TC-LA-400G'),
  ('00000000-0000-0000-0001-100000000022', '400 g', 280, 100, 'TC-GA-400G'),
  ('00000000-0000-0000-0001-100000000023', '400 g', 200, 100, 'TC-GCA-400G'),
  ('00000000-0000-0000-0001-100000000024', '300 g', 200, 100, 'TC-PC-300G'),
  ('00000000-0000-0000-0001-100000000025', '300 g', 250, 100, 'TC-RCD-300G'),
  ('00000000-0000-0000-0001-100000000026', '300 g', 200, 100, 'TC-AC-300G'),
  ('00000000-0000-0000-0001-100000000027', '500 g', 160, 100, 'TC-TS-500G'),

  -- Masalas & Tea
  ('00000000-0000-0000-0001-100000000028', '50 g', 100, 100, 'TC-CM-50G'),
  ('00000000-0000-0000-0001-100000000029', '200 g', 200, 100, 'TC-GM-200G'),
  ('00000000-0000-0000-0001-100000000030', '1 kg', 600, 100, 'TC-CP-1KG'),

  -- Sharbat, Gulkand & Honey
  ('00000000-0000-0000-0001-100000000031', '750 ml', 270, 100, 'TC-RS-750ML'),
  ('00000000-0000-0000-0001-100000000032', '750 ml', 250, 100, 'TC-BS-750ML'),
  ('00000000-0000-0000-0001-100000000033', '750 ml', 300, 100, 'TC-PS-750ML'),
  ('00000000-0000-0000-0001-100000000034', '1 kg', 800, 100, 'TC-MH-1KG'),
  ('00000000-0000-0000-0001-100000000035', '500 g', 300, 100, 'TC-MG-500G');

COMMIT;
