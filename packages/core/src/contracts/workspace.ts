import type { SpecMetadata, SpecRef, VersionedSpec } from '../specs';
import type { ExecutionPrincipal, NormalizedExecutionError } from './execution';

export interface WorkspaceDirectorySpec {
  inputs: string;
  source: string;
  working: string;
  outputs: string;
  logs: string;
  temp: string;
  snapshots: string;
  artifacts?: string;
  cache?: string;
}

export interface WorkspacePathPolicySpec {
  readOnlyPaths?: string[];
  writablePaths?: string[];
  executablePaths?: string[];
  deniedPaths?: string[];
  allowSymlinks?: boolean;
  allowHardLinks?: boolean;
  followSymlinksForRead?: boolean;
  allowHiddenFiles?: boolean;
  maxPathLength?: number;
  allowedExtensions?: string[];
  deniedExtensions?: string[];
  caseSensitivity?: 'platform' | 'sensitive' | 'insensitive';
}

export interface WorkspaceQuotaSpec {
  maxBytes?: number;
  maxFiles?: number;
  maxSingleFileBytes?: number;
  maxDirectoryDepth?: number;
  maxOpenFiles?: number;
  maxMutationCountPerExecution?: number;
}

export interface WorkspaceCleanupPolicySpec {
  mode: 'on_run_end' | 'on_success' | 'after_ttl' | 'retain' | 'manual';
  ttlSeconds?: number;
  retainOnFailure?: boolean;
  retainSnapshots?: boolean;
  secureDelete?: boolean;
  archiveBeforeDelete?: boolean;
}

export interface WorkspaceSnapshotPolicySpec {
  enabled: boolean;
  mode: 'full' | 'incremental' | 'manifest_only';
  snapshotBeforeWrite?: boolean;
  snapshotAfterExecution?: boolean;
  snapshotOnFailure?: boolean;
  maxSnapshots?: number;
}

export interface WorkspaceMutationPolicySpec {
  requireSnapshotBeforeWrite?: boolean;
  trackFileMutations?: boolean;
  maxPatchBytes?: number;
  allowDelete?: boolean;
  requireApprovalForDelete?: boolean;
  preserveInputFiles?: boolean;
  atomicWrite?: boolean;
}

export interface WorkspaceSpec extends VersionedSpec, SpecMetadata {
  revision?: string;
  rootPolicy: 'managed' | 'provided_ref';
  rootRef?: string;
  directories: WorkspaceDirectorySpec;
  pathPolicy: WorkspacePathPolicySpec;
  quota: WorkspaceQuotaSpec;
  cleanup: WorkspaceCleanupPolicySpec;
  snapshot: WorkspaceSnapshotPolicySpec;
  mutation: WorkspaceMutationPolicySpec;
  executionEnvironmentRef?: SpecRef;
  artifactProfileRef?: SpecRef;
  secretPolicyRef?: SpecRef;
  metadata?: Record<string, unknown>;
}

export type WorkspaceStatus =
  | 'creating'
  | 'ready'
  | 'busy'
  | 'snapshotting'
  | 'archiving'
  | 'archived'
  | 'cleaning'
  | 'cleaned'
  | 'failed';

export interface WorkspaceUsage {
  bytes: number;
  files: number;
  directories?: number;
  lastCalculatedAt: string;
}

export interface WorkspaceRecord {
  id: string;
  revision: number;
  tenantId?: string;
  userId: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  profileRef: SpecRef;
  profileRevision: string;
  rootPathRef: string;
  status: WorkspaceStatus;
  quota: WorkspaceQuotaSpec;
  usage: WorkspaceUsage;
  activeExecutionIds: string[];
  latestSnapshotRef?: string;
  createdAt: string;
  readyAt?: string;
  updatedAt: string;
  expiresAt?: string;
  cleanedAt?: string;
  error?: NormalizedExecutionError;
  metadata?: Record<string, unknown>;
}

export interface WorkspaceEventPayload {
  operationId?: string;
  workspaceId: string;
  profileRef?: SpecRef;
  status?: WorkspaceStatus;
  sourceTreeHash?: string;
  workspaceSnapshotHash?: string;
  snapshotManifestHash?: string;
  artifactRefs?: string[];
  bytes?: number;
  files?: number;
  error?: NormalizedExecutionError;
  metadata?: Record<string, unknown>;
}

export type WorkspacePathOperation = 'read' | 'write' | 'execute' | 'delete' | 'list';
export type WorkspaceEntryKind = 'file' | 'directory' | 'symlink' | 'other';
export type WorkspacePermission = 'read' | 'write' | 'execute' | 'delete';

export interface WorkspacePathRequest {
  workspaceId: string;
  principal: ExecutionPrincipal;
  relativePath: string;
  operation: WorkspacePathOperation;
  allowMissing?: boolean;
}

export interface ResolvedWorkspacePath {
  workspaceId: string;
  relativePath: string;
  canonicalRelativePath: string;
  pathRef: string;
  exists: boolean;
  kind?: WorkspaceEntryKind;
  permissions: WorkspacePermission[];
  contentHash?: string;
}

export interface WorkspaceListRequest {
  workspaceId: string;
  principal: ExecutionPrincipal;
  relativePath?: string;
  recursive?: boolean;
  includeHidden?: boolean;
  maxEntries?: number;
  cursor?: string;
}

export interface WorkspaceFileEntry {
  relativePath: string;
  kind: WorkspaceEntryKind;
  sizeBytes?: number;
  contentHash?: string;
  modifiedAt?: string;
  permissions?: WorkspacePermission[];
}

export interface WorkspaceReadRequest {
  workspaceId: string;
  principal: ExecutionPrincipal;
  relativePath: string;
  encoding?: 'utf8' | 'base64';
  offset?: number;
  length?: number;
  maxBytes?: number;
}

export interface WorkspaceReadResult {
  relativePath: string;
  encoding: 'utf8' | 'base64';
  content: string;
  contentHash: string;
  sizeBytes: number;
  truncated?: boolean;
  nextOffset?: number;
}

export interface WorkspaceWriteRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  relativePath: string;
  content?: string | Uint8Array;
  artifactRef?: string;
  mode: 'create' | 'overwrite' | 'append' | 'atomic_replace';
  expectedContentHash?: string;
  createParents?: boolean;
  idempotencyKey?: string;
}

export interface FileMutation {
  path: string;
  operation: 'created' | 'modified' | 'deleted' | 'renamed' | 'permission_changed';
  beforeHash?: string;
  afterHash?: string;
  beforeSizeBytes?: number;
  afterSizeBytes?: number;
  artifactRef?: string;
  oldPath?: string;
  detectedAt: string;
}

export interface WorkspaceWriteResult {
  relativePath: string;
  beforeHash?: string;
  afterHash: string;
  sizeBytes: number;
  mutation: FileMutation;
  artifactRef?: string;
}

export interface WorkspaceDeleteRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  relativePath: string;
  recursive?: boolean;
  expectedContentHash?: string;
  idempotencyKey?: string;
}
