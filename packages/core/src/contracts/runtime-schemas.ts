import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  jsonSchemaSchema,
  specRefSchema,
} from '../schemas';
import type { JsonSchema } from '../specs';
import {
  RUNTIME_ERROR_CODES,
  RUNTIME_PRINCIPAL_TYPES,
  RUNTIME_RUN_STATUSES,
  RUNTIME_SESSION_STATUSES,
  RUNTIME_WAIT_STATUSES,
  RUNTIME_WAIT_TYPES,
  type NormalizedRuntimeError,
  type RunSignalRequest,
  type RuntimePrincipal,
  type RuntimeRun,
  type RuntimeScope,
  type RuntimeSession,
  type RuntimeWaitRecord,
  type RuntimeWaitRequest,
} from './runtime';

type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

const nonEmptyStringSchema = z.string().min(1);
const timestampSchema = z.string().datetime({ offset: true });
const hashSchema = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const jsonValueSchema: ZodType<JsonValue> = z.lazy(() =>
  z.union([
    z.null(),
    z.boolean(),
    z.number().finite(),
    z.string(),
    z.array(jsonValueSchema),
    z.record(jsonValueSchema),
  ])
);
const metadataSchema = z.record(jsonValueSchema);

export const runtimePrincipalTypeSchema = z.enum(RUNTIME_PRINCIPAL_TYPES);
export const runtimeSessionStatusSchema = z.enum(RUNTIME_SESSION_STATUSES);
export const runtimeRunStatusSchema = z.enum(RUNTIME_RUN_STATUSES);
export const runtimeWaitTypeSchema = z.enum(RUNTIME_WAIT_TYPES);
export const runtimeWaitStatusSchema = z.enum(RUNTIME_WAIT_STATUSES);
export const runtimeErrorCodeSchema = z.enum(RUNTIME_ERROR_CODES);

