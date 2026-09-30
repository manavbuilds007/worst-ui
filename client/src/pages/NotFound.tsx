import React from 'react';
import { DelayedLink } from '../components/chaos/DelayedLink.js';
import { MovingButton } from '../components/chaos/MovingButton.js';
import { useChaosState } from '../hooks/useChaosState.js';
import { useNavigate } from 'react-router-dom';
import { Skull, Compass, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  const { triggerHologramReaction } = useChaosState();
  const navigate = useNavigate();

  return (
    <div className="max-w-xl mx-auto py-12 text-center space-y-6">
      <div className="text-8xl sm:text-9xl font-black font-retro text-red-500 tracking-widest glow-pink select-none animate-flicker">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase">
          Congratulations.
        </h1>
        <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
          You successfully found the page that doesn't exist. We knew you could do it.
        </p>
      </div>

      <div className="p-4 bg-zinc-950/80 border border-red-500/40 rounded-2xl font-mono text-xs text-red-300">
        Status: Navigational dead end achieved. The anti-UX telemetry is immensely proud of you.
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Evasive escape button */}
        <MovingButton
          onClick={() => navigate('/')}
          variant="danger"
          evasionRadius={90}
          maxAttemptsBeforeCatch={3}
        >
          ESCAPE TO HOME (TRY TO)
        </MovingButton>

        <DelayedLink
          to="/ai"
          className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-2"
        >
          <Compass className="w-4 h-4" />
          <span>Ask Confused AI For Directions</span>
        </DelayedLink>
      </div>
    </div>
  );
};
