import React from 'react';

export const HologramScanlines: React.FC = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden scanlines opacity-40 mix-blend-overlay z-20"
      aria-hidden="true"
    />
  );
};
