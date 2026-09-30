import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { soundEffects } from '../../lib/soundEffects.js';
import { Sparkles, Palette } from 'lucide-react';

const RED_BLUE_LABELS = [
  "🔴 SHIFT TO ELECTRIC BLUE",
  "🔵 SHIFT TO NEON RED",
  "🔴 RED MEANS AGREE (CLICK AGAIN)",
  "🔵 BLUE MEANS COLD LOGIC",
  "🔴 CHROMATIC INVERSION EVENT",
  "🔵 FLIP BACK TO RED CHAOS",
];

export const RedBlueShifterButton: React.FC = () => {
  const { uiColorMode, toggleRedBlueMode, triggerHologramReaction, incrementClicks } = useChaosState();
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    incrementClicks();
    setClickCount(prev => prev + 1);
    toggleRedBlueMode();

    if (Math.random() > 0.4) {
      triggerHologramReaction(`User flipped the UI chromatic depiction to ${uiColorMode === 'red' ? 'BLUE' : 'RED'}.`);
    }
  };

  const isRed = uiColorMode === 'red';
  const isBlue = uiColorMode === 'blue';
  const isDual = uiColorMode === 'dual';

  const label = RED_BLUE_LABELS[clickCount % RED_BLUE_LABELS.length];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative px-5 py-2.5 rounded-2xl font-mono font-black text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl active:scale-95 border-2 flex items-center justify-center gap-2 select-none ${
        isRed
          ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white border-red-400 shadow-[0_0_35px_rgba(239,68,68,0.7)] animate-pulse'
          : isBlue
          ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 text-white border-blue-400 shadow-[0_0_35px_rgba(59,130,246,0.7)] animate-pulse'
          : isDual
          ? 'bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white border-pink-400 shadow-[0_0_35px_rgba(236,72,153,0.7)]'
          : 'bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white border-cyan-400 shadow-[0_0_25px_rgba(0,247,255,0.4)]'
      }`}
    >
      <Palette className="w-4 h-4 animate-spin" />
      <span>{label}</span>
      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-white/20">
        {uiColorMode.toUpperCase()}
      </span>
    </button>
  );
};
