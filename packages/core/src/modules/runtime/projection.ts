import type { PersistedFrameworkEvent } from '../../events';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import { eventStreamKey, type EventStreamScope } from './event-store';

export interface ProjectionDefinition<TState> {
  id: string;
  version: string;
  initialState(): TState;
  applies(event: PersistedFrameworkEvent): boolean;
  reduce(state: TState, event: PersistedFrameworkEvent): TState;
}

export interface ProjectionRecord<TState = unknown> {
  projectionId: string;
  projectionVersion: string;
  key: string;
  state: TState;
  lastSequence: number;
  revision: number;
  updatedAt: string;
}

export interface ProjectionStore<TState = unknown> {
  get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null>;
  put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void>;
  delete?(projectionId: string, key: string): Promise<void>;
}

export class InMemoryProjectionStore<TState = unknown> implements ProjectionStore<TState> {
  private readonly records = new Map<string, ProjectionRecord<TState>>();

  async get(projectionId: string, key: string): Promise<ProjectionRecord<TState> | null> {
    required(projectionId, 'projectionId');
    required(key, 'projection key');
    const record = this.records.get(projectionKey(projectionId, key));
    return record ? structuredClone(record) : null;
  }

  async put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void> {
    validateRecord(record);
    if (
      expectedRevision !== undefined &&
      (!Number.isInteger(expectedRevision) || expectedRevision < 0)
    ) {
      invalid('Projection expectedRevision must be non-negative');
    }
    const key = projectionKey(record.projectionId, record.key);
    const current = this.records.get(key);
    const currentRevision = current?.revision ?? 0;
    if (expectedRevision !== undefined && expectedRevision !== currentRevision) {
      projectionFailure('Projection revision conflict', {
        projectionId: record.projectionId,
        key: record.key,
        expectedRevision,
        actualRevision: currentRevision,
      });
    }
    if (record.revision !== currentRevision + 1) {
      projectionFailure('Projection revision must advance by one', {
        projectionId: record.projectionId,
        key: record.key,
        revision: record.revision,
        currentRevision,
      });
    }
    this.records.set(key, structuredClone(record));
  }

  async delete(projectionId: string, key: string): Promise<void> {
    required(projectionId, 'projectionId');
    required(key, 'projection key');
    this.records.delete(projectionKey(projectionId, key));
  }
}

export interface ProjectionEngineOptions {
  events: Pick<EventRuntime, 'read'>;
  now?: () => string;
}

export class ProjectionEngine {
  private readonly now: () => string;

  constructor(private readonly options: ProjectionEngineOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async update<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key = eventStreamKey(scope)
  ): Promise<ProjectionRecord<TState>> {
    validateDefinition(definition);
    required(key, 'projection key');
    const current = await store.get(definition.id, key);
    if (current && current.projectionVersion !== definition.version) {
      return this.apply(definition, store, scope, key, current, true);
    }
    return this.apply(definition, store, scope, key, current, false);
  }

  async rebuild<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key = eventStreamKey(scope)
  ): Promise<ProjectionRecord<TState>> {
    validateDefinition(definition);
    required(key, 'projection key');
    const current = await store.get(definition.id, key);
    return this.apply(definition, store, scope, key, current, true);
  }

  private async apply<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key: string,
    current: ProjectionRecord<TState> | null,
    rebuild: boolean
  ): Promise<ProjectionRecord<TState>> {
    const fromSequence = rebuild ? 1 : (current?.lastSequence ?? 0) + 1;
    const events = await this.options.events.read({ scope, fromSequence });
    assertSequence(events, fromSequence);
    if (!rebuild && current && events.length === 0) return structuredClone(current);

    let state = rebuild || !current ? definition.initialState() : structuredClone(current.state);
    persistableState(state, definition.id);
    try {
      for (const event of events) {
        if (definition.applies(event)) {
          state = definition.reduce(state, structuredClone(event));
          persistableState(state, definition.id);
        }
      }
    } catch (error) {
      if (isFrameworkError(error) && error.code === 'RUNTIME_REPLAY_DIVERGENCE') throw error;
      throw new FrameworkError({
        code: 'RUNTIME_PROJECTION_FAILED',
        message: `Projection ${definition.id} failed while reducing events`,
        context: {
          projectionId: definition.id,
          key,
          fromSequence,
        },
        cause: error,
      });
    }

    const updatedAt = this.now();
    validTimestamp(updatedAt, 'Projection clock');
    const record: ProjectionRecord<TState> = {
      projectionId: definition.id,
      projectionVersion: definition.version,
      key,
      state,
      lastSequence: events.at(-1)?.sequence ?? (rebuild ? 0 : (current?.lastSequence ?? 0)),
      revision: (current?.revision ?? 0) + 1,
      updatedAt,
    };
    await store.put(record, current?.revision ?? 0);
    return structuredClone(record);
  }
}

function validateDefinition<TState>(definition: ProjectionDefinition<TState>): void {
  required(definition.id, 'Projection definition id');
  required(definition.version, 'Projection definition version');
  if (
    typeof definition.initialState !== 'function' ||
    typeof definition.applies !== 'function' ||
    typeof definition.reduce !== 'function'
  ) {
    invalid('Projection definition functions are required');
  }
}

function validateRecord<TState>(record: ProjectionRecord<TState>): void {
  required(record.projectionId, 'projectionId');
  required(record.projectionVersion, 'projectionVersion');
  required(record.key, 'projection key');
  if (!Number.isInteger(record.lastSequence) || record.lastSequence < 0) {
    invalid('Projection lastSequence must be non-negative');
  }
  if (!Number.isInteger(record.revision) || record.revision < 1) {
    invalid('Projection revision must be positive');
  }
  validTimestamp(record.updatedAt, 'Projection updatedAt');
  persistableState(record.state, record.projectionId);
}

function assertSequence(events: PersistedFrameworkEvent[], fromSequence: number): void {
  for (let index = 0; index < events.length; index += 1) {
    const expected = fromSequence + index;
    if (events[index].sequence !== expected) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: 'Projection input Event sequence is not contiguous',
        context: { expectedSequence: expected, actualSequence: events[index].sequence },
      });
    }
  }
}

function persistableState<TState>(state: TState, projectionId: string): void {
  try {
    hashCanonicalJson(state);
  } catch (error) {
    throw new FrameworkError({
      code: 'RUNTIME_PROJECTION_FAILED',
      message: `Projection ${projectionId} produced non-persistable state`,
      context: { projectionId },
      cause: error,
    });
  }
}

function projectionKey(projectionId: string, key: string): string {
  return `${projectionId}\u0000${key}`;
}

function required(value: string, label: string): void {
  if (!value.trim()) invalid(`${label} is required`);
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function projectionFailure(message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code: 'RUNTIME_PROJECTION_FAILED', message, context });
}
