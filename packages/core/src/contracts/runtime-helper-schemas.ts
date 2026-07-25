import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas, jsonSchemaSchema } from '../schemas';
import type { JsonSchema } from '../specs';
import type { RuntimeObservationEventType } from '../events';
import {
  normalizedRuntimeErrorSchema,
  normalizedRuntimeErrorJsonSchema,
  runtimeScopeSchema,
} from './runtime-schemas';
import {
  RUNTIME_DETERMINISTIC_OBSERVATION_KINDS,
  RUNTIME_WAIT_INTENT_TYPES,
  type RuntimeDeterminismScope,
  type RuntimeDeterministicObservation,
  type RuntimeHelperExecutionScope,
  type RuntimeJsonValue,
  type RuntimeObservationEventInput,
  type RuntimeStateExecutionResult,
  type RuntimeTransitionProposal,
  type RuntimeWaitIntent,
} from './runtime-helpers';

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
const jsonRecordSchema = z.record(jsonValueSchema);
const runtimeObservationEventTypeSchema = z
  .string()
  .regex(/^runtime\.observation\.[a-z0-9][a-z0-9._-]*$/u) as ZodType<RuntimeObservationEventType>;

export const runtimeTransitionProposalSchema = z
  .object({
    to: nonEmptyStringSchema,
    reason: nonEmptyStringSchema.optional(),
    variablesPatch: jsonRecordSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeTransitionProposal>;

export const runtimeWaitIntentSchema = z
  .object({
    type: z.enum(RUNTIME_WAIT_INTENT_TYPES),
    key: nonEmptyStringSchema.optional(),
    expectedSchema: jsonSchemaSchema.optional(),
    expiresAt: timestampSchema.optional(),
    timeoutTransitionId: nonEmptyStringSchema.optional(),
    pendingActionRef: nonEmptyStringSchema.optional(),
    reason: nonEmptyStringSchema.optional(),
    metadata: jsonRecordSchema.optional(),
  })
  .strict()
  .superRefine((intent, context) => {
    if (intent.type === 'signal' && intent.key === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['key'],
        message: 'Signal wait requires a key',
      });
    }
    if (intent.type === 'timer' && intent.expiresAt === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'Timer wait requires expiresAt',
      });
    }
    if (intent.type === 'pause' && intent.reason === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['reason'],
        message: 'Pause wait requires a reason',
      });
    }
  }) satisfies ZodType<RuntimeWaitIntent>;

export const runtimeStateExecutionResultSchema = z.discriminatedUnion('kind', [
  z
    .object({
      kind: z.literal('completed'),
      output: jsonValueSchema.optional(),
      variablesPatch: jsonRecordSchema.optional(),
    })
    .strict(),
  z.object({ kind: z.literal('continued'), observation: jsonValueSchema.optional() }).strict(),
  z.object({ kind: z.literal('failed'), error: normalizedRuntimeErrorSchema }).strict(),
  z.object({ kind: z.literal('waiting'), wait: runtimeWaitIntentSchema }).strict(),
]) satisfies ZodType<RuntimeStateExecutionResult>;

export const runtimeDeterminismScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: z.number().int().positive(),
  })
  .strict() satisfies ZodType<RuntimeDeterminismScope>;

export const runtimeDeterministicObservationSchema = z
  .object({
    scope: runtimeDeterminismScopeSchema,
    key: nonEmptyStringSchema,
    kind: z.enum(RUNTIME_DETERMINISTIC_OBSERVATION_KINDS),
    value: jsonValueSchema,
  })
  .strict() satisfies ZodType<RuntimeDeterministicObservation>;

