import { z, type ZodType } from 'zod';
import {
  defineSpecSchema,
  exportSpecJsonSchemas,
  specMetadataSchema,
  specRefSchema,
  versionedSpecSchema,
} from '../../schemas';
import type { JsonSchema } from '../../specs';
import type {
  WorkspaceCleanupPolicySpec,
  WorkspaceDirectorySpec,
  WorkspaceEventPayload,
  WorkspaceMutationPolicySpec,
  WorkspacePathPolicySpec,
  WorkspaceQuotaSpec,
  WorkspaceRecord,
  WorkspaceSnapshotPolicySpec,
  WorkspaceSpec,
  WorkspaceStatus,
  WorkspaceUsage,
} from '../../contracts/workspace';
import { normalizedExecutionErrorJsonSchema, normalizedExecutionErrorSchema } from '../execution';

const nonEmptyString = z.string().min(1);
const nonNegativeInteger = z.number().int().nonnegative();
const positiveInteger = z.number().int().positive();
const timestampSchema = z.string().datetime({ offset: true });

export const workspaceRelativePathSchema = z
  .string()
  .min(1)
  .superRefine((value, context) => {
    const normalized = normalizePathForValidation(value);
    if (!normalized.trim() || normalized.includes('\0')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'must be a non-empty safe path',
      });
    }
    if (isAbsoluteLike(normalized)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'must be a relative workspace path',
      });
    }
    if (normalized.split(/[\\/]+/u).includes('..')) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'must not contain traversal segments',
      });
    }
  });

export const workspaceDirectorySpecSchema = z.object({
  inputs: workspaceRelativePathSchema,
  source: workspaceRelativePathSchema,
  working: workspaceRelativePathSchema,
  outputs: workspaceRelativePathSchema,
  logs: workspaceRelativePathSchema,
  temp: workspaceRelativePathSchema,
  snapshots: workspaceRelativePathSchema,
  artifacts: workspaceRelativePathSchema.optional(),
  cache: workspaceRelativePathSchema.optional(),
}) satisfies ZodType<WorkspaceDirectorySpec>;

export const workspacePathPolicySpecSchema = z.object({
  readOnlyPaths: z.array(workspaceRelativePathSchema).optional(),
  writablePaths: z.array(workspaceRelativePathSchema).optional(),
  executablePaths: z.array(workspaceRelativePathSchema).optional(),
  deniedPaths: z.array(workspaceRelativePathSchema).optional(),
  allowSymlinks: z.boolean().optional(),
  allowHardLinks: z.boolean().optional(),
  followSymlinksForRead: z.boolean().optional(),
  allowHiddenFiles: z.boolean().optional(),
  maxPathLength: positiveInteger.optional(),
  allowedExtensions: z.array(z.string().min(1)).optional(),
  deniedExtensions: z.array(z.string().min(1)).optional(),
  caseSensitivity: z.enum(['platform', 'sensitive', 'insensitive']).optional(),
}) satisfies ZodType<WorkspacePathPolicySpec>;

export const workspaceQuotaSpecSchema = z.object({
  maxBytes: positiveInteger.optional(),
  maxFiles: positiveInteger.optional(),
  maxSingleFileBytes: positiveInteger.optional(),
  maxDirectoryDepth: positiveInteger.optional(),
  maxOpenFiles: positiveInteger.optional(),
  maxMutationCountPerExecution: positiveInteger.optional(),
}) satisfies ZodType<WorkspaceQuotaSpec>;

export const workspaceCleanupPolicySpecSchema = z
  .object({
    mode: z.enum(['on_run_end', 'on_success', 'after_ttl', 'retain', 'manual']),
    ttlSeconds: positiveInteger.optional(),
    retainOnFailure: z.boolean().optional(),
    retainSnapshots: z.boolean().optional(),
    secureDelete: z.boolean().optional(),
    archiveBeforeDelete: z.boolean().optional(),
  })
  .superRefine((value, context) => {
    if (value.mode === 'after_ttl' && value.ttlSeconds === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ttlSeconds'],
        message: 'is required when cleanup mode is after_ttl',
      });
    }
  }) satisfies ZodType<WorkspaceCleanupPolicySpec>;

