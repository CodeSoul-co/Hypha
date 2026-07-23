// Test setup file
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';

// Load test environment variables
dotenv.config({ path: '.env.test' });

const runtimeRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-unit-runtime-'));
process.env.HYPHA_RUNTIME_EVENT_DB = path.join(runtimeRoot, 'legacy.sqlite');
process.env.HYPHA_CANONICAL_RUNTIME_DB = path.join(runtimeRoot, 'canonical.sqlite');
process.env.HYPHA_TOOL_RUNTIME_STORE = path.join(runtimeRoot, 'tools.json');
process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT = path.join(runtimeRoot, 'tool-snapshots');
process.env.HYPHA_TOOL_ARTIFACT_ROOT = path.join(runtimeRoot, 'tool-artifacts');
process.env.HYPHA_TOOL_OBSERVATION_ROOT = path.join(runtimeRoot, 'tool-observations');
process.env.HYPHA_SKILL_DATA_ROOT = path.join(runtimeRoot, 'skills');
process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT = path.join(
  runtimeRoot,
  'session-command-artifacts'
);

// Mock external services
jest.mock('../apps/server/src/services/database', () => ({
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
