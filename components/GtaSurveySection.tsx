'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { GTA_SURVEY_QUESTIONS, evaluateSurvey } from '@/lib/survey-data';

export function GtaSurveySection() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [validationHint, setValidationHint] = useState('');

  const totalQuestions = GTA_SURVEY_QUESTIONS.length;
  const currentQuestion = GTA_SURVEY_QUESTIONS[stepIndex];
  const selectedOption = answers[currentQuestion.id];

  const result = useMemo(() => evaluateSurvey(answers), [answers]);

  const handleSelectOption = (optionIndex: number) => {
    setValidationHint('');
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (typeof selectedOption !== 'number') {
      setValidationHint('Choose one of the four options before moving forward.');
      return;
    }
    if (stepIndex < totalQuestions - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStepIndex(0);
    setSubmitted(false);
    setValidationHint('');
  };

  const progressPct = submitted
    ? 100
    : Math.round(((stepIndex + (typeof selectedOption === 'number' ? 1 : 0)) / totalQuestions) * 100);

  return (
    <section
      id="survey"
      aria-labelledby="survey-section-heading"
      className="py-24 lg:py-36 border-b border-white/[0.08] bg-[#06050A] relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_15%,rgba(147,51,234,0.14),transparent_70%)]"
      />

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-14"
        >
          <p className="text-xs font-medium text-[#FB7185]">
            10-Question Compatibility Index
          </p>
          <h2
            id="survey-section-heading"
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white text-balance"
          >
            How Much Will You Love GTA VI?
          </h2>
          <p className="text-base text-white/65">
            Ten questions, four choices each. Discover your Leonida playstyle and day-one focus.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 34, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-sm p-6 sm:p-12 shadow-[0_24px_75px_rgba(147,51,234,0.16)]"
        >
          {/* Minimalist Progress Line */}
          <div className="flex items-center justify-between gap-4 text-xs text-white/55 mb-3">
            <span className="font-mono tabular-nums">
              {submitted
                ? '10 / 10 Answered'
                : `Question ${String(stepIndex + 1).padStart(2, '0')} of ${totalQuestions}`}
            </span>
            <span className="font-mono tabular-nums text-[#C084FC]">{progressPct}%</span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden mb-10">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
            />
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-[#C084FC]">
                    {currentQuestion.category}
                  </p>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                    {currentQuestion.prompt}
                  </h3>
                </div>

                {/* Four Clean Tactile Option Rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    const isPicked = selectedOption === idx;
                    const letter = ['A', 'B', 'C', 'D'][idx];
                    return (
                      <motion.button
                        key={option.label}
                        type="button"
                        suppressHydrationWarning
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, delay: idx * 0.05 }}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectOption(idx)}
                        aria-pressed={isPicked}
                        className={`text-left rounded-2xl border p-5 transition-colors duration-150 cursor-pointer flex flex-col justify-between gap-3 ${
                          isPicked
                            ? 'border-[#A855F7] bg-[#9333EA]/15'
                            : 'border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs text-[#FB7185]">
                            Option {letter}
                          </span>
                          {isPicked && <CheckCircle2 className="w-4 h-4 text-[#C084FC]" />}
                        </div>
                        <div>
                          <p className="text-sm sm:text-base font-semibold text-white">
                            {option.label}
                          </p>
                          <p className="text-xs text-white/55 mt-1.5 leading-relaxed">
                            {option.detail}
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {validationHint && (
                  <p role="alert" className="text-xs font-medium text-[#FB7185]">
                    {validationHint}
                  </p>
                )}

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => {
                      setValidationHint('');
                      setStepIndex((prev) => Math.max(0, prev - 1));
                    }}
                    disabled={stepIndex === 0}
                    className="px-4 py-2.5 text-xs sm:text-sm font-medium text-white/65 hover:text-white disabled:opacity-35 inline-flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-[#9333EA] hover:bg-[#7E22CE] text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {stepIndex === totalQuestions - 1 ? 'See My Results' : 'Next Question'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="survey-results"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                data-testid="survey-results-panel"
                className="space-y-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 text-center md:text-left space-y-1 md:border-r md:border-white/10 md:pr-6">
                    <p className="text-xs text-white/50">Leonida Compatibility</p>
                    <p className="font-mono tabular-nums text-6xl sm:text-7xl font-bold text-white">
                      {result.matchPercentage}%
                    </p>
                    <p className="text-xs font-medium text-[#FB7185]">Estimated Enjoyment</p>
                  </div>

                  <div className="md:col-span-8 space-y-3">
                    <p className="text-xs font-medium text-[#C084FC]">
                      {result.archetypeSubtitle}
                    </p>
                    <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                      {result.archetypeTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {result.outlookSummary}
                    </p>
                  </div>
                </div>

                {/* 4 Category Affinity Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  {[
                    { label: 'Story & Characters', value: result.axisScores.story },
                    { label: 'Open-World Chaos', value: result.axisScores.chaos },
                    { label: 'Miami Banafsh Vibe', value: result.axisScores.vibe },
                    { label: 'Next-Gen Immersion', value: result.axisScores.immersion },
                  ].map((axis) => (
                    <div key={axis.label} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span className="text-white/85">{axis.label}</span>
                        <span className="font-mono tabular-nums text-[#C084FC]">
                          {axis.value}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: axis.value / 100 }}
                          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                          style={{ transformOrigin: 'left' }}
                          className="h-full bg-gradient-to-r from-[#9333EA] to-[#FB7185]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-[#FB7185]">Day-One Plan</p>
                    <p className="text-sm text-white/85">{result.dayOnePlan}</p>
                  </div>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-lg border border-white/15 hover:border-white/35 text-xs font-semibold text-white inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Survey</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
