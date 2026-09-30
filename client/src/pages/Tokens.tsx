import React from 'react';
import { useChaosState } from '../hooks/useChaosState.js';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { TokenCounter } from '../components/ai/TokenCounter.js';
import { Coins, Sparkles, Trophy, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

export const Tokens: React.FC = () => {
  const { tokenBalance, setShowPaymentModal, triggerHologramReaction } = useChaosState();

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            FICTIONAL LEDGER
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-mono">
            THE CHAOS VAULT
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerHologramReaction('User inspected their absurd zero-value token count.')}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-cyan-400"
          >
            Ask Hologram Value
          </button>
        </div>
      </div>

      {/* Main Token Display Card */}
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/60 rounded-3xl p-8 shadow-[0_0_40px_rgba(245,158,11,0.2)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 text-8xl opacity-10 select-none pointer-events-none">
          🪙
        </div>

        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
            CURRENT DEMO LIQUIDITY
          </div>

          <div className="text-5xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 font-mono glow-purple">
            {tokenBalance.toLocaleString()}
          </div>

          <p className="text-zinc-400 text-sm max-w-lg leading-relaxed font-sans">
            These tokens hold an exchange rate of exactly ₹0.00 against all earthly fiat currencies, but are honored within this web browser for conversing with unhelpful AI.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <MovingButton
              onClick={() => setShowPaymentModal(true)}
              variant="primary"
              evasionRadius={80}
              maxAttemptsBeforeCatch={3}
            >
              +10,000 MORE TOKENS (FREE)
            </MovingButton>

            <DelayedLink
              to="/ai"
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-cyan-500/50 hover:bg-zinc-800 text-cyan-300 font-mono font-bold text-sm flex items-center gap-2 shadow-lg"
            >
              <span>Spend in AI Chat</span>
              <ArrowRight className="w-4 h-4" />
            </DelayedLink>
          </div>
        </div>
      </div>

      {/* Absurd stats breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
          <span className="text-zinc-500 uppercase block text-[10px]">Real Value</span>
          <span className="text-2xl font-bold text-red-400">₹0.00</span>
          <span className="text-zinc-600 block mt-1">Permanently valueless</span>
        </div>
        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
          <span className="text-zinc-500 uppercase block text-[10px]">AI Chat Cost</span>
          <span className="text-2xl font-bold text-cyan-400">1 Token / Query</span>
          <span className="text-zinc-600 block mt-1">Deducted automatically</span>
        </div>
        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl">
          <span className="text-zinc-500 uppercase block text-[10px]">Payment Safety</span>
          <span className="text-2xl font-bold text-emerald-400">100% Mock</span>
          <span className="text-zinc-600 block mt-1">Zero financial risk</span>
        </div>
      </div>
    </div>
  );
};
