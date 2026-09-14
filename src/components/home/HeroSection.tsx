import React from 'react';
import { Leaf, Wheat, Sparkles, HeartHandshake, ShoppingBag } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';


export const HeroSection: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden">

      {/* Mobile Layout (Full Dimensions Uncut Photo) */}
      <div className="block sm:hidden w-full bg-[#FAF7F2] pt-24 pb-8 px-4 text-center">
        <div className="max-w-sm mx-auto space-y-4 flex flex-col items-center">
          <h1 className="font-serif text-3xl font-extrabold tracking-tight text-[#4A2B18] leading-[1.15]">
            Pure. Natural. <br />
            <span className="font-script text-5xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#9A6B29] to-[#704815] inline-block pt-1 pb-1 drop-shadow-sm">
              Truly Yours.
            </span>
          </h1>
          
          <p className="text-xs text-[#4A2B18]/90 font-sans leading-relaxed max-w-xs">
            True Chakki brings you the goodness of traditional farming. 100% natural products made with care, just like nature intended.
          </p>

          <button
            onClick={() => navigateTo('shop')}
            className="px-7 py-3 bg-[#FAF4E8] text-[#4A2B18] font-semibold rounded-full border border-[#E8DCCB] flex items-center justify-center gap-2 text-xs shadow-xs"
          >
            <span>Explore Range</span>
            <ShoppingBag className="w-4 h-4 text-[#9A6B29]" />
          </button>

          {/* Full Dimensions Uncut Photo on Mobile */}
          <div className="w-full pt-3">
            <img
              src="/images/IMG_7401.PNG"
              alt="True Chakki Natural Staples"
              className="w-full h-auto object-contain rounded-2xl border border-[#E8DCCB] shadow-md max-h-[500px] mx-auto block"
            />
          </div>
        </div>
      </div>

      {/* Desktop Hero Container (Visible on sm and up) */}
      <div className="hidden sm:flex relative w-full items-center min-h-[720px] lg:min-h-[820px]">

        {/* Desktop Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-[position:78%_center] lg:bg-center bg-no-repeat z-0 opacity-100"
          style={{ backgroundImage: `url('/images/IMG_7347.png')` }}
        />

        {/* Desktop Text Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 lg:pt-44 pb-24 lg:pb-32 w-full flex flex-col items-start text-left">
          <div className="w-full sm:max-w-xl lg:max-w-2xl space-y-6 flex flex-col items-start text-left">

            {/* Main Headline */}
            <h1 className="font-serif text-5xl lg:text-6xl font-extrabold tracking-tight text-[#4A2B18] leading-[1.15] text-left drop-shadow-xs">
              Pure. Natural. <br />
              <span className="font-script text-7xl lg:text-8xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#9A6B29] to-[#704815] inline-block pt-1 pb-1 drop-shadow-sm select-none hover:scale-[1.02] transition-transform duration-300">
                Truly Yours.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base lg:text-lg text-[#4A2B18]/90 font-sans leading-relaxed max-w-md lg:max-w-lg text-left">
              True Chakki brings you the goodness of traditional farming. 100% natural products made with care, just like nature intended.
            </p>

            {/* CTA Button */}
            <div className="pt-4 flex items-center justify-start">
              <button
                onClick={() => navigateTo('shop')}
                className="group px-7 py-4 bg-[#FAF4E8]/90 hover:bg-[#FAF4E8] text-[#4A2B18] hover:text-[#9A6B29] font-semibold rounded-full border border-[#E8DCCB] hover:border-[#9A6B29]/40 backdrop-blur-md transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2.5 text-sm tracking-wide"
              >
                <span>Explore Range</span>
                <ShoppingBag className="w-4 h-4 text-[#9A6B29] group-hover:scale-110 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Overlapping Bottom Feature Pill Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-16 pb-12">
        <div className="bg-[#FAF6EE] border border-[#E8DCCB] rounded-2xl sm:rounded-3xl lg:rounded-[32px] p-4 sm:p-8 shadow-pill">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E8DCCB]/60">

            {/* Feature 1: 100% Natural */}
            <div className="flex items-start gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF4E8] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] shrink-0 shadow-inner">
                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-serif font-bold text-xs sm:text-base text-[#4A2B18]">
                  100% Natural
                </h4>
                <p className="text-[11px] sm:text-xs text-[#7C5C43] leading-relaxed">
                  No chemicals, no artificial additives.
                </p>
              </div>
            </div>

            {/* Feature 2: Farm Fresh */}
            <div className="flex items-start gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF4E8] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] shrink-0 shadow-inner">
                <Wheat className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-serif font-bold text-xs sm:text-base text-[#4A2B18]">
                  Farm Fresh
                </h4>
                <p className="text-[11px] sm:text-xs text-[#7C5C43] leading-relaxed">
                  Sourced directly from trusted farmers.
                </p>
              </div>
            </div>

            {/* Feature 3: Traditional Process */}
            <div className="flex items-start gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF4E8] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-serif font-bold text-xs sm:text-base text-[#4A2B18]">
                  Traditional Process
                </h4>
                <p className="text-[11px] sm:text-xs text-[#7C5C43] leading-relaxed">
                  Stone ground & cold pressed for purity.
                </p>
              </div>
            </div>

            {/* Feature 4: Healthy & Pure */}
            <div className="flex items-start gap-3 sm:gap-4 pt-3 sm:pt-0 sm:px-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAF4E8] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] shrink-0 shadow-inner">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div className="space-y-0.5 sm:space-y-1">
                <h4 className="font-serif font-bold text-xs sm:text-base text-[#4A2B18]">
                  Healthy & Pure
                </h4>
                <p className="text-[11px] sm:text-xs text-[#7C5C43] leading-relaxed">
                  Wholesome products for a better you.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
