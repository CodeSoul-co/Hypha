import { describe, expect, it, vi } from 'vitest';
import type { CommandExecutionResult, ExecutionReceipt } from '../../contracts/command-execution';
import type { ExecutionRecord } from '../../contracts/execution-store';
import type {
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionResult,
  ExecutionOutputCollector,
  ExecutionOutputPlanner,
} from '../../contracts/execution-output';
import {
  DurableExecutionCompletionCoordinator,
  DurableExecutionTerminalEventCoordinator,
  createDurableExecutionTerminalEvent,
  type DurableExecutionCompletionWorker,
  type DurableExecutionTerminalEventCommitPort,
} from './completion';

const contentHash = `sha256:${'a'.repeat(64)}`;

describe('DurableExecutionCompletionCoordinator', () => {
  it('orders receipt checkpoint, Artifact finalization, and terminal CAS', async () => {
    const calls: string[] = [];
    const receipt = terminalReceipt();
    const record = runningRecord();
    const checkpointed = {
      ...record,
      revision: 2,
      terminalReceipt: receipt,
      updatedAt: '2026-07-24T00:00:02.000Z',
    };
    const renewed = {
      ...checkpointed,
      revision: 3,
      updatedAt: '2026-07-24T00:00:02.500Z',
    };
    const worker = completionWorker({
      checkpoint: async () => {
        calls.push('receipt');
        return checkpointed;
      },
      renew: async () => {
        calls.push('renew');
        return renewed;
      },
      commit: async (_claimed, result) => {
        calls.push('commit');
        return committedRecord(renewed, result);
      },
    });
    const planner: ExecutionOutputPlanner = {
      plan: () => {
        calls.push('plan');
        return collectionPlan();
      },
    };
    const collector: ExecutionOutputCollector = {
      collect: async () => {
        calls.push('collect');
        return collectionResult();
      },
    };
    const coordinator = new DurableExecutionCompletionCoordinator({
      worker,
      planner,
      collector,
    });

    const completed = await coordinator.complete({
      record,
      result: providerResult({ externalReceipt: receipt }),
      outputPolicy: { finalizeOnSuccess: true },
      outputContext: collectionContext(),
    });

    expect(calls).toEqual(['receipt', 'renew', 'plan', 'collect', 'commit']);
    expect(worker.commit).toHaveBeenCalledWith(
      expect.objectContaining({
        id: renewed.id,
        revision: renewed.revision,
        terminalReceipt: receipt,
        lease: renewed.lease,
      }),
      expect.objectContaining({
        generatedArtifactRefs: ['artifact:provider', 'artifact:report'],
      })
    );
    expect(completed.record.status).toBe('completed');
    expect(completed.output.finalizedArtifactRefs).toEqual(['artifact:report']);
  });

  it('retains the durable receipt and never terminal-commits when Artifact finalization fails', async () => {
    const receipt = terminalReceipt();
    const checkpointed = {
      ...runningRecord(),
      revision: 2,
      terminalReceipt: receipt,
      updatedAt: '2026-07-24T00:00:02.000Z',
    };
    const worker = completionWorker({
      checkpoint: async () => checkpointed,
      commit: async (_record, result) => committedRecord(checkpointed, result),
    });
    const coordinator = new DurableExecutionCompletionCoordinator({
      worker,
      planner: { plan: () => collectionPlan() },
      collector: {
        collect: async () => {
          throw new Error('Artifact store unavailable');
        },
      },
    });

    await expect(
      coordinator.complete({
        record: runningRecord(),
        result: providerResult({ externalReceipt: receipt }),
        outputPolicy: { finalizeOnSuccess: true },
        outputContext: collectionContext(),
      })
    ).rejects.toThrow(/Artifact store unavailable/u);

    expect(worker.checkpointTerminalReceipt).toHaveBeenCalledOnce();
    expect(worker.commit).not.toHaveBeenCalled();
  });

  it('rejects a stale lease before any Artifact side effect', async () => {
    const receipt = terminalReceipt();
    const collector: ExecutionOutputCollector = { collect: vi.fn() };
    const worker = completionWorker({
      checkpoint: async () => ({
        ...runningRecord(),
        revision: 2,
        terminalReceipt: receipt,
        updatedAt: '2026-07-24T00:00:02.000Z',
      }),
      renew: async () => {
        throw new Error('fencing rejected');
      },
    });
    const coordinator = new DurableExecutionCompletionCoordinator({
      worker,
      planner: { plan: () => collectionPlan() },
      collector,
    });

    await expect(
      coordinator.complete({
        record: runningRecord(),
        result: providerResult({ externalReceipt: receipt }),
        outputPolicy: { finalizeOnSuccess: true },
        outputContext: collectionContext(),
      })
    ).rejects.toThrow(/fencing rejected/u);
    expect(collector.collect).not.toHaveBeenCalled();
    expect(worker.commit).not.toHaveBeenCalled();
  });

  it('fails closed before terminal CAS when finalized Artifact evidence is incomplete', async () => {
    const receipt = terminalReceipt();
    const checkpointed = {
      ...runningRecord(),
      revision: 2,
      terminalReceipt: receipt,
      updatedAt: '2026-07-24T00:00:02.000Z',
    };
    const worker = completionWorker({
      checkpoint: async () => checkpointed,
      commit: async (_record, result) => committedRecord(checkpointed, result),
    });
    const coordinator = new DurableExecutionCompletionCoordinator({
      worker,
      planner: { plan: () => collectionPlan() },
      collector: {
        collect: async () => ({
          ...collectionResult(),
          collected: [{ ...collectionResult().collected[0], status: 'draft' }],
          finalizedArtifactRefs: [],
        }),
      },
    });

    await expect(
      coordinator.complete({
        record: runningRecord(),
        result: providerResult({ externalReceipt: receipt }),
        outputPolicy: { finalizeOnSuccess: true },
        outputContext: collectionContext(),
      })
    ).rejects.toThrow(/finalization/u);
    expect(worker.commit).not.toHaveBeenCalled();
  });

  it('rejects a completed output plan that leaves new Artifacts as drafts', async () => {
    const worker = completionWorker();
    const collector: ExecutionOutputCollector = { collect: vi.fn() };
    const coordinator = new DurableExecutionCompletionCoordinator({
      worker,
      planner: { plan: () => ({ ...collectionPlan(), finalize: false }) },
      collector,
    });

    await expect(
      coordinator.complete({
        record: runningRecord(),
        result: providerResult(),
        outputPolicy: {},
        outputContext: collectionContext(),
      })
    ).rejects.toMatchObject({ code: 'EXECUTION_INVALID_REQUEST' });
    expect(collector.collect).not.toHaveBeenCalled();
    expect(worker.commit).not.toHaveBeenCalled();
  });
});

