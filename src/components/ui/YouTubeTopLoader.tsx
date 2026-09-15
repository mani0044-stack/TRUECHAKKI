import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../store/useUIStore';

export const YouTubeTopLoader: React.FC = () => {
  const currentPage = useUIStore((state) => state.currentPage);
  const activeProductSlug = useUIStore((state) => state.activeProductSlug);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Trigger top loading bar animation on route change
    setIsLoading(true);
    setProgress(25);

    const t1 = setTimeout(() => {
      setProgress(70);
    }, 120);

    const t2 = setTimeout(() => {
      setProgress(92);
    }, 280);

    const t3 = setTimeout(() => {
      setProgress(100);
    }, 420);

    const t4 = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 620);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [currentPage, activeProductSlug]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="youtube-top-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeOut' } }}
          className="fixed top-0 left-0 right-0 z-[99999] h-[3.5px] pointer-events-none overflow-hidden"
        >
          {/* True Chakki Signature Top Progress Bar with Glow */}
          <motion.div
            className="h-full bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#843D14] relative shadow-[0_0_14px_rgba(217,119,6,0.9),0_0_6px_rgba(245,158,11,0.7)]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
          >
            {/* Glowing Leading Edge tip */}
            <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-amber-100 to-white shadow-[0_0_12px_#F59E0B,0_0_6px_#FFFFFF] rounded-full opacity-95" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
