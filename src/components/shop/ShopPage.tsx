import React, { useEffect } from 'react';
import { Filter, SlidersHorizontal, RefreshCw, ChevronRight } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../ui/ProductCard';
import { useUIStore } from '../../store/useUIStore';

export const ShopPage: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    getFilteredProducts,
    categories: dbCategories,
    fetchProducts,
  } = useProductStore();

  const navigateTo = useUIStore((state) => state.navigateTo);
  const products = getFilteredProducts();

  // Refresh catalog from the database whenever the shop page is opened
  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  const filterCategories = [
    { id: 'all', label: 'All Products' },
    ...dbCategories.map((c) => ({
      id: c.slug,
      label: c.name,
    })),
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20">
      
      {/* Shop Header & Breadcrumb Banner */}
      <div className="bg-[#FAF6EE] border-b border-[#E8DCCB] pt-24 sm:pt-28 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#7C5C43]">
            <button onClick={() => navigateTo('home')} className="hover:text-[#9A6B29]">Home</button>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#4A2B18]">Shop Catalog</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            Farm-Fresh Organic Staples
          </h1>
          <p className="text-sm text-[#7C5C43] max-w-xl">
            Explore 100% natural stone-milled flours, cold-pressed Kachi Ghani oils, and traditional sun-cured pickles.
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filter Controls */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-[#FAF6EE] p-6 rounded-2xl border border-[#E8DCCB] space-y-6">
              
              <div className="flex items-center justify-between border-b border-[#E8DCCB] pb-3">
                <div className="flex items-center gap-2 font-serif font-bold text-lg text-[#4A2B18]">
                  <Filter className="w-5 h-5 text-[#9A6B29]" />
                  <span>Filter Products</span>
                </div>
                {(selectedCategory !== 'all' || searchQuery !== '') && (
                  <button
                    onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                    className="text-xs text-[#9A6B29] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7C5C43]">
                  Categories
                </h3>
                <div className="space-y-1.5">
                  {filterCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-[#9A6B29] text-white shadow-sm'
                          : 'text-[#4A2B18] hover:bg-[#F3E8D3]'
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Sort Selection */}
              <div className="space-y-3 border-t border-[#E8DCCB] pt-4">
                <h3 className="text-xs uppercase font-semibold tracking-wider text-[#7C5C43]">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#E8DCCB] rounded-xl text-xs font-medium text-[#4A2B18] focus:outline-none focus:border-[#9A6B29]"
                >
                  <option value="featured">Featured & Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="flex-1 space-y-6">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-[#FAF6EE] px-4 py-3 rounded-xl border border-[#E8DCCB]">
              <span className="text-xs font-semibold text-[#7C5C43]">
                Showing <strong className="text-[#4A2B18]">{products.length}</strong> products
              </span>
              <div className="flex items-center gap-3 text-xs text-[#7C5C43]">
                <SlidersHorizontal className="w-4 h-4 text-[#9A6B29]" />
                <span>Showing items for "{selectedCategory.toUpperCase()}"</span>
                <button
                  onClick={() => fetchProducts(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#E8DCCB] hover:border-[#9A6B29] hover:text-[#9A6B29] rounded-full font-semibold transition-colors"
                  title="Refresh catalog from database"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync</span>
                </button>
              </div>
            </div>

            {/* Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#4A2B18]">No products found</h3>
                <p className="text-xs text-[#7C5C43]">Try adjusting your search criteria or resetting filters.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-6 py-2 bg-[#9A6B29] text-white text-xs font-semibold rounded-full shadow-md"
                >
                  View All Products
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

    </div>
  );
};
