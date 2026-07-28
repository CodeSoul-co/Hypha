import { constants as fsConstants } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import type { CommandExecutionRequest, ExecutionEnvironmentSpec } from '@hypha/core';
import { executionProviderError } from './execution-provider-error';

export interface LocalProcessPolicyResolverOptions {
  workspaceRoot: string;
  executables: Record<string, string>;
  baseEnvironment?: Record<string, string>;
  inheritEnvironment?: string[];
  maxExecutionTimeoutMs?: number;
  maxStdoutBytes?: number;
  maxStderrBytes?: number;
  maxCombinedOutputBytes?: number;
}

export interface ResolvedLocalProcessPolicy {
  executable: string;
  cwd: string;
  environment: NodeJS.ProcessEnv;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

/** Resolves untrusted command input into an explicit, host-local execution policy. */
export class LocalProcessPolicyResolver {
  readonly workspaceRoot: string;
  private readonly executables: Readonly<Record<string, string>>;
  private readonly baseEnvironment: Readonly<Record<string, string>>;
  private readonly inheritEnvironment: readonly string[];
  private readonly maxExecutionTimeoutMs: number;
  private readonly maxStdoutBytes: number;
  private readonly maxStderrBytes: number;
  private readonly maxCombinedOutputBytes: number;

  constructor(options: LocalProcessPolicyResolverOptions) {
    if (!options.workspaceRoot.trim()) throw new Error('workspaceRoot is required.');
    if (!Object.keys(options.executables).length) {
      throw new Error('At least one explicitly mapped executable is required.');
    }
    for (const [alias, executable] of Object.entries(options.executables)) {
      validateEnvironmentName(alias, 'Executable alias');
      if (!path.isAbsolute(executable)) {
        throw new Error(`Executable mapping ${alias} must use an absolute path.`);
      }
    }
    for (const name of Object.keys(options.baseEnvironment ?? {})) {
      validateEnvironmentName(name, 'Base environment variable');
    }
    for (const name of options.inheritEnvironment ?? []) {
      validateEnvironmentName(name, 'Inherited environment variable');
    }

    this.workspaceRoot = path.resolve(options.workspaceRoot);
    this.executables = Object.fromEntries(
      Object.entries(options.executables).map(([alias, executable]) => [
        alias,
        path.resolve(executable),
      ])
    );
    this.baseEnvironment = { ...(options.baseEnvironment ?? {}) };
    this.inheritEnvironment = [...new Set(options.inheritEnvironment ?? [])];
    this.maxExecutionTimeoutMs = positiveInteger(
      options.maxExecutionTimeoutMs ?? 300_000,
      'maxExecutionTimeoutMs'
    );
    this.maxStdoutBytes = positiveInteger(
      options.maxStdoutBytes ?? 4 * 1024 * 1024,
      'maxStdoutBytes'
    );
    this.maxStderrBytes = positiveInteger(
      options.maxStderrBytes ?? 4 * 1024 * 1024,
      'maxStderrBytes'
    );
    this.maxCombinedOutputBytes = positiveInteger(
      options.maxCombinedOutputBytes ?? 8 * 1024 * 1024,
      'maxCombinedOutputBytes'
    );
  }

