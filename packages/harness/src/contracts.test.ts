import { describe, expect, it } from 'vitest';
import { InMemoryAppendOnlyEventStore } from '@hypha/core';
import {
  InMemoryMessageBus,
  InMemoryRuntimeDeliveryStore,
  InMemoryRuntimeLeaseCoordinator,
  InMemoryRuntimeCommandQueue,
  RuntimeCommandProcessor,
  RuntimeLoopProjector,
  RuntimeLoopRunner,
  RuntimeRecoveryScanner,
  RuntimeRecoveryWorker,
  ServerRuntimeAdapter,
  RuntimeStateAttemptExecutor,
  RuntimeStateAttemptRecoveryExecutor,
  applyPartialRuntimeMessage,
  createRuntimeActivityRequest,
  createRuntimeLoopFSM,
  createRuntimeMessageEvent,
  defaultConvertRuntimeContextToModelMessages,
  defaultTransformRuntimeContext,
  drainLoopMessages,
  projectWaitingRuntimeStateAttempts,
  runtimeSessionLeaseResource,
  messageBusSpecExample,
  validateMessageBusSpec,
  validateRuntimeStateAttempt,
  type RuntimeCommand,
  type RuntimeActivityPort,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
  type RuntimeActivityPortResolver,
  type RuntimeScope,
} from './index';

