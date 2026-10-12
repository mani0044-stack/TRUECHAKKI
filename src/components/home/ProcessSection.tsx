import React from 'react';

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

export const ProcessSection: React.FC = () => {
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

      </div>

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

        @keyframes process-carousel-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .process-carousel__track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};