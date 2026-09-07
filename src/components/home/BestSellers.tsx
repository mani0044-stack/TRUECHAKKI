import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../ui/ProductCard';
import { useUIStore } from '../../store/useUIStore';

export const BestSellers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const products = useProductStore((state) => state.products);
  const categories = useProductStore((state) => state.categories);
  const navigateTo = useUIStore((state) => state.navigateTo);

  const tabs = [
    { slug: 'all', label: 'All Products' },
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ];

  const filteredProducts = products
    .filter((p) => activeTab === 'all' || p.category === activeTab)
    .slice(0, 4);

  return (
    <section className="py-16 bg-[#FAF7F2] border-t border-b border-[#E8DCCB]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#9A6B29]">
              <Flame className="w-4 h-4 fill-[#9A6B29] text-[#9A6B29]" />
              <span>MOST LOVED BY HOMEMAKERS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
              Our Best Selling Fresh Staples
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveTab(tab.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeTab === tab.slug
                    ? 'bg-[#9A6B29] text-white shadow-md'
                    : 'bg-[#FAF4E8] text-[#7C5C43] hover:text-[#4A2B18] border border-[#E8DCCB]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-sm text-[#7C5C43]">
            No products are available in this range yet.
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border-2 border-[#9A6B29] hover:bg-[#9A6B29] text-[#9A6B29] hover:text-white font-semibold rounded-full transition-all text-sm shadow-sm"
          >
            <span>Explore Entire Shop Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
