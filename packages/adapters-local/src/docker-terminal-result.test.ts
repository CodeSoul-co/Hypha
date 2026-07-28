import { describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import type { DockerContainerInspection } from './docker-engine-boundary';
import {
  buildDockerTerminalResult,
  type BuildDockerTerminalResultInput,
} from './docker-terminal-result';

const digest = `sha256:${'a'.repeat(64)}`;

describe('buildDockerTerminalResult', () => {
  it('builds a runtime-validated success receipt from execution, resource, and cleanup evidence', () => {
    const result = buildDockerTerminalResult(
      terminalInput({
        resourceSnapshot: {
          cpuPercent: 25.5,
          memoryUsageBytes: 10_485_760,
          memoryLimitBytes: 134_217_728,
          memoryPercent: 7.81,
          processCount: 3,
          blockReadBytes: 4_096,
          blockWriteBytes: 8_192,
        },
      })
    );

    expect(result).toMatchObject({
      executionId: 'execution.docker.1',
      revision: 3,
      sandboxId: 'sandbox.docker.1',
      status: 'completed',
      exitCode: 0,
      stdout: 'output',
      stdoutContentHash: 'sha256:e0ee8bb50685e05fa0f47ed04203ae953fdfd055f5bd2892ea186504254f8c3a',
      resourceUsage: {
        outputBytes: 13,
        readBytes: 4_096,
        writtenBytes: 8_192,
      },
      externalReceipt: {
        providerId: 'provider.docker',
        executionId: 'execution.docker.1',
        providerExecutionRef: 'container123',
        status: 'completed',
        metadata: { cleanupComplete: true, oomKilled: false },
      },
      metadata: {
        accountingMode: 'docker_point_in_time_stats',
        containerRunningAtInspection: true,
        cleanup: {
          complete: true,
          containerAbsent: true,
          stopAttempted: true,
        },
      },
    });
    expect(result.externalReceipt?.receiptHash).toMatch(/^sha256:[0-9a-f]{64}$/);
  });

  it('maps Docker OOM evidence ahead of the process exit outcome', () => {
    const result = buildDockerTerminalResult(
      terminalInput({
        processResult: processResult({ exitCode: 137 }),
        inspection: inspection({ running: false, oomKilled: true, exitCode: 137 }),
      })
    );

    expect(result).toMatchObject({
      status: 'oom_killed',
      exitCode: 137,
      error: {
        code: 'EXECUTION_OOM_KILLED',
        retryable: false,
        details: { oomKilled: true },
      },
    });
  });

  it.each([
    [
      'cancelled',
      processResult({ outcome: 'cancelled', exitCode: null }),
      'cancelled',
      'EXECUTION_CANCELLED',
    ],
    [
      'timeout',
      processResult({ outcome: 'timed_out', exitCode: null }),
      'timed_out',
      'EXECUTION_TIMEOUT',
    ],
    [
      'idle timeout',
      processResult({ outcome: 'idle_timed_out', exitCode: null }),
      'timed_out',
      'EXECUTION_IDLE_TIMEOUT',
    ],
    [
      'output limit',
      processResult({ outcome: 'output_limit', exitCode: null, outputLimitStream: 'stdout' }),
      'resource_exceeded',
      'EXECUTION_OUTPUT_LIMIT',
    ],
    [
      'start failure',
      processResult({ outcome: 'start_failed', exitCode: null, startErrorCode: 'ENOENT' }),
      'failed',
      'EXECUTION_PROCESS_START_FAILED',
    ],
    [
      'termination failure',
      processResult({ outcome: 'termination_failed', exitCode: null }),
      'failed',
      'EXECUTION_CLEANUP_FAILED',
    ],
    ['non-zero exit', processResult({ exitCode: 7 }), 'failed', 'EXECUTION_INTERNAL_ERROR'],
  ])('normalizes %s', (_name, process, status, errorCode) => {
    expect(buildDockerTerminalResult(terminalInput({ processResult: process }))).toMatchObject({
      status,
      error: { code: errorCode },
    });
  });

  it('turns a successful command with incomplete cleanup into a cleanup failure', () => {
    const result = buildDockerTerminalResult(
      terminalInput({
        cleanup: {
          complete: false,
          containerAbsent: false,
          stopAttempted: true,
          failureStage: 'remove',
          failureCode: 'DOCKER_COMMAND_FAILED',
        },
      })
    );

    expect(result).toMatchObject({
      status: 'failed',
      exitCode: 0,
      error: {
        code: 'EXECUTION_CLEANUP_FAILED',
        retryable: true,
        details: {
          cleanupComplete: false,
          cleanupFailureStage: 'remove',
          cleanupFailureCode: 'DOCKER_COMMAND_FAILED',
        },
      },
      externalReceipt: { metadata: { cleanupComplete: false } },
    });
  });

  it('uses confirmed container absence as workload process-tree termination evidence', () => {
    const result = buildDockerTerminalResult(
      terminalInput({
        processResult: processResult({ processTreeTerminationVerified: false }),
      })
    );

    expect(result.metadata).toMatchObject({ processTreeTerminationVerified: true });
  });

  it('does not claim process-tree termination when CLI and container cleanup are unverified', () => {
    const result = buildDockerTerminalResult(
      terminalInput({
        processResult: processResult({ processTreeTerminationVerified: false }),
        cleanup: {
          complete: false,
          containerAbsent: false,
          stopAttempted: true,
          failureStage: 'remove',
          failureCode: 'DOCKER_COMMAND_FAILED',
        },
      })
    );

    expect(result.metadata).toMatchObject({ processTreeTerminationVerified: false });
  });

  it('requires Artifact references for truncated output and includes them exactly once', () => {
    const process = processResult({
      stdout: 'bounded',
      observedStdoutBytes: 100,
    });
    expect(() => buildDockerTerminalResult(terminalInput({ processResult: process }))).toThrow(
      'requires an Artifact reference'
    );

    expect(
      buildDockerTerminalResult(
        terminalInput({
          processResult: process,
          stdoutArtifactRef: 'artifact:stdout',
        })
      )
    ).toMatchObject({
      stdoutTruncated: true,
      stdoutArtifactRef: 'artifact:stdout',
      generatedArtifactRefs: ['artifact:stdout'],
    });
  });

  it.each([
    [
      'mismatched inspection identity',
      { inspection: inspection({ id: 'different-container' }) },
      'inspection identity does not match',
    ],
    [
      'inconsistent observed output size',
      { processResult: processResult({ observedStdoutBytes: 1 }) },
      'observed output bytes are inconsistent',
    ],
    [
      'completion before start',
      {
        processResult: processResult({
          startedAt: '2026-07-27T00:00:02.000Z',
          completedAt: '2026-07-27T00:00:01.000Z',
        }),
      },
      'completion precedes its start',
    ],
    [
      'complete cleanup with present container',
      {
        cleanup: {
          complete: true,
          containerAbsent: false,
          stopAttempted: true,
        },
      },
      'must confirm the container is absent',
    ],
    [
      'partial cleanup failure fields',
      {
        cleanup: {
          complete: false,
          containerAbsent: false,
          stopAttempted: true,
          failureStage: 'remove',
        },
      },
      'failure evidence is incomplete',
    ],
    [
      'duplicate Artifact reference',
      {
        generatedArtifactRefs: ['artifact:one'],
        stdoutArtifactRef: 'artifact:one',
      },
      'must be unique',
    ],
    [
      'invalid resource snapshot',
      {
        resourceSnapshot: {
          cpuPercent: -1,
          memoryUsageBytes: 1,
          memoryLimitBytes: 2,
          memoryPercent: 50,
          processCount: 1,
          blockReadBytes: 0,
          blockWriteBytes: 0,
        },
      },
      'CPU percentage must be a non-negative finite number',
    ],
    [
      'output limit without stream evidence',
      {
        processResult: processResult({
          outcome: 'output_limit',
          exitCode: null,
        }),
      },
      'requires the limiting stream',
    ],
    [
      'invalid termination mechanism',
      {
        processResult: {
          ...processResult(),
          terminationMechanism: 'unverified',
        },
      },
      'termination mechanism is invalid',
    ],
    [
      'invalid inspection digest',
      {
        inspection: inspection({ imageDigest: 'latest' }),
      },
      'inspection evidence is invalid',
    ],
  ])('fails closed for %s', (_name, overrides, message) => {
    expect(() =>
      buildDockerTerminalResult(terminalInput(overrides as Partial<BuildDockerTerminalResultInput>))
    ).toThrow(message);
  });

  it('does not copy Docker stderr or internal process errors into public errors or receipts', () => {
    const secret = 'private-daemon-secret';
    const result = buildDockerTerminalResult(
      terminalInput({
        processResult: processResult({
          outcome: 'start_failed',
          exitCode: null,
          stderr: secret,
          observedStderrBytes: Buffer.byteLength(secret),
          startErrorMessage: secret,
          terminationErrorMessage: secret,
        }),
      })
    );

    expect(JSON.stringify(result.error)).not.toContain(secret);
    expect(JSON.stringify(result.externalReceipt)).not.toContain(secret);
  });

  it('binds the deterministic receipt hash to resource, cleanup, and Artifact evidence', () => {
    const baseline = buildDockerTerminalResult(terminalInput());
    const repeated = buildDockerTerminalResult(terminalInput());
    const changedResource = buildDockerTerminalResult(
      terminalInput({
        resourceSnapshot: {
          cpuPercent: 1,
          memoryUsageBytes: 1,
          memoryLimitBytes: 2,
          memoryPercent: 50,
          processCount: 1,
          blockReadBytes: 0,
          blockWriteBytes: 0,
        },
      })
    );
    const changedArtifact = buildDockerTerminalResult(
      terminalInput({
        stdoutArtifactRef: 'artifact:stdout',
      })
    );
    const replacedArtifact = buildDockerTerminalResult(
      terminalInput({
        stdoutArtifactRef: 'artifact:replacement',
      })
    );

    expect(repeated.externalReceipt?.receiptHash).toBe(baseline.externalReceipt?.receiptHash);
    expect(changedResource.externalReceipt?.receiptHash).not.toBe(
      baseline.externalReceipt?.receiptHash
    );
    expect(changedArtifact.externalReceipt?.receiptHash).not.toBe(
      baseline.externalReceipt?.receiptHash
    );
    expect(replacedArtifact.externalReceipt?.receiptHash).not.toBe(
      changedArtifact.externalReceipt?.receiptHash
    );
    expect(changedArtifact.externalReceipt?.metadata).toMatchObject({
      generatedArtifactCount: 1,
    });
  });
});

function terminalInput(
  overrides: Partial<BuildDockerTerminalResultInput> = {}
): BuildDockerTerminalResultInput {
  return {
    providerId: 'provider.docker',
    executionId: 'execution.docker.1',
    revision: 3,
    sandboxId: 'sandbox.docker.1',
    containerReference: 'container123',
    processResult: processResult(),
    inspection: inspection(),
    cleanup: {
      complete: true,
      containerAbsent: true,
      stopAttempted: true,
    },
    changedFiles: [],
    generatedArtifactRefs: [],
    ...overrides,
  };
}

function processResult(overrides: Partial<DockerCliResult> = {}): DockerCliResult {
  return {
    outcome: 'exited',
    exitCode: 0,
    stdout: 'output',
    stderr: 'warning',
    observedStdoutBytes: 6,
    observedStderrBytes: 7,
    startedAt: '2026-07-27T00:00:00.000Z',
    completedAt: '2026-07-27T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: true,
    ...overrides,
  };
}

function inspection(overrides: Partial<DockerContainerInspection> = {}): DockerContainerInspection {
  return {
    id: 'container123',
    running: true,
    oomKilled: false,
    status: 'running',
    exitCode: 0,
    imageDigest: digest,
    ...overrides,
  };
}
