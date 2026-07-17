import { z, type ZodType } from 'zod';
import {
  FSM_INSTANCE_STATUSES,
  RUNTIME_ACTION_TYPES,
  RUNTIME_ACTIVITY_STATUSES,
  RUNTIME_ACTIVITY_TYPES,
  RUNTIME_ERROR_CODES,
  RUNTIME_PRINCIPAL_TYPES,
  RUNTIME_RUN_STATUSES,
  RUNTIME_SESSION_STATUSES,
  RUNTIME_WAIT_STATUSES,
  RUNTIME_WAIT_TYPES,
  STATE_EXECUTION_STATUSES,
  STATE_ATTEMPT_STATUSES,
  type NormalizedRuntimeError,
  type RunSignalRequest,
  type RuntimeActionProposal,
  type RuntimeActivityRequest,
  type RuntimeActivityResult,
  type RuntimePrincipal,
  type RuntimeRun,
  type RuntimeScope,
  type RuntimeSession,
  type RuntimeWaitRecord,
  type RuntimeWaitRequest,
  type StateExecutionResult,
  type StateAttemptRecord,
} from '../../contracts/runtime';
import type { JsonSchema, SpecRef } from '../../specs';

export * from './canonical-json';
export * from './event-store';
export * from './event-schema-registry';
export * from './event-runtime';
export * from './projection';
export * from './reliable-message-bus';
export * from './durable-coordination';
export * from './run-manager';
export * from './parallel-runtime';
export * from './recovery-scanner';
export * from './recovery-worker';
export * from './runtime-helpers';
export * from './activity-runtime';
export * from './activity-worker';
export * from './execution-activity-port';
export * from './human-activity-port';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestamp = z.string().datetime({ offset: true });
const metadata = z.record(z.unknown());
type DefinedUnknown = NonNullable<unknown> | null;
const requiredUnknown = z.custom<DefinedUnknown>((value) => value !== undefined, {
  message: 'is required',
});

const runtimeSpecRefSchema = z
  .object({
    id: nonEmptyString,
    version: nonEmptyString.optional(),
    revision: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<SpecRef>;

export const runtimeScopeSchema = z
  .object({
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString.optional(),
    sessionId: nonEmptyString,
    runId: nonEmptyString,
    agentId: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<RuntimeScope>;

export const runtimePrincipalSchema = z
  .object({
    principalId: nonEmptyString,
    type: z.enum(RUNTIME_PRINCIPAL_TYPES),
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    roles: z.array(nonEmptyString).optional(),
    permissionScopes: z.array(nonEmptyString),
    metadata: metadata.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.type === 'user' && !value.userId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['userId'],
        message: 'is required for a user principal',
      });
    }
    if (value.type === 'agent' && !value.agentId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['agentId'],
        message: 'is required for an agent principal',
      });
    }
  }) satisfies ZodType<RuntimePrincipal>;

export const normalizedRuntimeErrorSchema = z
  .object({
    code: z.enum(RUNTIME_ERROR_CODES),
    message: nonEmptyString,
    retryable: z.boolean(),
    stateId: nonEmptyString.optional(),
    transitionId: nonEmptyString.optional(),
    details: metadata.optional(),
    causeRef: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<NormalizedRuntimeError>;

export const runtimeSessionSchema = z
  .object({
    id: nonEmptyString,
    revision: nonNegativeInteger,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString.optional(),
    domainPackRef: runtimeSpecRefSchema.optional(),
    sessionProfileRef: runtimeSpecRefSchema.optional(),
    title: nonEmptyString.optional(),
    metadata,
    status: z.enum(RUNTIME_SESSION_STATUSES),
    createdAt: timestamp,
    updatedAt: timestamp,
    closedAt: timestamp.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (Date.parse(value.updatedAt) < Date.parse(value.createdAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['updatedAt'],
        message: 'must not be earlier than createdAt',
      });
    }
    if (value.status === 'active' && value.closedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['closedAt'],
        message: 'must be absent while the Session is active',
      });
    }
    if (value.status !== 'active' && !value.closedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['closedAt'],
        message: 'is required after the Session is closed or archived',
      });
    }
  }) satisfies ZodType<RuntimeSession>;

