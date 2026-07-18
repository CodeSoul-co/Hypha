import type {
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionFailure,
  ArtifactGarbageCollectionRequest,
  ArtifactGarbageCollectionResult,
  ArtifactGarbageCollector,
  ArtifactProfileSpec,
  ArtifactRecordRepository,
  ArtifactStoreProvider,
  DefaultArtifactGarbageCollectorOptions,
  SpecRef,
} from '../..';
import { ArtifactRecordRepositoryError } from '../../contracts/artifact-record-repository';
import {
  ArtifactManagerError,
  artifactManagerError,
  normalizedArtifactErrorCode,
  validateArtifactManagerInput,
} from './manager-error';
import { resolveProfileRef } from './manager-policy';
import { validateArtifactProfileSpec } from './index';

export class DefaultArtifactGarbageCollector implements ArtifactGarbageCollector {
  private readonly profiles: ArtifactProfileSpec[];
  private readonly stores = new Map<string, ArtifactStoreProvider>();
  private readonly repository: ArtifactRecordRepository;
  private readonly idGenerator: () => string;
  private readonly now: () => string;

  constructor(options: DefaultArtifactGarbageCollectorOptions) {
    if (!options.profiles.length) throw new TypeError('At least one Artifact profile is required.');
    if (!options.stores.length) throw new TypeError('At least one Artifact Store is required.');
    if (typeof options.idGenerator !== 'function') throw new TypeError('idGenerator is required.');
    this.profiles = options.profiles.map((profile) =>
      validateArtifactManagerInput(() => validateArtifactProfileSpec(profile))
    );
    for (const store of options.stores) {
      if (this.stores.has(store.id)) throw new TypeError(`Duplicate Artifact Store ${store.id}.`);
      this.stores.set(store.id, store);
    }
    for (const profile of this.profiles) {
      if (!this.stores.has(profile.storeRef.id)) {
        throw new TypeError(
          `Artifact profile ${profile.id} references unregistered Store ${profile.storeRef.id}.`
        );
      }
    }
    this.repository = options.repository;
    this.idGenerator = options.idGenerator;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult> {
    const request = validateRequest(input);
    const startedAt = this.timestamp();
    const staleBefore = new Date(
      Date.parse(startedAt) - (request.claimTtlSeconds ?? 300) * 1000
    ).toISOString();
    const candidates = await this.repositoryCall(() =>
      this.repository.listGarbageCollectionCandidates({
        staleBefore,
        ...(request.limit ? { limit: request.limit } : {}),
      })
    );
    const result: ArtifactGarbageCollectionResult = {
      operationId: request.operationId,
      dryRun: request.dryRun ?? false,
      candidateObjects: candidates.length,
      claimedObjects: 0,
      deletedObjects: 0,
      missingObjects: 0,
      skippedPolicyObjects: 0,
      skippedConcurrentObjects: 0,
      reclaimedBytes: 0,
      failures: [],
      startedAt,
      completedAt: startedAt,
    };

    for (const candidate of candidates) {
      if (!this.allowsGarbageCollection(candidate.profileRefs)) {
        result.skippedPolicyObjects += 1;
        continue;
      }
      if (result.dryRun) continue;
      const claimId = this.nextId();
      const claimed = await this.repositoryCall(() =>
        this.repository.claimGarbageCollection({
          claimId,
          claimedAt: this.timestamp(),
          staleBefore,
          candidate,
        })
      );
      if (!claimed) {
        result.skippedConcurrentObjects += 1;
        continue;
      }
      result.claimedObjects += 1;
      await this.collectCandidate(candidate, claimId, result);
    }
    result.completedAt = this.timestamp();
    return result;
  }

  private async collectCandidate(
    candidate: ArtifactGarbageCollectionCandidate,
    claimId: string,
    result: ArtifactGarbageCollectionResult
  ): Promise<void> {
    const store = this.stores.get(candidate.storageRef.storeId);
    if (!store) {
      await this.releaseClaim(claimId);
      result.failures.push({
        storageRef: candidate.storageRef,
        code: 'ARTIFACT_STORE_UNAVAILABLE',
        message: `Artifact Store ${candidate.storageRef.storeId} is not registered.`,
        retryable: true,
      });
      return;
    }
    try {
      const metadata = await store.head(candidate.storageRef);
      if (!metadata) {
        result.missingObjects += 1;
      } else {
        await store.delete(candidate.storageRef);
        result.deletedObjects += 1;
        result.reclaimedBytes += metadata.sizeBytes;
      }
      await this.repositoryCall(() =>
        this.repository.completeGarbageCollection(claimId, this.timestamp())
      );
    } catch (error) {
      await this.releaseClaim(claimId);
      result.failures.push(gcFailure(candidate, error));
    }
  }

  private allowsGarbageCollection(refs: SpecRef[]): boolean {
    return refs.length > 0 && refs.every((ref) => {
      const profile = resolveProfileRef(this.profiles, ref);
      return profile?.retention.garbageCollectUnreferenced === true;
    });
  }

  private async releaseClaim(claimId: string): Promise<void> {
    await this.repository.releaseGarbageCollection(claimId).catch(() => undefined);
  }

  private async repositoryCall<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof ArtifactManagerError) throw error;
      if (error instanceof ArtifactRecordRepositoryError) {
        throw artifactManagerError(
          error.code === 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE'
            ? 'ARTIFACT_STORE_UNAVAILABLE'
            : 'ARTIFACT_INTERNAL_ERROR',
          error.message,
          error.code === 'ARTIFACT_RECORD_REPOSITORY_UNAVAILABLE',
          { repositoryCode: error.code }
        );
      }
      throw error;
    }
  }

  private nextId(): string {
    const id = this.idGenerator().trim();
    if (!id) throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'idGenerator returned empty.');
    return `artifact-gc.${id}`;
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) {
      throw artifactManagerError('ARTIFACT_INTERNAL_ERROR', 'Artifact GC clock returned invalid time.');
    }
    return value;
  }
}

function validateRequest(
  request: ArtifactGarbageCollectionRequest
): ArtifactGarbageCollectionRequest {
  if (!request.operationId?.trim()) throw new TypeError('operationId is required.');
  if (request.dryRun !== undefined && typeof request.dryRun !== 'boolean') {
    throw new TypeError('dryRun must be a boolean.');
  }
  if (request.limit !== undefined && (!Number.isSafeInteger(request.limit) || request.limit <= 0)) {
    throw new TypeError('limit must be a positive safe integer.');
  }
  if (
    request.claimTtlSeconds !== undefined &&
    (!Number.isSafeInteger(request.claimTtlSeconds) || request.claimTtlSeconds <= 0)
  ) {
    throw new TypeError('claimTtlSeconds must be a positive safe integer.');
  }
  return request;
}

function gcFailure(
  candidate: ArtifactGarbageCollectionCandidate,
  error: unknown
): ArtifactGarbageCollectionFailure {
  const code = normalizedArtifactErrorCode(error) ?? 'ARTIFACT_INTERNAL_ERROR';
  const normalized =
    error && typeof error === 'object'
      ? (error as { normalizedError?: { retryable?: unknown } }).normalizedError
      : undefined;
  return {
    storageRef: candidate.storageRef,
    code,
    message: error instanceof Error ? error.message : String(error),
    retryable: typeof normalized?.retryable === 'boolean' ? normalized.retryable : true,
  };
}
