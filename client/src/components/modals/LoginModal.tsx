import React, { useState } from 'react';
import { z } from 'zod';
import { useChaosState } from '../../hooks/useChaosState.js';
import { MovingButton } from '../chaos/MovingButton.js';
import { X, Lock, Mail, AlertCircle } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email('Please enter a plausible email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setShowPaymentModal, loginDemo } = useChaosState();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Invalid input');
      return;
    }

    setError(null);
    loginDemo(email);

    // Per Section 4.3 & 6: Attempting login reveals the ₹9999.99 fake payment requirement!
    onClose();
    setShowPaymentModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-zinc-950 border-2 border-cyan-500/70 rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,247,255,0.25)] text-left">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white font-mono">CONFIDENTIAL GATEWAY</h2>
            <p className="text-xs text-zinc-400">Identify yourself to face further inconvenience</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">Electronic Mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="victim@example.com"
                className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1.5">Secret Passphrase</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-900/90 border border-zinc-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col items-center">
            {/* The Login Submit button is evasive! */}
            <MovingButton
              type="submit"
              variant="primary"
              className="w-full"
              maxAttemptsBeforeCatch={3}
            >
              AUTHENTICATE (OR TRY TO)
            </MovingButton>
            <p className="text-[10px] text-zinc-500 mt-2 text-center">
              *Warning: Authentication may trigger unexpected billing hallucinations.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
