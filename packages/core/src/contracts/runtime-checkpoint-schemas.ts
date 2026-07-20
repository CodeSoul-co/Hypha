import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
} from './runtime-projection-schemas';
import { runtimeScopeJsonSchema, runtimeScopeSchema } from './runtime-schemas';
import type { RuntimeJsonValue } from './runtime-helpers';
import {
  RUNTIME_CHECKPOINT_COMPRESSIONS,
  RUNTIME_CHECKPOINT_DISPOSITIONS,
  RUNTIME_CHECKPOINT_MODES,
  RUNTIME_CHECKPOINT_REASONS,
  type RuntimeCheckpointCreateCommand,
  type RuntimeCheckpointCreateResult,
  type RuntimeCheckpointLoadRequest,
  type RuntimeCheckpointLoadResult,
  type RuntimeCheckpointPolicySpec,
  type RuntimeCheckpointRecord,
} from './runtime-checkpoint';

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

export const runtimeCheckpointPolicySpecSchema = z
  .object({
    mode: z.enum(RUNTIME_CHECKPOINT_MODES),
    everyNEvents: z.number().int().positive().optional(),
    retainLast: z.number().int().positive().optional(),
    persistWorkspaceSnapshot: z.boolean().optional(),
    persistContextRefs: z.boolean().optional(),
    compression: z.enum(RUNTIME_CHECKPOINT_COMPRESSIONS).optional(),
  })
  .strict()
  .superRefine((policy, context) => {
    if (policy.mode === 'every_n_events' && policy.everyNEvents === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['everyNEvents'],
        message: 'every_n_events mode requires everyNEvents',
      });
    }
  }) satisfies ZodType<RuntimeCheckpointPolicySpec>;

export const runtimeCheckpointRecordSchema = z
  .object({
    id: nonEmptyStringSchema,
    scope: runtimeScopeSchema,
    sequence: z.number().int().positive(),
    workflowRevision: nonEmptyStringSchema,
    processHash: nonEmptyStringSchema,
    currentState: nonEmptyStringSchema,
    variablesHash: nonEmptyStringSchema,
    projectionVersion: nonEmptyStringSchema,
    projectionSnapshot: runtimeOrchestrationProjectionSchema,
    dependencySnapshotRef: nonEmptyStringSchema,
    toolContractSnapshotRef: nonEmptyStringSchema.optional(),
    workspaceSnapshotRef: nonEmptyStringSchema.optional(),
    contextSnapshotRefs: z.array(nonEmptyStringSchema).optional(),
    pendingWaitRef: nonEmptyStringSchema.optional(),
    lastEventSequence: z.number().int().positive(),
    reason: z.enum(RUNTIME_CHECKPOINT_REASONS),
    requestHash: nonEmptyStringSchema,
    checksum: nonEmptyStringSchema,
    createdAt: timestampSchema,
    metadata: z.record(jsonValueSchema).optional(),
  })
  .strict()
  .superRefine((record, context) => {
    if (record.scope.runId !== record.projectionSnapshot.runId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['projectionSnapshot', 'runId'],
        message: 'Checkpoint scope and projection runId must match',
      });
    }
    if (record.currentState !== record.projectionSnapshot.currentState) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentState'],
        message: 'Checkpoint currentState must match its projection',
      });
    }
  }) satisfies ZodType<RuntimeCheckpointRecord>;

export const runtimeCheckpointCreateCommandSchema = z
  .object({
    checkpointId: nonEmptyStringSchema,
    scope: runtimeScopeSchema,
    ownerId: nonEmptyStringSchema,
    leaseTtlMs: z.number().int().positive(),
    workflowRevision: nonEmptyStringSchema,
    processHash: nonEmptyStringSchema,
    variablesHash: nonEmptyStringSchema,
    dependencySnapshotRef: nonEmptyStringSchema,
    toolContractSnapshotRef: nonEmptyStringSchema.optional(),
    workspaceSnapshotRef: nonEmptyStringSchema.optional(),
    contextSnapshotRefs: z.array(nonEmptyStringSchema).optional(),
    reason: z.enum(RUNTIME_CHECKPOINT_REASONS),
    createdAt: timestampSchema,
    idempotencyKey: nonEmptyStringSchema.optional(),
    metadata: z.record(jsonValueSchema).optional(),
  })
  .strict() satisfies ZodType<RuntimeCheckpointCreateCommand>;

