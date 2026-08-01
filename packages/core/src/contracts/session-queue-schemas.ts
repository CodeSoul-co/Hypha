import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_TYPES,
  type CancelSessionCommandsRequest,
  type CancelSessionCommandsResult,
  type CloseDeadLetterSessionCommandRequest,
  type ListStuckSessionCommandsRequest,
  type RedriveDeadLetterSessionCommandRequest,
  type SessionCommandDeadLetterResolution,
  type SessionCommandLeaseRecovery,
  type SessionCommandRedrive,
  type SessionCommandRecord,
  type SessionQueueScope,
  type SessionQueueHealthSnapshot,
  type StuckSessionCommand,
} from './session-queue';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);

export const sessionCommandTypeSchema = z.enum(SESSION_COMMAND_TYPES);
export const sessionCommandStatusSchema = z.enum(SESSION_COMMAND_STATUSES);

export const sessionQueueScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    sessionId: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<SessionQueueScope>;

export const sessionCommandRedriveSchema = z
  .object({
    version: z.literal('1.0.0'),
    sourceCommandId: nonEmptyStringSchema,
    operatorId: nonEmptyStringSchema,
    reason: nonEmptyStringSchema,
    requestedAt: timestampSchema,
  })
  .strict() satisfies ZodType<SessionCommandRedrive>;

export const sessionCommandDeadLetterResolutionSchema = z
  .object({
    version: z.literal('1.0.0'),
    disposition: z.enum(['redriven', 'closed']),
    operatorId: nonEmptyStringSchema,
    reason: nonEmptyStringSchema,
    resolvedAt: timestampSchema,
    redriveCommandId: nonEmptyStringSchema.optional(),
  })
  .strict()
  .superRefine((resolution, context) => {
    if (resolution.disposition === 'redriven' && !resolution.redriveCommandId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['redriveCommandId'],
        message: 'redriveCommandId is required for redriven dead letters',
      });
    }
    if (resolution.disposition === 'closed' && resolution.redriveCommandId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['redriveCommandId'],
        message: 'redriveCommandId is only valid for redriven dead letters',
      });
    }
  }) satisfies ZodType<SessionCommandDeadLetterResolution>;

export const sessionCommandLeaseRecoverySchema = z
  .object({
    version: z.literal('1.0.0'),
    previousWorkerId: nonEmptyStringSchema,
    previousLeaseEpoch: z.number().int().positive(),
    leaseExpiredAt: timestampSchema,
    recoveredAt: timestampSchema,
    disposition: z.enum(['requeued', 'dead_lettered']),
  })
  .strict() satisfies ZodType<SessionCommandLeaseRecovery>;