  validateEnvironment(environment: ExecutionEnvironmentSpec): void {
    if (environment.provider !== 'local_process') {
      throw executionProviderError(
        'EXECUTION_ENVIRONMENT_UNAVAILABLE',
        `Local Process provider cannot create ${environment.provider} environments.`,
        false
      );
    }
    if (environment.process.shellEnabled) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Local Process provider does not support shell execution.',
        false
      );
    }
    if (!environment.process.allowedExecutables?.length) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Local Process environments require an explicit executable allowlist.',
        false
      );
    }
    if (environment.process.executableResolution === 'container_path') {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'container_path executable resolution is not valid for Local Process execution.',
        false
      );
    }
    if (environment.process.allowBackgroundProcesses || environment.process.allowDaemonization) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Background processes and daemonization are disabled for Local Process execution.',
        false
      );
    }
    if (environment.secrets.injectionMode !== 'none') {
      throw executionProviderError(
        'EXECUTION_SECRET_DENIED',
        'Local Process provider does not inject secrets.',
        false
      );
    }
  }

  async resolve(
    environment: ExecutionEnvironmentSpec,
    request: CommandExecutionRequest
  ): Promise<ResolvedLocalProcessPolicy> {
    if (request.shell) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Shell execution is disabled.',
        false
      );
    }
    if (request.secretRefs?.length) {
      throw executionProviderError(
        'EXECUTION_SECRET_DENIED',
        'Local Process commands cannot receive secret references.',
        false
      );
    }
    if (request.snapshotBefore || request.snapshotAfter || request.snapshotOnFailure) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'Local Process provider does not claim Workspace snapshot capability.',
        false
      );
    }

    const executable = await this.resolveExecutable(environment, request.executable);
    const cwd = await this.resolveWorkingDirectory(request.cwd);
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
    const maxStdoutBytes = minimumPositive([
      request.maxStdoutBytes,
      environment.resources.maxStdoutBytes,
      this.maxStdoutBytes,
    ]);
    const maxStderrBytes = minimumPositive([
      request.maxStderrBytes,
      environment.resources.maxStderrBytes,
      this.maxStderrBytes,
    ]);
    const maxCombinedOutputBytes = minimumPositive([
      environment.resources.maxCombinedOutputBytes,
      this.maxCombinedOutputBytes,
      maxStdoutBytes + maxStderrBytes,
    ]);

    return {
      executable,
      cwd,
      environment: this.buildEnvironment(environment, request.env),
      timeoutMs,
      ...(idleTimeoutMs ? { idleTimeoutMs } : {}),
      maxStdoutBytes,
      maxStderrBytes,
      maxCombinedOutputBytes,
    };
  }

  async assertSurfaceAvailable(): Promise<void> {
    await fs.access(this.workspaceRoot, fsConstants.R_OK | fsConstants.W_OK);
    await Promise.all(
      Object.values(this.executables).map((executable) =>
        fs.access(executable, process.platform === 'win32' ? fsConstants.F_OK : fsConstants.X_OK)
      )
    );
  }

  private async resolveExecutable(
    environment: ExecutionEnvironmentSpec,
    requested: string
  ): Promise<string> {
    const resolution = environment.process.executableResolution;
    if (resolution === 'absolute_allowlist' && !path.isAbsolute(requested)) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'This environment requires an absolute executable path.',
        false
      );
    }
    if (resolution === 'path_allowlist' && path.isAbsolute(requested)) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        'This environment requires a configured executable alias.',
        false
      );
    }
    const configured = path.isAbsolute(requested)
      ? Object.entries(this.executables).find(([, value]) => samePath(value, requested))
      : requested in this.executables
        ? ([requested, this.executables[requested]] as const)
        : undefined;
    if (!configured) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is not mapped by the Local Process provider.`,
        false
      );
    }
    const [alias, configuredPath] = configured;
    const allowed = environment.process.allowedExecutables ?? [];
    if (!allowed.some((entry) => entry === alias || samePath(entry, configuredPath))) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is not allowed by the execution environment.`,
        false
      );
    }
    const denied = environment.process.deniedExecutables ?? [];
    if (denied.some((entry) => entry === alias || samePath(entry, configuredPath))) {
      throw executionProviderError(
        'EXECUTION_POLICY_DENIED',
        `Executable ${requested} is explicitly denied by the execution environment.`,
        false
      );
    }
    const realExecutable = await fs.realpath(configuredPath);
    await fs.access(
      realExecutable,
      process.platform === 'win32' ? fsConstants.F_OK : fsConstants.X_OK
    );
    return realExecutable;
  }

  private async resolveWorkingDirectory(requested?: string): Promise<string> {
    const candidate = path.resolve(this.workspaceRoot, requested ?? '.');
    assertWithin(candidate, this.workspaceRoot, 'Working directory');
    const [realRoot, realCandidate] = await Promise.all([
      fs.realpath(this.workspaceRoot),
      fs.realpath(candidate),
    ]);
    assertWithin(realCandidate, realRoot, 'Working directory');
    const stat = await fs.stat(realCandidate);
    if (!stat.isDirectory()) {
      throw executionProviderError(
        'EXECUTION_PATH_DENIED',
        'Command working directory must be a directory.',
        false
      );
    }
    return realCandidate;
  }

  private buildEnvironment(
    environment: ExecutionEnvironmentSpec,
    requested?: Record<string, string>
  ): NodeJS.ProcessEnv {
    const allowed = normalizedNameSet(environment.process.environmentAllowList ?? []);
    const denied = normalizedNameSet(environment.process.environmentDenyList ?? []);
    const output: NodeJS.ProcessEnv = {};
    const accept = (name: string, value: string | undefined): void => {
      validateEnvironmentName(name, 'Environment variable');
      const normalized = normalizeEnvironmentName(name);
      if (allowed.has(normalized) && !denied.has(normalized) && value !== undefined) {
        output[name] = value;
      }
    };
    for (const [name, value] of Object.entries(this.baseEnvironment)) accept(name, value);
    for (const name of this.inheritEnvironment) accept(name, process.env[name]);
    for (const [name, value] of Object.entries(requested ?? {})) {
      validateEnvironmentName(name, 'Environment variable');
      const normalized = normalizeEnvironmentName(name);
      if (!allowed.has(normalized) || denied.has(normalized)) {
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
}

function assertWithin(candidate: string, root: string, subject: string): void {
  const relative = path.relative(root, candidate);
  if (
    relative === '' ||
    (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))
  ) {
    return;
  }
  throw executionProviderError(
    'EXECUTION_PATH_ESCAPE',
    `${subject} escapes the Workspace root.`,
    false
  );
}

function samePath(left: string, right: string): boolean {
  const normalizedLeft = path.resolve(left);
  const normalizedRight = path.resolve(right);
  return process.platform === 'win32'
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight;
}

function validateEnvironmentName(value: string, subject: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
    throw new Error(`${subject} ${JSON.stringify(value)} is invalid.`);
  }
}

function normalizeEnvironmentName(value: string): string {
  return process.platform === 'win32' ? value.toUpperCase() : value;
}

function normalizedNameSet(values: readonly string[]): Set<string> {
  for (const value of values) validateEnvironmentName(value, 'Environment variable');
  return new Set(values.map(normalizeEnvironmentName));
}

function minimumPositive(values: Array<number | undefined>): number {
  return Math.min(...values.filter((value): value is number => value !== undefined && value > 0));
}

function minimumOptionalPositive(values: Array<number | undefined>): number | undefined {
  const candidates = values.filter((value): value is number => value !== undefined && value > 0);
  return candidates.length ? Math.min(...candidates) : undefined;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer.`);
  }
  return value;
}
