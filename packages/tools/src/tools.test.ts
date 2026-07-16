import { describe, expect, it } from 'vitest';
import { InMemoryEventStore } from '@hypha/core';
import {
  GovernedToolRunner,
  InMemoryToolApprovalStore,
  MockToolRunner,
  ToolRegistry,
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
    expect(result.error).toMatchObject({
      code: 'TOOL_INPUT_INVALID',
      phase: 'input_validation',
      message: expect.stringContaining('$.query'),
    });
    const message = typeof result.error === 'string' ? result.error : result.error?.message;
    expect(message).toContain('$.filters.limit');
    expect(message).toContain('$.filters.tags[1]');
    expect(message).toContain('$.filters.extra');
    expect(message).toContain('$.unexpected');
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
      error: {
        code: 'TOOL_APPROVAL_REQUIRED',
        message: 'owner approval required',
        phase: 'approval',
      },
    });
    expect(called).toBe(false);
    await expect(trace.list({ runId: 'run_human_approval' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'human.review.requested',
          payload: expect.objectContaining({
            source: 'local',
            approvalRequest: expect.objectContaining({
              reason: 'owner approval required',
            }),
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
            error: expect.objectContaining({
              code: 'TOOL_OUTPUT_INVALID',
              phase: 'output_validation',
            }),
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

  it('rejects tools outside the current execution scope before handler execution', async () => {
    const registry = new ToolRegistry();
    let called = false;
    registry.register(
      {
        id: 'tool.allowed-elsewhere',
        version: '0.0.0',
        description: 'Scoped tool',
        inputSchema: { type: 'object' },
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
      toolId: 'tool.allowed-elsewhere',
      input: {},
      context: {
        runId: 'run_scope',
        stepId: 'step_scope',
        fsmState: 'Review',
        executionScope: {
          fsmState: 'Review',
          allowedToolIds: ['tool.review-only'],
        },
      },
    });

    expect(result).toMatchObject({
      status: 'denied',
      error: {
        code: 'TOOL_NOT_ALLOWED_IN_SCOPE',
        phase: 'authorization',
      },
    });
    expect(called).toBe(false);
  });

  it('resumes an approved write invocation and executes it only once', async () => {
    const registry = new ToolRegistry();
    const approvalStore = new InMemoryToolApprovalStore();
    let calls = 0;
    registry.register(
      {
        id: 'tool.approved-write',
        version: '0.0.0',
        description: 'Approved write',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        humanApprovalPolicy: { required: true, reason: 'confirm write' },
      },
      async () => {
        calls += 1;
        return { calls };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace, undefined, {
      approvalStore,
      now: () => '2026-07-15T00:00:00.000Z',
    });
    const request = {
      toolId: 'tool.approved-write',
      input: { value: 1 },
      context: {
        runId: 'run_approval_resume',
        stepId: 'step_write',
        invocationId: 'invocation_write_1',
      },
    };

    await expect(runner.run(request)).resolves.toMatchObject({
      status: 'human_review_required',
      invocationId: 'invocation_write_1',
    });
    expect(calls).toBe(0);

    await approvalStore.approve('invocation_write_1', 'owner', {
      approvedAt: '2026-07-15T00:00:00.000Z',
    });
    await expect(runner.run(request)).resolves.toMatchObject({
      status: 'completed',
      output: { calls: 1 },
    });
    await expect(runner.run(request)).resolves.toMatchObject({
      status: 'completed',
      output: { calls: 1 },
    });
    expect(calls).toBe(1);

    await expect(trace.list({ runId: 'run_approval_resume' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'human.review.requested' }),
        expect.objectContaining({ type: 'human.review.approved' }),
        expect.objectContaining({ type: 'human.review.resolved' }),
        expect.objectContaining({ type: 'tool.call.completed' }),
      ])
    );
  });

  it('honors audit inclusion and redaction policies', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.audit',
        version: '0.0.0',
        description: 'Audited tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        auditPolicy: {
          enabled: true,
          includeInput: true,
          includeOutput: true,
          redactPaths: ['secret', 'output.token'],
        },
      },
      async () => ({ token: 'output-secret', visible: true })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await runner.run({
      toolId: 'tool.audit',
      input: { secret: 'input-secret', visible: true },
      context: {
        runId: 'run_audit',
        stepId: 'step_audit',
        invocationId: 'invocation_audit',
      },
    });

    const events = await trace.list({ runId: 'run_audit' });
    expect(events.find((event) => event.type === 'tool.call.requested')?.payload).toMatchObject({
      input: { secret: '[REDACTED]', visible: true },
    });
    expect(events.find((event) => event.type === 'tool.call.completed')?.payload).toMatchObject({
      output: { token: '[REDACTED]', visible: true },
    });
  });

  it('rejects duplicate registrations unless replacement is explicit', () => {
    const registry = new ToolRegistry();
    const spec = {
      id: 'tool.duplicate',
      version: '0.0.0',
      description: 'Duplicate tool',
      inputSchema: { type: 'object' },
      sideEffectLevel: 'read' as const,
    };
    registry.register(spec, async () => ({ version: 1 }));

    expect(() => registry.register(spec, async () => ({ version: 2 }))).toThrow(
      'Tool already registered: tool.duplicate'
    );
    expect(() =>
      registry.register(spec, async () => ({ version: 2 }), { replace: true })
    ).not.toThrow();
  });
  it('exports Stage1 ToolSpec schema and minimal example', () => {
    expect(validateToolSpec(toolSpecDefinition.example).id).toBe('tool.search');
    expect(toolSpecJsonSchemas.ToolSpec.required).toContain('sideEffectLevel');
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
