import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Heart, Wheat, Droplets, Apple, Leaf } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const navigateTo = useUIStore((state) => state.navigateTo);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const categories = useProductStore((state) => state.categories);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('shop');
  };

  return (
    <footer className="bg-[#351D0F] text-[#FAF4E8] pt-16 pb-8 border-t-4 border-[#9A6B29]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF4E8]/15">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF4E8]/10 border border-[#C59A3F]/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#FAF4E8" stroke="#9A6B29" strokeWidth="1.5" />
                  <path d="M12 28C12 28 14 20 20 20C26 20 28 28 28 28H12Z" fill="#9A6B29" />
                  <rect x="18" y="10" width="4" height="12" rx="2" fill="#4A2B18" transform="rotate(-15 18 10)" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FAF4E8]">
                true chakki
              </span>
            </div>

            <p className="text-sm text-[#FAF4E8]/80 leading-relaxed">
              True Chakki brings you the goodness of traditional farming. 100% natural stone-ground flour, wood-pressed oils, and sun-cured pickles made with love and purity.
            </p>

            <div className="space-y-2 text-xs text-[#FAF4E8]/70 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C59A3F]" />
                <span>Farm Estate, NH-8, Gurugram, Haryana - 122001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C59A3F]" />
                <span>+91 98765 43210 / 1800-TRUE-CHAKKI</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C59A3F]" />
                <span>care@truechakki.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#C59A3F] border-b border-[#FAF4E8]/10 pb-2">
              Shop Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF4E8]/80">
              <li>
                <button 
                  onClick={() => handleCategoryClick('all')} 
                  className="hover:text-[#C59A3F] transition-colors flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4 text-[#C59A3F]" /> All Farm Fresh Products
                </button>
              </li>
              {categories.slice(0, 4).map((category, index) => {
                const icons = [Wheat, Droplets, Apple, Leaf];
                const Icon = icons[index % icons.length];
                return (
                  <li key={category.id}>
                    <button 
                      onClick={() => handleCategoryClick(category.slug)} 
                      className="hover:text-[#C59A3F] transition-colors flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4 text-[#C59A3F]" /> {category.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Customer Care & Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#C59A3F] border-b border-[#FAF4E8]/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF4E8]/80">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#C59A3F] transition-colors">
                  Our Farm Story & Process
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-[#C59A3F] transition-colors">
                  Healthy Lifestyle Blogs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#C59A3F] transition-colors">
                  Contact & Store Locator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-[#C59A3F] transition-colors">
                  Customer Sign In / Login
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('register')} className="hover:text-[#C59A3F] transition-colors">
                  Create New Account
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#C59A3F] transition-colors">
                  My Account & Order Tracking
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#C59A3F] text-[#C59A3F] font-semibold transition-colors flex items-center gap-1">
                  <span>⚡ Store Admin Control Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#C59A3F] border-b border-[#FAF4E8]/10 pb-2">
              Join Our Farm Family
            </h3>
            <p className="text-xs text-[#FAF4E8]/80">
              Subscribe to get seasonal farm updates, exclusive recipes, and 10% off your first organic order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#9A6B29]/30 border border-[#C59A3F] rounded-xl flex items-center gap-2 text-xs text-[#FAF4E8]">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <span>Thank you! You are now subscribed to True Chakki farm updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full px-4 py-2.5 bg-[#FAF4E8]/10 border border-[#FAF4E8]/20 rounded-full text-xs text-[#FAF4E8] placeholder-[#FAF4E8]/50 focus:outline-none focus:border-[#C59A3F]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#9A6B29] hover:bg-[#C59A3F] text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF4E8]/60">
          <p>© {new Date().getFullYear()} True Chakki Natural Organics Ltd. All Rights Reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for natural & healthy living.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