export const workspaceSnapshotPolicySpecSchema = z.object({
  enabled: z.boolean(),
  mode: z.enum(['full', 'incremental', 'manifest_only']),
  snapshotBeforeWrite: z.boolean().optional(),
  snapshotAfterExecution: z.boolean().optional(),
  snapshotOnFailure: z.boolean().optional(),
  maxSnapshots: positiveInteger.optional(),
}) satisfies ZodType<WorkspaceSnapshotPolicySpec>;

export const workspaceMutationPolicySpecSchema = z.object({
  requireSnapshotBeforeWrite: z.boolean().optional(),
  trackFileMutations: z.boolean().optional(),
  maxPatchBytes: positiveInteger.optional(),
  allowDelete: z.boolean().optional(),
  requireApprovalForDelete: z.boolean().optional(),
  preserveInputFiles: z.boolean().optional(),
  atomicWrite: z.boolean().optional(),
}) satisfies ZodType<WorkspaceMutationPolicySpec>;

export const workspaceStatusSchema = z.enum([
  'creating',
  'ready',
  'busy',
  'snapshotting',
  'archiving',
  'archived',
  'cleaning',
  'cleaned',
  'failed',
]) satisfies ZodType<WorkspaceStatus>;

export const workspaceUsageSchema = z
  .object({
    bytes: nonNegativeInteger,
    files: nonNegativeInteger,
    directories: nonNegativeInteger.optional(),
    lastCalculatedAt: timestampSchema,
  })
  .strict() satisfies ZodType<WorkspaceUsage>;

export const workspaceRecordSchema = z
  .object({
    id: nonEmptyString,
    revision: nonNegativeInteger,
    tenantId: nonEmptyString.optional(),
    userId: nonEmptyString,
    sessionId: nonEmptyString.optional(),
    runId: nonEmptyString.optional(),
    agentId: nonEmptyString.optional(),
    profileRef: specRefSchema,
    profileRevision: nonEmptyString,
    rootPathRef: nonEmptyString,
    status: workspaceStatusSchema,
    quota: workspaceQuotaSpecSchema,
    usage: workspaceUsageSchema,
    activeExecutionIds: z.array(nonEmptyString),
    latestSnapshotRef: nonEmptyString.optional(),
    createdAt: timestampSchema,
    readyAt: timestampSchema.optional(),
    updatedAt: timestampSchema,
    expiresAt: timestampSchema.optional(),
    cleanedAt: timestampSchema.optional(),
    error: normalizedExecutionErrorSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (new Set(value.activeExecutionIds).size !== value.activeExecutionIds.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activeExecutionIds'],
        message: 'must not contain duplicate execution IDs',
      });
    }
    if (
      ['ready', 'busy', 'snapshotting', 'archiving', 'archived'].includes(value.status) &&
      !value.readyAt
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['readyAt'],
        message: 'is required after a Workspace becomes ready',
      });
    }
    if (value.status === 'busy' && value.activeExecutionIds.length === 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activeExecutionIds'],
        message: 'must contain an execution ID while the Workspace is busy',
      });
    }
    if (value.status === 'cleaned' && !value.cleanedAt) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['cleanedAt'],
        message: 'is required for a cleaned Workspace',
      });
    }
    if (value.status === 'cleaned' && value.activeExecutionIds.length > 0) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['activeExecutionIds'],
        message: 'must be empty for a cleaned Workspace',
      });
    }
    if (value.status === 'failed' && !value.error) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['error'],
        message: 'is required for a failed Workspace',
      });
    }
    addTimestampOrderIssue(value.createdAt, value.updatedAt, 'updatedAt', context);
    if (value.readyAt) addTimestampOrderIssue(value.createdAt, value.readyAt, 'readyAt', context);
    if (value.expiresAt)
      addTimestampOrderIssue(value.createdAt, value.expiresAt, 'expiresAt', context);
    if (value.cleanedAt)
      addTimestampOrderIssue(value.createdAt, value.cleanedAt, 'cleanedAt', context);
  }) satisfies ZodType<WorkspaceRecord>;

