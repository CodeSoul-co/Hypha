import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  RUNTIME_CAPACITY_KINDS,
  type RuntimeCapacityAcquireRequest,
  type RuntimeCapacityAssertionRequest,
  type RuntimeCapacityLease,
  type RuntimeCapacityLeaseGuard,
  type RuntimeCapacityLimit,
  type RuntimeCapacityPolicy,
  type RuntimeCapacityReleaseRequest,
  type RuntimeCapacityRenewRequest,
  type RuntimeCapacityScope,
  type RuntimeCapacityUsage,
  type RuntimeCapacityUsageRequest,
} from './runtime-capacity';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const positiveIntegerSchema = z.number().int().positive();
const capacityKindSchema = z.enum(RUNTIME_CAPACITY_KINDS);

const capacityLimitSchema = z
  .object({
    global: positiveIntegerSchema,
    perUser: positiveIntegerSchema,
  })
  .strict()
  .superRefine((limit, context) => {
    if (limit.perUser > limit.global) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['perUser'],
        message: 'perUser must not exceed global',
      });
    }
  }) satisfies ZodType<RuntimeCapacityLimit>;

export const runtimeCapacityPolicySchema = z
  .object({
    version: z.literal('1.0.0'),
    revision: nonEmptyStringSchema,
    limits: z
      .object({
        model: capacityLimitSchema,
        tool: capacityLimitSchema,
        execution: capacityLimitSchema,
      })
      .strict(),
  })
  .strict() satisfies ZodType<RuntimeCapacityPolicy>;

export const runtimeCapacityScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityScope>;

