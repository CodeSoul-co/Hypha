import type {
  DockerCliRequest,
  DockerCliResult,
  DockerCommandTransport,
} from './docker-cli-transport';
import {
  dockerFailure,
  formatMount,
  nonNegativeSafeInteger,
  parseContainerInspection,
  parseContainerListing,
  requiredContainerReference,
  validContainerReference,
  validateCreateInput,
  type DockerContainerCreateInput,
  type DockerContainerInspection,
} from './docker-engine-boundary';
export {
  DockerEngineClientError,
  type DockerBindMount,
  type DockerContainerCreateInput,
  type DockerContainerInspection,
  type DockerEngineClientErrorCode,
} from './docker-engine-boundary';

const DEFAULT_COMMAND_TIMEOUT_MS = 10_000;
const DEFAULT_CREATE_TIMEOUT_MS = 30_000;
const DEFAULT_TMPFS_BYTES = 16 * 1024 * 1024;
const DEFAULT_STDOUT_BYTES = 4 * 1024 * 1024;
const DEFAULT_STDERR_BYTES = 1024 * 1024;

export interface DockerEngineClient {
  createContainer(input: DockerContainerCreateInput): Promise<string>;
  startContainer(containerReference: string): Promise<void>;
  inspectContainer(containerReference: string): Promise<DockerContainerInspection | null>;
  stopContainer(containerReference: string, timeoutSeconds: number): Promise<void>;
  removeContainer(containerReference: string): Promise<void>;
}

/**
 * Internal Docker Engine lifecycle client.
 * Factory registration and Provider capability claims remain intentionally absent.
 */
export class DockerEngineCliClient implements DockerEngineClient {
  constructor(private readonly transport: DockerCommandTransport) {}

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
      args.push('--label', `${name}=${value}`);
    }
    args.push(`${input.image}@${input.imageDigest}`, ...input.command);

    const result = await this.command(args, DEFAULT_CREATE_TIMEOUT_MS);
    return requiredContainerReference(
      result.stdout.trim(),
      'Docker container Id',
      'create'
    );
  }

  async startContainer(containerReference: string): Promise<void> {
    await this.command(['start', validContainerReference(containerReference)]);
  }

  async inspectContainer(
    containerReference: string
  ): Promise<DockerContainerInspection | null> {
    const safeReference = validContainerReference(containerReference);
    const result = await this.transport.run(defaultRequest(['container', 'inspect', safeReference]));
    if (successful(result)) {
      return parseContainerInspection(result.stdout);
    }
    if (await this.containerIsMissing(safeReference)) return null;
    throw dockerFailure('Docker container inspection failed.', 'container inspect', result);
  }

  async stopContainer(containerReference: string, timeoutSeconds: number): Promise<void> {
    const safeReference = validContainerReference(containerReference);
    nonNegativeSafeInteger(timeoutSeconds, 'Docker stop timeoutSeconds');
    const result = await this.transport.run(
      defaultRequest(['stop', '--time', String(timeoutSeconds), safeReference])
    );
    if (successful(result)) return;

    const inspection = await this.inspectContainer(safeReference);
    if (!inspection || !inspection.running) return;
    throw dockerFailure('Docker container stop failed.', 'stop', result);
  }

  async removeContainer(containerReference: string): Promise<void> {
    const safeReference = validContainerReference(containerReference);
    const result = await this.transport.run(defaultRequest(['rm', '--force', safeReference]));
    if (successful(result)) return;

    if ((await this.inspectContainer(safeReference)) === null) return;
    throw dockerFailure('Docker container removal failed.', 'rm', result);
  }

  private async containerIsMissing(containerReference: string): Promise<boolean> {
    const result = await this.transport.run(
      defaultRequest([
        'container',
        'ls',
        '--all',
        '--no-trunc',
        '--format',
        '{{json .}}',
      ])
    );
    if (!successful(result)) {
      throw dockerFailure('Docker container reconciliation failed.', 'container ls', result);
    }

    return !parseContainerListing(result.stdout).some(
      ({ id, name }) =>
        id === containerReference ||
        id.startsWith(containerReference) ||
        name === containerReference
    );
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
