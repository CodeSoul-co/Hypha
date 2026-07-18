import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeQueryContractDefinitions,
  runtimeQueryRequestExample,
  runtimeQueryRequestJsonSchema,
  runtimeQueryRequestSchema,
  runtimeRunViewExample,
  runtimeRunViewJsonSchema,
  runtimeRunViewSchema,
  runtimeStateExplanationExample,
  runtimeStateExplanationJsonSchema,
  runtimeStateExplanationSchema,
  runtimeTimelineRequestExample,
  runtimeTimelineRequestJsonSchema,
  runtimeTimelineRequestSchema,
} from './runtime-query-schemas';

describe('Runtime Query contracts', () => {
  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const fixtures = [
      [runtimeQueryRequestSchema, runtimeQueryRequestJsonSchema, runtimeQueryRequestExample],
      [
        runtimeTimelineRequestSchema,
        runtimeTimelineRequestJsonSchema,
        runtimeTimelineRequestExample,
      ],
      [runtimeRunViewSchema, runtimeRunViewJsonSchema, runtimeRunViewExample],
      [
        runtimeStateExplanationSchema,
        runtimeStateExplanationJsonSchema,
        runtimeStateExplanationExample,
      ],
    ] as const;

    for (const [zod, jsonSchema, example] of fixtures) {
      expect(zod.parse(example)).toEqual(example);
      expect(ajv.validate(jsonSchema, example), ajv.errorsText()).toBe(true);
    }
    expect(runtimeQueryContractDefinitions).toHaveLength(4);
  });

  it('rejects inverted Timeline ranges', () => {
    expect(() =>
      runtimeTimelineRequestSchema.parse({
        ...runtimeTimelineRequestExample,
        fromSequence: 10,
        toSequence: 9,
      })
    ).toThrow(/toSequence/u);
  });

  it('requires Projection lag to match its sequence positions', () => {
    expect(() =>
      runtimeRunViewSchema.parse({ ...runtimeRunViewExample, projectionLag: 1 })
    ).toThrow(/lag/u);
  });
});
