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

  it('fails readiness closed after the Runtime reports a fatal error', async () => {
    dependencies.storageHealth.mockResolvedValue({ mongodb: true, redis: true });
    dependencies.modelHealth.mockResolvedValue({ defaultProvider: 'deepseek', healthy: true });
    const service = new HealthService(dependencies);
    service.setRuntimeInitialized(true);
    service.setRuntimeFailure(new Error('recovery replay diverged'));

    await expect(service.readiness()).resolves.toMatchObject({
      status: 'not_ready',
      ready: false,
      components: {
        runtime: {
          status: 'unhealthy',
          required: true,
          detail: 'Error: recovery replay diverged',
        },
      },
    });
  });

  it('does not let startup overwrite a fatal Runtime failure with ready', async () => {
    dependencies.storageHealth.mockResolvedValue({ mongodb: true, redis: true });
    dependencies.modelHealth.mockResolvedValue({ defaultProvider: 'deepseek', healthy: true });
    const service = new HealthService(dependencies);
    service.beginRuntimeInitialization();
    service.setRuntimeFailure(new Error('missing recovery schema'));

    expect(() => service.setRuntimeInitialized(true)).toThrow(
      'Runtime cannot become ready after a fatal failure'
    );
    await expect(service.readiness()).resolves.toMatchObject({
      ready: false,
      components: {
        runtime: {
          status: 'unhealthy',
          detail: 'Error: missing recovery schema',
        },
      },
    });
  });

  it('clears an acknowledged startup failure only when a new initialization begins', async () => {
    dependencies.storageHealth.mockResolvedValue({ mongodb: true, redis: true });
    dependencies.modelHealth.mockResolvedValue({ defaultProvider: 'deepseek', healthy: true });
    const service = new HealthService(dependencies);
    service.setRuntimeFailure(new Error('first startup failed'));

    service.beginRuntimeInitialization();
    service.setRuntimeInitialized(true);

    await expect(service.readiness()).resolves.toMatchObject({
      status: 'ready',
      ready: true,
      components: { runtime: { status: 'healthy' } },
    });
  });
});
