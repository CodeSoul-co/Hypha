import { SandboxProviderRegistry } from '@hypha/core';
import { describe, expect, it, vi } from 'vitest';
import {
  REMOTE_SANDBOX_PROVIDER_ID,
  RemoteSandboxProviderFactory,
} from './remote-sandbox-provider-factory';
import type { RemoteSandboxTransport } from './remote-sandbox-provider-adapter';

describe('RemoteSandboxProviderFactory', () => {
  it('registers and creates the selected remote provider through the Core registry', async () => {
    const close = vi.fn().mockResolvedValue(undefined);
    const registry = new SandboxProviderRegistry();
    registry.register(
      new RemoteSandboxProviderFactory({
        baseUrl: 'https://sandbox.example.test/v1',
        credentialProvider: async () => ({
          accessToken: 'not-retained-by-factory',
          expiresAt: '2099-01-01T00:00:00.000Z',
        }),
        transport: transport({ close }),
      })
    );

    expect(registry.list()).toEqual([
      { providerId: REMOTE_SANDBOX_PROVIDER_ID, providerType: 'remote_sandbox' },
    ]);
    const provider = await registry.create({ provider: 'remote_sandbox' });
    expect(provider.id).toBe(REMOTE_SANDBOX_PROVIDER_ID);

    await provider.close?.();
    expect(close).toHaveBeenCalledTimes(1);
  });

  it('keeps provider identity explicit and rejects ambiguous transport configuration', () => {
    const selected = new RemoteSandboxProviderFactory({
      providerId: 'provider.remote-sandbox.eu',
      baseUrl: 'https://sandbox.example.test/v1',
      credentialProvider: async () => ({
        accessToken: 'rotated-at-call-time',
        expiresAt: '2099-01-01T00:00:00.000Z',
      }),
      transport: transport(),
    });
    expect(selected.providerId).toBe('provider.remote-sandbox.eu');

    expect(
      () =>
        new RemoteSandboxProviderFactory({
          baseUrl: 'https://sandbox.example.test/v1',
          credentialProvider: async () => ({
            accessToken: 'unused',
            expiresAt: '2099-01-01T00:00:00.000Z',
          }),
          transport: transport(),
          fetch: vi.fn(),
        })
    ).toThrow(/both transport and fetch/u);
  });
});

function transport(overrides: Partial<RemoteSandboxTransport> = {}): RemoteSandboxTransport {
  return {
    capabilities: vi.fn(),
    health: vi.fn(),
    create: vi.fn(),
    start: vi.fn(),
    status: vi.fn(),
    execute: vi.fn(),
    cancel: vi.fn(),
    terminate: vi.fn(),
    cleanup: vi.fn(),
    close: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  } as RemoteSandboxTransport;
}
