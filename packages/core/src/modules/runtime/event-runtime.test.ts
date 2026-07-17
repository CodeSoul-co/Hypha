import { describe, expect, it } from 'vitest';
import { hashCanonicalJson } from './canonical-json';
import { DurableEventRuntime, eventExportChecksum } from './event-runtime';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { InMemoryEventStoreV2, type EventStreamScope } from './event-store';

const scope: EventStreamScope = {
  tenantId: 'tenant.runtime',
  userId: 'user.runtime',
  runId: 'run.runtime',
};

const payloadSchema = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'string', minLength: 1 } },
  additionalProperties: false,
};

async function registry(): Promise<InMemoryEventSchemaRegistry> {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of ['run.created', 'run.started'] as const) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  return schemas;
}

describe('DurableEventRuntime', () => {
  it('validates schemas before append and leaves the stream unchanged on failure', async () => {
    const store = new InMemoryEventStoreV2();
    const runtime = new DurableEventRuntime({ store, schemas: await registry() });

    await expect(
      runtime.append({
        scope,
        events: [
          {
            id: 'event.invalid',
            type: 'run.created',
            runId: scope.runId,
            payload: { id: 'run.runtime', undeclared: true },
          },
        ],
        expectedLastSequence: 0,
        idempotencyKey: 'append.invalid',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await expect(store.getStreamHead(scope)).resolves.toBeNull();
  });

  it('reads and streams scoped sequence ranges without exposing other event types', async () => {
    const runtime = new DurableEventRuntime({
      store: new InMemoryEventStoreV2(),
      schemas: await registry(),
    });
    await runtime.append({
      scope,
      events: [
        { id: 'event.1', type: 'run.created', runId: scope.runId, payload: { id: 'run' } },
        { id: 'event.2', type: 'run.started', runId: scope.runId, payload: { id: 'run' } },
        { id: 'event.3', type: 'run.created', runId: scope.runId, payload: { id: 'run' } },
      ],
      expectedLastSequence: 0,
      idempotencyKey: 'append.runtime.read',
    });

    await expect(
      runtime.read({ scope, fromSequence: 2, toSequence: 3, types: ['run.created'] })
    ).resolves.toMatchObject([{ id: 'event.3', sequence: 3 }]);
    const streamed: string[] = [];
    for await (const event of runtime.stream({ scope, fromSequence: 2 })) streamed.push(event.id);
    expect(streamed).toEqual(['event.2', 'event.3']);
    await expect(runtime.latestSequence(scope)).resolves.toBe(3);
  });

  it('exports and imports a complete stream with integrity and idempotency checks', async () => {
    const source = new DurableEventRuntime({
      store: new InMemoryEventStoreV2({ now: () => '2026-07-17T05:00:01.000Z' }),
      schemas: await registry(),
      now: () => '2026-07-17T05:00:02.000Z',
    });
    await source.append({
      scope,
      events: [
        {
          id: 'event.export.1',
          type: 'run.created',
          runId: scope.runId,
          timestamp: '2026-07-17T05:00:00.000Z',
          payload: { id: 'run.runtime' },
        },
        {
          id: 'event.export.2',
          type: 'run.started',
          runId: scope.runId,
          timestamp: '2026-07-17T05:00:01.000Z',
          payload: { id: 'run.runtime' },
        },
      ],
      expectedLastSequence: 0,
      idempotencyKey: 'append.export.source',
    });
    const exported = await source.export({ scope });
    expect(exported).toMatchObject({ eventCount: 2, checksum: expect.stringMatching(/^sha256:/u) });

    const targetStore = new InMemoryEventStoreV2();
    const target = new DurableEventRuntime({ store: targetStore, schemas: await registry() });
    const request = {
      scope,
      exported,
      expectedLastSequence: 0,
      expectedRunRevision: 0,
      idempotencyKey: 'import.runtime.1',
    };
    await expect(target.import(request)).resolves.toMatchObject({
      importedEventCount: 2,
      firstSequence: 1,
      lastSequence: 2,
      reused: false,
    });
    await expect(target.import(request)).resolves.toMatchObject({ reused: true });
    await expect(target.read({ scope })).resolves.toMatchObject([
      { id: 'event.export.1', sequence: 1, payloadHash: exported.events[0].payloadHash },
      { id: 'event.export.2', sequence: 2, payloadHash: exported.events[1].payloadHash },
    ]);
  });

  it('rejects checksum and payload-hash tampering during import', async () => {
    const runtime = new DurableEventRuntime({ store: new InMemoryEventStoreV2() });
    await runtime.append({
      scope,
      events: [
        { id: 'event.tamper', type: 'run.created', runId: scope.runId, payload: { id: 'run' } },
      ],
      expectedLastSequence: 0,
      idempotencyKey: 'append.tamper',
    });
    const exported = await runtime.export({ scope });
    const tampered = structuredClone(exported);
    tampered.events[0].payload = { id: 'changed' };
    const target = new DurableEventRuntime({ store: new InMemoryEventStoreV2() });

    await expect(
      target.import({
        scope,
        exported: tampered,
        expectedLastSequence: 0,
        idempotencyKey: 'import.tamper.checksum',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_STREAM_CORRUPT' });

    tampered.checksum = eventExportChecksum(tampered);
    await expect(
      target.import({
        scope,
        exported: tampered,
        expectedLastSequence: 0,
        idempotencyKey: 'import.tamper.payload',
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_EVENT_STREAM_CORRUPT' });
    await expect(target.latestSequence(scope)).resolves.toBe(0);
  });
});
