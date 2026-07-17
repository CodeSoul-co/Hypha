import { describe, expect, it } from 'vitest';
import type { JsonSchema } from '../../specs';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
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
