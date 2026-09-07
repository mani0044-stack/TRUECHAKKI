import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, ChevronRight, LogIn, UserPlus, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export const RegisterPage: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect if already logged in
  if (isAuthenticated) {
    navigateTo('account');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service & Privacy Policy to register.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Register user and initialize session in DB
      await login(name, email, phone);
      setIsSubmitting(false);
      navigateTo('account');
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20 pt-24">
      {/* Header Banner & Breadcrumb */}
      <div className="bg-[#FAF6EE] border-b border-[#E8DCCB] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#7C5C43]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#9A6B29] transition-colors">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#4A2B18]">Create Account</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            New Member Registration
          </h1>
          <p className="text-xs sm:text-sm text-[#7C5C43]">
            Create a True Chakki account to enjoy fresh milled grains and unrefined cold-pressed oils.
          </p>
        </div>
      </div>

      {/* Main Registration Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8DCCB] p-6 sm:p-10 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9A6B29] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#E8DCCB]">
                Start Your Journey
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A2B18]">
                Create Your Free Account
              </h2>
              <p className="text-xs text-[#7C5C43]">
                Fill in your details to set up your personal farm dashboard.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A2B18]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Aarav Sharma"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29] focus:bg-white transition-colors"
                  />
                </div>
              </div>

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

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A2B18]">
                  Mobile Number <span className="text-[#7C5C43] font-normal">(For order delivery SMS)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#4A2B18]">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7C5C43] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
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

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#9A6B29] rounded border-[#E8DCCB] cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-xs text-[#7C5C43] leading-normal cursor-pointer selection:bg-transparent">
                  I agree to True Chakki’s <span className="text-[#9A6B29] font-semibold underline">Terms of Service</span> and <span className="text-[#9A6B29] font-semibold underline">Privacy Policy</span>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isSubmitting ? 'Registering Account...' : 'Complete Registration'}</span>
              </button>
            </form>

            {/* Switch to Login link */}
            <div className="pt-4 border-t border-[#E8DCCB] text-center space-y-2">
              <p className="text-xs text-[#7C5C43]">Already registered with True Chakki?</p>
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="w-full py-3 px-6 bg-[#FAF6EE] hover:bg-[#F3E8D3] text-[#4A2B18] font-semibold text-xs rounded-full border border-[#E8DCCB] transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#9A6B29]" />
                <span>Sign In to Existing Account</span>
              </button>
            </div>
          </div>

          {/* Right Member Benefits Side Panel */}
          <div className="lg:col-span-5 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#9A6B29] font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Member Privileges</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B18]">
                Enjoy Pure Farm Fresh Staples
              </h3>
              <p className="text-xs text-[#7C5C43] leading-relaxed">
                Joining True Chakki gives you direct access to 100% natural, unadulterated food products milled on demand.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2B18]">Zero Preservative Guarantee</h4>
                    <p className="text-[11px] text-[#7C5C43]">Grain milled fresh per order without maida or bleaching.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2B18]">Family Pack Discounts</h4>
                    <p className="text-[11px] text-[#7C5C43]">Special pricing on 5kg & 10kg family staple flour bags.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2B18]">Saved Shipping Profiles</h4>
                    <p className="text-[11px] text-[#7C5C43]">Fast 1-tap checkout for regular household supplies.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#4A2B18]">Order History & Invoices</h4>
                    <p className="text-[11px] text-[#7C5C43]">Track shipments and view past tax receipts instantly.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-2xl border border-[#E8DCCB] text-center space-y-1">
              <span className="text-xs font-bold text-[#4A2B18] block">Trusted by 10,000+ Families</span>
              <p className="text-[11px] text-[#7C5C43]">Slow stone-milled goodness brought straight to your doorstep.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
