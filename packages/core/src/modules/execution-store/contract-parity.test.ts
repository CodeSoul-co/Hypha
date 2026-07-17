import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
import {
  executionIdempotencyQuerySchema,
  executionIdempotencyResolutionSchema,
  executionLeaseAcquireRequestSchema,
  executionLeaseGuardSchema,
  executionLeaseReleaseRequestSchema,
  executionLeaseRenewRequestSchema,
  executionLeaseSchema,
  executionRecordCompareAndSetRequestSchema,
  executionRecordCreateRequestSchema,
  executionRecordPageSchema,
  executionRecordQuerySchema,
  executionRecordSchema,
  executionRecoveryAssessmentSchema,
  executionStoreJsonSchemas,
} from './index';

interface ContractSchemaPair {
  name: string;
  zod: ZodTypeAny;
  json: JsonSchema;
}

function unwrapObjectSchema(schema: ZodTypeAny): z.ZodObject<ZodRawShape> {
  let current = schema;
  while (current instanceof z.ZodEffects) current = current.innerType();
  if (!(current instanceof z.ZodObject)) {
    throw new TypeError('contract parity requires an object Zod schema');
  }
  return current;
}

function sorted(values: string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function expectContractParity(pair: ContractSchemaPair): void {
  const shape = unwrapObjectSchema(pair.zod).shape;
  const zodKeys = sorted(Object.keys(shape));
  const jsonKeys = sorted(Object.keys(pair.json.properties ?? {}));
  const zodRequired = sorted(
    Object.entries(shape)
      .filter(([, field]) => !field.isOptional())
      .map(([key]) => key)
  );
  const jsonRequired = sorted(pair.json.required ?? []);

  expect(pair.json.type, pair.name).toBe('object');
  expect(pair.json.additionalProperties, pair.name).toBe(false);
  expect(jsonKeys, `${pair.name} property drift`).toEqual(zodKeys);
  expect(jsonRequired, `${pair.name} required-field drift`).toEqual(zodRequired);
}

const contractPairs: ContractSchemaPair[] = [
  {
    name: 'ExecutionLease',
    zod: executionLeaseSchema,
    json: executionStoreJsonSchemas.ExecutionLease,
  },
  {
    name: 'ExecutionRecord',
    zod: executionRecordSchema,
    json: executionStoreJsonSchemas.ExecutionRecord,
  },
  {
    name: 'ExecutionLeaseGuard',
    zod: executionLeaseGuardSchema,
    json: executionStoreJsonSchemas.ExecutionLeaseGuard,
  },
  {
    name: 'ExecutionRecordCreateRequest',
    zod: executionRecordCreateRequestSchema,
    json: executionStoreJsonSchemas.ExecutionRecordCreateRequest,
  },
  {
    name: 'ExecutionRecordCompareAndSetRequest',
    zod: executionRecordCompareAndSetRequestSchema,
    json: executionStoreJsonSchemas.ExecutionRecordCompareAndSetRequest,
  },
  {
    name: 'ExecutionLeaseAcquireRequest',
    zod: executionLeaseAcquireRequestSchema,
    json: executionStoreJsonSchemas.ExecutionLeaseAcquireRequest,
  },
  {
    name: 'ExecutionLeaseRenewRequest',
    zod: executionLeaseRenewRequestSchema,
    json: executionStoreJsonSchemas.ExecutionLeaseRenewRequest,
  },
  {
    name: 'ExecutionLeaseReleaseRequest',
    zod: executionLeaseReleaseRequestSchema,
    json: executionStoreJsonSchemas.ExecutionLeaseReleaseRequest,
  },
  {
    name: 'ExecutionRecordQuery',
    zod: executionRecordQuerySchema,
    json: executionStoreJsonSchemas.ExecutionRecordQuery,
  },
  {
    name: 'ExecutionRecordPage',
    zod: executionRecordPageSchema,
    json: executionStoreJsonSchemas.ExecutionRecordPage,
  },
  {
    name: 'ExecutionIdempotencyQuery',
    zod: executionIdempotencyQuerySchema,
    json: executionStoreJsonSchemas.ExecutionIdempotencyQuery,
  },
  {
    name: 'ExecutionRecoveryAssessment',
    zod: executionRecoveryAssessmentSchema,
    json: executionStoreJsonSchemas.ExecutionRecoveryAssessment,
  },
];

describe('Execution Store Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });

  it('keeps every idempotency resolution variant aligned', () => {
    const jsonVariants = executionStoreJsonSchemas.ExecutionIdempotencyResolution.oneOf as
      | JsonSchema[]
      | undefined;
    const zodVariants = executionIdempotencyResolutionSchema.options;

    expect(jsonVariants).toHaveLength(zodVariants.length);
    if (!jsonVariants) throw new TypeError('idempotency resolution JSON variants are required');

    zodVariants.forEach((zodVariant, index) => {
      const jsonVariant = jsonVariants[index];
      if (!jsonVariant) throw new TypeError(`missing idempotency resolution variant ${index}`);
      expectContractParity({
        name: `ExecutionIdempotencyResolution[${index}]`,
        zod: zodVariant,
        json: jsonVariant,
      });
    });
  });
});
