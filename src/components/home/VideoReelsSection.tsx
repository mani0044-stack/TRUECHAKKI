import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  ShoppingBag,
  Store,
  CheckCircle2
} from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';

export interface VideoReel {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  duration: string;
  description: string;
  highlight: string;
  ctaText: string;
  categoryFilter?: string;
}

const VIDEO_REELS: VideoReel[] = [
  {
    id: 'reel-1',
    src: '/videos/vid1.mp4',
    title: 'Stone-Ground vs Commercial Flour',
    subtitle: 'The Real Purity & Adulteration Test',
    tag: 'Purity Check',
    tagColor: 'bg-emerald-600/90 text-white',
    duration: '0:32',
    description: 'Watch our live demonstration showing why commercial packaged flours are stripped of wheat germ and chemically bleached, while True Chakki preserves 100% natural bran and golden color.',
    highlight: 'Zero Bleaching Agents • 100% Natural Bran Intact',
    ctaText: 'Shop Sharbati Atta',
    categoryFilter: 'atta',
  },
  {
    id: 'reel-2',
    src: '/videos/vid2.mp4',
    title: 'Artisanal Packing & Hygiene',
    subtitle: 'Packed Fresh Directly From The Mill',
    tag: 'Farm-Fresh Packing',
    tagColor: 'bg-[#9A6B29] text-white',
    duration: '0:13',
    description: 'Every single bag is hand-inspected and sealed in multi-layer food-grade packaging immediately after stone milling. Zero moisture, zero chemical fumigation, pure unadulterated goodness.',
    highlight: 'Hygienic Sealed Packs • Fresh Milled Every Morning',
    ctaText: 'Explore Staples',
    categoryFilter: 'atta',
  },
  {
    id: 'reel-3',
    src: '/videos/vid3.mp4',
    title: 'Loved By Families & Elders',
    subtitle: 'Authentic Store Smiles & Trust',
    tag: 'Customer Love',
    tagColor: 'bg-rose-600/90 text-white',
    duration: '1:21',
    description: 'Hear from our regular customers in Punjab sharing why their rotis are noticeably softer, easier to digest, and bring back the authentic nostalgic taste of village stone chakkis.',
    highlight: '5-Star Community Trust • The Taste of Pure Nostalgia',
    ctaText: 'See Customer Favorites',
  },
  {
    id: 'reel-4',
    src: '/videos/vid4.mp4',
    title: 'Traditional Stone Chakki Live',
    subtitle: 'Low-RPM Cold Milling in Motion',
    tag: 'Inside The Mill',
    tagColor: 'bg-amber-600/90 text-white',
    duration: '0:30',
    description: 'Witness our heavy natural millstones spinning at slow, low-RPM speeds. Unlike high-speed commercial steel rollers that overheat and destroy vitamins, cold stone milling keeps enzymes alive.',
    highlight: 'Natural Heavy Stone Mill • Low-Temperature Grinding',
    ctaText: 'Explore Mill Range',
    categoryFilter: 'atta',
  },
];

