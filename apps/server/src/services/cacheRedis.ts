import Redis, { type RedisOptions } from 'ioredis';
import { redisConfig } from '../config';

export function createCacheRedisClient(): Redis {
  const config = redisConfig();
  const configuredUrl = firstNonEmpty(
    process.env[config.urlEnv],
    config.url,
    process.env.REDIS_URL,
    process.env.KV_URL,
    process.env.RENDER_REDIS_URL
  );
  const useTls = Boolean(
    config.tls ||
    configuredUrl?.startsWith('rediss://') ||
    ['true', '1'].includes(process.env.REDIS_TLS?.toLowerCase() ?? '')
  );
  const options: RedisOptions = {
    maxRetriesPerRequest: 1,
    enableOfflineQueue: false,
    connectTimeout: 5000,
    ...(useTls ? { tls: {} } : {}),
  };
  return configuredUrl
    ? new Redis(configuredUrl, options)
    : new Redis({
        host: config.host,
        port: config.port,
        password: config.password || undefined,
        db: config.db,
        ...options,
      });
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const value of values) {
    const normalized = value?.trim();
    if (normalized) return normalized;
  }
  return undefined;
}
