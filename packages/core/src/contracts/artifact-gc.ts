import type { ArtifactProfileSpec, ArtifactStorageRef } from './artifact';
import type { ArtifactRecordRepository } from './artifact-record-repository';
import type { ArtifactStoreProvider } from './artifact-store';
import type { SpecRef } from '../specs';

export interface ArtifactGarbageCollectionCandidate {
  storageRef: ArtifactStorageRef;
  contentHash: string;
  sizeBytes: number;
  versionIds: string[];
  profileRefs: SpecRef[];
}

export interface ArtifactGarbageCollectionScanRequest {
  limit?: number;
  staleBefore: string;
}

export interface ArtifactGarbageCollectionClaimRequest {
  claimId: string;
  claimedAt: string;
  staleBefore: string;
  candidate: ArtifactGarbageCollectionCandidate;
}

export interface ArtifactGarbageCollectionFailure {
  storageRef: ArtifactStorageRef;
  code: string;
  message: string;
  retryable: boolean;
}

export interface ArtifactGarbageCollectionRequest {
  operationId: string;
  dryRun?: boolean;
  limit?: number;
  claimTtlSeconds?: number;
}

export interface ArtifactGarbageCollectionResult {
  operationId: string;
  dryRun: boolean;
  candidateObjects: number;
  claimedObjects: number;
  deletedObjects: number;
  missingObjects: number;
  skippedPolicyObjects: number;
  skippedConcurrentObjects: number;
  reclaimedBytes: number;
  failures: ArtifactGarbageCollectionFailure[];
  startedAt: string;
  completedAt: string;
}

export interface ArtifactGarbageCollector {
  collect(request: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}

export interface DefaultArtifactGarbageCollectorOptions {
  profiles: ArtifactProfileSpec[];
  stores: ArtifactStoreProvider[];
  repository: ArtifactRecordRepository;
  idGenerator: () => string;
  now?: () => string;
}