export const runtimeCheckpointCreateResultSchema = z
  .object({
    checkpointId: nonEmptyStringSchema,
    disposition: z.enum(RUNTIME_CHECKPOINT_DISPOSITIONS),
    eventIds: z.array(nonEmptyStringSchema),
    record: runtimeCheckpointRecordSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeCheckpointCreateResult>;

export const runtimeCheckpointLoadRequestSchema = z
  .object({
    scope: runtimeScopeSchema,
    checkpointId: nonEmptyStringSchema.optional(),
    checkedAt: timestampSchema,
  })
  .strict() satisfies ZodType<RuntimeCheckpointLoadRequest>;

export const runtimeCheckpointLoadResultSchema = z
  .object({
    record: runtimeCheckpointRecordSchema,
    currentHeadSequence: z.number().int().positive(),
    deltaFromSequence: z.number().int().positive(),
    deltaEventCount: z.number().int().nonnegative(),
  })
  .strict()
  .superRefine((result, context) => {
    if (result.deltaFromSequence !== result.record.lastEventSequence + 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deltaFromSequence'],
        message: 'Checkpoint delta must start after its last Event',
      });
    }
    if (result.currentHeadSequence < result.record.lastEventSequence) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['currentHeadSequence'],
        message: 'Event head cannot precede the Checkpoint',
      });
    }
  }) satisfies ZodType<RuntimeCheckpointLoadResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const metadataJsonSchema: JsonSchema = { type: 'object', additionalProperties: {} };
export const runtimeCheckpointPolicySpecJsonSchema: JsonSchema = {
  type: 'object',
  required: ['mode'],
  properties: {
    mode: { type: 'string', enum: [...RUNTIME_CHECKPOINT_MODES] },
    everyNEvents: { type: 'integer', minimum: 1 },
    retainLast: { type: 'integer', minimum: 1 },
    persistWorkspaceSnapshot: { type: 'boolean' },
    persistContextRefs: { type: 'boolean' },
    compression: { type: 'string', enum: [...RUNTIME_CHECKPOINT_COMPRESSIONS] },
  },
  allOf: [
    {
      if: { properties: { mode: { const: 'every_n_events' } }, required: ['mode'] },
      then: {
        required: ['everyNEvents'],
        properties: { everyNEvents: { type: 'integer', minimum: 1 } },
      },
    },
  ],
  additionalProperties: false,
};
export const runtimeCheckpointRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'scope',
    'sequence',
    'workflowRevision',
    'processHash',
    'currentState',
    'variablesHash',
    'projectionVersion',
    'projectionSnapshot',
    'dependencySnapshotRef',
    'lastEventSequence',
    'reason',
    'requestHash',
    'checksum',
    'createdAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    scope: runtimeScopeJsonSchema,
    sequence: { type: 'integer', minimum: 1 },
    workflowRevision: nonEmptyStringJsonSchema,
    processHash: nonEmptyStringJsonSchema,
    currentState: nonEmptyStringJsonSchema,
    variablesHash: nonEmptyStringJsonSchema,
    projectionVersion: nonEmptyStringJsonSchema,
    projectionSnapshot: runtimeOrchestrationProjectionJsonSchema,
    dependencySnapshotRef: nonEmptyStringJsonSchema,
    toolContractSnapshotRef: nonEmptyStringJsonSchema,
    workspaceSnapshotRef: nonEmptyStringJsonSchema,
    contextSnapshotRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    pendingWaitRef: nonEmptyStringJsonSchema,
    lastEventSequence: { type: 'integer', minimum: 1 },
    reason: { type: 'string', enum: [...RUNTIME_CHECKPOINT_REASONS] },
    requestHash: nonEmptyStringJsonSchema,
    checksum: nonEmptyStringJsonSchema,
    createdAt: { type: 'string', format: 'date-time' },
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeCheckpointCreateCommandJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'checkpointId',
    'scope',
    'ownerId',
    'leaseTtlMs',
    'workflowRevision',
    'processHash',
    'variablesHash',
    'dependencySnapshotRef',
    'reason',
    'createdAt',
  ],
  properties: {
    checkpointId: nonEmptyStringJsonSchema,
    scope: runtimeScopeJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    leaseTtlMs: { type: 'integer', minimum: 1 },
    workflowRevision: nonEmptyStringJsonSchema,
    processHash: nonEmptyStringJsonSchema,
    variablesHash: nonEmptyStringJsonSchema,
    dependencySnapshotRef: nonEmptyStringJsonSchema,
    toolContractSnapshotRef: nonEmptyStringJsonSchema,
    workspaceSnapshotRef: nonEmptyStringJsonSchema,
    contextSnapshotRefs: { type: 'array', items: nonEmptyStringJsonSchema },
    reason: { type: 'string', enum: [...RUNTIME_CHECKPOINT_REASONS] },
    createdAt: { type: 'string', format: 'date-time' },
    idempotencyKey: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeCheckpointCreateResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['checkpointId', 'disposition', 'eventIds'],
  properties: {
    checkpointId: nonEmptyStringJsonSchema,
    disposition: { type: 'string', enum: [...RUNTIME_CHECKPOINT_DISPOSITIONS] },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    record: runtimeCheckpointRecordJsonSchema,
  },
  additionalProperties: false,
};
export const runtimeCheckpointLoadRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['scope', 'checkedAt'],
  properties: {
    scope: runtimeScopeJsonSchema,
    checkpointId: nonEmptyStringJsonSchema,
    checkedAt: { type: 'string', format: 'date-time' },
  },
  additionalProperties: false,
};
export const runtimeCheckpointLoadResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['record', 'currentHeadSequence', 'deltaFromSequence', 'deltaEventCount'],
  properties: {
    record: runtimeCheckpointRecordJsonSchema,
    currentHeadSequence: { type: 'integer', minimum: 1 },
    deltaFromSequence: { type: 'integer', minimum: 1 },
    deltaEventCount: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
};

