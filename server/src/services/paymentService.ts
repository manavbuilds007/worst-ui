import { supabase, isSupabaseConfigured, inMemoryDb } from '../db/supabase.js';
import { addTokens } from './tokenService.js';
import { SimulatedPaymentResult } from '../types/index.js';

export async function processSimulatedPayment(userId: string, amount: number = 9999.99): Promise<SimulatedPaymentResult> {
  const TOKENS_GRANTED = 10000;
  const transactionRef = `SIM-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // 1. Record simulated event
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('demo_payment_events').insert({
        user_id: userId,
        amount: amount,
        status: 'simulated',
      });
    } catch (err) {
      console.warn('[PaymentService] Failed to record simulated payment event in Supabase:', err);
    }
  } else {
    inMemoryDb.payments.push({
      id: transactionRef,
      user_id: userId,
      amount,
      status: 'simulated',
      created_at: new Date().toISOString(),
    });
  }

  // 2. Grant free tokens
  const newBalance = await addTokens(userId, TOKENS_GRANTED);

  return {
    success: true,
    status: 'simulated',
    tokensGranted: TOKENS_GRANTED,
    message: `Payment accepted because we said so. Granted ${TOKENS_GRANTED.toLocaleString()} simulated AI tokens! New balance: ${newBalance.toLocaleString()}`,
    transactionRef,
  };
}
