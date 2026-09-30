import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { ProfileRequestSchema } from '../validation/schemas.js';
import { supabase, isSupabaseConfigured, inMemoryDb } from '../db/supabase.js';

const router = Router();

router.post('/profile', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const parsed = ProfileRequestSchema.safeParse(req.body);
  const displayName = (parsed.success && parsed.data.displayName) ? parsed.data.displayName : 'Fellow Sufferer';

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        res.json({ success: true, profile: data });
        return;
      }

      // Upsert profile
      const { data: newProfile, error: insertError } = await supabase
        .from('profiles')
        .upsert({ id: userId, display_name: displayName, token_balance: 0 })
        .select()
        .single();

      if (!insertError && newProfile) {
        res.json({ success: true, profile: newProfile });
        return;
      }
    } catch (err) {
      console.warn('[AuthRoute] Supabase error, using inMemoryDb:', err);
    }
  }

  const profile = inMemoryDb.getOrCreateProfile(userId, displayName);
  res.json({ success: true, profile });
});

export default router;
