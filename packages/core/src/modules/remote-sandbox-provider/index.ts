import { z, type ZodType } from 'zod';
import type {
  RemoteArtifactChunk,
  RemoteArtifactChunkSequenceExpectation,
  RemoteArtifactDownloadRequest,
  RemoteArtifactTransferReceipt,
  RemoteArtifactUploadRequest,
  RemoteExecutionReconciliationRequest,
  RemoteExecutionReconciliationResult,
  RemoteOutputStreamRequest,
  RemoteSandboxProviderCapabilities,
} from '../../contracts/remote-sandbox-provider';
import type { JsonSchema } from '../../specs';
import {
  commandExecutionResultExample,
  commandExecutionResultJsonSchema,
  commandExecutionResultSchema,
  executionReceiptJsonSchema,
  executionReceiptSchema,
} from '../command-execution';
import { executionPrincipalJsonSchema, executionPrincipalSchema } from '../execution';
import {
  sandboxProviderCapabilitiesJsonSchema,
  sandboxProviderCapabilitiesSchema,
} from '../sandbox';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });
const base64Schema = z.string().refine(isBase64, { message: 'must be valid base64' });

export const remoteSandboxProviderCapabilitiesSchema = sandboxProviderCapabilitiesSchema.extend({
  remoteExecution: z.literal(true),
}) satisfies ZodType<RemoteSandboxProviderCapabilities>;

export const remoteOutputStreamRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    principal: executionPrincipalSchema,
    fromSequence: nonNegativeInteger.optional(),
    maxChunks: positiveInteger.optional(),
    follow: z.boolean().optional(),
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<RemoteOutputStreamRequest>;

export const remoteExecutionReconciliationRequestSchema = z
  .object({
    operationId: nonEmptyString,
    executionId: nonEmptyString,
    sandboxId: nonEmptyString,
    principal: executionPrincipalSchema,
    providerExecutionRef: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (!value.providerExecutionRef && !value.idempotencyKey) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['providerExecutionRef'],
        message: 'providerExecutionRef or idempotencyKey is required for reconciliation',
      });
    }
  }) satisfies ZodType<RemoteExecutionReconciliationRequest>;

export const remoteExecutionReconciliationResultSchema = z
  .object({
    executionId: nonEmptyString,
    sandboxId: nonEmptyString,
    state: z.enum([
      'not_found',
      'accepted',
      'running',
      'completed',
      'failed',
      'cancelled',
      'unknown',
    ]),
    providerExecutionRef: nonEmptyString.optional(),
    observedAt: timestampSchema,
    result: commandExecutionResultSchema.optional(),
    receipt: executionReceiptSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine(addReconciliationResultIssues) satisfies ZodType<RemoteExecutionReconciliationResult>;

export const remoteArtifactUploadRequestSchema = z
  .object({
    operationId: nonEmptyString,
    sandboxId: nonEmptyString,
    principal: executionPrincipalSchema,
    expectedSandboxRevision: nonNegativeInteger,
    artifactRef: nonEmptyString,
    sizeBytes: nonNegativeInteger,
    contentHash: nonEmptyString,
    mediaType: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString,
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<RemoteArtifactUploadRequest>;

export const remoteArtifactDownloadRequestSchema = z
  .object({
    operationId: nonEmptyString,
    sandboxId: nonEmptyString,
    principal: executionPrincipalSchema,
    artifactRef: nonEmptyString,
    maxBytes: positiveInteger,
    expectedContentHash: nonEmptyString.optional(),
    correlationId: nonEmptyString.optional(),
    causationId: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<RemoteArtifactDownloadRequest>;

export const remoteArtifactChunkSchema = z
  .object({
    transferId: nonEmptyString,
    artifactRef: nonEmptyString,
    sequence: nonNegativeInteger,
    offsetBytes: nonNegativeInteger,
    encoding: z.literal('base64'),
    content: base64Schema,
    byteLength: nonNegativeInteger,
    contentHash: nonEmptyString,
    final: z.boolean(),
  })
  .strict()
  .superRefine((value, context) => {
    const actualLength = base64ByteLength(value.content);
    if (actualLength !== value.byteLength) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['byteLength'],
        message: 'must equal the decoded base64 content length',
      });
    }
  }) satisfies ZodType<RemoteArtifactChunk>;

export const remoteArtifactChunkSequenceExpectationSchema = z
  .object({
    transferId: nonEmptyString,
    artifactRef: nonEmptyString,
    sizeBytes: nonNegativeInteger,
  })
  .strict() satisfies ZodType<RemoteArtifactChunkSequenceExpectation>;

export const remoteArtifactTransferReceiptSchema = z
  .object({
    id: nonEmptyString,
    providerId: nonEmptyString,
    sandboxId: nonEmptyString,
    artifactRef: nonEmptyString,
    direction: z.enum(['upload', 'download']),
    status: z.enum(['accepted', 'completed', 'rejected', 'unknown']),
    sizeBytes: nonNegativeInteger,
    contentHash: nonEmptyString.optional(),
    providerTransferRef: nonEmptyString.optional(),
    issuedAt: timestampSchema,
    receiptHash: nonEmptyString,
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.status === 'completed' && !value.contentHash) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contentHash'],
        message: 'is required for a completed transfer',
      });
    }
  }) satisfies ZodType<RemoteArtifactTransferReceipt>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };

export const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema = {
  ...sandboxProviderCapabilitiesJsonSchema,
  properties: {
    ...(sandboxProviderCapabilitiesJsonSchema.properties ?? {}),
    remoteExecution: { const: true },
  },
};

export const remoteOutputStreamRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'executionId', 'principal'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    fromSequence: nonNegativeIntegerJsonSchema,
    maxChunks: positiveIntegerJsonSchema,
    follow: { type: 'boolean' },
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
  },
  additionalProperties: false,
};

export const remoteExecutionReconciliationRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'executionId', 'sandboxId', 'principal'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    executionId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    providerExecutionRef: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
  },
  anyOf: [{ required: ['providerExecutionRef'] }, { required: ['idempotencyKey'] }],
  additionalProperties: false,
};

export const remoteExecutionReconciliationResultJsonSchema: JsonSchema = {
  type: 'object',
  required: ['executionId', 'sandboxId', 'state', 'observedAt'],
  properties: {
    executionId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    state: {
      enum: [
        'not_found',
        'accepted',
        'running',
        'completed',
        'failed',
        'cancelled',
        'unknown',
      ],
    },
    providerExecutionRef: nonEmptyStringJsonSchema,
    observedAt: timestampJsonSchema,
    result: commandExecutionResultJsonSchema,
    receipt: executionReceiptJsonSchema,
    metadata: { type: 'object' },
  },
  allOf: [
    {
      if: {
        properties: {
          state: { enum: ['accepted', 'running', 'completed', 'failed', 'cancelled'] },
        },
        required: ['state'],
      },
      then: { required: ['providerExecutionRef'] },
    },
    {
      if: {
        properties: { state: { enum: ['completed', 'failed', 'cancelled'] } },
        required: ['state'],
      },
      then: { required: ['result'] },
    },
  ],
  additionalProperties: false,
};

export const remoteArtifactUploadRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'operationId',
    'sandboxId',
    'principal',
    'expectedSandboxRevision',
    'artifactRef',
    'sizeBytes',
    'contentHash',
    'idempotencyKey',
  ],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    expectedSandboxRevision: nonNegativeIntegerJsonSchema,
    artifactRef: nonEmptyStringJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    contentHash: nonEmptyStringJsonSchema,
    mediaType: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const remoteArtifactDownloadRequestJsonSchema: JsonSchema = {
  type: 'object',
  required: ['operationId', 'sandboxId', 'principal', 'artifactRef', 'maxBytes'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    artifactRef: nonEmptyStringJsonSchema,
    maxBytes: positiveIntegerJsonSchema,
    expectedContentHash: nonEmptyStringJsonSchema,
    correlationId: nonEmptyStringJsonSchema,
    causationId: nonEmptyStringJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const remoteArtifactChunkJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'transferId',
    'artifactRef',
    'sequence',
    'offsetBytes',
    'encoding',
    'content',
    'byteLength',
    'contentHash',
    'final',
  ],
  properties: {
    transferId: nonEmptyStringJsonSchema,
    artifactRef: nonEmptyStringJsonSchema,
    sequence: nonNegativeIntegerJsonSchema,
    offsetBytes: nonNegativeIntegerJsonSchema,
    encoding: { const: 'base64' },
    content: { type: 'string', contentEncoding: 'base64' },
    byteLength: nonNegativeIntegerJsonSchema,
    contentHash: nonEmptyStringJsonSchema,
    final: { type: 'boolean' },
  },
  additionalProperties: false,
};

