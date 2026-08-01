import fs from 'fs';
import os from 'os';
import path from 'path';
import { InMemoryEventStore, stableRecoveryHash, type RecoveryFailure } from '@hypha/core';
import { ServerCanonicalRuntime } from '../runtime/ServerCanonicalRuntime';
import { destroyEventRuntime, initializeEventRuntime } from './EventRuntime';

describe('Server EventRuntime canonical integration', () => {
  let canonicalRuntime: ServerCanonicalRuntime | undefined;

  afterEach(async () => {
    destroyEventRuntime();
    await canonicalRuntime?.close();
    canonicalRuntime = undefined;
  });

  it('writes canonical Runtime facts to the audited store and keeps module observations legacy', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-runtime-integration-'));
    const legacyEvents = new InMemoryEventStore();
    canonicalRuntime = new ServerCanonicalRuntime({
      filename: path.join(root, 'runtime.sqlite'),
      legacyEvents,
      auditLimits: {
        pageSize: 25,
        pageMaxBytes: 1024 * 1024,
        maxEvents: 100,
        maxBytes: 4 * 1024 * 1024,
        maxDurationMs: 5_000,
      },
    });
    const composition = await canonicalRuntime.initialize();
    const runtime = initializeEventRuntime({
      events: composition.events,
      eventDbPath: path.join(root, 'runtime.sqlite'),
      humanWaits: composition.humanWaits,
    });
    const adapters = runtime.canonicalExecutionAdapters();
    expect(adapters.fsmSpec.id).toBeTruthy();
    await expect(
      adapters.inference.infer({
        runId: 'run.invalid',
        stepId: 'step.invalid',
        modelAlias: 'model.invalid',
        input: {},
      })
    ).rejects.toMatchObject({ code: 'INFERENCE_INVALID_INPUT' });
    await expect(
      adapters.toolRunner.run({
        toolId: 'utility.text',
        input: {},
        context: { runId: 'run.invalid', stepId: 'step.invalid' },
      })
    ).rejects.toMatchObject({ code: 'TOOL_INVALID_INPUT' });

    const run = await runtime.startRun({
      userId: 'user.integration',
      sessionId: 'session.integration',
    });
    await runtime.waitForHumanReview(run.runId, {
      waitId: 'wait.integration',
      pendingActionRef: 'tool.integration',
      reason: 'Integration approval required',
    });
    await composition.humanWaits.resolve({
      commandId: 'resolve.integration',
      scope: {
        userId: 'user.integration',
        sessionId: run.runtimeSessionId,
        runId: run.runId,
      },
      ownerId: 'test.review-worker',
      leaseTtlMs: 30_000,
      waitId: 'wait.integration',
      pendingActionRef: 'tool.integration',
      principalId: 'reviewer.integration',
      decision: 'approved',
      resolvedAt: '2026-07-26T00:00:01.000Z',
      idempotencyKey: 'resolve.integration',
    });
    await runtime.transition(run.runId, 'ContextBuilt', { approval: 'approved' });
    await runtime.record(run.runId, 'model.call.completed', { output: 'observed' }, 'model-1');
    const cacheFailure: RecoveryFailure = {
      id: 'cache-failure.integration',
      module: 'cache',
      category: 'cache_failure',
      code: 'CACHE_READ_FAILED',
      message: 'Optional inference cache was bypassed.',
      occurredAt: '2026-07-26T00:00:00.000Z',
      retryable: true,
      sideEffectState: 'none',
      evidence: {
        observedAt: '2026-07-26T00:00:00.000Z',
        operationKey: 'cache:read:integration',
        dependencyKey: 'cache:integration',
        state: 'bypassed',
      },
      metadata: {
        runId: run.runId,
        stepId: 'cache-1',
      },
    };
    await (
      runtime as unknown as {
        recordBypassedCacheFailure(failure: RecoveryFailure): Promise<void>;
      }
    ).recordBypassedCacheFailure(cacheFailure);

    await expect(
      composition.events.list({ runId: run.runId, type: 'run.started' })
    ).resolves.toEqual([
      expect.objectContaining({
        type: 'run.started',
        userId: 'user.integration',
        payload: expect.objectContaining({ runId: run.runId }),
      }),
    ]);
    await expect(
      composition.events.list({ runId: run.runId, type: 'run.waiting_human' })
    ).resolves.toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          waitId: 'wait.integration',
        }),
      }),
    ]);
    await expect(
      composition.events.list({ runId: run.runId, type: 'run.resumed' })
    ).resolves.toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          resume: expect.objectContaining({
            waitId: 'wait.integration',
            principalId: 'reviewer.integration',
          }),
        }),
      }),
    ]);
    await expect(legacyEvents.list({ runId: run.runId })).resolves.toEqual([
      expect.objectContaining({
        type: 'model.call.completed',
        payload: { output: 'observed' },
      }),
    ]);
    await expect(
      composition.events.list({ runId: run.runId, type: 'recovery.case.opened' })
    ).resolves.toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          caseId: cacheFailure.id,
          status: 'active',
          cycles: 1,
          candidateId: cacheFailure.id,
          candidateHash: stableRecoveryHash(cacheFailure.evidence),
          safeAction: 'apply_observation',
        }),
      }),
    ]);
    await expect(
      composition.events.list({ runId: run.runId, type: 'recovery.case.resolved' })
    ).resolves.toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          caseId: cacheFailure.id,
          status: 'recovered',
          disposition: 'recovered',
        }),
      }),
    ]);

    destroyEventRuntime();
    const restarted = initializeEventRuntime({
      events: composition.events,
      eventDbPath: path.join(root, 'runtime.sqlite'),
      humanWaits: composition.humanWaits,
    });
    await restarted.transition(run.runId, 'Reasoning', { resumedAfterRestart: true });
    await expect(
      composition.events.list({ runId: run.runId, type: 'fsm.state.entered' })
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payload: expect.objectContaining({
            stateId: 'Reasoning',
            snapshot: expect.objectContaining({ currentState: 'Reasoning' }),
          }),
        }),
      ])
    );
    await restarted.startRun({
      userId: 'user.integration',
      sessionId: 'session.integration',
    });
    await expect(
      composition.events.list({
        userId: 'user.integration',
        sessionId: 'user:user.integration:session:session.integration',
        type: 'session.created',
      })
    ).resolves.toHaveLength(1);

    destroyEventRuntime();
    await canonicalRuntime.close();
    canonicalRuntime = new ServerCanonicalRuntime({
      filename: path.join(root, 'runtime.sqlite'),
      legacyEvents,
      auditLimits: {
        pageSize: 25,
        pageMaxBytes: 1024 * 1024,
        maxEvents: 100,
        maxBytes: 4 * 1024 * 1024,
        maxDurationMs: 5_000,
      },
    });
    await expect(canonicalRuntime.initialize()).resolves.toMatchObject({
      migration: expect.objectContaining({ quarantinedEvents: 0 }),
    });
  });
});
