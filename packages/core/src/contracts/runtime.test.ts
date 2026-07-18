import { describe, expect, it } from 'vitest';
import {
  RUNTIME_ERROR_CODES,
  RUNTIME_RUN_STATUSES,
  assertSpecSchemaDefinition,
  runtimeContractDefinitions,
  runtimeContractJsonSchemas,
  runtimeRunExample,
  runtimeRunJsonSchema,
  runtimeRunStatusSchema,
  runtimeSessionExample,
  runtimeWaitRequestExample,
  runtimeWaitRequestJsonSchema,
  validateRunSignalRequest,
  validateRuntimeRun,
  validateRuntimeSession,
  validateRuntimeWaitRequest,
} from '../index';

describe('Runtime identity and lifecycle contracts', () => {
  it('keeps TypeScript examples, Zod validators, and JSON required fields aligned', () => {
    for (const definition of runtimeContractDefinitions) {
      assertSpecSchemaDefinition(definition);
      expect(definition.parse(definition.example)).toEqual(definition.example);

      for (const field of definition.jsonSchema.required ?? []) {
        const withoutRequiredField = { ...definition.example } as Record<string, unknown>;
        delete withoutRequiredField[field];
        expect(() => definition.parse(withoutRequiredField), `${definition.id}.${field}`).toThrow();
      }

      expect(() =>
        definition.parse({ ...definition.example, unexpectedRuntimeField: true })
      ).toThrow();
    }

    expect(Object.keys(runtimeContractJsonSchemas)).toEqual(
      runtimeContractDefinitions.map((definition) => definition.id)
    );
  });

  it('keeps run status enums aligned across constants, Zod, and JSON Schema', () => {
    expect(runtimeRunStatusSchema.options).toEqual([...RUNTIME_RUN_STATUSES]);
    expect(runtimeRunJsonSchema.properties?.status?.enum).toEqual([...RUNTIME_RUN_STATUSES]);
    expect(runtimeContractJsonSchemas.NormalizedRuntimeError.properties?.code?.enum).toEqual([
      ...RUNTIME_ERROR_CODES,
    ]);
  });

  it('rejects mutable execution state and unknown properties on Session', () => {
    expect(validateRuntimeSession(runtimeSessionExample)).toEqual(runtimeSessionExample);
    expect(() =>
      validateRuntimeSession({
        ...runtimeSessionExample,
        currentState: 'Reasoning',
      })
    ).toThrow();
  });

  it('requires immutable process identity, JSON input, and qualified hashes on Run', () => {
    expect(validateRuntimeRun(runtimeRunExample)).toEqual(runtimeRunExample);
    expect(() =>
      validateRuntimeRun({ ...runtimeRunExample, processHash: 'not-qualified' })
    ).toThrow();
    expect(() => validateRuntimeRun({ ...runtimeRunExample, revision: -1 })).toThrow();
    expect(() => validateRuntimeRun({ ...runtimeRunExample, input: new Date() })).toThrow();
  });

  it('requires correlation data for signal and timer waits', () => {
    expect(validateRuntimeWaitRequest(runtimeWaitRequestExample)).toEqual(
      runtimeWaitRequestExample
    );
    expect(() => validateRuntimeWaitRequest({ type: 'signal' })).toThrow(/require a key/u);
    expect(() => validateRuntimeWaitRequest({ type: 'timer' })).toThrow(/require expiresAt/u);
    expect(runtimeWaitRequestJsonSchema.allOf).toEqual([
      expect.objectContaining({ then: { required: ['key'] } }),
      expect.objectContaining({ then: { required: ['expiresAt'] } }),
    ]);
  });

  it('validates signal principal, payload, timestamp, and idempotency identity', () => {
    expect(() =>
      validateRunSignalRequest({
        signalId: 'signal.default',
        runId: 'run.default',
        key: 'approval.received',
        principal: {
          principalId: 'principal.default',
          type: 'user',
          permissionScopes: ['runtime:signal'],
        },
        payload: { approved: true },
        idempotencyKey: 'signal.default.delivery',
        sentAt: 'not-a-timestamp',
      })
    ).toThrow();
  });
});
