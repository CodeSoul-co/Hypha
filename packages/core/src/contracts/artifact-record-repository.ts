import type { ArtifactRecord } from './artifact';
import type { ProviderHealth } from './execution';
import type { SpecRef } from '../specs';

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
  health(): Promise<ProviderHealth>;
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
