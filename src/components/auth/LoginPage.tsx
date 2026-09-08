import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Truck, RotateCcw, ChevronRight, UserCheck, ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export const LoginPage: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const user = useAuthStore((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already authenticated, redirect to appropriate panel
  if (isAuthenticated) {
    if (user?.role === 'ADMIN' || user?.email === 'admin@truechakki.com') {
      navigateTo('admin');
    } else {
      navigateTo('account');
    }
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Extract a default user name from email if needed
      const defaultName = email.split('@')[0].replace(/[._]/g, ' ');
      const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
      
      await login(formattedName, email, password);
      setIsSubmitting(false);

      const currentUser = useAuthStore.getState().user;
      if (email.toLowerCase().trim() === 'admin@truechakki.com' || currentUser?.role === 'ADMIN') {
        navigateTo('admin');
      } else {
        navigateTo('account');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20 pt-24 sm:pt-28">
      {/* Header Banner & Breadcrumb */}
      <div className="bg-[#FAF6EE] border-b border-[#E8DCCB] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#7C5C43]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#9A6B29] transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#4A2B18]">Sign In</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            Customer Account Login
          </h1>
          <p className="text-xs sm:text-sm text-[#7C5C43]">
            Access your orders, saved addresses, and fresh mill subscriptions.
          </p>
        </div>
      </div>

      {/* Main Login Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DCCB] p-6 sm:p-10 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A6B29] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#E8DCCB]">
                Welcome Back
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B18]">
                Sign In to Your Account
              </h2>
              <p className="text-xs text-[#7C5C43]">
                Enter your registered email address and password below.
              </p>
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-medium space-y-2">
                <p className="font-semibold">{errorMessage}</p>
                {errorMessage.toLowerCase().includes('register') && (
                  <button
                    type="button"
                    onClick={() => navigateTo('register')}
                    className="mt-1 px-4 py-2 bg-[#9A6B29] hover:bg-[#80561F] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Create New Account Now</span>
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A2B18]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#4A2B18]">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Please contact support or register a new account to reset password.')}
                    className="text-[11px] font-semibold text-[#9A6B29] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29] focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#7C5C43] hover:text-[#4A2B18]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#9A6B29] rounded border-[#E8DCCB] cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs text-[#7C5C43] cursor-pointer selection:bg-transparent">
                  Keep me signed in on this device
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Switch to Register link */}
            <div className="pt-4 border-t border-[#E8DCCB] text-center space-y-2">
              <p className="text-xs text-[#7C5C43]">Don't have a True Chakki account yet?</p>
              <button
                type="button"
                onClick={() => navigateTo('register')}
                className="w-full py-3 px-6 bg-[#FAF6EE] hover:bg-[#F3E8D3] text-[#4A2B18] font-semibold text-xs rounded-full border border-[#E8DCCB] transition-colors flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-[#9A6B29]" />
                <span>Create New Account</span>
              </button>
            </div>
          </div>

          {/* Right Benefits Side Panel */}
          <div className="lg:col-span-5 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#4A2B18]">
                Why Join the True Chakki Family?
              </h3>
              <p className="text-xs text-[#7C5C43] leading-relaxed">
                Experience 100% pure stone-milled flours, cold-pressed Kachi Ghani oils, and heritage pickles delivered straight from traditional farms.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-[#E8DCCB]">
                  <div className="p-2.5 bg-[#FAF4E8] rounded-xl text-[#9A6B29] shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#4A2B18]">Fresh Milling & Fast Delivery</h4>
                    <p className="text-[11px] text-[#7C5C43]">Grains ground slow on order to maintain maximum bran and nutrients.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-[#E8DCCB]">
                  <div className="p-2.5 bg-[#FAF4E8] rounded-xl text-[#9A6B29] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#4A2B18]">100% Lab Tested Purity</h4>
                    <p className="text-[11px] text-[#7C5C43]">Zero chemical preservatives, zero maida, and zero artificial dyes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 rounded-2xl border border-[#E8DCCB]">
                  <div className="p-2.5 bg-[#FAF4E8] rounded-xl text-[#9A6B29] shrink-0">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#4A2B18]">One-Click Order Tracking</h4>
                    <p className="text-[11px] text-[#7C5C43]">Easily re-order your staple flour & oil subscriptions anytime.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#9A6B29]/10 rounded-2xl border border-[#9A6B29]/20 text-center space-y-1">
              <span className="font-serif text-sm font-bold text-[#4A2B18]">Need Assistance?</span>
              <p className="text-[11px] text-[#7C5C43]">Contact our farm support at support@truechakki.com or +91 98765 43210</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
