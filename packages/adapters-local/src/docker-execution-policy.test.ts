import os from 'node:os';
import path from 'node:path';
import type { CommandExecutionRequest, ExecutionEnvironmentSpec } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import { DockerExecutionPolicyResolver } from './docker-execution-policy';
import { DockerWorkspaceMountResolver } from './docker-workspace-mount';

const digest = `sha256:${'a'.repeat(64)}`;

describe('DockerExecutionPolicyResolver', () => {
  it('resolves a digest-pinned environment and applies the strictest command limits', () => {
    const resolver = createResolver({
      maxExecutionTimeoutMs: 1_000,
      maxStdoutBytes: 512,
      maxStderrBytes: 256,
      maxCombinedOutputBytes: 640,
    });

    expect(resolver.resolveEnvironment(environment())).toEqual({
      image: 'redis',
      digest,
      user: '999:999',
      workspaceReadOnly: false,
      cpuCores: 0.5,
      memoryBytes: 128 * 1024 * 1024,
      pidsLimit: 64,
      stopTimeoutSeconds: 1,
    });

    expect(
      resolver.resolveCommand(
        environment(),
        command({
          cwd: 'nested\\child',
          env: { HYPHA_ALLOWED: 'visible' },
          timeoutMs: 500,
          idleTimeoutMs: 500,
          maxStdoutBytes: 128,
          maxStderrBytes: 64,
        })
      )
    ).toEqual({
      executable: 'cp',
      workingDirectory: '/workspace/nested/child',
      environment: { HYPHA_ALLOWED: 'visible' },
      timeoutMs: 500,
      idleTimeoutMs: 500,
      maxStdoutBytes: 128,
      maxStderrBytes: 64,
      maxCombinedOutputBytes: 640,
    });
  });

  it.each([
    [
      'a non-Docker provider',
      (value: ExecutionEnvironmentSpec) => {
        value.provider = 'local_process';
      },
      'EXECUTION_ENVIRONMENT_UNAVAILABLE',
    ],
    [
      'a missing digest pin',
      (value: ExecutionEnvironmentSpec) => {
        value.image!.requireDigestPin = false;
      },
      'EXECUTION_IMAGE_UNTRUSTED',
    ],
    [
      'an invalid digest encoding',
      (value: ExecutionEnvironmentSpec) => {
        value.image!.digest = `sha256:${'A'.repeat(64)}`;
      },
      'EXECUTION_IMAGE_UNTRUSTED',
    ],
    [
      'a mismatched reference digest',
      (value: ExecutionEnvironmentSpec) => {
        value.image!.reference = `redis@sha256:${'b'.repeat(64)}`;
      },
      'EXECUTION_IMAGE_UNTRUSTED',
    ],
    [
      'an untrusted registry',
      (value: ExecutionEnvironmentSpec) => {
        value.image!.reference = 'untrusted.example/redis';
        value.image!.trustedRegistryRefs = ['trusted.example'];
      },
      'EXECUTION_IMAGE_UNTRUSTED',
    ],
    [
      'an unverifiable signature policy',
      (value: ExecutionEnvironmentSpec) => {
        value.image!.signaturePolicyRef = 'policy://required';
      },
      'EXECUTION_IMAGE_UNTRUSTED',
    ],
  ])('rejects %s', (_name, mutate, code) => {
    const value = environment();
    mutate(value);
    expect(captureError(() => createResolver().resolveEnvironment(value))).toMatchObject({
      normalizedError: { code },
    });
  });

  it.each([
    [
      'shell execution',
      (value: ExecutionEnvironmentSpec) => {
        value.process.shellEnabled = true;
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'host environment inheritance',
      (value: ExecutionEnvironmentSpec) => {
        value.process.inheritHostEnvironment = true;
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'Sandbox reuse',
      (value: ExecutionEnvironmentSpec) => {
        value.lifecycle.reuse = 'run';
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'a writable root filesystem',
      (value: ExecutionEnvironmentSpec) => {
        value.filesystem.rootFilesystem = 'writable';
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'an additional host mount',
      (value: ExecutionEnvironmentSpec) => {
        value.filesystem.mounts.push({
          sourceRef: 'host:/tmp',
          targetPath: '/host',
          mode: 'ro',
          type: 'bind',
        });
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'device access',
      (value: ExecutionEnvironmentSpec) => {
        value.filesystem.allowDeviceAccess = true;
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'root execution',
      (value: ExecutionEnvironmentSpec) => {
        value.security.runAsUser = '0';
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'added capabilities',
      (value: ExecutionEnvironmentSpec) => {
        value.security.addCapabilities = ['NET_ADMIN'];
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'secret injection',
      (value: ExecutionEnvironmentSpec) => {
        value.secrets.injectionMode = 'environment';
      },
      'EXECUTION_SECRET_DENIED',
    ],
    [
      'enabled networking',
      (value: ExecutionEnvironmentSpec) => {
        value.network.mode = 'enabled';
      },
      'EXECUTION_NETWORK_DENIED',
    ],
    [
      'a missing memory limit',
      (value: ExecutionEnvironmentSpec) => {
        value.resources.memoryMb = undefined;
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'a missing CPU limit',
      (value: ExecutionEnvironmentSpec) => {
        value.resources.cpuCores = undefined;
      },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'disabled OOM termination',
      (value: ExecutionEnvironmentSpec) => {
        value.resources.oomKillDisable = true;
      },
      'EXECUTION_POLICY_DENIED',
    ],
  ])('fails closed for %s', (_name, mutate, code) => {
    const value = environment();
    mutate(value);
    expect(captureError(() => createResolver().resolveEnvironment(value))).toMatchObject({
      normalizedError: { code },
    });
  });

  it.each([
    ['shell execution', { shell: true }, 'EXECUTION_POLICY_DENIED'],
    ['Secret references', { secretRefs: ['secret://denied'] }, 'EXECUTION_SECRET_DENIED'],
    [
      'network authorization',
      { networkAuthorizationRef: 'network://denied' },
      'EXECUTION_NETWORK_DENIED',
    ],
    ['snapshot preconditions', { snapshotBefore: true }, 'EXECUTION_POLICY_DENIED'],
    ['an unmapped executable', { executable: 'sh' }, 'EXECUTION_POLICY_DENIED'],
    ['a relative executable separator', { executable: 'bin\\cp' }, 'EXECUTION_POLICY_DENIED'],
    ['a traversal path', { cwd: '..\\outside' }, 'EXECUTION_PATH_ESCAPE'],
    ['a NUL path bypass', { cwd: `nested\u0000outside` }, 'EXECUTION_PATH_ESCAPE'],
    [
      'a NUL environment-name bypass',
      { env: { 'HYPHA_ALLOWED\u0000BYPASS': 'value' } },
      'EXECUTION_POLICY_DENIED',
    ],
    [
      'a denied environment variable',
      { env: { HYPHA_DENIED: 'value' } },
      'EXECUTION_POLICY_DENIED',
    ],
  ] satisfies Array<[string, Partial<CommandExecutionRequest>, string]>)(
    'rejects command boundary: %s',
    (_name, overrides, code) => {
      expect(
        captureError(() => createResolver().resolveCommand(environment(), command(overrides)))
      ).toMatchObject({ normalizedError: { code } });
    }
  );

  it('rejects invalid provider-level limits before accepting work', () => {
    expect(
      () =>
        new DockerExecutionPolicyResolver(workspace(), {
          maxExecutionTimeoutMs: 0,
        })
    ).toThrow('maxExecutionTimeoutMs must be a positive integer.');
  });
});

function createResolver(
  options: ConstructorParameters<typeof DockerExecutionPolicyResolver>[1] = {}
) {
  return new DockerExecutionPolicyResolver(workspace(), options);
}

function workspace(): DockerWorkspaceMountResolver {
  return new DockerWorkspaceMountResolver({
    workspaceRoot: path.join(os.tmpdir(), 'hypha-docker-policy'),
  });
}

function captureError(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }
  throw new Error('Expected policy resolution to fail.');
}

function command(overrides: Partial<CommandExecutionRequest> = {}): CommandExecutionRequest {
  return {
    operationId: 'operation.docker.policy',
    principal: {
      principalId: 'principal.docker.policy',
      type: 'user',
      userId: 'user.docker.policy',
      permissionScopes: ['execution.run'],
    },
    userId: 'user.docker.policy',
    workspaceId: 'workspace.docker.policy',
    runId: 'run.docker.policy',
    environmentRef: { id: 'execution-environment.docker.safe', version: '0.1.0' },
    executable: 'cp',
    ...overrides,
  };
}

function environment(): ExecutionEnvironmentSpec {
  return {
    id: 'execution-environment.docker.safe',
    version: '0.1.0',
    provider: 'docker',
    image: { reference: 'redis', digest, requireDigestPin: true, pullPolicy: 'never' },
    process: {
      shellEnabled: false,
      allowedExecutables: ['cp'],
      deniedExecutables: ['HYPHA_DENIED_EXECUTABLE'],
      executableResolution: 'container_path',
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
      maxStdoutBytes: 1_024,
      maxStderrBytes: 1_024,
      maxCombinedOutputBytes: 2_048,
      maxExecutionSeconds: 2,
      maxIdleSeconds: 1,
    },
    filesystem: {
      rootFilesystem: 'read_only',
      mounts: [
        {
          sourceRef: 'workspace:current',
          targetPath: '/workspace',
          mode: 'rw',
          type: 'workspace',
        },
      ],
      allowDeviceAccess: false,
      allowHostPathMounts: false,
    },
    network: { mode: 'disabled', dnsPolicy: 'disabled' },
    security: {
      runAsUser: '999',
      runAsGroup: '999',
      nonRootRequired: true,
      noNewPrivileges: true,
      privileged: false,
      dropCapabilities: ['ALL'],
      allowNestedContainers: false,
    },
    secrets: { injectionMode: 'none', redactFromOutput: true, redactFromEvents: true },
    logging: { captureStdout: true, captureStderr: true },
    lifecycle: { reuse: 'never', stopTimeoutMs: 1_000, cleanupOnSuccess: true },
    workingDirectoryPolicy: 'workspace_only',
    defaultTimeoutMs: 2_000,
  };
}
