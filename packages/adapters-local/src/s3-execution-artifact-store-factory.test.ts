import { ArtifactStoreProviderRegistry } from '@codesoul-co/hypha-core';
import { describe, expect, it, vi } from 'vitest';
import type { S3ArtifactTransport } from './s3-artifact-store-transport';
import { S3_EXECUTION_ARTIFACT_STORE_ID } from './s3-execution-artifact-store';
import { S3ExecutionArtifactStoreFactory } from './s3-execution-artifact-store-factory';

describe('S3ExecutionArtifactStoreFactory', () => {
  it('creates the accepted S3 Store through the Core registry', async () => {
    const transport = fakeTransport();
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(
      new S3ExecutionArtifactStoreFactory({
        bucket: 'hypha-artifacts',
        keyPrefix: 'objects',
        region: 'us-east-1',
        now: () => '2026-07-29T00:00:00.000Z',
        transport,
      })
    );

    expect(registry.list()).toEqual([{ providerId: S3_EXECUTION_ARTIFACT_STORE_ID }]);
    const store = await registry.create(S3_EXECUTION_ARTIFACT_STORE_ID);
    await expect(store.health()).resolves.toEqual({
      status: 'healthy',
      checkedAt: '2026-07-29T00:00:00.000Z',
      details: {
        provider: 's3',
        versioningRequired: true,
        keyPrefix: 'objects',
        encryption: 'none',
        minimumRetentionMs: 0,
        region: 'us-east-1',
      },
    });
    await expect(store.capabilities()).resolves.toEqual({
      versioning: true,
      rangeRead: true,
      signedAccess: true,
      serverSideCopy: true,
      encryption: false,
      multipartUpload: true,
      contentAddressing: true,
    });
    expect(transport.checkBucket).toHaveBeenCalledWith('hypha-artifacts');

    await store.close?.();
    await store.close?.();
    expect(transport.close).toHaveBeenCalledOnce();
  });

  it('preserves an explicit Store identity through registry creation', async () => {
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(
      new S3ExecutionArtifactStoreFactory({
        providerId: 'artifact-store.s3.custom',
        bucket: 'hypha-artifacts',
        keyPrefix: 'objects',
        transport: fakeTransport(),
      })
    );

    const store = await registry.create('artifact-store.s3.custom');
    expect(store).toMatchObject({ id: 'artifact-store.s3.custom' });
    await store.close?.();
  });

  it('rejects ambiguous S3 transport configuration before registration', () => {
    expect(
      () =>
        new S3ExecutionArtifactStoreFactory({
          bucket: 'hypha-artifacts',
          keyPrefix: 'objects',
          transport: fakeTransport(),
          transportOptions: {
            region: 'us-east-1',
          },
        })
    ).toThrow('cannot configure both transport and transportOptions');
  });
});

function fakeTransport(): S3ArtifactTransport {
  return {
    upload: () => Promise.reject(new Error('not used')),
    head: () => Promise.reject(new Error('not used')),
    get: () => Promise.reject(new Error('not used')),
    delete: () => Promise.reject(new Error('not used')),
    copy: () => Promise.reject(new Error('not used')),
    createDownloadAccess: () => Promise.reject(new Error('not used')),
    checkBucket: vi.fn(() => Promise.resolve()),
    close: vi.fn(),
  };
}
