import React from 'react';
import { useChaosState } from '../../hooks/useChaosState.js';

interface MistLayerProps {
  reducedMotion?: boolean;
}

export const MistLayer: React.FC<MistLayerProps> = ({ reducedMotion = false }) => {
  const { uiColorMode } = useChaosState();

  const isRed = uiColorMode === 'red';
  const isBlue = uiColorMode === 'blue';
  const isDual = uiColorMode === 'dual';

  // Dynamic blob color classes based on Red/Blue mode
  const blob1Color = isRed
    ? 'bg-red-600/25'
    : isBlue
    ? 'bg-blue-600/25'
    : isDual
    ? 'bg-red-600/20'
    : 'bg-cyan-600/10';

  const blob2Color = isRed
    ? 'bg-rose-700/25'
    : isBlue
    ? 'bg-indigo-700/25'
    : isDual
    ? 'bg-blue-600/20'
    : 'bg-purple-700/12';

  const blob3Color = isRed
    ? 'bg-orange-700/20'
    : isBlue
    ? 'bg-cyan-700/20'
    : isDual
    ? 'bg-purple-700/20'
    : 'bg-pink-700/8';

  const gradientCurtain = isRed
    ? 'radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.16) 0%, rgba(185, 28, 28, 0.08) 40%, rgba(0,0,0,0) 80%)'
    : isBlue
    ? 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.16) 0%, rgba(29, 78, 216, 0.08) 40%, rgba(0,0,0,0) 80%)'
    : isDual
    ? 'radial-gradient(ellipse at 50% 50%, rgba(239, 68, 68, 0.12) 0%, rgba(59, 130, 246, 0.12) 50%, rgba(0,0,0,0) 80%)'
    : 'radial-gradient(ellipse at 50% 50%, rgba(0, 247, 255, 0.08) 0%, rgba(176, 38, 255, 0.04) 40%, rgba(0,0,0,0) 80%)';

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-700" aria-hidden="true">
      {/* Base void */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] via-[#040407] to-[#010103]" />

      {/* Floating Translucent Blob 1 */}
      <div
        className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[130px] transition-all duration-700 ${blob1Color} ${
          reducedMotion ? '' : 'animate-mist-slow'
        }`}
      />

      {/* Floating Translucent Blob 2 */}
      <div
        className={`absolute top-1/3 -right-40 w-[650px] h-[650px] rounded-full blur-[150px] transition-all duration-700 ${blob2Color} ${
          reducedMotion ? '' : 'animate-mist-reverse'
        }`}
      />

      {/* Floating Translucent Blob 3 */}
      <div
        className={`absolute -bottom-40 left-1/4 w-[700px] h-[550px] rounded-full blur-[160px] transition-all duration-700 ${blob3Color} ${
          reducedMotion ? '' : 'animate-mist-slow'
        }`}
      />

      {/* Hallucinating mist gradient curtain */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen transition-all duration-700"
        style={{ background: gradientCurtain }}
      />
    </div>
  );
};
