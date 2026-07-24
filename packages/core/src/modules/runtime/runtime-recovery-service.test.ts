import { describe, expect, it } from 'vitest';
import type { RuntimeActivityInvocation } from '../../contracts/runtime-activities';
import type { RuntimeCancelCommand } from '../../contracts/runtime-cancellation';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type {
  RuntimeActivityReconciliationPort,
  RuntimeRecoveryCandidate,
  RuntimeRecoveryRequeuePort,
} from '../../contracts/runtime-recovery';
import type { RuntimeScope } from '../../contracts/runtime';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import { FrameworkError } from '../../errors';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { createRuntimeOrchestrationProjectionDefinition } from './orchestration-projection';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import { RuntimeCancellationService } from './runtime-cancellation-service';
import { RuntimeRecoveryService } from './runtime-recovery-service';
import { InMemoryStateExecutionClaimStore } from './state-execution-claim-store';

const scope: RuntimeScope = {
  tenantId: 'tenant.recovery',
  userId: 'user.recovery',
  workspaceId: 'workspace.recovery',
  sessionId: 'session.recovery',
  runId: 'run.recovery',
  agentId: 'agent.recovery',
};

const recoveryEventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'run.cancel.requested',
  'run.cancelling',
  'run.cancelled',
  'fsm.state.entered',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.activity.waiting',
  'runtime.activity.cancelled',
  'runtime.cancellation.propagated',
  'runtime.cancellation.failed',
  'recovery.case.opened',
  'recovery.case.resolved',
  'recovery.case.escalated',
];

