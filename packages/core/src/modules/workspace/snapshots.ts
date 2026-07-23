import { z, type ZodType } from 'zod';
import type {
  WorkspaceDiffRequest,
  WorkspaceDiffResult,
  WorkspaceDiffSummary,
  WorkspacePatchConflict,
  WorkspacePatchRequest,
  WorkspacePatchResult,
  WorkspaceRestoreRequest,
  WorkspaceSnapshotEntry,
  WorkspaceSnapshotManifest,
  WorkspaceSnapshotRequest,
} from '../../contracts/workspace';
import type { JsonSchema } from '../../specs';
import {
  executionPrincipalSchema,
  fileMutationJsonSchema,
  fileMutationSchema,
  principalJsonSchema,
  relativePathJsonSchema,
  workspaceOperationPrincipalExample,
} from './operations';
import { workspaceRelativePathSchema } from './index';

const nonNegativeInteger = z.number().int().nonnegative();

export const workspaceSnapshotRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    type: z.enum(['full', 'incremental', 'manifest_only', 'failure_snapshot']),
    baseSnapshotRef: z.string().min(1).optional(),
    includePaths: z.array(workspaceRelativePathSchema).optional(),
    excludePatterns: z.array(z.string().min(1)).optional(),
    reason: z.string().min(1).optional(),
    idempotencyKey: z.string().min(1).optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.type === 'incremental' && !value.baseSnapshotRef) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['baseSnapshotRef'],
        message: 'is required for incremental snapshots',
      });
    }
  }) satisfies ZodType<WorkspaceSnapshotRequest>;

export const workspaceSnapshotEntrySchema = z
  .object({
    path: workspaceRelativePathSchema,
    kind: z.enum(['file', 'directory', 'symlink']),
    sizeBytes: nonNegativeInteger.optional(),
    contentHash: z.string().min(1).optional(),
    mode: nonNegativeInteger.optional(),
    symlinkTarget: workspaceRelativePathSchema.optional(),
    artifactRef: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.kind === 'symlink' && value.symlinkTarget === undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['symlinkTarget'],
        message: 'is required for symlink entries',
      });
    }
    if (value.kind !== 'symlink' && value.symlinkTarget !== undefined) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['symlinkTarget'],
        message: 'is only valid for symlink entries',
      });
    }
  }) satisfies ZodType<WorkspaceSnapshotEntry>;

export const workspaceSnapshotManifestSchema = z
  .object({
    id: z.string().min(1),
    workspaceId: z.string().min(1),
    baseSnapshotId: z.string().min(1).optional(),
    entries: z.array(workspaceSnapshotEntrySchema),
    ignoredPatterns: z.array(z.string().min(1)).optional(),
    sourceTreeHash: z.string().min(1),
    manifestHash: z.string().min(1),
    totalBytes: nonNegativeInteger,
    fileCount: nonNegativeInteger,
    createdAt: z.string().min(1),
    createdBy: z.string().min(1),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    const paths = new Set<string>();
    for (const [index, entry] of value.entries.entries()) {
      const key = entry.path.normalize('NFKC').replace(/\\/gu, '/');
      if (paths.has(key)) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['entries', index, 'path'],
          message: 'must be unique within a snapshot manifest',
        });
      }
      paths.add(key);
    }
    const actualFileCount = value.entries.filter((entry) => entry.kind === 'file').length;
    if (value.fileCount !== actualFileCount) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fileCount'],
        message: 'must equal the number of file entries',
      });
    }
    const fileEntries = value.entries.filter((entry) => entry.kind === 'file');
    if (fileEntries.every((entry) => entry.sizeBytes !== undefined)) {
      const actualTotalBytes = fileEntries.reduce((sum, entry) => sum + (entry.sizeBytes ?? 0), 0);
      if (actualTotalBytes !== value.totalBytes) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['totalBytes'],
          message: 'must equal the sum of file entry sizes when all sizes are present',
        });
      }
    }
  }) satisfies ZodType<WorkspaceSnapshotManifest>;

export const workspaceRestoreRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    snapshotRef: z.string().min(1),
    expectedWorkspaceSnapshotHash: z.string().min(1).optional(),
    idempotencyKey: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<WorkspaceRestoreRequest>;

export const workspaceDiffRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    fromSnapshotRef: z.string().min(1),
    toSnapshotRef: z.string().min(1).optional(),
    createPatchArtifact: z.boolean().optional(),
  })
  .strict() satisfies ZodType<WorkspaceDiffRequest>;

