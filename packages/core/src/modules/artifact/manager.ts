import { z, type ZodType } from 'zod';
import type {
  ArtifactCreateRequest,
  ArtifactFromWorkspaceRequest,
  ArtifactGetRecordRequest,
  ArtifactListRequest,
  ArtifactMutationRequest,
  ArtifactReadRequest,
  ArtifactReadResult,
  ArtifactVersionRequest,
  NormalizedArtifactError,
} from '../../contracts/artifact-manager';
import { specRefSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';
import { executionPrincipalJsonSchema, executionPrincipalSchema } from '../execution';
import { workspaceRelativePathSchema } from '../workspace';
import {
  artifactAccessRecordJsonSchema,
  artifactAccessRecordSchema,
  artifactContentHashSchema,
  artifactKindSchema,
  artifactProvenanceJsonSchema,
  artifactProvenanceSchema,
  artifactRecordJsonSchema,
  artifactRecordSchema,
  artifactRetentionRecordJsonSchema,
  artifactRetentionRecordSchema,
  artifactStatusSchema,
} from './index';
import {
  artifactByteRangeJsonSchema,
  artifactByteRangeSchema,
  artifactByteSourceSchema,
  artifactContentJsonSchema,
  artifactContentSchema,
} from './store';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();

const artifactCreateIdentitySchema = z
  .object({
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    profileRef: specRefSchema,
    userId: nonEmptyString,
    tenantId: nonEmptyString.optional(),
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
  })
  .strict();

export const artifactCreateRequestSchema = artifactCreateIdentitySchema
  .extend({
    name: nonEmptyString,
    description: nonEmptyString.optional(),
    relativePath: workspaceRelativePathSchema.optional(),
    kind: artifactKindSchema,
    mimeType: nonEmptyString.optional(),
    encoding: nonEmptyString.optional(),
    content: artifactByteSourceSchema,
    expectedContentHash: artifactContentHashSchema.optional(),
    expectedSizeBytes: nonNegativeInteger.optional(),
    logicalArtifactId: nonEmptyString.optional(),
    provenance: artifactProvenanceSchema,
    access: artifactAccessRecordSchema.optional(),
    retention: artifactRetentionRecordSchema.optional(),
    sensitive: z.boolean().optional(),
    tags: z.array(nonEmptyString).optional(),
    idempotencyKey: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateIdentityScope(value, context);
    validateUniqueValues(value.tags, ['tags'], context);
    if (value.access && value.access.workspaceId !== value.workspaceId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['access', 'workspaceId'],
        message: 'must match request.workspaceId',
      });
    }
  }) satisfies ZodType<ArtifactCreateRequest>;

export const artifactFromWorkspaceRequestSchema = artifactCreateIdentitySchema
  .extend({
    relativePath: workspaceRelativePathSchema,
    name: nonEmptyString.optional(),
    kind: artifactKindSchema,
    mimeType: nonEmptyString.optional(),
    logicalArtifactId: nonEmptyString.optional(),
    provenance: artifactProvenanceSchema,
    sensitive: z.boolean().optional(),
    tags: z.array(nonEmptyString).optional(),
    idempotencyKey: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateIdentityScope(value, context);
    validateUniqueValues(value.tags, ['tags'], context);
  }) satisfies ZodType<ArtifactFromWorkspaceRequest>;

