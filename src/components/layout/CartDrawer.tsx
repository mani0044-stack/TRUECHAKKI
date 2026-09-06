import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, getSubtotal, getShippingFee, getGrandTotal } = useCartStore();
  const navigateTo = useUIStore((state) => state.navigateTo);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const shippingFee = getShippingFee();
  const grandTotal = getGrandTotal();
  const freeShippingThreshold = 499;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    closeCart();
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Overlay */}
      <div 
        onClick={closeCart}
        className="fixed inset-0 bg-[#4A2B18]/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] text-[#4A2B18] shadow-2xl flex flex-col justify-between border-l border-[#E8DCCB]">
          
          {/* Cart Header */}
          <div className="p-6 bg-[#FAF6EE] border-b border-[#E8DCCB] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3E8D3] flex items-center justify-center text-[#9A6B29]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#4A2B18]">Your Shopping Bag</h2>
                <p className="text-xs text-[#7C5C43]">{items.length} {items.length === 1 ? 'item' : 'items'} selected</p>
              </div>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-[#4A2B18]/60 hover:text-[#4A2B18] hover:bg-[#F3E8D3] rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {subtotal > 0 && (
            <div className="px-6 py-3 bg-[#F4EFE6] border-b border-[#E8DCCB] text-xs">
              {subtotal >= freeShippingThreshold ? (
                <div className="flex items-center gap-2 text-[#9A6B29] font-medium">
                  <Truck className="w-4 h-4 text-[#9A6B29]" />
                  <span>🎉 Congratulations! You have unlocked <strong>FREE Shipping</strong>!</span>
                </div>
              ) : (
                <div>
                  <p className="text-[#4A2B18] mb-1.5 font-medium">
                    Add <span className="font-bold text-[#9A6B29]">₹{freeShippingThreshold - subtotal}</span> more to unlock <strong>FREE Shipping</strong>
                  </p>
                  <div className="w-full bg-[#E8DCCB] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#9A6B29] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center text-[#9A6B29]">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#4A2B18]">Your bag is currently empty</h3>
                <p className="text-sm text-[#7C5C43] max-w-xs mx-auto">
                  Experience the goodness of 100% natural, farm-fresh flour, cold-pressed oils & traditional pickles.
                </p>
                <button
                  onClick={() => { closeCart(); navigateTo('shop'); }}
                  className="mt-4 px-6 py-2.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-medium rounded-full transition-colors shadow-md text-sm"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-[#E8DCCB]/70 shadow-sm relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg bg-[#FAF6EE]"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif font-semibold text-sm text-[#4A2B18] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#7C5C43]/60 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="inline-block mt-0.5 text-xs text-[#9A6B29] font-medium bg-[#FAF4E8] px-2 py-0.5 rounded-md border border-[#E8DCCB]">
                        {item.selectedVariant.weightSize}
                      </span>
                    </div>

                    {/* Controls & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#E8DCCB] rounded-lg bg-[#FAF6EE] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#4A2B18] hover:bg-[#F3E8D3] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#4A2B18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#4A2B18] hover:bg-[#F3E8D3] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-semibold text-sm text-[#4A2B18]">
                          ₹{item.selectedVariant.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary & Checkout Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FAF6EE] border-t border-[#E8DCCB] space-y-4">
              <div className="space-y-2 text-sm text-[#7C5C43]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#4A2B18]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-[#4A2B18]">
                    {shippingFee === 0 ? <span className="text-green-700 font-semibold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="border-t border-[#E8DCCB] pt-2 flex justify-between text-base font-bold text-[#4A2B18]">
                  <span>Total Amount</span>
                  <span className="text-[#9A6B29] font-serif text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-6 bg-[#9A6B29] hover:bg-[#80561F] text-white font-medium rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg text-sm tracking-wide"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#7C5C43]/80 pt-1">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
