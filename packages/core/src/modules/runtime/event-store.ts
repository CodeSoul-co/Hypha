import type { ProviderHealth } from '../../contracts/execution';
import { FrameworkError } from '../../errors';
import {
  createFrameworkEvent,
  type EventCreateInput,
  type PersistedFrameworkEvent,
} from '../../events';
import { hashCanonicalJson } from './canonical-json';
import type { EventSchemaRegistry, EventValidationIssue } from './event-schema-registry';

export interface EventStreamScope {
  tenantId?: string;
  userId: string;
  runId: string;
}

export interface EventAppendRequest {
  scope: EventStreamScope;
  events: EventCreateInput[];
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken?: number;
  idempotencyKey: string;
  transactionGroupId?: string;
}

export interface EventAppendResult {
  events: PersistedFrameworkEvent[];
  firstSequence: number;
  lastSequence: number;
  runRevision: number;
  reused: boolean;
}

export interface EventStreamHead {
  scope: EventStreamScope;
  lastSequence: number;
  runRevision: number;
  fencingToken?: number;
  updatedAt: string;
}

export interface ListEventStreamHeadsRequest {
  cursor?: string;
  limit?: number;
}

export interface ListEventStreamHeadsResult {
  heads: EventStreamHead[];
  nextCursor?: string;
}

export interface DurableEventStore {
  append(request: EventAppendRequest): Promise<EventAppendResult>;
  readStream(scope: EventStreamScope, fromSequence?: number): Promise<PersistedFrameworkEvent[]>;
  readById(scope: EventStreamScope, eventId: string): Promise<PersistedFrameworkEvent | null>;
  getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
  listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
  health(): Promise<ProviderHealth>;
}

interface StreamState {
  head: EventStreamHead;
  events: PersistedFrameworkEvent[];
}

interface IdempotencyRecord {
  requestHash: string;
  result: EventAppendResult;
}

export interface InMemoryDurableEventStoreOptions {
  schemaRegistry: EventSchemaRegistry;
  now?: () => string;
}

