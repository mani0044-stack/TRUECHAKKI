import React, { useState } from 'react';
import { Star, Quote, Shuffle, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      id: 'r-1',
      name: 'Surjaspreet Singh',
      location: '4 Google Reviews',
      product: 'Stone-Milled Atta',
      rating: 5,
      comment: 'Ultimate taste and hygiene — the old-school flavor you remember, ground the traditional way.',
      date: '22 weeks ago',
      initials: 'SS',
      badgeColor: 'bg-[#9A6B29]',
    },
    {
      id: 'r-2',
      name: 'Stuti Manajan',
      location: 'Local Guide • 21 Reviews',
      product: 'Cold-Pressed Atta & Desi Ghee Cookies',
      rating: 5,
      comment: 'The best place in town for cold-pressed atta and clean groceries — the desi ghee cookies are a favorite too.',
      date: '4 weeks ago',
      initials: 'SM',
      badgeColor: 'bg-[#4A2B18]',
    },
    {
      id: 'r-3',
      name: 'Kala Sonipat',
      location: '2 Google Reviews',
      product: 'Stone-Ground Wheat Atta',
      rating: 5,
      comment: 'Whatever natural quality the wheat has, that same quality shines through in flour ground on a natural stone chakki.',
      date: '17 weeks ago',
      initials: 'KS',
      badgeColor: 'bg-[#7C5C43]',
    },
  ];

  // Array of indices representing card position from top to bottom
  const [deck, setDeck] = useState<number[]>([0, 1, 2]);
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
            Loved by Our Amritsar Family
          </h2>
          <p className="text-xs sm:text-base text-[#7C5C43] leading-relaxed">
            Real 5-star reviews from our Google Business Profile, from customers who switched to 100% stone-milled flour & cold-pressed oils.
          </p>
        </div>

        {/* STACK SHUFFLE DECK CANVAS */}
        <div className="relative max-w-md sm:max-w-lg mx-auto min-h-[420px] flex flex-col items-center justify-start pt-2">

          {/* Interactive Stack Canvas */}
          <div className="relative w-full h-[360px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {deck.slice(0, 3).map((reviewIndex, stackPosition) => {
                const review = reviews[reviewIndex];
                const isTop = stackPosition === 0;
                const style = stackStyles[stackPosition] || stackStyles[2];

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
                  title={`View review ${idx + 1}`}
                />
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};