import { z, type ZodType } from 'zod';
import type {
  ArtifactByteRange,
  ArtifactByteSource,
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactPutRequest,
  ArtifactStoreCapabilities,
} from '../../contracts/artifact-store';
import type { JsonSchema } from '../../specs';
import {
  artifactContentHashSchema,
  artifactStorageRefJsonSchema,
  artifactStorageRefSchema,
} from './index';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });
const artifactObjectKeyPattern = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))(?!.*\\).+$/u;

export const artifactObjectKeySchema = z
  .string()
  .min(1)
  .regex(artifactObjectKeyPattern)
  .refine((value) => !value.includes('\0'), 'must not contain null bytes');

export const artifactByteSourceSchema = z.custom<ArtifactByteSource>(isArtifactByteSource, {
  message: 'must be a Uint8Array or AsyncIterable<Uint8Array>',
});

export const artifactStreamSchema = z.custom<AsyncIterable<Uint8Array>>(isArtifactStream, {
  message: 'must be an AsyncIterable<Uint8Array>',
});

export const artifactByteRangeSchema = z
  .object({
    start: nonNegativeInteger,
    endInclusive: nonNegativeInteger.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.endInclusive !== undefined && value.endInclusive < value.start) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endInclusive'],
        message: 'must be greater than or equal to start',
      });
    }
  }) satisfies ZodType<ArtifactByteRange>;

export const artifactStoreCapabilitiesSchema = z
  .object({
    versioning: z.boolean(),
    rangeRead: z.boolean(),
    signedAccess: z.boolean(),
    serverSideCopy: z.boolean(),
    encryption: z.boolean(),
    multipartUpload: z.boolean(),
    contentAddressing: z.boolean(),
  })
  .strict() satisfies ZodType<ArtifactStoreCapabilities>;

export const artifactPutRequestSchema = z
  .object({
    operationId: nonEmptyString,
    objectKey: artifactObjectKeySchema,
    content: artifactByteSourceSchema,
    expectedContentHash: artifactContentHashSchema.optional(),
    sizeBytes: nonNegativeInteger.optional(),
    mimeType: nonEmptyString.optional(),
    metadata: z.record(z.string()).optional(),
    ifAbsent: z.boolean().optional(),
  })
  .strict() satisfies ZodType<ArtifactPutRequest>;

export const artifactGetRequestSchema = z
  .object({
    ref: artifactStorageRefSchema,
    range: artifactByteRangeSchema.optional(),
    expectedContentHash: artifactContentHashSchema.optional(),
  })
  .strict() satisfies ZodType<ArtifactGetRequest>;

export const artifactContentSchema = z
  .object({
    stream: artifactStreamSchema,
    contentHash: artifactContentHashSchema,
    sizeBytes: nonNegativeInteger,
    mimeType: nonEmptyString.optional(),
    etag: nonEmptyString.optional(),
    range: artifactByteRangeSchema.optional(),
  })
  .strict() satisfies ZodType<ArtifactContent>;

export const artifactObjectMetadataSchema = z
  .object({
    contentHash: artifactContentHashSchema,
    sizeBytes: nonNegativeInteger,
    mimeType: nonEmptyString.optional(),
    etag: nonEmptyString.optional(),
    lastModifiedAt: timestampSchema.optional(),
    metadata: z.record(z.string()).optional(),
  })
  .strict() satisfies ZodType<ArtifactObjectMetadata>;

export const artifactCopyRequestSchema = z
  .object({
    operationId: nonEmptyString,
    source: artifactStorageRefSchema,
    targetObjectKey: artifactObjectKeySchema,
    ifAbsent: z.boolean().optional(),
  })
  .strict() satisfies ZodType<ArtifactCopyRequest>;

