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
      <div className="relative aspect-4/3 overflow-hidden bg-[#FAF6EE] p-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isFeatured && (
            <span className="px-2.5 py-1 bg-[#9A6B29] text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          <span className="px-2.5 py-1 bg-[#FAF6EE]/90 backdrop-blur-md text-[#4A2B18] text-[10px] font-semibold tracking-wide rounded-full border border-[#E8DCCB]">
            100% Natural
          </span>
        </div>

        {/* Quick View Floating Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); navigateTo('pdp', product.slug); }}
          className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md text-[#4A2B18] hover:text-[#9A6B29] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#7C5C43] mb-1.5">
            <span className="uppercase font-semibold tracking-wider text-[11px] text-[#9A6B29]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 font-semibold text-[#4A2B18]">
              <Star className="w-3.5 h-3.5 fill-[#CFB57F] text-[#CFB57F]" />
              <span>{product.rating}</span>
              <span className="text-[#7C5C43]/70 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-bold text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#7C5C43] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Variant Selector Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedVariant(variant);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
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
              <span className="text-xs text-[#7C5C43] block">Price</span>
              <span className="font-price text-xl font-bold text-[#4A2B18]">
                ₹{selectedVariant.price}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                added
                  ? 'bg-green-700 text-white'
                  : 'bg-[#9A6B29] hover:bg-[#80561F] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