export const runtimeCheckpointPolicySpecExample: RuntimeCheckpointPolicySpec = {
  mode: 'state_boundary',
  retainLast: 3,
  persistWorkspaceSnapshot: true,
  compression: 'none',
};
export const runtimeCheckpointRecordExample: RuntimeCheckpointRecord = {
  id: 'checkpoint.default',
  scope: {
    tenantId: 'tenant.default',
    userId: 'user.default',
    sessionId: 'session.default',
    runId: 'run.default',
  },
  sequence: 1,
  workflowRevision: 'workflow.default@1.0.0',
  processHash: 'process-hash.default',
  currentState: 'Acting',
  variablesHash: 'variables-hash.default',
  projectionVersion: '1.3.0',
  projectionSnapshot: {
    runId: 'run.default',
    runStatus: 'running',
    currentState: 'Acting',
    statePath: ['Acting'],
    stateVisitCounts: { Acting: 1 },
    stateAttempt: 1,
    pendingActivityIds: [],
  },
  dependencySnapshotRef: 'dependency-snapshot.default',
  lastEventSequence: 3,
  reason: 'state_boundary',
  requestHash: 'request-hash.default',
  checksum: 'checksum.default',
  createdAt: '2026-07-18T13:00:00.000Z',
};
export const runtimeCheckpointCreateCommandExample: RuntimeCheckpointCreateCommand = {
  checkpointId: 'checkpoint.default',
  scope: runtimeCheckpointRecordExample.scope,
  ownerId: 'runtime-checkpoint.default',
  leaseTtlMs: 30_000,
  workflowRevision: 'workflow.default@1.0.0',
  processHash: 'process-hash.default',
  variablesHash: 'variables-hash.default',
  dependencySnapshotRef: 'dependency-snapshot.default',
  reason: 'state_boundary',
  createdAt: '2026-07-18T13:00:00.000Z',
};
export const runtimeCheckpointCreateResultExample: RuntimeCheckpointCreateResult = {
  checkpointId: 'checkpoint.default',
  disposition: 'applied',
  eventIds: ['event.checkpoint.created'],
  record: runtimeCheckpointRecordExample,
};
export const runtimeCheckpointLoadRequestExample: RuntimeCheckpointLoadRequest = {
  scope: runtimeCheckpointRecordExample.scope,
  checkedAt: '2026-07-18T13:00:01.000Z',
};
export const runtimeCheckpointLoadResultExample: RuntimeCheckpointLoadResult = {
  record: runtimeCheckpointRecordExample,
  currentHeadSequence: 4,
  deltaFromSequence: 4,
  deltaEventCount: 1,
};

