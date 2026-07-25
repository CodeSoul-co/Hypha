import { z, type ZodType } from 'zod';
export * from './store-registry';
import type {
  ArtifactAccessPolicySpec,
  ArtifactAccessRecord,
  ArtifactContentAddressingSpec,
  ArtifactHashAlgorithm,
  ArtifactKind,
  ArtifactLineage,
  ArtifactLineageNode,
  ArtifactPreviewPolicySpec,
  ArtifactProfileSpec,
  ArtifactProvenance,
  ArtifactRecord,
  ArtifactRef,
  ArtifactRetentionPolicySpec,
  ArtifactRetentionRecord,
  ArtifactStatus,
  ArtifactStorageRef,
  ArtifactValidationPolicySpec,
  ArtifactVersioningPolicySpec,
} from '../../contracts/artifact';
import { specRefSchema, versionedSpecSchema } from '../../schemas';
import type { JsonSchema } from '../../specs';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });
const contentHashPattern = /^(sha256|blake3):[0-9a-f]{64}$/u;
export const artifactContentHashSchema = z.string().regex(contentHashPattern);

export const artifactKindSchema = z.enum([
  'document',
  'code',
  'dataset',
  'image',
  'audio',
  'video',
  'table',
  'report',
  'archive',
  'patch',
  'snapshot',
  'test_report',
  'build_output',
  'log',
  'tool_output',
  'execution_receipt',
  'other',
]) satisfies ZodType<ArtifactKind>;

export const artifactStatusSchema = z.enum([
  'creating',
  'draft',
  'final',
  'archived',
  'invalidated',
  'deletion_pending',
  'deleted',
  'failed',
]) satisfies ZodType<ArtifactStatus>;

export const artifactHashAlgorithmSchema = z.enum([
  'sha256',
  'blake3',
]) satisfies ZodType<ArtifactHashAlgorithm>;

export const artifactContentAddressingSpecSchema = z
  .object({
    hashAlgorithm: artifactHashAlgorithmSchema,
    verifyOnRead: z.boolean(),
    deduplicate: z.boolean(),
  })
  .strict() satisfies ZodType<ArtifactContentAddressingSpec>;

export const artifactVersioningPolicySpecSchema = z
  .object({
    strategy: z.literal('append_only'),
    retainPreviousVersions: z.literal(true),
    maxVersions: positiveInteger.optional(),
  })
  .strict() satisfies ZodType<ArtifactVersioningPolicySpec>;

const principalTypeSchema = z.enum(['user', 'agent', 'service', 'system']);

export const artifactAccessPolicySpecSchema = z
  .object({
    defaultVisibility: z.enum(['private', 'session', 'workspace', 'tenant', 'shared']),
    allowedPrincipalTypes: z.array(principalTypeSchema).optional(),
    requiredReadScopes: z.array(nonEmptyString).optional(),
    requiredWriteScopes: z.array(nonEmptyString).optional(),
    requiredDeleteScopes: z.array(nonEmptyString).optional(),
    signedUrlTtlSeconds: positiveInteger.optional(),
    allowRangeRead: z.boolean().optional(),
    allowCrossWorkspaceCopy: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(
      value,
      [
        'allowedPrincipalTypes',
        'requiredReadScopes',
        'requiredWriteScopes',
        'requiredDeleteScopes',
      ],
      context
    );
  }) satisfies ZodType<ArtifactAccessPolicySpec>;

export const artifactRetentionPolicySpecSchema = z
  .object({
    defaultTtlSeconds: positiveInteger.optional(),
    archiveAfterSeconds: positiveInteger.optional(),
    deleteAfterSeconds: positiveInteger.optional(),
    retainFinal: z.boolean().optional(),
    retainOnFailure: z.boolean().optional(),
    legalHoldSupported: z.boolean().optional(),
    garbageCollectUnreferenced: z.boolean().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (
      value.archiveAfterSeconds !== undefined &&
      value.deleteAfterSeconds !== undefined &&
      value.archiveAfterSeconds >= value.deleteAfterSeconds
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deleteAfterSeconds'],
        message: 'must be greater than archiveAfterSeconds',
      });
    }
  }) satisfies ZodType<ArtifactRetentionPolicySpec>;

