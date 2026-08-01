import path from 'node:path';
import type { DockerCliResult } from './docker-cli-transport';

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
  command: string[];
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

export function validateCreateInput(input: DockerContainerCreateInput): void {
  if (!isRecord(input)) throw new TypeError('Docker create input must be an object.');
  validContainerReference(input.name, 'Docker container name');
  validateImageReference(input.image);
  validateDigest(input.imageDigest);
  validateUser(input.user);
  validateContainerPath(input.workingDirectory, 'working directory');
  validateMount(input.workspaceMount);
  if (input.networkMode !== 'none' && input.networkMode !== 'bridge') {
    throw new TypeError('Docker network mode must be none or bridge.');
  }
  if (typeof input.readOnlyRoot !== 'boolean') {
    throw new TypeError('Docker readOnlyRoot must be a boolean.');
  }
  optionalPositiveNumber(input.cpuCores, 'Docker cpuCores');
  optionalPositiveSafeInteger(input.memoryBytes, 'Docker memoryBytes');
  optionalPositiveSafeInteger(input.pidsLimit, 'Docker pidsLimit');
  optionalPositiveSafeInteger(input.tempBytes, 'Docker tempBytes');
  if (!isRecord(input.labels)) throw new TypeError('Docker labels must be a record.');
  for (const [name, value] of Object.entries(input.labels)) validateLabel(name, value);
  validateLiteralArgv(input.command, 'Docker container command');
}

export function formatMount(mount: DockerBindMount): string {
  const formatted = `type=bind,src=${mount.source},dst=${mount.target}`;
  return mount.readOnly ? `${formatted},readonly` : formatted;
}

export function parseContainerInspection(value: string): DockerContainerInspection {
  const parsed = parseJson(value, 'Docker container inspection', 'container inspect');
  if (!Array.isArray(parsed) || parsed.length !== 1 || !isRecord(parsed[0])) {
    throw invalidResponse(
      'Docker container inspection returned an invalid record.',
      'container inspect'
    );
  }
  const record = parsed[0];
  if (!isRecord(record.State)) {
    throw invalidResponse('Docker container inspection omitted container state.', 'container inspect');
  }
  const state = record.State;
  const startedAt = dockerTimestamp(state.StartedAt);
  const finishedAt = dockerTimestamp(state.FinishedAt);
  return {
    id: requiredContainerReference(
      record.Id,
      'Docker container Id',
      'container inspect'
    ),
    running: requiredBoolean(state.Running, 'Docker container running state'),
    oomKilled: requiredBoolean(state.OOMKilled, 'Docker container OOM state'),
    status: requiredString(state.Status, 'Docker container status'),
    exitCode: requiredInteger(state.ExitCode, 'Docker container exit code'),
    imageDigest: requiredDigest(record.Image, 'Docker container image digest'),
    ...(startedAt ? { startedAt } : {}),
    ...(finishedAt ? { finishedAt } : {}),
  };
}

export function parseContainerListing(value: string): Array<{ id: string; name: string }> {
  if (!value.trim()) return [];
  return value
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const record = parseJson(line, 'Docker container listing', 'container ls');
      if (!isRecord(record)) {
        throw invalidResponse('Docker container listing returned an invalid record.', 'container ls');
      }
      return {
        id: requiredContainerReference(
          record.ID,
          'Docker listed container Id',
          'container ls'
        ),
        name: requiredContainerReference(
          record.Names,
          'Docker listed container name',
          'container ls'
        ),
      };
    });
}

export function validContainerReference(
  value: unknown,
  name = 'Docker container reference'
): string {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(value)) {
    throw new TypeError(`${name} is invalid.`);
  }
  return value;
}

export function requiredContainerReference(
  value: unknown,
  name: string,
  command: string
): string {
  if (typeof value !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_.-]*$/.test(value)) {
    throw invalidResponse(`${name} is invalid.`, command);
  }
  return value;
}

export function nonNegativeSafeInteger(value: unknown, name: string): void {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
}

