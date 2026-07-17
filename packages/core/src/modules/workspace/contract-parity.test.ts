import { describe, expect, it } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../../specs';
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

interface ContractSchemaPair {
  name: string;
  zod: ZodTypeAny;
  json: JsonSchema;
}

function unwrapObjectSchema(schema: ZodTypeAny): z.ZodObject<ZodRawShape> {
  let current = schema;
  while (current instanceof z.ZodEffects) current = current.innerType();
  if (!(current instanceof z.ZodObject)) {
    throw new TypeError('contract parity requires an object Zod schema');
  }
  return current;
}

function sorted(values: string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

function expectContractParity(pair: ContractSchemaPair): void {
  const shape = unwrapObjectSchema(pair.zod).shape;
  const zodKeys = sorted(Object.keys(shape));
  const jsonKeys = sorted(Object.keys(pair.json.properties ?? {}));
  const zodRequired = sorted(
    Object.entries(shape)
      .filter(([, field]) => !field.isOptional())
      .map(([key]) => key)
  );
  const jsonRequired = sorted(pair.json.required ?? []);

  expect(pair.json.type, pair.name).toBe('object');
  expect(pair.json.additionalProperties, pair.name).toBe(false);
  expect(jsonKeys, `${pair.name} property drift`).toEqual(zodKeys);
  expect(jsonRequired, `${pair.name} required-field drift`).toEqual(zodRequired);
}

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