export const artifactValidationPolicySpecSchema = z
  .object({
    verifyMimeType: z.boolean().optional(),
    verifyExtension: z.boolean().optional(),
    malwareScanRef: specRefSchema.optional(),
    archiveBombProtection: z.boolean().optional(),
    maxExpandedBytes: positiveInteger.optional(),
    checksumRequired: z.boolean().optional(),
    rejectExecutableUploads: z.boolean().optional(),
  })
  .strict() satisfies ZodType<ArtifactValidationPolicySpec>;

export const artifactPreviewPolicySpecSchema = z
  .object({
    enabled: z.boolean(),
    maxPreviewBytes: positiveInteger.optional(),
    allowedMimeTypes: z.array(nonEmptyString).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(value, ['allowedMimeTypes'], context);
    if (!value.enabled && (value.maxPreviewBytes || value.allowedMimeTypes?.length)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['enabled'],
        message: 'must be true when preview limits are declared',
      });
    }
  }) satisfies ZodType<ArtifactPreviewPolicySpec>;

export const artifactProfileSpecSchema = versionedSpecSchema
  .extend({
    revision: nonEmptyString.optional(),
    name: nonEmptyString.optional(),
    storeRef: specRefSchema,
    contentAddressing: artifactContentAddressingSpecSchema,
    versioning: artifactVersioningPolicySpecSchema,
    access: artifactAccessPolicySpecSchema,
    retention: artifactRetentionPolicySpecSchema,
    validation: artifactValidationPolicySpecSchema.optional(),
    preview: artifactPreviewPolicySpecSchema.optional(),
    allowedKinds: z.array(artifactKindSchema).optional(),
    allowedMimeTypes: z.array(nonEmptyString).optional(),
    maxArtifactBytes: positiveInteger.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(value, ['allowedKinds', 'allowedMimeTypes'], context);
  }) satisfies ZodType<ArtifactProfileSpec>;

export const artifactStorageRefSchema = z
  .object({
    storeId: nonEmptyString,
    bucketOrNamespace: nonEmptyString.optional(),
    objectKey: nonEmptyString,
    versionId: nonEmptyString.optional(),
    etag: nonEmptyString.optional(),
    region: nonEmptyString.optional(),
    encrypted: z.boolean().optional(),
  })
  .strict() satisfies ZodType<ArtifactStorageRef>;

export const artifactProvenanceSchema = z
  .object({
    sourceType: z.enum([
      'user_upload',
      'agent_generated',
      'tool_generated',
      'command_generated',
      'derived',
      'imported',
      'snapshot',
      'patch',
    ]),
    createdBy: nonEmptyString,
    sourceEventId: nonEmptyString.optional(),
    toolInvocationId: nonEmptyString.optional(),
    executionId: nonEmptyString.optional(),
    workflowState: nonEmptyString.optional(),
    sourceArtifactIds: z.array(nonEmptyString).optional(),
    transformation: nonEmptyString.optional(),
    environmentHash: artifactContentHashSchema.optional(),
    commandHash: artifactContentHashSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(value, ['sourceArtifactIds'], context);
    if (value.sourceType === 'derived' && !value.sourceArtifactIds?.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['sourceArtifactIds'],
        message: 'is required for derived Artifacts',
      });
    }
  }) satisfies ZodType<ArtifactProvenance>;

export const artifactAccessRecordSchema = z
  .object({
    visibility: z.enum(['private', 'session', 'workspace', 'tenant', 'shared']),
    ownerPrincipalId: nonEmptyString,
    workspaceId: nonEmptyString,
    allowedPrincipalIds: z.array(nonEmptyString).optional(),
    allowedRoles: z.array(nonEmptyString).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(value, ['allowedPrincipalIds', 'allowedRoles'], context);
  }) satisfies ZodType<ArtifactAccessRecord>;

