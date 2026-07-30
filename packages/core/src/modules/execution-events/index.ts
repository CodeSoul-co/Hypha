import { z, type ZodType } from 'zod';
import type { CommandExecutionStatus } from '../../contracts/command-execution';
import type {
  CommandExecutionEventPayload,
  CommandExecutionFrameworkEventType,
  ExecutionEventCreateInput,
  ExecutionEventPayloadBase,
  ExecutionEventPayloadMap,
  ExecutionFrameworkEvent,
  ExecutionFrameworkEventType,
  NetworkAuthorizationEventPayload,
  NetworkAuthorizationFrameworkEventType,
  SandboxFrameworkEventType,
  SandboxLifecycleEventPayload,
} from '../../contracts/execution-events';
import type { JsonSchema } from '../../specs';
import { createFrameworkEvent } from '../../events';
import {
  commandExecutionStatusSchema,
  executionResourceUsageJsonSchema,
  executionResourceUsageSchema,
} from '../command-execution';
import { normalizedExecutionErrorJsonSchema, normalizedExecutionErrorSchema } from '../execution';
import { executionRecoveryDispositionSchema } from '../execution-store';
import { sandboxCapabilityNameSchema } from '../sandbox-provider';
import { sandboxStatusSchema } from '../sandbox';

export const sandboxFrameworkEventTypes = [
  'sandbox.create.requested',
  'sandbox.created',
  'sandbox.started',
  'sandbox.ready',
  'sandbox.degraded',
  'sandbox.terminate.requested',
  'sandbox.terminated',
  'sandbox.cleanup.completed',
  'sandbox.cleanup.failed',
] as const satisfies readonly SandboxFrameworkEventType[];

export const commandExecutionFrameworkEventTypes = [
  'command.execution.requested',
  'command.execution.validated',
  'command.execution.approval.required',
  'command.execution.queued',
  'command.execution.started',
  'command.execution.output.truncated',
  'command.execution.resource.exceeded',
  'command.execution.oom_killed',
  'command.execution.timeout',
  'command.execution.cancellation.requested',
  'command.execution.cancelled',
  'command.execution.completed',
  'command.execution.failed',
  'command.execution.result.unknown',
  'command.execution.recovered',
] as const satisfies readonly CommandExecutionFrameworkEventType[];

export const networkAuthorizationFrameworkEventTypes = [
  'network.authorization.requested',
  'network.authorization.granted',
  'network.authorization.denied',
  'network.authorization.revoked',
] as const satisfies readonly NetworkAuthorizationFrameworkEventType[];

export const executionFrameworkEventTypes = [
  ...sandboxFrameworkEventTypes,
  ...commandExecutionFrameworkEventTypes,
  ...networkAuthorizationFrameworkEventTypes,
] as const satisfies readonly ExecutionFrameworkEventType[];

export const executionFrameworkEventTypeSchema = z.enum(executionFrameworkEventTypes);

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const nonNegativeNumber = z.number().nonnegative();
const timestampSchema = z.string().datetime({ offset: true });
const unsuccessfulCommandExecutionStatuses = [
  'cancelled',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
] as const;
const commandExecutionErrorCodesByStatus: Partial<
  Record<CommandExecutionStatus, readonly string[]>
> = {
  cancelled: ['EXECUTION_CANCELLED'],
  timed_out: ['EXECUTION_TIMEOUT', 'EXECUTION_IDLE_TIMEOUT'],
  oom_killed: ['EXECUTION_OOM_KILLED'],
  resource_exceeded: ['EXECUTION_RESOURCE_EXCEEDED', 'EXECUTION_OUTPUT_LIMIT'],
} as const;
// Events are durable control-plane records; recursive metadata and error details must remain bounded.
const MAX_EXECUTION_EVENT_VALUE_DEPTH = 32;
const MAX_EXECUTION_EVENT_VALUE_NODES = 4_096;
const MAX_EXECUTION_EVENT_VALUE_BYTES = 64 * 1024;

