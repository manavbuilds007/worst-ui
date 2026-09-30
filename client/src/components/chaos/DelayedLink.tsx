import React, { useState } from 'react';
import { useDelayedAction } from '../../hooks/useDelayedAction.js';
import { Loader2 } from 'lucide-react';

interface DelayedLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  customDelayMs?: number;
  id?: string;
}

export const DelayedLink: React.FC<DelayedLinkProps> = ({
  to,
  children,
  className = '',
  customDelayMs,
  id,
}) => {
  const { isDelaying, delayMessage, progress, triggerDelayedNavigation } = useDelayedAction();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerDelayedNavigation(to, customDelayMs);
  };

  return (
    <>
      <a
        id={id}
        href={to}
        onClick={handleClick}
        className={`relative inline-flex items-center gap-1.5 transition-all select-none ${
          isDelaying ? 'opacity-60 cursor-wait' : 'cursor-pointer hover:underline'
        } ${className}`}
      >
        {children}
        {isDelaying && <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-400 inline" />}
      </a>

      {/* Misleading loading modal banner when navigating */}
      {isDelaying && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-zinc-950/95 border border-pink-500/80 rounded-xl shadow-[0_0_20px_rgba(255,0,127,0.4)] text-xs font-mono flex flex-col items-center gap-1.5 backdrop-blur-md animate-bounce">
          <div className="flex items-center gap-2 text-pink-300 font-bold">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{delayMessage}</span>
          </div>
          <div className="w-48 bg-zinc-800 rounded-full h-1.5 overflow-hidden border border-zinc-700">
            <div
              className="bg-gradient-to-r from-pink-500 to-cyan-400 h-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400">Loading progress: {progress}% (approximately)</span>
        </div>
      )}
    </>
  );
};
