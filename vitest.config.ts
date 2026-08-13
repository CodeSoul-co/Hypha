import { configDefaults, defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@codesoul-co/hypha-core': path.resolve(__dirname, 'packages/core/src'),
      '@codesoul-co/hypha-storage': path.resolve(__dirname, 'packages/storage/src'),
      '@codesoul-co/hypha-fsm': path.resolve(__dirname, 'packages/fsm/src'),
      '@codesoul-co/hypha-kernel': path.resolve(__dirname, 'packages/kernel/src'),
      '@codesoul-co/hypha-harness': path.resolve(__dirname, 'packages/harness/src'),
      '@codesoul-co/hypha-models': path.resolve(__dirname, 'packages/models/src'),
      '@codesoul-co/hypha-serving-cache': path.resolve(__dirname, 'packages/serving-cache/src'),
      '@codesoul-co/hypha-workcache': path.resolve(__dirname, 'packages/workcache/src'),
      '@codesoul-co/hypha-memory': path.resolve(__dirname, 'packages/memory/src'),
      '@codesoul-co/hypha-tools': path.resolve(__dirname, 'packages/tools/src'),
      '@codesoul-co/hypha-mcp': path.resolve(__dirname, 'packages/mcp/src'),
      '@codesoul-co/hypha-skills': path.resolve(__dirname, 'packages/skills/src'),
      '@codesoul-co/hypha-domain': path.resolve(__dirname, 'packages/domain/src'),
      '@codesoul-co/hypha-inference': path.resolve(__dirname, 'packages/inference/src'),
      '@codesoul-co/hypha-adapters-local': path.resolve(__dirname, 'packages/adapters-local/src'),
      '@codesoul-co/hypha-testing': path.resolve(__dirname, 'packages/testing/src'),
    },
  },
  test: {
    include: ['packages/**/*.test.ts'],
    // External provider suites have their own required, zero-skip release gates.
    // Keeping them out of the deterministic package-contract project prevents
    // a missing Docker daemon or credential from being reported as a skipped
    // package contract (or from running a top-level fixture hook by accident).
    exclude: [...configDefaults.exclude, '**/*.real.test.ts'],
    environment: 'node',
    // Real local transports and native-store setup can cross the 5s Vitest default on Node 18.
    testTimeout: 10_000,
  },
});
