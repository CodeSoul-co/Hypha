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
    jest.useRealTimers();
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
    const { getToolManager } = await import('../core/tools/ToolManager');
    const runtime = getEventRuntime();
    const toolManager = getToolManager();
    await toolManager.register({
      id: 'fixture.read',
      name: 'fixture.read',
      description: 'Read-only WorkCache integration fixture.',
      schema: {
        name: 'fixture.read',
        description: 'Read-only WorkCache integration fixture.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string' } },
          required: ['query'],
        },
      },
      governance: {
        sideEffectLevel: 'read',
        permissionScope: ['fixture.read'],
      },
      async execute() {
        return {
          success: true,
          output: {
            value: 'ok',
            validity: { sourceHashes: { query: 'query-hash' } },
          },
        };
      },
    });
    const handle = await runtime.startRun({
      userId: 'workcache-user',
      sessionId: 'workcache-session',
      input: { purpose: 'workcache-tool-tree-test' },
    });

    try {
      const result = await runtime.runGovernedToolResult({
        runId: handle.runId,
        stepId: 'tool-step',
        userId: 'workcache-user',
        sessionId: 'workcache-session',
        toolId: 'fixture.read',
        params: { query: 'hypha' },
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
    } finally {
      await toolManager.unregister('fixture.read');
    }
  });

  it('keeps event projection order stable when events share the same wall-clock tick', async () => {
    jest.useFakeTimers({ now: new Date('2026-07-04T00:00:00.000Z') });
    const { getEventRuntime } = await import('./EventRuntime');
    const runtime = getEventRuntime();
    const handle = await runtime.startRun({
      userId: 'workcache-user',
      sessionId: 'workcache-session',
      input: { purpose: 'event-order-test' },
    });

    await runtime.record(handle.runId, 'context.build.completed', { order: 1 }, 'order-1');
    await runtime.record(handle.runId, 'context.build.completed', { order: 2 }, 'order-2');

    const ordered = (await runtime.listEvents(handle.runId)).filter(
      (event) => event.type === 'context.build.completed'
    );
    expect(ordered.map((event) => event.stepId)).toEqual(['order-1', 'order-2']);
    expect(Date.parse(ordered[1].timestamp)).toBeGreaterThan(Date.parse(ordered[0].timestamp));
  });
});
