import React, { useState } from 'react';
import { Star, Quote, Shuffle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 'r-1',
      name: 'Sunita Sharma',
      location: 'New Delhi',
      product: 'Sharbati Whole Wheat Atta',
      rating: 5,
      comment: 'The rotis made with True Chakki atta stay amazingly soft till dinner! You can literally smell the sweet natural aroma of freshly ground wheat as soon as you open the bag. Never buying store maida-mixed flour again.',
      date: 'Verified Buyer • 2 days ago',
      initials: 'SS',
      badgeColor: 'bg-[#9A6B29]',
    },
    {
      id: 'r-2',
      name: 'Vikramaditya Roy',
      location: 'Kolkata',
      product: 'Cold-Pressed Mustard Oil (Kachi Ghani)',
      rating: 5,
      comment: 'Authentic wooden Kolhu mustard oil! The natural sharpness (jhaanjh) and golden color are 100% genuine. Reminds me of traditional mustard oil from our ancestral home in Bengal.',
      date: 'Verified Buyer • 1 week ago',
      initials: 'VR',
      badgeColor: 'bg-[#4A2B18]',
    },
    {
      id: 'r-3',
      name: 'Meenakshi Iyer',
      location: 'Bengaluru',
      product: 'Homemade Mango Pickle',
      rating: 5,
      comment: 'The mango pickle tastes exactly like my grandmother used to make in ceramic jars under the sun. Pure mustard oil base, crunchy raw mango pieces, and perfectly balanced spices. Highly recommended!',
      date: 'Verified Buyer • 3 days ago',
      initials: 'MI',
      badgeColor: 'bg-[#7C5C43]',
    },
    {
      id: 'r-4',
      name: 'Ananya Deshmukh',
      location: 'Mumbai',
      product: 'Wood-Pressed Groundnut Oil',
      rating: 5,
      comment: 'Switched to cold-pressed oil 3 months ago for my family health. The pure nut aroma and natural taste in daily cooking is night and day compared to refined oils. Pure and unadulterated!',
      date: 'Verified Buyer • 5 days ago',
      initials: 'AD',
      badgeColor: 'bg-[#9A6B29]',
    },
    {
      id: 'r-5',
      name: 'Rajesh Kulkarni',
      location: 'Pune',
      product: 'Stone Ground Multi-Grain Atta',
      rating: 5,
      comment: 'High fiber, rich wheat flavor, and zero bloating. The packaging arrived super fast and vacuum sealed. Exceptional quality and customer care!',
      date: 'Verified Buyer • 4 days ago',
      initials: 'RK',
      badgeColor: 'bg-[#4A2B18]',
    },
  ];

  // Array of indices representing card position from top to bottom
  const [deck, setDeck] = useState<number[]>([0, 1, 2, 3, 4]);
  const [shuffleDirection, setShuffleDirection] = useState<number>(1); // 1 = right, -1 = left

  const handleShuffle = () => {
    // Alternate shuffle exit direction for playful card dynamics
    setShuffleDirection((prev) => (prev > 0 ? -1 : 1));
    setDeck((prev) => {
      const [top, ...rest] = prev;
      return [...rest, top];
    });
  };

  const handleSelectCard = (targetIndex: number) => {
    setDeck((prev) => {
      const filtered = prev.filter((i) => i !== targetIndex);
      return [targetIndex, ...filtered];
    });
  };

  // Preset offsets for stacked card depth look
  const stackStyles = [
    { scale: 1, y: 0, rotate: 0, zIndex: 30, opacity: 1, shadow: 'shadow-2xl border-[#9A6B29]/30' },
    { scale: 0.95, y: 16, rotate: 3.5, zIndex: 20, opacity: 0.92, shadow: 'shadow-lg border-[#E8DCCB]' },
    { scale: 0.9, y: 32, rotate: -3.5, zIndex: 10, opacity: 0.75, shadow: 'shadow-md border-[#E8DCCB]' },
    { scale: 0.85, y: 48, rotate: 2, zIndex: 5, opacity: 0.5, shadow: 'shadow-xs border-[#E8DCCB]' },
    { scale: 0.8, y: 64, rotate: -2, zIndex: 1, opacity: 0.2, shadow: 'shadow-none border-[#E8DCCB]' },
  ];

  return (
    <section className="py-20 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF4E8] border border-[#E8DCCB] rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL STORIES FROM HOMES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B18] tracking-tight">
            Loved by 25,000+ Families
          </h2>
          <p className="text-xs sm:text-base text-[#7C5C43] leading-relaxed">
            Read authentic reviews from homemakers who switched to 100% stone-milled flour & cold-pressed oils.
          </p>
        </div>

        {/* STACK SHUFFLE DECK CANVAS */}
        <div className="relative max-w-md sm:max-w-lg mx-auto min-h-[420px] flex flex-col items-center justify-start pt-2">
          
          {/* Interactive Stack Canvas */}
          <div className="relative w-full h-[360px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {deck.slice(0, 4).map((reviewIndex, stackPosition) => {
                const review = reviews[reviewIndex];
                const isTop = stackPosition === 0;
                const style = stackStyles[stackPosition] || stackStyles[3];

                return (
                  <motion.div
                    key={review.id}
                    layout
                    initial={{
                      scale: style.scale - 0.05,
                      y: style.y + 20,
                      opacity: 0,
                      rotate: style.rotate,
                    }}
                    animate={{
                      scale: style.scale,
                      y: style.y,
                      rotate: style.rotate,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                    }}
                    exit={{
                      x: shuffleDirection * 320,
                      rotate: shuffleDirection * 25,
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.35, ease: 'easeInOut' },
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    onClick={isTop ? handleShuffle : () => handleSelectCard(reviewIndex)}
                    className={`absolute inset-x-0 mx-auto w-full bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl border ${style.shadow} cursor-pointer select-none space-y-5 flex flex-col justify-between transition-colors hover:border-[#9A6B29]/60`}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <Quote className="w-10 h-10 text-[#CFB57F]/25 absolute top-5 right-5 pointer-events-none" />

                    {/* Card Content */}
                    <div className="space-y-3.5">
                      
                      {/* Rating & Product Tag */}
                      <div className="flex items-center justify-between gap-2 pr-8">
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#CFB57F] text-[#CFB57F]" />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-[#9A6B29] bg-[#FAF4E8] px-3 py-1 rounded-full border border-[#E8DCCB] truncate max-w-[170px]">
                          {review.product}
                        </span>
                      </div>

                      {/* Review Quote Text */}
                      <p className="text-xs sm:text-sm text-[#4A2B18] leading-relaxed italic font-sans">
                        "{review.comment}"
                      </p>

                    </div>

                    {/* Reviewer Details Footer */}
                    <div className="pt-4 border-t border-[#E8DCCB]/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${review.badgeColor} text-white flex items-center justify-center font-bold text-xs shadow-xs`}>
                          {review.initials}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm text-[#4A2B18] flex items-center gap-1.5">
                            <span>{review.name}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9A6B29]" />
                          </h4>
                          <span className="text-[11px] text-[#7C5C43]">{review.location}</span>
                        </div>
                      </div>

                      <span className="text-[10px] text-[#7C5C43]/80 font-medium">
                        {review.date}
                      </span>
                    </div>

                    {/* Tap to Shuffle Overlay Hint on Top Card */}
                    {isTop && (
                      <div className="absolute -bottom-3 inset-x-0 flex justify-center pointer-events-none">
                        <span className="bg-[#4A2B18] text-[#FAF4E8] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-[#9A6B29]/40 animate-pulse">
                          <Shuffle className="w-3 h-3 text-[#CFB57F]" />
                          <span>Click card to shuffle</span>
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination & Dot Navigators */}
          <div className="mt-8 flex items-center gap-2">
            {reviews.map((rev, idx) => {
              const isActive = deck[0] === idx;
              return (
                <button
                  key={rev.id}
                  onClick={() => handleSelectCard(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-8 bg-[#9A6B29]' : 'w-2.5 bg-[#E8DCCB] hover:bg-[#9A6B29]/50'
                  }`}
                  title={`View story by ${rev.name}`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
