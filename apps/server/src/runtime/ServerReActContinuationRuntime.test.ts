import {
  hashCanonicalJson,
  type ContinueReActCommandPayloadV1,
  type SessionCommandRecord,
} from '@codesoul-co/hypha-core';
import { LongHorizonReActSupervisor, type ReActContinuationScheduleRequest } from '@codesoul-co/hypha-harness';
import {
  InMemoryReActContinuationCheckpointStore,
  type ReActContinuationCheckpoint,
  type ReActRunResult,
} from '@codesoul-co/hypha-kernel';
import {
  createServerReActContinuationDefinition,
  createServerReActContinuationRuntime,
} from './ServerReActContinuationRuntime';

const now = '2026-07-24T05:00:00.000Z';
const scopeHash = `sha256:${'1'.repeat(64)}`;

function checkpoint(stepSequence = 5): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: 'run.continuation',
    stepId: 'react',
    scopeHash,
    agentRef: { id: 'agent.continuation', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'continue' }],
    iterations: stepSequence,
    modelCalls: stepSequence,
    toolCalls: 1,
    totalTokens: 100,
    toolInvocationSequence: 1,
    stepSequence,
    consecutiveNoProgress: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function payload(): ContinueReActCommandPayloadV1 {
  const current = checkpoint();
  return {
    version: '1.0.0',
    runId: current.runId,
    sessionId: 'session.continuation',
    userId: 'user.continuation',
    stepId: current.stepId,
    checkpointRef: 'react-checkpoint:run.continuation:react:5',
    checkpointHash: hashCanonicalJson(current),
    checkpointSequence: current.stepSequence,
    scopeHash,
    agentRef: current.agentRef,
    domainPackRef: { id: 'domain.continuation', version: '1.0.0' },
    promptSnapshotRef: 'prompt-snapshot:continuation',
    promptSnapshotHash: `sha256:${'2'.repeat(64)}`,
    capabilitySnapshotRef: 'capability-snapshot:continuation',
    capabilitySnapshotHash: `sha256:${'3'.repeat(64)}`,
    globalBudget: {
      iterations: 20,
      modelCalls: 20,
      toolCalls: 10,
      totalTokens: 50_000,
    },
    cancellationRevision: 0,
    createdAt: now,
  };
}

function command(value = payload()): SessionCommandRecord {
  return {
    id: 'command.continuation',
    commandType: 'continue_react',
    idempotencyKey: 'continuation.request',
    userId: value.userId,
    sessionId: value.sessionId,
    targetRunId: value.runId,
    enqueueSequence: 1,
    priority: 50,
    attempts: 1,
    maxAttempts: 3,
    leaseEpoch: 2,
    payloadHash: hashCanonicalJson(value),
    status: 'claimed',
    claimedBy: 'worker.runtime',
    claimToken: `sha256:${'4'.repeat(64)}`,
    leaseExpiresAt: '2026-07-24T05:01:00.000Z',
    createdAt: now,
    availableAt: now,
  };
}

describe('Server ReAct continuation definition', () => {
  it('composes one shared Server supervisor and command definition', () => {
    const composed = createServerReActContinuationRuntime({
      executor: { runOneQuantum: jest.fn() },
      runner: { run: jest.fn() },
      scheduler: { schedule: jest.fn() },
      checkpoints: new InMemoryReActContinuationCheckpointStore(),
      now: () => now,
    });

    expect(composed.supervisor).toBeInstanceOf(LongHorizonReActSupervisor);
    expect(composed.definition.decode(payload())).toEqual(payload());
  });

  it('executes one quantum and schedules only the next durable continuation', async () => {
    const current = payload();
    const nextCheckpoint = checkpoint(6);
    const schedule = jest.fn(async (_request: ReActContinuationScheduleRequest) => ({
      taskId: 'command.next',
      reused: false,
    }));
    const supervisor = new LongHorizonReActSupervisor({
      runner: { run: jest.fn() },
      scheduler: { schedule },
      now: () => now,
    });
    const react: ReActRunResult = {
      runId: current.runId,
      status: 'suspended',
      steps: [],
      checkpoint: nextCheckpoint,
      suspension: {
        reason: 'quantum_exhausted',
        retryable: true,
        requiresHumanReview: false,
        message: 'continue',
      },
    };
    const executor = {
      runOneQuantum: jest.fn(async () => ({
        disposition: 'suspended' as const,
        react,
      })),
    };
    const definition = createServerReActContinuationDefinition({
      executor,
      supervisor,
      checkpoints: new InMemoryReActContinuationCheckpointStore(),
      now: () => now,
    });

    await expect(
      definition.handle({
        command: { ...command(current), commandType: 'continue_react' },
        payload: current,
        signal: new AbortController().signal,
        claimToken: command(current).claimToken!,
        leaseEpoch: command(current).leaseEpoch,
      })
    ).resolves.toEqual({ disposition: 'applied', resultRunId: current.runId });

    expect(executor.runOneQuantum).toHaveBeenCalledTimes(1);
    expect(schedule).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({
          checkpointSequence: 6,
          checkpointHash: hashCanonicalJson(nextCheckpoint),
        }),
      })
    );
  });

  it('clears the checkpoint when replay proves that the Run is terminal', async () => {
    const current = payload();
    const checkpoints = new InMemoryReActContinuationCheckpointStore();
    await checkpoints.put(checkpoint(), 'checkpoint.current');
    const definition = createServerReActContinuationDefinition({
      executor: {
        runOneQuantum: async () => ({ disposition: 'terminal' }),
      },
      supervisor: new LongHorizonReActSupervisor({
        runner: { run: jest.fn() },
        now: () => now,
      }),
      checkpoints,
      now: () => now,
    });

    await expect(
      definition.handle({
        command: { ...command(current), commandType: 'continue_react' },
        payload: current,
        signal: new AbortController().signal,
        claimToken: command(current).claimToken!,
        leaseEpoch: command(current).leaseEpoch,
      })
    ).resolves.toEqual({ disposition: 'applied', resultRunId: current.runId });
    await expect(
      checkpoints.get(current.runId, current.stepId, current.scopeHash)
    ).resolves.toBeNull();
  });
});
