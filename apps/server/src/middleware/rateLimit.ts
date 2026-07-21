import { Request } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { rateLimitHandler } from './errorHandler';

export interface ApiRateLimitOptions {
  windowMs: number;
  max: number;
  skipPaths?: string[];
  skip?: (req: Request) => boolean;
}

export function rateLimitIdentity(req: Request): string {
  if (req.user?.userId) return `user:${req.user.userId}`;
  if (req.apiKey?.keyId) return `api-key:${req.apiKey.keyId}`;
  return `ip:${req.ip || req.socket.remoteAddress || 'unknown'}`;
}

export function createApiRateLimiter(options: ApiRateLimitOptions): RateLimitRequestHandler {
  return rateLimit({
    windowMs: options.windowMs,
    max: options.max,
    keyGenerator: rateLimitIdentity,
    skip: (req) =>
      (options.skipPaths?.includes(req.path) ?? false) || (options.skip?.(req) ?? false),
    handler: rateLimitHandler,
    standardHeaders: true,
    legacyHeaders: false,
  });
}