export const artifactVersionRequestSchema = z
  .object({
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    artifactId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    content: artifactByteSourceSchema,
    expectedContentHash: artifactContentHashSchema.optional(),
    expectedSizeBytes: nonNegativeInteger.optional(),
    provenance: artifactProvenanceSchema,
    idempotencyKey: nonEmptyString.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict() satisfies ZodType<ArtifactVersionRequest>;

export const artifactGetRecordRequestSchema = z
  .object({
    principal: executionPrincipalSchema,
    artifactId: nonEmptyString,
    versionId: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactGetRecordRequest>;

export const artifactReadRequestSchema = artifactGetRecordRequestSchema
  .extend({
    range: artifactByteRangeSchema.optional(),
    expectedContentHash: artifactContentHashSchema.optional(),
  })
  .strict() satisfies ZodType<ArtifactReadRequest>;

export const artifactReadResultSchema = z
  .object({
    record: artifactRecordSchema,
    content: artifactContentSchema,
  })
  .strict() satisfies ZodType<ArtifactReadResult>;

export const artifactListRequestSchema = z
  .object({
    principal: executionPrincipalSchema,
    workspaceId: nonEmptyString,
    logicalArtifactId: nonEmptyString.optional(),
    kinds: z.array(artifactKindSchema).optional(),
    statuses: z.array(artifactStatusSchema).optional(),
    tags: z.array(nonEmptyString).optional(),
    includeDeleted: z.boolean().optional(),
    limit: positiveInteger.optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueValues(value.kinds, ['kinds'], context);
    validateUniqueValues(value.statuses, ['statuses'], context);
    validateUniqueValues(value.tags, ['tags'], context);
  }) satisfies ZodType<ArtifactListRequest>;

export const artifactMutationRequestSchema = z
  .object({
    operationId: nonEmptyString,
    principal: executionPrincipalSchema,
    artifactId: nonEmptyString,
    expectedRevision: nonNegativeInteger,
    reason: nonEmptyString.optional(),
    idempotencyKey: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactMutationRequest>;

export const normalizedArtifactErrorSchema = z
  .object({
    code: z.enum([
      'ARTIFACT_INVALID_INPUT',
      'ARTIFACT_NOT_FOUND',
      'ARTIFACT_PERMISSION_DENIED',
      'ARTIFACT_TOO_LARGE',
      'ARTIFACT_TYPE_DENIED',
      'ARTIFACT_HASH_MISMATCH',
      'ARTIFACT_VERSION_CONFLICT',
      'ARTIFACT_STORE_UNAVAILABLE',
      'ARTIFACT_UPLOAD_FAILED',
      'ARTIFACT_DOWNLOAD_FAILED',
      'ARTIFACT_DELETE_BLOCKED',
      'ARTIFACT_DELETE_PARTIAL',
      'ARTIFACT_VALIDATION_FAILED',
      'ARTIFACT_INTERNAL_ERROR',
    ]),
    message: nonEmptyString,
    retryable: z.boolean(),
    details: z.record(z.unknown()).optional(),
    causeRef: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<NormalizedArtifactError>;

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
const metadataJsonSchema: JsonSchema = { type: 'object' };
const specRefJsonSchema: JsonSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
    revision: nonEmptyStringJsonSchema,
  },
};
const relativePathJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  pattern: '^(?![\\\\/])(?![A-Za-z]:[\\\\/])(?!.*(?:^|[\\\\/])\\.\\.(?:[\\\\/]|$)).+$',
};

const artifactCreateIdentityJsonProperties: Record<string, JsonSchema> = {
  operationId: nonEmptyStringJsonSchema,
  principal: executionPrincipalJsonSchema,
  profileRef: specRefJsonSchema,
  userId: nonEmptyStringJsonSchema,
  tenantId: nonEmptyStringJsonSchema,
  workspaceId: nonEmptyStringJsonSchema,
  sessionId: nonEmptyStringJsonSchema,
  runId: nonEmptyStringJsonSchema,
  agentId: nonEmptyStringJsonSchema,
};

export const artifactCreateRequestJsonSchema: JsonSchema = strictObject(
  [
    'operationId',
    'principal',
    'profileRef',
    'userId',
    'workspaceId',
    'name',
    'kind',
    'content',
    'provenance',
  ],
  {
    ...artifactCreateIdentityJsonProperties,
    name: nonEmptyStringJsonSchema,
    description: nonEmptyStringJsonSchema,
    relativePath: relativePathJsonSchema,
    kind: { enum: artifactKindSchema.options },
    mimeType: nonEmptyStringJsonSchema,
    encoding: nonEmptyStringJsonSchema,
    content: byteSourceJsonSchema,
    expectedContentHash: contentHashJsonSchema,
    expectedSizeBytes: nonNegativeIntegerJsonSchema,
    logicalArtifactId: nonEmptyStringJsonSchema,
    provenance: artifactProvenanceJsonSchema,
    access: artifactAccessRecordJsonSchema,
    retention: artifactRetentionRecordJsonSchema,
    sensitive: { type: 'boolean' },
    tags: arraySchema(nonEmptyStringJsonSchema, true),
    idempotencyKey: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const artifactFromWorkspaceRequestJsonSchema: JsonSchema = strictObject(
  [
    'operationId',
    'principal',
    'profileRef',
    'userId',
    'workspaceId',
    'relativePath',
    'kind',
    'provenance',
  ],
  {
    ...artifactCreateIdentityJsonProperties,
    relativePath: relativePathJsonSchema,
    name: nonEmptyStringJsonSchema,
    kind: { enum: artifactKindSchema.options },
    mimeType: nonEmptyStringJsonSchema,
    logicalArtifactId: nonEmptyStringJsonSchema,
    provenance: artifactProvenanceJsonSchema,
    sensitive: { type: 'boolean' },
    tags: arraySchema(nonEmptyStringJsonSchema, true),
    idempotencyKey: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const artifactVersionRequestJsonSchema: JsonSchema = strictObject(
  ['operationId', 'principal', 'artifactId', 'expectedRevision', 'content', 'provenance'],
  {
    operationId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    artifactId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    content: byteSourceJsonSchema,
    expectedContentHash: contentHashJsonSchema,
    expectedSizeBytes: nonNegativeIntegerJsonSchema,
    provenance: artifactProvenanceJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const artifactGetRecordRequestJsonSchema: JsonSchema = strictObject(
  ['principal', 'artifactId'],
  {
    principal: executionPrincipalJsonSchema,
    artifactId: nonEmptyStringJsonSchema,
    versionId: nonEmptyStringJsonSchema,
  }
);

export const artifactReadRequestJsonSchema: JsonSchema = strictObject(['principal', 'artifactId'], {
  principal: executionPrincipalJsonSchema,
  artifactId: nonEmptyStringJsonSchema,
  versionId: nonEmptyStringJsonSchema,
  range: artifactByteRangeJsonSchema,
  expectedContentHash: contentHashJsonSchema,
});

export const artifactReadResultJsonSchema: JsonSchema = strictObject(['record', 'content'], {
  record: artifactRecordJsonSchema,
  content: artifactContentJsonSchema,
});

export const artifactListRequestJsonSchema: JsonSchema = strictObject(
  ['principal', 'workspaceId'],
  {
    principal: executionPrincipalJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    logicalArtifactId: nonEmptyStringJsonSchema,
    kinds: arraySchema({ enum: artifactKindSchema.options }, true),
    statuses: arraySchema({ enum: artifactStatusSchema.options }, true),
    tags: arraySchema(nonEmptyStringJsonSchema, true),
    includeDeleted: { type: 'boolean' },
    limit: positiveIntegerJsonSchema,
  }
);

export const artifactMutationRequestJsonSchema: JsonSchema = strictObject(
  ['operationId', 'principal', 'artifactId', 'expectedRevision'],
  {
    operationId: nonEmptyStringJsonSchema,
    principal: executionPrincipalJsonSchema,
    artifactId: nonEmptyStringJsonSchema,
    expectedRevision: nonNegativeIntegerJsonSchema,
    reason: nonEmptyStringJsonSchema,
    idempotencyKey: nonEmptyStringJsonSchema,
  }
);

export const normalizedArtifactErrorJsonSchema: JsonSchema = strictObject(
  ['code', 'message', 'retryable'],
  {
    code: { enum: normalizedArtifactErrorSchema.shape.code.options },
    message: nonEmptyStringJsonSchema,
    retryable: { type: 'boolean' },
    details: metadataJsonSchema,
    causeRef: nonEmptyStringJsonSchema,
  }
);

export const artifactManagerContractJsonSchemas: Record<string, JsonSchema> = {
  ArtifactCreateRequest: artifactCreateRequestJsonSchema,
  ArtifactFromWorkspaceRequest: artifactFromWorkspaceRequestJsonSchema,
  ArtifactVersionRequest: artifactVersionRequestJsonSchema,
  ArtifactGetRecordRequest: artifactGetRecordRequestJsonSchema,
  ArtifactReadRequest: artifactReadRequestJsonSchema,
  ArtifactReadResult: artifactReadResultJsonSchema,
  ArtifactListRequest: artifactListRequestJsonSchema,
  ArtifactMutationRequest: artifactMutationRequestJsonSchema,
  NormalizedArtifactError: normalizedArtifactErrorJsonSchema,
};

export const artifactCreateRequestExample: ArtifactCreateRequest = {
  operationId: 'operation.artifact.create.example',
  principal: {
    principalId: 'user.example',
    type: 'user',
    userId: 'user.example',
    permissionScopes: ['artifact:write'],
  },
  profileRef: { id: 'artifact-profile.execution.default', version: '0.1.0' },
  userId: 'user.example',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  name: 'report.json',
  relativePath: 'outputs/report.json',
  kind: 'report',
  mimeType: 'application/json',
  content: new Uint8Array([123, 125]),
  expectedContentHash: `sha256:${'d'.repeat(64)}`,
  expectedSizeBytes: 2,
  provenance: {
    sourceType: 'command_generated',
    createdBy: 'agent.example',
    executionId: 'execution.example',
  },
  access: {
    visibility: 'workspace',
    ownerPrincipalId: 'user.example',
    workspaceId: 'workspace.example',
  },
  idempotencyKey: 'artifact-create:run.example:report',
};

export const artifactFromWorkspaceRequestExample: ArtifactFromWorkspaceRequest = {
  operationId: 'operation.artifact.collect.example',
  principal: artifactCreateRequestExample.principal,
  profileRef: artifactCreateRequestExample.profileRef,
  userId: artifactCreateRequestExample.userId,
  workspaceId: artifactCreateRequestExample.workspaceId,
  runId: artifactCreateRequestExample.runId,
  relativePath: 'outputs/report.json',
  kind: 'report',
  mimeType: 'application/json',
  provenance: artifactCreateRequestExample.provenance,
  idempotencyKey: 'artifact-collect:run.example:report',
};

export const artifactVersionRequestExample: ArtifactVersionRequest = {
  operationId: 'operation.artifact.version.example',
  principal: artifactCreateRequestExample.principal,
  artifactId: 'artifact.example',
  expectedRevision: 0,
  content: new Uint8Array([123, 34, 118, 34, 58, 50, 125]),
  expectedContentHash: `sha256:${'e'.repeat(64)}`,
  expectedSizeBytes: 7,
  provenance: {
    sourceType: 'derived',
    createdBy: 'agent.example',
    sourceArtifactIds: ['artifact.example'],
    transformation: 'update report',
  },
  idempotencyKey: 'artifact-version:artifact.example:1',
};

export function validateArtifactCreateRequest(input: unknown): ArtifactCreateRequest {
  return artifactCreateRequestSchema.parse(input);
}

export function validateArtifactFromWorkspaceRequest(input: unknown): ArtifactFromWorkspaceRequest {
  return artifactFromWorkspaceRequestSchema.parse(input);
}

export function validateArtifactVersionRequest(input: unknown): ArtifactVersionRequest {
  return artifactVersionRequestSchema.parse(input);
}

export function validateArtifactGetRecordRequest(input: unknown): ArtifactGetRecordRequest {
  return artifactGetRecordRequestSchema.parse(input);
}

export function validateArtifactReadRequest(input: unknown): ArtifactReadRequest {
  return artifactReadRequestSchema.parse(input);
}

export function validateArtifactListRequest(input: unknown): ArtifactListRequest {
  return artifactListRequestSchema.parse(input);
}

export function validateArtifactMutationRequest(input: unknown): ArtifactMutationRequest {
  return artifactMutationRequestSchema.parse(input);
}

export function validateNormalizedArtifactError(input: unknown): NormalizedArtifactError {
  return normalizedArtifactErrorSchema.parse(input);
}

function validateIdentityScope(
  value: {
    principal: { userId?: string; tenantId?: string };
    userId: string;
    tenantId?: string;
  },
  context: z.RefinementCtx
): void {
  if (value.principal.userId && value.principal.userId !== value.userId) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['userId'],
      message: 'must match principal.userId when declared',
    });
  }
  if (value.principal.tenantId && value.principal.tenantId !== value.tenantId) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['tenantId'],
      message: 'must match principal.tenantId when declared',
    });
  }
}

function validateUniqueValues(
  values: readonly string[] | undefined,
  path: (string | number)[],
  context: z.RefinementCtx
): void {
  if (!values) return;
  const normalized = values.map((value) => value.toLowerCase());
  if (new Set(normalized).size !== normalized.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: 'must not contain duplicate values',
    });
  }
}

function strictObject(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: false };
}

function arraySchema(items: JsonSchema, uniqueItems = false): JsonSchema {
  return { type: 'array', items, ...(uniqueItems ? { uniqueItems: true } : {}) };
}
