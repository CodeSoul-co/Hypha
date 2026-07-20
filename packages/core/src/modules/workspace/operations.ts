import { z, type ZodType } from 'zod';
import type { ExecutionPrincipal } from '../../contracts/execution';
import type {
  FileMutation,
  ResolvedWorkspacePath,
  WorkspaceDeleteRequest,
  WorkspaceFileEntry,
  WorkspaceListRequest,
  WorkspacePathRequest,
  WorkspaceReadRequest,
  WorkspaceReadResult,
  WorkspaceWriteRequest,
  WorkspaceWriteResult,
} from '../../contracts/workspace';
import type { JsonSchema } from '../../specs';
import { executionPrincipalJsonSchema, executionPrincipalSchema } from '../execution';
import { workspaceRelativePathSchema } from './index';

const positiveInteger = z.number().int().positive();
const nonNegativeInteger = z.number().int().nonnegative();

export { executionPrincipalSchema } from '../execution';

export const workspacePathRequestSchema = z
  .object({
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    relativePath: workspaceRelativePathSchema,
    operation: z.enum(['read', 'write', 'execute', 'delete', 'list']),
    allowMissing: z.boolean().optional(),
  })
  .strict() satisfies ZodType<WorkspacePathRequest>;

export const workspaceListRequestSchema = z
  .object({
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    relativePath: workspaceRelativePathSchema.optional(),
    recursive: z.boolean().optional(),
    includeHidden: z.boolean().optional(),
    maxEntries: positiveInteger.optional(),
    cursor: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<WorkspaceListRequest>;

export const workspaceReadRequestSchema = z
  .object({
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    relativePath: workspaceRelativePathSchema,
    encoding: z.enum(['utf8', 'base64']).optional(),
    offset: nonNegativeInteger.optional(),
    length: positiveInteger.optional(),
    maxBytes: positiveInteger.optional(),
  })
  .strict() satisfies ZodType<WorkspaceReadRequest>;

export const workspaceWriteRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    relativePath: workspaceRelativePathSchema,
    content: z.union([z.string(), z.instanceof(Uint8Array)]).optional(),
    artifactRef: z.string().min(1).optional(),
    mode: z.enum(['create', 'overwrite', 'append', 'atomic_replace']),
    expectedContentHash: z.string().min(1).optional(),
    createParents: z.boolean().optional(),
    idempotencyKey: z.string().min(1).optional(),
  })
  .strict()
  .superRefine((value, context) => {
    const sourceCount =
      Number(value.content !== undefined) + Number(value.artifactRef !== undefined);
    if (sourceCount !== 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['content'],
        message: 'exactly one of content or artifactRef is required',
      });
    }
  }) satisfies ZodType<WorkspaceWriteRequest>;