export const workspaceDiffSummarySchema = z
  .object({
    created: nonNegativeInteger,
    modified: nonNegativeInteger,
    deleted: nonNegativeInteger,
    renamed: nonNegativeInteger,
    permissionChanged: nonNegativeInteger,
    bytesAdded: nonNegativeInteger,
    bytesRemoved: nonNegativeInteger,
  })
  .strict() satisfies ZodType<WorkspaceDiffSummary>;

export const workspaceDiffResultSchema = z
  .object({
    fromSnapshotRef: z.string().min(1),
    toSnapshotRef: z.string().min(1).optional(),
    mutations: z.array(fileMutationSchema),
    patchArtifactRef: z.string().min(1).optional(),
    summary: workspaceDiffSummarySchema,
  })
  .strict() satisfies ZodType<WorkspaceDiffResult>;

export const workspacePatchRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    patchArtifactRef: z.string().min(1),
    expectedBaseSnapshotHash: z.string().min(1).optional(),
    mode: z.enum(['check', 'apply']),
    conflictPolicy: z.enum(['fail', 'three_way', 'mark_conflicts']),
    idempotencyKey: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.mode === 'apply' && !value.expectedBaseSnapshotHash) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expectedBaseSnapshotHash'],
        message: 'is required when applying a patch',
      });
    }
  }) satisfies ZodType<WorkspacePatchRequest>;

export const workspacePatchConflictSchema = z
  .object({
    path: workspaceRelativePathSchema,
    reason: z.string().min(1),
    expectedHash: z.string().min(1).optional(),
    actualHash: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<WorkspacePatchConflict>;

export const workspacePatchResultSchema = z
  .object({
    checked: z.boolean(),
    applied: z.boolean(),
    conflicts: z.array(workspacePatchConflictSchema),
    mutations: z.array(fileMutationSchema),
    resultingWorkspaceSnapshotHash: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    if (value.applied && !value.checked) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['checked'],
        message: 'must be true when a patch was applied',
      });
    }
    if (value.applied && !value.resultingWorkspaceSnapshotHash) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['resultingWorkspaceSnapshotHash'],
        message: 'is required when a patch was applied',
      });
    }
  }) satisfies ZodType<WorkspacePatchResult>;

const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };

const snapshotEntryJsonSchema: JsonSchema = {
  type: 'object',
  required: ['path', 'kind'],
  properties: {
    path: relativePathJsonSchema,
    kind: { enum: ['file', 'directory', 'symlink'] },
    sizeBytes: nonNegativeIntegerJsonSchema,
    contentHash: { type: 'string', minLength: 1 },
    mode: nonNegativeIntegerJsonSchema,
    symlinkTarget: relativePathJsonSchema,
    artifactRef: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
  allOf: [
    {
      if: { properties: { kind: { const: 'symlink' } }, required: ['kind'] },
      then: { required: ['symlinkTarget'] },
      else: { not: { required: ['symlinkTarget'] } },
    },
  ],
};

const diffSummaryJsonSchema: JsonSchema = {
  type: 'object',
  required: [
    'created',
    'modified',
    'deleted',
    'renamed',
    'permissionChanged',
    'bytesAdded',
    'bytesRemoved',
  ],
  properties: {
    created: nonNegativeIntegerJsonSchema,
    modified: nonNegativeIntegerJsonSchema,
    deleted: nonNegativeIntegerJsonSchema,
    renamed: nonNegativeIntegerJsonSchema,
    permissionChanged: nonNegativeIntegerJsonSchema,
    bytesAdded: nonNegativeIntegerJsonSchema,
    bytesRemoved: nonNegativeIntegerJsonSchema,
  },
  additionalProperties: false,
};

const patchConflictJsonSchema: JsonSchema = {
  type: 'object',
  required: ['path', 'reason'],
  properties: {
    path: relativePathJsonSchema,
    reason: { type: 'string', minLength: 1 },
    expectedHash: { type: 'string', minLength: 1 },
    actualHash: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

export const workspaceSnapshotJsonSchemas: Record<string, JsonSchema> = {
  WorkspaceSnapshotRequest: {
    type: 'object',
    required: ['operationId', 'workspaceId', 'principal', 'type'],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      type: { enum: ['full', 'incremental', 'manifest_only', 'failure_snapshot'] },
      baseSnapshotRef: { type: 'string', minLength: 1 },
      includePaths: { type: 'array', items: relativePathJsonSchema },
      excludePatterns: { type: 'array', items: { type: 'string', minLength: 1 } },
      reason: { type: 'string', minLength: 1 },
      idempotencyKey: { type: 'string', minLength: 1 },
      metadata: { type: 'object' },
    },
    allOf: [
      {
        if: { properties: { type: { const: 'incremental' } }, required: ['type'] },
        then: {
          properties: { baseSnapshotRef: {} },
          required: ['baseSnapshotRef'],
        },
      },
    ],
    additionalProperties: false,
  },
  WorkspaceSnapshotEntry: snapshotEntryJsonSchema,
  WorkspaceSnapshotManifest: {
    type: 'object',
    required: [
      'id',
      'workspaceId',
      'entries',
      'sourceTreeHash',
      'manifestHash',
      'totalBytes',
      'fileCount',
      'createdAt',
      'createdBy',
    ],
    properties: {
      id: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      baseSnapshotId: { type: 'string', minLength: 1 },
      entries: { type: 'array', items: snapshotEntryJsonSchema },
      ignoredPatterns: { type: 'array', items: { type: 'string', minLength: 1 } },
      sourceTreeHash: { type: 'string', minLength: 1 },
      manifestHash: { type: 'string', minLength: 1 },
      totalBytes: nonNegativeIntegerJsonSchema,
      fileCount: nonNegativeIntegerJsonSchema,
      createdAt: { type: 'string', minLength: 1 },
      createdBy: { type: 'string', minLength: 1 },
      metadata: { type: 'object' },
    },
    additionalProperties: false,
  },
  WorkspaceRestoreRequest: {
    type: 'object',
    required: ['operationId', 'workspaceId', 'principal', 'snapshotRef'],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      snapshotRef: { type: 'string', minLength: 1 },
      expectedWorkspaceSnapshotHash: { type: 'string', minLength: 1 },
      idempotencyKey: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
  WorkspaceDiffRequest: {
    type: 'object',
    required: ['operationId', 'workspaceId', 'principal', 'fromSnapshotRef'],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      fromSnapshotRef: { type: 'string', minLength: 1 },
      toSnapshotRef: { type: 'string', minLength: 1 },
      createPatchArtifact: { type: 'boolean' },
    },
    additionalProperties: false,
  },
  WorkspaceDiffResult: {
    type: 'object',
    required: ['fromSnapshotRef', 'mutations', 'summary'],
    properties: {
      fromSnapshotRef: { type: 'string', minLength: 1 },
      toSnapshotRef: { type: 'string', minLength: 1 },
      mutations: { type: 'array', items: fileMutationJsonSchema },
      patchArtifactRef: { type: 'string', minLength: 1 },
      summary: diffSummaryJsonSchema,
    },
    additionalProperties: false,
  },
  WorkspaceDiffSummary: diffSummaryJsonSchema,
  WorkspacePatchRequest: {
    type: 'object',
    required: [
      'operationId',
      'workspaceId',
      'principal',
      'patchArtifactRef',
      'mode',
      'conflictPolicy',
    ],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      patchArtifactRef: { type: 'string', minLength: 1 },
      expectedBaseSnapshotHash: { type: 'string', minLength: 1 },
      mode: { enum: ['check', 'apply'] },
      conflictPolicy: { enum: ['fail', 'three_way', 'mark_conflicts'] },
      idempotencyKey: { type: 'string', minLength: 1 },
    },
    allOf: [
      {
        if: { properties: { mode: { const: 'apply' } }, required: ['mode'] },
        then: {
          properties: { expectedBaseSnapshotHash: {} },
          required: ['expectedBaseSnapshotHash'],
        },
      },
    ],
    additionalProperties: false,
  },
  WorkspacePatchConflict: patchConflictJsonSchema,
  WorkspacePatchResult: {
    type: 'object',
    required: ['checked', 'applied', 'conflicts', 'mutations'],
    properties: {
      checked: { type: 'boolean' },
      applied: { type: 'boolean' },
      conflicts: { type: 'array', items: patchConflictJsonSchema },
      mutations: { type: 'array', items: fileMutationJsonSchema },
      resultingWorkspaceSnapshotHash: { type: 'string', minLength: 1 },
    },
    allOf: [
      {
        if: { properties: { applied: { const: true } }, required: ['applied'] },
        then: {
          properties: { checked: { const: true } },
          required: ['resultingWorkspaceSnapshotHash'],
        },
      },
    ],
    additionalProperties: false,
  },
};

export const workspaceSnapshotRequestExample: WorkspaceSnapshotRequest = {
  operationId: 'operation.workspace.snapshot.example',
  workspaceId: 'workspace.example',
  principal: workspaceOperationPrincipalExample,
  type: 'incremental',
  baseSnapshotRef: 'snapshot.base.example',
  includePaths: ['source', 'working'],
  idempotencyKey: 'workspace.snapshot.example',
};

export const workspaceSnapshotManifestExample: WorkspaceSnapshotManifest = {
  id: 'snapshot.example',
  workspaceId: 'workspace.example',
  baseSnapshotId: 'snapshot.base.example',
  entries: [
    { path: 'working', kind: 'directory' },
    {
      path: 'working/output.txt',
      kind: 'file',
      sizeBytes: 14,
      contentHash: 'sha256:output',
      artifactRef: 'artifact:output',
    },
  ],
  sourceTreeHash: 'sha256:source-tree',
  manifestHash: 'sha256:manifest',
  totalBytes: 14,
  fileCount: 1,
  createdAt: '2026-07-17T00:00:03.000Z',
  createdBy: workspaceOperationPrincipalExample.principalId,
};

export const workspaceDiffResultExample: WorkspaceDiffResult = {
  fromSnapshotRef: 'snapshot.base.example',
  toSnapshotRef: workspaceSnapshotManifestExample.id,
  mutations: [
    {
      path: 'working/output.txt',
      operation: 'modified',
      beforeHash: 'sha256:before',
      afterHash: 'sha256:output',
      detectedAt: '2026-07-17T00:00:03.000Z',
    },
  ],
  patchArtifactRef: 'artifact:patch.example',
  summary: {
    created: 0,
    modified: 1,
    deleted: 0,
    renamed: 0,
    permissionChanged: 0,
    bytesAdded: 2,
    bytesRemoved: 0,
  },
};

export const workspacePatchRequestExample: WorkspacePatchRequest = {
  operationId: 'operation.workspace.patch.example',
  workspaceId: 'workspace.example',
  principal: workspaceOperationPrincipalExample,
  patchArtifactRef: 'artifact:patch.example',
  expectedBaseSnapshotHash: 'sha256:base-snapshot',
  mode: 'apply',
  conflictPolicy: 'fail',
  idempotencyKey: 'workspace.patch.example',
};

export const workspacePatchResultExample: WorkspacePatchResult = {
  checked: true,
  applied: true,
  conflicts: [],
  mutations: workspaceDiffResultExample.mutations,
  resultingWorkspaceSnapshotHash: 'sha256:resulting-snapshot',
};

export function validateWorkspaceSnapshotRequest(input: unknown): WorkspaceSnapshotRequest {
  return workspaceSnapshotRequestSchema.parse(input);
}

export function validateWorkspaceSnapshotEntry(input: unknown): WorkspaceSnapshotEntry {
  return workspaceSnapshotEntrySchema.parse(input);
}

export function validateWorkspaceSnapshotManifest(input: unknown): WorkspaceSnapshotManifest {
  return workspaceSnapshotManifestSchema.parse(input);
}

export function validateWorkspaceRestoreRequest(input: unknown): WorkspaceRestoreRequest {
  return workspaceRestoreRequestSchema.parse(input);
}

export function validateWorkspaceDiffRequest(input: unknown): WorkspaceDiffRequest {
  return workspaceDiffRequestSchema.parse(input);
}

export function validateWorkspaceDiffResult(input: unknown): WorkspaceDiffResult {
  return workspaceDiffResultSchema.parse(input);
}

export function validateWorkspaceDiffSummary(input: unknown): WorkspaceDiffSummary {
  return workspaceDiffSummarySchema.parse(input);
}

export function validateWorkspacePatchRequest(input: unknown): WorkspacePatchRequest {
  return workspacePatchRequestSchema.parse(input);
}

export function validateWorkspacePatchConflict(input: unknown): WorkspacePatchConflict {
  return workspacePatchConflictSchema.parse(input);
}

export function validateWorkspacePatchResult(input: unknown): WorkspacePatchResult {
  return workspacePatchResultSchema.parse(input);
}