const executionEventPayloadBaseObjectSchema = z
  .object({
    operationId: nonEmptyString.optional(),
    executionId: nonEmptyString.optional(),
    sandboxId: nonEmptyString.optional(),
    workspaceId: nonEmptyString.optional(),
    environmentId: nonEmptyString.optional(),
    environmentRevision: nonEmptyString.optional(),
    commandHash: nonEmptyString.optional(),
    sourceTreeHash: nonEmptyString.optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    status: nonEmptyString.optional(),
    latencyMs: nonNegativeNumber.optional(),
    resourceUsage: executionResourceUsageSchema.optional(),
    error: normalizedExecutionErrorSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

export const executionEventPayloadBaseSchema = executionEventPayloadBaseObjectSchema.superRefine(
  addPayloadSecurityIssues
) satisfies ZodType<ExecutionEventPayloadBase>;

export const sandboxLifecycleEventPayloadSchema = executionEventPayloadBaseObjectSchema
  .extend({
    sandboxId: nonEmptyString.optional(),
    providerId: nonEmptyString.optional(),
    providerSandboxRef: nonEmptyString.optional(),
    status: z.union([sandboxStatusSchema, z.literal('degraded')]).optional(),
    missingCapabilities: z.array(sandboxCapabilityNameSchema).optional(),
  })
  .superRefine((value, context) => {
    addPayloadSecurityIssues(value, context);
    if (
      value.missingCapabilities &&
      new Set(value.missingCapabilities).size !== value.missingCapabilities.length
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['missingCapabilities'],
        message: 'must not contain duplicate Sandbox capabilities',
      });
    }
  }) satisfies ZodType<SandboxLifecycleEventPayload>;

export const commandExecutionEventPayloadSchema = executionEventPayloadBaseObjectSchema
  .extend({
    executionId: nonEmptyString,
    revision: nonNegativeInteger.optional(),
    providerId: nonEmptyString.optional(),
    status: commandExecutionStatusSchema.optional(),
    exitCode: z.number().int().nullable().optional(),
    signal: nonEmptyString.optional(),
    outputStream: z.enum(['stdout', 'stderr']).optional(),
    outputTruncated: z.boolean().optional(),
    approvalRef: nonEmptyString.optional(),
    recoveryDisposition: executionRecoveryDispositionSchema.optional(),
  })
  .superRefine((value, context) => {
    addPayloadSecurityIssues(value, context);
    if (value.status === 'completed' && value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'must not be present for a completed command execution',
      });
    }
    if (
      value.status &&
      unsuccessfulCommandExecutionStatuses.some((status) => status === value.status) &&
      !value.error
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a non-success terminal command execution',
      });
    }
    const expectedErrorCodes = value.status
      ? commandExecutionErrorCodesByStatus[value.status]
      : undefined;
    if (
      expectedErrorCodes &&
      value.error &&
      !expectedErrorCodes.includes(value.error.code)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error', 'code'],
        message: `must match command execution status ${value.status}`,
      });
    }
  }) satisfies ZodType<CommandExecutionEventPayload>;

export const networkAuthorizationEventPayloadSchema = executionEventPayloadBaseObjectSchema
  .extend({
    authorizationId: nonEmptyString,
    networkPolicyHash: nonEmptyString,
    decision: z.enum(['requested', 'granted', 'denied', 'revoked']),
    expiresAt: timestampSchema.optional(),
    reason: nonEmptyString.optional(),
  })
  .superRefine(addPayloadSecurityIssues) satisfies ZodType<NetworkAuthorizationEventPayload>;

export const executionFrameworkEventEnvelopeSchema = z
  .object({
    id: nonEmptyString,
    type: executionFrameworkEventTypeSchema,
    workspaceId: nonEmptyString.optional(),
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    stepId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    fsmState: nonEmptyString.optional(),
    timestamp: timestampSchema,
    payload: z.unknown().refine((value) => value !== undefined, {
      message: 'payload is required',
    }),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    addEventValueSecurityIssues(value.metadata, context, ['metadata']);
  });

type EventRule = {
  required?: string[];
  status?: string | readonly string[];
  decision?: NetworkAuthorizationEventPayload['decision'];
  errorCodes?: string[];
  outputTruncated?: true;
};

