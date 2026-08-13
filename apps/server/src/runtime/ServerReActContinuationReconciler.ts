import {
  FrameworkError,
  hashCanonicalJson,
  type ContinueReActCommandPayloadV1,
  type EventRuntime,
  type EventStreamHead,
  type PersistedFrameworkEvent,
  type RuntimeOperationalTelemetry,
  type SessionCommandRecord,
  type SessionQueue,
} from '@codesoul-co/core';
import { reActContinuationIdempotencyKey, type ReActContinuationScheduler } from '@codesoul-co/harness';
import {
  validateReActContinuationCheckpoint,
  type ReActContinuationCheckpoint,
  type ReActContinuationCheckpointStore,
} from '@codesoul-co/kernel';

export interface ReActContinuationSuspensionEvidence {
  eventId: string;
  source: 'suspension' | 'human_approval';
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  runId: string;
  stepId: string;
  scopeHash: string;
  checkpointSequence: number;
  checkpointHash: string;
  suspendedAt: string;
}

export interface ReActContinuationPayloadFactory {
  build(input: {
    evidence: Readonly<ReActContinuationSuspensionEvidence>;
    checkpoint: Readonly<ReActContinuationCheckpoint>;
  }): Promise<ContinueReActCommandPayloadV1>;
}

export interface ReActContinuationQuarantinePort {
  quarantine(input: {
    evidence: Readonly<ReActContinuationSuspensionEvidence>;
    reason:
      | 'checkpoint_missing'
      | 'checkpoint_identity_mismatch'
      | 'checkpoint_hash_mismatch'
      | 'command_without_valid_checkpoint';
    commandIds: readonly string[];
  }): Promise<void>;
}

export interface ServerReActContinuationReconcilerOptions {
  events: EventRuntime;
  queue: SessionQueue;
  checkpoints: ReActContinuationCheckpointStore;
  scheduler: ReActContinuationScheduler;
  payloadFactory: ReActContinuationPayloadFactory;
  quarantine: ReActContinuationQuarantinePort;
  operationalTelemetry?: RuntimeOperationalTelemetry;
  maxCommandsPerSession?: number;
}

export interface ReActContinuationReconcileRequest {
  cursor?: string;
  limit?: number;
  signal?: AbortSignal;
}

export interface ReActContinuationReconcileResult {
  scannedRuns: number;
  scheduled: number;
  reused: number;
  quarantined: number;
  nextCursor?: string;
}

/**
 * Repairs the checkpoint-to-command crash window in bounded stream-head pages.
 * It never executes a quantum and never mutates invalid evidence.
 */
export class ServerReActContinuationReconciler {
  private readonly maxCommandsPerSession: number;

  constructor(private readonly options: ServerReActContinuationReconcilerOptions) {
    this.maxCommandsPerSession = positiveInteger(
      options.maxCommandsPerSession ?? 1_000,
      'maxCommandsPerSession'
    );
  }

  async reconcile(
    request: ReActContinuationReconcileRequest = {}
  ): Promise<ReActContinuationReconcileResult> {
    const limit = boundedLimit(request.limit ?? 100);
    assertActive(request.signal);
    const page = await this.options.events.listStreamHeads({
      ...(request.cursor === undefined ? {} : { cursor: request.cursor }),
      limit,
    });
    const result: ReActContinuationReconcileResult = {
      scannedRuns: page.heads.length,
      scheduled: 0,
      reused: 0,
      quarantined: 0,
      ...(page.nextCursor === undefined ? {} : { nextCursor: page.nextCursor }),
    };
    for (const head of page.heads) {
      assertActive(request.signal);
      const evidence = await this.latestOpenContinuation(head);
      if (!evidence) continue;
      const commands = await this.listContinuationCommands(evidence);
      const checkpoint = await this.options.checkpoints.get(
        evidence.runId,
        evidence.stepId,
        evidence.scopeHash
      );
      const invalidReason = checkpointProblem(evidence, checkpoint);
      if (invalidReason) {
        await this.quarantine(
          evidence,
          commands.length > 0 && invalidReason === 'checkpoint_missing'
            ? 'command_without_valid_checkpoint'
            : invalidReason,
          commands.map((command) => command.id)
        );
        result.quarantined += 1;
        continue;
      }
      if (!checkpoint) corrupt('Validated continuation checkpoint is missing');

      const payload = await this.options.payloadFactory.build({
        evidence,
        checkpoint,
      });
      assertPayloadEvidence(payload, evidence);
      const idempotencyKey = reActContinuationIdempotencyKey(payload);
      const matching = commands.find((command) => command.idempotencyKey === idempotencyKey);
      if (matching) {
        if (
          matching.status === 'failed' ||
          matching.status === 'dead_letter' ||
          matching.status === 'rejected' ||
          matching.status === 'expired'
        ) {
          await this.quarantine(evidence, 'command_without_valid_checkpoint', [matching.id]);
          result.quarantined += 1;
        } else {
          result.reused += 1;
        }
        continue;
      }
      if (commands.some((command) => command.status === 'queued' || command.status === 'claimed')) {
        await this.quarantine(
          evidence,
          'command_without_valid_checkpoint',
          commands.map((command) => command.id)
        );
        result.quarantined += 1;
        continue;
      }
      const scheduled = await this.options.scheduler.schedule({
        version: '1.0.0',
        ...(evidence.tenantId === undefined ? {} : { tenantId: evidence.tenantId }),
        ...(evidence.workspaceId === undefined ? {} : { workspaceId: evidence.workspaceId }),
        payload,
        availableAt: evidence.suspendedAt,
      });
      result[scheduled.reused ? 'reused' : 'scheduled'] += 1;
    }
    return result;
  }

