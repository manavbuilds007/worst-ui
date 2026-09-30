import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { soundEffects } from '../../lib/soundEffects.js';

interface ChaosButtonProps {
  initialLabel: string;
  onClick?: () => void;
  className?: string;
  id?: string;
}

const LABELS = [
  "Why did you click that?",
  "Don't press again!",
  "Are you sure?",
  "Unhelpful Button",
  "Warning: Harmless",
  "Nothing happened. Or did it?",
];

export const ChaosButton: React.FC<ChaosButtonProps> = ({
  initialLabel,
  onClick,
  className = '',
  id,
}) => {
  const [label, setLabel] = useState(initialLabel);
  const [rotation, setRotation] = useState(0);
  const [colorState, setColorState] = useState<'red' | 'blue' | 'default'>('default');
  const { incrementClicks, triggerHologramReaction } = useChaosState();

  const handleClick = () => {
    incrementClicks();
    soundEffects.playBlip();
    setRotation(prev => prev + 180);
    setColorState(prev => (prev === 'red' ? 'blue' : 'red'));
    const nextLabel = LABELS[Math.floor(Math.random() * LABELS.length)];
    setLabel(nextLabel);

    if (Math.random() > 0.5) {
      triggerHologramReaction('User repeatedly pushed an obviously meaningless button.');
    }

    onClick?.();
  };

  const dynamicColorClass =
    colorState === 'red'
      ? 'bg-red-950/80 border-2 border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
      : colorState === 'blue'
      ? 'bg-blue-950/80 border-2 border-blue-500 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.6)]'
      : 'bg-zinc-900 border border-zinc-700 hover:border-pink-500 text-zinc-300';

  return (
    <button
      id={id}
      type="button"
      onClick={handleClick}
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: 'transform 0.4s ease-in-out, background-color 0.3s, border-color 0.3s',
      }}
      className={`px-4 py-2 rounded-xl font-mono text-xs font-bold hover:text-white active:scale-95 ${dynamicColorClass} ${className}`}
    >
      {label}
    </button>
  );
};
