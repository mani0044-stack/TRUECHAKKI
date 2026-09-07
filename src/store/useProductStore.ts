import { create } from 'zustand';
import type { Product } from '../types';
import { api } from '../services/api';

interface ProductState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchProducts: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getProducts();
      set({ products: data || [], isLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch products from backend API:', err?.message);
      set({ error: err?.message || 'Failed to fetch products', isLoading: false, products: [] });
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
