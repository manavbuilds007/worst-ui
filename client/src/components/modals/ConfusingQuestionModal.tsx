import React, { useState } from 'react';
import { CONFUSING_QUESTIONS, ConfusingQuestion } from '../chaos/ConfusingQuestionsData.js';
import { ContradictoryButtonPair } from '../chaos/ContradictoryButtonPair.js';
import { useChaosState } from '../../hooks/useChaosState.js';
import { AlertCircle, HelpCircle, X } from 'lucide-react';

interface ConfusingQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfusingQuestionModal: React.FC<ConfusingQuestionModalProps> = ({ isOpen, onClose }) => {
  const [qIndex, setQIndex] = useState(0);
  const [responseState, setResponseState] = useState<string | null>(null);
  const { triggerHologramReaction } = useChaosState();

  if (!isOpen) return null;

  const currentQ: ConfusingQuestion = CONFUSING_QUESTIONS[qIndex % CONFUSING_QUESTIONS.length];

  const handleYes = () => {
    setResponseState(currentQ.yesExplanation);
    triggerHologramReaction(`User answered RED YES to modal dilemma: "${currentQ.question}"`);
  };

  const handleNo = () => {
    setResponseState(currentQ.noExplanation);
    triggerHologramReaction(`User answered GREEN NO to modal dilemma: "${currentQ.question}"`);
  };

  const handleFinish = () => {
    setResponseState(null);
    setQIndex(prev => prev + 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border-4 border-red-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(239,68,68,0.4)] text-left">
        {/* Close Button */}
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
            MANDATORY COGNITIVE AMBIGUITY CHECK
          </span>
        </div>

        <div className="space-y-4 mb-6">
          <div className="text-[11px] font-mono text-zinc-500 uppercase">
            {currentQ.context}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-sans leading-tight">
            "{currentQ.question}"
          </h2>
        </div>

        {!responseState ? (
          <div className="space-y-4">
            <ContradictoryButtonPair
              yesLabel={currentQ.yesLabel}
              noLabel={currentQ.noLabel}
              onYes={handleYes}
              onNo={handleNo}
              allowSwapOnHover={true}
            />
            <p className="text-[10px] text-zinc-500 font-mono text-center">
              *Warning: Color coding has been deliberately inverted. Red signifies affirmation. Green signifies negation.
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono">
            <div className="font-bold text-amber-400">DECISION RECORDED:</div>
            <p className="text-sm font-sans">{responseState}</p>
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs transition-colors"
            >
              Close and Acknowledge Cognitive Defeat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
