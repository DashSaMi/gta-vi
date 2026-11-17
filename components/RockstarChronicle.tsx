'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GTA_GAMES_CATALOG, ROCKSTAR_HISTORY } from '@/lib/gta-catalog';
import { MediaImage } from './MediaImage';

const SLIDE_DURATION_MS = 4000;

export function RockstarChronicle() {
  const [activeHistoryIdx, setActiveHistoryIdx] = useState(0);
  const [activeGameIdx, setActiveGameIdx] = useState(6);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveHistoryIdx((prev) => (prev + 1) % ROCKSTAR_HISTORY.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeHistoryIdx]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveGameIdx((prev) => (prev + 1) % GTA_GAMES_CATALOG.length);
    }, SLIDE_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeGameIdx]);

  const activeMilestone = ROCKSTAR_HISTORY[activeHistoryIdx];
  const activeGame = GTA_GAMES_CATALOG[activeGameIdx];

  return (
    <div id="chronicle">
      {/* Section 1: Rockstar Games History — Clean Interactive Editorial Split */}
      <section
        aria-labelledby="rockstar-history-heading"
        className="py-24 lg:py-36 border-b border-white/[0.08] relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(147,51,234,0.12),transparent_70%)]"
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16"
          >
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-medium text-[#FB7185]">
                Rockstar Heritage · 1997–2026
              </p>
              <h2
                id="rockstar-history-heading"
                className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance"
              >
                Three Decades Crafting Open Worlds
              </h2>
            </div>
            <span className="font-mono text-xs text-white/45 shrink-0">
              Auto-sliding every 4s · 0{activeHistoryIdx + 1} / 0{ROCKSTAR_HISTORY.length}
            </span>
          </motion.div>

          {/* 4-second chapter progress hairline */}
          <div className="h-px w-full bg-white/10 overflow-hidden mb-10">
            <motion.div
              key={`history-progress-${activeHistoryIdx}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, ease: 'linear' }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Left: Interactive Chapter List */}
            <div className="lg:col-span-5 space-y-2">
              {ROCKSTAR_HISTORY.map((item, idx) => {
                const isSelected = idx === activeHistoryIdx;
                return (
                  <button
                    key={item.year}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setActiveHistoryIdx(idx)}
                    className={`w-full text-left py-5 px-5 rounded-xl transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-white/[0.05] border-white/15'
                        : 'bg-transparent border-transparent hover:bg-white/[0.025]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono tabular-nums text-xs text-[#C084FC]">
                        {item.year}
                      </span>
                      <span className="text-xs text-white/40">{item.city}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1.5">
                      {item.headline}
                    </h3>
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-white/70 leading-relaxed pt-3">
                            {item.summary}
                          </p>
                          <p className="text-xs font-medium text-[#FB7185] pt-3">
                            {item.milestoneStat}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Right: Large Borderless Photographic Stage */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                >
                  <MediaImage
                    src={activeMilestone.image}
                    alt={`${activeMilestone.era} — ${activeMilestone.headline}`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className={`object-cover ${activeMilestone.imageFocus ?? 'object-center'}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#06050A] via-transparent to-transparent"
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-[#C084FC]">
                        {activeMilestone.era}
                      </p>
                      <p className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                        {activeMilestone.milestoneStat}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums text-xs text-white/60">
                      {activeMilestone.year}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: All GTA Games Anthology — Cinematic Filmstrip Stage */}
      <section
        id="anthology"
        aria-labelledby="gta-anthology-heading"
        className="py-24 lg:py-36 border-b border-white/[0.08] bg-[#08060D] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10"
          >
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#C084FC]">
                Complete Anthology · 1997–2026 · Auto-Slider 4s
              </p>
              <h2
                id="gta-anthology-heading"
                className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance"
              >
                Every Grand Theft Auto Era
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                suppressHydrationWarning
                aria-label="Previous GTA game era"
                onClick={() =>
                  setActiveGameIdx((prev) =>
                    prev === 0 ? GTA_GAMES_CATALOG.length - 1 : prev - 1
                  )
                }
                className="p-3 rounded-full border border-white/15 hover:border-white/40 text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="font-mono tabular-nums text-xs text-white/60 px-2">
                {String(activeGameIdx + 1).padStart(2, '0')} /{' '}
                {String(GTA_GAMES_CATALOG.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                suppressHydrationWarning
                aria-label="Next GTA game era"
                onClick={() =>
                  setActiveGameIdx((prev) => (prev + 1) % GTA_GAMES_CATALOG.length)
                }
                className="p-3 rounded-full border border-white/15 hover:border-white/40 text-white transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* 4-second era slider progress hairline */}
          <div className="h-px w-full bg-white/10 overflow-hidden mb-8">
            <motion.div
              key={`era-progress-${activeGameIdx}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 4, ease: 'linear' }}
              style={{ transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-[#FB7185] to-[#9333EA]"
            />
          </div>

          {/* Minimalist Scrubber Tab Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            role="tablist"
            aria-label="Select a Grand Theft Auto title"
            className="vice-scroll-x flex items-center gap-6 overflow-x-auto pb-4 mb-12 border-b border-white/10"
          >
            {GTA_GAMES_CATALOG.map((game, idx) => {
              const isSelected = idx === activeGameIdx;
              return (
                <button
                  key={game.id}
                  type="button"
                  role="tab"
                  suppressHydrationWarning
                  aria-selected={isSelected}
                  onClick={() => setActiveGameIdx(idx)}
                  className={`relative pb-3 text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isSelected ? 'text-white' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono tabular-nums text-xs text-[#FB7185]">
                      {game.numberLabel}
                    </span>
                    <span>{game.title}</span>
                  </span>
                  {isSelected && (
                    <motion.span
                      layoutId="gta-era-underline"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Spacious Cinematic Showcase Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGame.id}
              initial={{ opacity: 0, x: 24, scale: 0.99 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -24, scale: 0.99 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <motion.div
                  initial={{ scale: 1.07 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <MediaImage
                    src={activeGame.image}
                    alt={`${activeGame.title} (${activeGame.year}) — ${activeGame.setting}`}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#08060D]/80 via-transparent to-transparent"
                />
                <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/80">
                  <span className="font-mono tabular-nums">{activeGame.year}</span>
                  <span>{activeGame.setting}</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-medium text-[#C084FC]">
                    Chapter {activeGame.numberLabel} · {activeGame.year}
                  </p>
                  <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                    {activeGame.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed">
                    {activeGame.description}
                  </p>
                </div>

                {/* Unboxed clean hairline spec rows */}
                <dl className="divide-y divide-white/10 border-t border-b border-white/10">
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs text-white/45">Protagonist</dt>
                    <dd className="text-sm font-medium text-white text-right">
                      {activeGame.protagonist}
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs text-white/45">Breakthrough</dt>
                    <dd className="text-sm font-medium text-white text-right max-w-xs">
                      {activeGame.breakthrough}
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-baseline justify-between gap-4">
                    <dt className="text-xs text-white/45">Atmosphere</dt>
                    <dd className="text-sm text-white/80 text-right max-w-xs">
                      {activeGame.soundtrackMood}
                    </dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
