import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, AtSign } from 'lucide-react';
import { REELS, type ReelItem } from '../../data/reels';

interface ProcessStep {
  step: string;
  title: string;
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Direct Farm Sourcing',
    image: '/images/Directfromframs.png',
  },
  {
    step: '02',
    title: 'Traditional Stone Milling',
    image: '/images/TraditionalStoneMilling.png',
  },
  {
    step: '03',
    title: 'Wood-Pressed Kolhu Extraction',
    image: '/images/Woodpressed.png',
  },
  {
    step: '04',
    title: 'Zero Chemical Packaging',
    image: '/images/packaging.png',
  },
];

// Duplicate the list once so the strip can loop seamlessly:
// translating the track by exactly -50% always lines the duplicate
// up perfectly with the original, regardless of how many cards are
// visible on screen at a given breakpoint.
const carouselItems = [...processSteps, ...processSteps];

// Same -50% loop trick for the reel marquee (6 items = 3 reels x2).
const reelLoopItems = [...REELS, ...REELS];

const ReelCard: React.FC<{ reel: ReelItem; onClick: () => void }> = ({ reel, onClick }) => (
  <div onClick={onClick} className="relative rounded-3xl overflow-hidden shadow-md border border-[#E8DCCB] group h-60 sm:h-72 mr-6 cursor-pointer shrink-0">
    {reel.videoUrl ? (
      <video
        src={reel.videoUrl}
        poster={reel.posterImage}
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    ) : (
      <img
        src={reel.posterImage}
        alt={reel.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

    <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[10px] font-bold text-[#4A2B18] uppercase tracking-wider shadow-md">
      <AtSign className="w-3 h-3" />
      <span>Reel</span>
    </span>

    <div className="absolute bottom-0 left-0 right-0 p-5">
      <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">{reel.title}</h3>
      <p className="text-white/80 text-[11px] line-clamp-1 mt-0.5">{reel.caption}</p>
    </div>

    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur text-[#4A2B18] flex items-center justify-center shadow-xl">
        <Play className="w-5 h-5 fill-current" />
      </span>
    </div>
  </div>
);

export const ProcessSection: React.FC = () => {
  const [openReel, setOpenReel] = useState<ReelItem | null>(null);
  const closeLightbox = useCallback(() => setOpenReel(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (openReel) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [openReel, closeLightbox]);

  return (
    <section className="py-20 bg-[#FAF4E8] overflow-hidden">
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

        {/* Auto-scrolling image carousel */}
        <div className="process-carousel relative">
          {/* Edge fades for a premium, seamless look */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#FAF4E8] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#FAF4E8] to-transparent" />

          <div className="process-carousel__track">
            {carouselItems.map(({ step, title, image }, index) => (
              <div
                key={`${step}-${index}`}
                className="process-carousel__item"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-md border border-[#E8DCCB] group h-72 sm:h-80 mr-6">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                 
                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-scrolling reels marquee */}
        <div className="mt-8">
          <div className="text-center mb-6 space-y-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#4A2B18]">
              Watch It Happen
            </h3>
            <p className="text-xs sm:text-sm text-[#7C5C43]">
              Live videos from our chakkis, farms and packing — tap any reel to watch it full-screen.
            </p>
          </div>

          <div className="reel-marquee relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#FAF4E8] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#FAF4E8] to-transparent" />

            <div className="reel-marquee__track">
              {reelLoopItems.map((reel, index) => (
                <div key={`${reel.id}-${index}`} className="reel-marquee__item">
                  <ReelCard reel={reel} onClick={() => setOpenReel(reel)} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox: separate full view on click */}
      <AnimatePresence>
        {openReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-[#4A2B18] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[9/16] relative bg-black">
                {openReel.videoUrl ? (
                  <video
                    src={openReel.videoUrl}
                    poster={openReel.posterImage}
                    muted
                    autoPlay
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={openReel.posterImage}
                    alt={openReel.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={closeLightbox}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-[#4A2B18] flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9A6B29]" />
                  <h3 className="font-serif text-white font-bold text-lg">{openReel.title}</h3>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">{openReel.caption}</p>
                <a
                  href={openReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-sm transition-all shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Instagram</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /*
          The list is duplicated once (8 items total). The track's width is
          set, per breakpoint, so that each item's flex-basis (12.5% of the
          track = 1/8th) renders at exactly 1, 2, or 3 cards per screen.
          Because every item always occupies 1/8th of the track regardless
          of breakpoint, translateX(-50%) always lands exactly on item 5 —
          the start of the duplicate set — so the loop never jumps or stutters.
        */
        .process-carousel {
          position: relative;
          overflow: hidden;
        }

        .process-carousel__track {
          display: flex;
          width: 800%; /* 8 items / 1 visible on mobile */
          animation: process-carousel-scroll 18s linear infinite;
        }

        .process-carousel:hover .process-carousel__track {
          animation-play-state: paused;
        }

        .process-carousel__item {
          flex: 0 0 12.5%;
          box-sizing: border-box;
        }

        /* Tablet: 2 cards visible */
        @media (min-width: 640px) {
          .process-carousel__track {
            width: 400%; /* 8 items / 2 visible */
          }
        }

        /* Desktop: 3 cards visible */
        @media (min-width: 1024px) {
          .process-carousel__track {
            width: 266.6667%; /* 8 items / 3 visible */
          }
        }

        .reel-marquee {
          position: relative;
          overflow: hidden;
        }

        .reel-marquee__track {
          display: flex;
          width: 600%; /* 6 items / 1 visible on mobile */
          animation: process-carousel-scroll 28s linear infinite;
        }

        .reel-marquee:hover .reel-marquee__track {
          animation-play-state: paused;
        }

        .reel-marquee__item {
          flex: 0 0 16.6667%;
          box-sizing: border-box;
        }

        /* Tablet: 2 cards visible */
        @media (min-width: 640px) {
          .reel-marquee__track {
            width: 300%; /* 6 items / 2 visible */
          }
        }

        /* Desktop: 3 cards visible */
        @media (min-width: 1024px) {
          .reel-marquee__track {
            width: 200%; /* 6 items / 3 visible */
          }
        }

        @keyframes process-carousel-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-carousel__track,
          .reel-marquee__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};