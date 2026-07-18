import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import type { RuntimeJsonValue } from './runtime-helpers';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
} from './runtime-projection-schemas';
import {
  runtimePrincipalJsonSchema,
  runtimePrincipalSchema,
  runtimeScopeJsonSchema,
  runtimeScopeSchema,
} from './runtime-schemas';
import {
  RUNTIME_CONTROL_DISPOSITIONS,
  RUNTIME_CONTROL_KINDS,
  type RuntimeRunControlCommand,
  type RuntimeRunControlResult,
} from './runtime-control';

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
const common = {
  commandId: nonEmptyStringSchema,
  scope: runtimeScopeSchema,
  principal: runtimePrincipalSchema,
  ownerId: nonEmptyStringSchema,
  leaseTtlMs: z.number().int().positive(),
  idempotencyKey: nonEmptyStringSchema.optional(),
};

export const runtimePauseCommandSchema = z
  .object({
    ...common,
    kind: z.literal('pause'),
    reason: nonEmptyStringSchema,
    resumeKey: nonEmptyStringSchema.optional(),
    requestedAt: timestampSchema,
  })
  .strict();

export const runtimeResumeCommandSchema = z
  .object({
    ...common,
    kind: z.literal('resume'),
    key: nonEmptyStringSchema.optional(),
    payload: jsonValueSchema.optional(),
    requestedAt: timestampSchema,
  })
  .strict();

export const runtimeSignalCommandSchema = z
  .object({
    ...common,
    kind: z.literal('signal'),
    key: nonEmptyStringSchema,
    payload: jsonValueSchema,
    sentAt: timestampSchema,
  })
  .strict();

export const runtimeRunControlCommandSchema = z.discriminatedUnion('kind', [
  runtimePauseCommandSchema,
  runtimeResumeCommandSchema,
  runtimeSignalCommandSchema,
]) satisfies ZodType<RuntimeRunControlCommand>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const jsonValueJsonSchema: JsonSchema = {
  oneOf: [
    { type: 'null' },
    { type: 'boolean' },
    { type: 'number' },
    { type: 'string' },
    { type: 'array' },
    { type: 'object' },
  ],
};

function commandJsonSchema(
  kind: 'pause' | 'resume' | 'signal',
  required: string[],
  properties: Record<string, JsonSchema>
): JsonSchema {
  return {
    type: 'object',
    required: ['kind', 'commandId', 'scope', 'principal', 'ownerId', 'leaseTtlMs', ...required],
    properties: {
      kind: { const: kind },
      commandId: nonEmptyStringJsonSchema,
      scope: runtimeScopeJsonSchema,
      principal: runtimePrincipalJsonSchema,
      ownerId: nonEmptyStringJsonSchema,
      leaseTtlMs: positiveIntegerJsonSchema,
      idempotencyKey: nonEmptyStringJsonSchema,
      ...properties,
    },
    additionalProperties: false,
  };
}

export const runtimeRunControlCommandJsonSchema: JsonSchema = {
  oneOf: [
    commandJsonSchema('pause', ['reason', 'requestedAt'], {
      reason: nonEmptyStringJsonSchema,
      resumeKey: nonEmptyStringJsonSchema,
      requestedAt: timestampJsonSchema,
    }),
    commandJsonSchema('resume', ['requestedAt'], {
      key: nonEmptyStringJsonSchema,
      payload: jsonValueJsonSchema,
      requestedAt: timestampJsonSchema,
    }),
    commandJsonSchema('signal', ['key', 'payload', 'sentAt'], {
      key: nonEmptyStringJsonSchema,
      payload: jsonValueJsonSchema,
      sentAt: timestampJsonSchema,
    }),
  ],
};

export const runtimeRunControlCommandExample: RuntimeRunControlCommand = {
  kind: 'signal',
  commandId: 'signal.approval.1',
  scope: {
    tenantId: 'tenant.default',
    userId: 'user.default',
    workspaceId: 'workspace.default',
    sessionId: 'session.default',
    runId: 'run.default',
    agentId: 'agent.default',
  },
  principal: {
    principalId: 'user.default',
    type: 'user',
    tenantId: 'tenant.default',
    userId: 'user.default',
    permissionScopes: ['runtime.run.signal'],
  },
  ownerId: 'runtime-control.default',
  leaseTtlMs: 30_000,
  key: 'approval.received',
  payload: { approved: true },
  sentAt: '2026-07-18T08:00:00.000Z',
};

export const runtimeRunControlCommandDefinition = defineSpecSchema<RuntimeRunControlCommand>({
  id: 'RuntimeRunControlCommand',
  zod: runtimeRunControlCommandSchema,
  jsonSchema: runtimeRunControlCommandJsonSchema,
  example: runtimeRunControlCommandExample,
});

export const runtimeRunControlResultSchema = z
  .object({
    commandId: nonEmptyStringSchema,
    kind: z.enum(RUNTIME_CONTROL_KINDS),
    disposition: z.enum(RUNTIME_CONTROL_DISPOSITIONS),
    eventIds: z.array(nonEmptyStringSchema),
    runRevision: z.number().int().nonnegative(),
    projection: runtimeOrchestrationProjectionSchema,
  })
  .strict() satisfies ZodType<RuntimeRunControlResult>;

export const runtimeRunControlResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['commandId', 'kind', 'disposition', 'eventIds', 'runRevision', 'projection'],
  properties: {
    commandId: nonEmptyStringJsonSchema,
    kind: { type: 'string', enum: [...RUNTIME_CONTROL_KINDS] },
    disposition: { type: 'string', enum: [...RUNTIME_CONTROL_DISPOSITIONS] },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    runRevision: { type: 'integer', minimum: 0 },
    projection: runtimeOrchestrationProjectionJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeRunControlResultExample: RuntimeRunControlResult = {
  commandId: 'signal.approval.1',
  kind: 'signal',
  disposition: 'applied',
  eventIds: ['event.signal.received', 'event.run.resumed'],
  runRevision: 4,
  projection: {
    runId: 'run.default',
    runStatus: 'running',
    currentState: 'Acting',
    statePath: ['Acting', 'Acting'],
    stateVisitCounts: { Acting: 2 },
    stateAttempt: 2,
    lastResume: {
      commandId: 'signal.approval.1',
      kind: 'signal',
      waitId: 'wait.approval.1',
      principalId: 'user.default',
      key: 'approval.received',
      payload: { approved: true },
      resumedAt: '2026-07-18T08:00:00.000Z',
    },
    pendingActivityIds: [],
  },
};

export const runtimeRunControlResultDefinition = defineSpecSchema<RuntimeRunControlResult>({
  id: 'RuntimeRunControlResult',
  zod: runtimeRunControlResultSchema,
  jsonSchema: runtimeRunControlResultJsonSchema,
  example: runtimeRunControlResultExample,
});

export const runtimeControlContractDefinitions = [
  runtimeRunControlCommandDefinition,
  runtimeRunControlResultDefinition,
] as const;
export const runtimeControlContractJsonSchemas = exportSpecJsonSchemas(
  runtimeControlContractDefinitions
);

export function validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand {
  return runtimeRunControlCommandDefinition.parse(input);
}

export function validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult {
  return runtimeRunControlResultDefinition.parse(input);
}
