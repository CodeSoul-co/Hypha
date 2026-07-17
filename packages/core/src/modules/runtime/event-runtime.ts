import { FrameworkError } from '../../errors';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';
import type { EventSchemaRegistry } from './event-schema-registry';
import type {
  EventAppendRequestV2,
  EventAppendResult,
  EventStoreV2,
  EventStreamHead,
  EventStreamScope,
  ListEventStreamHeadsRequest,
  ListEventStreamHeadsResult,
} from './event-store';

export interface EventReadRequest {
  scope: EventStreamScope;
  fromSequence?: number;
  toSequence?: number;
  types?: string[];
}

export interface EventExportRequest extends EventReadRequest {}

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

export interface EventRuntimeV2 {
  append(request: EventAppendRequestV2): Promise<EventAppendResult>;
  read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]>;
  stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent>;
  latestSequence(scope: EventStreamScope): Promise<number>;
  getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null>;
  listStreamHeads(request?: ListEventStreamHeadsRequest): Promise<ListEventStreamHeadsResult>;
  export(request: EventExportRequest): Promise<EventExportResult>;
  import(request: EventImportRequest): Promise<EventImportResult>;
}

export interface DurableEventRuntimeOptions {
  store: EventStoreV2;
  schemas?: EventSchemaRegistry;
  now?: () => string;
}

export class DurableEventRuntime implements EventRuntimeV2 {
  private readonly store: EventStoreV2;
  private readonly schemas?: EventSchemaRegistry;
  private readonly now: () => string;

  constructor(options: DurableEventRuntimeOptions) {
    this.store = options.store;
    this.schemas = options.schemas;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async append(request: EventAppendRequestV2): Promise<EventAppendResult> {
    await this.validateSchemas(request.events);
    return this.store.append(request);
  }

  async read(request: EventReadRequest): Promise<PersistedFrameworkEvent[]> {
    validateReadRequest(request);
    const events = await this.store.readStream(request.scope, request.fromSequence ?? 1);
    const types = request.types ? new Set(request.types) : null;
    return events.filter((event) => {
      if (request.toSequence !== undefined && event.sequence > request.toSequence) return false;
      if (types && !types.has(event.type)) return false;
      return true;
    });
  }

  async *stream(request: EventReadRequest): AsyncIterable<PersistedFrameworkEvent> {
    for (const event of await this.read(request)) yield event;
  }

  async latestSequence(scope: EventStreamScope): Promise<number> {
    return (await this.store.getStreamHead(scope))?.lastSequence ?? 0;
  }

  async getStreamHead(scope: EventStreamScope): Promise<EventStreamHead | null> {
    return this.store.getStreamHead(scope);
  }

  async listStreamHeads(
    request: ListEventStreamHeadsRequest = {}
  ): Promise<ListEventStreamHeadsResult> {
    return this.store.listStreamHeads(request);
  }

  async export(request: EventExportRequest): Promise<EventExportResult> {
    const events = await this.read(request);
    const unsigned = JSON.parse(
      JSON.stringify({
        formatVersion: '1.0.0' as const,
        scope: structuredClone(request.scope),
        head: await this.store.getStreamHead(request.scope),
        events,
        eventCount: events.length,
        exportedAt: this.now(),
      })
    ) as Omit<EventExportResult, 'checksum'>;
    return { ...unsigned, checksum: eventExportChecksum(unsigned) };
  }

  async import(request: EventImportRequest): Promise<EventImportResult> {
    validateImportRequest(request);
    const actualChecksum = eventExportChecksum(request.exported);
    if (actualChecksum !== request.exported.checksum) {
      corrupt('Event export checksum mismatch', {
        expectedChecksum: request.exported.checksum,
        actualChecksum,
      });
    }
    const events = request.exported.events;
    for (let index = 0; index < events.length; index += 1) {
      const event = events[index];
      const expectedSequence = request.expectedLastSequence + index + 1;
      if (event.sequence !== expectedSequence) {
        corrupt('Imported event sequence is not contiguous with the target stream', {
          eventId: event.id,
          expectedSequence,
          actualSequence: event.sequence,
        });
      }
      if (
        event.runId !== request.scope.runId ||
        event.userId !== request.scope.userId ||
        event.tenantId !== request.scope.tenantId
      ) {
        corrupt('Imported event scope does not match the target stream', { eventId: event.id });
      }
      const actualPayloadHash = hashCanonicalJson(event.payload);
      if (actualPayloadHash !== event.payloadHash) {
        corrupt('Imported event payload hash mismatch', {
          eventId: event.id,
          expectedPayloadHash: event.payloadHash,
          actualPayloadHash,
        });
      }
    }
    const append = await this.append({
      scope: request.scope,
      events: events.map(toEventCreateInput),
      expectedLastSequence: request.expectedLastSequence,
      ...(request.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: request.expectedRunRevision }),
      ...(request.fencingToken === undefined ? {} : { fencingToken: request.fencingToken }),
      idempotencyKey: request.idempotencyKey,
      transactionGroupId: `import:${request.exported.checksum}`,
    });
    return {
      ...append,
      importedEventCount: append.events.length,
      sourceChecksum: request.exported.checksum,
    };
  }

