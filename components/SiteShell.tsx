'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Check, LogOut, Menu, ShieldCheck, X } from 'lucide-react';
import { useVicePass } from './VicePassProvider';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/blogs', label: 'Blogs' },
  { href: '/info', label: 'Game Info' },
  { href: '/links', label: 'Links' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentFan, isAuthModalOpen, openAuthModal, closeAuthModal, authorizeWithEmail, signOut } =
    useVicePass();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navigatingTarget, setNavigatingTarget] = useState<string | null>(null);
  const navTimerRef = useRef<number | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isNavigating = navigatingTarget !== null && navigatingTarget !== pathname;

  // Prefetch all app routes immediately on mount for instant navigation
  useEffect(() => {
    for (const item of NAV_LINKS) {
      router.prefetch(item.href);
    }
    return () => {
      if (navTimerRef.current !== null) {
        window.clearTimeout(navTimerRef.current);
      }
    };
  }, [router]);

  const handleRouteStart = (href: string) => {
    setMobileMenuOpen(false);
    if (href === pathname) return;
    setNavigatingTarget(href);
    if (navTimerRef.current !== null) {
      window.clearTimeout(navTimerRef.current);
    }
    navTimerRef.current = window.setTimeout(() => {
      setNavigatingTarget(null);
      navTimerRef.current = null;
    }, 5000);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSubmitting(true);
    const result = await authorizeWithEmail(emailInput, nicknameInput);
    setSubmitting(false);

    if (!result.ok) {
      setAuthError(result.error ?? 'Please enter a valid email address.');
      return;
    }

    setEmailInput('');
    setNicknameInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#06050A] text-[#FAF9FF] overflow-x-clip">
      {/* Strictly 3-zone sleek translucent header */}
      <header className="sticky top-0 z-40 h-16 border-b border-white/[0.08] bg-[#06050A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Iconic VI wordmark */}
          <Link
            href="/"
            prefetch
            onMouseEnter={() => router.prefetch('/')}
            onClick={() => handleRouteStart('/')}
            aria-label="GTA VI Home"
            className="group flex items-baseline gap-2 whitespace-nowrap shrink-0"
          >
            <span className="font-vi text-4xl leading-none tracking-wider bg-gradient-to-br from-[#FDA4AF] via-[#E879F9] to-[#9333EA] bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(192,132,252,0.5)] group-hover:scale-105 transition-transform duration-200">
              VI
            </span>
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-[0.26em] uppercase text-white/45 group-hover:text-[#FDA4AF] transition-colors">
              Vice City
            </span>
          </Link>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-white/65"
          >
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  onMouseEnter={() => router.prefetch(item.href)}
                  onClick={() => handleRouteStart(item.href)}
                  className={`relative whitespace-nowrap shrink-0 py-1 transition-colors duration-150 ${
                    active ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-0 -bottom-[21px] h-0.5 bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={openAuthModal}
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] text-white transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
            >
              {currentFan ? currentFan.displayName : 'Get Vice Pass'}
            </button>

            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg border border-white/15 text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            aria-label="Mobile navigation"
            className="md:hidden fixed inset-x-0 top-16 z-30 border-b border-white/10 bg-[#0A0810]/95 backdrop-blur-xl px-6 py-5"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleRouteStart(item.href);
                    }}
                    className={`py-2 text-base font-medium border-b border-white/[0.07] ${
                      active ? 'text-[#C084FC]' : 'text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Top Route Progress Bar */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            key="route-progress-bar"
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 0.9, opacity: 1 }}
            exit={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            role="progressbar"
            aria-label="Loading page"
            className="fixed top-16 inset-x-0 h-[3px] z-50 bg-gradient-to-r from-[#FB7185] via-[#E879F9] to-[#9333EA] shadow-[0_0_12px_rgba(192,132,252,0.85)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <main className="flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-white/[0.07] bg-[#040307] py-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-vi text-3xl leading-none tracking-wider bg-gradient-to-br from-[#FDA4AF] via-[#E879F9] to-[#9333EA] bg-clip-text text-transparent">
                VI
              </span>
              <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-white/45">
                Grand Theft Auto
              </span>
            </div>
            <p className="text-sm text-white/50 max-w-md">
              Launch-week GTA VI tribute crafted in Miami banafsh twilight style for an Instagram
              programming challenge.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-7 text-sm text-white/60">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onMouseEnter={() => router.prefetch(item.href)}
                onClick={() => handleRouteStart(item.href)}
                className="hover:text-white transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-white/40">
            Community Showcase · November 2026
          </p>
        </div>
      </footer>

      {/* Instant Email-Only Authorization Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vice-pass-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22 }}
              className="w-full max-w-md rounded-2xl border border-white/15 bg-[#0E0B14] p-7 sm:p-8 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#FB7185]">
                    Instant Check-In · No Verification Code
                  </p>
                  <h2
                    id="vice-pass-title"
                    className="font-display text-3xl font-bold text-white mt-1"
                  >
                    {currentFan ? 'Your Vice Pass Is Active' : 'Claim Your Vice Pass'}
                  </h2>
                </div>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={closeAuthModal}
                  aria-label="Close Vice Pass dialog"
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {currentFan ? (
                <div className="mt-6 space-y-5">
                  <div className="rounded-xl border border-[#A855F7]/30 bg-white/[0.03] p-5 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#C084FC]">
                      <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
                      <span>Authorized Member</span>
                    </div>
                    <p className="font-display text-2xl font-bold text-white">
                      {currentFan.displayName}
                    </p>
                    <p className="text-sm text-white/55 break-all">{currentFan.email}</p>
                    <p className="text-xs text-white/60 pt-1">
                      Your name is live in the 10-second Thank You wall rotation.
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={closeAuthModal}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] text-sm font-semibold text-white transition-colors cursor-pointer"
                    >
                      Back to Site
                    </button>
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={signOut}
                      className="py-2.5 px-4 rounded-lg border border-white/15 hover:bg-white/[0.06] text-sm font-medium text-white/75 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4" noValidate>
                  <p className="text-sm text-white/65 leading-relaxed">
                    Authorize instantly using just your email—no confirmation code is sent. Your
                    name joins the rotating Thank You wall immediately.
                  </p>

                  <div>
                    <label
                      htmlFor="modal-email"
                      className="block text-xs font-medium text-white/75 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="modal-email"
                      type="email"
                      required
                      suppressHydrationWarning
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/15 bg-black/50 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#A855F7]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="modal-nickname"
                      className="block text-xs font-medium text-white/75 mb-1.5"
                    >
                      Display Name (Optional)
                    </label>
                    <input
                      id="modal-nickname"
                      type="text"
                      suppressHydrationWarning
                      value={nicknameInput}
                      onChange={(e) => setNicknameInput(e.target.value)}
                      placeholder="e.g. Lucia Fan, Saman"
                      maxLength={32}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-white/15 bg-black/50 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#A855F7]"
                    />
                  </div>

                  {authError && (
                    <p role="alert" className="text-xs font-medium text-[#FB7185]">
                      {authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    suppressHydrationWarning
                    className="w-full py-3 px-4 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] disabled:opacity-60 text-sm font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{submitting ? 'Authorizing...' : 'Authorize Instantly'}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
