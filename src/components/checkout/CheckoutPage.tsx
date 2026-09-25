import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ArrowRight, CheckCircle2, ShoppingBag, Loader2, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { api } from '../../services/api';
import type { Order } from '../../types';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// --- Input limits / validation helpers -------------------------------
const NAME_MAX_LENGTH = 50;
const STREET_MAX_LENGTH = 150;
const CITY_MAX_LENGTH = 50;
const PHONE_LENGTH = 10;
const PINCODE_LENGTH = 6;

// Letters, spaces, apostrophes and hyphens only (e.g. "Mary-Jane O'Neil")
const sanitizeName = (value: string) =>
  value.replace(/[^a-zA-Z\s'-]/g, '').slice(0, NAME_MAX_LENGTH);

// Digits only, capped at PHONE_LENGTH
const sanitizePhone = (value: string) =>
  value.replace(/\D/g, '').slice(0, PHONE_LENGTH);

// Digits only, capped at PINCODE_LENGTH
const sanitizePincode = (value: string) =>
  value.replace(/\D/g, '').slice(0, PINCODE_LENGTH);

export const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, getShippingFee, getGrandTotal, clearCart } = useCartStore();
  const { user, addOrder } = useAuthStore();
  const navigateTo = useUIStore((state) => state.navigateTo);

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '');
  const [city, setCity] = useState(user?.addresses[0]?.city || '');
  const [state] = useState(user?.addresses[0]?.state || 'Delhi');
  const [zipCode, setZipCode] = useState(user?.addresses[0]?.zipCode || '');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'COD' | 'CARD' | 'UPI'>('RAZORPAY');

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();

  // Basic front-end validity checks used to disable the submit button
  const isPhoneValid = phone.length === PHONE_LENGTH;
  const isPincodeValid = zipCode.length === PINCODE_LENGTH;
  const isNameValid = name.trim().length > 0;
  const isStreetValid = street.trim().length > 0;
  const isFormValid = isNameValid && isPhoneValid && isPincodeValid && isStreetValid;

  if (items.length === 0 && !isCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-28 sm:pt-32 pb-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF4E8] flex items-center justify-center text-[#9A6B29]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#7C5C43]">Please add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#9A6B29] text-white font-semibold rounded-full text-xs hover:bg-[#80561F] transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!isFormValid) {
      setPaymentError('Please check your name, mobile number, address and pincode before continuing.');
      return;
    }

    const shippingAddressObj = {
      id: `addr-${Date.now()}`,
      street,
      city,
      state,
      zipCode,
      country: 'India',
      isDefault: true,
    };

    const orderItems = items.map((item) => ({
      id: item.id,
      productId: item.product.id,
      productName: item.product.name,
      productImage: item.product.image,
      variantName: item.selectedVariant.weightSize,
      unitPrice: item.selectedVariant.price,
      quantity: item.quantity,
    }));

    if (paymentMethod === 'RAZORPAY') {
      setIsProcessing(true);
      try {
        // 1. Create Razorpay order via backend
        const razorpayData = await api.createRazorpayOrder(grandTotal, `receipt_${Date.now()}`);

        // Handle Mock Payment Fallback when keys are unauthenticated / mock mode active
        if (razorpayData.isMock) {
          console.warn('[Checkout] Processing mock Razorpay order:', razorpayData);
          
          // Verify mock payment signature on backend
          await api.verifyRazorpayPayment({
            razorpay_order_id: razorpayData.id,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: 'mock_signature',
          });

          // Save order to database
          const createdOrder = await api.createOrder({
            userId: user?.id,
            customerName: name,
            customerEmail: email,
            customerPhone: phone,
            shippingAddress: shippingAddressObj,
            totalAmount: grandTotal,
            paymentMethod: 'RAZORPAY',
            items: orderItems,
          });

          addOrder(createdOrder);
          setCompletedOrder(createdOrder);
          setIsCompleted(true);
          clearCart();
          setIsProcessing(false);
          return;
        }

        // Live/Test Razorpay JS SDK Flow
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Failed to load Razorpay payment SDK. Please check your internet connection.');
        }

        // Use the exact key the order was created with so the order_id matches the account
        const razorpayKey = razorpayData.keyId || import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
          throw new Error('Razorpay is not configured. Please contact support or use Cash on Delivery.');
        }

        // 2. Configure Razorpay checkout options
        const options = {
          key: razorpayKey,
          amount: razorpayData.amount,
          currency: razorpayData.currency || 'INR',
          name: 'True Chakki',
          description: 'Payment for Freshly Milled Flour & Farm Goods',
          image: '/images/logo.png',
          order_id: razorpayData.id,
          prefill: {
            name,
            email,
            contact: phone,
          },
          theme: {
            color: '#9A6B29',
          },
          handler: async function (response: any) {
            try {
              // 3. Verify payment signature on backend
              await api.verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              // 4. Save order to database upon successful payment verification
              const createdOrder = await api.createOrder({
                userId: user?.id,
                customerName: name,
                customerEmail: email,
                customerPhone: phone,
                shippingAddress: shippingAddressObj,
                totalAmount: grandTotal,
                paymentMethod: 'RAZORPAY',
                items: orderItems,
              });

              addOrder(createdOrder);
              setCompletedOrder(createdOrder);
              setIsCompleted(true);
              clearCart();
            } catch (err: any) {
              console.error('Razorpay verification error:', err);
              setPaymentError(err?.message || 'Payment verification failed. Please contact support.');
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.on('payment.failed', function (response: any) {
          console.error('Razorpay Payment Failed:', response.error);
          setPaymentError(`Payment failed: ${response.error.description || response.error.reason}`);
          setIsProcessing(false);
        });

        razorpayInstance.open();
      } catch (err: any) {
        console.error('Razorpay order creation error:', err);
        setPaymentError(err?.message || 'Failed to initialize Razorpay checkout. Please try again or use Cash on Delivery.');
        setIsProcessing(false);
      }
    } else {
      // Cash on Delivery Flow
      setIsProcessing(true);
      try {
        const createdOrder = await api.createOrder({
          userId: user?.id,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          shippingAddress: shippingAddressObj,
          totalAmount: grandTotal,
          paymentMethod: 'COD',
          items: orderItems,
        });

        addOrder(createdOrder);
        setCompletedOrder(createdOrder);
        setIsCompleted(true);
        clearCart();
      } catch (err: any) {
        console.error('Failed to create order via DB API:', err);
        const fallbackOrder: Order = {
          id: `ord-${Date.now()}`,
          orderNumber: `TC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
          date: new Date().toISOString().split('T')[0],
          items: orderItems,
          subtotal,
          shippingFee,
          totalAmount: grandTotal,
          status: 'PROCESSING',
          shippingAddress: shippingAddressObj,
          paymentMethod: 'COD',
        };

        addOrder(fallbackOrder);
        setCompletedOrder(fallbackOrder);
        setIsCompleted(true);
        clearCart();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (isCompleted && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-28 sm:pt-32 pb-16 text-center space-y-8 animate-fadeIn">
        <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto border-4 border-green-200 shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#9A6B29]">
            ORDER PLACED SUCCESSFULLY
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#4A2B18]">
            Thank You for Your Order!
          </h1>
          <p className="text-sm text-[#7C5C43]">
            Order reference number: <strong className="text-[#4A2B18]">{completedOrder.orderNumber}</strong>
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] text-left space-y-4 shadow-sm">
          <div className="flex justify-between items-center border-b border-[#E8DCCB] pb-3">
            <h3 className="font-serif font-bold text-base text-[#4A2B18]">Order Details</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
              {completedOrder.paymentMethod === 'RAZORPAY' ? 'PAID via Razorpay' : completedOrder.status}
            </span>
          </div>

          <div className="space-y-2">
            {completedOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-[#4A2B18]">
                <span>{item.productName} ({item.variantName}) x {item.quantity}</span>
                <span className="font-bold font-price">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E8DCCB] pt-3 flex justify-between font-serif font-bold text-base text-[#4A2B18]">
            <span>Total Paid</span>
            <span className="text-[#9A6B29] font-price font-bold text-lg">₹{completedOrder.totalAmount}</span>
          </div>

          <div className="text-xs text-[#7C5C43] pt-2 border-t border-[#E8DCCB]/60">
            <strong>Delivery Address:</strong>{' '}
            {typeof completedOrder.shippingAddress === 'object'
              ? `${completedOrder.shippingAddress.street}, ${completedOrder.shippingAddress.city}, ${completedOrder.shippingAddress.state} - ${completedOrder.shippingAddress.zipCode}`
              : completedOrder.shippingAddress}
          </div>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="px-8 py-3.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs uppercase tracking-wider shadow-lg transition-colors"
        >
          Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#E8DCCB] pb-6">
          <h1 className="font-serif text-3xl font-bold text-[#4A2B18]">Secure Checkout</h1>
          <p className="text-xs text-[#7C5C43]">Complete your order details below to receive freshly milled farm products.</p>
        </div>

        {/* Payment Error Alert */}
        {paymentError && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <div>
                <strong>Payment Notice:</strong> {paymentError}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setPaymentMethod('COD');
                setPaymentError(null);
              }}
              className="px-3.5 py-1.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-xl text-[11px] transition-colors whitespace-nowrap shadow-sm"
            >
              Switch to Cash on Delivery
            </button>
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Contact & Address */}
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#4A2B18] flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#9A6B29]" />
                1. Shipping Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(sanitizeName(e.target.value))}
                    maxLength={NAME_MAX_LENGTH}
                    pattern="[A-Za-z\s'-]+"
                    title="Only letters, spaces, apostrophes and hyphens are allowed"
                    placeholder="e.g. Priya Sharma"
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                    maxLength={PHONE_LENGTH}
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit mobile number"
                    placeholder="10-digit mobile number"
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                  {phone.length > 0 && !isPhoneValid && (
                    <p className="mt-1 text-[10px] text-red-600">Enter a valid 10-digit mobile number.</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A2B18] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={100}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A2B18] mb-1">Street / House Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value.slice(0, STREET_MAX_LENGTH))}
                    maxLength={STREET_MAX_LENGTH}
                    placeholder="House No., Street Name, Landmark"
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(sanitizeName(e.target.value).slice(0, CITY_MAX_LENGTH))}
                    maxLength={CITY_MAX_LENGTH}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    value={zipCode}
                    onChange={(e) => setZipCode(sanitizePincode(e.target.value))}
                    maxLength={PINCODE_LENGTH}
                    pattern="[0-9]{6}"
                    title="Enter a 6-digit pincode"
                    placeholder="6-digit pincode"
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                  {zipCode.length > 0 && !isPincodeValid && (
                    <p className="mt-1 text-[10px] text-red-600">Enter a valid 6-digit pincode.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#4A2B18] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#9A6B29]" />
                2. Select Payment Method
              </h3>

              <div className="space-y-3 text-xs">
                {/* Razorpay Online Gateway Option */}
                <label className={`flex items-center justify-between p-4 bg-white border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'border-[#9A6B29] bg-[#FAF4E8] shadow-sm' : 'border-[#E8DCCB] hover:border-[#9A6B29]/50'}`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'RAZORPAY'}
                      onChange={() => setPaymentMethod('RAZORPAY')}
                      className="accent-[#9A6B29] w-4 h-4"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#4A2B18] text-sm">Razorpay Secure Online Checkout</span>
                        <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Instant</span>
                      </div>
                      <p className="text-[11px] text-[#7C5C43] mt-0.5">UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, Netbanking & Wallets</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 opacity-80">
                    <span className="text-[10px] font-bold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">UPI</span>
                    <span className="text-[10px] font-bold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">Card</span>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className={`flex items-center justify-between p-4 bg-white border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-[#9A6B29] bg-[#FAF4E8]' : 'border-[#E8DCCB]'}`}>
                  <div className="flex items-center gap-3.5">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#9A6B29] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-[#4A2B18] text-sm">Cash on Delivery (COD)</span>
                      <p className="text-[11px] text-[#7C5C43]">Pay cash at your doorstep upon order delivery</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Order Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4 sticky top-28 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#4A2B18] border-b border-[#E8DCCB] pb-3">
                Order Summary ({items.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 text-xs">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg bg-white border border-gray-100" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#4A2B18] line-clamp-1">{item.product.name}</h4>
                      <span className="text-[#7C5C43]">{item.selectedVariant.weightSize} x {item.quantity}</span>
                    </div>
                    <span className="font-bold text-[#4A2B18] font-price">₹{item.selectedVariant.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8DCCB] pt-4 space-y-2 text-xs text-[#7C5C43]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#4A2B18] font-price">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-[#4A2B18]">
                    {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : <span className="font-price font-bold">₹{shippingFee}</span>}
                  </span>
                </div>
                <div className="border-t border-[#E8DCCB] pt-2 flex justify-between text-base font-bold text-[#4A2B18]">
                  <span>Total Amount</span>
                  <span className="text-[#9A6B29] font-price font-bold text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing || !isFormValid}
                className="w-full py-4 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>{paymentMethod === 'RAZORPAY' ? 'Proceed to Razorpay Payment' : 'Place Order Now'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#7C5C43] pt-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>100% Encrypted & Safe Razorpay Checkout</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};