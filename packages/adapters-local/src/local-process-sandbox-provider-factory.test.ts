import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { SandboxProviderRegistry } from '@codesoul-co/hypha-core';
import { afterEach, describe, expect, it } from 'vitest';
import {
  LOCAL_PROCESS_SANDBOX_PROVIDER_ID,
  LocalProcessSandboxProviderFactory,
} from './local-process-sandbox-provider-factory';

describe('LocalProcessSandboxProviderFactory', () => {
  const roots: string[] = [];

  afterEach(() => {
    for (const root of roots.splice(0)) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('creates the explicitly selected Provider and its configured Workspace root', async () => {
    const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-local-provider-factory-'));
    roots.push(parent);
    const workspaceRoot = path.join(parent, 'workspace');
    const registry = new SandboxProviderRegistry();
    registry.register(
      new LocalProcessSandboxProviderFactory({
        workspaceRoot,
        executables: { node: process.execPath },
        createWorkspaceRoot: true,
      })
    );

    const provider = await registry.create({
      provider: 'local_process',
      providerRef: LOCAL_PROCESS_SANDBOX_PROVIDER_ID,
    });

    expect(provider.id).toBe(LOCAL_PROCESS_SANDBOX_PROVIDER_ID);
    expect(fs.statSync(workspaceRoot).isDirectory()).toBe(true);
    await expect(provider.health()).resolves.toMatchObject({
      status: expect.stringMatching(/^(healthy|degraded)$/u),
    });
    await provider.close?.();
  });

  it('does not create an undeclared Workspace root', async () => {
    const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-local-provider-factory-'));
    roots.push(parent);
    const workspaceRoot = path.join(parent, 'workspace');
    const factory = new LocalProcessSandboxProviderFactory({
      workspaceRoot,
      executables: { node: process.execPath },
    });

    const provider = await factory.create();

    expect(fs.existsSync(workspaceRoot)).toBe(false);
    await expect(provider.health()).resolves.toMatchObject({ status: 'unhealthy' });
    await provider.close?.();
  });
});
