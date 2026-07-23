import type { EventCreateInput, FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import { FrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import {
  eventStreamKey,
  type DurableEventStore,
  type EventAppendRequest,
  type EventAppendResult,
  type EventStreamHead,
  type EventStreamScope,
  type ListEventStreamHeadsRequest,
  type ListEventStreamHeadsResult,
} from './event-store';

export interface EventReadRequest {
  scope: EventStreamScope;
  fromSequence?: number;
  toSequence?: number;
  types?: FrameworkEventType[];
}

export type EventExportRequest = EventReadRequest;

export interface EventExportResult {
  formatVersion: '1.0.0';
  scope: EventStreamScope;
  head: EventStreamHead | null;
  events: PersistedFrameworkEvent[];
  eventCount: number;
  exportedAt: string;
  checksum: string;
}

export interface EventImportRequest {
  scope: EventStreamScope;
  exported: EventExportResult;
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken?: number;
  idempotencyKey: string;
}

export interface EventImportResult extends EventAppendResult {
  importedEventCount: number;
  sourceChecksum: string;
}

export interface EventRuntime {
  append(request: EventAppendRequest): Promise<EventAppendResult>;
  read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
  stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
  latestSequence(scope: EventStreamScope): Promise<number>;
  getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
  listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
  export(request: EventExportRequest): Promise<EventExportResult>;
  import(request: EventImportRequest): Promise<EventImportResult>;
}

export interface DurableEventRuntimeOptions {
  store: DurableEventStore;
  now?: () => string;
}

export class DurableEventRuntime implements EventRuntime {
  private readonly now: () => string;

  constructor(private readonly options: DurableEventRuntimeOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  append(request: EventAppendRequest): Promise<EventAppendResult> {
    return this.options.store.append(request);
  }

  async read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]> {
    validateReadRequest(request);
    const events = await this.options.store.readStream(request.scope, request.fromSequence ?? 1);
    const types = request.types === undefined ? undefined : new Set(request.types);
    return events.filter(
      (event) =>
        (request.toSequence === undefined || event.sequence <= request.toSequence) &&
        (types === undefined || types.has(event.type))
    );
  }

  async *stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent> {
    for (const event of await this.read(request)) yield structuredClone(event);
  }

  async latestSequence(scope: EventStreamScope): Promise<number> {
    return (await this.options.store.getStreamHead(scope))?.lastSequence ?? 0;
  }

  getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null> {
    return this.options.store.getStreamHead(scope);
  }

  listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult> {
    return this.options.store.listStreamHeads(request);
  }

  async export(request: EventExportRequest): Promise<EventExportResult> {
    const exportedAt = this.now();
    validTimestamp(exportedAt, 'Event export clock');
    const withoutChecksum = {
      formatVersion: '1.0.0' as const,
      scope: structuredClone(request.scope),
      head: await this.getStreamHead(request.scope),
      events: await this.read(request),
      eventCount: 0,
      exportedAt,
    };
    withoutChecksum.eventCount = withoutChecksum.events.length;
    return {
      ...withoutChecksum,
      checksum: eventExportChecksum(withoutChecksum),
    };
  }

  async import(request: EventImportRequest): Promise<EventImportResult> {
    validateImportRequest(request);
    const actualChecksum = eventExportChecksum(request.exported);
    if (actualChecksum !== request.exported.checksum) {
      invalid('Event import checksum does not match its exported payload');
    }
    if (eventStreamKey(request.scope) !== eventStreamKey(request.exported.scope)) {
      invalid('Event import scope does not match its exported stream');
    }
    if (request.exported.eventCount !== request.exported.events.length) {
      invalid('Event import count does not match its exported events');
    }
    if (request.exported.events.length === 0) {
      invalid('Event import must contain at least one event');
    }
    assertContiguousExport(request.exported.events);
    const append = await this.options.store.append({
      scope: structuredClone(request.scope),
      events: request.exported.events.map(toCreateInput),
      expectedLastSequence: request.expectedLastSequence,
      ...(request.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: request.expectedRunRevision }),
      ...(request.fencingToken === undefined ? {} : { fencingToken: request.fencingToken }),
      idempotencyKey: request.idempotencyKey,
      transactionGroupId: `event-import:${request.exported.checksum}`,
    });
    return {
      ...append,
      importedEventCount: request.exported.events.length,
      sourceChecksum: request.exported.checksum,
    };
  }
}

export function eventExportChecksum(
  exported: Omit<EventExportResult, 'checksum'> | EventExportResult
): string {
  const { checksum: ignored, ...content } = exported as EventExportResult;
  void ignored;
  return hashCanonicalJson(content);
}

function validateReadRequest(request: EventReadRequest): void {
  eventStreamKey(request.scope);
  const fromSequence = request.fromSequence ?? 1;
  if (!Number.isInteger(fromSequence) || fromSequence < 1) {
    invalid('fromSequence must be a positive integer');
  }
  if (
    request.toSequence !== undefined &&
    (!Number.isInteger(request.toSequence) || request.toSequence < fromSequence)
  ) {
    invalid('toSequence must be an integer greater than or equal to fromSequence');
  }
  if (request.types?.some((type) => !type.trim())) {
    invalid('Event read types must be non-empty');
  }
}

function validateImportRequest(request: EventImportRequest): void {
  eventStreamKey(request.scope);
  if (request.exported.formatVersion !== '1.0.0') {
    invalid('Unsupported Event export format version');
  }
  if (!request.idempotencyKey.trim()) invalid('Event import idempotency key is required');
  if (!Number.isInteger(request.expectedLastSequence) || request.expectedLastSequence < 0) {
    invalid('Event import expectedLastSequence must be non-negative');
  }
  validTimestamp(request.exported.exportedAt, 'Event export timestamp');
}

function assertContiguousExport(events: PersistedFrameworkEvent[]): void {
  for (let index = 1; index < events.length; index += 1) {
    if (events[index].sequence !== events[index - 1].sequence + 1) {
      invalid('Event import source sequence must be contiguous');
    }
  }
}

function toCreateInput(event: PersistedFrameworkEvent): EventCreateInput {
  const { sequence, globalSequence, recordedAt, payloadHash, ...input } = event;
  void sequence;
  void globalSequence;
  void recordedAt;
  void payloadHash;
  return structuredClone(input);
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
