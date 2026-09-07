import React, { useEffect, useState } from 'react';
import { useUIStore } from './store/useUIStore';
import { useProductStore } from './store/useProductStore';

// UI Preloader
import { LogoPreloader } from './components/ui/LogoPreloader';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { AuthModal } from './components/ui/AuthModal';

// Home Sections
import { HeroSection } from './components/home/HeroSection';
import { FeaturedCategories } from './components/home/FeaturedCategories';
import { BestSellers } from './components/home/BestSellers';
import { ProcessSection } from './components/home/ProcessSection';
import { Testimonials } from './components/home/Testimonials';

// Pages
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/pdp/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AccountPage } from './components/account/AccountPage';
import { AboutPage } from './components/info/AboutPage';
import { BlogsPage } from './components/info/BlogsPage';
import { ContactPage } from './components/info/ContactPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';

export const App: React.FC = () => {
  const currentPage = useUIStore((state) => state.currentPage);
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Initial catalog load
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Auto-sync catalog with the database so edits/deletes are reflected live
  useEffect(() => {
    const syncCatalog = () => fetchProducts(true);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') syncCatalog();
    };

    const intervalId = setInterval(syncCatalog, 30000);
    window.addEventListener('focus', syncCatalog);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', syncCatalog);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [fetchProducts]);


  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSection />
            <FeaturedCategories />
            <BestSellers />
            <ProcessSection />
            <Testimonials />
          </>
        );
      case 'shop':
        return <ShopPage />;
      case 'pdp':
        return <ProductDetailPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'about':
        return <AboutPage />;
      case 'blogs':
        return <BlogsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return (
          <>
            <HeroSection />
            <FeaturedCategories />
            <BestSellers />
            <ProcessSection />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#4A2B18] antialiased">
      {/* Brand Logo Preloader */}
      {!preloaderDone && <LogoPreloader onComplete={() => setPreloaderDone(true)} />}

      {/* Top Navbar */}
      <Navbar />

      {/* Main Dynamic Body */}
      <main className="flex-1">
        {renderPageContent()}
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Global Slide-Over Drawers & Modals */}
      <CartDrawer />
      <SearchModal />
      <AuthModal />
    </div>
  );
};

export default App;
