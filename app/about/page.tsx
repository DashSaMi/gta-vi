'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Instagram, Layers, Sparkles } from 'lucide-react';
import { MediaImage } from '@/components/MediaImage';
import { FantasyPageBackdrop } from '@/components/FantasyPageBackdrop';

const CHALLENGE_PILLARS = [
  {
    index: '01',
    title: 'Famous Icons & Cultural Drops',
    detail:
      'Every Instagram programming challenge spotlights an iconic creator, athlete, studio, or monumental cultural release like Grand Theft Auto VI.',
    icon: Sparkles,
    glow: 'from-[#9333EA]/20 via-transparent to-transparent',
  },
  {
    index: '02',
    title: 'Motion-Driven Engineering',
    detail:
      'No flat static containers—every section pairs scroll-linked parallax, spring physics, and responsive community walls.',
    icon: Layers,
    glow: 'from-[#FB7185]/20 via-transparent to-transparent',
  },
  {
    index: '03',
    title: 'Zero-Friction Vercel Shipping',
    detail:
      'Built on Next.js App Router, Tailwind CSS v4, and server-side Gemini image APIs so followers can inspect and deploy cleanly.',
    icon: Code2,
    glow: 'from-[#38BDF8]/15 via-transparent to-transparent',
  },
];

export default function AboutPage() {
  return (
    <FantasyPageBackdrop
      bgImage="/assets/aistudio/image_95b10f83.png"
      bgAlt="Lucia and Jason Vice City twilight sunset backdrop"
    >
      <section className="py-20 lg:py-28 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-6"
            >
              <p className="text-xs font-medium text-[#FB7185] tracking-wide uppercase">
                About Us · Creator Studio
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white text-balance">
                Crafting Bespoke Websites for Iconic Worlds
              </h1>
              <p className="text-base text-white/75 leading-relaxed">
                We run an Instagram creative engineering channel dedicated to programming
                challenges—reimagining what flagship websites for famous people, artists, and
                blockbuster games feel like when typography, atmosphere, and motion work together.
              </p>
              <p className="text-base text-white/75 leading-relaxed">
                For Grand Theft Auto VI launch week (November 2026), we crafted{' '}
                <span className="font-vi tracking-wider bg-gradient-to-r from-[#FDA4AF] to-[#C084FC] bg-clip-text text-transparent">
                  VI
                </span>{' '}
                around deep cinema black, luminous <em>banafsh</em> twilight, and warm Miami sunset
                accents.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  href="/links"
                  prefetch
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:opacity-95 text-sm font-semibold text-white inline-flex items-center gap-2 transition-all shadow-[0_0_28px_rgba(147,51,234,0.45)]"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Follow the Channel</span>
                </Link>
                <Link
                  href="/#survey"
                  className="text-sm font-medium text-white/85 hover:text-white inline-flex items-center gap-2 transition-colors"
                >
                  <span>Take GTA VI Survey</span>
                  <ArrowRight className="w-4 h-4 text-[#C084FC]" />
                </Link>
              </div>
            </motion.div>

            {/* Layered Fantasy GTA VI Visual Stage using uploaded artwork */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/15 shadow-[0_28px_80px_rgba(147,51,234,0.35)]">
                <MediaImage
                  src="/assets/aistudio/image_95b10f83.png"
                  alt="Grand Theft Auto VI key art showcase for creator studio"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[55%_20%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#06050A] via-transparent to-[#9333EA]/15"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-mono text-[#FDA4AF]">Episode Showcase</p>
                    <p className="font-display text-2xl font-bold text-white">
                      Vice City Launch Edition
                    </p>
                  </div>
                  <span className="font-vi text-3xl bg-gradient-to-br from-[#FDA4AF] to-[#C084FC] bg-clip-text text-transparent">
                    VI
                  </span>
                </div>
              </div>

              {/* Floating secondary protagonist vignette */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="hidden sm:block absolute -bottom-6 -left-6 w-32 aspect-[4/5] rounded-xl overflow-hidden border border-[#C084FC]/45 shadow-[0_18px_45px_rgba(0,0,0,0.75)]"
              >
                <MediaImage
                  src="/assets/aistudio/image_34b54bac.png"
                  alt="Lucia portrait accent"
                  sizes="128px"
                  className="object-cover object-[50%_20%]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12 space-y-2">
            <p className="text-xs font-medium text-[#C084FC] uppercase tracking-wide">
              Design Philosophy
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">
              How Every Challenge Build Comes Together
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHALLENGE_PILLARS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.index}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`rounded-2xl border border-white/15 bg-gradient-to-br ${item.glow} bg-[#0D0916]/75 backdrop-blur-md p-7 space-y-4 shadow-[0_18px_45px_rgba(6,5,10,0.6)] hover:border-[#C084FC]/50 transition-colors`}
                >
                  <div className="flex items-center justify-between text-xs text-white/45">
                    <span className="font-mono text-[#FB7185]">{item.index}.</span>
                    <Icon className="w-4 h-4 text-[#C084FC]" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.detail}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </FantasyPageBackdrop>
  );
}
