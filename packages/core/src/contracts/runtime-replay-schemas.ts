import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
} from './runtime-projection-schemas';
import { runtimeScopeJsonSchema, runtimeScopeSchema } from './runtime-schemas';
import {
  RUNTIME_REPLAY_DIVERGENCE_KINDS,
  type RuntimeReplayRequest,
  type RuntimeReplayResult,
  type RuntimeReplayVerificationRequest,
  type RuntimeReplayVerificationResult,
} from './runtime-replay';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const divergenceSchema = z
  .object({
    kind: z.enum(RUNTIME_REPLAY_DIVERGENCE_KINDS),
    expected: nonEmptyStringSchema,
    actual: nonEmptyStringSchema,
    message: nonEmptyStringSchema,
  })
  .strict();

export const runtimeReplayRequestSchema = z
  .object({
    scope: runtimeScopeSchema,
    checkpointId: nonEmptyStringSchema.optional(),
    expectedWorkflowRevision: nonEmptyStringSchema,
    expectedProcessHash: nonEmptyStringSchema,
    expectedDependencySnapshotRef: nonEmptyStringSchema,
    toSequence: z.number().int().positive().optional(),
    requestedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeReplayRequest>;

export const runtimeReplayResultSchema = z
  .object({
    sourceRunId: nonEmptyStringSchema,
    mode: z.literal('deterministic'),
    checkpointId: nonEmptyStringSchema,
    baseEventSequence: z.number().int().positive(),
    targetEventSequence: z.number().int().positive(),
    replayedEventCount: z.number().int().nonnegative(),
    appliedEventCount: z.number().int().nonnegative(),
    eventIds: z.array(nonEmptyStringSchema),
    workflowRevision: nonEmptyStringSchema,
    processHash: nonEmptyStringSchema,
    dependencySnapshotRef: nonEmptyStringSchema,
    projectionVersion: nonEmptyStringSchema,
    finalSnapshot: runtimeOrchestrationProjectionSchema,
    finalSnapshotChecksum: nonEmptyStringSchema,
    divergences: z.array(divergenceSchema),
    completedAt: timestampSchema,
  })
  .strict()
  .superRefine((result, context) => {
    if (result.sourceRunId !== result.finalSnapshot.runId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['finalSnapshot', 'runId'],
        message: 'Replay source Run must match the final Snapshot',
      });
    }
    if (result.targetEventSequence < result.baseEventSequence) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['targetEventSequence'],
        message: 'Replay target cannot precede its Checkpoint base',
      });
    }
    if (result.replayedEventCount !== result.eventIds.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['replayedEventCount'],
        message: 'Replay Event count must match eventIds',
      });
    }
    if (result.replayedEventCount !== result.targetEventSequence - result.baseEventSequence) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['replayedEventCount'],
        message: 'Replay Event count must match the target sequence interval',
      });
    }
    if (result.appliedEventCount > result.replayedEventCount) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['appliedEventCount'],
        message: 'Applied Event count cannot exceed replayed Event count',
      });
    }
  }) satisfies ZodType<RuntimeReplayResult>;

export const runtimeReplayVerificationRequestSchema = z
  .object({
    replay: runtimeReplayRequestSchema,
    expectedSnapshotChecksum: nonEmptyStringSchema,
  })
  .strict() satisfies ZodType<RuntimeReplayVerificationRequest>;

export const runtimeReplayVerificationResultSchema = z
  .object({
    replay: runtimeReplayResultSchema,
    matches: z.boolean(),
    divergences: z.array(divergenceSchema),
  })
  .strict()
  .superRefine((result, context) => {
    if (result.matches !== (result.divergences.length === 0)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['matches'],
        message: 'Replay verification matches must agree with divergences',
      });
    }
  }) satisfies ZodType<RuntimeReplayVerificationResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const divergenceJsonSchema: JsonSchema = {
  type: 'object',
  required: ['kind', 'expected', 'actual', 'message'],
  properties: {
    kind: { type: 'string', enum: [...RUNTIME_REPLAY_DIVERGENCE_KINDS] },
    expected: nonEmptyStringJsonSchema,
    actual: nonEmptyStringJsonSchema,
    message: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeReplayRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'scope',
    'expectedWorkflowRevision',
    'expectedProcessHash',
    'expectedDependencySnapshotRef',
    'requestedAt',
  ],
  properties: {
    scope: runtimeScopeJsonSchema,
    checkpointId: nonEmptyStringJsonSchema,
    expectedWorkflowRevision: nonEmptyStringJsonSchema,
    expectedProcessHash: nonEmptyStringJsonSchema,
    expectedDependencySnapshotRef: nonEmptyStringJsonSchema,
    toSequence: { type: 'integer', minimum: 1 },
    requestedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};
export const runtimeReplayResultJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'sourceRunId',
    'mode',
    'checkpointId',
    'baseEventSequence',
    'targetEventSequence',
    'replayedEventCount',
    'appliedEventCount',
    'eventIds',
    'workflowRevision',
    'processHash',
    'dependencySnapshotRef',
    'projectionVersion',
    'finalSnapshot',
    'finalSnapshotChecksum',
    'divergences',
    'completedAt',
  ],
  properties: {
    sourceRunId: nonEmptyStringJsonSchema,
    mode: { const: 'deterministic' },
    checkpointId: nonEmptyStringJsonSchema,
    baseEventSequence: { type: 'integer', minimum: 1 },
    targetEventSequence: { type: 'integer', minimum: 1 },
    replayedEventCount: { type: 'integer', minimum: 0 },
    appliedEventCount: { type: 'integer', minimum: 0 },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    workflowRevision: nonEmptyStringJsonSchema,
    processHash: nonEmptyStringJsonSchema,
    dependencySnapshotRef: nonEmptyStringJsonSchema,
    projectionVersion: nonEmptyStringJsonSchema,
    finalSnapshot: runtimeOrchestrationProjectionJsonSchema,
    finalSnapshotChecksum: nonEmptyStringJsonSchema,
    divergences: { type: 'array', items: divergenceJsonSchema },
    completedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};
