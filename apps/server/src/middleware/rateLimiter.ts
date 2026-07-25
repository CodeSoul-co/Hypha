import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';
import { rateLimitHandler } from './errorHandler';

export interface ApiRateLimitPolicy {
  enabled: boolean;
  windowMs: number;
  max: number;
}

export function createApiRateLimiter(policy: ApiRateLimitPolicy): RequestHandler | null {
  if (!policy.enabled) return null;
  return rateLimit({
    windowMs: policy.windowMs,
    max: policy.max,
    handler: rateLimitHandler,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