  private async quarantine(
    evidence: Readonly<ReActContinuationSuspensionEvidence>,
    reason: Parameters<ReActContinuationQuarantinePort['quarantine']>[0]['reason'],
    commandIds: readonly string[]
  ): Promise<void> {
    await this.options.quarantine.quarantine({ evidence, reason, commandIds });
    await this.options.operationalTelemetry
      ?.recordQuarantine({ source: 'continuation_reconciler', reason })
      .catch(() => undefined);
  }

  private async latestOpenContinuation(
    head: Readonly<EventStreamHead>
  ): Promise<ReActContinuationSuspensionEvidence | null> {
    const events = await this.options.events.read({
      scope: head.scope,
      types: [
        'react.continuation.suspended',
        'react.continuation.resumed',
        'react.continuation.quarantined',
        'human.review.requested',
        'human.review.approved',
        'human.review.rejected',
        'human.review.expired',
        'human.review.cancelled',
        'human.review.superseded',
        'run.completed',
        'run.failed',
        'run.cancelled',
      ],
    });
    const ordered = [...events].sort((left, right) => left.sequence - right.sequence);
    const human = await this.approvedHumanContinuation(ordered, head.scope.userId);
    if (human && !continuationClosed(ordered, human)) return human;
    const latestSuspension = [...ordered]
      .reverse()
      .find((event) => event.type === 'react.continuation.suspended');
    if (!latestSuspension) return null;
    const payload = objectPayload(latestSuspension.payload);
    if (payload.requiresHumanReview !== false || payload.retryable !== true) return null;
    const suspension = suspensionEvidence(latestSuspension, head.scope.userId);
    return continuationClosed(ordered, suspension) ? null : suspension;
  }

  private async approvedHumanContinuation(
    events: readonly PersistedFrameworkEvent[],
    fallbackUserId: string
  ): Promise<ReActContinuationSuspensionEvidence | null> {
    const requests = new Map<string, PersistedFrameworkEvent>();
    for (const event of events) {
      if (event.type !== 'human.review.requested') continue;
      const payload = objectPayload(event.payload);
      const metadata = optionalObject(payload.metadata);
      if (metadata?.resumeMode !== 'react_feedback') continue;
      requests.set(stringField(payload, 'taskId'), event);
    }
    const approval = [...events].reverse().find((event) => {
      if (event.type !== 'human.review.approved') return false;
      const taskId = optionalString(objectPayload(event.payload).taskId);
      return taskId !== undefined && requests.has(taskId);
    });
    if (!approval) return null;
    const approvalPayload = objectPayload(approval.payload);
    const taskId = stringField(approvalPayload, 'taskId');
    const request = requests.get(taskId);
    if (!request) return null;
    const requestPayload = objectPayload(request.payload);
    const metadata = optionalObject(requestPayload.metadata);
    if (!metadata) corrupt('ReAct HumanTask is missing continuation metadata');
    const stepId = stringField(metadata, 'stepId');
    const scopeHash = hashField(metadata, 'scopeHash');
    const requestedSequence = integerField(metadata, 'checkpointSequence');
    const requestedHash = hashField(metadata, 'checkpointHash');
    const runId = approval.runId;
    let checkpoint = await this.options.checkpoints.get(runId, stepId, scopeHash);
    if (checkpoint && checkpoint.stepSequence === requestedSequence) {
      if (hashCanonicalJson(checkpoint) !== requestedHash) {
        return humanEvidence(
          approval,
          fallbackUserId,
          stepId,
          scopeHash,
          requestedSequence,
          requestedHash
        );
      }
      const advanced = approvedCheckpoint(checkpoint, approval);
      checkpoint = (
        await this.options.checkpoints.put(
          advanced,
          `human-review-resume:${approval.id}:${advanced.stepSequence}`
        )
      ).checkpoint;
    } else if (
      checkpoint &&
      checkpoint.stepSequence === requestedSequence + 1 &&
      !isApprovedCheckpoint(checkpoint, approval)
    ) {
      return humanEvidence(
        approval,
        fallbackUserId,
        stepId,
        scopeHash,
        requestedSequence,
        requestedHash
      );
    }
    return checkpoint
      ? humanEvidence(
          approval,
          fallbackUserId,
          stepId,
          scopeHash,
          checkpoint.stepSequence,
          hashCanonicalJson(checkpoint)
        )
      : humanEvidence(
          approval,
          fallbackUserId,
          stepId,
          scopeHash,
          requestedSequence,
          requestedHash
        );
  }

