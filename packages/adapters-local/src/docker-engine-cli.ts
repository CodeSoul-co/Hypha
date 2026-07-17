import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import path from 'node:path';

export type DockerCommandTerminationReason =
  | 'cancelled'
  | 'timed_out'
  | 'stdout_limit'
  | 'stderr_limit'
  | 'combined_output_limit'
  | 'start_failed';

export interface DockerCommandRequest {
  args: string[];
  stdin?: string | Uint8Array;
  signal?: AbortSignal;
  timeoutMs: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

export interface DockerCommandResult {
  exitCode: number | null;
  signal?: string;
  stdout: string;
  stderr: string;
  observedStdoutBytes: number;
  observedStderrBytes: number;
  terminationReason?: DockerCommandTerminationReason;
  startedAt: string;
  completedAt: string;
  latencyMs: number;
}

export interface DockerCommandRunner {
  run(request: DockerCommandRequest): Promise<DockerCommandResult>;
}

export interface DockerCliCommandRunnerOptions {
  dockerPath: string;
  environment?: Record<string, string>;
  now?: () => string;
  monotonicNow?: () => number;
}

export class DockerCliCommandRunner implements DockerCommandRunner {
  private readonly dockerPath: string;
  private readonly environment: Readonly<Record<string, string>>;
  private readonly now: () => string;
  private readonly monotonicNow: () => number;

  constructor(options: DockerCliCommandRunnerOptions) {
    if (!path.isAbsolute(options.dockerPath)) {
      throw new Error('dockerPath must be an absolute executable path.');
    }
    this.dockerPath = path.resolve(options.dockerPath);
    this.environment = { ...(options.environment ?? {}) };
    this.now = options.now ?? (() => new Date().toISOString());
    this.monotonicNow = options.monotonicNow ?? (() => performance.now());
  }

  run(request: DockerCommandRequest): Promise<DockerCommandResult> {
    validateCommandRequest(request);
    const startedAt = this.now();
    const startedTick = this.monotonicNow();
    return new Promise((resolve) => {
      let child: ChildProcessWithoutNullStreams | undefined;
      let settled = false;
      let terminationReason: DockerCommandTerminationReason | undefined;
      let observedStdoutBytes = 0;
      let observedStderrBytes = 0;
      let capturedStdoutBytes = 0;
      let capturedStderrBytes = 0;
      const stdout: Buffer[] = [];
      const stderr: Buffer[] = [];

      const requestTermination = (reason: DockerCommandTerminationReason): void => {
        if (terminationReason) return;
        terminationReason = reason;
        try {
          child?.kill('SIGKILL');
        } catch {
          // The CLI may already have exited; provider cleanup reconciles Docker resources.
        }
      };

      const appendOutput = (stream: 'stdout' | 'stderr', chunk: Buffer): void => {
        if (stream === 'stdout') observedStdoutBytes += chunk.byteLength;
        else observedStderrBytes += chunk.byteLength;
        const currentBytes = stream === 'stdout' ? capturedStdoutBytes : capturedStderrBytes;
        const streamLimit = stream === 'stdout' ? request.maxStdoutBytes : request.maxStderrBytes;
        const combinedCaptured = capturedStdoutBytes + capturedStderrBytes;
        const remaining = Math.max(
          0,
          Math.min(streamLimit - currentBytes, request.maxCombinedOutputBytes - combinedCaptured)
        );
        if (remaining > 0) {
          const captured = chunk.subarray(0, remaining);
          if (stream === 'stdout') {
            stdout.push(captured);
            capturedStdoutBytes += captured.byteLength;
          } else {
            stderr.push(captured);
            capturedStderrBytes += captured.byteLength;
          }
        }
        if (observedStdoutBytes + observedStderrBytes > request.maxCombinedOutputBytes) {
          requestTermination('combined_output_limit');
        } else if (stream === 'stdout' && observedStdoutBytes > request.maxStdoutBytes) {
          requestTermination('stdout_limit');
        } else if (stream === 'stderr' && observedStderrBytes > request.maxStderrBytes) {
          requestTermination('stderr_limit');
        }
      };

      const finish = (exitCode: number | null, signal: NodeJS.Signals | null): void => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        request.signal?.removeEventListener('abort', onAbort);
        resolve({
          exitCode,
          ...(signal ? { signal } : {}),
          stdout: Buffer.concat(stdout).toString('utf8'),
          stderr: Buffer.concat(stderr).toString('utf8'),
          observedStdoutBytes,
          observedStderrBytes,
          ...(terminationReason ? { terminationReason } : {}),
          startedAt,
          completedAt: this.now(),
          latencyMs: Math.max(0, this.monotonicNow() - startedTick),
        });
      };

      const onAbort = (): void => requestTermination('cancelled');
      const timeout = setTimeout(() => requestTermination('timed_out'), request.timeoutMs);
      try {
        child = spawn(this.dockerPath, request.args, {
          env: this.environment,
          shell: false,
          windowsHide: true,
          stdio: ['pipe', 'pipe', 'pipe'],
        });
      } catch {
        terminationReason = 'start_failed';
        finish(null, null);
        return;
      }
      request.signal?.addEventListener('abort', onAbort, { once: true });
      child.stdout.on('data', (chunk: Buffer) => appendOutput('stdout', chunk));
      child.stderr.on('data', (chunk: Buffer) => appendOutput('stderr', chunk));
      child.once('error', () => {
        terminationReason ??= 'start_failed';
        finish(null, null);
      });
      child.once('close', (exitCode, signal) => finish(exitCode, signal));
      if (request.signal?.aborted) onAbort();
      if (request.stdin !== undefined) child.stdin.end(request.stdin);
      else child.stdin.end();
    });
  }
}

