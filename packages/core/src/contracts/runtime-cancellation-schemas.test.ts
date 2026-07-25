import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeCancelCommandExample,
  runtimeCancelCommandJsonSchema,
  runtimeCancelCommandSchema,
  runtimeCancellationContractDefinitions,
  runtimeCancelResultExample,
  runtimeCancelResultJsonSchema,
  runtimeCancelResultSchema,
} from './runtime-cancellation-schemas';

describe('Runtime Cancellation contracts', () => {
  it('keeps command and result fixtures aligned across schema formats', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(runtimeCancelCommandSchema.parse(runtimeCancelCommandExample)).toEqual(
      runtimeCancelCommandExample
    );
    expect(ajv.validate(runtimeCancelCommandJsonSchema, runtimeCancelCommandExample)).toBe(true);
    expect(runtimeCancelResultSchema.parse(runtimeCancelResultExample)).toEqual(
      runtimeCancelResultExample
    );
    expect(ajv.validate(runtimeCancelResultJsonSchema, runtimeCancelResultExample)).toBe(true);
    expect(runtimeCancellationContractDefinitions).toHaveLength(2);
  });

  it('rejects missing reasons and negative grace periods', () => {
    expect(() =>
      runtimeCancelCommandSchema.parse({ ...runtimeCancelCommandExample, reason: '' })
    ).toThrow();
    expect(() =>
      runtimeCancelCommandSchema.parse({
        ...runtimeCancelCommandExample,
        policy: { ...runtimeCancelCommandExample.policy, waitGraceMs: -1 },
      })
    ).toThrow();
  });
});
