import type { ArtifactRecord } from './artifact';
import type { ProviderHealth } from './execution';
import type { SpecRef } from '../specs';
import type {
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionClaimRequest,
  ArtifactGarbageCollectionScanRequest,
} from './artifact-gc';

export interface StoredArtifactRecord {
  record: ArtifactRecord;
  profileRef: SpecRef;
}

export interface ArtifactRevisionFence {
  artifactId: string;
  versionId: string;
  revision: number;
}

export interface ArtifactIdempotencyRecord {
  operationId: string;
  idempotencyKey: string;
  artifactId: string;
  versionId: string;
}

export interface ArtifactRecordCommitRequest {
  records: StoredArtifactRecord[];
  expectedLatest?: ArtifactRevisionFence;
  idempotency?: ArtifactIdempotencyRecord;
}

/**
 * Metadata persistence port for ArtifactManager. Implementations persist records,
 * version/lineage links, and idempotency results, but never Artifact content bytes.
 */
export interface ArtifactRecordRepository {
  get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null>;
  getByVersionId(versionId: string): Promise<StoredArtifactRecord | null>;
  list(): Promise<StoredArtifactRecord[]>;
  findIdempotency(
    operationId: string,
    idempotencyKey: string
  ): Promise<StoredArtifactRecord | null>;
  commit(request: ArtifactRecordCommitRequest): Promise<void>;
  listGarbageCollectionCandidates(
    request: ArtifactGarbageCollectionScanRequest
  ): Promise<ArtifactGarbageCollectionCandidate[]>;
  claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean>;
  completeGarbageCollection(claimId: string, completedAt: string): Promise<void>;
  releaseGarbageCollection(claimId: string): Promise<void>;
  health(): Promise<ProviderHealth>;
  close?(): Promise<void>;
}

export class ArtifactRecordRepositoryConflictError extends Error {
  constructor(
    message: string,
    readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ArtifactRecordRepositoryConflictError';
  }
}

export class ArtifactRecordRepositoryError extends Error {
  constructor(
    readonly code: 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE' | 'ARTIFACT_RECORD_REPOSITORY_CORRUPT',
    message: string,
    readonly cause?: unknown
  ) {
    super(message);
    this.name = 'ArtifactRecordRepositoryError';
  }
}
