import express from 'express';
import request from 'supertest';
import { generateToken } from '../middleware/auth';
import { getHealthService } from '../services/HealthService';
import healthRoutes from './health.routes';

jest.mock('../services/HealthService', () => ({
  getHealthService: jest.fn(),
}));

describe('health routes', () => {
  const service = {
    liveness: jest.fn(),
    readiness: jest.fn(),
  };
  const app = express();
  app.use(healthRoutes);
  const adminToken = generateToken({
    id: 'health-admin',
    email: 'health-admin@hypha.local',
    isAdmin: true,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (getHealthService as jest.Mock).mockReturnValue(service);
    service.liveness.mockReturnValue({ status: 'alive', timestamp: 'now', uptime: 10 });
    service.readiness.mockResolvedValue({
      status: 'not_ready',
      ready: false,
      timestamp: 'now',
      components: { redis: { status: 'unhealthy', required: true } },
    });
  });

  it('keeps liveness available while readiness returns 503', async () => {
    await request(app)
      .get('/live')
      .expect(200, {
        success: true,
        data: { status: 'alive', timestamp: 'now', uptime: 10 },
      });
    const readiness = await request(app).get('/ready').expect(503);
    const legacy = await request(app).get('/health').expect(200);

    expect(readiness.body.success).toBe(false);
    expect(legacy.body.data.status).toBe('degraded');
  });

  it('protects detailed health and preserves readiness status', async () => {
    await request(app).get('/health/details').expect(401);
    const response = await request(app)
      .get('/health/details')
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(503);

    expect(response.body.data.status).toBe('not_ready');
  });

  it('returns 200 when all required components are ready', async () => {
    service.readiness.mockResolvedValue({ status: 'ready', ready: true, components: {} });

    await request(app).get('/ready').expect(200);
  });
});
