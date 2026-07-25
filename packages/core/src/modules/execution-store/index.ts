import { z, type ZodType } from 'zod';
import type {
  ExecutionIdempotencyQuery,
  ExecutionIdempotencyResolution,
  ExecutionLease,
  ExecutionLeaseAcquireRequest,
  ExecutionLeaseGuard,
  ExecutionLeaseReleaseRequest,
  ExecutionLeaseRenewRequest,
  ExecutionRecord,
  ExecutionRecordCreateRequest,
  ExecutionRecordCompareAndSetRequest,
  ExecutionRecordPage,
  ExecutionRecordQuery,
  ExecutionRecoveryAssessment,
  ExecutionRecoveryDisposition,
} from '../../contracts/execution-store';
import type { JsonSchema } from '../../specs';
import {
  commandExecutionRequestJsonSchema,
  commandExecutionRequestSchema,
  commandExecutionResultJsonSchema,
  commandExecutionResultSchema,
  commandExecutionStatusSchema,
} from '../command-execution';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });

export const executionLeaseSchema = z
  .object({
    id: nonEmptyString,
    executionId: nonEmptyString,
    ownerId: nonEmptyString,
    fencingToken: positiveInteger,
    acquiredAt: timestampSchema,
    expiresAt: timestampSchema,
    heartbeatAt: timestampSchema,
  })
  .strict()
  .superRefine((value, context) => {
    const acquiredAt = Date.parse(value.acquiredAt);
    const heartbeatAt = Date.parse(value.heartbeatAt);
    const expiresAt = Date.parse(value.expiresAt);
    if (heartbeatAt < acquiredAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['heartbeatAt'],
        message: 'must not be earlier than acquiredAt',
      });
    }
    if (expiresAt <= heartbeatAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'must be later than heartbeatAt',
      });
    }
  }) satisfies ZodType<ExecutionLease>;

const terminalStatuses = [
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
] as const;

export const executionRecordSchema = z
  .object({
    id: nonEmptyString,
    revision: nonNegativeInteger,
    request: commandExecutionRequestSchema,
    status: commandExecutionStatusSchema,
    providerId: nonEmptyString,
    providerExecutionRef: nonEmptyString.optional(),
    sandboxId: nonEmptyString.optional(),
    attempt: nonNegativeInteger,
    idempotencyFingerprint: nonEmptyString.optional(),
    result: commandExecutionResultSchema.optional(),
    lease: executionLeaseSchema.optional(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.request.executionId && value.request.executionId !== value.id) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['request', 'executionId'],
        message: 'must match the record id',
      });
    }
    if (value.lease && value.lease.executionId !== value.id) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['lease', 'executionId'],
        message: 'must match the record id',
      });
    }
    if (value.result) {
      if (value.result.executionId !== value.id) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['result', 'executionId'],
          message: 'must match the record id',
        });
      }
      if (value.result.status !== value.status) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['result', 'status'],
          message: 'must match the record status',
        });
      }
      if (value.sandboxId && value.result.sandboxId !== value.sandboxId) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['result', 'sandboxId'],
          message: 'must match the record sandboxId',
        });
      }
    }
    if (
      terminalStatuses.includes(value.status as (typeof terminalStatuses)[number]) &&
      !value.result
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['result'],
        message: 'is required after the record reaches a terminal status',
      });
    }
    if (value.idempotencyFingerprint && !value.request.idempotencyKey) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['idempotencyFingerprint'],
        message: 'requires request.idempotencyKey',
      });
    }
    if (Date.parse(value.updatedAt) < Date.parse(value.createdAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['updatedAt'],
        message: 'must not be earlier than createdAt',
      });
    }
  }) satisfies ZodType<ExecutionRecord>;

export const executionLeaseGuardSchema = z
  .object({
    leaseId: nonEmptyString,
    ownerId: nonEmptyString,
    fencingToken: positiveInteger,
  })
  .strict() satisfies ZodType<ExecutionLeaseGuard>;

