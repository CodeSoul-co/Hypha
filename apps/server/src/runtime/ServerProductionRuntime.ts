import {
  FrameworkError,
  type RuntimeActivityReconciliationPort,
  type RuntimeActivityRedispatchRecoveryPort,
  type RuntimeCancellationRecoveryPort,
  type RuntimeRecoveryCandidateReason,
  type RuntimeRecoveryRequeuePort,
} from '@codesoul-co/core';
import type { FSMProcessSpec } from '@codesoul-co/fsm';
import type { BoundedStateExecutorInput } from '@codesoul-co/harness';
import type { InferenceProvider } from '@codesoul-co/inference';
import type { ToolRunner } from '@codesoul-co/tools';
import { RuntimeTransitionDispatcher } from './RuntimeTransitionDispatcher';
import type { ServerRuntimeCompositionBindings } from './ServerRuntimeComposition';
import type { ServerRuntimeWorkerBindings } from './ServerRuntimeWorkerLifecycle';

export interface ServerProductionRuntimeOptions {
  inference: InferenceProvider;
  toolRunner: ToolRunner;
  fsmSpec: FSMProcessSpec;
  workerId: string;
  leaseTtlMs: number;
  pageLimit: number;
  timerPollIntervalMs: number;
  timerErrorBackoffMs: number;
  recoveryPollIntervalMs: number;
  recoveryErrorBackoffMs: number;
  autoRecoverReasons: readonly RuntimeRecoveryCandidateReason[];
  cancellations: RuntimeCancellationRecoveryPort;
}

export interface ServerProductionRuntimeBindings {
  execution: ServerRuntimeCompositionBindings;
  workers: ServerRuntimeWorkerBindings;
  transitions: RuntimeTransitionDispatcher;
}

/**
 * Creates the production Server handoff into the canonical Runtime graph.
 *
 * Only projection repair is enabled by the default configuration. Ports for
 * side-effect reconciliation remain fail-closed until their concrete owner
 * provider is bound; this prevents a recovery loop from fabricating receipts,
 * silently replaying external effects, or treating an unknown outcome as safe.
 */
export function createServerProductionRuntime(
  options: ServerProductionRuntimeOptions
): Readonly<ServerProductionRuntimeBindings> {
  const transitions = new RuntimeTransitionDispatcher();
  return Object.freeze({
    execution: {
      inference: options.inference,
      toolRunner: options.toolRunner,
      fsmSpec: options.fsmSpec,
      executeState: (input: BoundedStateExecutorInput) => transitions.executeState(input),
      recoveryActivities: failClosedActivityRecovery(),
      recoveryRedispatches: failClosedRedispatchRecovery(),
      recoveryCancellations: options.cancellations,
      recoveryRequeue: failClosedRequeueRecovery(),
    },
    workers: {
      timer: {
        ownerId: `${options.workerId}:timer`,
        leaseTtlMs: options.leaseTtlMs,
        pageLimit: options.pageLimit,
        pollIntervalMs: options.timerPollIntervalMs,
        errorBackoffMs: options.timerErrorBackoffMs,
      },
      recovery: {
        ownerId: `${options.workerId}:recovery`,
        leaseTtlMs: options.leaseTtlMs,
        pageLimit: options.pageLimit,
        pollIntervalMs: options.recoveryPollIntervalMs,
        errorBackoffMs: options.recoveryErrorBackoffMs,
        autoRecoverReasons: [...options.autoRecoverReasons],
      },
    },
    transitions,
  });
}

function failClosedActivityRecovery(): RuntimeActivityReconciliationPort {
  return {
    reconcile: async ({ invocation }) => ({
      activityId: invocation.activityId,
      status: 'unknown',
    }),
    retry: async () => unsupported('Activity retry provider is not bound'),
  };
}

function failClosedRedispatchRecovery(): RuntimeActivityRedispatchRecoveryPort {
  return {
    redispatch: async () => unsupported('Activity redispatch provider is not bound'),
  };
}

function failClosedRequeueRecovery(): RuntimeRecoveryRequeuePort {
  return {
    requeue: async () => unsupported('Session Command requeue provider is not bound'),
  };
}

function unsupported(message: string): never {
  throw new FrameworkError({
    code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
    message,
  });
}
