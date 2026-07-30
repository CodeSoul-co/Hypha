import {
  validateCommandExecutionResult,
  type CommandExecutionResult,
  type FileMutation,
  type NormalizedExecutionError,
} from '@hypha/core';
import type { DockerCliResult } from './docker-cli-transport';
import {
  DockerEngineClientError,
  validContainerReference,
  type DockerContainerInspection,
} from './docker-engine-boundary';
import type { DockerResourceSnapshot } from './docker-resource-accounting';
import {
  hashExecutionText,
  hashExecutionValue,
  shortExecutionHash,
} from './execution-provider-values';

export interface DockerExecutionCleanupEvidence {
  complete: boolean;
  containerAbsent: boolean;
  stopAttempted: boolean;
  failureStage?: 'inspect' | 'stop' | 'remove';
  failureCode?: 'DOCKER_COMMAND_FAILED' | 'DOCKER_INVALID_RESPONSE' | 'UNEXPECTED';
}

export type DockerEvidenceFailureCode =
  | 'DOCKER_COMMAND_FAILED'
  | 'DOCKER_INVALID_RESPONSE'
  | 'UNEXPECTED';

export interface BuildDockerTerminalResultInput {
  providerId: string;
  executionId: string;
  revision: number;
  sandboxId: string;
  containerReference: string;
  processResult: DockerCliResult;
  inspection: DockerContainerInspection;
  resourceSnapshot?: DockerResourceSnapshot;
  resourceFailureCode?: DockerEvidenceFailureCode;
  cleanup: DockerExecutionCleanupEvidence;
  changedFiles: FileMutation[];
  generatedArtifactRefs: string[];
  stdoutArtifactRef?: string;
  stderrArtifactRef?: string;
}

/**
 * Produces the Core terminal result and durable receipt shape from already
 * collected Docker evidence. It does not execute Docker or register a Provider.
 */
