import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, Wheat, Droplets, Apple, Leaf, Check } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const Footer: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navigateTo = useUIStore((state) => state.navigateTo);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const categories = useProductStore((state) => state.categories);

  const defaultMessage = "Hello True Chakki! I would like to inquire about your 100% natural farm products.";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleWhatsAppClick = () => {
    const encodedMsg = encodeURIComponent(defaultMessage);
    showToast("Opening WhatsApp with pre-typed inquiry message...");
    window.open(`https://wa.me/919876543210?text=${encodedMsg}`, '_blank');
  };

  const handleInstagramClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(defaultMessage).catch(() => {});
    }
    showToast("Message copied to clipboard! Opening Instagram...");
    window.open('https://instagram.com/truechakki', '_blank');
  };

  const handleFacebookClick = () => {
    const encodedMsg = encodeURIComponent(defaultMessage);
    showToast("Opening Messenger with pre-typed inquiry message...");
    window.open(`https://m.me/truechakki?text=${encodedMsg}`, '_blank');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('shop');
  };

  return (
    <footer className="bg-[#351D0F] text-[#FAF4E8] pt-16 pb-8 border-t-4 border-[#9A6B29] text-center md:text-left relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#9A6B29] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-green-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FAF4E8]/15">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 cursor-pointer group justify-center md:justify-start"
            >
              <img
                src="/images/logo.png"
                alt="True Chakki Logo"
                className="h-12 sm:h-14 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF4E8] group-hover:text-[#CFB57F] transition-colors">
                True Chakki
              </span>
            </div>

            <p className="text-sm text-[#FAF4E8]/80 leading-relaxed max-w-sm">
              True Chakki brings you the goodness of traditional farming. 100% natural stone-ground flour, wood-pressed oils, and sun-cured pickles made with love and purity.
            </p>

            <div className="space-y-2 text-xs text-[#FAF4E8]/70 pt-2 flex flex-col items-center md:items-start">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-[#CFB57F] shrink-0" />
                <span>Farm Estate, NH-8, Gurugram, Haryana - 122001</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-[#CFB57F] shrink-0" />
                <span>+91 98765 43210 / 1800-TRUE-CHAKKI</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-[#CFB57F] shrink-0" />
                <span>care@truechakki.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg font-semibold text-[#CFB57F] border-b border-[#FAF4E8]/10 pb-2 w-full text-center md:text-left">
              Shop Categories
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF4E8]/80 w-full flex flex-col items-center md:items-start">
              <li>
                <button 
                  onClick={() => handleCategoryClick('all')} 
                  className="hover:text-[#CFB57F] transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <Leaf className="w-4 h-4 text-[#CFB57F] shrink-0" /> All Farm Fresh Products
                </button>
              </li>
              {categories.slice(0, 4).map((category, index) => {
                const icons = [Wheat, Droplets, Apple, Leaf];
                const Icon = icons[index % icons.length];
                return (
                  <li key={category.id}>
                    <button 
                      onClick={() => handleCategoryClick(category.slug)} 
                      className="hover:text-[#CFB57F] transition-colors flex items-center justify-center md:justify-start gap-2"
                    >
                      <Icon className="w-4 h-4 text-[#CFB57F] shrink-0" /> {category.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Customer Care & Quick Links */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg font-semibold text-[#CFB57F] border-b border-[#FAF4E8]/10 pb-2 w-full text-center md:text-left">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-[#FAF4E8]/80 w-full flex flex-col items-center md:items-start">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#CFB57F] transition-colors">
                  Our Farm Story & Process
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-[#CFB57F] transition-colors">
                  Healthy Lifestyle Blogs
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#CFB57F] transition-colors">
                  Contact & Store Locator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('login')} className="hover:text-[#CFB57F] transition-colors">
                  Customer Sign In / Login
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('register')} className="hover:text-[#CFB57F] transition-colors">
                  Create New Account
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#CFB57F] transition-colors">
                  My Account & Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Connect Simple Logos */}
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <h3 className="font-serif text-lg font-semibold text-[#CFB57F] border-b border-[#FAF4E8]/10 pb-2 w-full text-center md:text-left">
              Follow & Connect
            </h3>
            <p className="text-xs text-[#FAF4E8]/80 max-w-sm text-center md:text-left leading-relaxed">
              Connect directly with True Chakki on social media for quick farm inquiries & updates.
            </p>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              {/* WhatsApp Simple Logo */}
              <button
                onClick={handleWhatsAppClick}
                title="Chat on WhatsApp"
                className="w-12 h-12 rounded-full bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </button>

              {/* Instagram Simple Logo */}
              <button
                onClick={handleInstagramClick}
                title="Message on Instagram"
                className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FD1D1D]/20 via-[#E1306C]/20 to-[#833AB4]/20 hover:from-[#FD1D1D] hover:via-[#E1306C] hover:to-[#833AB4] text-[#E1306C] hover:text-white border border-[#E1306C]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </button>

              {/* Facebook Simple Logo */}
              <button
                onClick={handleFacebookClick}
                title="Connect on Facebook"
                className="w-12 h-12 rounded-full bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border border-[#1877F2]/40 flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md group cursor-pointer"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAF4E8]/60 text-center md:text-left">
          <p>© {new Date().getFullYear()} True Chakki Natural Organics Ltd. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>for natural & healthy living.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