export const sessionCommandRecordSchema = z
  .object({
    id: nonEmptyStringSchema,
    commandType: sessionCommandTypeSchema,
    idempotencyKey: nonEmptyStringSchema,
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    workspaceId: nonEmptyStringSchema.optional(),
    sessionId: nonEmptyStringSchema,
    targetRunId: nonEmptyStringSchema.optional(),
    enqueueSequence: z.number().int().positive(),
    priority: z.number().int().min(0).max(100),
    attempts: z.number().int().min(0),
    maxAttempts: z.number().int().min(1).max(SESSION_COMMAND_MAX_ATTEMPTS_LIMIT),
    leaseEpoch: z.number().int().min(0),
    payloadRef: nonEmptyStringSchema.optional(),
    payloadHash: hashSchema,
    status: sessionCommandStatusSchema,
    claimedBy: nonEmptyStringSchema.optional(),
    claimToken: nonEmptyStringSchema.optional(),
    leaseExpiresAt: timestampSchema.optional(),
    resultRunId: nonEmptyStringSchema.optional(),
    resultEventIds: z.array(nonEmptyStringSchema).optional(),
    rejectionCode: nonEmptyStringSchema.optional(),
    createdAt: timestampSchema,
    availableAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    completedAt: timestampSchema.optional(),
    redrive: sessionCommandRedriveSchema.optional(),
    deadLetterResolution: sessionCommandDeadLetterResolutionSchema.optional(),
    leaseRecoveries: z
      .array(sessionCommandLeaseRecoverySchema)
      .max(SESSION_COMMAND_MAX_ATTEMPTS_LIMIT)
      .optional(),
  })
  .strict()
  .superRefine((record, context) => {
    if (record.status === 'claimed') {
      if (record.attempts < 1) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['attempts'],
          message: 'attempts must be positive for claimed commands',
        });
      }
      if (!record.claimedBy) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['claimedBy'],
          message: 'claimedBy is required for claimed commands',
        });
      }
      if (!record.claimToken) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['claimToken'],
          message: 'claimToken is required for claimed commands',
        });
      }
      if (record.leaseEpoch < 1) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseEpoch'],
          message: 'leaseEpoch must be positive for claimed commands',
        });
      }
      if (!record.leaseExpiresAt) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseExpiresAt'],
          message: 'leaseExpiresAt is required for claimed commands',
        });
      }
    } else if (record.claimedBy || record.claimToken || record.leaseExpiresAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['status'],
        message: 'claim fields are only valid for claimed commands',
      });
    }
    if (record.attempts > record.maxAttempts) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['attempts'],
        message: 'attempts must not exceed maxAttempts',
      });
    }
    if ((record.leaseRecoveries?.length ?? 0) > record.attempts) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['leaseRecoveries'],
        message: 'leaseRecoveries must not exceed attempts',
      });
    }
    for (let index = 0; index < (record.leaseRecoveries?.length ?? 0); index += 1) {
      const recovery = record.leaseRecoveries![index];
      const previous = record.leaseRecoveries![index - 1];
      if (recovery.previousLeaseEpoch > record.leaseEpoch) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseRecoveries', index, 'previousLeaseEpoch'],
          message: 'recovered lease epoch must not exceed the command lease epoch',
        });
      }
      if (
        previous &&
        (recovery.previousLeaseEpoch <= previous.previousLeaseEpoch ||
          Date.parse(recovery.recoveredAt) < Date.parse(previous.recoveredAt))
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseRecoveries', index],
          message: 'leaseRecoveries must use increasing epochs and recovery times',
        });
      }
      if (Date.parse(recovery.recoveredAt) < Date.parse(recovery.leaseExpiredAt)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseRecoveries', index, 'recoveredAt'],
          message: 'recoveredAt must not precede leaseExpiredAt',
        });
      }
    }
    if (
      ['applied', 'rejected', 'expired', 'failed', 'dead_letter', 'dead_letter_resolved'].includes(
        record.status
      ) &&
      !record.completedAt
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'completedAt is required for terminal commands',
      });
    }
    if (
      ['rejected', 'failed', 'dead_letter', 'dead_letter_resolved'].includes(record.status) &&
      !record.rejectionCode
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rejectionCode'],
        message: 'rejectionCode is required for rejected commands',
      });
    }
    if (record.status === 'dead_letter_resolved' && !record.deadLetterResolution) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deadLetterResolution'],
        message: 'deadLetterResolution is required for resolved dead letters',
      });
    }
    if (record.status !== 'dead_letter_resolved' && record.deadLetterResolution) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deadLetterResolution'],
        message: 'deadLetterResolution is only valid for resolved dead letters',
      });
    }
  }) satisfies ZodType<SessionCommandRecord>;

const stringProperty: JsonSchema = { type: 'string', minLength: 1 };
const timestampProperty: JsonSchema = { type: 'string', format: 'date-time' };
const sessionCommandRedriveJsonSchema: JsonSchema = {
  type: 'object',
  required: ['version', 'sourceCommandId', 'operatorId', 'reason', 'requestedAt'],
  properties: {
    version: { const: '1.0.0' },
    sourceCommandId: stringProperty,
    operatorId: stringProperty,
    reason: stringProperty,
    requestedAt: timestampProperty,
  },
  additionalProperties: false,
};
const sessionCommandDeadLetterResolutionJsonSchema: JsonSchema = {
  type: 'object',
  required: ['version', 'disposition', 'operatorId', 'reason', 'resolvedAt'],
  properties: {
    version: { const: '1.0.0' },
    disposition: { type: 'string', enum: ['redriven', 'closed'] },
    operatorId: stringProperty,
    reason: stringProperty,
    resolvedAt: timestampProperty,
    redriveCommandId: stringProperty,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { disposition: { const: 'redriven' } }, required: ['disposition'] },
      then: {
        properties: { redriveCommandId: stringProperty },
        required: ['redriveCommandId'],
      },
    },
    {
      if: { properties: { disposition: { const: 'closed' } }, required: ['disposition'] },
      then: { not: { required: ['redriveCommandId'] } },
    },
  ],
};
const sessionCommandLeaseRecoveryJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'version',
    'previousWorkerId',
    'previousLeaseEpoch',
    'leaseExpiredAt',
    'recoveredAt',
    'disposition',
  ],
  properties: {
    version: { const: '1.0.0' },
    previousWorkerId: stringProperty,
    previousLeaseEpoch: { type: 'integer', minimum: 1 },
    leaseExpiredAt: timestampProperty,
    recoveredAt: timestampProperty,
    disposition: { type: 'string', enum: ['requeued', 'dead_lettered'] },
  },
  additionalProperties: false,
};