export const runtimeReplayVerificationRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['replay', 'expectedSnapshotChecksum'],
  properties: {
    replay: runtimeReplayRequestJsonSchema,
    expectedSnapshotChecksum: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeReplayVerificationResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['replay', 'matches', 'divergences'],
  properties: {
    replay: runtimeReplayResultJsonSchema,
    matches: { type: 'boolean' },
    divergences: { type: 'array', items: divergenceJsonSchema },
  },
  additionalProperties: false,
};

export const runtimeReplayRequestExample: RuntimeReplayRequest = {
  scope: {
    tenantId: 'tenant.default',
    userId: 'user.default',
    sessionId: 'session.default',
    runId: 'run.default',
  },
  checkpointId: 'checkpoint.default',
  expectedWorkflowRevision: 'workflow.default@1.0.0',
  expectedProcessHash: 'process-hash.default',
  expectedDependencySnapshotRef: 'dependency-snapshot.default',
  toSequence: 5,
  requestedAt: '2026-07-18T14:00:00.000Z',
};
export const runtimeReplayResultExample: RuntimeReplayResult = {
  sourceRunId: 'run.default',
  mode: 'deterministic',
  checkpointId: 'checkpoint.default',
  baseEventSequence: 3,
  targetEventSequence: 5,
  replayedEventCount: 2,
  appliedEventCount: 1,
  eventIds: ['event.checkpoint.created', 'event.state.entered'],
  workflowRevision: 'workflow.default@1.0.0',
  processHash: 'process-hash.default',
  dependencySnapshotRef: 'dependency-snapshot.default',
  projectionVersion: '1.3.0',
  finalSnapshot: {
    runId: 'run.default',
    runStatus: 'running',
    currentState: 'Observing',
    statePath: ['Acting', 'Observing'],
    stateVisitCounts: { Acting: 1, Observing: 1 },
    stateAttempt: 1,
    pendingActivityIds: [],
  },
  finalSnapshotChecksum: 'snapshot-checksum.default',
  divergences: [],
  completedAt: '2026-07-18T14:00:01.000Z',
};
export const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest = {
  replay: runtimeReplayRequestExample,
  expectedSnapshotChecksum: runtimeReplayResultExample.finalSnapshotChecksum,
};
export const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult = {
  replay: runtimeReplayResultExample,
  matches: true,
  divergences: [],
};

export const runtimeReplayRequestDefinition = defineSpecSchema<RuntimeReplayRequest>({
  id: 'RuntimeReplayRequest',
  zod: runtimeReplayRequestSchema,
  jsonSchema: runtimeReplayRequestJsonSchema,
  example: runtimeReplayRequestExample,
});
export const runtimeReplayResultDefinition = defineSpecSchema<RuntimeReplayResult>({
  id: 'RuntimeReplayResult',
  zod: runtimeReplayResultSchema,
  jsonSchema: runtimeReplayResultJsonSchema,
  example: runtimeReplayResultExample,
});
export const runtimeReplayVerificationRequestDefinition =
  defineSpecSchema<RuntimeReplayVerificationRequest>({
    id: 'RuntimeReplayVerificationRequest',
    zod: runtimeReplayVerificationRequestSchema,
    jsonSchema: runtimeReplayVerificationRequestJsonSchema,
    example: runtimeReplayVerificationRequestExample,
  });
export const runtimeReplayVerificationResultDefinition =
  defineSpecSchema<RuntimeReplayVerificationResult>({
    id: 'RuntimeReplayVerificationResult',
    zod: runtimeReplayVerificationResultSchema,
    jsonSchema: runtimeReplayVerificationResultJsonSchema,
    example: runtimeReplayVerificationResultExample,
  });
export const runtimeReplayContractDefinitions = [
  runtimeReplayRequestDefinition,
  runtimeReplayResultDefinition,
  runtimeReplayVerificationRequestDefinition,
  runtimeReplayVerificationResultDefinition,
] as const;
export const runtimeReplayContractJsonSchemas = exportSpecJsonSchemas(
  runtimeReplayContractDefinitions
);

export function validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest {
  return runtimeReplayRequestDefinition.parse(input);
}
export function validateRuntimeReplayResult(input: unknown): RuntimeReplayResult {
  return runtimeReplayResultDefinition.parse(input);
}
export function validateRuntimeReplayVerificationRequest(
  input: unknown
): RuntimeReplayVerificationRequest {
  return runtimeReplayVerificationRequestDefinition.parse(input);
}
export function validateRuntimeReplayVerificationResult(
  input: unknown
): RuntimeReplayVerificationResult {
  return runtimeReplayVerificationResultDefinition.parse(input);
}
