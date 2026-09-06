import React from 'react';
import { ArrowRight, Leaf, Wheat, Sparkles, HeartHandshake } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const HeroSection: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);

  return (
    <section className="relative w-full bg-[#FAF7F2] overflow-hidden">

      {/* Seamless Hero Container with Full-Opacity Responsive Background Image */}
      <div className="relative w-full flex items-start sm:items-center min-h-[640px] sm:min-h-[720px] lg:min-h-[820px]">

        {/* Mobile Background Image (Visible on mobile < sm) */}
        <div
          className="block sm:hidden absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-100"
          style={{ backgroundImage: `url('/images/IMG_7401.PNG')` }}
        />

        {/* Desktop Background Image (Visible on sm and up) */}
        <div
          className="hidden sm:block absolute inset-0 bg-cover bg-[position:78%_center] lg:bg-center bg-no-repeat z-0 opacity-100"
          style={{ backgroundImage: `url('/images/IMG_7347.png')` }}
        />

        {/* Text Content Overlay - Elevated Upside on Mobile */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-25 sm:pt-36 lg:pt-44 pb-22 sm:pb-24 lg:pb-32 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="w-full sm:max-w-xl lg:max-w-2xl space-y-3.5 sm:space-y-6 flex flex-col items-center sm:items-start text-center sm:text-left">

            {/* Kicker Tag */}
            <div className="inline-flex items-center justify-center">
              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#4A2B18] bg-[#FAF4E8]/90 backdrop-blur-md border border-[#E8DCCB] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-xs">
                FROM OUR FARMS TO YOUR HOME
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-[#4A2B18] leading-[1.15] text-center sm:text-left">
              Pure. Natural. <br />
              <span className="italic font-semibold text-[#9A6B29]">Truly Yours.</span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-base lg:text-lg text-[#4A2B18]/95 font-sans leading-relaxed max-w-xs sm:max-w-md lg:max-w-lg text-center sm:text-left mx-auto sm:mx-0">
              True Chakki brings you the goodness of traditional farming. 100% natural products made with care, just like nature intended.
            </p>

            {/* CTA Button */}
            <div className="pt-1 sm:pt-2 flex justify-center sm:justify-start w-full sm:w-auto">
              <button
                onClick={() => navigateTo('shop')}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-[#9A6B29] hover:bg-[#80561F] text-white font-medium rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-base tracking-wide transform hover:-translate-y-0.5"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
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
