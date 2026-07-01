// Test setup file
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Mock external services
jest.mock('../src/services/database', () => ({
  getRedisClient: jest.fn(() => ({
    xadd: jest.fn(),
    xrange: jest.fn(() => []),
    xlen: jest.fn(() => 0),
    xtrim: jest.fn(),
    del: jest.fn(),
    expire: jest.fn(),
    sadd: jest.fn(),
    smembers: jest.fn(() => []),
    exists: jest.fn(() => 1),
    ttl: jest.fn(() => 86400),
    keys: jest.fn(() => []),
    ping: jest.fn(() => 'PONG'),
  })),
  getMongoConnection: jest.fn(),
  connectMongoDB: jest.fn(),
  connectRedis: jest.fn(),
  disconnectMongoDB: jest.fn(),
  disconnectRedis: jest.fn(),
}));

// Set test timeout
jest.setTimeout(10000);
