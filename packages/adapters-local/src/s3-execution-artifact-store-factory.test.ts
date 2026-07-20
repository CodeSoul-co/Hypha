import { ArtifactStoreProviderRegistry } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import type { S3ArtifactStoreTransport } from './s3-artifact-store-transport';
import { S3ExecutionArtifactStoreFactory } from './s3-execution-artifact-store-factory';

describe('S3ExecutionArtifactStoreFactory', () => {
  it('registers and creates the concrete S3 store through core DI', async () => {
    const close = vi.fn();
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(
      new S3ExecutionArtifactStoreFactory({
        id: 'artifact-store.s3.test',
        bucket: 'hypha-test',
        transport: { close } as unknown as S3ArtifactStoreTransport,
      })
    );

    const store = await registry.create('artifact-store.s3.test');
    await expect(store.capabilities()).resolves.toMatchObject({
      rangeRead: true,
      signedAccess: true,
      multipartUpload: true,
    });
    expect(store.id).toBe('artifact-store.s3.test');
    await store.close?.();
    expect(close).toHaveBeenCalledOnce();
  });

  it('uses the stable S3 store id by default', () => {
    const factory = new S3ExecutionArtifactStoreFactory({
      bucket: 'hypha-test',
      transport: { close: vi.fn() } as unknown as S3ArtifactStoreTransport,
    });

    expect(factory.providerId).toBe('artifact-store.s3.execution');
    expect(factory.create().id).toBe('artifact-store.s3.execution');
  });
});
