import { describe, expect, it } from 'vitest';
import {
  expectContractParity,
  type ContractSchemaPair,
} from '../../../test-support/contract-schema-parity';
import {
  workspaceEventPayloadJsonSchema,
  workspaceEventPayloadSchema,
  workspaceQuotaSpecJsonSchema,
  workspaceQuotaSpecSchema,
  workspaceRecordJsonSchema,
  workspaceRecordSchema,
  workspaceSpecJsonSchema,
  workspaceSpecSchema,
  workspaceUsageJsonSchema,
  workspaceUsageSchema,
} from './index';
import {
  fileMutationSchema,
  resolvedWorkspacePathSchema,
  workspaceDeleteRequestSchema,
  workspaceFileEntrySchema,
  workspaceListRequestSchema,
  workspaceOperationJsonSchemas,
  workspacePathRequestSchema,
  workspaceReadRequestSchema,
  workspaceReadResultSchema,
  workspaceWriteRequestSchema,
  workspaceWriteResultSchema,
} from './operations';
import {
  workspaceDiffRequestSchema,
  workspaceDiffResultSchema,
  workspaceDiffSummarySchema,
  workspacePatchConflictSchema,
  workspacePatchRequestSchema,
  workspacePatchResultSchema,
  workspaceRestoreRequestSchema,
  workspaceSnapshotEntrySchema,
  workspaceSnapshotJsonSchemas,
  workspaceSnapshotManifestSchema,
  workspaceSnapshotRequestSchema,
} from './snapshots';

const contractPairs: ContractSchemaPair[] = [
  { name: 'WorkspaceSpec', zod: workspaceSpecSchema, json: workspaceSpecJsonSchema },
  { name: 'WorkspaceQuotaSpec', zod: workspaceQuotaSpecSchema, json: workspaceQuotaSpecJsonSchema },
  { name: 'WorkspaceUsage', zod: workspaceUsageSchema, json: workspaceUsageJsonSchema },
  { name: 'WorkspaceRecord', zod: workspaceRecordSchema, json: workspaceRecordJsonSchema },
  {
    name: 'WorkspaceEventPayload',
    zod: workspaceEventPayloadSchema,
    json: workspaceEventPayloadJsonSchema,
  },
  {
    name: 'WorkspacePathRequest',
    zod: workspacePathRequestSchema,
    json: workspaceOperationJsonSchemas.WorkspacePathRequest,
  },
  {
    name: 'WorkspaceListRequest',
    zod: workspaceListRequestSchema,
    json: workspaceOperationJsonSchemas.WorkspaceListRequest,
  },
  {
    name: 'WorkspaceReadRequest',
    zod: workspaceReadRequestSchema,
    json: workspaceOperationJsonSchemas.WorkspaceReadRequest,
  },
  {
    name: 'WorkspaceWriteRequest',
    zod: workspaceWriteRequestSchema,
    json: workspaceOperationJsonSchemas.WorkspaceWriteRequest,
  },
  {
    name: 'WorkspaceDeleteRequest',
    zod: workspaceDeleteRequestSchema,
    json: workspaceOperationJsonSchemas.WorkspaceDeleteRequest,
  },
  {
    name: 'ResolvedWorkspacePath',
    zod: resolvedWorkspacePathSchema,
    json: workspaceOperationJsonSchemas.ResolvedWorkspacePath,
  },
  {
    name: 'WorkspaceFileEntry',
    zod: workspaceFileEntrySchema,
    json: workspaceOperationJsonSchemas.WorkspaceFileEntry,
  },
  {
    name: 'WorkspaceReadResult',
    zod: workspaceReadResultSchema,
    json: workspaceOperationJsonSchemas.WorkspaceReadResult,
  },
  {
    name: 'FileMutation',
    zod: fileMutationSchema,
    json: workspaceOperationJsonSchemas.FileMutation,
  },
  {
    name: 'WorkspaceWriteResult',
    zod: workspaceWriteResultSchema,
    json: workspaceOperationJsonSchemas.WorkspaceWriteResult,
  },
  {
    name: 'WorkspaceSnapshotRequest',
    zod: workspaceSnapshotRequestSchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceSnapshotRequest,
  },
  {
    name: 'WorkspaceSnapshotEntry',
    zod: workspaceSnapshotEntrySchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceSnapshotEntry,
  },
  {
    name: 'WorkspaceSnapshotManifest',
    zod: workspaceSnapshotManifestSchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceSnapshotManifest,
  },
  {
    name: 'WorkspaceRestoreRequest',
    zod: workspaceRestoreRequestSchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceRestoreRequest,
  },
  {
    name: 'WorkspaceDiffRequest',
    zod: workspaceDiffRequestSchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceDiffRequest,
  },
  {
    name: 'WorkspaceDiffResult',
    zod: workspaceDiffResultSchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceDiffResult,
  },
  {
    name: 'WorkspaceDiffSummary',
    zod: workspaceDiffSummarySchema,
    json: workspaceSnapshotJsonSchemas.WorkspaceDiffSummary,
  },
  {
    name: 'WorkspacePatchRequest',
    zod: workspacePatchRequestSchema,
    json: workspaceSnapshotJsonSchemas.WorkspacePatchRequest,
  },
  {
    name: 'WorkspacePatchConflict',
    zod: workspacePatchConflictSchema,
    json: workspaceSnapshotJsonSchemas.WorkspacePatchConflict,
  },
  {
    name: 'WorkspacePatchResult',
    zod: workspacePatchResultSchema,
    json: workspaceSnapshotJsonSchemas.WorkspacePatchResult,
  },
];

describe('Workspace Zod and JSON Schema parity', () => {
  it.each(contractPairs)('keeps $name properties and required fields aligned', (pair) => {
    expectContractParity(pair);
  });
});
