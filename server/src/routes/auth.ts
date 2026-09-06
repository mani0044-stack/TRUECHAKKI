import { Router, Request, Response } from 'express';
import { query } from '../db/index.js';

export const authRouter = Router();

// POST /api/auth/login - Register or login user with PostgreSQL
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Check if user exists
    let userRes = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    let user = userRes.rows[0];

    if (!user) {
      const newUserRes = await query(
        `INSERT INTO users (email, name, phone)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [email, name || email.split('@')[0], phone || null]
      );
      user = newUserRes.rows[0];
    }

    // Fetch user addresses
    const addrRes = await query(`SELECT * FROM addresses WHERE user_id = $1`, [user.id]);

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || undefined,
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
      token: `mock-jwt-token-${user.id}`,
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Authentication failed', details: error.message });
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
