import { dbConfig, redisConfig, reloadConfig, storageConfig } from './index';

const trackedEnv = [
  'MONGODB_URI',
  'MONGODB_HOST',
  'REDIS_URL',
  'REDIS_HOST',
  'HYPHA_STORAGE_EVENT_DB',
  'HYPHA_STORAGE_VECTOR_INDEX',
  'KAFKA_ENABLED',
] as const;

describe('configuration storage taxonomy', () => {
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

  it('loads document, messaging, relational, and vector storage groups', () => {
    process.env.MONGODB_HOST = 'mongo.local';
    process.env.REDIS_HOST = 'redis.local';
    process.env.HYPHA_STORAGE_EVENT_DB = './data/events.test.sqlite';
    process.env.HYPHA_STORAGE_VECTOR_INDEX = './data/vectors.test.json';
    process.env.KAFKA_ENABLED = 'true';

    const config = reloadConfig();

    expect(config.storage.document.mongodb.host).toBe('mongo.local');
    expect(config.storage.messaging.redis.host).toBe('redis.local');
    expect(config.storage.messaging.kafka.enabled).toBe(true);
    expect(config.storage.relational.sqlite.eventDbPath).toBe('./data/events.test.sqlite');
    expect(config.storage.vector.local.path).toBe('./data/vectors.test.json');
    expect(dbConfig().host).toBe('mongo.local');
    expect(redisConfig().host).toBe('redis.local');
  });

  it('normalizes empty connection URLs while preserving local startup defaults', () => {
    process.env.MONGODB_URI = '';
    process.env.REDIS_URL = '';

    reloadConfig();

    expect(dbConfig().uri).toBeUndefined();
    expect(dbConfig().host).toBe('localhost');
    expect(redisConfig().url).toBeUndefined();
    expect(redisConfig().host).toBe('localhost');
  });

  it('exports storage provider profiles for functional categories', () => {
    const profiles = storageConfig().profiles.map((profile) => profile.id);

    expect(profiles).toContain('storage.mongodb.document');
    expect(profiles).toContain('storage.redis.messaging');
    expect(profiles).toContain('storage.sqlite.events');
    expect(profiles).toContain('storage.local-vector.semantic');
  });
});
