export interface UserProfile {
  id: string;
  display_name: string | null;
  token_balance: number;
  created_at: string;
  updated_at: string;
}

export interface HologramMessageResponse {
  message: string;
  mood: 'confused' | 'mocking' | 'dramatic' | 'glitchy' | 'sarcastic';
  intensity: number;
}

export interface AIChatResponse {
  response: string;
  hologramComment: string;
  fakeConfidence: number;
}

export interface SimulatedPaymentResult {
  success: boolean;
  status: 'simulated';
  tokensGranted: number;
  message: string;
  transactionRef: string;
}
