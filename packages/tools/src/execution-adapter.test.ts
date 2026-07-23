import { describe, expect, it, vi } from 'vitest';
import {
  allowAllPolicyEngine,
  commandExecutionRequestExample,
  executionActivityResultExample,
  executionDispatchRequestExample,
  InMemoryEventStore,
  type ExecutionActivityResult,
  type ExecutionDispatchRequest,
  type NormalizedExecutionError,
} from '@hypha/core';
import {
  ExecutionToolAdapter,
  ExecutionToolTerminalError,
  hashExecutionToolInput,
  validateExecutionToolRuntimeRequest,
  type ExecutionToolDispatchPlan,
  type ExecutionToolRuntimePort,
  type ExecutionToolRuntimeRequest,
  type ExecutionToolRuntimeResult,
  type ExecutionToolTerminalState,
} from './execution-adapter';
import {
  GovernedToolRunner,
  ToolRegistry,
  type AdapterExecutionRequest,
  type ToolAdapter,
  type ToolCallContext,
} from './index';

const NOW = '2026-07-22T00:00:00.000Z';
const DEADLINE = '2026-07-23T00:00:00.000Z';
const TOOL_ID = executionDispatchRequestExample.binding.toolId;
const TOOL_REVISION = 'tool-revision.execution-v2';
const SNAPSHOT_REF = 'tool-contract-snapshot:run.example:v2';
const AUTHORIZATION_VERIFICATION_REF = 'execution-auth-verification:invocation.example';
const EXPECTED_REVISION = 9;

const context: ToolCallContext = {
  runId: commandExecutionRequestExample.runId,
  stepId: 'step.execution',
  invocationId: executionDispatchRequestExample.authorization.invocationId,
  operationId: commandExecutionRequestExample.operationId,
  userId: commandExecutionRequestExample.userId,
  tenantId: 'tenant.example',
  sessionId: 'session.example',
  workspaceId: commandExecutionRequestExample.workspaceId,
  contractSnapshotRef: SNAPSHOT_REF,
  deadlineAt: DEADLINE,
  principal: {
    id: commandExecutionRequestExample.principal.principalId,
    principalId: commandExecutionRequestExample.principal.principalId,
    type: commandExecutionRequestExample.principal.type,
    permissionScopes: commandExecutionRequestExample.principal.permissionScopes,
    userId: commandExecutionRequestExample.userId,
    tenantId: 'tenant.example',
    workspaceId: commandExecutionRequestExample.workspaceId,
  },
};

function makeDispatch(inputHash: string): ExecutionDispatchRequest {
  const command = {
    ...commandExecutionRequestExample,
    tenantId: context.tenantId,
    sessionId: context.sessionId,
    principal: {
      ...commandExecutionRequestExample.principal,
      tenantId: context.tenantId,
    },
  };
  return {
    activity: {
      ...executionDispatchRequestExample.activity,
      operationId: command.operationId,
      runId: command.runId,
      workspaceId: command.workspaceId,
      request: command,
      deadlineAt: DEADLINE,
      fencingToken: 17,
    },
    binding: {
      ...executionDispatchRequestExample.binding,
      toolId: TOOL_ID,
      requiredScopes: ['execution:command:run'],
    },
    riskAssessment: {
      ...executionDispatchRequestExample.riskAssessment,
      evaluatedAt: NOW,
    },
    authorization: {
      ...executionDispatchRequestExample.authorization,
      invocationId: context.invocationId!,
      toolId: TOOL_ID,
      toolRevision: TOOL_REVISION,
      contractSnapshotRef: SNAPSHOT_REF,
      principalId: command.principal.principalId,
      runId: command.runId,
      inputHash,
      authorizedAt: NOW,
      expiresAt: DEADLINE,
    },
  };
}

function makePlan(inputHash: string): ExecutionToolDispatchPlan {
  return {
    dispatch: makeDispatch(inputHash),
    expectedRevision: EXPECTED_REVISION,
    approvalExpiresAt: DEADLINE,
  };
}

const executionError: NormalizedExecutionError = {
  code: 'EXECUTION_INTERNAL_ERROR',
  message: 'provider execution failed',
  retryable: false,
};

function activityFor(state: ExecutionToolTerminalState): ExecutionActivityResult {
  const status = {
    completed: 'completed',
    failed: 'failed',
    timed_out: 'timeout',
    cancelled: 'cancelled',
    unknown: 'unknown',
    quarantined: 'unknown',
  }[state] as ExecutionActivityResult['status'];
  return {
    ...executionActivityResultExample,
    activityId: executionDispatchRequestExample.activity.activityId,
    status,
    executionId: state === 'completed' ? executionActivityResultExample.executionId : undefined,
    eventIds: ['event.execution.requested', `event.execution.${state}`],
    error: state === 'completed' ? undefined : executionError,
  };
}

