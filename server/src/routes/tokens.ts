import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { getUserTokens } from '../services/tokenService.js';

const router = Router();

router.get('/', requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;
  const balance = await getUserTokens(userId);

  res.json({
    success: true,
    tokenBalance: balance,
    currency: 'CHAOS_TOKENS',
    note: 'Tokens have zero real-world value. Highly prized in the anti-UX realm.',
  });
});

export default router;
