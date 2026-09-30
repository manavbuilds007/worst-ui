import { Router, Response } from 'express';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth.js';
import { paymentRateLimiter } from '../middleware/rateLimiter.js';
import { PaymentSimulateSchema } from '../validation/schemas.js';
import { processSimulatedPayment } from '../services/paymentService.js';

const router = Router();

router.post('/simulate', paymentRateLimiter, requireAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const parsed = PaymentSimulateSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: 'Invalid simulated payment parameters',
      details: parsed.error.format(),
    });
    return;
  }

  const userId = req.user!.id;
  const result = await processSimulatedPayment(userId, parsed.data.amount);

  res.json({
    success: true,
    status: result.status,
    tokensGranted: result.tokensGranted,
    message: result.message,
    transactionRef: result.transactionRef,
    disclaimer: 'DEMO PAYMENT SIMULATION ONLY. NO REAL FINANCIAL TRANSACTION OCCURRED.',
  });
});

export default router;
