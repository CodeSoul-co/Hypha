import path from 'node:path';
import type { CommandExecutionRequest, ExecutionEnvironmentSpec } from '@hypha/core';
import { executionProviderError } from './execution-provider-error';
import type { DockerWorkspaceMountResolver } from './docker-workspace-mount';

export interface DockerEnvironmentPolicy {
  image: string;
  digest: string;
  user: string;
  workspaceReadOnly: boolean;
  cpuCores: number;
  memoryBytes: number;
  pidsLimit: number;
  tempBytes?: number;
  stopTimeoutSeconds: number;
}

export interface DockerCommandPolicy {
  executable: string;
  workingDirectory: string;
  environment: Record<string, string>;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

export interface DockerExecutionPolicyOptions {
  maxExecutionTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  maxCombinedOutputBytes?: number;
}

export class DockerExecutionPolicyResolver {
  private readonly maxExecutionTimeoutMs: number;
  private readonly maxStdoutBytes: number;
  private readonly maxStderrBytes: number;
  private readonly maxCombinedOutputBytes: number;

  constructor(
    private readonly workspace: DockerWorkspaceMountResolver,
    options: DockerExecutionPolicyOptions = {}
  ) {
    this.maxExecutionTimeoutMs = positive(
      options.maxExecutionTimeoutMs ?? 300_000,
      'maxExecutionTimeoutMs'
    );
    this.maxStdoutBytes = positive(options.maxStdoutBytes ?? 4 * 1024 * 1024, 'maxStdoutBytes');
    this.maxStderrBytes = positive(options.maxStderrBytes ?? 4 * 1024 * 1024, 'maxStderrBytes');
    this.maxCombinedOutputBytes = positive(
      options.maxCombinedOutputBytes ?? 8 * 1024 * 1024,
      'maxCombinedOutputBytes'
    );
  }

  resolveEnvironment(environment: ExecutionEnvironmentSpec): DockerEnvironmentPolicy {
    if (environment.provider !== 'docker') {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker provider cannot create ${environment.provider} environments.`,
        false
      );
    }
    if (!environment.image?.digest || !environment.image.requireDigestPin) {
      throw executionProviderError(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Docker image digest pin is required.',
        false
      );
    }
    const digest = validateDigest(environment.image.digest);
    const image = normalizeImage(environment.image.reference, digest);
    validateTrustedRegistry(image, environment.image.trustedRegistryRefs);
    if (environment.image.signaturePolicyRef) {
      throw executionProviderError(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Image signature policy requires a verifier adapter and cannot be ignored.',
        false
      );
    }
    if (
      environment.process.shellEnabled ||
      environment.process.executableResolution !== 'container_path'
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires shell=false and container_path executable resolution.',
        false
      );
    }
    if (
      environment.process.allowBackgroundProcesses ||
      environment.process.allowDaemonization ||
      environment.process.inheritHostEnvironment
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution forbids background processes, daemonization, and host environment inheritance.',
        false
      );
    }
    if (!environment.process.allowedExecutables?.length) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires an explicit executable allowlist.',
        false
      );
    }
    if (environment.lifecycle.reuse !== 'never') {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker provider currently supports single-use Sandboxes only.',
        false
      );
    }
    if (environment.filesystem.rootFilesystem !== 'read_only') {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker RootFS must be read-only.',
        false
      );
    }
    const mounts = environment.filesystem.mounts;
    if (
      mounts.length !== 1 ||
      mounts[0].type !== 'workspace' ||
      mounts[0].sourceRef !== 'workspace:current' ||
      mounts[0].targetPath !== this.workspace.containerWorkspaceRoot
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker provider requires exactly one workspace:current mount at the configured Workspace target.',
        false
      );
    }
    if (
      environment.filesystem.allowDeviceAccess ||
      environment.filesystem.allowHostPathMounts ||
      environment.filesystem.allowedDevices?.length
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker device and arbitrary host-path mounts are forbidden.',
        false
      );
    }
    if (
      environment.security.privileged ||
      !environment.security.nonRootRequired ||
      !environment.security.noNewPrivileges ||
      environment.security.allowNestedContainers ||
      environment.security.addCapabilities?.length ||
      !environment.security.dropCapabilities?.some((entry) => entry.toUpperCase() === 'ALL')
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker security requires non-root, no-new-privileges, CAP_DROP=ALL, and no added capabilities.',
        false
      );
    }
    if (environment.secrets.injectionMode !== 'none') {
      throw executionProviderError(
        'EXECUTION_SECRET_DENIED',
        'Docker secret injection requires a Secret Broker and is not enabled.',
        false
      );
    }
    if (environment.network.mode !== 'disabled') {
      throw executionProviderError(
        'EXECUTION_NETWORK_DENIED',
        'This Docker adapter is fail-closed and currently supports only disabled networking.',
        false
      );
    }
    if (!environment.resources.memoryMb || !environment.resources.pidsLimit) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires memory and PID limits.',
        false
      );
    }
    if (environment.resources.oomKillDisable) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker OOM killer cannot be disabled.',
        false
      );
    }
    return {
      image,
      digest,
      user: numericUser(environment.security.runAsUser, environment.security.runAsGroup),
      workspaceReadOnly: mounts[0].mode === 'ro',
      cpuCores: deriveCpuCores(environment),
      memoryBytes: Math.round(environment.resources.memoryMb * 1024 * 1024),
      pidsLimit: environment.resources.pidsLimit,
      ...(environment.resources.tempBytes ? { tempBytes: environment.resources.tempBytes } : {}),
      stopTimeoutSeconds: Math.max(
        0,
        Math.ceil((environment.lifecycle.stopTimeoutMs ?? 10_000) / 1000)
      ),
    };
  }

  resolveCommand(
    environment: ExecutionEnvironmentSpec,
    request: CommandExecutionRequest
  ): DockerCommandPolicy {
    if (request.shell) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker shell execution is disabled.',
        false
      );
    }
    if (request.secretRefs?.length) {
      throw executionProviderError(
        'EXECUTION_SECRET_DENIED',
        'Docker command cannot receive Secret references.',
        false
      );
    }
    if (request.networkAuthorizationRef) {
      throw executionProviderError(
        'EXECUTION_NETWORK_DENIED',
        'Docker task networking is not enabled.',
        false
      );
    }
    if (
      request.snapshotBefore ||
      request.snapshotAfter ||
      request.snapshotOnFailure ||
      request.expectedWorkspaceSnapshotHash
    ) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Docker snapshot preconditions require a snapshot adapter.',
        false
      );
    }
    const allowed = environment.process.allowedExecutables ?? [];
    const denied = environment.process.deniedExecutables ?? [];
    if (!allowed.includes(request.executable) || denied.includes(request.executable)) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${request.executable} is not allowed in the Docker environment.`,
        false
      );
    }
    if (!request.executable.startsWith('/') && /[\\/]/u.test(request.executable)) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Relative executable paths with separators are forbidden.',
        false
      );
    }
    return {
      executable: request.executable,
      workingDirectory: this.workspace.resolveWorkingDirectory(request.cwd),
      environment: buildEnvironment(environment, request.env),
      timeoutMs: minimum([
        request.timeoutMs,
        environment.defaultTimeoutMs,
        environment.resources.maxExecutionSeconds
          ? environment.resources.maxExecutionSeconds * 1_000
          : undefined,
        this.maxExecutionTimeoutMs,
      ]),
      ...(minimumOptional([
        request.idleTimeoutMs,
        environment.resources.maxIdleSeconds
          ? environment.resources.maxIdleSeconds * 1_000
          : undefined,
      ])
        ? {
            idleTimeoutMs: minimumOptional([
              request.idleTimeoutMs,
              environment.resources.maxIdleSeconds
                ? environment.resources.maxIdleSeconds * 1_000
                : undefined,
            ]),
          }
        : {}),
      maxStdoutBytes: minimum([
        request.maxStdoutBytes,
        environment.resources.maxStdoutBytes,
        this.maxStdoutBytes,
      ]),
      maxStderrBytes: minimum([
        request.maxStderrBytes,
        environment.resources.maxStderrBytes,
        this.maxStderrBytes,
      ]),
      maxCombinedOutputBytes: minimum([
        environment.resources.maxCombinedOutputBytes,
        this.maxCombinedOutputBytes,
      ]),
    };
  }
}

