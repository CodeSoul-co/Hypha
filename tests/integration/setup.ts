// Integration test setup — opposite of tests/setup.ts: no mocks, real Mongo + Redis.
// Loads .env so DEEPSEEK_API_KEY etc. are present, then bumps default timeouts.
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';
dotenv.config();

// Force test env. Production code only flips behaviour on NODE_ENV='production'
// (DevAuth seeding skips, dev token endpoint disables); 'test' keeps dev wiring.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'integration-test-jwt-secret';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'integration-test-refresh-secret';
process.env.HYPHA_FILESYSTEM_EXECUTION_ENABLED = 'true';

const runtimeRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-integration-runtime-'));
process.env.HYPHA_INTEGRATION_TEMP_ROOT = runtimeRoot;
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

jest.setTimeout(30000);