const terminalRunStatuses = ['completed', 'failed', 'cancelled', 'timed_out'] as const;

export const runtimeRunSchema = z
  .object({
    id: nonEmptyString,
    revision: nonNegativeInteger,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString.optional(),
    sessionId: nonEmptyString,
    domainPackRef: runtimeSpecRefSchema.optional(),
    workflowRef: runtimeSpecRefSchema,
    workflowRevision: nonEmptyString,
    processSpecRef: nonEmptyString,
    processHash: nonEmptyString,
    rootAgentRef: runtimeSpecRefSchema.optional(),
    runtimeProfileRef: runtimeSpecRefSchema.optional(),
    status: z.enum(RUNTIME_RUN_STATUSES),
    input: requiredUnknown,
    inputHash: nonEmptyString,
    output: z.unknown().optional(),
    outputHash: nonEmptyString.optional(),
    currentState: nonEmptyString.optional(),
    terminalState: nonEmptyString.optional(),
    correlationId: nonEmptyString,
    idempotencyKey: nonEmptyString.optional(),
    deadlineAt: timestamp.optional(),
    cancelRequestedAt: timestamp.optional(),
    cancelReason: nonEmptyString.optional(),
    createdAt: timestamp,
    queuedAt: timestamp.optional(),
    startedAt: timestamp.optional(),
    updatedAt: timestamp,
    completedAt: timestamp.optional(),
    error: normalizedRuntimeErrorSchema.optional(),
    metadata: metadata.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    const terminal = terminalRunStatuses.includes(
      value.status as (typeof terminalRunStatuses)[number]
    );
    if (terminal && !value.completedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'is required for a terminal Run',
      });
    }
    if (terminal && !value.terminalState) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminalState'],
        message: 'is required for a terminal Run',
      });
    }
    if (!terminal && (value.completedAt || value.terminalState)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['status'],
        message: 'non-terminal Runs cannot contain terminal completion fields',
      });
    }
    if (value.status === 'failed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a failed Run',
      });
    }
    if (Date.parse(value.updatedAt) < Date.parse(value.createdAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['updatedAt'],
        message: 'must not be earlier than createdAt',
      });
    }
  }) satisfies ZodType<RuntimeRun>;

export const runtimeWaitRequestSchema = z
  .object({
    type: z.enum(RUNTIME_WAIT_TYPES),
    key: nonEmptyString.optional(),
    expectedSchema: metadata.optional(),
    expiresAt: timestamp.optional(),
    timeoutTransitionId: nonEmptyString.optional(),
    pendingActionRef: nonEmptyString.optional(),
    metadata: metadata.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.type === 'signal' && !value.key) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['key'],
        message: 'is required for a signal wait',
      });
    }
    if (value.type === 'timer' && !value.expiresAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'is required for a timer wait',
      });
    }
  }) satisfies ZodType<RuntimeWaitRequest>;

export const runtimeWaitRecordSchema = z
  .object({
    id: nonEmptyString,
    runId: nonEmptyString,
    stateId: nonEmptyString,
    type: z.enum(RUNTIME_WAIT_TYPES),
    key: nonEmptyString.optional(),
    status: z.enum(RUNTIME_WAIT_STATUSES),
    expectedSchemaHash: nonEmptyString.optional(),
    createdAt: timestamp,
    expiresAt: timestamp.optional(),
    resolvedAt: timestamp.optional(),
    signalRef: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.status === 'waiting' && value.resolvedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['resolvedAt'],
        message: 'must be absent while the wait is pending',
      });
    }
    if (value.status !== 'waiting' && !value.resolvedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['resolvedAt'],
        message: 'is required after the wait is resolved',
      });
    }
  }) satisfies ZodType<RuntimeWaitRecord>;

export const runSignalRequestSchema = z
  .object({
    signalId: nonEmptyString,
    runId: nonEmptyString,
    key: nonEmptyString,
    principal: runtimePrincipalSchema,
    payload: requiredUnknown,
    idempotencyKey: nonEmptyString.optional(),
    sentAt: timestamp,
  })
  .strict() satisfies ZodType<RunSignalRequest>;

