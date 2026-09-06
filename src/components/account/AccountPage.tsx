import React from 'react';
import { Package, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useUIStore } from '../../store/useUIStore';

export const AccountPage: React.FC = () => {
  const { user, orders, logout } = useAuthStore();
  const navigateTo = useUIStore((state) => state.navigateTo);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Account Access Required</h2>
        <p className="text-xs text-[#7C5C43]">Please sign in to view your orders and saved delivery addresses.</p>
        <button
          onClick={() => useUIStore.getState().openAuthModal()}
          className="px-6 py-2.5 bg-[#9A6B29] text-white font-semibold rounded-full text-xs"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border border-[#E8DCCB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#F3E8D3] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] font-serif text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-[#4A2B18]">{user.name}</h1>
              <p className="text-xs text-[#7C5C43]">{user.email} • {user.phone}</p>
            </div>
          </div>

          <button
            onClick={() => { logout(); navigateTo('home'); }}
            className="px-4 py-2 border border-[#E8DCCB] text-[#4A2B18] hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-full text-xs font-semibold transition-colors self-start sm:self-auto"
          >
            Sign Out
          </button>
        </div>

        {/* Saved Addresses & Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Saved Address Col */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#FAF6EE] p-6 rounded-3xl border border-[#E8DCCB] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#4A2B18] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9A6B29]" />
                Saved Delivery Addresses
              </h3>

              {user.addresses.map((addr) => (
                <div key={addr.id} className="p-3 bg-white border border-[#E8DCCB] rounded-xl text-xs space-y-1">
                  <span className="font-semibold text-[#4A2B18] block">Primary Address</span>
                  <p className="text-[#7C5C43] leading-relaxed">
                    {addr.street}, {addr.city}, {addr.state} - {addr.zipCode}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Orders History Col */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#4A2B18] flex items-center gap-2">
              <Package className="w-5 h-5 text-[#9A6B29]" />
              Order History ({orders.length})
            </h3>

            {orders.length === 0 ? (
              <div className="p-8 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] text-center text-xs text-[#7C5C43]">
                No previous orders found.
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
                        <span className="font-semibold">₹{item.unitPrice * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E8DCCB] pt-3 flex justify-between text-xs font-bold text-[#4A2B18]">
                    <span>Total Amount Paid</span>
                    <span className="text-[#9A6B29] font-serif text-sm">₹{order.totalAmount}</span>
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
