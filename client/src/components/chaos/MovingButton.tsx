import React from 'react';
import { useMovingButton } from '../../hooks/useMovingButton.js';
import { useChaosState } from '../../hooks/useChaosState.js';

interface MovingButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  evasionRadius?: number;
  maxAttemptsBeforeCatch?: number;
  variant?: 'primary' | 'danger' | 'ghost' | 'neon';
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const MovingButton: React.FC<MovingButtonProps> = ({
  children,
  onClick,
  className = '',
  evasionRadius = 140,
  maxAttemptsBeforeCatch = 5,
  variant = 'primary',
  id,
  type = 'button',
}) => {
  const { reducedMotion, incrementClicks } = useChaosState();
  const { offset, escapeCount, containerRef, evade, resetPosition } = useMovingButton({
    evasionRadius,
    maxAttemptsBeforeCatch,
    reducedMotion,
  });

  const baseStyles = 'relative font-bold text-sm tracking-wide px-6 py-3 rounded-xl transition-all duration-200 select-none shadow-lg active:scale-95';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold shadow-[0_0_15px_rgba(0,247,255,0.4)]',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]',
    neon: 'bg-zinc-900 border-2 border-pink-500 text-pink-400 hover:bg-pink-950/40 shadow-[0_0_15px_rgba(255,0,127,0.3)]',
    ghost: 'bg-zinc-800/80 border border-zinc-700 text-zinc-300 hover:bg-zinc-700',
  }[variant];

  const handleMouseEnter = () => {
    evade();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    incrementClicks();
    if (escapeCount < maxAttemptsBeforeCatch && !reducedMotion) {
      e.preventDefault();
      evade();
    } else {
      resetPosition();
      onClick?.(e);
    }
  };

  return (
    <div
      ref={containerRef}
      className="inline-block relative p-4"
      style={{ minWidth: '160px', minHeight: '60px' }}
    >
      <button
        id={id}
        type={type}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
        {escapeCount > 0 && !reducedMotion && (
          <span className="absolute -top-2 -right-2 text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-pink-600 text-white animate-ping">
            💨 {escapeCount}
          </span>
        )}
      </button>
    </div>
  );
};
