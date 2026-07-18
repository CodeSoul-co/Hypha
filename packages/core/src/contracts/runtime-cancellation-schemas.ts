import { z, type ZodType } from 'zod';
import { defineSpecSchema, exportSpecJsonSchemas } from '../schemas';
import type { JsonSchema } from '../specs';
import {
  normalizedRuntimeErrorJsonSchema,
  normalizedRuntimeErrorSchema,
  runtimePrincipalJsonSchema,
  runtimePrincipalSchema,
  runtimeScopeJsonSchema,
  runtimeScopeSchema,
} from './runtime-schemas';
import {
  runtimeOrchestrationProjectionJsonSchema,
  runtimeOrchestrationProjectionSchema,
} from './runtime-projection-schemas';
import {
  RUNTIME_CANCELLATION_DISPOSITIONS,
  RUNTIME_CANCELLATION_PROPAGATIONS,
  RUNTIME_CANCELLATION_TARGET_STATUSES,
  RUNTIME_CANCELLATION_TARGET_TYPES,
  type RuntimeCancelCommand,
  type RuntimeCancelResult,
} from './runtime-cancellation';

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });

export const runtimeCancellationPolicySchema = z
  .object({
    propagation: z.enum(RUNTIME_CANCELLATION_PROPAGATIONS),
    cancelRunningActivities: z.boolean(),
    waitGraceMs: z.number().int().nonnegative().optional(),
  })
  .strict();

export const runtimeCancelCommandSchema = z
  .object({
    commandId: nonEmptyStringSchema,
    scope: runtimeScopeSchema,
    principal: runtimePrincipalSchema,
    ownerId: nonEmptyStringSchema,
    leaseTtlMs: z.number().int().positive(),
    reason: nonEmptyStringSchema,
    policy: runtimeCancellationPolicySchema,
    requestedAt: timestampSchema,
    idempotencyKey: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeCancelCommand>;

export const runtimeCancellationTargetResultSchema = z
  .object({
    targetType: z.enum(RUNTIME_CANCELLATION_TARGET_TYPES),
    targetId: nonEmptyStringSchema,
    status: z.enum(RUNTIME_CANCELLATION_TARGET_STATUSES),
    error: normalizedRuntimeErrorSchema.optional(),
  })
  .strict();

export const runtimeCancelResultSchema = z
  .object({
    commandId: nonEmptyStringSchema,
    disposition: z.enum(RUNTIME_CANCELLATION_DISPOSITIONS),
    eventIds: z.array(nonEmptyStringSchema),
    targetResults: z.array(runtimeCancellationTargetResultSchema),
    unresolvedActivityIds: z.array(nonEmptyStringSchema),
    projection: runtimeOrchestrationProjectionSchema,
  })
  .strict() satisfies ZodType<RuntimeCancelResult>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const cancellationPolicyJsonSchema: JsonSchema = {
  type: 'object',
  required: ['propagation', 'cancelRunningActivities'],
  properties: {
    propagation: { type: 'string', enum: [...RUNTIME_CANCELLATION_PROPAGATIONS] },
    cancelRunningActivities: { type: 'boolean' },
    waitGraceMs: { type: 'integer', minimum: 0 },
  },
  additionalProperties: false,
};
const cancellationTargetResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['targetType', 'targetId', 'status'],
  properties: {
    targetType: { type: 'string', enum: [...RUNTIME_CANCELLATION_TARGET_TYPES] },
    targetId: nonEmptyStringJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_CANCELLATION_TARGET_STATUSES] },
    error: normalizedRuntimeErrorJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeCancelCommandJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'commandId',
    'scope',
    'principal',
    'ownerId',
    'leaseTtlMs',
    'reason',
    'policy',
    'requestedAt',
  ],
  properties: {
    commandId: nonEmptyStringJsonSchema,
    scope: runtimeScopeJsonSchema,
    principal: runtimePrincipalJsonSchema,
    ownerId: nonEmptyStringJsonSchema,
    leaseTtlMs: { type: 'integer', minimum: 1 },
    reason: nonEmptyStringJsonSchema,
    policy: cancellationPolicyJsonSchema,
    requestedAt: { type: 'string', format: 'date-time' },
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeCancelResultJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'commandId',
    'disposition',
    'eventIds',
    'targetResults',
    'unresolvedActivityIds',
    'projection',
  ],
  properties: {
    commandId: nonEmptyStringJsonSchema,
    disposition: { type: 'string', enum: [...RUNTIME_CANCELLATION_DISPOSITIONS] },
    eventIds: { type: 'array', items: nonEmptyStringJsonSchema },
    targetResults: { type: 'array', items: cancellationTargetResultJsonSchema },
    unresolvedActivityIds: { type: 'array', items: nonEmptyStringJsonSchema },
    projection: runtimeOrchestrationProjectionJsonSchema,
  },
  additionalProperties: false,
};

export const runtimeCancelCommandExample: RuntimeCancelCommand = {
  commandId: 'cancel.run.default',
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
    permissionScopes: ['runtime.run.cancel'],
  },
  ownerId: 'runtime-cancellation.default',
  leaseTtlMs: 30_000,
  reason: 'operator requested cancellation',
  policy: {
    propagation: 'all_descendants',
    cancelRunningActivities: true,
    waitGraceMs: 5_000,
  },
  requestedAt: '2026-07-18T10:00:00.000Z',
};

export const runtimeCancelResultExample: RuntimeCancelResult = {
  commandId: 'cancel.run.default',
  disposition: 'applied',
  eventIds: ['event.cancel.requested', 'event.run.cancelled'],
  targetResults: [{ targetType: 'activity', targetId: 'activity.default', status: 'cancelled' }],
  unresolvedActivityIds: [],
  projection: {
    runId: 'run.default',
    runStatus: 'cancelled',
    currentState: 'Acting',
    terminalState: 'Acting',
    statePath: ['Acting'],
    stateVisitCounts: { Acting: 1 },
    stateAttempt: 1,
    cancellation: {
      commandId: 'cancel.run.default',
      principalId: 'user.default',
      reason: 'operator requested cancellation',
      requestedAt: '2026-07-18T10:00:00.000Z',
    },
    pendingActivityIds: [],
  },
};

export const runtimeCancelCommandDefinition = defineSpecSchema<RuntimeCancelCommand>({
  id: 'RuntimeCancelCommand',
  zod: runtimeCancelCommandSchema,
  jsonSchema: runtimeCancelCommandJsonSchema,
  example: runtimeCancelCommandExample,
});

export const runtimeCancelResultDefinition = defineSpecSchema<RuntimeCancelResult>({
  id: 'RuntimeCancelResult',
  zod: runtimeCancelResultSchema,
  jsonSchema: runtimeCancelResultJsonSchema,
  example: runtimeCancelResultExample,
});

export const runtimeCancellationContractDefinitions = [
  runtimeCancelCommandDefinition,
  runtimeCancelResultDefinition,
] as const;
export const runtimeCancellationContractJsonSchemas = exportSpecJsonSchemas(
  runtimeCancellationContractDefinitions
);

export function validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand {
  return runtimeCancelCommandDefinition.parse(input);
}

export function validateRuntimeCancelResult(input: unknown): RuntimeCancelResult {
  return runtimeCancelResultDefinition.parse(input);
}

export function validateRuntimeCancellationTargetResult(input: unknown) {
  return runtimeCancellationTargetResultSchema.parse(input);
}
