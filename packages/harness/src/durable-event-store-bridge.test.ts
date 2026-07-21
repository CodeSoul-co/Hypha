import { describe, expect, it } from 'vitest';
import {
  DurableEventRuntime,
  FrameworkError,
  InMemoryDurableEventStore,
  InMemoryEventSchemaRegistry,
  hashCanonicalJson,
  type FrameworkEvent,
  type JsonSchema,
} from '@hypha/core';
import { DurableEventStoreBridge } from './durable-event-store-bridge';

const payloadSchema: JsonSchema = {
  type: 'object',
  required: ['runId'],
  properties: { runId: { type: 'string', minLength: 1 }, value: { type: 'string' } },
  additionalProperties: false,
};

describe('DurableEventStoreBridge', () => {
  it('normalizes legacy user metadata and reads the durable Event back', async () => {
    const target = await fixture();
    const event = frameworkEvent('event.1', 'run.1', 'user.1');
    delete event.userId;

    await target.bridge.append(event);

    await expect(target.bridge.list({ runId: 'run.1' })).resolves.toMatchObject([
      {
        id: 'event.1',
        userId: 'user.1',
        sequence: 1,
        globalSequence: 1,
        payload: { runId: 'run.1', value: 'event.1' },
      },
    ]);
  });

  it('normalizes optional undefined fields with standard JSON semantics', async () => {
    const target = await fixture();
    const event = frameworkEvent('event.optional', 'run.optional', 'user.optional');
    event.payload = { runId: 'run.optional', value: undefined };
    event.metadata = { userId: 'user.optional', optional: undefined };

    await target.bridge.append(event);

    await expect(target.bridge.list({ runId: 'run.optional' })).resolves.toMatchObject([
      {
        payload: { runId: 'run.optional' },
        metadata: { userId: 'user.optional' },
      },
    ]);
  });

  it('coalesces duplicate appends and rejects conflicting Event reuse', async () => {
    const target = await fixture();
    const event = frameworkEvent('event.same', 'run.same', 'user.same');

    await Promise.all([target.bridge.append(event), target.bridge.record(event)]);
    await expect(target.bridge.list({ runId: 'run.same' })).resolves.toHaveLength(1);

    await expect(
      target.bridge.append({
        ...event,
        payload: { runId: 'run.same', value: 'changed' },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('retries concurrent CAS conflicts without losing distinct Events', async () => {
    const target = await fixture();

    await Promise.all([
      target.bridge.append(frameworkEvent('event.a', 'run.concurrent', 'user.concurrent')),
      target.bridge.append(frameworkEvent('event.b', 'run.concurrent', 'user.concurrent')),
      target.bridge.append(frameworkEvent('event.c', 'run.concurrent', 'user.concurrent')),
    ]);

    const events = await target.bridge.list({ runId: 'run.concurrent' });
    expect(events.map((event) => event.id).sort()).toEqual(['event.a', 'event.b', 'event.c']);
    expect(events.map((event) => event.sequence)).toEqual([1, 2, 3]);
  });

  it('paginates stream heads and applies legacy filters after durable reads', async () => {
    const target = await fixture({ streamHeadPageSize: 1 });
    await target.bridge.append(frameworkEvent('event.1', 'run.1', 'user.1', 'session.shared'));
    await target.bridge.append(frameworkEvent('event.2', 'run.2', 'user.2', 'session.shared'));
    await target.bridge.append(frameworkEvent('event.3', 'run.3', 'user.3', 'session.other'));

    const events = await target.bridge.list({ sessionId: 'session.shared' });

    expect(events.map((event) => event.id)).toEqual(['event.1', 'event.2']);
    await expect(target.bridge.list({ userId: 'user.2' })).resolves.toMatchObject([
      { id: 'event.2' },
    ]);
  });

  it('fails closed for missing ownership and unregistered schemas', async () => {
    const target = await fixture();
    const missingOwner = frameworkEvent('event.owner', 'run.owner', 'user.owner');
    delete missingOwner.userId;
    delete missingOwner.metadata;

    await expect(target.bridge.append(missingOwner)).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
    });
    await expect(
      target.bridge.append({
        ...frameworkEvent('event.schema', 'run.schema', 'user.schema'),
        type: 'run.started',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
  });
});

async function fixture(options: { streamHeadPageSize?: number } = {}) {
  const schemas = new InMemoryEventSchemaRegistry();
  await schemas.register({
    eventType: 'run.created',
    version: '1.0.0',
    schema: payloadSchema,
    schemaHash: hashCanonicalJson(payloadSchema),
  });
  let milliseconds = 0;
  const now = () => new Date(Date.UTC(2026, 6, 21, 10, 0, 0, milliseconds++)).toISOString();
  const store = new InMemoryDurableEventStore({ schemaRegistry: schemas, now });
  const events = new DurableEventRuntime({ store, now });
  return {
    events,
    bridge: new DurableEventStoreBridge({ events, ...options }),
  };
}

function frameworkEvent(
  id: string,
  runId: string,
  userId: string,
  sessionId = `session.${runId}`
): FrameworkEvent {
  return {
    id,
    type: 'run.created',
    version: '1.0.0',
    userId,
    sessionId,
    runId,
    timestamp: '2026-07-21T10:00:00.000Z',
    payload: { runId, value: id },
    metadata: { userId },
  };
}
