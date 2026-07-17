import type { SpecMetadata, SpecRef, VersionedSpec } from '../specs';
import type { EventCreateInput, FrameworkEvent } from '../events';
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
  /** Read permission only. Exact or descendant deny rules always take precedence. */
  readOnlyPaths?: string[];
  /** Write permission only. Exact or descendant deny rules always take precedence. */
  writablePaths?: string[];
  /** Execute permission only. Exact or descendant deny rules always take precedence. */
  executablePaths?: string[];
  /** Final deny boundary; it cannot be widened by any allow list. */
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

type WorkspaceEventPayloadWithRequired<K extends keyof WorkspaceEventPayload> =
  WorkspaceEventPayload & Required<Pick<WorkspaceEventPayload, K>>;

type WorkspaceStatusEventPayload<S extends WorkspaceStatus> =
  WorkspaceEventPayloadWithRequired<'operationId' | 'status'> & { status: S };

type WorkspaceQuotaExceededEventPayload = WorkspaceEventPayloadWithRequired<'operationId'> &
  ({ bytes: number } | { files: number });

export type WorkspaceFrameworkEventType =
  | 'workspace.create.requested'
  | 'workspace.created'
  | 'workspace.ready'
  | 'workspace.busy'
  | 'workspace.path.resolved'
  | 'workspace.path.denied'
  | 'workspace.quota.exceeded'
  | 'workspace.snapshot.requested'
  | 'workspace.snapshot.created'
  | 'workspace.snapshot.failed'
  | 'workspace.restore.requested'
  | 'workspace.restored'
  | 'workspace.restore.failed'
  | 'workspace.patch.checked'
  | 'workspace.patch.applied'
  | 'workspace.patch.conflict'
  | 'workspace.cleanup.started'
  | 'workspace.cleanup.completed'
  | 'workspace.cleanup.failed';

export type WorkspaceEventPayloadMap = {
  'workspace.create.requested': WorkspaceEventPayloadWithRequired<'operationId' | 'profileRef'>;
  'workspace.created': WorkspaceEventPayloadWithRequired<
    'operationId' | 'profileRef' | 'status'
  >;
  'workspace.ready': WorkspaceStatusEventPayload<'ready'>;
  'workspace.busy': WorkspaceStatusEventPayload<'busy'>;
  'workspace.path.resolved': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.path.denied': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
  'workspace.quota.exceeded': WorkspaceQuotaExceededEventPayload;
  'workspace.snapshot.requested': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.snapshot.created': WorkspaceEventPayloadWithRequired<
    'operationId' | 'snapshotManifestHash' | 'artifactRefs'
  >;
  'workspace.snapshot.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
  'workspace.restore.requested': WorkspaceEventPayloadWithRequired<'operationId' | 'artifactRefs'>;
  'workspace.restored': WorkspaceEventPayloadWithRequired<
    'operationId' | 'workspaceSnapshotHash'
  >;
  'workspace.restore.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
  'workspace.patch.checked': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.patch.applied': WorkspaceEventPayloadWithRequired<
    'operationId' | 'workspaceSnapshotHash'
  >;
  'workspace.patch.conflict': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.cleanup.started': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.cleanup.completed': WorkspaceEventPayloadWithRequired<'operationId'>;
  'workspace.cleanup.failed': WorkspaceEventPayloadWithRequired<'operationId' | 'error'>;
};

export type WorkspaceFrameworkEvent<
  TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType,
> = Omit<FrameworkEvent<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
  type: TType;
  workspaceId: string;
};

export type WorkspaceEventCreateInput<
  TType extends WorkspaceFrameworkEventType = WorkspaceFrameworkEventType,
> = Omit<EventCreateInput<WorkspaceEventPayloadMap[TType]>, 'type' | 'workspaceId'> & {
  type: TType;
  workspaceId: string;
};

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

export type WorkspaceSnapshotType = 'full' | 'incremental' | 'manifest_only' | 'failure_snapshot';

export interface WorkspaceSnapshotRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  type: WorkspaceSnapshotType;
  baseSnapshotRef?: string;
  includePaths?: string[];
  excludePatterns?: string[];
  reason?: string;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface WorkspaceSnapshotEntry {
  path: string;
  kind: 'file' | 'directory' | 'symlink';
  sizeBytes?: number;
  contentHash?: string;
  mode?: number;
  /** Required only for symlink entries; always Workspace-relative. */
  symlinkTarget?: string;
  artifactRef?: string;
}

export interface WorkspaceSnapshotManifest {
  id: string;
  workspaceId: string;
  baseSnapshotId?: string;
  entries: WorkspaceSnapshotEntry[];
  ignoredPatterns?: string[];
  sourceTreeHash: string;
  manifestHash: string;
  totalBytes: number;
  fileCount: number;
  createdAt: string;
  createdBy: string;
  metadata?: Record<string, unknown>;
}

export interface WorkspaceRestoreRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  snapshotRef: string;
  expectedWorkspaceSnapshotHash?: string;
  idempotencyKey?: string;
}

export interface WorkspaceDiffRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  fromSnapshotRef: string;
  toSnapshotRef?: string;
  createPatchArtifact?: boolean;
}

export interface WorkspaceDiffSummary {
  created: number;
  modified: number;
  deleted: number;
  renamed: number;
  permissionChanged: number;
  bytesAdded: number;
  bytesRemoved: number;
}

export interface WorkspaceDiffResult {
  fromSnapshotRef: string;
  toSnapshotRef?: string;
  mutations: FileMutation[];
  patchArtifactRef?: string;
  summary: WorkspaceDiffSummary;
}

export interface WorkspacePatchRequest {
  operationId: string;
  workspaceId: string;
  principal: ExecutionPrincipal;
  patchArtifactRef: string;
  expectedBaseSnapshotHash?: string;
  mode: 'check' | 'apply';
  conflictPolicy: 'fail' | 'three_way' | 'mark_conflicts';
  idempotencyKey?: string;
}

export interface WorkspacePatchConflict {
  path: string;
  reason: string;
  expectedHash?: string;
  actualHash?: string;
}

export interface WorkspacePatchResult {
  checked: boolean;
  applied: boolean;
  conflicts: WorkspacePatchConflict[];
  mutations: FileMutation[];
  resultingWorkspaceSnapshotHash?: string;
}
