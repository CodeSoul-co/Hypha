import { z, type ZodType } from 'zod';
import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  CommandExecutionStatus,
  CommandOutputChunk,
  ExecutionCancelRequest,
  ExecutionReceipt,
  ExecutionResourceUsage,
} from '../../contracts/command-execution';
import { specRefSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';
import {
  executionPrincipalJsonSchema,
  executionPrincipalSchema,
  normalizedExecutionErrorJsonSchema,
  normalizedExecutionErrorSchema,
} from '../execution';
import {
  fileMutationJsonSchema,
  fileMutationSchema,
  relativePathJsonSchema,
} from '../workspace/operations';
import { workspaceRelativePathSchema } from '../workspace';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const nonNegativeNumber = z.number().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });
const nullSafeString = z.string().refine((value) => !value.includes('\0'), {
  message: 'must not contain null bytes',
});
const executableSchema = nullSafeString.refine((value) => value.trim().length > 0, {
  message: 'must not be blank',
});
const environmentSchema = z.record(z.string()).superRefine((value, context) => {
  for (const [name, content] of Object.entries(value)) {
    if (!name || name.includes('=') || name.includes('\0')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [name],
        message: 'environment names must be non-empty and cannot contain equals or null bytes',
      });
    }
    if (content.includes('\0')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [name],
        message: 'environment values must not contain null bytes',
      });
    }
  }
});

export const commandExecutionRequestSchema = z
  .object({
    executionId: nonEmptyString.optional(),
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString,
    stepId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    fsmState: nonEmptyString.optional(),
    sandboxId: nonEmptyString.optional(),
    environmentRef: specRefSchema,
    executable: executableSchema,
    args: z.array(nullSafeString).optional(),
    cwd: workspaceRelativePathSchema.optional(),
    env: environmentSchema.optional(),
    secretRefs: z.array(nonEmptyString).optional(),
    shell: z.boolean().optional().default(false),
    stdin: z.union([z.string(), z.instanceof(Uint8Array)]).optional(),
    timeoutMs: positiveInteger.optional(),
    idleTimeoutMs: positiveInteger.optional(),
    maxStdoutBytes: positiveInteger.optional(),
    maxStderrBytes: positiveInteger.optional(),
    captureArtifacts: z.boolean().optional(),
    captureFileMutations: z.boolean().optional(),
    snapshotBefore: z.boolean().optional(),
    snapshotAfter: z.boolean().optional(),
    snapshotOnFailure: z.boolean().optional(),
    networkAuthorizationRef: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
    expectedWorkspaceSnapshotHash: nonEmptyString.optional(),
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
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
    if (value.secretRefs && new Set(value.secretRefs).size !== value.secretRefs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['secretRefs'],
        message: 'must not contain duplicate Secret references',
      });
    }
  }) satisfies ZodType<CommandExecutionRequest>;

export const commandExecutionStatusSchema = z.enum([
  'queued',
  'starting',
  'running',
  'cancelling',
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
]) satisfies ZodType<CommandExecutionStatus>;

export const commandExecutionStatusTransitions: Readonly<
  Record<CommandExecutionStatus, readonly CommandExecutionStatus[]>
> = {
  queued: ['starting', 'cancelling', 'cancelled', 'failed'],
  starting: [
    'running',
    'cancelling',
    'cancelled',
    'failed',
    'timed_out',
    'resource_exceeded',
    'quarantined',
  ],
  running: [
    'cancelling',
    'cancelled',
    'completed',
    'failed',
    'timed_out',
    'oom_killed',
    'resource_exceeded',
    'quarantined',
  ],
  cancelling: ['cancelled', 'failed'],
  cancelled: [],
  completed: [],
  failed: [],
  timed_out: [],
  oom_killed: [],
  resource_exceeded: [],
  quarantined: [],
};

export const executionResourceUsageSchema = z.object({
  cpuTimeMs: nonNegativeNumber.optional(),
  peakMemoryBytes: nonNegativeInteger.optional(),
  readBytes: nonNegativeInteger.optional(),
  writtenBytes: nonNegativeInteger.optional(),
  networkBytesSent: nonNegativeInteger.optional(),
  networkBytesReceived: nonNegativeInteger.optional(),
  processCountPeak: nonNegativeInteger.optional(),
  outputBytes: nonNegativeInteger.optional(),
}) satisfies ZodType<ExecutionResourceUsage>;

