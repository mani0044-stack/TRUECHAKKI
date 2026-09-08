import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const FeaturedCategories: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const dbCategories = useProductStore((state) => state.categories);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = dbCategories;

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    navigateTo('shop');
  };

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF4E8] border border-[#E8DCCB] rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NATURAL HERITAGE RANGE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B18] tracking-tight">
            Explore Our Farm Categories
          </h2>
          <p className="text-xs sm:text-base text-[#7C5C43] leading-relaxed">
            Crafted strictly using traditional stone ground & cold pressed methods for unadulterated purity.
          </p>
        </div>


        {/* Categories Horizontal Slide Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth custom-scrollbar pb-6 pt-2 px-1"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className="group relative w-[280px] sm:w-[340px] md:w-[380px] shrink-0 snap-start bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#9A6B29]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between transform hover:-translate-y-1.5"
            >
              {/* Image Banner */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E8DCCB]">
                <img
                  src={category.image || '/images/hero-bg.jpg'}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#9A6B29]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md border border-white/20">
                    100% Farm Fresh
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 sm:p-7 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#9A6B29] tracking-wide uppercase">
                    {category.product_count !== undefined ? `${category.product_count} Products Available` : 'Fresh Farm Range'}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7C5C43] leading-relaxed line-clamp-2">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DCCB]/60 flex items-center justify-between text-sm font-semibold text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors">
                  <span>Discover Range</span>
                  <div className="w-8 h-8 rounded-full bg-[#FAF4E8] group-hover:bg-[#9A6B29] text-[#9A6B29] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