export interface DockerContainerMount {
  source: string;
  target: string;
  readOnly: boolean;
}

export interface DockerContainerTmpfs {
  target: string;
  sizeBytes?: number;
  noExec?: boolean;
  noSuid?: boolean;
  noDev?: boolean;
}

export interface DockerContainerCreateInput {
  name: string;
  image: string;
  command: string[];
  user: string;
  workspaceMount: DockerContainerMount;
  tmpfs?: DockerContainerTmpfs[];
  network: 'none' | 'bridge';
  cpuCores: number;
  memoryBytes: number;
  memorySwapBytes?: number;
  pidsLimit: number;
  maxOpenFiles?: number;
  platform?: string;
  pullPolicy: 'never' | 'missing' | 'always';
  stopTimeoutSeconds: number;
  labels: Record<string, string>;
}

export interface DockerContainerExecInput {
  containerId: string;
  executable: string;
  args: string[];
  cwd: string;
  environment: Record<string, string>;
  stdin?: string | Uint8Array;
  signal: AbortSignal;
  timeoutMs: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
}

export interface DockerContainerInspection {
  id: string;
  imageId: string;
  name: string;
  running: boolean;
  status: string;
  exitCode: number;
  oomKilled: boolean;
  startedAt?: string;
  finishedAt?: string;
}

export interface DockerImageInspection {
  id: string;
  repoDigests: string[];
}

export interface DockerContainerStats {
  cpuPercentage?: number;
  memoryUsageBytes?: number;
  memoryLimitBytes?: number;
  networkBytesReceived?: number;
  networkBytesSent?: number;
  readBytes?: number;
  writtenBytes?: number;
  pids?: number;
}

export interface DockerEngineClient {
  health(): Promise<{ serverVersion: string }>;
  inspectImage(reference: string): Promise<DockerImageInspection>;
  createContainer(input: DockerContainerCreateInput): Promise<string>;
  startContainer(containerId: string): Promise<void>;
  execute(input: DockerContainerExecInput): Promise<DockerCommandResult>;
  inspectContainer(containerId: string): Promise<DockerContainerInspection | null>;
  statsContainer(containerId: string): Promise<DockerContainerStats>;
  stopContainer(containerId: string, timeoutSeconds: number): Promise<void>;
  killContainer(containerId: string): Promise<void>;
  removeContainer(containerId: string): Promise<void>;
}

export interface DockerEngineCliOptions {
  runner: DockerCommandRunner;
  managementTimeoutMs?: number;
  managementOutputBytes?: number;
}

export class DockerEngineCli implements DockerEngineClient {
  private readonly runner: DockerCommandRunner;
  private readonly managementTimeoutMs: number;
  private readonly managementOutputBytes: number;

  constructor(options: DockerEngineCliOptions) {
    this.runner = options.runner;
    this.managementTimeoutMs = positiveInteger(
      options.managementTimeoutMs ?? 30_000,
      'managementTimeoutMs'
    );
    this.managementOutputBytes = positiveInteger(
      options.managementOutputBytes ?? 1024 * 1024,
      'managementOutputBytes'
    );
  }

  async health(): Promise<{ serverVersion: string }> {
    const result = await this.manage(['version', '--format', '{{json .Server.Version}}']);
    const serverVersion = parseJsonString(result.stdout, 'Docker server version');
    return { serverVersion };
  }

