import React, { useState } from 'react';
import { useChaosState } from '../hooks/useChaosState.js';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { ShieldAlert, CreditCard, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

const PAYMENT_STAGES = [
  "Initializing payment...",
  "Contacting payment universe...",
  "Finding your wallet...",
  "Wallet status: unfortunate.",
  "Payment accepted because we said so.",
];

export const Payment: React.FC = () => {
  const { triggerSimulatedPayment, tokenBalance } = useChaosState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleExecutePayment = async () => {
    setIsProcessing(true);
    setCompleted(false);

    for (let i = 0; i < PAYMENT_STAGES.length; i++) {
      setStageIndex(i);
      await new Promise(r => setTimeout(r, 850));
    }

    await triggerSimulatedPayment();
    setIsProcessing(false);
    setCompleted(true);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Mandatory Safety Notice per Section 4.3 & 18 */}
      <div className="mb-6 p-4 bg-amber-950/80 border-2 border-amber-500 rounded-2xl text-amber-200 text-xs sm:text-sm font-mono flex items-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
        <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
        <div className="text-left">
          <strong className="block text-amber-300 font-bold uppercase tracking-wider">
            DEMO PAYMENT — NO REAL MONEY WILL BE CHARGED
          </strong>
          <span>
            This entire checkout experience is purely fictional satire. No card numbers, OTPs, or financial information are ever requested or transmitted.
          </span>
        </div>
      </div>

      <div className="bg-zinc-950/90 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-left">
        <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
              SIMULATED FINANCIAL TOLL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white font-mono">BROWSER ADMISSION GATE</h1>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 font-mono uppercase block">Fee Assessed</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">₹9,999.99</span>
          </div>
        </div>

        {/* Humorous billing ledger */}
        <div className="my-6 p-4 bg-zinc-900/70 border border-zinc-800 rounded-2xl space-y-3 font-mono text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Item: Unlimited Right to Click Evasive Buttons</span>
            <span className="text-zinc-200">₹4,999.99</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Item: Holographic Companion Permanence Fee</span>
            <span className="text-zinc-200">₹3,000.00</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Item: Hallucinating Mist Maintenance Surcharge</span>
            <span className="text-zinc-200">₹2,000.00</span>
          </div>
          <div className="pt-2 border-t border-zinc-800 flex justify-between font-bold text-amber-400 text-sm">
            <span>Total Simulated Charge</span>
            <span className="text-base">₹9,999.99</span>
          </div>
        </div>

        {/* Processing State */}
        {isProcessing ? (
          <div className="py-10 flex flex-col items-center justify-center space-y-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
            <div className="space-y-1">
              <p className="font-mono text-base text-amber-300 font-bold animate-pulse px-4">
                {PAYMENT_STAGES[stageIndex]}
              </p>
              <span className="text-[11px] text-zinc-500 font-mono">
                Communicating with the anti-UX financial ether...
              </span>
            </div>
            <div className="w-64 bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${((stageIndex + 1) / PAYMENT_STAGES.length) * 100}%` }}
              />
            </div>
          </div>
        ) : completed ? (
          <div className="py-6 flex flex-col items-center text-center space-y-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <h2 className="text-xl font-black text-emerald-300 font-mono">
              SIMULATED PAYMENT COMPLETED!
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-sans max-w-md">
              You were awarded +10,000 free fictional AI tokens! Your permanent hologram companion is now active and watching your every click.
            </p>
            <div className="flex gap-4 pt-2">
              <DelayedLink to="/ai" className="px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-extrabold font-mono text-xs flex items-center gap-1.5 shadow-lg">
                <span>Go Spend On AI</span>
                <ArrowRight className="w-4 h-4" />
              </DelayedLink>
              <DelayedLink to="/tokens" className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs">
                Inspect Tokens
              </DelayedLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4 pt-2">
            <MovingButton
              onClick={handleExecutePayment}
              variant="primary"
              evasionRadius={100}
              maxAttemptsBeforeCatch={3}
              className="w-full text-base py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-black font-black font-mono shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            >
              SIMULATE TOLLGATE PAYMENT (₹9999.99)
            </MovingButton>
            <span className="text-[11px] text-zinc-500 font-mono text-center">
              Requires 0 credit cards. Rewards 10,000 free simulated AI tokens.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
