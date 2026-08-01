import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

const acceptanceSuites = {
  postgres: ['packages/adapters-local/src/postgres-execution-store.real.test.ts'],
  s3: ['packages/adapters-local/src/s3-execution-artifact-store.real.test.ts'],
  docker: [
    'packages/adapters-local/src/docker-container-cleanup.real.test.ts',
    'packages/adapters-local/src/docker-execution-coordinator.real.test.ts',
    'packages/adapters-local/src/docker-sandbox-provider.real.test.ts',
  ],
  'docker-restart': ['packages/adapters-local/src/docker-daemon-restart-recovery.real.test.ts'],
  remote: ['packages/adapters-local/src/remote-sandbox-provider.real.test.ts'],
} as const;

const suite = process.env.HYPHA_EXECUTION_ACCEPTANCE_SUITE;
if (!suite || !Object.hasOwn(acceptanceSuites, suite)) {
  throw new Error(
    `HYPHA_EXECUTION_ACCEPTANCE_SUITE must be one of: ${Object.keys(acceptanceSuites).join(', ')}`
  );
}

export default defineConfig({
  resolve: {
    alias: {
      '@hypha/core': path.resolve(__dirname, 'packages/core/src'),
      '@hypha/storage': path.resolve(__dirname, 'packages/storage/src'),
      '@hypha/fsm': path.resolve(__dirname, 'packages/fsm/src'),
      '@hypha/kernel': path.resolve(__dirname, 'packages/kernel/src'),
      '@hypha/harness': path.resolve(__dirname, 'packages/harness/src'),
      '@hypha/models': path.resolve(__dirname, 'packages/models/src'),
      '@hypha/serving-cache': path.resolve(__dirname, 'packages/serving-cache/src'),
      '@hypha/memory': path.resolve(__dirname, 'packages/memory/src'),
      '@hypha/tools': path.resolve(__dirname, 'packages/tools/src'),
      '@hypha/mcp': path.resolve(__dirname, 'packages/mcp/src'),
      '@hypha/skills': path.resolve(__dirname, 'packages/skills/src'),
      '@hypha/domain': path.resolve(__dirname, 'packages/domain/src'),
      '@hypha/inference': path.resolve(__dirname, 'packages/inference/src'),
      '@hypha/adapters-local': path.resolve(__dirname, 'packages/adapters-local/src'),
      '@hypha/testing': path.resolve(__dirname, 'packages/testing/src'),
    },
  },
  test: {
    include: acceptanceSuites[suite as keyof typeof acceptanceSuites],
    exclude: configDefaults.exclude,
    environment: 'node',
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 120_000,
    hookTimeout: 120_000,
  },
});
