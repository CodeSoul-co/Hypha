import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import type { DockerWorkspaceMount } from './docker-workspace-mount';

export interface DockerContainerCreateInput {
  name: string;
  image: string;
  imageDigest: string;
  user: string;
  workingDirectory: string;
  workspaceMount: DockerWorkspaceMount;
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

export class DockerEngineCliClient implements DockerEngineClient {
  constructor(private readonly transport: DockerCommandTransport) {}

  async health(): Promise<{ serverVersion: string }> {
    const result = await this.command(['version', '--format', '{{.Server.Version}}']);
    return { serverVersion: result.stdout.trim() };
  }

  async inspectImage(reference: string): Promise<{ id: string; repoDigests: string[] }> {
    let result = await this.transport.run(
      defaultRequest(['image', 'inspect', reference, '--format', '{{json .}}'])
    );
    if (result.exitCode !== 0 && result.stderr.toLowerCase().includes('no such image')) {
      const listed = await this.command(['image', 'ls', '--digests', '--format', '{{json .}}']);
      const expected = reference.includes(':') ? reference : `${reference}:latest`;
      const match = listed.stdout
        .split(/\r?\n/u)
        .filter(Boolean)
        .map((line) => parseRecord(line, 'Docker image list entry'))
        .find((entry) => `${entry.Repository}:${entry.Tag}` === expected);
      if (!match || typeof match.ID !== 'string') {
        throw dockerFailure('Docker image inspection failed.', result);
      }
      result = await this.command(['image', 'inspect', match.ID, '--format', '{{json .}}']);
    } else if (result.exitCode !== 0) {
      throw dockerFailure('Docker image inspection failed.', result);
    }
    const value = parseRecord(result.stdout, 'Docker image inspection');
    return {
      id: requiredString(value.Id, 'image Id'),
      repoDigests: Array.isArray(value.RepoDigests)
        ? value.RepoDigests.filter((entry): entry is string => typeof entry === 'string')
        : [],
    };
  }

  async createContainer(input: DockerContainerCreateInput): Promise<string> {
    validateIdentifier(input.name, 'container name');
    validateDigest(input.imageDigest);
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
      'no-new-privileges',
      '--mount',
      formatMount(input.workspaceMount),
      '--tmpfs',
      `/tmp:rw,noexec,nosuid,nodev,size=${input.tempBytes ?? 16 * 1024 * 1024}`,
      ...(input.readOnlyRoot ? ['--read-only'] : []),
      ...(input.cpuCores ? ['--cpus', String(input.cpuCores)] : []),
      ...(input.memoryBytes ? ['--memory', String(input.memoryBytes)] : []),
      ...(input.pidsLimit ? ['--pids-limit', String(input.pidsLimit)] : []),
    ];
    for (const [name, value] of Object.entries(input.labels).sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      validateIdentifier(name, 'label name');
      if (value.includes('\u0000'))
        throw new Error('Docker label values cannot contain NUL bytes.');
      args.push('--label', `${name}=${value}`);
    }
    args.push(input.image, 'sleep', 'infinity');
    const result = await this.command(args, 30_000);
    return requiredString(result.stdout.trim(), 'container id');
  }

  async startContainer(containerId: string): Promise<void> {
    await this.command(['start', safeContainerId(containerId)]);
  }

  execute(input: DockerContainerExecInput): Promise<DockerCliResult> {
    const args = ['exec', '--workdir', input.workingDirectory];
    for (const [name, value] of Object.entries(input.environment).sort(([a], [b]) =>
      a.localeCompare(b)
    )) {
      validateEnvironmentName(name);
      if (value.includes('\u0000'))
        throw new Error('Docker environment values cannot contain NUL bytes.');
      args.push('--env', `${name}=${value}`);
    }
    if (input.stdin !== undefined) args.push('--interactive');
    args.push(safeContainerId(input.containerId), input.executable, ...input.args);
    return this.transport.run({
      args,
      ...(input.stdin !== undefined ? { stdin: input.stdin } : {}),
      timeoutMs: input.timeoutMs,
      ...(input.idleTimeoutMs ? { idleTimeoutMs: input.idleTimeoutMs } : {}),
      maxStdoutBytes: input.maxStdoutBytes,
      maxStderrBytes: input.maxStderrBytes,
      maxCombinedOutputBytes: input.maxCombinedOutputBytes,
      signal: input.signal,
    });
  }

