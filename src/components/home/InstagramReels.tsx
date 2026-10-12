import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, AtSign, Video, Sparkles, Volume2, Instagram } from 'lucide-react';
import { REELS, type ReelItem } from '../../data/reels';

interface ReelCardProps {
  reel: ReelItem;
  index: number;
  onSelect: (reel: ReelItem) => void;
}

const ReelCard: React.FC<ReelCardProps> = ({ reel, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onClick={() => onSelect(reel)}
      className="group relative rounded-[28px] overflow-hidden bg-[#2D180C] shadow-md hover:shadow-2xl border border-[#E8DCCB] hover:border-[#9A6B29]/50 transition-all duration-300 cursor-pointer select-none flex flex-col aspect-[9/16] w-full max-w-[320px] mx-auto hover:-translate-y-2"
    >
      {/* Background Media */}
      <div className="absolute inset-0 overflow-hidden">
        {reel.videoUrl ? (
          <video
            src={reel.videoUrl}
            poster={reel.posterImage}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <img
            src={reel.posterImage}
            alt={reel.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Cinematic gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 pointer-events-none" />

      {/* Top Header Overlay */}
      <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
          <Instagram className="w-3.5 h-3.5 text-pink-400" />
          <span>Reel</span>
        </div>

        {reel.duration && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white/90 text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span>{reel.duration}</span>
          </div>
        )}
      </div>

      {/* Center Play Button with Hover Ripple */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-md text-[#4A2B18] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#9A6B29] group-hover:text-white border border-white/40">
          <Play className="w-6 h-6 fill-current ml-0.5" />
        </div>
      </div>

      {/* Bottom Info Container */}
      <div className="relative z-10 p-5 sm:p-6 space-y-2">
        {reel.category && (
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#9A6B29]/90 text-white text-[10px] font-bold uppercase tracking-wider">
            {reel.category}
          </span>
        )}

        <h3 className="font-serif text-white font-bold text-lg sm:text-xl leading-snug drop-shadow-sm group-hover:text-[#CFB57F] transition-colors">
          {reel.title}
        </h3>

        <p className="text-white/85 text-xs line-clamp-2 leading-relaxed">
          {reel.caption}
        </p>

        {/* Action Prompt */}
        <div className="pt-2 flex items-center justify-between text-xs text-white/70 group-hover:text-white font-medium transition-colors">
          <span className="flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase text-amber-200">
            <Sparkles className="w-3 h-3 text-[#CFB57F]" />
            Watch Video
          </span>
          <span className="text-[11px] text-white/60">@_truechakki_</span>
        </div>
      </div>
    </motion.div>
  );
};

export const InstagramReels: React.FC = () => {
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
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-[#E8DCCB]/60 relative overflow-hidden">
      {/* Subtle backdrop styling */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#4A2B18_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <Video className="w-3.5 h-3.5 text-[#9A6B29]" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#9A6B29]">
              LIVE FROM THE SOURCE
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4A2B18] tracking-tight">
            Fresh From Our Chakkis
          </h2>

          <p className="text-sm sm:text-base text-[#7C5C43] leading-relaxed max-w-2xl mx-auto">
            Watch how we make 100% natural atta and oils — live videos from our kitchen and farm.
          </p>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs font-semibold text-[#9A6B29]">
            <AtSign className="w-3.5 h-3.5" />
            <span>@_truechakki_</span>
            <span className="text-[#C5B59E]">•</span>
            <span className="text-[#7C5C43] font-normal">Amritsar Traditional Mill</span>
          </div>
        </div>

        {/* Organized 3-Card Reels Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          {REELS.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              onSelect={(selected) => setOpenReel(selected)}
            />
          ))}
        </div>

        {/* Community Social Proof Strip */}
        <div className="mt-14 max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCCB] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5 shrink-0 shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-[#4A2B18]">
                <Instagram className="w-7 h-7 text-[#4A2B18]" />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5">
                <h4 className="font-serif font-bold text-[#4A2B18] text-base sm:text-lg">
                  Follow @_truechakki_
                </h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FAF4E8] text-[#9A6B29] text-[10px] font-bold">
                  Official
                </span>
              </div>
              <p className="text-xs text-[#7C5C43] max-w-md">
                Live daily stone milling updates, customer stories, and heritage cooking recipes.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/_truechakki_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full transition-all text-xs sm:text-sm shadow-md hover:shadow-lg shrink-0 w-full sm:w-auto"
          >
            <Instagram className="w-4 h-4" />
            <span>Visit Instagram</span>
          </a>
        </div>

      </div>

      {/* Lightbox Video Modal */}
      <AnimatePresence>
        {openReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-[#351D0F] rounded-3xl overflow-hidden shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[9/16] relative bg-black overflow-hidden">
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

                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#4A2B18] flex items-center justify-center shadow-lg hover:bg-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4.5 h-4.5" />
                </button>

                {/* Sound indicator badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium border border-white/10">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>True Chakki Live</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-3.5 bg-[#351D0F]">
                <div className="space-y-1">
                  {openReel.category && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#CFB57F]">
                      {openReel.category}
                    </span>
                  )}
                  <h3 className="font-serif text-white font-bold text-lg leading-snug">
                    {openReel.title}
                  </h3>
                </div>

                <p className="text-white/80 text-xs leading-relaxed">
                  {openReel.caption}
                </p>

                <div className="pt-2">
                  <a
                    href={openReel.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center px-5 py-3.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Watch Full Video on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};