export function buildDockerTerminalResult(
  input: BuildDockerTerminalResultInput
): CommandExecutionResult {
  validateInput(input);
  const stdoutContentHash = hashExecutionText(input.processResult.stdout);
  const stderrContentHash = hashExecutionText(input.processResult.stderr);
  const stdoutTruncated =
    input.processResult.observedStdoutBytes > Buffer.byteLength(input.processResult.stdout);
  const stderrTruncated =
    input.processResult.observedStderrBytes > Buffer.byteLength(input.processResult.stderr);
  if (stdoutTruncated && !input.stdoutArtifactRef) {
    throw invalidEvidence('Truncated Docker stdout requires an Artifact reference.');
  }
  if (stderrTruncated && !input.stderrArtifactRef) {
    throw invalidEvidence('Truncated Docker stderr requires an Artifact reference.');
  }

  const terminal = mapTerminal(input);
  const generatedArtifactRefs = [
    ...input.generatedArtifactRefs,
    ...(input.stdoutArtifactRef ? [input.stdoutArtifactRef] : []),
    ...(input.stderrArtifactRef ? [input.stderrArtifactRef] : []),
  ];
  ensureUniqueReferences(generatedArtifactRefs);
  const processTreeTerminationVerified =
    input.processResult.processTreeTerminationVerified || input.cleanup.containerAbsent;

  const metadata = {
    accountingMode: input.resourceSnapshot
      ? 'docker_point_in_time_stats'
      : 'docker_stats_unavailable',
    containerStatus: input.inspection.status,
    containerRunningAtInspection: input.inspection.running,
    oomKilled: input.inspection.oomKilled,
    observedStdoutBytes: input.processResult.observedStdoutBytes,
    observedStderrBytes: input.processResult.observedStderrBytes,
    // Removing the container is stronger workload process-tree evidence than
    // the host-side Docker CLI supervisor can provide on every platform.
    processTreeTerminationVerified,
    cleanup: input.cleanup,
    ...(input.resourceSnapshot ? { resourceSnapshot: input.resourceSnapshot } : {}),
    ...(input.resourceFailureCode ? { resourceFailureCode: input.resourceFailureCode } : {}),
    ...(input.processResult.outputLimitStream
      ? { outputLimitStream: input.processResult.outputLimitStream }
      : {}),
  };
  const receiptBody = {
    providerId: input.providerId,
    executionId: input.executionId,
    providerExecutionRef: input.containerReference,
    status: terminal.status,
    exitCode: terminal.exitCode,
    completedAt: input.processResult.completedAt,
    stdoutContentHash,
    stderrContentHash,
    oomKilled: input.inspection.oomKilled,
    cleanup: input.cleanup,
    generatedArtifactRefs,
    ...(input.stdoutArtifactRef ? { stdoutArtifactRef: input.stdoutArtifactRef } : {}),
    ...(input.stderrArtifactRef ? { stderrArtifactRef: input.stderrArtifactRef } : {}),
    ...(input.resourceSnapshot ? { resourceSnapshot: input.resourceSnapshot } : {}),
    ...(input.resourceFailureCode ? { resourceFailureCode: input.resourceFailureCode } : {}),
  };

  return validateCommandExecutionResult({
    executionId: input.executionId,
    revision: input.revision,
    sandboxId: input.sandboxId,
    status: terminal.status,
    exitCode: terminal.exitCode,
    ...(input.processResult.signal ? { signal: input.processResult.signal } : {}),
    stdout: input.processResult.stdout,
    stderr: input.processResult.stderr,
    stdoutContentHash,
    stderrContentHash,
    ...(input.stdoutArtifactRef
      ? {
          stdoutArtifactRef: input.stdoutArtifactRef,
          ...(stdoutTruncated ? { stdoutTruncated: true } : {}),
        }
      : {}),
    ...(input.stderrArtifactRef
      ? {
          stderrArtifactRef: input.stderrArtifactRef,
          ...(stderrTruncated ? { stderrTruncated: true } : {}),
        }
      : {}),
    changedFiles: input.changedFiles,
    generatedArtifactRefs,
    resourceUsage: {
      outputBytes:
        input.processResult.observedStdoutBytes + input.processResult.observedStderrBytes,
      ...(input.resourceSnapshot
        ? {
            readBytes: input.resourceSnapshot.blockReadBytes,
            writtenBytes: input.resourceSnapshot.blockWriteBytes,
          }
        : {}),
    },
    externalReceipt: {
      id: `receipt.docker.${shortExecutionHash(
        `${input.providerId}:${input.executionId}:${input.containerReference}`
      )}`,
      providerId: input.providerId,
      executionId: input.executionId,
      providerExecutionRef: input.containerReference,
      status: 'completed',
      issuedAt: input.processResult.completedAt,
      receiptHash: hashExecutionValue(receiptBody),
      metadata: {
        cleanupComplete: input.cleanup.complete,
        oomKilled: input.inspection.oomKilled,
        generatedArtifactCount: generatedArtifactRefs.length,
      },
    },
    startedAt: input.processResult.startedAt,
    completedAt: input.processResult.completedAt,
    latencyMs: input.processResult.latencyMs,
    ...(terminal.error ? { error: terminal.error } : {}),
    metadata,
  });
}