export const artifactDownloadAccessRequestSchema = z
  .object({
    ref: artifactStorageRefSchema,
    expiresInSeconds: positiveInteger,
    responseMimeType: nonEmptyString.optional(),
    responseFilename: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactDownloadAccessRequest>;

export const artifactDownloadAccessSchema = z
  .object({
    method: z.literal('GET'),
    url: z.string().url(),
    expiresAt: timestampSchema,
    headers: z.record(z.string()).optional(),
  })
  .strict() satisfies ZodType<ArtifactDownloadAccess>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const contentHashJsonSchema: JsonSchema = {
  type: 'string',
  pattern: '^(sha256|blake3):[0-9a-f]{64}$',
};
const byteSourceJsonSchema: JsonSchema = {
  description: 'Opaque Uint8Array or AsyncIterable<Uint8Array>; never serialized into events.',
};
const stringRecordJsonSchema: JsonSchema = {
  type: 'object',
  additionalProperties: { type: 'string' },
};

export const artifactByteRangeJsonSchema: JsonSchema = strictObject(['start'], {
  start: nonNegativeIntegerJsonSchema,
  endInclusive: nonNegativeIntegerJsonSchema,
});

export const artifactStoreCapabilitiesJsonSchema: JsonSchema = strictObject(
  [
    'versioning',
    'rangeRead',
    'signedAccess',
    'serverSideCopy',
    'encryption',
    'multipartUpload',
    'contentAddressing',
  ],
  {
    versioning: { type: 'boolean' },
    rangeRead: { type: 'boolean' },
    signedAccess: { type: 'boolean' },
    serverSideCopy: { type: 'boolean' },
    encryption: { type: 'boolean' },
    multipartUpload: { type: 'boolean' },
    contentAddressing: { type: 'boolean' },
  }
);

export const artifactPutRequestJsonSchema: JsonSchema = strictObject(
  ['operationId', 'objectKey', 'content'],
  {
    operationId: nonEmptyStringJsonSchema,
    objectKey: {
      type: 'string',
      minLength: 1,
      pattern: artifactObjectKeyPattern.source,
    },
    content: byteSourceJsonSchema,
    expectedContentHash: contentHashJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    mimeType: nonEmptyStringJsonSchema,
    metadata: stringRecordJsonSchema,
    ifAbsent: { type: 'boolean' },
  }
);

export const artifactGetRequestJsonSchema: JsonSchema = strictObject(['ref'], {
  ref: artifactStorageRefJsonSchema,
  range: artifactByteRangeJsonSchema,
  expectedContentHash: contentHashJsonSchema,
});

export const artifactContentJsonSchema: JsonSchema = strictObject(
  ['stream', 'contentHash', 'sizeBytes'],
  {
    stream: byteSourceJsonSchema,
    contentHash: contentHashJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    mimeType: nonEmptyStringJsonSchema,
    etag: nonEmptyStringJsonSchema,
    range: artifactByteRangeJsonSchema,
  }
);

export const artifactObjectMetadataJsonSchema: JsonSchema = strictObject(
  ['contentHash', 'sizeBytes'],
  {
    contentHash: contentHashJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    mimeType: nonEmptyStringJsonSchema,
    etag: nonEmptyStringJsonSchema,
    lastModifiedAt: { type: 'string', format: 'date-time' },
    metadata: stringRecordJsonSchema,
  }
);

export const artifactCopyRequestJsonSchema: JsonSchema = strictObject(
  ['operationId', 'source', 'targetObjectKey'],
  {
    operationId: nonEmptyStringJsonSchema,
    source: artifactStorageRefJsonSchema,
    targetObjectKey: {
      type: 'string',
      minLength: 1,
      pattern: artifactObjectKeyPattern.source,
    },
    ifAbsent: { type: 'boolean' },
  }
);

export const artifactDownloadAccessRequestJsonSchema: JsonSchema = strictObject(
  ['ref', 'expiresInSeconds'],
  {
    ref: artifactStorageRefJsonSchema,
    expiresInSeconds: positiveIntegerJsonSchema,
    responseMimeType: nonEmptyStringJsonSchema,
    responseFilename: nonEmptyStringJsonSchema,
  }
);

export const artifactDownloadAccessJsonSchema: JsonSchema = strictObject(
  ['method', 'url', 'expiresAt'],
  {
    method: { const: 'GET' },
    url: { type: 'string', format: 'uri' },
    expiresAt: { type: 'string', format: 'date-time' },
    headers: stringRecordJsonSchema,
  }
);

export const artifactStoreContractJsonSchemas: Record<string, JsonSchema> = {
  ArtifactByteRange: artifactByteRangeJsonSchema,
  ArtifactStoreCapabilities: artifactStoreCapabilitiesJsonSchema,
  ArtifactPutRequest: artifactPutRequestJsonSchema,
  ArtifactGetRequest: artifactGetRequestJsonSchema,
  ArtifactContent: artifactContentJsonSchema,
  ArtifactObjectMetadata: artifactObjectMetadataJsonSchema,
  ArtifactCopyRequest: artifactCopyRequestJsonSchema,
  ArtifactDownloadAccessRequest: artifactDownloadAccessRequestJsonSchema,
  ArtifactDownloadAccess: artifactDownloadAccessJsonSchema,
};

export const artifactStoreCapabilitiesExample: ArtifactStoreCapabilities = {
  versioning: false,
  rangeRead: true,
  signedAccess: false,
  serverSideCopy: true,
  encryption: true,
  multipartUpload: false,
  contentAddressing: true,
};

export const artifactPutRequestExample: ArtifactPutRequest = {
  operationId: 'operation.artifact.put.example',
  objectKey: `blobs/sha256/${'c'.repeat(64)}`,
  content: new Uint8Array([104, 121, 112, 104, 97]),
  expectedContentHash: `sha256:${'c'.repeat(64)}`,
  sizeBytes: 5,
  mimeType: 'text/plain',
  ifAbsent: true,
};

export const artifactGetRequestExample: ArtifactGetRequest = {
  ref: {
    storeId: 'artifact-store.local',
    objectKey: artifactPutRequestExample.objectKey,
    encrypted: true,
  },
  expectedContentHash: artifactPutRequestExample.expectedContentHash,
};

export const artifactDownloadAccessRequestExample: ArtifactDownloadAccessRequest = {
  ref: artifactGetRequestExample.ref,
  expiresInSeconds: 300,
  responseMimeType: 'text/plain',
  responseFilename: 'hypha.txt',
};

export function validateArtifactPutRequest(input: unknown): ArtifactPutRequest {
  return artifactPutRequestSchema.parse(input);
}

export function validateArtifactGetRequest(input: unknown): ArtifactGetRequest {
  return artifactGetRequestSchema.parse(input);
}

export function validateArtifactDownloadAccessRequest(
  input: unknown
): ArtifactDownloadAccessRequest {
  return artifactDownloadAccessRequestSchema.parse(input);
}

export function isArtifactByteSource(value: unknown): value is ArtifactByteSource {
  return value instanceof Uint8Array || isArtifactStream(value);
}

export function isArtifactStream(value: unknown): value is AsyncIterable<Uint8Array> {
  if (typeof value !== 'object' || value === null) return false;
  const iterator = (value as Partial<AsyncIterable<Uint8Array>>)[Symbol.asyncIterator];
  return typeof iterator === 'function';
}

function strictObject(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: false };
}
