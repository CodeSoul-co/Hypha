import mongoose from 'mongoose';
import { redisConfig, dbConfig } from '../config';
import { logger } from '../utils/logger';
import { buildMongoUri } from '../utils/helpers';
import Redis, { RedisOptions } from 'ioredis';

let mongoConnection: typeof mongoose | null = null;
let redisClient: Redis | null = null;

function nonEmptyEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

function nonEmpty(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed || undefined;
}

// MongoDB connection
export async function connectMongoDB(): Promise<typeof mongoose> {
  if (mongoConnection) {
    return mongoConnection;
  }

  const config = dbConfig();
  const envUri = nonEmptyEnv(config.uriEnv) || nonEmptyEnv('MONGODB_URI');
  const configUri = nonEmpty(config.uri);

  let uri: string;
  if (envUri) {
    uri = envUri;
    logger.info('Using MongoDB URI from environment', {
      uriEnv: config.uriEnv,
      deployment: config.deployment,
    });
  } else if (configUri) {
    uri = configUri;
    logger.info('Using MongoDB URI from config', {
      deployment: config.deployment,
    });
  } else {
    uri = buildMongoUri({
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      password: config.password,
    });
  }

  const options = {
    maxPoolSize: config.options?.maxPoolSize || 10,
    retryWrites: config.options?.retryWrites ?? true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    ...(config.tls ? { tls: true } : {}),
    ...(config.authSource ? { authSource: config.authSource } : {}),
    ...(config.replicaSet ? { replicaSet: config.replicaSet } : {}),
    ...(config.directConnection !== undefined ? { directConnection: config.directConnection } : {}),
  };

  try {
    logger.info('Connecting to MongoDB...', {
      host: envUri || configUri ? 'uri' : config.host,
      database: config.database,
      deployment: config.deployment,
      tls: Boolean(config.tls || uri.startsWith('mongodb+srv://')),
    });

    mongoConnection = await mongoose.connect(uri, options);

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    return mongoConnection;
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectMongoDB(): Promise<void> {
  if (mongoConnection) {
    await mongoose.disconnect();
    mongoConnection = null;
    logger.info('MongoDB disconnected');
  }
}

export function getMongoConnection(): typeof mongoose | null {
  return mongoConnection;
}

// Redis connection
export async function connectRedis(): Promise<Redis> {
  if (redisClient) {
    return redisClient;
  }

  const config = redisConfig();
  const redisUrl =
    nonEmptyEnv(config.urlEnv) ||
    nonEmpty(config.url) ||
    nonEmptyEnv('REDIS_URL') ||
    nonEmptyEnv('KV_URL') ||
    nonEmptyEnv('RENDER_REDIS_URL');
  const redisTls = nonEmptyEnv('REDIS_TLS')?.toLowerCase();
  const useTls = Boolean(
    config.tls || redisTls === 'true' || redisTls === '1' || redisUrl?.startsWith('rediss://')
  );

  logger.info(
    'Connecting to Redis...',
    redisUrl
      ? { url: 'configured', deployment: config.deployment, tls: useTls }
      : { host: config.host, port: config.port, deployment: config.deployment, tls: useTls }
  );

  const options: RedisOptions = {
    keyPrefix: config.keyPrefix,
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    maxRetriesPerRequest: 3,
    ...(useTls ? { tls: {} } : {}),
  };

  redisClient = redisUrl
    ? new Redis(redisUrl, options)
    : new Redis({
        host: config.host,
        port: config.port,
        password: config.password || undefined,
        db: config.db,
        ...options,
      });

  redisClient.on('connect', () => {
    logger.info('Redis connected successfully');
  });

  redisClient.on('error', (err) => {
    logger.error('Redis connection error:', err);
  });

  redisClient.on('close', () => {
    logger.warn('Redis connection closed');
  });

  return redisClient;
}

export async function disconnectRedis(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
    logger.info('Redis disconnected');
  }
}

export function getRedisClient(): Redis | null {
  return redisClient;
}

export interface StorageHealth {
  mongodb: boolean;
  redis: boolean;
}

// Health check
export async function checkStorageHealth(): Promise<StorageHealth> {
  let mongodbHealthy = false;
  let redisHealthy = false;

  // Check document storage engine.
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.db?.admin().ping();
      mongodbHealthy = true;
    }
  } catch (error) {
    logger.error('MongoDB health check failed:', error);
  }

  // Check messaging storage engine.
  try {
    if (redisClient) {
      const result = await redisClient.ping();
      redisHealthy = result === 'PONG';
    }
  } catch (error) {
    logger.error('Redis health check failed:', error);
  }

  return { mongodb: mongodbHealthy, redis: redisHealthy };
}

export const checkDatabasesHealth = checkStorageHealth;

// Initialize runtime storage connections.
export async function initializeDatabases(): Promise<void> {
  await connectMongoDB();
  await connectRedis();
  logger.info('All storage connections initialized');
}

// Disconnect runtime storage connections.
export async function closeDatabases(): Promise<void> {
  await disconnectMongoDB();
  await disconnectRedis();
  logger.info('All storage connections closed');
}
