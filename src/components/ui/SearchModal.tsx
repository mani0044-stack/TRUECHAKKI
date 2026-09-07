import React from 'react';
import { Search, X, ArrowRight, Leaf } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateTo } = useUIStore();
  const { searchQuery, setSearchQuery, getFilteredProducts, setSelectedCategory, categories } = useProductStore();

  if (!isSearchOpen) return null;

  const results = searchQuery.trim() ? getFilteredProducts() : [];
  const popularCategories = categories.slice(0, 4);

  const handleProductSelect = (slug: string) => {
    closeSearch();
    navigateTo('pdp', slug);
  };

  const handleCategoryShortcut = (cat: string) => {
    setSelectedCategory(cat);
    closeSearch();
    navigateTo('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-20">
      {/* Backdrop */}
      <div 
        onClick={closeSearch}
        className="fixed inset-0 bg-[#4A2B18]/50 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative max-w-2xl mx-auto bg-[#FDFBF7] rounded-2xl border border-[#E8DCCB] shadow-2xl overflow-hidden z-10 animate-fadeIn">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 bg-[#FAF6EE] border-b border-[#E8DCCB] flex items-center gap-3">
          <Search className="w-6 h-6 text-[#9A6B29]" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search farm-fresh atta, cold-pressed oils, pickles..."
            className="flex-1 bg-transparent border-none text-lg text-[#4A2B18] placeholder-[#7C5C43]/60 focus:outline-none font-serif"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#7C5C43] hover:text-[#4A2B18] text-xs font-semibold px-2 py-1 bg-[#E8DCCB]/50 rounded-md"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-2 text-[#4A2B18]/70 hover:text-[#4A2B18] hover:bg-[#E8DCCB]/50 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results / Quick Categories */}
        <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {searchQuery.trim() ? (
            results.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#7C5C43]">
                  Found {results.length} Products
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.slug)}
                      className="flex items-center gap-3 p-3 bg-white border border-[#E8DCCB] rounded-xl hover:border-[#9A6B29] cursor-pointer transition-colors group shadow-sm"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-[#FAF6EE]"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-[#9A6B29] font-semibold uppercase">
                          {product.categoryName}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#4A2B18] truncate group-hover:text-[#9A6B29]">
                          {product.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#4A2B18]">
                          ₹{product.basePrice}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#7C5C43] group-hover:text-[#9A6B29] group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <p className="text-base text-[#4A2B18] font-medium">No farm products match "{searchQuery}"</p>
                <p className="text-xs text-[#7C5C43]">Try searching for "atta", "mustard oil", "mango pickle", or "multigrain".</p>
              </div>
            )
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#7C5C43] mb-3">
                  Popular Categories
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryShortcut('atta')}
                    className="px-4 py-2 bg-[#FAF4E8] hover:bg-[#9A6B29] hover:text-white border border-[#E8DCCB] text-[#4A2B18] rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    Stone Ground Atta
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('oils')}
                    className="px-4 py-2 bg-[#FAF4E8] hover:bg-[#9A6B29] hover:text-white border border-[#E8DCCB] text-[#4A2B18] rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    Wood-Pressed Oils
                  </button>
                  <button
                    onClick={() => handleCategoryShortcut('pickles')}
                    className="px-4 py-2 bg-[#FAF4E8] hover:bg-[#9A6B29] hover:text-white border border-[#E8DCCB] text-[#4A2B18] rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Leaf className="w-3.5 h-3.5" />
                    Heritage Pickles
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