const executionEventRules: Record<ExecutionFrameworkEventType, EventRule> = {
  'sandbox.create.requested': {
    required: ['operationId', 'workspaceId', 'environmentId', 'environmentRevision'],
  },
  'sandbox.created': {
    required: ['sandboxId', 'workspaceId', 'providerId'],
    status: 'created',
  },
  'sandbox.started': { required: ['sandboxId', 'providerId'], status: 'starting' },
  'sandbox.ready': { required: ['sandboxId', 'providerId'], status: 'ready' },
  'sandbox.degraded': { required: ['sandboxId', 'providerId'], status: 'degraded' },
  'sandbox.terminate.requested': {
    required: ['operationId', 'sandboxId'],
    status: 'terminating',
  },
  'sandbox.terminated': { required: ['sandboxId'], status: 'terminated' },
  'sandbox.cleanup.completed': { required: ['sandboxId'], status: 'cleaned' },
  'sandbox.cleanup.failed': {
    required: ['sandboxId', 'error'],
    status: 'failed',
  },
  'command.execution.requested': {
    required: ['operationId', 'executionId', 'workspaceId'],
  },
  'command.execution.validated': {
    required: ['executionId', 'commandHash'],
  },
  'command.execution.approval.required': {
    required: ['executionId', 'approvalRef'],
  },
  'command.execution.queued': { required: ['executionId'], status: 'queued' },
  'command.execution.started': {
    required: ['executionId', 'sandboxId', 'providerId'],
    status: 'running',
  },
  'command.execution.output.truncated': {
    required: ['executionId', 'outputStream', 'outputTruncated'],
    outputTruncated: true,
  },
  'command.execution.resource.exceeded': {
    required: ['executionId', 'error'],
    status: 'resource_exceeded',
    errorCodes: ['EXECUTION_RESOURCE_EXCEEDED', 'EXECUTION_OUTPUT_LIMIT'],
  },
  'command.execution.oom_killed': {
    required: ['executionId', 'error'],
    status: 'oom_killed',
    errorCodes: ['EXECUTION_OOM_KILLED'],
  },
  'command.execution.timeout': {
    required: ['executionId', 'error'],
    status: 'timed_out',
    errorCodes: ['EXECUTION_TIMEOUT', 'EXECUTION_IDLE_TIMEOUT'],
  },
  'command.execution.cancellation.requested': {
    required: ['operationId', 'executionId'],
    status: 'cancelling',
  },
  'command.execution.cancelled': {
    required: ['executionId', 'error'],
    status: 'cancelled',
    errorCodes: ['EXECUTION_CANCELLED'],
  },
  'command.execution.completed': {
    required: ['executionId', 'exitCode', 'latencyMs'],
    status: 'completed',
  },
  'command.execution.failed': {
    required: ['executionId', 'error'],
    status: ['failed', 'quarantined'],
  },
  'command.execution.result.unknown': {
    required: ['executionId', 'error', 'recoveryDisposition'],
    errorCodes: ['EXECUTION_RESULT_UNKNOWN'],
  },
  'command.execution.recovered': {
    required: ['executionId', 'recoveryDisposition'],
  },
  'network.authorization.requested': {
    required: ['authorizationId', 'executionId', 'networkPolicyHash'],
    decision: 'requested',
  },
  'network.authorization.granted': {
    required: ['authorizationId', 'executionId', 'networkPolicyHash', 'expiresAt'],
    decision: 'granted',
  },
  'network.authorization.denied': {
    required: ['authorizationId', 'executionId', 'networkPolicyHash', 'reason'],
    decision: 'denied',
  },
  'network.authorization.revoked': {
    required: ['authorizationId', 'executionId', 'networkPolicyHash'],
    decision: 'revoked',
  },
};

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const executionEventPayloadBaseJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    environmentId: nonEmptyStringJsonSchema,
    environmentRevision: nonEmptyStringJsonSchema,
    commandHash: nonEmptyStringJsonSchema,
    sourceTreeHash: nonEmptyStringJsonSchema,
    artifactRefs: { type: 'array', items: nonEmptyStringJsonSchema, uniqueItems: true },
    status: nonEmptyStringJsonSchema,
    latencyMs: { type: 'number', minimum: 0 },
    resourceUsage: executionResourceUsageJsonSchema,
    error: normalizedExecutionErrorJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const sandboxLifecycleEventPayloadJsonSchema: JsonSchema = {
  ...executionEventPayloadBaseJsonSchema,
  properties: {
    ...executionEventPayloadBaseJsonSchema.properties,
    providerId: nonEmptyStringJsonSchema,
    providerSandboxRef: nonEmptyStringJsonSchema,
    status: { enum: [...sandboxStatusSchema.options, 'degraded'] },
    missingCapabilities: {
      type: 'array',
      items: { enum: sandboxCapabilityNameSchema.options },
      uniqueItems: true,
    },
  },
};

