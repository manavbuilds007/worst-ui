import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { DelayedLink } from './DelayedLink.js';
import { soundEffects } from '../../lib/soundEffects.js';
import {
  GraduationCap,
  Sparkles,
  HeartPulse,
  Send,
  Cpu,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface UseCase {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  icon: string;
  description: string;
  benefit: string;
  actionLabel: string;
  actionContext: string;
}

const USE_CASES: UseCase[] = [
  {
    id: 'education',
    title: 'UX/UI Anti-Pattern Curriculum',
    badge: 'Design Education',
    badgeColor: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/40',
    icon: '🎓',
    description: 'A masterclass in negative design pedagogy. Used by design instructors to demonstrate every textbook UX mistake—evasive call-to-actions, double-negative cognitive traps, delayed hyperlinks, and deceptive color contrasts.',
    benefit: 'Save your team thousands in design debt by witnessing catastrophe in a safe sandbox.',
    actionLabel: 'Explore Anti-Patterns',
    actionContext: 'Design educators examining cognitive overload in real-time.',
  },
  {
    id: 'pranks',
    title: 'Developer & Team Pranking',
    badge: 'Office Mischief',
    badgeColor: 'border-pink-500/50 text-pink-300 bg-pink-950/40',
    icon: '🎭',
    description: 'Send this URL to your tech lead, product manager, or friends with the message: "Hey, can you review my new minimal sleek landing page?" Watch them chase evasive buttons and get billed ₹9999.99 in fake currency.',
    benefit: 'Guaranteed 100% comedic confusion with zero real-world data loss.',
    actionLabel: 'Launch Prank Mode',
    actionContext: 'Office prankster sharing the portal with unsuspecting colleagues.',
  },
  {
    id: 'patience',
    title: 'Patience & Zen Resilience Training',
    badge: 'Mental Fortitude',
    badgeColor: 'border-amber-500/50 text-amber-300 bg-amber-950/40',
    icon: '🧘',
    description: 'Modern digital life has degraded our attention spans. If you can successfully navigate through 5 delayed hyperlinks, catch 3 evasive buttons, and converse with our unhelpful AI without sighing, you achieve digital enlightenment.',
    benefit: 'Strengthen psychological resilience against slow government websites and terrible internal enterprise software.',
    actionLabel: 'Test Your Patience',
    actionContext: 'User undertaking extreme emotional endurance testing.',
  },
  {
    id: 'benchmark',
    title: 'Browser Layout & DOM Thrashing Benchmark',
    badge: 'Performance Stress',
    badgeColor: 'border-purple-500/50 text-purple-300 bg-purple-950/40',
    icon: '⚡',
    description: 'Benchmark how gracefully your web browser engine handles non-linear coordinate translation, real-time bounding box recalculations, multi-layer translucent backdrop filters, and rapid SVG fractal noise rendering.',
    benefit: 'Validates browser frame rendering stability under intentional chaotic animation stress.',
    actionLabel: 'Run Chaos Benchmark',
    actionContext: 'Browser performance engineers evaluating layout recalculation speed.',
  },
  {
    id: 'ai-alignment',
    title: 'Conversational Comedy & AI Subversion Testing',
    badge: 'AI Research',
    badgeColor: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40',
    icon: '🤖',
    description: 'Examine server-side Gemini prompt engineering tailored specifically for deadpan comedic unhelpfulness. Test how structured JSON schemas and Zod validation enforce safe, non-abusive, hilarious satire.',
    benefit: 'Study structured LLM output governance and persona constraints in a live full-stack application.',
    actionLabel: 'Interrogate AI',
    actionContext: 'AI researchers studying unhelpful-yet-safe model alignment.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility Inversion Demonstration',
    badge: 'Accessibility Compliance',
    badgeColor: 'border-red-500/50 text-red-300 bg-red-950/40',
    icon: '👁️',
    description: 'Witness what happens when color semantics are inverted (Red for Yes, Green for No) and why WCAG motion reduction toggles are essential for users sensitive to parallax or floating holograms.',
    benefit: 'Demonstrates why clear visual hierarchy and proper motion accessibility switches matter.',
    actionLabel: 'Test Accessibility Inversion',
    actionContext: 'Accessibility advocates demonstrating cognitive load.',
  },
];

export const UseCasesSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<string>(USE_CASES[0].id);
  const { triggerHologramReaction, incrementClicks } = useChaosState();

  const current = USE_CASES.find(u => u.id === selectedCase) || USE_CASES[0];

  const handleSelectCase = (uc: UseCase) => {
    incrementClicks();
    soundEffects.playBlip();
    setSelectedCase(uc.id);
    triggerHologramReaction(`User selected the "${uc.title}" use case.`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-10 space-y-8 text-left">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
          WHY OPEN THIS WEBSITE?
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight uppercase">
          LEGITIMATE REAL-WORLD USE CASES
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto font-sans leading-relaxed">
          Believe it or not, there are genuine educational, psychological, comedic, and technical reasons to explore the Worst UI for Any Web Browser.
        </p>
      </div>

      {/* Tabs / Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {USE_CASES.map((uc) => {
          const isSelected = uc.id === selectedCase;
          return (
            <button
              key={uc.id}
              onClick={() => handleSelectCase(uc)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all select-none border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-purple-500/20 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,247,255,0.3)] scale-105'
                  : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span>{uc.icon}</span>
              <span>{uc.title}</span>
            </button>
          );
        })}
      </div>

      {/* Feature Showcase Card */}
      <div className="bg-zinc-950/90 border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full border ${current.badgeColor}`}>
                {current.badge}
              </span>
              <span className="text-2xl">{current.icon}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white font-mono">
              {current.title}
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
              {current.description}
            </p>

            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono space-y-1.5">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>PRIMARY BENEFIT</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs sm:text-sm">
                {current.benefit}
              </p>
            </div>
          </div>

          {/* Action Sandbox Callout */}
          <div className="w-full md:w-72 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-700/80 rounded-2xl p-5 space-y-4 font-mono text-xs flex flex-col justify-between shadow-lg">
            <div className="space-y-2">
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block font-bold">
                RECOMMENDED ACTION
              </span>
              <p className="text-zinc-300 font-sans text-xs">
                Test this scenario immediately inside the live anti-UX playground.
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <DelayedLink
                to={
                  current.id === 'ai-alignment'
                    ? '/ai'
                    : current.id === 'pranks'
                    ? '/payment'
                    : '/tokens'
                }
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-pink-500 text-black font-mono font-black text-xs flex items-center justify-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <span>{current.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </DelayedLink>

              <button
                onClick={() => triggerHologramReaction(current.actionContext)}
                className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white text-[11px] font-mono transition-colors"
              >
                Consult Hologram on Use Case
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
