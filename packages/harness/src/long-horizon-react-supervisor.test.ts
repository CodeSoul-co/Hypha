import { describe, expect, it } from 'vitest';
import { hashCanonicalJson, InMemorySessionQueue } from '@hypha/core';
import type { ReActContinuationCheckpoint, ReActRunContext, ReActRunResult } from '@hypha/kernel';
import {
  LongHorizonReActSupervisor,
  SessionQueueReActContinuationScheduler,
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

describe('LongHorizonReActSupervisor', () => {
  it('schedules a retryable quantum exactly once through the durable Session queue', async () => {
    const queue = new InMemorySessionQueue({ now: () => now });
    const scheduler = new SessionQueueReActContinuationScheduler({
      queue,
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
        userId: 'user.long-horizon',
        sessionId: 'session.long-horizon',
        context: {
          ref: 'artifact://react/context/run.long-horizon',
          hash: hashCanonicalJson({ runId: 'run.long-horizon', revision: 1 }),
        },
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
    await expect(
      queue.list({
        scope: {
          userId: 'user.long-horizon',
          sessionId: 'session.long-horizon',
        },
      })
    ).resolves.toMatchObject([
      {
        commandType: 'continue_react',
        targetRunId: 'run.long-horizon',
        payloadRef: 'artifact://react/context/run.long-horizon',
        status: 'queued',
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
          userId: 'user.long-horizon',
          sessionId: 'session.long-horizon',
          context: {
            ref: 'artifact://react/context/run.long-horizon',
            hash: hashCanonicalJson({ revision: 1 }),
          },
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
