import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';
import { ChatRequestSchema } from '../validation/schemas.js';
import { generateAIChatResponse } from '../ai/gemini.js';
import { getUserTokens, deductTokens } from '../services/tokenService.js';
import { supabase, isSupabaseConfigured, inMemoryDb } from '../db/supabase.js';

const router = Router();

router.post('/chat', aiRateLimiter, requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const parsed = ChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: 'Invalid AI chat payload',
      details: parsed.error.issues,
    });
    return;
  }

  const userId = req.user!.id;
  const currentTokens = await getUserTokens(userId);

  if (currentTokens <= 0) {
    res.status(402).json({
      success: false,
      error: 'Token Exhaustion Anomaly',
      message: 'You have 0 AI tokens! Please complete the simulated payment to receive 10,000 free simulated tokens.',
      tokensRemaining: 0,
    });
    return;
  }

  // Deduct 1 token for interaction
  const deductResult = await deductTokens(userId, 1);
  const remainingTokens = deductResult.balance;

  // Generate structured AI response
  const aiOutput = await generateAIChatResponse(parsed.data.message);

  // Optional: record in conversation history
  if (isSupabaseConfigured && supabase) {
    try {
      let convId = parsed.data.conversationId;
      if (!convId) {
        const { data: conv } = await supabase
          .from('ai_conversations')
          .insert({ user_id: userId, title: parsed.data.message.slice(0, 30) })
          .select('id')
          .single();
        if (conv) convId = conv.id;
      }
      if (convId) {
        await supabase.from('ai_messages').insert([
          { conversation_id: convId, user_id: userId, role: 'user', content: parsed.data.message },
          { conversation_id: convId, user_id: userId, role: 'assistant', content: aiOutput.response },
        ]);
      }
    } catch (err) {
      console.warn('[AIChatRoute] Could not persist message history:', err);
    }
  } else {
    const list = inMemoryDb.conversations.get(userId) || [];
    list.push(
      { role: 'user', content: parsed.data.message, created_at: new Date().toISOString() },
      { role: 'assistant', content: aiOutput.response, created_at: new Date().toISOString() }
    );
    inMemoryDb.conversations.set(userId, list);
  }

  res.json({
    success: true,
    message: aiOutput.response,
    hologramComment: aiOutput.hologramComment,
    fakeConfidence: aiOutput.fakeConfidence,
    tokensRemaining: remainingTokens,
  });
});

export default router;
