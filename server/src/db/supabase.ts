import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

// Safe in-memory store for fallback demo mode (allows 100% full experience out-of-the-box)
interface InMemoryProfile {
  id: string;
  display_name: string;
  token_balance: number;
  created_at: string;
  updated_at: string;
}

interface InMemoryPayment {
  id: string;
  user_id: string;
  amount: number;
  status: string;
  created_at: string;
}

export const inMemoryDb = {
  profiles: new Map<string, InMemoryProfile>(),
  payments: new Array<InMemoryPayment>(),
  conversations: new Map<string, Array<{ role: string; content: string; created_at: string }>>(),

  getOrCreateProfile(userId: string, defaultName: string = 'Fellow Human'): InMemoryProfile {
    let profile = this.profiles.get(userId);
    if (!profile) {
      profile = {
        id: userId,
        display_name: defaultName,
        token_balance: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.profiles.set(userId, profile);
    }
    return profile;
  },

  updateTokens(userId: string, delta: number): number {
    const profile = this.getOrCreateProfile(userId);
    profile.token_balance = Math.max(0, profile.token_balance + delta);
    profile.updated_at = new Date().toISOString();
    return profile.token_balance;
  },
};