export const sessionCommandRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'commandType',
    'idempotencyKey',
    'userId',
    'sessionId',
    'enqueueSequence',
    'priority',
    'attempts',
    'maxAttempts',
    'leaseEpoch',
    'payloadHash',
    'status',
    'createdAt',
    'availableAt',
  ],
  properties: {
    id: stringProperty,
    commandType: { type: 'string', enum: [...SESSION_COMMAND_TYPES] },
    idempotencyKey: stringProperty,
    tenantId: stringProperty,
    userId: stringProperty,
    workspaceId: stringProperty,
    sessionId: stringProperty,
    targetRunId: stringProperty,
    enqueueSequence: { type: 'integer', minimum: 1 },
    priority: { type: 'integer', minimum: 0, maximum: 100 },
    attempts: { type: 'integer', minimum: 0 },
    maxAttempts: { type: 'integer', minimum: 1, maximum: SESSION_COMMAND_MAX_ATTEMPTS_LIMIT },
    leaseEpoch: { type: 'integer', minimum: 0 },
    payloadRef: stringProperty,
    payloadHash: { type: 'string', pattern: '^sha256:[a-f0-9]{64}$' },
    status: { type: 'string', enum: [...SESSION_COMMAND_STATUSES] },
    claimedBy: stringProperty,
    claimToken: stringProperty,
    leaseExpiresAt: timestampProperty,
    resultRunId: stringProperty,
    resultEventIds: { type: 'array', items: stringProperty },
    rejectionCode: stringProperty,
    createdAt: timestampProperty,
    availableAt: timestampProperty,
    expiresAt: timestampProperty,
    completedAt: timestampProperty,
    redrive: sessionCommandRedriveJsonSchema,
    deadLetterResolution: sessionCommandDeadLetterResolutionJsonSchema,
    leaseRecoveries: {
      type: 'array',
      items: sessionCommandLeaseRecoveryJsonSchema,
      maxItems: SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
    },
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { status: { const: 'claimed' } }, required: ['status'] },
      then: {
        properties: {
          claimedBy: stringProperty,
          claimToken: stringProperty,
          leaseEpoch: { type: 'integer', minimum: 1 },
          leaseExpiresAt: timestampProperty,
        },
        required: ['claimedBy', 'claimToken', 'leaseEpoch', 'leaseExpiresAt'],
      },
    },
    {
      if: {
        properties: {
          status: {
            enum: [
              'applied',
              'rejected',
              'expired',
              'failed',
              'dead_letter',
              'dead_letter_resolved',
            ],
          },
        },
        required: ['status'],
      },
      then: { properties: { completedAt: timestampProperty }, required: ['completedAt'] },
    },
    {
      if: {
        properties: {
          status: { enum: ['rejected', 'failed', 'dead_letter', 'dead_letter_resolved'] },
        },
        required: ['status'],
      },
      then: { properties: { rejectionCode: stringProperty }, required: ['rejectionCode'] },
    },
    {
      if: { properties: { status: { const: 'dead_letter_resolved' } }, required: ['status'] },
      then: {
        properties: { deadLetterResolution: sessionCommandDeadLetterResolutionJsonSchema },
        required: ['deadLetterResolution'],
      },
      else: { not: { required: ['deadLetterResolution'] } },
    },
  ],
};

export const sessionCommandRecordExample: SessionCommandRecord = {
  id: 'command.session.001',
  commandType: 'user_input',
  idempotencyKey: 'input.request.001',
  userId: 'user.example',
  sessionId: 'session.example',
  enqueueSequence: 1,
  priority: 50,
  attempts: 0,
  maxAttempts: DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  leaseEpoch: 0,
  payloadRef: 'artifact://input/request.001',
  payloadHash: 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  status: 'queued',
  createdAt: '2026-07-18T05:00:00.000Z',
  availableAt: '2026-07-18T05:00:00.000Z',
};

