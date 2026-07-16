import { z, type ZodType } from 'zod';
import type { NormalizedExecutionError } from '../../contracts/execution';
import type {
  SandboxCleanupRequest,
  SandboxCreateRequest,
  SandboxProviderCapabilities,
  SandboxRecord,
  SandboxStartRequest,
  SandboxStatus,
  SandboxStatusRequest,
  SandboxTerminateRequest,
} from '../../contracts/sandbox';
import { specRefSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';
import { executionPrincipalSchema, principalJsonSchema } from '../workspace/operations';
import {
  executionEnvironmentSpecJsonSchema,
  executionEnvironmentSpecSchema,
  resourceLimitSpecSchema,
} from '../execution-environment';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const timestampSchema = z.string().datetime({ offset: true });

const executionErrorCodes = [
  'EXECUTION_INVALID_REQUEST',
  'EXECUTION_PERMISSION_DENIED',
  'EXECUTION_POLICY_DENIED',
  'EXECUTION_APPROVAL_REQUIRED',
  'EXECUTION_WORKSPACE_NOT_FOUND',
  'EXECUTION_PATH_ESCAPE',
  'EXECUTION_PATH_DENIED',
  'EXECUTION_QUOTA_EXCEEDED',
  'EXECUTION_ENVIRONMENT_UNAVAILABLE',
  'EXECUTION_SANDBOX_CREATE_FAILED',
  'EXECUTION_SANDBOX_START_FAILED',
  'EXECUTION_IMAGE_UNTRUSTED',
  'EXECUTION_NETWORK_DENIED',
  'EXECUTION_SECRET_DENIED',
  'EXECUTION_PROCESS_START_FAILED',
  'EXECUTION_TIMEOUT',
  'EXECUTION_IDLE_TIMEOUT',
  'EXECUTION_CANCELLED',
  'EXECUTION_OOM_KILLED',
  'EXECUTION_RESOURCE_EXCEEDED',
  'EXECUTION_OUTPUT_LIMIT',
  'EXECUTION_RESULT_UNKNOWN',
  'EXECUTION_CLEANUP_FAILED',
  'EXECUTION_INTERNAL_ERROR',
] as const;

export const normalizedExecutionErrorSchema = z.object({
  code: z.enum(executionErrorCodes),
  message: nonEmptyString,
  retryable: z.boolean(),
  providerCode: z.union([z.string(), z.number()]).optional(),
  details: z.record(z.unknown()).optional(),
  causeRef: nonEmptyString.optional(),
}) satisfies ZodType<NormalizedExecutionError>;

export const sandboxProviderCapabilitiesSchema = z.object({
  processIsolation: z.boolean(),
  filesystemIsolation: z.boolean(),
  networkIsolation: z.boolean(),
  cpuLimits: z.boolean(),
  memoryLimits: z.boolean(),
  diskLimits: z.boolean(),
  pidsLimit: z.boolean(),
  cancellation: z.boolean(),
  processTreeKill: z.boolean(),
  snapshots: z.boolean(),
  imageDigestPinning: z.boolean(),
  remoteExecution: z.boolean(),
}) satisfies ZodType<SandboxProviderCapabilities>;

export const sandboxStatusSchema = z.enum([
  'creating',
  'created',
  'starting',
  'ready',
  'busy',
  'stopping',
  'stopped',
  'terminating',
  'terminated',
  'cleaning',
  'cleaned',
  'failed',
]) satisfies ZodType<SandboxStatus>;

export const sandboxStatusTransitions: Readonly<Record<SandboxStatus, readonly SandboxStatus[]>> = {
  creating: ['created', 'terminating', 'failed'],
  created: ['starting', 'terminating', 'cleaning', 'failed'],
  starting: ['ready', 'stopping', 'terminating', 'failed'],
  ready: ['busy', 'stopping', 'terminating', 'cleaning', 'failed'],
  busy: ['ready', 'stopping', 'terminating', 'failed'],
  stopping: ['stopped', 'terminating', 'failed'],
  stopped: ['starting', 'terminating', 'cleaning', 'failed'],
  terminating: ['terminated', 'failed'],
  terminated: ['cleaning'],
  cleaning: ['cleaned', 'failed'],
  cleaned: [],
  failed: ['terminating', 'cleaning'],
};

export const sandboxRecordSchema = z
  .object({
    id: nonEmptyString,
    revision: nonNegativeInteger,
    providerId: nonEmptyString,
    environmentRef: specRefSchema,
    environmentRevision: nonEmptyString,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    agentId: nonEmptyString.optional(),
    status: sandboxStatusSchema,
    providerSandboxRef: nonEmptyString.optional(),
    imageDigest: nonEmptyString.optional(),
    activeExecutionIds: z.array(nonEmptyString),
    resourceLimits: resourceLimitSpecSchema,
    networkPolicyHash: nonEmptyString,
    mountPolicyHash: nonEmptyString,
    createdAt: timestampSchema,
    readyAt: timestampSchema.optional(),
    lastUsedAt: timestampSchema.optional(),
    expiresAt: timestampSchema.optional(),
    terminatedAt: timestampSchema.optional(),
    cleanedAt: timestampSchema.optional(),
    error: normalizedExecutionErrorSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    if (new Set(value.activeExecutionIds).size !== value.activeExecutionIds.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activeExecutionIds'],
        message: 'must not contain duplicate execution IDs',
      });
    }
    if (['ready', 'busy'].includes(value.status) && !value.readyAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['readyAt'],
        message: 'is required after a Sandbox becomes ready',
      });
    }
    if (value.status === 'terminated' && !value.terminatedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terminatedAt'],
        message: 'is required for a terminated Sandbox',
      });
    }
    if (value.status === 'cleaned' && !value.cleanedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cleanedAt'],
        message: 'is required for a cleaned Sandbox',
      });
    }
    if (value.status === 'failed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a failed Sandbox',
      });
    }
    if (['stopped', 'terminated', 'cleaning', 'cleaned', 'failed'].includes(value.status)) {
      if (value.activeExecutionIds.length > 0) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['activeExecutionIds'],
          message: 'must be empty in terminal or inactive states',
        });
      }
    }
  }) satisfies ZodType<SandboxRecord>;

