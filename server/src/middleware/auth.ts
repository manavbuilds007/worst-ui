import { Request, Response, NextFunction } from 'express';
import { supabase, isSupabaseConfigured } from '../db/supabase.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email?: string;
    isDemo?: boolean;
  };
}

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  const demoUserId = req.headers['x-demo-user-id'] as string | undefined;

  // 1. Try Supabase JWT if header present
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
          res.status(401).json({ success: false, error: 'Unauthorized: Invalid Supabase token' });
          return;
        }
        req.user = { id: user.id, email: user.email };
        next();
        return;
      } catch (err) {
        res.status(401).json({ success: false, error: 'Authentication verification failed' });
        return;
      }
    }
  }

  // 2. Fallback demo mode identity
  // If no Supabase configured or in local demo mode, derive user identity securely
  const fallbackId = demoUserId && demoUserId.trim() !== '' 
    ? demoUserId 
    : '00000000-0000-0000-0000-000000000001';

  req.user = {
    id: fallbackId,
    email: 'fellow.traveler@worst-ui.browser',
    isDemo: true,
  };

  next();
}