export class InMemoryDurableEventStore implements DurableEventStore {
  private readonly streams = new Map<string, StreamState>();
  private readonly eventsById = new Map<
    string,
    { streamKey: string; event: PersistedFrameworkEvent }
  >();
  private readonly idempotency = new Map<string, IdempotencyRecord>();
  private readonly schemaRegistry: EventSchemaRegistry;
  private readonly now: () => string;
  private globalSequence = 0;
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryDurableEventStoreOptions) {
    this.schemaRegistry = options.schemaRegistry;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async append(request: EventAppendRequest): Promise<EventAppendResult> {
    validateEventAppendRequest(request);
    const snapshot = structuredClone(request);
    const previousWrite = this.writeBarrier;
    let releaseWrite = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    await previousWrite;
    try {
      return await this.appendExclusive(snapshot);
    } finally {
      releaseWrite();
    }
  }

  async readStream(scope: EventStreamScope, fromSequence = 1): Promise<PersistedFrameworkEvent[]> {
    validateScope(scope);
    if (!Number.isInteger(fromSequence) || fromSequence < 1) {
      invalid('fromSequence must be a positive integer');
    }
    const stream = this.streams.get(eventStreamKey(scope));
    return (stream?.events ?? []).filter((event) => event.sequence >= fromSequence).map(cloneEvent);
  }

  async readById(
    scope: EventStreamScope,
    eventId: string
  ): Promise<PersistedFrameworkEvent | null> {
    validateScope(scope);
    if (!eventId) invalid('eventId is required');
    const found = this.eventsById.get(eventId);
    if (!found || found.streamKey !== eventStreamKey(scope)) return null;
    return cloneEvent(found.event);
  }

  async getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null> {
    validateScope(scope);
    const head = this.streams.get(eventStreamKey(scope))?.head;
    return head ? cloneHead(head) : null;
  }

  async listStreamHeads(
    request: ListEventStreamHeadsRequest = {}
  ): Promise<ListEventStreamHeadsResult> {
    const limit = streamHeadListLimit(request.limit);
    const ordered = Array.from(this.streams.entries())
      .filter(([key]) => request.cursor === undefined || key > request.cursor)
      .sort(([left], [right]) => left.localeCompare(right))
      .slice(0, limit + 1);
    const page = ordered.slice(0, limit);
    return {
      heads: page.map(([, stream]) => cloneHead(stream.head)),
      ...(ordered.length > limit && page.length > 0
        ? { nextCursor: page[page.length - 1][0] }
        : {}),
    };
  }

  async health(): Promise<ProviderHealth> {
    return { status: 'healthy', checkedAt: this.now() };
  }

  private async appendExclusive(request: EventAppendRequest): Promise<EventAppendResult> {
    const streamKey = eventStreamKey(request.scope);
    const idempotencyRecordKey = `${streamKey}\u0000${request.idempotencyKey}`;
    const requestHash = hashEventAppendRequest(request);
    const prior = this.idempotency.get(idempotencyRecordKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        conflict(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          'Idempotency key was already used for a different append request',
          { ...request.scope }
        );
      }
      return cloneResult({ ...prior.result, reused: true });
    }

    const current = this.streams.get(streamKey);
    const lastSequence = current?.head.lastSequence ?? 0;
    const runRevision = current?.head.runRevision ?? 0;
    const currentFencingToken = current?.head.fencingToken;
    if (request.expectedLastSequence !== lastSequence) {
      conflict('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict', {
        ...request.scope,
        expectedLastSequence: request.expectedLastSequence,
        actualLastSequence: lastSequence,
      });
    }
    if (request.expectedRunRevision !== undefined && request.expectedRunRevision !== runRevision) {
      conflict('RUNTIME_RUN_CONFLICT', 'Run revision conflict', {
        ...request.scope,
        expectedRunRevision: request.expectedRunRevision,
        actualRunRevision: runRevision,
      });
    }
    if (
      currentFencingToken !== undefined &&
      (request.fencingToken === undefined || request.fencingToken < currentFencingToken)
    ) {
      conflict('RUNTIME_FENCING_REJECTED', 'Missing or stale fencing token rejected', {
        ...request.scope,
        fencingToken: request.fencingToken,
        currentFencingToken,
      });
    }

    const batchIds = new Set<string>();
    for (const event of request.events) {
      if (batchIds.has(event.id) || this.eventsById.has(event.id)) {
        conflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Event id already exists', {
          eventId: event.id,
        });
      }
      batchIds.add(event.id);
      const validation = await this.schemaRegistry.validate(event);
      if (!validation.valid) schemaInvalid(event, validation.issues);
    }

    const recordedAt = this.now();
    if (Number.isNaN(Date.parse(recordedAt))) {
      invalid('Event store clock must return a valid date-time');
    }
    const appended = createPersistedEventBatch(
      request,
      lastSequence + 1,
      this.globalSequence + 1,
      recordedAt
    );
    const nextRevision = runRevision + 1;
    const nextHead: EventStreamHead = {
      scope: { ...request.scope },
      lastSequence: lastSequence + appended.length,
      runRevision: nextRevision,
      fencingToken: request.fencingToken ?? currentFencingToken,
      updatedAt: recordedAt,
    };

    const storedEvents = appended.map(cloneEvent);
    this.streams.set(streamKey, {
      head: cloneHead(nextHead),
      events: [...(current?.events ?? []), ...storedEvents],
    });
    for (const event of storedEvents) {
      this.eventsById.set(event.id, { streamKey, event });
    }
    this.globalSequence += appended.length;

    const result: EventAppendResult = {
      events: appended,
      firstSequence: appended[0].sequence,
      lastSequence: appended[appended.length - 1].sequence,
      runRevision: nextRevision,
      reused: false,
    };
    this.idempotency.set(idempotencyRecordKey, {
      requestHash,
      result: cloneResult(result),
    });
    return cloneResult(result);
  }
}

export function eventStreamKey(scope: EventStreamScope): string {
  validateScope(scope);
  return `${scope.tenantId ?? ''}\u0000${scope.userId}\u0000${scope.runId}`;
}