export const commandExecutionEventPayloadJsonSchema: JsonSchema = {
  ...executionEventPayloadBaseJsonSchema,
  required: ['executionId'],
  properties: {
    ...executionEventPayloadBaseJsonSchema.properties,
    revision: { type: 'integer', minimum: 0 },
    providerId: nonEmptyStringJsonSchema,
    status: { enum: commandExecutionStatusSchema.options },
    exitCode: { oneOf: [{ type: 'integer' }, { type: 'null' }] },
    signal: nonEmptyStringJsonSchema,
    outputStream: { enum: ['stdout', 'stderr'] },
    outputTruncated: { type: 'boolean' },
    approvalRef: nonEmptyStringJsonSchema,
    recoveryDisposition: { enum: executionRecoveryDispositionSchema.options },
  },
  allOf: [
    {
      if: { properties: { status: { const: 'completed' } }, required: ['status'] },
      then: { not: { properties: { error: {} }, required: ['error'] } },
    },
    {
      if: {
        properties: { status: { enum: unsuccessfulCommandExecutionStatuses } },
        required: ['status'],
      },
      then: {
        properties: { error: normalizedExecutionErrorJsonSchema },
        required: ['error'],
      },
    },
    ...Object.entries(commandExecutionErrorCodesByStatus).map(([status, errorCodes]) => ({
      if: { properties: { status: { const: status } }, required: ['status'] },
      then: {
        properties: {
          error: {
            ...normalizedExecutionErrorJsonSchema,
            properties: {
              ...(normalizedExecutionErrorJsonSchema.properties ?? {}),
              code: { enum: [...errorCodes] },
            },
          },
        },
      },
    })),
  ],
};

export const networkAuthorizationEventPayloadJsonSchema: JsonSchema = {
  ...executionEventPayloadBaseJsonSchema,
  required: ['authorizationId', 'networkPolicyHash', 'decision'],
  properties: {
    ...executionEventPayloadBaseJsonSchema.properties,
    authorizationId: nonEmptyStringJsonSchema,
    networkPolicyHash: nonEmptyStringJsonSchema,
    decision: { enum: ['requested', 'granted', 'denied', 'revoked'] },
    expiresAt: timestampJsonSchema,
    reason: nonEmptyStringJsonSchema,
  },
};

function eventPayloadJsonSchema(type: ExecutionFrameworkEventType): JsonSchema {
  const categorySchema = isSandboxEventType(type)
    ? sandboxLifecycleEventPayloadJsonSchema
    : isCommandEventType(type)
      ? commandExecutionEventPayloadJsonSchema
      : networkAuthorizationEventPayloadJsonSchema;
  const rule = executionEventRules[type];
  const properties: Record<string, JsonSchema> = {};
  const allowedStatuses =
    rule.status === undefined ? undefined : Array.isArray(rule.status) ? rule.status : [rule.status];
  if (allowedStatuses) {
    properties.status = { enum: [...allowedStatuses] };
  }
  if (rule.decision) {
    properties.decision = { const: rule.decision };
  }
  if (rule.errorCodes) {
    properties.error = {
      type: 'object',
      required: ['code'],
      properties: { code: { enum: [...rule.errorCodes] } },
    };
  }
  if (rule.outputTruncated) {
    properties.outputTruncated = { const: true };
  }

  return {
    allOf: [
      categorySchema,
      {
        type: 'object',
        ...(rule.required ? { required: [...rule.required] } : {}),
        properties,
      },
    ],
  };
}