export const artifactRetentionRecordSchema = z
  .object({
    policyRef: specRefSchema.optional(),
    expiresAt: timestampSchema.optional(),
    archivedAt: timestampSchema.optional(),
    legalHold: z.boolean().optional(),
    referencedByCount: nonNegativeInteger.optional(),
  })
  .strict() satisfies ZodType<ArtifactRetentionRecord>;

export const artifactRecordSchema = z
  .object({
    id: nonEmptyString,
    versionId: nonEmptyString,
    versionNumber: positiveInteger,
    revision: nonNegativeInteger,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    workspaceId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    name: nonEmptyString,
    description: nonEmptyString.optional(),
    relativePath: nonEmptyString.optional(),
    kind: artifactKindSchema,
    mimeType: nonEmptyString.optional(),
    encoding: nonEmptyString.optional(),
    sizeBytes: nonNegativeInteger,
    contentHash: artifactContentHashSchema,
    hashAlgorithm: artifactHashAlgorithmSchema,
    storageRef: artifactStorageRefSchema,
    deduplicated: z.boolean().optional(),
    logicalArtifactId: nonEmptyString,
    parentVersionId: nonEmptyString.optional(),
    previousVersionId: nonEmptyString.optional(),
    nextVersionId: nonEmptyString.optional(),
    sourceArtifactIds: z.array(nonEmptyString).optional(),
    derivedArtifactIds: z.array(nonEmptyString).optional(),
    provenance: artifactProvenanceSchema,
    access: artifactAccessRecordSchema,
    retention: artifactRetentionRecordSchema,
    status: artifactStatusSchema,
    immutable: z.boolean().optional(),
    sensitive: z.boolean().optional(),
    tags: z.array(nonEmptyString).optional(),
    createdAt: timestampSchema,
    updatedAt: timestampSchema,
    finalizedAt: timestampSchema.optional(),
    archivedAt: timestampSchema.optional(),
    expiresAt: timestampSchema.optional(),
    deletedAt: timestampSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueStringArrays(value, ['sourceArtifactIds', 'derivedArtifactIds', 'tags'], context);
    if (!value.contentHash.startsWith(`${value.hashAlgorithm}:`)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['contentHash'],
        message: 'must use the declared hashAlgorithm prefix',
      });
    }
    if (value.access.workspaceId !== value.workspaceId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['access', 'workspaceId'],
        message: 'must match ArtifactRecord.workspaceId',
      });
    }
    if (value.status === 'final' && !value.finalizedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['finalizedAt'],
        message: 'is required for final Artifacts',
      });
    }
    if (value.status === 'archived' && !value.archivedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['archivedAt'],
        message: 'is required for archived Artifacts',
      });
    }
    if (value.status === 'deleted' && !value.deletedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['deletedAt'],
        message: 'is required for deleted Artifacts',
      });
    }
  }) satisfies ZodType<ArtifactRecord>;

