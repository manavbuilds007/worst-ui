import React from 'react';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { ChaosButton } from '../components/chaos/ChaosButton.js';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { FakeLoadingIndicator } from '../components/chaos/FakeLoadingIndicator.js';
import { DilemmaWidget } from '../components/chaos/DilemmaWidget.js';
import { RedBlueShifterButton } from '../components/chaos/RedBlueShifterButton.js';
import { UseCasesSection } from '../components/chaos/UseCasesSection.js';
import { useChaosState } from '../hooks/useChaosState.js';
import { AlertTriangle, Sparkles, Skull, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const Home: React.FC = () => {
  const { setShowPaymentModal, triggerHologramReaction, tokenBalance } = useChaosState();

  return (
    <div className="flex flex-col items-center text-center space-y-12 py-4">
      {/* Fake Alert Warning Banner */}
      <div className="w-full max-w-3xl p-3 bg-red-950/40 border-2 border-red-500/70 rounded-2xl text-xs font-mono text-red-300 flex items-center justify-between gap-3 shadow-[0_0_25px_rgba(239,68,68,0.2)] animate-pulse">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span className="text-left">
            <strong>WARNING:</strong> This website violates 14 internationally recognized UX heuristics.
          </span>
        </div>
        <button
          onClick={() => triggerHologramReaction('User tried to dismiss the critical UI warning.')}
          className="px-2 py-1 bg-red-900/60 hover:bg-red-800 text-red-200 rounded text-[10px] shrink-0 font-bold"
        >
          IGNORE ADVICE
        </button>
      </div>

      {/* Hero Section with Chaotic Typography and Hallucinating Glow */}
      <div className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-mono text-xs shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>OFFICIAL ANTI-UX PROVING GROUND</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 tracking-tight leading-none uppercase select-none">
          WORST UI FOR ANY WEB BROWSER
        </h1>

        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          Welcome to an intentionally agonizing digital ordeal. Every hyperlink hesitates, every button flees from your cursor, and logging in requires ₹9,999.99 in purely imaginary funds.
        </p>
      </div>

      {/* Evasive Action Sandbox Section */}
      <div className="w-full max-w-3xl p-8 bg-zinc-950/80 border-2 border-cyan-500/40 rounded-3xl shadow-2xl backdrop-blur-md relative overflow-hidden text-center">
        <div className="absolute top-3 left-4 text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
          ZONE 1 // EVASIVE INTERACTION TRIAL
        </div>

        <div className="py-6 space-y-4">
          <p className="text-xs sm:text-sm text-zinc-300 font-mono">
            Try to authenticate or claim your rightful simulated tokens:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
            {/* Evasive Login Button */}
            <MovingButton
              onClick={() => setShowPaymentModal(true)}
              variant="primary"
              evasionRadius={130}
              maxAttemptsBeforeCatch={4}
            >
              LOGIN NOW (₹9999)
            </MovingButton>

            {/* Evasive Free Tokens Button */}
            <MovingButton
              onClick={() => setShowPaymentModal(true)}
              variant="neon"
              evasionRadius={150}
              maxAttemptsBeforeCatch={3}
            >
              FREE TOKENS
            </MovingButton>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-900 flex flex-wrap items-center justify-center gap-3">
          <RedBlueShifterButton />
          <ChaosButton initialLabel="Useless Button #1" />
          <ChaosButton initialLabel="Do Not Push" />
          <ChaosButton initialLabel="Invert Reality" />
        </div>
      </div>

      {/* Confusing Questions & Inverted Color Dilemma Machine */}
      <DilemmaWidget />

      {/* Delayed Navigation Grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <div className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-pink-400 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
              Delayed Gateway
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Simulated Payment</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Tempt fate with our zero-risk ₹9,999.99 fictional billing sequence to unlock 10,000 tokens.
            </p>
          </div>
          <DelayedLink to="/payment" className="text-xs font-mono font-bold text-pink-400 flex items-center gap-1">
            <span>Initiate Toll</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </DelayedLink>
        </div>

        <div className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
              Suboptimal Intellect
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Unhelpful AI Chat</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Spend fictional tokens to converse with an AI engineered specifically to give frustrating responses.
            </p>
          </div>
          <DelayedLink to="/ai" className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
            <span>Consult AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </DelayedLink>
        </div>

        <div className="p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-1 font-bold">
              Fictional Treasury
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Token Vault</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Inspect your current hoard of <strong>{tokenBalance.toLocaleString()}</strong> zero-value browser tokens.
            </p>
          </div>
          <DelayedLink to="/tokens" className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
            <span>View Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </DelayedLink>
        </div>
      </div>

      {/* Legitimate Real-World Use Cases Section */}
      <UseCasesSection />

      {/* Simulated Stalled Progress Bar */}
      <div className="w-full max-w-xl">
        <FakeLoadingIndicator label="Optimizing anti-UX frustration quotient..." />
      </div>
    </div>
  );
};
