import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LogoPreloaderProps {
  onComplete?: () => void;
  minDuration?: number; // Minimum display time in ms (default 1800ms)
}

export const LogoPreloader: React.FC<LogoPreloaderProps> = ({
  onComplete,
  minDuration = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsedTime / minDuration) * 100));

      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 200);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="logo-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
        >
          <div className="flex flex-col items-center max-w-xs px-6 text-center">
            {/* Animated Logo Image */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                scale: [0.95, 1.02, 0.98],
                opacity: 1,
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="mb-8 relative flex items-center justify-center"
            >
              <img
                src="/images/logo.png"
                alt="True Chakki Logo"
                className="w-44 h-auto max-h-36 object-contain drop-shadow-md"
              />
            </motion.div>

            {/* Minimalist Progress Line */}
            <div className="w-44 h-1 bg-amber-100/80 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D97706] to-[#843D14] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Subtle Progress Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-[#843D14]/70 tracking-widest uppercase"
            >
              Loading {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
