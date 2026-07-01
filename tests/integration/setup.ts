// Integration test setup — opposite of tests/setup.ts: no mocks, real Mongo + Redis.
// Loads .env so DEEPSEEK_API_KEY etc. are present, then bumps default timeouts.
import dotenv from 'dotenv';
dotenv.config();

// Force test env. Production code only flips behaviour on NODE_ENV='production'
// (DevAuth seeding skips, dev token endpoint disables); 'test' keeps dev wiring.
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

jest.setTimeout(30000);