export const executionFrameworkEventJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'type', 'runId', 'timestamp', 'payload'],
  properties: {
    id: nonEmptyStringJsonSchema,
    type: { enum: [...executionFrameworkEventTypes] },
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stepId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    fsmState: nonEmptyStringJsonSchema,
    timestamp: timestampJsonSchema,
    payload: { type: 'object' },
    metadata: { type: 'object' },
  },
  oneOf: executionFrameworkEventTypes.map((type) => ({
    type: 'object',
    required: ['type', 'payload'],
    properties: {
      type: { const: type },
      payload: eventPayloadJsonSchema(type),
    },
  })),
  additionalProperties: false,
};

export const executionEventJsonSchemas: Record<string, JsonSchema> = {
  ExecutionEventPayloadBase: executionEventPayloadBaseJsonSchema,
  SandboxLifecycleEventPayload: sandboxLifecycleEventPayloadJsonSchema,
  CommandExecutionEventPayload: commandExecutionEventPayloadJsonSchema,
  NetworkAuthorizationEventPayload: networkAuthorizationEventPayloadJsonSchema,
  ExecutionFrameworkEvent: executionFrameworkEventJsonSchema,
};

export const sandboxLifecycleEventExample: ExecutionFrameworkEvent<'sandbox.ready'> = {
  id: 'event.sandbox.ready.example',
  type: 'sandbox.ready',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  timestamp: '2026-07-16T00:00:01.000Z',
  payload: {
    operationId: 'operation.sandbox.start.example',
    sandboxId: 'sandbox.example',
    workspaceId: 'workspace.example',
    environmentId: 'execution-environment.docker-safe',
    environmentRevision: 'sha256:environment',
    providerId: 'provider.docker.example',
    status: 'ready',
  },
};

export const commandExecutionEventExample: ExecutionFrameworkEvent<'command.execution.completed'> =
  {
    id: 'event.command.completed.example',
    type: 'command.execution.completed',
    workspaceId: 'workspace.example',
    runId: 'run.example',
    stepId: 'step.example',
    timestamp: '2026-07-16T00:00:02.000Z',
    payload: {
      operationId: 'operation.command.example',
      executionId: 'execution.example',
      sandboxId: 'sandbox.example',
      workspaceId: 'workspace.example',
      commandHash: 'sha256:command',
      sourceTreeHash: 'sha256:source-tree',
      artifactRefs: ['artifact:report'],
      status: 'completed',
      exitCode: 0,
      latencyMs: 1_000,
      resourceUsage: { cpuTimeMs: 50, peakMemoryBytes: 16_777_216 },
    },
  };

export const networkAuthorizationEventExample: ExecutionFrameworkEvent<'network.authorization.granted'> =
  {
    id: 'event.network.granted.example',
    type: 'network.authorization.granted',
    workspaceId: 'workspace.example',
    runId: 'run.example',
    timestamp: '2026-07-16T00:00:00.500Z',
    payload: {
      operationId: 'operation.network.authorize.example',
      executionId: 'execution.example',
      sandboxId: 'sandbox.example',
      workspaceId: 'workspace.example',
      authorizationId: 'network-authorization.example',
      networkPolicyHash: 'sha256:network-policy',
      decision: 'granted',
      expiresAt: '2026-07-16T00:05:00.500Z',
    },
  };

export function validateExecutionEventPayload<TType extends ExecutionFrameworkEventType>(
  type: TType,
  input: unknown
): ExecutionEventPayloadMap[TType] {
  const payload = parsePayloadCategory(type, input);
  const issues: z.ZodIssue[] = [];
  addEventRuleIssues(type, payload, issues);
  if (issues.length > 0) {
    throw new z.ZodError(issues);
  }
  return payload as ExecutionEventPayloadMap[TType];
}

export function validateExecutionFrameworkEvent(input: unknown): ExecutionFrameworkEvent {
  const event = executionFrameworkEventEnvelopeSchema.parse(input);
  const payload = validateExecutionEventPayload(event.type, event.payload);
  if (event.workspaceId && payload.workspaceId && event.workspaceId !== payload.workspaceId) {
    throw new z.ZodError([
      {
        code: z.ZodIssueCode.custom,
        path: ['payload', 'workspaceId'],
        message: 'must match the event workspaceId',
      },
    ]);
  }
  return { ...event, payload } as ExecutionFrameworkEvent;
}

