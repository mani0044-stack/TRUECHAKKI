import { create } from 'zustand';
import type { Product, Category } from '../types';
import { api } from '../services/api';

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: (silent?: boolean) => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getFilteredProducts: () => Product[];
}

let productsInFlight = false;

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      const data = await api.getCategories();
      set({ categories: Array.isArray(data) ? data : [] });
    } catch (err: any) {
      console.error('Failed to fetch categories:', err?.message);
      set({ categories: [] });
    }
  },

  fetchProducts: async (silent = false) => {
    if (productsInFlight) return;
    productsInFlight = true;
    if (!silent) set({ isLoading: true, error: null });
    try {
      await get().fetchCategories();
      const data = await api.getProducts();
      set({ products: Array.isArray(data) ? data : [], error: null });
    } catch (err: any) {
      console.error('Failed to fetch products:', err?.message);
      set({ error: err?.message || 'Failed to load products' });
    } finally {
      productsInFlight = false;
      if (!silent) set({ isLoading: false });
    }
  },

  setSelectedCategory: (category: string) => set({ selectedCategory: category }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),

  getProductBySlug: (slug: string) => {
    return get().products.find((p) => p.slug === slug);
  },

  getFilteredProducts: () => {
    const { products, selectedCategory, searchQuery, sortBy } = get();

    return products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.basePrice - b.basePrice;
        if (sortBy === 'price-high') return b.basePrice - a.basePrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  },
}));
