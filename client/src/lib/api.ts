import { HologramMessage, SimulatedPaymentResponse } from '../types/index.js';
import { supabase, isSupabaseConfigured } from './supabase.js';

// Base API URL (proxied in Vite or direct)
const API_BASE = '/api';

function getDemoUserId(): string {
  let id = localStorage.getItem('worst_ui_demo_user_id');
  if (!id) {
    id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('worst_ui_demo_user_id', id);
  }
  return id;
}

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-demo-user-id': getDemoUserId(),
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
    } catch (e) {
      // Ignore session errors
    }
  }

  return headers;
}

export const api = {
  async getHealth(): Promise<{ status: string; service: string }> {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  },

  async syncProfile(displayName?: string): Promise<any> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ displayName }),
    });
    return await res.json();
  },

  async getTokens(): Promise<{ success: boolean; tokenBalance: number }> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/tokens`, { headers });
    return await res.json();
  },

  async simulatePayment(amount: number = 9999.99): Promise<SimulatedPaymentResponse> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/payment/simulate`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ amount, disclaimerAccepted: true }),
    });
    return await res.json();
  },

  async sendChatMessage(message: string, conversationId?: string): Promise<{
    success: boolean;
    message: string;
    hologramComment: string;
    fakeConfidence: number;
    tokensRemaining: number;
    error?: string;
  }> {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, conversationId }),
    });
    return await res.json();
  },

  async getHologramMessage(context?: string): Promise<{ success: boolean } & HologramMessage> {
    const url = context
      ? `${API_BASE}/hologram/message?context=${encodeURIComponent(context)}`
      : `${API_BASE}/hologram/message`;
    const res = await fetch(url);
    return await res.json();
  },
};
