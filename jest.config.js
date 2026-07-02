/** @type {import('jest').Config} */
const sharedAliases = {
  '^@/(.*)$': '<rootDir>/apps/server/src/$1',
  '^@core/(.*)$': '<rootDir>/apps/server/src/core/$1',
  '^@config/(.*)$': '<rootDir>/apps/server/src/config/$1',
  '^@routes/(.*)$': '<rootDir>/apps/server/src/routes/$1',
  '^@models/(.*)$': '<rootDir>/apps/server/src/models/$1',
  '^@middleware/(.*)$': '<rootDir>/apps/server/src/middleware/$1',
  '^@services/(.*)$': '<rootDir>/apps/server/src/services/$1',
  '^@utils/(.*)$': '<rootDir>/apps/server/src/utils/$1',
  '^@types/(.*)$': '<rootDir>/apps/server/src/types/$1',
  '^@constants/(.*)$': '<rootDir>/apps/server/src/constants/$1',
};

// ts-jest transforms .ts. The MCP SDK ships as ESM; let ts-jest also process
// its .js so `import {...}` parses inside Jest's CJS runtime.
const transform = {
  '^.+\\.(t|j)sx?$': [
    'ts-jest',
    { tsconfig: '<rootDir>/tsconfig.jest.json' },
  ],
};
const transformIgnorePatterns = ['/node_modules/(?!@modelcontextprotocol)/'];

module.exports = {
  // Run unit + integration as separate Jest projects so they can have
  // different setup files (unit mocks the DB layer; integration hits real
  // Mongo + Redis on localhost).
  projects: [
    {
      displayName: 'unit',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/apps/server/src/**/*.test.ts', '<rootDir>/tests/unit/**/*.test.ts'],
      moduleNameMapper: sharedAliases,
      setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
      transform,
      transformIgnorePatterns,
    },
    {
      displayName: 'integration',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
      moduleNameMapper: sharedAliases,
      setupFilesAfterEnv: ['<rootDir>/tests/integration/setup.ts'],
      transform,
      transformIgnorePatterns,
    },
  ],
  // testTimeout lives in each project's setup file via jest.setTimeout().
  collectCoverageFrom: [
    'apps/**/*.ts',
    'packages/**/*.ts',
    '!apps/**/*.d.ts',
    '!packages/**/*.d.ts',
    '!**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