  async inspectImage(reference: string): Promise<DockerImageInspection> {
    const result = await this.manage(['image', 'inspect', reference]);
    const value = parseJsonArray(result.stdout, 'Docker image inspection')[0];
    if (!value || typeof value !== 'object') throw dockerError('Invalid Docker image inspection.');
    const record = value as Record<string, unknown>;
    return {
      id: requiredString(record.Id, 'Docker image Id'),
      repoDigests: Array.isArray(record.RepoDigests)
        ? record.RepoDigests.filter((entry): entry is string => typeof entry === 'string')
        : [],
    };
  }

  async createContainer(input: DockerContainerCreateInput): Promise<string> {
    validateCreateInput(input);
    const args = ['container', 'create', '--name', input.name];
    for (const [name, value] of Object.entries(input.labels).sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      args.push('--label', `${name}=${value}`);
    }
    args.push(
      '--init',
      '--read-only',
      '--network',
      input.network,
      '--cap-drop',
      'ALL',
      '--security-opt',
      'no-new-privileges',
      '--user',
      input.user,
      '--restart',
      'no',
      '--cpus',
      String(input.cpuCores),
      '--memory',
      String(input.memoryBytes),
      '--pids-limit',
      String(input.pidsLimit),
      '--stop-timeout',
      String(input.stopTimeoutSeconds),
      '--pull',
      input.pullPolicy,
      '--mount',
      formatMount(input.workspaceMount)
    );
    if (input.memorySwapBytes !== undefined) {
      args.push('--memory-swap', String(input.memorySwapBytes));
    }
    if (input.maxOpenFiles !== undefined) {
      args.push('--ulimit', `nofile=${input.maxOpenFiles}:${input.maxOpenFiles}`);
    }
    if (input.platform) args.push('--platform', input.platform);
    for (const tmpfs of input.tmpfs ?? []) args.push('--tmpfs', formatTmpfs(tmpfs));
    args.push(input.image, ...input.command);
    const result = await this.manage(args);
    const id = result.stdout.trim();
    if (!id) throw dockerError('Docker create returned no container id.');
    return id;
  }

  async startContainer(containerId: string): Promise<void> {
    await this.manage(['container', 'start', safeIdentifier(containerId, 'containerId')]);
  }

  execute(input: DockerContainerExecInput): Promise<DockerCommandResult> {
    safeIdentifier(input.containerId, 'containerId');
    safeContainerPath(input.cwd, 'cwd');
    if (!input.executable.trim()) throw new Error('executable is required.');
    const args = ['container', 'exec', '--workdir', input.cwd];
    if (input.stdin !== undefined) args.push('--interactive');
    for (const [name, value] of Object.entries(input.environment).sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      validateEnvironmentName(name);
      args.push('--env', `${name}=${value}`);
    }
    args.push(input.containerId, input.executable, ...input.args);
    return this.runner.run({
      args,
      ...(input.stdin !== undefined ? { stdin: input.stdin } : {}),
      signal: input.signal,
      timeoutMs: input.timeoutMs,
      maxStdoutBytes: input.maxStdoutBytes,
      maxStderrBytes: input.maxStderrBytes,
      maxCombinedOutputBytes: input.maxCombinedOutputBytes,
    });
  }