export const executionRecordCreateRequestSchema = z
  .object({
    operationId: nonEmptyString,
    record: executionRecordSchema,
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.record.revision !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['record', 'revision'],
        message: 'must be zero when creating an Execution record',
      });
    }
    if (value.record.status !== 'queued') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['record', 'status'],
        message: 'must be queued when creating an Execution record',
      });
    }
    if (value.record.attempt !== 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['record', 'attempt'],
        message: 'must be zero before the first execution attempt',
      });
    }
    if (value.record.lease || value.record.result || value.record.providerExecutionRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['record'],
        message: 'must not contain lease, result, or Provider execution state at creation',
      });
    }
    if (value.record.createdAt !== value.record.updatedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['record', 'updatedAt'],
        message: 'must equal createdAt for a new Execution record',
      });
    }
  }) satisfies ZodType<ExecutionRecordCreateRequest>;

export const executionRecordCompareAndSetRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    leaseGuard: executionLeaseGuardSchema.optional(),
    next: executionRecordSchema,
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.next.id !== value.executionId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['next', 'id'],
        message: 'must match executionId',
      });
    }
    if (value.next.revision !== value.expectedRevision + 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['next', 'revision'],
        message: 'must increment expectedRevision by exactly one',
      });
    }
    if (value.next.lease && !value.leaseGuard) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['leaseGuard'],
        message: 'is required when updating a leased record',
      });
    }
    if (value.next.lease && value.leaseGuard) {
      const matches =
        value.next.lease.id === value.leaseGuard.leaseId &&
        value.next.lease.ownerId === value.leaseGuard.ownerId &&
        value.next.lease.fencingToken === value.leaseGuard.fencingToken;
      if (!matches) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseGuard'],
          message: 'must match the current lease and fencing token',
        });
      }
    }
  }) satisfies ZodType<ExecutionRecordCompareAndSetRequest>;

export const executionLeaseAcquireRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    requestedLeaseId: nonEmptyString,
    ownerId: nonEmptyString,
    ttlMs: positiveInteger,
    acquiredAt: timestampSchema,
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionLeaseAcquireRequest>;

export const executionLeaseRenewRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    leaseGuard: executionLeaseGuardSchema,
    ttlMs: positiveInteger,
    heartbeatAt: timestampSchema,
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionLeaseRenewRequest>;

export const executionLeaseReleaseRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    leaseGuard: executionLeaseGuardSchema,
    releasedAt: timestampSchema,
    reason: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionLeaseReleaseRequest>;

export const executionRecordQuerySchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString.optional(),
    workspaceId: nonEmptyString.optional(),
    runId: nonEmptyString.optional(),
    providerId: nonEmptyString.optional(),
    statuses: z.array(commandExecutionStatusSchema).optional(),
    leaseExpiresBefore: timestampSchema.optional(),
    updatedBefore: timestampSchema.optional(),
    limit: positiveInteger.optional(),
    cursor: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.statuses && new Set(value.statuses).size !== value.statuses.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['statuses'],
        message: 'must not contain duplicate statuses',
      });
    }
  }) satisfies ZodType<ExecutionRecordQuery>;

export const executionRecordPageSchema = z
  .object({
    records: z.array(executionRecordSchema),
    cursor: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ExecutionRecordPage>;

export const executionIdempotencyQuerySchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString,
    idempotencyKey: nonEmptyString,
    fingerprint: nonEmptyString,
  })
  .strict() satisfies ZodType<ExecutionIdempotencyQuery>;

export const executionIdempotencyResolutionSchema = z.discriminatedUnion('status', [
  z.object({ status: z.literal('miss') }).strict(),
  z.object({ status: z.literal('match'), record: executionRecordSchema }).strict(),
  z
    .object({
      status: z.literal('conflict'),
      recordId: nonEmptyString,
      existingFingerprint: nonEmptyString,
    })
    .strict(),
]) satisfies ZodType<ExecutionIdempotencyResolution>;

export const executionRecoveryDispositionSchema = z.enum([
  'not_started',
  'provider_queryable',
  'provider_completed_result_missing',
  'provider_state_unknown',
]) satisfies ZodType<ExecutionRecoveryDisposition>;

