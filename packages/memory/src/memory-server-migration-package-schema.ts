import type { JsonSchema } from '@hypha/core';
import { z, type ZodType } from 'zod';
import type { MemoryServerMigrationPackageSpec } from './memory-server-migration-package';
import { memoryContractSpecRefJsonSchema, memoryContractSpecRefSchema } from './profile-contract';

export const memoryServerMigrationPackageSpecSchema: ZodType<MemoryServerMigrationPackageSpec> = z
  .object({
    contractRef: memoryContractSpecRefSchema,
    baseAcceptanceRef: memoryContractSpecRefSchema,
    requiredSuites: z.tuple([
      z.literal('consumer_contract'),
      z.literal('redis_behavior'),
      z.literal('permanent_behavior'),
      z.literal('migration_state_machine'),
      z.literal('runtime_lifecycle'),
    ]),
    lifecycleFailurePoints: z.tuple([
      z.literal('provider_create'),
      z.literal('capability_negotiation'),
      z.literal('health_check'),
      z.literal('activity_registration'),
    ]),
  })
  .strict();

export const memoryServerMigrationPackageSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['contractRef', 'baseAcceptanceRef', 'requiredSuites', 'lifecycleFailurePoints'],
  properties: {
    contractRef: memoryContractSpecRefJsonSchema,
    baseAcceptanceRef: memoryContractSpecRefJsonSchema,
    requiredSuites: {
      type: 'array',
      items: {
        enum: [
          'consumer_contract',
          'redis_behavior',
          'permanent_behavior',
          'migration_state_machine',
          'runtime_lifecycle',
        ],
      },
      minItems: 5,
      maxItems: 5,
    },
    lifecycleFailurePoints: {
      type: 'array',
      items: {
        enum: [
          'provider_create',
          'capability_negotiation',
          'health_check',
          'activity_registration',
        ],
      },
      minItems: 4,
      maxItems: 4,
    },
  },
  additionalProperties: false,
};

export function validateMemoryServerMigrationPackageSpec(
  input: unknown
): MemoryServerMigrationPackageSpec {
  return memoryServerMigrationPackageSpecSchema.parse(input);
}
