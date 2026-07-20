import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';

const DEFAULT_COMMAND_TIMEOUT_MS = 10_000;
const DEFAULT_CREATE_TIMEOUT_MS = 30_000;
const DEFAULT_TMPFS_BYTES = 16 * 1024 * 1024;
const DEFAULT_STDOUT_BYTES = 4 * 1024 * 1024;
const DEFAULT_STDERR_BYTES = 1024 * 1024;

export interface DockerBindMount {
  source: string;
  target: string;
  readOnly: boolean;
}

export interface DockerContainerCreateInput {
  name: string;
  image: string;
  imageDigest: string;
  user: string;
  workingDirectory: string;
  workspaceMount: DockerBindMount;
  networkMode: 'none' | 'bridge';
  readOnlyRoot: boolean;
  cpuCores?: number;
  memoryBytes?: number;
  pidsLimit?: number;
  tempBytes?: number;
  labels: Record<string, string>;
}

export interface DockerContainerExecInput {
  containerId: string;
  executable: string;
  args: string[];
  workingDirectory: string;
  /** Values must already be policy-approved and must not contain secrets. */
  environment: Record<string, string>;
  stdin?: string | Uint8Array;
  timeoutMs: number;
  idleTimeoutMs?: number;
  maxStdoutBytes: number;
  maxStderrBytes: number;
  maxCombinedOutputBytes: number;
  signal: AbortSignal;
}

export interface DockerContainerInspection {
  id: string;
  running: boolean;
  oomKilled: boolean;
  status: string;
  exitCode: number;
  imageDigest: string;
  startedAt?: string;
  finishedAt?: string;
}

export interface DockerResourceSnapshot {
  memoryBytes?: number;
  cpuPercent?: number;
  processCount?: number;
  blockReadBytes?: number;
  blockWriteBytes?: number;
}

export interface DockerEngineClient {
  health(): Promise<{ serverVersion: string }>;
  inspectImage(reference: string): Promise<{ id: string; repoDigests: string[] }>;
  createContainer(input: DockerContainerCreateInput): Promise<string>;
  startContainer(containerId: string): Promise<void>;
  execute(input: DockerContainerExecInput): Promise<DockerCliResult>;
  inspectContainer(containerId: string): Promise<DockerContainerInspection | null>;
  resourceSnapshot(containerId: string): Promise<DockerResourceSnapshot>;
  stopContainer(containerId: string, timeoutSeconds: number): Promise<void>;
  killContainer(containerId: string): Promise<void>;
  removeContainer(containerId: string): Promise<void>;
}

export type DockerEngineClientErrorCode = 'DOCKER_COMMAND_FAILED' | 'DOCKER_INVALID_RESPONSE';

export class DockerEngineClientError extends Error {
  readonly name = 'DockerEngineClientError';

  constructor(
    message: string,
    readonly code: DockerEngineClientErrorCode,
    readonly command: string,
    readonly evidence: {
      outcome?: DockerCliResult['outcome'];
      exitCode?: number | null;
      startErrorCode?: string;
    } = {}
  ) {
    super(message);
  }
}

export class DockerEngineCliClient implements DockerEngineClient {
  constructor(private readonly transport: DockerCommandTransport) {}

  async health(): Promise<{ serverVersion: string }> {
    const result = await this.command(['version', '--format', '{{.Server.Version}}']);
    return { serverVersion: requiredString(result.stdout.trim(), 'Docker server version') };
  }

  async inspectImage(reference: string): Promise<{ id: string; repoDigests: string[] }> {
    validateImageReference(reference);
    const result = await this.command(['image', 'inspect', reference, '--format', '{{json .}}']);
    const value = parseRecord(result.stdout, 'Docker image inspection', 'image inspect');
    return {
      id: requiredString(value.Id, 'Docker image Id'),
      repoDigests: Array.isArray(value.RepoDigests)
        ? value.RepoDigests.filter((entry): entry is string => typeof entry === 'string')
        : [],
    };
  }

  async createContainer(input: DockerContainerCreateInput): Promise<string> {
    validateCreateInput(input);
    const args = [
      'create',
      '--name',
      input.name,
      '--user',
      input.user,
      '--workdir',
      input.workingDirectory,
      '--network',
      input.networkMode,
      '--cap-drop',
      'ALL',
      '--security-opt',
      'no-new-privileges=true',
      '--mount',
      formatMount(input.workspaceMount),
      '--tmpfs',
      `/tmp:rw,noexec,nosuid,nodev,size=${input.tempBytes ?? DEFAULT_TMPFS_BYTES}`,
      '--init',
      ...(input.readOnlyRoot ? ['--read-only'] : []),
      ...(input.cpuCores !== undefined ? ['--cpus', String(input.cpuCores)] : []),
      ...(input.memoryBytes !== undefined ? ['--memory', String(input.memoryBytes)] : []),
      ...(input.pidsLimit !== undefined ? ['--pids-limit', String(input.pidsLimit)] : []),
    ];
    for (const [name, value] of Object.entries(input.labels).sort(([left], [right]) =>
      left.localeCompare(right)
    )) {
      validateLabel(name, value);
      args.push('--label', `${name}=${value}`);
    }
    args.push(`${input.image}@${input.imageDigest}`, 'sleep', 'infinity');
    const result = await this.command(args, DEFAULT_CREATE_TIMEOUT_MS);
    return requiredString(result.stdout.trim(), 'Docker container Id');
  }

