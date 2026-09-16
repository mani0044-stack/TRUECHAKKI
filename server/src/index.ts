import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productRouter } from './routes/products.js';
import { authRouter } from './routes/auth.js';
import { orderRouter } from './routes/orders.js';
import { categoryRouter } from './routes/categories.js';
import { razorpayRouter } from './routes/razorpay.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware & CORS Configuration
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

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

app.use('/api/razorpay', razorpayRouter);
app.use('/razorpay', razorpayRouter);

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


