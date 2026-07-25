import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  RUNTIME_TIMER_SWEEP_DISPOSITIONS,
  type RuntimeTimerSweepRequest,
  type RuntimeTimerSweepResult,
} from './runtime-timer';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const streamScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
  })
  .strict();

export const runtimeTimerSweepRequestSchema = z
  .object({
    ownerId: nonEmptyStringSchema,
    leaseTtlMs: z.number().int().positive(),
    limit: z.number().int().min(1).max(1_000),
    cursor: nonEmptyStringSchema.optional(),
    firedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeTimerSweepRequest>;

export const runtimeTimerSweepResultSchema = z
  .object({
    scanned: z.number().int().nonnegative(),
    fired: z.number().int().nonnegative(),
    notDue: z.number().int().nonnegative(),
    leaseUnavailable: z.number().int().nonnegative(),
    alreadyResolved: z.number().int().nonnegative(),
    results: z.array(
      z
        .object({
          scope: streamScopeSchema,
          disposition: z.enum(RUNTIME_TIMER_SWEEP_DISPOSITIONS),
          eventIds: z.array(nonEmptyStringSchema),
        })
        .strict()
    ),
    nextCursor: nonEmptyStringSchema.optional(),
  })
  .strict()
  .superRefine((result, context) => {
    if (result.scanned !== result.results.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['scanned'],
        message: 'scanned must match the number of per-Run results',
      });
    }
    if (
      result.fired + result.notDue + result.leaseUnavailable + result.alreadyResolved !==
      result.scanned
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['results'],
        message: 'Timer sweep counters must account for every result',
      });
    }
  }) satisfies ZodType<RuntimeTimerSweepResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const streamScopeJsonSchema: JsonSchema = {
  type: 'object',
  required: ['userId', 'runId'],
  properties: {
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeTimerSweepRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['ownerId', 'leaseTtlMs', 'limit', 'firedAt'],
  properties: {
    ownerId: nonEmptyStringJsonSchema,
    leaseTtlMs: { type: 'integer', minimum: 1 },
    limit: { type: 'integer', minimum: 1, maximum: 1_000 },
    cursor: nonEmptyStringJsonSchema,
    firedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};

export const runtimeTimerSweepResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['scanned', 'fired', 'notDue', 'leaseUnavailable', 'alreadyResolved', 'results'],
  properties: {
    scanned: nonNegativeIntegerJsonSchema,
    fired: nonNegativeIntegerJsonSchema,
    notDue: nonNegativeIntegerJsonSchema,
    leaseUnavailable: nonNegativeIntegerJsonSchema,
    alreadyResolved: nonNegativeIntegerJsonSchema,
    results: {
      type: 'array',
      items: {
        type: 'object',
        required: ['scope', 'disposition', 'eventIds'],
        properties: {
          scope: streamScopeJsonSchema,
          disposition: { type: 'string', enum: [...RUNTIME_TIMER_SWEEP_DISPOSITIONS] },
          eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
        },
        additionalProperties: false,
      },
    },
    nextCursor: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest = {
  ownerId: 'timer-worker.default',
  leaseTtlMs: 30_000,
  limit: 100,
  firedAt: '2026-07-18T09:00:00.000Z',
};

export const runtimeTimerSweepResultExample: RuntimeTimerSweepResult = {
  scanned: 1,
  fired: 1,
  notDue: 0,
  leaseUnavailable: 0,
  alreadyResolved: 0,
  results: [
    {
      scope: {
        tenantId: 'tenant.default',
        userId: 'user.default',
        runId: 'run.default',
      },
      disposition: 'fired',
      eventIds: ['event.timer.fired', 'event.run.resumed'],
    },
  ],
};

export const runtimeTimerSweepRequestDefinition = defineSpecSchema<RuntimeTimerSweepRequest>({
  id: 'RuntimeTimerSweepRequest',
  zod: runtimeTimerSweepRequestSchema,
  jsonSchema: runtimeTimerSweepRequestJsonSchema,
  example: runtimeTimerSweepRequestExample,
});

export const runtimeTimerSweepResultDefinition = defineSpecSchema<RuntimeTimerSweepResult>({
  id: 'RuntimeTimerSweepResult',
  zod: runtimeTimerSweepResultSchema,
  jsonSchema: runtimeTimerSweepResultJsonSchema,
  example: runtimeTimerSweepResultExample,
});

export const runtimeTimerContractDefinitions = [
  runtimeTimerSweepRequestDefinition,
  runtimeTimerSweepResultDefinition,
] as const;
export const runtimeTimerContractJsonSchemas = exportSpecJsonSchemas(
  runtimeTimerContractDefinitions
);

export function validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest {
  return runtimeTimerSweepRequestDefinition.parse(input);
}

export function validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult {
  return runtimeTimerSweepResultDefinition.parse(input);
}
