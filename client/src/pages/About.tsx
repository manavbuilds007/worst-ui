import React from 'react';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { ChaosButton } from '../components/chaos/ChaosButton.js';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { Skull, AlertTriangle, HelpCircle, CheckCircle } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10 text-left">
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
          MANIFESTO & PHILOSOPHY
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
          THE ART OF ANTI-UX
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
          Why make websites pleasant, intuitive, and frictionless when we can deliver an interface that actively questions your life decisions?
        </p>
      </div>

      <div className="p-6 bg-zinc-950/80 border-2 border-cyan-500/40 rounded-3xl space-y-4 font-sans text-sm leading-relaxed text-zinc-300">
        <h2 className="text-xl font-bold text-cyan-300 font-mono flex items-center gap-2">
          <span>01.</span>
          <span>The Tenets of Functional Dysfunction</span>
        </h2>
        <p>
          Conventional software engineering strives for minimum latency, predictable click targets, and soothing pastel color schemes. 
          <strong> Worst UI for Any Web Browser</strong> explores the opposite frontier:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-zinc-400 text-xs sm:text-sm font-mono">
          <li><strong>Evasive Buttons:</strong> Buttons that run away when you try to press them because they respect nobody.</li>
          <li><strong>Delayed Hyperlinks:</strong> Every route change hesitates for 800ms–2500ms to contemplate your motives.</li>
          <li><strong>Hallucinating Background:</strong> Layers of translucent mist, blurred neon, and film-grain noise.</li>
          <li><strong>Permanent Hologram:</strong> A glowing digital mascot who refuses to leave and mocks your clicks.</li>
          <li><strong>Simulated Extortion:</strong> A fictional ₹9,999.99 gate that costs ₹0.00 and yields 10,000 free tokens.</li>
        </ul>
      </div>

      <div className="p-6 bg-zinc-950/80 border-2 border-pink-500/40 rounded-3xl space-y-4 font-sans text-sm leading-relaxed text-zinc-300">
        <h2 className="text-xl font-bold text-pink-300 font-mono flex items-center gap-2">
          <span>02.</span>
          <span>Underlying Technical Architecture</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Despite the comedic chaos on the surface, this application adheres strictly to modern full-stack web standards:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-2">
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-cyan-400 font-bold block mb-1">Server-Side Gemini</span>
            API key never exposed to client; responses validated via Zod schemas.
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-pink-400 font-bold block mb-1">Supabase & RLS</span>
            PostgreSQL schema with Row Level Security and session isolation.
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-amber-400 font-bold block mb-1">Accessible Motion</span>
            Respects <code>prefers-reduced-motion</code> and provides emergency state resets.
          </div>
          <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
            <span className="text-emerald-400 font-bold block mb-1">Safe Financials</span>
            100% simulated transactions. Zero real payment processor connectivity.
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800">
        <DelayedLink to="/" className="text-cyan-400 font-mono text-xs font-bold hover:underline">
          ← Back to the Chaos Center
        </DelayedLink>
        <ChaosButton initialLabel="Did you read all that?" />
      </div>
    </div>
  );
};
