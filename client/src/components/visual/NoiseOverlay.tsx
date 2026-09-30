import React from 'react';

export const NoiseOverlay: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 bg-noise opacity-30 mix-blend-overlay"
      aria-hidden="true"
    />
  );
};
