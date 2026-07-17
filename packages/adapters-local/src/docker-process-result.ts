import type {
  CommandExecutionRequest,
  CommandExecutionResult,
  FileMutation,
  NormalizedExecutionError,
} from '@hypha/core';
import type { DockerCliResult } from './docker-cli-transport';
import type { DockerContainerInspection, DockerResourceSnapshot } from './docker-engine-client';
import { DockerResourceAccountant } from './docker-resource-accounting';
import { hashExecutionValue, shortExecutionHash } from './execution-provider-values';

export interface BuildDockerProcessResultInput {
  providerId: string;
  request: CommandExecutionRequest;
  executionId: string;
  command: DockerCliResult;
  inspection: DockerContainerInspection | null;
  resourceSnapshot?: DockerResourceSnapshot;
  changedFiles: FileMutation[];
  accountant: DockerResourceAccountant;
}

export function buildDockerProcessResult(
  input: BuildDockerProcessResultInput
): CommandExecutionResult {
  const terminal = mapOutcome(input.command);
  const resource = input.accountant.account(input.command, input.resourceSnapshot);
  const receiptMetadata = {
    containerId: input.inspection?.id ?? input.request.sandboxId!,
    imageDigest: input.inspection?.imageDigest,
    containerStatus: input.inspection?.status,
  };
  return {
    executionId: input.executionId,
    revision: terminal.status === 'cancelled' ? 4 : 3,
    sandboxId: input.request.sandboxId!,
    status: terminal.status,
    exitCode: terminal.exitCode,
    stdout: input.command.stdout,
    stderr: input.command.stderr,
    changedFiles: input.changedFiles,
    generatedArtifactRefs: [],
    resourceUsage: resource.usage,
    externalReceipt: {
      id: `receipt.docker.${shortExecutionHash(`${input.executionId}:${input.command.completedAt}`)}`,
      providerId: input.providerId,
      executionId: input.executionId,
      providerExecutionRef: input.inspection?.id ?? input.request.sandboxId!,
      status: 'completed',
      issuedAt: input.command.completedAt,
      receiptHash: hashExecutionValue(receiptMetadata),
      metadata: receiptMetadata,
    },
    startedAt: input.command.startedAt,
    completedAt: input.command.completedAt,
    latencyMs: input.command.latencyMs,
    ...(terminal.error ? { error: terminal.error } : {}),
    metadata: {
      ...resource.metadata,
      processTreeKillScope: 'container',
      processTreeTerminationVerified: input.inspection ? !input.inspection.running : false,
    },
  };
}

function mapOutcome(command: DockerCliResult): {
  status: CommandExecutionResult['status'];
  exitCode: number | null;
  error?: NormalizedExecutionError;
} {
  const details = {
    observedStdoutBytes: command.observedStdoutBytes,
    observedStderrBytes: command.observedStderrBytes,
    ...(command.outputLimitStream ? { outputLimitStream: command.outputLimitStream } : {}),
  };
  if (command.outcome === 'exited' && command.exitCode === 0) {
    return { status: 'completed', exitCode: 0 };
  }
  if (command.outcome === 'cancelled') {
    return {
      status: 'cancelled',
      exitCode: null,
      error: normalized('EXECUTION_CANCELLED', 'Docker execution was cancelled.', false, details),
    };
  }
  if (command.outcome === 'timed_out' || command.outcome === 'idle_timed_out') {
    const idle = command.outcome === 'idle_timed_out';
    return {
      status: 'timed_out',
      exitCode: null,
      error: normalized(
        idle ? 'EXECUTION_IDLE_TIMEOUT' : 'EXECUTION_TIMEOUT',
        idle
          ? 'Docker execution exceeded its idle timeout.'
          : 'Docker execution exceeded its timeout.',
        true,
        details
      ),
    };
  }
  if (command.outcome === 'output_limit') {
    return {
      status: 'resource_exceeded',
      exitCode: null,
      error: normalized(
        'EXECUTION_OUTPUT_LIMIT',
        'Docker execution exceeded its output limit.',
        false,
        details
      ),
    };
  }
  if (command.outcome === 'start_failed') {
    return {
      status: 'failed',
      exitCode: null,
      error: normalized(
        'EXECUTION_PROCESS_START_FAILED',
        'Docker CLI could not be started.',
        true,
        details
      ),
    };
  }
  return {
    status: 'failed',
    exitCode: command.exitCode,
    error: {
      ...normalized(
        'EXECUTION_INTERNAL_ERROR',
        `Docker command exited with code ${String(command.exitCode)}.`,
        false,
        details
      ),
      providerCode: command.exitCode ?? undefined,
    },
  };
}

function normalized(
  code: NormalizedExecutionError['code'],
  message: string,
  retryable: boolean,
  details: Record<string, unknown>
): NormalizedExecutionError {
  return { code, message, retryable, details };
}
