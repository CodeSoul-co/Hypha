import type { StoredArtifactRecord } from '@codesoul-co/hypha-core';
import { validateStoredArtifactRecord as validateCoreStoredArtifactRecord } from '@codesoul-co/hypha-core';

export function validateStoredArtifactRecord(stored: StoredArtifactRecord): StoredArtifactRecord {
  return validateCoreStoredArtifactRecord(stored);
}

export function parseStoredArtifactRecord(
  recordJson: string,
  profileRefJson: string
): StoredArtifactRecord {
  return validateStoredArtifactRecord({
    record: JSON.parse(recordJson) as StoredArtifactRecord['record'],
    profileRef: JSON.parse(profileRefJson) as StoredArtifactRecord['profileRef'],
  });
}

export function cloneStoredArtifactRecord(stored: StoredArtifactRecord): StoredArtifactRecord {
  return structuredClone(stored);
}

export function compareStoredArtifactRecords(
  left: StoredArtifactRecord,
  right: StoredArtifactRecord
): number {
  return (
    left.record.createdAt.localeCompare(right.record.createdAt) ||
    left.record.id.localeCompare(right.record.id) ||
    left.record.versionNumber - right.record.versionNumber
  );
}

export function artifactIdempotencyMapKey(operationId: string, idempotencyKey: string): string {
  return `${operationId}\u0000${idempotencyKey}`;
}
