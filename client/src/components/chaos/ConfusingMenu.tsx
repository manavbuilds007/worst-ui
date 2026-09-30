import React, { useState } from 'react';
import { DelayedLink } from './DelayedLink.js';
import { ChevronDown, AlertTriangle, HelpCircle } from 'lucide-react';
import { soundEffects } from '../../lib/soundEffects.js';

export const ConfusingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  const toggle = () => {
    soundEffects.playBlip();
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:border-cyan-400 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-colors"
      >
        <span>🧭 Disorient Menu</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180 text-pink-400' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-950 border border-cyan-500/50 shadow-2xl p-2 z-50 backdrop-blur-xl animate-fade-in text-xs font-mono">
          <div className="px-2 py-1 text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
            Dubious Destinations
          </div>

          <div className="flex flex-col gap-1 py-1">
            <DelayedLink to="/about" className="px-2 py-1.5 rounded hover:bg-zinc-900 text-zinc-300 flex items-center justify-between">
              <span>Why Does This Exist?</span>
              <span className="text-[10px] text-cyan-400">About</span>
            </DelayedLink>

            <DelayedLink to="/tokens" className="px-2 py-1.5 rounded hover:bg-zinc-900 text-zinc-300 flex items-center justify-between">
              <span>Fictional Wealth</span>
              <span className="text-[10px] text-amber-400">Tokens</span>
            </DelayedLink>

            <DelayedLink to="/ai" className="px-2 py-1.5 rounded hover:bg-zinc-900 text-zinc-300 flex items-center justify-between">
              <span>Consult Malfunctioning AI</span>
              <span className="text-[10px] text-pink-400">AI</span>
            </DelayedLink>

            {/* Nested useless submenu */}
            <div className="border-t border-zinc-800/80 pt-1 mt-1">
              <button
                type="button"
                onClick={() => setNestedOpen(!nestedOpen)}
                className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-900 text-purple-300 flex items-center justify-between"
              >
                <span>⚠️ Sub-chaos Layer</span>
                <span className="text-[10px]">{nestedOpen ? '▲' : '▼'}</span>
              </button>

              {nestedOpen && (
                <div className="pl-3 py-1 flex flex-col gap-1 border-l border-purple-500/30 ml-2">
                  <DelayedLink to="/404" className="text-[11px] text-red-400 hover:underline">
                    Guaranteed 404 Void
                  </DelayedLink>
                  <DelayedLink to="/payment" className="text-[11px] text-amber-400 hover:underline">
                    Pay ₹9999.99 (Demo)
                  </DelayedLink>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
