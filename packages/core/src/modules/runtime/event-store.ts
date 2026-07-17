import type { ProviderHealth } from '../../contracts/execution';
import { FrameworkError } from '../../errors';
import {
  createFrameworkEvent,
  type EventCreateInput,
  type PersistedFrameworkEvent,
} from '../../events';
import { hashCanonicalJson } from './canonical-json';

export interface EventStreamScope {
  tenantId?: string;
  userId: string;
  runId: string;
}

export interface EventAppendRequestV2 {
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

export interface EventStoreV2 {
  append(request: EventAppendRequestV2): Promise<EventAppendResult>;
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

export interface InMemoryEventStoreV2Options {
  now?: () => string;
}

export class InMemoryEventStoreV2 implements EventStoreV2 {
  private readonly streams = new Map<string, StreamState>();
  private readonly eventsById = new Map<
    string,
    { streamKey: string; event: PersistedFrameworkEvent }
  >();
  private readonly idempotency = new Map<string, IdempotencyRecord>();
  private readonly now: () => string;
  private globalSequence = 0;

  constructor(options: InMemoryEventStoreV2Options = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async append(request: EventAppendRequestV2): Promise<EventAppendResult> {
    validateEventAppendRequest(request);
    const streamKey = eventStreamKey(request.scope);
    const idempotencyRecordKey = `${streamKey}\u0000${request.idempotencyKey}`;
    const requestHash = hashEventAppendRequest(request);
    const prior = this.idempotency.get(idempotencyRecordKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        throw runtimeConflict(
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
      throw runtimeConflict('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict', {
        ...request.scope,
        expectedLastSequence: request.expectedLastSequence,
        actualLastSequence: lastSequence,
      });
    }
    if (request.expectedRunRevision !== undefined && request.expectedRunRevision !== runRevision) {
      throw runtimeConflict('RUNTIME_RUN_CONFLICT', 'Run revision conflict', {
        ...request.scope,
        expectedRunRevision: request.expectedRunRevision,
        actualRunRevision: runRevision,
      });
    }
    if (
      request.fencingToken !== undefined &&
      currentFencingToken !== undefined &&
      request.fencingToken < currentFencingToken
    ) {
      throw runtimeConflict('RUNTIME_FENCING_REJECTED', 'Stale fencing token rejected', {
        ...request.scope,
        fencingToken: request.fencingToken,
        currentFencingToken,
      });
    }

    const batchIds = new Set<string>();
    for (const input of request.events) {
      assertEventMatchesScope(input, request.scope);
      if (batchIds.has(input.id) || this.eventsById.has(input.id)) {
        throw runtimeConflict('RUNTIME_IDEMPOTENCY_CONFLICT', 'Event id already exists', {
          eventId: input.id,
        });
      }
      batchIds.add(input.id);
    }

    const recordedAt = this.now();
    const appended = createPersistedEventBatch(
      request,
      lastSequence + 1,
      this.globalSequence + 1,
      recordedAt
    );
    this.globalSequence += appended.length;
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

  async readStream(scope: EventStreamScope, fromSequence = 1): Promise<PersistedFrameworkEvent[]> {
    validateScope(scope);
    if (!Number.isInteger(fromSequence) || fromSequence < 1) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: 'fromSequence must be a positive integer',
      });
    }
    const stream = this.streams.get(eventStreamKey(scope));
    return (stream?.events ?? []).filter((event) => event.sequence >= fromSequence).map(cloneEvent);
  }

  async readById(
    scope: EventStreamScope,
    eventId: string
  ): Promise<PersistedFrameworkEvent | null> {
    validateScope(scope);
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
}

export function eventStreamKey(scope: EventStreamScope): string {
  validateScope(scope);
  return `${scope.tenantId ?? ''}\u0000${scope.userId}\u0000${scope.runId}`;
}

export function validateEventAppendRequest(request: EventAppendRequestV2): void {
  validateScope(request.scope);
  if (!request.idempotencyKey) invalid('idempotencyKey is required');
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
}

export function hashEventAppendRequest(request: EventAppendRequestV2): string {
  validateEventAppendRequest(request);
  return hashCanonicalJson(request);
}

export function createPersistedEventBatch(
  request: EventAppendRequestV2,
  firstSequence: number,
  firstGlobalSequence: number,
  recordedAt: string
): PersistedFrameworkEvent[] {
  validateEventAppendRequest(request);
  return request.events.map((input, index) => {
    assertEventMatchesScope(input, request.scope);
    const event = createFrameworkEvent({
      ...input,
      version: input.version ?? '1.0.0',
      tenantId: request.scope.tenantId,
      userId: request.scope.userId,
      runId: request.scope.runId,
      sequence: firstSequence + index,
      globalSequence: firstGlobalSequence + index,
      recordedAt,
      payloadHash: hashCanonicalJson(input.payload),
      idempotencyKey: input.idempotencyKey ?? request.idempotencyKey,
    }) as PersistedFrameworkEvent;
    return JSON.parse(JSON.stringify(event)) as PersistedFrameworkEvent;
  });
}

function validateScope(scope: EventStreamScope): void {
  if (!scope.userId || !scope.runId) invalid('Event stream scope requires userId and runId');
}

export function streamHeadListLimit(limit = 100): number {
  if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
    invalid('Stream head list limit must be between 1 and 1000');
  }
  return limit;
}

function assertEventMatchesScope(input: EventCreateInput, scope: EventStreamScope): void {
  if (input.runId !== scope.runId) invalid('Event runId must match its stream scope');
  if (input.userId !== undefined && input.userId !== scope.userId) {
    invalid('Event userId must match its stream scope');
  }
  if (input.tenantId !== undefined && input.tenantId !== scope.tenantId) {
    invalid('Event tenantId must match its stream scope');
  }
  hashCanonicalJson(input.payload);
  if (input.metadata !== undefined) hashCanonicalJson(input.metadata);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function runtimeConflict(
  code: string,
  message: string,
  context: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, context });
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