  async startContainer(containerId: string): Promise<void> {
    await this.command(['start', safeContainerId(containerId)]);
  }

  async execute(input: DockerContainerExecInput): Promise<DockerCliResult> {
    validateExecInput(input);
    const args = ['exec', '--workdir', input.workingDirectory];
    for (const [name, value] of Object.entries(input.environment).sort(([left], [right]) =>
      left.localeCompare(right)
    )) {
      args.push('--env', `${name}=${value}`);
    }
    if (input.stdin !== undefined) args.push('--interactive');
    args.push(input.containerId, input.executable, ...input.args);
    return this.transport.run({
      args,
      ...(input.stdin !== undefined ? { stdin: input.stdin } : {}),
      timeoutMs: input.timeoutMs,
      ...(input.idleTimeoutMs !== undefined ? { idleTimeoutMs: input.idleTimeoutMs } : {}),
      maxStdoutBytes: input.maxStdoutBytes,
      maxStderrBytes: input.maxStderrBytes,
      maxCombinedOutputBytes: input.maxCombinedOutputBytes,
      signal: input.signal,
    });
  }

  async inspectContainer(containerId: string): Promise<DockerContainerInspection | null> {
    const safeId = safeContainerId(containerId);
    const result = await this.transport.run(defaultRequest(['inspect', safeId]));
    if (result.outcome !== 'exited' || result.exitCode !== 0) return null;

    const parsed = parseJson(result.stdout, 'Docker container inspection', 'inspect');
    if (!Array.isArray(parsed) || !parsed[0] || typeof parsed[0] !== 'object') {
      throw invalidResponse('Docker container inspection returned an invalid record.', 'inspect');
    }
    const record = parsed[0] as Record<string, unknown>;
    if (!record.State || typeof record.State !== 'object' || Array.isArray(record.State)) {
      throw invalidResponse('Docker container inspection omitted container state.', 'inspect');
    }
    const state = record.State as Record<string, unknown>;
    return {
      id: requiredString(record.Id, 'Docker container Id'),
      running: requiredBoolean(state.Running, 'Docker container running state'),
      oomKilled: requiredBoolean(state.OOMKilled, 'Docker container OOM state'),
      status: requiredString(state.Status, 'Docker container status'),
      exitCode: requiredInteger(state.ExitCode, 'Docker container exit code'),
      imageDigest: requiredString(record.Image, 'Docker container image digest'),
      ...(timestamp(state.StartedAt) ? { startedAt: timestamp(state.StartedAt) } : {}),
      ...(timestamp(state.FinishedAt) ? { finishedAt: timestamp(state.FinishedAt) } : {}),
    };
  }

  async resourceSnapshot(containerId: string): Promise<DockerResourceSnapshot> {
    const result = await this.command([
      'stats',
      '--no-stream',
      '--format',
      '{{json .}}',
      safeContainerId(containerId),
    ]);
    const record = parseRecord(result.stdout, 'Docker resource snapshot', 'stats');
    const [memory] = requiredString(record.MemUsage, 'Docker memory usage').split('/');
    const [blockRead, blockWrite] = requiredString(record.BlockIO, 'Docker block IO').split('/');
    return {
      memoryBytes: parseDockerBytes(memory),
      cpuPercent: parsePercentage(record.CPUPerc),
      processCount: parseInteger(record.PIDs),
      blockReadBytes: parseDockerBytes(blockRead),
      blockWriteBytes: parseDockerBytes(blockWrite),
    };
  }

  async stopContainer(containerId: string, timeoutSeconds: number): Promise<void> {
    const safeId = safeContainerId(containerId);
    nonNegativeInteger(timeoutSeconds, 'Docker stop timeoutSeconds');
    const result = await this.transport.run(
      defaultRequest(['stop', '--time', String(timeoutSeconds), safeId])
    );
    if (successful(result)) return;
    const inspection = await this.inspectContainer(safeId);
    if (!inspection || !inspection.running) return;
    throw dockerFailure('Docker container stop failed.', 'stop', result);
  }

