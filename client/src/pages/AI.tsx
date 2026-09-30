import React from 'react';
import { AIChat } from '../components/ai/AIChat.js';

export const AI: React.FC = () => {
  return (
    <div className="py-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold">
          INTENTIONALLY SUBOPTIMAL INTELLIGENCE
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight uppercase">
          MALFUNCTIONING AI TERMINAL
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto font-sans leading-relaxed">
          Powered securely through server-side Gemini. Validated with strict Zod schemas. Engineered specifically to offer no practical assistance whatsoever.
        </p>
      </div>

      <AIChat />
    </div>
  );
};
