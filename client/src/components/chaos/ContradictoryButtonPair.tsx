import React, { useState } from 'react';
import { soundEffects } from '../../lib/soundEffects.js';
import { useChaosState } from '../../hooks/useChaosState.js';

interface ContradictoryButtonPairProps {
  yesLabel?: string;
  noLabel?: string;
  onYes: () => void;
  onNo: () => void;
  allowSwapOnHover?: boolean;
}

export const ContradictoryButtonPair: React.FC<ContradictoryButtonPairProps> = ({
  yesLabel = 'YES (CONFIRM)',
  noLabel = 'NO (ABORT)',
  onYes,
  onNo,
  allowSwapOnHover = true,
}) => {
  const [swapped, setSwapped] = useState(false);
  const { reducedMotion, incrementClicks } = useChaosState();

  const handleMouseEnter = () => {
    if (allowSwapOnHover && !reducedMotion && Math.random() > 0.6) {
      soundEffects.playWhoosh();
      setSwapped(prev => !prev);
    }
  };

  const handleYes = () => {
    incrementClicks();
    soundEffects.playBlip();
    onYes();
  };

  const handleNo = () => {
    incrementClicks();
    soundEffects.playBlip();
    onNo();
  };

  const redYesButton = (
    <button
      key="red-yes"
      type="button"
      onMouseEnter={handleMouseEnter}
      onClick={handleYes}
      className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(239,68,68,0.5)] border-2 border-red-400 active:scale-95 transition-all select-none"
    >
      🔴 {yesLabel}
    </button>
  );

  const greenNoButton = (
    <button
      key="green-no"
      type="button"
      onMouseEnter={handleMouseEnter}
      onClick={handleNo}
      className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black font-mono font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(16,185,129,0.5)] border-2 border-emerald-300 active:scale-95 transition-all select-none"
    >
      🟢 {noLabel}
    </button>
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
        {swapped ? [greenNoButton, redYesButton] : [redYesButton, greenNoButton]}
      </div>
      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 px-2">
        <span className="text-red-400">🔴 Red = Affirmative / Proceed</span>
        <span className="text-emerald-400">🟢 Green = Negative / Reject</span>
      </div>
    </div>
  );
};