export const runtimeActionProposalSchema = z
  .object({
    id: nonEmptyString,
    type: z.enum(RUNTIME_ACTION_TYPES),
    targetRef: z.union([runtimeSpecRefSchema, nonEmptyString]).optional(),
    input: z.unknown().optional(),
    rationaleSummary: nonEmptyString.optional(),
    expectedOutcome: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
    metadata: metadata.optional(),
  })
  .strict() satisfies ZodType<RuntimeActionProposal>;

const runtimeTransitionProposalSchema = z
  .object({
    to: nonEmptyString,
    reason: nonEmptyString.optional(),
    variablesPatch: metadata.optional(),
  })
  .strict();

export const stateExecutionResultSchema = z
  .object({
    status: z.enum(STATE_EXECUTION_STATUSES),
    output: z.unknown().optional(),
    outputHash: nonEmptyString.optional(),
    proposedTransitionId: nonEmptyString.optional(),
    transition: runtimeTransitionProposalSchema.optional(),
    variablesPatch: metadata.optional(),
    evidenceEventIds: z.array(nonEmptyString).optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    memoryRefs: z.array(nonEmptyString).optional(),
    toolInvocationRefs: z.array(nonEmptyString).optional(),
    wait: runtimeWaitRequestSchema.optional(),
    failure: normalizedRuntimeErrorSchema.optional(),
    metadata: metadata.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    const expectedWaitType =
      value.status === 'waiting_human'
        ? 'human'
        : value.status === 'waiting_signal'
          ? 'signal'
          : value.status === 'waiting_timer'
            ? 'timer'
            : undefined;
    if (expectedWaitType && value.wait?.type !== expectedWaitType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['wait'],
        message: `must contain a ${expectedWaitType} Wait for status ${value.status}`,
      });
    }
    if (!expectedWaitType && value.wait) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['wait'],
        message: 'must be absent for a non-waiting State result',
      });
    }
    if (value.status === 'failed' && !value.failure) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['failure'],
        message: 'is required for a failed State result',
      });
    }
    if (value.status !== 'failed' && value.failure) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['failure'],
        message: 'must be absent unless the State result failed',
      });
    }
  }) satisfies ZodType<StateExecutionResult>;

const terminalAttemptStatuses = ['completed', 'failed', 'cancelled', 'abandoned'] as const;

export const stateAttemptRecordSchema = z
  .object({
    id: nonEmptyString,
    runId: nonEmptyString,
    stateId: nonEmptyString,
    attempt: positiveInteger,
    status: z.enum(STATE_ATTEMPT_STATUSES),
    claimId: nonEmptyString.optional(),
    fencingToken: positiveInteger.optional(),
    enteredEventId: nonEmptyString.optional(),
    terminalEventId: nonEmptyString.optional(),
    inputHash: nonEmptyString,
    outputHash: nonEmptyString.optional(),
    error: normalizedRuntimeErrorSchema.optional(),
    createdAt: timestamp,
    updatedAt: timestamp,
  })
  .strict()
  .superRefine((value, context) => {
    if (value.claimId && !value.fencingToken) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fencingToken'],
        message: 'is required when a State Attempt has a claim',
      });
    }
    if (
      terminalAttemptStatuses.includes(value.status as (typeof terminalAttemptStatuses)[number]) &&
      !value.terminalEventId
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminalEventId'],
        message: 'is required for a terminal State Attempt',
      });
    }
    if (value.status === 'failed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a failed State Attempt',
      });
    }
    if (Date.parse(value.updatedAt) < Date.parse(value.createdAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['updatedAt'],
        message: 'must not be earlier than createdAt',
      });
    }
  }) satisfies ZodType<StateAttemptRecord>;

