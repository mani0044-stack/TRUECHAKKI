import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoPreloaderProps {
  onComplete?: () => void;
}

type Phase = 'reveal' | 'logo-exit' | 'progress-bar' | 'completion';

export const LogoPreloader: React.FC<LogoPreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<Phase>('reveal');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 1: Logo Reveal (Hold for ~0.8s)
    const timer1 = setTimeout(() => {
      // Phase 2: Logo Exit (Animates downwards and fades out)
      setPhase('logo-exit');
    }, 900);

    // Phase 3 & 4: Progress Bar Appears & Fills
    const timer2 = setTimeout(() => {
      setPhase('progress-bar');
      // Animate progress bar fill smoothly from 0 to 100
      const startTime = Date.now();
      const fillDuration = 850; // ms
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, Math.floor((elapsed / fillDuration) * 100));
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          // Phase 5: Completion (Fade out background)
          setTimeout(() => {
            setPhase('completion');
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 450);
          }, 250);
        }
      }, 16);
    }, 1350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const showLogo = phase === 'reveal' || phase === 'logo-exit';
  const showProgressBar = phase === 'progress-bar' || phase === 'completion';

  return (
    <AnimatePresence>
      {phase !== 'completion' && (
        <motion.div
          key="true-chakki-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDFBF7] select-none overflow-hidden"
        >
          {/* Main Stage Container */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-sm px-6 h-52">
            
            {/* Phase 1 & 2: Center True Chakki Logo Reveal and Exit */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  key="app-logo"
                  initial={{ opacity: 0, scale: 0.92, y: 0 }}
                  animate={
                    phase === 'reveal'
                      ? {
                          opacity: 1,
                          scale: [0.95, 1.03, 1.0],
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.25, 1, 0.5, 1],
                          },
                        }
                      : {
                          opacity: 0,
                          y: 45, // Moves smoothly downwards as requested in Phase 2
                          scale: 0.98,
                          transition: {
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1], // YouTube app style custom cubic-bezier
                          },
                        }
                  }
                  exit={{
                    opacity: 0,
                    y: 45,
                    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                  }}
                  className="flex flex-col items-center justify-center relative"
                >
                  {/* True Chakki Subtle Warm Ambient Glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-[#F59E0B]/15 via-[#D97706]/15 to-[#843D14]/15 rounded-full blur-2xl animate-pulse" />

                  {/* Pure True Chakki Brand Logo Image */}
                  <img
                    src="/images/logo.png"
                    alt="True Chakki Logo"
                    className="w-56 h-auto max-h-28 object-contain drop-shadow-md relative z-10"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Phase 3 & 4: Ultra-Attractive True Chakki Progress Bar Appears & Fills */}
            <AnimatePresence>
              {showProgressBar && (
                <motion.div
                  key="app-progress-bar"
                  initial={{ opacity: 0, scale: 0.9, y: -12 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
                  }}
                  className="flex flex-col items-center justify-center w-full max-w-[260px]"
                >
                  {/* Glassmorphic Outer Track Container */}
                  <div className="w-full h-[6px] bg-amber-100/70 backdrop-blur-md rounded-full p-[1px] border border-amber-200/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)] relative overflow-hidden">
                    {/* Glowing Multi-Color Gradient Progress Bar */}
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#843D14] rounded-full relative shadow-[0_0_15px_rgba(217,119,6,0.85),0_0_6px_rgba(245,158,11,0.6)]"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: [0.4, 0, 0.2, 1], duration: 0.1 }}
                    >
                      {/* Animated Light Shimmer Beam */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />

                      {/* Glowing Tip Sparkle Indicator */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-amber-200 rounded-full blur-[1px] shadow-[0_0_10px_#F59E0B,0_0_4px_#FFFFFF] border border-white/80" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
