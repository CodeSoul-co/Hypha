import type {
  ArtifactAccessRecord,
  ArtifactKind,
  ArtifactLineage,
  ArtifactProfileSpec,
  ArtifactProvenance,
  ArtifactRecord,
  ArtifactRetentionRecord,
} from './artifact';
import type {
  ArtifactByteRange,
  ArtifactByteSource,
  ArtifactContent,
  ArtifactDownloadAccess,
} from './artifact-store';
import type { ExecutionPrincipal, ProviderHealth } from './execution';
import type { SpecRef } from '../specs';

export interface ArtifactCreateRequest {
  operationId: string;
  principal: ExecutionPrincipal;
  profileRef: SpecRef;
  userId: string;
  tenantId?: string;
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
  content: ArtifactByteSource;
  expectedContentHash?: string;
  expectedSizeBytes?: number;
  logicalArtifactId?: string;
  provenance: ArtifactProvenance;
  access?: ArtifactAccessRecord;
  retention?: ArtifactRetentionRecord;
  sensitive?: boolean;
  tags?: string[];
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactFromWorkspaceRequest {
  operationId: string;
  principal: ExecutionPrincipal;
  profileRef: SpecRef;
  userId: string;
  tenantId?: string;
  workspaceId: string;
  sessionId?: string;
  runId?: string;
  agentId?: string;
  relativePath: string;
  name?: string;
  kind: ArtifactKind;
  mimeType?: string;
  logicalArtifactId?: string;
  provenance: ArtifactProvenance;
  sensitive?: boolean;
  tags?: string[];
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactWorkspaceContentRequest {
  principal: ExecutionPrincipal;
  workspaceId: string;
  relativePath: string;
  maxBytes?: number;
}

export interface ArtifactWorkspaceContent {
  content: ArtifactByteSource;
  contentHash?: string;
  sizeBytes?: number;
  mimeType?: string;
}

/** Governed Workspace port used by ArtifactManager; it never accepts a host path. */
export interface ArtifactWorkspaceContentReader {
  read(request: ArtifactWorkspaceContentRequest): Promise<ArtifactWorkspaceContent>;
}

export interface ArtifactVersionRequest {
  operationId: string;
  principal: ExecutionPrincipal;
  artifactId: string;
  expectedRevision: number;
  content: ArtifactByteSource;
  expectedContentHash?: string;
  expectedSizeBytes?: number;
  provenance: ArtifactProvenance;
  idempotencyKey?: string;
  metadata?: Record<string, unknown>;
}

export interface ArtifactGetRecordRequest {
  principal: ExecutionPrincipal;
  artifactId: string;
  versionId?: string;
}

export interface ArtifactReadRequest extends ArtifactGetRecordRequest {
  range?: ArtifactByteRange;
  expectedContentHash?: string;
}

export interface ArtifactReadResult {
  record: ArtifactRecord;
  content: ArtifactContent;
}

export interface ArtifactCreateDownloadAccessRequest extends ArtifactGetRecordRequest {
  operationId: string;
  expiresInSeconds?: number;
  responseMimeType?: string;
  responseFilename?: string;
}

export interface ArtifactListRequest {
  principal: ExecutionPrincipal;
  workspaceId: string;
  logicalArtifactId?: string;
  kinds?: ArtifactKind[];
  statuses?: ArtifactRecord['status'][];
  tags?: string[];
  includeDeleted?: boolean;
  limit?: number;
}

export interface ArtifactTraceLineageRequest {
  principal: ExecutionPrincipal;
  artifactId: string;
}

export interface ArtifactLatestRequest {
  principal: ExecutionPrincipal;
  logicalArtifactId: string;
}

export interface ArtifactPreviousRequest {
  principal: ExecutionPrincipal;
  versionId: string;
}

export interface ArtifactMutationRequest {
  operationId: string;
  principal: ExecutionPrincipal;
  artifactId: string;
  expectedRevision: number;
  reason?: string;
  idempotencyKey?: string;
}

export type ArtifactFinalizeRequest = ArtifactMutationRequest;
export type ArtifactArchiveRequest = ArtifactMutationRequest;
export type ArtifactInvalidateRequest = ArtifactMutationRequest;
export type ArtifactDeleteRequest = ArtifactMutationRequest;

export interface NormalizedArtifactError {
  code:
    | 'ARTIFACT_INVALID_INPUT'
    | 'ARTIFACT_NOT_FOUND'
    | 'ARTIFACT_PERMISSION_DENIED'
    | 'ARTIFACT_TOO_LARGE'
    | 'ARTIFACT_TYPE_DENIED'
    | 'ARTIFACT_HASH_MISMATCH'
    | 'ARTIFACT_VERSION_CONFLICT'
    | 'ARTIFACT_STORE_UNAVAILABLE'
    | 'ARTIFACT_UPLOAD_FAILED'
    | 'ARTIFACT_DOWNLOAD_FAILED'
    | 'ARTIFACT_DELETE_BLOCKED'
    | 'ARTIFACT_DELETE_PARTIAL'
    | 'ARTIFACT_VALIDATION_FAILED'
    | 'ARTIFACT_INTERNAL_ERROR';
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
  causeRef?: string;
}

export interface ArtifactManager {
  create(request: ArtifactCreateRequest): Promise<ArtifactRecord>;
  createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord>;
  createVersion(request: ArtifactVersionRequest): Promise<ArtifactRecord>;
  get(request: ArtifactGetRecordRequest): Promise<ArtifactRecord | null>;
  read(request: ArtifactReadRequest): Promise<ArtifactReadResult>;
  createDownloadAccess(
    request: ArtifactCreateDownloadAccessRequest
  ): Promise<ArtifactDownloadAccess>;
  list(request: ArtifactListRequest): Promise<ArtifactRecord[]>;
  finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
  archive(request: ArtifactArchiveRequest): Promise<ArtifactRecord>;
  invalidate(request: ArtifactInvalidateRequest): Promise<ArtifactRecord>;
  delete(request: ArtifactDeleteRequest): Promise<void>;
  traceLineage(request: ArtifactTraceLineageRequest): Promise<ArtifactLineage>;
  latest(request: ArtifactLatestRequest): Promise<ArtifactRecord | null>;
  previous(request: ArtifactPreviousRequest): Promise<ArtifactRecord | null>;
  profile(ref: SpecRef): Promise<ArtifactProfileSpec | null>;
  health(): Promise<Record<string, ProviderHealth>>;
}
