import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] WARNING: DATABASE_URL environment variable is missing!');
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || connectionString,
  ssl: (process.env.DATABASE_URL || connectionString)?.includes('localhost')
    ? false
    : { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Suppress unhandled idle client errors
pool.on('error', (err) => {
  console.error('[db] PostgreSQL pool idle client error (handled):', err.message);
});

export const query = async (text: string, params?: any[]) => {
  const currentConn = process.env.DATABASE_URL || connectionString;
  if (!currentConn) {
    throw new Error('DATABASE_URL environment variable is not configured.');
  }

  try {
    return await pool.query(text, params);
  } catch (err: any) {
    // Retry once if connection was terminated by Neon pooler or idle timeout
    if (
      err?.code === '57P01' ||
      err?.code === 'ECONNRESET' ||
      err?.message?.includes('closed') ||
      err?.message?.includes('terminated')
    ) {
      console.warn('[db] PostgreSQL connection reset. Retrying query...');
      return await pool.query(text, params);
    }
    throw err;
  }
};

export const getClient = () => pool.connect();


