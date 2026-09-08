import React, { useState } from 'react';
import { Package, MapPin, ShieldCheck, Plus, ShoppingBag, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';
import { useCartStore } from '../../store/useCartStore';
import { useProductStore } from '../../store/useProductStore';
import type { Order } from '../../types';

export const AccountPage: React.FC = () => {
  const { user, orders, logout, addAddress } = useAuthStore();
  const navigateTo = useUIStore((state) => state.navigateTo);
  const openCart = useCartStore((state) => state.openCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartCount = useCartStore((state) => state.getTotalItemsCount());
  const products = useProductStore((state) => state.products);

  // Address Form State
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isSubmittingAddress, setIsSubmittingAddress] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Account Access Required</h2>
        <p className="text-xs text-[#7C5C43]">Please sign in to view your orders and saved delivery addresses.</p>
        <button
          onClick={() => useUIStore.getState().openAuthModal()}
          className="px-6 py-2.5 bg-[#9A6B29] text-white font-semibold rounded-full text-xs shadow-md hover:bg-[#80561F] transition-colors"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const isAdmin = user.role === 'ADMIN' || user.email === 'admin@truechakki.com';

  const handleAddAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!street || !city || !state || !zipCode) return;

    setIsSubmittingAddress(true);
    try {
      await addAddress({
        street,
        city,
        state,
        zipCode,
        country: 'India',
        isDefault: user.addresses.length === 0,
      });

      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setIsSubmittingAddress(false);
      setShowAddressForm(false);
      setAddressSuccess(true);
      setTimeout(() => setAddressSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to add address:', err);
      setIsSubmittingAddress(false);
    }
  };

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      // Find matching product in catalog
      const matchedProduct = products.find((p) => p.id === item.productId || p.name === item.productName);
      if (matchedProduct) {
        const matchedVariant = matchedProduct.variants.find((v) => v.weightSize === item.variantName) || matchedProduct.variants[0];
        addToCart(matchedProduct, matchedVariant, item.quantity);
      }
    });
    openCart();
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-28 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Admin Shortcut Banner */}
        {isAdmin && (
          <div className="p-5 bg-purple-50 border border-purple-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-100 rounded-2xl text-purple-800 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-purple-950">Administrator Account Privileges Active</h4>
                <p className="text-xs text-purple-700">You are logged in with full store administrative control.</p>
              </div>
            </div>
            <button
              onClick={() => navigateTo('admin')}
              className="px-5 py-2.5 bg-purple-800 hover:bg-purple-900 text-white text-xs font-bold rounded-xl transition-all shadow-md self-start sm:self-auto"
            >
              Open Admin Control Panel →
            </button>
          </div>
        )}

        {/* Header Bar with View Cart Action */}
        <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#F3E8D3] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] font-serif text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#4A2B18]">{user.name}</h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 text-[10px] font-extrabold uppercase rounded-full border border-purple-200">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-xs text-[#7C5C43]">{user.email} • {user.phone || 'Phone not set'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* View Shopping Cart Option */}
            <button
              onClick={openCart}
              className="px-4 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
              title="View your shopping cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Cart ({cartCount})</span>
            </button>

            <button
              onClick={() => { logout(); navigateTo('home'); }}
              className="px-4 py-2.5 border border-[#E8DCCB] text-[#4A2B18] hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-full text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Address Feedback Alert */}
        {addressSuccess && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-semibold rounded-2xl flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>New delivery address saved successfully to your account!</span>
          </div>
        )}

        {/* Saved Addresses & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Saved Address Col */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#4A2B18] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#9A6B29]" />
                  Delivery Addresses
                </h3>
                
                {/* Add Address Trigger */}
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="p-1.5 bg-[#9A6B29] hover:bg-[#80561F] text-white rounded-full transition-colors flex items-center gap-1 text-[11px] font-bold px-3"
                    title="Add a new delivery address"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                )}
              </div>

              {/* Inline Add Address Form */}
              {showAddressForm && (
                <form onSubmit={handleAddAddressSubmit} className="p-4 bg-white border border-[#E8DCCB] rounded-2xl space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-2">
                    <span className="text-xs font-bold text-[#4A2B18]">Add New Address</span>
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="text-[#7C5C43] hover:text-[#4A2B18]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A2B18] mb-1">Street / House No. *</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="e.g. Flat 402, Green Avenue"
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A2B18] mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. New Delhi"
                          className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#4A2B18] mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. Delhi"
                          className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A2B18] mb-1">Pincode / ZIP *</label>
                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="e.g. 110001"
                        className="w-full px-3 py-1.5 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmittingAddress}
                      className="flex-1 py-2 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                    >
                      {isSubmittingAddress ? 'Saving...' : 'Save Address'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddressForm(false)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Saved Address List */}
              {user.addresses.length === 0 ? (
                <div className="p-4 bg-white border border-[#E8DCCB] rounded-2xl text-center text-xs text-[#7C5C43]">
                  No delivery address added yet. Click "+ Add" above to save an address.
                </div>
              ) : (
                user.addresses.map((addr, idx) => (
                  <div key={addr.id || idx} className="p-3 bg-white border border-[#E8DCCB] rounded-2xl text-xs space-y-1 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#4A2B18] block">
                        {idx === 0 ? 'Primary Delivery Address' : `Address #${idx + 1}`}
                      </span>
                      {idx === 0 && (
                        <span className="text-[9px] bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-[#7C5C43] leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Orders History Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-xl text-[#4A2B18] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#9A6B29]" />
                Order History ({orders.length})
              </h3>
              
              <button
                onClick={openCart}
                className="text-xs font-bold text-[#9A6B29] hover:underline flex items-center gap-1"
              >
                <span>Open Cart</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] text-center space-y-3">
                <p className="text-xs text-[#7C5C43]">No previous orders found.</p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="px-5 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-semibold rounded-full shadow-sm"
                >
                  Explore Pure Products
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm">
                  <div className="flex justify-between items-start border-b border-[#E8DCCB] pb-3 text-xs">
                    <div>
                      <span className="font-serif font-bold text-sm text-[#4A2B18] block">{order.orderNumber}</span>
                      <span className="text-[#7C5C43]">Placed on {order.date}</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full text-[11px]">
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-[#4A2B18]">
                        <span>{item.productName} ({item.variantName}) x {item.quantity}</span>
                        <span className="font-bold font-price">₹{item.unitPrice * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E8DCCB] pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-[#7C5C43]">Total Amount Paid: </span>
                      <span className="text-[#9A6B29] font-price text-sm font-bold">₹{order.totalAmount}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-1.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Re-Order Items</span>
                      </button>
                      <button
                        onClick={openCart}
                        className="px-3.5 py-1.5 bg-white border border-[#E8DCCB] hover:bg-[#FAF4E8] text-[#4A2B18] font-semibold rounded-full text-xs transition-colors"
                      >
                        View Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountPage;
