import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  ProjectionEngine,
  type EventCreateInput,
  type EventStreamScope,
  type ProjectionDefinition,
  type ProjectionRecord,
} from '@hypha/core';
import { describe, expect, it } from 'vitest';
import { SQLiteProjectionStore } from './projection-store';
import { SQLiteEventStoreV2 } from './runtime-event-store';

interface State {
  eventIds: string[];
}

const scope: EventStreamScope = {
  tenantId: 'tenant.projection.sqlite',
  userId: 'user.projection.sqlite',
  runId: 'run.projection.sqlite',
};

const definition: ProjectionDefinition<State> = {
  id: 'projection.sqlite.fixture',
  version: '1.0.0',
  initialState: () => ({ eventIds: [] }),
  applies: () => true,
  reduce: (state, event) => ({ eventIds: [...state.eventIds, event.id] }),
};

function databaseFilename(): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-runtime-projections-'));
  return path.join(root, 'runtime.sqlite');
}

function event(id: string): EventCreateInput {
  return {
    id,
    type: 'run.created',
    runId: scope.runId,
    payload: { id },
  };
}

function record(overrides: Partial<ProjectionRecord<State>> = {}): ProjectionRecord<State> {
  return {
    projectionId: definition.id,
    projectionVersion: definition.version,
    key: 'tenant/user/run',
    state: { eventIds: ['event.1'] },
    lastSequence: 1,
    revision: 1,
    updatedAt: '2026-07-17T04:00:00.000Z',
    ...overrides,
  };
}

describe('SQLiteProjectionStore', () => {
  it('persists projection checkpoints across reopen without exposing mutable state', async () => {
    const filename = databaseFilename();
    const store = new SQLiteProjectionStore<State>({ filename });
    const checkpoint = record();
    await store.put(checkpoint, 0);
    checkpoint.state.eventIds.push('caller-mutation');

    const reopened = new SQLiteProjectionStore<State>({ filename });
    await expect(reopened.get(definition.id, checkpoint.key)).resolves.toEqual(record());
  });

  it('rejects stale and skipped revisions without replacing the checkpoint', async () => {
    const store = new SQLiteProjectionStore<State>({ filename: databaseFilename() });
    await store.put(record(), 0);

    await expect(store.put(record({ revision: 2 }), 0)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await expect(store.put(record({ revision: 3 }), 1)).rejects.toMatchObject({
      code: 'RUNTIME_PROJECTION_FAILED',
    });
    await expect(store.get(definition.id, record().key)).resolves.toEqual(record());
  });

  it('rejects non-JSON state before changing the stored revision', async () => {
    const store = new SQLiteProjectionStore<State>({ filename: databaseFilename() });
    await store.put(record(), 0);
    await expect(
      store.put(
        record({
          state: { eventIds: ['event.1'], invalid: undefined } as unknown as State,
          revision: 2,
        }),
        1
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(store.get(definition.id, record().key)).resolves.toEqual(record());
  });

  it('drives incremental projection recovery from the SQLite EventStore', async () => {
    const filename = databaseFilename();
    const events = new SQLiteEventStoreV2({ filename });
    const projections = new SQLiteProjectionStore<State>({ filename });
    const engine = new ProjectionEngine({ events });
    await events.append({
      scope,
      events: [event('event.1')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.projection.sqlite.1',
    });
    const first = await engine.update(definition, projections, scope, 'tenant/user/run');
    expect(first).toMatchObject({ state: { eventIds: ['event.1'] }, lastSequence: 1 });

    const reopenedEvents = new SQLiteEventStoreV2({ filename });
    const reopenedProjections = new SQLiteProjectionStore<State>({ filename });
    await reopenedEvents.append({
      scope,
      events: [event('event.2')],
      expectedLastSequence: 1,
      expectedRunRevision: 1,
      idempotencyKey: 'append.projection.sqlite.2',
    });
    const recovered = await new ProjectionEngine({ events: reopenedEvents }).update(
      definition,
      reopenedProjections,
      scope,
      'tenant/user/run'
    );
    expect(recovered).toMatchObject({
      state: { eventIds: ['event.1', 'event.2'] },
      lastSequence: 2,
      revision: 2,
    });
  });

  it('deletes materialized state without touching Event truth', async () => {
    const filename = databaseFilename();
    const events = new SQLiteEventStoreV2({ filename });
    const projections = new SQLiteProjectionStore<State>({ filename });
    await events.append({
      scope,
      events: [event('event.1')],
      expectedLastSequence: 0,
      idempotencyKey: 'append.projection.delete',
    });
    await projections.put(record(), 0);
    await projections.delete(definition.id, record().key);

    await expect(projections.get(definition.id, record().key)).resolves.toBeNull();
    await expect(events.readStream(scope)).resolves.toHaveLength(1);
  });
});