function mapTerminal(input: BuildDockerTerminalResultInput): {
  status: CommandExecutionResult['status'];
  exitCode: number | null;
  error?: NormalizedExecutionError;
} {
  const safeDetails = {
    dockerOutcome: input.processResult.outcome,
    containerStatus: input.inspection.status,
    oomKilled: input.inspection.oomKilled,
    cleanupComplete: input.cleanup.complete,
    cleanupFailureStage: input.cleanup.failureStage,
    cleanupFailureCode: input.cleanup.failureCode,
  };
  if (input.inspection.oomKilled) {
    return {
      status: 'oom_killed',
      exitCode: input.processResult.exitCode,
      error: normalizedError(
        'EXECUTION_OOM_KILLED',
        'Docker execution was terminated by the memory limit.',
        false,
        safeDetails
      ),
    };
  }
  if (
    !input.cleanup.complete &&
    input.processResult.outcome === 'exited' &&
    input.processResult.exitCode === 0
  ) {
    return {
      status: 'failed',
      exitCode: input.processResult.exitCode,
      error: normalizedError(
        'EXECUTION_CLEANUP_FAILED',
        'Docker execution completed but cleanup did not finish.',
        true,
        safeDetails
      ),
    };
  }
  if (input.processResult.outcome === 'exited' && input.processResult.exitCode === 0) {
    return { status: 'completed', exitCode: 0 };
  }
  if (input.processResult.outcome === 'cancelled') {
    return {
      status: 'cancelled',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_CANCELLED',
        'Docker execution was cancelled.',
        false,
        safeDetails
      ),
    };
  }
  if (
    input.processResult.outcome === 'timed_out' ||
    input.processResult.outcome === 'idle_timed_out'
  ) {
    const idle = input.processResult.outcome === 'idle_timed_out';
    return {
      status: 'timed_out',
      exitCode: null,
      error: normalizedError(
        idle ? 'EXECUTION_IDLE_TIMEOUT' : 'EXECUTION_TIMEOUT',
        idle
          ? 'Docker execution exceeded its idle timeout.'
          : 'Docker execution exceeded its timeout.',
        true,
        safeDetails
      ),
    };
  }
  if (input.processResult.outcome === 'output_limit') {
    return {
      status: 'resource_exceeded',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_OUTPUT_LIMIT',
        'Docker execution exceeded its output limit.',
        false,
        safeDetails
      ),
    };
  }
  if (input.processResult.outcome === 'start_failed') {
    return {
      status: 'failed',
      exitCode: null,
      error: {
        ...normalizedError(
          'EXECUTION_PROCESS_START_FAILED',
          'Docker execution could not be started.',
          false,
          safeDetails
        ),
        ...(input.processResult.startErrorCode
          ? { providerCode: input.processResult.startErrorCode }
          : {}),
      },
    };
  }
  if (input.processResult.outcome === 'termination_failed') {
    return {
      status: 'failed',
      exitCode: input.processResult.exitCode,
      error: normalizedError(
        'EXECUTION_CLEANUP_FAILED',
        'Docker execution process termination could not be verified.',
        true,
        safeDetails
      ),
    };
  }
  return {
    status: 'failed',
    exitCode: input.processResult.exitCode,
    error: {
      ...normalizedError(
        'EXECUTION_INTERNAL_ERROR',
        `Docker execution exited with code ${String(input.processResult.exitCode)}.`,
        false,
        safeDetails
      ),
      ...(input.processResult.exitCode !== null
        ? { providerCode: input.processResult.exitCode }
        : {}),
    },
  };
}

function validateInput(input: BuildDockerTerminalResultInput): void {
  if (!isRecord(input)) throw new TypeError('Docker terminal result input must be an object.');
  nonEmptyString(input.providerId, 'Docker providerId');
  nonEmptyString(input.executionId, 'Docker executionId');
  nonEmptyString(input.sandboxId, 'Docker sandboxId');
  validContainerReference(input.containerReference);
  nonNegativeSafeInteger(input.revision, 'Docker result revision');
  validateProcessResult(input.processResult);
  validateInspection(input.inspection, input.containerReference);
  if (input.resourceSnapshot !== undefined) {
    validateResourceSnapshot(input.resourceSnapshot, input.containerReference);
  }
  if (input.resourceSnapshot !== undefined && input.resourceFailureCode !== undefined) {
    throw invalidEvidence('Docker resource snapshot and failure evidence are mutually exclusive.');
  }
  if (
    input.resourceFailureCode !== undefined &&
    !['DOCKER_COMMAND_FAILED', 'DOCKER_INVALID_RESPONSE', 'UNEXPECTED'].includes(
      input.resourceFailureCode
    )
  ) {
    throw invalidEvidence('Docker resource failure code is invalid.');
  }
  validateCleanup(input.cleanup);
  if (!Array.isArray(input.changedFiles)) {
    throw new TypeError('Docker changedFiles must be an array.');
  }
  if (!Array.isArray(input.generatedArtifactRefs)) {
    throw new TypeError('Docker generatedArtifactRefs must be an array.');
  }
  for (const reference of input.generatedArtifactRefs) {
    nonEmptyString(reference, 'Docker Artifact reference');
  }
  if (input.stdoutArtifactRef !== undefined) {
    nonEmptyString(input.stdoutArtifactRef, 'Docker stdout Artifact reference');
  }
  if (input.stderrArtifactRef !== undefined) {
    nonEmptyString(input.stderrArtifactRef, 'Docker stderr Artifact reference');
  }
}

