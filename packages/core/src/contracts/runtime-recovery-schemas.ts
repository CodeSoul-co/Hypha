import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import { fencedRunLeaseJsonSchema, fencedRunLeaseSchema } from './runtime-coordination-schemas';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
} from './runtime-projection-schemas';
import {
  RUNTIME_ACTIVITY_RECONCILIATION_STATUSES,
  RUNTIME_ACTIVITY_COMPENSATION_STATUSES,
  RUNTIME_RECOVERY_CANDIDATE_REASONS,
  RUNTIME_RECOVERY_DISPOSITIONS,
  RUNTIME_RECOVERY_SAFE_ACTIONS,
  type RuntimeActivityCompensationResult,
  type RuntimeActivityReconciliationResult,
  type RuntimeRecoveryCandidate,
  type RuntimeRecoveryCommand,
  type RuntimeRecoveryResult,
  type RuntimeRecoveryScanRequest,
  type RuntimeRecoveryScanResult,
} from './runtime-recovery';
import {
  runtimeActivityObservationJsonSchema,
  runtimeActivityObservationSchema,
} from './runtime-activity-schemas';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const recoveryScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
  })
  .strict();

export const runtimeRecoveryCandidateSchema = z
  .object({
    candidateId: nonEmptyStringSchema,
    scope: recoveryScopeSchema,
    reason: z.enum(RUNTIME_RECOVERY_CANDIDATE_REASONS),
    safeAction: z.enum(RUNTIME_RECOVERY_SAFE_ACTIONS),
    eventHeadSequence: z.number().int().nonnegative(),
    projectionSequence: z.number().int().nonnegative().optional(),
    activityId: nonEmptyStringSchema.optional(),
    redispatchRequestEventId: nonEmptyStringSchema.optional(),
    stateId: nonEmptyStringSchema.optional(),
    stateAttempt: z.number().int().positive().optional(),
    currentLease: fencedRunLeaseSchema.optional(),
    detectedAt: timestampSchema,
  })
  .strict()
  .superRefine((candidate, context) => {
    if (
      [
        'ACTIVITY_RESULT_UNAPPLIED',
        'ACTIVITY_COMPENSATION_REQUIRED',
        'ACTIVITY_REDISPATCH_INCOMPLETE',
      ].includes(candidate.reason) &&
      !candidate.activityId
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activityId'],
        message: 'Activity recovery candidates require activityId',
      });
    }
    if (
      candidate.reason === 'ACTIVITY_REDISPATCH_INCOMPLETE' &&
      !candidate.redispatchRequestEventId
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['redispatchRequestEventId'],
        message: 'Incomplete Activity redispatch candidates require redispatchRequestEventId',
      });
    }
    if (
      candidate.reason === 'STATE_CLAIM_EXPIRED' &&
      (!candidate.stateId || candidate.stateAttempt === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: candidate.stateId ? ['stateAttempt'] : ['stateId'],
        message: 'Expired State Claim candidates require stateId and stateAttempt',
      });
    }
  }) satisfies ZodType<RuntimeRecoveryCandidate>;

