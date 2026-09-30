import React from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { Sparkles, Trophy, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TokenRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TokenRewardModal: React.FC<TokenRewardModalProps> = ({ isOpen, onClose }) => {
  const { tokenBalance } = useChaosState();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleClaimAndChat = () => {
    onClose();
    navigate('/ai');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border-4 border-cyan-400 rounded-3xl p-6 sm:p-10 shadow-[0_0_80px_rgba(0,247,255,0.4)] text-center overflow-hidden">
        {/* Animated glowing backdrop ring */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-400 to-pink-500 flex items-center justify-center text-4xl mb-4 shadow-lg animate-bounce">
            🎁
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 mb-2">
            Absurdity Acknowledged
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-400 to-amber-300 font-mono tracking-tight mb-2">
            +10,000 FREE AI TOKENS!
          </h2>

          <p className="text-zinc-300 text-sm max-w-sm mb-6 leading-relaxed">
            Your simulated payment of ₹9999.99 was accepted by our fictional treasury!
            You now possess astronomical fictional wealth.
          </p>

          {/* Current balance card */}
          <div className="w-full bg-zinc-900/90 border border-cyan-500/40 rounded-2xl p-4 mb-6 flex items-center justify-around font-mono">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Your Balance</div>
              <div className="text-2xl font-black text-cyan-400 glow-cyan">
                {tokenBalance.toLocaleString()} TOKENS
              </div>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase">Real World Value</div>
              <div className="text-2xl font-black text-pink-400 glow-pink">
                ₹0.00
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleClaimAndChat}
              className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(0,247,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>SPEND ON AI CHAT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 font-mono text-sm transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
