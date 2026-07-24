import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  RUNTIME_HUMAN_TASK_DECISIONS,
  RUNTIME_HUMAN_TASK_KINDS,
  RUNTIME_HUMAN_TASK_STATUSES,
  type RuntimeHumanTask,
  type RuntimeHumanTaskDecisionCommand,
  type RuntimeHumanTaskRequest,
} from './runtime-human-task';
import {
  runtimePrincipalJsonSchema,
  runtimePrincipalSchema,
  runtimeScopeJsonSchema,
  runtimeScopeSchema,
} from './runtime-schemas';

const nonEmptyStringSchema = z.string().min(1);
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const timestampSchema = z.string().datetime({ offset: true });
const metadataSchema = z.record(z.string(), z.unknown());

export const runtimeHumanTaskRequestSchema = z
  .object({
    taskId: nonEmptyStringSchema,
    kind: z.enum(RUNTIME_HUMAN_TASK_KINDS),
    subjectRef: nonEmptyStringSchema,
    subjectHash: hashSchema,
    requestedBy: nonEmptyStringSchema,
    allowedDecisionScopes: z.array(nonEmptyStringSchema).min(1),
    requestedAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    checkpointRef: nonEmptyStringSchema.optional(),
    policyRef: nonEmptyStringSchema.optional(),
    providerRevision: nonEmptyStringSchema.optional(),
    reason: nonEmptyStringSchema.optional(),
    metadata: metadataSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeHumanTaskRequest>;

export const runtimeHumanTaskSchema = runtimeHumanTaskRequestSchema
  .extend({
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    stateAttempt: z.number().int().positive(),
    status: z.enum(RUNTIME_HUMAN_TASK_STATUSES),
    revision: z.number().int().positive(),
    decidedBy: nonEmptyStringSchema.optional(),
    decidedAt: timestampSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeHumanTask>;

export const runtimeHumanTaskDecisionCommandSchema = z
  .object({
    commandId: nonEmptyStringSchema,
    scope: runtimeScopeSchema,
    principal: runtimePrincipalSchema,
    taskId: nonEmptyStringSchema,
    expectedRevision: z.number().int().positive(),
    expectedSubjectHash: hashSchema,
    decision: z.enum(RUNTIME_HUMAN_TASK_DECISIONS),
    decidedAt: timestampSchema,
    reason: nonEmptyStringSchema.optional(),
    idempotencyKey: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeHumanTaskDecisionCommand>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const hashJsonSchema: JsonSchema = {
  type: 'string',
  pattern: '^sha256:[a-f0-9]{64}$',
};
const metadataJsonSchema: JsonSchema = { type: 'object', additionalProperties: true };

export const runtimeHumanTaskRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'taskId',
    'kind',
    'subjectRef',
    'subjectHash',
    'requestedBy',
    'allowedDecisionScopes',
    'requestedAt',
  ],
  properties: {
    taskId: nonEmptyStringJsonSchema,
    kind: { type: 'string', enum: [...RUNTIME_HUMAN_TASK_KINDS] },
    subjectRef: nonEmptyStringJsonSchema,
    subjectHash: hashJsonSchema,
    requestedBy: nonEmptyStringJsonSchema,
    allowedDecisionScopes: {
      type: 'array',
      minItems: 1,
      items: nonEmptyStringJsonSchema,
    },
    requestedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    checkpointRef: nonEmptyStringJsonSchema,
    policyRef: nonEmptyStringJsonSchema,
    providerRevision: nonEmptyStringJsonSchema,
    reason: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeHumanTaskJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    ...(runtimeHumanTaskRequestJsonSchema.required ?? []),
    'runId',
    'stateId',
    'stateAttempt',
    'status',
    'revision',
  ],
  properties: {
    ...(runtimeHumanTaskRequestJsonSchema.properties ?? {}),
    runId: nonEmptyStringJsonSchema,
    stateId: nonEmptyStringJsonSchema,
    stateAttempt: { type: 'integer', minimum: 1 },
    status: { type: 'string', enum: [...RUNTIME_HUMAN_TASK_STATUSES] },
    revision: { type: 'integer', minimum: 1 },
    decidedBy: nonEmptyStringJsonSchema,
    decidedAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'commandId',
    'scope',
    'principal',
    'taskId',
    'expectedRevision',
    'expectedSubjectHash',
    'decision',
    'decidedAt',
  ],
  properties: {
    commandId: nonEmptyStringJsonSchema,
    scope: runtimeScopeJsonSchema,
    principal: runtimePrincipalJsonSchema,
    taskId: nonEmptyStringJsonSchema,
    expectedRevision: { type: 'integer', minimum: 1 },
    expectedSubjectHash: hashJsonSchema,
    decision: { type: 'string', enum: [...RUNTIME_HUMAN_TASK_DECISIONS] },
    decidedAt: timestampJsonSchema,
    reason: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeHumanTaskExample: RuntimeHumanTask = {
  taskId: 'human-task.default',
  runId: 'run.default',
  stateId: 'AwaitApproval',
  stateAttempt: 1,
  kind: 'tool',
  subjectRef: 'tool:filesystem.write@1.0.0',
  subjectHash: `sha256:${'a'.repeat(64)}`,
  status: 'pending',
  requestedBy: 'user.default',
  allowedDecisionScopes: ['runtime.human-task.decide'],
  requestedAt: '2026-07-23T10:00:00.000Z',
  expiresAt: '2026-07-24T10:00:00.000Z',
  revision: 1,
};

export const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand = {
  commandId: 'human-task.default.approve',
  scope: {
    userId: 'user.default',
    sessionId: 'session.default',
    runId: 'run.default',
  },
  principal: {
    principalId: 'reviewer.default',
    type: 'user',
    userId: 'reviewer.default',
    permissionScopes: ['runtime.human-task.decide'],
  },
  taskId: 'human-task.default',
  expectedRevision: 1,
  expectedSubjectHash: `sha256:${'a'.repeat(64)}`,
  decision: 'approved',
  decidedAt: '2026-07-23T10:05:00.000Z',
};

export const runtimeHumanTaskDefinition = defineSpecSchema<RuntimeHumanTask>({
  id: 'RuntimeHumanTask',
  zod: runtimeHumanTaskSchema,
  jsonSchema: runtimeHumanTaskJsonSchema,
  example: runtimeHumanTaskExample,
});

export const runtimeHumanTaskDecisionCommandDefinition =
  defineSpecSchema<RuntimeHumanTaskDecisionCommand>({
    id: 'RuntimeHumanTaskDecisionCommand',
    zod: runtimeHumanTaskDecisionCommandSchema,
    jsonSchema: runtimeHumanTaskDecisionCommandJsonSchema,
    example: runtimeHumanTaskDecisionCommandExample,
  });

export const runtimeHumanTaskContractDefinitions = [
  runtimeHumanTaskDefinition,
  runtimeHumanTaskDecisionCommandDefinition,
] as const;

export const runtimeHumanTaskContractJsonSchemas = exportSpecJsonSchemas(
  runtimeHumanTaskContractDefinitions
);

export function validateRuntimeHumanTask(input: unknown): RuntimeHumanTask {
  return runtimeHumanTaskDefinition.parse(input);
}

export function validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest {
  return runtimeHumanTaskRequestSchema.parse(input);
}

export function validateRuntimeHumanTaskDecisionCommand(
  input: unknown
): RuntimeHumanTaskDecisionCommand {
  return runtimeHumanTaskDecisionCommandDefinition.parse(input);
}
