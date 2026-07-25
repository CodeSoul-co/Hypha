import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { describe, expect, it } from 'vitest';
import {
  runtimeActivityReconciliationResultExample,
  runtimeActivityReconciliationResultJsonSchema,
  runtimeActivityReconciliationResultSchema,
  runtimeRecoveryCandidateExample,
  runtimeRecoveryCandidateJsonSchema,
  runtimeRecoveryCandidateSchema,
  runtimeRecoveryCommandExample,
  runtimeRecoveryCommandJsonSchema,
  runtimeRecoveryCommandSchema,
  runtimeRecoveryContractDefinitions,
  runtimeRecoveryResultExample,
  runtimeRecoveryResultJsonSchema,
  runtimeRecoveryResultSchema,
  runtimeRecoveryScanRequestExample,
  runtimeRecoveryScanRequestJsonSchema,
  runtimeRecoveryScanRequestSchema,
  runtimeRecoveryScanResultExample,
  runtimeRecoveryScanResultJsonSchema,
  runtimeRecoveryScanResultSchema,
} from './runtime-recovery-schemas';

describe('Runtime Recovery contracts', () => {
  it('keeps fixtures aligned across Zod and JSON Schema', () => {
    const ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const fixtures = [
      [
        runtimeRecoveryCandidateSchema,
        runtimeRecoveryCandidateJsonSchema,
        runtimeRecoveryCandidateExample,
      ],
      [
        runtimeRecoveryScanRequestSchema,
        runtimeRecoveryScanRequestJsonSchema,
        runtimeRecoveryScanRequestExample,
      ],
      [
        runtimeRecoveryScanResultSchema,
        runtimeRecoveryScanResultJsonSchema,
        runtimeRecoveryScanResultExample,
      ],
      [
        runtimeRecoveryCommandSchema,
        runtimeRecoveryCommandJsonSchema,
        runtimeRecoveryCommandExample,
      ],
      [runtimeRecoveryResultSchema, runtimeRecoveryResultJsonSchema, runtimeRecoveryResultExample],
      [
        runtimeActivityReconciliationResultSchema,
        runtimeActivityReconciliationResultJsonSchema,
        runtimeActivityReconciliationResultExample,
      ],
    ] as const;

    for (const [zod, jsonSchema, example] of fixtures) {
      expect(zod.parse(example)).toEqual(example);
      expect(ajv.validate(jsonSchema, example), ajv.errorsText()).toBe(true);
    }
    expect(runtimeRecoveryContractDefinitions).toHaveLength(6);
  });

  it('requires Activity candidates to identify their target', () => {
    expect(() =>
      runtimeRecoveryCandidateSchema.parse({
        ...runtimeRecoveryCandidateExample,
        activityId: undefined,
      })
    ).toThrow(/activityId/u);
  });

  it('requires stable observations for known provider outcomes', () => {
    expect(() =>
      runtimeActivityReconciliationResultSchema.parse({
        activityId: 'activity.default',
        status: 'completed',
      })
    ).toThrow(/observation/u);
  });
});