export const sessionCommandRecordDefinition = defineSpecSchema<SessionCommandRecord>({
  id: 'SessionCommandRecord',
  zod: sessionCommandRecordSchema,
  jsonSchema: sessionCommandRecordJsonSchema,
  example: sessionCommandRecordExample,
});

export const cancelSessionCommandsRequestSchema = z
  .object({
    version: z.literal('1.0.0'),
    scope: sessionQueueScopeSchema,
    targetRunId: nonEmptyStringSchema,
    cancellationCommandId: nonEmptyStringSchema,
    reason: nonEmptyStringSchema,
    cancelledAt: timestampSchema,
  })
  .strict() satisfies ZodType<CancelSessionCommandsRequest>;

export const cancelSessionCommandsResultSchema = z
  .object({
    targetRunId: nonEmptyStringSchema,
    cancelledCommandIds: z.array(nonEmptyStringSchema),
    alreadyCancelledCommandIds: z.array(nonEmptyStringSchema),
    alreadyTerminalCommandIds: z.array(nonEmptyStringSchema),
  })
  .strict() satisfies ZodType<CancelSessionCommandsResult>;

const sessionQueueScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'sessionId'],
  properties: {
    tenantId: stringProperty,
    userId: stringProperty,
    sessionId: stringProperty,
  },
  additionalProperties: false,
};

export const cancelSessionCommandsRequestDefinition =
  defineSpecSchema<CancelSessionCommandsRequest>({
    id: 'CancelSessionCommandsRequest',
    zod: cancelSessionCommandsRequestSchema,
    jsonSchema: {
      type: 'object',
      required: [
        'version',
        'scope',
        'targetRunId',
        'cancellationCommandId',
        'reason',
        'cancelledAt',
      ],
      properties: {
        version: { const: '1.0.0' },
        scope: sessionQueueScopeJsonSchema,
        targetRunId: stringProperty,
        cancellationCommandId: stringProperty,
        reason: stringProperty,
        cancelledAt: timestampProperty,
      },
      additionalProperties: false,
    },
    example: {
      version: '1.0.0',
      scope: { userId: 'user.example', sessionId: 'session.example' },
      targetRunId: 'run.example',
      cancellationCommandId: 'command.cancel.example',
      reason: 'Run cancelled by user',
      cancelledAt: '2026-07-18T06:00:00.000Z',
    },
  });

export const cancelSessionCommandsResultDefinition = defineSpecSchema<CancelSessionCommandsResult>({
  id: 'CancelSessionCommandsResult',
  zod: cancelSessionCommandsResultSchema,
  jsonSchema: {
    type: 'object',
    required: [
      'targetRunId',
      'cancelledCommandIds',
      'alreadyCancelledCommandIds',
      'alreadyTerminalCommandIds',
    ],
    properties: {
      targetRunId: stringProperty,
      cancelledCommandIds: { type: 'array', items: stringProperty },
      alreadyCancelledCommandIds: { type: 'array', items: stringProperty },
      alreadyTerminalCommandIds: { type: 'array', items: stringProperty },
    },
    additionalProperties: false,
  },
  example: {
    targetRunId: 'run.example',
    cancelledCommandIds: ['command.resume.example'],
    alreadyCancelledCommandIds: [],
    alreadyTerminalCommandIds: [],
  },
});

export const redriveDeadLetterSessionCommandRequestSchema = z
  .object({
    version: z.literal('1.0.0'),
    scope: sessionQueueScopeSchema,
    sourceCommandId: nonEmptyStringSchema,
    id: nonEmptyStringSchema,
    idempotencyKey: nonEmptyStringSchema,
    operatorId: nonEmptyStringSchema,
    reason: nonEmptyStringSchema,
    requestedAt: timestampSchema.optional(),
    availableAt: timestampSchema.optional(),
    expiresAt: timestampSchema.optional(),
    priority: z.number().int().min(0).max(100).optional(),
    maxAttempts: z.number().int().min(1).max(SESSION_COMMAND_MAX_ATTEMPTS_LIMIT).optional(),
  })
  .strict() satisfies ZodType<RedriveDeadLetterSessionCommandRequest>;

