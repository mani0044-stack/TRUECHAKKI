import React, { useState } from 'react';
import { 
  Leaf, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Flame,
  Zap,
  Users,
  Wheat,
  Droplets,
  PackageCheck,
  Shield
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export const AboutPage: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const stats = [
    { label: 'Happy Families Served', value: '50,000+', icon: Users, subtext: 'Pan-India delivery' },
    { label: 'Single-Origin Grains', value: '100% Pure', icon: Leaf, subtext: 'Directly from heritage farms' },
    { label: 'Low Temperature Milled', value: '< 40°C', icon: Flame, subtext: 'Retains 100% natural nutrients' },
    { label: 'Chemicals & Preservatives', value: '0%', icon: ShieldCheck, subtext: 'Zero added additives' },
  ];

  const pillars = [
    {
      icon: Leaf,
      title: 'Single-Origin Organic Grains',
      description: 'We source unadulterated Sharbati wheat, Kathia grains, and indigenous seeds directly from certified chemical-free farms in Madhya Pradesh and Rajasthan.',
      badge: 'Farm Direct'
    },
    {
      icon: Droplets,
      title: 'Traditional Wooden Kolhu Oils',
      description: 'Extracted using traditional slow-churning wooden expellers (Kolhus) without solvent extraction or external heating, locking in MUFA and natural aromatic pungency.',
      badge: 'Cold-Pressed'
    },
    {
      icon: HeartHandshake,
      title: 'Direct Farmer Empowerment',
      description: 'By bypassing industrial commercial brokers, we ensure 100% fair prices are remitted directly to smallholder farming families, nurturing sustainable rural growth.',
      badge: 'Fair Trade'
    },
    {
      icon: PackageCheck,
      title: 'Freshly Milled Upon Order',
      description: 'We never keep pre-packaged bags stored in dusty warehouses for months. Your grains are stone-ground fresh only after your order is confirmed.',
      badge: 'Zero Storage'
    },
  ];

  const journeySteps = [
    {
      step: '01',
      title: 'Heritage Sourcing',
      desc: 'Hand-selected non-GMO grains sourced directly from verified organic farms.',
      image: '/images/Directfromframs.png'
    },
    {
      step: '02',
      title: 'Triple-Stage Sun Drying',
      desc: 'Naturally sun-cured and winnowed to remove moisture without chemical fumigation.',
      image: '/images/IMG_7401.PNG'
    },
    {
      step: '03',
      title: 'Slow Stone Chakki Grinding',
      desc: 'Traditional granite stones grind at low RPM, keeping temperatures below 40°C to preserve wheat germ & fiber.',
      image: '/images/TraditionalStoneMilling.png'
    },
    {
      step: '04',
      title: 'Eco-Hygienic Packaging',
      desc: 'Sealed in food-grade, moisture-proof craft pouches and shipped fresh straight to your doorstep.',
      image: '/images/packaging.png'
    },
  ];

  const faqs = [
    {
      q: 'Why is stone-ground atta better than commercial branded store atta?',
      a: 'Commercial high-speed roller mills generate high heat (above 90°C) which burns away vital B-vitamins, dietary fiber, and natural wheat germ oil. Stone-ground flour keeps the temperature cool, preserving 100% of the natural bran, germ, and authentic flavor.'
    },
    {
      q: 'How long does True Chakki freshly milled flour stay fresh?',
      a: 'Because our flour contains no chemical preservatives, artificial bleaching agents, or anti-caking additives, we recommend consuming it within 45 to 60 days for peak flavor and nutrition. Storing it in an airtight glass or steel container keeps it fresh.'
    },
    {
      q: 'Are your cold-pressed oils refined or bleached?',
      a: 'Never! Our cold-pressed (Kachi Ghani) mustard, sesame, and groundnut oils are 100% raw, unrefined, and micro-filtered using cotton cloth filters without any chemical refining or deodorization.'
    },
    {
      q: 'Can I request custom grinding coarseness for my flour?',
      a: 'Yes! We offer options ranging from fine rotis, coarse daliya/bati flour, to medium grain texture depending on your family’s nutritional preferences.'
    },
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen pt-24 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] text-[#9A6B29] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-[#9A6B29]" />
          <span>OUR HERITAGE & MISSION STORY</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#4A2B18] leading-tight sm:leading-none">
          Bringing Pure, Stone-Ground Living <br className="hidden sm:inline" /> Back to Every Indian Home
        </h1>

        <p className="text-base sm:text-lg text-[#7C5C43] max-w-3xl mx-auto leading-relaxed font-normal">
          True Chakki was born out of a simple, uncompromising promise: to rescue our daily food from high-speed industrial processing. We revive ancient stone-milling and wooden Kolhu cold-pressing to deliver wholesome, unadulterated nourishment fresh to your kitchen.
        </p>

        {/* Feature Badges Row */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-[#4A2B18]">
          <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E8DCCB]">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B29]" /> 100% Stone-Ground
          </span>
          <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E8DCCB]">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B29]" /> Cold-Pressed Kolhu Oils
          </span>
          <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E8DCCB]">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B29]" /> Milled Fresh On-Demand
          </span>
          <span className="flex items-center gap-1.5 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#E8DCCB]">
            <CheckCircle2 className="w-4 h-4 text-[#9A6B29]" /> 0% Added Chemicals
          </span>
        </div>
      </section>

      {/* 2. KEY STATS BANNER */}
      <section className="max-w-6xl mx-auto bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#E8DCCB]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`space-y-2 ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}>
                <div className="w-10 h-10 mx-auto rounded-full bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center text-[#9A6B29]">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-serif text-2xl sm:text-4xl font-extrabold text-[#4A2B18]">{stat.value}</p>
                <p className="text-xs sm:text-sm font-bold text-[#4A2B18]">{stat.label}</p>
                <p className="text-[11px] text-[#7C5C43]">{stat.subtext}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. COMPARISON: TRADITIONAL CHAKKI VS INDUSTRIAL ROLLER MILL */}
      <section className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#9A6B29]">THE SCIENCE OF PURITY</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2B18]">
            Why Traditional Stone Milling Beats Industrial Mills
          </h2>
          <p className="text-sm sm:text-base text-[#7C5C43]">
            Most commercial supermarket flour is stripped of its vital nutrients during high-speed extraction. Here is how True Chakki safeguards your family's health.
          </p>
        </div>

        {/* Responsive Grid Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* True Chakki Card */}
          <div className="bg-[#FAF6EE] rounded-3xl border-2 border-[#9A6B29]/40 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-[#9A6B29] text-white text-[11px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
              True Chakki Standard
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#9A6B29]/10 flex items-center justify-center text-[#9A6B29]">
                  <Wheat className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4A2B18]">Natural Stone Chakki</h3>
                  <p className="text-xs text-[#9A6B29] font-medium">Slow RPM • Low Temperature (&lt;40°C)</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#4A2B18]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <span><strong>Preserves Wheat Germ Oil:</strong> Essential vitamin E &amp; natural heart-healthy lipids are preserved intact.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <span><strong>Full Bran &amp; Fiber Intact:</strong> Enhances digestion and promotes a steady, low glycemic index.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <span><strong>Authentic Nutty Aroma:</strong> Rotis stay softer, fluffier, and naturally aromatic for hours.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#9A6B29] shrink-0 mt-0.5" />
                  <span><strong>Zero Added Chemicals:</strong> No Maida mixing, no chalk bleaching, no synthetic preservatives.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between text-xs text-[#7C5C43]">
              <span>Grinding Speed: <strong>120-140 RPM</strong></span>
              <span className="text-[#9A6B29] font-bold">100% Nutrient Retention</span>
            </div>
          </div>

          {/* Industrial Roller Mill Card */}
          <div className="bg-[#FAF6EE]/50 rounded-3xl border border-[#E8DCCB] p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#4A2B18]">Commercial Roller Mills</h3>
                  <p className="text-xs text-red-600 font-medium">High Speed • Extreme Heat (&gt;90°C)</p>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#7C5C43]">
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <span><strong>Wheat Germ Stripped:</strong> High heat destroys natural oils to prolong warehouse shelf-life.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <span><strong>Bran Sifted Out:</strong> Fiber is separated to produce refined Maida as profitable byproduct.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <span><strong>Loss of B-Vitamins:</strong> Friction heat destroys heat-sensitive thiamine &amp; folate.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                  <span><strong>Bleaching &amp; Anti-Caking:</strong> Chemical treatments used for white appearance and long storage.</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E8DCCB] flex items-center justify-between text-xs text-[#7C5C43]">
              <span>Grinding Speed: <strong>1500+ RPM</strong></span>
              <span className="text-red-600 font-medium">Significant Nutrient Loss</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR 4 PILLARS OF PURITY */}
      <section className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#9A6B29]">OUR CORE PHILOSOPHY</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2B18]">
            The Four Pillars of True Chakki
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 space-y-4 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center text-[#9A6B29] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#9A6B29] bg-[#FAF4E8] px-2.5 py-0.5 rounded-full border border-[#E8DCCB]">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#4A2B18] group-hover:text-[#9A6B29] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#7C5C43] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FARM-TO-KITCHEN MILLING JOURNEY TIMELINE */}
      <section className="max-w-6xl mx-auto bg-[#FAF6EE] rounded-3xl border border-[#E8DCCB] p-6 sm:p-12 space-y-10 shadow-sm">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-[#9A6B29]">TRANSPARENT PROCESS</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2B18]">
            Our Farm-to-Kitchen Freshness Journey
          </h2>
          <p className="text-sm text-[#7C5C43]">
            Every step is carefully orchestrated to guarantee peak flavor, safety, and nutritional density.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeySteps.map((step, idx) => (
            <div key={idx} className="space-y-4 flex flex-col">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[#E8DCCB] bg-[#E8DCCB]/40 relative group">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <span className="absolute top-3 left-3 bg-[#4A2B18] text-white text-xs font-serif font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  {step.step}
                </span>
              </div>

              <div className="space-y-1.5 px-1">
                <h3 className="font-serif font-bold text-base text-[#4A2B18]">{step.title}</h3>
                <p className="text-xs text-[#7C5C43] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. QUALITY GUARANTEE & LAB CERTIFICATIONS */}
      <section className="max-w-5xl mx-auto bg-[#4A2B18] text-[#FDFBF7] rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#9A6B29]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9A6B29]/30 text-[#E8DCCB] text-xs font-semibold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-[#9A6B29]" />
              <span>UNCOMPROMISING QUALITY PROMISE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
              Lab-Tested &amp; FSSAI Certified Pure
            </h2>
            <p className="text-xs sm:text-sm text-[#E8DCCB]/90 leading-relaxed max-w-xl">
              Every batch of grain and oil undergoes rigorous NABL lab testing for heavy metals, pesticides, aflatoxins, and moisture content. We guarantee zero adulteration from mill to table.
            </p>
          </div>

          <div className="bg-[#FAF6EE]/10 backdrop-blur-md rounded-2xl p-6 border border-[#E8DCCB]/20 text-center space-y-4">
            <Award className="w-12 h-12 text-[#9A6B29] mx-auto" />
            <div className="space-y-1">
              <p className="font-serif font-bold text-lg text-white">100% Satisfaction Guarantee</p>
              <p className="text-xs text-[#E8DCCB]/80">Love the softness &amp; aroma of your rotis or get a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-[#9A6B29]">GOT QUESTIONS?</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#4A2B18]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-[#FAF6EE] rounded-2xl border border-[#E8DCCB] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-[#4A2B18] hover:text-[#9A6B29] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#9A6B29] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#7C5C43] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-xs sm:text-sm text-[#7C5C43] leading-relaxed border-t border-[#E8DCCB]/60 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="max-w-5xl mx-auto text-center bg-gradient-to-br from-[#FAF6EE] to-[#FAF4E8] rounded-3xl border border-[#E8DCCB] p-8 sm:p-14 space-y-6 shadow-md">
        <span className="text-xs font-bold uppercase tracking-widest text-[#9A6B29]">TASTE THE DIFFERENCE TODAY</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
          Experience Real Freshly Stone-Ground Flours &amp; Cold-Pressed Oils
        </h2>
        <p className="text-sm text-[#7C5C43] max-w-xl mx-auto leading-relaxed">
          Switch to natural nutrition today. Order your freshly stone-ground Sharbati Atta, wood-pressed Mustard Oil, and traditional spices delivered to your home.
        </p>
        <div>
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-[#4A2B18] hover:bg-[#9A6B29] text-white text-sm font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 group"
          >
            <span>Explore Farm Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

    </div>
  );
};
