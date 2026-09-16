import fs from 'fs';
import path from 'path';
import { pool } from './index.js';

async function main() {
  console.log('[seed] Starting direct SQL database setup & seed...');

  // 1. Run DDL schema
  const schemaPath = path.join(process.cwd(), 'server', 'src', 'db', 'schema.sql');
  const ddlSql = fs.readFileSync(schemaPath, 'utf-8');
  await pool.query(ddlSql);
  console.log('[seed] DDL schema initialized');

  // 2. Run seed.sql file
  const seedSqlPath = path.join(process.cwd(), 'server', 'src', 'db', 'seed.sql');
  const seedSql = fs.readFileSync(seedSqlPath, 'utf-8');
  await pool.query(seedSql);
  console.log('[seed] Seeded categories, products, and variants from seed.sql successfully!');

  // 3. Seed Admin User Credentials
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255)`);
  await pool.query(
    `INSERT INTO users (email, password, name, role)
     VALUES ('admin@truechakki.com', 'admin123', 'True Chakki Admin', 'ADMIN')
     ON CONFLICT (email) DO UPDATE SET password = 'admin123', role = 'ADMIN'`
  );
  console.log('[seed] Admin credentials seeded: admin@truechakki.com / admin123');

  console.log('[seed] Direct SQL Database Setup & Seed completed successfully!');
}

main()
  .catch((err) => {
    console.error('[seed] SQL database setup error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
