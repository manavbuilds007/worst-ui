import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HologramMessage } from '../types/index.js';
import { api } from '../lib/api.js';
import { soundEffects } from '../lib/soundEffects.js';
import confetti from 'canvas-confetti';

interface ChaosContextType {
  tokenBalance: number;
  setTokenBalance: React.Dispatch<React.SetStateAction<number>>;
  isLoggedIn: boolean;
  userEmail: string | null;
  hologramUnlocked: boolean;
  setHologramUnlocked: (val: boolean) => void;
  showPoorFellowModal: boolean;
  setShowPoorFellowModal: (val: boolean) => void;
  showConfusingModal: boolean;
  setShowConfusingModal: (val: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (val: boolean) => void;
  showTokenRewardModal: boolean;
  setShowTokenRewardModal: (val: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  uiColorMode: 'default' | 'red' | 'blue' | 'dual';
  setUiColorMode: React.Dispatch<React.SetStateAction<'default' | 'red' | 'blue' | 'dual'>>;
  toggleRedBlueMode: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  currentHologramMessage: HologramMessage;
  totalChaosClicks: number;
  incrementClicks: () => void;
  triggerHologramReaction: (context?: string) => Promise<void>;
  triggerSimulatedPayment: () => Promise<void>;
  resetChaosState: () => void;
  loginDemo: (email: string) => void;
  logoutDemo: () => void;
}

const defaultHologram: HologramMessage = {
  message: "Welcome to the world's most intentionally unhelpful interface. Proceed at your own peril.",
  mood: "sarcastic",
  intensity: 6,
};

const ChaosContext = createContext<ChaosContextType | undefined>(undefined);

export const ChaosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tokenBalance, setTokenBalance] = useState<number>(() => {
    const saved = localStorage.getItem('worst_ui_tokens');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('worst_ui_logged_in') === 'true';
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('worst_ui_email');
  });

  const [hologramUnlocked, setHologramUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('worst_ui_hologram_unlocked') === 'true';
  });

  const [showPoorFellowModal, setShowPoorFellowModal] = useState<boolean>(false);
  const [showConfusingModal, setShowConfusingModal] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showTokenRewardModal, setShowTokenRewardModal] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [uiColorMode, setUiColorMode] = useState<'default' | 'red' | 'blue' | 'dual'>('default');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [totalChaosClicks, setTotalChaosClicks] = useState<number>(0);
  const [currentHologramMessage, setCurrentHologramMessage] = useState<HologramMessage>(defaultHologram);

  const toggleRedBlueMode = () => {
    setUiColorMode((prev) => {
      if (prev === 'default') return 'red';
      if (prev === 'red') return 'blue';
      if (prev === 'blue') return 'dual';
      return 'red';
    });
    soundEffects.playBlip();
  };

  // Sync token balance from backend on mount
  useEffect(() => {
    api.getTokens().then((data) => {
      if (data.success && typeof data.tokenBalance === 'number') {
        setTokenBalance(data.tokenBalance);
        localStorage.setItem('worst_ui_tokens', data.tokenBalance.toString());
      }
    }).catch(() => {
      // Backend not yet ready or offline; local state preserved
    });
  }, []);

  // Update sound effects global toggle
  useEffect(() => {
    soundEffects.enabled = soundEnabled;
  }, [soundEnabled]);

  const incrementClicks = () => {
    setTotalChaosClicks((prev) => {
      const next = prev + 1;
      if (next % 5 === 0 && hologramUnlocked) {
        triggerHologramReaction(`User clicked ${next} times on useless elements.`);
      }
      return next;
    });
  };

  const triggerHologramReaction = async (context?: string) => {
    try {
      const res = await api.getHologramMessage(context);
      if (res.success) {
        setCurrentHologramMessage({
          message: res.message,
          mood: res.mood,
          intensity: res.intensity,
        });
        soundEffects.playHologramChirp();
      }
    } catch (e) {
      // safe fallback
      setCurrentHologramMessage({
        message: "You clicked that voluntarily. Fascinating.",
        mood: "mocking",
        intensity: 8,
      });
    }
  };

  const triggerSimulatedPayment = async () => {
    try {
      const res = await api.simulatePayment(9999.99);
      if (res.success) {
        setTokenBalance((prev) => {
          const next = prev + res.tokensGranted;
          localStorage.setItem('worst_ui_tokens', next.toString());
          return next;
        });

        // Trigger confetti celebration!
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#00f7ff', '#ff007f', '#b026ff', '#f59e0b'],
          });
        } catch (e) {}

        soundEffects.playTokenFanfare();

        // 1. Close payment modal
        setShowPaymentModal(false);

        // 2. Open Token Reward Modal
        setShowTokenRewardModal(true);

        // 3. Unlock permanent hologram
        setHologramUnlocked(true);
        localStorage.setItem('worst_ui_hologram_unlocked', 'true');

        // 4. Queue the "HI POOR FELLOW" popup after a short comedic delay
        setTimeout(() => {
          setShowPoorFellowModal(true);
        }, 1800);
      }
    } catch (err) {
      console.error('Payment simulation error:', err);
    }
  };

  const loginDemo = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('worst_ui_logged_in', 'true');
    localStorage.setItem('worst_ui_email', email);
  };

  const logoutDemo = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem('worst_ui_logged_in');
    localStorage.removeItem('worst_ui_email');
  };

  // Emergency reset function per Section 7 & 22
  const resetChaosState = () => {
    setTokenBalance(0);
    setIsLoggedIn(false);
    setUserEmail(null);
    setHologramUnlocked(false);
    setShowPoorFellowModal(false);
    setShowConfusingModal(false);
    setShowPaymentModal(false);
    setShowTokenRewardModal(false);
    setTotalChaosClicks(0);
    setUiColorMode('default');
    setCurrentHologramMessage(defaultHologram);
    localStorage.removeItem('worst_ui_tokens');
    localStorage.removeItem('worst_ui_logged_in');
    localStorage.removeItem('worst_ui_email');
    localStorage.removeItem('worst_ui_hologram_unlocked');
    alert('🌀 The Anti-UX matrix has been reset! All chaos parameters restored to factory defaults.');
  };

  return (
    <ChaosContext.Provider
      value={{
        tokenBalance,
        setTokenBalance,
        isLoggedIn,
        userEmail,
        hologramUnlocked,
        setHologramUnlocked,
        showPoorFellowModal,
        setShowPoorFellowModal,
        showConfusingModal,
        setShowConfusingModal,
        showPaymentModal,
        setShowPaymentModal,
        showTokenRewardModal,
        setShowTokenRewardModal,
        reducedMotion,
        setReducedMotion,
        uiColorMode,
        setUiColorMode,
        toggleRedBlueMode,
        soundEnabled,
        setSoundEnabled,
        currentHologramMessage,
        totalChaosClicks,
        incrementClicks,
        triggerHologramReaction,
        triggerSimulatedPayment,
        resetChaosState,
        loginDemo,
        logoutDemo,
      }}
    >
      {children}
    </ChaosContext.Provider>
  );
};

export const useChaosState = (): ChaosContextType => {
  const context = useContext(ChaosContext);
  if (!context) {
    throw new Error('useChaosState must be used within a ChaosProvider');
  }
  return context;
};
