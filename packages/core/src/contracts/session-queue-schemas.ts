import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_TYPES,
  type SessionCommandRecord,
  type SessionQueueScope,
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
    payloadRef: nonEmptyStringSchema.optional(),
    payloadHash: hashSchema,
    status: sessionCommandStatusSchema,
    claimedBy: nonEmptyStringSchema.optional(),
    leaseExpiresAt: timestampSchema.optional(),
    resultRunId: nonEmptyStringSchema.optional(),
    resultEventIds: z.array(nonEmptyStringSchema).optional(),
    rejectionCode: nonEmptyStringSchema.optional(),
    createdAt: timestampSchema,
    availableAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    completedAt: timestampSchema.optional(),
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
      if (!record.leaseExpiresAt) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['leaseExpiresAt'],
          message: 'leaseExpiresAt is required for claimed commands',
        });
      }
    }
    if (record.attempts > record.maxAttempts) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['attempts'],
        message: 'attempts must not exceed maxAttempts',
      });
    }
    if (
      ['applied', 'rejected', 'expired', 'failed', 'dead_letter'].includes(record.status) &&
      !record.completedAt
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'completedAt is required for terminal commands',
      });
    }
    if (['rejected', 'failed', 'dead_letter'].includes(record.status) && !record.rejectionCode) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rejectionCode'],
        message: 'rejectionCode is required for rejected commands',
      });
    }
  }) satisfies ZodType<SessionCommandRecord>;

const stringProperty: JsonSchema = { type: 'string', minLength: 1 };
const timestampProperty: JsonSchema = { type: 'string', format: 'date-time' };

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
    payloadRef: stringProperty,
    payloadHash: { type: 'string', pattern: '^sha256:[a-f0-9]{64}$' },
    status: { type: 'string', enum: [...SESSION_COMMAND_STATUSES] },
    claimedBy: stringProperty,
    leaseExpiresAt: timestampProperty,
    resultRunId: stringProperty,
    resultEventIds: { type: 'array', items: stringProperty },
    rejectionCode: stringProperty,
    createdAt: timestampProperty,
    availableAt: timestampProperty,
    expiresAt: timestampProperty,
    completedAt: timestampProperty,
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { status: { const: 'claimed' } }, required: ['status'] },
      then: {
        properties: { claimedBy: stringProperty, leaseExpiresAt: timestampProperty },
        required: ['claimedBy', 'leaseExpiresAt'],
      },
    },
    {
      if: {
        properties: {
          status: { enum: ['applied', 'rejected', 'expired', 'failed', 'dead_letter'] },
        },
        required: ['status'],
      },
      then: { properties: { completedAt: timestampProperty }, required: ['completedAt'] },
    },
    {
      if: {
        properties: { status: { enum: ['rejected', 'failed', 'dead_letter'] } },
        required: ['status'],
      },
      then: { properties: { rejectionCode: stringProperty }, required: ['rejectionCode'] },
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

export const sessionQueueContractDefinitions = [sessionCommandRecordDefinition] as const;
export const sessionQueueContractJsonSchemas = exportSpecJsonSchemas(
  sessionQueueContractDefinitions
);

export function validateSessionCommandRecord(input: unknown): SessionCommandRecord {
  return sessionCommandRecordDefinition.parse(input);
}
