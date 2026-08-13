import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { FrameworkEventType } from '../events';
import type { JsonSchema } from '../specs';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
  runtimeOrchestrationRunStatusSchema,
} from './runtime-projection-schemas';
import { runtimeScopeJsonSchema, runtimeScopeSchema } from './runtime-schemas';
import type {
  RuntimeQueryRequest,
  RuntimeRunView,
  RuntimeStateExplanation,
  RuntimeTimelineRequest,
} from './runtime-query';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const eventTypeSchema = z.custom<FrameworkEventType>(
  (value) => typeof value === 'string' && value.trim().length > 0,
  'Event type must be non-empty'
);

export const runtimeQueryRequestSchema = z
  .object({ scope: runtimeScopeSchema })
  .strict() satisfies ZodType<RuntimeQueryRequest>;

export const runtimeTimelineRequestSchema = z
  .object({
    scope: runtimeScopeSchema,
    fromSequence: z.number().int().positive().optional(),
    toSequence: z.number().int().positive().optional(),
    types: z.array(eventTypeSchema).min(1).optional(),
    limit: z.number().int().positive().max(10_000).optional(),
  })
  .strict()
  .superRefine((request, context) => {
    if (
      request.fromSequence !== undefined &&
      request.toSequence !== undefined &&
      request.toSequence < request.fromSequence
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['toSequence'],
        message: 'Timeline toSequence must not precede fromSequence',
      });
    }
  }) satisfies ZodType<RuntimeTimelineRequest>;

export const runtimeRunViewSchema = z
  .object({
    scope: runtimeScopeSchema,
    projectionVersion: nonEmptyStringSchema,
    projection: runtimeOrchestrationProjectionSchema,
    projectionLastSequence: z.number().int().nonnegative(),
    eventHeadSequence: z.number().int().nonnegative(),
    projectionLag: z.number().int().nonnegative(),
    refreshedAt: timestampSchema,
  })
  .strict()
  .superRefine((view, context) => {
    if (view.scope.runId !== view.projection.runId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['projection', 'runId'],
        message: 'Runtime Run view scope must match its projection',
      });
    }
    if (view.projectionLag !== view.eventHeadSequence - view.projectionLastSequence) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['projectionLag'],
        message: 'Runtime Run view lag must match Event and Projection sequences',
      });
    }
  }) satisfies ZodType<RuntimeRunView>;

export const runtimeStateExplanationSchema = z
  .object({
    scope: runtimeScopeSchema,
    runStatus: runtimeOrchestrationRunStatusSchema,
    currentState: nonEmptyStringSchema.optional(),
    stateAttempt: z.number().int().nonnegative(),
    statePath: z.array(nonEmptyStringSchema),
    pendingWaitId: nonEmptyStringSchema.optional(),
    pendingTransitionEventId: nonEmptyStringSchema.optional(),
    pendingActivityIds: z.array(nonEmptyStringSchema),
    lastEventSequence: z.number().int().nonnegative(),
    source: z.literal('runtime.orchestration.projection'),
  })
  .strict() satisfies ZodType<RuntimeStateExplanation>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
export const runtimeQueryRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['scope'],
  properties: { scope: runtimeScopeJsonSchema },
  additionalProperties: false,
};
export const runtimeTimelineRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['scope'],
  properties: {
    scope: runtimeScopeJsonSchema,
    fromSequence: { type: 'integer', minimum: 1 },
    toSequence: { type: 'integer', minimum: 1 },
    types: { type: 'array', minItems: 1, items: nonEmptyStringJsonSchema },
    limit: { type: 'integer', minimum: 1, maximum: 10_000 },
  },
  additionalProperties: false,
};
export const runtimeRunViewJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'scope',
    'projectionVersion',
    'projection',
    'projectionLastSequence',
    'eventHeadSequence',
    'projectionLag',
    'refreshedAt',
  ],
  properties: {
    scope: runtimeScopeJsonSchema,
    projectionVersion: nonEmptyStringJsonSchema,
    projection: runtimeOrchestrationProjectionJsonSchema,
    projectionLastSequence: { type: 'integer', minimum: 0 },
    eventHeadSequence: { type: 'integer', minimum: 0 },
    projectionLag: { type: 'integer', minimum: 0 },
    refreshedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};