export const runtimeActivityRequestSchema = z
  .object({
    activityId: nonEmptyString,
    activityType: z.enum(RUNTIME_ACTIVITY_TYPES),
    runId: nonEmptyString,
    sessionId: nonEmptyString,
    stateAttemptId: nonEmptyString,
    operationId: nonEmptyString,
    input: requiredUnknown,
    deadlineAt: timestamp.optional(),
    idempotencyKey: nonEmptyString.optional(),
    fencingToken: positiveInteger,
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<RuntimeActivityRequest>;

export const runtimeActivityResultSchema = z
  .object({
    activityId: nonEmptyString,
    status: z.enum(RUNTIME_ACTIVITY_STATUSES),
    output: z.unknown().optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    eventIds: z.array(nonEmptyString),
    retryable: z.boolean().optional(),
    error: normalizedRuntimeErrorSchema.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.status === 'failed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a failed Activity',
      });
    }
    if (value.error && value.retryable !== undefined && value.retryable !== value.error.retryable) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['retryable'],
        message: 'must match error.retryable',
      });
    }
  }) satisfies ZodType<RuntimeActivityResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const metadataJsonSchema: JsonSchema = { type: 'object', additionalProperties: true };
const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
    revision: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'sessionId', 'runId'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimePrincipalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['principalId', 'type', 'permissionScopes'],
  properties: {
    principalId: nonEmptyStringJsonSchema,
    type: { enum: [...RUNTIME_PRINCIPAL_TYPES] },
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    roles: { type: 'array', items: nonEmptyStringJsonSchema },
    permissionScopes: { type: 'array', items: nonEmptyStringJsonSchema },
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { type: { const: 'user' } }, required: ['type'] },
      then: { required: ['userId'] },
    },
    {
      if: { properties: { type: { const: 'agent' } }, required: ['type'] },
      then: { required: ['agentId'] },
    },
  ],
};

export const normalizedRuntimeErrorJsonSchema: JsonSchema = {
  type: 'object',
  required: ['code', 'message', 'retryable'],
  properties: {
    code: { enum: [...RUNTIME_ERROR_CODES] },
    message: nonEmptyStringJsonSchema,
    retryable: { type: 'boolean' },
    stateId: nonEmptyStringJsonSchema,
    transitionId: nonEmptyStringJsonSchema,
    details: metadataJsonSchema,
    causeRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeSessionJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'revision', 'userId', 'metadata', 'status', 'createdAt', 'updatedAt'],
  properties: {
    id: nonEmptyStringJsonSchema,
    revision: { type: 'integer', minimum: 0 },
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    domainPackRef: specRefJsonSchema,
    sessionProfileRef: specRefJsonSchema,
    title: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
    status: { enum: [...RUNTIME_SESSION_STATUSES] },
    createdAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    closedAt: timestampJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { status: { const: 'active' } }, required: ['status'] },
      then: { not: { required: ['closedAt'] } },
    },
    {
      if: { properties: { status: { enum: ['closed', 'archived'] } }, required: ['status'] },
      then: { required: ['closedAt'] },
    },
  ],
};

export const runtimeRunJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'userId',
    'sessionId',
    'workflowRef',
    'workflowRevision',
    'processSpecRef',
    'processHash',
    'status',
    'input',
    'inputHash',
    'correlationId',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    revision: { type: 'integer', minimum: 0 },
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    domainPackRef: specRefJsonSchema,
    workflowRef: specRefJsonSchema,
    workflowRevision: nonEmptyStringJsonSchema,
    processSpecRef: nonEmptyStringJsonSchema,
    processHash: nonEmptyStringJsonSchema,
    rootAgentRef: specRefJsonSchema,
    runtimeProfileRef: specRefJsonSchema,
    status: { enum: [...RUNTIME_RUN_STATUSES] },
    input: {},
    inputHash: nonEmptyStringJsonSchema,
    output: {},
    outputHash: nonEmptyStringJsonSchema,
    currentState: nonEmptyStringJsonSchema,
    terminalState: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    deadlineAt: timestampJsonSchema,
    cancelRequestedAt: timestampJsonSchema,
    cancelReason: nonEmptyStringJsonSchema,
    createdAt: timestampJsonSchema,
    queuedAt: timestampJsonSchema,
    startedAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    completedAt: timestampJsonSchema,
    error: normalizedRuntimeErrorJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: {
        properties: { status: { enum: [...terminalRunStatuses] } },
        required: ['status'],
      },
      then: { required: ['completedAt', 'terminalState'] },
    },
    {
      if: {
        properties: {
          status: {
            enum: RUNTIME_RUN_STATUSES.filter(
              (status) =>
                !terminalRunStatuses.includes(status as (typeof terminalRunStatuses)[number])
            ),
          },
        },
        required: ['status'],
      },
      then: {
        not: {
          anyOf: [{ required: ['completedAt'] }, { required: ['terminalState'] }],
        },
      },
    },
    {
      if: { properties: { status: { const: 'failed' } }, required: ['status'] },
      then: { required: ['error'] },
    },
  ],
};

