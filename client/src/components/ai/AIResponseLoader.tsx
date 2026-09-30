import React, { useState, useEffect } from 'react';
import { Loader2, Bot } from 'lucide-react';

const AI_THINKING_MESSAGES = [
  "Formulating appropriately unhelpful response...",
  "Running token reduction algorithms...",
  "Consulting the council of terrible design...",
  "Distorting grammatical structures for comedic effect...",
  "Checking if Gemini is feeling sarcastic today...",
  "Converting logic into pure anti-UX...",
];

export const AIResponseLoader: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % AI_THINKING_MESSAGES.length);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-start gap-3 p-4 bg-zinc-950/70 border border-cyan-500/30 rounded-2xl max-w-xl animate-pulse font-mono text-xs text-cyan-300">
      <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center shrink-0">
        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">ANTI-UX AI COGITATING</span>
        <p className="text-zinc-300 italic">{AI_THINKING_MESSAGES[msgIndex]}</p>
      </div>
    </div>
  );
};
