// Integration test setup — opposite of tests/setup.ts: no mocks, real Mongo + Redis.
// Loads .env so DEEPSEEK_API_KEY etc. are present, then bumps default timeouts.
import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
dotenv.config();

// These suites validate runtime wiring without making paid model calls. Keep
// readiness deterministic even when a developer's local `.env` has API keys.
process.env.OPENAI_API_KEY = '';
process.env.ANTHROPIC_API_KEY = '';
process.env.GOOGLE_API_KEY = '';
process.env.DEEPSEEK_API_KEY = '';

// Force test env. Production code only flips behaviour on NODE_ENV='production'
// (DevAuth seeding skips, dev token endpoint disables); 'test' keeps dev wiring.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'integration-test-jwt-secret';
process.env.JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || 'integration-test-refresh-secret';
process.env.HYPHA_FILESYSTEM_EXECUTION_ENABLED = 'true';

// `.env` intentionally permits empty managed-service URLs so the Server can
// compose local host/port settings. The real-store integration suites consume
// URLs directly. Isolate the application and direct-store suites from local
// development data and from stale streams left by an interrupted test process.
const integrationDatabase =
  process.env.HYPHA_TEST_MONGODB_DATABASE || `hypha_integration_${process.pid}`;
const integrationWorkspace =
  process.env.HYPHA_TEST_FILESYSTEM_ROOT ||
  path.join(os.tmpdir(), `hypha-integration-${process.pid}-workspace`);
process.env.MONGODB_DATABASE = integrationDatabase;
process.env.REDIS_KEY_PREFIX =
  process.env.HYPHA_TEST_REDIS_KEY_PREFIX || `hypha:integration:${process.pid}:`;
const integrationEventDatabase =
  process.env.HYPHA_TEST_RUNTIME_EVENT_DB ||
  path.join(os.tmpdir(), `hypha-integration-${process.pid}-runtime-events.sqlite`);
process.env.HYPHA_RUNTIME_EVENT_DB = integrationEventDatabase;
process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT =
  process.env.HYPHA_TEST_TOOL_CONTRACT_SNAPSHOT_ROOT ||
  `${integrationEventDatabase}.tool-snapshots`;
process.env.HYPHA_MCP_CATALOG_STORE =
  process.env.HYPHA_TEST_MCP_CATALOG_STORE ||
  path.join(os.tmpdir(), `hypha-integration-${process.pid}-mcp-catalog.json`);
process.env.HYPHA_FILESYSTEM_WORKING_DIRECTORY = integrationWorkspace;
process.env.HYPHA_FILESYSTEM_READ_PATHS = integrationWorkspace;
process.env.HYPHA_FILESYSTEM_WRITE_PATHS = integrationWorkspace;
process.env.HYPHA_FILESYSTEM_EXECUTE_PATHS = path.join(integrationWorkspace, 'bin');
process.env.HYPHA_TEST_MONGODB_URI =
  process.env.HYPHA_TEST_MONGODB_URI || `mongodb://127.0.0.1:27017/${integrationDatabase}`;
process.env.HYPHA_TEST_REDIS_URL = process.env.HYPHA_TEST_REDIS_URL || 'redis://127.0.0.1:6379';

// Full application composition includes durable recovery sweeps. Keep the
// budget above the observed cold-start time while retaining a finite bound.
jest.setTimeout(120000);
