import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productRouter } from './routes/products.js';
import { authRouter } from './routes/auth.js';
import { orderRouter } from './routes/orders.js';
import { categoryRouter } from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'True Chakki Express Backend (No Prisma)',
    database: 'Neon PostgreSQL (pg driver / raw SQL)',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/products', productRouter);
app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);

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

