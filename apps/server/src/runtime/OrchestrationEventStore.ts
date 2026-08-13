import {
  createRuntimeOrchestrationProjectionDefinition,
  eventStreamKey,
  FrameworkError,
  hashCanonicalJson,
  migrateLegacyHumanWaitEvents,
  RUNTIME_CANONICAL_EVENT_TYPES,
  RUNTIME_ORCHESTRATION_EVENT_TYPES,
  type EventFilter,
  type EventStore,
  type FrameworkEvent,
  type PersistedFrameworkEvent,
  type TraceRecorder,
} from '@codesoul-co/core';

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
  synthesizedEvents: number;
  synthesizedRunIds: string[];
  resetImportedEvents: number;
  migratedEvents: number;
  alreadyCanonicalEvents: number;
  quarantinedEvents: number;
  entries: CanonicalEventFamilyMigrationEntry[];
}

export interface CanonicalRuntimeStreamQuarantineEntry {
  tenantId?: string;
  userId: string;
  runId: string;
  eventId: string;
  eventType: FrameworkEvent['type'];
  reason: string;
}

export interface CanonicalRuntimeStreamIntegrityReport {
  scannedStreams: number;
  validatedStreams: number;
  ignoredStreams: number;
  quarantinedStreams: number;
  entries: CanonicalRuntimeStreamQuarantineEntry[];
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
  const scopes = migrationRunScopes(input.sourceEvents);
  const scopedEvents = input.sourceEvents.map((event) =>
    inheritMigrationScope(event, scopes.get(event.runId))
  );
  const humanWaitMigration = migrateLegacyHumanWaitEvents(scopedEvents);
  const legacyResumeMigration = synthesizeLegacyHumanResumeEvents(humanWaitMigration.events);
  const eligible = orderMigrationEvents(
    legacyResumeMigration.events
      .map((event, index) => ({ event, index }))
      .filter(({ event }) => isCanonicalRuntimeEvent(event.type) && selectedTypes.has(event.type))
  ).map(({ event }) => event);
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
    synthesizedEvents: legacyResumeMigration.synthesizedEvents,
    synthesizedRunIds: legacyResumeMigration.synthesizedRunIds,
    resetImportedEvents: 0,
    migratedEvents: entries.filter((entry) => entry.status === 'migrated').length,
    alreadyCanonicalEvents: entries.filter((entry) => entry.status === 'already_canonical').length,
    quarantinedEvents: entries.filter((entry) => entry.status === 'quarantined').length,
    entries,
  };
}

/**
 * Replays every canonical orchestration stream before workers start.
 *
 * A stream that cannot satisfy projection invariants is quarantined by
 * preventing Runtime startup and returning deterministic repair evidence.
 */
