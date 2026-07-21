import express from 'express';
import request from 'supertest';
import { createApiRateLimiter, rateLimitIdentity } from './rateLimit';

describe('API rate limiting', () => {
  it('uses an authenticated principal and otherwise falls back to the network address', () => {
    const req = {
      user: { userId: 'user-1' },
      apiKey: undefined,
      get: () => undefined,
      ip: '127.0.0.1',
      socket: {},
    } as any;

    expect(rateLimitIdentity(req)).toBe('user:user-1');

    req.user = undefined;
    expect(rateLimitIdentity(req)).toBe('ip:127.0.0.1');
  });

  it('enforces the budget before a protected route and isolates credentials', async () => {
    const app = express();
    app.use((req, _res, next) => {
      const userId = req.get('X-Test-User');
      if (userId) req.user = { userId, email: `${userId}@example.com`, isAdmin: false };
      next();
    });
    app.use(
      createApiRateLimiter({
        windowMs: 60_000,
        max: 1,
      })
    );
    app.get('/protected', (_req, res) => res.json({ success: true }));

    await request(app).get('/protected').set('X-Test-User', 'user-a').expect(200);
    const limited = await request(app).get('/protected').set('X-Test-User', 'user-a').expect(429);
    await request(app).get('/protected').set('X-Test-User', 'user-b').expect(200);

    expect(limited.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
  });
});
