import { describe, expect, it } from 'vitest';
import type { JsonSchema } from '../../specs';
import type { PersistedFrameworkEvent } from '../../events';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry, type EventSchemaDefinition } from './event-schema-registry';

const v1Schema: JsonSchema = {
  type: 'object',
  required: ['id', 'createdAt'],
  properties: {
    id: { type: 'string', minLength: 1 },
    createdAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};

const v2Schema: JsonSchema = {
  type: 'object',
  required: ['id', 'createdAt', 'revision'],
  properties: {
    id: { type: 'string', minLength: 1 },
    createdAt: { type: 'string', format: 'date-time' },
    revision: { type: 'integer', minimum: 1 },
  },
  additionalProperties: false,
};

function definition(
  version: string,
  schema: JsonSchema,
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

function persistedEvent(): PersistedFrameworkEvent {
  const payload = { id: 'run.schema', createdAt: '2026-07-18T01:00:00.000Z' };
  return {
    id: 'event.schema.v1',
    type: 'run.created',
    version: '1.0.0',
    userId: 'user.schema',
    runId: 'run.schema',
    sequence: 1,
    globalSequence: 1,
    timestamp: '2026-07-18T01:00:00.000Z',
    recordedAt: '2026-07-18T01:00:01.000Z',
    payload,
    payloadHash: hashCanonicalJson(payload),
  };
}

describe('InMemoryEventSchemaRegistry', () => {
  it('rejects schema hash drift, invalid schemas, and conflicting registrations', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await expect(
      registry.register({ ...definition('1.0.0', v1Schema), schemaHash: 'sha256:wrong' })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await expect(
      registry.register(
        definition('invalid', { type: 'object', properties: { id: { type: 'unknown' } } })
      )
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });

    await registry.register(definition('1.0.0', v1Schema));
    await registry.register(definition('1.0.0', v1Schema));
    await expect(registry.register(definition('1.0.0', { type: 'string' }))).rejects.toMatchObject({
      code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
    });
  });

  it('validates formats, required fields, and unknown fields with standard JSON Schema', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema));

    await expect(
      registry.validate({
        id: 'event.valid',
        type: 'run.created',
        version: '1.0.0',
        runId: 'run.schema',
        payload: { id: 'run.schema', createdAt: '2026-07-18T01:00:00.000Z' },
      })
    ).resolves.toMatchObject({ valid: true, issues: [] });

    const invalid = await registry.validate({
      id: 'event.invalid',
      type: 'run.created',
      version: '1.0.0',
      runId: 'run.schema',
      payload: { createdAt: 'not-a-date', owner: 'undeclared' },
    });
    expect(invalid.valid).toBe(false);
    expect(invalid.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '$.id', code: 'required' }),
        expect.objectContaining({ path: '$.createdAt', code: 'format' }),
        expect.objectContaining({ path: '$', code: 'additionalProperties' }),
      ])
    );
  });

  it('fails closed for unregistered versions and non-JSON payloads', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema));

    await expect(
      registry.validate({
        id: 'event.missing',
        type: 'run.created',
        version: '9.0.0',
        runId: 'run.schema',
        payload: {},
      })
    ).resolves.toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ code: 'schema_not_registered' })],
    });
    await expect(
      registry.validate({
        id: 'event.non-json',
        type: 'run.created',
        version: '1.0.0',
        runId: 'run.schema',
        payload: { value: Number.NaN },
      })
    ).resolves.toMatchObject({
      valid: false,
      issues: [expect.objectContaining({ code: 'non_json_payload' })],
    });
  });

  it('requires declared upcasters and revalidates every target version', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema, ['upcast.run-created.1-to-2']));
    await registry.register(definition('2.0.0', v2Schema));

    await expect(
      registry.registerUpcaster({
        ref: 'upcast.undeclared',
        eventType: 'run.created',
        fromVersion: '1.0.0',
        toVersion: '2.0.0',
        upcast: (payload) => payload,
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });

    await registry.registerUpcaster({
      ref: 'upcast.run-created.1-to-2',
      eventType: 'run.created',
      fromVersion: '1.0.0',
      toVersion: '2.0.0',
      upcast: (payload) => ({ ...(payload as Record<string, unknown>), revision: 1 }),
    });
    const source = persistedEvent();
    const upcast = await registry.upcast(source);
    expect(upcast).toMatchObject({
      id: source.id,
      sequence: source.sequence,
      version: '2.0.0',
      payload: { ...(source.payload as Record<string, unknown>), revision: 1 },
    });
    expect(upcast.payloadHash).toBe(hashCanonicalJson(upcast.payload));
    expect(upcast.payloadHash).not.toBe(source.payloadHash);
  });

  it('rejects an upcaster result that violates its target schema', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema, ['upcast.invalid']));
    await registry.register(definition('2.0.0', v2Schema));
    await registry.registerUpcaster({
      ref: 'upcast.invalid',
      eventType: 'run.created',
      fromVersion: '1.0.0',
      toVersion: '2.0.0',
      upcast: (payload) => payload,
    });

    await expect(registry.upcast(persistedEvent())).rejects.toMatchObject({
      code: 'RUNTIME_MESSAGE_SCHEMA_INVALID',
    });
  });

  it('rejects upcasting an event whose persisted payload hash has drifted', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    await registry.register(definition('1.0.0', v1Schema));
    const event = persistedEvent();
    event.payload = { ...(event.payload as Record<string, unknown>), id: 'tampered' };

    await expect(registry.upcast(event, '1.0.0')).rejects.toMatchObject({
      code: 'RUNTIME_EVENT_STREAM_CORRUPT',
    });
  });
});
