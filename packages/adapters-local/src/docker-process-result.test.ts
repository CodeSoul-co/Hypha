import type { CommandExecutionRequest } from '@hypha/core';
import { describe, expect, it } from 'vitest';
import type { DockerCliResult } from './docker-cli-transport';
import type { DockerContainerInspection } from './docker-engine-client';
import { buildDockerProcessResult } from './docker-process-result';
import { DockerResourceAccountant } from './docker-resource-accounting';

const digest = `sha256:${'a'.repeat(64)}`;

describe('buildDockerProcessResult', () => {
  it('builds deterministic success, receipt, mutation, resource, and termination evidence', () => {
    const result = build('exited', 0);

    expect(result).toMatchObject({
      executionId: 'execution.docker.result',
      revision: 3,
      sandboxId: 'sandbox.docker.result',
      status: 'completed',
      exitCode: 0,
      stdout: 'hello',
      stderr: 'err',
      stdoutContentHash: 'sha256:2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
      stderrContentHash: 'sha256:d9eb253e06987fa74a5d3189f73d9f7a8104cca786fafbb52bc9555972f5477f',
      changedFiles: [
        { path: 'result.txt', operation: 'created', detectedAt: '2026-07-18T00:00:01.000Z' },
      ],
      generatedArtifactRefs: [],
      resourceUsage: {
        outputBytes: 8,
        peakMemoryBytes: 4_096,
        processCountPeak: 2,
      },
      externalReceipt: {
        providerId: 'provider.docker',
        executionId: 'execution.docker.result',
        providerExecutionRef: 'container123',
        status: 'completed',
        issuedAt: '2026-07-18T00:00:01.000Z',
        metadata: {
          containerId: 'container123',
          imageDigest: digest,
          containerStatus: 'exited',
        },
      },
      metadata: {
        accountingMode: 'docker_stats_snapshot',
        metricsCollected: true,
        processTreeKillScope: 'container',
        processTreeTerminationVerified: true,
      },
    });
    expect(result.externalReceipt?.receiptHash).toMatch(/^sha256:[0-9a-f]{64}$/u);
  });

  it.each([
    ['cancelled', null, 'cancelled', 'EXECUTION_CANCELLED', false, 4],
    ['timed_out', null, 'timed_out', 'EXECUTION_TIMEOUT', true, 3],
    ['idle_timed_out', null, 'timed_out', 'EXECUTION_IDLE_TIMEOUT', true, 3],
    ['output_limit', null, 'resource_exceeded', 'EXECUTION_OUTPUT_LIMIT', false, 3],
    ['start_failed', null, 'failed', 'EXECUTION_PROCESS_START_FAILED', true, 3],
    ['exited', 7, 'failed', 'EXECUTION_INTERNAL_ERROR', false, 3],
  ] satisfies Array<[DockerCliResult['outcome'], number | null, string, string, boolean, number]>)(
    'normalizes %s into a stable execution result',
    (outcome, exitCode, status, errorCode, retryable, revision) => {
      const result = build(outcome, exitCode, outcome === 'output_limit' ? 'stderr' : undefined);
      expect(result).toMatchObject({
        status,
        revision,
        error: {
          code: errorCode,
          retryable,
          details: {
            observedStdoutBytes: 5,
            observedStderrBytes: 3,
            ...(outcome === 'output_limit' ? { outputLimitStream: 'stderr' } : {}),
          },
        },
      });
      if (outcome === 'exited') {
        expect(result.error?.providerCode).toBe(7);
      }
    }
  );

  it('falls back to Sandbox identity and does not claim process-tree proof without inspection', () => {
    const result = buildDockerProcessResult({
      providerId: 'provider.docker',
      request: request(),
      executionId: 'execution.docker.result',
      command: command('exited', 0),
      inspection: null,
      changedFiles: [],
      accountant: new DockerResourceAccountant(),
    });

    expect(result).toMatchObject({
      externalReceipt: {
        providerExecutionRef: 'sandbox.docker.result',
        metadata: { containerId: 'sandbox.docker.result' },
      },
      resourceUsage: { outputBytes: 8 },
      metadata: {
        accountingMode: 'docker_output_only',
        metricsCollected: false,
        processTreeTerminationVerified: false,
      },
    });
  });

  it('normalizes Docker Engine OOM evidence as resource exhaustion', () => {
    const result = buildDockerProcessResult({
      providerId: 'provider.docker',
      request: request(),
      executionId: 'execution.docker.result',
      command: command('exited', 137),
      inspection: inspection(digest, true),
      changedFiles: [],
      accountant: new DockerResourceAccountant(),
    });

    expect(result).toMatchObject({
      status: 'oom_killed',
      exitCode: 137,
      error: {
        code: 'EXECUTION_OOM_KILLED',
        retryable: false,
        details: { oomKilled: true },
      },
      metadata: { oomKilled: true },
    });
  });

  it('binds the receipt hash to immutable container evidence', () => {
    const first = build('exited', 0);
    const repeated = build('exited', 0);
    const changed = buildDockerProcessResult({
      providerId: 'provider.docker',
      request: request(),
      executionId: 'execution.docker.result',
      command: command('exited', 0),
      inspection: inspection(`sha256:${'b'.repeat(64)}`),
      changedFiles: [
        { path: 'result.txt', operation: 'created', detectedAt: '2026-07-18T00:00:01.000Z' },
      ],
      accountant: new DockerResourceAccountant(),
    });

    expect(first.externalReceipt?.receiptHash).toBe(repeated.externalReceipt?.receiptHash);
    expect(changed.externalReceipt?.receiptHash).not.toBe(first.externalReceipt?.receiptHash);
  });
});

