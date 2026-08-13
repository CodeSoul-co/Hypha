import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { SandboxProviderRegistry } from '@codesoul-co/core';
import { afterEach, describe, expect, it } from 'vitest';
import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import {
  DOCKER_SANDBOX_PROVIDER_ID,
  DockerSandboxProviderFactory,
} from './docker-sandbox-provider-factory';

describe('DockerSandboxProviderFactory', () => {
  let workspaceRoot: string | undefined;

  afterEach(async () => {
    if (workspaceRoot) {
      await fs.rm(workspaceRoot, { recursive: true, force: true });
      workspaceRoot = undefined;
    }
  });

  it('creates the accepted Docker Provider through the Core registry', async () => {
    workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-factory-'));
    const transport = new FakeTransport([result('29.6.1\n')]);
    const registry = new SandboxProviderRegistry();
    registry.register(
      new DockerSandboxProviderFactory({
        engineScopeId: 'engine.factory.test',
        policy: {
          workspaceRoot,
          containerCommand: ['sleep', 'infinity'],
        },
        outputArtifacts: {
          openStream: () => {
            throw new Error('Factory identity test does not execute output streams.');
          },
        },
        transport,
      })
    );

    expect(registry.list('docker')).toEqual([
      { providerType: 'docker', providerId: DOCKER_SANDBOX_PROVIDER_ID },
    ]);
    const provider = await registry.create({
      provider: 'docker',
      providerRef: DOCKER_SANDBOX_PROVIDER_ID,
    });
    await expect(provider.health()).resolves.toMatchObject({
      status: 'healthy',
      details: {
        isolation: 'docker',
        factoryRegistered: true,
      },
    });
    expect(transport.requests.map(({ args }) => args)).toEqual([
      ['version', '--format', '{{.Server.Version}}'],
    ]);
    await provider.close?.();
  });

  it('rejects ambiguous Docker transport configuration', () => {
    expect(
      () =>
        new DockerSandboxProviderFactory({
          engineScopeId: 'engine.factory.test',
          policy: {
            workspaceRoot: 'D:\\workspace',
            containerCommand: ['sleep', 'infinity'],
          },
          outputArtifacts: {
            openStream: () => {
              throw new Error('Not used.');
            },
          },
          dockerPath: 'docker',
          transport: new FakeTransport([]),
        })
    ).toThrow('cannot configure both transport and dockerPath');
  });

  it('reports an unavailable Docker daemon without exposing command output', async () => {
    workspaceRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-factory-unavailable-'));
    const secret = 'daemon-detail-that-must-not-leak';
    const factory = new DockerSandboxProviderFactory({
      engineScopeId: 'engine.factory.test',
      policy: {
        workspaceRoot,
        containerCommand: ['sleep', 'infinity'],
      },
      outputArtifacts: {
        openStream: () => {
          throw new Error('Unavailable daemon test does not execute output streams.');
        },
      },
      transport: new FakeTransport([result('', secret, 1)]),
    });
    const provider = await factory.create();

    const health = await provider.health();

    expect(health).toMatchObject({
      status: 'unhealthy',
      message: 'Docker daemon is unavailable.',
    });
    expect(JSON.stringify(health)).not.toContain(secret);
    await provider.close?.();
  });
});

class FakeTransport implements DockerCommandTransport {
  readonly requests: DockerCliRequest[] = [];

  constructor(private readonly results: DockerCliResult[]) {}

  async run(request: DockerCliRequest): Promise<DockerCliResult> {
    this.requests.push(request);
    const next = this.results.shift();
    if (!next) throw new Error('No fake Docker result configured.');
    return next;
  }
}

function result(stdout: string, stderr = '', exitCode = 0): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode,
    stdout,
    stderr,
    observedStdoutBytes: Buffer.byteLength(stdout),
    observedStderrBytes: Buffer.byteLength(stderr),
    startedAt: '2026-07-28T00:00:00.000Z',
    completedAt: '2026-07-28T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
  };
}
