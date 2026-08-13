import fs from 'node:fs/promises';
import path from 'node:path';
import {
  validateExecutionEnvironmentSpec,
  type CommandExecutionRequest,
  type ExecutionEnvironmentSpec,
} from '@codesoul-co/core';
import type { DockerContainerCreateInput } from './docker-engine-boundary';
import { validateCreateInput, validateLiteralArgv } from './docker-engine-boundary';
import { validateExecInput, type DockerContainerExecInput } from './docker-exec-io';
import { executionProviderError } from './execution-provider-error';

const MEBIBYTE = 1024 * 1024;

export interface DockerExecutionPolicyResolverOptions {
  workspaceRoot: string;
  containerCommand: string[];
  containerWorkspaceRoot?: string;
  maxCpuCores?: number;
  maxMemoryBytes?: number;
  maxPidsLimit?: number;
  maxTempBytes?: number;
  maxExecutionTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  maxCombinedOutputBytes?: number;
  maxCleanupStopTimeoutSeconds?: number;
}

export interface ResolvedDockerExecutionPolicy {
  createInput: Omit<DockerContainerCreateInput, 'name' | 'labels'>;
  execInput: Omit<DockerContainerExecInput, 'containerReference' | 'onOutput'>;
  cleanupStopTimeoutSeconds: number;
}

/**
 * Resolves public execution contracts into the strictly supported Docker surface.
 * Unsupported policy is rejected instead of being silently ignored.
 */
export class DockerExecutionPolicyResolver {
  private readonly workspaceRoot: string;
  private readonly containerCommand: readonly string[];
  private readonly containerWorkspaceRoot: string;
  private readonly maxCpuCores: number;
  private readonly maxMemoryBytes: number;
  private readonly maxPidsLimit: number;
  private readonly maxTempBytes: number;
  private readonly maxExecutionTimeoutMs: number;
  private readonly maxStdoutBytes: number;
  private readonly maxStderrBytes: number;
  private readonly maxCombinedOutputBytes: number;
  private readonly maxCleanupStopTimeoutSeconds: number;

  constructor(options: DockerExecutionPolicyResolverOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    validateLiteralArgv(options.containerCommand, 'Docker lifecycle command');
    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.containerCommand = [...options.containerCommand];
    this.containerWorkspaceRoot = options.containerWorkspaceRoot ?? '/workspace';
    this.maxCpuCores = positiveNumber(options.maxCpuCores ?? 4, 'maxCpuCores');
    this.maxMemoryBytes = positiveSafeInteger(
      options.maxMemoryBytes ?? 2 * 1024 * MEBIBYTE,
      'maxMemoryBytes'
    );
    this.maxPidsLimit = positiveSafeInteger(options.maxPidsLimit ?? 256, 'maxPidsLimit');
    this.maxTempBytes = positiveSafeInteger(options.maxTempBytes ?? 64 * MEBIBYTE, 'maxTempBytes');
    this.maxExecutionTimeoutMs = positiveSafeInteger(
      options.maxExecutionTimeoutMs ?? 300_000,
      'maxExecutionTimeoutMs'
    );
    this.maxStdoutBytes = positiveSafeInteger(
      options.maxStdoutBytes ?? 4 * MEBIBYTE,
      'maxStdoutBytes'
    );
    this.maxStderrBytes = positiveSafeInteger(
      options.maxStderrBytes ?? 4 * MEBIBYTE,
      'maxStderrBytes'
    );
    this.maxCombinedOutputBytes = positiveSafeInteger(
      options.maxCombinedOutputBytes ?? 8 * MEBIBYTE,
      'maxCombinedOutputBytes'
    );
    this.maxCleanupStopTimeoutSeconds = nonNegativeSafeInteger(
      options.maxCleanupStopTimeoutSeconds ?? 10,
      'maxCleanupStopTimeoutSeconds'
    );
  }