export const runtimeCapacityLeaseGuardSchema = z
  .object({
    leaseId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityLeaseGuard>;

export const runtimeCapacityLeaseSchema = runtimeCapacityScopeSchema
  .extend({
    id: nonEmptyStringSchema,
    kind: capacityKindSchema,
    operationId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
    policyRevision: nonEmptyStringSchema,
    acquiredAt: timestampSchema,
    heartbeatAt: timestampSchema,
    expiresAt: timestampSchema,
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
  }) satisfies ZodType<RuntimeCapacityLease>;

export const runtimeCapacityAcquireRequestSchema = runtimeCapacityScopeSchema
  .extend({
    kind: capacityKindSchema,
    operationId: nonEmptyStringSchema,
    requestedLeaseId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    acquiredAt: timestampSchema,
    ttlMs: positiveIntegerSchema,
    idempotencyKey: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityAcquireRequest>;

export const runtimeCapacityRenewRequestSchema = z
  .object({
    scope: runtimeCapacityScopeSchema,
    kind: capacityKindSchema,
    guard: runtimeCapacityLeaseGuardSchema,
    renewedAt: timestampSchema,
    ttlMs: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityRenewRequest>;

export const runtimeCapacityReleaseRequestSchema = z
  .object({
    scope: runtimeCapacityScopeSchema,
    kind: capacityKindSchema,
    guard: runtimeCapacityLeaseGuardSchema,
    releasedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityReleaseRequest>;

export const runtimeCapacityAssertionRequestSchema = z
  .object({
    scope: runtimeCapacityScopeSchema,
    kind: capacityKindSchema,
    guard: runtimeCapacityLeaseGuardSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityAssertionRequest>;

export const runtimeCapacityUsageRequestSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    kind: capacityKindSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityUsageRequest>;

export const runtimeCapacityUsageSchema = z
  .object({
    kind: capacityKindSchema,
    policyRevision: nonEmptyStringSchema,
    globalActive: z.number().int().min(0),
    userActive: z.number().int().min(0),
    globalLimit: positiveIntegerSchema,
    userLimit: positiveIntegerSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeCapacityUsage>;

const stringProperty: JsonSchema = { type: 'string', minLength: 1 };
const positiveIntegerProperty: JsonSchema = { type: 'integer', minimum: 1 };
const timestampProperty: JsonSchema = { type: 'string', format: 'date-time' };
const capacityLimitJsonSchema: JsonSchema = {
  type: 'object',
  required: ['global', 'perUser'],
  properties: {
    global: positiveIntegerProperty,
    perUser: positiveIntegerProperty,
  },
  additionalProperties: false,
};

export const runtimeCapacityPolicyDefinition = defineSpecSchema<RuntimeCapacityPolicy>({
  id: 'RuntimeCapacityPolicy',
  zod: runtimeCapacityPolicySchema,
  jsonSchema: {
    type: 'object',
    required: ['version', 'revision', 'limits'],
    properties: {
      version: { const: '1.0.0' },
      revision: stringProperty,
      limits: {
        type: 'object',
        required: [...RUNTIME_CAPACITY_KINDS],
        properties: {
          model: capacityLimitJsonSchema,
          tool: capacityLimitJsonSchema,
          execution: capacityLimitJsonSchema,
        },
        additionalProperties: false,
      },
    },
    additionalProperties: false,
  },
  example: {
    version: '1.0.0',
    revision: 'capacity.default.v1',
    limits: {
      model: { global: 8, perUser: 2 },
      tool: { global: 16, perUser: 4 },
      execution: { global: 4, perUser: 1 },
    },
  },
});

export const runtimeCapacityLeaseDefinition = defineSpecSchema<RuntimeCapacityLease>({
  id: 'RuntimeCapacityLease',
  zod: runtimeCapacityLeaseSchema,
  jsonSchema: {
    type: 'object',
    required: [
      'id',
      'userId',
      'runId',
      'kind',
      'operationId',
      'ownerId',
      'fencingToken',
      'policyRevision',
      'acquiredAt',
      'heartbeatAt',
      'expiresAt',
    ],
    properties: {
      id: stringProperty,
      tenantId: stringProperty,
      userId: stringProperty,
      runId: stringProperty,
      kind: { type: 'string', enum: [...RUNTIME_CAPACITY_KINDS] },
      operationId: stringProperty,
      ownerId: stringProperty,
      fencingToken: positiveIntegerProperty,
      policyRevision: stringProperty,
      acquiredAt: timestampProperty,
      heartbeatAt: timestampProperty,
      expiresAt: timestampProperty,
    },
    additionalProperties: false,
  },
  example: {
    id: 'capacity-lease.model.001',
    userId: 'user.example',
    runId: 'run.example',
    kind: 'model',
    operationId: 'model-call.001',
    ownerId: 'worker.example',
    fencingToken: 1,
    policyRevision: 'capacity.default.v1',
    acquiredAt: '2026-07-24T06:00:00.000Z',
    heartbeatAt: '2026-07-24T06:00:00.000Z',
    expiresAt: '2026-07-24T06:00:30.000Z',
  },
});

export const runtimeCapacityContractDefinitions = [
  runtimeCapacityPolicyDefinition,
  runtimeCapacityLeaseDefinition,
] as const;
export const runtimeCapacityContractJsonSchemas = exportSpecJsonSchemas(
  runtimeCapacityContractDefinitions
);

export const validateRuntimeCapacityPolicy = (input: unknown): RuntimeCapacityPolicy =>
  runtimeCapacityPolicyDefinition.parse(input);
export const validateRuntimeCapacityLease = (input: unknown): RuntimeCapacityLease =>
  runtimeCapacityLeaseDefinition.parse(input);
export const validateRuntimeCapacityAcquireRequest = (
  input: unknown
): RuntimeCapacityAcquireRequest => runtimeCapacityAcquireRequestSchema.parse(input);
export const validateRuntimeCapacityRenewRequest = (input: unknown): RuntimeCapacityRenewRequest =>
  runtimeCapacityRenewRequestSchema.parse(input);
export const validateRuntimeCapacityReleaseRequest = (
  input: unknown
): RuntimeCapacityReleaseRequest => runtimeCapacityReleaseRequestSchema.parse(input);
export const validateRuntimeCapacityAssertionRequest = (
  input: unknown
): RuntimeCapacityAssertionRequest => runtimeCapacityAssertionRequestSchema.parse(input);
export const validateRuntimeCapacityUsageRequest = (input: unknown): RuntimeCapacityUsageRequest =>
  runtimeCapacityUsageRequestSchema.parse(input);
export const validateRuntimeCapacityUsage = (input: unknown): RuntimeCapacityUsage =>
  runtimeCapacityUsageSchema.parse(input);