export const artifactRefSchema = z
  .object({
    artifactId: nonEmptyString,
    versionId: nonEmptyString.optional(),
    contentHash: artifactContentHashSchema,
    kind: artifactKindSchema.optional(),
    mimeType: nonEmptyString.optional(),
    sizeBytes: nonNegativeInteger.optional(),
    accessTokenRef: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactRef>;

export const artifactLineageNodeSchema = z
  .object({
    artifactId: nonEmptyString,
    versionId: nonEmptyString,
    logicalArtifactId: nonEmptyString,
    contentHash: artifactContentHashSchema,
    kind: artifactKindSchema.optional(),
    transformation: nonEmptyString.optional(),
  })
  .strict() satisfies ZodType<ArtifactLineageNode>;

export const artifactLineageSchema = z
  .object({
    artifactId: nonEmptyString,
    ancestors: z.array(artifactLineageNodeSchema),
    descendants: z.array(artifactLineageNodeSchema),
    versions: z.array(artifactRecordSchema),
  })
  .strict()
  .superRefine((value, context) => {
    validateUniqueNodeVersions(value.ancestors, ['ancestors'], context);
    validateUniqueNodeVersions(value.descendants, ['descendants'], context);
    validateUniqueRecordVersions(value.versions, ['versions'], context);
  }) satisfies ZodType<ArtifactLineage>;

const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const timestampJsonSchema: JsonSchema = { type: 'string', format: 'date-time' };
const contentHashJsonSchema: JsonSchema = {
  type: 'string',
  pattern: contentHashPattern.source,
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
const artifactKindJsonSchema: JsonSchema = { enum: artifactKindSchema.options };
const artifactStatusJsonSchema: JsonSchema = { enum: artifactStatusSchema.options };
const artifactHashAlgorithmJsonSchema: JsonSchema = {
  enum: artifactHashAlgorithmSchema.options,
};
const principalTypeJsonSchema: JsonSchema = { enum: principalTypeSchema.options };

export const artifactContentAddressingSpecJsonSchema: JsonSchema = strictObject(
  ['hashAlgorithm', 'verifyOnRead', 'deduplicate'],
  {
    hashAlgorithm: artifactHashAlgorithmJsonSchema,
    verifyOnRead: { type: 'boolean' },
    deduplicate: { type: 'boolean' },
  }
);

export const artifactVersioningPolicySpecJsonSchema: JsonSchema = strictObject(
  ['strategy', 'retainPreviousVersions'],
  {
    strategy: { const: 'append_only' },
    retainPreviousVersions: { const: true },
    maxVersions: positiveIntegerJsonSchema,
  }
);

export const artifactAccessPolicySpecJsonSchema: JsonSchema = strictObject(['defaultVisibility'], {
  defaultVisibility: { enum: ['private', 'session', 'workspace', 'tenant', 'shared'] },
  allowedPrincipalTypes: arraySchema(principalTypeJsonSchema, true),
  requiredReadScopes: arraySchema(nonEmptyStringJsonSchema, true),
  requiredWriteScopes: arraySchema(nonEmptyStringJsonSchema, true),
  requiredDeleteScopes: arraySchema(nonEmptyStringJsonSchema, true),
  signedUrlTtlSeconds: positiveIntegerJsonSchema,
  allowRangeRead: { type: 'boolean' },
  allowCrossWorkspaceCopy: { type: 'boolean' },
});

export const artifactRetentionPolicySpecJsonSchema: JsonSchema = strictObject([], {
  defaultTtlSeconds: positiveIntegerJsonSchema,
  archiveAfterSeconds: positiveIntegerJsonSchema,
  deleteAfterSeconds: positiveIntegerJsonSchema,
  retainFinal: { type: 'boolean' },
  retainOnFailure: { type: 'boolean' },
  legalHoldSupported: { type: 'boolean' },
  garbageCollectUnreferenced: { type: 'boolean' },
});

export const artifactValidationPolicySpecJsonSchema: JsonSchema = strictObject([], {
  verifyMimeType: { type: 'boolean' },
  verifyExtension: { type: 'boolean' },
  malwareScanRef: specRefJsonSchema,
  archiveBombProtection: { type: 'boolean' },
  maxExpandedBytes: positiveIntegerJsonSchema,
  checksumRequired: { type: 'boolean' },
  rejectExecutableUploads: { type: 'boolean' },
});

export const artifactPreviewPolicySpecJsonSchema: JsonSchema = strictObject(['enabled'], {
  enabled: { type: 'boolean' },
  maxPreviewBytes: positiveIntegerJsonSchema,
  allowedMimeTypes: arraySchema(nonEmptyStringJsonSchema, true),
});

export const artifactProfileSpecJsonSchema: JsonSchema = strictObject(
  ['id', 'version', 'storeRef', 'contentAddressing', 'versioning', 'access', 'retention'],
  {
    id: nonEmptyStringJsonSchema,
    version: nonEmptyStringJsonSchema,
    revision: nonEmptyStringJsonSchema,
    name: nonEmptyStringJsonSchema,
    storeRef: specRefJsonSchema,
    contentAddressing: artifactContentAddressingSpecJsonSchema,
    versioning: artifactVersioningPolicySpecJsonSchema,
    access: artifactAccessPolicySpecJsonSchema,
    retention: artifactRetentionPolicySpecJsonSchema,
    validation: artifactValidationPolicySpecJsonSchema,
    preview: artifactPreviewPolicySpecJsonSchema,
    allowedKinds: arraySchema(artifactKindJsonSchema, true),
    allowedMimeTypes: arraySchema(nonEmptyStringJsonSchema, true),
    maxArtifactBytes: positiveIntegerJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const artifactStorageRefJsonSchema: JsonSchema = strictObject(['storeId', 'objectKey'], {
  storeId: nonEmptyStringJsonSchema,
  bucketOrNamespace: nonEmptyStringJsonSchema,
  objectKey: nonEmptyStringJsonSchema,
  versionId: nonEmptyStringJsonSchema,
  etag: nonEmptyStringJsonSchema,
  region: nonEmptyStringJsonSchema,
  encrypted: { type: 'boolean' },
});

export const artifactProvenanceJsonSchema: JsonSchema = strictObject(['sourceType', 'createdBy'], {
  sourceType: {
    enum: [
      'user_upload',
      'agent_generated',
      'tool_generated',
      'command_generated',
      'derived',
      'imported',
      'snapshot',
      'patch',
    ],
  },
  createdBy: nonEmptyStringJsonSchema,
  sourceEventId: nonEmptyStringJsonSchema,
  toolInvocationId: nonEmptyStringJsonSchema,
  executionId: nonEmptyStringJsonSchema,
  workflowState: nonEmptyStringJsonSchema,
  sourceArtifactIds: arraySchema(nonEmptyStringJsonSchema, true),
  transformation: nonEmptyStringJsonSchema,
  environmentHash: contentHashJsonSchema,
  commandHash: contentHashJsonSchema,
  metadata: metadataJsonSchema,
});

export const artifactAccessRecordJsonSchema: JsonSchema = strictObject(
  ['visibility', 'ownerPrincipalId', 'workspaceId'],
  {
    visibility: { enum: ['private', 'session', 'workspace', 'tenant', 'shared'] },
    ownerPrincipalId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    allowedPrincipalIds: arraySchema(nonEmptyStringJsonSchema, true),
    allowedRoles: arraySchema(nonEmptyStringJsonSchema, true),
  }
);

export const artifactRetentionRecordJsonSchema: JsonSchema = strictObject([], {
  policyRef: specRefJsonSchema,
  expiresAt: timestampJsonSchema,
  archivedAt: timestampJsonSchema,
  legalHold: { type: 'boolean' },
  referencedByCount: nonNegativeIntegerJsonSchema,
});

export const artifactRecordJsonSchema: JsonSchema = strictObject(
  [
    'id',
    'versionId',
    'versionNumber',
    'revision',
    'userId',
    'workspaceId',
    'name',
    'kind',
    'sizeBytes',
    'contentHash',
    'hashAlgorithm',
    'storageRef',
    'logicalArtifactId',
    'provenance',
    'access',
    'retention',
    'status',
    'createdAt',
    'updatedAt',
  ],
  {
    id: nonEmptyStringJsonSchema,
    versionId: nonEmptyStringJsonSchema,
    versionNumber: positiveIntegerJsonSchema,
    revision: nonNegativeIntegerJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    name: nonEmptyStringJsonSchema,
    description: nonEmptyStringJsonSchema,
    relativePath: nonEmptyStringJsonSchema,
    kind: artifactKindJsonSchema,
    mimeType: nonEmptyStringJsonSchema,
    encoding: nonEmptyStringJsonSchema,
    sizeBytes: nonNegativeIntegerJsonSchema,
    contentHash: contentHashJsonSchema,
    hashAlgorithm: artifactHashAlgorithmJsonSchema,
    storageRef: artifactStorageRefJsonSchema,
    deduplicated: { type: 'boolean' },
    logicalArtifactId: nonEmptyStringJsonSchema,
    parentVersionId: nonEmptyStringJsonSchema,
    previousVersionId: nonEmptyStringJsonSchema,
    nextVersionId: nonEmptyStringJsonSchema,
    sourceArtifactIds: arraySchema(nonEmptyStringJsonSchema, true),
    derivedArtifactIds: arraySchema(nonEmptyStringJsonSchema, true),
    provenance: artifactProvenanceJsonSchema,
    access: artifactAccessRecordJsonSchema,
    retention: artifactRetentionRecordJsonSchema,
    status: artifactStatusJsonSchema,
    immutable: { type: 'boolean' },
    sensitive: { type: 'boolean' },
    tags: arraySchema(nonEmptyStringJsonSchema, true),
    createdAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    finalizedAt: timestampJsonSchema,
    archivedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    deletedAt: timestampJsonSchema,
    metadata: metadataJsonSchema,
  }
);

export const artifactRefJsonSchema: JsonSchema = strictObject(['artifactId', 'contentHash'], {
  artifactId: nonEmptyStringJsonSchema,
  versionId: nonEmptyStringJsonSchema,
  contentHash: contentHashJsonSchema,
  kind: artifactKindJsonSchema,
  mimeType: nonEmptyStringJsonSchema,
  sizeBytes: nonNegativeIntegerJsonSchema,
  accessTokenRef: nonEmptyStringJsonSchema,
});

export const artifactLineageNodeJsonSchema: JsonSchema = strictObject(
  ['artifactId', 'versionId', 'logicalArtifactId', 'contentHash'],
  {
    artifactId: nonEmptyStringJsonSchema,
    versionId: nonEmptyStringJsonSchema,
    logicalArtifactId: nonEmptyStringJsonSchema,
    contentHash: contentHashJsonSchema,
    kind: artifactKindJsonSchema,
    transformation: nonEmptyStringJsonSchema,
  }
);

export const artifactLineageJsonSchema: JsonSchema = strictObject(
  ['artifactId', 'ancestors', 'descendants', 'versions'],
  {
    artifactId: nonEmptyStringJsonSchema,
    ancestors: arraySchema(artifactLineageNodeJsonSchema, true),
    descendants: arraySchema(artifactLineageNodeJsonSchema, true),
    versions: arraySchema(artifactRecordJsonSchema, true),
  }
);

export const artifactContractJsonSchemas: Record<string, JsonSchema> = {
  ArtifactProfileSpec: artifactProfileSpecJsonSchema,
  ArtifactRecord: artifactRecordJsonSchema,
  ArtifactRef: artifactRefJsonSchema,
  ArtifactLineage: artifactLineageJsonSchema,
};

export const artifactProfileSpecExample: ArtifactProfileSpec = {
  id: 'artifact-profile.execution.default',
  version: '0.1.0',
  revision: 'sha256:artifact-profile-example',
  name: 'Default execution Artifact profile',
  storeRef: { id: 'artifact-store.local', version: '0.1.0' },
  contentAddressing: {
    hashAlgorithm: 'sha256',
    verifyOnRead: true,
    deduplicate: true,
  },
  versioning: {
    strategy: 'append_only',
    retainPreviousVersions: true,
  },
  access: {
    defaultVisibility: 'workspace',
    allowedPrincipalTypes: ['user', 'agent', 'service'],
    requiredReadScopes: ['artifact:read'],
    requiredWriteScopes: ['artifact:write'],
    requiredDeleteScopes: ['artifact:delete'],
    signedUrlTtlSeconds: 300,
    allowRangeRead: true,
    allowCrossWorkspaceCopy: false,
  },
  retention: {
    archiveAfterSeconds: 604_800,
    deleteAfterSeconds: 2_592_000,
    retainFinal: true,
    retainOnFailure: true,
    legalHoldSupported: true,
    garbageCollectUnreferenced: true,
  },
  validation: {
    verifyMimeType: true,
    verifyExtension: true,
    archiveBombProtection: true,
    maxExpandedBytes: 104_857_600,
    checksumRequired: true,
    rejectExecutableUploads: true,
  },
  preview: {
    enabled: true,
    maxPreviewBytes: 65_536,
    allowedMimeTypes: ['text/plain', 'application/json'],
  },
  maxArtifactBytes: 104_857_600,
};

export const artifactRecordExample: ArtifactRecord = {
  id: 'artifact.example',
  versionId: 'artifact.example:v1:sha256-example',
  versionNumber: 1,
  revision: 0,
  userId: 'user.example',
  workspaceId: 'workspace.example',
  runId: 'run.example',
  name: 'build-report.json',
  relativePath: 'outputs/build-report.json',
  kind: 'test_report',
  mimeType: 'application/json',
  encoding: 'utf-8',
  sizeBytes: 128,
  contentHash: `sha256:${'a'.repeat(64)}`,
  hashAlgorithm: 'sha256',
  storageRef: {
    storeId: 'artifact-store.local',
    objectKey: `blobs/sha256/${'a'.repeat(64)}`,
    encrypted: true,
  },
  logicalArtifactId: 'artifact.logical.build-report',
  provenance: {
    sourceType: 'command_generated',
    createdBy: 'agent.example',
    executionId: 'execution.example',
    commandHash: `sha256:${'b'.repeat(64)}`,
  },
  access: {
    visibility: 'workspace',
    ownerPrincipalId: 'user.example',
    workspaceId: 'workspace.example',
  },
  retention: {
    policyRef: { id: 'artifact-retention.default', version: '0.1.0' },
    referencedByCount: 1,
  },
  status: 'final',
  immutable: true,
  sensitive: false,
  createdAt: '2026-07-18T00:00:00.000Z',
  updatedAt: '2026-07-18T00:00:01.000Z',
  finalizedAt: '2026-07-18T00:00:01.000Z',
};

export const artifactRefExample: ArtifactRef = {
  artifactId: artifactRecordExample.id,
  versionId: artifactRecordExample.versionId,
  contentHash: artifactRecordExample.contentHash,
  kind: artifactRecordExample.kind,
  mimeType: artifactRecordExample.mimeType,
  sizeBytes: artifactRecordExample.sizeBytes,
};

export const artifactLineageExample: ArtifactLineage = {
  artifactId: artifactRecordExample.id,
  ancestors: [],
  descendants: [],
  versions: [artifactRecordExample],
};

export function validateArtifactProfileSpec(input: unknown): ArtifactProfileSpec {
  return artifactProfileSpecSchema.parse(input);
}

export function validateArtifactRecord(input: unknown): ArtifactRecord {
  return artifactRecordSchema.parse(input);
}

export function validateArtifactRef(input: unknown): ArtifactRef {
  return artifactRefSchema.parse(input);
}

export function validateArtifactLineage(input: unknown): ArtifactLineage {
  return artifactLineageSchema.parse(input);
}

function strictObject(required: string[], properties: Record<string, JsonSchema>): JsonSchema {
  return { type: 'object', required, properties, additionalProperties: false };
}

function arraySchema(items: JsonSchema, uniqueItems = false): JsonSchema {
  return { type: 'array', items, ...(uniqueItems ? { uniqueItems: true } : {}) };
}

function validateUniqueStringArrays<T extends object>(
  value: T,
  fields: readonly (keyof T)[],
  context: z.RefinementCtx
): void {
  for (const field of fields) {
    const values = value[field];
    if (!Array.isArray(values)) continue;
    const normalized = values.map((item) => String(item).toLowerCase());
    if (new Set(normalized).size !== normalized.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [String(field)],
        message: 'must not contain duplicate values',
      });
    }
  }
}

function validateUniqueNodeVersions(
  nodes: readonly ArtifactLineageNode[],
  path: (string | number)[],
  context: z.RefinementCtx
): void {
  const versionIds = nodes.map((node) => node.versionId);
  if (new Set(versionIds).size !== versionIds.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: 'must not contain duplicate version IDs',
    });
  }
}

function validateUniqueRecordVersions(
  records: readonly ArtifactRecord[],
  path: (string | number)[],
  context: z.RefinementCtx
): void {
  const versionIds = records.map((record) => record.versionId);
  if (new Set(versionIds).size !== versionIds.length) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path,
      message: 'must not contain duplicate version IDs',
    });
  }
}
