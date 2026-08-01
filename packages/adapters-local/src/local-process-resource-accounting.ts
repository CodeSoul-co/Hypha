import type { ExecutionResourceUsage } from '@hypha/core';
import type { LocalProcessRunResult } from './local-process-supervisor';

export interface LocalProcessResourceEvidence {
  usage: ExecutionResourceUsage;
  metadata: Record<string, unknown>;
}

/** Reports only evidence the host Local Process adapter can actually observe. */
export class LocalProcessResourceAccountant {
  account(result: LocalProcessRunResult): LocalProcessResourceEvidence {
    return {
      usage: {
        outputBytes: result.observedStdoutBytes + result.observedStderrBytes,
        processCountPeak: 1,
      },
      metadata: {
        accountingMode: 'local_observed_output_only',
        cpuTimeAvailable: false,
        peakMemoryAvailable: false,
        terminationMechanism: result.terminationMechanism,
        processTreeTerminationVerified: result.processTreeTerminationVerified,
        observedStdoutBytes: result.observedStdoutBytes,
        observedStderrBytes: result.observedStderrBytes,
        ...(result.outputLimitStream ? { outputLimitStream: result.outputLimitStream } : {}),
      },
    };
  }
}
