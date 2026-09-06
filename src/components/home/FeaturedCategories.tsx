import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';

export const FeaturedCategories: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);

  const categories = [
    {
      id: 'atta',
      name: 'Stone Ground Atta',
      description: 'Slow-milled single-origin Sharbati wheat flour retaining natural germ & bran nutrients.',
      image: '/images/hero-bg.jpg',
      itemCount: '4 Variants Available',
      badge: 'Bestseller',
    },
    {
      id: 'oils',
      name: 'Wood-Pressed Oils',
      description: 'Extracted using traditional wooden Kolhu without chemical heat processing or refining.',
      image: '/images/hero-bg.jpg',
      itemCount: '3 Pure Extracts',
      badge: 'Cold Pressed',
    },
    {
      id: 'pickles',
      name: 'Traditional Pickles',
      description: 'Handcrafted in earthen pots aged under natural sunshine with mustard oil & rock salt.',
      image: '/images/hero-bg.jpg',
      itemCount: 'Vintage Recipes',
      badge: 'Handcrafted',
    },
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    navigateTo('shop');
  };

  return (
    <section className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29]">
            NATURAL HERITAGE RANGE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            Explore Our Farm Fresh Categories
          </h2>
          <p className="text-sm text-[#7C5C43] leading-relaxed">
            Crafted strictly using traditional methods to deliver unadulterated flavor and wholesome family wellness.
          </p>
        </div>

        {/* 3 Categories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Banner */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#E8DCCB]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#9A6B29] text-white text-[11px] font-bold uppercase tracking-wider rounded-full shadow-md">
                    {category.badge}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-3">
                <span className="text-xs font-semibold text-[#9A6B29]">
                  {category.itemCount}
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-[#7C5C43] leading-relaxed">
                  {category.description}
                </p>

                <div className="pt-3 flex items-center gap-2 text-sm font-semibold text-[#4A2B18] group-hover:text-[#9A6B29]">
                  <span>Discover Range</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
