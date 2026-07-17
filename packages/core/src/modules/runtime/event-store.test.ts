import { describe, expect, it } from 'vitest';
import type { EventCreateInput } from '../../events';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';
import {
  InMemoryEventStoreV2,
  type EventAppendRequestV2,
  type EventStreamScope,
} from './event-store';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

function event(id: string, payload: unknown = { value: id }): EventCreateInput {
  return {
    id,
    type: 'run.created',
    runId: scope.runId,
    timestamp: '2026-07-17T01:00:00.000Z',
    payload,
  };
}

function appendRequest(overrides: Partial<EventAppendRequestV2> = {}): EventAppendRequestV2 {
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
  it('uses deterministic Unicode code-point key ordering', () => {
    const privateUse = '\uE000';
    const emoji = '\u{1F600}';
    expect(canonicalizeJson({ [emoji]: 1, [privateUse]: 2 })).toBe(
      `{"${privateUse}":2,"${emoji}":1}`
    );
    expect(hashCanonicalJson({ b: 2, a: 1 })).toBe(hashCanonicalJson({ a: 1, b: 2 }));
  });

  it('rejects non-JSON and non-finite values before hashing', () => {
    expect(() => canonicalizeJson({ value: Number.NaN })).toThrow(/finite/u);
    expect(() => canonicalizeJson({ value: undefined })).toThrow(/unsupported/u);
    expect(() => canonicalizeJson({ value: new Date() })).toThrow(/plain JSON/u);
    expect(() => canonicalizeJson({ value: BigInt(1) })).toThrow(/unsupported/u);
  });
});

describe('InMemoryEventStoreV2', () => {
  it('allocates contiguous per-run sequence and transaction revision', async () => {
    const store = new InMemoryEventStoreV2({ now: () => '2026-07-17T01:00:01.000Z' });
    const result = await store.append(
      appendRequest({
        events: [event('event.1'), event('event.2')],
      })
    );

    expect(result).toMatchObject({
      firstSequence: 1,
      lastSequence: 2,
      runRevision: 1,
      reused: false,
    });
    expect(result.events.map((item) => item.sequence)).toEqual([1, 2]);
    expect(result.events.map((item) => item.globalSequence)).toEqual([1, 2]);
    await expect(store.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 2,
      runRevision: 1,
      fencingToken: 1,
    });
  });

  it('reuses identical idempotent appends without duplicating events', async () => {
    const store = new InMemoryEventStoreV2();
    const request = appendRequest();
    const first = await store.append(request);
    first.events[0].payload = { mutated: true };
    const reused = await store.append(request);

    expect(reused.reused).toBe(true);
    expect(reused.events[0].payload).toEqual({ value: 'event.1' });
    await expect(store.readStream(scope)).resolves.toHaveLength(1);
  });

  it('rejects an idempotency key reused with different content', async () => {
    const store = new InMemoryEventStoreV2();
    await store.append(appendRequest());

    await expect(
      store.append(
        appendRequest({
          events: [event('event.changed', { changed: true })],
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('rejects stale expected sequence, revision, and fencing tokens', async () => {
    const store = new InMemoryEventStoreV2();
    await store.append(appendRequest({ fencingToken: 2 }));

    await expect(
      store.append(
        appendRequest({
          events: [event('event.2')],
          idempotencyKey: 'append.sequence-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_APPEND_FAILED' });
    await expect(
      store.append(
        appendRequest({
          events: [event('event.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 0,
          idempotencyKey: 'append.revision-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_RUN_CONFLICT' });
    await expect(
      store.append(
        appendRequest({
          events: [event('event.2')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          fencingToken: 1,
          idempotencyKey: 'append.fencing-conflict',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('isolates identical run ids by tenant and user scope', async () => {
    const store = new InMemoryEventStoreV2();
    const otherScope = { ...scope, userId: 'user.other' };
    await store.append(appendRequest());
    await store.append(
      appendRequest({
        scope: otherScope,
        events: [{ ...event('event.other'), userId: otherScope.userId }],
        idempotencyKey: 'append.other',
      })
    );

    await expect(store.readStream(scope)).resolves.toMatchObject([{ id: 'event.1' }]);
    await expect(store.readStream(otherScope)).resolves.toMatchObject([{ id: 'event.other' }]);
    await expect(store.readById(scope, 'event.other')).resolves.toBeNull();
  });

  it('lists stream heads with a stable bounded cursor', async () => {
    const store = new InMemoryEventStoreV2();
    const second = { ...scope, runId: 'run.second' };
    const third = { ...scope, runId: 'run.third' };
    await store.append(appendRequest());
    await store.append(
      appendRequest({
        scope: second,
        events: [{ ...event('event.second'), runId: second.runId }],
        idempotencyKey: 'append.second',
      })
    );
    await store.append(
      appendRequest({
        scope: third,
        events: [{ ...event('event.third'), runId: third.runId }],
        idempotencyKey: 'append.third',
      })
    );

    const first = await store.listStreamHeads({ limit: 2 });
    const secondPage = await store.listStreamHeads({ cursor: first.nextCursor, limit: 2 });

    expect(first.heads).toHaveLength(2);
    expect(first.nextCursor).toBeDefined();
    expect(secondPage.heads).toHaveLength(1);
    expect(secondPage.nextCursor).toBeUndefined();
    expect([...first.heads, ...secondPage.heads].map((head) => head.scope.runId).sort()).toEqual(
      [scope.runId, second.runId, third.runId].sort()
    );
    await expect(store.listStreamHeads({ limit: 1001 })).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
    });
  });

  it('keeps a failed batch atomic and never overwrites an event id', async () => {
    const store = new InMemoryEventStoreV2();
    await store.append(appendRequest());

    await expect(
      store.append(
        appendRequest({
          events: [event('event.2'), event('event.1')],
          expectedLastSequence: 1,
          expectedRunRevision: 1,
          idempotencyKey: 'append.duplicate-event-id',
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
    await expect(store.readStream(scope)).resolves.toMatchObject([{ id: 'event.1' }]);
  });

  it('rejects invalid payloads before mutating stream state', async () => {
    const store = new InMemoryEventStoreV2();
    await expect(
      store.append(
        appendRequest({
          events: [event('event.invalid', { value: Number.POSITIVE_INFINITY })],
        })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    await expect(store.getStreamHead(scope)).resolves.toBeNull();
  });
});