  private async validateSchemas(events: EventCreateInput[]): Promise<void> {
    if (!this.schemas) return;
    for (const event of events) {
      const result = await this.schemas.validate(event);
      if (!result.valid) {
        throw new FrameworkError({
          code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
          message: `Event ${event.type}@${event.version ?? '1.0.0'} failed schema validation`,
          context: { eventId: event.id, issues: result.issues },
        });
      }
    }
  }
}

export function eventExportChecksum(
  exported: Omit<EventExportResult, 'checksum'> | EventExportResult
): string {
  return hashCanonicalJson({
    formatVersion: exported.formatVersion,
    scope: exported.scope,
    head: exported.head,
    events: exported.events,
    eventCount: exported.eventCount,
    exportedAt: exported.exportedAt,
  });
}

function toEventCreateInput(event: PersistedFrameworkEvent): EventCreateInput {
  return {
    id: event.id,
    type: event.type,
    version: event.version,
    userId: event.userId,
    runId: event.runId,
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    ...(event.workspaceId === undefined ? {} : { workspaceId: event.workspaceId }),
    ...(event.sessionId === undefined ? {} : { sessionId: event.sessionId }),
    ...(event.stepId === undefined ? {} : { stepId: event.stepId }),
    ...(event.agentId === undefined ? {} : { agentId: event.agentId }),
    ...(event.fsmState === undefined ? {} : { fsmState: event.fsmState }),
    ...(event.branchId === undefined ? {} : { branchId: event.branchId }),
    ...(event.correlationId === undefined ? {} : { correlationId: event.correlationId }),
    ...(event.causationId === undefined ? {} : { causationId: event.causationId }),
    ...(event.parentEventId === undefined ? {} : { parentEventId: event.parentEventId }),
    ...(event.idempotencyKey === undefined ? {} : { idempotencyKey: event.idempotencyKey }),
    ...(event.operationId === undefined ? {} : { operationId: event.operationId }),
    timestamp: event.timestamp,
    payload: structuredClone(event.payload),
    ...(event.metadata === undefined ? {} : { metadata: structuredClone(event.metadata) }),
  };
}

function validateReadRequest(request: EventReadRequest): void {
  if (
    request.fromSequence !== undefined &&
    (!Number.isInteger(request.fromSequence) || request.fromSequence < 1)
  ) {
    invalid('fromSequence must be a positive integer');
  }
  if (
    request.toSequence !== undefined &&
    (!Number.isInteger(request.toSequence) || request.toSequence < 1)
  ) {
    invalid('toSequence must be a positive integer');
  }
  if (
    request.fromSequence !== undefined &&
    request.toSequence !== undefined &&
    request.toSequence < request.fromSequence
  ) {
    invalid('toSequence must not be lower than fromSequence');
  }
  if (request.types?.some((type) => !type)) invalid('types cannot contain empty values');
}

function validateImportRequest(request: EventImportRequest): void {
  if (request.exported.formatVersion !== '1.0.0') {
    invalid(`Unsupported Event export format: ${request.exported.formatVersion}`);
  }
  if (request.exported.eventCount !== request.exported.events.length) {
    corrupt('Event export count does not match its events', {
      eventCount: request.exported.eventCount,
      actualCount: request.exported.events.length,
    });
  }
  if (request.exported.events.length === 0) invalid('Cannot import an empty Event export');
  canonicalizeJson(request.exported);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function corrupt(message: string, context: Record<string, unknown>): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message, context });
}
