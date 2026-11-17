'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { MediaImage } from './MediaImage';
import { useVicePass } from './VicePassProvider';

const TARGET_RELEASE_MS = new Date('2026-11-19T00:00:00-05:00').getTime();

function computeCountdown(nowMs: number) {
  const diff = Math.max(0, TARGET_RELEASE_MS - nowMs);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function HeroSection() {
  const { openAuthModal, currentFan } = useVicePass();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const [countdown, setCountdown] = useState(() =>
    computeCountdown(new Date('2026-11-17T08:00:00Z').getTime())
  );

  useEffect(() => {
    const updateTick = () => setCountdown(computeCountdown(Date.now()));
    const initTimer = window.setTimeout(updateTick, 0);
    const timer = window.setInterval(updateTick, 1000);
    return () => {
      window.clearTimeout(initTimer);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden border-b border-white/[0.08]"
    >
      {/* Full-bleed parallax GTA VI Key Art backdrop */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
      >
        <MediaImage
          src="/assets/aistudio/image_95b10f83.png"
          alt="Lucia and Jason in front of Vice City sunset backdrop"
          priority
          sizes="100vw"
          className="object-cover object-[55%_18%] opacity-65"
        />
      </motion.div>

      {/* Atmospheric contrast scrims + banafsh Miami twilight glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06050A] via-[#06050A]/80 to-[#06050A]/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06050A] via-transparent to-[#06050A]/50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_75%_35%,rgba(147,51,234,0.22),transparent_70%)]"
      />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-16 lg:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Clean editorial headline & single clear CTA */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-medium text-white/70"
            >
              <span className="text-[#FB7185]">Launch Week</span>
              <span aria-hidden="true">·</span>
              <span>November 17, 2026</span>
              <span aria-hidden="true">·</span>
              <span>Vice City, Leonida</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[0.92] text-white text-balance"
            >
              Welcome Back to Vice City.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl"
            >
              A launch-week interactive experience blending Rockstar’s open-world evolution, a
              10-question GTA VI match survey, and banafsh Miami twilight art.
            </motion.p>

            {/* Primary CTA + quiet secondary action */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              <a
                href="#survey"
                className="px-7 py-3.5 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] text-sm font-semibold text-white inline-flex items-center gap-2.5 transition-all duration-150 shadow-lg shadow-[#9333EA]/25 whitespace-nowrap"
              >
                <span>Take GTA VI Survey</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                suppressHydrationWarning
                onClick={openAuthModal}
                className="group text-sm font-medium text-white/80 hover:text-white inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>
                  {currentFan
                    ? `Signed In as ${currentFan.displayName}`
                    : 'Claim Email Vice Pass'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#C084FC] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            {/* Unboxed minimalist countdown strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="pt-8 border-t border-white/10 max-w-md"
            >
              <p className="text-xs text-white/45 mb-3">Countdown to Leonida Premiere</p>
              <div className="flex items-baseline gap-6 sm:gap-8">
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Mins', value: countdown.minutes },
                  { label: 'Secs', value: countdown.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="flex items-baseline gap-1.5">
                    <span className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-white">
                      {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-white/45">{unit.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Uploaded GTA VI PS5 Cover Artwork */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[726/920] rounded-xl overflow-hidden shadow-[0_28px_70px_rgba(147,51,234,0.32)] ring-1 ring-white/15"
            >
              <MediaImage
                src="/assets/aistudio/88bdc0c15f32f6921525cd9a15aca83d_7def2374.jpg"
                alt="Grand Theft Auto VI PS5 Cover featuring Lucia and Jason"
                priority
                sizes="(max-width: 1024px) 90vw, 380px"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
