import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().trim().min(1, 'Message cannot be empty').max(2000, 'Message cannot exceed 2000 characters'),
  conversationId: z.string().uuid().optional(),
});

export const PaymentSimulateSchema = z.object({
  amount: z.number().positive().optional().default(9999.99),
  disclaimerAccepted: z.boolean().default(true),
});

export const ProfileRequestSchema = z.object({
  displayName: z.string().trim().min(1).max(100).optional(),
});

export const HologramMessageSchema = z.object({
  message: z.string().min(5).max(160),
  mood: z.enum(['confused', 'mocking', 'dramatic', 'glitchy', 'sarcastic']),
  intensity: z.number().min(1).max(10),
});

export const AIChatOutputSchema = z.object({
  response: z.string().min(1).max(1000),
  hologramComment: z.string().min(1).max(200),
  fakeConfidence: z.number().min(0).max(100),
});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type PaymentSimulate = z.infer<typeof PaymentSimulateSchema>;
export type ProfileRequest = z.infer<typeof ProfileRequestSchema>;
export type HologramMessage = z.infer<typeof HologramMessageSchema>;
export type AIChatOutput = z.infer<typeof AIChatOutputSchema>;
