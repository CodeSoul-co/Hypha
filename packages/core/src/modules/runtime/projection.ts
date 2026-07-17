import { FrameworkError } from '../../errors';
import type { PersistedFrameworkEvent } from '../../events';
import { eventStreamKey, type EventStoreV2, type EventStreamScope } from './event-store';

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
    const record = this.records.get(projectionKey(projectionId, key));
    return record ? structuredClone(record) : null;
  }

  async put(record: ProjectionRecord<TState>, expectedRevision?: number): Promise<void> {
    const key = projectionKey(record.projectionId, record.key);
    const current = this.records.get(key);
    const currentRevision = current?.revision ?? 0;
    if (expectedRevision !== undefined && expectedRevision !== currentRevision) {
      throw new FrameworkError({
        code: 'RUNTIME_PROJECTION_FAILED',
        message: 'Projection revision conflict',
        context: {
          projectionId: record.projectionId,
          key: record.key,
          expectedRevision,
          actualRevision: currentRevision,
        },
      });
    }
    if (record.revision !== currentRevision + 1) {
      throw new FrameworkError({
        code: 'RUNTIME_PROJECTION_FAILED',
        message: 'Projection revision must advance by one',
        context: {
          projectionId: record.projectionId,
          key: record.key,
          revision: record.revision,
          currentRevision,
        },
      });
    }
    this.records.set(key, structuredClone(record));
  }

  async delete(projectionId: string, key: string): Promise<void> {
    this.records.delete(projectionKey(projectionId, key));
  }
}

export interface ProjectionEngineOptions {
  events: EventStoreV2;
  now?: () => string;
}

export class ProjectionEngine {
  private readonly events: EventStoreV2;
  private readonly now: () => string;

  constructor(options: ProjectionEngineOptions) {
    this.events = options.events;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async update<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key = eventStreamKey(scope)
  ): Promise<ProjectionRecord<TState>> {
    const current = await store.get(definition.id, key);
    if (current && current.projectionVersion !== definition.version) {
      return this.rebuild(definition, store, scope, key);
    }
    return this.apply(definition, store, scope, key, current);
  }

  async rebuild<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key = eventStreamKey(scope)
  ): Promise<ProjectionRecord<TState>> {
    const current = await store.get(definition.id, key);
    return this.apply(definition, store, scope, key, current, true);
  }

  private async apply<TState>(
    definition: ProjectionDefinition<TState>,
    store: ProjectionStore<TState>,
    scope: EventStreamScope,
    key: string,
    current: ProjectionRecord<TState> | null,
    rebuild = false
  ): Promise<ProjectionRecord<TState>> {
    const fromSequence = rebuild ? 1 : (current?.lastSequence ?? 0) + 1;
    const events = await this.events.readStream(scope, fromSequence);
    if (!rebuild && current && events.length === 0) return structuredClone(current);
    let state = rebuild || !current ? definition.initialState() : structuredClone(current.state);
    try {
      for (const event of events) {
        if (definition.applies(event)) state = definition.reduce(state, event);
      }
    } catch (error) {
      throw new FrameworkError({
        code: 'RUNTIME_PROJECTION_FAILED',
        message: `Projection ${definition.id} failed while reducing events`,
        context: { projectionId: definition.id, key, fromSequence },
        cause: error,
      });
    }

    const lastSequence = events.at(-1)?.sequence ?? (rebuild ? 0 : (current?.lastSequence ?? 0));
    const record: ProjectionRecord<TState> = {
      projectionId: definition.id,
      projectionVersion: definition.version,
      key,
      state,
      lastSequence,
      revision: (current?.revision ?? 0) + 1,
      updatedAt: this.now(),
    };
    await store.put(record, current?.revision ?? 0);
    return structuredClone(record);
  }
}

function projectionKey(projectionId: string, key: string): string {
  return `${projectionId}\u0000${key}`;
}