export const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['transferId', 'artifactRef', 'sizeBytes'],
  properties: {
    transferId: nonEmptyStringJsonSchema,
    artifactRef: nonEmptyStringJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const remoteArtifactTransferReceiptJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'providerId',
    'sandboxId',
    'artifactRef',
    'direction',
    'status',
    'sizeBytes',
    'issuedAt',
    'receiptHash',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    providerId: nonEmptyStringJsonSchema,
    sandboxId: nonEmptyStringJsonSchema,
    artifactRef: nonEmptyStringJsonSchema,
    direction: { enum: ['upload', 'download'] },
    status: { enum: ['accepted', 'completed', 'rejected', 'unknown'] },
    sizeBytes: nonNegativeIntegerJsonSchema,
    contentHash: nonEmptyStringJsonSchema,
    providerTransferRef: nonEmptyStringJsonSchema,
    issuedAt: timestampJsonSchema,
    receiptHash: nonEmptyStringJsonSchema,
    metadata: { type: 'object' },
  },
  allOf: [
    {
      if: { properties: { status: { const: 'completed' } }, required: ['status'] },
      then: { required: ['contentHash'] },
    },
  ],
  additionalProperties: false,
};

export const remoteSandboxProviderContractJsonSchemas: Record<string, JsonSchema> = {
  RemoteSandboxProviderCapabilities: remoteSandboxProviderCapabilitiesJsonSchema,
  RemoteOutputStreamRequest: remoteOutputStreamRequestJsonSchema,
  RemoteExecutionReconciliationRequest: remoteExecutionReconciliationRequestJsonSchema,
  RemoteExecutionReconciliationResult: remoteExecutionReconciliationResultJsonSchema,
  RemoteArtifactUploadRequest: remoteArtifactUploadRequestJsonSchema,
  RemoteArtifactDownloadRequest: remoteArtifactDownloadRequestJsonSchema,
  RemoteArtifactChunk: remoteArtifactChunkJsonSchema,
  RemoteArtifactChunkSequenceExpectation: remoteArtifactChunkSequenceExpectationJsonSchema,
  RemoteArtifactTransferReceipt: remoteArtifactTransferReceiptJsonSchema,
};

const examplePrincipal = {
  principalId: 'service.remote-execution.example',
  type: 'service' as const,
  userId: 'user.example',
  permissionScopes: ['execution:remote:read', 'execution:artifact:transfer'],
};

export const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities = {
  processIsolation: true,
  filesystemIsolation: true,
  networkIsolation: true,
  cpuLimits: true,
  memoryLimits: true,
  diskLimits: true,
  pidsLimit: true,
  cancellation: true,
  processTreeKill: true,
  snapshots: true,
  imageDigestPinning: true,
  remoteExecution: true,
};

export const remoteOutputStreamRequestExample: RemoteOutputStreamRequest = {
  operationId: 'operation.remote-output.example',
  executionId: 'execution.remote.example',
  principal: examplePrincipal,
  fromSequence: 0,
  maxChunks: 100,
  follow: true,
  correlationId: 'correlation.remote.example',
};

export const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest = {
  operationId: 'operation.remote-reconcile.example',
  executionId: 'execution.remote.example',
  sandboxId: 'sandbox.remote.example',
  principal: examplePrincipal,
  providerExecutionRef: 'provider-execution.remote.example',
  idempotencyKey: 'remote-execution:run.example:step.example',
  correlationId: 'correlation.remote.example',
};

const remoteExecutionReceiptExample = {
  id: 'receipt.remote-execution.example',
  providerId: 'provider.remote.example',
  executionId: remoteExecutionReconciliationRequestExample.executionId,
  providerExecutionRef: remoteExecutionReconciliationRequestExample.providerExecutionRef,
  status: 'completed' as const,
  issuedAt: '2026-07-17T00:00:01.000Z',
  receiptHash: 'sha256:remote-execution-receipt',
};

export const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult = {
  executionId: remoteExecutionReconciliationRequestExample.executionId,
  sandboxId: remoteExecutionReconciliationRequestExample.sandboxId,
  state: 'completed',
  providerExecutionRef: remoteExecutionReconciliationRequestExample.providerExecutionRef,
  observedAt: '2026-07-17T00:00:01.000Z',
  result: {
    ...commandExecutionResultExample,
    executionId: remoteExecutionReconciliationRequestExample.executionId,
    sandboxId: remoteExecutionReconciliationRequestExample.sandboxId,
    externalReceipt: remoteExecutionReceiptExample,
  },
  receipt: remoteExecutionReceiptExample,
};

