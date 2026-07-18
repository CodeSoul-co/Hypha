import { describe, expect, it, vi } from 'vitest';
import type { SandboxProvider, SandboxProviderFactory } from '../../contracts/sandbox-provider';
import { commandExecutionResultExample } from '../command-execution';
import { sandboxProviderCapabilitiesExample, sandboxRecordExample } from '../sandbox';
import { SandboxProviderRegistry } from './registry';

describe('SandboxProviderRegistry', () => {
  it('creates the only registered Provider for an Environment type', async () => {
    const registry = new SandboxProviderRegistry();
    registry.register(factory('docker', 'provider.docker'));

    await expect(registry.create({ provider: 'docker' })).resolves.toMatchObject({
      id: 'provider.docker',
    });
    expect(registry.list()).toEqual([{ providerType: 'docker', providerId: 'provider.docker' }]);
  });

  it('uses providerRef for deterministic selection and rejects ambiguity', async () => {
    const registry = new SandboxProviderRegistry();
    registry.register(factory('custom', 'provider.custom.alpha'));
    registry.register(factory('custom', 'provider.custom.beta'));

    expect(() => registry.resolve({ provider: 'custom' })).toThrowError(
      expect.objectContaining({ code: 'execution.provider_selection_ambiguous' })
    );
    await expect(
      registry.create({ provider: 'custom', providerRef: 'provider.custom.beta' })
    ).resolves.toMatchObject({ id: 'provider.custom.beta' });
  });

  it('rejects duplicate and missing registrations', () => {
    const registry = new SandboxProviderRegistry();
    registry.register(factory('local_process', 'provider.local'));

    expect(() => registry.register(factory('local_process', 'provider.local'))).toThrowError(
      expect.objectContaining({ code: 'execution.provider_registration_conflict' })
    );
    expect(() =>
      registry.resolve({ provider: 'docker', providerRef: 'provider.docker' })
    ).toThrowError(expect.objectContaining({ code: 'execution.provider_not_registered' }));
  });

  it('unregisters by provider type without affecting the same id under another type', () => {
    const registry = new SandboxProviderRegistry();
    registry.register(factory('mock', 'provider.shared'));
    registry.register(factory('custom', 'provider.shared'));

    expect(registry.unregister('mock', 'provider.shared')).toBe(true);
    expect(registry.list()).toEqual([{ providerType: 'custom', providerId: 'provider.shared' }]);
  });

  it('closes and rejects a Provider whose runtime id violates its Factory registration', async () => {
    const close = vi.fn(() => Promise.resolve());
    const registry = new SandboxProviderRegistry();
    registry.register({
      providerType: 'docker',
      providerId: 'provider.expected',
      create: () => provider('provider.actual', close),
    });

    await expect(registry.create({ provider: 'docker' })).rejects.toMatchObject({
      code: 'execution.provider_factory_id_mismatch',
    });
    expect(close).toHaveBeenCalledOnce();
  });

  it('rejects invalid runtime registrations at the DI boundary', () => {
    const registry = new SandboxProviderRegistry();
    const invalid = factory('docker', ' provider.docker');

    expect(() => registry.register(invalid)).toThrowError(
      expect.objectContaining({ code: 'execution.provider_registration_invalid' })
    );
  });
});

function factory(
  providerType: SandboxProviderFactory['providerType'],
  providerId: string
): SandboxProviderFactory {
  return {
    providerType,
    providerId,
    create: () => provider(providerId),
  };
}

function provider(
  id: string,
  close: () => Promise<void> = () => Promise.resolve()
): SandboxProvider {
  return {
    id,
    capabilities: () => Promise.resolve(sandboxProviderCapabilitiesExample),
    create: () => Promise.resolve(sandboxRecordExample),
    start: () => Promise.resolve(sandboxRecordExample),
    execute: () => Promise.resolve(commandExecutionResultExample),
    cancel: () => Promise.resolve(),
    terminate: () => Promise.resolve(),
    status: () => Promise.resolve(sandboxRecordExample),
    cleanup: () => Promise.resolve(),
    health: () => Promise.resolve({ status: 'healthy', checkedAt: '2026-07-18T00:00:00.000Z' }),
    close,
  };
}