export const workspaceEventPayloadSchema = z
  .object({
    operationId: nonEmptyString.optional(),
    workspaceId: nonEmptyString,
    profileRef: specRefSchema.optional(),
    status: workspaceStatusSchema.optional(),
    sourceTreeHash: nonEmptyString.optional(),
    workspaceSnapshotHash: nonEmptyString.optional(),
    snapshotManifestHash: nonEmptyString.optional(),
    artifactRefs: z.array(nonEmptyString).optional(),
    bytes: nonNegativeInteger.optional(),
    files: nonNegativeInteger.optional(),
    error: normalizedExecutionErrorSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.artifactRefs && new Set(value.artifactRefs).size !== value.artifactRefs.length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['artifactRefs'],
        message: 'must not contain duplicate Artifact references',
      });
    }
    addSensitiveWorkspaceEventFieldIssues(value, context, []);
  }) satisfies ZodType<WorkspaceEventPayload>;

export const workspaceSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    revision: z.string().min(1).optional(),
    rootPolicy: z.enum(['managed', 'provided_ref']),
    rootRef: z.string().min(1).optional(),
    directories: workspaceDirectorySpecSchema,
    pathPolicy: workspacePathPolicySpecSchema,
    quota: workspaceQuotaSpecSchema,
    cleanup: workspaceCleanupPolicySpecSchema,
    snapshot: workspaceSnapshotPolicySpecSchema,
    mutation: workspaceMutationPolicySpecSchema,
    executionEnvironmentRef: specRefSchema.optional(),
    artifactProfileRef: specRefSchema.optional(),
    secretPolicyRef: specRefSchema.optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .superRefine((value, context) => {
    if (value.rootPolicy === 'provided_ref' && !value.rootRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rootRef'],
        message: 'is required when rootPolicy is provided_ref',
      });
    }
    if (value.rootPolicy === 'managed' && value.rootRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['rootRef'],
        message: 'must not be set when rootPolicy is managed',
      });
    }
    const allowed = new Set((value.pathPolicy.allowedExtensions ?? []).map(normalizeExtension));
    const overlap = (value.pathPolicy.deniedExtensions ?? [])
      .map(normalizeExtension)
      .find((extension) => allowed.has(extension));
    if (overlap) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['pathPolicy', 'deniedExtensions'],
        message: `extension ${overlap} cannot be both allowed and denied`,
      });
    }
  }) satisfies ZodType<WorkspaceSpec>;

const relativePathJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  pattern: '^(?![\\\\/])(?![A-Za-z]:[\\\\/])(?!.*(?:^|[\\\\/])\\.\\.(?:[\\\\/]|$)).+$',
  description:
    'Path relative to the managed Workspace root; absolute and traversal paths are invalid.',
};

