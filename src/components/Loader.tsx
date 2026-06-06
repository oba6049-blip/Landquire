/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion } from 'motion/react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#102A72]"
      id="app-loader"
    >
      <div className="text-center">
        {/* Animated Custom Logo Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center bg-brand-secondary border border-brand-gold/30"
        >
          {/* Animated rings */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 border-2 border-brand-gold"
          />
          <img
            src="https://imgur.com/WNdqBl3.png"
            alt="Landiquire Logo"
            className="h-14 w-14 object-contain z-10 p-0.5"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Brand Name with Fade and Reveal */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-sans text-2xl font-black tracking-wider text-white uppercase sm:text-3xl"
        >
          Landiquire Associates
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-2 text-xs tracking-[0.2em] font-extrabold text-brand-gold uppercase"
        >
          Premium Property Investments
        </motion.p>
        
        {/* Smooth Loader Bar */}
        <div className="mt-8 h-[2px] w-48 overflow-hidden bg-brand-secondary">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-full bg-brand-gold"
          />
        </div>
      </div>
    </motion.div>
  );
}