export function createExecutionFrameworkEvent<TType extends ExecutionFrameworkEventType>(
  input: ExecutionEventCreateInput<TType>
): ExecutionFrameworkEvent<TType> {
  const event = createFrameworkEvent(input);
  return validateExecutionFrameworkEvent(event) as ExecutionFrameworkEvent<TType>;
}

function parsePayloadCategory(
  type: ExecutionFrameworkEventType,
  input: unknown
): SandboxLifecycleEventPayload | CommandExecutionEventPayload | NetworkAuthorizationEventPayload {
  if (isSandboxEventType(type)) return sandboxLifecycleEventPayloadSchema.parse(input);
  if (isCommandEventType(type)) return commandExecutionEventPayloadSchema.parse(input);
  return networkAuthorizationEventPayloadSchema.parse(input);
}

function addEventRuleIssues(
  type: ExecutionFrameworkEventType,
  payload:
    | SandboxLifecycleEventPayload
    | CommandExecutionEventPayload
    | NetworkAuthorizationEventPayload,
  issues: z.ZodIssue[]
): void {
  const rule = executionEventRules[type];
  const record = payload as unknown as Record<string, unknown>;
  for (const field of rule.required ?? []) {
    if (record[field] === undefined || record[field] === null || record[field] === '') {
      issues.push({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `is required for ${type}`,
      });
    }
  }
  const allowedStatuses =
    rule.status === undefined ? undefined : Array.isArray(rule.status) ? rule.status : [rule.status];
  if (allowedStatuses && !allowedStatuses.includes(payload.status ?? '')) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['status'],
      message:
        allowedStatuses.length === 1
          ? `must be ${allowedStatuses[0]} for ${type}`
          : `must be one of ${allowedStatuses.join(', ')} for ${type}`,
    });
  }
  if ('decision' in payload && rule.decision && payload.decision !== rule.decision) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['decision'],
      message: `must be ${rule.decision} for ${type}`,
    });
  }
  if (rule.errorCodes && payload.error && !rule.errorCodes.includes(payload.error.code)) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['error', 'code'],
      message: `must match ${type}`,
    });
  }
  if (rule.outputTruncated && 'outputTruncated' in payload && payload.outputTruncated !== true) {
    issues.push({
      code: z.ZodIssueCode.custom,
      path: ['outputTruncated'],
      message: `must be true for ${type}`,
    });
  }
}

function addPayloadSecurityIssues(
  value: ExecutionEventPayloadBase,
  context: z.RefinementCtx
): void {
  if (value.artifactRefs && new Set(value.artifactRefs).size !== value.artifactRefs.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['artifactRefs'],
      message: 'must not contain duplicate Artifact references',
    });
  }
  addEventValueSecurityIssues(value, context, []);
}

const forbiddenEventFieldNames = new Set([
  'secret',
  'secrets',
  'secretvalue',
  'secretvalues',
  'plaintextsecret',
  'stdout',
  'stderr',
  'rawoutput',
  'outputcontent',
  'filecontent',
  'binarycontent',
  'hostpath',
  'hostabsolutepath',
  'environmentvariables',
  'envvalues',
  'rawenv',
]);