  async inspectContainer(containerId: string): Promise<DockerContainerInspection | null> {
    const result = await this.runManagement([
      'container',
      'inspect',
      safeIdentifier(containerId, 'containerId'),
    ]);
    if (result.exitCode !== 0) return null;
    const value = parseJsonArray(result.stdout, 'Docker container inspection')[0];
    if (!value || typeof value !== 'object') {
      throw dockerError('Invalid Docker container inspection.');
    }
    const record = value as Record<string, unknown>;
    const state = asRecord(record.State, 'Docker container State');
    return {
      id: requiredString(record.Id, 'Docker container Id'),
      imageId: requiredString(record.Image, 'Docker container Image'),
      name: requiredString(record.Name, 'Docker container Name').replace(/^\//u, ''),
      running: requiredBoolean(state.Running, 'Docker container Running'),
      status: requiredString(state.Status, 'Docker container Status'),
      exitCode: requiredNumber(state.ExitCode, 'Docker container ExitCode'),
      oomKilled: requiredBoolean(state.OOMKilled, 'Docker container OOMKilled'),
      ...(optionalTimestamp(state.StartedAt)
        ? { startedAt: optionalTimestamp(state.StartedAt) }
        : {}),
      ...(optionalTimestamp(state.FinishedAt)
        ? { finishedAt: optionalTimestamp(state.FinishedAt) }
        : {}),
    };
  }

  async statsContainer(containerId: string): Promise<DockerContainerStats> {
    const result = await this.manage([
      'container',
      'stats',
      '--no-stream',
      '--format',
      '{{json .}}',
      safeIdentifier(containerId, 'containerId'),
    ]);
    let parsed: unknown;
    try {
      parsed = JSON.parse(result.stdout.trim());
    } catch {
      throw dockerError('Docker container stats are not valid JSON.', result);
    }
    const stats = asRecord(parsed, 'Docker container stats');
    const [memoryUsageBytes, memoryLimitBytes] = parseSizePair(stats.MemUsage);
    const [networkBytesReceived, networkBytesSent] = parseSizePair(stats.NetIO);
    const [readBytes, writtenBytes] = parseSizePair(stats.BlockIO);
    return compact({
      cpuPercentage: parsePercentage(stats.CPUPerc),
      memoryUsageBytes,
      memoryLimitBytes,
      networkBytesReceived,
      networkBytesSent,
      readBytes,
      writtenBytes,
      pids: parseNonNegativeInteger(stats.PIDs),
    });
  }

  async stopContainer(containerId: string, timeoutSeconds: number): Promise<void> {
    await this.manage([
      'container',
      'stop',
      '--timeout',
      String(nonNegativeInteger(timeoutSeconds, 'timeoutSeconds')),
      safeIdentifier(containerId, 'containerId'),
    ]);
  }

  async killContainer(containerId: string): Promise<void> {
    await this.manage(['container', 'kill', safeIdentifier(containerId, 'containerId')]);
  }

  async removeContainer(containerId: string): Promise<void> {
    const result = await this.runManagement([
      'container',
      'rm',
      '--force',
      '--volumes',
      safeIdentifier(containerId, 'containerId'),
    ]);
    if (result.exitCode !== 0 && !isMissingContainer(result.stderr)) {
      throw dockerCommandError(result);
    }
  }

  private async manage(args: string[]): Promise<DockerCommandResult> {
    const result = await this.runManagement(args);
    if (result.exitCode !== 0 || result.terminationReason) throw dockerCommandError(result);
    return result;
  }

  private runManagement(args: string[]): Promise<DockerCommandResult> {
    return this.runner.run({
      args,
      timeoutMs: this.managementTimeoutMs,
      maxStdoutBytes: this.managementOutputBytes,
      maxStderrBytes: this.managementOutputBytes,
      maxCombinedOutputBytes: this.managementOutputBytes,
    });
  }
}

export class DockerEngineCliError extends Error {
  constructor(
    message: string,
    readonly result?: DockerCommandResult
  ) {
    super(message);
    this.name = 'DockerEngineCliError';
  }
}

function validateCommandRequest(request: DockerCommandRequest): void {
  for (const [name, value] of Object.entries({
    timeoutMs: request.timeoutMs,
    maxStdoutBytes: request.maxStdoutBytes,
    maxStderrBytes: request.maxStderrBytes,
    maxCombinedOutputBytes: request.maxCombinedOutputBytes,
  })) {
    positiveInteger(value, name);
  }
}

function validateCreateInput(input: DockerContainerCreateInput): void {
  safeIdentifier(input.name, 'container name');
  if (!input.image.includes('@sha256:')) {
    throw new Error('Docker image must be pinned with an @sha256 digest.');
  }
  if (!input.command.length || input.command.some((entry) => !entry.length)) {
    throw new Error('Docker keep-alive command must contain non-empty arguments.');
  }
  if (!/^\d+(?::\d+)?$/u.test(input.user)) {
    throw new Error('Docker user must be an explicit numeric uid or uid:gid.');
  }
  positiveNumber(input.cpuCores, 'cpuCores');
  positiveInteger(input.memoryBytes, 'memoryBytes');
  positiveInteger(input.pidsLimit, 'pidsLimit');
  nonNegativeInteger(input.stopTimeoutSeconds, 'stopTimeoutSeconds');
  if (input.memorySwapBytes !== undefined && input.memorySwapBytes < input.memoryBytes) {
    throw new Error('memorySwapBytes must be greater than or equal to memoryBytes.');
  }
  formatMount(input.workspaceMount);
  for (const tmpfs of input.tmpfs ?? []) formatTmpfs(tmpfs);
}

function formatMount(mount: DockerContainerMount): string {
  if (!path.isAbsolute(mount.source)) throw new Error('Workspace mount source must be absolute.');
  safeDockerOptionValue(mount.source, 'Workspace mount source');
  safeContainerPath(mount.target, 'Workspace mount target');
  return `type=bind,src=${mount.source},dst=${mount.target},${mount.readOnly ? 'readonly' : 'rw'},bind-propagation=rprivate`;
}

function formatTmpfs(tmpfs: DockerContainerTmpfs): string {
  safeContainerPath(tmpfs.target, 'tmpfs target');
  const options = ['rw'];
  if (tmpfs.sizeBytes !== undefined)
    options.push(`size=${positiveInteger(tmpfs.sizeBytes, 'sizeBytes')}`);
  if (tmpfs.noExec) options.push('noexec');
  if (tmpfs.noSuid) options.push('nosuid');
  if (tmpfs.noDev) options.push('nodev');
  return `${tmpfs.target}:${options.join(',')}`;
}

function safeIdentifier(value: string, name: string): string {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/u.test(value)) {
    throw new Error(`${name} contains unsupported characters.`);
  }
  return value;
}

