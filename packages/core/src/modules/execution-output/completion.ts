import type { CommandExecutionResult, ExecutionReceipt } from '../../contracts/command-execution';
import type {
  ExecutionFrameworkEvent,
  ExecutionFrameworkEventType,
} from '../../contracts/execution-events';
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
import {
  createExecutionFrameworkEvent,
  validateExecutionFrameworkEvent,
} from '../execution-events';
import { validateExecutionRecord } from '../execution-store';
import {
  validateExecutionOutputCollectionPlan,
  validateExecutionOutputCollectionResult,
  validateExecutionOutputCollectionPolicy,
} from './contracts';
import { canonicalizeJson } from '../runtime/canonical-json';

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

export interface DurableExecutionTerminalEventCommitRequest {
  event: ExecutionFrameworkEvent;
  executionRevision: number;
  idempotencyKey: string;
}

/**
 * Runtime implements this port with its durable Event Store. Repeated calls
 * with the same idempotency key and event must resolve to the same append.
 */
export interface DurableExecutionTerminalEventCommitPort {
  append(request: DurableExecutionTerminalEventCommitRequest): Promise<unknown>;
}

export interface DurableExecutionTerminalEventCoordinatorOptions {
  events: DurableExecutionTerminalEventCommitPort;
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

/**
 * Appends the Execution terminal event only after a durable terminal record
 * exists. Provider execution and Artifact collection are deliberately absent,
 * so recovery can retry a failed append without repeating either side effect.
 */
export class DurableExecutionTerminalEventCoordinator {
  private readonly events: DurableExecutionTerminalEventCommitPort;

  constructor(options: DurableExecutionTerminalEventCoordinatorOptions) {
    this.events = options.events;
  }

  async append(recordValue: ExecutionRecord): Promise<ExecutionFrameworkEvent> {
    const record = validateExecutionRecord(recordValue);
    const event = createDurableExecutionTerminalEvent(record);
    const executionRevision = requiredTerminalResult(record).revision;
    const idempotencyKey = terminalEventIdempotencyKey(record.id, executionRevision);
    const appended = validateExecutionFrameworkEvent(
      await this.events.append({ event, executionRevision, idempotencyKey })
    );
    assertAppendedTerminalEvent(event, appended);
    return appended;
  }
}

export function createDurableExecutionTerminalEvent(
  recordValue: ExecutionRecord
): ExecutionFrameworkEvent {
  const record = validateExecutionRecord(recordValue);
  const result = requiredTerminalResult(record);
  const type = terminalEventType(result.status);
  const idempotencyKey = terminalEventIdempotencyKey(record.id, result.revision);
  if (!result.completedAt) {
    throw completionError('Execution terminal event requires a completion timestamp');
  }
  const latencyMs =
    result.latencyMs ??
    Date.parse(result.completedAt) - Date.parse(result.startedAt);
  if (latencyMs !== undefined && (!Number.isFinite(latencyMs) || latencyMs < 0)) {
    throw completionError('Execution terminal latency evidence is invalid');
  }

  const commonPayload = {
    operationId: record.request.operationId,
    executionId: record.id,
    revision: result.revision,
    sandboxId: result.sandboxId,
    workspaceId: record.request.workspaceId,
    providerId: record.providerId,
    status: result.status,
    exitCode: result.exitCode,
    ...(result.signal === undefined ? {} : { signal: result.signal }),
    artifactRefs: uniqueReferences(result.generatedArtifactRefs),
    ...(latencyMs === undefined ? {} : { latencyMs }),
    ...(result.resourceUsage === undefined ? {} : { resourceUsage: result.resourceUsage }),
    ...(result.error === undefined ? {} : { error: result.error }),
  };
  const input = {
    id: terminalEventId(record.id, result.revision, type),
    type,
    ...(record.request.tenantId === undefined
      ? {}
      : { tenantId: record.request.tenantId }),
    userId: record.request.userId,
    workspaceId: record.request.workspaceId,
    ...(record.request.sessionId === undefined ? {} : { sessionId: record.request.sessionId }),
    runId: record.request.runId,
    ...(record.request.stepId === undefined ? {} : { stepId: record.request.stepId }),
    ...(record.request.agentId === undefined ? {} : { agentId: record.request.agentId }),
    ...(record.request.fsmState === undefined ? {} : { fsmState: record.request.fsmState }),
    idempotencyKey,
    operationId: record.request.operationId,
    timestamp: result.completedAt,
    payload: commonPayload,
  };
  return createExecutionFrameworkEvent(input);
}

function requiredTerminalResult(record: ExecutionRecord): CommandExecutionResult {
  if (!record.result) {
    throw completionError('Execution terminal event requires a durable terminal result');
  }
  const result = validateCommandExecutionResult(record.result);
  terminalEventType(record.status);
  const terminalRevisionMatches =
    result.revision === record.revision || result.revision + 1 === record.revision;
  if (
    result.executionId !== record.id ||
    result.status !== record.status ||
    !terminalRevisionMatches
  ) {
    throw completionError('Execution terminal result does not match its durable record');
  }
  return result;
}

function terminalEventType(status: ExecutionRecord['status']): ExecutionFrameworkEventType {
  switch (status) {
    case 'completed':
      return 'command.execution.completed';
    case 'cancelled':
      return 'command.execution.cancelled';
    case 'timed_out':
      return 'command.execution.timeout';
    case 'oom_killed':
      return 'command.execution.oom_killed';
    case 'resource_exceeded':
      return 'command.execution.resource.exceeded';
    case 'failed':
    case 'quarantined':
      return 'command.execution.failed';
    default:
      throw completionError('Execution terminal event requires a terminal record');
  }
}

function terminalEventId(
  executionId: string,
  revision: number,
  type: ExecutionFrameworkEventType
): string {
  return `event:${type}:${executionId}:${revision}`;
}

function terminalEventIdempotencyKey(executionId: string, revision: number): string {
  return `execution-terminal-event:${executionId}:${revision}`;
}

function assertAppendedTerminalEvent(
  expected: ExecutionFrameworkEvent,
  appended: ExecutionFrameworkEvent
): void {
  const identityFields = [
    'id',
    'type',
    'tenantId',
    'userId',
    'workspaceId',
    'sessionId',
    'runId',
    'stepId',
    'agentId',
    'fsmState',
    'branchId',
    'correlationId',
    'causationId',
    'parentEventId',
    'idempotencyKey',
    'operationId',
    'timestamp',
  ] as const;
  const expectedRevision =
    'revision' in expected.payload ? expected.payload.revision : undefined;
  const appendedRevision =
    'revision' in appended.payload ? appended.payload.revision : undefined;
  if (
    identityFields.some(
      (field) => expected[field] !== undefined && appended[field] !== expected[field]
    ) ||
    appendedRevision !== expectedRevision ||
    canonicalizeJson(appended.payload) !== canonicalizeJson(expected.payload)
  ) {
    throw completionError(
      'Appended Execution terminal event identity or evidence does not match its request'
    );
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
