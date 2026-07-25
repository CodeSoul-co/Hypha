import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  normalizedRuntimeErrorJsonSchema,
  normalizedRuntimeErrorSchema,
  runtimeScopeSchema,
} from './runtime-schemas';
import {
  RUNTIME_ACTIVITY_EFFECTS,
  RUNTIME_ACTIVITY_OBSERVATION_STATUSES,
  RUNTIME_ACTIVITY_TYPES,
  type RuntimeActivityInvocation,
  type RuntimeActivityObservation,
  type RuntimeActivityRequest,
} from './runtime-activities';
import {
  RUNTIME_ACTIVITY_DESCRIPTOR_VERSION,
  RUNTIME_ACTIVITY_KINDS,
  type RuntimeActivityDescriptor,
} from './runtime-activity';
import type { RuntimeJsonValue } from './runtime-helpers';

const nonEmptyStringSchema = z.string().min(1);
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
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
const jsonRecordSchema = z.record(jsonValueSchema);
const retrySchema = z
  .object({
    maxAttempts: z.number().int().positive(),
    initialDelayMs: z.number().int().nonnegative().optional(),
    maxDelayMs: z.number().int().nonnegative().optional(),
  })
  .strict()
  .superRefine((retry, context) => {
    if (
      retry.initialDelayMs !== undefined &&
      retry.maxDelayMs !== undefined &&
      retry.maxDelayMs < retry.initialDelayMs
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['maxDelayMs'],
        message: 'maxDelayMs must be greater than or equal to initialDelayMs',
      });
    }
  });

export const runtimeActivityRequestSchema = z
  .object({
    target: nonEmptyStringSchema,
    input: jsonValueSchema,
    options: z
      .object({
        effect: z.enum(RUNTIME_ACTIVITY_EFFECTS).optional(),
        timeoutMs: z.number().int().positive().optional(),
        retry: retrySchema.optional(),
        idempotencyKey: nonEmptyStringSchema.optional(),
        causationId: nonEmptyStringSchema.optional(),
        metadata: jsonRecordSchema.optional(),
      })
      .strict()
      .optional(),
  })
  .strict() satisfies ZodType<RuntimeActivityRequest>;

export const runtimeActivityInvocationSchema = z
  .object({
    activityId: nonEmptyStringSchema,
    operationId: nonEmptyStringSchema,
    activityType: z.enum(RUNTIME_ACTIVITY_TYPES),
    target: nonEmptyStringSchema,
    input: jsonValueSchema,
    scope: runtimeScopeSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: z.number().int().positive(),
    fencingToken: z.number().int().positive(),
    correlationId: nonEmptyStringSchema,
    causationId: nonEmptyStringSchema.optional(),
    idempotencyKey: nonEmptyStringSchema,
    requestedAt: timestampSchema,
    effect: z.enum(RUNTIME_ACTIVITY_EFFECTS),
    timeoutMs: z.number().int().positive().optional(),
    retry: retrySchema.optional(),
    metadata: jsonRecordSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeActivityInvocation>;

export const runtimeActivityObservationSchema = z
  .object({
    activityId: nonEmptyStringSchema,
    status: z.enum(RUNTIME_ACTIVITY_OBSERVATION_STATUSES),
    eventIds: z.array(nonEmptyStringSchema),
    output: jsonValueSchema.optional(),
    artifactRefs: z.array(nonEmptyStringSchema).optional(),
    retryable: z.boolean().optional(),
    error: normalizedRuntimeErrorSchema.optional(),
    metadata: jsonRecordSchema.optional(),
  })
  .strict()
  .superRefine((observation, context) => {
    if (observation.status === 'failed' && observation.error === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'Failed Activity observations require an error',
      });
    }
    if (observation.status !== 'failed' && observation.error !== undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'Only failed Activity observations may include an error',
      });
    }
  }) satisfies ZodType<RuntimeActivityObservation>;

