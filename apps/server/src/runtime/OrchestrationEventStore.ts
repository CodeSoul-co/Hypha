import {
  FrameworkError,
  RUNTIME_CANONICAL_EVENT_TYPES,
  RUNTIME_ORCHESTRATION_EVENT_TYPES,
  type EventFilter,
  type EventStore,
  type FrameworkEvent,
  type TraceRecorder,
} from '@hypha/core';

const canonicalRuntimeEventTypes = new Set<string>(RUNTIME_CANONICAL_EVENT_TYPES);
const authoritativeOrchestrationEventTypes = new Set<string>(RUNTIME_ORCHESTRATION_EVENT_TYPES);

export interface OrchestrationEventStoreOptions {
  legacy: EventStore;
  canonical: () => EventStore;
}

export interface CanonicalEventFamilyMigrationEntry {
  eventId: string;
  eventType: FrameworkEvent['type'];
  runId: string;
  status: 'migrated' | 'already_canonical' | 'quarantined';
  reason?: string;
}

export interface CanonicalEventFamilyMigrationReport {
  scannedEvents: number;
  eligibleEvents: number;
  migratedEvents: number;
  alreadyCanonicalEvents: number;
  quarantinedEvents: number;
  entries: CanonicalEventFamilyMigrationEntry[];
}

/**
 * Routes schema-backed Runtime facts to the canonical store while
 * keeping event families that have not migrated yet in the legacy store.
 */
export class OrchestrationEventStore implements EventStore, TraceRecorder {
  constructor(private readonly options: OrchestrationEventStoreOptions) {}

  async append(event: FrameworkEvent): Promise<void> {
    const target = this.storeFor(event.type);
    if (!isCanonicalRuntimeEvent(event.type) || eventOwnerId(event)) {
      await target.append(event);
      return;
    }
    await target.append(await this.inheritCanonicalRunScope(event));
  }

  record(event: FrameworkEvent): Promise<void> {
    return this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    if (filter.type) {
      if (!isCanonicalRuntimeEvent(filter.type)) return this.options.legacy.list(filter);
      if (isAuthoritativeOrchestrationEvent(filter.type)) {
        return this.options.canonical().list(filter);
      }
    }

    const [legacy, canonical] = await Promise.all([
      this.options.legacy.list(filter),
      this.options.canonical().list(filter),
    ]);
    const events = new Map<string, FrameworkEvent>();
    for (const event of legacy) {
      if (!isAuthoritativeOrchestrationEvent(event.type)) {
        events.set(eventIdentity(event), event);
      }
    }
    for (const event of canonical) events.set(eventIdentity(event), event);
    return [...events.values()].sort(compareEvents);
  }

  private storeFor(type: FrameworkEvent['type']): EventStore {
    return isCanonicalRuntimeEvent(type) ? this.options.canonical() : this.options.legacy;
  }

  private async inheritCanonicalRunScope(event: FrameworkEvent): Promise<FrameworkEvent> {
    const history = await this.list({ runId: event.runId });
    const runCreated = history.filter(
      (candidate) => candidate.type === 'run.created' && eventOwnerId(candidate)
    );
    const owners = (runCreated.length > 0 ? runCreated : history).flatMap((candidate) => {
      const userId = eventOwnerId(candidate);
      if (!userId) return [];
      return [
        {
          ...(candidate.tenantId === undefined ? {} : { tenantId: candidate.tenantId }),
          userId,
          ...(candidate.workspaceId === undefined ? {} : { workspaceId: candidate.workspaceId }),
          ...(candidate.sessionId === undefined ? {} : { sessionId: candidate.sessionId }),
        } satisfies CanonicalRunScope,
      ];
    });
    const scopes = new Map(owners.map((scope) => [runScopeIdentity(scope), scope]));
    if (scopes.size !== 1) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message:
          scopes.size === 0
            ? `Canonical Event ${event.id} has no persisted Run owner scope`
            : `Canonical Event ${event.id} has an ambiguous persisted Run owner scope`,
        context: { eventId: event.id, eventType: event.type, runId: event.runId },
      });
    }
    const scope = [...scopes.values()][0]!;
    return {
      ...event,
      ...(event.tenantId === undefined && scope.tenantId !== undefined
        ? { tenantId: scope.tenantId }
        : {}),
      userId: scope.userId,
      ...(event.workspaceId === undefined && scope.workspaceId !== undefined
        ? { workspaceId: scope.workspaceId }
        : {}),
      ...(event.sessionId === undefined && scope.sessionId !== undefined
        ? { sessionId: scope.sessionId }
        : {}),
      metadata: { ...event.metadata, userId: scope.userId },
    };
  }
}

interface CanonicalRunScope {
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId?: string;
}

/**
 * Canonical-only write view for RunManager. Reads remain merged so replay can
 * include module-owned observations while no RunManager write can reach legacy.
 */
export class CanonicalRunManagerEventStore implements EventStore, TraceRecorder {
  constructor(
    private readonly canonical: EventStore,
    private readonly mergedReadStore: EventStore
  ) {}

