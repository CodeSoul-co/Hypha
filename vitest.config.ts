import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@hypha/core': path.resolve(__dirname, 'packages/core/src'),
      '@hypha/fsm': path.resolve(__dirname, 'packages/fsm/src'),
      '@hypha/kernel': path.resolve(__dirname, 'packages/kernel/src'),
      '@hypha/harness': path.resolve(__dirname, 'packages/harness/src'),
      '@hypha/models': path.resolve(__dirname, 'packages/models/src'),
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
    include: ['packages/**/*.test.ts'],
    environment: 'node',
  },
});