export const runtimeWaitRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    type: { enum: [...RUNTIME_WAIT_TYPES] },
    key: nonEmptyStringJsonSchema,
    expectedSchema: metadataJsonSchema,
    expiresAt: timestampJsonSchema,
    timeoutTransitionId: nonEmptyStringJsonSchema,
    pendingActionRef: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { type: { const: 'signal' } }, required: ['type'] },
      then: { required: ['key'] },
    },
    {
      if: { properties: { type: { const: 'timer' } }, required: ['type'] },
      then: { required: ['expiresAt'] },
    },
  ],
};

export const runtimeWaitRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'runId', 'stateId', 'type', 'status', 'createdAt'],
  properties: {
    id: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    type: { enum: [...RUNTIME_WAIT_TYPES] },
    key: nonEmptyStringJsonSchema,
    status: { enum: [...RUNTIME_WAIT_STATUSES] },
    expectedSchemaHash: nonEmptyStringJsonSchema,
    createdAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    resolvedAt: timestampJsonSchema,
    signalRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { status: { const: 'waiting' } }, required: ['status'] },
      then: { not: { required: ['resolvedAt'] } },
    },
    {
      if: {
        properties: { status: { enum: ['received', 'expired', 'cancelled'] } },
        required: ['status'],
      },
      then: { required: ['resolvedAt'] },
    },
  ],
};

export const runSignalRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['signalId', 'runId', 'key', 'principal', 'payload', 'sentAt'],
  properties: {
    signalId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    key: nonEmptyStringJsonSchema,
    principal: runtimePrincipalJsonSchema,
    payload: {},
    idempotencyKey: nonEmptyStringJsonSchema,
    sentAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeActionProposalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'type'],
  properties: {
    id: nonEmptyStringJsonSchema,
    type: { enum: [...RUNTIME_ACTION_TYPES] },
    targetRef: { anyOf: [specRefJsonSchema, nonEmptyStringJsonSchema] },
    input: {},
    rationaleSummary: nonEmptyStringJsonSchema,
    expectedOutcome: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
};

const runtimeTransitionProposalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['to'],
  properties: {
    to: nonEmptyStringJsonSchema,
    reason: nonEmptyStringJsonSchema,
    variablesPatch: metadataJsonSchema,
  },
  additionalProperties: false,
};

export const stateExecutionResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { enum: [...STATE_EXECUTION_STATUSES] },
    output: {},
    outputHash: nonEmptyStringJsonSchema,
    proposedTransitionId: nonEmptyStringJsonSchema,
    transition: runtimeTransitionProposalJsonSchema,
    variablesPatch: metadataJsonSchema,
    evidenceEventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    memoryRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    toolInvocationRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    wait: runtimeWaitRequestJsonSchema,
    failure: normalizedRuntimeErrorJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: {
        properties: {
          status: { enum: ['waiting_human', 'waiting_signal', 'waiting_timer'] },
        },
        required: ['status'],
      },
      then: { required: ['wait'] },
    },
    {
      if: { properties: { status: { const: 'failed' } }, required: ['status'] },
      then: { required: ['failure'] },
    },
  ],
};

export const stateAttemptRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'runId', 'stateId', 'attempt', 'status', 'inputHash', 'createdAt', 'updatedAt'],
  properties: {
    id: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    attempt: { type: 'integer', minimum: 1 },
    status: { enum: [...STATE_ATTEMPT_STATUSES] },
    claimId: nonEmptyStringJsonSchema,
    fencingToken: { type: 'integer', minimum: 1 },
    enteredEventId: nonEmptyStringJsonSchema,
    terminalEventId: nonEmptyStringJsonSchema,
    inputHash: nonEmptyStringJsonSchema,
    outputHash: nonEmptyStringJsonSchema,
    error: normalizedRuntimeErrorJsonSchema,
    createdAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { required: ['claimId'] },
      then: { required: ['fencingToken'] },
    },
    {
      if: {
        properties: { status: { enum: [...terminalAttemptStatuses] } },
        required: ['status'],
      },
      then: { required: ['terminalEventId'] },
    },
    {
      if: { properties: { status: { const: 'failed' } }, required: ['status'] },
      then: { required: ['error'] },
    },
  ],
};