  async killContainer(containerId: string): Promise<void> {
    const safeId = safeContainerId(containerId);
    const result = await this.transport.run(defaultRequest(['kill', safeId]));
    if (successful(result)) return;
    const inspection = await this.inspectContainer(safeId);
    if (!inspection || !inspection.running) return;
    throw dockerFailure('Docker container kill failed.', 'kill', result);
  }

  async removeContainer(containerId: string): Promise<void> {
    const safeId = safeContainerId(containerId);
    const result = await this.transport.run(defaultRequest(['rm', '--force', safeId]));
    if (successful(result)) return;
    if ((await this.inspectContainer(safeId)) === null) return;
    throw dockerFailure('Docker container removal failed.', 'rm', result);
  }

  private async command(
    args: string[],
    timeoutMs = DEFAULT_COMMAND_TIMEOUT_MS
  ): Promise<DockerCliResult> {
    const result = await this.transport.run(defaultRequest(args, timeoutMs));
    if (!successful(result)) {
      throw dockerFailure(`Docker command ${args[0]} failed.`, args[0], result);
    }
    return result;
  }
}

function validateCreateInput(input: DockerContainerCreateInput): void {
  if (!input || typeof input !== 'object')
    throw new Error('Docker create input must be an object.');
  validateIdentifier(input.name, 'container name');
  validateImageReference(input.image);
  validateDigest(input.imageDigest);
  validateUser(input.user);
  validateContainerPath(input.workingDirectory, 'working directory');
  validateMount(input.workspaceMount);
  if (input.networkMode !== 'none' && input.networkMode !== 'bridge') {
    throw new Error('Docker network mode must be none or bridge.');
  }
  if (typeof input.readOnlyRoot !== 'boolean') {
    throw new Error('Docker readOnlyRoot must be a boolean.');
  }
  optionalPositiveNumber(input.cpuCores, 'Docker cpuCores');
  optionalPositiveInteger(input.memoryBytes, 'Docker memoryBytes');
  optionalPositiveInteger(input.pidsLimit, 'Docker pidsLimit');
  optionalPositiveInteger(input.tempBytes, 'Docker tempBytes');
  if (!isPlainRecord(input.labels)) throw new Error('Docker labels must be a record.');
  for (const [name, value] of Object.entries(input.labels)) validateLabel(name, value);
}

function validateExecInput(input: DockerContainerExecInput): void {
  if (!input || typeof input !== 'object') throw new Error('Docker exec input must be an object.');
  safeContainerId(input.containerId);
  nonEmptyNoNul(input.executable, 'Docker executable');
  validateContainerPath(input.workingDirectory, 'working directory');
  if (!Array.isArray(input.args) || input.args.some((value) => typeof value !== 'string')) {
    throw new Error('Docker executable args must be an array of strings.');
  }
  if (input.args.some((value) => value.includes('\u0000'))) {
    throw new Error('Docker executable args must contain no NUL bytes.');
  }
  if (!isPlainRecord(input.environment)) throw new Error('Docker environment must be a record.');
  for (const [name, value] of Object.entries(input.environment)) {
    validateEnvironmentName(name);
    if (typeof value !== 'string' || value.includes('\u0000')) {
      throw new Error('Docker environment values must be strings containing no NUL bytes.');
    }
  }
}

function defaultRequest(args: string[], timeoutMs = DEFAULT_COMMAND_TIMEOUT_MS): DockerCliRequest {
  return {
    args,
    timeoutMs,
    maxStdoutBytes: DEFAULT_STDOUT_BYTES,
    maxStderrBytes: DEFAULT_STDERR_BYTES,
    maxCombinedOutputBytes: DEFAULT_STDOUT_BYTES + DEFAULT_STDERR_BYTES,
    signal: new AbortController().signal,
  };
}

function successful(result: DockerCliResult): boolean {
  return result.outcome === 'exited' && result.exitCode === 0;
}

function formatMount(mount: DockerBindMount): string {
  return `type=bind,src=${mount.source},dst=${mount.target},${mount.readOnly ? 'readonly' : 'rw'}`;
}

function validateMount(mount: DockerBindMount): void {
  if (!mount || typeof mount !== 'object') throw new Error('Docker workspace mount is required.');
  const source = nonEmptyNoNul(mount.source, 'Docker mount source');
  validateContainerPath(mount.target, 'mount target');
  if (typeof mount.readOnly !== 'boolean')
    throw new Error('Docker mount readOnly must be a boolean.');
  if (source.includes(',') || mount.target.includes(',')) {
    throw new Error('Docker mount paths cannot contain commas.');
  }
  const normalizedSource = source.replace(/\\/g, '/').toLowerCase();
  const normalizedTarget = mount.target.toLowerCase();
  if (
    normalizedSource.endsWith('/docker.sock') ||
    normalizedTarget.endsWith('/docker.sock') ||
    normalizedSource.includes('/pipe/docker_engine')
  ) {
    throw new Error('Docker Socket mounts are forbidden.');
  }
}

