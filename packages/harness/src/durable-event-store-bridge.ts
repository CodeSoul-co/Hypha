import {
  FrameworkError,
  canonicalizeJson,
  type EventCreateInput,
  type EventFilter,
  type EventRuntime,
  type EventStore,
  type EventStreamScope,
  type FrameworkEvent,
  type PersistedFrameworkEvent,
  type TraceRecorder,
} from '@hypha/core';

export interface DurableEventStoreBridgeOptions {
  events: EventRuntime;
  maxAppendAttempts?: number;
  streamHeadPageSize?: number;
}

/**
 * Adapts the legacy append/list EventStore surface to canonical durable streams.
 * It carries no Run state; every read is rebuilt from the durable Event Runtime.
 */
export class DurableEventStoreBridge implements EventStore, TraceRecorder {
  private readonly maxAppendAttempts: number;
  private readonly streamHeadPageSize: number;

  constructor(private readonly options: DurableEventStoreBridgeOptions) {
    this.maxAppendAttempts = positiveInteger(options.maxAppendAttempts ?? 16, 'maxAppendAttempts');
    this.streamHeadPageSize = boundedPageSize(options.streamHeadPageSize ?? 250);
  }

  async append(event: FrameworkEvent): Promise<void> {
    const input = normalizeEvent(event);
    const scope = scopeFor(input);

    for (let attempt = 1; attempt <= this.maxAppendAttempts; attempt += 1) {
      const existing = (await this.options.events.read({ scope })).find(
        (candidate) => candidate.id === input.id
      );
      if (existing) {
        assertSameEvent(existing, input);
        return;
      }

      const expectedLastSequence = await this.options.events.latestSequence(scope);
      try {
        await this.options.events.append({
          scope,
          events: [input],
          expectedLastSequence,
          idempotencyKey: input.idempotencyKey!,
        });
        return;
      } catch (error) {
        if (!isExpectedSequenceConflict(error) || attempt === this.maxAppendAttempts) throw error;
      }
    }
  }

  record(event: FrameworkEvent): Promise<void> {
    return this.append(event);
  }

  async list(filter: EventFilter = {}): Promise<FrameworkEvent[]> {
    const heads = await this.listAllStreamHeads();
    const streams = heads.filter(
      (head) =>
        (filter.tenantId === undefined || head.scope.tenantId === filter.tenantId) &&
        (filter.userId === undefined || head.scope.userId === filter.userId) &&
        (filter.runId === undefined || head.scope.runId === filter.runId)
    );
    const events = (
      await Promise.all(streams.map((head) => this.options.events.read({ scope: head.scope })))
    )
      .flat()
      .filter((event) => matchesEventFilter(event, filter))
      .sort(comparePersistedEvents);
    return events.map((event) => structuredClone(event));
  }

  private async listAllStreamHeads() {
    const heads = [];
    let cursor: string | undefined;
    do {
      const page = await this.options.events.listStreamHeads({
        ...(cursor === undefined ? {} : { cursor }),
        limit: this.streamHeadPageSize,
      });
      heads.push(...page.heads);
      cursor = page.nextCursor;
    } while (cursor !== undefined);
    return heads;
  }
}

function normalizeEvent(event: FrameworkEvent): EventCreateInput {
  const userId = event.userId ?? metadataString(event.metadata, 'userId');
  if (!userId) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `Durable Event bridge requires userId for ${event.id || 'unknown Event'}`,
      context: { eventId: event.id, runId: event.runId },
    });
  }
  const idempotencyKey = event.idempotencyKey ?? `legacy-event:${event.id}`;
  return structuredClone({
    id: event.id,
    type: event.type,
    version: event.version ?? '1.0.0',
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    userId,
    ...(event.workspaceId === undefined ? {} : { workspaceId: event.workspaceId }),
    ...(event.sessionId === undefined ? {} : { sessionId: event.sessionId }),
    runId: event.runId,
    ...(event.stepId === undefined ? {} : { stepId: event.stepId }),
    ...(event.agentId === undefined ? {} : { agentId: event.agentId }),
    ...(event.fsmState === undefined ? {} : { fsmState: event.fsmState }),
    ...(event.branchId === undefined ? {} : { branchId: event.branchId }),
    ...(event.correlationId === undefined ? {} : { correlationId: event.correlationId }),
    ...(event.causationId === undefined ? {} : { causationId: event.causationId }),
    ...(event.parentEventId === undefined ? {} : { parentEventId: event.parentEventId }),
    idempotencyKey,
    ...(event.operationId === undefined ? {} : { operationId: event.operationId }),
    timestamp: event.timestamp,
    payload: event.payload,
    ...(event.metadata === undefined ? {} : { metadata: event.metadata }),
  });
}

function scopeFor(event: EventCreateInput): EventStreamScope {
  return {
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    userId: event.userId!,
    runId: event.runId,
  };
}

function assertSameEvent(existing: PersistedFrameworkEvent, expected: EventCreateInput): void {
  if (eventFingerprint(existing) === eventFingerprint(expected)) return;
  throw new FrameworkError({
    code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
    message: `Durable Event bridge found conflicting content for Event ${expected.id}`,
    context: { eventId: expected.id, runId: expected.runId },
  });
}

function eventFingerprint(event: FrameworkEvent | EventCreateInput): string {
  return canonicalizeJson({
    id: event.id,
    type: event.type,
    version: event.version ?? '1.0.0',
    tenantId: event.tenantId ?? null,
    userId: event.userId ?? null,
    workspaceId: event.workspaceId ?? null,
    sessionId: event.sessionId ?? null,
    runId: event.runId,
    stepId: event.stepId ?? null,
    agentId: event.agentId ?? null,
    fsmState: event.fsmState ?? null,
    branchId: event.branchId ?? null,
    correlationId: event.correlationId ?? null,
    causationId: event.causationId ?? null,
    parentEventId: event.parentEventId ?? null,
    idempotencyKey: event.idempotencyKey ?? null,
    operationId: event.operationId ?? null,
    timestamp: event.timestamp ?? null,
    payload: event.payload,
    metadata: event.metadata ?? null,
  });
}

function matchesEventFilter(event: FrameworkEvent, filter: EventFilter): boolean {
  return (
    (filter.tenantId === undefined || event.tenantId === filter.tenantId) &&
    (filter.userId === undefined || event.userId === filter.userId) &&
    (filter.workspaceId === undefined || event.workspaceId === filter.workspaceId) &&
    (filter.sessionId === undefined || event.sessionId === filter.sessionId) &&
    (filter.runId === undefined || event.runId === filter.runId) &&
    (filter.type === undefined || event.type === filter.type)
  );
}

function comparePersistedEvents(
  left: PersistedFrameworkEvent,
  right: PersistedFrameworkEvent
): number {
  return left.globalSequence - right.globalSequence || left.id.localeCompare(right.id);
}

function metadataString(metadata: Record<string, unknown> | undefined, key: string) {
  const value = metadata?.[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function isExpectedSequenceConflict(error: unknown): boolean {
  return (
    error instanceof FrameworkError &&
    error.code === 'RUNTIME_EVENT_APPEND_FAILED' &&
    typeof error.context?.actualLastSequence === 'number'
  );
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `${label} must be a positive integer`,
    });
  }
  return value;
}

function boundedPageSize(value: number): number {
  const size = positiveInteger(value, 'streamHeadPageSize');
  if (size > 1000) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: 'streamHeadPageSize must not exceed 1000',
    });
  }
  return size;
}
