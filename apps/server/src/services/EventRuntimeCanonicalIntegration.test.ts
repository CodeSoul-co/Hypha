import fs from 'fs';
import os from 'os';
import path from 'path';
import { InMemoryEventStore, stableRecoveryHash, type RecoveryFailure } from '@hypha/core';
import { GovernedFSMTransitionService } from '@hypha/harness';
import type { FSMProcessSpec } from '@hypha/fsm';
import { reActContinuationScopeHash, type ReActStep } from '@hypha/kernel';
import { ServerCanonicalRuntime } from '../runtime/ServerCanonicalRuntime';
import { destroyEventRuntime, initializeEventRuntime } from './EventRuntime';

describe('Server EventRuntime canonical integration', () => {
  let canonicalRuntime: ServerCanonicalRuntime | undefined;

  afterEach(async () => {
    await destroyEventRuntime();
    await canonicalRuntime?.close();
    canonicalRuntime = undefined;
  });

  it('starts a custom topology at its declared initial State and supports governed owner transitions', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-custom-fsm-integration-'));
    canonicalRuntime = new ServerCanonicalRuntime({
      filename: path.join(root, 'runtime.sqlite'),
      legacyEvents: new InMemoryEventStore(),
      auditLimits: {
        pageSize: 25,
        pageMaxBytes: 1024 * 1024,
        maxEvents: 100,
        maxBytes: 4 * 1024 * 1024,
        maxDurationMs: 5_000,
      },
    });
    const canonical = await canonicalRuntime.initialize();
    const runtime = initializeEventRuntime({
      events: canonical.events,
      eventDbPath: path.join(root, 'runtime.sqlite'),
      humanWaits: canonical.humanWaits,
    });
    runtime.bindFSMControl(
      new GovernedFSMTransitionService({
        events: canonical.backbone.events,
        projections: canonical.backbone.projections,
        projectionStore: canonical.backbone.projectionStore,
        runLeases: canonical.backbone.runLeases,
      })
    );
    const fsm: FSMProcessSpec = {
      id: 'domain.release.fsm',
      version: '1.0.0',
      initialState: 'Draft',
      states: [
        { id: 'Draft', kind: 'domain' },
        { id: 'Review', kind: 'domain' },
        { id: 'Released', kind: 'completed' },
      ],
      transitions: [
        { from: 'Draft', to: 'Review' },
        { from: 'Review', to: 'Released' },
      ],
      terminalStates: ['Released'],
    };
    const started = await runtime.startRun({
      userId: 'user.custom-fsm',
      sessionId: 'session.custom-fsm',
      fsm,
    });

    const initial = await runtime.inspectOwnedFSM(started.runId, 'user.custom-fsm');
    expect(initial).toMatchObject({
      processId: fsm.id,
      currentState: 'Draft',
      statePath: ['Draft'],
      allowedTransitions: [{ to: 'Review' }],
    });
    const transitioned = await runtime.transitionOwnedFSM({
      runId: started.runId,
      ownerUserId: 'user.custom-fsm',
      principalId: 'user.custom-fsm',
      processId: fsm.id,
      processVersion: fsm.version,
      expectedState: 'Draft',
      expectedRunRevision: initial.runRevision,
      targetState: 'Review',
      reason: 'Move the release candidate into review.',
      idempotencyKey: 'custom-fsm-review',
    });
    expect(transitioned).toMatchObject({
      disposition: 'applied',
      view: { currentState: 'Review', statePath: ['Draft', 'Review'] },
    });
    await expect(
      runtime.transitionOwnedFSM({
        runId: started.runId,
        ownerUserId: 'another-user',
        principalId: 'another-user',
        processId: fsm.id,
        processVersion: fsm.version,
        expectedState: 'Review',
        expectedRunRevision: transitioned.runRevision,
        targetState: 'Released',
        reason: 'Attempt an unauthorized release.',
        idempotencyKey: 'unauthorized-release',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_ACCESS_DENIED' });
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
      cancellations: { cancel: (command) => canonicalRuntime!.cancel(command) },
    });
    const adapters = runtime.canonicalExecutionAdapters();
    canonicalRuntime.composeCancellations({
      activities: adapters.cancellationActivities,
      children: adapters.cancellationChildren,
    });
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

    const reactRun = await runtime.startRun({
      userId: 'user.integration',
      sessionId: 'session.react',
      react: {
        messages: [{ role: 'user', content: 'Return a direct answer.' }],
        agentSpec: {
          id: 'agent.integration',
          version: '1.0.0',
          name: 'Integration Agent',
          modelAlias: 'model.integration',
          systemInstructions: 'Return a direct answer without tools.',
        },
      },
    });
    const prepared = await runtime.prepareCanonicalReActExecution(
      {
        userId: 'user.integration',
        sessionId: 'session.react',
        react: {
          messages: [{ role: 'user', content: 'Return a direct answer.' }],
          agentSpec: {
            id: 'agent.integration',
            version: '1.0.0',
            name: 'Integration Agent',
            modelAlias: 'model.integration',
            systemInstructions: 'Return a direct answer without tools.',
          },
        },
      },
      reactRun.runId
    );
    expect(prepared).not.toBeNull();
    expect(prepared!.context.agent).not.toHaveProperty('promptResolution');
    expect(prepared!.context.agent).not.toHaveProperty('toolRefs');
    await runtime.recordCanonicalReActContextPrepared({
      runId: reactRun.runId,
      stepId: prepared!.context.stepId,
      scopeHash: reActContinuationScopeHash(prepared!.context),
      messageCount: prepared!.context.messages.length,
      activeSkillIds: [],
    });
    const directSteps: ReActStep[] = [
      { id: 'react:1:reason', phase: 'reason' },
      { id: 'react:2:select_action', phase: 'select_action' },
      { id: 'react:3:verify', phase: 'verify' },
      { id: 'react:4:memory_sync', phase: 'memory_sync' },
      { id: 'react:5:complete', phase: 'complete', output: 'done' },
    ];
    for (const step of directSteps) {
      await runtime.recordCanonicalReActStep(reactRun.runId, step);
    }
    const directOutcome = {
      runId: reactRun.runId,
      status: 'completed' as const,
      steps: directSteps,
      output: 'done',
    };
    await runtime.recordCanonicalReActOutcome(reactRun.runId, directOutcome);
    await runtime.recordCanonicalReActOutcome(reactRun.runId, directOutcome);
    await expect(
      composition.events.list({ runId: reactRun.runId, type: 'run.completed' })
    ).resolves.toHaveLength(1);
    await expect(
      composition.events.list({ runId: reactRun.runId, type: 'fsm.state.entered' })
    ).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ payload: expect.objectContaining({ stateId: 'Completed' }) }),
      ])
    );

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

    const governedReview = await runtime.startRun({
      userId: 'user.integration',
      sessionId: 'session.governed-review',
    });
    const governedSubjectHash = `sha256:${'7'.repeat(64)}`;
    await runtime.waitForHumanReview(governedReview.runId, {
      waitId: 'wait.governed-review',
      pendingActionRef: 'task.governed-review',
      reason: 'A governed decision is required',
      humanTasks: [
        {
          taskId: 'task.governed-review',
          kind: 'policy',
          subjectRef: 'react:governed-review@1',
          subjectHash: governedSubjectHash,
          requestedBy: 'agent.runtime',
          allowedDecisionScopes: ['runtime.human-task.decide'],
          requestedAt: '2026-07-26T00:00:02.000Z',
        },
      ],
    });
    await expect(
      runtime.listOwnedRuntimeHumanTasks(governedReview.runId, 'foreign.user')
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_ACCESS_DENIED' });
    await expect(
      runtime.decideOwnedRuntimeHumanTask({
        runId: governedReview.runId,
        ownerUserId: 'user.integration',
        principalId: 'user.integration',
        taskId: 'task.governed-review',
        expectedRevision: 1,
        expectedSubjectHash: `sha256:${'8'.repeat(64)}`,
        decision: 'approved',
        idempotencyKey: 'decision.governed-review.tampered',
      })
    ).rejects.toMatchObject({ code: 'HUMAN_TASK_SUBJECT_MISMATCH' });
    await expect(
      runtime.decideOwnedRuntimeHumanTask({
        runId: governedReview.runId,
        ownerUserId: 'user.integration',
        principalId: 'user.integration',
        taskId: 'task.governed-review',
        expectedRevision: 1,
        expectedSubjectHash: governedSubjectHash,
        decision: 'approved',
        reason: 'Approved after inspecting the bounded plan.',
        idempotencyKey: 'decision.governed-review',
      })
    ).resolves.toMatchObject({
      taskId: 'task.governed-review',
      status: 'approved',
      revision: 2,
      decidedBy: 'user.integration',
    });
    await expect(
      runtime.decideOwnedRuntimeHumanTask({
        runId: governedReview.runId,
        ownerUserId: 'user.integration',
        principalId: 'user.integration',
        taskId: 'task.governed-review',
        expectedRevision: 1,
        expectedSubjectHash: governedSubjectHash,
        decision: 'approved',
        reason: 'Approved after inspecting the bounded plan.',
        idempotencyKey: 'decision.governed-review',
      })
    ).resolves.toMatchObject({ taskId: 'task.governed-review', status: 'approved', revision: 2 });
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

    const cancellable = await runtime.startRun({
      userId: 'user.integration',
      sessionId: 'session.integration',
      workflowRef: { id: 'workflow.cancellable', version: '1.0.0' },
      metadata: { surface: 'http.workflows.execute' },
    });
    await expect(
      runtime.cancelOwnedWorkflowExecution({
        executionId: cancellable.runId,
        userId: 'user.integration',
        idempotencyKey: 'cancel.integration',
      })
    ).resolves.toMatchObject({
      commandId: 'cancel.integration',
      disposition: 'applied',
      projection: { runStatus: 'cancelled' },
    });
    await expect(
      runtime.cancelOwnedWorkflowExecution({
        executionId: cancellable.runId,
        userId: 'foreign.user',
        idempotencyKey: 'cancel.foreign',
      })
    ).resolves.toBeNull();

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
    await expect(legacyEvents.list({ runId: run.runId })).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'model.call.completed',
          payload: { output: 'observed' },
        }),
        expect.objectContaining({
          type: 'workcache.bypass',
          payload: expect.objectContaining({
            reason: 'scope_missing',
          }),
        }),
      ])
    );
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

    await destroyEventRuntime();
    const restarted = initializeEventRuntime({
      events: composition.events,
      eventDbPath: path.join(root, 'runtime.sqlite'),
      humanWaits: composition.humanWaits,
      cancellations: { cancel: (command) => canonicalRuntime!.cancel(command) },
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

    await destroyEventRuntime();
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
