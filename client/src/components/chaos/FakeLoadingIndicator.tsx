import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface FakeLoadingProps {
  label?: string;
}

export const FakeLoadingIndicator: React.FC<FakeLoadingProps> = ({
  label = "Calculating suboptimal route...",
}) => {
  const [percent, setPercent] = useState(14);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 99) return 98; // Permanently oscillates around 98%-99%
        const jump = Math.floor(Math.random() * 8) + 1;
        return Math.min(99, prev + jump);
      });
    }, 450);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-400">
      <div className="flex justify-between items-center text-[11px]">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          {label}
        </span>
        <span className="text-pink-400 font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
