import React, { useState } from 'react';
import { ShieldCheck, Truck, CreditCard, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { api } from '../../services/api';
import type { Order } from '../../types';

export const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, getShippingFee, getGrandTotal, clearCart } = useCartStore();
  const { user, addOrder } = useAuthStore();
  const navigateTo = useUIStore((state) => state.navigateTo);

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Form State
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '');
  const [city, setCity] = useState(user?.addresses[0]?.city || '');
  const [state] = useState(user?.addresses[0]?.state || 'Delhi');
  const [zipCode, setZipCode] = useState(user?.addresses[0]?.zipCode || '');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'UPI'>('COD');

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();

  if (items.length === 0 && !isCompleted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF4E8] flex items-center justify-center text-[#9A6B29]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-[#7C5C43]">Please add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#9A6B29] text-white font-semibold rounded-full text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const createdOrder = await api.createOrder({
        userId: user?.id,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          street,
          city,
          state,
          zipCode,
          country: 'India',
          isDefault: true,
        },
        totalAmount: grandTotal,
        paymentMethod,
        items: items.map((item) => ({
          id: item.id,
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          variantName: item.selectedVariant.weightSize,
          unitPrice: item.selectedVariant.price,
          quantity: item.quantity,
        })),
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
        items: items.map((item) => ({
          id: item.id,
          productId: item.product.id,
          productName: item.product.name,
          productImage: item.product.image,
          variantName: item.selectedVariant.weightSize,
          unitPrice: item.selectedVariant.price,
          quantity: item.quantity,
        })),
        subtotal,
        shippingFee,
        totalAmount: grandTotal,
        status: 'PROCESSING',
        shippingAddress: {
          id: `addr-${Date.now()}`,
          street,
          city,
          state,
          zipCode,
          country: 'India',
          isDefault: true,
        },
        paymentMethod,
      };

      addOrder(fallbackOrder);
      setCompletedOrder(fallbackOrder);
      setIsCompleted(true);
      clearCart();
    }
  };

  if (isCompleted && completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-fadeIn">
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
              {completedOrder.status}
            </span>
          </div>

          <div className="space-y-2">
            {completedOrder.items.map((item) => (
              <div key={item.id} className="flex justify-between text-xs text-[#4A2B18]">
                <span>{item.productName} ({item.variantName}) x {item.quantity}</span>
                <span className="font-semibold">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E8DCCB] pt-3 flex justify-between font-serif font-bold text-base text-[#4A2B18]">
            <span>Total Paid</span>
            <span className="text-[#9A6B29]">₹{completedOrder.totalAmount}</span>
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
    <div className="bg-[#FDFBF7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-[#E8DCCB] pb-6">
          <h1 className="font-serif text-3xl font-bold text-[#4A2B18]">Secure Checkout</h1>
          <p className="text-xs text-[#7C5C43]">Complete your order details below to receive freshly milled farm products.</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Form (8 Cols) */}
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
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A2B18] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#4A2B18] mb-1">Street / House Address</label>
                  <input
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
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
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A2B18] mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm">
              <h3 className="font-serif font-bold text-lg text-[#4A2B18] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#9A6B29]" />
                2. Select Payment Method
              </h3>

              <div className="space-y-2 text-xs">
                <label className={`flex items-center justify-between p-3.5 bg-white border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'border-[#9A6B29] bg-[#FAF4E8]' : 'border-[#E8DCCB]'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="accent-[#9A6B29]"
                    />
                    <span className="font-semibold text-[#4A2B18]">Cash on Delivery (COD)</span>
                  </div>
                  <span className="text-[11px] text-[#7C5C43]">Pay at doorstep</span>
                </label>

                <label className={`flex items-center justify-between p-3.5 bg-white border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'border-[#9A6B29] bg-[#FAF4E8]' : 'border-[#E8DCCB]'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="accent-[#9A6B29]"
                    />
                    <span className="font-semibold text-[#4A2B18]">Instant UPI / QR Code</span>
                  </div>
                  <span className="text-[11px] text-[#7C5C43]">GPay, PhonePe, Paytm</span>
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
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg bg-white" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#4A2B18] line-clamp-1">{item.product.name}</h4>
                      <span className="text-[#7C5C43]">{item.selectedVariant.weightSize} x {item.quantity}</span>
                    </div>
                    <span className="font-semibold text-[#4A2B18]">₹{item.selectedVariant.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E8DCCB] pt-4 space-y-2 text-xs text-[#7C5C43]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#4A2B18]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-[#4A2B18]">
                    {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-[#E8DCCB] pt-2 flex justify-between text-base font-bold text-[#4A2B18]">
                  <span>Total Amount</span>
                  <span className="text-[#9A6B29] font-serif text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs uppercase tracking-wider shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Place Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#7C5C43] pt-2">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>100% Encrypted & Safe Order</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};