export const runtimeActivityRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'activityId',
    'activityType',
    'runId',
    'sessionId',
    'stateAttemptId',
    'operationId',
    'input',
    'fencingToken',
  ],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    activityType: { enum: [...RUNTIME_ACTIVITY_TYPES] },
    runId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    stateAttemptId: nonEmptyStringJsonSchema,
    operationId: nonEmptyStringJsonSchema,
    input: {},
    deadlineAt: timestampJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    fencingToken: { type: 'integer', minimum: 1 },
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeActivityResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activityId', 'status', 'eventIds'],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    status: { enum: [...RUNTIME_ACTIVITY_STATUSES] },
    output: {},
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    retryable: { type: 'boolean' },
    error: normalizedRuntimeErrorJsonSchema,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { status: { const: 'failed' } }, required: ['status'] },
      then: { required: ['error'] },
    },
  ],
};

export const runtimeScopeExample: RuntimeScope = {
  tenantId: 'tenant.example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
  sessionId: 'session.example',
  runId: 'run.example',
  agentId: 'agent.example',
};

export const runtimePrincipalExample: RuntimePrincipal = {
  principalId: 'principal.user.example',
  type: 'user',
  tenantId: 'tenant.example',
  userId: 'user.example',
  roles: ['owner'],
  permissionScopes: ['runtime:run'],
};

export const runtimeSessionExample: RuntimeSession = {
  id: 'session.example',
  revision: 0,
  tenantId: 'tenant.example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
  domainPackRef: { id: 'domain.example', version: '1.0.0', revision: 'domain-rev-1' },
  sessionProfileRef: { id: 'session-profile.default', version: '1.0.0' },
  metadata: {},
  status: 'active',
  createdAt: '2026-07-17T00:00:00.000Z',
  updatedAt: '2026-07-17T00:00:00.000Z',
};

export const runtimeRunExample: RuntimeRun = {
  id: 'run.example',
  revision: 0,
  tenantId: 'tenant.example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
  sessionId: 'session.example',
  domainPackRef: { id: 'domain.example', version: '1.0.0', revision: 'domain-rev-1' },
  workflowRef: { id: 'workflow.example', version: '1.0.0', revision: 'workflow-rev-1' },
  workflowRevision: 'workflow-rev-1',
  processSpecRef: 'process.example@process-rev-1',
  processHash: 'sha256:process-example',
  status: 'created',
  input: { request: 'example' },
  inputHash: 'sha256:input-example',
  correlationId: 'correlation.example',
  idempotencyKey: 'request.example',
  createdAt: '2026-07-17T00:00:00.000Z',
  updatedAt: '2026-07-17T00:00:00.000Z',
};

export const runtimeWaitRequestExample: RuntimeWaitRequest = {
  type: 'signal',
  key: 'approval.received',
  expectedSchema: { type: 'object' },
  expiresAt: '2026-07-18T00:00:00.000Z',
  timeoutTransitionId: 'transition.approval-timeout',
};

export const runtimeWaitRecordExample: RuntimeWaitRecord = {
  id: 'wait.example',
  runId: runtimeRunExample.id,
  stateId: 'AwaitApproval',
  type: 'signal',
  key: 'approval.received',
  status: 'waiting',
  expectedSchemaHash: 'sha256:approval-schema',
  createdAt: '2026-07-17T00:00:01.000Z',
  expiresAt: '2026-07-18T00:00:00.000Z',
};

export const runSignalRequestExample: RunSignalRequest = {
  signalId: 'signal.example',
  runId: runtimeRunExample.id,
  key: 'approval.received',
  principal: runtimePrincipalExample,
  payload: { approved: true },
  idempotencyKey: 'signal.example.request.1',
  sentAt: '2026-07-17T00:01:00.000Z',
};