export const runtimeScopeSchema = z
  .object({
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    workspaceId: nonEmptyStringSchema.optional(),
    sessionId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    agentId: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeScope>;

export const runtimePrincipalSchema = z
  .object({
    principalId: nonEmptyStringSchema,
    type: runtimePrincipalTypeSchema,
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema.optional(),
    agentId: nonEmptyStringSchema.optional(),
    roles: z.array(nonEmptyStringSchema).optional(),
    permissionScopes: z.array(nonEmptyStringSchema),
    metadata: metadataSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimePrincipal>;

export const normalizedRuntimeErrorSchema = z
  .object({
    code: runtimeErrorCodeSchema,
    message: nonEmptyStringSchema,
    retryable: z.boolean(),
    stateId: nonEmptyStringSchema.optional(),
    transitionId: nonEmptyStringSchema.optional(),
    details: metadataSchema.optional(),
    causeRef: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<NormalizedRuntimeError>;

export const runtimeSessionSchema = z
  .object({
    id: nonEmptyStringSchema,
    revision: z.number().int().nonnegative(),
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    workspaceId: nonEmptyStringSchema.optional(),
    domainPackRef: specRefSchema.optional(),
    sessionProfileRef: specRefSchema.optional(),
    title: nonEmptyStringSchema.optional(),
    metadata: metadataSchema,
    status: runtimeSessionStatusSchema,
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
    closedAt: timestampSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeSession>;

export const runtimeRunSchema = z
  .object({
    id: nonEmptyStringSchema,
    revision: z.number().int().nonnegative(),
    tenantId: nonEmptyStringSchema.optional(),
    userId: nonEmptyStringSchema,
    workspaceId: nonEmptyStringSchema.optional(),
    sessionId: nonEmptyStringSchema,
    domainPackRef: specRefSchema.optional(),
    workflowRef: specRefSchema,
    workflowRevision: nonEmptyStringSchema,
    processSpecRef: nonEmptyStringSchema,
    processHash: hashSchema,
    rootAgentRef: specRefSchema.optional(),
    runtimeProfileRef: specRefSchema.optional(),
    status: runtimeRunStatusSchema,
    input: jsonValueSchema,
    inputHash: hashSchema,
    output: jsonValueSchema.optional(),
    outputHash: hashSchema.optional(),
    currentState: nonEmptyStringSchema.optional(),
    terminalState: nonEmptyStringSchema.optional(),
    correlationId: nonEmptyStringSchema,
    idempotencyKey: nonEmptyStringSchema.optional(),
    deadlineAt: timestampSchema.optional(),
    cancelRequestedAt: timestampSchema.optional(),
    cancelReason: nonEmptyStringSchema.optional(),
    createdAt: timestampSchema,
    queuedAt: timestampSchema.optional(),
    startedAt: timestampSchema.optional(),
    updatedAt: timestampSchema,
    completedAt: timestampSchema.optional(),
    error: normalizedRuntimeErrorSchema.optional(),
    metadata: metadataSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeRun>;

export const runtimeWaitRequestSchema = z
  .object({
    type: runtimeWaitTypeSchema,
    key: nonEmptyStringSchema.optional(),
    expectedSchema: jsonSchemaSchema.optional(),
    expiresAt: timestampSchema.optional(),
    timeoutTransitionId: nonEmptyStringSchema.optional(),
    pendingActionRef: nonEmptyStringSchema.optional(),
    metadata: metadataSchema.optional(),
  })
  .strict()
  .superRefine((request, context) => {
    if (request.type === 'signal' && !request.key) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['key'],
        message: 'Signal waits require a key',
      });
    }
    if (request.type === 'timer' && !request.expiresAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expiresAt'],
        message: 'Timer waits require expiresAt',
      });
    }
  }) satisfies ZodType<RuntimeWaitRequest>;

export const runtimeWaitRecordSchema = z
  .object({
    id: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    stateId: nonEmptyStringSchema,
    type: runtimeWaitTypeSchema,
    key: nonEmptyStringSchema.optional(),
    status: runtimeWaitStatusSchema,
    expectedSchemaHash: hashSchema.optional(),
    createdAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    resolvedAt: timestampSchema.optional(),
    signalRef: nonEmptyStringSchema.optional(),
  })
  .strict() satisfies ZodType<RuntimeWaitRecord>;

export const runSignalRequestSchema = z
  .object({
    signalId: nonEmptyStringSchema,
    runId: nonEmptyStringSchema,
    key: nonEmptyStringSchema,
    principal: runtimePrincipalSchema,
    payload: jsonValueSchema,
    idempotencyKey: nonEmptyStringSchema.optional(),
    sentAt: timestampSchema,
  })
  .strict() satisfies ZodType<RunSignalRequest>;

const stringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const hashJsonSchema: JsonSchema = {
  type: 'string',
  pattern: '^sha256:[a-f0-9]{64}$',
};
const metadataJsonSchema: JsonSchema = { type: 'object', additionalProperties: true };
const jsonValueJsonSchema: JsonSchema = {};
const runtimeSpecRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: stringJsonSchema,
    version: stringJsonSchema,
    revision: stringJsonSchema,
  },
  additionalProperties: false,
};

function contractJsonSchema(
  required: string[],
  properties: Record<string, JsonSchema>
): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: false };
}

export const runtimeScopeJsonSchema = contractJsonSchema(['userId', 'sessionId', 'runId'], {
  tenantId: stringJsonSchema,
  userId: stringJsonSchema,
  workspaceId: stringJsonSchema,
  sessionId: stringJsonSchema,
  runId: stringJsonSchema,
  agentId: stringJsonSchema,
});

export const runtimePrincipalJsonSchema = contractJsonSchema(
  ['principalId', 'type', 'permissionScopes'],
  {
    principalId: stringJsonSchema,
    type: { type: 'string', enum: [...RUNTIME_PRINCIPAL_TYPES] },
    tenantId: stringJsonSchema,
    userId: stringJsonSchema,
    agentId: stringJsonSchema,
    roles: { type: 'array', items: stringJsonSchema },
    permissionScopes: { type: 'array', items: stringJsonSchema },
    metadata: metadataJsonSchema,
  }
);

export const normalizedRuntimeErrorJsonSchema = contractJsonSchema(
  ['code', 'message', 'retryable'],
  {
    code: { type: 'string', enum: [...RUNTIME_ERROR_CODES] },
    message: stringJsonSchema,
    retryable: { type: 'boolean' },
    stateId: stringJsonSchema,
    transitionId: stringJsonSchema,
    details: metadataJsonSchema,
    causeRef: stringJsonSchema,
  }
);

export const runtimeSessionJsonSchema = contractJsonSchema(
  ['id', 'revision', 'userId', 'metadata', 'status', 'createdAt', 'updatedAt'],
  {
    id: stringJsonSchema,
    revision: { type: 'integer', minimum: 0 },
    tenantId: stringJsonSchema,
    userId: stringJsonSchema,
    workspaceId: stringJsonSchema,
    domainPackRef: runtimeSpecRefJsonSchema,
    sessionProfileRef: runtimeSpecRefJsonSchema,
    title: stringJsonSchema,
    metadata: metadataJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_SESSION_STATUSES] },
    createdAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    closedAt: timestampJsonSchema,
  }
);