const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture(
  overrides: {
    activities?: RuntimeActivityReconciliationPort;
    requeue?: RuntimeRecoveryRequeuePort;
  } = {}
) {
  let milliseconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 18, 12, 1, 0, milliseconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of recoveryEventTypes) {
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
  const stateClaims = new InMemoryStateExecutionClaimStore({ runLeaseStore: runLeases, now });
  const activityCalls = { reconcile: 0, retry: 0 };
  const requeueCalls: string[] = [];
  const activities: RuntimeActivityReconciliationPort =
    overrides.activities ??
    ({
      reconcile: async (request) => {
        activityCalls.reconcile += 1;
        return {
          activityId: request.invocation.activityId,
          status: 'completed',
          observation: {
            activityId: request.invocation.activityId,
            status: 'completed',
            eventIds: ['provider.completed'],
            output: { recovered: true },
          },
          providerRevision: 'provider.2',
          receiptId: 'receipt.completed',
        };
      },
      retry: async (request) => {
        activityCalls.retry += 1;
        return {
          activityId: request.invocation.activityId,
          status: 'completed',
          eventIds: ['provider.retried'],
          output: { retried: true },
        };
      },
    } satisfies RuntimeActivityReconciliationPort);
  const requeue: RuntimeRecoveryRequeuePort =
    overrides.requeue ??
    ({
      requeue: async (request) => {
        requeueCalls.push(request.scope.runId);
      },
    } satisfies RuntimeRecoveryRequeuePort);
  const cancellations = new RuntimeCancellationService({
    events,
    projections,
    projectionStore,
    runLeases,
    activities: {
      cancel: async (request) => ({
        targetType: 'activity',
        targetId: request.activityId,
        status: 'cancelled',
      }),
    },
    children: {
      listChildren: async () => [],
      cancel: async (request) => ({
        targetType: 'child_run',
        targetId: request.childRunId,
        status: 'cancelled',
      }),
    },
    now,
    nextId,
  });
  const recovery = new RuntimeRecoveryService({
    events,
    projections,
    projectionStore,
    runLeases,
    stateClaims,
    activities,
    cancellations,
    requeue,
    now,
    nextId,
  });
  await events.append({
    scope: streamScope(),
    events: [
      event('seed.run.created', 'run.created', {}, now()),
      event('seed.run.started', 'run.started', {}, now()),
      event('seed.state.entered', 'fsm.state.entered', { stateId: 'Acting' }, now()),
    ],
    expectedLastSequence: 0,
    idempotencyKey: 'seed.running-run',
  });
  return {
    recovery,
    cancellations,
    events,
    projections,
    projectionStore,
    runLeases,
    stateClaims,
    activityCalls,
    requeueCalls,
    now,
  };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string,
  options: Partial<EventCreateInput> = {}
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    workspaceId: scope.workspaceId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    agentId: scope.agentId,
    fsmState: 'Acting',
    timestamp,
    payload,
    ...options,
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

async function project(target: Awaited<ReturnType<typeof fixture>>) {
  return target.projections.update(
    createRuntimeOrchestrationProjectionDefinition(scope.runId),
    target.projectionStore,
    streamScope()
  );
}

async function appendActivity(
  target: Awaited<ReturnType<typeof fixture>>,
  effect: RuntimeActivityInvocation['effect'] = 'external_effect'
) {
  const invocation: RuntimeActivityInvocation = {
    activityId: 'activity.recovery',
    operationId: 'operation.recovery',
    activityType: 'tool',
    target: 'tool.fixture',
    input: { query: 'fixture' },
    scope,
    stateId: 'Acting',
    stateAttempt: 1,
    fencingToken: 1,
    correlationId: scope.runId,
    idempotencyKey: 'activity.recovery',
    requestedAt: '2026-07-18T12:00:01.000Z',
    effect,
  };
  const head = await target.events.getStreamHead(streamScope());
  await target.events.append({
    scope: streamScope(),
    events: [
      event('seed.activity.requested', 'runtime.activity.requested', { invocation }, target.now(), {
        operationId: invocation.operationId,
      }),
    ],
    expectedLastSequence: head!.lastSequence,
    expectedRunRevision: head!.runRevision,
    idempotencyKey: 'seed.activity.requested',
  });
}

function recoveryCommand(candidate: RuntimeRecoveryCandidate) {
  return {
    candidate,
    ownerId: 'runtime-recovery.worker',
    leaseTtlMs: 30_000,
    requestedAt: '2026-07-18T12:01:01.000Z',
  };
}

async function scan(target: Awaited<ReturnType<typeof fixture>>) {
  return target.recovery.scan({ checkedAt: '2026-07-18T12:01:00.000Z', limit: 100 });
}

async function seedExpiredStateClaim(target: Awaited<ReturnType<typeof fixture>>) {
  const lease = await target.runLeases.acquire({
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
    partitionKey: `runtime:${scope.runId}`,
    requestedLeaseId: 'lease.stale-worker',
    ownerId: 'worker.stale',
    ttlMs: 1_000,
    acquiredAt: '2026-07-18T12:00:00.000Z',
    idempotencyKey: 'lease.stale-worker',
  });
  await target.stateClaims.acquire({
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
    stateId: 'Acting',
    stateAttempt: 1,
    requestedClaimId: 'claim.stale-worker',
    processRevision: 'process.recovery@1.0.0',
    expectedRunRevision: 3,
    runLease: {
      scope: {
        tenantId: scope.tenantId,
        userId: scope.userId,
        runId: scope.runId,
        partitionKey: `runtime:${scope.runId}`,
      },
      guard: {
        leaseId: lease!.id,
        ownerId: lease!.ownerId,
        fencingToken: lease!.fencingToken,
      },
    },
    ttlMs: 1_000,
    acquiredAt: '2026-07-18T12:00:00.000Z',
    idempotencyKey: 'claim.stale-worker',
  });
  return lease!;
}

describe('RuntimeRecoveryService', () => {
  it('detects projection lag, rebuilds from Events, and reuses the recovery receipt', async () => {
    const target = await fixture();
    const detected = await scan(target);
    const candidate = detected.candidates.find((item) => item.reason === 'PROJECTION_BEHIND')!;

    const first = await target.recovery.recover(recoveryCommand(candidate));
    const second = await target.recovery.recover(recoveryCommand(candidate));

    expect(first).toMatchObject({
      disposition: 'recovered',
      projection: { runStatus: 'running', currentState: 'Acting' },
    });
    expect(second).toMatchObject({ disposition: 'reused', eventIds: first.eventIds });
    expect((await target.events.read({ scope: streamScope() })).map((item) => item.type)).toEqual(
      expect.arrayContaining(['recovery.case.opened', 'recovery.case.resolved'])
    );
  });

  it('queries a stable Activity receipt and applies its terminal observation once', async () => {
    const target = await fixture();
    await appendActivity(target);
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    const recovered = await target.recovery.recover(recoveryCommand(candidate));

    expect(recovered).toMatchObject({
      disposition: 'recovered',
      projection: { pendingActivityIds: [] },
    });
    expect(target.activityCalls).toEqual({ reconcile: 1, retry: 0 });
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'runtime.activity.completed'
      )
    ).toHaveLength(1);
  });

  it('escalates unknown side effects without retrying or deleting pending evidence', async () => {
    const activities: RuntimeActivityReconciliationPort = {
      reconcile: async (request) => ({
        activityId: request.invocation.activityId,
        status: 'unknown',
      }),
      retry: async () => {
        throw new Error('retry must not run');
      },
    };
    const target = await fixture({ activities });
    await appendActivity(target, 'irreversible');
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    const recovered = await target.recovery.recover(recoveryCommand(candidate));

    expect(recovered).toMatchObject({
      disposition: 'requires_review',
      projection: { pendingActivityIds: ['activity.recovery'] },
    });
    expect((await target.recovery.recover(recoveryCommand(candidate))).disposition).toBe(
      'requires_review'
    );
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'recovery.case.escalated'
      )
    ).toHaveLength(1);
    await project(target);
    expect(
      (await scan(target)).candidates.some(
        (item) =>
          item.reason === 'ACTIVITY_RESULT_UNAPPLIED' && item.candidateId === candidate.candidateId
      )
    ).toBe(false);
  });

  it('escalates when a provider cannot safely retry an unresolved Activity', async () => {
    const activities: RuntimeActivityReconciliationPort = {
      reconcile: async (request) => ({
        activityId: request.invocation.activityId,
        status: 'unknown',
      }),
      retry: async () => {
        throw new FrameworkError({
          code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
          message: 'Provider retry is unavailable',
        });
      },
    };
    const target = await fixture({ activities });
    await appendActivity(target, 'idempotent');
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'requires_review',
      projection: { pendingActivityIds: ['activity.recovery'] },
    });
  });

  it('leaves a waiting Activity for its external or human decision path', async () => {
    const activities: RuntimeActivityReconciliationPort = {
      reconcile: async (request) => ({
        activityId: request.invocation.activityId,
        status: 'waiting',
        observation: {
          activityId: request.invocation.activityId,
          status: 'waiting',
          eventIds: ['human.review.requested'],
        },
      }),
      retry: async () => {
        throw new Error('retry is not expected');
      },
    };
    const target = await fixture({ activities });
    await appendActivity(target, 'external_effect');
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'requires_review',
      projection: { pendingActivityIds: ['activity.recovery'] },
    });
  });

  it('retries an explicitly unknown idempotent Activity through the owner Port', async () => {
    let retries = 0;
    const activities: RuntimeActivityReconciliationPort = {
      reconcile: async (request) => ({
        activityId: request.invocation.activityId,
        status: 'unknown',
      }),
      retry: async (request) => {
        retries += 1;
        return {
          activityId: request.invocation.activityId,
          status: 'completed',
          eventIds: ['provider.idempotent-retry'],
        };
      },
    };
    const target = await fixture({ activities });
    await appendActivity(target, 'idempotent');
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'recovered',
      projection: { pendingActivityIds: [] },
    });
    expect(retries).toBe(1);
  });

  it('keeps Activity candidate identity stable across repeated scans', async () => {
    const target = await fixture();
    await appendActivity(target);
    await project(target);
    const first = (
      await target.recovery.scan({ checkedAt: '2026-07-18T12:01:00.000Z', limit: 100 })
    ).candidates.find((item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED')!;
    const second = (
      await target.recovery.scan({ checkedAt: '2026-07-18T12:02:00.000Z', limit: 100 })
    ).candidates.find((item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED')!;

    expect(second.candidateId).toBe(first.candidateId);
    await expect(target.recovery.recover(recoveryCommand(second))).resolves.toMatchObject({
      disposition: 'recovered',
    });
  });

  it('continues an opened recovery case after a process interruption', async () => {
    let attempts = 0;
    const activities: RuntimeActivityReconciliationPort = {
      reconcile: async (request) => {
        attempts += 1;
        if (attempts === 1) throw new Error('simulated provider interruption');
        return {
          activityId: request.invocation.activityId,
          status: 'completed',
          observation: {
            activityId: request.invocation.activityId,
            status: 'completed',
            eventIds: ['provider.recovered'],
          },
        };
      },
      retry: async () => {
        throw new Error('retry is not expected');
      },
    };
    const target = await fixture({ activities });
    await appendActivity(target);
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'ACTIVITY_RESULT_UNAPPLIED'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).rejects.toThrow(
      'simulated provider interruption'
    );
    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'recovered',
      projection: { pendingActivityIds: [] },
    });
    expect(attempts).toBe(2);
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'recovery.case.opened'
      )
    ).toHaveLength(1);
  });

  it('resumes an incomplete durable cancellation from its stored command', async () => {
    const target = await fixture();
    const cancelCommand: RuntimeCancelCommand = {
      commandId: 'cancel.recovery',
      scope,
      principal: {
        principalId: 'operator.recovery',
        type: 'user',
        tenantId: scope.tenantId,
        userId: scope.userId,
        permissionScopes: ['runtime.run.cancel'],
      },
      ownerId: 'runtime-cancellation.interrupted',
      leaseTtlMs: 30_000,
      reason: 'operator request',
      policy: { propagation: 'all_descendants', cancelRunningActivities: true },
      requestedAt: '2026-07-18T12:00:30.000Z',
    };
    const { ownerId, leaseTtlMs, ...logicalCommand } = cancelCommand;
    void ownerId;
    void leaseTtlMs;
    const commandHash = hashCanonicalJson(logicalCommand);
    const head = await target.events.getStreamHead(streamScope());
    await target.events.append({
      scope: streamScope(),
      events: [
        event(
          'seed.cancel.requested',
          'run.cancel.requested',
          {
            commandId: cancelCommand.commandId,
            commandHash,
            principalId: cancelCommand.principal.principalId,
            reason: cancelCommand.reason,
            policy: cancelCommand.policy,
            requestedAt: cancelCommand.requestedAt,
            command: logicalCommand,
          },
          target.now(),
          { operationId: `runtime-cancellation:${cancelCommand.commandId}` }
        ),
        event(
          'seed.run.cancelling',
          'run.cancelling',
          { commandId: cancelCommand.commandId, commandHash },
          target.now(),
          { operationId: `runtime-cancellation:${cancelCommand.commandId}` }
        ),
      ],
      expectedLastSequence: head!.lastSequence,
      expectedRunRevision: head!.runRevision,
      idempotencyKey: 'seed.incomplete-cancellation',
    });
    await project(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'CANCELLATION_INCOMPLETE'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'recovered',
      projection: { runStatus: 'cancelled', terminalState: 'Acting' },
    });
    expect(
      (await target.events.read({ scope: streamScope() })).filter(
        (item) => item.type === 'run.cancel.requested'
      )
    ).toHaveLength(1);
  });

  it('does not treat an idle active Run without a Lease as interrupted execution', async () => {
    const target = await fixture();
    await project(target);
    const detected = await scan(target);

    expect(detected.candidates).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ reason: 'LEASE_EXPIRED' }),
        expect.objectContaining({ reason: 'STATE_CLAIM_EXPIRED' }),
      ])
    );
    expect(target.requeueCalls).toEqual([]);
  });

  it('requeues an expired State Claim through the injected durable queue port', async () => {
    const target = await fixture();
    await project(target);
    await seedExpiredStateClaim(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'STATE_CLAIM_EXPIRED'
    )!;

    expect(candidate).toMatchObject({ stateId: 'Acting', stateAttempt: 1 });
    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'requeued',
    });
    expect(target.requeueCalls).toEqual([scope.runId]);
    await project(target);
    expect(
      (await scan(target)).candidates.some(
        (item) =>
          item.reason === 'STATE_CLAIM_EXPIRED' && item.candidateId === candidate.candidateId
      )
    ).toBe(false);
  });

  it('takes over an expired Lease and fences the stale worker during requeue', async () => {
    const target = await fixture();
    await project(target);
    const staleLease = await seedExpiredStateClaim(target);
    const candidate = (await scan(target)).candidates.find(
      (item) => item.reason === 'STATE_CLAIM_EXPIRED'
    )!;

    await expect(target.recovery.recover(recoveryCommand(candidate))).resolves.toMatchObject({
      disposition: 'requeued',
    });
    await expect(
      target.runLeases.heartbeat({
        scope: {
          tenantId: scope.tenantId,
          userId: scope.userId,
          runId: scope.runId,
          partitionKey: `runtime:${scope.runId}`,
        },
        guard: {
          leaseId: staleLease!.id,
          ownerId: staleLease!.ownerId,
          fencingToken: staleLease!.fencingToken,
        },
        ttlMs: 30_000,
        heartbeatAt: '2026-07-18T12:01:02.000Z',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });
});
