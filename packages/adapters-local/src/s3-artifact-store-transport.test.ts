import { Readable } from 'node:stream';
import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { readArtifactStream } from './artifact-content-io';
import {
  MinioS3ArtifactTransport,
  S3ArtifactUploadCleanupError,
  S3ArtifactTransferAbortedError,
  S3ArtifactTransferTimeoutError,
} from './s3-artifact-store-transport';
import {
  HYPHA_CONTENT_HASH_METADATA_KEY,
  HYPHA_USER_METADATA_KEY,
} from './s3-artifact-store-values';

function transportOptions(overrides: Record<string, unknown> = {}) {
  return {
    endpoint: 'http://127.0.0.1:9000',
    allowedEndpointHosts: ['127.0.0.1'],
    allowInsecureHttp: true,
    allowPrivateNetwork: true,
    forcePathStyle: true,
    credentialProvider: () => ({
      accessKeyId: 'test-access-key',
      secretAccessKey: 'test-secret-key',
      sessionToken: 'test-session-token',
    }),
    ...overrides,
  };
}

function client(overrides: Record<string, unknown> = {}) {
  return {
    putObject: vi.fn().mockResolvedValue({
      etag: 'multipart-etag-2',
      versionId: 'version-1',
    }),
    removeIncompleteUpload: vi.fn().mockResolvedValue(undefined),
    bucketExists: vi.fn().mockResolvedValue(true),
    statObject: vi.fn().mockResolvedValue(objectStat()),
    getObject: vi.fn().mockResolvedValue(Readable.from([artifactBytes])),
    getPartialObject: vi.fn().mockResolvedValue(Readable.from([artifactBytes.subarray(1, 3)])),
    ...overrides,
  };
}

const artifactBytes = Buffer.from('artifact');
const artifactContentHash = `sha256:${createHash('sha256').update(artifactBytes).digest('hex')}`;

function objectStat(overrides: Record<string, unknown> = {}) {
  return {
    size: artifactBytes.byteLength,
    etag: 'opaque-multipart-etag-2',
    lastModified: new Date('2026-07-28T00:00:00.000Z'),
    metaData: {
      [HYPHA_CONTENT_HASH_METADATA_KEY]: artifactContentHash,
      [HYPHA_USER_METADATA_KEY]: Buffer.from('{"source":"execution"}').toString('base64'),
      'content-type': 'application/octet-stream',
      'x-amz-server-side-encryption': 'AES256',
    },
    versionId: 'version-1',
    ...overrides,
  };
}

function uploadInput(overrides: Record<string, unknown> = {}) {
  return {
    bucket: 'hypha-artifacts',
    key: 'tenant/run/output.bin',
    body: Readable.from([Buffer.from('artifact')]),
    contentLength: 8,
    contentType: 'application/octet-stream',
    metadata: { 'hypha-content-hash': `sha256:${'a'.repeat(64)}` },
    ifAbsent: true,
    ...overrides,
  };
}