export const VideoReelsSection: React.FC = () => {
  const navigateTo = useUIStore((state) => state.navigateTo);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Card video playback states
  const [playingCardId, setPlayingCardId] = useState<string | null>(null);
  const [mutedCards, setMutedCards] = useState<Record<string, boolean>>({
    'reel-1': true,
    'reel-2': true,
    'reel-3': true,
    'reel-4': true,
  });
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Fullscreen Reel Theater Modal state
  const [activeModalReelIndex, setActiveModalReelIndex] = useState<number | null>(null);
  const [modalPlaying, setModalPlaying] = useState<boolean>(true);
  const [modalMuted, setModalMuted] = useState<boolean>(false);
  const [modalProgress, setModalProgress] = useState<number>(0);
  const [modalDuration, setModalDuration] = useState<number>(0);
  const [modalCurrentTime, setModalCurrentTime] = useState<number>(0);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Play a specific card video safely
  const handleCardPlayToggle = (reelId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const vid = videoRefs.current[reelId];
    if (!vid) return;

    if (playingCardId === reelId) {
      vid.pause();
      setPlayingCardId(null);
    } else {
      // Pause any other playing card
      if (playingCardId && videoRefs.current[playingCardId]) {
        videoRefs.current[playingCardId]?.pause();
      }
      vid.play().catch(() => {});
      setPlayingCardId(reelId);
    }
  };

  // Toggle card mute
  const handleCardMuteToggle = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[reelId];
    if (!vid) return;
    const nextMuted = !mutedCards[reelId];
    vid.muted = nextMuted;
    setMutedCards((prev) => ({ ...prev, [reelId]: nextMuted }));
  };

  // Hover preview for desktop
  const handleCardMouseEnter = (reelId: string) => {
    const vid = videoRefs.current[reelId];
    if (!vid) return;
    // If not already playing, start muted preview
    vid.muted = mutedCards[reelId] ?? true;
    vid.play().then(() => {
      setPlayingCardId(reelId);
    }).catch(() => {});
  };

  const handleCardMouseLeave = (reelId: string) => {
    const vid = videoRefs.current[reelId];
    if (!vid) return;
    vid.pause();
    if (playingCardId === reelId) {
      setPlayingCardId(null);
    }
  };

  // Open Fullscreen Modal
  const openModalReel = (index: number) => {
    // Pause all card videos
    Object.values(videoRefs.current).forEach((v) => v?.pause());
    setPlayingCardId(null);

    setActiveModalReelIndex(index);
    setModalPlaying(true);
    setModalMuted(false);
    setModalProgress(0);
    setModalCurrentTime(0);
  };

  const closeModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setActiveModalReelIndex(null);
  };

  // Navigation inside modal
  const handleNextModalReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeModalReelIndex === null) return;
    const nextIndex = (activeModalReelIndex + 1) % VIDEO_REELS.length;
    setActiveModalReelIndex(nextIndex);
    setModalProgress(0);
    setModalCurrentTime(0);
  };

  const handlePrevModalReel = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (activeModalReelIndex === null) return;
    const prevIndex = (activeModalReelIndex - 1 + VIDEO_REELS.length) % VIDEO_REELS.length;
    setActiveModalReelIndex(prevIndex);
    setModalProgress(0);
    setModalCurrentTime(0);
  };

  // Modal video keyboard controls (ESC, ArrowLeft, ArrowRight, Space)
  useEffect(() => {
    if (activeModalReelIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') handleNextModalReel();
      if (e.key === 'ArrowLeft') handlePrevModalReel();
      if (e.key === ' ') {
        e.preventDefault();
        toggleModalPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalReelIndex, modalPlaying]);

  const toggleModalPlay = () => {
    if (!modalVideoRef.current) return;
    if (modalVideoRef.current.paused) {
      modalVideoRef.current.play().catch(() => {});
      setModalPlaying(true);
    } else {
      modalVideoRef.current.pause();
      setModalPlaying(false);
    }
  };

  const toggleModalMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalMuted;
    setModalMuted(!modalMuted);
  };

  const handleModalTimeUpdate = () => {
    if (!modalVideoRef.current) return;
    const cur = modalVideoRef.current.currentTime;
    const dur = modalVideoRef.current.duration || 1;
    setModalCurrentTime(cur);
    setModalDuration(dur);
    setModalProgress((cur / dur) * 100);
  };

  const handleModalSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!modalVideoRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const dur = modalVideoRef.current.duration || 1;
    const seekTime = (seekPercent / 100) * dur;
    modalVideoRef.current.currentTime = seekTime;
    setModalProgress(seekPercent);
  };

  // Carousel scroll helpers for mobile & tablet
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const activeReel = activeModalReelIndex !== null ? VIDEO_REELS[activeModalReelIndex] : null;

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#FAF7F2] via-[#FAF4E8] to-[#FAF7F2] border-t border-b border-[#E8DCCB]/60 overflow-hidden">
      {/* Decorative background aura */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#9A6B29]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#FAF4E8]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 items-center md:items-start text-center md:text-left">
          <div className="max-w-2xl space-y-3 flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#E8DCCB] text-[#9A6B29] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AUTHENTIC CHAKKI STORIES &amp; REELS</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A2B18] tracking-tight">
              See The Pure Chakki Difference <br className="hidden sm:inline" />
              <span className="font-script text-4xl sm:text-5xl lg:text-6xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] via-[#9A6B29] to-[#704815] inline-block">
                In Motion.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#7C5C43] leading-relaxed">
              Real millstones, real unadulterated grain, and zero chemicals. Watch our live milling, 
              purity tests, and honest smiles from our Amritsar chakki.
            </p>
          </div>

          {/* Carousel Arrows on Desktop / Tablet */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollLeft}
              aria-label="Previous video"
              className="w-11 h-11 rounded-full bg-[#FAF4E8] hover:bg-white text-[#4A2B18] border border-[#E8DCCB] hover:border-[#9A6B29]/40 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-[#9A6B29]" />
            </button>
            <button
              onClick={scrollRight}
              aria-label="Next video"
              className="w-11 h-11 rounded-full bg-[#FAF4E8] hover:bg-white text-[#4A2B18] border border-[#E8DCCB] hover:border-[#9A6B29]/40 flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 text-[#9A6B29]" />
            </button>
          </div>
        </div>

        {/* Video Cards Grid / Horizontal Snap Scroll on Mobile */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 scroll-smooth snap-x snap-mandatory custom-scrollbar"
        >
          {VIDEO_REELS.map((reel, index) => {
            const isPlaying = playingCardId === reel.id;
            const isMuted = mutedCards[reel.id] ?? true;
            const progress = progresses[reel.id] || 0;

            return (
              <div
                key={reel.id}
                onClick={() => openModalReel(index)}
                onMouseEnter={() => handleCardMouseEnter(reel.id)}
                onMouseLeave={() => handleCardMouseLeave(reel.id)}
                className="group relative flex-shrink-0 w-[270px] sm:w-[290px] lg:w-full aspect-[9/16] rounded-3xl overflow-hidden bg-[#24130A] border-2 border-[#E8DCCB] hover:border-[#9A6B29] transition-all duration-500 shadow-card hover:shadow-floating cursor-pointer snap-center select-none"
              >
                {/* HTML5 Video Element */}
                <video
                  ref={(el) => {
                    videoRefs.current[reel.id] = el;
                  }}
                  src={`${reel.src}#t=0.5`}
                  preload="metadata"
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) {
                      setProgresses((prev) => ({
                        ...prev,
                        [reel.id]: (v.currentTime / v.duration) * 100,
                      }));
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />

                {/* Ambient Top & Bottom Scrim Gradients */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10" />

                {/* Top Overlay: Tag Badge & Duration / Sound Toggle */}
                <div className="absolute top-3.5 inset-x-3.5 z-20 flex items-center justify-between pointer-events-auto">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${reel.tagColor}`}>
                    {reel.tag}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Audio mute toggle */}
                    <button
                      type="button"
                      onClick={(e) => handleCardMuteToggle(reel.id, e)}
                      title={isMuted ? 'Unmute' : 'Mute'}
                      className="w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-white/80" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>

                    {/* Duration badge */}
                    <span className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-mono font-medium">
                      {reel.duration}
                    </span>
                  </div>
                </div>

                {/* Center Hover / Play Indicator */}
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                  <button
                    type="button"
                    onClick={(e) => handleCardPlayToggle(reel.id, e)}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className={`pointer-events-auto w-14 h-14 rounded-full bg-[#FAF4E8]/90 text-[#4A2B18] border border-[#E8DCCB] shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer ${
                      isPlaying 
                        ? 'opacity-0 scale-90 group-hover:opacity-80' 
                        : 'opacity-90 scale-100 group-hover:scale-110 group-hover:bg-[#9A6B29] group-hover:text-white group-hover:border-transparent'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Overlay: Video Title, Subtitle & Tap prompt */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-20 space-y-1.5 text-white flex flex-col items-center sm:items-start text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#CFB57F] font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#CFB57F] text-[#4A2B18]" />
                    <span>True Chakki Verified</span>
                  </div>
                  
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm group-hover:text-[#FAF4E8] transition-colors text-center sm:text-left">
                    {reel.title}
                  </h3>

                  <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed text-center sm:text-left">
                    {reel.subtitle}
                  </p>

                  <div className="pt-2 flex items-center justify-between w-full text-[11px] text-white/70 font-medium">
                    <span className="inline-flex items-center gap-1 group-hover:text-[#CFB57F] transition-colors">
                      <Maximize2 className="w-3 h-3" />
                      <span>Tap to watch story</span>
                    </span>
                    <span className="text-white/40">Reel {index + 1}/4</span>
                  </div>
                </div>

                {/* Dynamic Gold Progress Line on Bottom */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-30">
                  <div
                    className="h-full bg-gradient-to-r from-[#B8860B] to-[#CFB57F] transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Trust Statement & Shop Action */}
        <div className="mt-12 bg-[#FAF6EE] border border-[#E8DCCB] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#FAF4E8] border border-[#9A6B29]/30 flex items-center justify-center text-[#9A6B29] shrink-0 shadow-inner">
              <Store className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#4A2B18]">
                Freshly Stone-Ground On Demand
              </h4>
              <p className="text-xs sm:text-sm text-[#7C5C43]">
                We do not pre-pack and store flour for months. Every grain is milled cold after you order.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#9A6B29] hover:bg-[#80561F] text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide shrink-0 cursor-pointer"
          >
            <span>Explore All Fresh Products</span>
            <ShoppingBag className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* IMMERSIVE FULLSCREEN REEL THEATER MODAL (INSTAGRAM / TIKTOK REELS STYLE) */}
      {/* ========================================================================= */}
      {activeReel !== null && activeModalReelIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in duration-200 select-none"
          onClick={closeModal}
        >
          {/* Main Reel Frame Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] sm:max-w-[440px] md:max-w-[460px] h-[92vh] max-h-[820px] bg-[#1A0E08] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between"
          >
            {/* Modal Video Player */}
            <div 
              className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={toggleModalPlay}
            >
              <video
                ref={modalVideoRef}
                key={activeReel.src}
                src={activeReel.src}
                autoPlay
                playsInline
                loop
                muted={modalMuted}
                onTimeUpdate={handleModalTimeUpdate}
                onLoadedMetadata={(e) => {
                  const dur = e.currentTarget.duration || 1;
                  setModalDuration(dur);
                  setModalPlaying(true);
                }}
                className="w-full h-full object-cover"
              />

              {/* Pause overlay icon flash when paused */}
              {!modalPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none z-20">
                  <div className="w-16 h-16 rounded-full bg-[#FAF4E8]/90 text-[#4A2B18] flex items-center justify-center shadow-2xl backdrop-blur-md">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Top Bar inside modal */}
              <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-30 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${activeReel.tagColor}`}>
                    {activeReel.tag}
                  </span>
                  <span className="text-xs text-white/80 font-mono">
                    {formatSeconds(modalCurrentTime)} / {formatSeconds(modalDuration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleModalMute}
                    aria-label={modalMuted ? 'Unmute' : 'Mute'}
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    {modalMuted ? (
                      <VolumeX className="w-4 h-4 text-white/80" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </button>

                  <button
                    onClick={closeModal}
                    aria-label="Close modal"
                    className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Next / Previous floating arrow buttons */}
              <button
                onClick={handlePrevModalReel}
                aria-label="Previous reel"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-30 transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextModalReel}
                aria-label="Next reel"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white z-30 transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Info Gradient Panel inside modal */}
              <div 
                className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-30 space-y-2.5 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Brand verification line */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/images/logo.png" 
                      alt="True Chakki" 
                      className="w-6 h-6 rounded-full border border-white/40 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className="font-semibold text-xs text-white">True Chakki Organics</span>
                    <CheckCircle2 className="w-3.5 h-3.5 fill-[#CFB57F] text-[#1A0E08]" />
                  </div>
                  <span className="text-[11px] font-mono text-white/60">
                    Story {activeModalReelIndex + 1} of {VIDEO_REELS.length}
                  </span>
                </div>

                {/* Title and description */}
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  {activeReel.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                  {activeReel.description}
                </p>

                {/* Highlight Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#FAF4E8]/10 border border-[#CFB57F]/30 text-[#CFB57F] text-[11px] font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>{activeReel.highlight}</span>
                </div>

                {/* Scrub Timeline Bar */}
                <div className="pt-1 flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={modalProgress}
                    onChange={handleModalSeek}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#CFB57F]"
                  />
                </div>

                {/* Quick Shop CTA */}
                <div className="pt-2 flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      closeModal();
                      navigateTo('shop');
                    }}
                    className="flex-1 py-2.5 bg-gradient-to-r from-[#B8860B] to-[#9A6B29] hover:from-[#9A6B29] hover:to-[#80561F] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{activeReel.ctaText}</span>
                  </button>

                  <button
                    onClick={toggleModalPlay}
                    className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    {modalPlaying ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