const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const nonEmptyStringJsonSchema: JsonSchema = { type: 'string', minLength: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
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

export const workspaceQuotaSpecJsonSchema: JsonSchema = {
  type: 'object',
  properties: {
    maxBytes: positiveIntegerJsonSchema,
    maxFiles: positiveIntegerJsonSchema,
    maxSingleFileBytes: positiveIntegerJsonSchema,
    maxDirectoryDepth: positiveIntegerJsonSchema,
    maxOpenFiles: positiveIntegerJsonSchema,
    maxMutationCountPerExecution: positiveIntegerJsonSchema,
  },
  additionalProperties: false,
};

export const workspaceUsageJsonSchema: JsonSchema = {
  type: 'object',
  required: ['bytes', 'files', 'lastCalculatedAt'],
  properties: {
    bytes: nonNegativeIntegerJsonSchema,
    files: nonNegativeIntegerJsonSchema,
    directories: nonNegativeIntegerJsonSchema,
    lastCalculatedAt: timestampJsonSchema,
  },
  additionalProperties: false,
};

export const workspaceRecordJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'revision',
    'userId',
    'profileRef',
    'profileRevision',
    'rootPathRef',
    'status',
    'quota',
    'usage',
    'activeExecutionIds',
    'createdAt',
    'updatedAt',
  ],
  properties: {
    id: nonEmptyStringJsonSchema,
    revision: nonNegativeIntegerJsonSchema,
    tenantId: nonEmptyStringJsonSchema,
    userId: nonEmptyStringJsonSchema,
    sessionId: nonEmptyStringJsonSchema,
    runId: nonEmptyStringJsonSchema,
    agentId: nonEmptyStringJsonSchema,
    profileRef: specRefJsonSchema,
    profileRevision: nonEmptyStringJsonSchema,
    rootPathRef: nonEmptyStringJsonSchema,
    status: { enum: workspaceStatusSchema.options },
    quota: workspaceQuotaSpecJsonSchema,
    usage: workspaceUsageJsonSchema,
    activeExecutionIds: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      uniqueItems: true,
    },
    latestSnapshotRef: nonEmptyStringJsonSchema,
    createdAt: timestampJsonSchema,
    readyAt: timestampJsonSchema,
    updatedAt: timestampJsonSchema,
    expiresAt: timestampJsonSchema,
    cleanedAt: timestampJsonSchema,
    error: normalizedExecutionErrorJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const workspaceEventPayloadJsonSchema: JsonSchema = {
  type: 'object',
  required: ['workspaceId'],
  properties: {
    operationId: nonEmptyStringJsonSchema,
    workspaceId: nonEmptyStringJsonSchema,
    profileRef: specRefJsonSchema,
    status: { enum: workspaceStatusSchema.options },
    sourceTreeHash: nonEmptyStringJsonSchema,
    workspaceSnapshotHash: nonEmptyStringJsonSchema,
    snapshotManifestHash: nonEmptyStringJsonSchema,
    artifactRefs: {
      type: 'array',
      items: nonEmptyStringJsonSchema,
      uniqueItems: true,
    },
    bytes: nonNegativeIntegerJsonSchema,
    files: nonNegativeIntegerJsonSchema,
    error: normalizedExecutionErrorJsonSchema,
    metadata: { type: 'object' },
  },
  additionalProperties: false,
};

