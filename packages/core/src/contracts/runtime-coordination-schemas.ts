import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import type {
  FencedRunLease,
  ResourceAcquireRequest,
  ResourceClaimAssertionRequest,
  ResourceListRequest,
  ResourceReleaseRequest,
  ResourceRenewRequest,
  RuntimeResourceClaim,
  RunLeaseAcquireRequest,
  RunLeaseAuthorization,
  RunLeaseAssertionRequest,
  RunLeaseGuard,
  RunLeaseHeartbeatRequest,
  RunLeasePreemptRequest,
  RunLeaseReleaseRequest,
  RunLeaseScope,
  StateExecutionClaim,
  StateExecutionClaimAcquireRequest,
  StateExecutionClaimAssertionRequest,
  StateExecutionClaimCompleteRequest,
  StateExecutionClaimGuard,
  StateExecutionClaimReleaseRequest,
  StateExecutionClaimRenewRequest,
  StateExecutionClaimScope,
} from './runtime-coordination';
import {
  RUNTIME_RESOURCE_CLAIM_MODES,
  RUNTIME_RESOURCE_TYPES,
  STATE_EXECUTION_CLAIM_STATUSES,
} from './runtime-coordination';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const positiveIntegerSchema = z.number().int().positive();
type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
const jsonValueSchema: ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number().finite(),
    z.string(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);

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

export const runLeasePreemptRequestSchema = runLeaseAcquireRequestSchema
  .extend({ reason: z.literal('cancellation') })
  .strict() satisfies ZodType<RunLeasePreemptRequest>;

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

export const runLeaseAuthorizationSchema = z
  .object({ scope: runLeaseScopeSchema, guard: runLeaseGuardSchema })
  .strict() satisfies ZodType<RunLeaseAuthorization>;

export const stateExecutionClaimScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimScope>;

export const stateExecutionClaimGuardSchema = z
  .object({
    claimId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimGuard>;

export const stateExecutionClaimSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    claimId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: positiveIntegerSchema,
    processRevision: nonEmptyStringSchema,
    expectedRunRevision: z.number().int().nonnegative(),
    fencingToken: positiveIntegerSchema,
    ownerId: nonEmptyStringSchema,
    status: z.enum(STATE_EXECUTION_CLAIM_STATUSES),
    acquiredAt: timestampSchema,
    expiresAt: timestampSchema,
    completedAt: timestampSchema.optional(),
    releasedAt: timestampSchema.optional(),
  })
  .strict()
  .superRefine((claim, context) => {
    if (Date.parse(claim.expiresAt) <= Date.parse(claim.acquiredAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'expiresAt must be later than acquiredAt',
      });
    }
    if (claim.status === 'completed' && claim.completedAt === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'completed claims require completedAt',
      });
    }
    if (claim.status === 'released' && claim.releasedAt === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['releasedAt'],
        message: 'released claims require releasedAt',
      });
    }
  }) satisfies ZodType<StateExecutionClaim>;

export const stateExecutionClaimAcquireRequestSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: positiveIntegerSchema,
    requestedClaimId: nonEmptyStringSchema,
    processRevision: nonEmptyStringSchema,
    expectedRunRevision: z.number().int().nonnegative(),
    runLease: runLeaseAuthorizationSchema,
    ttlMs: positiveIntegerSchema,
    acquiredAt: timestampSchema,
    idempotencyKey: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimAcquireRequest>;

