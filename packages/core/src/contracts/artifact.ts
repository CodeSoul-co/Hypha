import type { ExecutionPrincipal } from './execution';
import type { SpecRef, VersionedSpec } from '../specs';

export type ArtifactKind =
  | 'document'
  | 'code'
  | 'dataset'
  | 'image'
  | 'audio'
  | 'video'
  | 'table'
  | 'report'
  | 'archive'
  | 'patch'
  | 'snapshot'
  | 'test_report'
  | 'build_output'
  | 'log'
  | 'tool_output'
  | 'execution_receipt'
  | 'other';

export type ArtifactStatus =
  | 'creating'
  | 'draft'
  | 'final'
  | 'archived'
  | 'invalidated'
  | 'deletion_pending'
  | 'deleted'
  | 'failed';

export type ArtifactHashAlgorithm = 'sha256' | 'blake3';

export interface ArtifactContentAddressingSpec {
  hashAlgorithm: ArtifactHashAlgorithm;
  verifyOnRead: boolean;
  deduplicate: boolean;
}

export interface ArtifactVersioningPolicySpec {
  strategy: 'append_only' | 'replace_latest';
  retainPreviousVersions: boolean;
  maxVersions?: number;
}

export interface ArtifactAccessPolicySpec {
  defaultVisibility: 'private' | 'session' | 'workspace' | 'tenant' | 'shared';
  allowedPrincipalTypes?: ExecutionPrincipal['type'][];
  requiredReadScopes?: string[];
  requiredWriteScopes?: string[];
  requiredDeleteScopes?: string[];
  signedUrlTtlSeconds?: number;
  allowRangeRead?: boolean;
  allowCrossWorkspaceCopy?: boolean;
}

export interface ArtifactRetentionPolicySpec {
  defaultTtlSeconds?: number;
  archiveAfterSeconds?: number;
  deleteAfterSeconds?: number;
  retainFinal?: boolean;
  retainOnFailure?: boolean;
  legalHoldSupported?: boolean;
  garbageCollectUnreferenced?: boolean;
}

export interface ArtifactValidationPolicySpec {
  verifyMimeType?: boolean;
  verifyExtension?: boolean;
  malwareScanRef?: SpecRef;
  archiveBombProtection?: boolean;
  maxExpandedBytes?: number;
  checksumRequired?: boolean;
  rejectExecutableUploads?: boolean;
}

export interface ArtifactPreviewPolicySpec {
  enabled: boolean;
  maxPreviewBytes?: number;
  allowedMimeTypes?: string[];
}

export interface ArtifactProfileSpec extends VersionedSpec {
  revision?: string;
  name?: string;
  storeRef: SpecRef;
  contentAddressing: ArtifactContentAddressingSpec;
  versioning: ArtifactVersioningPolicySpec;
  access: ArtifactAccessPolicySpec;
  retention: ArtifactRetentionPolicySpec;
  validation?: ArtifactValidationPolicySpec;
  preview?: ArtifactPreviewPolicySpec;
  allowedKinds?: ArtifactKind[];
  allowedMimeTypes?: string[];
  maxArtifactBytes?: number;
  metadata?: Record<string, unknown>;
}

export interface ArtifactStorageRef {
  storeId: string;
  bucketOrNamespace?: string;
  objectKey: string;
  versionId?: string;
  etag?: string;
  region?: string;
  encrypted?: boolean;
}

export interface ArtifactProvenance {
  sourceType:
    | 'user_upload'
    | 'agent_generated'
    | 'tool_generated'
    | 'command_generated'
    | 'derived'
    | 'imported'
    | 'snapshot'
    | 'patch';
  createdBy: string;
  sourceEventId?: string;
  toolInvocationId?: string;
  executionId?: string;
  workflowState?: string;
  sourceArtifactIds?: string[];
  transformation?: string;
  environmentHash?: string;
  commandHash?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactAccessRecord {
  visibility: ArtifactAccessPolicySpec['defaultVisibility'];
  ownerPrincipalId: string;
  workspaceId: string;
  allowedPrincipalIds?: string[];
  allowedRoles?: string[];
}

export interface ArtifactRetentionRecord {
  policyRef?: SpecRef;
  expiresAt?: string;
  archivedAt?: string;
  legalHold?: boolean;
  referencedByCount?: number;
}

export interface ArtifactRecord {
  id: string;
  versionId: string;
  versionNumber: number;
  revision: number;
  tenantId?: string;
  userId: string;
  workspaceId: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  name: string;
  description?: string;
  relativePath?: string;
  kind: ArtifactKind;
  mimeType?: string;
  encoding?: string;
  sizeBytes: number;
  contentHash: string;
  hashAlgorithm: ArtifactHashAlgorithm;
  storageRef: ArtifactStorageRef;
  /** True when this version reused an already committed content-addressed Blob. */
  deduplicated?: boolean;
  logicalArtifactId: string;
  parentVersionId?: string;
  previousVersionId?: string;
  nextVersionId?: string;
  sourceArtifactIds?: string[];
  derivedArtifactIds?: string[];
  provenance: ArtifactProvenance;
  access: ArtifactAccessRecord;
  retention: ArtifactRetentionRecord;
  status: ArtifactStatus;
  immutable?: boolean;
  sensitive?: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  finalizedAt?: string;
  archivedAt?: string;
  expiresAt?: string;
  deletedAt?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactRef {
  artifactId: string;
  versionId?: string;
  contentHash: string;
  kind?: ArtifactKind;
  mimeType?: string;
  sizeBytes?: number;
  accessTokenRef?: string;
}

export interface ArtifactLineageNode {
  artifactId: string;
  versionId: string;
  logicalArtifactId: string;
  contentHash: string;
  kind?: ArtifactKind;
  transformation?: string;
}

export interface ArtifactLineage {
  artifactId: string;
  ancestors: ArtifactLineageNode[];
  descendants: ArtifactLineageNode[];
  versions: ArtifactRecord[];
}
