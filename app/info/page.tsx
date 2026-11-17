'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Cpu, Globe2, Map, Rocket, Users } from 'lucide-react';
import { MediaImage } from '@/components/MediaImage';
import { FantasyPageBackdrop } from '@/components/FantasyPageBackdrop';

const LEONIDA_REGIONS = [
  {
    name: 'Vice City & Ocean Beach',
    summary:
      'Art Deco beachfront boulevards, rooftop clubs, and dense downtown causeways bathed in banafsh twilight.',
    image: '/assets/aistudio/388398c8c654aeeddfea6d166403a7c6_ef6ac76a.jpg',
  },
  {
    name: 'Leonida Keys',
    summary:
      'Tropical island chain stitched together by sweeping ocean bridges, marinas, and smugglers’ coves.',
    image: '/assets/aistudio/image_78a3df33.png',
  },
  {
    name: 'Port Gellhorn',
    summary:
      'Gritty coastal port district of pawn shops, roadside motels, and high-stakes armored scores.',
    image: '/assets/aistudio/image_95b10f83.png',
  },
  {
    name: 'Grassrivers Wetlands',
    summary:
      'Untamed mangrove swamps, airboat channels, and dynamic South Florida thunderstorms.',
    image: '/assets/aistudio/d7b71e81a183c733240a7319ddb7e798_b5be3106.jpg',
  },
];

const SITE_TECH_STACK = [
  { label: 'Framework', value: 'Next.js 15 App Router + React 19' },
  { label: 'Animation Engine', value: 'Motion (Scroll Parallax + Spring Physics)' },
  { label: 'Palette', value: 'Cinema Black + Banafsh Violet & Miami Sunset' },
  { label: 'AI Poster Studio', value: 'Gemini 3 Pro Image Preview (1K / 2K / 4K)' },
  { label: 'Auth Flow', value: 'Instant Email-Only Pass (No OTP Code)' },
  { label: 'Deployment Target', value: 'Vercel Edge-Ready Production Build' },
];

export default function InfoPage() {
  return (
    <FantasyPageBackdrop
      bgImage="/assets/aistudio/388398c8c654aeeddfea6d166403a7c6_ef6ac76a.jpg"
      bgAlt="Vice City waterfront skyline and Hotel Valetta canal"
    >
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6 space-y-5"
            >
              <p className="text-xs font-medium text-[#FB7185] uppercase tracking-wide">
                Game &amp; Website Dossier · Nov 2026
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white text-balance">
                Everything About GTA VI &amp; This Launch Site
              </h1>
              <p className="text-base text-white/75 leading-relaxed">
                A structured breakdown of Grand Theft Auto VI’s world, protagonists, and technical
                architecture alongside the engineering blueprint used to deploy this experience on
                Vercel.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/55">
                    <Users className="w-4 h-4 text-[#C084FC]" />
                    <span>Dual Protagonists</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-white mt-1">
                    Lucia &amp; Jason
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-white/55">
                    <Globe2 className="w-4 h-4 text-[#FB7185]" />
                    <span>Primary Setting</span>
                  </div>
                  <p className="font-display text-2xl font-bold text-white mt-1">
                    State of Leonida
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/15 shadow-[0_28px_80px_rgba(147,51,234,0.32)]"
            >
              <MediaImage
                src="/assets/aistudio/388398c8c654aeeddfea6d166403a7c6_ef6ac76a.jpg"
                alt="Vice City coastal highway, basketball courts, and Hotel Valetta"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#06050A]/70 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/80">
                <span className="font-mono text-[#FDA4AF]">RAGE 9 Render Engine</span>
                <span>State of Leonida</span>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-2 text-xs font-medium text-[#C084FC] uppercase tracking-wide">
              <Map className="w-4 h-4" />
              <span>Confirmed Map Biomes &amp; Districts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LEONIDA_REGIONS.map((region, idx) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-white/15 bg-[#0D0916]/80 backdrop-blur-md overflow-hidden hover:border-[#C084FC]/55 transition-colors shadow-[0_18px_45px_rgba(6,5,10,0.65)]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <MediaImage
                      src={region.image}
                      alt={region.name}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0D0916] via-transparent to-transparent"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <p className="font-mono text-xs text-[#FB7185]">0{idx + 1}.</p>
                    <h2 className="font-display text-2xl font-bold text-white">{region.name}</h2>
                    <p className="text-sm text-white/70 leading-relaxed">{region.summary}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#140B24]/85 via-[#0B0814]/90 to-[#1A0C1C]/85 backdrop-blur-xl p-7 sm:p-12 space-y-8 shadow-[0_24px_75px_rgba(147,51,234,0.22)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-[#FB7185]">
                  <Cpu className="w-4 h-4" />
                  <span>Website Engineering Specs</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                  Built to Deploy Cleanly on Vercel
                </h2>
              </div>

              <Link
                href="/#art-studio"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:opacity-95 text-xs font-semibold text-white inline-flex items-center gap-2 transition-all self-start shadow-[0_0_25px_rgba(147,51,234,0.4)]"
              >
                <Rocket className="w-4 h-4" />
                <span>Try 4K Art Studio</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              {SITE_TECH_STACK.map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <p className="text-xs text-white/50">{spec.label}</p>
                  <p className="text-sm font-semibold text-white">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FantasyPageBackdrop>
  );
}
