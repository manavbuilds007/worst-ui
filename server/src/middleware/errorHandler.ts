import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error('[ServerError]', err);

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: err.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
    });
    return;
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = statusCode === 500
    ? 'An intentionally unexpected internal anomaly occurred. The anti-UX universe is pleased.'
    : err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
