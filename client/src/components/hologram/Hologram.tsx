import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { HologramMessage } from './HologramMessage.js';
import { HologramGlow } from './HologramGlow.js';
import { HologramScanlines } from './HologramScanlines.js';
import { soundEffects } from '../../lib/soundEffects.js';
import { Sparkles, HelpCircle, X } from 'lucide-react';

export const Hologram: React.FC = () => {
  const {
    hologramUnlocked,
    currentHologramMessage,
    reducedMotion,
    triggerHologramReaction,
  } = useChaosState();

  const [closeAttempts, setCloseAttempts] = useState(0);
  const [fakeCloseText, setFakeCloseText] = useState('✕');

  // If user hasn't unlocked hologram yet, do not render permanently
  if (!hologramUnlocked) {
    return null;
  }

  const handleFakeClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playWhoosh();
    setCloseAttempts(prev => prev + 1);

    const mockery = [
      "Cannot terminate hologram: Contractual immortality.",
      "The 'X' stands for 'eXtra permanence'.",
      "Closing failed successfully.",
      "I am tethered to your browser's soul.",
      "Nice try. The close button is decorative art.",
      "Error: Button clicked with excessive optimism.",
    ];

    setFakeCloseText(closeAttempts % 2 === 0 ? 'NO' : '✕');
    triggerHologramReaction(mockery[closeAttempts % mockery.length]);
  };

  const handlePokeHologram = () => {
    soundEffects.playHologramChirp();
    triggerHologramReaction('User aggressively poked the hologram avatar.');
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end pointer-events-auto ${
        reducedMotion ? '' : 'animate-hologram-float'
      }`}
    >
      {/* Rage-Bait Speech Message */}
      <HologramMessage data={currentHologramMessage} />

      {/* Hologram Avatar Container */}
      <div className="relative group cursor-pointer" onClick={handlePokeHologram} title="Click to agitate hologram">
        <HologramGlow intensity={currentHologramMessage.intensity} reducedMotion={reducedMotion} />

        {/* Hologram Body Box */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-zinc-950/80 border-2 border-cyan-400/80 shadow-[0_0_25px_rgba(0,247,255,0.4)] backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-transform group-hover:scale-105 active:scale-95">
          <HologramScanlines />

          {/* Persistent fake close button that mocks the user */}
          <button
            onClick={handleFakeClose}
            title="Permanently remove hologram (definitely works)"
            className="absolute top-1.5 right-1.5 z-30 w-6 h-6 rounded-md bg-zinc-900/90 border border-cyan-500/50 text-[11px] font-mono text-cyan-300 flex items-center justify-center hover:bg-pink-900 hover:text-pink-200 transition-colors shadow-sm"
          >
            {fakeCloseText}
          </button>

          {/* Hologram Face / Holographic Icon */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Holographic glowing skull / robot glyph */}
            <div className={`text-4xl sm:text-5xl select-none filter drop-shadow-[0_0_10px_rgba(0,247,255,0.9)] ${
              reducedMotion ? '' : 'animate-flicker'
            }`}>
              💀
            </div>
            <div className="text-[10px] font-mono text-cyan-300 font-bold tracking-widest mt-1 uppercase glow-cyan">
              HOLO-9000
            </div>
          </div>

          {/* Interactive poke prompt hint */}
          <div className="absolute bottom-1 text-[8px] font-mono text-zinc-400 tracking-tighter opacity-70">
            [TAP TO AGITATE]
          </div>
        </div>
      </div>
    </div>
  );
};
