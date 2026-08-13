import type { WorkspaceSnapshotManifest } from '@hypha/core';
import { hashArtifactBytes } from './artifact-content-io';

export function encodeWorkspaceSnapshotManifest(manifest: WorkspaceSnapshotManifest): Uint8Array {
  return new TextEncoder().encode(stableJson(manifest));
}

export function hashWorkspaceSnapshotManifest(
  manifest: Omit<WorkspaceSnapshotManifest, 'manifestHash'>
): string {
  return hashArtifactBytes(new TextEncoder().encode(stableJson(manifest)));
}

export function verifyWorkspaceSnapshotManifestHash(manifest: WorkspaceSnapshotManifest): boolean {
  const { manifestHash, ...content } = manifest;
  return manifestHash === hashWorkspaceSnapshotManifest(content);
}

function stableJson(value: unknown): string {
  return JSON.stringify(sortJsonValue(value));
}

function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJsonValue);
  if (value === null || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, sortJsonValue(child)])
  );
}
