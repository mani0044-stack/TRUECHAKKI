import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, ChevronLeft, ChevronRight, AtSign, Video } from 'lucide-react';

interface ReelItem {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  posterImage: string;
  instagramUrl: string;
}

// Config: paste your reel MP4 URLs (or hosted video links) and the Instagram
// post/reel URLs for each card here.
const REELS: ReelItem[] = [
  {
    id: 'reel-1',
    title: 'Stone-Ground Fresh Atta',
    caption: '100% natural stone chakki atta, milled fresh for you.',
    videoUrl: '',
    posterImage: '/images/IMG_7401.PNG',
    instagramUrl: 'https://www.instagram.com/reel/REEL_CODE_1/',
  },
  {
    id: 'reel-2',
    title: 'Wood-Pressed Oils',
    caption: 'Traditional kachi ghani oils made the pure, slow way.',
    videoUrl: '',
    posterImage: '/images/IMG_7637new.PNG',
    instagramUrl: 'https://www.instagram.com/reel/REEL_CODE_2/',
  },
  {
    id: 'reel-3',
    title: 'Fresh from the Farm',
    caption: 'Straight from the farm to your home — pure & natural.',
    videoUrl: '',
    posterImage: '/images/groundatta.PNG',
    instagramUrl: 'https://www.instagram.com/reel/REEL_CODE_3/',
  },
];

const stackStyles = [
  { scale: 1, y: 0, rotate: 0, zIndex: 30, shadow: 'shadow-2xl border-[#9A6B29]/30' },
  { scale: 0.9, y: -14, rotate: -7, zIndex: 20, shadow: 'shadow-lg border-[#E8DCCB]' },
  { scale: 0.8, y: -22, rotate: 7, zIndex: 10, shadow: 'shadow-md border-[#E8DCCB]' },
];

const ReelCard: React.FC<{ reel: ReelItem; visible: boolean; onClick: () => void }> = ({ reel, visible, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: visible ? 1 : 0, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
    onClick={onClick}
    className={`relative w-[200px] sm:w-[230px] aspect-[9/16] rounded-3xl overflow-hidden bg-[#4A2B18] cursor-pointer select-none group shrink-0 ${stackStyles[0].shadow}`}
  >
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
      <img src={reel.posterImage} alt={reel.title} className="w-full h-full object-cover" />
    )}

    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 text-[10px] font-bold text-[#4A2B18] uppercase tracking-wider shadow-md">
      <AtSign className="w-3 h-3" />
      <span>Reel</span>
    </div>

    <div className="absolute inset-x-0 bottom-0 p-4 space-y-1.5">
      <h3 className="font-serif text-white font-bold text-sm leading-snug">{reel.title}</h3>
      <p className="text-white/80 text-[11px] line-clamp-2 leading-relaxed">{reel.caption}</p>
    </div>

    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="w-12 h-12 rounded-full bg-white/90 backdrop-blur text-[#4A2B18] flex items-center justify-center shadow-xl">
        <Play className="w-5 h-5 fill-current" />
      </span>
    </div>
  </motion.div>
);

export const InstagramReels: React.FC = () => {
  const [frontIndex, setFrontIndex] = useState(0);
  const [openReel, setOpenReel] = useState<ReelItem | null>(null);

  const rotateDeck = useCallback((direction: number) => {
    setFrontIndex((prev) => (prev + direction + REELS.length) % REELS.length);
  }, []);

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

  const deckOrder = Array.from({ length: REELS.length }, (_, i) => (frontIndex + i) % REELS.length);

  return (
    <section className="py-20 bg-[#FAF7F2] border-t border-[#E8DCCB]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#FAF4E8] border border-[#E8DCCB] rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29] shadow-xs">
            <Video className="w-3.5 h-3.5" />
            <span>FOLLOW OUR JOURNEY</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B18] tracking-tight">
            Fresh From Our Chakkis
          </h2>
          <p className="text-xs sm:text-base text-[#7C5C43] leading-relaxed">
            Watch how we make 100% natural atta and oils — live videos from our kitchen and farm.
          </p>
        </div>

        {/* Deck of Reel Cards */}
        <div className="relative max-w-3xl mx-auto flex items-center justify-center gap-4">
          <button
            onClick={() => rotateDeck(-1)}
            className="hidden sm:flex w-11 h-11 rounded-full bg-white border border-[#E8DCCB] text-[#9A6B29] hover:bg-[#9A6B29] hover:text-white items-center justify-center shadow-md transition-all shrink-0"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="relative h-[420px] sm:h-[440px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {deckOrder.map((reelIndex, deckPosition) => {
                const reel = REELS[reelIndex];
                const isFront = deckPosition === 0;
                const style = stackStyles[Math.min(deckPosition, stackStyles.length - 1)];
                return (
                  <motion.div
                    key={reel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.7, y: 30 }}
                    animate={{
                      opacity: isFront ? 1 : 0.9,
                      scale: style.scale,
                      y: style.y,
                      rotate: style.rotate,
                      zIndex: style.zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.7, y: 30 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                    className="absolute inset-x-0 mx-auto flex justify-center"
                    onClick={() => isFront && setOpenReel(reel)}
                  >
                    <ReelCard reel={reel} visible={isFront} onClick={() => setOpenReel(reel)} />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            <span className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none">
              <span className="bg-[#4A2B18] text-[#FAF4E8] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md border border-[#9A6B29]/40 animate-pulse">
                Tap a reel to watch it
              </span>
            </span>
          </div>

          <button
            onClick={() => rotateDeck(1)}
            className="hidden sm:flex w-11 h-11 rounded-full bg-white border border-[#E8DCCB] text-[#9A6B29] hover:bg-[#9A6B29] hover:text-white items-center justify-center shadow-md transition-all shrink-0"
            aria-label="Next reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot Navigators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {REELS.map((reel, idx) => (
            <button
              key={reel.id}
              onClick={() => setFrontIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                frontIndex === idx ? 'w-8 bg-[#9A6B29]' : 'w-2.5 bg-[#E8DCCB] hover:bg-[#9A6B29]/50'
              }`}
              title={`View reel ${idx + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.instagram.com/_truechakki_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full transition-all text-sm shadow-md"
          >
            <AtSign className="w-4 h-4" />
            <span>Follow @_truechakki_</span>
          </a>
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
    </section>
  );
};