function makeRuntimeResult(
  request: ExecutionToolRuntimeRequest,
  state: ExecutionToolTerminalState = 'completed'
): ExecutionToolRuntimeResult {
  const activityResult = {
    ...activityFor(state),
    activityId: request.dispatch.activity.activityId,
  };
  const command = request.dispatch.activity.request as typeof commandExecutionRequestExample;
  const terminalEventId = activityResult.eventIds.at(-1)!;
  return {
    activityResult,
    scope: {
      principalId: command.principal.principalId,
      userId: command.userId,
      tenantId: command.tenantId,
      sessionId: command.sessionId,
      runId: request.dispatch.activity.runId,
      workspaceId: request.dispatch.activity.workspaceId,
    },
    toolId: request.dispatch.binding.toolId,
    toolRevision: request.dispatch.authorization.toolRevision!,
    contractSnapshotRef: request.dispatch.authorization.contractSnapshotRef!,
    toolOperation: request.dispatch.binding.operation,
    operationId: request.dispatch.activity.operationId,
    inputHash: request.inputHash,
    revision: request.expectedRevision,
    fencingToken: request.dispatch.activity.fencingToken,
    terminalState: state,
    provenance: {
      providerId: 'execution-provider.test',
      authorizationEvidenceId: request.dispatch.authorization.id,
      authorizationVerificationRef: AUTHORIZATION_VERIFICATION_REF,
      terminalEventId,
      receivedAt: NOW,
      resultHash: hashExecutionToolInput(activityResult),
      receiptRef: state === 'completed' ? 'execution-receipt:example' : undefined,
    },
    evidence: [
      { kind: 'authorization', ref: AUTHORIZATION_VERIFICATION_REF, recordedAt: NOW },
      { kind: 'event', ref: terminalEventId, recordedAt: NOW },
      ...(state === 'completed'
        ? [{ kind: 'receipt' as const, ref: 'execution-receipt:example', recordedAt: NOW }]
        : []),
      { kind: 'trace', ref: 'trace:execution.example', recordedAt: NOW },
    ],
  };
}

function callRequest(input: unknown = { arguments: ['check'], executable: 'node' }) {
  return { toolId: TOOL_ID, input, context } as AdapterExecutionRequest<unknown>;
}

function makePort(
  result: (request: ExecutionToolRuntimeRequest) => unknown = (request) =>
    makeRuntimeResult(request)
): ExecutionToolRuntimePort & { execute: ReturnType<typeof vi.fn> } {
  return {
    execute: vi.fn(async (request: ExecutionToolRuntimeRequest) => {
      validateExecutionToolRuntimeRequest(request);
      return result(request);
    }),
    health: vi.fn(async () => ({ status: 'healthy', checkedAt: NOW })),
  };
}

function makeAdapter(
  port: ExecutionToolRuntimePort,
  factory: (inputHash: string) => ExecutionToolDispatchPlan = makePlan,
  options: { healthTimeoutMs?: number } = {}
) {
  return new ExecutionToolAdapter(TOOL_ID, port, async ({ inputHash }) => factory(inputHash), {
    toolRevision: TOOL_REVISION,
    binding: makeDispatch(hashExecutionToolInput({})).binding,
    providerId: 'execution-provider.test',
    now: () => NOW,
    ...options,
  });
}