export const workspaceSpecJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'id',
    'version',
    'rootPolicy',
    'directories',
    'pathPolicy',
    'quota',
    'cleanup',
    'snapshot',
    'mutation',
  ],
  properties: {
    id: { type: 'string', minLength: 1 },
    version: { type: 'string', minLength: 1 },
    revision: { type: 'string', minLength: 1 },
    name: { type: 'string' },
    description: { type: 'string' },
    owner: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    createdAt: { type: 'string' },
    updatedAt: { type: 'string' },
    rootPolicy: { enum: ['managed', 'provided_ref'] },
    rootRef: { type: 'string', minLength: 1 },
    directories: {
      type: 'object',
      required: ['inputs', 'source', 'working', 'outputs', 'logs', 'temp', 'snapshots'],
      properties: {
        inputs: relativePathJsonSchema,
        source: relativePathJsonSchema,
        working: relativePathJsonSchema,
        outputs: relativePathJsonSchema,
        logs: relativePathJsonSchema,
        temp: relativePathJsonSchema,
        snapshots: relativePathJsonSchema,
        artifacts: relativePathJsonSchema,
        cache: relativePathJsonSchema,
      },
      additionalProperties: false,
    },
    pathPolicy: {
      type: 'object',
      properties: {
        readOnlyPaths: { type: 'array', items: relativePathJsonSchema },
        writablePaths: { type: 'array', items: relativePathJsonSchema },
        executablePaths: { type: 'array', items: relativePathJsonSchema },
        deniedPaths: { type: 'array', items: relativePathJsonSchema },
        allowSymlinks: { type: 'boolean' },
        allowHardLinks: { type: 'boolean' },
        followSymlinksForRead: { type: 'boolean' },
        allowHiddenFiles: { type: 'boolean' },
        maxPathLength: positiveIntegerJsonSchema,
        allowedExtensions: { type: 'array', items: { type: 'string' } },
        deniedExtensions: { type: 'array', items: { type: 'string' } },
        caseSensitivity: { enum: ['platform', 'sensitive', 'insensitive'] },
      },
      additionalProperties: false,
    },
    quota: workspaceQuotaSpecJsonSchema,
    cleanup: {
      type: 'object',
      required: ['mode'],
      properties: {
        mode: { enum: ['on_run_end', 'on_success', 'after_ttl', 'retain', 'manual'] },
        ttlSeconds: positiveIntegerJsonSchema,
        retainOnFailure: { type: 'boolean' },
        retainSnapshots: { type: 'boolean' },
        secureDelete: { type: 'boolean' },
        archiveBeforeDelete: { type: 'boolean' },
      },
      additionalProperties: false,
    },
    snapshot: {
      type: 'object',
      required: ['enabled', 'mode'],
      properties: {
        enabled: { type: 'boolean' },
        mode: { enum: ['full', 'incremental', 'manifest_only'] },
        snapshotBeforeWrite: { type: 'boolean' },
        snapshotAfterExecution: { type: 'boolean' },
        snapshotOnFailure: { type: 'boolean' },
        maxSnapshots: positiveIntegerJsonSchema,
      },
      additionalProperties: false,
    },
    mutation: {
      type: 'object',
      properties: {
        requireSnapshotBeforeWrite: { type: 'boolean' },
        trackFileMutations: { type: 'boolean' },
        maxPatchBytes: positiveIntegerJsonSchema,
        allowDelete: { type: 'boolean' },
        requireApprovalForDelete: { type: 'boolean' },
        preserveInputFiles: { type: 'boolean' },
        atomicWrite: { type: 'boolean' },
      },
      additionalProperties: false,
    },
    executionEnvironmentRef: { type: 'object' },
    artifactProfileRef: { type: 'object' },
    secretPolicyRef: { type: 'object' },
    metadata: { type: 'object' },
  },
  additionalProperties: false,
  allOf: [
    {
      if: {
        properties: { rootPolicy: { const: 'provided_ref' } },
        required: ['rootPolicy'],
      },
      then: { required: ['rootRef'] },
    },
    {
      if: {
        properties: { rootPolicy: { const: 'managed' } },
        required: ['rootPolicy'],
      },
      then: { not: { required: ['rootRef'] } },
    },
    {
      if: {
        properties: {
          cleanup: {
            properties: { mode: { const: 'after_ttl' } },
            required: ['mode'],
          },
        },
        required: ['cleanup'],
      },
      then: {
        properties: {
          cleanup: { required: ['mode', 'ttlSeconds'] },
        },
      },
    },
  ],
};

export const workspaceSpecExample: WorkspaceSpec = {
  id: 'workspace.default',
  version: '0.1.0',
  name: 'Default managed workspace',
  rootPolicy: 'managed',
  directories: {
    inputs: 'inputs',
    source: 'source',
    working: 'working',
    outputs: 'outputs',
    logs: 'logs',
    temp: 'temp',
    snapshots: 'snapshots',
    artifacts: 'artifacts',
    cache: 'cache',
  },
  pathPolicy: {
    readOnlyPaths: ['inputs'],
    writablePaths: ['source', 'working', 'outputs', 'logs', 'temp'],
    executablePaths: ['working/bin'],
    deniedPaths: ['.git'],
    allowSymlinks: false,
    allowHardLinks: false,
    followSymlinksForRead: false,
    allowHiddenFiles: false,
    caseSensitivity: 'platform',
  },
  quota: {
    maxBytes: 512 * 1024 * 1024,
    maxFiles: 10_000,
    maxSingleFileBytes: 64 * 1024 * 1024,
    maxDirectoryDepth: 32,
    maxOpenFiles: 256,
    maxMutationCountPerExecution: 2_000,
  },
  cleanup: {
    mode: 'after_ttl',
    ttlSeconds: 3_600,
    retainOnFailure: true,
    retainSnapshots: true,
  },
  snapshot: {
    enabled: true,
    mode: 'incremental',
    snapshotBeforeWrite: true,
    snapshotOnFailure: true,
    maxSnapshots: 20,
  },
  mutation: {
    requireSnapshotBeforeWrite: true,
    trackFileMutations: true,
    allowDelete: false,
    preserveInputFiles: true,
    atomicWrite: true,
  },
};

