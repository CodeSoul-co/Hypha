import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import {
  GovernedToolRunner,
  MockToolRunner,
  ToolRegistry,
  predefinedToolExamples,
  predefinedToolSpecs,
  toolSpecDefinition,
  toolSpecJsonSchemas,
  validateToolInput,
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
        expect.objectContaining({
          type: 'tool.call.rejected',
          payload: expect.objectContaining({
            source: 'local',
            sideEffectLevel: 'irreversible',
          }),
        }),
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
      expect.arrayContaining([expect.objectContaining({ type: 'tool.call.failed' })])
    );
  });

  it('validates nested JSON schema fields before handler execution', async () => {
    const registry = new ToolRegistry();
    let called = false;
    registry.register(
      {
        id: 'structured-search',
        version: '0.0.0',
        description: 'Requires nested search options',
        inputSchema: {
          type: 'object',
          required: ['query', 'filters'],
          additionalProperties: false,
          properties: {
            query: { type: 'string', minLength: 2 },
            filters: {
              type: 'object',
              required: ['limit'],
              additionalProperties: false,
              properties: {
                limit: { type: 'integer', minimum: 1, maximum: 10 },
                tags: { type: 'array', items: { type: 'string' } },
              },
            },
          },
        },
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
      toolId: 'structured-search',
      input: {
        query: 'h',
        filters: { limit: 0, tags: ['ok', 1], extra: true },
        unexpected: true,
      },
      context: { runId: 'run_nested_schema', stepId: 'step_1' },
    });

    expect(result.status).toBe('failed');
    expect(called).toBe(false);
    expect(String(result.error)).toContain('$.query');
    expect(String(result.error)).toContain('$.filters.limit');
    expect(String(result.error)).toContain('$.filters.tags[1]');
    expect(String(result.error)).toContain('$.filters.extra');
    expect(String(result.error)).toContain('$.unexpected');
  });

  it('exposes reusable tool input validation results', () => {
    expect(
      validateToolInput(
        {
          type: 'object',
          required: ['mode'],
          properties: { mode: { enum: ['fast', 'safe'] } },
        },
        { mode: 'unsafe' }
      )
    ).toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ path: '$.mode' })],
    });
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
        expect.objectContaining({
          type: 'tool.call.started',
          payload: expect.objectContaining({
            source: 'mcp',
            sourceRef: { serverId: 'mcp_1', capabilityId: 'search' },
          }),
        }),
        expect.objectContaining({
          type: 'tool.call.completed',
          payload: expect.objectContaining({ source: 'mcp' }),
        }),
      ])
    );
  });

  it('returns a human review stub result before executing tools that require approval', async () => {
    const registry = new ToolRegistry();
    let called = false;
    registry.register(
      {
        id: 'approval-tool',
        version: '0.0.0',
        description: 'Requires approval',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        humanApprovalPolicy: { required: true, reason: 'owner approval required' },
      },
      async () => {
        called = true;
        return { ok: true };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'approval-tool',
        input: { value: 1 },
        context: { runId: 'run_human_approval', stepId: 'step_1' },
      })
    ).resolves.toMatchObject({
      status: 'human_review_required',
      error: 'owner approval required',
    });
    expect(called).toBe(false);
    await expect(trace.list({ runId: 'run_human_approval' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'human.review.requested',
          payload: expect.objectContaining({
            source: 'local',
            reason: 'owner approval required',
          }),
        }),
      ])
    );
  });

  it('validates tool output schema before recording completion', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'bad-output',
        version: '0.0.0',
        description: 'Returns invalid output',
        inputSchema: { type: 'object' },
        outputSchema: {
          type: 'object',
          required: ['answer'],
          properties: { answer: { type: 'string' } },
        },
        sideEffectLevel: 'read',
      },
      async () => ({ answer: 1 })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'bad-output',
        input: {},
        context: { runId: 'run_output_schema', stepId: 'step_1' },
      })
    ).resolves.toMatchObject({
      status: 'failed',
    });

    const events = await trace.list({ runId: 'run_output_schema' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'tool.call.failed',
          payload: expect.objectContaining({
            phase: 'output_validation',
          }),
        }),
      ])
    );
    expect(events).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ type: 'tool.call.completed' })])
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

  it('exports executable predefined tool examples', async () => {
    const registry = new ToolRegistry();
    for (const spec of predefinedToolSpecs) {
      expect(validateToolSpec(spec).id).toBe(spec.id);
      registry.register(spec, async (input) => ({
        query: (input as { query: string }).query,
        count: 1,
        provider: 'stub',
        items: [
          {
            title: 'Hypha fixture',
            url: 'https://example.com/hypha',
            snippet: 'Predefined tool example fixture.',
            source: 'test.fixture',
          },
        ],
      }));
    }

    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);
    for (const example of predefinedToolExamples) {
      const spec = registry.getSpec(example.toolSpecId);
      expect(spec).toBeTruthy();
      expect(validateToolInput(spec!.inputSchema, example.input)).toMatchObject({ valid: true });
      await expect(
        runner.run({
          toolId: example.toolSpecId,
          input: example.input,
          context: { runId: `run_${example.id}`, stepId: 'tool.example' },
        })
      ).resolves.toMatchObject({
        status: 'completed',
        output: {
          provider: 'stub',
          count: 1,
        },
      });
    }
  });

  it('provides a mock ToolRunner for package-level runtime tests', async () => {
    const runner = new MockToolRunner();
    runner.registerResult('tool.mock', {
      toolId: 'tool.mock',
      status: 'completed',
      output: { ok: true },
    });

    await expect(
      runner.run({
        toolId: 'tool.mock',
        input: { value: 1 },
        context: { runId: 'run_mock', stepId: 'step_mock' },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: { ok: true },
    });

    await expect(
      runner.run({
        toolId: 'tool.echo',
        input: { value: 2 },
        context: { runId: 'run_mock', stepId: 'step_echo' },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: {
        toolId: 'tool.echo',
        input: { value: 2 },
      },
    });
  });
});
