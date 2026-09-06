import React from 'react';
import { Leaf, Award, HeartHandshake, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Hero Banner */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#9A6B29] bg-[#FAF4E8] px-3.5 py-1 rounded-full border border-[#E8DCCB]">
          OUR HERITAGE STORY
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#4A2B18]">
          Reviving Traditional Indian Milling
        </h1>
        <p className="text-base text-[#7C5C43] leading-relaxed max-w-2xl mx-auto">
          At True Chakki, we are on a mission to bring unadulterated, stone-ground flours, cold-pressed oils, and sun-cured pickles back into modern Indian kitchens.
        </p>
      </div>

      {/* Story Sections */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-[#4A2B18]">Why Stone Chakki Matters</h2>
          <p className="text-xs text-[#7C5C43] leading-relaxed">
            Industrial commercial roller mills generate high heat (above 90°C) during processing, stripping wheat flour of its natural bran, vitamins, and essential oils. 
            Our traditional granite stones operate at low speeds, preserving 100% of the fiber, wheat germ oil, and natural aroma.
          </p>
        </div>
        <div className="aspect-4/3 bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] overflow-hidden p-4">
          <img src="/images/hero-bg.jpg" alt="True Chakki Farm" className="w-full h-full object-cover rounded-2xl" />
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#E8DCCB] text-center space-y-2">
          <Leaf className="w-8 h-8 text-[#9A6B29] mx-auto" />
          <h3 className="font-serif font-bold text-base text-[#4A2B18]">100% Organic Grains</h3>
          <p className="text-xs text-[#7C5C43]">Sourced from verified chemical-free farms.</p>
        </div>
        <div className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#E8DCCB] text-center space-y-2">
          <Award className="w-8 h-8 text-[#9A6B29] mx-auto" />
          <h3 className="font-serif font-bold text-base text-[#4A2B18]">Cold-Pressed Oils</h3>
          <p className="text-xs text-[#7C5C43]">Extracted in traditional wooden Kolhus.</p>
        </div>
        <div className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#E8DCCB] text-center space-y-2">
          <HeartHandshake className="w-8 h-8 text-[#9A6B29] mx-auto" />
          <h3 className="font-serif font-bold text-base text-[#4A2B18]">Direct Farmer Pay</h3>
          <p className="text-xs text-[#7C5C43]">Fair prices paid directly to rural growers.</p>
        </div>
        <div className="p-6 bg-[#FAF6EE] rounded-2xl border border-[#E8DCCB] text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-[#9A6B29] mx-auto" />
          <h3 className="font-serif font-bold text-base text-[#4A2B18]">Freshness Guaranteed</h3>
          <p className="text-xs text-[#7C5C43]">Milled fresh after your order is placed.</p>
        </div>
      </div>

    </div>
  );
};