describe('DurableExecutionTerminalEventCoordinator', () => {
  it('builds a deterministic event from the durable terminal record', () => {
    const running = runningRecord();
    const terminal = committedRecord(
      {
        ...running,
        request: {
          ...running.request,
          sessionId: 'session.example',
          stepId: 'step.example',
          agentId: 'agent.example',
          fsmState: 'collecting_artifacts',
        },
      },
      providerResult()
    );
    const event = createDurableExecutionTerminalEvent({
      ...terminal,
      revision: terminal.revision + 1,
    });

    expect(event).toMatchObject({
      id: 'event:command.execution.completed:execution.example:2',
      type: 'command.execution.completed',
      tenantId: 'tenant.example',
      userId: 'user.example',
      workspaceId: 'workspace.example',
      sessionId: 'session.example',
      runId: 'run.example',
      stepId: 'step.example',
      agentId: 'agent.example',
      fsmState: 'collecting_artifacts',
      idempotencyKey: 'execution-terminal-event:execution.example:2',
      operationId: 'operation.execute',
      timestamp: '2026-07-24T00:00:01.000Z',
      payload: {
        operationId: 'operation.execute',
        executionId: 'execution.example',
        revision: 2,
        providerId: 'execution.local',
        artifactRefs: ['artifact:provider'],
        status: 'completed',
        exitCode: 0,
        latencyMs: 1_000,
      },
    });
  });

  it('appends only after terminal CAS and preserves deterministic retry identity', async () => {
    const calls: string[] = [];
    const completed = committedRecord(runningRecord(), providerResult());
    const requests: Parameters<DurableExecutionTerminalEventCommitPort['append']>[0][] = [];
    const events: DurableExecutionTerminalEventCommitPort = {
      append: vi.fn(async (request) => {
        calls.push('event');
        requests.push(structuredClone(request));
        if (requests.length === 1) throw new Error('event store unavailable');
        return request.event;
      }),
    };
    const coordinator = new DurableExecutionTerminalEventCoordinator({ events });

    await expect(coordinator.append(completed)).rejects.toThrow(/event store unavailable/u);
    await expect(coordinator.append(completed)).resolves.toMatchObject({
      type: 'command.execution.completed',
    });
    const released = {
      ...completed,
      revision: completed.revision + 1,
      lease: undefined,
    };
    await expect(coordinator.append(released)).resolves.toMatchObject({
      type: 'command.execution.completed',
    });

    expect(calls).toEqual(['event', 'event', 'event']);
    expect(requests[1]).toEqual(requests[0]);
    expect(requests[2]).toEqual(requests[0]);
    expect(requests[0]).toMatchObject({
      executionRevision: 2,
      idempotencyKey: 'execution-terminal-event:execution.example:2',
      event: {
        tenantId: 'tenant.example',
        userId: 'user.example',
        idempotencyKey: 'execution-terminal-event:execution.example:2',
        operationId: 'operation.execute',
      },
    });
  });

  it.each([
    ['cancelled', 'command.execution.cancelled'],
    ['timed_out', 'command.execution.timeout'],
    ['oom_killed', 'command.execution.oom_killed'],
    ['resource_exceeded', 'command.execution.resource.exceeded'],
    ['failed', 'command.execution.failed'],
    ['quarantined', 'command.execution.failed'],
  ] as const)('maps %s terminal evidence to %s', (status, type) => {
    const result = providerResult({
      status,
      exitCode: null,
      error: terminalError(status),
    });
    const event = createDurableExecutionTerminalEvent(committedRecord(runningRecord(), result));

    expect(event).toMatchObject({
      type,
      payload: { status, error: terminalError(status) },
    });
  });

  it('rejects non-terminal and mismatched appended event identities', async () => {
    expect(() => createDurableExecutionTerminalEvent(runningRecord())).toThrow(
      /terminal result/u
    );
    const completed = committedRecord(runningRecord(), providerResult());
    expect(() =>
      createDurableExecutionTerminalEvent({
        ...completed,
        revision: completed.revision + 2,
      })
    ).toThrow(/does not match/u);
    const coordinator = new DurableExecutionTerminalEventCoordinator({
      events: {
        append: async (request) => ({
          ...request.event,
          id: 'event:wrong',
        }),
      },
    });

    await expect(coordinator.append(completed)).rejects.toThrow(/identity/u);
  });

  it.each([
    ['tenantId', undefined, /identity/u],
    ['userId', 'user.other', /identity/u],
    ['workspaceId', 'workspace.other', /must match the event workspaceId/u],
    ['runId', 'run.other', /identity/u],
    ['idempotencyKey', 'execution-terminal-event:other', /identity/u],
    ['operationId', 'operation.other', /must match the event operationId/u],
  ] as const)('rejects an appended event that changes %s', async (field, value, error) => {
    const completed = committedRecord(runningRecord(), providerResult());
    const coordinator = new DurableExecutionTerminalEventCoordinator({
      events: {
        append: async (request) => ({
          ...request.event,
          [field]: value,
        }),
      },
    });

    await expect(coordinator.append(completed)).rejects.toThrow(error);
  });

  it.each([
    ['artifactRefs', []],
    ['providerId', 'execution.other'],
    ['sandboxId', 'sandbox.other'],
  ] as const)(
    'rejects an appended event that changes terminal %s evidence',
    async (field, value) => {
      const completed = committedRecord(runningRecord(), providerResult());
      const coordinator = new DurableExecutionTerminalEventCoordinator({
        events: {
          append: async (request) => ({
            ...request.event,
            payload: {
              ...request.event.payload,
              [field]: value,
            },
          }),
        },
      });

      await expect(coordinator.append(completed)).rejects.toThrow(/evidence/u);
    }
  );
});

