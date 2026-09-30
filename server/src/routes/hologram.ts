import { Router, Request, Response } from 'express';
import { fetchHologramMessage } from '../services/hologramService.js';

const router = Router();

router.get('/message', async (req: Request, res: Response): Promise<void> => {
  const context = typeof req.query.context === 'string' ? req.query.context : undefined;
  const data = await fetchHologramMessage(context);

  res.json({
    success: true,
    ...data,
  });
});

export default router;
