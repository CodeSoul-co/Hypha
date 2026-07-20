import { SandboxProviderRegistry } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type { DockerEngineClient } from './docker-engine-client';
import { DockerExecutionProviderFactory } from './docker-execution-provider-factory';

describe('DockerExecutionProviderFactory', () => {
  it('registers and creates the concrete Docker Provider through core DI', async () => {
    const registry = new SandboxProviderRegistry();
    registry.register(
      new DockerExecutionProviderFactory({
        id: 'provider.docker.test',
        workspaceRoot: process.cwd(),
        engine: {} as DockerEngineClient,
      })
    );

    const provider = await registry.create({
      provider: 'docker',
      providerRef: 'provider.docker.test',
    });
    await expect(provider.capabilities()).resolves.toMatchObject({
      processIsolation: true,
      imageDigestPinning: true,
    });
    expect(provider.id).toBe('provider.docker.test');
    await provider.close?.();
  });

  it('uses the stable Docker Provider id by default', () => {
    const factory = new DockerExecutionProviderFactory({
      workspaceRoot: process.cwd(),
      engine: {} as DockerEngineClient,
    });

    expect(factory.providerType).toBe('docker');
    expect(factory.providerId).toBe('provider.docker');
    expect(factory.create().id).toBe('provider.docker');
  });
});
