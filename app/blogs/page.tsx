'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { MediaImage } from '@/components/MediaImage';
import { FantasyPageBackdrop } from '@/components/FantasyPageBackdrop';
import { BLOG_ARTICLES, BlogArticle } from '@/lib/gta-catalog';

const CATEGORIES = ['All', 'Visual Direction', 'Creator Log', 'World Guide'];

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState<BlogArticle>(BLOG_ARTICLES[0]);

  const filtered =
    selectedCategory === 'All'
      ? BLOG_ARTICLES
      : BLOG_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <FantasyPageBackdrop
      bgImage="/assets/aistudio/d7b71e81a183c733240a7319ddb7e798_b5be3106.jpg"
      bgAlt="Leonida highway dusk atmosphere"
    >
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-medium text-[#FB7185] uppercase tracking-wide">
                Editorial Dispatches · Launch Week
              </p>
              <h1 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight text-white">
                Leonida Notes &amp; Build Logs
              </h1>
              <p className="text-base text-white/75">
                Essays on GTA VI art direction, map districts, and behind-the-scenes engineering
                from our Instagram challenge build.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter blog articles by category"
              className="flex flex-wrap items-center gap-1 p-1.5 rounded-xl border border-white/15 bg-[#0D0916]/80 backdrop-blur-md"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              {filtered.map((article) => {
                const isActive = activeArticle.slug === article.slug;
                return (
                  <motion.button
                    key={article.slug}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setActiveArticle(article)}
                    whileHover={{ x: 4 }}
                    className={`w-full text-left rounded-2xl border p-6 transition-all cursor-pointer space-y-2.5 backdrop-blur-md ${
                      isActive
                        ? 'border-[#C084FC]/70 bg-gradient-to-br from-[#9333EA]/20 via-[#0E0A18]/85 to-[#FB7185]/10 shadow-[0_14px_38px_rgba(147,51,234,0.22)]'
                        : 'border-white/12 bg-[#0D0916]/70 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <span className="text-[#FB7185] font-medium">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="font-display text-2xl font-bold text-white">
                      {article.title}
                    </h2>
                    <p className="text-sm text-white/70 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C084FC] pt-1">
                      <span>Read Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeArticle.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/15 bg-[#0D0916]/85 backdrop-blur-xl overflow-hidden shadow-[0_28px_80px_rgba(147,51,234,0.24)]"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <MediaImage
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0D0916] via-transparent to-transparent"
                    />
                  </div>
                  <div className="p-7 sm:p-10 space-y-5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/55">
                      <BookOpen className="w-3.5 h-3.5 text-[#C084FC]" />
                      <span className="text-[#FB7185] font-medium">{activeArticle.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeArticle.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{activeArticle.readTime}</span>
                    </div>

                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                      {activeArticle.title}
                    </h2>

                    <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed">
                      {activeArticle.paragraphs.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </FantasyPageBackdrop>
  );
}