function validateProcessResult(value: DockerCliResult): void {
  if (!isRecord(value)) throw invalidEvidence('Docker process result must be an object.');
  const outcomes = new Set([
    'exited',
    'start_failed',
    'cancelled',
    'timed_out',
    'idle_timed_out',
    'output_limit',
    'termination_failed',
  ]);
  if (typeof value.outcome !== 'string' || !outcomes.has(value.outcome)) {
    throw invalidEvidence('Docker process outcome is invalid.');
  }
  if (
    value.exitCode !== null &&
    (typeof value.exitCode !== 'number' || !Number.isSafeInteger(value.exitCode))
  ) {
    throw invalidEvidence('Docker process exit code is invalid.');
  }
  if (value.outcome === 'exited' && value.exitCode === null) {
    throw invalidEvidence('Exited Docker process evidence requires an exit code.');
  }
  if (typeof value.stdout !== 'string' || typeof value.stderr !== 'string') {
    throw invalidEvidence('Docker process output evidence is invalid.');
  }
  nonNegativeSafeInteger(value.observedStdoutBytes, 'Docker observed stdout bytes');
  nonNegativeSafeInteger(value.observedStderrBytes, 'Docker observed stderr bytes');
  nonNegativeSafeInteger(
    value.observedStdoutBytes + value.observedStderrBytes,
    'Docker total observed output bytes'
  );
  if (
    value.observedStdoutBytes < Buffer.byteLength(value.stdout) ||
    value.observedStderrBytes < Buffer.byteLength(value.stderr)
  ) {
    throw invalidEvidence('Docker observed output bytes are inconsistent.');
  }
  timestamp(value.startedAt, 'Docker process startedAt');
  timestamp(value.completedAt, 'Docker process completedAt');
  if (Date.parse(value.completedAt) < Date.parse(value.startedAt)) {
    throw invalidEvidence('Docker process completion precedes its start.');
  }
  if (
    typeof value.latencyMs !== 'number' ||
    !Number.isFinite(value.latencyMs) ||
    value.latencyMs < 0
  ) {
    throw invalidEvidence('Docker process latency is invalid.');
  }
  if (typeof value.processTreeTerminationVerified !== 'boolean') {
    throw invalidEvidence('Docker termination evidence is invalid.');
  }
  if (
    value.terminationMechanism !== 'posix_process_group' &&
    value.terminationMechanism !== 'windows_taskkill'
  ) {
    throw invalidEvidence('Docker termination mechanism is invalid.');
  }
  if (
    value.outputLimitStream !== undefined &&
    !['stdout', 'stderr', 'combined'].includes(value.outputLimitStream)
  ) {
    throw invalidEvidence('Docker output-limit stream is invalid.');
  }
  if (value.outcome === 'output_limit' && value.outputLimitStream === undefined) {
    throw invalidEvidence('Docker output-limit evidence requires the limiting stream.');
  }
  if (value.signal !== undefined) nonEmptyString(value.signal, 'Docker process signal');
  if (value.startErrorCode !== undefined) {
    nonEmptyString(value.startErrorCode, 'Docker process start error code');
  }
}