export const runtimeRunJsonSchema = contractJsonSchema(
  [
    'id',
    'revision',
    'userId',
    'sessionId',
    'workflowRef',
    'workflowRevision',
    'processSpecRef',
    'processHash',
    'status',
    'input',
    'inputHash',
    'correlationId',
    'createdAt',
    'updatedAt',
  ],
  {
    id: stringJsonSchema,
    revision: { type: 'integer', minimum: 0 },
    tenantId: stringJsonSchema,
    userId: stringJsonSchema,
    workspaceId: stringJsonSchema,
    sessionId: stringJsonSchema,
    domainPackRef: runtimeSpecRefJsonSchema,
    workflowRef: runtimeSpecRefJsonSchema,
    workflowRevision: stringJsonSchema,
    processSpecRef: stringJsonSchema,
    processHash: hashJsonSchema,
    rootAgentRef: runtimeSpecRefJsonSchema,
    runtimeProfileRef: runtimeSpecRefJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_RUN_STATUSES] },
    input: jsonValueJsonSchema,
    inputHash: hashJsonSchema,
    output: jsonValueJsonSchema,
    outputHash: hashJsonSchema,
    currentState: stringJsonSchema,
    terminalState: stringJsonSchema,
    correlationId: stringJsonSchema,
    idempotencyKey: stringJsonSchema,
    deadlineAt: timestampJsonSchema,
    cancelRequestedAt: timestampJsonSchema,
    cancelReason: stringJsonSchema,
    createdAt: timestampJsonSchema,
    queuedAt: timestampJsonSchema,
    startedAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    completedAt: timestampJsonSchema,
    error: normalizedRuntimeErrorJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const runtimeWaitRequestJsonSchema: JsonSchema = {
  ...contractJsonSchema(['type'], {
    type: { type: 'string', enum: [...RUNTIME_WAIT_TYPES] },
    key: stringJsonSchema,
    expectedSchema: { type: 'object', additionalProperties: true },
    expiresAt: timestampJsonSchema,
    timeoutTransitionId: stringJsonSchema,
    pendingActionRef: stringJsonSchema,
    metadata: metadataJsonSchema,
  }),
  allOf: [
    {
      if: { properties: { type: { const: 'signal' } }, required: ['type'] },
      then: { required: ['key'] },
    },
    {
      if: { properties: { type: { const: 'timer' } }, required: ['type'] },
      then: { required: ['expiresAt'] },
    },
  ],
};

export const runtimeWaitRecordJsonSchema = contractJsonSchema(
  ['id', 'runId', 'stateId', 'type', 'status', 'createdAt'],
  {
    id: stringJsonSchema,
    runId: stringJsonSchema,
    stateId: stringJsonSchema,
    type: { type: 'string', enum: [...RUNTIME_WAIT_TYPES] },
    key: stringJsonSchema,
    status: { type: 'string', enum: [...RUNTIME_WAIT_STATUSES] },
    expectedSchemaHash: hashJsonSchema,
    createdAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    resolvedAt: timestampJsonSchema,
    signalRef: stringJsonSchema,
  }
);

