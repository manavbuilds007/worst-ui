import React from 'react';
import { HologramMessage as HologramMessageType } from '../../types/index.js';

interface HologramMessageProps {
  data: HologramMessageType;
}

const moodColors: Record<string, string> = {
  mocking: 'border-pink-500/60 text-pink-300 bg-pink-950/40',
  sarcastic: 'border-cyan-500/60 text-cyan-300 bg-cyan-950/40',
  glitchy: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/40',
  dramatic: 'border-purple-500/60 text-purple-300 bg-purple-950/40',
  confused: 'border-amber-500/60 text-amber-300 bg-amber-950/40',
};

export const HologramMessage: React.FC<HologramMessageProps> = ({ data }) => {
  const badgeStyle = moodColors[data.mood] || moodColors.sarcastic;

  return (
    <div className="relative max-w-xs sm:max-w-sm mb-3 animate-fade-in">
      {/* Speech bubble card */}
      <div className="relative bg-zinc-950/90 backdrop-blur-md border border-cyan-500/40 rounded-2xl p-4 shadow-[0_0_20px_rgba(0,247,255,0.15)] text-left">
        {/* Tail indicator */}
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-zinc-950 border-r border-b border-cyan-500/40 transform rotate-45" />

        <div className="flex items-center justify-between mb-1.5 gap-2">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
            HOLO-COMPANION v0.0.1-beta
          </span>
          <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border font-mono font-bold ${badgeStyle}`}>
            {data.mood} • LVL {data.intensity}
          </span>
        </div>

        <p className="text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed font-sans select-none">
          "{data.message}"
        </p>
      </div>
    </div>
  );
};