export function validateEventAppendRequest(request: EventAppendRequest): void {
  validateScope(request.scope);
  if (!request.idempotencyKey.trim()) invalid('idempotencyKey is required');
  if (!Array.isArray(request.events) || request.events.length === 0) {
    invalid('events must contain at least one event');
  }
  if (!Number.isInteger(request.expectedLastSequence) || request.expectedLastSequence < 0) {
    invalid('expectedLastSequence must be a non-negative integer');
  }
  if (
    request.expectedRunRevision !== undefined &&
    (!Number.isInteger(request.expectedRunRevision) || request.expectedRunRevision < 0)
  ) {
    invalid('expectedRunRevision must be a non-negative integer');
  }
  if (
    request.fencingToken !== undefined &&
    (!Number.isInteger(request.fencingToken) || request.fencingToken < 1)
  ) {
    invalid('fencingToken must be a positive integer');
  }
  for (const event of request.events) assertEventMatchesScope(event, request.scope);
}

export function hashEventAppendRequest(request: EventAppendRequest): string {
  validateEventAppendRequest(request);
  return hashCanonicalJson({
    scope: withoutUndefined(request.scope),
    events: request.events.map(withoutUndefined),
    expectedLastSequence: request.expectedLastSequence,
    ...(request.expectedRunRevision === undefined
      ? {}
      : { expectedRunRevision: request.expectedRunRevision }),
    ...(request.fencingToken === undefined ? {} : { fencingToken: request.fencingToken }),
    idempotencyKey: request.idempotencyKey,
    ...(request.transactionGroupId === undefined
      ? {}
      : { transactionGroupId: request.transactionGroupId }),
  });
}

export function createPersistedEventBatch(
  request: EventAppendRequest,
  firstSequence: number,
  firstGlobalSequence: number,
  recordedAt: string
): PersistedFrameworkEvent[] {
  validateEventAppendRequest(request);
  return request.events.map((input, index) => {
    const event = createFrameworkEvent({
      ...input,
      version: input.version ?? '1.0.0',
      tenantId: request.scope.tenantId,
      userId: request.scope.userId,
      runId: request.scope.runId,
      timestamp: input.timestamp ?? recordedAt,
      idempotencyKey: input.idempotencyKey ?? request.idempotencyKey,
    });
    return structuredClone({
      ...event,
      version: input.version ?? '1.0.0',
      userId: request.scope.userId,
      sequence: firstSequence + index,
      globalSequence: firstGlobalSequence + index,
      recordedAt,
      payloadHash: hashCanonicalJson(input.payload),
    }) as PersistedFrameworkEvent;
  });
}

export function streamHeadListLimit(limit = 100): number {
  if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
    invalid('Stream head list limit must be between 1 and 1000');
  }
  return limit;
}

function validateScope(scope: EventStreamScope): void {
  if (!scope.userId?.trim() || !scope.runId?.trim()) {
    invalid('Event stream scope requires userId and runId');
  }
}

function assertEventMatchesScope(input: EventCreateInput, scope: EventStreamScope): void {
  if (!input.id?.trim()) invalid('Event id is required');
  if (input.runId !== scope.runId) invalid('Event runId must match its stream scope');
  if (input.userId !== undefined && input.userId !== scope.userId) {
    invalid('Event userId must match its stream scope');
  }
  if (input.tenantId !== undefined && input.tenantId !== scope.tenantId) {
    invalid('Event tenantId must match its stream scope');
  }
  if (input.timestamp !== undefined && Number.isNaN(Date.parse(input.timestamp))) {
    invalid('Event timestamp must be a valid date-time');
  }
  hashCanonicalJson(input.payload);
  if (input.metadata !== undefined) hashCanonicalJson(input.metadata);
}

function schemaInvalid(event: EventCreateInput, issues: EventValidationIssue[]): never {
  throw new FrameworkError({
    code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
    message: `Event payload failed schema validation for ${event.type}@${event.version ?? '1.0.0'}`,
    context: { eventId: event.id, issues },
  });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(code: string, message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code, message, context });
}

function cloneEvent(event: PersistedFrameworkEvent): PersistedFrameworkEvent {
  return structuredClone(event);
}

function cloneHead(head: EventStreamHead): EventStreamHead {
  return structuredClone(head);
}

function cloneResult(result: EventAppendResult): EventAppendResult {
  return structuredClone(result);
}

function withoutUndefined<T extends object>(value: T): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, unknown] => entry[1] !== undefined)
  );
}
