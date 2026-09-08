import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] WARNING: DATABASE_URL environment variable is missing!');
}

let activePool: pg.Pool | null = null;

async function getPool(): Promise<pg.Pool> {
  if (activePool) return activePool;

  const connStr = process.env.DATABASE_URL || connectionString || '';
  if (!connStr) {
    throw new Error('DATABASE_URL environment variable is not configured.');
  }

  const isLocal = connStr.includes('localhost') || connStr.includes('127.0.0.1');

  activePool = new Pool({
    connectionString: connStr,
    ssl: isLocal ? false : { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });

  activePool.on('error', (err) => {
    console.error('[db] PostgreSQL pool idle client error (handled):', err.message);
  });

  return activePool;
}

export const pool = new Proxy({} as pg.Pool, {
  get(_target, prop) {
    if (prop === 'query') {
      return async (...args: any[]) => {
        const p = await getPool();
        return (p.query as any)(...args);
      };
    }
    if (prop === 'connect') {
      return async () => {
        const p = await getPool();
        return p.connect();
      };
    }
    if (prop === 'end') {
      return async () => {
        if (activePool) {
          const p = activePool;
          activePool = null;
          return p.end();
        }
      };
    }
    return async (...args: any[]) => {
      const p = await getPool();
      return (p as any)[prop]?.(...args);
    };
  },
});

export const query = async (text: string, params?: any[]) => {
  const p = await getPool();
  try {
    return await p.query(text, params);
  } catch (err: any) {
    if (
      err?.code === '57P01' ||
      err?.code === 'ECONNRESET' ||
      err?.code === 'ENOTFOUND' ||
      err?.message?.includes('closed') ||
      err?.message?.includes('terminated')
    ) {
      console.warn('[db] Connection reset/error. Resetting pool and retrying query...');
      activePool = null;
      const retryPool = await getPool();
      return await retryPool.query(text, params);
    }
    throw err;
  }
};

export const getClient = async () => {
  const p = await getPool();
  return p.connect();
};