export const runtimeStateExplanationJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'scope',
    'runStatus',
    'stateAttempt',
    'statePath',
    'pendingActivityIds',
    'lastEventSequence',
    'source',
  ],
  properties: {
    scope: runtimeScopeJsonSchema,
    runStatus: {
      type: 'string',
      enum: [
        'not_created',
        'created',
        'queued',
        'starting',
        'acquiring',
        'running',
        'waiting',
        'waiting_human',
        'waiting_signal',
        'waiting_timer',
        'pausing',
        'paused',
        'retry_scheduled',
        'recovering',
        'cancelling',
        'completed',
        'failed',
        'cancelled',
        'timed_out',
      ],
    },
    currentState: nonEmptyStringJsonSchema,
    stateAttempt: { type: 'integer', minimum: 0 },
    statePath: { type: 'array', items: nonEmptyStringJsonSchema },
    pendingWaitId: nonEmptyStringJsonSchema,
    pendingTransitionEventId: nonEmptyStringJsonSchema,
    pendingActivityIds: { type: 'array', items: nonEmptyStringJsonSchema },
    lastEventSequence: { type: 'integer', minimum: 0 },
    source: { const: 'runtime.orchestration.projection' },
  },
  additionalProperties: false,
};

export const runtimeQueryRequestExample: RuntimeQueryRequest = {
  scope: {
    tenantId: 'tenant.default',
    userId: 'user.default',
    sessionId: 'session.default',
    runId: 'run.default',
  },
};
export const runtimeTimelineRequestExample: RuntimeTimelineRequest = {
  ...runtimeQueryRequestExample,
  fromSequence: 1,
  toSequence: 10,
  types: ['fsm.state.entered'],
  limit: 100,
};
export const runtimeRunViewExample: RuntimeRunView = {
  scope: runtimeQueryRequestExample.scope,
  projectionVersion: '1.3.0',
  projection: {
    runId: 'run.default',
    runStatus: 'running',
    currentState: 'Acting',
    statePath: ['Acting'],
    stateVisitCounts: { Acting: 1 },
    stateAttempt: 1,
    pendingActivityIds: [],
  },
  projectionLastSequence: 3,
  eventHeadSequence: 3,
  projectionLag: 0,
  refreshedAt: '2026-07-18T14:00:00.000Z',
};
export const runtimeStateExplanationExample: RuntimeStateExplanation = {
  scope: runtimeQueryRequestExample.scope,
  runStatus: 'running',
  currentState: 'Acting',
  stateAttempt: 1,
  statePath: ['Acting'],
  pendingActivityIds: [],
  lastEventSequence: 3,
  source: 'runtime.orchestration.projection',
};

export const runtimeQueryRequestDefinition = defineSpecSchema<RuntimeQueryRequest>({
  id: 'RuntimeQueryRequest',
  zod: runtimeQueryRequestSchema,
  jsonSchema: runtimeQueryRequestJsonSchema,
  example: runtimeQueryRequestExample,
});
export const runtimeTimelineRequestDefinition = defineSpecSchema<RuntimeTimelineRequest>({
  id: 'RuntimeTimelineRequest',
  zod: runtimeTimelineRequestSchema,
  jsonSchema: runtimeTimelineRequestJsonSchema,
  example: runtimeTimelineRequestExample,
});
export const runtimeRunViewDefinition = defineSpecSchema<RuntimeRunView>({
  id: 'RuntimeRunView',
  zod: runtimeRunViewSchema,
  jsonSchema: runtimeRunViewJsonSchema,
  example: runtimeRunViewExample,
});
export const runtimeStateExplanationDefinition = defineSpecSchema<RuntimeStateExplanation>({
  id: 'RuntimeStateExplanation',
  zod: runtimeStateExplanationSchema,
  jsonSchema: runtimeStateExplanationJsonSchema,
  example: runtimeStateExplanationExample,
});
export const runtimeQueryContractDefinitions = [
  runtimeQueryRequestDefinition,
  runtimeTimelineRequestDefinition,
  runtimeRunViewDefinition,
  runtimeStateExplanationDefinition,
] as const;
export const runtimeQueryContractJsonSchemas = exportSpecJsonSchemas(
  runtimeQueryContractDefinitions
);

export function validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest {
  return runtimeQueryRequestDefinition.parse(input);
}
export function validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest {
  return runtimeTimelineRequestDefinition.parse(input);
}
export function validateRuntimeRunView(input: unknown): RuntimeRunView {
  return runtimeRunViewDefinition.parse(input);
}
export function validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation {
  return runtimeStateExplanationDefinition.parse(input);
}
