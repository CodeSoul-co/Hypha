import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import type {
  FencedRunLease,
  RunLeaseAcquireRequest,
  RunLeaseAssertionRequest,
  RunLeaseGuard,
  RunLeaseHeartbeatRequest,
  RunLeaseReleaseRequest,
  RunLeaseScope,
} from './runtime-coordination';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const positiveIntegerSchema = z.number().int().positive();

export const runLeaseScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    partitionKey: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<RunLeaseScope>;

export const runLeaseGuardSchema = z
  .object({
    leaseId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<RunLeaseGuard>;

export const fencedRunLeaseSchema = z
  .object({
    id: nonEmptyStringSchema,
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    partitionKey: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    acquiredAt: timestampSchema,
    expiresAt: timestampSchema,
    heartbeatAt: timestampSchema,
    revision: positiveIntegerSchema,
    fencingToken: positiveIntegerSchema,
  })
  .strict()
  .superRefine((lease, context) => {
    const acquiredAt = Date.parse(lease.acquiredAt);
    const heartbeatAt = Date.parse(lease.heartbeatAt);
    const expiresAt = Date.parse(lease.expiresAt);
    if (heartbeatAt < acquiredAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['heartbeatAt'],
        message: 'heartbeatAt must not precede acquiredAt',
      });
    }
    if (expiresAt <= heartbeatAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'expiresAt must be later than heartbeatAt',
      });
    }
  }) satisfies ZodType<FencedRunLease>;

export const runLeaseAcquireRequestSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    partitionKey: nonEmptyStringSchema,
    requestedLeaseId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    ttlMs: positiveIntegerSchema,
    acquiredAt: timestampSchema,
    idempotencyKey: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<RunLeaseAcquireRequest>;

export const runLeaseHeartbeatRequestSchema = z
  .object({
    scope: runLeaseScopeSchema,
    guard: runLeaseGuardSchema,
    ttlMs: positiveIntegerSchema,
    heartbeatAt: timestampSchema,
  })
  .strict() satisfies ZodType<RunLeaseHeartbeatRequest>;

export const runLeaseReleaseRequestSchema = z
  .object({
    scope: runLeaseScopeSchema,
    guard: runLeaseGuardSchema,
    releasedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RunLeaseReleaseRequest>;

export const runLeaseAssertionRequestSchema = z
  .object({
    scope: runLeaseScopeSchema,
    guard: runLeaseGuardSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RunLeaseAssertionRequest>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };

export const runLeaseScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'runId', 'partitionKey'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    partitionKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runLeaseGuardJsonSchema: JsonSchema = {
  type: 'object',
  required: ['leaseId', 'ownerId', 'fencingToken'],
  properties: {
    leaseId: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const fencedRunLeaseJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'userId',
    'runId',
    'partitionKey',
    'ownerId',
    'acquiredAt',
    'expiresAt',
    'heartbeatAt',
    'revision',
    'fencingToken',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    partitionKey: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    acquiredAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    heartbeatAt: timestampJsonSchema,
    revision: positiveIntegerJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const fencedRunLeaseExample: FencedRunLease = {
  id: 'lease.run.example.1',
  tenantId: 'tenant.example',
  userId: 'user.example',
  runId: 'run.example',
  partitionKey: 'session:tenant.example:user.example:session.example',
  ownerId: 'runtime-worker.example',
  acquiredAt: '2026-07-18T06:00:00.000Z',
  heartbeatAt: '2026-07-18T06:00:00.000Z',
  expiresAt: '2026-07-18T06:00:30.000Z',
  revision: 1,
  fencingToken: 1,
};

export const fencedRunLeaseDefinition = defineSpecSchema<FencedRunLease>({
  id: 'FencedRunLease',
  zod: fencedRunLeaseSchema,
  jsonSchema: fencedRunLeaseJsonSchema,
  example: fencedRunLeaseExample,
});

export const runtimeCoordinationContractDefinitions = [fencedRunLeaseDefinition] as const;
export const runtimeCoordinationContractJsonSchemas = exportSpecJsonSchemas(
  runtimeCoordinationContractDefinitions
);

export function validateFencedRunLease(input: unknown): FencedRunLease {
  return fencedRunLeaseDefinition.parse(input);
}

export function validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest {
  return runLeaseAcquireRequestSchema.parse(input);
}

export function validateRunLeaseHeartbeatRequest(input: unknown): RunLeaseHeartbeatRequest {
  return runLeaseHeartbeatRequestSchema.parse(input);
}

export function validateRunLeaseReleaseRequest(input: unknown): RunLeaseReleaseRequest {
  return runLeaseReleaseRequestSchema.parse(input);
}

export function validateRunLeaseAssertionRequest(input: unknown): RunLeaseAssertionRequest {
  return runLeaseAssertionRequestSchema.parse(input);
}