export const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest = {
  operationId: 'operation.remote-upload.example',
  sandboxId: 'sandbox.remote.example',
  principal: examplePrincipal,
  expectedSandboxRevision: 2,
  artifactRef: 'artifact:example',
  sizeBytes: 3,
  contentHash: 'sha256:artifact-example',
  mediaType: 'application/octet-stream',
  idempotencyKey: 'remote-upload:artifact-example:2',
  correlationId: 'correlation.remote.example',
};

export const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest = {
  operationId: 'operation.remote-download.example',
  sandboxId: 'sandbox.remote.example',
  principal: examplePrincipal,
  artifactRef: 'artifact:example',
  maxBytes: 1_048_576,
  expectedContentHash: 'sha256:artifact-example',
};

export const remoteArtifactChunkExample: RemoteArtifactChunk = {
  transferId: 'transfer.remote.example',
  artifactRef: 'artifact:example',
  sequence: 0,
  offsetBytes: 0,
  encoding: 'base64',
  content: 'YWJj',
  byteLength: 3,
  contentHash: 'sha256:chunk-example',
  final: true,
};

export const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation =
  {
    transferId: 'transfer.remote.example',
    artifactRef: 'artifact:example',
    sizeBytes: 3,
  };

export const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt = {
  id: 'receipt.remote-transfer.example',
  providerId: 'provider.remote.example',
  sandboxId: 'sandbox.remote.example',
  artifactRef: 'artifact:example',
  direction: 'upload',
  status: 'completed',
  sizeBytes: 3,
  contentHash: 'sha256:artifact-example',
  providerTransferRef: 'provider-transfer.example',
  issuedAt: '2026-07-17T00:00:00.000Z',
  receiptHash: 'sha256:remote-transfer-receipt',
};

export function validateRemoteSandboxProviderCapabilities(
  input: unknown
): RemoteSandboxProviderCapabilities {
  return remoteSandboxProviderCapabilitiesSchema.parse(input);
}

export function validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest {
  return remoteOutputStreamRequestSchema.parse(input);
}

export function validateRemoteExecutionReconciliationRequest(
  input: unknown
): RemoteExecutionReconciliationRequest {
  return remoteExecutionReconciliationRequestSchema.parse(input);
}

export function validateRemoteExecutionReconciliationResult(
  input: unknown
): RemoteExecutionReconciliationResult {
  return remoteExecutionReconciliationResultSchema.parse(input);
}

export function validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest {
  return remoteArtifactUploadRequestSchema.parse(input);
}

export function validateRemoteArtifactDownloadRequest(
  input: unknown
): RemoteArtifactDownloadRequest {
  return remoteArtifactDownloadRequestSchema.parse(input);
}

export function validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk {
  return remoteArtifactChunkSchema.parse(input);
}

export function validateRemoteArtifactTransferReceipt(
  input: unknown
): RemoteArtifactTransferReceipt {
  return remoteArtifactTransferReceiptSchema.parse(input);
}

export interface RemoteArtifactChunkSequenceProgress {
  chunksValidated: number;
  bytesValidated: number;
  completed: boolean;
}

/** Validates a remote Artifact transfer incrementally without retaining chunk content. */
export class RemoteArtifactChunkSequenceValidator {
  private readonly expectation: RemoteArtifactChunkSequenceExpectation;
  private nextSequence = 0;
  private nextOffsetBytes = 0;
  private completed = false;

  constructor(expectationInput: unknown) {
    this.expectation = remoteArtifactChunkSequenceExpectationSchema.parse(expectationInput);
  }