export const executionReceiptSchema = z.object({
  id: nonEmptyString,
  providerId: nonEmptyString,
  executionId: nonEmptyString,
  providerExecutionRef: nonEmptyString.optional(),
  status: z.enum(['accepted', 'completed', 'rejected', 'unknown']),
  issuedAt: timestampSchema,
  receiptHash: nonEmptyString,
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<ExecutionReceipt>;

const terminalStatuses: readonly CommandExecutionStatus[] = [
  'cancelled',
  'completed',
  'failed',
  'timed_out',
  'oom_killed',
  'resource_exceeded',
  'quarantined',
];

export const commandExecutionResultSchema = z
  .object({
    executionId: nonEmptyString,
    revision: nonNegativeInteger,
    sandboxId: nonEmptyString,
    status: commandExecutionStatusSchema,
    exitCode: z.number().int().nullable(),
    signal: nonEmptyString.optional(),
    stdout: z.string().optional(),
    stderr: z.string().optional(),
    stdoutTruncated: z.boolean().optional(),
    stderrTruncated: z.boolean().optional(),
    stdoutArtifactRef: nonEmptyString.optional(),
    stderrArtifactRef: nonEmptyString.optional(),
    changedFiles: z.array(fileMutationSchema),
    generatedArtifactRefs: z.array(nonEmptyString),
    snapshotBeforeRef: nonEmptyString.optional(),
    snapshotAfterRef: nonEmptyString.optional(),
    resourceUsage: executionResourceUsageSchema.optional(),
    externalReceipt: executionReceiptSchema.optional(),
    startedAt: timestampSchema,
    completedAt: timestampSchema.optional(),
    latencyMs: nonNegativeNumber.optional(),
    error: normalizedExecutionErrorSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    const terminal = terminalStatuses.includes(value.status);
    if (terminal && !value.completedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'is required for terminal execution status',
      });
    }
    if (!terminal && value.completedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'must not be set before execution reaches a terminal status',
      });
    }
    if (!terminal && value.exitCode !== null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['exitCode'],
        message: 'must be null before execution reaches a terminal status',
      });
    }
    if (value.status === 'completed' && value.exitCode === null) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['exitCode'],
        message: 'is required for a completed execution',
      });
    }
    if (value.status === 'completed' && value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'must not be set for a completed execution',
      });
    }
    if (terminal && value.status !== 'completed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a non-success terminal execution',
      });
    }
    addExpectedErrorCode(value.status, value.error?.code, context);
    if (value.stdoutTruncated && !value.stdoutArtifactRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['stdoutArtifactRef'],
        message: 'is required when stdout is truncated',
      });
    }
    if (value.stderrTruncated && !value.stderrArtifactRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['stderrArtifactRef'],
        message: 'is required when stderr is truncated',
      });
    }
    if (new Set(value.generatedArtifactRefs).size !== value.generatedArtifactRefs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['generatedArtifactRefs'],
        message: 'must not contain duplicate Artifact references',
      });
    }
    if (value.externalReceipt && value.externalReceipt.executionId !== value.executionId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['externalReceipt', 'executionId'],
        message: 'must match the result executionId',
      });
    }
    if (value.completedAt && Date.parse(value.completedAt) < Date.parse(value.startedAt)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['completedAt'],
        message: 'must not be earlier than startedAt',
      });
    }
  }) satisfies ZodType<CommandExecutionResult>;

export const commandOutputChunkSchema = z
  .object({
    executionId: nonEmptyString,
    sequence: nonNegativeInteger,
    stream: z.enum(['stdout', 'stderr']),
    encoding: z.enum(['utf8', 'base64']),
    content: z.string(),
    byteLength: nonNegativeInteger,
    contentHash: nonEmptyString,
    emittedAt: timestampSchema,
    truncated: z.boolean().optional(),
  })
  .superRefine((value, context) => {
    if (value.encoding === 'base64' && !isBase64(value.content)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['content'],
        message: 'must be valid base64 when encoding is base64',
      });
    }
  }) satisfies ZodType<CommandOutputChunk>;

