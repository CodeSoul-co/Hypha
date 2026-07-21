import {
  RUNTIME_ORCHESTRATION_EVENT_TYPES,
  type EventFilter,
  type EventStore,
  type FrameworkEvent,
  type TraceRecorder,
} from '@hypha/core';

const orchestrationEventTypes = new Set<string>(RUNTIME_ORCHESTRATION_EVENT_TYPES);

export interface OrchestrationEventStoreOptions {
  legacy: EventStore;
  canonical: () => EventStore;
}

/**
 * Routes schema-backed orchestration facts to the canonical store while
 * keeping event families that have not migrated yet in the legacy store.
 */
export class OrchestrationEventStore implements EventStore, TraceRecorder {
  constructor(private readonly options: OrchestrationEventStoreOptions) {}

  append(event: FrameworkEvent): Promise<void> {
    return this.storeFor(event.type).append(event);
  }

  record(event: FrameworkEvent): Promise<void> {
    return this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    if (filter.type) return this.storeFor(filter.type).list(filter);

    const [legacy, canonical] = await Promise.all([
      this.options.legacy.list(filter),
      this.options.canonical().list(filter),
    ]);
    const events = new Map<string, FrameworkEvent>();
    for (const event of legacy) {
      if (!isOrchestrationEvent(event.type)) events.set(event.id, event);
    }
    for (const event of canonical) events.set(event.id, event);
    return [...events.values()].sort(compareEvents);
  }

  private storeFor(type: FrameworkEvent['type']): EventStore {
    return isOrchestrationEvent(type) ? this.options.canonical() : this.options.legacy;
  }
}

export function isOrchestrationEvent(type: FrameworkEvent['type']): boolean {
  return orchestrationEventTypes.has(type);
}

function compareEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  const timestamp = left.timestamp.localeCompare(right.timestamp);
  if (timestamp !== 0) return timestamp;
  const sequence =
    (left.globalSequence ?? left.sequence ?? 0) - (right.globalSequence ?? right.sequence ?? 0);
  return sequence || left.id.localeCompare(right.id);
}
