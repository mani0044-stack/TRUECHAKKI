import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export const razorpayRouter = Router();

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_live_TcIZCXvK2Eq2oZ';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rgkiWAsSbuScyNqtJrV5XIUX';
  return new Razorpay({ key_id, key_secret });
};

// POST /api/razorpay/create-order - Generate Razorpay Order
razorpayRouter.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { amount, receipt } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid payment amount is required' });
    }

    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.round(Number(amount) * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_TcIZCXvK2Eq2oZ',
    });
  } catch (error: any) {
    console.error('Razorpay create-order error:', error);
    res.status(500).json({
      error: 'Failed to create Razorpay payment order',
      details: error?.message || 'Razorpay order creation failed',
    });
  }
});

// POST /api/razorpay/verify-payment - Verify HMAC SHA256 Signature
razorpayRouter.post('/verify-payment', async (req: Request, res: Response) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required Razorpay signature payload' });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || 'rgkiWAsSbuScyNqtJrV5XIUX';
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
      res.json({ success: true, message: 'Payment verified successfully', paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ success: false, error: 'Invalid Razorpay signature verification failed' });
    }
  } catch (error: any) {
    console.error('Razorpay verify-payment error:', error);
    res.status(500).json({ error: 'Payment verification failed', details: error?.message });
  }
});
