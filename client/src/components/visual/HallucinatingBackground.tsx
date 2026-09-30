import React from 'react';
import { MistLayer } from './MistLayer.js';
import { NoiseOverlay } from './NoiseOverlay.js';
import { useChaosState } from '../../hooks/useChaosState.js';

export const HallucinatingBackground: React.FC = () => {
  const { reducedMotion } = useChaosState();

  return (
    <>
      <MistLayer reducedMotion={reducedMotion} />
      <NoiseOverlay />
    </>
  );
};