export const redriveDeadLetterSessionCommandRequestDefinition =
  defineSpecSchema<RedriveDeadLetterSessionCommandRequest>({
    id: 'RedriveDeadLetterSessionCommandRequest',
    zod: redriveDeadLetterSessionCommandRequestSchema,
    jsonSchema: {
      type: 'object',
      required: [
        'version',
        'scope',
        'sourceCommandId',
        'id',
        'idempotencyKey',
        'operatorId',
        'reason',
      ],
      properties: {
        version: { const: '1.0.0' },
        scope: {
          ...sessionQueueScopeJsonSchema,
        },
        sourceCommandId: stringProperty,
        id: stringProperty,
        idempotencyKey: stringProperty,
        operatorId: stringProperty,
        reason: stringProperty,
        requestedAt: timestampProperty,
        availableAt: timestampProperty,
        expiresAt: timestampProperty,
        priority: { type: 'integer', minimum: 0, maximum: 100 },
        maxAttempts: {
          type: 'integer',
          minimum: 1,
          maximum: SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
        },
      },
      additionalProperties: false,
    },
    example: {
      version: '1.0.0',
      scope: { userId: 'user.example', sessionId: 'session.example' },
      sourceCommandId: 'command.session.failed',
      id: 'command.session.redrive.001',
      idempotencyKey: 'operator.redrive.001',
      operatorId: 'operator.example',
      reason: 'Provider outage has been resolved',
      requestedAt: '2026-07-18T06:00:00.000Z',
    },
  });

export const closeDeadLetterSessionCommandRequestSchema = z
  .object({
    version: z.literal('1.0.0'),
    scope: sessionQueueScopeSchema,
    commandId: nonEmptyStringSchema,
    operatorId: nonEmptyStringSchema,
    reason: nonEmptyStringSchema,
    closedAt: timestampSchema,
  })
  .strict() satisfies ZodType<CloseDeadLetterSessionCommandRequest>;

export const closeDeadLetterSessionCommandRequestDefinition =
  defineSpecSchema<CloseDeadLetterSessionCommandRequest>({
    id: 'CloseDeadLetterSessionCommandRequest',
    zod: closeDeadLetterSessionCommandRequestSchema,
    jsonSchema: {
      type: 'object',
      required: ['version', 'scope', 'commandId', 'operatorId', 'reason', 'closedAt'],
      properties: {
        version: { const: '1.0.0' },
        scope: sessionQueueScopeJsonSchema,
        commandId: stringProperty,
        operatorId: stringProperty,
        reason: stringProperty,
        closedAt: timestampProperty,
      },
      additionalProperties: false,
    },
    example: {
      version: '1.0.0',
      scope: { userId: 'user.example', sessionId: 'session.example' },
      commandId: 'command.session.failed',
      operatorId: 'operator.example',
      reason: 'Failure was inspected and requires no replay',
      closedAt: '2026-07-18T06:00:00.000Z',
    },
  });

export const listStuckSessionCommandsRequestSchema = z
  .object({
    scope: sessionQueueScopeSchema,
    checkedAt: timestampSchema,
    graceMs: z.number().int().min(0).optional(),
    limit: z.number().int().min(1).max(1000).optional(),
  })
  .strict() satisfies ZodType<ListStuckSessionCommandsRequest>;

export const stuckSessionCommandSchema = z
  .object({
    command: sessionCommandRecordSchema,
    detectedAt: timestampSchema,
    overdueMs: z.number().int().min(0),
  })
  .strict() satisfies ZodType<StuckSessionCommand>;

export const sessionQueueHealthSnapshotSchema = z
  .object({
    version: z.literal('1.0.0'),
    totalCommands: z.number().int().min(0),
    pendingCommands: z.number().int().min(0),
    queuedCommands: z.number().int().min(0),
    claimedCommands: z.number().int().min(0),
    deadLetterCommands: z.number().int().min(0),
    resolvedDeadLetterCommands: z.number().int().min(0),
    retryingCommands: z.number().int().min(0),
    redeliveredCommands: z.number().int().min(0),
    recoveredExpiredLeases: z.number().int().min(0),
    leaseRecoveryCount: z.number().int().min(0),
    oldestPendingAgeMs: z.number().int().min(0).optional(),
  })
  .strict()
  .superRefine((snapshot, context) => {
    if (snapshot.pendingCommands !== snapshot.queuedCommands + snapshot.claimedCommands) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pendingCommands'],
        message: 'pendingCommands must equal queuedCommands plus claimedCommands',
      });
    }
    if (
      snapshot.pendingCommands > snapshot.totalCommands ||
      snapshot.deadLetterCommands > snapshot.totalCommands ||
      snapshot.resolvedDeadLetterCommands > snapshot.totalCommands ||
      snapshot.retryingCommands > snapshot.pendingCommands ||
      snapshot.redeliveredCommands > snapshot.totalCommands
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Session Queue health counts must remain within their parent totals',
      });
    }
    if (
      (snapshot.pendingCommands === 0 && snapshot.oldestPendingAgeMs !== undefined) ||
      (snapshot.pendingCommands > 0 && snapshot.oldestPendingAgeMs === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['oldestPendingAgeMs'],
        message: 'oldestPendingAgeMs must be present exactly when pending work exists',
      });
    }
  }) satisfies ZodType<SessionQueueHealthSnapshot>;

