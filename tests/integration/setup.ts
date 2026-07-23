// Integration test setup — opposite of tests/setup.ts: no mocks, real Mongo + Redis.
// Loads .env so DEEPSEEK_API_KEY etc. are present, then bumps default timeouts.
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';
dotenv.config();

// Runtime acceptance must never inherit local SQLite Events, checkpoints,
// queues, governed Tool receipts, or installed Skills from another run.
const integrationStateRoot =
  process.env.HYPHA_INTEGRATION_STATE_ROOT ??
  fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-integration-state-'));
const ownsIntegrationStateRoot = process.env.HYPHA_INTEGRATION_STATE_ROOT === undefined;
const isolatedPath = (name: string): string => path.join(integrationStateRoot, name);
Object.assign(process.env, {
  HYPHA_STORAGE_EVENT_DB: isolatedPath('legacy.sqlite'),
  HYPHA_RUNTIME_EVENT_DB: isolatedPath('legacy.sqlite'),
  HYPHA_CANONICAL_RUNTIME_DB: isolatedPath('canonical.sqlite'),
  HYPHA_STORAGE_STRUCTURED_DB: isolatedPath('structured.sqlite'),
  HYPHA_STORAGE_ARTIFACT_ROOT: isolatedPath('storage-artifacts'),
  HYPHA_TOOL_RUNTIME_STORE: isolatedPath('tools.json'),
  HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT: isolatedPath('tool-snapshots'),
  HYPHA_TOOL_ARTIFACT_ROOT: isolatedPath('tool-artifacts'),
  HYPHA_TOOL_OBSERVATION_ROOT: isolatedPath('tool-observations'),
  HYPHA_SESSION_COMMAND_ARTIFACT_ROOT: isolatedPath('session-command-artifacts'),
  HYPHA_MCP_CATALOG_STORE: isolatedPath('mcp-catalog.json'),
  HYPHA_SKILL_DATA_ROOT: isolatedPath('skills'),
  HYPHA_SYSTEM_LOG_PATH: isolatedPath('hypha.log'),
});

// Force test env. Production code only flips behaviour on NODE_ENV='production'
// (DevAuth seeding skips, dev token endpoint disables); 'test' keeps dev wiring.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'integration-test-jwt-secret';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'integration-test-refresh-secret';
process.env.HYPHA_FILESYSTEM_EXECUTION_ENABLED = 'true';

process.once('exit', () => {
  if (ownsIntegrationStateRoot) {
    fs.rmSync(integrationStateRoot, { recursive: true, force: true });
  }
});

jest.setTimeout(30000);
