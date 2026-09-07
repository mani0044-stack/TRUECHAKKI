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
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'featured' | 'price-low' | 'price-high' | 'rating') => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getFilteredProducts: () => Product[];
}

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Whole Wheat Atta (Stone Ground)',
    slug: 'whole-wheat-atta',
    category: 'atta',
    categoryName: 'Stone Ground Atta',
    description: '100% Natural Sharbati whole wheat ground using traditional stone chakki at slow RPM. Slow milling preserves natural bran, fiber, germ nutrients, and rich traditional aroma.',
    shortDescription: '100% Natural & Stone Ground Sharbati Whole Wheat Atta',
    basePrice: 380,
    rating: 4.9,
    reviewCount: 248,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-1-1', weightSize: '1kg Pack', price: 85, stock: 150, sku: 'TC-ATTA-1K' },
      { id: 'v-1-2', weightSize: '5kg Bag', price: 380, stock: 80, sku: 'TC-ATTA-5K' },
      { id: 'v-1-3', weightSize: '10kg Family Bag', price: 720, stock: 45, sku: 'TC-ATTA-10K' },
    ],
    ingredients: ['100% Single-Origin Sharbati Whole Wheat Grains'],
    nutritionalInfo: { calories: '364 kcal', protein: '12.8g', carbs: '71.2g', fat: '1.9g', fiber: '11.5g' },
  },
  {
    id: 'p-2',
    name: 'Cold-Pressed Mustard Oil (Kachi Ghani)',
    slug: 'cold-pressed-mustard-oil',
    category: 'oils',
    categoryName: 'Wood-Pressed Oils',
    description: 'Extracted from premium yellow mustard seeds using traditional wooden press (Kolhu) without heat generation or solvent extraction.',
    shortDescription: 'Pure Traditional Wooden Kolhu Pressed Mustard Oil',
    basePrice: 245,
    rating: 4.95,
    reviewCount: 194,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-2-1', weightSize: '500ml Bottle', price: 130, stock: 120, sku: 'TC-OIL-500M' },
      { id: 'v-2-2', weightSize: '1 Litre Glass Bottle', price: 245, stock: 95, sku: 'TC-OIL-1L' },
      { id: 'v-2-3', weightSize: '5 Litre Can', price: 1150, stock: 30, sku: 'TC-OIL-5L' },
    ],
    ingredients: ['100% Pure Yellow Mustard Seeds'],
    nutritionalInfo: { calories: '884 kcal', protein: '0g', carbs: '0g', fat: '100g', fiber: '0g' },
  },
  {
    id: 'p-3',
    name: 'Traditional Mango Pickle (Aam Ka Achar)',
    slug: 'traditional-mango-pickle',
    category: 'pickles',
    categoryName: 'Authentic Pickles',
    description: 'Handcrafted raw Ramkela mangoes marinated in raw mustard oil, fenugreek, nigella, and rock salt. Sun-cured in traditional ceramic jars.',
    shortDescription: 'Handcrafted Sun-Cured Raw Mango Achar in Pure Mustard Oil',
    basePrice: 290,
    rating: 4.88,
    reviewCount: 162,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-3-1', weightSize: '350g Glass Jar', price: 290, stock: 60, sku: 'TC-MANGO-350G' },
      { id: 'v-3-2', weightSize: '700g Heritage Jar', price: 540, stock: 40, sku: 'TC-MANGO-700G' },
    ],
    ingredients: ['Raw Mangoes', 'Cold-Pressed Mustard Oil', 'Fenugreek', 'Nigella Seeds'],
    nutritionalInfo: { calories: '180 kcal', protein: '2.1g', carbs: '14.5g', fat: '12.8g', fiber: '3.2g' },
  },
  {
    id: 'p-4',
    name: 'Stone-Ground Turmeric Powder (Haldi)',
    slug: 'stone-ground-turmeric-powder',
    category: 'spices',
    categoryName: 'Pure Spices',
    description: 'High-curcumin Lakadong turmeric rhizomes slow-milled on granite stones. Rich deep golden yellow color with high medicinal potency.',
    shortDescription: 'High-curcumin Lakadong turmeric rhizomes slow-milled on granite stones.',
    basePrice: 190,
    rating: 4.92,
    reviewCount: 118,
    isFeatured: false,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-4-1', weightSize: '250g Pouch', price: 190, stock: 90, sku: 'TC-HALDI-250G' },
      { id: 'v-4-2', weightSize: '500g Eco Pack', price: 350, stock: 50, sku: 'TC-HALDI-500G' },
    ],
    ingredients: ['100% Pure Single-Origin Lakadong Turmeric Roots'],
    nutritionalInfo: { calories: '349 kcal', protein: '7.8g', carbs: '65g', fat: '9.9g', fiber: '21g' },
  },
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: FALLBACK_PRODUCTS,
  categories: [],
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      const data = await api.getCategories();
      if (data && data.length > 0) {
        set({ categories: data });
      }
    } catch (err: any) {
      console.error('Failed to fetch categories:', err?.message);
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    get().fetchCategories();
    try {
      const data = await api.getProducts();
      if (data && data.length > 0) {
        set({ products: data, isLoading: false });
      } else {
        set({ products: FALLBACK_PRODUCTS, isLoading: false });
      }
    } catch (err: any) {
      console.warn('Initial product fetch failed, retrying in 800ms...', err?.message);
      try {
        await new Promise((res) => setTimeout(res, 800));
        const retryData = await api.getProducts();
        if (retryData && retryData.length > 0) {
          set({ products: retryData, isLoading: false });
        } else {
          set({ products: FALLBACK_PRODUCTS, isLoading: false });
        }
      } catch (retryErr: any) {
        console.error('Failed to fetch products from backend API after retry:', retryErr?.message);
        set({ products: FALLBACK_PRODUCTS, isLoading: false });
      }
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
