import { create } from 'zustand';

export type PageView = 'home' | 'shop' | 'pdp' | 'checkout' | 'account' | 'about' | 'contact' | 'blogs';

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

export const useUIStore = create<UIState>((set) => ({
  currentPage: 'home',
  activeProductSlug: null,
  isSearchOpen: false,
  isAuthModalOpen: false,
  activeCategoryDropdown: false,

  navigateTo: (page: PageView, productSlug?: string) => {
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
