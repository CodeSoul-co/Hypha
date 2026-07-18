import type {
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionScanRequest,
  ArtifactStorageRef,
  StoredArtifactRecord,
} from '@hypha/core';
import { ArtifactRecordRepositoryError } from '@hypha/core';

export interface ArtifactGarbageCollectionRecordState {
  storageKey: string;
  claimId?: string;
  claimedAt?: string;
  completedAt?: string;
}

export interface ArtifactGarbageCollectionRecordEntry {
  stored: StoredArtifactRecord;
  state: ArtifactGarbageCollectionRecordState;
}

export function artifactStorageKey(ref: ArtifactStorageRef): string {
  return JSON.stringify([ref.storeId, ref.bucketOrNamespace ?? '', ref.objectKey, ref.versionId ?? '']);
}

export function buildArtifactGarbageCollectionCandidates(
  entries: ArtifactGarbageCollectionRecordEntry[],
  request: ArtifactGarbageCollectionScanRequest
): ArtifactGarbageCollectionCandidate[] {
  const groups = new Map<string, ArtifactGarbageCollectionRecordEntry[]>();
  for (const entry of entries) {
    const expectedKey = artifactStorageKey(entry.stored.record.storageRef);
    if (entry.state.storageKey !== expectedKey) {
      throw corruptRepository('Artifact GC state does not match its Artifact storage reference.');
    }
    const group = groups.get(expectedKey) ?? [];
    group.push(entry);
    groups.set(expectedKey, group);
  }

  const candidates: ArtifactGarbageCollectionCandidate[] = [];
  for (const group of groups.values()) {
    if (group.some(({ stored }) => stored.record.status !== 'deleted')) continue;
    if (
      group.some(
        ({ stored }) =>
          stored.record.retention.legalHold ||
          (stored.record.retention.referencedByCount ?? 0) > 0
      )
    ) {
      continue;
    }
    const incomplete = group.filter(({ state }) => !state.completedAt);
    if (!incomplete.length) continue;
    if (
      incomplete.some(
        ({ state }) => state.claimId && (!state.claimedAt || state.claimedAt >= request.staleBefore)
      )
    ) {
      continue;
    }
    const first = group[0]!.stored.record;
    if (
      group.some(
        ({ stored }) =>
          stored.record.contentHash !== first.contentHash || stored.record.sizeBytes !== first.sizeBytes
      )
    ) {
      throw corruptRepository('Shared Artifact storage reference has inconsistent content metadata.');
    }
    candidates.push({
      storageRef: structuredClone(first.storageRef),
      contentHash: first.contentHash,
      sizeBytes: first.sizeBytes,
      versionIds: group.map(({ stored }) => stored.record.versionId).sort(),
      profileRefs: uniqueProfileRefs(group.map(({ stored }) => stored.profileRef)),
    });
  }
  candidates.sort((left, right) => artifactStorageKey(left.storageRef).localeCompare(artifactStorageKey(right.storageRef)));
  return candidates.slice(0, request.limit ?? candidates.length);
}

export function sameCandidateVersions(
  left: ArtifactGarbageCollectionCandidate,
  right: ArtifactGarbageCollectionCandidate
): boolean {
  return (
    artifactStorageKey(left.storageRef) === artifactStorageKey(right.storageRef) &&
    left.versionIds.length === right.versionIds.length &&
    left.versionIds.every((versionId, index) => versionId === right.versionIds[index])
  );
}

function uniqueProfileRefs(refs: StoredArtifactRecord['profileRef'][]): StoredArtifactRecord['profileRef'][] {
  const unique = new Map<string, StoredArtifactRecord['profileRef']>();
  for (const ref of refs) unique.set(JSON.stringify(ref), structuredClone(ref));
  return [...unique.values()];
}

function corruptRepository(message: string): ArtifactRecordRepositoryError {
  return new ArtifactRecordRepositoryError('ARTIFACT_RECORD_REPOSITORY_CORRUPT', message);
}