export const workspaceRecordExample: WorkspaceRecord = {
  id: 'workspace.example',
  revision: 1,
  userId: 'user.example',
  runId: 'run.example',
  profileRef: { id: workspaceSpecExample.id, version: workspaceSpecExample.version },
  profileRevision: 'sha256:workspace-profile-example',
  rootPathRef: 'workspace-root:workspace.example',
  status: 'ready',
  quota: workspaceSpecExample.quota,
  usage: {
    bytes: 1024,
    files: 4,
    directories: 3,
    lastCalculatedAt: '2026-07-17T00:00:00.000Z',
  },
  activeExecutionIds: [],
  createdAt: '2026-07-17T00:00:00.000Z',
  readyAt: '2026-07-17T00:00:01.000Z',
  updatedAt: '2026-07-17T00:00:01.000Z',
};

export const workspaceEventPayloadExample: WorkspaceEventPayload = {
  operationId: 'operation:workspace-ready',
  workspaceId: workspaceRecordExample.id,
  profileRef: workspaceRecordExample.profileRef,
  status: 'ready',
  sourceTreeHash: 'sha256:source-tree-example',
  artifactRefs: ['artifact:workspace-manifest'],
  bytes: workspaceRecordExample.usage.bytes,
  files: workspaceRecordExample.usage.files,
};

export const workspaceSpecDefinition = defineSpecSchema<WorkspaceSpec>({
  id: 'WorkspaceSpec',
  zod: workspaceSpecSchema,
  jsonSchema: workspaceSpecJsonSchema,
  example: workspaceSpecExample,
});

export const workspaceSpecDefinitions = [workspaceSpecDefinition] as const;
export const workspaceSpecJsonSchemas = exportSpecJsonSchemas(workspaceSpecDefinitions);

export const workspaceRecordJsonSchemas: Record<string, JsonSchema> = {
  WorkspaceRecord: workspaceRecordJsonSchema,
  WorkspaceEventPayload: workspaceEventPayloadJsonSchema,
};

export function validateWorkspaceSpec(input: unknown): WorkspaceSpec {
  return workspaceSpecDefinition.parse(input);
}

export function validateWorkspaceRecord(input: unknown): WorkspaceRecord {
  return workspaceRecordSchema.parse(input);
}

export function validateWorkspaceEventPayload(input: unknown): WorkspaceEventPayload {
  return workspaceEventPayloadSchema.parse(input);
}

function addTimestampOrderIssue(
  earlier: string,
  later: string,
  field: string,
  context: z.RefinementCtx
): void {
  if (Date.parse(later) < Date.parse(earlier)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [field],
      message: `must not be earlier than ${field === 'updatedAt' ? 'createdAt' : 'Workspace creation'}`,
    });
  }
}

const forbiddenWorkspaceEventFieldNames = new Set([
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

function addSensitiveWorkspaceEventFieldIssues(
  value: unknown,
  context: z.RefinementCtx,
  path: Array<string | number>
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      addSensitiveWorkspaceEventFieldIssues(item, context, [...path, index])
    );
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    const normalized = key.replace(/[^A-Za-z0-9]/gu, '').toLowerCase();
    if (forbiddenWorkspaceEventFieldNames.has(normalized)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [...path, key],
        message: 'sensitive or unbounded content fields are forbidden in Workspace events',
      });
      continue;
    }
    addSensitiveWorkspaceEventFieldIssues(child, context, [...path, key]);
  }
}

function isAbsoluteLike(value: string): boolean {
  return value.startsWith('/') || value.startsWith('\\') || /^[a-zA-Z]:[\\/]/u.test(value);
}

function normalizePathForValidation(value: string): string {
  let normalized = value.normalize('NFKC');
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) break;
      normalized = decoded.normalize('NFKC');
    } catch {
      break;
    }
  }
  return normalized;
}

function normalizeExtension(value: string): string {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith('.') ? normalized : `.${normalized}`;
}
