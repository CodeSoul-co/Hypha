import type { ExecutionCancelRequest } from '@hypha/core';
import { executionProviderError } from './execution-provider-error';

export interface ActiveExecutionHandle {
  sandboxId: string;
  revision: number;
  signal: AbortSignal;
}

interface ActiveExecution {
  sandboxId: string;
  revision: number;
  controller: AbortController;
  completion: Promise<void>;
  complete: () => void;
}

/** Coordinates active executions without owning Sandbox or provider process semantics. */
export class InMemoryActiveExecutionRegistry {
  private readonly executions = new Map<string, ActiveExecution>();

  begin(executionId: string, sandboxId: string): ActiveExecutionHandle {
    if (this.executions.has(executionId)) {
      throw executionProviderError(
        'EXECUTION_IDEMPOTENCY_CONFLICT',
        `Execution ${executionId} is already running.`,
        false
      );
    }
    const controller = new AbortController();
    const deferred = createDeferred();
    const active: ActiveExecution = {
      sandboxId,
      revision: 2,
      controller,
      completion: deferred.promise,
      complete: deferred.resolve,
    };
    this.executions.set(executionId, active);
    return { sandboxId, revision: active.revision, signal: controller.signal };
  }

  sandboxId(executionId: string): string | undefined {
    return this.executions.get(executionId)?.sandboxId;
  }

  async cancel(request: ExecutionCancelRequest): Promise<void> {
    const active = this.executions.get(request.executionId);
    if (!active) {
      throw executionProviderError(
        'EXECUTION_RESULT_UNKNOWN',
        `Execution ${request.executionId} is not running.`,
        false
      );
    }
    assertRevision(active.revision, request.expectedRevision);
    active.revision += 1;
    active.controller.abort(request.reason ?? 'cancelled');
    await active.completion;
  }

  async abortSandbox(sandboxId: string, reason: string): Promise<void> {
    const active = [...this.executions.values()].filter(
      (execution) => execution.sandboxId === sandboxId
    );
    for (const execution of active) {
      execution.revision += 1;
      execution.controller.abort(reason);
    }
    await Promise.all(active.map((execution) => execution.completion));
  }

  complete(executionId: string): void {
    const active = this.executions.get(executionId);
    if (!active) return;
    this.executions.delete(executionId);
    active.complete();
  }

  async close(): Promise<void> {
    const active = [...this.executions.values()];
    for (const execution of active) execution.controller.abort('provider closed');
    await Promise.all(active.map((execution) => execution.completion));
  }
}

function assertRevision(actual: number, expected: number): void {
  if (actual !== expected) {
    throw executionProviderError(
      'EXECUTION_REVISION_CONFLICT',
      `Execution revision ${actual} does not match expected revision ${expected}.`,
      true,
      { actualRevision: actual, expectedRevision: expected }
    );
  }
}

function createDeferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve!: () => void;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}