export const runtimeActionProposalExample: RuntimeActionProposal = {
  id: 'action.example',
  type: 'tool',
  targetRef: { id: 'tool.search', version: '1.0.0' },
  input: { query: 'runtime' },
  rationaleSummary: 'Collect current evidence.',
  idempotencyKey: 'action.example.1',
};

export const stateExecutionResultExample: StateExecutionResult = {
  status: 'waiting_signal',
  wait: runtimeWaitRequestExample,
  evidenceEventIds: ['event.state.observation.1'],
};

export const stateAttemptRecordExample: StateAttemptRecord = {
  id: 'attempt.example.1',
  runId: 'run.example',
  stateId: 'Drafting',
  attempt: 1,
  status: 'entered',
  enteredEventId: 'event.state.entered.1',
  inputHash: 'sha256:attempt-input-example',
  createdAt: '2026-07-17T00:00:01.000Z',
  updatedAt: '2026-07-17T00:00:01.000Z',
};

export const runtimeActivityRequestExample: RuntimeActivityRequest = {
  activityId: 'activity.example',
  activityType: 'model',
  runId: runtimeScopeExample.runId,
  sessionId: runtimeScopeExample.sessionId,
  stateAttemptId: stateAttemptRecordExample.id,
  operationId: 'operation.example',
  input: { promptRef: 'prompt.example' },
  idempotencyKey: 'activity.example.attempt.1',
  fencingToken: 1,
  correlationId: 'correlation.example',
  causationId: 'event.state.entered.1',
};

export const runtimeActivityResultExample: RuntimeActivityResult = {
  activityId: runtimeActivityRequestExample.activityId,
  status: 'completed',
  output: { proposal: 'example' },
  eventIds: ['event.activity.completed.1'],
};

export const runtimeContractJsonSchemas = {
  RuntimeScope: runtimeScopeJsonSchema,
  RuntimePrincipal: runtimePrincipalJsonSchema,
  NormalizedRuntimeError: normalizedRuntimeErrorJsonSchema,
  RuntimeSession: runtimeSessionJsonSchema,
  RuntimeRun: runtimeRunJsonSchema,
  RuntimeWaitRequest: runtimeWaitRequestJsonSchema,
  RuntimeWaitRecord: runtimeWaitRecordJsonSchema,
  RunSignalRequest: runSignalRequestJsonSchema,
  RuntimeActionProposal: runtimeActionProposalJsonSchema,
  StateExecutionResult: stateExecutionResultJsonSchema,
  StateAttemptRecord: stateAttemptRecordJsonSchema,
  RuntimeActivityRequest: runtimeActivityRequestJsonSchema,
  RuntimeActivityResult: runtimeActivityResultJsonSchema,
} as const;

export function validateRuntimeScope(input: unknown): RuntimeScope {
  return runtimeScopeSchema.parse(input);
}

export function validateRuntimePrincipal(input: unknown): RuntimePrincipal {
  return runtimePrincipalSchema.parse(input);
}

export function validateRuntimeSession(input: unknown): RuntimeSession {
  return runtimeSessionSchema.parse(input);
}

export function validateRuntimeRun(input: unknown): RuntimeRun {
  return runtimeRunSchema.parse(input);
}

export function validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest {
  return runtimeWaitRequestSchema.parse(input);
}

export function validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord {
  return runtimeWaitRecordSchema.parse(input);
}

export function validateRunSignalRequest(input: unknown): RunSignalRequest {
  return runSignalRequestSchema.parse(input);
}

export function validateRuntimeActionProposal(input: unknown): RuntimeActionProposal {
  return runtimeActionProposalSchema.parse(input);
}

export function validateStateExecutionResult(input: unknown): StateExecutionResult {
  return stateExecutionResultSchema.parse(input);
}

export function validateStateAttemptRecord(input: unknown): StateAttemptRecord {
  return stateAttemptRecordSchema.parse(input);
}

export function validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest {
  return runtimeActivityRequestSchema.parse(input);
}

export function validateRuntimeActivityResult(input: unknown): RuntimeActivityResult {
  return runtimeActivityResultSchema.parse(input);
}

export function validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError {
  return normalizedRuntimeErrorSchema.parse(input);
}

export { FSM_INSTANCE_STATUSES };
