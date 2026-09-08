import pg from 'pg';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn('[db] WARNING: DATABASE_URL environment variable is missing!');
}

function parseDbUrl(urlStr: string) {
  try {
    const parsed = new URL(urlStr);
    return {
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      host: parsed.hostname,
      port: Number(parsed.port) || 5432,
      database: parsed.pathname.replace(/^\//, ''),
    };
  } catch {
    return null;
  }
}

async function resolveHostWithFallback(hostname: string): Promise<string> {
  if (!hostname || hostname === 'localhost' || hostname === '127.0.0.1') {
    return hostname;
  }

  // 1. Try standard system DNS first
  try {
    const addrs = await dns.promises.resolve4(hostname);
    if (addrs && addrs.length > 0) return hostname;
  } catch {
    // System ISP DNS (e.g. Jio) failed to resolve
  }

  // 2. Fallback to public DNS servers (8.8.8.8, 1.1.1.1) for local ISP issues
  try {
    const resolver = new dns.promises.Resolver();
    resolver.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
    const addrs = await resolver.resolve4(hostname);
    if (addrs && addrs.length > 0) return addrs[0];
  } catch (err: any) {
    console.warn('[db] Public DNS lookup failed:', err?.message);
  }

  return hostname;
}

let activePool: pg.Pool | null = null;

async function getPool(): Promise<pg.Pool> {
  if (activePool) return activePool;

  const connStr = process.env.DATABASE_URL || connectionString || '';
  if (!connStr) {
    throw new Error('DATABASE_URL environment variable is not configured.');
  }

  const parsed = parseDbUrl(connStr);
  const isLocal = parsed?.host === 'localhost' || parsed?.host === '127.0.0.1';

  if (isLocal || !parsed) {
    activePool = new Pool({
      connectionString: connStr,
      ssl: false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  } else {
    // Resolve host with fallback for ISP DNS blockages
    const resolvedIpOrHost = await resolveHostWithFallback(parsed.host);
    const useIp = resolvedIpOrHost !== parsed.host;

    if (useIp) {
      activePool = new Pool({
        host: resolvedIpOrHost,
        port: parsed.port,
        user: parsed.user,
        password: parsed.password,
        database: parsed.database,
        ssl: {
          rejectUnauthorized: false,
          servername: parsed.host,
        },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
    } else {
      activePool = new Pool({
        connectionString: connStr,
        ssl: { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
    }
  }

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
  let p: pg.Pool;
  try {
    p = await getPool();
    return await p.query(text, params);
  } catch (err: any) {
    if (
      err?.code === '57P01' ||
      err?.code === 'ECONNRESET' ||
      err?.code === 'ENOTFOUND' ||
      err?.code === 'EAI_AGAIN' ||
      err?.message?.includes('closed') ||
      err?.message?.includes('terminated') ||
      err?.message?.includes('ENOTFOUND')
    ) {
      console.warn('[db] Connection reset or ENOTFOUND. Resetting pool and retrying query...');
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




