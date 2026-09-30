import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { soundEffects } from '../lib/soundEffects.js';

const DELAY_MESSAGES = [
  "Still thinking...",
  "Almost.",
  "Maybe.",
  "Connection probably fine.",
  "Why did you click that?",
  "Asking the cloud nicely...",
  "Downgrading bandwidth for authentic 1999 dial-up feel...",
  "Consulting the hologram committee...",
  "Verifying that your click was intentional...",
  "Optimizing inefficiency...",
];

export function useDelayedAction() {
  const [isDelaying, setIsDelaying] = useState<boolean>(false);
  const [delayMessage, setDelayMessage] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const navigate = useNavigate();

  const triggerDelayedNavigation = useCallback(
    (to: string, customDelayMs?: number) => {
      if (isDelaying) return;

      setIsDelaying(true);
      const delay = customDelayMs || Math.floor(Math.random() * 1700) + 800; // 800ms to 2500ms
      const chosenMsg = DELAY_MESSAGES[Math.floor(Math.random() * DELAY_MESSAGES.length)];
      setDelayMessage(chosenMsg);
      setProgress(0);
      soundEffects.playBlip();

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(99, Math.floor((elapsed / delay) * 100));
        setProgress(currentProgress);
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setIsDelaying(false);
        navigate(to);
      }, delay);
    },
    [isDelaying, navigate]
  );

  return {
    isDelaying,
    delayMessage,
    progress,
    triggerDelayedNavigation,
  };
}
