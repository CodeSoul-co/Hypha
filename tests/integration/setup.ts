// Integration test setup — opposite of tests/setup.ts: no mocks, real Mongo + Redis.
// Loads .env so DEEPSEEK_API_KEY etc. are present, then bumps default timeouts.
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

// Force test env. Production code only flips behaviour on NODE_ENV='production'
// (DevAuth seeding skips, dev token endpoint disables); 'test' keeps dev wiring.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'integration-test-jwt-secret';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'integration-test-refresh-secret';
process.env.HYPHA_SKILLS_DIR =
  process.env.HYPHA_SKILLS_DIR || path.resolve(process.cwd(), 'tmp/integration-skills');

jest.setTimeout(30000);
