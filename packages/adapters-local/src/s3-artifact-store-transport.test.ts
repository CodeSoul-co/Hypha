import { Readable } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import {
  MinioS3ArtifactUploadTransport,
  S3ArtifactUploadAbortedError,
  S3ArtifactUploadCleanupError,
  S3ArtifactUploadTimeoutError,
} from './s3-artifact-store-transport';

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

describe('MinioS3ArtifactUploadTransport', () => {
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
    const transport = new MinioS3ArtifactUploadTransport(
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
    const transport = new MinioS3ArtifactUploadTransport(
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
    const transport = new MinioS3ArtifactUploadTransport(transportOptions({ clientFactory }));

    await expect(
      transport.upload(uploadInput({ abortSignal: abortController.signal }))
    ).rejects.toBeInstanceOf(S3ArtifactUploadAbortedError);
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
    const transport = new MinioS3ArtifactUploadTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(
      transport.upload(uploadInput({ abortSignal: abortController.signal }))
    ).rejects.toBeInstanceOf(S3ArtifactUploadAbortedError);
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
    const transport = new MinioS3ArtifactUploadTransport(
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
    const transport = new MinioS3ArtifactUploadTransport(
      transportOptions({
        clientFactory: () => minioClient,
        requestTimeoutMs: 10,
      })
    );

    await expect(transport.upload(uploadInput())).rejects.toBeInstanceOf(
      S3ArtifactUploadTimeoutError
    );
    expect(minioClient.removeIncompleteUpload).toHaveBeenCalledOnce();
  });

  it('fails closed when multipart cleanup itself fails', async () => {
    const minioClient = client({
      putObject: vi.fn().mockRejectedValue(new Error('upload failed')),
      removeIncompleteUpload: vi.fn().mockRejectedValue(new Error('cleanup failed')),
    });
    const transport = new MinioS3ArtifactUploadTransport(
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
    const transport = new MinioS3ArtifactUploadTransport(
      transportOptions({ clientFactory: () => minioClient })
    );

    await expect(transport.upload(uploadInput())).rejects.toBe(providerError);
  });

  it('reports a missing bucket and rejects all work after idempotent close', async () => {
    const minioClient = client({
      bucketExists: vi.fn().mockResolvedValue(false),
    });
    const transport = new MinioS3ArtifactUploadTransport(
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
      expect(() => new MinioS3ArtifactUploadTransport(transportOptions(option))).toThrow(TypeError);
    }
  );
});
