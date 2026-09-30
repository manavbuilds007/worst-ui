import React, { useState } from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';
import { MovingButton } from '../chaos/MovingButton.js';
import { ContradictoryButtonPair } from '../chaos/ContradictoryButtonPair.js';
import { X, CreditCard, ShieldAlert, Sparkles, CheckCircle2, Loader2, HelpCircle } from 'lucide-react';

interface FakePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PAYMENT_STEPS = [
  "Initializing payment...",
  "Contacting payment universe...",
  "Finding your wallet...",
  "Wallet status: unfortunate.",
  "Payment accepted because we said so.",
];

export const FakePaymentModal: React.FC<FakePaymentModalProps> = ({ isOpen, onClose }) => {
  const { triggerSimulatedPayment, triggerHologramReaction } = useChaosState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [showConfirmationCheck, setShowConfirmationCheck] = useState(false);

  if (!isOpen) return null;

  const handleStartPayment = async () => {
    setIsProcessing(true);
    setStepIndex(0);

    // Animate the funny status sequence
    for (let i = 0; i < PAYMENT_STEPS.length; i++) {
      setStepIndex(i);
      await new Promise(resolve => setTimeout(resolve, 850));
    }

    // Call actual backend simulation
    await triggerSimulatedPayment();
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border-2 border-amber-500/80 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-left">
        {/* Close Button */}
        {!isProcessing && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Mandatory Safety Notice */}
        <div className="mb-4 p-2.5 bg-amber-950/60 border border-amber-500/60 rounded-xl text-amber-300 text-xs font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
          <span>DEMO PAYMENT SIMULATION ONLY — NO REAL MONEY WILL BE CHARGED</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 text-2xl font-bold">
            ₹
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-mono">EXTORTIONATE TOLLGATE</h2>
            <p className="text-xs text-zinc-400">Standard browser entry fee imposed by bureaucratic chaos</p>
          </div>
        </div>

        {/* Absurd invoice breakdown */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 mb-6 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Basic Login Permission</span>
            <span className="text-zinc-200">₹8,000.00</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Button Movement Surcharge</span>
            <span className="text-zinc-200">₹1,499.99</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Simulated Mist Fog Delivery</span>
            <span className="text-zinc-200">₹500.00</span>
          </div>
          <div className="border-t border-zinc-800 pt-2 flex justify-between font-bold text-sm text-amber-400">
            <span>Total Simulated Toll</span>
            <span className="text-lg">₹9,999.99</span>
          </div>
        </div>

        {isProcessing ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-zinc-900/60 rounded-xl border border-zinc-800">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <p className="font-mono text-sm text-amber-300 font-bold animate-pulse text-center px-4">
              {PAYMENT_STEPS[stepIndex]}
            </p>
            <div className="w-40 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-500"
                style={{ width: `${((stepIndex + 1) / PAYMENT_STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : showConfirmationCheck ? (
          <div className="p-4 bg-zinc-900 border-2 border-red-500 rounded-2xl space-y-3 font-mono text-left animate-fade-in">
            <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-red-400" />
              <span>Contradictory Pre-Payment Verification</span>
            </div>
            <p className="text-sm font-sans text-zinc-100 font-semibold leading-relaxed">
              "Do you formally confirm that you do NOT wish to cancel not paying this ₹9,999.99 fee?"
            </p>
            <div className="pt-2">
              <ContradictoryButtonPair
                yesLabel="YES, DO NOT NOT PAY"
                noLabel="NO, ABORT NON-PAYMENT"
                onYes={() => {
                  setShowConfirmationCheck(false);
                  handleStartPayment();
                }}
                onNo={() => {
                  triggerHologramReaction('User clicked GREEN to cancel, but confusion prevailed.');
                  setShowConfirmationCheck(false);
                }}
                allowSwapOnHover={true}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <MovingButton
              onClick={() => setShowConfirmationCheck(true)}
              variant="primary"
              evasionRadius={80}
              maxAttemptsBeforeCatch={2}
              className="w-full text-base py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-black"
            >
              SIMULATE PAYMENT (₹9999.99)
            </MovingButton>
            <p className="text-[10px] text-zinc-500 text-center">
              Clicking this button executes a simulated transaction and awards 10,000 free fictional AI tokens.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