  private async listContinuationCommands(
    evidence: ReActContinuationSuspensionEvidence
  ): Promise<SessionCommandRecord[]> {
    const commands: SessionCommandRecord[] = [];
    let scanned = 0;
    let fromSequence: number | undefined;
    while (scanned < this.maxCommandsPerSession) {
      const limit = Math.min(100, this.maxCommandsPerSession - scanned);
      const page = await this.options.queue.list({
        scope: {
          ...(evidence.tenantId === undefined ? {} : { tenantId: evidence.tenantId }),
          userId: evidence.userId,
          sessionId: evidence.sessionId,
        },
        ...(fromSequence === undefined ? {} : { fromSequence }),
        limit,
      });
      scanned += page.length;
      const relevant = page.filter(
        (command) =>
          command.commandType === 'continue_react' && command.targetRunId === evidence.runId
      );
      commands.push(...relevant);
      if (page.length < limit) return commands;
      fromSequence = Math.max(...page.map((command) => command.enqueueSequence)) + 1;
    }
    throw new FrameworkError({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
      message: 'Continuation reconciliation exceeded the per-Session command scan limit',
    });
  }
}

function suspensionEvidence(
  event: PersistedFrameworkEvent,
  fallbackUserId: string
): ReActContinuationSuspensionEvidence {
  const payload = objectPayload(event.payload);
  if (!event.sessionId) corrupt('ReAct suspension Event is missing sessionId');
  const evidence = {
    eventId: event.id,
    source: 'suspension' as const,
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    userId: event.userId ?? fallbackUserId,
    ...(event.workspaceId === undefined ? {} : { workspaceId: event.workspaceId }),
    sessionId: event.sessionId,
    runId: event.runId,
    stepId: stringField(payload, 'stepId'),
    scopeHash: hashField(payload, 'scopeHash'),
    checkpointSequence: integerField(payload, 'stepSequence'),
    checkpointHash: hashField(payload, 'checkpointHash'),
    suspendedAt: event.timestamp,
  };
  return evidence;
}

function humanEvidence(
  event: PersistedFrameworkEvent,
  fallbackUserId: string,
  stepId: string,
  scopeHash: string,
  checkpointSequence: number,
  checkpointHash: string
): ReActContinuationSuspensionEvidence {
  if (!event.sessionId) corrupt('ReAct approval Event is missing sessionId');
  return {
    eventId: event.id,
    source: 'human_approval',
    ...(event.tenantId === undefined ? {} : { tenantId: event.tenantId }),
    userId: event.userId ?? fallbackUserId,
    ...(event.workspaceId === undefined ? {} : { workspaceId: event.workspaceId }),
    sessionId: event.sessionId,
    runId: event.runId,
    stepId,
    scopeHash,
    checkpointSequence,
    checkpointHash,
    suspendedAt: event.timestamp,
  };
}

function approvedCheckpoint(
  checkpoint: Readonly<ReActContinuationCheckpoint>,
  approval: Readonly<PersistedFrameworkEvent>
): ReActContinuationCheckpoint {
  const feedback = approvalFeedback(approval);
  return validateReActContinuationCheckpoint({
    ...structuredClone(checkpoint),
    nextPhase: 'reason',
    messages: [...checkpoint.messages, { role: 'user', content: feedback }],
    stepSequence: checkpoint.stepSequence + 1,
    consecutiveNoProgress: 0,
    lastProgressFingerprint: undefined,
    pendingAction: undefined,
    pendingToolInvocationId: undefined,
    updatedAt: approval.timestamp,
  });
}

