import { z, type ZodType } from 'zod';
import type {
  RemoteArtifactChunk,
  RemoteArtifactChunkSequenceExpectation,
  RemoteArtifactDownloadRequest,
  RemoteArtifactTransferReceipt,
  RemoteArtifactUploadRequest,
  RemoteOutputStreamRequest,
  RemoteSandboxProviderCapabilities,
} from '../../contracts/remote-sandbox-provider';
import type { JsonSchema } from '../../specs';
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
      throw chunkSequenceError(
        ['final'],
        'final chunk must complete the expected transfer size'
      );
    }
    if (!chunk.final && nextOffsetBytes === this.expectation.sizeBytes) {
      throw chunkSequenceError(['final'], 'must be true when the expected transfer size is reached');
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

function isBase64(value: string): boolean {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value);
}

function base64ByteLength(value: string): number {
  if (!value) return 0;
  const padding = value.endsWith('==') ? 2 : value.endsWith('=') ? 1 : 0;
  return (value.length / 4) * 3 - padding;
}
