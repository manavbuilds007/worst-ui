import { useState, useCallback, useRef } from 'react';
import { soundEffects } from '../lib/soundEffects.js';

interface UseMovingButtonOptions {
  maxAttemptsBeforeCatch?: number;
  evasionRadius?: number;
  reducedMotion?: boolean;
}

export function useMovingButton(options: UseMovingButtonOptions = {}) {
  const { maxAttemptsBeforeCatch = 5, evasionRadius = 140, reducedMotion = false } = options;
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const evade = useCallback(() => {
    if (reducedMotion) return; // Respect accessibility

    // If user has chased it enough times, let them catch it occasionally!
    if (escapeCount >= maxAttemptsBeforeCatch) {
      setEscapeCount(0);
      return;
    }

    soundEffects.playWhoosh();

    // Controlled pseudo-random jump within bounds
    const isMicroMove = Math.random() > 0.65;
    const distance = isMicroMove ? (Math.random() * 40 + 20) : (Math.random() * evasionRadius + 60);
    const angle = Math.random() * Math.PI * 2;

    let newX = Math.cos(angle) * distance;
    let newY = Math.sin(angle) * distance;

    // Check bounds if container is available
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const maxX = rect.width / 2 - 40;
      const maxY = rect.height / 2 - 30;
      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));
    }

    setOffset({ x: Math.round(newX), y: Math.round(newY) });
    setEscapeCount(prev => prev + 1);
  }, [escapeCount, maxAttemptsBeforeCatch, evasionRadius, reducedMotion]);

  const resetPosition = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setEscapeCount(0);
  }, []);

  return {
    offset,
    escapeCount,
    containerRef,
    evade,
    resetPosition,
  };
}
