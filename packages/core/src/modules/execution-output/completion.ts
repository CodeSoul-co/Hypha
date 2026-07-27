import type { CommandExecutionResult, ExecutionReceipt } from '../../contracts/command-execution';
import type { ExecutionRecord } from '../../contracts/execution-store';
import type {
  ExecutionOutputCollectionContext,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionPolicy,
  ExecutionOutputCollectionResult,
  ExecutionOutputCollector,
  ExecutionOutputPlanner,
} from '../../contracts/execution-output';
import { FrameworkError } from '../../errors';
import { validateCommandExecutionResult } from '../command-execution';
import { validateExecutionRecord } from '../execution-store';
import {
  validateExecutionOutputCollectionPlan,
  validateExecutionOutputCollectionResult,
  validateExecutionOutputCollectionPolicy,
} from './contracts';

export interface DurableExecutionCompletionWorker {
  renew(record: ExecutionRecord): Promise<ExecutionRecord>;
  checkpointTerminalReceipt(
    record: ExecutionRecord,
    receipt: ExecutionReceipt
  ): Promise<ExecutionRecord>;
  commit(record: ExecutionRecord, result: CommandExecutionResult): Promise<ExecutionRecord>;
}

export interface DurableExecutionCompletionCoordinatorOptions {
  worker: DurableExecutionCompletionWorker;
  planner: ExecutionOutputPlanner;
  collector: ExecutionOutputCollector;
}

export interface DurableExecutionCompletionRequest {
  record: ExecutionRecord;
  result: CommandExecutionResult;
  outputPolicy: ExecutionOutputCollectionPolicy;
  outputContext: ExecutionOutputCollectionContext;
}

export interface DurableExecutionCompletionResult {
  record: ExecutionRecord;
  output: ExecutionOutputCollectionResult;
}

/**
 * Orders the Execution-owned durable completion barriers.
 *
 * Provider execution is deliberately absent: retries begin from the persisted
 * terminal receipt, repeat idempotent Artifact collection/finalization, and
 * only then attempt the fenced terminal record CAS.
 */
export class DurableExecutionCompletionCoordinator {
  private readonly worker: DurableExecutionCompletionWorker;
  private readonly planner: ExecutionOutputPlanner;
  private readonly collector: ExecutionOutputCollector;

  constructor(options: DurableExecutionCompletionCoordinatorOptions) {
    this.worker = options.worker;
    this.planner = options.planner;
    this.collector = options.collector;
  }

  async complete(
    request: DurableExecutionCompletionRequest
  ): Promise<DurableExecutionCompletionResult> {
    const initialRecord = validateExecutionRecord(request.record);
    const providerResult = validateCommandExecutionResult(request.result);
    const outputPolicy = validateExecutionOutputCollectionPolicy(request.outputPolicy);

    if (providerResult.executionId !== initialRecord.id) {
      throw completionError('Execution result identity does not match the durable record');
    }
    if (initialRecord.terminalReceipt && !providerResult.externalReceipt) {
      throw completionError('Terminal result must preserve the durable Provider receipt');
    }

    const checkpointedRecord = providerResult.externalReceipt
      ? validateExecutionRecord(
          await this.worker.checkpointTerminalReceipt(initialRecord, providerResult.externalReceipt)
        )
      : initialRecord;
    // Revalidate and extend the active fence immediately before Artifact side
    // effects. This rejects stale retries that already carried a receipt.
    const artifactLeaseRecord = validateExecutionRecord(
      await this.worker.renew(checkpointedRecord)
    );

    const plan = validateExecutionOutputCollectionPlan(
      this.planner.plan(providerResult, outputPolicy)
    );
    assertPlanBoundary(plan, providerResult);

    const output = validateExecutionOutputCollectionResult(
      await this.collector.collect(plan, request.outputContext)
    );
    assertCollectionBoundary(plan, output);

    const resultWithArtifacts = validateCommandExecutionResult({
      ...providerResult,
      generatedArtifactRefs: uniqueReferences([
        ...providerResult.generatedArtifactRefs,
        ...output.artifactRefs,
      ]),
    });
    const committed = validateExecutionRecord(
      await this.worker.commit(artifactLeaseRecord, resultWithArtifacts)
    );
    return { record: committed, output };
  }
}

function assertPlanBoundary(
  plan: ExecutionOutputCollectionPlan,
  result: CommandExecutionResult
): void {
  if (plan.executionId !== result.executionId || plan.status !== result.status) {
    throw completionError('Execution output plan does not match the Provider terminal result');
  }
  const newOutputs = plan.items.filter((item) => !item.existingArtifactRef);
  if (result.status === 'completed' && newOutputs.length > 0 && !plan.finalize) {
    throw completionError(
      'Completed Execution outputs must be finalized before terminal commit',
      'EXECUTION_INVALID_REQUEST'
    );
  }
}

function assertCollectionBoundary(
  plan: ExecutionOutputCollectionPlan,
  output: ExecutionOutputCollectionResult
): void {
  if (output.executionId !== plan.executionId) {
    throw completionError('Artifact collection result does not match the Execution identity');
  }

  const newItems = plan.items.filter((item) => !item.existingArtifactRef);
  if (output.collected.length !== newItems.length) {
    throw completionError('Artifact collection did not account for every planned output');
  }
  const collectedByPath = new Map(output.collected.map((entry) => [entry.relativePath, entry]));
  for (const item of newItems) {
    const collected = collectedByPath.get(item.relativePath);
    if (
      !collected ||
      collected.contentHash !== item.contentHash ||
      collected.sizeBytes !== item.sizeBytes
    ) {
      throw completionError('Artifact collection integrity evidence does not match its plan');
    }
  }

  const expectedExistingRefs = uniqueReferences([
    ...plan.existingArtifactRefs,
    ...plan.items.flatMap((item) => (item.existingArtifactRef ? [item.existingArtifactRef] : [])),
  ]);
  if (!sameReferenceSet(output.existingArtifactRefs, expectedExistingRefs)) {
    throw completionError('Artifact collection existing references do not match its plan');
  }

  const expectedArtifactRefs = uniqueReferences([
    ...expectedExistingRefs,
    ...output.collected.map((entry) => entry.artifactRef),
  ]);
  if (!sameReferenceSet(output.artifactRefs, expectedArtifactRefs)) {
    throw completionError('Artifact collection references do not match collected evidence');
  }

  if (plan.finalize) {
    const finalizedRefs = new Set(output.finalizedArtifactRefs);
    if (
      output.collected.some(
        (entry) => entry.status !== 'final' || !finalizedRefs.has(entry.artifactRef)
      )
    ) {
      throw completionError('Artifact finalization must complete before terminal commit');
    }
  }
}

function uniqueReferences(values: string[]): string[] {
  return [...new Set(values)];
}

function sameReferenceSet(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((value) => right.includes(value));
}

function completionError(
  message: string,
  code: 'EXECUTION_INTERNAL_ERROR' | 'EXECUTION_INVALID_REQUEST' = 'EXECUTION_INTERNAL_ERROR'
): FrameworkError {
  return new FrameworkError({ code, message });
}
