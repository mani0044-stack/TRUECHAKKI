import React, { useState } from 'react';
import { X, User, Mail, Lock, LogOut, Package, MapPin, CheckCircle, ChevronRight, ShieldCheck } from 'lucide-react';

import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, navigateTo } = useUIStore();
  const { user, isAuthenticated, login, logout, orders } = useAuthStore();

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(name || 'Valued Customer', email);
      closeAuthModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-20">
      {/* Backdrop */}
      <div 
        onClick={closeAuthModal}
        className="fixed inset-0 bg-[#4A2B18]/50 backdrop-blur-sm transition-opacity"
      />

      <div className="relative max-w-md mx-auto bg-[#FDFBF7] rounded-3xl border border-[#E8DCCB] shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Header */}
        <div className="p-6 bg-[#FAF6EE] border-b border-[#E8DCCB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F3E8D3] flex items-center justify-center text-[#9A6B29]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B18]">
                {isAuthenticated ? 'My Account' : (isRegister ? 'Create Account' : 'Welcome Back')}
              </h3>
              <p className="text-xs text-[#7C5C43]">
                {isAuthenticated ? 'Manage orders & farm profile' : 'Experience true natural purity'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-2 text-[#4A2B18]/60 hover:text-[#4A2B18] hover:bg-[#E8DCCB]/50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isAuthenticated && user ? (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-4 bg-white border border-[#E8DCCB] rounded-2xl space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#4A2B18]">{user.name}</h4>
                    <p className="text-xs text-[#7C5C43]">{user.email}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified Member
                  </span>
                </div>
              </div>

              {/* Order Quick Action */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase font-semibold text-[#7C5C43] tracking-wider">
                  Quick Actions
                </h5>
                {(user.role === 'ADMIN' || user.email === 'admin@truechakki.com') && (
                  <button
                    onClick={() => { closeAuthModal(); navigateTo('admin'); }}
                    className="w-full p-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl flex items-center justify-between text-xs font-semibold text-purple-900 transition-colors shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-700" />
                      <span>Open Admin Control Panel</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-purple-700" />
                  </button>
                )}
                <button
                  onClick={() => { closeAuthModal(); navigateTo('account'); }}
                  className="w-full p-3 bg-[#FAF4E8] hover:bg-[#F3E8D3] border border-[#E8DCCB] rounded-xl flex items-center justify-between text-xs font-semibold text-[#4A2B18] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#9A6B29]" />
                    <span>View Order History ({orders.length})</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9A6B29]" />
                </button>
                <button
                  onClick={() => { closeAuthModal(); navigateTo('account'); }}
                  className="w-full p-3 bg-[#FAF4E8] hover:bg-[#F3E8D3] border border-[#E8DCCB] rounded-xl flex items-center justify-between text-xs font-semibold text-[#4A2B18] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#9A6B29]" />
                    <span>Saved Delivery Addresses</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9A6B29]" />
                </button>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => logout()}
                className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-semibold rounded-full text-xs transition-colors flex items-center justify-center gap-2 border border-red-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-semibold text-[#4A2B18] mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7C5C43] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarav Sharma"
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#4A2B18] mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7C5C43] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A2B18] mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7C5C43] absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8DCCB] rounded-xl text-xs text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs transition-colors shadow-md mt-2"
              >
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-[#9A6B29] hover:underline font-medium"
                >
                  {isRegister ? 'Already have an account? Sign In' : 'New to True Chakki? Create an Account'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