export const workspaceDeleteRequestSchema = z
  .object({
    operationId: z.string().min(1),
    workspaceId: z.string().min(1),
    principal: executionPrincipalSchema,
    relativePath: workspaceRelativePathSchema,
    recursive: z.boolean().optional(),
    expectedContentHash: z.string().min(1).optional(),
    idempotencyKey: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<WorkspaceDeleteRequest>;

const workspacePermissionSchema = z.enum(['read', 'write', 'execute', 'delete']);
const workspaceEntryKindSchema = z.enum(['file', 'directory', 'symlink', 'other']);

export const resolvedWorkspacePathSchema = z
  .object({
    workspaceId: z.string().min(1),
    relativePath: workspaceRelativePathSchema,
    canonicalRelativePath: workspaceRelativePathSchema,
    pathRef: z.string().min(1),
    exists: z.boolean(),
    kind: workspaceEntryKindSchema.optional(),
    permissions: z.array(workspacePermissionSchema),
    contentHash: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<ResolvedWorkspacePath>;

export const workspaceFileEntrySchema = z
  .object({
    relativePath: workspaceRelativePathSchema,
    kind: workspaceEntryKindSchema,
    sizeBytes: nonNegativeInteger.optional(),
    contentHash: z.string().min(1).optional(),
    modifiedAt: z.string().min(1).optional(),
    permissions: z.array(workspacePermissionSchema).optional(),
  })
  .strict() satisfies ZodType<WorkspaceFileEntry>;

export const workspaceReadResultSchema = z
  .object({
    relativePath: workspaceRelativePathSchema,
    encoding: z.enum(['utf8', 'base64']),
    content: z.string(),
    contentHash: z.string().min(1),
    sizeBytes: nonNegativeInteger,
    truncated: z.boolean().optional(),
    nextOffset: nonNegativeInteger.optional(),
  })
  .strict() satisfies ZodType<WorkspaceReadResult>;

export const fileMutationSchema = z
  .object({
    path: workspaceRelativePathSchema,
    operation: z.enum(['created', 'modified', 'deleted', 'renamed', 'permission_changed']),
    beforeHash: z.string().min(1).optional(),
    afterHash: z.string().min(1).optional(),
    beforeSizeBytes: nonNegativeInteger.optional(),
    afterSizeBytes: nonNegativeInteger.optional(),
    artifactRef: z.string().min(1).optional(),
    oldPath: workspaceRelativePathSchema.optional(),
    detectedAt: z.string().min(1),
  })
  .strict() satisfies ZodType<FileMutation>;

export const workspaceWriteResultSchema = z
  .object({
    relativePath: workspaceRelativePathSchema,
    beforeHash: z.string().min(1).optional(),
    afterHash: z.string().min(1),
    sizeBytes: nonNegativeInteger,
    mutation: fileMutationSchema,
    artifactRef: z.string().min(1).optional(),
  })
  .strict() satisfies ZodType<WorkspaceWriteResult>;

export const relativePathJsonSchema: JsonSchema = {
  type: 'string',
  minLength: 1,
  pattern: '^(?![\\\\/])(?![A-Za-z]:[\\\\/])(?!.*(?:^|[\\\\/])\\.\\.(?:[\\\\/]|$)).+$',
  description:
    'Relative Workspace path. Runtime validation also rejects encoded and Unicode-normalized traversal.',
};

export const principalJsonSchema: JsonSchema = executionPrincipalJsonSchema;

const positiveIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 1 };
const nonNegativeIntegerJsonSchema: JsonSchema = { type: 'integer', minimum: 0 };
const permissionJsonSchema: JsonSchema = { enum: ['read', 'write', 'execute', 'delete'] };
const entryKindJsonSchema: JsonSchema = { enum: ['file', 'directory', 'symlink', 'other'] };

export const fileMutationJsonSchema: JsonSchema = {
  type: 'object',
  required: ['path', 'operation', 'detectedAt'],
  properties: {
    path: relativePathJsonSchema,
    operation: { enum: ['created', 'modified', 'deleted', 'renamed', 'permission_changed'] },
    beforeHash: { type: 'string', minLength: 1 },
    afterHash: { type: 'string', minLength: 1 },
    beforeSizeBytes: nonNegativeIntegerJsonSchema,
    afterSizeBytes: nonNegativeIntegerJsonSchema,
    artifactRef: { type: 'string', minLength: 1 },
    oldPath: relativePathJsonSchema,
    detectedAt: { type: 'string', minLength: 1 },
  },
  additionalProperties: false,
};

export const workspaceOperationJsonSchemas: Record<string, JsonSchema> = {
  WorkspacePathRequest: {
    type: 'object',
    required: ['workspaceId', 'principal', 'relativePath', 'operation'],
    properties: {
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      relativePath: relativePathJsonSchema,
      operation: { enum: ['read', 'write', 'execute', 'delete', 'list'] },
      allowMissing: { type: 'boolean' },
    },
    additionalProperties: false,
  },
  WorkspaceListRequest: {
    type: 'object',
    required: ['workspaceId', 'principal'],
    properties: {
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      relativePath: relativePathJsonSchema,
      recursive: { type: 'boolean' },
      includeHidden: { type: 'boolean' },
      maxEntries: positiveIntegerJsonSchema,
      cursor: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
  WorkspaceReadRequest: {
    type: 'object',
    required: ['workspaceId', 'principal', 'relativePath'],
    properties: {
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      relativePath: relativePathJsonSchema,
      encoding: { enum: ['utf8', 'base64'] },
      offset: nonNegativeIntegerJsonSchema,
      length: positiveIntegerJsonSchema,
      maxBytes: positiveIntegerJsonSchema,
    },
    additionalProperties: false,
  },
  WorkspaceWriteRequest: {
    type: 'object',
    required: ['operationId', 'workspaceId', 'principal', 'relativePath', 'mode'],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      relativePath: relativePathJsonSchema,
      content: {
        description: 'String or Uint8Array for in-process callers.',
      },
      artifactRef: { type: 'string', minLength: 1 },
      mode: { enum: ['create', 'overwrite', 'append', 'atomic_replace'] },
      expectedContentHash: { type: 'string', minLength: 1 },
      createParents: { type: 'boolean' },
      idempotencyKey: { type: 'string', minLength: 1 },
    },
    oneOf: [
      { required: ['content'], not: { required: ['artifactRef'] } },
      { required: ['artifactRef'], not: { required: ['content'] } },
    ],
    additionalProperties: false,
  },
  WorkspaceDeleteRequest: {
    type: 'object',
    required: ['operationId', 'workspaceId', 'principal', 'relativePath'],
    properties: {
      operationId: { type: 'string', minLength: 1 },
      workspaceId: { type: 'string', minLength: 1 },
      principal: principalJsonSchema,
      relativePath: relativePathJsonSchema,
      recursive: { type: 'boolean' },
      expectedContentHash: { type: 'string', minLength: 1 },
      idempotencyKey: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
  ResolvedWorkspacePath: {
    type: 'object',
    required: [
      'workspaceId',
      'relativePath',
      'canonicalRelativePath',
      'pathRef',
      'exists',
      'permissions',
    ],
    properties: {
      workspaceId: { type: 'string', minLength: 1 },
      relativePath: relativePathJsonSchema,
      canonicalRelativePath: relativePathJsonSchema,
      pathRef: { type: 'string', minLength: 1 },
      exists: { type: 'boolean' },
      kind: entryKindJsonSchema,
      permissions: { type: 'array', items: permissionJsonSchema },
      contentHash: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
  WorkspaceFileEntry: {
    type: 'object',
    required: ['relativePath', 'kind'],
    properties: {
      relativePath: relativePathJsonSchema,
      kind: entryKindJsonSchema,
      sizeBytes: nonNegativeIntegerJsonSchema,
      contentHash: { type: 'string', minLength: 1 },
      modifiedAt: { type: 'string', minLength: 1 },
      permissions: { type: 'array', items: permissionJsonSchema },
    },
    additionalProperties: false,
  },
  WorkspaceReadResult: {
    type: 'object',
    required: ['relativePath', 'encoding', 'content', 'contentHash', 'sizeBytes'],
    properties: {
      relativePath: relativePathJsonSchema,
      encoding: { enum: ['utf8', 'base64'] },
      content: { type: 'string' },
      contentHash: { type: 'string', minLength: 1 },
      sizeBytes: nonNegativeIntegerJsonSchema,
      truncated: { type: 'boolean' },
      nextOffset: nonNegativeIntegerJsonSchema,
    },
    additionalProperties: false,
  },
  FileMutation: fileMutationJsonSchema,
  WorkspaceWriteResult: {
    type: 'object',
    required: ['relativePath', 'afterHash', 'sizeBytes', 'mutation'],
    properties: {
      relativePath: relativePathJsonSchema,
      beforeHash: { type: 'string', minLength: 1 },
      afterHash: { type: 'string', minLength: 1 },
      sizeBytes: nonNegativeIntegerJsonSchema,
      mutation: fileMutationJsonSchema,
      artifactRef: { type: 'string', minLength: 1 },
    },
    additionalProperties: false,
  },
};

export const workspaceOperationPrincipalExample: ExecutionPrincipal = {
  principalId: 'agent:workspace.example',
  type: 'agent',
  agentId: 'agent:workspace.example',
  permissionScopes: ['workspace:read', 'workspace:write'],
};

export const workspaceWriteRequestExample: WorkspaceWriteRequest = {
  operationId: 'operation.workspace.write.example',
  workspaceId: 'workspace.example',
  principal: workspaceOperationPrincipalExample,
  relativePath: 'working/output.txt',
  content: 'example output',
  mode: 'atomic_replace',
  expectedContentHash: 'sha256:before',
  createParents: true,
  idempotencyKey: 'workspace.write.example',
};

export const workspaceDeleteRequestExample: WorkspaceDeleteRequest = {
  operationId: 'operation.workspace.delete.example',
  workspaceId: 'workspace.example',
  principal: workspaceOperationPrincipalExample,
  relativePath: 'working/obsolete.txt',
  expectedContentHash: 'sha256:obsolete',
  idempotencyKey: 'workspace.delete.example',
};

export const workspaceWriteResultExample: WorkspaceWriteResult = {
  relativePath: workspaceWriteRequestExample.relativePath,
  beforeHash: workspaceWriteRequestExample.expectedContentHash,
  afterHash: 'sha256:after',
  sizeBytes: 14,
  mutation: {
    path: workspaceWriteRequestExample.relativePath,
    operation: 'modified',
    beforeHash: workspaceWriteRequestExample.expectedContentHash,
    afterHash: 'sha256:after',
    beforeSizeBytes: 12,
    afterSizeBytes: 14,
    detectedAt: '2026-07-17T00:00:02.000Z',
  },
};

export function validateWorkspacePathRequest(input: unknown): WorkspacePathRequest {
  return workspacePathRequestSchema.parse(input);
}

export function validateWorkspaceListRequest(input: unknown): WorkspaceListRequest {
  return workspaceListRequestSchema.parse(input);
}

export function validateWorkspaceReadRequest(input: unknown): WorkspaceReadRequest {
  return workspaceReadRequestSchema.parse(input);
}

export function validateWorkspaceWriteRequest(input: unknown): WorkspaceWriteRequest {
  return workspaceWriteRequestSchema.parse(input);
}

export function validateWorkspaceDeleteRequest(input: unknown): WorkspaceDeleteRequest {
  return workspaceDeleteRequestSchema.parse(input);
}

export function validateResolvedWorkspacePath(input: unknown): ResolvedWorkspacePath {
  return resolvedWorkspacePathSchema.parse(input);
}

export function validateWorkspaceFileEntry(input: unknown): WorkspaceFileEntry {
  return workspaceFileEntrySchema.parse(input);
}

export function validateWorkspaceReadResult(input: unknown): WorkspaceReadResult {
  return workspaceReadResultSchema.parse(input);
}

export function validateFileMutation(input: unknown): FileMutation {
  return fileMutationSchema.parse(input);
}

export function validateWorkspaceWriteResult(input: unknown): WorkspaceWriteResult {
  return workspaceWriteResultSchema.parse(input);
}
