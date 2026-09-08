import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingBag, ShieldCheck, Truck, RotateCcw, ChevronRight, Check, Leaf, Wheat, Salad } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import type { ProductVariant } from '../../types';

export const ProductDetailPage: React.FC = () => {
  const activeSlug = useUIStore((state) => state.activeProductSlug) || 'whole-wheat-atta';
  const navigateTo = useUIStore((state) => state.navigateTo);
  const allProducts = useProductStore((state) => state.products);
  const isLoading = useProductStore((state) => state.isLoading);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // Refresh catalog from the database whenever the product page is opened
  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  const product = allProducts.find((p) => p.slug === activeSlug) || allProducts[0];
  
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedVariantOverride, setSelectedVariantOverride] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'nutrition' | 'ingredients' | 'reviews'>('story');

  if (!product) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen pt-28 sm:pt-32 pb-20 px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">
          {isLoading ? 'Loading Farm Fresh Product...' : 'Product Not Found'}
        </h2>
        <p className="text-xs text-[#7C5C43]">
          {isLoading ? 'Fetching fresh details from our farm database.' : 'The requested item is not currently available.'}
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2 bg-[#9A6B29] text-white text-xs font-semibold rounded-full shadow-md"
        >
          Back to Shop Catalog
        </button>
      </div>
    );
  }

  const selectedVariant = selectedVariantOverride || product.variants[0] || { id: 'default', weightSize: 'Standard', price: product.basePrice, stock: 10, sku: 'DEFAULT' };

  const setSelectedVariant = (v: ProductVariant) => setSelectedVariantOverride(v);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigateTo('checkout');
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-20">
      
      {/* Breadcrumb Header */}
      <div className="bg-[#FAF6EE] border-b border-[#E8DCCB] pt-24 sm:pt-28 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-[#7C5C43]">
          <button onClick={() => navigateTo('home')} className="hover:text-[#9A6B29]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateTo('shop')} className="hover:text-[#9A6B29]">Shop</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[#4A2B18] truncate">{product.name}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: High-Res Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 overflow-hidden relative shadow-sm flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#9A6B29] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">
                100% Stone Ground
              </span>
            </div>
          </div>

          {/* Right Column: Product Details & Buying Options */}
          <div className="space-y-6">
            
            {/* Category & Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#9A6B29] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#E8DCCB]">
                  {product.categoryName}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-[#4A2B18]">
                  <Star className="w-4 h-4 fill-[#CFB57F] text-[#CFB57F]" />
                  <span>{product.rating}</span>
                  <span className="text-[#7C5C43] font-normal text-xs">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm text-[#7C5C43] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Display */}
            <div className="p-4 bg-[#FAF6EE] border border-[#E8DCCB] rounded-2xl flex items-baseline gap-3">
              <span className="font-price text-3xl font-bold text-[#4A2B18]">
                ₹{selectedVariant.price}
              </span>
              <span className="text-xs text-[#7C5C43]">
                Inclusive of all taxes ({selectedVariant.weightSize})
              </span>
            </div>

            {/* Variant Selector */}
            <div className="space-y-2">
              <label className="block text-xs uppercase font-semibold text-[#4A2B18] tracking-wider">
                Select Package Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-[#9A6B29] text-white border-[#9A6B29] shadow-md'
                        : 'bg-white text-[#4A2B18] border-[#E8DCCB] hover:border-[#9A6B29]'
                    }`}
                  >
                    {v.weightSize} - <span className="font-price font-bold">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E8DCCB] rounded-xl bg-[#FAF6EE] overflow-hidden p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-[#4A2B18] hover:bg-[#F3E8D3] rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#4A2B18]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-[#4A2B18] hover:bg-[#F3E8D3] rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-green-700 text-white'
                      : 'bg-[#9A6B29] hover:bg-[#80561F] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* Buy Now CTA */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 bg-[#4A2B18] hover:bg-[#351D0F] text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors"
              >
                Instant Buy Now
              </button>
            </div>

            {/* Trust Features Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8DCCB] text-center text-[11px] text-[#7C5C43]">
              <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DCCB] space-y-1">
                <Truck className="w-5 h-5 mx-auto text-[#9A6B29]" />
                <span className="font-semibold block text-[#4A2B18]">Free Delivery</span>
                <span>On orders &gt; ₹499</span>
              </div>
              <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DCCB] space-y-1">
                <ShieldCheck className="w-5 h-5 mx-auto text-[#9A6B29]" />
                <span className="font-semibold block text-[#4A2B18]">100% Purity</span>
                <span>Lab Certified</span>
              </div>
              <div className="p-3 bg-[#FAF6EE] rounded-xl border border-[#E8DCCB] space-y-1">
                <RotateCcw className="w-5 h-5 mx-auto text-[#9A6B29]" />
                <span className="font-semibold block text-[#4A2B18]">Fresh Milling</span>
                <span>Milled on Order</span>
              </div>
            </div>

          </div>
        </div>

        {/* Product Details Tabs (Story, Nutrition, Ingredients, Reviews) */}
        <div className="mt-16 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-6">
          <div className="flex border-b border-[#E8DCCB] gap-6 overflow-x-auto custom-scrollbar">
            {(['story', 'nutrition', 'ingredients', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs uppercase tracking-wider font-bold transition-all relative flex items-center gap-1.5 ${
                  activeTab === tab
                    ? 'text-[#9A6B29]'
                    : 'text-[#7C5C43] hover:text-[#4A2B18]'
                }`}
              >
                {tab === 'story' && (<><Wheat className="w-3.5 h-3.5" /> Farm Story & Process</>)}
                {tab === 'nutrition' && (<><Salad className="w-3.5 h-3.5" /> Nutritional Facts</>)}
                {tab === 'ingredients' && (<><Leaf className="w-3.5 h-3.5" /> Ingredients</>)}
                {tab === 'reviews' && (<><Star className="w-3.5 h-3.5" /> Customer Reviews ({product.reviewCount})</>)}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#9A6B29] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="pt-2 text-sm text-[#4A2B18] leading-relaxed">
            {activeTab === 'story' && (
              <div className="space-y-4 max-w-3xl">
                <h3 className="font-serif text-xl font-bold">Traditional Stone Chakki Craftsmanship</h3>
                <p className="text-xs text-[#7C5C43] leading-relaxed">
                  Unlike modern high-speed steel mills that generate temperatures exceeding 90°C and destroy vital vitamins, True Chakki uses heavy granite stones rotating at low RPM. This slow grinding technique preserves natural bran, fiber, and wheat germ oil.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9A6B29]">
                  <Leaf className="w-4 h-4" />
                  <span>Single-Origin Sharbati Grain • No Added Preservatives • Zero Bleaching</span>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && product.nutritionalInfo && (
              <div className="max-w-md space-y-4">
                <h3 className="font-serif text-xl font-bold">Nutritional Values (Per 100g)</h3>
                <table className="w-full text-xs text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-[#E8DCCB]">
                      <td className="py-2.5 font-semibold">Energy / Calories</td>
                      <td className="py-2.5 text-right font-mono">{product.nutritionalInfo.calories}</td>
                    </tr>
                    <tr className="border-b border-[#E8DCCB]">
                      <td className="py-2.5 font-semibold">Protein</td>
                      <td className="py-2.5 text-right font-mono">{product.nutritionalInfo.protein}</td>
                    </tr>
                    <tr className="border-b border-[#E8DCCB]">
                      <td className="py-2.5 font-semibold">Total Carbohydrates</td>
                      <td className="py-2.5 text-right font-mono">{product.nutritionalInfo.carbs}</td>
                    </tr>
                    <tr className="border-b border-[#E8DCCB]">
                      <td className="py-2.5 font-semibold">Dietary Fiber</td>
                      <td className="py-2.5 text-right font-mono">{product.nutritionalInfo.fiber}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-semibold">Healthy Fats</td>
                      <td className="py-2.5 text-right font-mono">{product.nutritionalInfo.fat}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4 max-w-lg">
                <h3 className="font-serif text-xl font-bold">Pure Ingredients</h3>
                <ul className="space-y-2 text-xs">
                  {product.ingredients?.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#9A6B29]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#E8DCCB]">
                  <div className="text-center pr-6 border-r border-[#E8DCCB]">
                    <span className="font-serif text-4xl font-bold text-[#4A2B18]">{product.rating}</span>
                    <div className="flex justify-center text-[#CFB57F] my-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#CFB57F]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7C5C43]">Based on {product.reviewCount} reviews</span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm">Customer Favorite</h4>
                    <p className="text-xs text-[#7C5C43]">99% of buyers recommend this product for family health.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