  async append(event: FrameworkEvent): Promise<void> {
    if (!isCanonicalRuntimeEvent(event.type)) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_FAMILY_NOT_MIGRATED',
        message: `RunManager cannot append module-owned Event type ${event.type}`,
        context: { eventId: event.id, eventType: event.type, runId: event.runId },
      });
    }
    await this.canonical.append(event);
  }

  record(event: FrameworkEvent): Promise<void> {
    return this.append(event);
  }

  list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    return this.mergedReadStore.list(filter);
  }
}

export function isCanonicalRuntimeEvent(type: FrameworkEvent['type']): boolean {
  return canonicalRuntimeEventTypes.has(type);
}

export async function migrateCanonicalEventFamilies(input: {
  sourceEvents: readonly FrameworkEvent[];
  canonical: EventStore;
  eventTypes?: readonly FrameworkEvent['type'][];
}): Promise<CanonicalEventFamilyMigrationReport> {
  const selectedTypes = new Set(input.eventTypes ?? RUNTIME_CANONICAL_EVENT_TYPES);
  const eligible = input.sourceEvents.filter(
    (event) => isCanonicalRuntimeEvent(event.type) && selectedTypes.has(event.type)
  );
  const existing = new Set((await input.canonical.list()).map((event) => eventIdentity(event)));
  const entries: CanonicalEventFamilyMigrationEntry[] = [];
  for (const event of eligible) {
    const identity = eventIdentity(event);
    if (existing.has(identity)) {
      entries.push({
        eventId: event.id,
        eventType: event.type,
        runId: event.runId,
        status: 'already_canonical',
      });
      continue;
    }
    try {
      await input.canonical.append(upcastCanonicalMigrationEvent(event));
      existing.add(identity);
      entries.push({
        eventId: event.id,
        eventType: event.type,
        runId: event.runId,
        status: 'migrated',
      });
    } catch (error) {
      entries.push({
        eventId: event.id,
        eventType: event.type,
        runId: event.runId,
        status: 'quarantined',
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return {
    scannedEvents: input.sourceEvents.length,
    eligibleEvents: eligible.length,
    migratedEvents: entries.filter((entry) => entry.status === 'migrated').length,
    alreadyCanonicalEvents: entries.filter((entry) => entry.status === 'already_canonical').length,
    quarantinedEvents: entries.filter((entry) => entry.status === 'quarantined').length,
    entries,
  };
}

/** @deprecated Use isCanonicalRuntimeEvent. */
export function isOrchestrationEvent(type: FrameworkEvent['type']): boolean {
  return isCanonicalRuntimeEvent(type);
}

function isAuthoritativeOrchestrationEvent(type: FrameworkEvent['type']): boolean {
  return authoritativeOrchestrationEventTypes.has(type);
}

function eventIdentity(event: FrameworkEvent): string {
  return [event.tenantId ?? '', event.userId ?? event.metadata?.userId ?? '', event.runId, event.id]
    .map(String)
    .join('\u0000');
}

function eventOwnerId(event: FrameworkEvent): string | undefined {
  return event.userId ?? stringValue(event.metadata?.userId);
}

function runScopeIdentity(scope: CanonicalRunScope): string {
  return [scope.tenantId ?? '', scope.userId].map(String).join('\u0000');
}

function upcastCanonicalMigrationEvent(event: FrameworkEvent): FrameworkEvent {
  const payload = asRecord(event.payload);
  switch (event.type) {
    case 'session.created': {
      const timestamp = event.timestamp;
      const userId =
        stringValue(payload.userId) ?? event.userId ?? stringValue(event.metadata?.userId);
      return withPayload(event, {
        ...payload,
        id: stringValue(payload.id) ?? event.sessionId,
        userId,
        metadata: asRecord(payload.metadata),
        status: stringValue(payload.status) ?? 'active',
        createdAt: stringValue(payload.createdAt) ?? timestamp,
        updatedAt: stringValue(payload.updatedAt) ?? timestamp,
      });
    }
    case 'run.created':
    case 'run.started':
      return withPayload(event, { ...payload, runId: stringValue(payload.runId) ?? event.runId });
    case 'run.completed':
      return withPayload(event, {
        ...payload,
        terminalState: payload.terminalState ?? 'Completed',
      });
    case 'run.failed':
      return withPayload(event, { ...payload, terminalState: payload.terminalState ?? 'Failed' });
    case 'run.cancelled':
      return withPayload(event, {
        ...payload,
        terminalState: payload.terminalState ?? 'Cancelled',
      });
    case 'fsm.state.entered':
    case 'fsm.state.exited':
      return withPayload(event, {
        ...payload,
        stateId: stringValue(payload.stateId) ?? event.fsmState,
      });
    default:
      return structuredClone(event);
  }
}

function withPayload(event: FrameworkEvent, payload: Record<string, unknown>): FrameworkEvent {
  return { ...structuredClone(event), payload };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function compareEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  const timestamp = left.timestamp.localeCompare(right.timestamp);
  if (timestamp !== 0) return timestamp;
  const sequence =
    (left.globalSequence ?? left.sequence ?? 0) - (right.globalSequence ?? right.sequence ?? 0);
  return sequence || left.id.localeCompare(right.id);
}