export const sandboxCreateRequestSchema = z
  .object({
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    environment: executionEnvironmentSpecSchema,
    environmentRevision: nonEmptyString,
    userId: nonEmptyString,
    tenantId: nonEmptyString.optional(),
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    agentId: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    if (value.principal.userId && value.principal.userId !== value.userId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['userId'],
        message: 'must match principal.userId when it is declared',
      });
    }
    if (value.principal.tenantId && value.principal.tenantId !== value.tenantId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['tenantId'],
        message: 'must match principal.tenantId when it is declared',
      });
    }
  }) satisfies ZodType<SandboxCreateRequest>;

const sandboxMutationRequestBase = z.object({
  operationId: nonEmptyString,
  sandboxId: nonEmptyString,
  principal: executionPrincipalSchema,
  expectedRevision: nonNegativeInteger,
  idempotencyKey: nonEmptyString.optional(),
});

export const sandboxStartRequestSchema =
  sandboxMutationRequestBase satisfies ZodType<SandboxStartRequest>;

export const sandboxStatusRequestSchema = z.object({
  sandboxId: nonEmptyString,
  principal: executionPrincipalSchema,
}) satisfies ZodType<SandboxStatusRequest>;

export const sandboxTerminateRequestSchema = sandboxMutationRequestBase.extend({
  reason: nonEmptyString.optional(),
}) satisfies ZodType<SandboxTerminateRequest>;

export const sandboxCleanupRequestSchema = sandboxMutationRequestBase.extend({
  reason: nonEmptyString.optional(),
}) satisfies ZodType<SandboxCleanupRequest>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

const resourceLimitJsonSchema = executionEnvironmentSpecJsonSchema.properties?.resources ?? {
  type: 'object',
};

