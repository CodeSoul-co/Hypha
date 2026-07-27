import {
  validateDockerCliRequest,
  type DockerCliRequest,
  type DockerCommandTransport,
} from './docker-cli-transport';
import {
  dockerFailure,
  DockerEngineClientError,
  validContainerReference,
} from './docker-engine-boundary';

const STATS_COMMAND = 'stats';
const STATS_TIMEOUT_MS = 10_000;
const STATS_OUTPUT_LIMIT_BYTES = 256 * 1024;
const STATS_FORMAT = '{{json .}}';

export interface DockerResourceSnapshot {
  cpuPercent: number;
  memoryUsageBytes: number;
  memoryLimitBytes: number;
  memoryPercent: number;
  processCount: number;
  blockReadBytes: number;
  blockWriteBytes: number;
}

export interface DockerResourceAccounting {
  snapshot(containerReference: string, signal: AbortSignal): Promise<DockerResourceSnapshot>;
}

/**
 * Internal point-in-time resource accounting. It does not own lifecycle,
 * scheduling, Provider receipts, or capability registration.
 */
export class DockerStatsResourceAccounting implements DockerResourceAccounting {
  constructor(private readonly transport: DockerCommandTransport) {}

  async snapshot(containerReference: string, signal: AbortSignal): Promise<DockerResourceSnapshot> {
    const safeReference = validContainerReference(containerReference);
    const request: DockerCliRequest = {
      args: ['stats', '--no-stream', '--format', STATS_FORMAT, safeReference],
      timeoutMs: STATS_TIMEOUT_MS,
      maxStdoutBytes: STATS_OUTPUT_LIMIT_BYTES,
      maxStderrBytes: STATS_OUTPUT_LIMIT_BYTES,
      maxCombinedOutputBytes: STATS_OUTPUT_LIMIT_BYTES,
      signal,
    };
    validateDockerCliRequest(request);

    const result = await this.transport.run(request);
    if (result.outcome !== 'exited' || result.exitCode !== 0) {
      throw dockerFailure('Docker resource snapshot failed.', STATS_COMMAND, result);
    }
    return parseDockerResourceSnapshot(result.stdout);
  }
}

export function parseDockerResourceSnapshot(value: string): DockerResourceSnapshot {
  const record = parseStatsRecord(value);
  const [memoryUsageBytes, memoryLimitBytes] = parseBytePair(
    record.MemUsage,
    'Docker memory usage'
  );
  const [blockReadBytes, blockWriteBytes] = parseBytePair(record.BlockIO, 'Docker block I/O');

  return {
    cpuPercent: parsePercentage(record.CPUPerc, 'Docker CPU percentage'),
    memoryUsageBytes,
    memoryLimitBytes,
    memoryPercent: parsePercentage(record.MemPerc, 'Docker memory percentage'),
    processCount: parseNonNegativeInteger(record.PIDs, 'Docker process count'),
    blockReadBytes,
    blockWriteBytes,
  };
}

export function parseDockerByteQuantity(value: unknown, name: string): number {
  if (typeof value !== 'string') throw invalidResponse(`${name} is invalid.`);
  const match = /^([0-9]+(?:\.[0-9]+)?)\s*([kmgt]?i?b)$/i.exec(value.trim());
  if (!match) throw invalidResponse(`${name} is invalid.`);

  const amount = Number(match[1]);
  const unit = match[2]?.toLowerCase();
  const factor = unit ? BYTE_FACTORS[unit] : undefined;
  if (!Number.isFinite(amount) || factor === undefined) {
    throw invalidResponse(`${name} is invalid.`);
  }

  const bytes = Math.round(amount * factor);
  if (!Number.isSafeInteger(bytes) || bytes < 0) {
    throw invalidResponse(`${name} exceeds the supported range.`);
  }
  return bytes;
}

const BYTE_FACTORS: Readonly<Record<string, number>> = {
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

function parseStatsRecord(value: string): Record<string, unknown> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    throw invalidResponse('Docker resource snapshot returned invalid JSON.');
  }
  if (!isRecord(parsed)) {
    throw invalidResponse('Docker resource snapshot returned an invalid record.');
  }
  return parsed;
}

function parseBytePair(value: unknown, name: string): [number, number] {
  if (typeof value !== 'string') throw invalidResponse(`${name} is invalid.`);
  const parts = value.split('/');
  if (parts.length !== 2) throw invalidResponse(`${name} is invalid.`);
  return [
    parseDockerByteQuantity(parts[0], `${name} first value`),
    parseDockerByteQuantity(parts[1], `${name} second value`),
  ];
}

function parsePercentage(value: unknown, name: string): number {
  if (typeof value !== 'string') throw invalidResponse(`${name} is invalid.`);
  const match = /^([0-9]+(?:\.[0-9]+)?)%$/.exec(value.trim());
  const percentage = match ? Number(match[1]) : Number.NaN;
  if (!Number.isFinite(percentage) || percentage < 0) {
    throw invalidResponse(`${name} is invalid.`);
  }
  return percentage;
}

function parseNonNegativeInteger(value: unknown, name: string): number {
  if (typeof value !== 'string' || !/^[0-9]+$/.test(value.trim())) {
    throw invalidResponse(`${name} is invalid.`);
  }
  const integer = Number(value);
  if (!Number.isSafeInteger(integer) || integer < 0) {
    throw invalidResponse(`${name} is invalid.`);
  }
  return integer;
}

function invalidResponse(message: string): DockerEngineClientError {
  return new DockerEngineClientError(message, 'DOCKER_INVALID_RESPONSE', STATS_COMMAND);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