function validateInspection(value: DockerContainerInspection, containerReference: string): void {
  if (!isRecord(value)) throw invalidEvidence('Docker inspection must be an object.');
  if (value.id !== containerReference) {
    throw invalidEvidence('Docker inspection identity does not match the execution container.');
  }
  if (
    typeof value.running !== 'boolean' ||
    typeof value.oomKilled !== 'boolean' ||
    typeof value.status !== 'string' ||
    value.status.trim().length === 0 ||
    value.status.includes('\u0000') ||
    !Number.isSafeInteger(value.exitCode) ||
    typeof value.imageDigest !== 'string' ||
    !/^sha256:[0-9a-f]{64}$/.test(value.imageDigest)
  ) {
    throw invalidEvidence('Docker inspection evidence is invalid.');
  }
  if (value.startedAt !== undefined) timestamp(value.startedAt, 'Docker inspection startedAt');
  if (value.finishedAt !== undefined) timestamp(value.finishedAt, 'Docker inspection finishedAt');
}

function validateResourceSnapshot(
  value: DockerResourceSnapshot,
  containerReference: string
): void {
  if (!isRecord(value)) throw invalidEvidence('Docker resource snapshot must be an object.');
  if (value.containerReference !== containerReference) {
    throw invalidEvidence('Docker resource snapshot identity does not match the execution container.');
  }
  nonNegativeFiniteNumber(value.cpuPercent, 'Docker CPU percentage');
  nonNegativeSafeInteger(value.memoryUsageBytes, 'Docker memory usage bytes');
  nonNegativeSafeInteger(value.memoryLimitBytes, 'Docker memory limit bytes');
  nonNegativeFiniteNumber(value.memoryPercent, 'Docker memory percentage');
  nonNegativeSafeInteger(value.processCount, 'Docker process count');
  nonNegativeSafeInteger(value.blockReadBytes, 'Docker block read bytes');
  nonNegativeSafeInteger(value.blockWriteBytes, 'Docker block write bytes');
}

function validateCleanup(value: DockerExecutionCleanupEvidence): void {
  if (
    !isRecord(value) ||
    typeof value.complete !== 'boolean' ||
    typeof value.containerAbsent !== 'boolean' ||
    typeof value.stopAttempted !== 'boolean'
  ) {
    throw invalidEvidence('Docker cleanup evidence is invalid.');
  }
  if (value.complete && !value.containerAbsent) {
    throw invalidEvidence('Complete Docker cleanup must confirm the container is absent.');
  }
  if ((value.failureStage === undefined) !== (value.failureCode === undefined)) {
    throw invalidEvidence('Docker cleanup failure evidence is incomplete.');
  }
  if (
    value.failureStage !== undefined &&
    !['inspect', 'stop', 'remove'].includes(value.failureStage)
  ) {
    throw invalidEvidence('Docker cleanup failure stage is invalid.');
  }
  if (
    value.failureCode !== undefined &&
    !['DOCKER_COMMAND_FAILED', 'DOCKER_INVALID_RESPONSE', 'UNEXPECTED'].includes(value.failureCode)
  ) {
    throw invalidEvidence('Docker cleanup failure code is invalid.');
  }
}

function ensureUniqueReferences(references: string[]): void {
  if (new Set(references).size !== references.length) {
    throw invalidEvidence('Docker generated Artifact references must be unique.');
  }
}

function normalizedError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details: Record<string, unknown>
): NormalizedExecutionError {
  return { code, message, retryable, details };
}

function invalidEvidence(message: string): DockerEngineClientError {
  return new DockerEngineClientError(message, 'DOCKER_INVALID_RESPONSE', 'terminal evidence');
}

function nonEmptyString(value: unknown, name: string): string {
  if (typeof value !== 'string' || value.trim().length === 0 || value.includes('\u0000')) {
    throw new TypeError(`${name} must be a non-empty string containing no NUL bytes.`);
  }
  return value;
}

function nonNegativeSafeInteger(value: unknown, name: string): void {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative safe integer.`);
  }
}

function nonNegativeFiniteNumber(value: unknown, name: string): void {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError(`${name} must be a non-negative finite number.`);
  }
}

function timestamp(value: unknown, name: string): void {
  if (typeof value !== 'string' || !Number.isFinite(Date.parse(value))) {
    throw invalidEvidence(`${name} is invalid.`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
