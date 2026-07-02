import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import {
  GovernedToolRunner,
  ToolRegistry,
  toolSpecDefinition,
  toolSpecJsonSchemas,
  validateToolSpec,
} from './index';

describe('@hypha/tools governed runner', () => {
  it('records policy and denies high-risk side effects by default', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'delete-file',
        version: '0.0.0',
        description: 'Deletes a file',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'irreversible',
      },
      async () => ({ ok: true })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    const result = await runner.run({
      toolId: 'delete-file',
      input: { path: '/tmp/example' },
      context: { runId: 'run_1', stepId: 'step_1' },
    });

    expect(result.status).toBe('denied');
    await expect(trace.list({ runId: 'run_1' })).resolves.toHaveLength(3);
    await expect(trace.list({ runId: 'run_1' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.call.rejected' }),
      ])
    );
  });

  it('validates tool input before handler execution', async () => {
    const registry = new ToolRegistry();
    let called = false;
    registry.register(
      {
        id: 'requires-path',
        version: '0.0.0',
        description: 'Requires path',
        inputSchema: { type: 'object', required: ['path'] },
        sideEffectLevel: 'read',
      },
      async () => {
        called = true;
        return { ok: true };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    const result = await runner.run({
      toolId: 'requires-path',
      input: {},
      context: { runId: 'run_2', stepId: 'step_1' },
    });

    expect(result.status).toBe('failed');
    expect(called).toBe(false);
    await expect(trace.list({ runId: 'run_2' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.call.failed' }),
      ])
    );
  });

  it('records MCP calls through the same governed runner', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'mcp.search',
        version: '0.0.0',
        description: 'MCP search',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        source: 'mcp',
        sourceRef: { serverId: 'mcp_1', capabilityId: 'search' },
      },
      async () => ({ ok: true })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'mcp.search',
        input: { q: 'hypha' },
        context: { runId: 'run_3', stepId: 'step_1' },
      })
    ).resolves.toMatchObject({ status: 'completed' });

    await expect(trace.list({ runId: 'run_3' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'mcp.call.started' }),
        expect.objectContaining({ type: 'mcp.call.completed' }),
        expect.objectContaining({ type: 'tool.call.completed' }),
      ])
    );
  });

  it('retries failed tool attempts according to retry policy', async () => {
    const registry = new ToolRegistry();
    let attempts = 0;
    registry.register(
      {
        id: 'flaky',
        version: '0.0.0',
        description: 'Fails once',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        retryPolicy: { maxAttempts: 2 },
      },
      async () => {
        attempts += 1;
        if (attempts === 1) {
          throw new Error('temporary failure');
        }
        return { attempts };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'flaky',
        input: {},
        context: { runId: 'run_4', stepId: 'step_1' },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { attempts: 2 } });

    await expect(trace.list({ runId: 'run_4' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.call.retrying' }),
        expect.objectContaining({ type: 'tool.call.completed' }),
      ])
    );
  });

  it('times out tools and can route timeout to human review', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'slow',
        version: '0.0.0',
        description: 'Never resolves',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        timeoutPolicy: { timeoutMs: 1, onTimeout: 'human_review' },
      },
      async () => new Promise((resolve) => setTimeout(() => resolve({ late: true }), 50))
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'slow',
        input: {},
        context: { runId: 'run_5', stepId: 'step_1' },
      })
    ).resolves.toMatchObject({ status: 'human_review_required' });

    await expect(trace.list({ runId: 'run_5' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.call.timeout' }),
        expect.objectContaining({ type: 'human.review.requested' }),
      ])
    );
  });

  it('exports Stage1 ToolSpec schema and minimal example', () => {
    expect(validateToolSpec(toolSpecDefinition.example).id).toBe('tool.search');
    expect(toolSpecJsonSchemas.ToolSpec.required).toContain('sideEffectLevel');
  });
});
