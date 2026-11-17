'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Loader2, Sparkles } from 'lucide-react';
import { MediaImage } from './MediaImage';

type ImageResolution = '1K' | '2K' | '4K';
type AspectOption = '16:9' | '3:4' | '1:1';

const PRESET_PROMPTS = [
  'Convertible muscle car parked on Ocean Drive in front of Art Deco hotels at banafsh purple sunset',
  'Speedboat racing across the Leonida Keys causeway under glowing violet storm clouds',
  'Downtown Vice Metro elevated train station glowing in warm coral and deep amethyst dusk',
  'Palm-lined Starfish Island villa courtyard overlooking twilight ocean horizon',
];

export function ViceArtStudio() {
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [imageSize, setImageSize] = useState<ImageResolution>('2K');
  const [aspectRatio, setAspectRatio] = useState<AspectOption>('16:9');
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (prompt.trim().length < 4) {
      setErrorMessage('Please describe the Miami / Vice City scene you want to create.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/generate-art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageSize,
          aspectRatio,
        }),
      });
      const data = (await res.json()) as {
        imageDataUrl?: string;
        error?: string;
      };
      if (!res.ok || !data.imageDataUrl) {
        setErrorMessage(data.error ?? 'Could not generate artwork right now.');
      } else {
        setGeneratedUrl(data.imageDataUrl);
      }
    } catch {
      setErrorMessage('Network error while contacting the image generator.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="art-studio"
      aria-labelledby="art-studio-heading"
      className="py-24 lg:py-36 border-b border-white/[0.08] bg-[#08060D]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-medium text-[#C084FC]">
                Vice City Poster Studio · 1K / 2K / 4K
              </p>
              <h2
                id="art-studio-heading"
                className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-balance"
              >
                Create Custom Banafsh Key Art
              </h2>
              <p className="text-sm sm:text-base text-white/65 leading-relaxed">
                Describe any Leonida boulevard or oceanfront chase and render high-resolution
                artwork at 1K, 2K, or 4K.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-5">
              <div>
                <label
                  htmlFor="art-prompt-input"
                  className="block text-xs font-medium text-white/65 mb-2"
                >
                  Scene Description
                </label>
                <textarea
                  id="art-prompt-input"
                  rows={3}
                  suppressHydrationWarning
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your Miami twilight scene..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/[0.03] text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#A855F7]"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {PRESET_PROMPTS.map((preset, index) => (
                  <button
                    key={preset}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setPrompt(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      prompt === preset
                        ? 'border-[#A855F7] bg-[#9333EA]/20 text-white'
                        : 'border-white/10 bg-transparent text-white/55 hover:text-white'
                    }`}
                  >
                    Preset {index + 1}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium text-white/65 mb-2">
                    Output Resolution
                  </span>
                  <div
                    role="group"
                    aria-label="Output image resolution"
                    className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/10"
                  >
                    {(['1K', '2K', '4K'] as ImageResolution[]).map((size) => (
                      <button
                        key={size}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setImageSize(size)}
                        aria-pressed={imageSize === size}
                        className={`py-2 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer ${
                          imageSize === size
                            ? 'bg-[#9333EA] text-white'
                            : 'text-white/55 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-medium text-white/65 mb-2">
                    Aspect Ratio
                  </span>
                  <div
                    role="group"
                    aria-label="Output aspect ratio"
                    className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-white/[0.03] border border-white/10"
                  >
                    {(['16:9', '3:4', '1:1'] as AspectOption[]).map((ratio) => (
                      <button
                        key={ratio}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => setAspectRatio(ratio)}
                        aria-pressed={aspectRatio === ratio}
                        className={`py-2 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer ${
                          aspectRatio === ratio
                            ? 'bg-[#9333EA] text-white'
                            : 'text-white/55 hover:text-white'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {errorMessage && (
                <p
                  role="alert"
                  className="text-xs font-medium text-[#FB7185] rounded-lg border border-[#FB7185]/30 bg-[#FB7185]/10 px-4 py-3"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                suppressHydrationWarning
                className="w-full py-3.5 px-5 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] disabled:opacity-60 text-sm font-semibold text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Rendering {imageSize} Poster...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate {imageSize} Artwork</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Borderless Gallery Frame */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-[#06050A] shadow-2xl">
              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
                  <Loader2 className="w-8 h-8 text-[#C084FC] animate-spin" />
                  <p className="text-sm font-medium text-white/75">
                    Rendering Miami twilight reflections at {imageSize}...
                  </p>
                </div>
              ) : generatedUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={generatedUrl}
                  alt="Custom generated Vice City banafsh twilight artwork"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#06050A]"
                />
              ) : (
                <MediaImage
                  src="/assets/aistudio/388398c8c654aeeddfea6d166403a7c6_ef6ac76a.jpg"
                  alt="Vice City coastal towers, Hotel Valetta canal, and waterfront court preview"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span>
                {generatedUrl
                  ? `Rendered Output · ${imageSize} · ${aspectRatio}`
                  : 'Vice City Canal & Skyline Preview'}
              </span>
              {generatedUrl && (
                <a
                  href={generatedUrl}
                  download={`leonida-six-${imageSize.toLowerCase()}.png`}
                  className="inline-flex items-center gap-1.5 text-white hover:text-[#C084FC] font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