  push(input: unknown): RemoteArtifactChunk {
    if (this.completed) {
      throw chunkSequenceError([], 'must not contain chunks after the final chunk');
    }
    const chunk = remoteArtifactChunkSchema.parse(input);
    if (chunk.transferId !== this.expectation.transferId) {
      throw chunkSequenceError(['transferId'], 'must match the transfer expectation');
    }
    if (chunk.artifactRef !== this.expectation.artifactRef) {
      throw chunkSequenceError(['artifactRef'], 'must match the transfer expectation');
    }
    if (chunk.sequence !== this.nextSequence) {
      throw chunkSequenceError(['sequence'], 'must be contiguous and start at zero');
    }
    if (chunk.offsetBytes !== this.nextOffsetBytes) {
      throw chunkSequenceError(['offsetBytes'], 'must be contiguous with the previous chunk');
    }

    const nextOffsetBytes = this.nextOffsetBytes + chunk.byteLength;
    if (nextOffsetBytes > this.expectation.sizeBytes) {
      throw chunkSequenceError([], 'decoded chunk bytes exceed the expected transfer size');
    }
    if (chunk.final && nextOffsetBytes !== this.expectation.sizeBytes) {
      throw chunkSequenceError(['final'], 'final chunk must complete the expected transfer size');
    }
    if (!chunk.final && nextOffsetBytes === this.expectation.sizeBytes) {
      throw chunkSequenceError(
        ['final'],
        'must be true when the expected transfer size is reached'
      );
    }

    this.nextSequence += 1;
    this.nextOffsetBytes = nextOffsetBytes;
    this.completed = chunk.final;
    return chunk;
  }

  progress(): RemoteArtifactChunkSequenceProgress {
    return {
      chunksValidated: this.nextSequence,
      bytesValidated: this.nextOffsetBytes,
      completed: this.completed,
    };
  }

  finish(): RemoteArtifactChunkSequenceProgress {
    if (!this.completed) {
      throw chunkSequenceError([], 'stream ended before a final chunk completed the transfer');
    }
    return this.progress();
  }
}

export function validateRemoteArtifactChunkSequence(
  input: readonly unknown[],
  expectationInput: unknown
): RemoteArtifactChunk[] {
  const validator = new RemoteArtifactChunkSequenceValidator(expectationInput);
  const chunks = input.map((chunk) => validator.push(chunk));
  validator.finish();
  return chunks;
}

function chunkSequenceError(path: Array<string | number>, message: string): z.ZodError {
  return new z.ZodError([{ code: z.ZodIssueCode.custom, path, message }]);
}

function addReconciliationResultIssues(
  value: RemoteExecutionReconciliationResult,
  context: z.RefinementCtx
): void {
  const terminalStates = ['completed', 'failed', 'cancelled'] as const;
  const foundStates = ['accepted', 'running', ...terminalStates] as const;
  if (foundStates.includes(value.state as (typeof foundStates)[number])) {
    if (!value.providerExecutionRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['providerExecutionRef'],
        message: 'is required when the remote execution was found',
      });
    }
  }
  if (terminalStates.includes(value.state as (typeof terminalStates)[number]) && !value.result) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['result'],
      message: 'is required for a terminal reconciliation state',
    });
  }
  if (value.result) {
    if (value.result.executionId !== value.executionId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['result', 'executionId'],
        message: 'must match the reconciled executionId',
      });
    }
    if (value.result.sandboxId !== value.sandboxId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['result', 'sandboxId'],
        message: 'must match the reconciled sandboxId',
      });
    }
    if (!resultStatusMatchesReconciliationState(value.state, value.result.status)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['result', 'status'],
        message: 'must match the reconciliation state',
      });
    }
  }
  if (value.receipt) {
    if (value.receipt.executionId !== value.executionId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['receipt', 'executionId'],
        message: 'must match the reconciled executionId',
      });
    }
    if (
      value.providerExecutionRef &&
      value.receipt.providerExecutionRef !== value.providerExecutionRef
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['receipt', 'providerExecutionRef'],
        message: 'must match the reconciled providerExecutionRef',
      });
    }
  }
}

function resultStatusMatchesReconciliationState(
  state: RemoteExecutionReconciliationResult['state'],
  status: NonNullable<RemoteExecutionReconciliationResult['result']>['status']
): boolean {
  if (state === 'accepted') return status === 'queued' || status === 'starting';
  if (state === 'running') return status === 'running' || status === 'cancelling';
  if (state === 'completed') return status === 'completed';
  if (state === 'cancelled') return status === 'cancelled';
  if (state === 'failed') {
    return ['failed', 'timed_out', 'oom_killed', 'resource_exceeded', 'quarantined'].includes(status);
  }
  return false;
}

function isBase64(value: string): boolean {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value);
}

function base64ByteLength(value: string): number {
  if (!value) return 0;
  const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
  return (value.length / 4) * 3 - padding;
}
