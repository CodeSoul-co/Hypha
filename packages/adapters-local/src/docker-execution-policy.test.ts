import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import type { CommandExecutionRequest, ExecutionEnvironmentSpec } from '@codesoul-co/hypha-core';
import { describe, expect, it } from 'vitest';
import { DockerExecutionPolicyResolver } from './docker-execution-policy';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerExecutionPolicyResolver', () => {
  it('resolves a validated Docker environment into bounded Engine inputs', async () => {
    const workspace = await temporaryWorkspace();
    const resolver = createResolver(workspace);

    const resolved = await resolver.resolve(
      environment(),
      command({
        cwd: 'nested',
        env: { HYPHA_ALLOWED: 'visible' },
        timeoutMs: 500,
        maxStdoutBytes: 128,
      }),
      new AbortController().signal
    );

    expect(resolved).toMatchObject({
      createInput: {
        image: 'redis',
        imageDigest: digest,
        user: '65532:65532',
        workingDirectory: '/workspace/nested',
        workspaceMount: {
          source: await fs.realpath(workspace),
          target: '/workspace',
          readOnly: false,
        },
        networkMode: 'none',
        readOnlyRoot: true,
        cpuCores: 0.5,
        memoryBytes: 128 * 1024 * 1024,
        pidsLimit: 32,
        tempBytes: 4 * 1024 * 1024,
        command: ['sleep', 'infinity'],
      },
      execInput: {
        executable: 'redis-cli',
        args: [],
        workingDirectory: '/workspace/nested',
        environment: { HYPHA_ALLOWED: 'visible' },
        timeoutMs: 500,
        maxStdoutBytes: 128,
        maxStderrBytes: 1024,
        maxCombinedOutputBytes: 1152,
      },
      cleanupStopTimeoutSeconds: 2,
    });
  });

  it('rejects path escapes, mismatched Workspace mounts, and extra mounts', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    await expect(
      resolver.resolve(environment(), command({ cwd: '../outside' }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_PATH_ESCAPE' } });

    const mismatched = environment();
    firstWorkspaceMount(mismatched).sourceRef = 'workspace:another';
    await expect(resolver.resolve(mismatched, command(), signal())).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });

    const extraMount = environment();
    extraMount.filesystem.mounts.push({
      sourceRef: 'artifact:extra',
      targetPath: '/extra',
      mode: 'ro',
      type: 'artifact',
    });
    extraMount.filesystem.maxMounts = 3;
    await expect(resolver.resolve(extraMount, command(), signal())).rejects.toMatchObject({
      normalizedError: { code: 'EXECUTION_PATH_DENIED' },
    });
  });

  it('rejects shell, Secret, network, snapshot, and environment bypasses', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    await expect(
      resolver.resolve(environment(), command({ shell: true }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ secretRefs: ['secret://denied'] }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_SECRET_DENIED' } });
    await expect(
      resolver.resolve(
        environment(),
        command({ networkAuthorizationRef: 'network.authorization' }),
        signal()
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_NETWORK_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ snapshotBefore: true }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
    await expect(
      resolver.resolve(environment(), command({ env: { HYPHA_DENIED: 'hidden' } }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });
  });

  it('rejects unimplemented Docker policy instead of silently weakening it', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    const cases: Array<[string, (value: ExecutionEnvironmentSpec) => void]> = [
      [
        'network',
        (value) => {
          value.network = { mode: 'restricted' };
        },
      ],
      [
        'disk limit',
        (value) => {
          value.resources.diskBytes = 1024;
        },
      ],
      [
        'host mount',
        (value) => {
          value.filesystem.allowHostPathMounts = true;
        },
      ],
      [
        'added capability',
        (value) => {
          value.security.addCapabilities = ['NET_ADMIN'];
        },
      ],
      [
        'security profile',
        (value) => {
          value.security.seccompProfileRef = 'profile:strict';
        },
      ],
      [
        'mount flag',
        (value) => {
          firstWorkspaceMount(value).noSuid = true;
        },
      ],
      [
        'reuse',
        (value) => {
          value.lifecycle.reuse = 'session';
        },
      ],
      [
        'pull policy',
        (value) => {
          if (!value.image) throw new Error('Test fixture omitted its Docker image.');
          value.image.pullPolicy = 'never';
        },
      ],
      [
        'output redaction',
        (value) => {
          value.logging.redactPatterns = ['secret'];
        },
      ],
    ];

    for (const [_name, mutate] of cases) {
      const value = environment();
      mutate(value);
      await expect(resolver.resolve(value, command(), signal())).rejects.toMatchObject({
        normalizedError: {
          code: expect.stringMatching(/^EXECUTION_/),
        },
      });
    }
  });

  it('preserves digest, executable, environment-reference, and output-limit boundaries', async () => {
    const resolver = createResolver(await temporaryWorkspace());
    const unpinned = environment();
    if (!unpinned.image) throw new Error('Test fixture omitted its Docker image.');
    unpinned.image.digest = 'latest';
    await expect(resolver.resolve(unpinned, command(), signal())).rejects.toThrow(
      'Docker image digest must be sha256 pinned'
    );

    await expect(
      resolver.resolve(environment(), command({ executable: 'sh' }), signal())
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_POLICY_DENIED' } });

    await expect(
      resolver.resolve(
        environment(),
        command({ environmentRef: { id: 'another', version: '0.1.0' } }),
        signal()
      )
    ).rejects.toMatchObject({ normalizedError: { code: 'EXECUTION_INVALID_REQUEST' } });

    await expect(
      resolver.resolve(environment(), command({ maxStdoutBytes: 0 }), signal())
    ).rejects.toThrow('maxStdoutBytes must be a positive safe integer');
  });
});

async function temporaryWorkspace(): Promise<string> {
  const workspace = await fs.mkdtemp(path.join(os.tmpdir(), 'hypha-docker-policy-'));
  await fs.mkdir(path.join(workspace, 'nested'));
  return workspace;
}

function createResolver(workspaceRoot: string): DockerExecutionPolicyResolver {
  return new DockerExecutionPolicyResolver({
    workspaceRoot,
    containerCommand: ['sleep', 'infinity'],
    maxCpuCores: 1,
    maxMemoryBytes: 256 * 1024 * 1024,
    maxPidsLimit: 64,
    maxTempBytes: 8 * 1024 * 1024,
    maxExecutionTimeoutMs: 5_000,
    maxStdoutBytes: 2_048,
    maxStderrBytes: 2_048,
    maxCombinedOutputBytes: 4_096,
    maxCleanupStopTimeoutSeconds: 5,
  });
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.safe',
    version: '0.1.0',
    revision: 'revision.docker.safe',
    provider: 'docker',
    image: {
      reference: 'redis',
      digest,
      pullPolicy: 'if_not_present',
      requireDigestPin: true,
    },
    process: {
      shellEnabled: false,
      allowedExecutables: ['redis-cli'],
      executableResolution: 'container_path',
      maxProcesses: 32,
      maxThreads: 64,
      allowBackgroundProcesses: false,
      allowDaemonization: false,
      killProcessTreeOnExit: true,
      environmentAllowList: ['HYPHA_ALLOWED'],
      environmentDenyList: ['HYPHA_DENIED'],
      inheritHostEnvironment: false,
    },
    resources: {
      cpuCores: 0.5,
      memoryMb: 128,
      pidsLimit: 64,
      tempBytes: 4 * 1024 * 1024,
      maxStdoutBytes: 1024,
      maxStderrBytes: 1024,
      maxCombinedOutputBytes: 2048,
      maxExecutionSeconds: 2,
      maxIdleSeconds: 1,
      oomKillDisable: false,
    },
    filesystem: {
      rootFilesystem: 'read_only',
      mounts: [
        {
          sourceRef: 'workspace:current',
          targetPath: '/workspace',
          mode: 'rw',
          type: 'workspace',
          propagation: 'private',
        },
      ],
      tmpfs: [
        {
          targetPath: '/tmp',
          sizeBytes: 4 * 1024 * 1024,
          noExec: true,
          noSuid: true,
          noDev: true,
        },
      ],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
      maxMounts: 2,
    },
    network: {
      mode: 'disabled',
      dnsPolicy: 'disabled',
      blockPrivateNetworks: true,
      blockMetadataEndpoints: true,
    },
    security: {
      runAsUser: '65532',
      runAsGroup: '65532',
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      dropCapabilities: ['ALL'],
      allowNestedContainers: false,
    },
    secrets: {
      injectionMode: 'none',
      redactFromOutput: true,
      redactFromEvents: true,
    },
    logging: {
      captureStdout: true,
      captureStderr: true,
      streamOutput: true,
      persistOutputAsArtifact: true,
    },
    lifecycle: {
      reuse: 'never',
      stopTimeoutMs: 2_000,
      cleanupOnSuccess: true,
      cleanupOnFailure: true,
    },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}

function command(overrides: Partial<CommandExecutionRequest> = {}): CommandExecutionRequest {
  return {
    executionId: 'execution.docker.policy',
    operationId: 'operation.docker.policy',
    principal: {
      principalId: 'principal.docker',
      type: 'user',
      userId: 'user.docker',
      permissionScopes: ['execution.run'],
    },
    userId: 'user.docker',
    workspaceId: 'workspace.docker',
    runId: 'run.docker',
    environmentRef: {
      id: 'execution-environment.docker.safe',
      version: '0.1.0',
      revision: 'revision.docker.safe',
    },
    executable: 'redis-cli',
    ...overrides,
  };
}

function signal(): AbortSignal {
  return new AbortController().signal;
}

function firstWorkspaceMount(
  value: ExecutionEnvironmentSpec
): ExecutionEnvironmentSpec['filesystem']['mounts'][number] {
  const mount = value.filesystem.mounts.find((entry) => entry.type === 'workspace');
  if (!mount) throw new Error('Test fixture omitted its Workspace mount.');
  return mount;
}
