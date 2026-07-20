import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  FileMutation,
  NormalizedExecutionError,
} from '@hypha/core';
import { hashExecutionValue, shortExecutionHash } from './execution-provider-values';
import { LocalProcessResourceAccountant } from './local-process-resource-accounting';
import type { LocalProcessRunResult } from './local-process-supervisor';

export interface BuildLocalProcessResultInput {
  providerId: string;
  request: CommandExecutionRequest;
  executionId: string;
  processResult: LocalProcessRunResult;
  changedFiles: FileMutation[];
  resourceAccountant: LocalProcessResourceAccountant;
}

export function buildLocalProcessResult(
  input: BuildLocalProcessResultInput
): CommandExecutionResult {
  const terminal = mapProcessOutcome(input.processResult);
  const resource = input.resourceAccountant.account(input.processResult);
  const receiptBody = {
    providerId: input.providerId,
    executionId: input.executionId,
    status: terminal.status,
    exitCode: terminal.exitCode,
    completedAt: input.processResult.completedAt,
  };
  return {
    executionId: input.executionId,
    revision: terminal.status === 'cancelled' ? 4 : 3,
    sandboxId: input.request.sandboxId!,
    status: terminal.status,
    exitCode: terminal.exitCode,
    ...(input.processResult.signal ? { signal: input.processResult.signal } : {}),
    stdout: input.processResult.stdout,
    stderr: input.processResult.stderr,
    changedFiles: input.changedFiles,
    generatedArtifactRefs: [],
    resourceUsage: resource.usage,
    externalReceipt: {
      id: `receipt.local.${shortExecutionHash(input.executionId)}`,
      providerId: input.providerId,
      executionId: input.executionId,
      ...(input.processResult.processId
        ? { providerExecutionRef: String(input.processResult.processId) }
        : {}),
      status: 'completed',
      issuedAt: input.processResult.completedAt,
      receiptHash: hashExecutionValue(receiptBody),
    },
    startedAt: input.processResult.startedAt,
    completedAt: input.processResult.completedAt,
    latencyMs: input.processResult.latencyMs,
    ...(terminal.error ? { error: terminal.error } : {}),
    metadata: resource.metadata,
  };
}

function mapProcessOutcome(result: LocalProcessRunResult): {
  status: CommandExecutionResult['status'];
  exitCode: number | null;
  error?: NormalizedExecutionError;
} {
  const details = {
    terminationMechanism: result.terminationMechanism,
    processTreeTerminationVerified: result.processTreeTerminationVerified,
    observedStdoutBytes: result.observedStdoutBytes,
    observedStderrBytes: result.observedStderrBytes,
    ...(result.outputLimitStream ? { outputLimitStream: result.outputLimitStream } : {}),
  };
  if (result.outcome === 'exited' && result.exitCode === 0) {
    return { status: 'completed', exitCode: 0 };
  }
  if (result.outcome === 'cancelled') {
    return {
      status: 'cancelled',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_CANCELLED',
        'Local Process execution was cancelled.',
        false,
        details
      ),
    };
  }
  if (result.outcome === 'timed_out' || result.outcome === 'idle_timed_out') {
    const idle = result.outcome === 'idle_timed_out';
    return {
      status: 'timed_out',
      exitCode: null,
      error: normalizedError(
        idle ? 'EXECUTION_IDLE_TIMEOUT' : 'EXECUTION_TIMEOUT',
        idle
          ? 'Local Process execution exceeded its idle timeout.'
          : 'Local Process execution exceeded its timeout.',
        true,
        details
      ),
    };
  }
  if (result.outcome === 'output_limit') {
    return {
      status: 'resource_exceeded',
      exitCode: null,
      error: normalizedError(
        'EXECUTION_OUTPUT_LIMIT',
        'Local Process execution exceeded its output limit.',
        false,
        details
      ),
    };
  }
  if (result.outcome === 'start_failed') {
    return {
      status: 'failed',
      exitCode: null,
      error: {
        ...normalizedError(
          'EXECUTION_PROCESS_START_FAILED',
          'Local Process could not be started.',
          false,
          details
        ),
        providerCode: (result.startError as NodeJS.ErrnoException | undefined)?.code,
      },
    };
  }
  return {
    status: 'failed',
    exitCode: result.exitCode,
    error: {
      ...normalizedError(
        'EXECUTION_INTERNAL_ERROR',
        `Local Process exited with code ${String(result.exitCode)}.`,
        false,
        details
      ),
      providerCode: result.exitCode ?? undefined,
    },
  };
}

function normalizedError(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details: Record<string, unknown>
): NormalizedExecutionError {
  return { code, message, retryable, details };
}