export const sessionQueueHealthSnapshotDefinition = defineSpecSchema<SessionQueueHealthSnapshot>({
  id: 'SessionQueueHealthSnapshot',
  zod: sessionQueueHealthSnapshotSchema,
  jsonSchema: {
    type: 'object',
    required: [
      'version',
      'totalCommands',
      'pendingCommands',
      'queuedCommands',
      'claimedCommands',
      'deadLetterCommands',
      'resolvedDeadLetterCommands',
      'retryingCommands',
      'redeliveredCommands',
      'recoveredExpiredLeases',
      'leaseRecoveryCount',
    ],
    properties: {
      version: { const: '1.0.0' },
      totalCommands: { type: 'integer', minimum: 0 },
      pendingCommands: { type: 'integer', minimum: 0 },
      queuedCommands: { type: 'integer', minimum: 0 },
      claimedCommands: { type: 'integer', minimum: 0 },
      deadLetterCommands: { type: 'integer', minimum: 0 },
      resolvedDeadLetterCommands: { type: 'integer', minimum: 0 },
      retryingCommands: { type: 'integer', minimum: 0 },
      redeliveredCommands: { type: 'integer', minimum: 0 },
      recoveredExpiredLeases: { type: 'integer', minimum: 0 },
      leaseRecoveryCount: { type: 'integer', minimum: 0 },
      oldestPendingAgeMs: { type: 'integer', minimum: 0 },
    },
    additionalProperties: false,
  },
  example: {
    version: '1.0.0',
    totalCommands: 4,
    pendingCommands: 2,
    queuedCommands: 1,
    claimedCommands: 1,
    deadLetterCommands: 1,
    resolvedDeadLetterCommands: 0,
    retryingCommands: 1,
    redeliveredCommands: 1,
    recoveredExpiredLeases: 0,
    leaseRecoveryCount: 1,
    oldestPendingAgeMs: 15_000,
  },
});

export const sessionQueueContractDefinitions = [
  sessionCommandRecordDefinition,
  cancelSessionCommandsRequestDefinition,
  cancelSessionCommandsResultDefinition,
  redriveDeadLetterSessionCommandRequestDefinition,
  closeDeadLetterSessionCommandRequestDefinition,
  sessionQueueHealthSnapshotDefinition,
] as const;
export const sessionQueueContractJsonSchemas = exportSpecJsonSchemas(
  sessionQueueContractDefinitions
);

export function validateSessionCommandRecord(input: unknown): SessionCommandRecord {
  return sessionCommandRecordDefinition.parse(input);
}

export function validateCancelSessionCommandsRequest(input: unknown): CancelSessionCommandsRequest {
  return cancelSessionCommandsRequestDefinition.parse(input);
}

export function validateCancelSessionCommandsResult(input: unknown): CancelSessionCommandsResult {
  return cancelSessionCommandsResultDefinition.parse(input);
}

export function validateRedriveDeadLetterSessionCommandRequest(
  input: unknown
): RedriveDeadLetterSessionCommandRequest {
  return redriveDeadLetterSessionCommandRequestDefinition.parse(input);
}

export function validateCloseDeadLetterSessionCommandRequest(
  input: unknown
): CloseDeadLetterSessionCommandRequest {
  return closeDeadLetterSessionCommandRequestDefinition.parse(input);
}

export function validateListStuckSessionCommandsRequest(
  input: unknown
): ListStuckSessionCommandsRequest {
  return listStuckSessionCommandsRequestSchema.parse(input);
}

export function validateStuckSessionCommand(input: unknown): StuckSessionCommand {
  return stuckSessionCommandSchema.parse(input);
}

export function validateSessionQueueHealthSnapshot(input: unknown): SessionQueueHealthSnapshot {
  return sessionQueueHealthSnapshotDefinition.parse(input);
}
