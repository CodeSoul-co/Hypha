import { describe, expect, it } from 'vitest';
import { createHash } from 'crypto';
import { InMemoryEventStore, InMemoryTelemetryRecorder } from '@hypha/core';
import {
  GovernedToolRunner,
  HttpToolAdapter,
  InMemoryToolApprovalStore,
  InMemoryToolInvocationStore,
  InMemoryToolResultCache,
  LocalFunctionToolAdapter,
  MCPToolAdapter,
  MockToolAdapter,
  PluginToolAdapter,
  MockToolRunner,
  ToolRegistry,
  governedToolContractDefinition,
  governedToolContractJsonSchemas,
  governedHumanApprovalDefinition,
  governedToolInvocationDefinition,
  toolContractSnapshotDefinition,
  toolEventPayloadBaseDefinition,
  createOcrToolSpec,
  createVideoSourceToolSpec,
  ocrRequestSchema,
  videoSourceRequestSchema,
  hashToolContract,
  toolSpecDefinition,
  toolSpecJsonSchemas,
  validateToolInput,
  validateToolSpec,
} from './index';

describe('@hypha/tools governed runner', () => {
  it('provides one executable Adapter contract for local, plugin, mock, HTTP, and MCP tools', async () => {
    const local = new LocalFunctionToolAdapter('adapter.local', async (input) => ({ input }));
    const plugin = new PluginToolAdapter('adapter.plugin', async () => ({ plugin: true }));
    const mock = new MockToolAdapter('adapter.mock', async () => ({ mock: true }));
    const httpCalls: Array<{ url: string; init?: RequestInit }> = [];
    const http = new HttpToolAdapter('adapter.http', {
      endpoint: 'https://tools.example/invoke',
      fetch: (async (url: string | URL | Request, init?: RequestInit) => {
        httpCalls.push({ url: String(url), init });
        return new Response(JSON.stringify({ http: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      }) as typeof fetch,
    });
    const mcpCalls: unknown[] = [];
    const mcp = new MCPToolAdapter('adapter.mcp', 'server-a', 'search', {
      async invoke(request) {
        mcpCalls.push(request);
        return { mcp: true };
      },
      async health() {
        return { status: 'healthy', checkedAt: '2026-07-16T00:00:00.000Z' };
      },
    });
    const context = { runId: 'run_adapters', stepId: 'adapter-contract' };

    await expect(
      local.execute({ toolId: 'local', input: { value: 1 }, context })
    ).resolves.toMatchObject({
      output: { input: { value: 1 } },
    });
    await expect(plugin.execute({ toolId: 'plugin', input: {}, context })).resolves.toMatchObject({
      output: { plugin: true },
    });
    await expect(mock.execute({ toolId: 'mock', input: {}, context })).resolves.toMatchObject({
      output: { mock: true },
    });
    await expect(
      http.execute({ toolId: 'http', input: { query: 'hypha' }, context })
    ).resolves.toMatchObject({
      output: { http: true },
    });
    await expect(
      mcp.execute({ toolId: 'mcp.server-a.search', input: { query: 'hypha' }, context })
    ).resolves.toMatchObject({
      output: { mcp: true },
    });
    expect(httpCalls).toHaveLength(1);
    expect(mcpCalls).toEqual([
      expect.objectContaining({ serverId: 'server-a', capabilityId: 'search' }),
    ]);
    await expect(
      Promise.all([local, plugin, mock, http, mcp].map((adapter) => adapter.capabilities()))
    ).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ execute: true, health: true })])
    );
  });

  it('exports generic OCR and video-source contracts without business provider fields', () => {
    expect(
      ocrRequestSchema.parse({
        source: {
          type: 'artifact',
          artifactRef: 'artifact:document-1',
          mimeType: 'application/pdf',
        },
        features: ['text', 'layout'],
      })
    ).toMatchObject({ source: { type: 'artifact' } });
    expect(
      videoSourceRequestSchema.parse({
        url: 'https://video.example/course/1',
        includeEpisodes: true,
      })
    ).toMatchObject({ includeEpisodes: true });
    expect(createOcrToolSpec()).toMatchObject({
      id: 'tool.media.ocr',
      permissionScope: ['media.ocr.read'],
      sideEffectLevel: 'read',
    });
    expect(createVideoSourceToolSpec()).toMatchObject({
      id: 'tool.media.video-source.preview',
      source: 'custom',
    });
  });

  it('exports runtime Invocation, Approval, and Contract Snapshot schema definitions', () => {
    expect(
      governedToolInvocationDefinition.parse(governedToolInvocationDefinition.example)
    ).toMatchObject({ status: 'created', revision: 0 });
    expect(
      governedHumanApprovalDefinition.parse(governedHumanApprovalDefinition.example)
    ).toMatchObject({ status: 'pending', decisions: [] });
    expect(
      toolContractSnapshotDefinition.parse(toolContractSnapshotDefinition.example)
    ).toMatchObject({
      toolContracts: [expect.objectContaining({ toolId: 'tool.search' })],
    });
    expect(
      toolEventPayloadBaseDefinition.parse(toolEventPayloadBaseDefinition.example)
    ).toMatchObject({
      invocationId: 'invocation-example',
      attempt: 1,
    });
    expect(Object.keys(governedToolContractJsonSchemas)).toEqual(
      expect.arrayContaining([
        'GovernedToolContractSpec',
        'GovernedToolInvocationRecord',
        'GovernedHumanApprovalRequest',
        'ToolContractSnapshot',
        'ToolEventPayloadBase',
      ])
    );
  });
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
    const telemetry = new InMemoryTelemetryRecorder();
    const runner = new GovernedToolRunner(registry, trace, undefined, { telemetry });

    const result = await runner.run({
      toolId: 'delete-file',
      input: { path: '/tmp/example' },
      context: { runId: 'run_1', stepId: 'step_1' },
    });

    expect(result.status).toBe('denied');
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
    expect(validateToolInput({ type: 'string', pattern: '[' }, 'value')).toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ message: expect.stringContaining('pattern is invalid') })],
    });
    expect(validateToolInput({ type: 'string', pattern: '(a+)+$' }, 'a'.repeat(100))).toMatchObject(
      {
        valid: false,
        issues: [
          expect.objectContaining({ message: expect.stringContaining('unsafe backtracking') }),
        ],
      }
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
    const telemetry = new InMemoryTelemetryRecorder();
    const runner = new GovernedToolRunner(registry, trace, undefined, { telemetry });

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
    expect(telemetry.sum('tool_invocation_total')).toBe(1);
    expect(telemetry.sum('tool_retry_total')).toBe(1);
    expect(telemetry.list('tool_invocation_latency_ms')).toHaveLength(1);
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

  it('does not retry timed-out side effects until external submission is reconciled', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.external-timeout',
        version: '1.0.0',
        description: 'External timeout retry guard',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        idempotencyPolicy: { mode: 'required' },
        timeoutPolicy: { timeoutMs: 1, onTimeout: 'retry' },
        retryPolicy: { maxAttempts: 2 },
      },
      async () => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 20));
        return { submitted: true };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'tool.external-timeout',
        input: {},
        context: {
          runId: 'run_external_timeout',
          stepId: 'write',
          idempotencyKey: 'external-timeout-key',
        },
      })
    ).resolves.toMatchObject({
      status: 'failed',
      error: { code: 'TOOL_EXTERNAL_COMMIT_UNCERTAIN' },
      attempts: 1,
    });
    expect(calls).toBe(1);
    await expect(trace.list({ runId: 'run_external_timeout' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.external_receipt.reconciled' }),
      ])
    );
  });

  it('retries a timed-out side effect only after the provider confirms no commit', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.reconciled-timeout',
        version: '1.0.0',
        description: 'Reconciled external timeout',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        idempotencyPolicy: { mode: 'required' },
        timeoutPolicy: { timeoutMs: 5, onTimeout: 'retry' },
        retryPolicy: { maxAttempts: 2 },
      },
      async () => {
        calls += 1;
        if (calls === 1) await new Promise((resolve) => setTimeout(resolve, 20));
        return { calls };
      }
    );
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      receiptReconciler: {
        async reconcile() {
          return { state: 'not_committed' };
        },
      },
    });

    await expect(
      runner.run({
        toolId: 'tool.reconciled-timeout',
        input: {},
        context: {
          runId: 'run_reconciled_timeout',
          stepId: 'write',
          idempotencyKey: 'reconciled-timeout-key',
        },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { calls: 2 }, attempts: 2 });
    expect(calls).toBe(2);
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

    await expect(
      runner.approveAndResume('invocation_write_1', 'owner', {
        approvedAt: '2026-07-15T00:00:00.000Z',
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: { calls: 1 },
    });
    await expect(runner.run(request)).resolves.toMatchObject({
      status: 'completed',
      output: { calls: 1 },
    });
    expect(calls).toBe(1);
    await expect(runner.getInvocation('invocation_write_1')).resolves.toMatchObject({
      status: 'completed',
      executionCycle: 2,
      attemptCount: 1,
      result: { status: 'completed' },
    });

    const approvalEvents = await trace.list({ runId: 'run_approval_resume' });
    expect(new Set(approvalEvents.map((event) => event.id)).size).toBe(approvalEvents.length);
    expect(approvalEvents).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'human.review.requested' }),
        expect.objectContaining({ type: 'human.review.approved' }),
        expect.objectContaining({ type: 'human.review.resolved' }),
        expect.objectContaining({ type: 'tool.call.completed' }),
      ])
    );
  });

  it('enforces ToolSpec permission scopes through a trusted principal', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.permissioned',
        version: '0.0.0',
        description: 'Permission-scoped tool',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        permissionScope: ['document:read'],
      },
      async () => {
        calls += 1;
        return { ok: true };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await expect(
      runner.run({
        toolId: 'tool.permissioned',
        input: {},
        context: {
          runId: 'run_permission_denied',
          stepId: 'read',
          invocationId: 'invocation_permission_denied',
        },
      })
    ).resolves.toMatchObject({
      status: 'denied',
      error: {
        code: 'TOOL_PERMISSION_DENIED',
        details: { missingPermissionScopes: ['document:read'] },
      },
    });

    await expect(
      runner.run({
        toolId: 'tool.permissioned',
        input: {},
        context: {
          runId: 'run_permission_allowed',
          stepId: 'read',
          invocationId: 'invocation_permission_allowed',
          principal: {
            id: 'user-1',
            type: 'user',
            permissionScopes: ['document:read'],
          },
        },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      output: { ok: true },
    });
    expect(calls).toBe(1);
  });

  it('binds an invocation id to one tool and canonical input', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.bound',
        version: '0.0.0',
        description: 'Invocation binding test',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
      },
      async (input) => input
    );
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore());

    await expect(
      runner.run({
        toolId: 'tool.bound',
        input: { value: 1 },
        context: {
          runId: 'run_bound',
          stepId: 'step_bound',
          invocationId: 'invocation_bound',
        },
      })
    ).resolves.toMatchObject({ status: 'completed' });

    await expect(
      runner.run({
        toolId: 'tool.bound',
        input: { value: 2 },
        context: {
          runId: 'run_bound',
          stepId: 'step_bound',
          invocationId: 'invocation_bound',
        },
      })
    ).resolves.toMatchObject({
      status: 'denied',
      error: { code: 'TOOL_INVOCATION_CONFLICT' },
    });
  });

  it('deduplicates idempotent requests across invocation ids and conflicts on changed input', async () => {
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();
    let calls = 0;
    registry.register(
      {
        id: 'tool.idempotent',
        version: '1.0.0',
        revision: 'revision-1',
        description: 'Idempotent execution test',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        idempotencyPolicy: { mode: 'required' },
      },
      async (input) => {
        calls += 1;
        await new Promise((resolve) => setTimeout(resolve, 10));
        return { input, calls };
      }
    );
    const runner = new GovernedToolRunner(registry, trace);
    const context = {
      runId: 'run_idempotent',
      stepId: 'write',
      idempotencyKey: 'stable-key',
      metadata: { policyRevision: 'policy-1' },
    };

    const first = runner.run({
      toolId: 'tool.idempotent',
      input: { value: 1 },
      context: { ...context, invocationId: 'invocation_idempotent_1' },
    });
    const duplicate = runner.run({
      toolId: 'tool.idempotent',
      input: { value: 1 },
      context: { ...context, invocationId: 'invocation_idempotent_2' },
    });
    await expect(Promise.all([first, duplicate])).resolves.toEqual([
      expect.objectContaining({ status: 'completed', invocationId: 'invocation_idempotent_1' }),
      expect.objectContaining({ status: 'completed', invocationId: 'invocation_idempotent_1' }),
    ]);
    await expect(
      runner.run({
        toolId: 'tool.idempotent',
        input: { value: 1 },
        context: { ...context, invocationId: 'invocation_idempotent_3' },
      })
    ).resolves.toMatchObject({
      status: 'completed',
      invocationId: 'invocation_idempotent_1',
    });
    await expect(
      runner.run({
        toolId: 'tool.idempotent',
        input: { value: 2 },
        context: { ...context, invocationId: 'invocation_idempotent_conflict' },
      })
    ).resolves.toMatchObject({
      status: 'conflict',
      error: { code: 'TOOL_IDEMPOTENCY_CONFLICT' },
    });
    expect(calls).toBe(1);
    await expect(trace.list({ runId: 'run_idempotent' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.idempotency.reused' }),
        expect.objectContaining({ type: 'tool.idempotency.conflict' }),
      ])
    );
  });

  it('keeps idempotency indexes isolated by execution scope', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.scope-indexed',
        version: '1.0.0',
        revision: 'revision-1',
        description: 'Scope-isolated idempotency test',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        idempotencyPolicy: { mode: 'required' },
      },
      async () => ({ calls: ++calls })
    );
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore());

    const first = await runner.run({
      toolId: 'tool.scope-indexed',
      input: { value: 1 },
      context: {
        runId: 'run_scope_index_a',
        stepId: 'write',
        workspaceId: 'workspace-a',
        idempotencyKey: 'shared-key',
      },
    });
    const second = await runner.run({
      toolId: 'tool.scope-indexed',
      input: { value: 1 },
      context: {
        runId: 'run_scope_index_b',
        stepId: 'write',
        workspaceId: 'workspace-b',
        idempotencyKey: 'shared-key',
      },
    });

    expect(first).toMatchObject({ status: 'completed', output: { calls: 1 } });
    expect(second).toMatchObject({ status: 'completed', output: { calls: 2 } });
    expect(calls).toBe(2);
  });

  it('allows only one concurrent approval decision and expires stale approval requests', async () => {
    const registry = new ToolRegistry();
    let calls = 0;
    registry.register(
      {
        id: 'tool.approval-cas',
        version: '1.0.0',
        description: 'Approval compare-and-set test',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        humanApprovalPolicy: {
          required: true,
          timeoutPolicy: { timeoutMs: 1000, onTimeout: 'fail' },
        },
      },
      async () => {
        calls += 1;
        return { calls };
      }
    );
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      now: () => '2026-07-16T00:00:00.000Z',
    });
    await runner.run({
      toolId: 'tool.approval-cas',
      input: {},
      context: {
        runId: 'run_approval_cas',
        stepId: 'write',
        invocationId: 'invocation_approval_cas',
      },
    });

    const decisions = await Promise.allSettled([
      runner.approveAndResume('invocation_approval_cas', 'owner'),
      runner.rejectInvocation('invocation_approval_cas'),
    ]);
    expect(decisions.filter((decision) => decision.status === 'fulfilled')).toHaveLength(1);
    expect(decisions.filter((decision) => decision.status === 'rejected')).toHaveLength(1);
    expect(calls).toBeLessThanOrEqual(1);

    const expiringRunner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      now: () => '2026-07-16T00:00:00.000Z',
    });
    await expiringRunner.run({
      toolId: 'tool.approval-cas',
      input: {},
      context: {
        runId: 'run_approval_expiry',
        stepId: 'write',
        invocationId: 'invocation_approval_expiry',
      },
    });
    await expect(
      expiringRunner.approveAndResume('invocation_approval_expiry', 'owner', {
        approvedAt: '2026-07-16T00:00:02.000Z',
      })
    ).rejects.toThrow('has expired');
    await expect(expiringRunner.getInvocation('invocation_approval_expiry')).resolves.toMatchObject(
      {
        status: 'expired',
      }
    );
  });

  it('recovers interrupted reads but quarantines side effects with unknown commit state', async () => {
    const registry = new ToolRegistry();
    const store = new InMemoryToolInvocationStore();
    let readCalls = 0;
    let writeCalls = 0;
    registry.register(
      {
        id: 'tool.recover-read',
        version: '1.0.0',
        description: 'Recoverable read',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
      },
      async () => ({ calls: ++readCalls })
    );
    registry.register(
      {
        id: 'tool.recover-write',
        version: '1.0.0',
        description: 'Uncertain interrupted write',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        idempotencyPolicy: { mode: 'required' },
      },
      async () => ({ calls: ++writeCalls })
    );
    const createdAt = '2026-07-16T00:00:00.000Z';
    const readRequest = {
      toolId: 'tool.recover-read',
      input: {},
      context: {
        runId: 'run_recovery',
        stepId: 'read',
        invocationId: 'invocation_recover_read',
      },
    };
    const writeRequest = {
      toolId: 'tool.recover-write',
      input: {},
      context: {
        runId: 'run_recovery',
        stepId: 'write',
        invocationId: 'invocation_recover_write',
        idempotencyKey: 'recover-write-key',
      },
    };
    await store.create({
      id: 'invocation_recover_read',
      toolId: readRequest.toolId,
      status: 'running',
      inputHash: createHash('sha256').update('{}').digest('hex'),
      request: readRequest,
      executionCycle: 1,
      attemptCount: 1,
      revision: 0,
      createdAt,
      updatedAt: createdAt,
    });
    await store.create({
      id: 'invocation_recover_write',
      toolId: writeRequest.toolId,
      status: 'running',
      inputHash: createHash('sha256').update('{}').digest('hex'),
      sideEffectLevel: 'write',
      idempotencyKey: 'recover-write-key',
      request: writeRequest,
      executionCycle: 1,
      attemptCount: 1,
      revision: 0,
      createdAt,
      updatedAt: createdAt,
    });
    const runner = new GovernedToolRunner(registry, new InMemoryEventStore(), undefined, {
      invocationStore: store,
    });

    await expect(runner.recoverPendingInvocations()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ status: 'completed', output: { calls: 1 } }),
        expect.objectContaining({
          status: 'conflict',
          error: expect.objectContaining({ code: 'TOOL_CONCURRENCY_CONFLICT' }),
        }),
      ])
    );
    expect(readCalls).toBe(1);
    expect(writeCalls).toBe(0);
    await expect(runner.getInvocation('invocation_recover_write')).resolves.toMatchObject({
      status: 'conflict',
      lateResultState: 'pending',
    });
  });

  it('caches only read results with policy, scope, revision, and state validity', async () => {
    const registry = new ToolRegistry();
    const trace = new InMemoryEventStore();
    let readCalls = 0;
    let writeCalls = 0;
    const cache = {
      mode: 'result' as const,
      scope: 'run' as const,
      includeToolRevision: true,
      includePolicyRevision: true,
      ttlSeconds: 60,
    };
    registry.register(
      {
        id: 'tool.cached-read',
        version: '1.0.0',
        revision: 'read-revision-1',
        description: 'Cacheable read',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        cache,
      },
      async () => ({ calls: ++readCalls })
    );
    registry.register(
      {
        id: 'tool.uncached-write',
        version: '1.0.0',
        description: 'Write that must not use the result cache',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'write',
        cache: { ...cache, allowForSideEffectLevels: ['write'] },
      },
      async () => ({ calls: ++writeCalls })
    );
    const runner = new GovernedToolRunner(registry, trace, undefined, {
      resultCache: new InMemoryToolResultCache(),
    });
    const context = {
      runId: 'run_tool_cache',
      stepId: 'read',
      metadata: { policyRevision: 'policy-1', externalStateVersion: 'state-1' },
    };
    await runner.run({
      toolId: 'tool.cached-read',
      input: { query: 'hypha' },
      context: { ...context, invocationId: 'cache-read-1' },
    });
    await expect(
      runner.run({
        toolId: 'tool.cached-read',
        input: { query: 'hypha' },
        context: { ...context, invocationId: 'cache-read-2' },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { calls: 1 } });
    await expect(
      runner.run({
        toolId: 'tool.cached-read',
        input: { query: 'hypha' },
        context: {
          ...context,
          invocationId: 'cache-read-policy-2',
          metadata: { ...context.metadata, policyRevision: 'policy-2' },
        },
      })
    ).resolves.toMatchObject({ status: 'completed', output: { calls: 2 } });
    for (const invocationId of ['cache-write-1', 'cache-write-2']) {
      await runner.run({
        toolId: 'tool.uncached-write',
        input: {},
        context: { ...context, invocationId },
      });
    }
    expect(readCalls).toBe(2);
    expect(writeCalls).toBe(2);
    await expect(trace.list({ runId: 'run_tool_cache' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.cache.hit' }),
        expect.objectContaining({ type: 'tool.cache.miss' }),
        expect.objectContaining({ type: 'tool.cache.write' }),
        expect.objectContaining({ type: 'tool.cache.bypass' }),
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
      input: { secret: '[REDACTED]', visible: true },
      output: { token: '[REDACTED]', visible: true },
    });
  });

  it('does not expose Tool inputs on completion when audit input capture is disabled', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.audit-input-disabled',
        version: '0.0.0',
        description: 'Tool whose input must not be copied to completion events.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        auditPolicy: {
          enabled: true,
          includeInput: false,
          includeOutput: true,
        },
      },
      async () => ({ visible: true })
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);

    await runner.run({
      toolId: 'tool.audit-input-disabled',
      input: { secret: 'never-copy-me' },
      context: {
        runId: 'run_audit_input_disabled',
        stepId: 'step_audit_input_disabled',
        invocationId: 'invocation_audit_input_disabled',
      },
    });

    const events = await trace.list({ runId: 'run_audit_input_disabled' });
    const completed = events.find((event) => event.type === 'tool.call.completed');
    expect(completed?.payload).not.toHaveProperty('input');
    expect(completed?.payload).toMatchObject({ output: { visible: true } });
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

  it('exports and normalizes the owner-spec governed Tool contract', () => {
    const parsed = governedToolContractDefinition.parse(governedToolContractDefinition.example);
    expect(parsed).toMatchObject({
      revision: 'sha256:search-v1',
      input: { schemaHash: 'sha256:search-input-v1' },
      semantics: { sideEffectLevel: 'read', idempotency: 'intrinsic' },
      governance: { requiredPermissionScopes: ['network.http.get'] },
    });
    expect(governedToolContractJsonSchemas.GovernedToolContractSpec.required).toContain(
      'observability'
    );
    expect(hashToolContract({ b: 2, a: 1 })).toBe(hashToolContract({ a: 1, b: 2 }));

    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.compatible',
        version: '1.0.0',
        description: 'Legacy registration normalized to the governed contract.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
      },
      async () => ({ ok: true })
    );
    expect(registry.getSpec('tool.compatible')).toMatchObject({
      revision: expect.stringMatching(/^sha256:/),
      input: { schemaHash: expect.stringMatching(/^sha256:/) },
      execution: { retry: { maxAttempts: 1 } },
      governance: { requiredPermissionScopes: [] },
      observability: { traceLevel: 'full_redacted' },
    });
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

  it('resolves the real target before governance and reports middleware progress and artifacts', async () => {
    const registry = new ToolRegistry();
    registry.register(
      {
        id: 'tool.real-target',
        version: '1.0.0',
        description: 'Resolved target.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
        permissionScope: ['target.read'],
        execution: {
          timeout: { timeoutMs: 1000, onTimeout: 'fail' },
          retry: { maxAttempts: 1 },
          outputLimit: { maxInlineBytes: 8, overflow: 'artifact' },
        },
      },
      async (_input, context) => {
        await context.reportProgress?.({ stage: 'fetch', current: 1, total: 1 });
        return {
          kind: 'tool_execution_envelope',
          output: { value: 'large-output' },
          content: [{ type: 'text', text: 'finished' }],
        };
      }
    );
    registry.register(
      {
        id: 'tool.stable-proxy',
        version: '1.0.0',
        description: 'Stable proxy.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'none',
      },
      async () => {
        throw new Error('Proxy handler must not execute.');
      },
      {
        targetResolver: {
          async resolve(request) {
            return { toolId: 'tool.real-target', input: request.input };
          },
        },
      }
    );
    const middlewareCalls: string[] = [];
    const progress: string[] = [];
    const observations: unknown[] = [];
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace, undefined, {
      middleware: [
        {
          id: 'test.middleware',
          beforeAuthorization(context) {
            middlewareCalls.push(`authorize:${context.spec.id}`);
          },
          beforeExecution(context) {
            middlewareCalls.push(`execute:${context.spec.id}`);
          },
          afterExecution(context) {
            middlewareCalls.push(`result:${context.spec.id}`);
          },
        },
      ],
      artifactPort: {
        async store() {
          return 'artifact:large-output';
        },
      },
      observationPort: {
        async record(request) {
          observations.push(request);
          return 'observation:large-output';
        },
      },
    });

    const result = await runner.run({
      toolId: 'tool.stable-proxy',
      input: { query: 'hypha' },
      context: {
        runId: 'run_resolver',
        stepId: 'step_resolver',
        principal: {
          id: 'principal',
          type: 'service',
          permissionScopes: ['target.read'],
        },
        reportProgress(update) {
          progress.push(update.stage ?? 'unknown');
        },
      },
    });

    expect(result).toMatchObject({
      status: 'completed',
      output: { artifactRef: 'artifact:large-output' },
      artifactRefs: ['artifact:large-output'],
      observationRefs: ['observation:large-output'],
    });
    expect(observations).toEqual([
      expect.objectContaining({
        toolId: 'tool.real-target',
        value: { artifactRef: 'artifact:large-output' },
        artifactRefs: ['artifact:large-output'],
      }),
    ]);
    expect(middlewareCalls).toEqual([
      'authorize:tool.real-target',
      'execute:tool.real-target',
      'result:tool.real-target',
    ]);
    expect(progress).toEqual(['fetch']);
    const events = await trace.list({ runId: 'run_resolver' });
    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.target.resolved' }),
        expect.objectContaining({ type: 'tool.progress.reported' }),
        expect.objectContaining({ type: 'tool.output.validated' }),
      ])
    );
  });

  it('cooperatively cancels a running invocation', async () => {
    const registry = new ToolRegistry();
    let started!: () => void;
    const didStart = new Promise<void>((resolve) => {
      started = resolve;
    });
    registry.register(
      {
        id: 'tool.cancellable',
        version: '1.0.0',
        description: 'Cancellable Tool.',
        inputSchema: { type: 'object' },
        sideEffectLevel: 'read',
      },
      async (_input, context) => {
        started();
        await new Promise<void>((_resolve, reject) => {
          context.signal?.addEventListener('abort', () => reject(new Error('handler aborted')), {
            once: true,
          });
        });
        return { unreachable: true };
      }
    );
    const trace = new InMemoryEventStore();
    const runner = new GovernedToolRunner(registry, trace);
    const execution = runner.run({
      toolId: 'tool.cancellable',
      input: {},
      context: {
        runId: 'run_cancel',
        stepId: 'step_cancel',
        invocationId: 'invocation_cancel',
      },
    });
    await didStart;
    const cancelled = await runner.cancelInvocation('invocation_cancel', 'owner cancelled');

    expect(cancelled).toMatchObject({ status: 'cancelled' });
    await expect(execution).resolves.toMatchObject({ status: 'cancelled' });
    await expect(runner.getInvocation('invocation_cancel')).resolves.toMatchObject({
      status: 'cancelled',
    });
    await expect(trace.list({ runId: 'run_cancel' })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'tool.call.cancellation.requested' }),
        expect.objectContaining({ type: 'tool.call.cancelled' }),
      ])
    );
  });
});
