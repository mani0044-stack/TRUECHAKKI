import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, CheckCircle2, Leaf, Award, Heart, ArrowRight } from 'lucide-react';

interface ProcessStep {
  step: string;
  badge: string;
  tagline: string;
  title: string;
  description: string;
  image: string;
  highlights: string[];
}

const processSteps: ProcessStep[] = [
  {
    step: '01',
    badge: '100% Traceable',
    tagline: 'Direct Farm Sourcing',
    title: 'Heritage & Non-GMO Grains',
    description:
      'We partner directly with trusted heritage farmers in Punjab & Rajasthan. Zero middle-men, zero synthetic pesticides, and full origin transparency.',
    image: '/images/Directfromframs.png',
    highlights: ['Non-GMO Verified Crops', 'Direct Farmer Fair Trade'],
  },
  {
    step: '02',
    badge: 'Under 40°C Low Heat',
    tagline: 'Traditional Stone Milling',
    title: 'Cold Stone Friction',
    description:
      'Milled slowly on heavy natural emery stones at low RPM. Grinding never exceeds 40°C, locking in essential dietary fiber, germ oil, and natural vitamins.',
    image: '/images/TraditionalStoneMilling.png',
    highlights: ['Full Bran & Germ Preserved', 'Zero Nutrient Degradation'],
  },
  {
    step: '03',
    badge: 'Kachi Ghani Method',
    tagline: 'Wood-Pressed Kolhu',
    title: 'Unrefined Pure Extraction',
    description:
      'Extracted in authentic slow-moving wooden mortars (Kolhu). No chemical solvents, no bleaching, and no heat — only raw, unadulterated cold-pressed oil.',
    image: '/images/Woodpressed.png',
    highlights: ['Natural Aroma & Antioxidants', 'Zero Chemical Solvents'],
  },
  {
    step: '04',
    badge: 'Sealed Fresh',
    tagline: 'Clean Packaging',
    title: 'Zero Chemical Packaging',
    description:
      'Packed within hours of grinding in breathable, food-grade packaging. Never pre-treated with artificial preservatives, shelf-extenders, or bleaching agents.',
    image: '/images/packaging.png',
    highlights: ['Milled Fresh on Every Order', '0% Maida, Bleach or Preservatives'],
  },
];

const purityGuarantees = [
  {
    icon: Leaf,
    title: '100% Whole Grain',
    subtitle: 'Bran & germ never stripped away',
  },
  {
    icon: Award,
    title: 'Cold Stone Ground',
    subtitle: 'Milled under 40°C to protect nutrients',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Additives',
    subtitle: 'No Maida, preservatives, or artificial aroma',
  },
  {
    icon: Heart,
    title: 'Freshly Milled',
    subtitle: 'Ground on-demand for maximum vitality',
  },
];

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden border-y border-[#E8DCCB]/60">
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#4A2B18_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9A6B29]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29]">
              THE TRUE CHAKKI PROMISE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B18] tracking-tight">
            How We Preserve Nature's Purity
          </h2>

          <p className="text-sm sm:text-base text-[#7C5C43] leading-relaxed max-w-2xl mx-auto">
            Modern commercial flours remove the nutrient-dense germ and bran for longer shelf life.
            We do the exact opposite — preserving 100% of whole food nutrition, exactly as nature intended.
          </p>

          {/* Sequential Step Journey Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-[#7C5C43]">
            <span className="px-3 py-1 bg-white/80 rounded-full border border-[#E8DCCB] text-[#4A2B18] font-semibold">
              1. Farm Sourced
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A6B29]" />
            <span className="px-3 py-1 bg-white/80 rounded-full border border-[#E8DCCB] text-[#4A2B18] font-semibold">
              2. Cold Stone Milled
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A6B29]" />
            <span className="px-3 py-1 bg-white/80 rounded-full border border-[#E8DCCB] text-[#4A2B18] font-semibold">
              3. Wood Pressed
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9A6B29]" />
            <span className="px-3 py-1 bg-white/80 rounded-full border border-[#E8DCCB] text-[#4A2B18] font-semibold">
              4. Fresh Packed
            </span>
          </div>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8DCCB] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container with Floating Step & Badges */}
              <div className="relative h-56 sm:h-60 overflow-hidden bg-[#FAF4E8]">
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Step Number */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-[#4A2B18] shadow-md border border-[#E8DCCB]/60">
                  <span className="text-[#9A6B29]">STEP</span>
                  <span>{step.step}</span>
                </div>

                {/* Highlight Badge */}
                <div className="absolute top-3.5 right-3.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/20">
                  {step.badge}
                </div>

                {/* Category subtitle over image bottom */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-200 block drop-shadow-sm">
                    {step.tagline}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#4A2B18] leading-snug group-hover:text-[#9A6B29] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#7C5C43] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-3 border-t border-[#F2ECE1] space-y-2">
                  {step.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs font-medium text-[#4A2B18]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#9A6B29] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Purity Guarantee Trust Banner */}
        <div className="mt-14 lg:mt-16 bg-gradient-to-br from-[#4A2B18] via-[#3D2111] to-[#4A2B18] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#9A6B29]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#9A6B29]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#CFB57F]">
                Our Uncompromising Standard
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                The 4 Purity Guarantees
              </h3>
              <p className="text-xs sm:text-sm text-[#E8DCCB]/80">
                What we keep in — and what we strictly keep out of your family's food.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {purityGuarantees.map(({ icon: Icon, title, subtitle }) => (
                <div
                  key={title}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-4.5 border border-white/10 hover:border-[#CFB57F]/40 transition-colors flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#9A6B29]/30 text-[#CFB57F] flex items-center justify-center shrink-0 border border-[#CFB57F]/30">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">{title}</h4>
                    <p className="text-xs text-[#E8DCCB]/75 mt-0.5 leading-snug">{subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};