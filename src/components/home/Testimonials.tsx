import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 'r-1',
      name: 'Sunita Sharma',
      location: 'New Delhi',
      product: 'Sharbati Whole Wheat Atta',
      rating: 5,
      comment: 'The rotis made with True Chakki atta stay amazingly soft till dinner! You can literally smell the sweet natural aroma of freshly ground wheat as soon as you open the bag. Never buying store maida-mixed flour again.',
    },
    {
      id: 'r-2',
      name: 'Vikramaditya Roy',
      location: 'Kolkata',
      product: 'Cold-Pressed Mustard Oil (Kachi Ghani)',
      rating: 5,
      comment: 'Authentic wooden Kolhu mustard oil! The natural sharpness (jhaanjh) and golden color are 100% genuine. Reminds me of traditional mustard oil from our ancestral home in Bengal.',
    },
    {
      id: 'r-3',
      name: 'Meenakshi Iyer',
      location: 'Bengaluru',
      product: 'Homemade Mango Pickle',
      rating: 5,
      comment: 'The mango pickle tastes exactly like my grandmother used to make in ceramic jars under the sun. Pure mustard oil base, crunchy raw mango pieces, and perfectly balanced spices. Highly recommended!',
    },
  ];

  return (
    <section className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29]">
            REAL STORIES FROM HOMES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A2B18]">
            Loved by 25,000+ Families Across India
          </h2>
          <p className="text-sm text-[#7C5C43] leading-relaxed">
            Read what homemakers have to say about switching to 100% stone-ground flour and traditional cold-pressed oils.
          </p>
        </div>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF6EE] p-8 rounded-3xl border border-[#E8DCCB] space-y-6 flex flex-col justify-between shadow-sm relative"
            >
              <Quote className="w-10 h-10 text-[#CFB57F]/30 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#CFB57F] text-[#CFB57F]" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-xs text-[#4A2B18] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="pt-4 border-t border-[#E8DCCB]/60 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#4A2B18]">{review.name}</h4>
                  <span className="text-[11px] text-[#7C5C43]">{review.location}</span>
                </div>
                <span className="text-[10px] font-semibold text-[#9A6B29] bg-[#FAF4E8] px-2.5 py-1 rounded-full border border-[#E8DCCB]">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
