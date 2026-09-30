import rateLimit from 'express-rate-limit';

export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 30 chat requests per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many chaotic thoughts. The AI needs 60 seconds to contemplate your impetuous clicking.',
  },
});

export const paymentRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20, // Limit each IP to 20 payment simulations per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Simulation overload: Slow down your fake expenditure.',
  },
});