  async inspectContainer(containerId: string): Promise<DockerContainerInspection | null> {
    const result = await this.transport.run(
      defaultRequest(['inspect', safeContainerId(containerId)])
    );
    if (result.exitCode !== 0) {
      if (result.stderr.toLowerCase().includes('no such')) return null;
      throw dockerFailure('Docker container inspection failed.', result);
    }
    const parsed = JSON.parse(result.stdout) as unknown;
    if (!Array.isArray(parsed) || !parsed[0] || typeof parsed[0] !== 'object') {
      throw new Error('Docker container inspection returned invalid JSON.');
    }
    const record = parsed[0] as Record<string, unknown>;
    const state = record.State as Record<string, unknown>;
    return {
      id: requiredString(record.Id, 'container Id'),
      running: Boolean(state.Running),
      oomKilled: Boolean(state.OOMKilled),
      status: requiredString(state.Status, 'container status'),
      exitCode: typeof state.ExitCode === 'number' ? state.ExitCode : 0,
      imageDigest: requiredString(record.Image, 'container image digest'),
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
    const record = parseRecord(result.stdout, 'Docker resource snapshot');
    const [memory] = requiredString(record.MemUsage, 'memory usage').split('/');
    const [blockRead, blockWrite] = requiredString(record.BlockIO, 'block IO').split('/');
    return {
      memoryBytes: parseDockerBytes(memory),
      cpuPercent: parsePercentage(record.CPUPerc),
      processCount: parseInteger(record.PIDs),
      blockReadBytes: parseDockerBytes(blockRead),
      blockWriteBytes: parseDockerBytes(blockWrite),
    };
  }

  async stopContainer(containerId: string, timeoutSeconds: number): Promise<void> {
    await this.command(['stop', '--time', String(timeoutSeconds), safeContainerId(containerId)]);
  }

  async killContainer(containerId: string): Promise<void> {
    const result = await this.transport.run(defaultRequest(['kill', safeContainerId(containerId)]));
    if (result.exitCode !== 0 && !result.stderr.toLowerCase().includes('is not running')) {
      throw dockerFailure('Docker container kill failed.', result);
    }
  }

  async removeContainer(containerId: string): Promise<void> {
    const result = await this.transport.run(
      defaultRequest(['rm', '--force', safeContainerId(containerId)])
    );
    if (result.exitCode !== 0 && !result.stderr.toLowerCase().includes('no such')) {
      throw dockerFailure('Docker container removal failed.', result);
    }
  }

  private async command(args: string[], timeoutMs = 10_000): Promise<DockerCliResult> {
    const result = await this.transport.run(defaultRequest(args, timeoutMs));
    if (result.outcome !== 'exited' || result.exitCode !== 0) {
      throw dockerFailure(`Docker command ${args[0]} failed.`, result);
    }
    return result;
  }
}

function defaultRequest(args: string[], timeoutMs = 10_000): DockerCliRequest {
  return {
    args,
    timeoutMs,
    maxStdoutBytes: 4 * 1024 * 1024,
    maxStderrBytes: 1024 * 1024,
    maxCombinedOutputBytes: 5 * 1024 * 1024,
    signal: new AbortController().signal,
  };
}

function formatMount(mount: DockerWorkspaceMount): string {
  if (mount.source.includes(',') || mount.target.includes(',')) {
    throw new Error('Docker mount paths cannot contain commas.');
  }
  return `type=bind,src=${mount.source},dst=${mount.target}${mount.readOnly ? ',readonly' : ''}`;
}

function safeContainerId(value: string): string {
  validateIdentifier(value, 'container id');
  return value;
}

function validateIdentifier(value: string, name: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(value)) throw new Error(`Invalid Docker ${name}.`);
}

function validateDigest(value: string): void {
  if (!/^sha256:[0-9a-f]{64}$/.test(value))
    throw new Error('Docker image digest must be sha256 pinned.');
}

function validateEnvironmentName(value: string): void {
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) throw new Error('Invalid Docker environment name.');
}

function parseRecord(value: string, name: string): Record<string, unknown> {
  const parsed = JSON.parse(value) as unknown;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
    throw new Error(`${name} is invalid.`);
  return parsed as Record<string, unknown>;
}

function requiredString(value: unknown, name: string): string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${name} is required.`);
  return value;
}

function timestamp(value: unknown): string | undefined {
  return typeof value === 'string' && !value.startsWith('0001-') ? value : undefined;
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

function dockerFailure(message: string, result: DockerCliResult): Error {
  return new Error(`${message} ${result.stderr.trim() || result.outcome}`);
}
