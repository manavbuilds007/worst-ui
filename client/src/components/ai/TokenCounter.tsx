import React from 'react';
import { Coins, PlusCircle } from 'lucide-react';
import { useChaosState } from '../../hooks/useChaosState.js';

interface TokenCounterProps {
  onRefillClick?: () => void;
}

export const TokenCounter: React.FC<TokenCounterProps> = ({ onRefillClick }) => {
  const { tokenBalance, setShowPaymentModal } = useChaosState();

  const handleRefill = () => {
    if (onRefillClick) {
      onRefillClick();
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-zinc-950/80 border border-amber-500/40 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.15)] font-mono">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
          <Coins className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Simulated AI Balance</div>
          <div className="text-xl sm:text-2xl font-black text-amber-400">
            {tokenBalance.toLocaleString()} <span className="text-xs text-amber-500/80">TOKENS</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleRefill}
        type="button"
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-amber-200 text-xs font-bold transition-all active:scale-95"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Get +10,000 (Free Demo)</span>
      </button>
    </div>
  );
};