describe('ExecutionToolAdapter governed boundary', () => {
  it('binds a frozen normalized input before dispatch and returns bounded traceable evidence', async () => {
    const original = { executable: 'node', arguments: ['check'], nested: { enabled: true } };
    let factoryInput: unknown;
    let factoryHash: string | undefined;
    const port = makePort();
    const adapter = new ExecutionToolAdapter(
      TOOL_ID,
      port,
      async ({ normalizedInput, inputHash, signal }) => {
        factoryInput = normalizedInput;
        factoryHash = inputHash;
        expect(signal.aborted).toBe(false);
        expect(Object.isFrozen(normalizedInput)).toBe(true);
        expect(Object.isFrozen((normalizedInput as typeof original).nested)).toBe(true);
        return makePlan(inputHash);
      },
      {
        toolRevision: TOOL_REVISION,
        binding: makeDispatch(hashExecutionToolInput({})).binding,
        providerId: 'execution-provider.test',
        now: () => NOW,
      }
    );

    const pending = adapter.execute(callRequest(original));
    original.nested.enabled = false;
    const envelope = await pending;

    expect(factoryInput).toEqual({
      arguments: ['check'],
      executable: 'node',
      nested: { enabled: true },
    });
    expect(factoryHash).toBe(hashExecutionToolInput(factoryInput));
    expect(port.execute).toHaveBeenCalledOnce();
    expect(envelope.output).toMatchObject({
      terminalState: 'completed',
      evidenceHash: expect.stringMatching(/^[a-f0-9]{64}$/u),
      provenance: {
        providerId: 'execution-provider.test',
        authorizationVerificationRef: AUTHORIZATION_VERIFICATION_REF,
      },
      evidence: expect.arrayContaining([
        expect.objectContaining({ kind: 'authorization' }),
        expect.objectContaining({ kind: 'event' }),
        expect.objectContaining({ kind: 'trace' }),
      ]),
    });
  });

  it.each([
    ['caller hash', (plan: ExecutionToolDispatchPlan) => plan, '0'.repeat(64)],
    [
      'authorization hash',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        dispatch: {
          ...plan.dispatch,
          authorization: { ...plan.dispatch.authorization, inputHash: '0'.repeat(64) },
        },
      }),
      undefined,
    ],
  ])('fails closed for tampered %s', async (_label, mutate, forcedHash) => {
    const port = makePort();
    const input = { executable: 'node' };
    const inputHash = hashExecutionToolInput(input);
    if (forcedHash) {
      expect(() =>
        validateExecutionToolRuntimeRequest({
          dispatch: makeDispatch(inputHash),
          normalizedInput: input,
          inputHash: forcedHash,
          expectedRevision: EXPECTED_REVISION,
        })
      ).toThrow(/input hash/u);
      return;
    }
    const adapter = makeAdapter(port, (hash) => mutate(makePlan(hash)));
    await expect(adapter.execute(callRequest(input))).rejects.toMatchObject({
      code: 'EXECUTION_INPUT_HASH_MISMATCH',
    });
    expect(port.execute).not.toHaveBeenCalled();
  });

  it.each([
    [
      'principal scope',
      (plan: ExecutionToolDispatchPlan) => {
        const request = plan.dispatch.activity.request as typeof commandExecutionRequestExample;
        return {
          ...plan,
          dispatch: {
            ...plan.dispatch,
            activity: {
              ...plan.dispatch.activity,
              request: {
                ...request,
                principal: { ...request.principal, principalId: 'agent.other' },
              },
            },
            authorization: { ...plan.dispatch.authorization, principalId: 'agent.other' },
          },
        };
      },
    ],
    [
      'run scope',
      (plan: ExecutionToolDispatchPlan) => {
        const request = plan.dispatch.activity.request as typeof commandExecutionRequestExample;
        return {
          ...plan,
          dispatch: {
            ...plan.dispatch,
            activity: {
              ...plan.dispatch.activity,
              runId: 'run.other',
              request: { ...request, runId: 'run.other' },
            },
            authorization: { ...plan.dispatch.authorization, runId: 'run.other' },
          },
        };
      },
    ],
    [
      'workspace scope',
      (plan: ExecutionToolDispatchPlan) => {
        const request = plan.dispatch.activity.request as typeof commandExecutionRequestExample;
        return {
          ...plan,
          dispatch: {
            ...plan.dispatch,
            activity: {
              ...plan.dispatch.activity,
              workspaceId: 'workspace.other',
              request: { ...request, workspaceId: 'workspace.other' },
            },
          },
        };
      },
    ],
    [
      'Tool revision',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        dispatch: {
          ...plan.dispatch,
          authorization: { ...plan.dispatch.authorization, toolRevision: 'stale-revision' },
        },
      }),
    ],
    [
      'governed binding',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        dispatch: {
          ...plan.dispatch,
          binding: { ...plan.dispatch.binding, sideEffectLevel: 'read' as const },
        },
      }),
    ],
  ])('rejects dispatch with wrong %s before provider execution', async (_label, mutate) => {
    const port = makePort();
    const adapter = makeAdapter(port, (hash) => mutate(makePlan(hash)));
    await expect(adapter.execute(callRequest())).rejects.toMatchObject({
      code: 'EXECUTION_POLICY_DENIED',
    });
    expect(port.execute).not.toHaveBeenCalled();
  });

  it('cancels while awaiting the dispatch factory without reaching the runtime port', async () => {
    const port = makePort();
    let enteredFactory = false;
    const adapter = new ExecutionToolAdapter(
      TOOL_ID,
      port,
      async () => {
        enteredFactory = true;
        return new Promise<ExecutionToolDispatchPlan>(() => undefined);
      },
      {
        toolRevision: TOOL_REVISION,
        binding: makeDispatch(hashExecutionToolInput({})).binding,
        providerId: 'execution-provider.test',
        now: () => NOW,
      }
    );
    const pending = adapter.execute(callRequest());
    await vi.waitFor(() => expect(enteredFactory).toBe(true));
    await adapter.cancel({ toolId: TOOL_ID, invocationId: context.invocationId!, reason: 'stop' });
    await expect(pending).rejects.toMatchObject({ code: 'EXECUTION_CANCELLED' });
    expect(port.execute).not.toHaveBeenCalled();
  });

  it('cancels after factory completion and propagates the registered AbortSignal', async () => {
    let runtimeSignal: AbortSignal | undefined;
    const port: ExecutionToolRuntimePort = {
      async execute(_request, signal) {
        runtimeSignal = signal;
        return new Promise(() => undefined);
      },
      async health() {
        return { status: 'healthy', checkedAt: NOW };
      },
    };
    const adapter = makeAdapter(port);
    const pending = adapter.execute(callRequest());
    await vi.waitFor(() => expect(runtimeSignal).toBeDefined());
    await adapter.cancel({ toolId: TOOL_ID, invocationId: context.invocationId!, reason: 'stop' });
    await expect(pending).rejects.toMatchObject({ code: 'EXECUTION_CANCELLED' });
    expect(runtimeSignal?.aborted).toBe(true);
  });

  it.each([
    [
      'deadline',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        dispatch: {
          ...plan.dispatch,
          activity: { ...plan.dispatch.activity, deadlineAt: '2026-07-21T00:00:00.000Z' },
        },
      }),
      'EXECUTION_TIMEOUT',
    ],
    [
      'authorization expiry',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        dispatch: {
          ...plan.dispatch,
          authorization: {
            ...plan.dispatch.authorization,
            authorizedAt: '2026-07-20T00:00:00.000Z',
            expiresAt: '2026-07-21T00:00:00.000Z',
          },
        },
      }),
      'EXECUTION_AUTHORIZATION_EXPIRED',
    ],
    [
      'approval expiry',
      (plan: ExecutionToolDispatchPlan) => ({
        ...plan,
        approvalExpiresAt: '2026-07-21T00:00:00.000Z',
      }),
      'EXECUTION_APPROVAL_EXPIRED',
    ],
  ])('rejects expired %s before runtime execution', async (_label, mutate, code) => {
    const port = makePort();
    const adapter = makeAdapter(port, (hash) => mutate(makePlan(hash)));
    await expect(adapter.execute(callRequest())).rejects.toMatchObject({ code });
    expect(port.execute).not.toHaveBeenCalled();
  });

  it.each([
    ['malformed schema', () => ({ unexpected: true }), 'EXECUTION_RESULT_INVALID'],
    [
      'cross-tenant scope',
      (request: ExecutionToolRuntimeRequest) => ({
        ...makeRuntimeResult(request),
        scope: { ...makeRuntimeResult(request).scope, tenantId: 'tenant.other' },
      }),
      'EXECUTION_RESULT_MISMATCH',
    ],
    [
      'wrong provenance',
      (request: ExecutionToolRuntimeRequest) => ({
        ...makeRuntimeResult(request),
        provenance: {
          ...makeRuntimeResult(request).provenance,
          providerId: 'execution-provider.other',
        },
      }),
      'EXECUTION_RESULT_MISMATCH',
    ],
    [
      'wrong authorization provenance',
      (request: ExecutionToolRuntimeRequest) => ({
        ...makeRuntimeResult(request),
        provenance: {
          ...makeRuntimeResult(request).provenance,
          authorizationEvidenceId: 'execution-authorization:other',
        },
      }),
      'EXECUTION_RESULT_MISMATCH',
    ],
    [
      'forged success evidence',
      (request: ExecutionToolRuntimeRequest) => {
        const result = makeRuntimeResult(request);
        return {
          ...result,
          activityResult: { ...result.activityResult, executionId: undefined },
          provenance: {
            ...result.provenance,
            resultHash: hashExecutionToolInput({
              ...result.activityResult,
              executionId: undefined,
            }),
          },
        };
      },
      'EXECUTION_RESULT_MISMATCH',
    ],
    [
      'stale revision',
      (request: ExecutionToolRuntimeRequest) => ({
        ...makeRuntimeResult(request),
        revision: request.expectedRevision - 1,
      }),
      'EXECUTION_RESULT_MISMATCH',
    ],
    [
      'stale fencing token',
      (request: ExecutionToolRuntimeRequest) => ({
        ...makeRuntimeResult(request),
        fencingToken: request.dispatch.activity.fencingToken - 1,
      }),
      'EXECUTION_RESULT_MISMATCH',
    ],
  ])('fails closed for provider %s', async (_label, result, code) => {
    const adapter = makeAdapter(makePort(result));
    await expect(adapter.execute(callRequest())).rejects.toMatchObject({ code });
  });

  it.each([
    ['completed', undefined],
    ['failed', 'EXECUTION_FAILED'],
    ['timed_out', 'EXECUTION_TIMEOUT'],
    ['cancelled', 'EXECUTION_CANCELLED'],
    ['unknown', 'EXECUTION_RESULT_UNKNOWN'],
    ['quarantined', 'EXECUTION_RESULT_QUARANTINED'],
  ] as const)('preserves the %s terminal state and normalized error', async (state, code) => {
    const adapter = makeAdapter(makePort((request) => makeRuntimeResult(request, state)));
    const execution = adapter.execute(callRequest());
    if (state === 'completed') {
      await expect(execution).resolves.toMatchObject({ output: { terminalState: 'completed' } });
      return;
    }
    await expect(execution).rejects.toMatchObject({
      code,
      terminalState: state,
      executionError,
      observation: {
        terminalState: state,
        activityResult: { error: executionError },
      },
    });
  });

  it.each([
    ['cancelled', 'cancelled', 'TOOL_CANCELLED'],
    ['unknown', 'failed', 'TOOL_EXECUTION_UNKNOWN'],
    ['quarantined', 'failed', 'TOOL_EXECUTION_QUARANTINED'],
  ] as const)(
    'preserves Execution %s semantics through the GovernedToolRunner',
    async (terminalState, status, code) => {
      const normalizedInput = { executable: 'node' };
      const inputHash = hashExecutionToolInput(normalizedInput);
      const plan = makePlan(inputHash);
      const runtimeRequest = validateExecutionToolRuntimeRequest({
        dispatch: plan.dispatch,
        normalizedInput,
        inputHash,
        expectedRevision: plan.expectedRevision,
      });
      const runtimeResult = makeRuntimeResult(runtimeRequest, terminalState);
      const terminalError = new ExecutionToolTerminalError({
        ...runtimeResult,
        evidenceHash: hashExecutionToolInput(runtimeResult.evidence),
      });
      const adapter: ToolAdapter = {
        id: TOOL_ID,
        source: 'execution',
        async capabilities() {
          return { execute: true, cancel: false, health: true, close: false };
        },
        async execute() {
          throw terminalError;
        },
        async health() {
          return { status: 'healthy', checkedAt: NOW };
        },
      };
      const registry = new ToolRegistry();
      registry.registerAdapter(
        {
          id: TOOL_ID,
          version: '1.0.0',
          revision: TOOL_REVISION,
          description: 'Execution terminal mapping fixture',
          inputSchema: { type: 'object' },
          sideEffectLevel: 'read',
          source: 'execution',
        },
        adapter
      );
      const runner = new GovernedToolRunner(
        registry,
        new InMemoryEventStore(),
        allowAllPolicyEngine
      );

      await expect(
        runner.run({
          toolId: TOOL_ID,
          input: normalizedInput,
          context: {
            runId: context.runId,
            stepId: context.stepId,
            invocationId: `runner-${terminalState}`,
          },
        })
      ).resolves.toMatchObject({
        status,
        error: {
          code,
          details: {
            terminalState,
            observation: { terminalState },
          },
        },
      });
    }
  );

  it('reports provider degradation and never replaces it with a fixed healthy state', async () => {
    const port = makePort();
    port.health = vi.fn(async () => ({
      status: 'degraded',
      checkedAt: NOW,
      message: 'provider queue saturated',
    }));
    await expect(makeAdapter(port).health()).resolves.toMatchObject({
      status: 'degraded',
      message: 'provider queue saturated',
      details: { adapter: TOOL_ID },
    });
  });

  it('maps provider unavailability and health timeout to unhealthy evidence', async () => {
    const unavailable = makePort();
    unavailable.health = vi.fn(async () => {
      throw new Error('provider unavailable');
    });
    await expect(makeAdapter(unavailable).health()).resolves.toMatchObject({
      status: 'unhealthy',
      message: 'provider unavailable',
      details: { timedOut: false },
    });

    const timedOut = makePort();
    timedOut.health = vi.fn(async () => new Promise(() => undefined));
    await expect(
      makeAdapter(timedOut, makePlan, { healthTimeoutMs: 5 }).health()
    ).resolves.toMatchObject({
      status: 'unhealthy',
      message: expect.stringContaining('timed out'),
      details: { timedOut: true },
    });
  });
});
