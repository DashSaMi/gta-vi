'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Share2 } from 'lucide-react';
import { MediaImage } from '@/components/MediaImage';
import { FantasyPageBackdrop } from '@/components/FantasyPageBackdrop';
import { CREATOR_SOCIAL_LINKS } from '@/lib/gta-catalog';

export default function LinksPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <FantasyPageBackdrop
      bgImage="/assets/aistudio/image_78a3df33.png"
      bgAlt="Grand Theft Auto VI twilight portal backdrop"
    >
      <section className="py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-4"
            >
              <p className="text-xs font-medium text-[#FB7185] uppercase tracking-wide">
                Creator Hub · Socials &amp; Resources
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white text-balance">
                Links, Instagram Challenges &amp; Official Portals
              </h1>
              <p className="text-base text-white/75 max-w-2xl">
                Follow the programming challenge series, explore the build concepts, or share this
                launch-week GTA VI site with your crew.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={handleCopyShareUrl}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:opacity-95 text-sm font-semibold text-white inline-flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_28px_rgba(147,51,234,0.45)]"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Website Link Copied!' : 'Copy Website Share Link'}</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/15 shadow-[0_24px_70px_rgba(147,51,234,0.34)]"
            >
              <MediaImage
                src="/assets/aistudio/image_78a3df33.png"
                alt="Grand Theft Auto VI key artwork portal preview"
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#06050A] via-transparent to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <span className="text-xs font-mono text-[#FDA4AF]">Launch Hub Portals</span>
                <span className="font-vi text-2xl bg-gradient-to-br from-[#FDA4AF] to-[#C084FC] bg-clip-text text-transparent">
                  VI
                </span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CREATOR_SOCIAL_LINKS.map((item, idx) => (
              <motion.a
                key={item.platform}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-white/15 bg-[#0D0916]/75 backdrop-blur-md p-6 hover:border-[#C084FC]/60 hover:bg-[#130D22]/85 transition-all shadow-[0_18px_45px_rgba(6,5,10,0.55)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <span className="text-[#FB7185] font-semibold">{item.platform}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#C084FC]">{item.handle}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-white group-hover:text-[#FDA4AF] transition-colors">
                      {item.label}
                    </h2>
                    <p className="text-sm text-white/70">{item.description}</p>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-white/45 group-hover:text-[#C084FC] shrink-0 mt-1 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#0D0916]/80 backdrop-blur-md p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-[#FB7185] shrink-0" />
              <p className="text-sm text-white/80">
                Ready to jump back into the 10-question GTA VI compatibility test?
              </p>
            </div>
            <Link
              href="/#survey"
              className="px-5 py-2.5 rounded-lg border border-white/20 hover:border-[#C084FC] text-xs font-semibold text-white whitespace-nowrap self-start sm:self-auto transition-colors"
            >
              Open Survey
            </Link>
          </div>
        </div>
      </section>
    </FantasyPageBackdrop>
  );
}