function buildEnvironment(
  environment: ExecutionEnvironmentSpec,
  requested?: Record<string, string>
): Record<string, string> {
  const allowed = new Set(environment.process.environmentAllowList ?? []);
  const denied = new Set(environment.process.environmentDenyList ?? []);
  const output: Record<string, string> = {};
  for (const [name, value] of Object.entries(requested ?? {})) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || !allowed.has(name) || denied.has(name)) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        `Environment variable ${name} is not allowed.`,
        false
      );
    }
    output[name] = value;
  }
  return output;
}

function normalizeImage(reference: string, digest: string): string {
  const at = reference.indexOf('@');
  if (at >= 0 && reference.slice(at + 1) !== digest) {
    throw executionProviderError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Image reference digest mismatch.',
      false
    );
  }
  const withoutDigest = at >= 0 ? reference.slice(0, at) : reference;
  const lastSlash = withoutDigest.lastIndexOf('/');
  const lastColon = withoutDigest.lastIndexOf(':');
  return lastColon > lastSlash ? withoutDigest.slice(0, lastColon) : withoutDigest;
}

function validateTrustedRegistry(reference: string, trusted?: string[]): void {
  if (!trusted?.length) return;
  if (!trusted.some((entry) => reference === entry || reference.startsWith(`${entry}/`))) {
    throw executionProviderError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Image registry is not trusted.',
      false
    );
  }
}

function validateDigest(value: string): string {
  if (!/^sha256:[0-9a-f]{64}$/.test(value)) {
    throw executionProviderError(
      'EXECUTION_IMAGE_UNTRUSTED',
      'Docker digest must be sha256.',
      false
    );
  }
  return value;
}

function numericUser(user?: string, group?: string): string {
  if (!user || !/^[1-9][0-9]*$/.test(user) || (group && !/^[1-9][0-9]*$/.test(group))) {
    throw executionProviderError(
      'EXECUTION_POLICY_DENIED',
      'Docker user and group must be non-zero numeric IDs.',
      false
    );
  }
  return group ? `${user}:${group}` : user;
}

function deriveCpuCores(environment: ExecutionEnvironmentSpec): number {
  const value = environment.resources.cpuCores;
  if (!value || value <= 0) {
    throw executionProviderError(
      'EXECUTION_POLICY_DENIED',
      'Docker execution requires a CPU limit.',
      false
    );
  }
  return value;
}

function minimum(values: Array<number | undefined>): number {
  return Math.min(...values.filter((value): value is number => value !== undefined && value > 0));
}

function minimumOptional(values: Array<number | undefined>): number | undefined {
  const filtered = values.filter((value): value is number => value !== undefined && value > 0);
  return filtered.length ? Math.min(...filtered) : undefined;
}

function positive(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${name} must be a positive integer.`);
  return value;
}
