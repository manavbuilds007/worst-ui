import React from 'react';
import { UseCasesSection } from '../components/chaos/UseCasesSection.js';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { DilemmaWidget } from '../components/chaos/DilemmaWidget.js';
import { RedBlueShifterButton } from '../components/chaos/RedBlueShifterButton.js';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

export const UseCases: React.FC = () => {
  return (
    <div className="py-4 space-y-12">
      <UseCasesSection />

      {/* Embedded cognitive check */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <span className="text-xs font-mono text-pink-400 uppercase tracking-widest font-bold">
            PRACTICAL APPLICATION TRIAL
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-mono">
            Test Your Cognitive Resilience Now
          </h3>
        </div>
        <DilemmaWidget />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-zinc-800">
        <DelayedLink
          to="/"
          className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs hover:text-white"
        >
          ← Return to Chaos Center
        </DelayedLink>
        <DelayedLink
          to="/ai"
          className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-mono font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <span>Interrogate Malfunctioning AI</span>
          <ArrowRight className="w-4 h-4" />
        </DelayedLink>
      </div>
    </div>
  );
};
