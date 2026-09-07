import { create } from 'zustand';

export type PageView = 'home' | 'shop' | 'pdp' | 'checkout' | 'account' | 'about' | 'contact' | 'blogs' | 'login' | 'register';

export const parseLocationToState = (pathname: string): { page: PageView; productSlug: string | null } => {
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (cleanPath === '' || cleanPath === '/') {
    return { page: 'home', productSlug: null };
  }
  if (cleanPath === '/shop') {
    return { page: 'shop', productSlug: null };
  }
  if (cleanPath.startsWith('/product/')) {
    const slug = cleanPath.replace('/product/', '').trim();
    if (slug) {
      return { page: 'pdp', productSlug: slug };
    }
  }
  if (cleanPath.startsWith('/pdp/')) {
    const slug = cleanPath.replace('/pdp/', '').trim();
    if (slug) {
      return { page: 'pdp', productSlug: slug };
    }
  }
  if (cleanPath === '/checkout') {
    return { page: 'checkout', productSlug: null };
  }
  if (cleanPath === '/account') {
    return { page: 'account', productSlug: null };
  }
  if (cleanPath === '/about') {
    return { page: 'about', productSlug: null };
  }
  if (cleanPath === '/blogs') {
    return { page: 'blogs', productSlug: null };
  }
  if (cleanPath === '/contact') {
    return { page: 'contact', productSlug: null };
  }
  if (cleanPath === '/login') {
    return { page: 'login', productSlug: null };
  }
  if (cleanPath === '/register') {
    return { page: 'register', productSlug: null };
  }

  return { page: 'home', productSlug: null };
};

export const getPageURL = (page: PageView, productSlug?: string): string => {
  switch (page) {
    case 'home':
      return '/';
    case 'shop':
      return '/shop';
    case 'pdp':
      return productSlug ? `/product/${productSlug}` : '/shop';
    case 'checkout':
      return '/checkout';
    case 'account':
      return '/account';
    case 'about':
      return '/about';
    case 'blogs':
      return '/blogs';
    case 'contact':
      return '/contact';
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    default:
      return '/';
  }
};

interface UIState {
  currentPage: PageView;
  activeProductSlug: string | null;
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  activeCategoryDropdown: boolean;
  
  // Actions
  navigateTo: (page: PageView, productSlug?: string) => void;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  setCategoryDropdown: (open: boolean) => void;
}

const initialRoute = typeof window !== 'undefined'
  ? parseLocationToState(window.location.pathname)
  : { page: 'home' as PageView, productSlug: null };

export const useUIStore = create<UIState>((set) => ({
  currentPage: initialRoute.page,
  activeProductSlug: initialRoute.productSlug,
  isSearchOpen: false,
  isAuthModalOpen: false,
  activeCategoryDropdown: false,

  navigateTo: (page: PageView, productSlug?: string) => {
    const targetUrl = getPageURL(page, productSlug);
    if (typeof window !== 'undefined' && window.location.pathname !== targetUrl) {
      window.history.pushState({ page, productSlug }, '', targetUrl);
    }
    set({
      currentPage: page,
      activeProductSlug: productSlug || null,
      isSearchOpen: false,
      activeCategoryDropdown: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setCategoryDropdown: (open: boolean) => set({ activeCategoryDropdown: open }),
}));

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    const route = parseLocationToState(window.location.pathname);
    useUIStore.setState({
      currentPage: route.page,
      activeProductSlug: route.productSlug,
      isSearchOpen: false,
      activeCategoryDropdown: false,
    });
  });
}

