'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShieldAlert, Users } from 'lucide-react';
import { MediaImage } from './MediaImage';

interface CharacterProfile {
  id: 'lucia' | 'jason';
  name: string;
  role: string;
  origin: string;
  quote: string;
  bio: string;
  dynamicNote: string;
  traits: { label: string; value: string }[];
  image: string;
  accentColor: string;
  cropFocus: string;
}

const CHARACTERS: CharacterProfile[] = [
  {
    id: 'lucia',
    name: 'Lucia',
    role: 'Dual Lead Protagonist · Co-Architect',
    origin: 'Leonida Penitentiary -> Vice City',
    quote: '“Bad luck, I guess.”',
    bio: 'Sharp, fiercely pragmatic, and the first female mainline lead of the modern Grand Theft Auto era. After serving time in Leonida Penitentiary and stepping out with a court-ordered ankle monitor, Lucia refuses to stay boxed in—pulling high-risk convenience scores and armored hits across Port Gellhorn and Vice City.',
    dynamicNote:
      'Lucia drives the pair’s ambition and improvisational grit, calculating exits on the fly while pushing Jason deeper into Leonida’s underground.',
    traits: [
      { label: 'Background', value: 'Former Leonida inmate on supervised release' },
      { label: 'Specialty', value: 'Close-quarters breaches, heist pacing & street instincts' },
      { label: 'Signature Motif', value: 'Ankle monitor & relentless forward momentum' },
    ],
    image: '/assets/aistudio/image_34b54bac.png',
    accentColor: '#FB7185',
    cropFocus: 'object-[50%_20%]',
  },
  {
    id: 'jason',
    name: 'Jason',
    role: 'Dual Lead Protagonist · Wheelman & Enforcer',
    origin: 'Port Gellhorn & Leonida Keys',
    quote: '“Trust? Trust.”',
    bio: 'Calm under fire, observant, and deeply loyal. Jason bridges small-town Leonida dirt roads with downtown Vice City heists—handling getaway muscle cars, heavy firearms, and split-second tactical swaps when alarms trip inside crowded storefronts.',
    dynamicNote:
      'Jason anchors the partnership’s steady tactical execution, balancing Lucia’s volatile high-stakes instincts with unwavering loyalty when heat closes in.',
    traits: [
      { label: 'Background', value: 'Rural Leonida drifter & seasoned getaway operator' },
      { label: 'Specialty', value: 'Precision wheelwork, covert recon & firepower' },
      { label: 'Signature Motif', value: 'Bonnie-and-Clyde trust pact under five-star pressure' },
    ],
    image: '/assets/aistudio/image_afaf32f6.png',
    accentColor: '#C084FC',
    cropFocus: 'object-[50%_18%]',
  },
];

export function ProtagonistsSection() {
  const [selectedId, setSelectedId] = useState<'lucia' | 'jason'>('lucia');
  const active = CHARACTERS.find((c) => c.id === selectedId) ?? CHARACTERS[0];

  return (
    <section
      id="characters"
      aria-labelledby="protagonists-heading"
      className="py-24 lg:py-36 border-b border-white/[0.08] bg-[#08060D] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_18%_35%,rgba(251,113,133,0.12),transparent_65%),radial-gradient(ellipse_55%_45%_at_85%_65%,rgba(147,51,234,0.14),transparent_65%)]"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#FB7185]">
              Lead Characters · State of Leonida
            </p>
            <h2
              id="protagonists-heading"
              className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance"
            >
              Meet Lucia &amp; Jason
            </h2>
            <p className="text-base text-white/65 leading-relaxed">
              Grand Theft Auto VI revolves around a modern outlaw duo navigating survival, loyalty,
              and escalating scores across Vice City and Port Gellhorn.
            </p>
          </div>

          {/* Interactive Character Switcher */}
          <div
            role="tablist"
            aria-label="Select GTA VI protagonist"
            className="inline-flex items-center gap-1 p-1 rounded-xl border border-white/15 bg-white/[0.03] self-start md:self-auto"
          >
            {CHARACTERS.map((char) => {
              const isSelected = char.id === selectedId;
              return (
                <button
                  key={char.id}
                  type="button"
                  role="tab"
                  suppressHydrationWarning
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(char.id)}
                  className={`relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isSelected ? 'text-white' : 'text-white/55 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="character-active-pill"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="absolute inset-0 rounded-lg bg-[#9333EA]"
                    />
                  )}
                  <span className="relative z-10">{char.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Dossier Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
          >
            {/* Left Portrait Frame */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] w-full max-w-[420px] mx-auto rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                <motion.div
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <MediaImage
                    src={active.image}
                    alt={`${active.name} — GTA VI Protagonist`}
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className={`object-cover ${active.cropFocus}`}
                  />
                </motion.div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#08060D] via-transparent to-transparent"
                />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p
                      style={{ color: active.accentColor }}
                      className="text-xs font-medium"
                    >
                      {active.origin}
                    </p>
                    <p className="font-display text-4xl font-extrabold text-white mt-0.5">
                      {active.name}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-white/60">{active.quote}</span>
                </div>
              </div>
            </div>

            {/* Right Character Story & Traits */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#C084FC]">
                  <Users className="w-4 h-4" />
                  <span>{active.role}</span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                  Who Is {active.name}?
                </h3>
                <p className="text-base text-white/75 leading-relaxed">{active.bio}</p>
              </div>

              {/* Trust & Partnership Note */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-[#FB7185]">
                  <ShieldAlert className="w-4 h-4" />
                  <span>The Lucia &amp; Jason Dynamic</span>
                </div>
                <p className="text-sm text-white/75 leading-relaxed">{active.dynamicNote}</p>
              </div>

              {/* Clean Hairline Trait List */}
              <dl className="divide-y divide-white/10 border-t border-b border-white/10">
                {active.traits.map((trait) => (
                  <div
                    key={trait.label}
                    className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
                  >
                    <dt className="text-xs text-white/45">{trait.label}</dt>
                    <dd className="text-sm font-medium text-white sm:text-right">
                      {trait.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