export const runtimeCheckpointPolicySpecDefinition = defineSpecSchema<RuntimeCheckpointPolicySpec>({
  id: 'RuntimeCheckpointPolicySpec',
  zod: runtimeCheckpointPolicySpecSchema,
  jsonSchema: runtimeCheckpointPolicySpecJsonSchema,
  example: runtimeCheckpointPolicySpecExample,
});
export const runtimeCheckpointRecordDefinition = defineSpecSchema<RuntimeCheckpointRecord>({
  id: 'RuntimeCheckpointRecord',
  zod: runtimeCheckpointRecordSchema,
  jsonSchema: runtimeCheckpointRecordJsonSchema,
  example: runtimeCheckpointRecordExample,
});
export const runtimeCheckpointCreateCommandDefinition =
  defineSpecSchema<RuntimeCheckpointCreateCommand>({
    id: 'RuntimeCheckpointCreateCommand',
    zod: runtimeCheckpointCreateCommandSchema,
    jsonSchema: runtimeCheckpointCreateCommandJsonSchema,
    example: runtimeCheckpointCreateCommandExample,
  });
export const runtimeCheckpointCreateResultDefinition =
  defineSpecSchema<RuntimeCheckpointCreateResult>({
    id: 'RuntimeCheckpointCreateResult',
    zod: runtimeCheckpointCreateResultSchema,
    jsonSchema: runtimeCheckpointCreateResultJsonSchema,
    example: runtimeCheckpointCreateResultExample,
  });
export const runtimeCheckpointLoadRequestDefinition =
  defineSpecSchema<RuntimeCheckpointLoadRequest>({
    id: 'RuntimeCheckpointLoadRequest',
    zod: runtimeCheckpointLoadRequestSchema,
    jsonSchema: runtimeCheckpointLoadRequestJsonSchema,
    example: runtimeCheckpointLoadRequestExample,
  });
export const runtimeCheckpointLoadResultDefinition = defineSpecSchema<RuntimeCheckpointLoadResult>({
  id: 'RuntimeCheckpointLoadResult',
  zod: runtimeCheckpointLoadResultSchema,
  jsonSchema: runtimeCheckpointLoadResultJsonSchema,
  example: runtimeCheckpointLoadResultExample,
});
export const runtimeCheckpointContractDefinitions = [
  runtimeCheckpointPolicySpecDefinition,
  runtimeCheckpointRecordDefinition,
  runtimeCheckpointCreateCommandDefinition,
  runtimeCheckpointCreateResultDefinition,
  runtimeCheckpointLoadRequestDefinition,
  runtimeCheckpointLoadResultDefinition,
] as const;
export const runtimeCheckpointContractJsonSchemas = exportSpecJsonSchemas(
  runtimeCheckpointContractDefinitions
);

export function validateRuntimeCheckpointPolicySpec(input: unknown): RuntimeCheckpointPolicySpec {
  return runtimeCheckpointPolicySpecDefinition.parse(input);
}
export function validateRuntimeCheckpointRecord(input: unknown): RuntimeCheckpointRecord {
  return runtimeCheckpointRecordDefinition.parse(input);
}
export function validateRuntimeCheckpointCreateCommand(
  input: unknown
): RuntimeCheckpointCreateCommand {
  return runtimeCheckpointCreateCommandDefinition.parse(input);
}
export function validateRuntimeCheckpointCreateResult(
  input: unknown
): RuntimeCheckpointCreateResult {
  return runtimeCheckpointCreateResultDefinition.parse(input);
}
export function validateRuntimeCheckpointLoadRequest(input: unknown): RuntimeCheckpointLoadRequest {
  return runtimeCheckpointLoadRequestDefinition.parse(input);
}
export function validateRuntimeCheckpointLoadResult(input: unknown): RuntimeCheckpointLoadResult {
  return runtimeCheckpointLoadResultDefinition.parse(input);
}
