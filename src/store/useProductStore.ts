import { create } from 'zustand';
import type { Product } from '../types';
import { api } from '../services/api';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'Whole Wheat Atta (Stone Ground)',
    slug: 'whole-wheat-atta',
    category: 'atta',
    categoryName: 'Stone Ground Atta',
    description: '100% Natural Sharbati whole wheat ground using traditional stone chakki at slow RPM. Slow milling preserves natural bran, fiber, germ nutrients, and rich traditional aroma. No maida, no bleached flour, and zero chemical preservatives.',
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
    nutritionalInfo: {
      calories: '364 kcal',
      protein: '12.8g',
      carbs: '71.2g',
      fat: '1.9g',
      fiber: '11.5g',
    },
  },
  {
    id: 'p-2',
    name: 'Cold-Pressed Mustard Oil (Kachi Ghani)',
    slug: 'cold-pressed-mustard-oil',
    category: 'oils',
    categoryName: 'Wood-Pressed Oils',
    description: 'Extracted from premium yellow mustard seeds using traditional wooden press (Kolhu) without heat generation or solvent extraction. Retains natural pungency, golden clarity, high MUFA, and essential Omega-3 fatty acids.',
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
    nutritionalInfo: {
      calories: '884 kcal',
      protein: '0g',
      carbs: '0g',
      fat: '100g',
      fiber: '0g',
    },
  },
  {
    id: 'p-3',
    name: 'Homemade Mango Pickle (Traditional Recipe)',
    slug: 'homemade-mango-pickle',
    category: 'pickles',
    categoryName: 'Traditional Pickles',
    description: 'Sun-cured raw Rajapuri mangoes blended with stone-ground mustard, fenugreek, fennel, nigella seeds, and pure cold-pressed mustard oil. Crafted in small batches following authentic rural heritage recipes without synthetic vinegar.',
    shortDescription: 'Handcrafted Sun-Cured Raw Mango Achar in Pure Mustard Oil',
    basePrice: 250,
    rating: 4.88,
    reviewCount: 312,
    isFeatured: true,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-3-1', weightSize: '250g Jar', price: 140, stock: 200, sku: 'TC-PCK-250G' },
      { id: 'v-3-2', weightSize: '500g Jar', price: 250, stock: 110, sku: 'TC-PCK-500G' },
      { id: 'v-3-3', weightSize: '1kg Heritage Jar', price: 470, stock: 50, sku: 'TC-PCK-1KG' },
    ],
    ingredients: ['Raw Mangoes', 'Cold-Pressed Mustard Oil', 'Yellow Mustard', 'Fenugreek', 'Fennel', 'Red Chilli', 'Turmeric', 'Rock Salt'],
    nutritionalInfo: {
      calories: '185 kcal',
      protein: '2.1g',
      carbs: '14.5g',
      fat: '13.2g',
      fiber: '4.8g',
    },
  },
  {
    id: 'p-4',
    name: '7 Grains Multigrain Super Atta',
    slug: 'multigrain-super-atta',
    category: 'atta',
    categoryName: 'Stone Ground Atta',
    description: 'A nutrient-dense blend of 7 ancient grains: Sharbati Wheat, Desi Chana, Jowar, Bajra, Ragi, Oats, and Soybeans. Formulated for high dietary fiber, low glycemic index, and soft fluffy rotis.',
    shortDescription: '7 Nutrient-Dense Ancient Grains Blend for Healthy Rotis',
    basePrice: 490,
    rating: 4.85,
    reviewCount: 165,
    isFeatured: false,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-4-1', weightSize: '5kg Bag', price: 490, stock: 75, sku: 'TC-MULTI-5K' },
      { id: 'v-4-2', weightSize: '10kg Bag', price: 920, stock: 30, sku: 'TC-MULTI-10K' },
    ],
    ingredients: ['Sharbati Wheat', 'Bengal Gram (Chana)', 'Sorghum (Jowar)', 'Pearl Millet (Bajra)', 'Finger Millet (Ragi)', 'Oats', 'Defatted Soy'],
    nutritionalInfo: {
      calories: '372 kcal',
      protein: '15.4g',
      carbs: '68.5g',
      fat: '3.1g',
      fiber: '14.2g',
    },
  },
  {
    id: 'p-5',
    name: 'Cold-Pressed Groundnut (Peanut) Oil',
    slug: 'cold-pressed-groundnut-oil',
    category: 'oils',
    categoryName: 'Wood-Pressed Oils',
    description: 'Cold-pressed from handpicked Saurashtra groundnuts. High smoke point makes it perfect for everyday Indian cooking and deep frying while retaining sweet nutty aroma.',
    shortDescription: '100% Pure Wood-Pressed Groundnut Oil for Daily Cooking',
    basePrice: 280,
    rating: 4.91,
    reviewCount: 142,
    isFeatured: false,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-5-1', weightSize: '1 Litre Bottle', price: 280, stock: 85, sku: 'TC-GNOIL-1L' },
      { id: 'v-5-2', weightSize: '5 Litre Can', price: 1320, stock: 25, sku: 'TC-GNOIL-5L' },
    ],
    ingredients: ['100% Native Groundnut Seeds'],
    nutritionalInfo: {
      calories: '884 kcal',
      protein: '0g',
      carbs: '0g',
      fat: '100g',
      fiber: '0g',
    },
  },
  {
    id: 'p-6',
    name: 'Sun-Cured Spiced Lemon Pickle',
    slug: 'sun-cured-lemon-pickle',
    category: 'pickles',
    categoryName: 'Traditional Pickles',
    description: 'Juicy Kagzi lemons aged under the sun in earthen pots with digestive carom seeds (ajwain), black salt, and dry roasted spices. Oil-free traditional digestive pickles.',
    shortDescription: 'Oil-Free Sun-Aged Lemon Achar with Ajwain & Rock Salt',
    basePrice: 230,
    rating: 4.79,
    reviewCount: 88,
    isFeatured: false,
    image: '/images/hero-bg.jpg',
    gallery: ['/images/hero-bg.jpg'],
    variants: [
      { id: 'v-6-1', weightSize: '300g Jar', price: 150, stock: 75, sku: 'TC-LMN-300G' },
      { id: 'v-6-2', weightSize: '500g Jar', price: 230, stock: 40, sku: 'TC-LMN-500G' },
    ],
    ingredients: ['Kagzi Lemons', 'Sendha Namak (Rock Salt)', 'Ajwain', 'Black Pepper', 'Cumin', 'Asafoetida (Hing)'],
    nutritionalInfo: {
      calories: '92 kcal',
      protein: '1.2g',
      carbs: '18.4g',
      fat: '0.4g',
      fiber: '5.2g',
    },
  },
];

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
  products: INITIAL_PRODUCTS,
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getProducts();
      if (data && data.length > 0) {
        set({ products: data, isLoading: false });
      } else {
        set({ products: INITIAL_PRODUCTS, isLoading: false });
      }
    } catch (err: any) {
      console.warn('Backend API connection offline, using fallback products state:', err?.message);
      set({ products: INITIAL_PRODUCTS, isLoading: false });
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
