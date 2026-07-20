import { z, type ZodType } from 'zod';
import type {
  ExecutionActivityRequest,
  ExecutionActivityResult,
  ExecutionActivityStatus,
  WorkspaceOperationRequest,
} from '../../contracts/execution-activities';
import type { JsonSchema } from '../../specs';
import {
  commandExecutionRequestExample,
  commandExecutionRequestJsonSchema,
  commandExecutionRequestSchema,
} from '../command-execution';
import { normalizedExecutionErrorJsonSchema, normalizedExecutionErrorSchema } from '../execution';
import {
  workspaceDeleteRequestSchema,
  workspaceListRequestSchema,
  workspaceOperationJsonSchemas,
  workspacePathRequestSchema,
  workspaceReadRequestSchema,
  workspaceWriteRequestExample,
  workspaceWriteRequestSchema,
} from '../workspace/operations';
import {
  workspaceDiffRequestSchema,
  workspacePatchRequestSchema,
  workspaceRestoreRequestSchema,
  workspaceSnapshotJsonSchemas,
  workspaceSnapshotRequestSchema,
} from '../workspace/snapshots';

const nonEmptyString = z.string().min(1);
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });

export const executionActivityStatusSchema = z.enum([
  'completed',
  'failed',
  'timeout',
  'cancelled',
  'unknown',
]) satisfies ZodType<ExecutionActivityStatus>;

export const workspaceOperationRequestSchema = z.union([
  workspacePathRequestSchema,
  workspaceListRequestSchema,
  workspaceReadRequestSchema,
  workspaceWriteRequestSchema,
  workspaceDeleteRequestSchema,
  workspaceSnapshotRequestSchema,
  workspaceRestoreRequestSchema,
  workspaceDiffRequestSchema,
  workspacePatchRequestSchema,
]) satisfies ZodType<WorkspaceOperationRequest>;

export const executionActivityRequestSchema = z
  .object({
    activityId: nonEmptyString,
    operationId: nonEmptyString,
    runId: nonEmptyString,
    stateAttemptId: nonEmptyString,
    workspaceId: nonEmptyString,
    request: z.union([commandExecutionRequestSchema, workspaceOperationRequestSchema]),
    fencingToken: positiveInteger,
    deadlineAt: timestampSchema.optional(),
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.request.workspaceId !== value.workspaceId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['request', 'workspaceId'],
        message: 'must match the activity workspaceId',
      });
    }
    if ('operationId' in value.request && value.request.operationId !== value.operationId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['request', 'operationId'],
        message: 'must match the activity operationId',
      });
    }
    if ('runId' in value.request && value.request.runId !== value.runId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['request', 'runId'],
        message: 'must match the activity runId',
      });
    }
    if (
      value.idempotencyKey &&
      'idempotencyKey' in value.request &&
      value.request.idempotencyKey &&
      value.request.idempotencyKey !== value.idempotencyKey
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['request', 'idempotencyKey'],
        message: 'must match the activity idempotencyKey when both are declared',
      });
    }
  }) satisfies ZodType<ExecutionActivityRequest>;

export const executionActivityResultSchema = z
  .object({
    activityId: nonEmptyString,
    status: executionActivityStatusSchema,
    executionId: nonEmptyString.optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    snapshotRef: nonEmptyString.optional(),
    eventIds: z.array(nonEmptyString).min(1),
    error: normalizedExecutionErrorSchema.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.artifactRefs && new Set(value.artifactRefs).size !== value.artifactRefs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artifactRefs'],
        message: 'must not contain duplicate Artifact references',
      });
    }
    if (new Set(value.eventIds).size !== value.eventIds.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['eventIds'],
        message: 'must not contain duplicate Event identifiers',
      });
    }
    if (value.status === 'completed' && value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'must not be present for a completed activity',
      });
    }
  }) satisfies ZodType<ExecutionActivityResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const workspaceOperationRequestJsonSchema: JsonSchema = {
  oneOf: [
    workspaceOperationJsonSchemas.WorkspacePathRequest,
    workspaceOperationJsonSchemas.WorkspaceListRequest,
    workspaceOperationJsonSchemas.WorkspaceReadRequest,
    workspaceOperationJsonSchemas.WorkspaceWriteRequest,
    workspaceOperationJsonSchemas.WorkspaceDeleteRequest,
    workspaceSnapshotJsonSchemas.WorkspaceSnapshotRequest,
    workspaceSnapshotJsonSchemas.WorkspaceRestoreRequest,
    workspaceSnapshotJsonSchemas.WorkspaceDiffRequest,
    workspaceSnapshotJsonSchemas.WorkspacePatchRequest,
  ],
};

export const executionActivityRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'activityId',
    'operationId',
    'runId',
    'stateAttemptId',
    'workspaceId',
    'request',
    'fencingToken',
  ],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    operationId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stateAttemptId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    request: {
      oneOf: [commandExecutionRequestJsonSchema, workspaceOperationRequestJsonSchema],
    },
    fencingToken: { type: 'integer', minimum: 1 },
    deadlineAt: timestampJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const executionActivityResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['activityId', 'status', 'eventIds'],
  properties: {
    activityId: nonEmptyStringJsonSchema,
    status: { enum: ['completed', 'failed', 'timeout', 'cancelled', 'unknown'] },
    executionId: nonEmptyStringJsonSchema,
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema, uniqueItems: true },
    snapshotRef: nonEmptyStringJsonSchema,
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema, minItems: 1, uniqueItems: true },
    error: normalizedExecutionErrorJsonSchema,
  },
  additionalProperties: false,
};

export const executionActivityJsonSchemas: Record<string, JsonSchema> = {
  WorkspaceOperationRequest: workspaceOperationRequestJsonSchema,
  ExecutionActivityRequest: executionActivityRequestJsonSchema,
  ExecutionActivityResult: executionActivityResultJsonSchema,
};

export const executionActivityRequestExample: ExecutionActivityRequest = {
  activityId: 'activity.execution.example',
  operationId: commandExecutionRequestExample.operationId,
  runId: commandExecutionRequestExample.runId,
  stateAttemptId: 'state.build:attempt.1',
  workspaceId: commandExecutionRequestExample.workspaceId,
  request: commandExecutionRequestExample,
  fencingToken: 7,
  deadlineAt: '2026-07-20T12:00:00.000Z',
  idempotencyKey: commandExecutionRequestExample.idempotencyKey,
};

export const workspaceExecutionActivityRequestExample: ExecutionActivityRequest = {
  activityId: 'activity.workspace.example',
  operationId: workspaceWriteRequestExample.operationId,
  runId: 'run.example',
  stateAttemptId: 'state.write-report:attempt.1',
  workspaceId: workspaceWriteRequestExample.workspaceId,
  request: workspaceWriteRequestExample,
  fencingToken: 8,
  idempotencyKey: workspaceWriteRequestExample.idempotencyKey,
};

export const executionActivityResultExample: ExecutionActivityResult = {
  activityId: executionActivityRequestExample.activityId,
  status: 'completed',
  executionId: 'execution.example',
  artifactRefs: ['artifact:execution.example:stdout'],
  snapshotRef: 'snapshot:workspace.example:after',
  eventIds: ['event.execution.requested', 'event.execution.completed'],
};

export function validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest {
  return workspaceOperationRequestSchema.parse(input);
}

export function validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest {
  return executionActivityRequestSchema.parse(input);
}

export function validateExecutionActivityResult(input: unknown): ExecutionActivityResult {
  return executionActivityResultSchema.parse(input);
}
