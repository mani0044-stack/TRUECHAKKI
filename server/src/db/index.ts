import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('⚠️ WARNING: DATABASE_URL environment variable is missing!');
}

export const pool = new Pool({
  connectionString,
  ssl: connectionString && !connectionString.includes('localhost')
    ? { rejectUnauthorized: false }
    : false,
});

export const query = (text: string, params?: any[]) => {
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not configured in Vercel settings.');
  }
  return pool.query(text, params);
};

export const getClient = () => pool.connect();

