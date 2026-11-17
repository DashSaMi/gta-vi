'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MediaImage } from './MediaImage';

interface FantasyPageBackdropProps {
  bgImage: string;
  bgAlt: string;
  children: React.ReactNode;
}

const TWILIGHT_MOTES = [
  { top: '12%', left: '14%', size: 'w-2 h-2', color: 'bg-[#C084FC]/70', delay: 0 },
  { top: '22%', left: '84%', size: 'w-2.5 h-2.5', color: 'bg-[#FB7185]/70', delay: 0.7 },
  { top: '44%', left: '8%', size: 'w-1.5 h-1.5', color: 'bg-[#38BDF8]/65', delay: 1.4 },
  { top: '58%', left: '91%', size: 'w-2 h-2', color: 'bg-[#E879F9]/70', delay: 0.4 },
  { top: '76%', left: '22%', size: 'w-2.5 h-2.5', color: 'bg-[#FB7185]/60', delay: 1.1 },
  { top: '82%', left: '74%', size: 'w-1.5 h-1.5', color: 'bg-[#C084FC]/75', delay: 1.8 },
];

export function FantasyPageBackdrop({
  bgImage,
  bgAlt,
  children,
}: FantasyPageBackdropProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[#06050A]">
      {/* Subtle atmospheric GTA VI scene backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="relative w-full h-[540px] opacity-25">
          <MediaImage
            src={bgImage}
            alt={bgAlt}
            sizes="100vw"
            className="object-cover object-center blur-[2px] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06050A]/45 via-[#06050A]/75 to-[#06050A]" />
        </div>
      </div>

      {/* Fantasy Miami Banafsh Twilight Aurora Orbs */}
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 32, -18, 0],
          y: [0, -24, 18, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-32 -left-24 w-[540px] h-[540px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.28),transparent_68%)] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -36, 22, 0],
          y: [0, 28, -20, 0],
          scale: [1, 0.94, 1.09, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute top-[18%] -right-28 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(251,113,133,0.22),transparent_68%)] blur-2xl"
      />
      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 24, -24, 0],
          y: [0, -18, 20, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute bottom-0 left-[30%] w-[620px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_70%)] blur-3xl"
      />

      {/* Luminous Vice Twilight Grid Horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14] bg-[linear-gradient(to_right,rgba(192,132,252,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,113,133,0.14)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,black_30%,transparent_95%)]"
      />

      {/* Floating Fantasy Light Motes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {TWILIGHT_MOTES.map((mote, idx) => (
          <motion.span
            key={idx}
            style={{ top: mote.top, left: mote.left }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.35, 0.95, 0.35],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 4.5 + idx * 0.6,
              repeat: Infinity,
              delay: mote.delay,
              ease: 'easeInOut',
            }}
            className={`absolute rounded-full blur-[1px] ${mote.size} ${mote.color}`}
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
