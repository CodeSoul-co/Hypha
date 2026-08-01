import { describe, expect, it } from 'vitest';
import {
  artifactDownloadAccessRequestExample,
  artifactGetRequestExample,
  artifactPutRequestExample,
  artifactStoreCapabilitiesExample,
  artifactStoreCapabilitiesSchema,
  isArtifactByteSource,
  validateArtifactContent,
  validateArtifactDownloadAccess,
  validateArtifactDownloadAccessRequest,
  validateArtifactGetRequest,
  validateArtifactObjectMetadata,
  validateArtifactPutRequest,
  validateArtifactStorageRef,
  validateArtifactStoreCapabilities,
} from './store';

describe('ArtifactStoreProvider contracts', () => {
  it('validates Store capabilities and streaming request examples', () => {
    expect(artifactStoreCapabilitiesSchema.parse(artifactStoreCapabilitiesExample)).toEqual(
      artifactStoreCapabilitiesExample
    );
    expect(validateArtifactPutRequest(artifactPutRequestExample)).toEqual(
      artifactPutRequestExample
    );
    expect(validateArtifactGetRequest(artifactGetRequestExample)).toEqual(
      artifactGetRequestExample
    );
    expect(validateArtifactDownloadAccessRequest(artifactDownloadAccessRequestExample)).toEqual(
      artifactDownloadAccessRequestExample
    );
  });

  it('accepts byte arrays and async byte streams but rejects unrelated objects', () => {
    async function* stream(): AsyncIterable<Uint8Array> {
      yield new Uint8Array([1, 2, 3]);
    }

    expect(isArtifactByteSource(new Uint8Array([1]))).toBe(true);
    expect(isArtifactByteSource(stream())).toBe(true);
    expect(isArtifactByteSource({ bytes: [1, 2, 3] })).toBe(false);
  });

  it('validates every structured value returned by an Artifact Store', () => {
    async function* stream(): AsyncIterable<Uint8Array> {
      yield new Uint8Array([1]);
    }

    expect(validateArtifactStoreCapabilities(artifactStoreCapabilitiesExample)).toEqual(
      artifactStoreCapabilitiesExample
    );
    expect(
      validateArtifactStorageRef({
        storeId: 'artifact-store.example',
        objectKey: 'objects/example',
      })
    ).toMatchObject({ storeId: 'artifact-store.example' });
    expect(
      validateArtifactObjectMetadata({
        contentHash: `sha256:${'a'.repeat(64)}`,
        sizeBytes: 1,
      })
    ).toMatchObject({ sizeBytes: 1 });
    expect(
      validateArtifactContent({
        stream: stream(),
        contentHash: `sha256:${'a'.repeat(64)}`,
        sizeBytes: 1,
      })
    ).toMatchObject({ sizeBytes: 1 });
    expect(
      validateArtifactDownloadAccess({
        method: 'GET',
        url: 'https://artifacts.example/download',
        expiresAt: '2026-07-30T00:00:00.000Z',
      })
    ).toMatchObject({ method: 'GET' });
  });

  it('rejects malformed structured values returned by an Artifact Store', () => {
    expect(() =>
      validateArtifactStorageRef({ storeId: '', objectKey: 'objects/example' })
    ).toThrow();
    expect(() =>
      validateArtifactObjectMetadata({ contentHash: 'not-a-digest', sizeBytes: 1 })
    ).toThrow();
    expect(() =>
      validateArtifactContent({
        stream: {},
        contentHash: `sha256:${'a'.repeat(64)}`,
        sizeBytes: 1,
      })
    ).toThrow();
    expect(() =>
      validateArtifactDownloadAccess({
        method: 'GET',
        url: 'not-a-url',
        expiresAt: 'not-a-time',
      })
    ).toThrow();
  });

  it.each(['/absolute/key', '../escape', 'blobs/../escape', 'blobs\\escape'])(
    'rejects unsafe provider object key %s',
    (objectKey) => {
      expect(() =>
        validateArtifactPutRequest({ ...artifactPutRequestExample, objectKey })
      ).toThrow();
    }
  );

  it('rejects malformed digests and invalid ranges', () => {
    expect(() =>
      validateArtifactPutRequest({
        ...artifactPutRequestExample,
        expectedContentHash: 'sha256:nope',
      })
    ).toThrow();
    expect(() =>
      validateArtifactGetRequest({
        ...artifactGetRequestExample,
        range: { start: 10, endInclusive: 9 },
      })
    ).toThrow(/endInclusive/u);
  });
});