function safeContainerPath(value: string, name: string): string {
  if (!value.startsWith('/') || value.includes('\0') || value.includes(',')) {
    throw new Error(`${name} must be an absolute container path without null bytes or commas.`);
  }
  const segments = value.split('/');
  if (segments.includes('..')) throw new Error(`${name} must not contain traversal segments.`);
  return value;
}

function safeDockerOptionValue(value: string, name: string): string {
  if (/[\0\r\n,]/u.test(value)) throw new Error(`${name} contains unsupported characters.`);
  return value;
}

function validateEnvironmentName(value: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/u.test(value)) {
    throw new Error(`Invalid environment variable name ${value}.`);
  }
}

function parseJsonString(value: string, name: string): string {
  try {
    return requiredString(JSON.parse(value), name);
  } catch (error) {
    if (error instanceof DockerEngineCliError) throw error;
    throw dockerError(`${name} is not valid JSON.`);
  }
}

function parseJsonArray(value: string, name: string): unknown[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) throw dockerError(`${name} must be an array.`);
    return parsed;
  } catch (error) {
    if (error instanceof DockerEngineCliError) throw error;
    throw dockerError(`${name} is not valid JSON.`);
  }
}

function asRecord(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw dockerError(`${name} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function requiredString(value: unknown, name: string): string {
  if (typeof value !== 'string' || !value) throw dockerError(`${name} must be a string.`);
  return value;
}

function requiredBoolean(value: unknown, name: string): boolean {
  if (typeof value !== 'boolean') throw dockerError(`${name} must be a boolean.`);
  return value;
}

function requiredNumber(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw dockerError(`${name} must be a number.`);
  }
  return value;
}

function optionalTimestamp(value: unknown): string | undefined {
  return typeof value === 'string' && value && !value.startsWith('0001-') ? value : undefined;
}

function parsePercentage(value: unknown): number | undefined {
  if (typeof value !== 'string') return undefined;
  const parsed = Number(value.trim().replace(/%$/u, ''));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseSizePair(value: unknown): [number | undefined, number | undefined] {
  if (typeof value !== 'string') return [undefined, undefined];
  const [first, second] = value.split('/').map((entry) => entry.trim());
  return [parseDockerSize(first), parseDockerSize(second)];
}

function parseDockerSize(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = /^([0-9]+(?:\.[0-9]+)?)\s*([kmgtpe]?i?b)$/iu.exec(value);
  if (!match) return undefined;
  const amount = Number(match[1]);
  const unit = match[2]!.toLowerCase();
  const binary = unit.includes('i');
  const exponent = ['', 'k', 'm', 'g', 't', 'p', 'e'].indexOf(unit[0] === 'b' ? '' : unit[0]!);
  if (exponent < 0) return undefined;
  return Math.round(amount * (binary ? 1024 : 1000) ** exponent);
}

function parseNonNegativeInteger(value: unknown): number | undefined {
  const parsed =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined;
}

function compact<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as T;
}

function positiveInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value <= 0)
    throw new Error(`${name} must be a positive integer.`);
  return value;
}

function nonNegativeInteger(value: number, name: string): number {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return value;
}

function positiveNumber(value: number, name: string): number {
  if (!Number.isFinite(value) || value <= 0) throw new Error(`${name} must be positive.`);
  return value;
}

function isMissingContainer(stderr: string): boolean {
  return /no such container/iu.test(stderr);
}

function dockerCommandError(result: DockerCommandResult): DockerEngineCliError {
  const reason = result.terminationReason ?? `exit ${String(result.exitCode)}`;
  return dockerError(`Docker CLI command failed (${reason}).`, result);
}

function dockerError(message: string, result?: DockerCommandResult): DockerEngineCliError {
  return new DockerEngineCliError(message, result);
}
