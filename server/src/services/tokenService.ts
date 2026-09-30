import { supabase, isSupabaseConfigured, inMemoryDb } from '../db/supabase.js';

export async function getUserTokens(userId: string): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('token_balance')
        .eq('id', userId)
        .single();

      if (!error && data) {
        return data.token_balance;
      }
    } catch (err) {
      console.warn('[TokenService] Supabase token fetch failed, falling back to local memory:', err);
    }
  }

  const profile = inMemoryDb.getOrCreateProfile(userId);
  return profile.token_balance;
}

export async function addTokens(userId: string, amount: number): Promise<number> {
  if (isSupabaseConfigured && supabase) {
    try {
      const current = await getUserTokens(userId);
      const updated = current + amount;
      const { error } = await supabase
        .from('profiles')
        .update({ token_balance: updated, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (!error) return updated;
    } catch (err) {
      console.warn('[TokenService] Supabase token update failed, falling back to local memory:', err);
    }
  }

  return inMemoryDb.updateTokens(userId, amount);
}

export async function deductTokens(userId: string, amount: number): Promise<{ success: boolean; balance: number }> {
  const current = await getUserTokens(userId);
  if (current < amount) {
    return { success: false, balance: current };
  }

  if (isSupabaseConfigured && supabase) {
    try {
      const updated = current - amount;
      const { error } = await supabase
        .from('profiles')
        .update({ token_balance: updated, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (!error) return { success: true, balance: updated };
    } catch (err) {
      console.warn('[TokenService] Supabase token deduct failed, falling back to local memory:', err);
    }
  }

  const newBalance = inMemoryDb.updateTokens(userId, -amount);
  return { success: true, balance: newBalance };
}