export const normalizedExecutionErrorJsonSchema: JsonSchema = {
  type: 'object',
  required: ['code', 'message', 'retryable'],
  properties: {
    code: { enum: [...executionErrorCodes] },
    message: nonEmptyStringJsonSchema,
    retryable: { type: 'boolean' },
    providerCode: { oneOf: [{ type: 'string' }, { type: 'number' }] },
    details: { type: 'object' },
    causeRef: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const sandboxProviderCapabilitiesJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'processIsolation',
    'filesystemIsolation',
    'networkIsolation',
    'cpuLimits',
    'memoryLimits',
    'diskLimits',
    'pidsLimit',
    'cancellation',
    'processTreeKill',
    'snapshots',
    'imageDigestPinning',
    'remoteExecution',
  ],
  properties: Object.fromEntries(
    [
      'processIsolation',
      'filesystemIsolation',
      'networkIsolation',
      'cpuLimits',
      'memoryLimits',
      'diskLimits',
      'pidsLimit',
      'cancellation',
      'processTreeKill',
      'snapshots',
      'imageDigestPinning',
      'remoteExecution',
    ].map((field) => [field, { type: 'boolean' }])
  ),
  additionalProperties: false,
};

export const sandboxRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'providerId',
    'environmentRef',
    'environmentRevision',
    'userId',
    'workspaceId',
    'runId',
    'status',
    'activeExecutionIds',
    'resourceLimits',
    'networkPolicyHash',
    'mountPolicyHash',
    'createdAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    revision: nonNegativeIntegerJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    environmentRef: specRefJsonSchema,
    environmentRevision: nonEmptyStringJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    status: { enum: sandboxStatusSchema.options },
    providerSandboxRef: nonEmptyStringJsonSchema,
    imageDigest: nonEmptyStringJsonSchema,
    activeExecutionIds: { type: 'array', items: nonEmptyStringJsonSchema, uniqueItems: true },
    resourceLimits: resourceLimitJsonSchema,
    networkPolicyHash: nonEmptyStringJsonSchema,
    mountPolicyHash: nonEmptyStringJsonSchema,
    createdAt: timestampJsonSchema,
    readyAt: timestampJsonSchema,
    lastUsedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    terminatedAt: timestampJsonSchema,
    cleanedAt: timestampJsonSchema,
    error: normalizedExecutionErrorJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

const sandboxMutationRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'sandboxId', 'principal', 'expectedRevision'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    principal: principalJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const sandboxLifecycleJsonSchemas: Record<string, JsonSchema> = {
  SandboxProviderCapabilities: sandboxProviderCapabilitiesJsonSchema,
  SandboxRecord: sandboxRecordJsonSchema,
  SandboxCreateRequest: {
    type: 'object',
    required: [
      'operationId',
      'principal',
      'environment',
      'environmentRevision',
      'userId',
      'workspaceId',
      'runId',
    ],
    properties: {
      operationId: nonEmptyStringJsonSchema,
      principal: principalJsonSchema,
      environment: executionEnvironmentSpecJsonSchema,
      environmentRevision: nonEmptyStringJsonSchema,
      userId: nonEmptyStringJsonSchema,
      tenantId: nonEmptyStringJsonSchema,
      workspaceId: nonEmptyStringJsonSchema,
      sessionId: nonEmptyStringJsonSchema,
      runId: nonEmptyStringJsonSchema,
      agentId: nonEmptyStringJsonSchema,
      idempotencyKey: nonEmptyStringJsonSchema,
      metadata: { type: 'object' },
    },
    additionalProperties: false,
  },
  SandboxStartRequest: sandboxMutationRequestJsonSchema,
  SandboxStatusRequest: {
    type: 'object',
    required: ['sandboxId', 'principal'],
    properties: {
      sandboxId: nonEmptyStringJsonSchema,
      principal: principalJsonSchema,
    },
    additionalProperties: false,
  },
  SandboxTerminateRequest: withReason(sandboxMutationRequestJsonSchema),
  SandboxCleanupRequest: withReason(sandboxMutationRequestJsonSchema),
};