export function auditCanonicalRuntimeStreams(
  events: readonly FrameworkEvent[]
): CanonicalRuntimeStreamIntegrityReport {
  const streams = new Map<string, FrameworkEvent[]>();
  for (const event of events) {
    const userId = eventOwnerId(event) ?? '<missing>';
    const key = eventStreamKey({
      ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
      userId,
      runId: event.runId,
    });
    const stream = streams.get(key) ?? [];
    stream.push(event);
    streams.set(key, stream);
  }

  let validatedStreams = 0;
  let ignoredStreams = 0;
  const entries: CanonicalRuntimeStreamQuarantineEntry[] = [];
  for (const key of [...streams.keys()].sort()) {
    const stream = [...streams.get(key)!].sort(compareCanonicalEvents);
    const malformed = stream.find((event) => !isPersistedFrameworkEvent(event));
    if (malformed) {
      entries.push({
        ...(malformed.tenantId === undefined ? {} : { tenantId: malformed.tenantId }),
        userId: eventOwnerId(malformed) ?? '<missing>',
        runId: malformed.runId,
        eventId: malformed.id,
        eventType: malformed.type,
        reason: 'Canonical Runtime stream contains a non-persisted Event record',
      });
      continue;
    }
    const persistedStream = stream.filter(isPersistedFrameworkEvent);
    const definition = createRuntimeOrchestrationProjectionDefinition(persistedStream[0]!.runId);
    const applicable = persistedStream.filter((event) => definition.applies(event));
    if (applicable.length === 0) {
      ignoredStreams += 1;
      continue;
    }

    let state = definition.initialState();
    let current = applicable[0]!;
    try {
      for (const event of applicable) {
        current = event;
        state = definition.reduce(state, event);
      }
      validatedStreams += 1;
    } catch (error) {
      entries.push({
        ...(current.tenantId === undefined ? {} : { tenantId: current.tenantId }),
        userId: current.userId,
        runId: current.runId,
        eventId: current.id,
        eventType: current.type,
        reason: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    scannedStreams: streams.size,
    validatedStreams,
    ignoredStreams,
    quarantinedStreams: entries.length,
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

function compareCanonicalEvents(left: FrameworkEvent, right: FrameworkEvent): number {
  return (
    (left.sequence ?? 0) - (right.sequence ?? 0) ||
    (left.globalSequence ?? 0) - (right.globalSequence ?? 0) ||
    left.id.localeCompare(right.id)
  );
}

function isPersistedFrameworkEvent(event: FrameworkEvent): event is PersistedFrameworkEvent {
  return (
    typeof event.version === 'string' &&
    typeof event.userId === 'string' &&
    Number.isInteger(event.sequence) &&
    Number.isInteger(event.globalSequence) &&
    typeof event.recordedAt === 'string' &&
    typeof event.payloadHash === 'string'
  );
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
    case 'recovery.case.opened':
    case 'recovery.case.resolved':
    case 'recovery.case.escalated':
      return withPayload(event, upcastRecoveryCasePayload(event.type, payload));
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

function migrationRunScopes(
  events: readonly FrameworkEvent[]
): ReadonlyMap<string, CanonicalRunScope> {
  const primary = new Map<string, Map<string, CanonicalRunScope>>();
  const fallback = new Map<string, Map<string, CanonicalRunScope>>();
  for (const event of events) {
    const scope = migrationScope(event);
    if (!scope) continue;
    addMigrationScope(fallback, event.runId, scope);
    if (event.type === 'run.created') addMigrationScope(primary, event.runId, scope);
  }

  const resolved = new Map<string, CanonicalRunScope>();
  for (const runId of new Set([...primary.keys(), ...fallback.keys()])) {
    const candidates = primary.get(runId) ?? fallback.get(runId);
    if (candidates?.size === 1) resolved.set(runId, [...candidates.values()][0]!);
  }
  return resolved;
}

function migrationScope(event: FrameworkEvent): CanonicalRunScope | null {
  const payload = asRecord(event.payload);
  const approvalRequest = asRecord(payload.approvalRequest);
  const userId =
    eventOwnerId(event) ??
    stringValue(payload.userId) ??
    stringValue(approvalRequest.userId) ??
    stringValue(approvalRequest.principalId);
  if (!userId) return null;
  return {
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    userId,
    ...(event.workspaceId === undefined ? {} : { workspaceId: event.workspaceId }),
    ...(event.sessionId === undefined ? {} : { sessionId: event.sessionId }),
  };
}

function addMigrationScope(
  scopes: Map<string, Map<string, CanonicalRunScope>>,
  runId: string,
  scope: CanonicalRunScope
): void {
  const candidates = scopes.get(runId) ?? new Map<string, CanonicalRunScope>();
  candidates.set(runScopeIdentity(scope), scope);
  scopes.set(runId, candidates);
}

function inheritMigrationScope(
  event: FrameworkEvent,
  scope: CanonicalRunScope | undefined
): FrameworkEvent {
  if (!scope || eventOwnerId(event)) return structuredClone(event);
  return {
    ...structuredClone(event),
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

interface IndexedMigrationEvent {
  event: FrameworkEvent;
  index: number;
}

interface LegacyPendingHumanWait {
  waitId: string;
  stateId: string;
  pendingActionRef: string;
}

function synthesizeLegacyHumanResumeEvents(events: FrameworkEvent[]): {
  events: FrameworkEvent[];
  synthesizedEvents: number;
  synthesizedRunIds: string[];
} {
  const existingResolvedWaitIds = new Set(
    events.flatMap((event) => {
      if (event.type !== 'runtime.wait.resolved') return [];
      const waitId = stringValue(asRecord(event.payload).waitId);
      return waitId ? [waitId] : [];
    })
  );
  const terminalReviewActions = new Set(
    events.flatMap((event) => {
      if (event.type !== 'human.review.resolved' && event.type !== 'human.review.rejected') {
        return [];
      }
      const actionRef = legacyReviewActionRef(event);
      return actionRef ? [actionRef] : [];
    })
  );
  const pendingByStream = new Map<string, LegacyPendingHumanWait>();
  const currentStateByStream = new Map<string, string>();
  const synthesizedRunIds = new Set<string>();
  let synthesizedEvents = 0;
  const expanded: FrameworkEvent[] = [];

  for (const event of events) {
    const stream = migrationStreamIdentity(event);
    expanded.push(structuredClone(event));
    if (event.type === 'fsm.state.entered') {
      const entered = stateId(event);
      if (entered) currentStateByStream.set(stream, entered);
    }
    if (event.type === 'run.waiting_human') {
      const payload = asRecord(event.payload);
      const wait = asRecord(payload.wait);
      const waitId = stringValue(payload.waitId);
      const pendingActionRef = stringValue(wait.pendingActionRef);
      const waitingState = event.fsmState ?? currentStateByStream.get(stream);
      if (waitId && pendingActionRef && waitingState) {
        pendingByStream.set(stream, { waitId, pendingActionRef, stateId: waitingState });
      }
      continue;
    }

    const actionRef = legacyReviewActionRef(event);
    const isTerminalDecision =
      event.type === 'human.review.resolved' ||
      event.type === 'human.review.rejected' ||
      (event.type === 'human.review.approved' &&
        actionRef !== undefined &&
        !terminalReviewActions.has(actionRef));
    if (!isTerminalDecision || !actionRef) continue;

    const pending = pendingByStream.get(stream);
    if (
      !pending ||
      pending.pendingActionRef !== actionRef ||
      existingResolvedWaitIds.has(pending.waitId)
    ) {
      continue;
    }
    const synthetic = legacyHumanResumeEvents(event, pending);
    expanded.push(...synthetic);
    synthesizedEvents += synthetic.length;
    synthesizedRunIds.add(event.runId);
    pendingByStream.delete(stream);
  }

  return {
    events: expanded,
    synthesizedEvents,
    synthesizedRunIds: [...synthesizedRunIds].sort(),
  };
}

function legacyHumanResumeEvents(
  resolution: FrameworkEvent,
  pending: LegacyPendingHumanWait
): FrameworkEvent[] {
  const principalId = legacyReviewPrincipalId(resolution);
  const commandId = `legacy-human-resume:${resolution.id}`;
  const commandHash = hashCanonicalJson({
    migration: 'legacy-human-resume:1.0.0',
    resolutionEventId: resolution.id,
    waitId: pending.waitId,
    principalId,
  });
  const resume = {
    commandId,
    kind: 'manual',
    waitId: pending.waitId,
    principalId,
    resumedAt: resolution.timestamp,
  };
  const migrated = (
    suffix: string,
    type: FrameworkEvent['type'],
    payload: Record<string, unknown>,
    fsmState = resolution.fsmState
  ): FrameworkEvent => ({
    ...structuredClone(resolution),
    id: `${resolution.id}:${suffix}`,
    type,
    idempotencyKey: `legacy-human-resume:${resolution.id}:${suffix}`,
    ...(fsmState === undefined ? {} : { fsmState }),
    payload,
    metadata: {
      ...resolution.metadata,
      migration: 'legacy-human-resume:1.0.0',
      sourceEventId: resolution.id,
    },
  });
  return [
    migrated('run-resume-requested', 'run.resume.requested', {
      commandId,
      commandHash,
      waitId: pending.waitId,
    }),
    migrated('wait-resolved', 'runtime.wait.resolved', {
      commandId,
      commandHash,
      waitId: pending.waitId,
      resolution: 'manual',
      resolvedAt: resolution.timestamp,
    }),
    migrated('run-resumed', 'run.resumed', {
      commandId,
      commandHash,
      resume,
    }),
    migrated(
      'state-reentered',
      'fsm.state.entered',
      {
        commandId,
        commandHash,
        stateId: pending.stateId,
        reason: 'legacy_human_review_resolved',
      },
      pending.stateId
    ),
  ];
}

function legacyReviewActionRef(event: FrameworkEvent): string | undefined {
  const payload = asRecord(event.payload);
  const grant = asRecord(payload.grant);
  const approvalRequest = asRecord(payload.approvalRequest);
  return (
    stringValue(payload.invocationId) ??
    stringValue(grant.invocationId) ??
    stringValue(approvalRequest.invocationId) ??
    stringValue(payload.taskId) ??
    stringValue(payload.requestId)
  );
}

function legacyReviewPrincipalId(event: FrameworkEvent): string {
  const payload = asRecord(event.payload);
  const grant = asRecord(payload.grant);
  const approvalRequest = asRecord(payload.approvalRequest);
  return (
    stringValue(grant.approvedBy) ??
    stringValue(payload.approvedBy) ??
    stringValue(approvalRequest.principalId) ??
    stringValue(approvalRequest.userId) ??
    eventOwnerId(event) ??
    'legacy-operator'
  );
}

interface MigrationRunState {
  runCreated: boolean;
  runStarted: boolean;
  currentState?: string;
  pendingTransition?: { from: string; to: string };
}

/**
 * Legacy appenders could complete concurrent writes in a different order while
 * assigning the same millisecond timestamp. Rebuild only the causal order that
 * can be proven from Run and FSM fields; ambiguous records retain their source
 * order and are rejected by the subsequent canonical replay audit.
 */
function orderMigrationEvents(events: IndexedMigrationEvent[]): IndexedMigrationEvent[] {
  const sorted = [...events].sort(
    (left, right) =>
      left.event.timestamp.localeCompare(right.event.timestamp) || left.index - right.index
  );
  const states = new Map<string, MigrationRunState>();
  const ordered: IndexedMigrationEvent[] = [];
  for (let start = 0; start < sorted.length; ) {
    let end = start + 1;
    while (end < sorted.length && sorted[end]!.event.timestamp === sorted[start]!.event.timestamp) {
      end += 1;
    }
    const timestampGroup = sorted.slice(start, end);
    const streams = new Map<string, IndexedMigrationEvent[]>();
    for (const item of timestampGroup) {
      const key = migrationStreamIdentity(item.event);
      const stream = streams.get(key) ?? [];
      stream.push(item);
      streams.set(key, stream);
    }
    for (const [key, stream] of [...streams.entries()].sort(
      (left, right) => left[1][0]!.index - right[1][0]!.index
    )) {
      const state = states.get(key) ?? { runCreated: false, runStarted: false };
      ordered.push(...orderMigrationTimestampStream(stream, state));
      states.set(key, state);
    }
    start = end;
  }
  return ordered;
}

function orderMigrationTimestampStream(
  events: IndexedMigrationEvent[],
  state: MigrationRunState
): IndexedMigrationEvent[] {
  const remaining = [...events];
  const ordered: IndexedMigrationEvent[] = [];
  while (remaining.length > 0) {
    const preferred = preferredMigrationEventIndex(remaining, state);
    const ready =
      preferred >= 0
        ? preferred
        : remaining.findIndex(({ event }) => migrationEventReady(event, state, remaining));
    const index = ready >= 0 ? ready : 0;
    const [next] = remaining.splice(index, 1);
    ordered.push(next!);
    applyMigrationEvent(next!.event, state);
  }
  return ordered;
}

function preferredMigrationEventIndex(
  events: readonly IndexedMigrationEvent[],
  state: MigrationRunState
): number {
  if (!state.runCreated) {
    return events.findIndex(({ event }) => event.type === 'run.created');
  }
  if (!state.runStarted) {
    return events.findIndex(({ event }) => event.type === 'run.started');
  }
  if (state.pendingTransition && state.currentState) {
    const exit = events.findIndex(
      ({ event }) =>
        event.type === 'fsm.state.exited' &&
        stateId(event) === state.currentState
    );
    if (exit >= 0) return exit;
    return events.findIndex(
      ({ event }) =>
        event.type === 'fsm.state.entered' &&
        stateId(event) === state.pendingTransition?.to
    );
  }
  if (!state.pendingTransition && state.currentState) {
    const accepted = events.findIndex(
      ({ event }) =>
        event.type === 'fsm.transition.accepted' &&
        transition(event)?.from === state.currentState
    );
    if (accepted >= 0) {
      const target = transition(events[accepted]!.event);
      const requested = events.findIndex(({ event }) => {
        const candidate = transition(event);
        return (
          event.type === 'fsm.transition.requested' &&
          candidate?.from === target?.from &&
          candidate?.to === target?.to
        );
      });
      return requested >= 0 ? requested : accepted;
    }
  }
  return -1;
}

function migrationEventReady(
  event: FrameworkEvent,
  state: MigrationRunState,
  remaining: readonly IndexedMigrationEvent[]
): boolean {
  switch (event.type) {
    case 'run.created':
      return !state.runCreated;
    case 'run.started':
      return state.runCreated;
    case 'fsm.transition.requested':
      return state.runStarted;
    case 'fsm.transition.accepted': {
      const candidate = transition(event);
      return (
        state.runStarted &&
        state.currentState !== undefined &&
        state.pendingTransition === undefined &&
        candidate?.from === state.currentState
      );
    }
    case 'fsm.state.exited':
      return (
        state.runStarted &&
        state.currentState !== undefined &&
        stateId(event) === state.currentState
      );
    case 'fsm.state.entered': {
      if (!state.runStarted) return false;
      const entered = stateId(event);
      return (
        entered !== undefined &&
        (state.currentState === undefined ||
          state.pendingTransition?.to === entered ||
          (state.pendingTransition === undefined && state.currentState === entered))
      );
    }
    case 'run.waiting_human':
    case 'run.waiting_signal':
    case 'run.waiting_timer':
    case 'run.paused':
    case 'run.completed':
    case 'run.failed':
    case 'run.cancelled':
      return (
        state.runStarted &&
        !remaining.some(({ event: candidate }) => isStructuralFsmEvent(candidate.type))
      );
    default:
      return true;
  }
}

function applyMigrationEvent(event: FrameworkEvent, state: MigrationRunState): void {
  if (event.type === 'run.created') state.runCreated = true;
  if (event.type === 'run.started') state.runStarted = true;
  if (event.type === 'fsm.transition.accepted') {
    const candidate = transition(event);
    if (candidate?.from === state.currentState && !state.pendingTransition) {
      state.pendingTransition = candidate;
    }
  }
  if (event.type === 'fsm.state.entered') {
    const entered = stateId(event);
    if (!entered) return;
    if (
      state.currentState === undefined ||
      state.currentState === entered ||
      state.pendingTransition?.to === entered
    ) {
      state.currentState = entered;
      state.pendingTransition = undefined;
    }
  }
}

function migrationStreamIdentity(event: FrameworkEvent): string {
  return [event.tenantId ?? '', eventOwnerId(event) ?? '', event.runId].join('\u0000');
}

function transition(event: FrameworkEvent): { from: string; to: string } | undefined {
  const payload = asRecord(event.payload);
  const from = stringValue(payload.from);
  const to = stringValue(payload.to);
  return from && to ? { from, to } : undefined;
}

function stateId(event: FrameworkEvent): string | undefined {
  return stringValue(asRecord(event.payload).stateId) ?? event.fsmState;
}

function isStructuralFsmEvent(type: FrameworkEvent['type']): boolean {
  return (
    type === 'fsm.transition.accepted' ||
    type === 'fsm.state.entered' ||
    type === 'fsm.state.exited'
  );
}

function upcastRecoveryCasePayload(
  type: 'recovery.case.opened' | 'recovery.case.resolved' | 'recovery.case.escalated',
  payload: Record<string, unknown>
): Record<string, unknown> {
  const caseId = stringValue(payload.caseId) ?? 'legacy-recovery-case';
  const rootFingerprint = stringValue(payload.rootFingerprint) ?? hashCanonicalJson(payload);
  const failure = asRecord(payload.failure);
  const strategy = stringValue(payload.strategy);
  const safeAction =
    stringValue(payload.safeAction) ??
    (strategy === 'retry'
      ? 'requeue'
      : strategy === 'compensate'
        ? 'compensate_activity'
        : strategy === 'fail'
          ? 'mark_failed'
          : 'manual_review');
  return {
    ...payload,
    caseId,
    rootFingerprint,
    status:
      type === 'recovery.case.opened'
        ? 'active'
        : type === 'recovery.case.resolved'
          ? 'recovered'
          : 'suspended',
    cycles:
      Number.isSafeInteger(payload.cycles) && (payload.cycles as number) >= 0 ? payload.cycles : 1,
    candidateId: stringValue(payload.candidateId) ?? caseId,
    candidateHash:
      stringValue(payload.candidateHash) ?? hashCanonicalJson({ caseId, rootFingerprint, failure }),
    reason:
      stringValue(payload.reason) ??
      stringValue(failure.category) ??
      stringValue(failure.code) ??
      'CUSTOM',
    safeAction,
    ...(type === 'recovery.case.opened'
      ? {}
      : {
          disposition:
            stringValue(payload.disposition) ??
            (type === 'recovery.case.resolved' && strategy === 'retry'
              ? 'requeued'
              : type === 'recovery.case.resolved'
                ? 'recovered'
                : 'requires_review'),
        }),
  };
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
