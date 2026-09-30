import React, { useState } from 'react';
import { CONFUSING_QUESTIONS, ConfusingQuestion } from './ConfusingQuestionsData.js';
import { ContradictoryButtonPair } from './ContradictoryButtonPair.js';
import { useChaosState } from '../../hooks/useChaosState.js';
import { HelpCircle, RefreshCw, Skull, Sparkles } from 'lucide-react';

export const DilemmaWidget: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastChoice, setLastChoice] = useState<'yes' | 'no' | null>(null);
  const { triggerHologramReaction } = useChaosState();

  const currentQ: ConfusingQuestion = CONFUSING_QUESTIONS[currentIndex];

  const handleYes = () => {
    setLastChoice('yes');
    triggerHologramReaction(`User clicked RED (YES) to: "${currentQ.question}"`);
  };

  const handleNo = () => {
    setLastChoice('no');
    triggerHologramReaction(`User clicked GREEN (NO) to: "${currentQ.question}"`);
  };

  const handleNext = () => {
    setLastChoice(null);
    setCurrentIndex((prev) => (prev + 1) % CONFUSING_QUESTIONS.length);
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-950/90 border-2 border-red-500/50 hover:border-red-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(239,68,68,0.2)] text-left backdrop-blur-xl relative overflow-hidden transition-all">
      {/* Contrasting Header Banner */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 font-bold text-sm">
            ?
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
              COGNITIVE DISORIENTATION MACHINE
            </span>
            <h2 className="text-lg font-black text-white font-mono">
              Contradictory Verification Trial #{currentIndex + 1}
            </h2>
          </div>
        </div>

        <button
          onClick={handleNext}
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-cyan-400 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>New Dilemma</span>
        </button>
      </div>

      {/* The Question Card */}
      <div className="space-y-3 mb-6">
        <div className="inline-block px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 uppercase">
          {currentQ.context}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans leading-snug">
          "{currentQ.question}"
        </h3>
      </div>

      {/* Red for Yes, Green for No Button Pair */}
      <div className="pt-2">
        <ContradictoryButtonPair
          yesLabel={currentQ.yesLabel}
          noLabel={currentQ.noLabel}
          onYes={handleYes}
          onNo={handleNo}
          allowSwapOnHover={true}
        />
      </div>

      {/* Consequence Explanation Feedback */}
      {lastChoice && (
        <div className={`mt-6 p-4 rounded-2xl border font-mono text-xs animate-fade-in ${
          lastChoice === 'yes'
            ? 'bg-red-950/40 border-red-500/60 text-red-300'
            : 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
        }`}>
          <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-wider text-[10px]">
            <span>{lastChoice === 'yes' ? '🔴 Affirmation Logged' : '🟢 Negation Processed'}</span>
          </div>
          <p className="font-sans leading-relaxed">
            {lastChoice === 'yes' ? currentQ.yesExplanation : currentQ.noExplanation}
          </p>
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleNext}
              className="text-[11px] underline hover:no-underline font-bold"
            >
              Continue to next paradox →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
