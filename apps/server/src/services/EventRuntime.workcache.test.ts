import fs from 'fs';
import os from 'os';
import path from 'path';

const trackedEnv = [
  'HYPHA_RUNTIME_EVENT_DB',
  'HYPHA_WORKCACHE',
  'HYPHA_WORKCACHE_SQLITE_PATH',
  'HYPHA_SERVING_CACHE',
] as const;

describe('EventRuntime WorkCache integration', () => {
  const originalEnv: Partial<Record<(typeof trackedEnv)[number], string>> = {};
  let tempDir = '';

  beforeEach(() => {
    jest.resetModules();
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-workcache-'));
    for (const key of trackedEnv) {
      originalEnv[key] = process.env[key];
      delete process.env[key];
    }
    process.env.HYPHA_RUNTIME_EVENT_DB = path.join(tempDir, 'events.sqlite');
    process.env.HYPHA_WORKCACHE = 'memory';
    process.env.HYPHA_SERVING_CACHE = 'off';
  });

  afterEach(() => {
    for (const key of trackedEnv) {
      const value = originalEnv[key];
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
    jest.resetModules();
  });

  it('derives ToolTree blocks from governed read-only tool completion events', async () => {
    const { getEventRuntime } = await import('./EventRuntime');
    const runtime = getEventRuntime();
    const handle = await runtime.startRun({
      userId: 'workcache-user',
      sessionId: 'workcache-session',
      input: { purpose: 'workcache-tool-tree-test' },
    });

    const result = await runtime.runGovernedToolResult({
      runId: handle.runId,
      stepId: 'tool-step',
      userId: 'workcache-user',
      sessionId: 'workcache-session',
      toolId: 'fixture.read',
      toolSpec: {
        sideEffectLevel: 'read',
        permissionScope: ['fixture.read'],
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string' } },
          required: ['query'],
        },
      },
      params: { query: 'hypha' },
      handler: async () => ({
        value: 'ok',
        validity: { sourceHashes: { query: 'query-hash' } },
      }),
    });

    expect(result.status).toBe('completed');
    const events = await runtime.listEvents(handle.runId);
    const sourceIndex = events.findIndex((event) => event.type === 'tool.call.completed');
    const workCacheIndex = events.findIndex((event) => {
      const payload = event.payload as Record<string, unknown>;
      return event.type === 'workcache.write' && payload.treeType === 'ToolTree';
    });
    expect(sourceIndex).toBeGreaterThanOrEqual(0);
    expect(workCacheIndex).toBeGreaterThan(sourceIndex);
    expect(events[workCacheIndex]?.payload).toMatchObject({
      sourceEventType: 'tool.call.completed',
      treeType: 'ToolTree',
    });
  });
});
