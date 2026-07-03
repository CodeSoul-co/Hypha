import { reloadConfig } from './index';

const trackedEnv = [
  'PORT',
  'HOST',
  'MONGODB_URI',
  'MONGODB_AUTH_SOURCE',
  'MONGODB_DIRECT_CONNECTION',
  'REDIS_URL',
  'REDIS_PASSWORD',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'HYPHA_STORAGE_EVENT_DB',
  'HYPHA_RUNTIME_EVENT_DB',
] as const;

describe('configuration templates', () => {
  const originalEnv: Partial<Record<(typeof trackedEnv)[number], string>> = {};

  beforeEach(() => {
    for (const key of trackedEnv) {
      originalEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of trackedEnv) {
      const value = originalEnv[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    reloadConfig();
  });

  it('loads server and secret overrides from env', () => {
    process.env.PORT = '4123';
    process.env.HOST = '127.0.0.1';
    process.env.JWT_SECRET = 'unit-access-secret';
    process.env.JWT_REFRESH_SECRET = 'unit-refresh-secret';

    const config = reloadConfig();

    expect(config.app.port).toBe(4123);
    expect(config.app.host).toBe('127.0.0.1');
    expect(config.auth.jwt.secret).toBe('unit-access-secret');
    expect(config.auth.jwt.refreshSecret).toBe('unit-refresh-secret');
  });

  it('normalizes empty optional env values to undefined', () => {
    process.env.MONGODB_URI = '';
    process.env.MONGODB_AUTH_SOURCE = '';
    process.env.MONGODB_DIRECT_CONNECTION = '';
    process.env.REDIS_URL = '';
    process.env.REDIS_PASSWORD = '';

    const config = reloadConfig();

    expect(config.database.mongodb.uri).toBeUndefined();
    expect(config.database.mongodb.authSource).toBeUndefined();
    expect(config.database.mongodb.directConnection).toBeUndefined();
    expect(config.redis.url).toBeUndefined();
    expect(config.redis.password).toBeUndefined();
  });

  it('supports storage env aliases during template migration', () => {
    process.env.HYPHA_RUNTIME_EVENT_DB = './data/legacy-events.sqlite';
    expect(reloadConfig().storage.local.eventDbPath).toBe('./data/legacy-events.sqlite');

    process.env.HYPHA_STORAGE_EVENT_DB = './data/events.sqlite';
    expect(reloadConfig().storage.local.eventDbPath).toBe('./data/events.sqlite');
  });
});