function completionWorker(
  implementations: {
    renew?: (record: ExecutionRecord) => Promise<ExecutionRecord>;
    checkpoint?: (record: ExecutionRecord, receipt: ExecutionReceipt) => Promise<ExecutionRecord>;
    commit?: (record: ExecutionRecord, result: CommandExecutionResult) => Promise<ExecutionRecord>;
  } = {}
): DurableExecutionCompletionWorker & {
  renew: ReturnType<typeof vi.fn>;
  checkpointTerminalReceipt: ReturnType<typeof vi.fn>;
  commit: ReturnType<typeof vi.fn>;
} {
  return {
    renew: vi.fn(implementations.renew ?? (async (record: ExecutionRecord) => record)),
    checkpointTerminalReceipt: vi.fn(
      implementations.checkpoint ?? (async (record: ExecutionRecord) => record)
    ),
    commit: vi.fn(implementations.commit ?? (async (record: ExecutionRecord) => record)),
  };
}

function runningRecord(): ExecutionRecord {
  return {
    id: 'execution.example',
    revision: 1,
    request: {
      executionId: 'execution.example',
      operationId: 'operation.execute',
      principal: {
        principalId: 'user.example',
        type: 'user',
        userId: 'user.example',
        tenantId: 'tenant.example',
        permissionScopes: ['execution:run', 'artifact:write'],
      },
      userId: 'user.example',
      tenantId: 'tenant.example',
      workspaceId: 'workspace.example',
      runId: 'run.example',
      environmentRef: { id: 'environment.local', version: '1.0.0' },
      executable: 'node',
      captureArtifacts: true,
    },
    status: 'running',
    providerId: 'execution.local',
    attempt: 1,
    lease: {
      id: 'lease.example',
      executionId: 'execution.example',
      ownerId: 'worker.example',
      fencingToken: 1,
      acquiredAt: '2026-07-24T00:00:00.000Z',
      heartbeatAt: '2026-07-24T00:00:00.000Z',
      expiresAt: '2026-07-24T00:01:00.000Z',
    },
    createdAt: '2026-07-24T00:00:00.000Z',
    updatedAt: '2026-07-24T00:00:01.000Z',
  };
}

