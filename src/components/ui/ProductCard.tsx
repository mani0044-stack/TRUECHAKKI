import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product, ProductVariant } from '../../types';
import { useCartStore } from '../../store/useCartStore';
import { useUIStore } from '../../store/useUIStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [added, setAdded] = useState(false);
  
  const addToCart = useCartStore((state) => state.addToCart);
  const navigateTo = useUIStore((state) => state.navigateTo);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCardClick = () => {
    navigateTo('pdp', product.slug);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#E8DCCB] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#9A6B29]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF6EE] p-2.5 sm:p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={`${product.name} - 100% Organic & Stone Ground by True Chakki`}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.isFeatured && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#9A6B29] text-white text-[9px] sm:text-[11px] font-bold tracking-wider uppercase rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          <span className="hidden sm:inline-block px-2.5 py-1 bg-[#FAF6EE]/90 backdrop-blur-md text-[#4A2B18] text-[10px] font-semibold tracking-wide rounded-full border border-[#E8DCCB]">
            100% Natural
          </span>
        </div>

        {/* Quick View Floating Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); navigateTo('pdp', product.slug); }}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md text-[#4A2B18] hover:text-[#9A6B29] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
          title="View Details"
        >
          <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#7C5C43] mb-1">
            <span className="uppercase font-semibold tracking-wider text-[9px] sm:text-[11px] text-[#9A6B29] truncate max-w-[90px] sm:max-w-none">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-0.5 font-semibold text-[#4A2B18] shrink-0">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#CFB57F] text-[#CFB57F]" />
              <span>{product.rating}</span>
              <span className="text-[#7C5C43]/70 font-normal hidden sm:inline">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-sm sm:text-lg font-bold text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#7C5C43] line-clamp-1 sm:line-clamp-2 mt-0.5 sm:mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Variant Selector Pills */}
        <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(variant);
                }}
                className={`text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg border font-medium transition-all ${
                  selectedVariant.id === variant.id
                    ? 'bg-[#FAF4E8] border-[#9A6B29] text-[#9A6B29] shadow-sm font-semibold'
                    : 'bg-transparent border-[#E8DCCB] text-[#7C5C43] hover:border-[#9A6B29]/40'
                }`}
              >
                {variant.weightSize}
              </button>
            ))}
          </div>

          {/* Price & Add to Cart CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DCCB]/60">
            <div>
              <span className="text-[9px] sm:text-xs text-[#7C5C43] block">Price</span>
              <span className="font-price text-base sm:text-xl font-bold text-[#4A2B18]">
                ₹{selectedVariant.price}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition-all shadow-sm ${
                added
                  ? 'bg-green-700 text-white'
                  : 'bg-[#9A6B29] hover:bg-[#80561F] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Add <span className="hidden sm:inline">to Cart</span></span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
