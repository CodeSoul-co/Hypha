import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import { RUNTIME_RUN_STATUSES } from './runtime';
import type {
  RuntimeOrchestrationProjection,
  RuntimeOrchestrationRunStatus,
} from './runtime-projection';

const nonEmptyStringSchema = z.string().min(1);
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
      then: { required: ['terminalState'] },
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
