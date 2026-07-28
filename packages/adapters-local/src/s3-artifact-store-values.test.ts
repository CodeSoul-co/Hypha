import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { readArtifactStream } from './artifact-content-io';
import {
  HYPHA_CONTENT_HASH_METADATA_KEY,
  HYPHA_USER_METADATA_KEY,
  encodeS3ArtifactMetadata,
  normalizeS3ArtifactRange,
  normalizeS3ArtifactStoreError,
  normalizeS3Etag,
  quoteS3Etag,
  s3ObjectMetadata,
  verifyS3ArtifactStream,
} from './s3-artifact-store-values';

const bytes = Uint8Array.from([1, 2, 3, 4]);
const contentHash = `sha256:${createHash('sha256').update(bytes).digest('hex')}`;

describe('S3 Artifact Store values', () => {
  it('round-trips bounded Hypha metadata without treating ETag as a content hash', () => {
    const metadata = encodeS3ArtifactMetadata(contentHash, { source: 'execution' }, 1024);
    const object = s3ObjectMetadata({
      sizeBytes: bytes.byteLength,
      mimeType: 'application/octet-stream',
      etag: '"opaque-multipart-etag-2"',
      lastModifiedAt: '2026-07-28T00:00:00.000Z',
      metadata,
    });

    expect(object).toEqual({
      contentHash,
      sizeBytes: bytes.byteLength,
      mimeType: 'application/octet-stream',
      etag: 'opaque-multipart-etag-2',
      lastModifiedAt: '2026-07-28T00:00:00.000Z',
      metadata: { source: 'execution' },
    });
    expect(object.etag).not.toBe(contentHash);
  });

  it('rejects oversized, corrupt, and missing object metadata', () => {
    expect(() => encodeS3ArtifactMetadata(contentHash, { value: 'too-large' }, 2)).toThrow(
      'exceeds the 2 byte limit'
    );
    expect(() =>
      s3ObjectMetadata({
        sizeBytes: 1,
        metadata: {
          [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash,
          [HYPHA_USER_METADATA_KEY]: Buffer.from('{"source":1}').toString('base64'),
        },
      })
    ).toThrow('invalid Hypha user metadata');
    expect(() => s3ObjectMetadata({ sizeBytes: 1, metadata: {} })).toThrow(
      'missing valid Hypha content-hash'
    );
    expect(() =>
      s3ObjectMetadata({
        sizeBytes: -1,
        metadata: { [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash },
      })
    ).toThrow('size metadata is invalid');
    expect(() =>
      s3ObjectMetadata({
        sizeBytes: 1,
        metadata: {
          [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash,
          unsafe: 1,
        } as unknown as Record<string, string>,
      })
    ).toThrow('object metadata is invalid');
    expect(() =>
      s3ObjectMetadata({
        sizeBytes: 1,
        lastModifiedAt: 'not-a-timestamp',
        metadata: { [HYPHA_CONTENT_HASH_METADATA_KEY]: contentHash },
      })
    ).toThrow('timestamp metadata is invalid');
  });

  it('normalizes inclusive S3 byte ranges without reading beyond the object', () => {
    expect(normalizeS3ArtifactRange(undefined, 4)).toEqual({ sizeBytes: 4 });
    expect(normalizeS3ArtifactRange({ start: 1, endInclusive: 99 }, 4)).toEqual({
      range: { start: 1, endInclusive: 3 },
      header: 'bytes=1-3',
      sizeBytes: 3,
    });
    expect(() => normalizeS3ArtifactRange({ start: 4 }, 4)).toThrow('starts beyond the end');
    expect(() => normalizeS3ArtifactRange({ start: -1 }, 4)).toThrow('byte range is invalid');
  });

  it('verifies complete downloads by both size and SHA-256', async () => {
    await expect(
      readArtifactStream(verifyS3ArtifactStream(byteStream(bytes), contentHash, 4, true))
    ).resolves.toEqual(bytes);
    await expect(
      readArtifactStream(
        verifyS3ArtifactStream(byteStream(Uint8Array.from([4, 3, 2, 1])), contentHash, 4, true)
      )
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' },
    });
    await expect(
      readArtifactStream(verifyS3ArtifactStream(byteStream(bytes), contentHash, 5, false))
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_DOWNLOAD_FAILED', retryable: true },
    });
  });

  it('normalizes opaque ETags for conditional requests', () => {
    expect(normalizeS3Etag(' W/"opaque-2" ')).toBe('opaque-2');
    expect(quoteS3Etag(' W/"opaque-2" ')).toBe('"opaque-2"');
    expect(normalizeS3Etag(undefined)).toBeUndefined();
  });

  it.each([
    ['NoSuchKey', 404, 'ARTIFACT_NOT_FOUND', false],
    ['AccessDenied', 403, 'ARTIFACT_PERMISSION_DENIED', false],
    ['PreconditionFailed', 412, 'ARTIFACT_VERSION_CONFLICT', false],
    ['InvalidRange', 416, 'ARTIFACT_INVALID_INPUT', false],
    ['ServiceUnavailable', 503, 'ARTIFACT_STORE_UNAVAILABLE', true],
  ])('normalizes %s without leaking provider messages', (name, status, code, retryable) => {
    const secret = 'provider-message-must-not-leak';
    const normalized = normalizeS3ArtifactStoreError(
      Object.assign(new Error(secret), {
        name,
        $metadata: { httpStatusCode: status },
      }),
      'get'
    );

    expect(normalized.normalizedError).toMatchObject({ code, retryable });
    expect(JSON.stringify(normalized.normalizedError)).not.toContain(secret);
  });

  it('bounds untrusted provider error names before adding diagnostics', () => {
    const secret = 'SecretProviderCode';
    const normalized = normalizeS3ArtifactStoreError(
      Object.assign(new Error('hidden'), { name: `${secret}!` }),
      'put'
    );

    expect(normalized.normalizedError).toMatchObject({
      code: 'ARTIFACT_UPLOAD_FAILED',
      details: { providerCode: 'UnknownError' },
    });
    expect(JSON.stringify(normalized.normalizedError)).not.toContain(secret);
  });
});

function byteStream(value: Uint8Array): AsyncIterable<Uint8Array> {
  return (async function* stream(): AsyncIterable<Uint8Array> {
    yield value;
  })();
}
