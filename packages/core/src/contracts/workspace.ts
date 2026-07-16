import type { SpecMetadata, SpecRef, VersionedSpec } from '../specs';
import type { NormalizedExecutionError } from './execution';

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
