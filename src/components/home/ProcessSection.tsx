import React from 'react';
import { ShieldCheck, Award, Heart, CheckCircle2, Wheat, Cog, FlaskConical, Package } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const processSteps = [
    {
      step: '01',
      title: 'Direct Farm Sourcing',
      description: 'We partner directly with organic certified farmers across Madhya Pradesh and Gujarat to source single-origin Sharbati wheat, mustard seeds, and Rajapuri mangoes.',
      icon: Wheat,
    },
    {
      step: '02',
      title: 'Traditional Stone Milling',
      description: 'Our natural granite stones rotate at slow RPM to prevent frictional heat build-up. This preserves delicate B-complex vitamins, dietary fiber, and wheat germ oils.',
      icon: Cog,
    },
    {
      step: '03',
      title: 'Wood-Pressed Kolhu Extraction',
      description: 'Oil seeds are crushed gently in traditional wooden Kolhu vats without adding artificial solvents or refining chemicals. 100% pure Kachi Ghani aroma.',
      icon: FlaskConical,
    },
    {
      step: '04',
      title: 'Zero Chemical Packaging',
      description: 'Freshly milled orders are packed in eco-friendly burlap bags and dark glass bottles to ensure zero oxidation, maximum freshness, and pristine shelf life.',
      icon: Package,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29]">
            THE TRUE CHAKKI PROMISE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            How We Preserve Nature's Purity
          </h2>
          <p className="text-sm text-[#7C5C43] leading-relaxed">
            Modern commercial flours remove the nutrient-dense germ and bran for longer shelf life. We do the exact opposite.
          </p>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map(({ step, title, description, icon: Icon }) => (
            <div
              key={step}
              className="bg-[#FDFBF7] p-8 rounded-3xl border border-[#E8DCCB] space-y-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="w-12 h-12 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] flex items-center justify-center text-[#9A6B29]">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </span>
                <span className="font-serif text-3xl font-bold text-[#E8DCCB] group-hover:text-[#9A6B29] transition-colors">
                  {step}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#4A2B18]">
                {title}
              </h3>
              <p className="text-xs text-[#7C5C43] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Seals Bar */}
        <div className="mt-16 bg-[#FAF6EE] p-6 rounded-2xl border border-[#E8DCCB] flex flex-wrap items-center justify-around gap-6 text-xs font-semibold text-[#4A2B18]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-700" />
            <span>FSSAI Certified Unit</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#9A6B29]" />
            <span>100% Chemical-Free Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#CFB57F]" />
            <span>Traditional Heritage Milling</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600" />
            <span>Over 25,000+ Happy Families</span>
          </div>
        </div>

      </div>
    </section>
  );
};
