import fs from 'fs';
import os from 'os';
import path from 'path';
import { createRuntimeOrchestrationProjectionDefinition } from '@hypha/core';
import { getEventRuntime } from './EventRuntime';

describe('EventRuntime canonical transitions', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-runtime-transition-'));
  process.env.HYPHA_RUNTIME_EVENT_DB = path.join(root, 'legacy.sqlite');
  process.env.HYPHA_CANONICAL_RUNTIME_DB = path.join(root, 'canonical.sqlite');
  process.env.HYPHA_TOOL_RUNTIME_STORE = path.join(root, 'tools.json');
  process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT = path.join(root, 'tool-snapshots');
  process.env.HYPHA_TOOL_ARTIFACT_ROOT = path.join(root, 'tool-artifacts');
  process.env.HYPHA_TOOL_OBSERVATION_ROOT = path.join(root, 'tool-observations');
  process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT = path.join(root, 'session-command-artifacts');
  const runtime = getEventRuntime();

  beforeAll(async () => {
    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });
  });

  afterAll(async () => {
    await runtime.close();
  });

  async function seedPendingWait(
    runId: string,
    userId: string,
    wait:
      | { type: 'pause'; key: string }
      | {
          type: 'signal';
          key: string;
          expectedSchema: Record<string, unknown>;
          expiresAt: string;
        }
  ): Promise<void> {
    const owned = await runtime.requireOwnedRunScope(runId, userId);
    const events = runtime.canonicalRuntime().events;
    const scope = { userId, runId };
    const head = await events.getStreamHead(scope);
    if (!head) throw new Error('Expected a canonical Run Event stream');
    const timestamp = new Date().toISOString();
    const waitId = `wait:${runId}`;
    const event = (
      id: string,
      type: 'runtime.wait.created' | 'run.paused' | 'run.waiting_signal'
    ) => ({
      id,
      type,
      version: '1.0.0' as const,
      userId,
      sessionId: owned.sessionId,
      runId,
      fsmState: 'RunInitialized',
      timestamp,
      payload:
        type === 'runtime.wait.created'
          ? {
              waitId,
              stateId: 'RunInitialized',
              stateAttempt: 1,
              wait,
              createdAt: timestamp,
            }
          : { waitId, stateId: 'RunInitialized', wait },
      metadata: { stateAttempt: 1 },
    });
    await events.append({
      scope,
      events: [
        event(`event:${runId}:wait-created`, 'runtime.wait.created'),
        event(
          `event:${runId}:waiting`,
          wait.type === 'pause' ? 'run.paused' : 'run.waiting_signal'
        ),
      ],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      idempotencyKey: `seed-wait:${runId}`,
    });
  }

  async function seedPendingTimer(runId: string, userId: string, expiresAt: string): Promise<void> {
    const owned = await runtime.requireOwnedRunScope(runId, userId);
    const events = runtime.canonicalRuntime().events;
    const scope = { userId, runId };
    const head = await events.getStreamHead(scope);
    if (!head) throw new Error('Expected a canonical Run Event stream');
    const timestamp = new Date(Date.parse(expiresAt) - 60_000).toISOString();
    const waitId = `wait:${runId}`;
    const wait = { type: 'timer', expiresAt } as const;
    const baseEvent = {
      version: '1.0.0' as const,
      userId,
      sessionId: owned.sessionId,
      runId,
      fsmState: 'RunInitialized',
      timestamp,
      metadata: { stateAttempt: 1 },
    };
    await events.append({
      scope,
      events: [
        {
          ...baseEvent,
          id: `event:${runId}:wait-created`,
          type: 'runtime.wait.created',
          payload: {
            waitId,
            stateId: 'RunInitialized',
            stateAttempt: 1,
            wait,
            createdAt: timestamp,
          },
        },
        {
          ...baseEvent,
          id: `event:${runId}:timer-created`,
          type: 'runtime.timer.created',
          payload: { timerId: waitId, waitId, fireAt: expiresAt },
        },
        {
          ...baseEvent,
          id: `event:${runId}:waiting`,
          type: 'run.waiting_timer',
          payload: { waitId, stateId: 'RunInitialized', wait },
        },
      ],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      idempotencyKey: `seed-timer:${runId}`,
    });
  }

  it('executes State transitions through the fenced driver and completes once', async () => {
    const run = await runtime.startRun({
      userId: 'user.transition',
      sessionId: 'session.complete',
      input: { task: 'complete' },
    });
    for (const state of [
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
      'Acting',
      'ObservationRecorded',
      'Verifying',
      'MemorySync',
    ]) {
      await runtime.transition(run.runId, state);
    }
    await runtime.completeRun(run.runId, { answer: 42 });

    const events = await runtime.listEvents(run.runId);
    const completed = events.filter((event) => event.type === 'run.completed');
    expect(completed).toHaveLength(1);
    expect(completed[0]?.payload).toMatchObject({
      terminalState: 'Completed',
      output: { answer: 42 },
    });
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({
      status: 'completed',
    });
    expect(events.filter((event) => event.type === 'fsm.transition.accepted')).toHaveLength(9);
  });

  it('normalizes a failed State result and emits one failed terminal fact', async () => {
    const run = await runtime.startRun({
      userId: 'user.transition',
      sessionId: 'session.failed',
      input: { task: 'fail' },
    });
    await runtime.failRun(run.runId, new Error('expected failure'));

    const events = await runtime.listEvents(run.runId);
    const failed = events.filter((event) => event.type === 'run.failed');
    expect(failed).toHaveLength(1);
    expect(failed[0]?.payload).toMatchObject({
      terminalState: 'Failed',
      error: {
        code: 'RUNTIME_INTERNAL_ERROR',
        message: 'expected failure',
        retryable: false,
        stateId: 'RunInitialized',
      },
    });
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'failed' });
  });

  it('rebuilds a lagging Run projection with schema-backed recovery facts', async () => {
    const run = await runtime.startRun({
      userId: 'user.projection-recovery',
      sessionId: 'session.projection-recovery',
      input: { task: 'recover-projection' },
    });
    const sweep = await runtime.sweepRuntimeRecovery(new Date().toISOString());
    expect(sweep.failed).toBe(0);
    expect(sweep.results).toEqual(
      expect.arrayContaining([expect.objectContaining({ disposition: 'recovered' })])
    );

    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'recovery.case.opened')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'recovery.case.resolved')).toHaveLength(1);
  });

  it('fails closed when an expired State Claim has no durable transition command', async () => {
    const input = {
      userId: 'user.state-claim-recovery',
      sessionId: 'session.state-claim-recovery',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'missing-command' } });
    const canonical = runtime.canonicalRuntime();
    await canonical.projections.update(
      createRuntimeOrchestrationProjectionDefinition(run.runId),
      canonical.projectionStore,
      { userId: input.userId, runId: run.runId }
    );
    const head = await canonical.events.getStreamHead({
      userId: input.userId,
      runId: run.runId,
    });
    const acquiredAt = new Date().toISOString();
    const lease = await canonical.runLeases.acquire({
      userId: input.userId,
      runId: run.runId,
      partitionKey: `runtime:${run.runId}`,
      requestedLeaseId: `lease:${run.runId}:stale`,
      ownerId: 'worker.state-claim.stale',
      ttlMs: 1,
      acquiredAt,
      idempotencyKey: `lease:${run.runId}:stale`,
    });
    await canonical.stateClaims.acquire({
      userId: input.userId,
      runId: run.runId,
      stateId: 'RunInitialized',
      stateAttempt: 1,
      requestedClaimId: `claim:${run.runId}:stale`,
      processRevision: 'default-workflow@1.0.0',
      expectedRunRevision: head!.runRevision,
      runLease: {
        scope: {
          userId: input.userId,
          runId: run.runId,
          partitionKey: `runtime:${run.runId}`,
        },
        guard: {
          leaseId: lease!.id,
          ownerId: lease!.ownerId,
          fencingToken: lease!.fencingToken,
        },
      },
      ttlMs: 1,
      acquiredAt,
      idempotencyKey: `claim:${run.runId}:stale`,
    });
    await new Promise((resolve) => setTimeout(resolve, 5));

    const sweep = await runtime.sweepRuntimeRecovery(new Date().toISOString());

    expect(sweep.failed).toBe(0);
    expect(sweep.results).toEqual(
      expect.arrayContaining([expect.objectContaining({ disposition: 'requires_review' })])
    );
    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'recovery.case.escalated')).toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({ reason: 'LEASE_EXPIRED' }),
      }),
    ]);
  });

  it('reclaims and executes an interrupted durable FSM transition exactly once', async () => {
    const input = {
      userId: 'user.recovery-command',
      sessionId: 'session.recovery-command',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'recover-transition' } });
    const queued = await runtime.enqueueTransitionRun(
      run.runId,
      'ContextBuilt',
      { reason: 'recover interrupted transition' },
      'request.transition.interrupted'
    );
    const scope = { userId: input.userId, sessionId: input.sessionId };
    const claimed = await runtime.canonicalRuntime().sessionQueue.claim({
      scope,
      workerId: 'worker.interrupted',
      now: new Date().toISOString(),
      leaseMs: 1,
    });
    expect(claimed).toMatchObject({ id: queued.id, status: 'claimed', attempts: 1 });
    await new Promise((resolve) => setTimeout(resolve, 5));

    await runtime.startSessionCommandScheduler();
    await runtime.drainSessionCommands(scope);
    await expect(runtime.listSessionCommands(scope)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: queued.id,
          commandType: 'transition',
          status: 'applied',
          attempts: 2,
          resultRunId: run.runId,
        }),
      ])
    );
    const events = await runtime.listEvents(run.runId);
    expect(
      events.filter(
        (event) =>
          event.type === 'fsm.transition.requested' &&
          (event.payload as { commandId?: string }).commandId === queued.id
      )
    ).toHaveLength(1);
    expect(
      events.filter(
        (event) =>
          event.type === 'fsm.transition.accepted' &&
          (event.payload as { commandId?: string }).commandId === queued.id
      )
    ).toHaveLength(1);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'running' });
  });

  it('recovers a durable start_run command through the Server scheduler exactly once', async () => {
    if (!runtime.isSessionCommandSchedulerRunning()) await runtime.startSessionCommandScheduler();
    expect(runtime.isSessionCommandSchedulerRunning()).toBe(true);

    const input = {
      userId: 'user.command',
      sessionId: 'session.command',
      input: { task: 'queued' },
      metadata: { surface: 'test.session-command' },
    };
    const first = await runtime.enqueueStartRun(input, 'request.command.1');
    const reused = await runtime.enqueueStartRun(input, 'request.command.1');
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: first.targetRunId,
      }),
    ]);
    await expect(runtime.projectRun(first.targetRunId!)).resolves.toMatchObject({
      id: first.targetRunId,
      sessionId: expect.any(String),
      status: 'running',
    });
  });

  it('cancels an owned Run through a durable Session command exactly once', async () => {
    if (!runtime.isSessionCommandSchedulerRunning()) await runtime.startSessionCommandScheduler();
    const input = {
      userId: 'user.cancel-command',
      sessionId: 'session.cancel-command',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'cancel-me' } });
    const first = await runtime.enqueueCancelRun(
      { ...input, runId: run.runId, reason: 'No longer required' },
      'request.cancel.1'
    );
    const reused = await runtime.enqueueCancelRun(
      { ...input, runId: run.runId, reason: 'No longer required' },
      'request.cancel.1'
    );
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: run.runId,
      }),
    ]);
    expect(Array.isArray(commands[0]?.resultEventIds)).toBe(true);
    expect(commands[0]?.resultEventIds?.length).toBeGreaterThan(0);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'cancelled' });
  });

  it('rebuilds the child Run graph from Events and cancels every descendant', async () => {
    const input = {
      userId: 'user.cancel-descendants',
      sessionId: 'session.cancel-descendants',
    };
    const parent = await runtime.startRun({ ...input, input: { task: 'parent' } });
    const child = await runtime.startRun({
      ...input,
      parentRunId: parent.runId,
      input: { task: 'child' },
    });
    const grandchild = await runtime.startRun({
      ...input,
      parentRunId: child.runId,
      input: { task: 'grandchild' },
    });

    await runtime.enqueueCancelRun(
      { ...input, runId: parent.runId, reason: 'Cancel the complete Run tree' },
      'request.cancel.descendants.1'
    );
    await runtime.drainSessionCommands(input);

    await expect(runtime.projectRun(parent.runId)).resolves.toMatchObject({ status: 'cancelled' });
    await expect(runtime.projectRun(child.runId)).resolves.toMatchObject({ status: 'cancelled' });
    await expect(runtime.projectRun(grandchild.runId)).resolves.toMatchObject({
      status: 'cancelled',
    });
    const parentPropagation = (await runtime.listEvents(parent.runId)).filter(
      (event) => event.type === 'runtime.cancellation.propagated'
    );
    const childPropagation = (await runtime.listEvents(child.runId)).filter(
      (event) => event.type === 'runtime.cancellation.propagated'
    );
    expect(parentPropagation).toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          result: expect.objectContaining({ targetType: 'child_run', targetId: child.runId }),
        }),
      }),
    ]);
    expect(childPropagation).toEqual([
      expect.objectContaining({
        payload: expect.objectContaining({
          result: expect.objectContaining({ targetType: 'child_run', targetId: grandchild.runId }),
        }),
      }),
    ]);
  });

  it('rejects parent Run links outside the authenticated Session scope', async () => {
    const parent = await runtime.startRun({
      userId: 'user.parent-scope',
      sessionId: 'session.parent-scope',
    });

    await expect(
      runtime.startRun({
        userId: 'user.parent-scope',
        sessionId: 'session.other-scope',
        parentRunId: parent.runId,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_NOT_FOUND' });
  });

  it('resumes a paused Run through a durable Session command exactly once', async () => {
    const input = {
      userId: 'user.resume-command',
      sessionId: 'session.resume-command',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'resume-me' } });
    await seedPendingWait(run.runId, input.userId, { type: 'pause', key: 'resume.plan' });
    const first = await runtime.enqueueResumeRun(
      {
        ...input,
        runId: run.runId,
        key: 'resume.plan',
        payload: { note: 'continue' },
      },
      'request.resume.1'
    );
    const reused = await runtime.enqueueResumeRun(
      {
        ...input,
        runId: run.runId,
        key: 'resume.plan',
        payload: { note: 'continue' },
      },
      'request.resume.1'
    );
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: run.runId,
      }),
    ]);
    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'run.resumed')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'runtime.wait.resolved')).toHaveLength(1);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'running' });
  });

  it('delivers a validated Signal through a durable Session command exactly once', async () => {
    const input = {
      userId: 'user.signal-command',
      sessionId: 'session.signal-command',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'signal-me' } });
    await seedPendingWait(run.runId, input.userId, {
      type: 'signal',
      key: 'approval.received',
      expectedSchema: {
        type: 'object',
        required: ['approved'],
        properties: { approved: { type: 'boolean' } },
        additionalProperties: false,
      },
      expiresAt: '2099-01-01T00:00:00.000Z',
    });
    const commandInput = {
      ...input,
      runId: run.runId,
      key: 'approval.received',
      payload: { approved: true },
    };
    const first = await runtime.enqueueSignalRun(commandInput, 'request.signal.1');
    const reused = await runtime.enqueueSignalRun(commandInput, 'request.signal.1');
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: run.runId,
      }),
    ]);
    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'runtime.signal.received')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'run.resumed')).toHaveLength(1);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'running' });
  });

  it('resumes an overdue persisted Timer Wait through the Server Timer Worker exactly once', async () => {
    const userId = 'user.timer-worker';
    const run = await runtime.startRun({
      userId,
      sessionId: 'session.timer-worker',
      input: { task: 'wait-for-timer' },
    });
    await seedPendingTimer(run.runId, userId, '2026-07-22T08:00:00.000Z');

    const first = await runtime.sweepRuntimeTimers('2026-07-22T08:01:00.000Z');
    expect(first).toMatchObject({ fired: 1 });
    expect(first.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scope: expect.objectContaining({ runId: run.runId }),
          disposition: 'fired',
        }),
      ])
    );
    const second = await runtime.sweepRuntimeTimers('2026-07-22T08:02:00.000Z');
    expect(second.fired).toBe(0);

    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'runtime.timer.fired')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'run.resumed')).toHaveLength(1);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'running' });
  });

  it('becomes ready only with every worker running and can reopen after a full close', async () => {
    expect(runtime.runtimeReadinessStatus().backbone).toBe(true);
    expect(() => runtime.assertRuntimeReady()).toThrow(
      'Runtime cannot become ready while required workers are stopped'
    );

    if (!runtime.isRuntimeRecoverySchedulerRunning()) {
      await runtime.startRuntimeRecoveryScheduler();
    }
    if (!runtime.isRuntimeTimerSchedulerRunning()) {
      await runtime.startRuntimeTimerScheduler();
    }
    if (!runtime.isSessionCommandSchedulerRunning()) {
      await runtime.startSessionCommandScheduler();
    }

    expect(runtime.runtimeReadinessStatus()).toEqual({
      backbone: true,
      sessionCommands: true,
      timers: true,
      recovery: true,
    });
    expect(() => runtime.assertRuntimeReady()).not.toThrow();

    await runtime.close();
    expect(runtime.runtimeReadinessStatus()).toEqual({
      backbone: false,
      sessionCommands: false,
      timers: false,
      recovery: false,
    });

    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });
    expect(runtime.runtimeReadinessStatus()).toEqual({
      backbone: true,
      sessionCommands: false,
      timers: false,
      recovery: false,
    });
    await runtime.close();
  });
});