export const executionCancelRequestSchema = z.object({
  operationId: nonEmptyString,
  executionId: nonEmptyString,
  principal: executionPrincipalSchema,
  expectedRevision: nonNegativeInteger,
  reason: nonEmptyString.optional(),
  gracePeriodMs: nonNegativeInteger.optional(),
  idempotencyKey: nonEmptyString.optional(),
  correlationId: nonEmptyString.optional(),
  causationId: nonEmptyString.optional(),
}) satisfies ZodType<ExecutionCancelRequest>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const nonNegativeNumberJsonSchema: JsonSchema = { type: 'number', minimum: 0 };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const commandExecutionRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'operationId',
    'principal',
    'userId',
    'workspaceId',
    'runId',
    'environmentRef',
    'executable',
  ],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    operationId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    stepId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    fsmState: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    environmentRef: specRefJsonSchema,
    executable: {
      type: 'string',
      minLength: 1,
      pattern: '^(?=.*\\S)[^\\u0000]*$',
    },
    args: { type: 'array', items: { type: 'string', pattern: '^[^\\u0000]*$' } },
    cwd: relativePathJsonSchema,
    env: {
      type: 'object',
      propertyNames: { pattern: '^[^=\\u0000]+$' },
      additionalProperties: { type: 'string', pattern: '^[^\\u0000]*$' },
    },
    secretRefs: { type: 'array', items: nonEmptyStringJsonSchema, uniqueItems: true },
    shell: { type: 'boolean', default: false },
    stdin: {
      oneOf: [
        { type: 'string' },
        {
          type: 'array',
          items: { type: 'integer', minimum: 0, maximum: 255 },
          description: 'Uint8Array represented as byte values at serialized boundaries.',
        },
      ],
    },
    timeoutMs: positiveIntegerJsonSchema,
    idleTimeoutMs: positiveIntegerJsonSchema,
    maxStdoutBytes: positiveIntegerJsonSchema,
    maxStderrBytes: positiveIntegerJsonSchema,
    captureArtifacts: { type: 'boolean' },
    captureFileMutations: { type: 'boolean' },
    snapshotBefore: { type: 'boolean' },
    snapshotAfter: { type: 'boolean' },
    snapshotOnFailure: { type: 'boolean' },
    networkAuthorizationRef: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    expectedWorkspaceSnapshotHash: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
    metadata: { type: 'object' },
  },
  description:
    'shell=true is a risk signal only and still requires policy, approval, and Provider checks.',
  additionalProperties: false,
};

