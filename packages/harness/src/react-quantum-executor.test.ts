import { describe, expect, it, vi } from 'vitest';
import {
  hashCanonicalJson,
  type ContinueReActCommandPayloadV1,
  type ReActQuantumDescriptor,
  type SessionCommandRecord,
} from '@codesoul-co/core';
import {
  InMemoryReActContinuationCheckpointStore,
  type ReActContinuationCheckpoint,
  type ReActRunContext,
  type ReActRunResult,
} from '@codesoul-co/kernel';
import {
  ReActQuantumExecutor,
  createContinuationReActQuantumDescriptor,
  type ReActContextSnapshot,
  type ReActContextSnapshotStore,
  type ReActQuantumRuntimeState,
} from './react-quantum-executor';

const now = '2026-07-24T04:00:00.000Z';
const scopeHash = `sha256:${'1'.repeat(64)}`;

function checkpoint(): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: 'run.quantum',
    stepId: 'react',
    scopeHash,
    agentRef: { id: 'agent.quantum', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'continue' }],
    iterations: 2,
    modelCalls: 2,
    toolCalls: 1,
    totalTokens: 100,
    toolInvocationSequence: 1,
    stepSequence: 5,
    consecutiveNoProgress: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function context(): ReActRunContext {
  return {
    runId: 'run.quantum',
    stepId: 'react',
    agent: {
      id: 'agent.quantum',
      version: '1.0.0',
      name: 'Quantum Agent',
      modelAlias: 'default',
    },
    messages: [{ role: 'user', content: 'continue' }],
  };
}

function payload(): ContinueReActCommandPayloadV1 {
  const value = checkpoint();
  return {
    version: '1.0.0',
    runId: value.runId,
    sessionId: 'session.quantum',
    userId: 'user.quantum',
    stepId: value.stepId,
    checkpointRef: 'react-checkpoint:run.quantum:react:5',
    checkpointHash: hashCanonicalJson(value),
    checkpointSequence: value.stepSequence,
    scopeHash,
    agentRef: value.agentRef,
    domainPackRef: { id: 'domain.quantum', version: '1.0.0' },
    workflowRef: { id: 'workflow.quantum', version: '1.0.0' },
    promptSnapshotRef: 'prompt-snapshot:quantum',
    promptSnapshotHash: `sha256:${'2'.repeat(64)}`,
    capabilitySnapshotRef: 'capability-snapshot:quantum',
    capabilitySnapshotHash: `sha256:${'3'.repeat(64)}`,
    pendingOperationReceipts: ['receipt.pending'],
    globalBudget: {
      iterations: 20,
      modelCalls: 18,
      toolCalls: 10,
      totalTokens: 50_000,
    },
    cancellationRevision: 2,
    createdAt: now,
  };
}

function command(value = payload()): SessionCommandRecord {
  return {
    id: 'command.quantum',
    commandType: 'continue_react',
    idempotencyKey: 'continuation.quantum',
    userId: value.userId,
    sessionId: value.sessionId,
    targetRunId: value.runId,
    enqueueSequence: 1,
    priority: 50,
    attempts: 1,
    maxAttempts: 5,
    leaseEpoch: 3,
    payloadHash: hashCanonicalJson(value),
    status: 'claimed',
    claimedBy: 'worker.quantum',
    claimToken: `sha256:${'4'.repeat(64)}`,
    leaseExpiresAt: '2026-07-24T04:01:00.000Z',
    createdAt: now,
    availableAt: now,
  };
}

function descriptor(value = payload()): ReActQuantumDescriptor {
  const claimed = command(value);
  return createContinuationReActQuantumDescriptor(claimed, value);
}

function runtimeState(overrides: Partial<ReActQuantumRuntimeState> = {}): ReActQuantumRuntimeState {
  const value = payload();
  return {
    runId: value.runId,
    sessionId: value.sessionId,
    userId: value.userId,
    status: 'running',
    cancellationRevision: value.cancellationRevision,
    agentRef: value.agentRef,
    domainPackRef: value.domainPackRef,
    workflowRef: value.workflowRef,
    promptSnapshotHash: value.promptSnapshotHash,
    capabilitySnapshotHash: value.capabilitySnapshotHash,
    ...overrides,
  };
}

