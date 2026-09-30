import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DelayedLink } from '../chaos/DelayedLink.js';
import { ConfusingMenu } from '../chaos/ConfusingMenu.js';
import { MovingButton } from '../chaos/MovingButton.js';
import { useChaosState } from '../../hooks/useChaosState.js';
import { Volume2, VolumeX, Eye, EyeOff, RotateCcw, Skull, Coins, LogIn, LogOut, HelpCircle } from 'lucide-react';

export const ChaosNavbar: React.FC = () => {
  const {
    tokenBalance,
    isLoggedIn,
    userEmail,
    setShowPaymentModal,
    setShowConfusingModal,
    soundEnabled,
    setSoundEnabled,
    reducedMotion,
    setReducedMotion,
    resetChaosState,
    logoutDemo,
  } = useChaosState();

  // Swapped order state for subtle navigation confusion
  const [swappedLinks, setSwappedLinks] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-md border-b border-cyan-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 group select-none cursor-pointer"
            title="Return to the epicentre of bad design"
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">💀</span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-wider text-cyan-400 font-mono glow-cyan leading-none">
                WORST UI
              </span>
              <span className="text-[9px] text-pink-400 font-mono tracking-tighter">
                BROWSER-GRADE CHAOS
              </span>
            </div>
          </Link>
        </div>

        {/* Central Navigation with Delayed Links and Intentional Subversion */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-mono">
          {!swappedLinks ? (
            <>
              <DelayedLink to="/" className="text-zinc-300 hover:text-cyan-400">
                Home (Safe?)
              </DelayedLink>
              <DelayedLink to="/ai" className="text-zinc-300 hover:text-pink-400">
                Unhelpful AI
              </DelayedLink>
              <DelayedLink to="/tokens" className="text-zinc-300 hover:text-amber-400 flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Fake Wealth</span>
              </DelayedLink>
              <DelayedLink to="/payment" className="text-zinc-300 hover:text-red-400">
                Pay ₹9999.99
              </DelayedLink>
              <DelayedLink to="/use-cases" className="text-zinc-300 hover:text-emerald-400">
                Use Cases
              </DelayedLink>
              <DelayedLink to="/about" className="text-zinc-300 hover:text-purple-400">
                Why Us?
              </DelayedLink>
            </>
          ) : (
            <>
              <DelayedLink to="/use-cases" className="text-emerald-400 hover:text-emerald-300">
                Why Open?
              </DelayedLink>
              <DelayedLink to="/about" className="text-purple-400 hover:text-purple-300">
                Philosophy
              </DelayedLink>
              <DelayedLink to="/payment" className="text-red-400 hover:text-red-300">
                Drain Wallet
              </DelayedLink>
              <DelayedLink to="/ai" className="text-pink-400 hover:text-pink-300">
                Hallucinating AI
              </DelayedLink>
              <DelayedLink to="/" className="text-cyan-400 hover:text-cyan-300">
                Start Again
              </DelayedLink>
            </>
          )}

          {/* Harmless link scrambler button */}
          <button
            type="button"
            onClick={() => setSwappedLinks(!swappedLinks)}
            title="Randomize navigation order"
            className="text-[10px] text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-800"
          >
            🔀
          </button>
        </nav>

        {/* Action Controls & Token Counter */}
        <div className="flex items-center gap-2">
          {/* Token Counter Widget */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-amber-500/40 font-mono text-xs shadow-inner">
            <Coins className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span className="font-bold text-amber-300">
              {tokenBalance.toLocaleString()}
            </span>
            <span className="text-[9px] text-zinc-500 hidden sm:inline">TOKENS</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute audio effects" : "Enable comedic 8-bit sound effects"}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            title={reducedMotion ? "Enable animations" : "Disable motion / animations (Accessibility)"}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-purple-400 transition-colors"
          >
            {reducedMotion ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4" />}
          </button>

          {/* Confusing Paradox Modal Trigger (Red=Yes, Green=No) */}
          <button
            onClick={() => setShowConfusingModal(true)}
            title="Open Mind-Bending Paradox Check (Red for Yes, Green for No)"
            className="p-2 rounded-lg bg-zinc-900 border border-red-500/50 hover:border-red-500 text-red-400 hover:text-red-300 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-red-400" />
          </button>

          {/* Confusing Dropdown Menu */}
          <ConfusingMenu />

          {/* Login or Payment Action */}
          {!isLoggedIn ? (
            <MovingButton
              onClick={() => setShowPaymentModal(true)}
              variant="primary"
              className="py-1.5 px-4 text-xs font-mono font-bold"
              evasionRadius={60}
              maxAttemptsBeforeCatch={3}
            >
              LOGIN (₹9999)
            </MovingButton>
          ) : (
            <button
              onClick={logoutDemo}
              title={`Logged in as ${userEmail}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-red-400 text-xs font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