export const executionRecoveryAssessmentSchema = z
  .object({
    executionId: nonEmptyString,
    recordRevision: nonNegativeInteger,
    disposition: executionRecoveryDispositionSchema,
    assessedAt: timestampSchema,
    providerStatusRef: nonEmptyString.optional(),
    reason: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (
      ['provider_queryable', 'provider_completed_result_missing'].includes(value.disposition) &&
      !value.providerStatusRef
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['providerStatusRef'],
        message: 'is required when recovery depends on Provider status',
      });
    }
    if (value.disposition === 'provider_state_unknown' && !value.reason) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reason'],
        message: 'is required when Provider state is unknown',
      });
    }
    if (value.disposition === 'not_started' && value.providerStatusRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['providerStatusRef'],
        message: 'must not be set before Provider execution starts',
      });
    }
  }) satisfies ZodType<ExecutionRecoveryAssessment>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const executionLeaseJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'executionId',
    'ownerId',
    'fencingToken',
    'acquiredAt',
    'expiresAt',
    'heartbeatAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
    acquiredAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    heartbeatAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const executionRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'request',
    'status',
    'providerId',
    'attempt',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    revision: nonNegativeIntegerJsonSchema,
    request: commandExecutionRequestJsonSchema,
    status: { enum: commandExecutionStatusSchema.options },
    providerId: nonEmptyStringJsonSchema,
    providerExecutionRef: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    attempt: nonNegativeIntegerJsonSchema,
    idempotencyFingerprint: nonEmptyStringJsonSchema,
    result: commandExecutionResultJsonSchema,
    lease: executionLeaseJsonSchema,
    createdAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
  },
  allOf: [
    {
      if: {
        properties: { status: { enum: [...terminalStatuses] } },
        required: ['status'],
      },
      then: { required: ['result'] },
    },
    {
      if: { required: ['idempotencyFingerprint'] },
      then: {
        properties: { request: { required: ['idempotencyKey'] } },
      },
    },
  ],
  additionalProperties: false,
};

export const executionLeaseGuardJsonSchema: JsonSchema = {
  type: 'object',
  required: ['leaseId', 'ownerId', 'fencingToken'],
  properties: {
    leaseId: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    fencingToken: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const executionRecordCreateRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'record'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    record: {
      ...executionRecordJsonSchema,
      properties: {
        ...executionRecordJsonSchema.properties,
        revision: { const: 0 },
        status: { const: 'queued' },
        attempt: { const: 0 },
      },
      not: {
        anyOf: [
          { required: ['lease'] },
          { required: ['result'] },
          { required: ['providerExecutionRef'] },
        ],
      },
    },
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionRecordCompareAndSetRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'executionId', 'expectedRevision', 'next'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    leaseGuard: executionLeaseGuardJsonSchema,
    next: executionRecordJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionLeaseAcquireRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'operationId',
    'executionId',
    'expectedRevision',
    'requestedLeaseId',
    'ownerId',
    'ttlMs',
    'acquiredAt',
  ],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    requestedLeaseId: nonEmptyStringJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    ttlMs: positiveIntegerJsonSchema,
    acquiredAt: timestampJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionLeaseRenewRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'operationId',
    'executionId',
    'expectedRevision',
    'leaseGuard',
    'ttlMs',
    'heartbeatAt',
  ],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    leaseGuard: executionLeaseGuardJsonSchema,
    ttlMs: positiveIntegerJsonSchema,
    heartbeatAt: timestampJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionLeaseReleaseRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'executionId', 'expectedRevision', 'leaseGuard', 'releasedAt'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    leaseGuard: executionLeaseGuardJsonSchema,
    releasedAt: timestampJsonSchema,
    reason: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionRecordQueryJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    statuses: {
      type: 'array',
      items: { enum: commandExecutionStatusSchema.options },
      uniqueItems: true,
    },
    leaseExpiresBefore: timestampJsonSchema,
    updatedBefore: timestampJsonSchema,
    limit: positiveIntegerJsonSchema,
    cursor: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionRecordPageJsonSchema: JsonSchema = {
  type: 'object',
  required: ['records'],
  properties: {
    records: { type: 'array', items: executionRecordJsonSchema },
    cursor: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionIdempotencyQueryJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'workspaceId', 'idempotencyKey', 'fingerprint'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    fingerprint: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionIdempotencyResolutionJsonSchema: JsonSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['status'],
      properties: { status: { const: 'miss' } },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['status', 'record'],
      properties: { status: { const: 'match' }, record: executionRecordJsonSchema },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['status', 'recordId', 'existingFingerprint'],
      properties: {
        status: { const: 'conflict' },
        recordId: nonEmptyStringJsonSchema,
        existingFingerprint: nonEmptyStringJsonSchema,
      },
      additionalProperties: false,
    },
  ],
};