export const executionResourceUsageJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    cpuTimeMs: nonNegativeNumberJsonSchema,
    peakMemoryBytes: nonNegativeIntegerJsonSchema,
    readBytes: nonNegativeIntegerJsonSchema,
    writtenBytes: nonNegativeIntegerJsonSchema,
    networkBytesSent: nonNegativeIntegerJsonSchema,
    networkBytesReceived: nonNegativeIntegerJsonSchema,
    processCountPeak: nonNegativeIntegerJsonSchema,
    outputBytes: nonNegativeIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const executionReceiptJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id', 'providerId', 'executionId', 'status', 'issuedAt', 'receiptHash'],
  properties: {
    id: nonEmptyStringJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    providerExecutionRef: nonEmptyStringJsonSchema,
    status: { enum: ['accepted', 'completed', 'rejected', 'unknown'] },
    issuedAt: timestampJsonSchema,
    receiptHash: nonEmptyStringJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const commandExecutionResultJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'executionId',
    'revision',
    'sandboxId',
    'status',
    'exitCode',
    'changedFiles',
    'generatedArtifactRefs',
    'startedAt',
  ],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    revision: nonNegativeIntegerJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    status: { enum: commandExecutionStatusSchema.options },
    exitCode: { oneOf: [{ type: 'integer' }, { type: 'null' }] },
    signal: nonEmptyStringJsonSchema,
    stdout: { type: 'string' },
    stderr: { type: 'string' },
    stdoutTruncated: { type: 'boolean' },
    stderrTruncated: { type: 'boolean' },
    stdoutArtifactRef: nonEmptyStringJsonSchema,
    stderrArtifactRef: nonEmptyStringJsonSchema,
    changedFiles: { type: 'array', items: fileMutationJsonSchema },
    generatedArtifactRefs: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      uniqueItems: true,
    },
    snapshotBeforeRef: nonEmptyStringJsonSchema,
    snapshotAfterRef: nonEmptyStringJsonSchema,
    resourceUsage: executionResourceUsageJsonSchema,
    externalReceipt: executionReceiptJsonSchema,
    startedAt: timestampJsonSchema,
    completedAt: timestampJsonSchema,
    latencyMs: nonNegativeNumberJsonSchema,
    error: normalizedExecutionErrorJsonSchema,
    metadata: { type: 'object' },
  },
  allOf: [
    {
      if: {
        properties: { status: { enum: terminalStatuses } },
        required: ['status'],
      },
      then: { required: ['completedAt'] },
    },
    {
      if: {
        properties: { status: { enum: ['queued', 'starting', 'running', 'cancelling'] } },
        required: ['status'],
      },
      then: {
        properties: { exitCode: { type: 'null' } },
        not: { required: ['completedAt'] },
      },
    },
    {
      if: { properties: { status: { const: 'completed' } }, required: ['status'] },
      then: {
        properties: { exitCode: { type: 'integer' } },
        not: { required: ['error'] },
      },
    },
    {
      if: {
        properties: {
          status: {
            enum: [
              'cancelled',
              'failed',
              'timed_out',
              'oom_killed',
              'resource_exceeded',
              'quarantined',
            ],
          },
        },
        required: ['status'],
      },
      then: { required: ['error'] },
    },
    {
      if: {
        properties: { stdoutTruncated: { const: true } },
        required: ['stdoutTruncated'],
      },
      then: { required: ['stdoutArtifactRef'] },
    },
    {
      if: {
        properties: { stderrTruncated: { const: true } },
        required: ['stderrTruncated'],
      },
      then: { required: ['stderrArtifactRef'] },
    },
  ],
  additionalProperties: false,
};

export const commandOutputChunkJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'executionId',
    'sequence',
    'stream',
    'encoding',
    'content',
    'byteLength',
    'contentHash',
    'emittedAt',
  ],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    sequence: nonNegativeIntegerJsonSchema,
    stream: { enum: ['stdout', 'stderr'] },
    encoding: { enum: ['utf8', 'base64'] },
    content: { type: 'string' },
    byteLength: nonNegativeIntegerJsonSchema,
    contentHash: nonEmptyStringJsonSchema,
    emittedAt: timestampJsonSchema,
    truncated: { type: 'boolean' },
  },
  allOf: [
    {
      if: { properties: { encoding: { const: 'base64' } }, required: ['encoding'] },
      then: { properties: { content: { type: 'string', contentEncoding: 'base64' } } },
    },
  ],
  additionalProperties: false,
};

export const executionCancelRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'executionId', 'principal', 'expectedRevision'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    reason: nonEmptyStringJsonSchema,
    gracePeriodMs: nonNegativeIntegerJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const commandExecutionJsonSchemas: Record<string, JsonSchema> = {
  CommandExecutionRequest: commandExecutionRequestJsonSchema,
  CommandExecutionResult: commandExecutionResultJsonSchema,
  ExecutionResourceUsage: executionResourceUsageJsonSchema,
  ExecutionReceipt: executionReceiptJsonSchema,
  CommandOutputChunk: commandOutputChunkJsonSchema,
  ExecutionCancelRequest: executionCancelRequestJsonSchema,
};

