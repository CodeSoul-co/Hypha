import { describe, expect, it, vi } from 'vitest';
import type {
  ArtifactStoreProvider,
  ArtifactStoreProviderFactory,
} from '../../contracts/artifact-store';
import { ArtifactStoreProviderRegistry } from './store-registry';

describe('ArtifactStoreProviderRegistry', () => {
  it('registers, resolves, and creates an Artifact Store Provider', async () => {
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(factory('artifact-store.s3.execution'));

    expect(registry.list()).toEqual([{ providerId: 'artifact-store.s3.execution' }]);
    expect(registry.resolve('artifact-store.s3.execution').providerId).toBe(
      'artifact-store.s3.execution'
    );
    await expect(registry.create('artifact-store.s3.execution')).resolves.toMatchObject({
      id: 'artifact-store.s3.execution',
    });
  });

  it('rejects duplicate, missing, and invalid registrations', () => {
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(factory('artifact-store.local'));

    expect(() => registry.register(factory('artifact-store.local'))).toThrowError(
      expect.objectContaining({ code: 'artifact.store_registration_conflict' })
    );
    expect(() => registry.resolve('artifact-store.missing')).toThrowError(
      expect.objectContaining({ code: 'artifact.store_not_registered' })
    );
    expect(() => registry.register(factory(' artifact-store.invalid'))).toThrowError(
      expect.objectContaining({ code: 'artifact.store_registration_invalid' })
    );
  });

  it('unregisters a Provider deterministically', () => {
    const registry = new ArtifactStoreProviderRegistry();
    registry.register(factory('artifact-store.local'));

    expect(registry.unregister('artifact-store.local')).toBe(true);
    expect(registry.unregister('artifact-store.local')).toBe(false);
    expect(registry.list()).toEqual([]);
  });

  it('closes and rejects a Provider whose runtime id violates its Factory registration', async () => {
    const close = vi.fn(() => Promise.resolve());
    const registry = new ArtifactStoreProviderRegistry();
    registry.register({
      providerId: 'artifact-store.expected',
      create: () => provider('artifact-store.actual', close),
    });

    await expect(registry.create('artifact-store.expected')).rejects.toMatchObject({
      code: 'artifact.store_factory_id_mismatch',
    });
    expect(close).toHaveBeenCalledOnce();
  });
});

function factory(providerId: string): ArtifactStoreProviderFactory {
  return { providerId, create: () => provider(providerId) };
}

function provider(id: string, close = () => Promise.resolve()): ArtifactStoreProvider {
  return {
    id,
    capabilities: () => Promise.reject(new Error('not used')),
    put: () => Promise.reject(new Error('not used')),
    get: () => Promise.reject(new Error('not used')),
    head: () => Promise.reject(new Error('not used')),
    exists: () => Promise.reject(new Error('not used')),
    delete: () => Promise.reject(new Error('not used')),
    copy: () => Promise.reject(new Error('not used')),
    health: () => Promise.reject(new Error('not used')),
    close,
  };
}
