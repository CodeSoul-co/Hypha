import {
  SQLiteDurableEventStore,
  SQLiteProjectionStore,
  SQLiteRunLeaseStore,
  SQLiteRuntimeCheckpointStore,
  SQLiteStateExecutionClaimStore,
} from '@hypha/adapters-local';
import {
  DurableEventRuntime,
  ProjectionEngine,
  type EventSchemaRegistry,
  type RuntimeOrchestrationProjection,
} from '@hypha/core';
import fs from 'fs';
import path from 'path';
import type { RuntimeCompositionDependencies } from './RuntimeCompositionRoot';

export interface RuntimeBackbone extends RuntimeCompositionDependencies {
  schemaRegistry: EventSchemaRegistry;
  eventStore: SQLiteDurableEventStore;
  projectionStore: SQLiteProjectionStore<RuntimeOrchestrationProjection>;
  checkpoints: SQLiteRuntimeCheckpointStore;
  runLeases: SQLiteRunLeaseStore;
  stateClaims: SQLiteStateExecutionClaimStore;
  close(): void;
}

export interface RuntimeBackboneOptions {
  filename: string;
  schemaRegistry: EventSchemaRegistry;
  now?: () => string;
}

/**
 * Creates the durable dependencies owned by one Server runtime process.
 * Event schemas are mandatory so startup cannot silently accept unversioned payloads.
 */
export function createRuntimeBackbone(options: RuntimeBackboneOptions): RuntimeBackbone {
  const filename = path.resolve(options.filename);
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  const closeables: Array<{ close(): void }> = [];
  try {
    const eventStore = opened(
      new SQLiteDurableEventStore({
        filename,
        schemaRegistry: options.schemaRegistry,
        now: options.now,
      }),
      closeables
    );
    const events = new DurableEventRuntime({ store: eventStore, now: options.now });
    const projectionStore = opened(
      new SQLiteProjectionStore<RuntimeOrchestrationProjection>({
        filename,
        now: options.now,
      }),
      closeables
    );
    const projections = new ProjectionEngine({ events, now: options.now });
    const checkpoints = opened(
      new SQLiteRuntimeCheckpointStore({ filename, now: options.now }),
      closeables
    );
    const runLeases = opened(new SQLiteRunLeaseStore({ filename, now: options.now }), closeables);
    const stateClaims = opened(
      new SQLiteStateExecutionClaimStore({
        filename,
        runLeaseStore: runLeases,
        now: options.now,
      }),
      closeables
    );
    let closed = false;

    return Object.freeze({
      schemaRegistry: options.schemaRegistry,
      eventStore,
      events,
      projections,
      projectionStore,
      checkpoints,
      runLeases,
      stateClaims,
      close: () => {
        if (closed) return;
        closed = true;
        closeAll(closeables);
      },
    });
  } catch (error) {
    closeAll(closeables);
    throw error;
  }
}

function opened<T extends { close(): void }>(value: T, closeables: Array<{ close(): void }>): T {
  closeables.push(value);
  return value;
}

function closeAll(closeables: Array<{ close(): void }>): void {
  for (const closeable of [...closeables].reverse()) {
    try {
      closeable.close();
    } catch {
      // Shutdown continues so every owned SQLite connection gets a close attempt.
    }
  }
}
