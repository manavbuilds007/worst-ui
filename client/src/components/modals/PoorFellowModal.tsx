import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { soundEffects } from '../../lib/soundEffects.js';
import { HelpCircle, Smile } from 'lucide-react';

interface PoorFellowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PoorFellowModal: React.FC<PoorFellowModalProps> = ({ isOpen, onClose }) => {
  const { reducedMotion, triggerHologramReaction } = useChaosState();
  const [closeAttempts, setCloseAttempts] = useState(0);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  if (!isOpen) return null;

  const handleEvasiveClose = (e: React.MouseEvent) => {
    if (closeAttempts < 2 && !reducedMotion) {
      soundEffects.playWhoosh();
      const randomX = (Math.random() - 0.5) * 80;
      const randomY = (Math.random() - 0.5) * 60;
      setBtnOffset({ x: randomX, y: randomY });
      setCloseAttempts(prev => prev + 1);
      triggerHologramReaction('User tried to dismiss the Poor Fellow modal prematurely.');
    } else {
      soundEffects.playBlip();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`relative w-full max-w-md bg-gradient-to-b from-zinc-950 to-zinc-900 border-4 border-pink-500 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,0,127,0.5)] text-center ${
          reducedMotion ? '' : 'animate-bounce'
        }`}
      >
        {/* Retro badge */}
        <div className="inline-block px-4 py-1 rounded-full bg-pink-500/20 border border-pink-500 text-pink-400 font-mono text-xs font-bold uppercase mb-4 tracking-widest">
          UNSOLICITED GREETING
        </div>

        {/* The Famous Headline */}
        <h1 className="text-3xl sm:text-5xl font-black text-pink-400 tracking-wider font-retro mb-4 glow-pink select-none uppercase">
          HI POOR FELLOW.
        </h1>

        <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-sans">
          You just spent ₹9,999.99 in purely imaginary fiat currency to acquire 10,000 fictional AI tokens inside a dysfunctional web interface.
          We admire your sheer dedication to bad life choices.
        </p>

        {/* Evasive dismiss button */}
        <div className="relative inline-block" style={{ minWidth: '180px', minHeight: '50px' }}>
          <button
            onClick={handleEvasiveClose}
            style={{
              transform: `translate(${btnOffset.x}px, ${btnOffset.y}px)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-mono font-bold text-xs shadow-lg active:scale-95 transition-colors"
          >
            {closeAttempts >= 2 ? "Acknowledge My Poor State (Dismiss)" : "Close This Ridiculous Window"}
          </button>
        </div>

        <div className="text-[10px] text-zinc-500 mt-4 font-mono">
          Dismissal probability: {closeAttempts >= 2 ? '100%' : '33.3%'}
        </div>
      </div>
    </div>
  );
};
