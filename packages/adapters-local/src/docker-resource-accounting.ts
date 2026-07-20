import type { ExecutionResourceUsage } from '@hypha/core';
import type { DockerCliResult } from './docker-cli-transport';
import type { DockerResourceSnapshot } from './docker-engine-client';

export interface DockerResourceEvidence {
  usage: ExecutionResourceUsage;
  metadata: Record<string, unknown>;
}

export class DockerResourceAccountant {
  account(command: DockerCliResult, snapshot?: DockerResourceSnapshot): DockerResourceEvidence {
    return {
      usage: {
        outputBytes: command.observedStdoutBytes + command.observedStderrBytes,
        ...(snapshot?.memoryBytes !== undefined ? { peakMemoryBytes: snapshot.memoryBytes } : {}),
        ...(snapshot?.processCount !== undefined
          ? { processCountPeak: snapshot.processCount }
          : {}),
        ...(snapshot?.blockReadBytes !== undefined ? { readBytes: snapshot.blockReadBytes } : {}),
        ...(snapshot?.blockWriteBytes !== undefined
          ? { writtenBytes: snapshot.blockWriteBytes }
          : {}),
      },
      metadata: {
        accountingMode: snapshot ? 'docker_stats_snapshot' : 'docker_output_only',
        metricsCollected: Boolean(snapshot),
        ...(snapshot?.cpuPercent !== undefined ? { cpuPercentage: snapshot.cpuPercent } : {}),
        observedStdoutBytes: command.observedStdoutBytes,
        observedStderrBytes: command.observedStderrBytes,
        ...(command.outputLimitStream ? { outputLimitStream: command.outputLimitStream } : {}),
      },
    };
  }
}