function snapshot(): ReActContextSnapshot {
  const value = checkpoint();
  return {
    version: '1.0.0',
    runId: value.runId,
    stepId: value.stepId,
    scopeHash: value.scopeHash,
    agentRef: value.agentRef,
    context: context(),
    createdAt: now,
  };
}

describe('ReActQuantumExecutor', () => {
  it('uses the same executor for an initial HTTP quantum without a continuation command', async () => {
    const run = vi.fn(
      async (): Promise<ReActRunResult> => ({
        runId: 'run.quantum',
        status: 'completed',
        steps: [],
      })
    );
    const value = payload();
    const initial: ReActQuantumDescriptor = {
      version: '1.0.0',
      trigger: 'initial',
      runId: value.runId,
      sessionId: value.sessionId,
      userId: value.userId,
      stepId: value.stepId,
      scopeHash: value.scopeHash,
      agentRef: value.agentRef,
      domainPackRef: value.domainPackRef,
      workflowRef: value.workflowRef,
      promptSnapshotRef: value.promptSnapshotRef,
      promptSnapshotHash: value.promptSnapshotHash,
      capabilitySnapshotRef: value.capabilitySnapshotRef,
      capabilitySnapshotHash: value.capabilitySnapshotHash,
      globalBudget: value.globalBudget,
      cancellationRevision: value.cancellationRevision,
      createdAt: value.createdAt,
    };
    const executor = new ReActQuantumExecutor({
      checkpoints: new InMemoryReActContinuationCheckpointStore(),
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState() },
      runnerFactory: { create: async () => ({ run }) },
      outcomeRecorder: { record: async () => undefined },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        descriptor: initial,
        signal: new AbortController().signal,
      })
    ).resolves.toMatchObject({ disposition: 'completed' });
    expect(run).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({ runId: 'run.quantum' }),
      expect.not.objectContaining({ checkpoint: expect.anything() })
    );
  });

  it('rebuilds verified state and executes exactly one bounded quantum', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const stores = contextStore(snapshot());
    const sequence: string[] = [];
    const react: ReActRunResult = {
      runId: 'run.quantum',
      status: 'suspended',
      steps: [],
      checkpoint: checkpoint(),
      suspension: {
        reason: 'quantum_exhausted',
        retryable: true,
        requiresHumanReview: false,
        message: 'continue',
      },
    };
    const run = vi.fn(async () => react);
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: stores,
      runtime: {
        async replay() {
          sequence.push('replay');
          return runtimeState();
        },
      },
      revisionValidator: {
        async validate() {
          sequence.push('revisions');
        },
      },
      receiptReconciler: {
        async reconcile(input) {
          sequence.push(`receipts:${input.receiptRefs.join(',')}`);
        },
      },
      runnerFactory: {
        async create() {
          sequence.push('runner');
          return { run };
        },
      },
      outcomeRecorder: {
        async record(input) {
          sequence.push(`outcome:${input.disposition}`);
        },
      },
      quantumIterations: 4,
      now: () => now,
    });
    const signal = new AbortController().signal;

    await expect(
      executor.runOneQuantum({ command: command(), descriptor: descriptor(), signal })
    ).resolves.toMatchObject({ disposition: 'suspended', react });
    expect(sequence).toEqual([
      'replay',
      'revisions',
      'receipts:receipt.pending',
      'runner',
      'outcome:suspended',
    ]);
    expect(run).toHaveBeenCalledTimes(1);
    expect(run).toHaveBeenCalledWith(
      expect.objectContaining({ runId: 'run.quantum' }),
      expect.objectContaining({
        checkpoint: expect.objectContaining({ stepSequence: 5 }),
        executionBudget: expect.objectContaining({
          maxIterations: 20,
          quantumIterations: 4,
        }),
        abortSignal: signal,
      })
    );
  });

  it('rejects stale command and cancellation identities before executing', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const run = vi.fn();
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState({ cancellationRevision: 3 }) },
      runnerFactory: { create: async () => ({ run }) },
      outcomeRecorder: { record: async () => undefined },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: { ...command(), claimToken: `sha256:${'9'.repeat(64)}` },
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(
      executor.runOneQuantum({
        command: command(),
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_CANCELLED' });
    expect(run).not.toHaveBeenCalled();
  });

  it('does not execute while the replayed Run is terminal or waiting for a HumanTask', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    const run = vi.fn();
    const state = runtimeState({ status: 'waiting_human' });
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => state },
      runnerFactory: { create: async () => ({ run }) },
      outcomeRecorder: { record: async () => undefined },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: command(),
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).resolves.toEqual({ disposition: 'waiting_human' });
    state.status = 'completed';
    await expect(
      executor.runOneQuantum({
        command: command(),
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).resolves.toEqual({ disposition: 'terminal' });
    expect(run).not.toHaveBeenCalled();
  });

  it('does not record an outcome when the lease signal is lost during execution', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const controller = new AbortController();
    const record = vi.fn();
    const { pendingOperationReceipts: _pendingOperationReceipts, ...value } = payload();
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState() },
      runnerFactory: {
        create: async () => ({
          run: async () => {
            controller.abort();
            return {
              runId: 'run.quantum',
              status: 'completed',
              steps: [],
            };
          },
        }),
      },
      outcomeRecorder: { record },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: command(value),
        descriptor: descriptor(value),
        signal: controller.signal,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_CANCELLED' });
    expect(record).not.toHaveBeenCalled();
  });

  it('retains the checkpoint until a terminal outcome is durably recorded', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const terminal: ReActRunResult = {
      runId: 'run.quantum',
      status: 'completed',
      steps: [],
      output: 'done',
    };
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState() },
      receiptReconciler: { reconcile: async () => undefined },
      runnerFactory: { create: async () => ({ run: async () => terminal }) },
      outcomeRecorder: {
        record: async () => {
          throw new Error('event store unavailable');
        },
      },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: command(),
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).rejects.toThrow('event store unavailable');
    await expect(checkpoints.get('run.quantum', 'react', scopeHash)).resolves.toMatchObject({
      stepSequence: 5,
    });
  });

  it('records a fail-closed timeout without invoking providers', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const run = vi.fn();
    const record = vi.fn();
    const value = {
      ...payload(),
      deadlineAt: '2026-07-24T03:59:59.000Z',
    };
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState() },
      revisionValidator: { validate: async () => undefined },
      runnerFactory: { create: async () => ({ run }) },
      outcomeRecorder: { record },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: command(value),
        descriptor: descriptor(value),
        signal: new AbortController().signal,
      })
    ).resolves.toMatchObject({
      disposition: 'failed',
      react: { status: 'failed', error: { code: 'RUNTIME_RUN_TIMEOUT' } },
    });
    expect(run).not.toHaveBeenCalled();
    expect(record).toHaveBeenCalledWith(
      expect.objectContaining({
        disposition: 'failed',
        react: expect.objectContaining({ status: 'failed' }),
      })
    );
    await expect(checkpoints.get('run.quantum', 'react', scopeHash)).resolves.toBeNull();
  });

  it('fails closed when pending receipts have no production reconciler', async () => {
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.quantum');
    const run = vi.fn();
    const executor = new ReActQuantumExecutor({
      checkpoints,
      contextSnapshots: contextStore(snapshot()),
      runtime: { replay: async () => runtimeState() },
      runnerFactory: { create: async () => ({ run }) },
      outcomeRecorder: { record: async () => undefined },
      quantumIterations: 4,
      now: () => now,
    });

    await expect(
      executor.runOneQuantum({
        command: command(),
        descriptor: descriptor(),
        signal: new AbortController().signal,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE' });
    expect(run).not.toHaveBeenCalled();
  });
});

function contextStore(initial: ReActContextSnapshot): ReActContextSnapshotStore {
  let current: ReActContextSnapshot | null = structuredClone(initial);
  return {
    async put(value) {
      current = structuredClone(value);
      return {
        snapshot: structuredClone(value),
        snapshotHash: hashCanonicalJson(value),
        reused: false,
      };
    },
    async get(scope) {
      return current?.scopeHash === scope ? structuredClone(current) : null;
    },
    async delete(scope) {
      if (current?.scopeHash !== scope) return false;
      current = null;
      return true;
    },
  };
}
