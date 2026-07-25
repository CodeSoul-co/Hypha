import { describe, expect, it } from 'vitest';
import {
  artifactDownloadAccessRequestExample,
  artifactGetRequestExample,
  artifactPutRequestExample,
  artifactStoreCapabilitiesExample,
  artifactStoreCapabilitiesSchema,
  isArtifactByteSource,
  validateArtifactDownloadAccessRequest,
  validateArtifactGetRequest,
  validateArtifactPutRequest,
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