export const commandExecutionRequestExample: CommandExecutionRequest = {
  operationId: 'operation.command.example',
  principal: {
    principalId: 'agent.example',
    type: 'agent',
    userId: 'user.example',
    agentId: 'agent.example',
    permissionScopes: ['execution:command:run'],
  },
  userId: 'user.example',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  stepId: 'step.example',
  agentId: 'agent.example',
  fsmState: 'execute',
  environmentRef: { id: 'execution-environment.mock.safe', version: '0.1.0' },
  executable: 'node',
  args: ['scripts/check.mjs', '--format=json'],
  cwd: 'working',
  env: { NODE_ENV: 'test' },
  secretRefs: [],
  shell: false,
  timeoutMs: 60_000,
  idleTimeoutMs: 10_000,
  maxStdoutBytes: 1_048_576,
  maxStderrBytes: 1_048_576,
  captureArtifacts: true,
  captureFileMutations: true,
  snapshotBefore: true,
  snapshotAfter: true,
  snapshotOnFailure: true,
  idempotencyKey: 'command:run.example:step.example',
  expectedWorkspaceSnapshotHash: 'sha256:workspace-before',
  correlationId: 'correlation.example',
};

export const commandExecutionResultExample: CommandExecutionResult = {
  executionId: 'execution.example',
  revision: 2,
  sandboxId: 'sandbox.example',
  status: 'completed',
  exitCode: 0,
  stdout: '{"ok":true}\n',
  stderr: '',
  stdoutTruncated: false,
  stderrTruncated: false,
  changedFiles: [
    {
      path: 'outputs/report.json',
      operation: 'created',
      afterHash: 'sha256:report',
      afterSizeBytes: 12,
      artifactRef: 'artifact:report',
      detectedAt: '2026-07-16T00:00:02.000Z',
    },
  ],
  generatedArtifactRefs: ['artifact:report'],
  snapshotBeforeRef: 'snapshot:before',
  snapshotAfterRef: 'snapshot:after',
  resourceUsage: {
    cpuTimeMs: 50,
    peakMemoryBytes: 16_777_216,
    readBytes: 1_024,
    writtenBytes: 12,
    processCountPeak: 1,
    outputBytes: 12,
  },
  startedAt: '2026-07-16T00:00:01.000Z',
  completedAt: '2026-07-16T00:00:02.000Z',
  latencyMs: 1_000,
};

export const commandOutputChunkExample: CommandOutputChunk = {
  executionId: 'execution.example',
  sequence: 0,
  stream: 'stdout',
  encoding: 'utf8',
  content: '{"ok":true}\n',
  byteLength: 12,
  contentHash: 'sha256:stdout-chunk',
  emittedAt: '2026-07-16T00:00:01.500Z',
};

export const executionCancelRequestExample: ExecutionCancelRequest = {
  operationId: 'operation.cancel.example',
  executionId: 'execution.example',
  principal: commandExecutionRequestExample.principal,
  expectedRevision: 1,
  reason: 'run cancelled',
  gracePeriodMs: 5_000,
  idempotencyKey: 'cancel:execution.example:1',
};

export function validateCommandExecutionRequest(input: unknown): CommandExecutionRequest {
  return commandExecutionRequestSchema.parse(input);
}

export function validateCommandExecutionResult(input: unknown): CommandExecutionResult {
  return commandExecutionResultSchema.parse(input);
}

export function validateCommandOutputChunk(input: unknown): CommandOutputChunk {
  return commandOutputChunkSchema.parse(input);
}

export function validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest {
  return executionCancelRequestSchema.parse(input);
}

export function canTransitionCommandExecutionStatus(
  from: CommandExecutionStatus,
  to: CommandExecutionStatus
): boolean {
  return commandExecutionStatusTransitions[from].includes(to);
}

function addExpectedErrorCode(
  status: CommandExecutionStatus,
  errorCode: string | undefined,
  context: z.RefinementCtx
): void {
  const expected: Partial<Record<CommandExecutionStatus, readonly string[]>> = {
    cancelled: ['EXECUTION_CANCELLED'],
    timed_out: ['EXECUTION_TIMEOUT', 'EXECUTION_IDLE_TIMEOUT'],
    oom_killed: ['EXECUTION_OOM_KILLED'],
    resource_exceeded: ['EXECUTION_RESOURCE_EXCEEDED', 'EXECUTION_OUTPUT_LIMIT'],
  };
  const allowed = expected[status];
  if (allowed && errorCode && !allowed.includes(errorCode)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['error', 'code'],
      message: `must match execution status ${status}`,
    });
  }
}

function isBase64(value: string): boolean {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value);
}