function isApprovedCheckpoint(
  checkpoint: Readonly<ReActContinuationCheckpoint>,
  approval: Readonly<PersistedFrameworkEvent>
): boolean {
  const last = checkpoint.messages[checkpoint.messages.length - 1];
  return (
    checkpoint.nextPhase === 'reason' &&
    checkpoint.pendingAction === undefined &&
    checkpoint.pendingToolInvocationId === undefined &&
    checkpoint.consecutiveNoProgress === 0 &&
    last?.role === 'user' &&
    last.content === approvalFeedback(approval) &&
    checkpoint.updatedAt === approval.timestamp
  );
}

function approvalFeedback(approval: Readonly<PersistedFrameworkEvent>): string {
  const payload = objectPayload(approval.payload);
  const reason = optionalString(payload.reason);
  return reason
    ? `Human review approved. Reviewer feedback: ${reason}`
    : 'Human review approved. Continue from the reviewed checkpoint.';
}

function continuationClosed(
  events: readonly PersistedFrameworkEvent[],
  evidence: Readonly<ReActContinuationSuspensionEvidence>
): boolean {
  return events.some((event) => {
    if (event.sequence <= sequenceOf(events, evidence.eventId)) return false;
    if (
      event.type === 'run.completed' ||
      event.type === 'run.failed' ||
      event.type === 'run.cancelled' ||
      event.type === 'react.continuation.resumed'
    ) {
      return true;
    }
    if (event.type !== 'react.continuation.quarantined') return false;
    return optionalString(objectPayload(event.payload).evidenceEventId) === evidence.eventId;
  });
}

function sequenceOf(events: readonly PersistedFrameworkEvent[], eventId: string): number {
  const event = events.find((candidate) => candidate.id === eventId);
  if (!event) corrupt('Continuation evidence Event disappeared during reconciliation');
  return event.sequence;
}

function optionalObject(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function checkpointProblem(
  evidence: ReActContinuationSuspensionEvidence,
  checkpoint: ReActContinuationCheckpoint | null
): 'checkpoint_missing' | 'checkpoint_identity_mismatch' | 'checkpoint_hash_mismatch' | null {
  if (!checkpoint) return 'checkpoint_missing';
  if (
    checkpoint.runId !== evidence.runId ||
    checkpoint.stepId !== evidence.stepId ||
    checkpoint.scopeHash !== evidence.scopeHash ||
    checkpoint.stepSequence !== evidence.checkpointSequence
  ) {
    return 'checkpoint_identity_mismatch';
  }
  return hashCanonicalJson(checkpoint) === evidence.checkpointHash
    ? null
    : 'checkpoint_hash_mismatch';
}

function assertPayloadEvidence(
  payload: ContinueReActCommandPayloadV1,
  evidence: ReActContinuationSuspensionEvidence
): void {
  if (
    payload.runId !== evidence.runId ||
    payload.sessionId !== evidence.sessionId ||
    payload.userId !== evidence.userId ||
    payload.stepId !== evidence.stepId ||
    payload.scopeHash !== evidence.scopeHash ||
    payload.checkpointSequence !== evidence.checkpointSequence ||
    payload.checkpointHash !== evidence.checkpointHash
  ) {
    conflict('Reconciled continuation payload does not match suspension evidence');
  }
}

function objectPayload(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    corrupt('ReAct suspension Event payload must be an object');
  }
  return value as Record<string, unknown>;
}

function stringField(value: Record<string, unknown>, key: string): string {
  const field = value[key];
  if (typeof field !== 'string' || field.length === 0)
    corrupt(`Missing ${key} in suspension Event`);
  return field;
}

function hashField(value: Record<string, unknown>, key: string): string {
  const field = stringField(value, key);
  if (!/^sha256:[a-f0-9]{64}$/u.test(field)) corrupt(`Invalid ${key} in suspension Event`);
  return field;
}

function integerField(value: Record<string, unknown>, key: string): number {
  const field = value[key];
  if (!Number.isSafeInteger(field) || (field as number) < 0) {
    corrupt(`Invalid ${key} in suspension Event`);
  }
  return field as number;
}

function boundedLimit(value: number): number {
  if (!Number.isSafeInteger(value) || value < 1 || value > 1_000) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: 'Reconciliation limit must be between 1 and 1000',
    });
  }
  return value;
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `${label} must be a positive integer`,
    });
  }
  return value;
}

function assertActive(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new FrameworkError({
      code: 'RUNTIME_CANCELLED',
      message: 'Continuation reconciliation was cancelled',
    });
  }
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RUN_CONFLICT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
