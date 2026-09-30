export interface HologramMessage {
  message: string;
  mood: 'confused' | 'mocking' | 'dramatic' | 'glitchy' | 'sarcastic';
  intensity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  hologramComment?: string;
  fakeConfidence?: number;
  timestamp: string;
}

export interface SimulatedPaymentResponse {
  success: boolean;
  status: 'simulated';
  tokensGranted: number;
  message: string;
  transactionRef: string;
  disclaimer: string;
}

export interface ChaosState {
  tokenBalance: number;
  isLoggedIn: boolean;
  userEmail: string | null;
  hologramUnlocked: boolean;
  hologramVisible: boolean;
  showPoorFellowModal: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
  currentHologramMessage: HologramMessage;
  totalChaosClicks: number;
  isSimulatingDelay: boolean;
  delayMessage: string | null;
}
