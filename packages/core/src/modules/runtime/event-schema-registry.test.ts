import { describe, expect, it } from 'vitest';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventStoreV2 } from './event-store';
import { InMemoryEventSchemaRegistry, type EventSchemaDefinition } from './event-schema-registry';

const v1Schema = {
  type: 'object',
  required: ['id', 'details'],
  properties: {
    id: { type: 'string', minLength: 1 },
    details: {
      type: 'object',
      required: ['source'],
      properties: { source: { type: 'string' } },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

const v2Schema = {
  type: 'object',
  required: ['id', 'details', 'revision'],
  properties: {
    id: { type: 'string', minLength: 1 },
    details: {
      type: 'object',
      required: ['source'],
      properties: { source: { type: 'string' } },
      additionalProperties: false,
    },
    revision: { type: 'integer', minimum: 1 },
  },
  additionalProperties: false,
};

function definition(
  version: string,
  schema: Record<string, unknown>,
  upcasterRefs?: string[]
): EventSchemaDefinition {
  return {
    eventType: 'run.created',
    version,
    schema,
    schemaHash: hashCanonicalJson(schema),
    upcasterRefs,
  };
}

describe('InMemoryEventSchemaRegistry', () => {
  it('rejects schema hash drift and conflicting version registration', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await expect(
      registry.register({ ...definition('1.0.0', v1Schema), schemaHash: 'sha256:wrong' })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });

    await registry.register(definition('1.0.0', v1Schema));
    await expect(registry.register(definition('1.0.0', { type: 'string' }))).rejects.toMatchObject({
      code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
    });
  });

  it('validates required, nested, and unknown fields consistently', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema));

    await expect(
      registry.validate({
        id: 'event.schema.valid',
        type: 'run.created',
        version: '1.0.0',
        runId: 'run.schema',
        payload: { id: 'run.schema', details: { source: 'fixture' } },
      })
    ).resolves.toMatchObject({ valid: true, issues: [] });

    const invalid = await registry.validate({
      id: 'event.schema.invalid',
      type: 'run.created',
      version: '1.0.0',
      runId: 'run.schema',
      payload: {
        id: 'run.schema',
        details: { source: 'fixture', provider: 'undeclared' },
        owner: 'undeclared',
      },
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '$.details.provider', code: 'additionalProperties' }),
        expect.objectContaining({ path: '$.owner', code: 'additionalProperties' }),
      ])
    );
  });

  it('reports unregistered event versions without accepting them', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await expect(
      registry.validate({
        id: 'event.schema.missing',
        type: 'run.created',
        version: '9.0.0',
        runId: 'run.schema',
        payload: {},
      })
    ).resolves.toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ code: 'schema_not_registered' })],
    });
  });

  it('upcasts through registered versions and revalidates payload hashes', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema, ['upcast.run-created.1-to-2']));
    await registry.register(definition('2.0.0', v2Schema));
    await registry.registerUpcaster({
      ref: 'upcast.run-created.1-to-2',
      eventType: 'run.created',
      fromVersion: '1.0.0',
      toVersion: '2.0.0',
      upcast: (payload) => ({ ...(payload as Record<string, unknown>), revision: 1 }),
    });
    const store = new InMemoryEventStoreV2();
    const appended = await store.append({
      scope: { userId: 'user.schema', runId: 'run.schema' },
      events: [
        {
          id: 'event.schema.v1',
          type: 'run.created',
          version: '1.0.0',
          runId: 'run.schema',
          payload: { id: 'run.schema', details: { source: 'fixture' } },
        },
      ],
      expectedLastSequence: 0,
      idempotencyKey: 'append.schema.v1',
    });

    const upcast = await registry.upcast(appended.events[0]);
    expect(upcast).toMatchObject({
      id: appended.events[0].id,
      sequence: appended.events[0].sequence,
      version: '2.0.0',
      payload: { id: 'run.schema', details: { source: 'fixture' }, revision: 1 },
    });
    expect(upcast.payloadHash).toBe(hashCanonicalJson(upcast.payload));
    expect(upcast.payloadHash).not.toBe(appended.events[0].payloadHash);
  });

  it('fails closed when an upcaster produces an invalid target payload', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema));
    await registry.register(definition('2.0.0', v2Schema));
    await registry.registerUpcaster({
      ref: 'upcast.invalid',
      eventType: 'run.created',
      fromVersion: '1.0.0',
      toVersion: '2.0.0',
      upcast: (payload) => payload,
    });
    const store = new InMemoryEventStoreV2();
    const [source] = (
      await store.append({
        scope: { userId: 'user.schema', runId: 'run.schema' },
        events: [
          {
            id: 'event.schema.invalid-upcast',
            type: 'run.created',
            version: '1.0.0',
            runId: 'run.schema',
            payload: { id: 'run.schema', details: { source: 'fixture' } },
          },
        ],
        expectedLastSequence: 0,
        idempotencyKey: 'append.schema.invalid-upcast',
      })
    ).events;

    await expect(registry.upcast(source, '2.0.0')).rejects.toMatchObject({
      code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
    });
  });
});
