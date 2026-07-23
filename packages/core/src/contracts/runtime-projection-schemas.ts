import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas, jsonSchemaSchema } from '../schemas';
import type { JsonSchema } from '../specs';
import { RUNTIME_WAIT_INTENT_TYPES, type RuntimeJsonValue } from './runtime-helpers';
import { RUNTIME_RUN_STATUSES } from './runtime';
import type {
  RuntimeOrchestrationProjection,
  RuntimeOrchestrationRunStatus,
} from './runtime-projection';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const jsonValueSchema: ZodType<RuntimeJsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number().finite(),
    z.string(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);
const orchestrationRunStatuses = ['not_created', ...RUNTIME_RUN_STATUSES] as [
  RuntimeOrchestrationRunStatus,
  ...RuntimeOrchestrationRunStatus[],
];

export const runtimeOrchestrationRunStatusSchema = z.enum(orchestrationRunStatuses);

export const runtimeOrchestrationProjectionSchema = z
  .object({
    runId: nonEmptyStringSchema,
    runStatus: runtimeOrchestrationRunStatusSchema,
    currentState: nonEmptyStringSchema.optional(),
    terminalState: nonEmptyStringSchema.optional(),
    statePath: z.array(nonEmptyStringSchema),
    stateVisitCounts: z.record(z.number().int().positive()),
    stateAttempt: z.number().int().nonnegative(),
    pendingTransition: z
      .object({
        eventId: nonEmptyStringSchema,
        from: nonEmptyStringSchema,
        to: nonEmptyStringSchema,
      })
      .strict()
      .optional(),
    pendingHumanActionRef: nonEmptyStringSchema.optional(),
    pendingWait: z
      .object({
        waitId: nonEmptyStringSchema,
        stateId: nonEmptyStringSchema,
        stateAttempt: z.number().int().positive(),
        type: z.enum(RUNTIME_WAIT_INTENT_TYPES),
        key: nonEmptyStringSchema.optional(),
        pendingActionRef: nonEmptyStringSchema.optional(),
        reason: nonEmptyStringSchema.optional(),
        expectedSchema: jsonSchemaSchema.optional(),
        expiresAt: timestampSchema.optional(),
        createdAt: timestampSchema,
      })
      .strict()
      .optional(),
    lastResume: z
      .object({
        commandId: nonEmptyStringSchema,
        kind: z.enum(['manual', 'signal', 'timer']),
        waitId: nonEmptyStringSchema,
        principalId: nonEmptyStringSchema,
        key: nonEmptyStringSchema.optional(),
        payload: jsonValueSchema.optional(),
        resumedAt: timestampSchema,
      })
      .strict()
      .optional(),
    cancellation: z
      .object({
        commandId: nonEmptyStringSchema,
        principalId: nonEmptyStringSchema,
        reason: nonEmptyStringSchema,
        requestedAt: timestampSchema,
      })
      .strict()
      .optional(),
    pendingActivityIds: z
      .array(nonEmptyStringSchema)
      .refine((ids) => new Set(ids).size === ids.length, {
        message: 'pendingActivityIds must be unique',
      }),
  })
  .strict()
  .superRefine((projection, context) => {
    const lastState = projection.statePath.at(-1);
    if (projection.currentState !== lastState) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentState'],
        message: 'currentState must match the final statePath entry',
      });
    }
    const expectedAttempt =
      projection.currentState === undefined
        ? 0
        : (projection.stateVisitCounts[projection.currentState] ?? 0);
    if (projection.stateAttempt !== expectedAttempt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['stateAttempt'],
        message: 'stateAttempt must match the current state visit count',
      });
    }
    if (
      projection.pendingWait &&
      (projection.pendingWait.stateId !== projection.currentState ||
        projection.pendingWait.stateAttempt !== projection.stateAttempt)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pendingWait'],
        message: 'pendingWait must belong to the current State attempt',
      });
    }
    const waitTypesByStatus: Partial<
      Record<RuntimeOrchestrationRunStatus, (typeof RUNTIME_WAIT_INTENT_TYPES)[number]>
    > = {
      waiting_human: 'human',
      waiting_signal: 'signal',
      waiting_timer: 'timer',
      paused: 'pause',
    };
    const expectedWaitType = waitTypesByStatus[projection.runStatus];
    if (expectedWaitType !== undefined && projection.pendingWait?.type !== expectedWaitType) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pendingWait'],
        message: `${projection.runStatus} requires a matching pendingWait`,
      });
    }
    if (projection.runStatus === 'cancelling' && projection.cancellation === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cancellation'],
        message: 'cancelling Runs require cancellation details',
      });
    }
    if (projection.runStatus === 'not_created' && projection.statePath.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['statePath'],
        message: 'An uncreated Run cannot contain FSM state history',
      });
    }
    if (
      ['completed', 'failed', 'cancelled', 'timed_out'].includes(projection.runStatus) &&
      projection.terminalState === undefined
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminalState'],
        message: 'Terminal Runs require terminalState',
      });
    }
  }) satisfies ZodType<RuntimeOrchestrationProjection>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };

export const runtimeOrchestrationProjectionJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'runId',
    'runStatus',
    'statePath',
    'stateVisitCounts',
    'stateAttempt',
    'pendingActivityIds',
  ],
  properties: {
    runId: nonEmptyStringJsonSchema,
    runStatus: { type: 'string', enum: [...orchestrationRunStatuses] },
    currentState: nonEmptyStringJsonSchema,
    terminalState: nonEmptyStringJsonSchema,
    statePath: { type: 'array', items: nonEmptyStringJsonSchema },
    stateVisitCounts: {
      type: 'object',
      additionalProperties: { type: 'integer', minimum: 1 },
    },
    stateAttempt: { type: 'integer', minimum: 0 },
    pendingTransition: {
      type: 'object',
      required: ['eventId', 'from', 'to'],
      properties: {
        eventId: nonEmptyStringJsonSchema,
        from: nonEmptyStringJsonSchema,
        to: nonEmptyStringJsonSchema,
      },
      additionalProperties: false,
    },
    pendingHumanActionRef: nonEmptyStringJsonSchema,
    pendingWait: {
      type: 'object',
      required: ['waitId', 'stateId', 'stateAttempt', 'type', 'createdAt'],
      properties: {
        waitId: nonEmptyStringJsonSchema,
        stateId: nonEmptyStringJsonSchema,
        stateAttempt: { type: 'integer', minimum: 1 },
        type: { type: 'string', enum: [...RUNTIME_WAIT_INTENT_TYPES] },
        key: nonEmptyStringJsonSchema,
        pendingActionRef: nonEmptyStringJsonSchema,
        reason: nonEmptyStringJsonSchema,
        expectedSchema: { type: 'object', additionalProperties: true },
        expiresAt: { type: 'string', format: 'date-time' },
        createdAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
    lastResume: {
      type: 'object',
      required: ['commandId', 'kind', 'waitId', 'principalId', 'resumedAt'],
      properties: {
        commandId: nonEmptyStringJsonSchema,
        kind: { type: 'string', enum: ['manual', 'signal', 'timer'] },
        waitId: nonEmptyStringJsonSchema,
        principalId: nonEmptyStringJsonSchema,
        key: nonEmptyStringJsonSchema,
        payload: {},
        resumedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
    cancellation: {
      type: 'object',
      required: ['commandId', 'principalId', 'reason', 'requestedAt'],
      properties: {
        commandId: nonEmptyStringJsonSchema,
        principalId: nonEmptyStringJsonSchema,
        reason: nonEmptyStringJsonSchema,
        requestedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
    pendingActivityIds: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      uniqueItems: true,
    },
  },
  allOf: [
    {
      if: { properties: { runStatus: { const: 'not_created' } }, required: ['runStatus'] },
      then: {
        properties: {
          statePath: { type: 'array', maxItems: 0 },
          stateAttempt: { const: 0 },
        },
      },
    },
    {
      if: {
        properties: {
          runStatus: { enum: ['completed', 'failed', 'cancelled', 'timed_out'] },
        },
        required: ['runStatus'],
      },
      then: {
        required: ['terminalState'],
        properties: { terminalState: nonEmptyStringJsonSchema },
      },
    },
    {
      if: { properties: { runStatus: { const: 'cancelling' } }, required: ['runStatus'] },
      then: {
        required: ['cancellation'],
        properties: {
          cancellation: {
            type: 'object',
            required: ['commandId', 'principalId', 'reason', 'requestedAt'],
            properties: {
              commandId: nonEmptyStringJsonSchema,
              principalId: nonEmptyStringJsonSchema,
              reason: nonEmptyStringJsonSchema,
              requestedAt: { type: 'string', format: 'date-time' },
            },
            additionalProperties: false,
          },
        },
      },
    },
  ],
  additionalProperties: false,
};

export const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection = {
  runId: 'run.default',
  runStatus: 'running',
  currentState: 'Acting',
  statePath: ['Intake', 'Acting'],
  stateVisitCounts: { Intake: 1, Acting: 1 },
  stateAttempt: 1,
  pendingActivityIds: ['activity.default'],
};

export const runtimeOrchestrationProjectionDefinition =
  defineSpecSchema<RuntimeOrchestrationProjection>({
    id: 'RuntimeOrchestrationProjection',
    zod: runtimeOrchestrationProjectionSchema,
    jsonSchema: runtimeOrchestrationProjectionJsonSchema,
    example: runtimeOrchestrationProjectionExample,
  });

export const runtimeProjectionContractDefinitions = [
  runtimeOrchestrationProjectionDefinition,
] as const;
export const runtimeProjectionContractJsonSchemas = exportSpecJsonSchemas(
  runtimeProjectionContractDefinitions
);

export function validateRuntimeOrchestrationProjection(
  input: unknown
): RuntimeOrchestrationProjection {
  return runtimeOrchestrationProjectionSchema.parse(input);
}