export const runtimeHelperExecutionScopeSchema = z
  .object({
    scope: runtimeScopeSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: z.number().int().positive(),
    fencingToken: z.number().int().positive(),
    correlationId: nonEmptyStringSchema,
    causationId: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeHelperExecutionScope>;

const runtimeEventAppendOptionsSchema = z
  .object({
    idempotencyKey: nonEmptyStringSchema.optional(),
    causationId: nonEmptyStringSchema.optional(),
    parentEventId: nonEmptyStringSchema.optional(),
    metadata: jsonRecordSchema.optional(),
  })
  .strict();

export const runtimeObservationEventInputSchema = z
  .object({
    type: runtimeObservationEventTypeSchema,
    payload: jsonValueSchema,
    options: runtimeEventAppendOptionsSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeObservationEventInput>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const jsonValueJsonSchema: JsonSchema = {};
const jsonRecordJsonSchema: JsonSchema = { type: 'object', additionalProperties: {} };

export const runtimeTransitionProposalJsonSchema: JsonSchema = {
  type: 'object',
  required: ['to'],
  properties: {
    to: nonEmptyStringJsonSchema,
    reason: nonEmptyStringJsonSchema,
    variablesPatch: jsonRecordJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeWaitIntentJsonSchema: JsonSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    type: { type: 'string', enum: [...RUNTIME_WAIT_INTENT_TYPES] },
    key: nonEmptyStringJsonSchema,
    expectedSchema: { type: 'object', additionalProperties: true },
    expiresAt: timestampJsonSchema,
    timeoutTransitionId: nonEmptyStringJsonSchema,
    pendingActionRef: nonEmptyStringJsonSchema,
    reason: nonEmptyStringJsonSchema,
    metadata: jsonRecordJsonSchema,
  },
  allOf: [
    {
      if: { properties: { type: { const: 'signal' } }, required: ['type'] },
      then: { properties: { key: nonEmptyStringJsonSchema }, required: ['key'] },
    },
    {
      if: { properties: { type: { const: 'timer' } }, required: ['type'] },
      then: { properties: { expiresAt: timestampJsonSchema }, required: ['expiresAt'] },
    },
    {
      if: { properties: { type: { const: 'pause' } }, required: ['type'] },
      then: { properties: { reason: nonEmptyStringJsonSchema }, required: ['reason'] },
    },
  ],
  additionalProperties: false,
};

export const runtimeStateExecutionResultJsonSchema: JsonSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['kind'],
      properties: {
        kind: { const: 'completed' },
        output: jsonValueJsonSchema,
        variablesPatch: jsonRecordJsonSchema,
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['kind'],
      properties: { kind: { const: 'continued' }, observation: jsonValueJsonSchema },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['kind', 'error'],
      properties: { kind: { const: 'failed' }, error: normalizedRuntimeErrorJsonSchema },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['kind', 'wait'],
      properties: { kind: { const: 'waiting' }, wait: runtimeWaitIntentJsonSchema },
      additionalProperties: false,
    },
  ],
};

export const runtimeDeterministicObservationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['scope', 'key', 'kind', 'value'],
  properties: {
    scope: {
      type: 'object',
      required: ['userId', 'runId', 'stateId', 'stateAttempt'],
      properties: {
        tenantId: nonEmptyStringJsonSchema,
        userId: nonEmptyStringJsonSchema,
        runId: nonEmptyStringJsonSchema,
        stateId: nonEmptyStringJsonSchema,
        stateAttempt: { type: 'integer', minimum: 1 },
      },
      additionalProperties: false,
    },
    key: nonEmptyStringJsonSchema,
    kind: { type: 'string', enum: [...RUNTIME_DETERMINISTIC_OBSERVATION_KINDS] },
    value: jsonValueJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeObservationEventInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['type', 'payload'],
  properties: {
    type: {
      type: 'string',
      pattern: '^runtime\\.observation\\.[a-z0-9][a-z0-9._-]*$',
    },
    payload: jsonValueJsonSchema,
    options: {
      type: 'object',
      properties: {
        idempotencyKey: nonEmptyStringJsonSchema,
        causationId: nonEmptyStringJsonSchema,
        parentEventId: nonEmptyStringJsonSchema,
        metadata: jsonRecordJsonSchema,
      },
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export const runtimeTransitionProposalExample: RuntimeTransitionProposal = {
  to: 'Review',
  reason: 'Output requires approval',
  variablesPatch: { reviewRequired: true },
};

export const runtimeWaitIntentExample: RuntimeWaitIntent = {
  type: 'signal',
  key: 'approval.received',
  expectedSchema: {
    type: 'object',
    required: ['approved'],
    properties: { approved: { type: 'boolean' } },
  },
  expiresAt: '2026-07-19T08:00:00.000Z',
};

export const runtimeStateExecutionResultExample: RuntimeStateExecutionResult = {
  kind: 'waiting',
  wait: runtimeWaitIntentExample,
};

export const runtimeDeterministicObservationExample: RuntimeDeterministicObservation = {
  scope: {
    tenantId: 'tenant.example',
    userId: 'user.example',
    runId: 'run.example',
    stateId: 'state.plan',
    stateAttempt: 1,
  },
  key: 'clock.now:1',
  kind: 'clock',
  value: '2026-07-18T08:00:00.000Z',
};

export const runtimeObservationEventInputExample: RuntimeObservationEventInput = {
  type: 'runtime.observation.plan.created',
  payload: { planRef: 'artifact://plan/example' },
  options: {
    idempotencyKey: 'observation:plan:example',
    metadata: { source: 'state.plan' },
  },
};

export const runtimeTransitionProposalDefinition = defineSpecSchema<RuntimeTransitionProposal>({
  id: 'RuntimeTransitionProposal',
  zod: runtimeTransitionProposalSchema,
  jsonSchema: runtimeTransitionProposalJsonSchema,
  example: runtimeTransitionProposalExample,
});

export const runtimeWaitIntentDefinition = defineSpecSchema<RuntimeWaitIntent>({
  id: 'RuntimeWaitIntent',
  zod: runtimeWaitIntentSchema,
  jsonSchema: runtimeWaitIntentJsonSchema,
  example: runtimeWaitIntentExample,
});

export const runtimeStateExecutionResultDefinition = defineSpecSchema<RuntimeStateExecutionResult>({
  id: 'RuntimeStateExecutionResult',
  zod: runtimeStateExecutionResultSchema,
  jsonSchema: runtimeStateExecutionResultJsonSchema,
  example: runtimeStateExecutionResultExample,
});

export const runtimeDeterministicObservationDefinition =
  defineSpecSchema<RuntimeDeterministicObservation>({
    id: 'RuntimeDeterministicObservation',
    zod: runtimeDeterministicObservationSchema,
    jsonSchema: runtimeDeterministicObservationJsonSchema,
    example: runtimeDeterministicObservationExample,
  });

export const runtimeObservationEventInputDefinition =
  defineSpecSchema<RuntimeObservationEventInput>({
    id: 'RuntimeObservationEventInput',
    zod: runtimeObservationEventInputSchema,
    jsonSchema: runtimeObservationEventInputJsonSchema,
    example: runtimeObservationEventInputExample,
  });

export const runtimeHelperContractDefinitions = [
  runtimeTransitionProposalDefinition,
  runtimeWaitIntentDefinition,
  runtimeStateExecutionResultDefinition,
  runtimeDeterministicObservationDefinition,
  runtimeObservationEventInputDefinition,
] as const;

export const runtimeHelperContractJsonSchemas = exportSpecJsonSchemas(
  runtimeHelperContractDefinitions
);

export function validateRuntimeTransitionProposal(input: unknown): RuntimeTransitionProposal {
  return runtimeTransitionProposalDefinition.parse(input);
}

export function validateRuntimeWaitIntent(input: unknown): RuntimeWaitIntent {
  return runtimeWaitIntentDefinition.parse(input);
}

export function validateRuntimeStateExecutionResult(input: unknown): RuntimeStateExecutionResult {
  return runtimeStateExecutionResultDefinition.parse(input);
}

export function validateRuntimeDeterministicObservation(
  input: unknown
): RuntimeDeterministicObservation {
  return runtimeDeterministicObservationDefinition.parse(input);
}

export function validateRuntimeHelperExecutionScope(input: unknown): RuntimeHelperExecutionScope {
  return runtimeHelperExecutionScopeSchema.parse(input);
}

export function validateRuntimeObservationEventInput(input: unknown): RuntimeObservationEventInput {
  return runtimeObservationEventInputDefinition.parse(input);
}