function terminalReceipt(): ExecutionReceipt {
  return {
    id: 'receipt.example',
    providerId: 'execution.local',
    executionId: 'execution.example',
    status: 'completed',
    issuedAt: '2026-07-24T00:00:01.000Z',
    receiptHash: `sha256:${'b'.repeat(64)}`,
  };
}

function providerResult(overrides: Partial<CommandExecutionResult> = {}): CommandExecutionResult {
  return {
    executionId: 'execution.example',
    revision: 1,
    sandboxId: 'sandbox.example',
    status: 'completed',
    exitCode: 0,
    changedFiles: [
      {
        path: 'outputs/report.json',
        operation: 'created',
        afterHash: contentHash,
        afterSizeBytes: 12,
        detectedAt: '2026-07-24T00:00:01.000Z',
      },
    ],
    generatedArtifactRefs: ['artifact:provider'],
    startedAt: '2026-07-24T00:00:00.000Z',
    completedAt: '2026-07-24T00:00:01.000Z',
    ...overrides,
  };
}

function collectionPlan(): ExecutionOutputCollectionPlan {
  return {
    executionId: 'execution.example',
    status: 'completed',
    items: [
      {
        relativePath: 'outputs/report.json',
        contentHash,
        sizeBytes: 12,
        kind: 'dataset',
      },
    ],
    existingArtifactRefs: ['artifact:provider'],
    totalBytes: 12,
    finalize: true,
    skipped: {
      not_included: 0,
      excluded: 0,
      unsupported_mutation: 0,
      missing_integrity_evidence: 0,
      artifact_limit: 0,
      byte_limit: 0,
    },
  };
}

function collectionResult(): ExecutionOutputCollectionResult {
  return {
    executionId: 'execution.example',
    collected: [
      {
        relativePath: 'outputs/report.json',
        artifactRef: 'artifact:report',
        versionId: 'artifact:report:v1',
        contentHash,
        sizeBytes: 12,
        status: 'final',
      },
    ],
    existingArtifactRefs: ['artifact:provider'],
    artifactRefs: ['artifact:provider', 'artifact:report'],
    finalizedArtifactRefs: ['artifact:report'],
  };
}

function collectionContext() {
  return {
    operationId: 'operation.collect',
    principal: {
      principalId: 'user.example',
      type: 'user' as const,
      userId: 'user.example',
      tenantId: 'tenant.example',
      permissionScopes: ['artifact:write'],
    },
    profileRef: { id: 'artifact-profile.execution', version: '1.0.0' },
    userId: 'user.example',
    tenantId: 'tenant.example',
    workspaceId: 'workspace.example',
    runId: 'run.example',
  };
}

function committedRecord(record: ExecutionRecord, result: CommandExecutionResult): ExecutionRecord {
  const revision = record.revision + 1;
  return {
    ...record,
    revision,
    status: result.status,
    sandboxId: result.sandboxId,
    result: { ...result, revision },
    lease: undefined,
    updatedAt: '2026-07-24T00:00:03.000Z',
  };
}

function terminalError(
  status:
    | 'cancelled'
    | 'timed_out'
    | 'oom_killed'
    | 'resource_exceeded'
    | 'failed'
    | 'quarantined'
): NonNullable<CommandExecutionResult['error']> {
  const code = {
    cancelled: 'EXECUTION_CANCELLED',
    timed_out: 'EXECUTION_TIMEOUT',
    oom_killed: 'EXECUTION_OOM_KILLED',
    resource_exceeded: 'EXECUTION_RESOURCE_EXCEEDED',
    failed: 'EXECUTION_INTERNAL_ERROR',
    quarantined: 'EXECUTION_INTERNAL_ERROR',
  } as const;
  return { code: code[status], message: `${status} execution`, retryable: false };
}
