import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeCheckpointContractDefinitions,
  runtimeCheckpointCreateCommandExample,
  runtimeCheckpointCreateCommandJsonSchema,
  runtimeCheckpointCreateCommandSchema,
  runtimeCheckpointCreateResultExample,
  runtimeCheckpointCreateResultJsonSchema,
  runtimeCheckpointCreateResultSchema,
  runtimeCheckpointLoadRequestExample,
  runtimeCheckpointLoadRequestJsonSchema,
  runtimeCheckpointLoadRequestSchema,
  runtimeCheckpointLoadResultExample,
  runtimeCheckpointLoadResultJsonSchema,
  runtimeCheckpointLoadResultSchema,
  runtimeCheckpointPolicySpecExample,
  runtimeCheckpointPolicySpecJsonSchema,
  runtimeCheckpointPolicySpecSchema,
  runtimeCheckpointRecordExample,
  runtimeCheckpointRecordJsonSchema,
  runtimeCheckpointRecordSchema,
} from './runtime-checkpoint-schemas';

describe('Runtime Checkpoint contracts', () => {
  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const fixtures = [
      [
        runtimeCheckpointPolicySpecSchema,
        runtimeCheckpointPolicySpecJsonSchema,
        runtimeCheckpointPolicySpecExample,
      ],
      [
        runtimeCheckpointRecordSchema,
        runtimeCheckpointRecordJsonSchema,
        runtimeCheckpointRecordExample,
      ],
      [
        runtimeCheckpointCreateCommandSchema,
        runtimeCheckpointCreateCommandJsonSchema,
        runtimeCheckpointCreateCommandExample,
      ],
      [
        runtimeCheckpointCreateResultSchema,
        runtimeCheckpointCreateResultJsonSchema,
        runtimeCheckpointCreateResultExample,
      ],
      [
        runtimeCheckpointLoadRequestSchema,
        runtimeCheckpointLoadRequestJsonSchema,
        runtimeCheckpointLoadRequestExample,
      ],
      [
        runtimeCheckpointLoadResultSchema,
        runtimeCheckpointLoadResultJsonSchema,
        runtimeCheckpointLoadResultExample,
      ],
    ] as const;

    for (const [zod, jsonSchema, example] of fixtures) {
      expect(zod.parse(example)).toEqual(example);
      expect(ajv.validate(jsonSchema, example), ajv.errorsText()).toBe(true);
    }
    expect(runtimeCheckpointContractDefinitions).toHaveLength(6);
  });

  it('requires an Event interval for every_n_events policies', () => {
    expect(() => runtimeCheckpointPolicySpecSchema.parse({ mode: 'every_n_events' })).toThrow(
      /everyNEvents/u
    );
  });

  it('rejects a snapshot from another Run or State', () => {
    expect(() =>
      runtimeCheckpointRecordSchema.parse({
        ...runtimeCheckpointRecordExample,
        projectionSnapshot: {
          ...runtimeCheckpointRecordExample.projectionSnapshot,
          runId: 'run.other',
        },
      })
    ).toThrow(/runId/u);
    expect(() =>
      runtimeCheckpointRecordSchema.parse({
        ...runtimeCheckpointRecordExample,
        currentState: 'Observing',
      })
    ).toThrow(/currentState/u);
  });

  it('requires delta metadata to begin after the covered Event', () => {
    expect(() =>
      runtimeCheckpointLoadResultSchema.parse({
        ...runtimeCheckpointLoadResultExample,
        deltaFromSequence: runtimeCheckpointLoadResultExample.record.lastEventSequence,
      })
    ).toThrow(/delta/u);
  });
});