export const runSignalRequestJsonSchema = contractJsonSchema(
  ['signalId', 'runId', 'key', 'principal', 'payload', 'sentAt'],
  {
    signalId: stringJsonSchema,
    runId: stringJsonSchema,
    key: stringJsonSchema,
    principal: runtimePrincipalJsonSchema,
    payload: jsonValueJsonSchema,
    idempotencyKey: stringJsonSchema,
    sentAt: timestampJsonSchema,
  }
);

const timestamp = '2026-07-18T08:00:00.000Z';
const sampleHash = `sha256:${'a'.repeat(64)}`;

export const runtimeScopeExample: RuntimeScope = {
  tenantId: 'tenant.default',
  userId: 'user.default',
  workspaceId: 'workspace.default',
  sessionId: 'session.default',
  runId: 'run.default',
  agentId: 'agent.default',
};

export const runtimePrincipalExample: RuntimePrincipal = {
  principalId: 'principal.user.default',
  type: 'user',
  tenantId: 'tenant.default',
  userId: 'user.default',
  roles: ['operator'],
  permissionScopes: ['runtime:signal'],
  metadata: { source: 'contract-example' },
};

export const normalizedRuntimeErrorExample: NormalizedRuntimeError = {
  code: 'RUNTIME_RUN_CONFLICT',
  message: 'Run revision does not match the expected revision.',
  retryable: true,
  causeRef: 'event.conflict',
};

export const runtimeSessionExample: RuntimeSession = {
  id: 'session.default',
  revision: 0,
  tenantId: 'tenant.default',
  userId: 'user.default',
  workspaceId: 'workspace.default',
  domainPackRef: { id: 'domain.default', version: '1.0.0' },
  sessionProfileRef: { id: 'session-profile.default', version: '1.0.0' },
  title: 'Default Runtime Session',
  metadata: { channel: 'api' },
  status: 'active',
  createdAt: timestamp,
  updatedAt: timestamp,
};

export const runtimeRunExample: RuntimeRun = {
  id: 'run.default',
  revision: 0,
  tenantId: 'tenant.default',
  userId: 'user.default',
  workspaceId: 'workspace.default',
  sessionId: 'session.default',
  domainPackRef: { id: 'domain.default', version: '1.0.0' },
  workflowRef: { id: 'workflow.default', version: '1.0.0' },
  workflowRevision: 'revision.1',
  processSpecRef: 'process.default@revision.1',
  processHash: sampleHash,
  rootAgentRef: { id: 'agent.default', version: '1.0.0' },
  runtimeProfileRef: { id: 'runtime.default', version: '1.0.0' },
  status: 'running',
  input: { request: 'start' },
  inputHash: sampleHash,
  currentState: 'Intake',
  correlationId: 'correlation.default',
  idempotencyKey: 'run.default.create',
  createdAt: timestamp,
  queuedAt: timestamp,
  startedAt: timestamp,
  updatedAt: timestamp,
  metadata: { source: 'contract-example' },
};

export const runtimeWaitRequestExample: RuntimeWaitRequest = {
  type: 'signal',
  key: 'approval.received',
  expectedSchema: {
    type: 'object',
    required: ['approved'],
    properties: { approved: { type: 'boolean' } },
  },
  expiresAt: '2026-07-19T08:00:00.000Z',
  timeoutTransitionId: 'transition.approval-timeout',
  metadata: { requestedBy: 'state.Review' },
};

export const runtimeWaitRecordExample: RuntimeWaitRecord = {
  id: 'wait.default',
  runId: 'run.default',
  stateId: 'Review',
  type: 'signal',
  key: 'approval.received',
  status: 'waiting',
  expectedSchemaHash: sampleHash,
  createdAt: timestamp,
  expiresAt: '2026-07-19T08:00:00.000Z',
};

