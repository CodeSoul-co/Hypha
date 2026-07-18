import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeDeterministicObservationExample,
  runtimeDeterministicObservationJsonSchema,
  runtimeDeterministicObservationSchema,
  runtimeHelperContractDefinitions,
  runtimeObservationEventInputExample,
  runtimeObservationEventInputJsonSchema,
  runtimeObservationEventInputSchema,
  runtimeStateExecutionResultExample,
  runtimeStateExecutionResultJsonSchema,
  runtimeStateExecutionResultSchema,
  runtimeTransitionProposalExample,
  runtimeTransitionProposalJsonSchema,
  runtimeTransitionProposalSchema,
  runtimeWaitIntentExample,
  runtimeWaitIntentJsonSchema,
  runtimeWaitIntentSchema,
} from './runtime-helper-schemas';

describe('Runtime Helper contracts', () => {
  it('keeps examples aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);

    const examples = [
      [
        runtimeTransitionProposalSchema,
        runtimeTransitionProposalJsonSchema,
        runtimeTransitionProposalExample,
      ],
      [runtimeWaitIntentSchema, runtimeWaitIntentJsonSchema, runtimeWaitIntentExample],
      [
        runtimeStateExecutionResultSchema,
        runtimeStateExecutionResultJsonSchema,
        runtimeStateExecutionResultExample,
      ],
      [
        runtimeDeterministicObservationSchema,
        runtimeDeterministicObservationJsonSchema,
        runtimeDeterministicObservationExample,
      ],
      [
        runtimeObservationEventInputSchema,
        runtimeObservationEventInputJsonSchema,
        runtimeObservationEventInputExample,
      ],
    ] as const;
    for (const [schema, jsonSchema, example] of examples) {
      expect(schema.parse(example)).toEqual(example);
      expect(ajv.validate(jsonSchema, example), JSON.stringify(ajv.errors)).toBe(true);
    }
    expect(runtimeHelperContractDefinitions).toHaveLength(5);
  });

  it('enforces signal, timer, and pause wait requirements', () => {
    expect(() => runtimeWaitIntentSchema.parse({ type: 'signal' })).toThrow();
    expect(() => runtimeWaitIntentSchema.parse({ type: 'timer' })).toThrow();
    expect(() => runtimeWaitIntentSchema.parse({ type: 'pause' })).toThrow();
    expect(() => runtimeWaitIntentSchema.parse({ type: 'human', hidden: true })).toThrow();
  });

  it('rejects non-JSON result values and invalid deterministic scopes', () => {
    expect(() =>
      runtimeStateExecutionResultSchema.parse({
        kind: 'completed',
        output: { value: undefined },
      })
    ).toThrow();
    expect(() =>
      runtimeDeterministicObservationSchema.parse({
        ...runtimeDeterministicObservationExample,
        scope: { ...runtimeDeterministicObservationExample.scope, stateAttempt: 0 },
      })
    ).toThrow();
    expect(() =>
      runtimeObservationEventInputSchema.parse({
        type: 'run.completed',
        payload: {},
      })
    ).toThrow();
    expect(() =>
      runtimeObservationEventInputSchema.parse({
        type: 'runtime.observation.Invalid Name',
        payload: {},
      })
    ).toThrow();
  });
});
