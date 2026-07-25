import express from 'express';
import request from 'supertest';
import { createApiRateLimiter } from './rateLimiter';

describe('API rate limiter', () => {
  it('blocks requests after the configured limit before a route executes', async () => {
    const app = express();
    const limiter = createApiRateLimiter({ enabled: true, windowMs: 60_000, max: 2 });
    expect(limiter).not.toBeNull();
    app.use(limiter!);
    let executions = 0;
    app.get('/bounded', (_request, response) => {
      executions += 1;
      response.status(200).json({ executions });
    });

    await request(app).get('/bounded').expect(200);
    await request(app).get('/bounded').expect(200);
    await request(app).get('/bounded').expect(429);
    expect(executions).toBe(2);
  });

  it('returns no middleware when rate limiting is disabled', () => {
    expect(createApiRateLimiter({ enabled: false, windowMs: 60_000, max: 1 })).toBeNull();
  });
});