export const runtimeRecoveryScanRequestSchema = z
  .object({
    checkedAt: timestampSchema,
    limit: z.number().int().positive().max(1000),
    cursor: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeRecoveryScanRequest>;

export const runtimeRecoveryScanResultSchema = z
  .object({
    candidates: z.array(runtimeRecoveryCandidateSchema),
    scannedStreams: z.number().int().nonnegative(),
    nextCursor: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeRecoveryScanResult>;

export const runtimeRecoveryCommandSchema = z
  .object({
    candidate: runtimeRecoveryCandidateSchema,
    ownerId: nonEmptyStringSchema,
    leaseTtlMs: z.number().int().positive(),
    requestedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeRecoveryCommand>;

export const runtimeRecoveryResultSchema = z
  .object({
    candidateId: nonEmptyStringSchema,
    disposition: z.enum(RUNTIME_RECOVERY_DISPOSITIONS),
    eventIds: z.array(nonEmptyStringSchema),
    projection: runtimeOrchestrationProjectionSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeRecoveryResult>;

export const runtimeActivityReconciliationResultSchema = z
  .object({
    activityId: nonEmptyStringSchema,
    status: z.enum(RUNTIME_ACTIVITY_RECONCILIATION_STATUSES),
    observation: runtimeActivityObservationSchema.optional(),
    providerRevision: nonEmptyStringSchema.optional(),
    receiptId: nonEmptyStringSchema.optional(),
  })
  .strict()
  .superRefine((result, context) => {
    if (
      ['completed', 'failed', 'waiting', 'cancelled'].includes(result.status) &&
      result.observation === undefined
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['observation'],
        message: `${result.status} reconciliation requires an observation`,
      });
    }
    if (result.observation && result.observation.status !== result.status) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['observation', 'status'],
        message: 'Reconciliation and observation statuses must match',
      });
    }
  }) satisfies ZodType<RuntimeActivityReconciliationResult>;

export const runtimeActivityCompensationResultSchema = z
  .object({
    activityId: nonEmptyStringSchema,
    status: z.enum(RUNTIME_ACTIVITY_COMPENSATION_STATUSES),
    providerRevision: nonEmptyStringSchema.optional(),
    receiptId: nonEmptyStringSchema.optional(),
    errorCode: nonEmptyStringSchema.optional(),
  })
  .strict()
  .superRefine((result, context) => {
    if (result.status === 'completed' && !result.receiptId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['receiptId'],
        message: 'Completed compensation requires receiptId',
      });
    }
    if (result.status === 'failed' && !result.errorCode) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['errorCode'],
        message: 'Failed compensation requires errorCode',
      });
    }
  }) satisfies ZodType<RuntimeActivityCompensationResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const recoveryScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'runId'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeRecoveryCandidateJsonSchema: JsonSchema = {
  type: 'object',
  required: ['candidateId', 'scope', 'reason', 'safeAction', 'eventHeadSequence', 'detectedAt'],
  properties: {
    candidateId: nonEmptyStringJsonSchema,
    scope: recoveryScopeJsonSchema,
    reason: { type: 'string', enum: [...RUNTIME_RECOVERY_CANDIDATE_REASONS] },
    safeAction: { type: 'string', enum: [...RUNTIME_RECOVERY_SAFE_ACTIONS] },
    eventHeadSequence: { type: 'integer', minimum: 0 },
    projectionSequence: { type: 'integer', minimum: 0 },
    activityId: nonEmptyStringJsonSchema,
    redispatchRequestEventId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    stateAttempt: { type: 'integer', minimum: 1 },
    currentLease: fencedRunLeaseJsonSchema,
    detectedAt: { type: 'string', format: 'date-time' },
  },
  allOf: [
    {
      if: {
        properties: {
          reason: {
            enum: [
              'ACTIVITY_RESULT_UNAPPLIED',
              'ACTIVITY_COMPENSATION_REQUIRED',
              'ACTIVITY_REDISPATCH_INCOMPLETE',
            ],
          },
        },
        required: ['reason'],
      },
      then: {
        required: ['activityId'],
        properties: { activityId: nonEmptyStringJsonSchema },
      },
    },
    {
      if: {
        properties: { reason: { const: 'ACTIVITY_REDISPATCH_INCOMPLETE' } },
        required: ['reason'],
      },
      then: {
        required: ['redispatchRequestEventId'],
        properties: { redispatchRequestEventId: nonEmptyStringJsonSchema },
      },
    },
    {
      if: {
        properties: { reason: { const: 'STATE_CLAIM_EXPIRED' } },
        required: ['reason'],
      },
      then: {
        required: ['stateId', 'stateAttempt'],
        properties: {
          stateId: nonEmptyStringJsonSchema,
          stateAttempt: { type: 'integer', minimum: 1 },
        },
      },
    },
  ],
  additionalProperties: false,
};
export const runtimeRecoveryScanRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['checkedAt', 'limit'],
  properties: {
    checkedAt: { type: 'string', format: 'date-time' },
    limit: { type: 'integer', minimum: 1, maximum: 1000 },
    cursor: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeRecoveryScanResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['candidates', 'scannedStreams'],
  properties: {
    candidates: { type: 'array', items: runtimeRecoveryCandidateJsonSchema },
    scannedStreams: { type: 'integer', minimum: 0 },
    nextCursor: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeRecoveryCommandJsonSchema: JsonSchema = {
  type: 'object',
  required: ['candidate', 'ownerId', 'leaseTtlMs', 'requestedAt'],
  properties: {
    candidate: runtimeRecoveryCandidateJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    leaseTtlMs: { type: 'integer', minimum: 1 },
    requestedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};
export const runtimeRecoveryResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['candidateId', 'disposition', 'eventIds'],
  properties: {
    candidateId: nonEmptyStringJsonSchema,
    disposition: { type: 'string', enum: [...RUNTIME_RECOVERY_DISPOSITIONS] },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    projection: runtimeOrchestrationProjectionJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeActivityReconciliationResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activityId', 'status'],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_ACTIVITY_RECONCILIATION_STATUSES] },
    observation: runtimeActivityObservationJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
    receiptId: nonEmptyStringJsonSchema,
  },
  allOf: [
    {
      if: {
        properties: {
          status: { enum: ['completed', 'failed', 'waiting', 'cancelled'] },
        },
        required: ['status'],
      },
      then: {
        required: ['observation'],
        properties: { observation: runtimeActivityObservationJsonSchema },
      },
    },
  ],
  additionalProperties: false,
};

export const runtimeRecoveryCandidateExample: RuntimeRecoveryCandidate = {
  candidateId: 'recovery:run.default:activity:activity.default:12',
  scope: { tenantId: 'tenant.default', userId: 'user.default', runId: 'run.default' },
  reason: 'ACTIVITY_RESULT_UNAPPLIED',
  safeAction: 'apply_observation',
  eventHeadSequence: 12,
  projectionSequence: 12,
  activityId: 'activity.default',
  detectedAt: '2026-07-18T12:00:00.000Z',
};
export const runtimeRecoveryScanRequestExample: RuntimeRecoveryScanRequest = {
  checkedAt: '2026-07-18T12:00:00.000Z',
  limit: 100,
};
export const runtimeRecoveryScanResultExample: RuntimeRecoveryScanResult = {
  candidates: [runtimeRecoveryCandidateExample],
  scannedStreams: 1,
};
export const runtimeRecoveryCommandExample: RuntimeRecoveryCommand = {
  candidate: runtimeRecoveryCandidateExample,
  ownerId: 'runtime-recovery.default',
  leaseTtlMs: 30_000,
  requestedAt: '2026-07-18T12:00:01.000Z',
};
export const runtimeRecoveryResultExample: RuntimeRecoveryResult = {
  candidateId: runtimeRecoveryCandidateExample.candidateId,
  disposition: 'recovered',
  eventIds: ['recovery.opened', 'activity.completed', 'recovery.resolved'],
};
export const runtimeActivityReconciliationResultExample: RuntimeActivityReconciliationResult = {
  activityId: 'activity.default',
  status: 'completed',
  observation: {
    activityId: 'activity.default',
    status: 'completed',
    eventIds: ['provider.event.default'],
    output: { recovered: true },
  },
  providerRevision: 'provider-revision.default',
  receiptId: 'receipt.default',
};
export const runtimeActivityCompensationResultExample: RuntimeActivityCompensationResult = {
  activityId: 'activity.default',
  status: 'completed',
  providerRevision: 'provider-revision.default',
  receiptId: 'compensation-receipt.default',
};

export const runtimeRecoveryCandidateDefinition = defineSpecSchema<RuntimeRecoveryCandidate>({
  id: 'RuntimeRecoveryCandidate',
  zod: runtimeRecoveryCandidateSchema,
  jsonSchema: runtimeRecoveryCandidateJsonSchema,
  example: runtimeRecoveryCandidateExample,
});
export const runtimeRecoveryScanRequestDefinition = defineSpecSchema<RuntimeRecoveryScanRequest>({
  id: 'RuntimeRecoveryScanRequest',
  zod: runtimeRecoveryScanRequestSchema,
  jsonSchema: runtimeRecoveryScanRequestJsonSchema,
  example: runtimeRecoveryScanRequestExample,
});
export const runtimeRecoveryScanResultDefinition = defineSpecSchema<RuntimeRecoveryScanResult>({
  id: 'RuntimeRecoveryScanResult',
  zod: runtimeRecoveryScanResultSchema,
  jsonSchema: runtimeRecoveryScanResultJsonSchema,
  example: runtimeRecoveryScanResultExample,
});
export const runtimeRecoveryCommandDefinition = defineSpecSchema<RuntimeRecoveryCommand>({
  id: 'RuntimeRecoveryCommand',
  zod: runtimeRecoveryCommandSchema,
  jsonSchema: runtimeRecoveryCommandJsonSchema,
  example: runtimeRecoveryCommandExample,
});
export const runtimeRecoveryResultDefinition = defineSpecSchema<RuntimeRecoveryResult>({
  id: 'RuntimeRecoveryResult',
  zod: runtimeRecoveryResultSchema,
  jsonSchema: runtimeRecoveryResultJsonSchema,
  example: runtimeRecoveryResultExample,
});
export const runtimeActivityReconciliationResultDefinition =
  defineSpecSchema<RuntimeActivityReconciliationResult>({
    id: 'RuntimeActivityReconciliationResult',
    zod: runtimeActivityReconciliationResultSchema,
    jsonSchema: runtimeActivityReconciliationResultJsonSchema,
    example: runtimeActivityReconciliationResultExample,
  });
export const runtimeActivityCompensationResultDefinition =
  defineSpecSchema<RuntimeActivityCompensationResult>({
    id: 'RuntimeActivityCompensationResult',
    zod: runtimeActivityCompensationResultSchema,
    jsonSchema: {
      type: 'object',
      required: ['activityId', 'status'],
      properties: {
        activityId: nonEmptyStringJsonSchema,
        status: { type: 'string', enum: [...RUNTIME_ACTIVITY_COMPENSATION_STATUSES] },
        providerRevision: nonEmptyStringJsonSchema,
        receiptId: nonEmptyStringJsonSchema,
        errorCode: nonEmptyStringJsonSchema,
      },
      additionalProperties: false,
    },
    example: runtimeActivityCompensationResultExample,
  });
export const runtimeRecoveryContractDefinitions = [
  runtimeRecoveryCandidateDefinition,
  runtimeRecoveryScanRequestDefinition,
  runtimeRecoveryScanResultDefinition,
  runtimeRecoveryCommandDefinition,
  runtimeRecoveryResultDefinition,
  runtimeActivityReconciliationResultDefinition,
  runtimeActivityCompensationResultDefinition,
] as const;
export const runtimeRecoveryContractJsonSchemas = exportSpecJsonSchemas(
  runtimeRecoveryContractDefinitions
);

export function validateRuntimeRecoveryCandidate(input: unknown): RuntimeRecoveryCandidate {
  return runtimeRecoveryCandidateDefinition.parse(input);
}
export function validateRuntimeRecoveryScanRequest(input: unknown): RuntimeRecoveryScanRequest {
  return runtimeRecoveryScanRequestDefinition.parse(input);
}
export function validateRuntimeRecoveryScanResult(input: unknown): RuntimeRecoveryScanResult {
  return runtimeRecoveryScanResultDefinition.parse(input);
}
export function validateRuntimeRecoveryCommand(input: unknown): RuntimeRecoveryCommand {
  return runtimeRecoveryCommandDefinition.parse(input);
}
export function validateRuntimeRecoveryResult(input: unknown): RuntimeRecoveryResult {
  return runtimeRecoveryResultDefinition.parse(input);
}
export function validateRuntimeActivityReconciliationResult(
  input: unknown
): RuntimeActivityReconciliationResult {
  return runtimeActivityReconciliationResultSchema.parse(input);
}

export function validateRuntimeActivityCompensationResult(
  input: unknown
): RuntimeActivityCompensationResult {
  return runtimeActivityCompensationResultSchema.parse(input);
}
