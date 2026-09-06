import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';
import type { PageView } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = useCartStore((state) => state.getTotalItemsCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  const { currentPage, navigateTo, openSearch, openAuthModal } = useUIStore();
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    navigateTo('shop');
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks: { name: string; page: PageView; hasDropdown?: boolean }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Shop', page: 'shop' },
    { name: 'Categories', page: 'shop', hasDropdown: true },
    { name: 'About Us', page: 'about' },
    { name: 'Blogs', page: 'blogs' },
    { name: 'Contact', page: 'contact' },
  ];

  const isHome = currentPage === 'home';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled || !isHome
        ? 'bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#E8DCCB]/60 shadow-md'
        : 'bg-transparent border-b-0 shadow-none'
      }`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 sm:h-20' : 'h-20 sm:h-24'
        }`}>

        {/* Left: Brand Logo & Title */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-3 sm:gap-4 cursor-pointer group selection:bg-transparent shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="True Chakki Logo"
            className="h-12 sm:h-15 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
          />
          <span className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors whitespace-nowrap translate-y-1 sm:translate-y-1.5">
            True Chakki
          </span>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page && !(link.hasDropdown && dropdownOpen);

            if (link.hasDropdown) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => navigateTo('shop')}
                    className={`flex items-center gap-1 text-base font-medium py-2 transition-colors ${currentPage === 'shop' ? 'text-[#9A6B29] font-semibold' : 'text-[#4A2B18] hover:text-[#9A6B29]'
                      }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#9A6B29]' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 w-56 bg-[#FAF6EE] border border-[#E8DCCB] rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                      <button
                        onClick={() => handleCategorySelect('all')}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4A2B18] hover:bg-[#F3E8D3] hover:text-[#9A6B29] flex items-center gap-2 font-medium transition-colors"
                      >
                        <Leaf className="w-4 h-4 text-[#9A6B29]" />
                        All Farm Products
                      </button>
                      <button
                        onClick={() => handleCategorySelect('atta')}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4A2B18] hover:bg-[#F3E8D3] hover:text-[#9A6B29] flex items-center gap-2 transition-colors"
                      >
                        🌾 Stone Ground Atta
                      </button>
                      <button
                        onClick={() => handleCategorySelect('oils')}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4A2B18] hover:bg-[#F3E8D3] hover:text-[#9A6B29] flex items-center gap-2 transition-colors"
                      >
                        🏺 Cold-Pressed Oils
                      </button>
                      <button
                        onClick={() => handleCategorySelect('pickles')}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#4A2B18] hover:bg-[#F3E8D3] hover:text-[#9A6B29] flex items-center gap-2 transition-colors"
                      >
                        🌶️ Heritage Pickles
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.name}
                onClick={() => navigateTo(link.page)}
                className={`relative text-base font-medium py-1 transition-colors ${isActive ? 'text-[#4A2B18] font-semibold' : 'text-[#4A2B18]/80 hover:text-[#9A6B29]'
                  }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#4A2B18] rounded-full animate-scaleIn" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, User, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Trigger (Hidden on Mobile) */}
          <button
            onClick={openSearch}
            className="hidden sm:block p-2 text-[#4A2B18] hover:text-[#9A6B29] hover:bg-[#F3E8D3]/50 rounded-full transition-colors"
            title="Search products"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* User Account */}
          <button
            onClick={openAuthModal}
            className="p-2 text-[#4A2B18] hover:text-[#9A6B29] hover:bg-[#F3E8D3]/50 rounded-full transition-colors"
            title="Account"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* Cart Icon with Badge */}
          <button
            onClick={toggleCart}
            className="relative p-2 text-[#4A2B18] hover:text-[#9A6B29] hover:bg-[#F3E8D3]/50 rounded-full transition-colors"
            title="Cart"
          >
            <ShoppingBag className="w-5.5 h-5.5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 min-w-[20px] h-[20px] bg-[#9A6B29] text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-md animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#4A2B18] hover:text-[#9A6B29] rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6EE] border-b border-[#E8DCCB] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#4A2B18]"
          >
            Home
          </button>
          <button
            onClick={() => { navigateTo('shop'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#4A2B18]"
          >
            Shop All Products
          </button>
          <div className="pl-4 border-l-2 border-[#9A6B29]/30 space-y-2 py-1">
            <button onClick={() => handleCategorySelect('atta')} className="block text-sm text-[#4A2B18]/90 py-1">
              🌾 Stone Ground Atta
            </button>
            <button onClick={() => handleCategorySelect('oils')} className="block text-sm text-[#4A2B18]/90 py-1">
              🏺 Wood-Pressed Oils
            </button>
            <button onClick={() => handleCategorySelect('pickles')} className="block text-sm text-[#4A2B18]/90 py-1">
              🌶️ Traditional Pickles
            </button>
          </div>
          <button
            onClick={() => { navigateTo('about'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#4A2B18]"
          >
            About Us
          </button>
          <button
            onClick={() => { navigateTo('blogs'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#4A2B18]"
          >
            Blogs & Recipes
          </button>
          <button
            onClick={() => { navigateTo('contact'); setMobileMenuOpen(false); }}
            className="block w-full text-left py-2 font-medium text-[#4A2B18]"
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
};
