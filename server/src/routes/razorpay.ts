import { Router, Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

export const razorpayRouter = Router();

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_live_TcIZCXvK2Eq2oZ';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rgkiWAsSbuScyNqtJrV5XIUX';
  return new Razorpay({ key_id, key_secret });
};

// Helper to extract exact Razorpay SDK error descriptions
const extractRazorpayError = (error: any): string => {
  if (error?.error?.description) return error.error.description;
  if (error?.description) return error.description;
  if (error?.message) return error.message;
  if (typeof error === 'string') return error;
  return 'Razorpay order creation failed';
};

// POST /api/razorpay/create-order - Generate Razorpay Order
razorpayRouter.post('/create-order', async (req: Request, res: Response) => {
  const { amount, receipt } = req.body;

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ error: 'Valid payment amount is required' });
  }

  const amountInPaise = Math.round(Number(amount) * 100);
  const useMockEnv = process.env.RAZORPAY_USE_MOCK === 'true';

  if (useMockEnv) {
    console.log('[Razorpay] Using explicit Mock Payment mode as configured in env.');
    return res.json({
      id: `order_mock_${Date.now()}`,
      amount: amountInPaise,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockKey12345',
      isMock: true,
    });
  }

  try {
    const razorpay = getRazorpayInstance();
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_TcIZCXvK2Eq2oZ',
      isMock: false,
    });
  } catch (error: any) {
    const errorDetails = extractRazorpayError(error);
    const isAuthError = error?.statusCode === 401 || errorDetails.toLowerCase().includes('authentication failed');

    console.error('Razorpay create-order error:', {
      statusCode: error?.statusCode,
      details: errorDetails,
      rawError: error,
    });

    // In development or when fallback is allowed, provide a seamless mock fallback if API keys are unauthenticated
    const allowMockFallback = process.env.NODE_ENV !== 'production' || process.env.RAZORPAY_ALLOW_MOCK_FALLBACK === 'true';

    if (isAuthError && allowMockFallback) {
      console.warn('[Razorpay] Authentication failed with configured keys. Falling back to Mock Payment Order for testing/development.');
      return res.json({
        id: `order_mock_${Date.now()}`,
        amount: amountInPaise,
        currency: 'INR',
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mockKey12345',
        isMock: true,
        warning: 'Razorpay API credentials unauthenticated. Generated mock order for testing.',
      });
    }

    return res.status(isAuthError ? 401 : 500).json({
      error: isAuthError
        ? 'Razorpay Authentication Failed: Invalid Key ID or Key Secret configured in environment variables.'
        : 'Failed to create Razorpay payment order',
      details: errorDetails,
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

    // Handle Mock Order Verification
    if (
      razorpay_order_id.startsWith('order_mock_') ||
      razorpay_payment_id.startsWith('pay_mock_') ||
      razorpay_signature === 'mock_signature'
    ) {
      console.log('[Razorpay] Verified mock payment order:', razorpay_order_id);
      return res.json({
        success: true,
        message: 'Mock payment verified successfully',
        paymentId: razorpay_payment_id,
        isMock: true,
      });
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
    const errorDetails = extractRazorpayError(error);
    console.error('Razorpay verify-payment error:', error);
    res.status(500).json({ error: 'Payment verification failed', details: errorDetails });
  }
});