export const executionRecoveryAssessmentJsonSchema: JsonSchema = {
  type: 'object',
  required: ['executionId', 'recordRevision', 'disposition', 'assessedAt'],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    recordRevision: nonNegativeIntegerJsonSchema,
    disposition: {
      enum: [
        'not_started',
        'provider_queryable',
        'provider_completed_result_missing',
        'provider_state_unknown',
      ],
    },
    assessedAt: timestampJsonSchema,
    providerStatusRef: nonEmptyStringJsonSchema,
    reason: nonEmptyStringJsonSchema,
  },
  allOf: [
    {
      if: {
        properties: {
          disposition: {
            enum: ['provider_queryable', 'provider_completed_result_missing'],
          },
        },
        required: ['disposition'],
      },
      then: { required: ['providerStatusRef'] },
    },
    {
      if: {
        properties: { disposition: { const: 'provider_state_unknown' } },
        required: ['disposition'],
      },
      then: { required: ['reason'] },
    },
  ],
  additionalProperties: false,
};

export const executionStoreJsonSchemas: Record<string, JsonSchema> = {
  ExecutionLease: executionLeaseJsonSchema,
  ExecutionRecord: executionRecordJsonSchema,
  ExecutionLeaseGuard: executionLeaseGuardJsonSchema,
  ExecutionRecordCreateRequest: executionRecordCreateRequestJsonSchema,
  ExecutionRecordCompareAndSetRequest: executionRecordCompareAndSetRequestJsonSchema,
  ExecutionLeaseAcquireRequest: executionLeaseAcquireRequestJsonSchema,
  ExecutionLeaseRenewRequest: executionLeaseRenewRequestJsonSchema,
  ExecutionLeaseReleaseRequest: executionLeaseReleaseRequestJsonSchema,
  ExecutionRecordQuery: executionRecordQueryJsonSchema,
  ExecutionRecordPage: executionRecordPageJsonSchema,
  ExecutionIdempotencyQuery: executionIdempotencyQueryJsonSchema,
  ExecutionIdempotencyResolution: executionIdempotencyResolutionJsonSchema,
  ExecutionRecoveryAssessment: executionRecoveryAssessmentJsonSchema,
};

export const executionLeaseExample: ExecutionLease = {
  id: 'lease.execution.example.1',
  executionId: 'execution.example',
  ownerId: 'runtime-worker.example',
  fencingToken: 1,
  acquiredAt: '2026-07-16T00:00:00.000Z',
  heartbeatAt: '2026-07-16T00:00:01.000Z',
  expiresAt: '2026-07-16T00:00:31.000Z',
};

export const executionRecordExample: ExecutionRecord = {
  id: 'execution.example',
  revision: 1,
  request: {
    executionId: 'execution.example',
    operationId: 'operation.command.example',
    principal: {
      principalId: 'agent.example',
      type: 'agent',
      userId: 'user.example',
      agentId: 'agent.example',
      permissionScopes: ['execution:command:run'],
    },
    userId: 'user.example',
    workspaceId: 'workspace.example',
    runId: 'run.example',
    environmentRef: { id: 'execution-environment.mock.safe', version: '0.1.0' },
    executable: 'node',
    args: ['scripts/check.mjs'],
    cwd: 'working',
    shell: false,
    idempotencyKey: 'command:run.example:step.example',
  },
  status: 'starting',
  providerId: 'provider.mock',
  sandboxId: 'sandbox.example',
  attempt: 1,
  idempotencyFingerprint: 'sha256:command-fingerprint',
  lease: executionLeaseExample,
  createdAt: '2026-07-16T00:00:00.000Z',
  updatedAt: '2026-07-16T00:00:01.000Z',
};

export const executionLeaseGuardExample: ExecutionLeaseGuard = {
  leaseId: executionLeaseExample.id,
  ownerId: executionLeaseExample.ownerId,
  fencingToken: executionLeaseExample.fencingToken,
};