export const runtimeActivityDescriptorSchema = z
  .object({
    version: z.literal(RUNTIME_ACTIVITY_DESCRIPTOR_VERSION),
    activityId: nonEmptyStringSchema,
    activityKind: z.enum(RUNTIME_ACTIVITY_KINDS),
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: z.number().int().positive(),
    operationId: nonEmptyStringSchema,
    inputRef: nonEmptyStringSchema,
    inputHash: hashSchema,
    providerRef: nonEmptyStringSchema.optional(),
    providerRevision: nonEmptyStringSchema.optional(),
    idempotencyKey: nonEmptyStringSchema,
    deadlineAt: timestampSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeActivityDescriptor>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const hashJsonSchema: JsonSchema = {
  type: 'string',
  pattern: '^sha256:[a-f0-9]{64}$',
};

export const runtimeActivityRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['target', 'input'],
  properties: {
    target: nonEmptyStringJsonSchema,
    input: {},
    options: {
      type: 'object',
      properties: {
        effect: { type: 'string', enum: [...RUNTIME_ACTIVITY_EFFECTS] },
        timeoutMs: { type: 'integer', minimum: 1 },
        retry: {
          type: 'object',
          required: ['maxAttempts'],
          properties: {
            maxAttempts: { type: 'integer', minimum: 1 },
            initialDelayMs: { type: 'integer', minimum: 0 },
            maxDelayMs: { type: 'integer', minimum: 0 },
          },
          additionalProperties: false,
        },
        idempotencyKey: nonEmptyStringJsonSchema,
        causationId: nonEmptyStringJsonSchema,
        metadata: { type: 'object', additionalProperties: {} },
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const runtimeActivityObservationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activityId', 'status', 'eventIds'],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_ACTIVITY_OBSERVATION_STATUSES] },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    output: {},
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    retryable: { type: 'boolean' },
    error: normalizedRuntimeErrorJsonSchema,
    metadata: { type: 'object', additionalProperties: {} },
  },
  additionalProperties: false,
};

export const runtimeActivityDescriptorJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'version',
    'activityId',
    'activityKind',
    'runId',
    'stateId',
    'stateAttempt',
    'operationId',
    'inputRef',
    'inputHash',
    'idempotencyKey',
  ],
  properties: {
    version: { const: RUNTIME_ACTIVITY_DESCRIPTOR_VERSION },
    activityId: nonEmptyStringJsonSchema,
    activityKind: { type: 'string', enum: [...RUNTIME_ACTIVITY_KINDS] },
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    stateAttempt: { type: 'integer', minimum: 1 },
    operationId: nonEmptyStringJsonSchema,
    inputRef: nonEmptyStringJsonSchema,
    inputHash: hashJsonSchema,
    providerRef: nonEmptyStringJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    deadlineAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};

export const runtimeActivityRequestExample: RuntimeActivityRequest = {
  target: 'tool.search',
  input: { query: 'runtime helper' },
  options: {
    effect: 'idempotent',
    timeoutMs: 5000,
    retry: { maxAttempts: 3, initialDelayMs: 100, maxDelayMs: 1000 },
  },
};

export const runtimeActivityDescriptorExample: RuntimeActivityDescriptor = {
  version: '1.0.0',
  activityId: 'activity.default',
  activityKind: 'tool',
  runId: 'run.default',
  stateId: 'Execute',
  stateAttempt: 1,
  operationId: 'operation.default',
  inputRef: 'artifact-ref:activity-input.default',
  inputHash: `sha256:${'a'.repeat(64)}`,
  providerRef: 'tool:filesystem.write',
  providerRevision: '1.0.0',
  idempotencyKey: 'activity.default:attempt:1',
};

export const runtimeActivityRequestDefinition = defineSpecSchema<RuntimeActivityRequest>({
  id: 'RuntimeActivityRequest',
  zod: runtimeActivityRequestSchema,
  jsonSchema: runtimeActivityRequestJsonSchema,
  example: runtimeActivityRequestExample,
});

export const runtimeActivityDescriptorDefinition = defineSpecSchema<RuntimeActivityDescriptor>({
  id: 'RuntimeActivityDescriptor',
  zod: runtimeActivityDescriptorSchema,
  jsonSchema: runtimeActivityDescriptorJsonSchema,
  example: runtimeActivityDescriptorExample,
});

export const runtimeActivityContractDefinitions = [
  runtimeActivityRequestDefinition,
  runtimeActivityDescriptorDefinition,
] as const;
export const runtimeActivityContractJsonSchemas = exportSpecJsonSchemas(
  runtimeActivityContractDefinitions
);

export function validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest {
  return runtimeActivityRequestSchema.parse(input);
}

export function validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation {
  return runtimeActivityInvocationSchema.parse(input);
}

export function validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation {
  return runtimeActivityObservationSchema.parse(input);
}

export function validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor {
  return runtimeActivityDescriptorDefinition.parse(input);
}
