import { describe, expect, it } from 'vitest';
import type { EventCreateInput, PersistedFrameworkEvent } from '../../events';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { InMemoryDurableEventStore, type EventStreamScope } from './event-store';
import { DurableEventRuntime, eventExportChecksum } from './event-runtime';

const scope: EventStreamScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
};

const payloadSchema: JsonSchema = {
  type: 'object',
  required: ['value'],
  properties: { value: { type: 'string' } },
  additionalProperties: false,
};

async function runtime(exportedAt = '2026-07-18T02:00:02.000Z') {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const eventType of ['run.created', 'run.started'] as const) {
    await schemas.register({
      eventType,
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
  }
  const store = new InMemoryDurableEventStore({
    schemaRegistry: schemas,
    now: () => '2026-07-18T02:00:01.000Z',
  });
  return {
    store,
    runtime: new DurableEventRuntime({ store, now: () => exportedAt }),
  };
}

function event(id: string, type: 'run.created' | 'run.started'): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
    timestamp: '2026-07-18T02:00:00.000Z',
    payload: { value: id },
  };
}

async function appendFixture(target: DurableEventRuntime) {
  return target.append({
    scope,
    events: [
      event('event.1', 'run.created'),
      event('event.2', 'run.started'),
      event('event.3', 'run.started'),
    ],
    expectedLastSequence: 0,
    expectedRunRevision: 0,
    fencingToken: 3,
    idempotencyKey: 'append.fixture',
  });
}

describe('DurableEventRuntime', () => {
  it('provides bounded reads, type filters, stream iteration, and stream heads', async () => {
    const fixture = await runtime();
    await appendFixture(fixture.runtime);

    await expect(
      fixture.runtime.read({
        scope,
        fromSequence: 2,
        toSequence: 3,
        types: ['run.started'],
      })
    ).resolves.toMatchObject([
      { id: 'event.2', sequence: 2 },
      { id: 'event.3', sequence: 3 },
    ]);

    const streamed: PersistedFrameworkEvent[] = [];
    for await (const item of fixture.runtime.stream({ scope, fromSequence: 2 })) {
      streamed.push(item);
    }
    expect(streamed.map((item) => item.id)).toEqual(['event.2', 'event.3']);
    await expect(fixture.runtime.latestSequence(scope)).resolves.toBe(3);
    await expect(fixture.runtime.getStreamHead(scope)).resolves.toMatchObject({
      lastSequence: 3,
      runRevision: 1,
      fencingToken: 3,
    });
    await expect(fixture.runtime.listStreamHeads()).resolves.toMatchObject({
      heads: [expect.objectContaining({ scope, lastSequence: 3 })],
    });
  });

  it('exports a deterministic checksum and imports the batch idempotently', async () => {
    const source = await runtime();
    await appendFixture(source.runtime);
    const exported = await source.runtime.export({ scope });

    expect(exported).toMatchObject({
      formatVersion: '1.0.0',
      scope,
      eventCount: 3,
      exportedAt: '2026-07-18T02:00:02.000Z',
      head: { lastSequence: 3, runRevision: 1 },
    });
    expect(exported.checksum).toBe(eventExportChecksum(exported));

    const target = await runtime();
    const request = {
      scope,
      exported,
      expectedLastSequence: 0,
      expectedRunRevision: 0,
      fencingToken: 4,
      idempotencyKey: 'import.fixture',
    };
    await expect(target.runtime.import(request)).resolves.toMatchObject({
      firstSequence: 1,
      lastSequence: 3,
      runRevision: 1,
      reused: false,
      importedEventCount: 3,
      sourceChecksum: exported.checksum,
    });
    await expect(target.runtime.import(request)).resolves.toMatchObject({ reused: true });
    await expect(target.runtime.read({ scope })).resolves.toMatchObject([
      { id: 'event.1', sequence: 1 },
      { id: 'event.2', sequence: 2 },
      { id: 'event.3', sequence: 3 },
    ]);
  });

  it('rejects tampered payloads, scope mismatches, and non-contiguous sources', async () => {
    const source = await runtime();
    await appendFixture(source.runtime);
    const exported = await source.runtime.export({ scope });
    const target = await runtime();

    const tampered = structuredClone(exported);
    tampered.events[0].payload = { value: 'changed' };
    await expect(
      target.runtime.import({
        scope,
        exported: tampered,
        expectedLastSequence: 0,
        idempotencyKey: 'import.tampered',
      })
    ).rejects.toThrow(/checksum/u);

    await expect(
      target.runtime.import({
        scope: { ...scope, runId: 'run.other' },
        exported,
        expectedLastSequence: 0,
        idempotencyKey: 'import.scope',
      })
    ).rejects.toThrow(/scope/u);

    const nonContiguous = structuredClone(exported);
    nonContiguous.events[1].sequence = 4;
    nonContiguous.checksum = eventExportChecksum(nonContiguous);
    await expect(
      target.runtime.import({
        scope,
        exported: nonContiguous,
        expectedLastSequence: 0,
        idempotencyKey: 'import.sequence',
      })
    ).rejects.toThrow(/contiguous/u);
  });

  it('rejects invalid read ranges and empty imports', async () => {
    const fixture = await runtime();
    await expect(fixture.runtime.read({ scope, fromSequence: 3, toSequence: 2 })).rejects.toThrow(
      /toSequence/u
    );

    const exported = await fixture.runtime.export({ scope });
    await expect(
      fixture.runtime.import({
        scope,
        exported,
        expectedLastSequence: 0,
        idempotencyKey: 'import.empty',
      })
    ).rejects.toThrow(/at least one event/u);
  });
});
