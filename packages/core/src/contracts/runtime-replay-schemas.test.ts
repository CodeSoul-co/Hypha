import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeReplayContractDefinitions,
  runtimeReplayRequestExample,
  runtimeReplayRequestJsonSchema,
  runtimeReplayRequestSchema,
  runtimeReplayResultExample,
  runtimeReplayResultJsonSchema,
  runtimeReplayResultSchema,
  runtimeReplayVerificationRequestExample,
  runtimeReplayVerificationRequestJsonSchema,
  runtimeReplayVerificationRequestSchema,
  runtimeReplayVerificationResultExample,
  runtimeReplayVerificationResultJsonSchema,
  runtimeReplayVerificationResultSchema,
} from './runtime-replay-schemas';

describe('Runtime Replay contracts', () => {
  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const fixtures = [
      [runtimeReplayRequestSchema, runtimeReplayRequestJsonSchema, runtimeReplayRequestExample],
      [runtimeReplayResultSchema, runtimeReplayResultJsonSchema, runtimeReplayResultExample],
      [
        runtimeReplayVerificationRequestSchema,
        runtimeReplayVerificationRequestJsonSchema,
        runtimeReplayVerificationRequestExample,
      ],
      [
        runtimeReplayVerificationResultSchema,
        runtimeReplayVerificationResultJsonSchema,
        runtimeReplayVerificationResultExample,
      ],
    ] as const;

    for (const [zod, jsonSchema, example] of fixtures) {
      expect(zod.parse(example)).toEqual(example);
      expect(ajv.validate(jsonSchema, example), ajv.errorsText()).toBe(true);
    }
    expect(runtimeReplayContractDefinitions).toHaveLength(4);
  });

  it('rejects impossible sequence and count metadata', () => {
    expect(() =>
      runtimeReplayResultSchema.parse({
        ...runtimeReplayResultExample,
        targetEventSequence: runtimeReplayResultExample.baseEventSequence - 1,
      })
    ).toThrow(/target/u);
    expect(() =>
      runtimeReplayResultSchema.parse({
        ...runtimeReplayResultExample,
        replayedEventCount: 3,
      })
    ).toThrow(/count/u);
  });

  it('requires verification status to agree with divergences', () => {
    expect(() =>
      runtimeReplayVerificationResultSchema.parse({
        ...runtimeReplayVerificationResultExample,
        matches: false,
      })
    ).toThrow(/matches/u);
  });
});