function addEventValueSecurityIssues(
  value: unknown,
  context: z.RefinementCtx,
  path: Array<string | number>,
  state: EventValueTraversalState = createEventValueTraversalState(),
  depth = 0
): void {
  if (state.halted) return;
  state.nodes += 1;
  if (state.nodes > MAX_EXECUTION_EVENT_VALUE_NODES) {
    addEventValueTraversalIssue(
      context,
      path,
      state,
      `Execution event data exceeds the node limit of ${MAX_EXECUTION_EVENT_VALUE_NODES}`
    );
    return;
  }
  if (depth > MAX_EXECUTION_EVENT_VALUE_DEPTH) {
    addEventValueTraversalIssue(
      context,
      path,
      state,
      `Execution event data exceeds the maximum nesting depth of ${MAX_EXECUTION_EVENT_VALUE_DEPTH}`
    );
    return;
  }

  if (value === undefined) return;
  if (value === null) {
    addEventValueBytes(4, context, path, state);
    return;
  }
  if (typeof value === 'string') {
    addEventValueStringBytes(value, context, path, state);
    return;
  }
  if (typeof value === 'boolean') {
    addEventValueBytes(value ? 4 : 5, context, path, state);
    return;
  }
  if (typeof value === 'number') {
    addEventValueBytes(String(Object.is(value, -0) ? 0 : value).length, context, path, state);
    return;
  }
  if (typeof value !== 'object') return;
  if (state.ancestors.has(value)) {
    addEventValueTraversalIssue(
      context,
      path,
      state,
      'Execution event data must not contain circular references'
    );
    return;
  }

  state.ancestors.add(value);
  try {
    addEventValueBytes(2, context, path, state);
    if (state.halted) return;
    if (Array.isArray(value)) {
      for (let index = 0; index < value.length; index += 1) {
        if (index > 0) addEventValueBytes(1, context, path, state);
        addEventValueSecurityIssues(value[index], context, [...path, index], state, depth + 1);
        if (state.halted) return;
      }
      return;
    }

    let entryIndex = 0;
    for (const [key, child] of Object.entries(value)) {
      if (entryIndex > 0) addEventValueBytes(1, context, path, state);
      addEventValueStringBytes(key, context, [...path, key], state);
      addEventValueBytes(1, context, path, state);
      if (state.halted) return;
      entryIndex += 1;

      const normalized = key.replace(/[^A-Za-z0-9]/gu, '').toLowerCase();
      if (forbiddenEventFieldNames.has(normalized)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: [...path, key],
          message: 'sensitive or unbounded content fields are forbidden in Execution events',
        });
        continue;
      }
      addEventValueSecurityIssues(child, context, [...path, key], state, depth + 1);
      if (state.halted) return;
    }
  } finally {
    state.ancestors.delete(value);
  }
}

type EventValueTraversalState = {
  ancestors: Set<object>;
  nodes: number;
  serializedBytes: number;
  halted: boolean;
};

function createEventValueTraversalState(): EventValueTraversalState {
  return {
    ancestors: new Set<object>(),
    nodes: 0,
    serializedBytes: 0,
    halted: false,
  };
}

function addEventValueStringBytes(
  value: string,
  context: z.RefinementCtx,
  path: Array<string | number>,
  state: EventValueTraversalState
): void {
  const rawBytes = Buffer.byteLength(value, 'utf8') + 2;
  if (state.serializedBytes + rawBytes > MAX_EXECUTION_EVENT_VALUE_BYTES) {
    addEventValueTraversalIssue(
      context,
      path,
      state,
      `Execution event data exceeds the serialized size limit of ${MAX_EXECUTION_EVENT_VALUE_BYTES} bytes`
    );
    return;
  }
  addEventValueBytes(Buffer.byteLength(JSON.stringify(value), 'utf8'), context, path, state);
}

function addEventValueBytes(
  bytes: number,
  context: z.RefinementCtx,
  path: Array<string | number>,
  state: EventValueTraversalState
): void {
  state.serializedBytes += bytes;
  if (state.serializedBytes <= MAX_EXECUTION_EVENT_VALUE_BYTES) return;
  addEventValueTraversalIssue(
    context,
    path,
    state,
    `Execution event data exceeds the serialized size limit of ${MAX_EXECUTION_EVENT_VALUE_BYTES} bytes`
  );
}

function addEventValueTraversalIssue(
  context: z.RefinementCtx,
  path: Array<string | number>,
  state: EventValueTraversalState,
  message: string
): void {
  if (state.halted) return;
  state.halted = true;
  context.addIssue({
    code: z.ZodIssueCode.custom,
    path,
    message,
  });
}

function isSandboxEventType(type: ExecutionFrameworkEventType): type is SandboxFrameworkEventType {
  return (sandboxFrameworkEventTypes as readonly string[]).includes(type);
}

function isCommandEventType(
  type: ExecutionFrameworkEventType
): type is CommandExecutionFrameworkEventType {
  return (commandExecutionFrameworkEventTypes as readonly string[]).includes(type);
}
