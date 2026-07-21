import { HealthService } from './HealthService';

describe('HealthService', () => {
  const dependencies = {
    storageHealth: jest.fn(),
    modelHealth: jest.fn(),
    now: () => '2026-07-21T00:00:00.000Z',
    uptime: () => 12,
  };

  beforeEach(() => {
    dependencies.storageHealth.mockReset();
    dependencies.modelHealth.mockReset();
  });

  it('keeps liveness independent from downstream dependencies', () => {
    const service = new HealthService(dependencies);

    expect(service.liveness()).toEqual({
      status: 'alive',
      timestamp: '2026-07-21T00:00:00.000Z',
      uptime: 12,
    });
  });

  it('is ready only when runtime, storage, and the default model are healthy', async () => {
    dependencies.storageHealth.mockResolvedValue({ mongodb: true, redis: true });
    dependencies.modelHealth.mockResolvedValue({ defaultProvider: 'deepseek', healthy: true });
    const service = new HealthService(dependencies);
    service.setRuntimeInitialized(true);

    await expect(service.readiness()).resolves.toMatchObject({
      status: 'ready',
      ready: true,
      components: {
        runtime: { status: 'healthy', required: true },
        mongodb: { status: 'healthy', required: true },
        redis: { status: 'healthy', required: true },
        defaultModel: { status: 'healthy', required: true },
      },
    });
  });

  it('reports not_ready when a required probe fails', async () => {
    dependencies.storageHealth.mockResolvedValue({ mongodb: true, redis: false });
    dependencies.modelHealth.mockRejectedValue(new Error('model unavailable'));
    const service = new HealthService(dependencies);
    service.setRuntimeInitialized(true);

    await expect(service.readiness()).resolves.toMatchObject({
      status: 'not_ready',
      ready: false,
      components: {
        redis: { status: 'unhealthy' },
        defaultModel: { status: 'unhealthy' },
      },
    });
  });
});
