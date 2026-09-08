import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productRouter } from './routes/products';
import { authRouter } from './routes/auth';
import { orderRouter } from './routes/orders';
import { categoryRouter } from './routes/categories';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const getHealthResponse = () => ({
  status: 'ok',
  service: 'True Chakki Express Backend',
  database: 'Neon PostgreSQL (pg driver / raw SQL)',
  timestamp: new Date().toISOString(),
});

// Root & Health Endpoints
app.get('/', (_req, res) => {
  res.json({
    message: 'True Chakki Express API Server is running',
    health: '/api/health',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      orders: '/api/orders',
      categories: '/api/categories',
    },
  });
});

app.get('/api/health', (_req, res) => res.json(getHealthResponse()));
app.get('/health', (_req, res) => res.json(getHealthResponse()));

// API Routes (mounted with and without /api prefix for Vercel serverless rewrite compatibility)
app.use('/api/products', productRouter);
app.use('/products', productRouter);

app.use('/api/auth', authRouter);
app.use('/auth', authRouter);

app.use('/api/orders', orderRouter);
app.use('/orders', orderRouter);

app.use('/api/categories', categoryRouter);
app.use('/categories', categoryRouter);

// Global Error Handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err?.message || 'Unknown error' });
});

export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[server] True Chakki backend running at http://localhost:${PORT}`);
  });
}