function build(
  outcome: DockerCliResult['outcome'],
  exitCode: number | null,
  outputLimitStream?: DockerCliResult['outputLimitStream']
) {
  return buildDockerProcessResult({
    providerId: 'provider.docker',
    request: request(),
    executionId: 'execution.docker.result',
    command: command(outcome, exitCode, outputLimitStream),
    inspection: inspection(digest),
    resourceSnapshot: {
      memoryBytes: 4_096,
      cpuPercent: 1,
      processCount: 2,
    },
    changedFiles: [
      { path: 'result.txt', operation: 'created', detectedAt: '2026-07-18T00:00:01.000Z' },
    ],
    accountant: new DockerResourceAccountant(),
  });
}

function command(
  outcome: DockerCliResult['outcome'],
  exitCode: number | null,
  outputLimitStream?: DockerCliResult['outputLimitStream']
): DockerCliResult {
  return {
    outcome,
    exitCode,
    stdout: 'hello',
    stderr: 'err',
    observedStdoutBytes: 5,
    observedStderrBytes: 3,
    startedAt: '2026-07-18T00:00:00.000Z',
    completedAt: '2026-07-18T00:00:01.000Z',
    latencyMs: 1_000,
    terminationMechanism: 'posix_process_group',
    processTreeTerminationVerified: false,
    ...(outputLimitStream ? { outputLimitStream } : {}),
  };
}

function inspection(imageDigest: string, oomKilled = false): DockerContainerInspection {
  return {
    id: 'container123',
    running: false,
    oomKilled,
    status: 'exited',
    exitCode: 0,
    imageDigest,
  };
}

function request(): CommandExecutionRequest {
  return {
    executionId: 'execution.docker.result',
    operationId: 'operation.docker.result',
    principal: {
      principalId: 'principal.docker.result',
      type: 'user',
      userId: 'user.docker.result',
      permissionScopes: ['execution.run'],
    },
    userId: 'user.docker.result',
    workspaceId: 'workspace.docker.result',
    runId: 'run.docker.result',
    sandboxId: 'sandbox.docker.result',
    environmentRef: { id: 'execution-environment.docker.safe', version: '0.1.0' },
    executable: 'cp',
  };
}