function safeContainerId(value: string): string {
  validateIdentifier(value, 'container id');
  return value;
}

function validateIdentifier(value: string, name: string): void {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(value)) {
    throw new Error(`Invalid Docker ${name}.`);
  }
}

function validateImageReference(value: string): void {
  if (
    typeof value !== 'string' ||
    !/^[A-Za-z0-9][A-Za-z0-9._/:+-]*$/.test(value) ||
    value.includes('@')
  ) {
    throw new Error('Invalid Docker image reference.');
  }
}

function validateDigest(value: string): void {
  if (typeof value !== 'string' || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    throw new Error('Docker image digest must be sha256 pinned.');
  }
}

function validateUser(value: string): void {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_.-]+(?::[A-Za-z0-9_.-]+)?$/.test(value)) {
    throw new Error('Invalid Docker user.');
  }
  if (value === '0' || value.startsWith('0:') || value === 'root' || value.startsWith('root:')) {
    throw new Error('Docker containers must not run as root.');
  }
}

function validateContainerPath(value: string, name: string): void {
  const path = nonEmptyNoNul(value, `Docker ${name}`);
  if (!path.startsWith('/') || path.includes(',') || path.split('/').includes('..')) {
    throw new Error(`Docker ${name} must be an absolute normalized container path.`);
  }
}

function validateEnvironmentName(value: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
    throw new Error('Invalid Docker environment name.');
  }
}

function validateLabel(name: string, value: unknown): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9_.\-/]*$/.test(name)) {
    throw new Error('Invalid Docker label name.');
  }
  if (typeof value !== 'string' || value.includes('\u0000')) {
    throw new Error('Docker label values must be strings containing no NUL bytes.');
  }
}

function parseRecord(value: string, name: string, command: string): Record<string, unknown> {
  const parsed = parseJson(value, name, command);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw invalidResponse(`${name} is invalid.`, command);
  }
  return parsed as Record<string, unknown>;
}

function parseJson(value: string, name: string, command: string): unknown {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    throw invalidResponse(`${name} returned invalid JSON.`, command);
  }
}

function requiredString(value: unknown, name: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw invalidResponse(`${name} is required.`, 'response');
  }
  return value;
}

function requiredBoolean(value: unknown, name: string): boolean {
  if (typeof value !== 'boolean') throw invalidResponse(`${name} is required.`, 'response');
  return value;
}

function requiredInteger(value: unknown, name: string): number {
  if (!Number.isInteger(value)) throw invalidResponse(`${name} is required.`, 'response');
  return value as number;
}

function timestamp(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 && !value.startsWith('0001-')
    ? value
    : undefined;
}

function parseInteger(value: unknown): number | undefined {
  const parsed = Number.parseInt(String(value), 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parsePercentage(value: unknown): number | undefined {
  const parsed = Number.parseFloat(String(value).replace('%', ''));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseDockerBytes(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const match = value.trim().match(/^([0-9.]+)\s*([kmgt]?i?b)$/i);
  if (!match) return undefined;
  const factors: Record<string, number> = {
    b: 1,
    kb: 1_000,
    kib: 1_024,
    mb: 1_000_000,
    mib: 1_048_576,
    gb: 1_000_000_000,
    gib: 1_073_741_824,
    tb: 1_000_000_000_000,
    tib: 1_099_511_627_776,
  };
  return Math.round(Number.parseFloat(match[1]) * factors[match[2].toLowerCase()]);
}

function optionalPositiveNumber(value: number | undefined, name: string): void {
  if (value !== undefined && (!Number.isFinite(value) || value <= 0)) {
    throw new Error(`${name} must be positive when provided.`);
  }
}

function optionalPositiveInteger(value: number | undefined, name: string): void {
  if (value !== undefined && (!Number.isInteger(value) || value <= 0)) {
    throw new Error(`${name} must be a positive integer when provided.`);
  }
}

function nonNegativeInteger(value: number, name: string): void {
  if (!Number.isInteger(value) || value < 0) throw new Error(`${name} must be non-negative.`);
}

function nonEmptyNoNul(value: string, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new Error(`${name} must be non-empty and contain no NUL bytes.`);
  }
  return value;
}

function isPlainRecord(value: unknown): value is Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function dockerFailure(
  message: string,
  command: string,
  result: DockerCliResult
): DockerEngineClientError {
  return new DockerEngineClientError(message, 'DOCKER_COMMAND_FAILED', command, {
    outcome: result.outcome,
    exitCode: result.exitCode,
    ...(result.startErrorCode ? { startErrorCode: result.startErrorCode } : {}),
  });
}

function invalidResponse(message: string, command: string): DockerEngineClientError {
  return new DockerEngineClientError(message, 'DOCKER_INVALID_RESPONSE', command);
}
