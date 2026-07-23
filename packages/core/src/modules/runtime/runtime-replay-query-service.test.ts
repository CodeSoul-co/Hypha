import { describe, expect, it } from 'vitest';
import type { RuntimeCheckpointCreateCommand } from '../../contracts/runtime-checkpoint';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type { RuntimeReplayRequest } from '../../contracts/runtime-replay';
import type { RuntimeScope } from '../../contracts/runtime';
import type { EventCreateInput, FrameworkEventType } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { DurableEventRuntime } from './event-runtime';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryProjectionStore, ProjectionEngine } from './projection';
import { InMemoryRunLeaseStore } from './run-lease-store';
import { RuntimeCheckpointService } from './runtime-checkpoint-service';
import { InMemoryRuntimeCheckpointStore } from './runtime-checkpoint-store';
import { RuntimeQueryService } from './runtime-query-service';
import { RuntimeReplayService } from './runtime-replay-service';

const scope: RuntimeScope = {
  tenantId: 'tenant.replay',
  userId: 'user.replay',
  workspaceId: 'workspace.replay',
  sessionId: 'session.replay',
  runId: 'run.replay',
  agentId: 'agent.replay',
};

const eventTypes: FrameworkEventType[] = [
  'run.created',
  'run.started',
  'fsm.state.entered',
  'fsm.state.exited',
  'fsm.transition.accepted',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.checkpoint.created',
  'runtime.checkpoint.failed',
];
const payloadSchema: JsonSchema = { type: 'object', additionalProperties: true };

async function fixture() {
  let seconds = 0;
  let idSequence = 0;
  const now = () => new Date(Date.UTC(2026, 6, 18, 15, 0, seconds++)).toISOString();
  const nextId = (namespace: string) => `${namespace}.${++idSequence}`;
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of eventTypes) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const eventStore = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store: eventStore, now });
  const projectionStore = new InMemoryProjectionStore<RuntimeOrchestrationProjection>();
  const projections = new ProjectionEngine({ events, now });
  const checkpoints = new InMemoryRuntimeCheckpointStore();
  const checkpointService = new RuntimeCheckpointService({
    events,
    projections,
    projectionStore,
    checkpoints,
    runLeases: new InMemoryRunLeaseStore({ now }),
    now,
    nextId,
  });
  const replay = new RuntimeReplayService({ events, checkpoints: checkpointService, now });
  const query = new RuntimeQueryService({ events, projections, projectionStore, now });
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
  await checkpointService.create(checkpointCommand());
  const head = (await events.getStreamHead(streamScope()))!;
  await events.append({
    scope: streamScope(),
    events: [
      event(
        'history.activity.requested',
        'runtime.activity.requested',
        { invocation: { activityId: 'activity.history' } },
        now()
      ),
      event(
        'history.activity.completed',
        'runtime.activity.completed',
        { activityId: 'activity.history', output: { recorded: true } },
        now()
      ),
      event(
        'history.transition.accepted',
        'fsm.transition.accepted',
        { from: 'Acting', to: 'Observing' },
        now()
      ),
      event('history.state.exited', 'fsm.state.exited', { stateId: 'Acting' }, now()),
      event('history.state.entered', 'fsm.state.entered', { stateId: 'Observing' }, now()),
    ],
    expectedLastSequence: head.lastSequence,
    expectedRunRevision: head.runRevision,
    fencingToken: head.fencingToken,
    idempotencyKey: 'seed.historical-delta',
  });
  return { events, checkpointService, replay, query, now };
}

function checkpointCommand(): RuntimeCheckpointCreateCommand {
  return {
    checkpointId: 'checkpoint.replay',
    scope,
    ownerId: 'runtime-checkpoint.replay',
    leaseTtlMs: 30_000,
    workflowRevision: 'workflow.replay@1.0.0',
    processHash: 'process-hash.replay',
    variablesHash: 'variables-hash.replay',
    dependencySnapshotRef: 'dependency-snapshot.replay',
    reason: 'state_boundary',
    createdAt: '2026-07-18T15:00:05.000Z',
  };
}