export const sandboxProviderCapabilitiesExample: SandboxProviderCapabilities = {
  processIsolation: true,
  filesystemIsolation: true,
  networkIsolation: true,
  cpuLimits: true,
  memoryLimits: true,
  diskLimits: true,
  pidsLimit: true,
  cancellation: true,
  processTreeKill: true,
  snapshots: false,
  imageDigestPinning: true,
  remoteExecution: false,
};

export const sandboxCreateRequestExample: SandboxCreateRequest = {
  operationId: 'operation.sandbox.create.example',
  principal: {
    principalId: 'user.example',
    type: 'user',
    userId: 'user.example',
    permissionScopes: ['execution:sandbox:create'],
  },
  environment: {
    id: 'execution-environment.mock.safe',
    version: '0.1.0',
    provider: 'mock',
    process: {
      shellEnabled: false,
      allowedExecutables: ['node'],
      executableResolution: 'path_allowlist',
      killProcessTreeOnExit: true,
      inheritHostEnvironment: false,
    },
    resources: {
      memoryMb: 256,
      pidsLimit: 32,
      maxCombinedOutputBytes: 1_048_576,
      oomKillDisable: false,
    },
    filesystem: {
      rootFilesystem: 'read_only',
      mounts: [
        {
          sourceRef: 'workspace:workspace.example',
          targetPath: '/workspace',
          mode: 'rw',
          type: 'workspace',
        },
      ],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'disabled', dnsPolicy: 'disabled' },
    security: {
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      allowNestedContainers: false,
    },
    secrets: {
      injectionMode: 'none',
      redactFromOutput: true,
      redactFromEvents: true,
    },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'never', cleanupOnSuccess: true, cleanupOnFailure: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 60_000,
  },
  environmentRevision: 'sha256:environment-example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  idempotencyKey: 'sandbox-create:run.example',
};

export const sandboxRecordExample: SandboxRecord = {
  id: 'sandbox.example',
  revision: 1,
  providerId: 'provider.mock',
  environmentRef: { id: 'execution-environment.mock.safe', version: '0.1.0' },
  environmentRevision: 'sha256:environment-example',
  userId: 'user.example',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  status: 'ready',
  providerSandboxRef: 'mock:sandbox.example',
  activeExecutionIds: [],
  resourceLimits: {
    memoryMb: 256,
    pidsLimit: 32,
    maxCombinedOutputBytes: 1_048_576,
    oomKillDisable: false,
  },
  networkPolicyHash: 'sha256:network-example',
  mountPolicyHash: 'sha256:mount-example',
  createdAt: '2026-07-16T00:00:00.000Z',
  readyAt: '2026-07-16T00:00:01.000Z',
};

export function validateSandboxProviderCapabilities(input: unknown): SandboxProviderCapabilities {
  return sandboxProviderCapabilitiesSchema.parse(input);
}

export function validateSandboxRecord(input: unknown): SandboxRecord {
  return sandboxRecordSchema.parse(input);
}

export function validateSandboxCreateRequest(input: unknown): SandboxCreateRequest {
  return sandboxCreateRequestSchema.parse(input);
}

export function validateSandboxStartRequest(input: unknown): SandboxStartRequest {
  return sandboxStartRequestSchema.parse(input);
}

export function validateSandboxStatusRequest(input: unknown): SandboxStatusRequest {
  return sandboxStatusRequestSchema.parse(input);
}

export function validateSandboxTerminateRequest(input: unknown): SandboxTerminateRequest {
  return sandboxTerminateRequestSchema.parse(input);
}

export function validateSandboxCleanupRequest(input: unknown): SandboxCleanupRequest {
  return sandboxCleanupRequestSchema.parse(input);
}

export function canTransitionSandboxStatus(from: SandboxStatus, to: SandboxStatus): boolean {
  return sandboxStatusTransitions[from].includes(to);
}

function withReason(base: JsonSchema): JsonSchema {
  return {
    ...base,
    properties: {
      ...base.properties,
      reason: nonEmptyStringJsonSchema,
    },
  };
}