describe('MinioS3ArtifactTransport', () => {
  it('creates a client with the trusted endpoint and fresh credentials for every operation', async () => {
    const firstClient = client();
    const secondClient = client();
    const clientFactory = vi
      .fn()
      .mockReturnValueOnce(firstClient)
      .mockReturnValueOnce(secondClient);
    const credentialProvider = vi
      .fn()
      .mockReturnValueOnce({
        accessKeyId: 'first-access',
        secretAccessKey: 'first-secret',
      })
      .mockReturnValueOnce({
        accessKeyId: 'second-access',
        secretAccessKey: 'second-secret',
      });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory, credentialProvider })
    );

    await transport.upload(uploadInput());
    await transport.checkBucket('hypha-artifacts');

    expect(clientFactory).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        endPoint: '127.0.0.1',
        port: 9000,
        useSSL: false,
        pathStyle: true,
        accessKey: 'first-access',
        secretKey: 'first-secret',
      })
    );
    expect(clientFactory).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        accessKey: 'second-access',
        secretKey: 'second-secret',
      })
    );
    expect(credentialProvider).toHaveBeenCalledTimes(2);
  });

  it('uploads with bounded multipart settings, metadata, and create-only precondition', async () => {
    const minioClient = client();
    const clientFactory = vi.fn(() => minioClient);
    const transport = new MinioS3ArtifactTransport(
      transportOptions({
        clientFactory,
        multipartPartSizeBytes: 5 * 1024 * 1024,
        maximumRetryCount: 2,
      })
    );
    const input = uploadInput();

    await expect(transport.upload(input)).resolves.toEqual({
      etag: 'multipart-etag-2',
      versionId: 'version-1',
    });
    expect(clientFactory).toHaveBeenCalledWith(
      expect.objectContaining({
        partSize: 5 * 1024 * 1024,
        retryOptions: { maximumRetryCount: 2 },
      })
    );
    expect(minioClient.putObject).toHaveBeenCalledWith(
      'hypha-artifacts',
      'tenant/run/output.bin',
      input.body,
      8,
      {
        'hypha-content-hash': `sha256:${'a'.repeat(64)}`,
        'Content-Type': 'application/octet-stream',
        'If-None-Match': '*',
      }
    );
  });

  it('fails before creating a client when cancellation already happened', async () => {
    const clientFactory = vi.fn(() => client());
    const abortController = new AbortController();
    abortController.abort();
    const transport = new MinioS3ArtifactTransport(transportOptions({ clientFactory }));

    await expect(
      transport.upload(uploadInput({ abortSignal: abortController.signal }))
    ).rejects.toBeInstanceOf(S3ArtifactTransferAbortedError);
    expect(clientFactory).not.toHaveBeenCalled();
  });

  it('destroys the body and cleans incomplete multipart state after cancellation', async () => {
    const abortController = new AbortController();
    const minioClient = client({
      putObject: vi.fn(
        async (_bucket: string, _key: string, body: Readable): Promise<never> =>
          await new Promise((_, reject) => {
            body.once('error', reject);
            abortController.abort();
          })
      ),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(
      transport.upload(uploadInput({ abortSignal: abortController.signal }))
    ).rejects.toBeInstanceOf(S3ArtifactTransferAbortedError);
    expect(minioClient.removeIncompleteUpload).toHaveBeenCalledWith(
      'hypha-artifacts',
      'tenant/run/output.bin'
    );
  });

  it('cleans incomplete multipart state after a provider upload failure', async () => {
    const providerError = Object.assign(new Error('provider detail'), {
      code: 'SlowDown',
    });
    const minioClient = client({
      putObject: vi.fn().mockRejectedValue(providerError),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(transport.upload(uploadInput())).rejects.toBe(providerError);
    expect(minioClient.removeIncompleteUpload).toHaveBeenCalledOnce();
  });

  it('times out a stalled upload and cleans incomplete multipart state', async () => {
    const minioClient = client({
      putObject: vi.fn(
        async (_bucket: string, _key: string, body: Readable): Promise<never> =>
          await new Promise((_, reject) => {
            body.once('error', reject);
          })
      ),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({
        clientFactory: () => minioClient,
        requestTimeoutMs: 10,
      })
    );

    await expect(transport.upload(uploadInput())).rejects.toBeInstanceOf(
      S3ArtifactTransferTimeoutError
    );
    expect(minioClient.removeIncompleteUpload).toHaveBeenCalledOnce();
  });

  it('fails closed when multipart cleanup itself fails', async () => {
    const minioClient = client({
      putObject: vi.fn().mockRejectedValue(new Error('upload failed')),
      removeIncompleteUpload: vi.fn().mockRejectedValue(new Error('cleanup failed')),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(transport.upload(uploadInput())).rejects.toBeInstanceOf(
      S3ArtifactUploadCleanupError
    );
  });

  it('treats an already absent incomplete upload as successful cleanup', async () => {
    const missingUpload = Object.assign(new Error('missing'), {
      code: 'NoSuchUpload',
    });
    const providerError = new Error('upload failed');
    const minioClient = client({
      putObject: vi.fn().mockRejectedValue(providerError),
      removeIncompleteUpload: vi.fn().mockRejectedValue(missingUpload),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(transport.upload(uploadInput())).rejects.toBe(providerError);
  });

  it('reports a missing bucket and rejects all work after idempotent close', async () => {
    const minioClient = client({
      bucketExists: vi.fn().mockResolvedValue(false),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(transport.checkBucket('missing-bucket')).rejects.toMatchObject({
      name: 'NoSuchBucket',
    });
    transport.close();
    transport.close();
    await expect(transport.upload(uploadInput())).rejects.toThrow('S3 upload transport is closed.');
  });

  it.each([{ multipartPartSizeBytes: 1024 }, { requestTimeoutMs: 0 }, { maximumRetryCount: -1 }])(
    'rejects invalid bounded transport option %o',
    (option) => {
      expect(() => new MinioS3ArtifactTransport(transportOptions(option))).toThrow(TypeError);
    }
  );

  it('maps object stat values and returns null only for missing objects', async () => {
    const minioClient = client();
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(
      transport.head({
        bucket: 'hypha-artifacts',
        key: 'tenant/run/output.bin',
        versionId: 'version-1',
      })
    ).resolves.toEqual({
      sizeBytes: artifactBytes.byteLength,
      etag: 'opaque-multipart-etag-2',
      versionId: 'version-1',
      lastModifiedAt: '2026-07-28T00:00:00.000Z',
      mimeType: 'application/octet-stream',
      encrypted: true,
      metadata: objectStat().metaData,
    });
    expect(minioClient.statObject).toHaveBeenCalledWith(
      'hypha-artifacts',
      'tenant/run/output.bin',
      { versionId: 'version-1' }
    );

    minioClient.statObject.mockRejectedValueOnce(
      Object.assign(new Error('provider detail'), { code: 'NoSuchKey' })
    );
    await expect(
      transport.head({ bucket: 'hypha-artifacts', key: 'missing.bin' })
    ).resolves.toBeNull();
    minioClient.statObject.mockRejectedValueOnce(
      Object.assign(new Error('provider detail'), { code: 'AccessDenied' })
    );
    await expect(
      transport.head({ bucket: 'hypha-artifacts', key: 'denied.bin' })
    ).rejects.toMatchObject({ code: 'AccessDenied' });
  });

  it('downloads a pinned full object and verifies size, hash, and final identity', async () => {
    const minioClient = client();
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    const result = await transport.get({
      bucket: 'hypha-artifacts',
      key: 'tenant/run/output.bin',
      versionId: 'version-1',
      expectedEtag: '"opaque-multipart-etag-2"',
      expectedContentHash: artifactContentHash,
    });

    await expect(readArtifactStream(result.stream)).resolves.toEqual(
      Uint8Array.from(artifactBytes)
    );
    expect(result.range).toBeUndefined();
    expect(result.state.versionId).toBe('version-1');
    expect(minioClient.getObject).toHaveBeenCalledWith('hypha-artifacts', 'tenant/run/output.bin', {
      versionId: 'version-1',
    });
    expect(minioClient.statObject).toHaveBeenCalledTimes(2);
  });

  it('downloads a bounded range and verifies the object identity after streaming', async () => {
    const minioClient = client();
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    const result = await transport.get({
      bucket: 'hypha-artifacts',
      key: 'tenant/run/output.bin',
      range: { start: 1, endInclusive: 2 },
    });

    await expect(readArtifactStream(result.stream)).resolves.toEqual(
      Uint8Array.from(artifactBytes.subarray(1, 3))
    );
    expect(result.range).toEqual({ start: 1, endInclusive: 2 });
    expect(minioClient.getPartialObject).toHaveBeenCalledWith(
      'hypha-artifacts',
      'tenant/run/output.bin',
      1,
      2,
      undefined
    );
    expect(minioClient.statObject).toHaveBeenCalledTimes(2);
  });

  it('rejects expected hash and ETag mismatches before downloading bytes', async () => {
    const minioClient = client();
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(
      transport.get({
        bucket: 'hypha-artifacts',
        key: 'tenant/run/output.bin',
        expectedContentHash: `sha256:${'0'.repeat(64)}`,
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_HASH_MISMATCH' },
    });
    await expect(
      transport.get({
        bucket: 'hypha-artifacts',
        key: 'tenant/run/output.bin',
        expectedEtag: 'different-etag',
      })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT' },
    });
    expect(minioClient.getObject).not.toHaveBeenCalled();
  });

  it('fails closed when the object identity changes during a ranged download', async () => {
    const minioClient = client({
      statObject: vi
        .fn()
        .mockResolvedValueOnce(objectStat())
        .mockResolvedValueOnce(objectStat({ etag: 'replacement-etag' })),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );
    const result = await transport.get({
      bucket: 'hypha-artifacts',
      key: 'tenant/run/output.bin',
      range: { start: 1, endInclusive: 2 },
    });

    await expect(readArtifactStream(result.stream)).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VERSION_CONFLICT', retryable: true },
    });
  });

  it('destroys an active download when cancellation is requested', async () => {
    const abortController = new AbortController();
    const stalled = new Readable({ read: () => undefined });
    const minioClient = client({
      getObject: vi.fn().mockResolvedValue(stalled),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );
    const result = await transport.get({
      bucket: 'hypha-artifacts',
      key: 'tenant/run/output.bin',
      abortSignal: abortController.signal,
    });

    const read = readArtifactStream(result.stream);
    abortController.abort();

    await expect(read).rejects.toBeInstanceOf(S3ArtifactTransferAbortedError);
    expect(stalled.destroyed).toBe(true);
  });

  it('times out and destroys a stalled download', async () => {
    const stalled = new Readable({ read: () => undefined });
    const minioClient = client({
      getObject: vi.fn().mockResolvedValue(stalled),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({
        clientFactory: () => minioClient,
        requestTimeoutMs: 10,
      })
    );
    const result = await transport.get({
      bucket: 'hypha-artifacts',
      key: 'tenant/run/output.bin',
    });

    await expect(readArtifactStream(result.stream)).rejects.toBeInstanceOf(
      S3ArtifactTransferTimeoutError
    );
    expect(stalled.destroyed).toBe(true);
  });

  it('rejects invalid provider metadata instead of casting it into trusted state', async () => {
    const minioClient = client({
      statObject: vi.fn().mockResolvedValue(objectStat({ metaData: { unsafe: 1 } })),
    });
    const transport = new MinioS3ArtifactTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(
      transport.head({ bucket: 'hypha-artifacts', key: 'tenant/run/output.bin' })
    ).rejects.toMatchObject({
      normalizedError: { code: 'ARTIFACT_VALIDATION_FAILED' },
    });
  });
});
