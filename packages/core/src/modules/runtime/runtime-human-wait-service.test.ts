import { describe, expect, it } from 'vitest';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeScope } from '../../contracts/runtime';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import { RuntimeHumanWaitService } from './runtime-human-wait-service';
import { projectRuntimeHumanTasks } from './runtime-human-task';

const scope: RuntimeScope = {
  tenantId: 'tenant.review',
  userId: 'user.review',
  sessionId: 'session.review',
  runId: 'run.review',
};

const eventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.resume.requested',
  'run.resumed',
  'run.waiting_human',
  'run.failed',
  'run.cancelled',
  'runtime.wait.created',
  'runtime.wait.resolved',
  'fsm.state.entered',
  'human.review.requested',
  'human.review.approved',
  'human.review.rejected',
  'human.review.expired',
  'human.review.cancelled',
  'human.review.superseded',
];

async function fixture() {
  let milliseconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 23, 8, 0, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };
  for (const eventType of eventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const store = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const runLeases = new InMemoryRunLeaseStore({ now });
  const service = new RuntimeHumanWaitService({
    events,
    projections,
    projectionStore,
    runLeases,
    now,
    nextId,
  });
  await events.append({
    scope: streamScope(),
    events: [
      event('seed.created', 'run.created', {}, now()),
      event('seed.started', 'run.started', {}, now()),
      event('seed.entered', 'fsm.state.entered', { stateId: 'HumanReview' }, now(), 1),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed-human-review',
  });
  return { service, events, runLeases, now, nextId };
}

describe('RuntimeHumanWaitService', () => {
  it('atomically creates and idempotently reuses a fenced Human Wait', async () => {
    const target = await fixture();
    const command = createCommand();

    const created = await target.service.create(command);
    expect(created).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'waiting_human',
        pendingWait: {
          waitId: 'wait.tool-1',
          type: 'human',
          pendingActionRef: 'tool-1',
          stateId: 'HumanReview',
          stateAttempt: 1,
        },
      },
    });
    expect(created.eventIds).toHaveLength(2);

    const repeated = await target.service.create(command);
    expect(repeated).toMatchObject({
      disposition: 'reused',
      eventIds: created.eventIds,
    });
    const written = await target.events.read({ scope: streamScope() });
    expect(written.map((candidate) => candidate.type)).toEqual([
      'run.created',
      'run.started',
      'fsm.state.entered',
      'runtime.wait.created',
      'run.waiting_human',
    ]);
  });

  it('atomically appends Generic HumanTasks with the durable Human Wait', async () => {
    const target = await fixture();
    const command = {
      ...createCommand(),
      commandId: 'create.tool-with-task',
      idempotencyKey: 'create.tool-with-task',
      humanTasks: [
        {
          taskId: 'human-task.tool-1',
          kind: 'tool' as const,
          subjectRef: 'tool:filesystem.write@1.0.0',
          subjectHash: `sha256:${'a'.repeat(64)}`,
          requestedBy: scope.userId,
          allowedDecisionScopes: ['runtime.human-task.decide'],
          requestedAt: '2026-07-23T08:00:30.000Z',
          expiresAt: '2026-07-24T08:00:30.000Z',
        },
      ],
    };

    const created = await target.service.create(command);
    expect(created.eventIds).toHaveLength(3);
    const written = await target.events.read({ scope: streamScope() });
    expect(written.slice(-3).map((candidate) => candidate.type)).toEqual([
      'human.review.requested',
      'runtime.wait.created',
      'run.waiting_human',
    ]);
    expect(written.at(-3)?.payload).toMatchObject({
      taskId: 'human-task.tool-1',
      runId: scope.runId,
      stateId: 'HumanReview',
      stateAttempt: 1,
      status: 'pending',
      revision: 1,
    });
  });

  it('fails closed when a pending HumanTask is resolved without decision evidence', async () => {
    const target = await fixture();
    await target.service.create({
      ...createCommand(),
      commandId: 'create.tool-with-required-decision',
      humanTasks: [humanTaskRequest('human-task.required')],
    });

    await expect(
      target.service.resolve({
        commandId: 'resolve.tool-without-decision',
        scope,
        ownerId: 'worker.review',
        leaseTtlMs: 30_000,
        waitId: 'wait.tool-1',
        pendingActionRef: 'tool-1',
        principalId: 'admin-1',
        decision: 'approved',
        resolvedAt: '2026-07-23T08:01:00.000Z',
      })
    ).rejects.toMatchObject({ code: 'HUMAN_TASK_DECISION_REQUIRED' });

    const written = await target.events.read({ scope: streamScope() });
    expect(projectRuntimeHumanTasks(written)).toEqual([
      expect.objectContaining({ taskId: 'human-task.required', status: 'pending', revision: 1 }),
    ]);
    expect(written.some((candidate) => candidate.type === 'runtime.wait.resolved')).toBe(false);
  });

  it('binds the reviewer and decision time to the Human Wait resolution', async () => {
    const target = await fixture();
    const request = humanTaskRequest('human-task.bound-decision');
    await target.service.create({
      ...createCommand(),
      commandId: 'create.tool-bound-decision',
      humanTasks: [request],
    });
    const decision = {
      commandId: 'human-task.bound-decision.approve',
      scope,
      principal: {
        principalId: 'reviewer-1',
        type: 'user' as const,
        userId: 'reviewer-1',
        tenantId: scope.tenantId,
        permissionScopes: ['runtime.human-task.decide'],
      },
      taskId: request.taskId,
      expectedRevision: 1,
      expectedSubjectHash: request.subjectHash,
      decision: 'approved' as const,
      decidedAt: '2026-07-23T08:01:00.000Z',
    };

    expect(() =>
      target.service.resolve({
        commandId: 'resolve.tool-reviewer-mismatch',
        scope,
        ownerId: 'worker.review',
        leaseTtlMs: 30_000,
        waitId: 'wait.tool-1',
        pendingActionRef: 'tool-1',
        principalId: 'different-reviewer',
        decision: 'approved',
        resolvedAt: decision.decidedAt,
        humanTaskDecision: decision,
      })
    ).toThrow(expect.objectContaining({ code: 'RUNTIME_INVALID_INPUT' }));
    expect(() =>
      target.service.resolve({
        commandId: 'resolve.tool-time-mismatch',
        scope,
        ownerId: 'worker.review',
        leaseTtlMs: 30_000,
        waitId: 'wait.tool-1',
        pendingActionRef: 'tool-1',
        principalId: decision.principal.principalId,
        decision: 'approved',
        resolvedAt: '2026-07-23T08:02:00.000Z',
        humanTaskDecision: decision,
      })
    ).toThrow(expect.objectContaining({ code: 'RUNTIME_INVALID_INPUT' }));

    const written = await target.events.read({ scope: streamScope() });
    expect(written.filter((candidate) => candidate.type === 'human.review.approved')).toHaveLength(
      0
    );
  });

  it('resolves only the matching Human action and advances the State attempt', async () => {
    const target = await fixture();
    await target.service.create(createCommand());

    const resolved = await target.service.resolve({
      commandId: 'resolve.tool-1',
      scope,
      ownerId: 'worker.review',
      leaseTtlMs: 30_000,
      waitId: 'wait.tool-1',
      pendingActionRef: 'tool-1',
      principalId: 'admin-1',
      decision: 'approved',
      resolvedAt: '2026-07-23T08:01:00.000Z',
    });

    expect(resolved).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'running',
        currentState: 'HumanReview',
        stateAttempt: 2,
        lastResume: {
          kind: 'manual',
          waitId: 'wait.tool-1',
          principalId: 'admin-1',
          payload: { decision: 'approved', pendingActionRef: 'tool-1' },
        },
      },
    });
    expect(resolved.projection).not.toHaveProperty('pendingWait');
    expect(resolved.eventIds).toHaveLength(4);
  });

  it.each([
    ['approved', 'human.review.approved', '2026-07-23T08:01:00.000Z', 'running', undefined],
    ['rejected', 'human.review.rejected', '2026-07-23T08:01:00.000Z', 'failed', 'run.failed'],
    ['expired', 'human.review.expired', '2026-07-24T08:00:30.000Z', 'failed', 'run.failed'],
    [
      'cancelled',
      'human.review.cancelled',
      '2026-07-23T08:01:00.000Z',
      'cancelled',
      'run.cancelled',
    ],
  ] as const)(
    'restores an exact Tool Invocation after restart and records one %s terminal event',
    async (decision, terminalType, decidedAt, expectedRunStatus, terminalRunType) => {
      const target = await fixture();
      const request = {
        taskId: 'human-task.tool-restart',
        kind: 'tool' as const,
        subjectRef: 'tool:filesystem.write@revision-7',
        subjectHash: `sha256:${'b'.repeat(64)}`,
        requestedBy: scope.userId,
        allowedDecisionScopes: ['runtime.human-task.decide'],
        requestedAt: '2026-07-23T08:00:30.000Z',
        expiresAt: '2026-07-24T08:00:30.000Z',
        checkpointRef: 'run.review:invocation.write:checkpoint-1',
        policyRef: 'policy.tools@revision-4',
        providerRevision: 'filesystem-provider@revision-3',
        metadata: {
          invocationId: 'invocation.write',
          inputHash: `sha256:${'c'.repeat(64)}`,
          approvalRevision: 1,
          workspaceId: 'workspace.review',
        },
      };
      const principalId = decision === 'expired' ? 'system.expiry' : 'admin-1';
      await target.service.create({
        ...createCommand(),
        commandId: `create.tool-restart.${decision}`,
        waitId: `wait.tool-restart.${decision}`,
        pendingActionRef: 'invocation.write',
        humanTasks: [request],
      });

      const restarted = new RuntimeHumanWaitService({
        events: target.events,
        projections: new ProjectionEngine({ events: target.events, now: target.now }),
        projectionStore: new InMemoryProjectionStore<RuntimeOrchestrationProjection>(),
        runLeases: target.runLeases,
        now: target.now,
        nextId: target.nextId,
      });
      const command = {
        commandId: `resolve.tool-restart.${decision}`,
        scope,
        ownerId: 'worker.review.restarted',
        leaseTtlMs: 30_000,
        waitId: `wait.tool-restart.${decision}`,
        pendingActionRef: 'invocation.write',
        principalId,
        decision,
        resolvedAt: decidedAt,
        humanTaskDecision: {
          commandId: `human-task.tool-restart.${decision}`,
          scope,
          principal: {
            principalId,
            type: decision === 'expired' ? ('system' as const) : ('user' as const),
            ...(decision === 'expired' ? {} : { userId: 'admin-1' }),
            tenantId: scope.tenantId,
            permissionScopes: ['runtime.human-task.decide'],
          },
          taskId: request.taskId,
          expectedRevision: 1,
          expectedSubjectHash: request.subjectHash,
          decision,
          decidedAt,
          idempotencyKey: `decision.tool-restart.${decision}`,
        },
      };
      const resolved = await restarted.resolve(command);
      expect(resolved).toMatchObject({
        disposition: 'applied',
        projection: { runStatus: expectedRunStatus },
      });
      expect(resolved.eventIds).toHaveLength(decision === 'approved' ? 5 : 4);

      const repeated = await restarted.resolve(command);
      expect(repeated).toMatchObject({
        disposition: 'reused',
        eventIds: resolved.eventIds,
      });
      const written = await target.events.read({ scope: streamScope() });
      expect(written.filter((event) => event.type === terminalType)).toHaveLength(1);
      expect(written.filter((event) => event.type === 'fsm.state.entered')).toHaveLength(
        decision === 'approved' ? 2 : 1
      );
      if (terminalRunType === undefined) {
        expect(written.filter((event) => event.type === 'run.failed')).toHaveLength(0);
        expect(written.filter((event) => event.type === 'run.cancelled')).toHaveLength(0);
      } else {
        expect(written.filter((event) => event.type === terminalRunType)).toHaveLength(1);
        expect(written.filter((event) => event.type === 'run.resumed')).toHaveLength(0);
      }
      expect(written.find((event) => event.type === terminalType)?.payload).toMatchObject({
        taskId: request.taskId,
        subjectRef: request.subjectRef,
        subjectHash: request.subjectHash,
        expectedRevision: 1,
        expectedSubjectHash: request.subjectHash,
        approvalRevision: 2,
        decisionCommandId: `human-task.tool-restart.${decision}`,
        decisionIdempotencyKey: `decision.tool-restart.${decision}`,
        waitId: `wait.tool-restart.${decision}`,
        pendingActionRef: 'invocation.write',
        decision,
      });
      expect(projectRuntimeHumanTasks(written)).toEqual([
        expect.objectContaining({
          taskId: request.taskId,
          status: decision,
          revision: 2,
          decisionEventId: expect.any(String),
          decisionCommandId: `human-task.tool-restart.${decision}`,
          decisionIdempotencyKey: `decision.tool-restart.${decision}`,
          decidedBy: principalId,
        }),
      ]);
    }
  );

  it('atomically supersedes a task after restart without resolving its Human Wait', async () => {
    const target = await fixture();
    const original = {
      taskId: 'human-task.tool-old',
      kind: 'tool' as const,
      subjectRef: 'tool:filesystem.write@revision-7',
      subjectHash: `sha256:${'b'.repeat(64)}`,
      requestedBy: scope.userId,
      allowedDecisionScopes: ['runtime.human-task.decide'],
      requestedAt: '2026-07-23T08:00:30.000Z',
      expiresAt: '2026-07-24T08:00:30.000Z',
    };
    await target.service.create({
      ...createCommand(),
      commandId: 'create.tool-supersede',
      waitId: 'wait.tool-supersede',
      pendingActionRef: 'invocation.write',
      humanTasks: [original],
    });
    const restarted = new RuntimeHumanWaitService({
      events: target.events,
      projections: new ProjectionEngine({ events: target.events, now: target.now }),
      projectionStore: new InMemoryProjectionStore<RuntimeOrchestrationProjection>(),
      runLeases: target.runLeases,
      now: target.now,
      nextId: target.nextId,
    });
    const replacement = {
      ...original,
      taskId: 'human-task.tool-new',
      subjectRef: 'tool:filesystem.write@revision-8',
      subjectHash: `sha256:${'c'.repeat(64)}`,
      requestedAt: '2026-07-23T08:01:00.000Z',
    };
    const command = {
      commandId: 'supersede.tool-review',
      scope,
      ownerId: 'worker.review.restarted',
      leaseTtlMs: 30_000,
      waitId: 'wait.tool-supersede',
      pendingActionRef: 'invocation.write',
      principalId: 'admin-1',
      supersededAt: '2026-07-23T08:01:00.000Z',
      humanTaskDecision: {
        commandId: 'human-task.tool-supersede',
        scope,
        principal: {
          principalId: 'admin-1',
          type: 'user' as const,
          userId: 'admin-1',
          tenantId: scope.tenantId,
          permissionScopes: ['runtime.human-task.decide'],
        },
        taskId: original.taskId,
        expectedRevision: 1,
        expectedSubjectHash: original.subjectHash,
        decision: 'superseded' as const,
        decidedAt: '2026-07-23T08:01:00.000Z',
        supersededByTaskId: replacement.taskId,
      },
      replacementTask: replacement,
    };

    await expect(
      restarted.supersede({
        ...command,
        commandId: 'supersede.tool-review.changed-activity',
        humanTaskDecision: {
          ...command.humanTaskDecision,
          supersededByTaskId: 'human-task.tool-other-activity',
        },
        replacementTask: {
          ...replacement,
          taskId: 'human-task.tool-other-activity',
          activityDescriptorRef: 'artifact-ref:activity.other',
          activityDescriptorHash: `sha256:${'d'.repeat(64)}`,
        },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });

    const superseded = await restarted.supersede(command);
    expect(superseded).toMatchObject({
      disposition: 'applied',
      projection: {
        runStatus: 'waiting_human',
        pendingWait: {
          waitId: 'wait.tool-supersede',
          pendingActionRef: 'invocation.write',
          stateAttempt: 1,
        },
      },
    });
    expect(superseded.eventIds).toHaveLength(2);
    await expect(restarted.supersede(command)).resolves.toMatchObject({
      disposition: 'reused',
      eventIds: superseded.eventIds,
    });

    const written = await target.events.read({ scope: streamScope() });
    expect(
      written.filter((candidate) => candidate.type === 'human.review.superseded')
    ).toHaveLength(1);
    expect(written.some((candidate) => candidate.type === 'runtime.wait.resolved')).toBe(false);
    expect(written.some((candidate) => candidate.type === 'run.resumed')).toBe(false);
    expect(projectRuntimeHumanTasks(written)).toEqual([
      expect.objectContaining({
        taskId: original.taskId,
        status: 'superseded',
        revision: 2,
        supersededByTaskId: replacement.taskId,
      }),
      expect.objectContaining({
        taskId: replacement.taskId,
        status: 'pending',
        revision: 1,
      }),
    ]);
  });

  it('rejects a decision for a different pending action', async () => {
    const target = await fixture();
    await target.service.create(createCommand());

    await expect(
      target.service.resolve({
        commandId: 'resolve.tool-2',
        scope,
        ownerId: 'worker.review',
        leaseTtlMs: 30_000,
        waitId: 'wait.tool-1',
        pendingActionRef: 'tool-2',
        principalId: 'admin-1',
        decision: 'approved',
        resolvedAt: '2026-07-23T08:01:00.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
  });

  it('does not append when another owner holds the Run Lease', async () => {
    const target = await fixture();
    await target.runLeases.acquire({
      ...streamScope(),
      partitionKey: `runtime:${scope.runId}`,
      requestedLeaseId: 'blocking-lease',
      ownerId: 'other-worker',
      ttlMs: 30_000,
      acquiredAt: target.now(),
      idempotencyKey: 'blocking-lease',
    });

    const result = await target.service.create(createCommand());
    expect(result).toMatchObject({ disposition: 'lease_unavailable', eventIds: [] });
    expect(await target.events.latestSequence(streamScope())).toBe(3);
  });
});

function createCommand() {
  return {
    commandId: 'create.tool-1',
    scope,
    ownerId: 'worker.review',
    leaseTtlMs: 30_000,
    waitId: 'wait.tool-1',
    pendingActionRef: 'tool-1',
    reason: 'Tool execution requires approval',
    requestedAt: '2026-07-23T08:00:30.000Z',
  };
}

function humanTaskRequest(taskId: string) {
  return {
    taskId,
    kind: 'tool' as const,
    subjectRef: 'tool:filesystem.write@1.0.0',
    subjectHash: `sha256:${'a'.repeat(64)}`,
    requestedBy: scope.userId,
    allowedDecisionScopes: ['runtime.human-task.decide'],
    requestedAt: '2026-07-23T08:00:30.000Z',
    expiresAt: '2026-07-24T08:00:30.000Z',
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string,
  stateAttempt?: number
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    fsmState: 'HumanReview',
    timestamp,
    payload,
    ...(stateAttempt === undefined ? {} : { metadata: { stateAttempt } }),
  };
}