function replayRequest(overrides: Partial<RuntimeReplayRequest> = {}): RuntimeReplayRequest {
  return {
    scope,
    checkpointId: 'checkpoint.replay',
    expectedWorkflowRevision: 'workflow.replay@1.0.0',
    expectedProcessHash: 'process-hash.replay',
    expectedDependencySnapshotRef: 'dependency-snapshot.replay',
    requestedAt: '2026-07-18T15:01:00.000Z',
    ...overrides,
  };
}

function event(
  id: string,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string
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
    timestamp,
    payload,
  };
}

function streamScope() {
  return { tenantId: scope.tenantId, userId: scope.userId, runId: scope.runId };
}

describe('RuntimeReplayService and RuntimeQueryService', () => {
  it('replays Checkpoint plus Event delta deterministically without executing Activities', async () => {
    const target = await fixture();

    const first = await target.replay.replay(replayRequest());
    const second = await target.replay.replay(replayRequest());

    expect(first).toMatchObject({
      mode: 'deterministic',
      checkpointId: 'checkpoint.replay',
      baseEventSequence: 3,
      targetEventSequence: 9,
      replayedEventCount: 6,
      appliedEventCount: 5,
      finalSnapshot: {
        runStatus: 'running',
        currentState: 'Observing',
        statePath: ['Acting', 'Observing'],
        pendingActivityIds: [],
      },
    });
    expect(second.finalSnapshotChecksum).toBe(first.finalSnapshotChecksum);
    expect(second.eventIds).toEqual(first.eventIds);
  });

  it('matches Replay output with the unified current Projection Query', async () => {
    const target = await fixture();

    const replayed = await target.replay.replay(replayRequest());
    const queried = await target.query.getRun({ scope });
    const explanation = await target.query.explainState({ scope });

    expect(queried).toMatchObject({
      projectionLastSequence: 9,
      eventHeadSequence: 9,
      projectionLag: 0,
    });
    expect(queried?.projection).toEqual(replayed.finalSnapshot);
    expect(explanation).toMatchObject({
      currentState: 'Observing',
      stateAttempt: 1,
      lastEventSequence: 9,
      source: 'runtime.orchestration.projection',
    });
    await expect(target.query.getPendingWaits({ scope })).resolves.toEqual([]);
  });

  it('filters and bounds Timeline reads through the Query Service', async () => {
    const target = await fixture();

    const timeline = await target.query.getTimeline({
      scope,
      types: ['fsm.state.entered'],
      limit: 1,
    });

    expect(timeline).toMatchObject({ eventCount: 1, eventHeadSequence: 9 });
    expect(timeline.events.map((item) => item.id)).toEqual(['seed.state.entered']);
  });

  it('rejects changed Workflow anchors and Event sequence gaps', async () => {
    const target = await fixture();

    await expect(
      target.replay.replay(replayRequest({ expectedProcessHash: 'process-hash.changed' }))
    ).rejects.toMatchObject({ code: 'RUNTIME_REPLAY_DIVERGENCE' });

    const replayWithGap = new RuntimeReplayService({
      checkpoints: target.checkpointService,
      events: {
        read: async (request) =>
          (await target.events.read(request)).filter((item) => item.sequence !== 6),
      },
      now: target.now,
    });
    await expect(replayWithGap.replay(replayRequest())).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
    });
  });

  it('reports Snapshot verification divergence without mutating source history', async () => {
    const target = await fixture();
    const before = await target.events.read({ scope: streamScope() });

    const verification = await target.replay.verify({
      replay: replayRequest(),
      expectedSnapshotChecksum: 'snapshot-checksum.changed',
    });

    expect(verification).toMatchObject({
      matches: false,
      divergences: [{ kind: 'snapshot_checksum' }],
    });
    expect(await target.events.read({ scope: streamScope() })).toEqual(before);
  });

  it('returns null for the same runId outside its tenant and user scope', async () => {
    const target = await fixture();

    await expect(
      target.query.getRun({
        scope: { ...scope, tenantId: 'tenant.other', userId: 'user.other' },
      })
    ).resolves.toBeNull();
  });
});
