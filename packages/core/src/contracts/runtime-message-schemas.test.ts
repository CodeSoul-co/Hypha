import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import { hashCanonicalJson } from '../modules/runtime/canonical-json';
import {
  runtimeMessageEnvelopeDefinition,
  runtimeMessageEnvelopeExample,
  runtimeMessageEnvelopeJsonSchema,
  runtimeMessageEnvelopeSchema,
  validateRuntimeMessageEnvelopeInput,
} from './runtime-message-schemas';

describe('Runtime message contracts', () => {
  it('keeps the example valid in Zod and JSON Schema with a complete payload hash', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    expect(runtimeMessageEnvelopeSchema.parse(runtimeMessageEnvelopeExample)).toEqual(
      runtimeMessageEnvelopeExample
    );
    expect(ajv.validate(runtimeMessageEnvelopeJsonSchema, runtimeMessageEnvelopeExample)).toBe(
      true
    );
    expect(runtimeMessageEnvelopeExample.payloadHash).toBe(
      hashCanonicalJson(runtimeMessageEnvelopeExample.payload)
    );
    expect(runtimeMessageEnvelopeDefinition.example).toEqual(runtimeMessageEnvelopeExample);
  });

  it('rejects unknown fields, invalid hashes, and malformed timestamps', () => {
    expect(() =>
      runtimeMessageEnvelopeSchema.parse({ ...runtimeMessageEnvelopeExample, hidden: true })
    ).toThrow();
    expect(() =>
      runtimeMessageEnvelopeSchema.parse({
        ...runtimeMessageEnvelopeExample,
        payloadHash: 'wrong',
      })
    ).toThrow();
    expect(() =>
      validateRuntimeMessageEnvelopeInput({
        ...runtimeMessageEnvelopeExample,
        payloadHash: undefined,
        expiresAt: 'not-a-timestamp',
      })
    ).toThrow();
  });
});
