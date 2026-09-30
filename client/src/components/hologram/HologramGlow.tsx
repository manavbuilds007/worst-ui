import React from 'react';

interface HologramGlowProps {
  intensity?: number;
  reducedMotion?: boolean;
}

export const HologramGlow: React.FC<HologramGlowProps> = ({ intensity = 7, reducedMotion = false }) => {
  const opacityClass = intensity > 8 ? 'opacity-80' : intensity > 5 ? 'opacity-50' : 'opacity-30';

  return (
    <div
      className={`absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-xl pointer-events-none ${opacityClass} ${
        reducedMotion ? '' : 'animate-pulse-glow'
      }`}
      aria-hidden="true"
    />
  );
};