export const executionRecordCreateRequestExample: ExecutionRecordCreateRequest = {
  operationId: 'operation.execution.create.example',
  record: {
    ...executionRecordExample,
    revision: 0,
    status: 'queued',
    attempt: 0,
    lease: undefined,
    createdAt: '2026-07-16T00:00:00.000Z',
    updatedAt: '2026-07-16T00:00:00.000Z',
  },
  idempotencyKey: 'execution-create:execution.example',
};

export const executionRecordCompareAndSetRequestExample: ExecutionRecordCompareAndSetRequest = {
  operationId: 'operation.execution.update.example',
  executionId: 'execution.example',
  expectedRevision: 1,
  leaseGuard: executionLeaseGuardExample,
  next: {
    ...executionRecordExample,
    revision: 2,
    status: 'running',
    updatedAt: '2026-07-16T00:00:02.000Z',
  },
  idempotencyKey: 'execution-update:execution.example:2',
};

export const executionLeaseAcquireRequestExample: ExecutionLeaseAcquireRequest = {
  operationId: 'operation.lease.acquire.example',
  executionId: 'execution.example',
  expectedRevision: 0,
  requestedLeaseId: 'lease.execution.example.1',
  ownerId: 'runtime-worker.example',
  ttlMs: 30_000,
  acquiredAt: '2026-07-16T00:00:00.000Z',
  idempotencyKey: 'lease-acquire:execution.example:1',
};

export const executionLeaseRenewRequestExample: ExecutionLeaseRenewRequest = {
  operationId: 'operation.lease.renew.example',
  executionId: 'execution.example',
  expectedRevision: 1,
  leaseGuard: executionLeaseGuardExample,
  ttlMs: 30_000,
  heartbeatAt: '2026-07-16T00:00:10.000Z',
  idempotencyKey: 'lease-renew:execution.example:1:10',
};

export const executionLeaseReleaseRequestExample: ExecutionLeaseReleaseRequest = {
  operationId: 'operation.lease.release.example',
  executionId: 'execution.example',
  expectedRevision: 2,
  leaseGuard: executionLeaseGuardExample,
  releasedAt: '2026-07-16T00:00:20.000Z',
  reason: 'execution completed',
  idempotencyKey: 'lease-release:execution.example:1',
};

export const executionRecoveryAssessmentExample: ExecutionRecoveryAssessment = {
  executionId: 'execution.example',
  recordRevision: 2,
  disposition: 'provider_queryable',
  assessedAt: '2026-07-16T00:01:00.000Z',
  providerStatusRef: 'provider-status:execution.example',
};

export function validateExecutionLease(input: unknown): ExecutionLease {
  return executionLeaseSchema.parse(input);
}

export function validateExecutionRecord(input: unknown): ExecutionRecord {
  return executionRecordSchema.parse(input);
}

export function validateExecutionRecordCompareAndSetRequest(
  input: unknown
): ExecutionRecordCompareAndSetRequest {
  return executionRecordCompareAndSetRequestSchema.parse(input);
}

export function validateExecutionRecordCreateRequest(input: unknown): ExecutionRecordCreateRequest {
  return executionRecordCreateRequestSchema.parse(input);
}

export function validateExecutionLeaseAcquireRequest(input: unknown): ExecutionLeaseAcquireRequest {
  return executionLeaseAcquireRequestSchema.parse(input);
}

export function validateExecutionLeaseRenewRequest(input: unknown): ExecutionLeaseRenewRequest {
  return executionLeaseRenewRequestSchema.parse(input);
}

export function validateExecutionLeaseReleaseRequest(input: unknown): ExecutionLeaseReleaseRequest {
  return executionLeaseReleaseRequestSchema.parse(input);
}

export function validateExecutionRecordQuery(input: unknown): ExecutionRecordQuery {
  return executionRecordQuerySchema.parse(input);
}

export function validateExecutionIdempotencyQuery(input: unknown): ExecutionIdempotencyQuery {
  return executionIdempotencyQuerySchema.parse(input);
}

export function validateExecutionIdempotencyResolution(
  input: unknown
): ExecutionIdempotencyResolution {
  return executionIdempotencyResolutionSchema.parse(input);
}

export function validateExecutionRecoveryAssessment(input: unknown): ExecutionRecoveryAssessment {
  return executionRecoveryAssessmentSchema.parse(input);
}