export function dockerFailure(
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

function validateMount(value: unknown): asserts value is DockerBindMount {
  if (!isRecord(value)) throw new TypeError('Docker workspace mount is required.');
  const source = nonEmptyNoNul(value.source, 'Docker mount source');
  const target = nonEmptyNoNul(value.target, 'Docker mount target');
  if (typeof value.readOnly !== 'boolean') {
    throw new TypeError('Docker mount readOnly must be a boolean.');
  }
  if (!isAbsoluteHostPath(source) || hasParentSegment(source)) {
    throw new TypeError('Docker mount source must be an absolute normalized host path.');
  }
  validateContainerPath(target, 'mount target');
  if (source.includes(',') || target.includes(',')) {
    throw new TypeError('Docker mount paths cannot contain commas.');
  }
  if (isDockerSocketPath(source) || isDockerSocketPath(target)) {
    throw new TypeError('Docker socket mounts are forbidden.');
  }
}

function invalidResponse(message: string, command: string): DockerEngineClientError {
  return new DockerEngineClientError(message, 'DOCKER_INVALID_RESPONSE', command);
}

function parseJson(value: string, name: string, command: string): unknown {
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed;
  } catch {
    throw invalidResponse(`${name} returned invalid JSON.`, command);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function requiredString(value: unknown, name: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw invalidResponse(`${name} is required.`, 'response');
  }
  return value;
}

function requiredBoolean(value: unknown, name: string): boolean {
  if (typeof value !== 'boolean') {
    throw invalidResponse(`${name} is required.`, 'response');
  }
  return value;
}

function requiredInteger(value: unknown, name: string): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value)) {
    throw invalidResponse(`${name} is required.`, 'response');
  }
  return value;
}

function requiredDigest(value: unknown, name: string): string {
  if (typeof value !== 'string' || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    throw invalidResponse(`${name} is invalid.`, 'response');
  }
  return value;
}

function dockerTimestamp(value: unknown): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw invalidResponse('Docker container timestamp is invalid.', 'container inspect');
  }
  if (value.startsWith('0001-')) return undefined;
  if (!Number.isFinite(Date.parse(value))) {
    throw invalidResponse('Docker container timestamp is invalid.', 'container inspect');
  }
  return value;
}

function validateImageReference(value: unknown): asserts value is string {
  if (
    typeof value !== 'string' ||
    !/^[A-Za-z0-9][A-Za-z0-9._/:+-]*$/.test(value) ||
    value.includes('@')
  ) {
    throw new TypeError('Docker image reference is invalid.');
  }
}

function validateDigest(value: unknown): asserts value is string {
  if (typeof value !== 'string' || !/^sha256:[0-9a-f]{64}$/.test(value)) {
    throw new TypeError('Docker image digest must be sha256 pinned.');
  }
}

function validateUser(value: unknown): asserts value is string {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_.-]+(?::[A-Za-z0-9_.-]+)?$/.test(value)) {
    throw new TypeError('Docker user is invalid.');
  }
  if (value === '0' || value.startsWith('0:') || value === 'root' || value.startsWith('root:')) {
    throw new TypeError('Docker containers must not run as root.');
  }
}

export function validateContainerPath(value: unknown, name: string): asserts value is string {
  const containerPath = nonEmptyNoNul(value, `Docker ${name}`);
  if (
    !path.posix.isAbsolute(containerPath) ||
    containerPath.includes(',') ||
    hasParentSegment(containerPath)
  ) {
    throw new TypeError(`Docker ${name} must be an absolute normalized container path.`);
  }
}

function validateLabel(name: string, value: unknown): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9_.\-/]*$/.test(name)) {
    throw new TypeError('Docker label name is invalid.');
  }
  nonEmptyNoNul(value, 'Docker label value');
}

export function validateLiteralArgv(
  value: unknown,
  name: string,
  allowEmpty = false
): asserts value is string[] {
  if (
    !Array.isArray(value) ||
    (!allowEmpty && value.length === 0) ||
    value.some((entry) => typeof entry !== 'string' || entry.includes('\u0000'))
  ) {
    const requirement = allowEmpty ? 'a string array' : 'a non-empty string array';
    throw new TypeError(`${name} must be ${requirement} containing no NUL bytes.`);
  }
}

function optionalPositiveNumber(value: unknown, name: string): void {
  if (value !== undefined && (typeof value !== 'number' || !Number.isFinite(value) || value <= 0)) {
    throw new TypeError(`${name} must be positive when provided.`);
  }
}

function optionalPositiveSafeInteger(value: unknown, name: string): void {
  if (
    value !== undefined &&
    (typeof value !== 'number' || !Number.isSafeInteger(value) || value <= 0)
  ) {
    throw new TypeError(`${name} must be a positive safe integer when provided.`);
  }
}

function nonEmptyNoNul(value: unknown, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new TypeError(`${name} must be a non-empty string containing no NUL bytes.`);
  }
  return value;
}

function hasParentSegment(value: string): boolean {
  return value.split(/[\\/]+/).includes('..');
}

function isAbsoluteHostPath(value: string): boolean {
  return path.posix.isAbsolute(value) || path.win32.isAbsolute(value);
}

function isDockerSocketPath(value: string): boolean {
  const normalized = value.replace(/\\/g, '/').toLowerCase();
  return normalized.endsWith('/docker.sock') || normalized.includes('/pipe/docker_engine');
}
