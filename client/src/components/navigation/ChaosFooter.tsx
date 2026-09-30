import React from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { DelayedLink } from '../chaos/DelayedLink.js';
import { RotateCcw, AlertOctagon, HeartHandshake } from 'lucide-react';

export const ChaosFooter: React.FC = () => {
  const { resetChaosState, totalChaosClicks } = useChaosState();

  return (
    <footer className="w-full bg-zinc-950/90 border-t border-zinc-800/80 py-8 px-4 font-mono text-xs text-zinc-400 select-none relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 font-bold text-zinc-300">
            <span className="text-pink-500">⚠</span>
            <span>WORST UI FOR ANY WEB BROWSER</span>
          </div>
          <p className="text-[11px] text-zinc-500 max-w-md">
            Deliberately engineered to violate standard UX heuristics while remaining 100% technically safe, accessible, and entertaining. All payments and tokens are purely fictional.
          </p>
          <div className="text-[10px] text-zinc-600 mt-1">
            Total recorded chaotic interactions: <span className="text-cyan-400 font-bold">{totalChaosClicks}</span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <DelayedLink to="/about" className="hover:text-cyan-400">
            About Chaos
          </DelayedLink>
          <DelayedLink to="/use-cases" className="hover:text-emerald-400">
            Use Cases
          </DelayedLink>
          <DelayedLink to="/tokens" className="hover:text-amber-400">
            Token Ledgers
          </DelayedLink>
          <DelayedLink to="/ai" className="hover:text-pink-400">
            Malf-AI
          </DelayedLink>
          <DelayedLink to="/404" className="hover:text-red-400">
            Intentional 404
          </DelayedLink>
        </div>

        {/* Emergency Reset Mechanism */}
        <div className="flex flex-col items-center md:items-end">
          <button
            onClick={resetChaosState}
            title="Reset all anti-UX chaos state, token balances, and permanent holograms"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-red-500/40 hover:border-red-500 text-red-400 hover:text-red-300 transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">EMERGENCY RESET</span>
          </button>
          <span className="text-[9px] text-zinc-600 mt-1">
            All Wrongs Reserved © 2026. Zero guarantees provided.
          </span>
        </div>
      </div>
    </footer>
  );
};
