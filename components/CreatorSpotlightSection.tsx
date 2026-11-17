'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Instagram } from 'lucide-react';
import { MediaImage } from './MediaImage';
import { useVicePass } from './VicePassProvider';

export function CreatorSpotlightSection() {
  const { currentFan, authorizeWithEmail } = useVicePass();
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineNickname, setInlineNickname] = useState('');
  const [inlineError, setInlineError] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError('');
    setInlineSuccess('');
    setLoading(true);
    const res = await authorizeWithEmail(inlineEmail, inlineNickname);
    setLoading(false);

    if (!res.ok || !res.fan) {
      setInlineError(res.error ?? 'Please enter a valid email address.');
      return;
    }

    setInlineSuccess(
      `Welcome, ${res.fan.displayName}! Your name is now rotating in the Thank You wall above.`
    );
    setInlineEmail('');
    setInlineNickname('');
  };

  return (
    <section
      aria-labelledby="creator-spotlight-heading"
      className="py-24 lg:py-36 bg-[#06050A]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24">
        {/* Creator Instagram Challenge Spotlight — Clean Unboxed Split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          <div className="lg:col-span-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_65px_rgba(147,51,234,0.28)]">
            <MediaImage
              src="/assets/aistudio/image_78a3df33.png"
              alt="Grand Theft Auto VI showcase scene during the Instagram website challenge"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-[#FB7185]">
                <Instagram className="w-4 h-4" />
                <span>Instagram Programming Challenge</span>
              </div>
              <h2
                id="creator-spotlight-heading"
                className="font-display text-4xl sm:text-5xl font-extrabold text-white text-balance"
              >
                Built for Famous Worlds &amp; Coding Challenges
              </h2>
              <p className="text-base text-white/65 leading-relaxed">
                Crafted for our Instagram channel where we design and ship custom web experiences
                for iconic people, studios, and major launches—ready for anyone to explore live on
                Vercel.
              </p>
            </div>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {[
                { href: '/about', label: 'About Us', note: 'Challenge story & design craft' },
                { href: '/blogs', label: 'Read Blogs', note: 'Leonida & RAGE 9 essays' },
                { href: '/info', label: 'Game & Site Info', note: 'Regions & Vercel specs' },
                { href: '/links', label: 'Links & Socials', note: 'Instagram, GitHub & portals' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group py-4 flex items-center justify-between gap-4 hover:pl-2 transition-all"
                >
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-[#C084FC] transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-white/45 mt-0.5">{link.note}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-[#C084FC] transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Clean Unboxed Email Check-In Band */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#120A1E] via-[#0B0812] to-[#1A0D1E] p-8 sm:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-2">
              <p className="text-xs font-medium text-[#FB7185]">Zero-Code Check-In</p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white">
                {currentFan
                  ? `Authorized as ${currentFan.displayName}`
                  : 'Join the 10-Second Thank You Wall'}
              </h3>
              <p className="text-sm text-white/60">
                Enter your email below—no verification code is sent.
              </p>
            </div>

            <form
              onSubmit={handleInlineSubmit}
              className="lg:col-span-7 flex flex-col sm:flex-row gap-3"
              noValidate
            >
              <input
                type="email"
                suppressHydrationWarning
                aria-label="Email address for instant authorization"
                value={inlineEmail}
                onChange={(e) => setInlineEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-3 rounded-lg border border-white/15 bg-black/50 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#A855F7]"
              />
              <input
                type="text"
                suppressHydrationWarning
                aria-label="Optional display name"
                value={inlineNickname}
                onChange={(e) => setInlineNickname(e.target.value)}
                placeholder="Display name (optional)"
                maxLength={32}
                className="sm:w-48 px-4 py-3 rounded-lg border border-white/15 bg-black/50 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#A855F7]"
              />
              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="px-6 py-3 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>{loading ? 'Joining...' : 'Authorize'}</span>
              </button>
            </form>
          </div>

          {inlineError && (
            <p role="alert" className="text-xs font-medium text-[#FB7185] mt-3">
              {inlineError}
            </p>
          )}
          {inlineSuccess && (
            <p role="status" className="text-xs font-medium text-[#C084FC] mt-3">
              {inlineSuccess}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
