import type {
  ArtifactByteSource,
  ArtifactObjectMetadata,
  ArtifactProfileSpec,
  ArtifactStorageRef,
  ArtifactStoreProvider,
} from '../..';
import { artifactManagerError, normalizedArtifactErrorCode } from './manager-error';

export interface PersistArtifactContentRequest {
  operationId: string;
  content: ArtifactByteSource;
  expectedContentHash?: string;
  expectedSizeBytes?: number;
  mimeType?: string;
  profile: ArtifactProfileSpec;
  store: ArtifactStoreProvider;
  nonce: string;
}

export interface PersistedArtifactContent {
  storageRef: ArtifactStorageRef;
  contentHash: string;
  sizeBytes: number;
  mimeType?: string;
}

export async function persistArtifactContent(
  request: PersistArtifactContentRequest
): Promise<PersistedArtifactContent> {
  if (request.profile.contentAddressing.hashAlgorithm !== 'sha256') {
    throw artifactManagerError(
      'ARTIFACT_VALIDATION_FAILED',
      'The configured Artifact Store pipeline currently supports sha256 content addressing only.'
    );
  }
  const stagingKey = `staging/${safeObjectSegment(request.operationId)}/${safeObjectSegment(
    request.nonce
  )}`;
  const stagingRef = await request.store.put({
    operationId: request.operationId,
    objectKey: stagingKey,
    content: request.content,
    expectedContentHash: request.expectedContentHash,
    sizeBytes: request.expectedSizeBytes,
    mimeType: request.mimeType,
    metadata: { 'hypha-operation-id': request.operationId },
    ifAbsent: true,
  });

  try {
    const staged = await requireObjectMetadata(request.store, stagingRef);
    assertProfileSize(request.profile, staged.sizeBytes);
    const digest = staged.contentHash.slice('sha256:'.length);
    const finalKey = request.profile.contentAddressing.deduplicate
      ? `blobs/sha256/${digest}`
      : `objects/sha256/${digest}/${safeObjectSegment(request.nonce)}`;
    const finalRef = await promoteArtifactObject(request, stagingRef, finalKey, staged);
    return {
      storageRef: finalRef,
      contentHash: staged.contentHash,
      sizeBytes: staged.sizeBytes,
      ...(staged.mimeType ? { mimeType: staged.mimeType } : {}),
    };
  } finally {
    await request.store.delete(stagingRef).catch(() => undefined);
  }
}

async function promoteArtifactObject(
  request: PersistArtifactContentRequest,
  stagingRef: ArtifactStorageRef,
  finalKey: string,
  staged: ArtifactObjectMetadata
): Promise<ArtifactStorageRef> {
  const candidate = { ...stagingRef, objectKey: finalKey, versionId: undefined, etag: undefined };
  if (request.profile.contentAddressing.deduplicate) {
    const existing = await request.store.head(candidate);
    if (existing) {
      assertSameContent(existing, staged);
      return metadataRef(candidate, existing);
    }
  }
  try {
    return await request.store.copy({
      operationId: `${request.operationId}:promote`,
      source: stagingRef,
      targetObjectKey: finalKey,
      ifAbsent: true,
    });
  } catch (error) {
    if (
      request.profile.contentAddressing.deduplicate &&
      normalizedArtifactErrorCode(error) === 'ARTIFACT_VERSION_CONFLICT'
    ) {
      const existing = await request.store.head(candidate);
      if (existing) {
        assertSameContent(existing, staged);
        return metadataRef(candidate, existing);
      }
    }
    throw error;
  }
}

async function requireObjectMetadata(
  store: ArtifactStoreProvider,
  ref: ArtifactStorageRef
): Promise<ArtifactObjectMetadata> {
  const metadata = await store.head(ref);
  if (!metadata) {
    throw artifactManagerError(
      'ARTIFACT_UPLOAD_FAILED',
      'Artifact Store did not expose metadata for the uploaded object.',
      true
    );
  }
  return metadata;
}

function assertProfileSize(profile: ArtifactProfileSpec, sizeBytes: number): void {
  if (profile.maxArtifactBytes !== undefined && sizeBytes > profile.maxArtifactBytes) {
    throw artifactManagerError(
      'ARTIFACT_TOO_LARGE',
      `Artifact exceeds profile limit of ${profile.maxArtifactBytes} bytes.`,
      false,
      { maxArtifactBytes: profile.maxArtifactBytes, actualSizeBytes: sizeBytes }
    );
  }
}

function assertSameContent(
  existing: ArtifactObjectMetadata,
  staged: ArtifactObjectMetadata
): void {
  if (existing.contentHash !== staged.contentHash || existing.sizeBytes !== staged.sizeBytes) {
    throw artifactManagerError(
      'ARTIFACT_HASH_MISMATCH',
      'Content-addressed Artifact key resolved to different bytes.',
      false,
      {
        expectedContentHash: staged.contentHash,
        actualContentHash: existing.contentHash,
        expectedSizeBytes: staged.sizeBytes,
        actualSizeBytes: existing.sizeBytes,
      }
    );
  }
}

function metadataRef(
  ref: ArtifactStorageRef,
  metadata: ArtifactObjectMetadata
): ArtifactStorageRef {
  return {
    ...ref,
    ...(metadata.etag ? { etag: metadata.etag } : {}),
  };
}

function safeObjectSegment(value: string): string {
  const safe = value.replace(/[^A-Za-z0-9._-]+/gu, '_').replace(/^\.+|\.+$/gu, '');
  return safe || 'artifact';
}