describe('@hypha/harness runtime contracts', () => {
  const scope: RuntimeScope = {
    userId: 'owner',
    sessionId: 'session_1',
    runId: 'run_1',
    agentId: 'agent_1',
  };

  it('validates message bus specs without binding runtime to a transport SDK', () => {
    expect(validateMessageBusSpec(messageBusSpecExample)).toMatchObject({
      id: 'runtime.message-bus.memory',
      engine: 'memory',
      delivery: 'at_least_once',
      supportsDeduplication: true,
    });
  });

  it('creates activity requests with state-attempt and fencing boundaries', () => {
    const request = createRuntimeActivityRequest({
      activityId: 'activity_1',
      activityType: 'tool',
      scope,
      stateAttemptId: 'attempt_1',
      operationId: 'operation_1',
      payload: { toolId: 'tool.search' },
      fencingToken: 7,
      idempotencyKey: 'run_1:attempt_1:tool.search',
      correlationId: 'run_1',
      causationId: 'attempt_1',
    });

    expect(request).toMatchObject({
      activityId: 'activity_1',
      activityType: 'tool',
      stateAttemptId: 'attempt_1',
      operationId: 'operation_1',
      fencingToken: 7,
      input: { toolId: 'tool.search' },
    });
  });

  it('validates state attempts as explicit runtime lifecycle records', () => {
    expect(
      validateRuntimeStateAttempt({
        id: 'attempt_1',
        scope,
        fsmProcessId: 'process_1',
        stateId: 'Planning',
        attempt: 1,
        status: 'started',
        fencingToken: 1,
        startedAt: '2026-07-16T00:00:00.000Z',
        activityIds: ['activity_1'],
      })
    ).toMatchObject({
      id: 'attempt_1',
      stateId: 'Planning',
      status: 'started',
    });
  });

  it('delivers messages to subscribers and deduplicates idempotent publishes', async () => {
    const bus = new InMemoryMessageBus();
    const received: string[] = [];
    await bus.subscribe('runtime.commands', (message) => {
      received.push(message.id);
    });

    const first = await bus.publish(
      {
        topic: 'runtime.commands',
        payload: { commandId: 'cmd_1' },
        scope,
        idempotencyKey: 'cmd_1',
      },
      { correlationId: 'run_1' }
    );
    const duplicate = await bus.publish(
      {
        topic: 'runtime.commands',
        payload: { commandId: 'cmd_1' },
        scope,
        idempotencyKey: 'cmd_1',
      },
      { correlationId: 'run_1' }
    );

    expect(first).toMatchObject({ duplicate: false, topic: 'runtime.commands' });
    expect(duplicate).toMatchObject({
      duplicate: true,
      topic: 'runtime.commands',
      messageId: first.messageId,
    });
    expect(received).toEqual([first.messageId]);
    await expect(bus.list('runtime.commands')).resolves.toHaveLength(1);
  });

  it('submits runtime commands idempotently into a user-session queue', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const queue = new InMemoryRuntimeCommandQueue({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const bus = new InMemoryMessageBus();
    const processor = new RuntimeCommandProcessor({
      events,
      queue,
      bus,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const command: RuntimeCommand = {
      id: 'cmd_create_run',
      type: 'run.create',
      scope,
      payload: { input: { prompt: 'hello' } },
      idempotencyKey: 'run_1:create',
      correlationId: 'run_1',
      createdAt: '2026-07-16T00:00:00.000Z',
    };

    const first = await processor.submit(command);
    const duplicate = await processor.submit({ ...command, id: 'cmd_create_run_retry' });

    expect(first.queue.status).toBe('enqueued');
    expect(duplicate.queue.status).toBe('duplicate');
    await expect(queue.size(scope)).resolves.toBe(1);
    await expect(bus.list('runtime.commands')).resolves.toHaveLength(1);
    await expect(events.list({ type: 'runtime.command.enqueued' })).resolves.toHaveLength(1);
  });

  it('drains runtime commands in session order and records command effects', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const bus = new InMemoryMessageBus();
    const processor = new RuntimeCommandProcessor({
      events,
      bus,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const createRun: RuntimeCommand = {
      id: 'cmd_create_run',
      type: 'run.create',
      scope,
      payload: { input: { prompt: 'hello' } },
      idempotencyKey: 'run_1:create',
      correlationId: 'run_1',
      createdAt: '2026-07-16T00:00:00.000Z',
    };
    const startRun: RuntimeCommand = {
      id: 'cmd_start_run',
      type: 'run.start',
      scope,
      payload: { reason: 'worker-ready' },
      idempotencyKey: 'run_1:start',
      correlationId: 'run_1',
      causationId: 'cmd_create_run',
      createdAt: '2026-07-16T00:00:01.000Z',
    };

    await processor.submit(createRun);
    await processor.submit(startRun);
    const results = await processor.drain(scope);

    expect(results.map((result) => result.commandId)).toEqual(['cmd_create_run', 'cmd_start_run']);
    expect(results.map((result) => result.eventAppends[0]?.event.type)).toEqual([
      'run.created',
      'run.started',
    ]);
    await expect(events.list({ streamId: 'run_1' })).resolves.toMatchObject([
      { type: 'runtime.command.enqueued' },
      { type: 'runtime.command.enqueued' },
      { type: 'run.created' },
      { type: 'runtime.command.applied' },
      { type: 'run.started' },
      { type: 'runtime.command.applied' },
    ]);
    await expect(bus.list('runtime.events')).resolves.toHaveLength(4);
  });

  it('leases delivery records and supports nack redelivery before dead-lettering', async () => {
    let now = '2026-07-16T00:00:00.000Z';
    const delivery = new InMemoryRuntimeDeliveryStore({
      now: () => now,
      defaultMaxAttempts: 2,
    });
    const message = {
      id: 'msg_1',
      topic: 'runtime.events',
      payload: { eventId: 'evt_1' },
      scope,
      idempotencyKey: 'evt_1:message',
      publishedAt: now,
    };

    const first = await delivery.enqueue('outbox', message);
    const duplicate = await delivery.enqueue('outbox', { ...message, id: 'msg_retry' });
    const leased = await delivery.leaseNext({
      box: 'outbox',
      topic: 'runtime.events',
      ownerId: 'worker_1',
      ttlMs: 1000,
    });

    expect(first.status).toBe('enqueued');
    expect(duplicate.status).toBe('duplicate');
    expect(leased).toMatchObject({ id: first.record.id, attempts: 1, status: 'leased' });
    await delivery.negativeAcknowledge(leased!.id, leased!.leaseToken!, {
      reason: 'temporary_error',
      retryAfterMs: 500,
    });
    now = '2026-07-16T00:00:00.500Z';
    const retried = await delivery.leaseNext({
      box: 'outbox',
      topic: 'runtime.events',
      ownerId: 'worker_2',
      ttlMs: 1000,
    });
    const dead = await delivery.negativeAcknowledge(retried!.id, retried!.leaseToken!, {
      reason: 'still_failing',
    });

    expect(retried).toMatchObject({ attempts: 2, leaseOwnerId: 'worker_2' });
    expect(dead).toMatchObject({
      status: 'dead_lettered',
      deadLetterReason: 'still_failing',
    });
    await expect(delivery.list({ box: 'outbox', status: 'dead_lettered' })).resolves.toHaveLength(1);
  });

  it('rejects stale delivery acknowledgements with fencing tokens', async () => {
    const delivery = new InMemoryRuntimeDeliveryStore({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    await delivery.enqueue('inbox', {
      id: 'msg_1',
      topic: 'runtime.commands',
      payload: { commandId: 'cmd_1' },
      scope,
      publishedAt: '2026-07-16T00:00:00.000Z',
    });
    const leased = await delivery.leaseNext({
      box: 'inbox',
      ownerId: 'worker_1',
      ttlMs: 1000,
    });

    await expect(delivery.acknowledge(leased!.id, leased!.leaseToken! + 1)).rejects.toMatchObject({
      code: 'RUNTIME_DELIVERY_STALE_LEASE',
    });
    await expect(delivery.acknowledge(leased!.id, leased!.leaseToken!)).resolves.toMatchObject({
      status: 'acknowledged',
    });
  });

  it('uses session leases to prevent concurrent command processing', async () => {
    const leaseCoordinator = new InMemoryRuntimeLeaseCoordinator({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const busy = await leaseCoordinator.acquire(
      runtimeSessionLeaseResource(scope),
      'other_worker',
      1000
    );
    const processor = new RuntimeCommandProcessor({
      leaseCoordinator,
      workerId: 'worker_1',
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const command: RuntimeCommand = {
      id: 'cmd_create_run',
      type: 'run.create',
      scope,
      payload: { input: { prompt: 'hello' } },
      createdAt: '2026-07-16T00:00:00.000Z',
    };

    await processor.submit(command);
    await expect(processor.processNext(scope)).resolves.toBeNull();
    await leaseCoordinator.release(runtimeSessionLeaseResource(scope), 'other_worker', busy.lease!.fencingToken);
    await expect(processor.processNext(scope)).resolves.toMatchObject({
      commandId: 'cmd_create_run',
    });
  });

  it('models the agent loop as FSM-controlled states instead of ad hoc while loops', async () => {
    const fsm = createRuntimeLoopFSM(scope, {
      now: () => '2026-07-16T00:00:00.000Z',
    });

    await fsm.start({ phase: 'input' });
    await fsm.transitionPath([
      'InputAccepted',
      'SteeringDrain',
      'ContextTransform',
      'ModelStreaming',
      'ActivityPrepare',
      'ActivityExecute',
      'ActivityFinalize',
      'FollowUpDrain',
      'Completed',
    ]);

    expect(fsm.getSnapshot()).toMatchObject({
      currentState: 'Completed',
      status: 'completed',
      statePath: [
        'Idle',
        'InputAccepted',
        'SteeringDrain',
        'ContextTransform',
        'ModelStreaming',
        'ActivityPrepare',
        'ActivityExecute',
        'ActivityFinalize',
        'FollowUpDrain',
        'Completed',
      ],
    });
  });

  it('keeps context transformation separate from model message conversion', () => {
    const context = {
      scope,
      turn: 1,
      steeringMessages: [],
      followUpMessages: [],
      messages: [
        {
          id: 'internal_1',
          role: 'internal' as const,
          content: { summary: 'compact' },
          createdAt: '2026-07-16T00:00:00.000Z',
        },
        {
          id: 'user_1',
          role: 'user' as const,
          content: 'fix this bug',
          createdAt: '2026-07-16T00:00:00.000Z',
        },
      ],
    };

    const transformed = defaultTransformRuntimeContext(context);
    const modelMessages = defaultConvertRuntimeContextToModelMessages(transformed);

    expect(transformed.messages.map((message) => message.id)).toEqual(['user_1']);
    expect(modelMessages).toEqual([{ role: 'user', content: 'fix this bug', metadata: undefined }]);
  });

  it('projects event-first partial messages into ordered render events', () => {
    const projector = new RuntimeLoopProjector();
    const started = {
      id: 'assistant_1',
      role: 'assistant' as const,
      content: '',
      partial: true,
      createdAt: '2026-07-16T00:00:00.000Z',
    };
    const delta = { ...started, content: 'I will inspect the files' };
    const final = { ...delta, partial: false, updatedAt: '2026-07-16T00:00:01.000Z' };
    const events = [
      createRuntimeMessageEvent({
        id: 'evt_message_start',
        type: 'runtime.message.started',
        scope,
        message: started,
      }),
      createRuntimeMessageEvent({
        id: 'evt_message_update',
        type: 'runtime.message.updated',
        scope,
        message: delta,
      }),
      createRuntimeMessageEvent({
        id: 'evt_message_end',
        type: 'runtime.message.completed',
        scope,
        message: final,
      }),
    ];

    const projected = projector.project(events);

    expect(projected.renderEvents.map((event) => event.type)).toEqual([
      'message_start',
      'message_update',
      'message_end',
    ]);
    expect(projected.view.streamingMessage).toBeUndefined();
    expect(projected.view.messages).toMatchObject([{ id: 'assistant_1', partial: false }]);
    expect(projected.renderEvents.map((event) => event.stateVersion)).toEqual([1, 2, 3]);
  });

  it('updates partial loop messages by replacing the latest message only', () => {
    const initial = [
      {
        id: 'user_1',
        role: 'user' as const,
        content: 'hello',
        createdAt: '2026-07-16T00:00:00.000Z',
      },
      {
        id: 'assistant_1',
        role: 'assistant' as const,
        content: 'hel',
        partial: true,
        createdAt: '2026-07-16T00:00:01.000Z',
      },
    ];
    const updated = applyPartialRuntimeMessage(initial, {
      id: 'assistant_1',
      role: 'assistant',
      content: 'hello back',
      partial: true,
      createdAt: '2026-07-16T00:00:01.000Z',
    });

    expect(updated).toHaveLength(2);
    expect(updated[1]).toMatchObject({ id: 'assistant_1', content: 'hello back' });
  });

  it('runs a minimal FSM-controlled runtime loop through a model activity port', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const runner = new RuntimeLoopRunner({
      events,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const modelPort: RuntimeActivityPort<{ messages: unknown[] }, { text: string }> = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'completed',
        output: { text: 'done' },
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        output: { text: 'done' },
        eventIds: [],
      }),
    };

    const result = await runner.run({
      context: {
        scope,
        turn: 1,
        messages: [
          {
            id: 'user_1',
            role: 'user',
            content: 'hello',
            createdAt: '2026-07-16T00:00:00.000Z',
          },
        ],
        steeringMessages: [],
        followUpMessages: [],
      },
      modelPort,
    });

    expect(result.fsmSnapshot).toMatchObject({
      currentState: 'Completed',
      status: 'completed',
    });
    expect(result.stateAttempt).toMatchObject({ status: 'completed' });
    await expect(events.list({ streamId: 'run_1' })).resolves.toMatchObject([
      { type: 'runtime.loop.started' },
      { type: 'runtime.turn.started' },
      { type: 'runtime.steering.drained' },
      { type: 'runtime.context.transformed' },
      { type: 'runtime.context.converted' },
      { type: 'runtime.state_attempt.started' },
      { type: 'runtime.activity.prepared' },
      { type: 'runtime.activity.finalized' },
      { type: 'runtime.state_attempt.completed' },
      { type: 'runtime.follow_up.drained' },
      { type: 'runtime.turn.completed' },
      { type: 'runtime.loop.completed' },
    ]);
    expect(result.renderEvents.map((event) => event.type)).toContain('agent_start');
    expect(result.renderEvents.map((event) => event.type)).toContain('agent_end');
  });

  it('drains steering and follow-up queues into loop messages deterministically', () => {
    const context = {
      scope,
      turn: 1,
      messages: [],
      steeringMessages: [
        {
          id: 'steering_1',
          role: 'user' as const,
          content: 'adjust',
          createdAt: '2026-07-16T00:00:00.000Z',
        },
      ],
      followUpMessages: [
        {
          id: 'follow_1',
          role: 'user' as const,
          content: 'continue',
          createdAt: '2026-07-16T00:00:01.000Z',
        },
      ],
    };

    const afterSteering = drainLoopMessages(context, 'steering');
    const afterFollowUp = drainLoopMessages(afterSteering, 'follow_up');

    expect(afterSteering.messages.map((message) => message.id)).toEqual(['steering_1']);
    expect(afterSteering.steeringMessages).toEqual([]);
    expect(afterFollowUp.messages.map((message) => message.id)).toEqual(['steering_1', 'follow_1']);
    expect(afterFollowUp.followUpMessages).toEqual([]);
  });

  it('executes a state attempt through an activity port and records lifecycle events', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const executor = new RuntimeStateAttemptExecutor({
      events,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const port: RuntimeActivityPort<{ prompt: string }, { ok: true }> = {
      execute: async (
        request: RuntimeActivityRequest<{ prompt: string }>
      ): Promise<RuntimeActivityResult<{ ok: true }>> => ({
        activityId: request.activityId,
        status: 'completed',
        output: { ok: true },
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        output: { ok: true },
        eventIds: [],
      }),
    };

    const result = await executor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'ModelStreaming',
        attempt: 1,
        activityType: 'model',
        operationId: 'stream',
        input: { prompt: 'hello' },
        idempotencyKey: 'run_1:ModelStreaming:1',
      },
      port
    );

    expect(result).toMatchObject({
      status: 'completed',
      attempt: {
        status: 'completed',
        stateId: 'ModelStreaming',
        fencingToken: 1,
      },
      request: {
        activityType: 'model',
        fencingToken: 1,
      },
    });
    await expect(events.list({ streamId: 'run_1' })).resolves.toMatchObject([
      { type: 'runtime.state_attempt.started' },
      { type: 'runtime.activity.prepared' },
      { type: 'runtime.activity.finalized' },
      { type: 'runtime.state_attempt.completed' },
    ]);
  });

  it('preserves waiting state attempts for durable resume', async () => {
    const executor = new RuntimeStateAttemptExecutor({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const port: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({ activityId, status: 'waiting', eventIds: [] }),
    };

    const result = await executor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: { reason: 'approval_required' },
      },
      port
    );

    expect(result).toMatchObject({
      status: 'waiting',
      attempt: {
        status: 'waiting',
        completedAt: undefined,
      },
    });
  });

  it('projects waiting state attempts and reconciles them through the activity port', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const executor = new RuntimeStateAttemptExecutor({
      events,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const recovery = new RuntimeStateAttemptRecoveryExecutor({
      events,
      now: () => '2026-07-16T00:00:01.000Z',
    });
    const port: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        output: { approved: true },
        eventIds: ['human.review.approved:1'],
      }),
    };

    const waiting = await executor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: { reason: 'approval_required' },
      },
      port
    );
    const projected = projectWaitingRuntimeStateAttempts(await events.list({ streamId: 'run_1' }));
    const recovered = await recovery.recover(
      {
        attempt: projected[0],
        activityId: waiting.request!.activityId,
        recoveryId: 'recovery_1',
      },
      port
    );

    expect(projected).toHaveLength(1);
    expect(recovered).toMatchObject({
      status: 'completed',
      activityResult: {
        status: 'completed',
      },
      attempt: {
        status: 'completed',
        activityIds: [waiting.request!.activityId],
      },
    });
    await expect(events.list({ streamId: 'run_1' })).resolves.toMatchObject([
      { type: 'runtime.state_attempt.started' },
      { type: 'runtime.activity.prepared' },
      { type: 'runtime.activity.finalized' },
      { type: 'runtime.state_attempt.waiting' },
      { type: 'runtime.state_attempt.reconciled' },
      { type: 'runtime.activity.reconciled' },
      { type: 'runtime.state_attempt.completed' },
    ]);
  });

  it('rejects recovery for non-waiting state attempts', async () => {
    const recovery = new RuntimeStateAttemptRecoveryExecutor({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const port: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'completed',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({ activityId, status: 'completed', eventIds: [] }),
    };

    await expect(
      recovery.recover(
        {
          attempt: {
            id: 'attempt_completed',
            scope,
            fsmProcessId: 'fsm.runtime.loop.default',
            stateId: 'ModelStreaming',
            attempt: 1,
            status: 'completed',
            fencingToken: 1,
            startedAt: '2026-07-16T00:00:00.000Z',
            completedAt: '2026-07-16T00:00:00.000Z',
          },
          activityId: 'activity_1',
        },
        port
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_STATE_ATTEMPT_NOT_WAITING' });
  });

  it('scans projected waiting attempts and schedules bounded recovery', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const executor = new RuntimeStateAttemptExecutor({
      events,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const waitingPort: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({ activityId, status: 'waiting', eventIds: [] }),
    };
    await executor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: {},
      },
      waitingPort
    );
    await executor.execute(
      {
        scope: { ...scope, runId: 'run_2' },
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: {},
      },
      waitingPort
    );

    const scanner = new RuntimeRecoveryScanner({
      events,
      now: () => '2026-07-16T00:00:10.000Z',
      policy: {
        includeRunIds: ['run_1'],
        minWaitMs: 5000,
        limit: 1,
      },
    });
    const resolver: RuntimeActivityPortResolver = {
      resolve: async () => ({
        reconcile: async (activityId) => ({
          activityId,
          status: 'completed',
          eventIds: ['human.review.approved:1'],
        }),
      }),
    };

    const result = await scanner.scanAndRecover(resolver);

    expect(result).toMatchObject({
      scanned: 2,
      selected: 1,
      recovered: [{ status: 'completed' }],
    });
    expect(projectWaitingRuntimeStateAttempts(await events.list())).toHaveLength(1);
  });

  it('runs recovery scans through a leased worker entrypoint', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const leaseCoordinator = new InMemoryRuntimeLeaseCoordinator({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const executor = new RuntimeStateAttemptExecutor({
      events,
      leaseCoordinator,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const waitingPort: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        eventIds: ['human.review.approved:1'],
      }),
    };
    await executor.execute(
      {
        scope,
        fsmProcessId: 'fsm.runtime.loop.default',
        stateId: 'HumanReview',
        attempt: 1,
        activityType: 'human',
        operationId: 'review',
        input: {},
      },
      waitingPort
    );
    const worker = new RuntimeRecoveryWorker({
      events,
      leaseCoordinator,
      resolver: {
        resolve: async () => waitingPort,
      },
      workerId: 'worker_1',
      now: () => '2026-07-16T00:00:10.000Z',
    });

    await expect(worker.runOnce({ scanId: 'scan_1' })).resolves.toMatchObject({
      workerId: 'worker_1',
      status: 'completed',
      scan: {
        scanId: 'scan_1',
        scanned: 1,
        selected: 1,
        recovered: [{ status: 'completed' }],
      },
    });
    expect(projectWaitingRuntimeStateAttempts(await events.list())).toHaveLength(0);
    await leaseCoordinator.acquire('runtime.recovery.worker', 'other_worker', 30000);
    await expect(worker.runOnce({ scanId: 'scan_2' })).resolves.toMatchObject({
      status: 'busy',
      lease: { ownerId: 'other_worker' },
    });
  });

  it('adapts server runtime views from package-level event projections', async () => {
    const events = new InMemoryAppendOnlyEventStore();
    const runner = new RuntimeLoopRunner({
      events,
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const modelPort: RuntimeActivityPort<{ messages: unknown[] }, { text: string }> = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'waiting',
        output: { text: 'pending' },
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({
        activityId,
        status: 'completed',
        output: { text: 'done' },
        eventIds: [],
      }),
    };
    await runner.run({
      context: {
        scope,
        turn: 1,
        messages: [],
        steeringMessages: [],
        followUpMessages: [],
      },
      modelPort,
    });
    const adapter = new ServerRuntimeAdapter({
      listEvents: (runId) => events.list({ runId }),
    });

    await expect(adapter.projectLoop('run_1')).resolves.toMatchObject({
      runId: 'run_1',
      view: { isRunning: false },
    });
    await expect(adapter.projectStateAttempts('run_1')).resolves.toMatchObject({
      runId: 'run_1',
      waiting: [{ status: 'waiting', stateId: 'ModelStreaming' }],
    });
  });

  it('does not execute a state attempt when another worker owns the lease', async () => {
    const leaseCoordinator = new InMemoryRuntimeLeaseCoordinator({
      now: () => '2026-07-16T00:00:00.000Z',
    });
    await leaseCoordinator.acquire(
      'runtime.state_attempt:run_1:fsm.runtime.loop.default:Acting:1',
      'other_worker',
      1000
    );
    const executor = new RuntimeStateAttemptExecutor({
      leaseCoordinator,
      workerId: 'worker_1',
      now: () => '2026-07-16T00:00:00.000Z',
    });
    const port: RuntimeActivityPort = {
      execute: async (request) => ({
        activityId: request.activityId,
        status: 'completed',
        eventIds: [],
      }),
      cancel: async () => undefined,
      reconcile: async (activityId) => ({ activityId, status: 'completed', eventIds: [] }),
    };

    await expect(
      executor.execute(
        {
          scope,
          fsmProcessId: 'fsm.runtime.loop.default',
          stateId: 'Acting',
          attempt: 1,
          activityType: 'tool',
          operationId: 'execute',
          input: { toolId: 'tool.search' },
        },
        port
      )
    ).resolves.toMatchObject({ status: 'busy', eventAppends: [] });
  });
});
