import { describe, expect, it } from 'vitest';
import { SandboxProviderRegistry } from '@hypha/core';
import {
  createDockerExecutionProviderFactory,
  createLocalProcessExecutionProviderFactory,
} from './execution-provider-factories';

describe('local execution Provider factories', () => {
  it('registers and creates a configured Local Process Provider', async () => {
    const registry = new SandboxProviderRegistry();
    registry.register(
      createLocalProcessExecutionProviderFactory({
        id: 'provider.local.test',
        workspaceRoot: process.cwd(),
        executables: { node: process.execPath },
      })
    );

    const provider = await registry.create({
      provider: 'local_process',
      providerRef: 'provider.local.test',
    });
    expect(provider.id).toBe('provider.local.test');
    await provider.close?.();
  });

  it('registers and creates a configured Docker Provider without touching the daemon', async () => {
    const registry = new SandboxProviderRegistry();
    registry.register(
      createDockerExecutionProviderFactory({
        id: 'provider.docker.test',
        workspaceRoot: process.cwd(),
      })
    );

    const provider = await registry.create({
      provider: 'docker',
      providerRef: 'provider.docker.test',
    });
    expect(provider.id).toBe('provider.docker.test');
    await provider.close?.();
  });
});