export const stateExecutionClaimRenewRequestSchema = z
  .object({
    scope: stateExecutionClaimScopeSchema,
    guard: stateExecutionClaimGuardSchema,
    runLease: runLeaseAuthorizationSchema,
    ttlMs: positiveIntegerSchema,
    renewedAt: timestampSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimRenewRequest>;

export const stateExecutionClaimCompleteRequestSchema = z
  .object({
    scope: stateExecutionClaimScopeSchema,
    guard: stateExecutionClaimGuardSchema,
    runLease: runLeaseAuthorizationSchema,
    completedAt: timestampSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimCompleteRequest>;

export const stateExecutionClaimReleaseRequestSchema = z
  .object({
    scope: stateExecutionClaimScopeSchema,
    guard: stateExecutionClaimGuardSchema,
    runLease: runLeaseAuthorizationSchema,
    releasedAt: timestampSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimReleaseRequest>;

export const stateExecutionClaimAssertionRequestSchema = z
  .object({
    scope: stateExecutionClaimScopeSchema,
    guard: stateExecutionClaimGuardSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<StateExecutionClaimAssertionRequest>;

export const runtimeResourceTypeSchema = z.enum(RUNTIME_RESOURCE_TYPES);
export const runtimeResourceClaimModeSchema = z.enum(RUNTIME_RESOURCE_CLAIM_MODES);

export const runtimeResourceClaimSchema = z
  .object({
    id: nonEmptyStringSchema,
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    resourceType: runtimeResourceTypeSchema,
    resourceKey: nonEmptyStringSchema,
    mode: runtimeResourceClaimModeSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema.optional(),
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
    runFencingToken: positiveIntegerSchema,
    acquiredAt: timestampSchema,
    expiresAt: timestampSchema,
    metadata: z.record(jsonValueSchema).optional(),
  })
  .strict()
  .superRefine((claim, context) => {
    if (Date.parse(claim.expiresAt) <= Date.parse(claim.acquiredAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'expiresAt must be later than acquiredAt',
      });
    }
  }) satisfies ZodType<RuntimeResourceClaim>;

const runtimeResourceRequestSchema = z
  .object({
    requestedClaimId: nonEmptyStringSchema,
    resourceType: runtimeResourceTypeSchema,
    resourceKey: nonEmptyStringSchema,
    mode: runtimeResourceClaimModeSchema,
    metadata: z.record(jsonValueSchema).optional(),
  })
  .strict();

export const resourceAcquireRequestSchema = z
  .object({
    runLease: runLeaseAuthorizationSchema,
    stateId: nonEmptyStringSchema.optional(),
    resources: z.array(runtimeResourceRequestSchema).min(1),
    ttlMs: positiveIntegerSchema,
    acquiredAt: timestampSchema,
    idempotencyKey: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<ResourceAcquireRequest>;

export const resourceRenewRequestSchema = z
  .object({
    runLease: runLeaseAuthorizationSchema,
    claimIds: z.array(nonEmptyStringSchema).min(1),
    ttlMs: positiveIntegerSchema,
    renewedAt: timestampSchema,
  })
  .strict() satisfies ZodType<ResourceRenewRequest>;

export const resourceReleaseRequestSchema = z
  .object({
    runLease: runLeaseAuthorizationSchema,
    claimIds: z.array(nonEmptyStringSchema).min(1),
    releasedAt: timestampSchema,
  })
  .strict() satisfies ZodType<ResourceReleaseRequest>;

export const resourceListRequestSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    resourceType: runtimeResourceTypeSchema,
    resourceKey: nonEmptyStringSchema,
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<ResourceListRequest>;

export const resourceClaimAssertionRequestSchema = resourceListRequestSchema
  .extend({
    claimId: nonEmptyStringSchema,
    ownerId: nonEmptyStringSchema,
    fencingToken: positiveIntegerSchema,
  })
  .strict() satisfies ZodType<ResourceClaimAssertionRequest>;

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

export const stateExecutionClaimJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'userId',
    'claimId',
    'runId',
    'stateId',
    'stateAttempt',
    'processRevision',
    'expectedRunRevision',
    'fencingToken',
    'ownerId',
    'status',
    'acquiredAt',
    'expiresAt',
  ],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    claimId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    stateAttempt: positiveIntegerJsonSchema,
    processRevision: nonEmptyStringJsonSchema,
    expectedRunRevision: { type: 'integer', minimum: 0 },
    fencingToken: positiveIntegerJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    status: { type: 'string', enum: [...STATE_EXECUTION_CLAIM_STATUSES] },
    acquiredAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    completedAt: timestampJsonSchema,
    releasedAt: timestampJsonSchema,
  },
  allOf: [
    {
      if: { properties: { status: { const: 'completed' } }, required: ['status'] },
      then: {
        properties: { completedAt: timestampJsonSchema },
        required: ['completedAt'],
      },
    },
    {
      if: { properties: { status: { const: 'released' } }, required: ['status'] },
      then: {
        properties: { releasedAt: timestampJsonSchema },
        required: ['releasedAt'],
      },
    },
  ],
  additionalProperties: false,
};

export const runtimeResourceClaimJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'userId',
    'resourceType',
    'resourceKey',
    'mode',
    'runId',
    'ownerId',
    'fencingToken',
    'runFencingToken',
    'acquiredAt',
    'expiresAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    resourceType: { type: 'string', enum: [...RUNTIME_RESOURCE_TYPES] },
    resourceKey: nonEmptyStringJsonSchema,
    mode: { type: 'string', enum: [...RUNTIME_RESOURCE_CLAIM_MODES] },
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
    runFencingToken: positiveIntegerJsonSchema,
    acquiredAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    metadata: { type: 'object', additionalProperties: {} },
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

export const stateExecutionClaimExample: StateExecutionClaim = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  claimId: 'claim.state.example.1',
  runId: 'run.example',
  stateId: 'state.plan',
  stateAttempt: 1,
  processRevision: 'process.example@1.0.0',
  expectedRunRevision: 3,
  fencingToken: 1,
  ownerId: 'runtime-worker.example',
  status: 'claimed',
  acquiredAt: '2026-07-18T06:00:01.000Z',
  expiresAt: '2026-07-18T06:00:20.000Z',
};

export const runtimeResourceClaimExample: RuntimeResourceClaim = {
  id: 'claim.resource.example.1',
  tenantId: 'tenant.example',
  userId: 'user.example',
  resourceType: 'workspace',
  resourceKey: 'workspace:example',
  mode: 'exclusive',
  runId: 'run.example',
  stateId: 'state.plan',
  ownerId: 'runtime-worker.example',
  fencingToken: 1,
  runFencingToken: 1,
  acquiredAt: '2026-07-18T06:00:01.000Z',
  expiresAt: '2026-07-18T06:00:20.000Z',
  metadata: { purpose: 'state execution' },
};

export const fencedRunLeaseDefinition = defineSpecSchema<FencedRunLease>({
  id: 'FencedRunLease',
  zod: fencedRunLeaseSchema,
  jsonSchema: fencedRunLeaseJsonSchema,
  example: fencedRunLeaseExample,
});

export const stateExecutionClaimDefinition = defineSpecSchema<StateExecutionClaim>({
  id: 'StateExecutionClaim',
  zod: stateExecutionClaimSchema,
  jsonSchema: stateExecutionClaimJsonSchema,
  example: stateExecutionClaimExample,
});

export const runtimeResourceClaimDefinition = defineSpecSchema<RuntimeResourceClaim>({
  id: 'RuntimeResourceClaim',
  zod: runtimeResourceClaimSchema,
  jsonSchema: runtimeResourceClaimJsonSchema,
  example: runtimeResourceClaimExample,
});

export const runtimeCoordinationContractDefinitions = [
  fencedRunLeaseDefinition,
  stateExecutionClaimDefinition,
  runtimeResourceClaimDefinition,
] as const;
export const runtimeCoordinationContractJsonSchemas = exportSpecJsonSchemas(
  runtimeCoordinationContractDefinitions
);

export function validateFencedRunLease(input: unknown): FencedRunLease {
  return fencedRunLeaseDefinition.parse(input);
}

export function validateRunLeaseAcquireRequest(input: unknown): RunLeaseAcquireRequest {
  return runLeaseAcquireRequestSchema.parse(input);
}

export function validateRunLeasePreemptRequest(input: unknown): RunLeasePreemptRequest {
  return runLeasePreemptRequestSchema.parse(input);
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

export function validateStateExecutionClaim(input: unknown): StateExecutionClaim {
  return stateExecutionClaimDefinition.parse(input);
}

export function validateStateExecutionClaimAcquireRequest(
  input: unknown
): StateExecutionClaimAcquireRequest {
  return stateExecutionClaimAcquireRequestSchema.parse(input);
}

export function validateStateExecutionClaimRenewRequest(
  input: unknown
): StateExecutionClaimRenewRequest {
  return stateExecutionClaimRenewRequestSchema.parse(input);
}

export function validateStateExecutionClaimCompleteRequest(
  input: unknown
): StateExecutionClaimCompleteRequest {
  return stateExecutionClaimCompleteRequestSchema.parse(input);
}

export function validateStateExecutionClaimReleaseRequest(
  input: unknown
): StateExecutionClaimReleaseRequest {
  return stateExecutionClaimReleaseRequestSchema.parse(input);
}

export function validateStateExecutionClaimAssertionRequest(
  input: unknown
): StateExecutionClaimAssertionRequest {
  return stateExecutionClaimAssertionRequestSchema.parse(input);
}

export function validateRuntimeResourceClaim(input: unknown): RuntimeResourceClaim {
  return runtimeResourceClaimDefinition.parse(input);
}

export function validateResourceAcquireRequest(input: unknown): ResourceAcquireRequest {
  return resourceAcquireRequestSchema.parse(input);
}

export function validateResourceRenewRequest(input: unknown): ResourceRenewRequest {
  return resourceRenewRequestSchema.parse(input);
}

export function validateResourceReleaseRequest(input: unknown): ResourceReleaseRequest {
  return resourceReleaseRequestSchema.parse(input);
}

export function validateResourceListRequest(input: unknown): ResourceListRequest {
  return resourceListRequestSchema.parse(input);
}

export function validateResourceClaimAssertionRequest(
  input: unknown
): ResourceClaimAssertionRequest {
  return resourceClaimAssertionRequestSchema.parse(input);
}
