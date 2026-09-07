import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

export const authRouter = Router();

// POST /api/auth/login - Login existing user with PostgreSQL
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const isAdminEmail = email.toLowerCase() === 'admin@truechakki.com';

    // Check if user exists
    let userRes = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    let user = userRes.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Account does not exist. Please register first.' });
    }

    // Validate password if stored in DB
    if (user.password && password && user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    if (!user.password && password) {
      await query(`UPDATE users SET password = $1 WHERE id = $2`, [password, user.id]);
    }

    // Check if user is admin
    const isAdmin = isAdminEmail || user.role === 'ADMIN';
    const userRole = isAdmin ? 'ADMIN' : 'CUSTOMER';

    if (isAdmin && user.role !== 'ADMIN') {
      await query(`UPDATE users SET role = 'ADMIN' WHERE id = $1`, [user.id]);
    }

    // Fetch user addresses
    const addrRes = await query(`SELECT * FROM addresses WHERE user_id = $1`, [user.id]);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || undefined,
        role: userRole,
        addresses: addrRes.rows.map((a) => ({
          id: a.id,
          street: a.street,
          city: a.city,
          state: a.state,
          zipCode: a.zip_code,
          country: a.country,
          isDefault: a.is_default,
        })),
      },
      token: `jwt-token-${user.id}`,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

// POST /api/auth/register - Register new user in PostgreSQL
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const isAdminEmail = email.toLowerCase() === 'admin@truechakki.com';

    // Check if user already exists
    let existingRes = await query(`SELECT id FROM users WHERE email = $1`, [email]);
    if (existingRes.rows.length > 0) {
      return res.status(400).json({ error: 'Account already exists. Please sign in instead.' });
    }

    const userRole = isAdminEmail ? 'ADMIN' : 'CUSTOMER';
    const newUserRes = await query(
      `INSERT INTO users (email, password, name, phone, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [email, password || null, name, phone || null, userRole]
    );

    const user = newUserRes.rows[0];

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || undefined,
        role: userRole,
        addresses: [],
      },
      token: `jwt-token-${user.id}`,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
});

// POST /api/auth/address - Add new address for user
authRouter.post('/address', async (req: Request, res: Response) => {
  try {
    const { userId, street, city, state, zipCode, country, isDefault } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const result = await query(
      `INSERT INTO addresses (user_id, street, city, state, zip_code, country, is_default)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userId, street, city, state, zipCode, country || 'India', isDefault || false]
    );

    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ error: 'Failed to add address', details: error.message });
  }
});

// GET /api/auth/users - Get all users for admin
authRouter.get('/users', async (_req: Request, res: Response) => {
  try {
    const result = await query(`
      SELECT 
        u.*,
        COUNT(o.id)::int AS order_count
      FROM users u
      LEFT JOIN orders o ON o.user_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);
    res.json(result.rows.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role || 'CUSTOMER',
      createdAt: u.created_at,
      orderCount: u.order_count || 0
    })));
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
});

