/** @type {import('jest').Config} */
const sharedAliases = {
  '^@/(.*)$': '<rootDir>/src/$1',
  '^@core/(.*)$': '<rootDir>/src/core/$1',
  '^@config/(.*)$': '<rootDir>/src/config/$1',
  '^@routes/(.*)$': '<rootDir>/src/routes/$1',
  '^@models/(.*)$': '<rootDir>/src/models/$1',
  '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
  '^@services/(.*)$': '<rootDir>/src/services/$1',
  '^@utils/(.*)$': '<rootDir>/src/utils/$1',
  '^@types/(.*)$': '<rootDir>/src/types/$1',
  '^@constants/(.*)$': '<rootDir>/src/constants/$1',
};

// ts-jest transforms .ts. The MCP SDK ships as ESM; let ts-jest also process
// its .js so `import {...}` parses inside Jest's CJS runtime.
const transform = { '^.+\\.(t|j)sx?$': ['ts-jest', { isolatedModules: true }] };
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
      testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/unit/**/*.test.ts'],
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
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