  validateEnvironment(input: ExecutionEnvironmentSpec): ExecutionEnvironmentSpec {
    let environment: ExecutionEnvironmentSpec;
    try {
      environment = validateExecutionEnvironmentSpec(input);
    } catch {
      throw executionProviderError(
        'EXECUTION_INVALID_REQUEST',
        'Docker execution environment failed runtime validation.',
        false
      );
    }

    if (environment.provider !== 'docker') {
      deny(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Docker provider cannot create ${environment.provider} environments.`
      );
    }
    if (!environment.image?.digest || environment.image.requireDigestPin !== true) {
      deny('EXECUTION_IMAGE_UNTRUSTED', 'Docker image must use an immutable digest.');
    }
    if (
      (environment.image.pullPolicy !== undefined &&
        environment.image.pullPolicy !== 'if_not_present') ||
      environment.image.platform ||
      environment.image.trustedRegistryRefs?.length ||
      environment.image.sbomRef ||
      environment.image.signaturePolicyRef
    ) {
      deny(
        'EXECUTION_IMAGE_UNTRUSTED',
        'Requested Docker image provenance policy is not implemented by the Engine boundary.'
      );
    }
    if (
      environment.process.shellEnabled ||
      environment.process.executableResolution !== 'container_path' ||
      !environment.process.allowedExecutables?.length
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires shell-disabled, explicitly allowlisted container executables.'
      );
    }
    if (
      environment.process.allowBackgroundProcesses ||
      environment.process.allowDaemonization ||
      environment.process.inheritHostEnvironment ||
      !environment.process.killProcessTreeOnExit
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution does not inherit the host environment or allow background processes.'
      );
    }
    if (environment.process.maxOpenFiles || environment.resources.maxOpenFiles) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker open-file limits are not implemented by this provider.'
      );
    }
    if (
      environment.process.defaultUmask ||
      environment.process.locale ||
      environment.process.timezone
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Requested Docker process defaults are not implemented by this provider.'
      );
    }
    if (environment.filesystem.rootFilesystem !== 'read_only') {
      deny('EXECUTION_POLICY_DENIED', 'Docker root filesystem must be read-only.');
    }
    if (
      environment.filesystem.allowHostPathMounts ||
      environment.filesystem.allowDeviceAccess ||
      environment.filesystem.allowedDevices?.length
    ) {
      deny('EXECUTION_PATH_DENIED', 'Docker host paths and devices are not available.');
    }
    if (
      environment.filesystem.maskPaths?.length ||
      environment.filesystem.readonlyPaths?.length ||
      environment.filesystem.writablePaths?.length
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Additional Docker path masks and overrides are not implemented.'
      );
    }
    const workspaceMounts = environment.filesystem.mounts.filter(
      (mount) => mount.type === 'workspace'
    );
    if (
      workspaceMounts.length !== 1 ||
      environment.filesystem.mounts.length !== 1 ||
      workspaceMounts[0]?.targetPath !== this.containerWorkspaceRoot
    ) {
      deny(
        'EXECUTION_PATH_DENIED',
        'Docker execution requires one precise Workspace mount at the configured container root.'
      );
    }
    if (workspaceMounts[0].noExec || workspaceMounts[0].noSuid || workspaceMounts[0].noDev) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Requested Workspace mount flags are not implemented by the Docker Engine boundary.'
      );
    }
    const tmpfs = environment.filesystem.tmpfs ?? [];
    if (tmpfs.length > 1 || (tmpfs[0] !== undefined && tmpfs[0].targetPath !== '/tmp')) {
      deny('EXECUTION_PATH_DENIED', 'Docker execution supports only the managed /tmp filesystem.');
    }
    if (tmpfs[0]?.mode !== undefined) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Custom Docker temporary-filesystem modes are not implemented.'
      );
    }
    if (environment.network.mode !== 'disabled') {
      deny(
        'EXECUTION_NETWORK_DENIED',
        'Docker networking is disabled until restricted networking is implemented.'
      );
    }
    if (environment.secrets.injectionMode !== 'none') {
      deny('EXECUTION_SECRET_DENIED', 'Docker Secret injection is not implemented.');
    }
    if (
      !environment.security.runAsUser ||
      environment.security.privileged ||
      !environment.security.nonRootRequired ||
      !environment.security.noNewPrivileges ||
      !environment.security.dropCapabilities?.includes('ALL') ||
      environment.security.addCapabilities?.length ||
      environment.security.allowNestedContainers
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires non-root, no-new-privileges, and all capabilities dropped.'
      );
    }
    if (
      !/^[1-9][0-9]*$/.test(environment.security.runAsUser) ||
      (environment.security.runAsGroup !== undefined &&
        !/^[1-9][0-9]*$/.test(environment.security.runAsGroup))
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires explicit non-zero numeric user and group identities.'
      );
    }
    if (
      environment.security.seccompProfileRef ||
      environment.security.appArmorProfileRef ||
      environment.security.selinuxLabelRef ||
      environment.security.userNamespace ||
      environment.security.readOnlyProc ||
      environment.security.maskHostProc ||
      environment.security.preventPtrace
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Requested Docker security profiles are not implemented by the Engine boundary.'
      );
    }
    if (
      !environment.resources.cpuCores ||
      !environment.resources.memoryMb ||
      !environment.resources.pidsLimit
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires CPU, memory, and PID limits supported by the provider.'
      );
    }
    if (
      environment.resources.cpuQuotaMicros ||
      environment.resources.cpuPeriodMicros ||
      environment.resources.cpuShares ||
      environment.resources.maxCpuSeconds ||
      environment.resources.memorySwapMb ||
      environment.resources.oomKillDisable ||
      environment.resources.diskBytes ||
      environment.resources.maxWriteBytes ||
      environment.resources.blockIoWeight
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'The environment requests Docker resource controls not implemented by this provider.'
      );
    }
    if (
      environment.logging.captureStdout !== true ||
      environment.logging.captureStderr !== true ||
      environment.logging.streamOutput !== true ||
      environment.logging.persistOutputAsArtifact !== true
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Docker execution requires streamed stdout/stderr Artifact evidence.'
      );
    }
    if (
      environment.logging.includeTimestamps ||
      environment.logging.maxLineBytes ||
      environment.logging.redactPatterns?.length
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Requested Docker output transformation is not implemented by the collector.'
      );
    }
    if (
      environment.lifecycle.reuse !== 'never' ||
      environment.lifecycle.cleanupOnSuccess !== true ||
      environment.lifecycle.cleanupOnFailure !== true
    ) {
      deny('EXECUTION_POLICY_DENIED', 'Docker execution currently requires per-execution cleanup.');
    }
    if (
      environment.lifecycle.idleTtlSeconds ||
      environment.lifecycle.maxLifetimeSeconds ||
      environment.lifecycle.maxExecutions ||
      environment.lifecycle.createTimeoutMs ||
      environment.lifecycle.startTimeoutMs ||
      environment.lifecycle.cleanupTimeoutMs ||
      environment.lifecycle.snapshotOnFailure ||
      environment.lifecycle.retainForDebugSeconds
    ) {
      deny(
        'EXECUTION_POLICY_DENIED',
        'Requested Docker lifecycle controls are not implemented by this provider.'
      );
    }
    if (environment.workingDirectoryPolicy !== 'workspace_only') {
      deny('EXECUTION_PATH_DENIED', 'Docker working directories are restricted to the Workspace.');
    }
    return environment;
  }

  async resolve(
    input: ExecutionEnvironmentSpec,
    request: CommandExecutionRequest,
    signal: AbortSignal
  ): Promise<ResolvedDockerExecutionPolicy> {
    const environment = this.validateEnvironment(input);
    validateCommandReference(environment, request);
    validateCommandPolicy(environment, request);

    const workspaceRoot = await this.resolveWorkspaceRoot();
    const workspaceMount = environment.filesystem.mounts.find(
      (mount) => mount.type === 'workspace'
    );
    const image = environment.image;
    if (!workspaceMount || !image?.digest) {
      deny(
        'EXECUTION_INVALID_REQUEST',
        'Docker environment omitted its validated image or Workspace mount.'
      );
    }
    const { cpuCores, memoryMb, pidsLimit: environmentPidsLimit } = environment.resources;
    const runAsUser = environment.security.runAsUser;
    if (!cpuCores || !memoryMb || !environmentPidsLimit || !runAsUser) {
      deny(
        'EXECUTION_INVALID_REQUEST',
        'Docker environment omitted its validated resource or user policy.'
      );
    }
    if (
      workspaceMount.sourceRef !== 'workspace:current' &&
      workspaceMount.sourceRef !== `workspace:${request.workspaceId}`
    ) {
      deny('EXECUTION_PATH_DENIED', 'Docker Workspace mount does not match the command Workspace.');
    }

    const maxStdoutBytes = minimumPositive([
      request.maxStdoutBytes,
      environment.resources.maxStdoutBytes,
      environment.resources.maxCombinedOutputBytes,
      this.maxStdoutBytes,
    ]);
    const maxStderrBytes = minimumPositive([
      request.maxStderrBytes,
      environment.resources.maxStderrBytes,
      environment.resources.maxCombinedOutputBytes,
      this.maxStderrBytes,
    ]);
    const maxCombinedOutputBytes = minimumPositive([
      environment.resources.maxCombinedOutputBytes,
      maxStdoutBytes + maxStderrBytes,
      this.maxCombinedOutputBytes,
    ]);
    const timeoutMs = minimumPositive([
      request.timeoutMs,
      environment.defaultTimeoutMs,
      environment.resources.maxExecutionSeconds
        ? environment.resources.maxExecutionSeconds * 1_000
        : undefined,
      this.maxExecutionTimeoutMs,
    ]);
    const idleTimeoutMs = minimumOptionalPositive([
      request.idleTimeoutMs,
      environment.resources.maxIdleSeconds
        ? environment.resources.maxIdleSeconds * 1_000
        : undefined,
    ]);
    const memoryBytes = Math.min(memoryMb * MEBIBYTE, this.maxMemoryBytes);
    const pidsLimit = Math.min(
      environmentPidsLimit,
      environment.process.maxProcesses ?? Number.POSITIVE_INFINITY,
      environment.process.maxThreads ?? Number.POSITIVE_INFINITY,
      this.maxPidsLimit
    );
    const tempBytes = Math.min(
      environment.filesystem.tmpfs?.[0]?.sizeBytes ?? this.maxTempBytes,
      environment.resources.tempBytes ?? Number.POSITIVE_INFINITY,
      this.maxTempBytes
    );
    const cleanupStopTimeoutSeconds = Math.min(
      Math.ceil((environment.lifecycle.stopTimeoutMs ?? 10_000) / 1_000),
      this.maxCleanupStopTimeoutSeconds
    );
    const user = environment.security.runAsGroup
      ? `${runAsUser}:${environment.security.runAsGroup}`
      : runAsUser;
    const createInput: ResolvedDockerExecutionPolicy['createInput'] = {
      image: image.reference,
      imageDigest: image.digest,
      user,
      workingDirectory: resolveContainerWorkingDirectory(this.containerWorkspaceRoot, request.cwd),
      workspaceMount: {
        source: workspaceRoot,
        target: this.containerWorkspaceRoot,
        readOnly: workspaceMount.mode === 'ro',
      },
      networkMode: 'none',
      readOnlyRoot: true,
      cpuCores: Math.min(cpuCores, this.maxCpuCores),
      memoryBytes,
      pidsLimit,
      tempBytes,
      command: [...this.containerCommand],
    };
    const execInput: ResolvedDockerExecutionPolicy['execInput'] = {
      executable: request.executable,
      args: [...(request.args ?? [])],
      workingDirectory: createInput.workingDirectory,
      environment: resolveEnvironment(environment, request.env),
      ...(request.stdin !== undefined ? { stdin: request.stdin } : {}),
      timeoutMs,
      ...(idleTimeoutMs !== undefined ? { idleTimeoutMs } : {}),
      maxStdoutBytes,
      maxStderrBytes,
      maxCombinedOutputBytes,
      signal,
    };

    validateCreateInput({
      ...createInput,
      name: 'hypha-policy-check',
      labels: {},
    });
    validateExecInput({
      ...execInput,
      containerReference: 'hypha-policy-check',
    });
    return { createInput, execInput, cleanupStopTimeoutSeconds };
  }

  private async resolveWorkspaceRoot(): Promise<string> {
    const realRoot = await fs.realpath(this.workspaceRoot);
    const stat = await fs.lstat(realRoot);
    if (!stat.isDirectory()) {
      throw executionProviderError(
        'EXECUTION_WORKSPACE_NOT_FOUND',
        'Configured Docker Workspace root is not a directory.',
        false
      );
    }
    return realRoot;
  }
}

function validateCommandReference(
  environment: ExecutionEnvironmentSpec,
  request: CommandExecutionRequest
): void {
  if (
    request.environmentRef.id !== environment.id ||
    (request.environmentRef.version !== undefined &&
      request.environmentRef.version !== environment.version) ||
    (request.environmentRef.revision !== undefined &&
      request.environmentRef.revision !== environment.revision)
  ) {
    deny(
      'EXECUTION_INVALID_REQUEST',
      'Command environment reference does not match the resolved Docker environment.'
    );
  }
}

function validateCommandPolicy(
  environment: ExecutionEnvironmentSpec,
  request: CommandExecutionRequest
): void {
  if (request.shell) {
    deny('EXECUTION_POLICY_DENIED', 'Docker shell execution is disabled.');
  }
  if (request.secretRefs?.length) {
    deny('EXECUTION_SECRET_DENIED', 'Docker commands cannot receive Secret references.');
  }
  if (request.networkAuthorizationRef) {
    deny(
      'EXECUTION_NETWORK_DENIED',
      'Docker commands cannot authorize networking while the environment is disabled.'
    );
  }
  if (request.snapshotBefore || request.snapshotAfter || request.snapshotOnFailure) {
    deny(
      'EXECUTION_POLICY_DENIED',
      'Docker snapshot references are not implemented by this provider.'
    );
  }
  if (request.expectedWorkspaceSnapshotHash) {
    deny(
      'EXECUTION_POLICY_DENIED',
      'Docker expected Workspace snapshots are not implemented by this provider.'
    );
  }
  validateLiteralArgv([request.executable], 'Docker executable');
  validateLiteralArgv(request.args ?? [], 'Docker executable args', true);
  const allowed = environment.process.allowedExecutables ?? [];
  if (!allowed.includes(request.executable)) {
    deny(
      'EXECUTION_POLICY_DENIED',
      `Executable ${request.executable} is not allowed by the Docker environment.`
    );
  }
  if (environment.process.deniedExecutables?.includes(request.executable)) {
    deny(
      'EXECUTION_POLICY_DENIED',
      `Executable ${request.executable} is explicitly denied by the Docker environment.`
    );
  }
  optionalPositiveSafeInteger(request.timeoutMs, 'timeoutMs');
  optionalPositiveSafeInteger(request.idleTimeoutMs, 'idleTimeoutMs');
  optionalPositiveSafeInteger(request.maxStdoutBytes, 'maxStdoutBytes');
  optionalPositiveSafeInteger(request.maxStderrBytes, 'maxStderrBytes');
}

function resolveContainerWorkingDirectory(root: string, requested?: string): string {
  if (requested?.includes('\\') || requested?.includes('\u0000')) {
    deny('EXECUTION_PATH_DENIED', 'Docker working directory is invalid.');
  }
  const candidate = path.posix.resolve(root, requested ?? '.');
  const relative = path.posix.relative(root, candidate);
  if (relative === '..' || relative.startsWith('../') || path.posix.isAbsolute(relative)) {
    deny('EXECUTION_PATH_ESCAPE', 'Docker working directory escapes the Workspace.');
  }
  return candidate;
}

function resolveEnvironment(
  environment: ExecutionEnvironmentSpec,
  requested: Record<string, string> | undefined
): Record<string, string> {
  const allowed = new Set(environment.process.environmentAllowList ?? []);
  const denied = new Set(environment.process.environmentDenyList ?? []);
  const output: Record<string, string> = {};
  for (const [name, value] of Object.entries(requested ?? {})) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(name) || value.includes('\u0000')) {
      deny('EXECUTION_INVALID_REQUEST', 'Docker environment variable is invalid.');
    }
    if (!allowed.has(name) || denied.has(name)) {
      deny('EXECUTION_POLICY_DENIED', `Environment variable ${name} is not allowed.`);
    }
    output[name] = value;
  }
  return output;
}

function minimumPositive(values: Array<number | undefined>): number {
  return Math.min(...values.filter((value): value is number => value !== undefined));
}

function minimumOptionalPositive(values: Array<number | undefined>): number | undefined {
  const candidates = values.filter((value): value is number => value !== undefined);
  return candidates.length ? Math.min(...candidates) : undefined;
}

function optionalPositiveSafeInteger(value: number | undefined, name: string): void {
  if (value !== undefined) positiveSafeInteger(value, name);
}

function positiveSafeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive safe integer.`);
  }
  return value;
}

function nonNegativeSafeInteger(value: number, name: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative safe integer.`);
  }
  return value;
}

function positiveNumber(value: number, name: string): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be positive.`);
  }
  return value;
}

function deny(
  code:
    | 'EXECUTION_INVALID_REQUEST'
    | 'EXECUTION_POLICY_DENIED'
    | 'EXECUTION_PATH_DENIED'
    | 'EXECUTION_PATH_ESCAPE'
    | 'EXECUTION_ENVIRONMENT_UNAVAILABLE'
    | 'EXECUTION_IMAGE_UNTRUSTED'
    | 'EXECUTION_NETWORK_DENIED'
    | 'EXECUTION_SECRET_DENIED',
  message: string
): never {
  throw executionProviderError(code, message, false);
}
