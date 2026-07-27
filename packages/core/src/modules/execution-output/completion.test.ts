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
  type DurableExecutionCompletionWorker,
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
