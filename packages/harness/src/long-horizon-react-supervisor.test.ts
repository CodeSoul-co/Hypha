import { describe, expect, it } from 'vitest';
import { hashCanonicalJson, type ContinueReActCommandPayloadV1 } from '@hypha/core';
import type { ReActContinuationCheckpoint, ReActRunContext, ReActRunResult } from '@hypha/kernel';
import {
  LongHorizonReActSupervisor,
  ServerIngressReActContinuationScheduler,
  type EnqueueReActContinuationCommandRequest,
} from './long-horizon-react-supervisor';

const now = '2026-07-23T13:00:00.000Z';

function checkpoint(): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: 'run.long-horizon',
    stepId: 'react',
    scopeHash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    agentRef: { id: 'agent.long-horizon', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'continue' }],
    iterations: 1,
    modelCalls: 2,
    toolCalls: 1,
    totalTokens: 20,
    toolInvocationSequence: 1,
    stepSequence: 10,
    consecutiveNoProgress: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function context(): ReActRunContext {
  return {
    runId: 'run.long-horizon',
    stepId: 'react',
    agent: {
      id: 'agent.long-horizon',
      version: '1.0.0',
      name: 'Long Horizon Agent',
      modelAlias: 'default-chat',
    },
    messages: [{ role: 'user', content: 'continue' }],
  };
}

function suspended(reason: 'quantum_exhausted' | 'iteration_budget_exhausted'): ReActRunResult {
  const retryable = reason === 'quantum_exhausted';
  return {
    runId: 'run.long-horizon',
    status: 'suspended',
    steps: [],
    checkpoint: checkpoint(),
    suspension: {
      reason,
      retryable,
      requiresHumanReview: !retryable,
      message: reason,
    },
  };
}

function payload(value: ReActContinuationCheckpoint): ContinueReActCommandPayloadV1 {
  return {
    version: '1.0.0',
    runId: value.runId,
    sessionId: 'session.long-horizon',
    userId: 'user.long-horizon',
    stepId: value.stepId,
    checkpointRef: `react-checkpoint:${value.runId}:${value.stepId}:${value.stepSequence}`,
    checkpointHash: hashCanonicalJson(value),
    checkpointSequence: value.stepSequence,
    scopeHash: value.scopeHash,
    agentRef: value.agentRef,
    domainPackRef: { id: 'domain.long-horizon', version: '1.0.0' },
    promptSnapshotRef: 'prompt-snapshot:long-horizon',
    promptSnapshotHash: `sha256:${'1'.repeat(64)}`,
    capabilitySnapshotRef: 'capability-snapshot:long-horizon',
    capabilitySnapshotHash: `sha256:${'2'.repeat(64)}`,
    globalBudget: {
      iterations: 20,
      modelCalls: 20,
      toolCalls: 10,
      totalTokens: 100_000,
    },
    cancellationRevision: 0,
    createdAt: now,
  };
}

describe('LongHorizonReActSupervisor', () => {
  it('schedules a retryable quantum through the Server payload ingress', async () => {
    const enqueued: EnqueueReActContinuationCommandRequest[] = [];
    const scheduler = new ServerIngressReActContinuationScheduler({
      ingress: {
        async enqueue(request) {
          const reused = enqueued.some((candidate) => candidate.id === request.id);
          if (!reused) enqueued.push(request);
          return { id: request.id, status: reused ? 'reused' : 'queued' };
        },
      },
      now: () => now,
    });
    const supervisor = new LongHorizonReActSupervisor({
      runner: { run: async () => suspended('quantum_exhausted') },
      scheduler,
      now: () => now,
    });
    const input = {
      context: context(),
      continuation: {
        buildPayload: payload,
      },
    };

    await expect(supervisor.runQuantum(input)).resolves.toMatchObject({
      disposition: 'continuation_scheduled',
      scheduleReused: false,
    });
    await expect(supervisor.runQuantum(input)).resolves.toMatchObject({
      disposition: 'continuation_scheduled',
      scheduleReused: true,
    });
    expect(enqueued).toMatchObject([
      {
        commandType: 'continue_react',
        targetRunId: 'run.long-horizon',
        payload: {
          checkpointSequence: 10,
          checkpointHash: hashCanonicalJson(checkpoint()),
        },
      },
    ]);
  });

  it('does not auto-schedule global budget exhaustion or missing scheduling context', async () => {
    let scheduled = 0;
    const scheduler = {
      async schedule() {
        scheduled += 1;
        return { taskId: 'unexpected', reused: false };
      },
    };
    const exhausted = new LongHorizonReActSupervisor({
      runner: { run: async () => suspended('iteration_budget_exhausted') },
      scheduler,
    });
    await expect(
      exhausted.runQuantum({
        context: context(),
        continuation: {
          buildPayload: payload,
        },
      })
    ).resolves.toMatchObject({ disposition: 'waiting_human' });

    const manual = new LongHorizonReActSupervisor({
      runner: { run: async () => suspended('quantum_exhausted') },
      scheduler,
    });
    await expect(manual.runQuantum({ context: context() })).resolves.toMatchObject({
      disposition: 'continuation_required',
    });
    expect(scheduled).toBe(0);
  });
});
