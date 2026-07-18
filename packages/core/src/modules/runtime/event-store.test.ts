import { describe, expect, it } from 'vitest';
import type { EventCreateInput } from '../../events';
import type { JsonSchema } from '../../specs';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import {
  InMemoryDurableEventStore,
  type EventAppendRequest,
  type EventStreamScope,
} from './event-store';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

const payloadSchema: JsonSchema = {
  type: 'object',
  required: ['value'],
  properties: { value: { type: 'string', minLength: 1 } },
  additionalProperties: false,
};

async function store(): Promise<InMemoryDurableEventStore> {
  const schemaRegistry = new InMemoryEventSchemaRegistry();
  await schemaRegistry.register({
    eventType: 'run.created',
    version: '1.0.0',
    schema: payloadSchema,
    schemaHash: hashCanonicalJson(payloadSchema),
  });
  return new InMemoryDurableEventStore({
    schemaRegistry,
    now: () => '2026-07-18T01:00:01.000Z',
  });
}

function event(id: string, value = id): EventCreateInput {
  return {
    id,
    type: 'run.created',
    version: '1.0.0',
    runId: scope.runId,
    timestamp: '2026-07-18T01:00:00.000Z',
    payload: { value },
  };
}

function appendRequest(overrides: Partial<EventAppendRequest> = {}): EventAppendRequest {
  return {
    scope,
    events: [event('event.1')],
    expectedLastSequence: 0,
    expectedRunRevision: 0,
    fencingToken: 1,
    idempotencyKey: 'append.1',
    ...overrides,
  };
}

describe('Canonical Runtime JSON', () => {
  it('hashes equivalent JSON deterministically', () => {
    const privateUse = '\uE000';
    const emoji = '\u{1F600}';
    expect(canonicalizeJson({ [emoji]: 1, [privateUse]: 2 })).toBe(
      `{"${privateUse}":2,"${emoji}":1}`
    );
    expect(hashCanonicalJson({ b: 2, a: 1 })).toBe(hashCanonicalJson({ a: 1, b: 2 }));
  });

  it('rejects values that cannot be persisted as JSON', () => {
    const sparse: unknown[] = [];
    sparse.length = 1;
    expect(() => canonicalizeJson({ value: Number.NaN })).toThrow(/finite/u);
    expect(() => canonicalizeJson({ value: undefined })).toThrow(/unsupported/u);
    expect(() => canonicalizeJson({ value: new Date() })).toThrow(/plain JSON/u);
    expect(() => canonicalizeJson(sparse)).toThrow(/sparse/u);
  });
});

describe('InMemoryDurableEventStore', () => {
  it('allocates contiguous stream/global sequences and one revision per batch', async () => {
    const eventStore = await store();
    const result = await eventStore.append(
      appendRequest({ events: [event('event.1'), event('event.2')] })
    );

    expect(result).toMatchObject({
      firstSequence: 1,
      lastSequence: 2,
      runRevision: 1,
      reused: false,
    });
    expect(result.events.map((item) => item.sequence)).toEqual([1, 2]);
    expect(result.events.map((item) => item.globalSequence)).toEqual([1, 2]);
    await expect(eventStore.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 2,
      runRevision: 1,
      fencingToken: 1,
    });
  });

  it('reuses identical requests and protects stored events from caller mutation', async () => {
    const eventStore = await store();
    const request = appendRequest();
    const first = await eventStore.append(request);
    first.events[0].payload = { value: 'mutated' };
    request.events[0].payload = { value: 'event.1' };
    const reused = await eventStore.append(request);

    expect(reused.reused).toBe(true);
    expect(reused.events[0].payload).toEqual({ value: 'event.1' });
    await expect(eventStore.readStream(scope)).resolves.toHaveLength(1);
  });

  it('rejects idempotency keys reused with different content', async () => {
    const eventStore = await store();
    await eventStore.append(appendRequest());

    await expect(
      eventStore.append(appendRequest({ events: [event('event.changed', 'changed')] }))
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('allows only one concurrent writer for the same expected sequence', async () => {
    const eventStore = await store();
    const results = await Promise.allSettled([
      eventStore.append(appendRequest({ idempotencyKey: 'append.concurrent.1' })),
      eventStore.append(
        appendRequest({ events: [event('event.2')], idempotencyKey: 'append.concurrent.2' })
      ),
    ]);

    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
    await expect(eventStore.readStream(scope)).resolves.toHaveLength(1);
  });

  it('rejects stale sequence, revision, and missing or stale fencing tokens', async () => {
    const eventStore = await store();
    await eventStore.append(appendRequest({ fencingToken: 2 }));

    await expect(
      eventStore.append(
        appendRequest({ events: [event('event.2')], idempotencyKey: 'append.sequence-conflict' })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_APPEND_FAILED' });
    await expect(
      eventStore.append(
        appendRequest({
          events: [event('event.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 0,
          fencingToken: 2,
          idempotencyKey: 'append.revision-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(
      eventStore.append(
        appendRequest({
          events: [event('event.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          fencingToken: undefined,
          idempotencyKey: 'append.missing-fence',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
    await expect(
      eventStore.append(
        appendRequest({
          events: [event('event.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          fencingToken: 1,
          idempotencyKey: 'append.stale-fence',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('validates the full batch before persisting any event', async () => {
    const eventStore = await store();
    await expect(
      eventStore.append(
        appendRequest({
          events: [event('event.valid'), event('event.invalid', '')],
          idempotencyKey: 'append.invalid-batch',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await expect(eventStore.getStreamHead(scope)).resolves.toBeNull();
    await expect(eventStore.readStream(scope)).resolves.toEqual([]);
  });

  it('keeps failed duplicate-id batches atomic', async () => {
    const eventStore = await store();
    await eventStore.append(appendRequest());

    await expect(
      eventStore.append(
        appendRequest({
          events: [event('event.2'), event('event.1')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          idempotencyKey: 'append.duplicate-event-id',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(eventStore.readStream(scope)).resolves.toMatchObject([{ id: 'event.1' }]);
  });

  it('isolates streams by tenant and user and paginates their heads', async () => {
    const eventStore = await store();
    const otherScope = { ...scope, userId: 'user.other' };
    await eventStore.append(appendRequest());
    await eventStore.append(
      appendRequest({
        scope: otherScope,
        events: [{ ...event('event.other'), userId: otherScope.userId }],
        idempotencyKey: 'append.other',
      })
    );

    await expect(eventStore.readStream(scope)).resolves.toMatchObject([{ id: 'event.1' }]);
    await expect(eventStore.readStream(otherScope)).resolves.toMatchObject([{ id: 'event.other' }]);
    await expect(eventStore.readById(scope, 'event.other')).resolves.toBeNull();
    const first = await eventStore.listStreamHeads({ limit: 1 });
    const second = await eventStore.listStreamHeads({ cursor: first.nextCursor, limit: 1 });
    expect(first.heads).toHaveLength(1);
    expect(first.nextCursor).toBeDefined();
    expect(second.heads).toHaveLength(1);
    expect(second.nextCursor).toBeUndefined();
  });
});
