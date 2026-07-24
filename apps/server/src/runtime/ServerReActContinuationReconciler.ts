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
} from '@hypha/core';
import { reActContinuationIdempotencyKey, type ReActContinuationScheduler } from '@hypha/harness';
import type { ReActContinuationCheckpoint, ReActContinuationCheckpointStore } from '@hypha/kernel';

export interface ReActContinuationSuspensionEvidence {
  eventId: string;
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
      const evidence = await this.latestOpenSuspension(head);
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

  private async latestOpenSuspension(
    head: Readonly<EventStreamHead>
  ): Promise<ReActContinuationSuspensionEvidence | null> {
    const events = await this.options.events.read({
      scope: head.scope,
      types: ['react.continuation.suspended', 'run.completed', 'run.failed', 'run.cancelled'],
    });
    const latest = [...events].sort((left, right) => right.sequence - left.sequence)[0];
    if (!latest || latest.type !== 'react.continuation.suspended') return null;
    return suspensionEvidence(latest, head.scope.userId);
  }

  private async listContinuationCommands(
    evidence: ReActContinuationSuspensionEvidence
  ): Promise<SessionCommandRecord[]> {
    const commands: SessionCommandRecord[] = [];
    let fromSequence: number | undefined;
    while (commands.length < this.maxCommandsPerSession) {
      const page = await this.options.queue.list({
        scope: {
          ...(evidence.tenantId === undefined ? {} : { tenantId: evidence.tenantId }),
          userId: evidence.userId,
          sessionId: evidence.sessionId,
        },
        ...(fromSequence === undefined ? {} : { fromSequence }),
        limit: Math.min(100, this.maxCommandsPerSession - commands.length),
      });
      const relevant = page.filter(
        (command) =>
          command.commandType === 'continue_react' && command.targetRunId === evidence.runId
      );
      commands.push(...relevant);
      if (page.length < 100) return commands;
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
