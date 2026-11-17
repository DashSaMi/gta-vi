'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { buildThankYouCards } from '@/lib/auth-store';
import { useVicePass } from './VicePassProvider';

const ROTATION_INTERVAL_MS = 10000;

export function ThankYouWall() {
  const { fansPool, currentFan, openAuthModal } = useVicePass();
  const [cycleSeed, setCycleSeed] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const cycleTimer = window.setInterval(() => {
      setCycleSeed((prev) => prev + 1);
      setSecondsLeft(10);
    }, ROTATION_INTERVAL_MS);

    const tickTimer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 10 : prev - 1));
    }, 1000);

    return () => {
      window.clearInterval(cycleTimer);
      window.clearInterval(tickTimer);
    };
  }, []);

  const cards = useMemo(
    () => buildThankYouCards(fansPool, cycleSeed, currentFan?.displayName),
    [fansPool, cycleSeed, currentFan?.displayName]
  );

  // 5 cards on laptop (lg), 3 on iPad (md), 2 on sm, 1 on narrow mobile
  const getResponsiveVisibility = (index: number) => {
    if (index === 0) return 'block';
    if (index === 1) return 'hidden sm:block';
    if (index === 2) return 'hidden md:block';
    return 'hidden lg:block';
  };

  return (
    <section
      aria-labelledby="thank-you-wall-heading"
      className="py-24 lg:py-32 border-b border-white/[0.08] bg-[#06050A]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-5 sm:px-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-xs font-medium text-white/55">
              <span>Community Appreciation</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-[#C084FC]">
                Next rotation in {secondsLeft}s
              </span>
            </div>
            <h2
              id="thank-you-wall-heading"
              className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white text-balance"
            >
              Thank You to Every Vice Citizen
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => {
                setCycleSeed((prev) => prev + 1);
                setSecondsLeft(10);
              }}
              className="px-4 py-2 rounded-lg border border-white/15 hover:border-white/30 text-xs font-medium text-white/80 hover:text-white inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotate Now</span>
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={openAuthModal}
              className="text-xs font-semibold text-[#C084FC] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{currentFan ? 'Your Pass' : 'Join with Email'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Minimal hairline 10-second progress line */}
        <div className="h-px w-full bg-white/10 overflow-hidden mb-10">
          <motion.div
            key={cycleSeed}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 10, ease: 'linear' }}
            style={{ transformOrigin: 'left' }}
            className="h-full bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
          />
        </div>

        {/* 5 cards on laptop, 3 on iPad, 1-2 on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cycleSeed}
            data-testid="thank-you-cards-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          >
            {cards.map((card, idx) => (
              <motion.article
                key={`${card.slotIndex}-${card.fanName}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.38,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5 }}
                className={`${getResponsiveVisibility(
                  idx
                )} rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 flex flex-col justify-between min-h-[210px] hover:border-[#A855F7]/50 transition-colors`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-white/45">
                    <span>{card.cityTag}</span>
                    <span className="font-mono tabular-nums">{card.passCode}</span>
                  </div>

                  <p className="text-sm text-white/80 leading-relaxed">{card.message}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/[0.08]">
                  <p className="text-[11px] text-[#FB7185]">Thank you,</p>
                  <p className="font-display text-2xl font-bold text-white truncate mt-0.5">
                    {card.fanName}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