export const runSignalRequestExample: RunSignalRequest = {
  signalId: 'signal.default',
  runId: 'run.default',
  key: 'approval.received',
  principal: runtimePrincipalExample,
  payload: { approved: true },
  idempotencyKey: 'signal.default.delivery',
  sentAt: timestamp,
};

export const runtimeScopeDefinition = defineSpecSchema<RuntimeScope>({
  id: 'RuntimeScope',
  zod: runtimeScopeSchema,
  jsonSchema: runtimeScopeJsonSchema,
  example: runtimeScopeExample,
});
export const runtimePrincipalDefinition = defineSpecSchema<RuntimePrincipal>({
  id: 'RuntimePrincipal',
  zod: runtimePrincipalSchema,
  jsonSchema: runtimePrincipalJsonSchema,
  example: runtimePrincipalExample,
});
export const normalizedRuntimeErrorDefinition = defineSpecSchema<NormalizedRuntimeError>({
  id: 'NormalizedRuntimeError',
  zod: normalizedRuntimeErrorSchema,
  jsonSchema: normalizedRuntimeErrorJsonSchema,
  example: normalizedRuntimeErrorExample,
});
export const runtimeSessionDefinition = defineSpecSchema<RuntimeSession>({
  id: 'RuntimeSession',
  zod: runtimeSessionSchema,
  jsonSchema: runtimeSessionJsonSchema,
  example: runtimeSessionExample,
});
export const runtimeRunDefinition = defineSpecSchema<RuntimeRun>({
  id: 'RuntimeRun',
  zod: runtimeRunSchema,
  jsonSchema: runtimeRunJsonSchema,
  example: runtimeRunExample,
});
export const runtimeWaitRequestDefinition = defineSpecSchema<RuntimeWaitRequest>({
  id: 'RuntimeWaitRequest',
  zod: runtimeWaitRequestSchema,
  jsonSchema: runtimeWaitRequestJsonSchema,
  example: runtimeWaitRequestExample,
});
export const runtimeWaitRecordDefinition = defineSpecSchema<RuntimeWaitRecord>({
  id: 'RuntimeWaitRecord',
  zod: runtimeWaitRecordSchema,
  jsonSchema: runtimeWaitRecordJsonSchema,
  example: runtimeWaitRecordExample,
});
export const runSignalRequestDefinition = defineSpecSchema<RunSignalRequest>({
  id: 'RunSignalRequest',
  zod: runSignalRequestSchema,
  jsonSchema: runSignalRequestJsonSchema,
  example: runSignalRequestExample,
});

export const runtimeContractDefinitions = [
  runtimeScopeDefinition,
  runtimePrincipalDefinition,
  normalizedRuntimeErrorDefinition,
  runtimeSessionDefinition,
  runtimeRunDefinition,
  runtimeWaitRequestDefinition,
  runtimeWaitRecordDefinition,
  runSignalRequestDefinition,
] as const;

export const runtimeContractJsonSchemas = exportSpecJsonSchemas(runtimeContractDefinitions);

export function validateRuntimeScope(input: unknown): RuntimeScope {
  return runtimeScopeDefinition.parse(input);
}
export function validateRuntimePrincipal(input: unknown): RuntimePrincipal {
  return runtimePrincipalDefinition.parse(input);
}
export function validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError {
  return normalizedRuntimeErrorDefinition.parse(input);
}
export function validateRuntimeSession(input: unknown): RuntimeSession {
  return runtimeSessionDefinition.parse(input);
}
export function validateRuntimeRun(input: unknown): RuntimeRun {
  return runtimeRunDefinition.parse(input);
}
export function validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest {
  return runtimeWaitRequestDefinition.parse(input);
}
export function validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord {
  return runtimeWaitRecordDefinition.parse(input);
}
export function validateRunSignalRequest(input: unknown): RunSignalRequest {
  return runSignalRequestDefinition.parse(input);
}
