import React, { useState } from 'react';
import { z } from 'zod';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { useChaosState } from '../hooks/useChaosState.js';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { Lock, Mail, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

const LoginSchema = z.object({
  email: z.string().email('Please supply a semi-believable email address'),
  password: z.string().min(4, 'Password must be at least 4 characters long'),
});

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setShowPaymentModal, loginDemo } = useChaosState();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Validation error');
      return;
    }

    setError(null);
    loginDemo(email);

    // Intentionally divert to the simulated payment gate per Section 4.3 & 6
    setShowPaymentModal(true);
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="bg-zinc-950/90 border-2 border-cyan-500/60 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,247,255,0.2)] text-left backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-mono">PORTAL ACCESS</h1>
            <p className="text-xs text-zinc-400">Submit credentials to incur monetary simulation</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2 font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1">Electronic Mail Identity</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="inhabitant@matrix.chaos"
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-zinc-300 mb-1">Passphrase Secret</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-zinc-900 border border-zinc-700 focus:border-cyan-400 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none font-sans"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center">
            {/* Evasive submit button */}
            <MovingButton
              type="submit"
              variant="primary"
              className="w-full"
              maxAttemptsBeforeCatch={3}
              evasionRadius={120}
            >
              AUTHENTICATE (OR TRY TO)
            </MovingButton>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-zinc-800 text-center font-mono text-xs text-zinc-400">
          <span>Prefer direct simulated tollgate? </span>
          <DelayedLink to="/payment" className="text-amber-400 hover:underline font-bold">
            Proceed to Payment (₹9999.99)
          </DelayedLink>
        </div>
      </div>
    </div>
  );
};
