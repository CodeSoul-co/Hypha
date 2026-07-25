import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeTimerContractDefinitions,
  runtimeTimerSweepRequestExample,
  runtimeTimerSweepRequestJsonSchema,
  runtimeTimerSweepRequestSchema,
  runtimeTimerSweepResultExample,
  runtimeTimerSweepResultJsonSchema,
  runtimeTimerSweepResultSchema,
} from './runtime-timer-schemas';

describe('Runtime Timer contracts', () => {
  it('keeps sweep fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    expect(runtimeTimerSweepRequestSchema.parse(runtimeTimerSweepRequestExample)).toEqual(
      runtimeTimerSweepRequestExample
    );
    expect(ajv.validate(runtimeTimerSweepRequestJsonSchema, runtimeTimerSweepRequestExample)).toBe(
      true
    );
    expect(runtimeTimerSweepResultSchema.parse(runtimeTimerSweepResultExample)).toEqual(
      runtimeTimerSweepResultExample
    );
    expect(ajv.validate(runtimeTimerSweepResultJsonSchema, runtimeTimerSweepResultExample)).toBe(
      true
    );
    expect(runtimeTimerContractDefinitions).toHaveLength(2);
  });

  it('rejects unbounded scans and inconsistent result counters', () => {
    expect(() =>
      runtimeTimerSweepRequestSchema.parse({ ...runtimeTimerSweepRequestExample, limit: 1_001 })
    ).toThrow();
    expect(() =>
      runtimeTimerSweepResultSchema.parse({ ...runtimeTimerSweepResultExample, fired: 0 })
    ).toThrow();
  });
});
