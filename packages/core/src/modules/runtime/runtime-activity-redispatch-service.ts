import { randomUUID } from 'node:crypto';
import type { EventCreateInput } from '../../events';
import type {
  FencedRunLease,
  RunLeaseAuthorization,
  RunLeaseStore,
} from '../../contracts/runtime-coordination';
import type { RuntimeScope } from '../../contracts/runtime';
import type { RuntimeActivityDescriptor } from '../../contracts/runtime-activity';
import type { RuntimeHumanTask } from '../../contracts/runtime-human-task';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import {
  type RuntimeActivityDescriptorStore,
  type RuntimeActivityDescriptorReference,
} from './runtime-activity-descriptor-store';
import { assertRuntimeHumanTaskResume, projectRuntimeHumanTasks } from './runtime-human-task';

export interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference {
  commandId: string;
  scope: RuntimeScope;
  ownerId: string;
  leaseTtlMs: number;
  taskId: string;
  expectedTaskRevision: number;
  expectedSubjectHash: string;
  requestedAt: string;
  idempotencyKey?: string;
  signal?: AbortSignal;
}

export interface RuntimeActivityRevisionValidator {
  validate(input: {
    task: Readonly<RuntimeHumanTask>;
    descriptor: Readonly<RuntimeActivityDescriptor>;
  }): Promise<void>;
}

export interface RuntimeActivityRedispatchAttempt {
  scope: Readonly<RuntimeScope>;
  task: Readonly<RuntimeHumanTask>;
  descriptor: Readonly<RuntimeActivityDescriptor>;
  redispatchCommandId: string;
  redispatchIdempotencyKey: string;
  approvalEventId: string;
  requestEventId: string;
  fencingToken: number;
  signal: AbortSignal;
}

export type RuntimeActivityRedispatchReconciliation =
  | {
      status: 'accepted';
      commandId: string;
    }
  | {
      status: 'safe_to_dispatch';
    }
  | {
      status: 'unknown';
      reason: string;
    };

export interface RuntimeActivityRedispatchPort {
  dispatch(
    input: RuntimeActivityRedispatchAttempt
  ): Promise<{ commandId: string; reused: boolean }>;
  /**
   * Resolves the crash window between an accepted external dispatch and its
   * durable Runtime receipt. `safe_to_dispatch` is an authoritative absence
   * result; uncertainty must be returned as `unknown`.
   */
  reconcile(
    input: RuntimeActivityRedispatchAttempt
  ): Promise<RuntimeActivityRedispatchReconciliation>;
}

export interface RuntimeActivityRedispatchServiceOptions {
  events: EventRuntime;
  runLeases: RunLeaseStore;
  descriptors: RuntimeActivityDescriptorStore;
  revisions: RuntimeActivityRevisionValidator;
  dispatcher: RuntimeActivityRedispatchPort;
  nextId?: (namespace: string) => string;
  now?: () => string;
}

export interface RuntimeActivityRedispatchResult {
  commandId: string;
  requestEventId: string;
  receiptEventId: string;
  activityCommandId: string;
  eventReused: boolean;
  receiptReused: boolean;
  commandReused: boolean;
  reconciled: boolean;
}

/**
 * Revalidates approved HumanTask evidence, records redispatch intent, invokes
 * an Owner-provided idempotent Activity dispatcher, and persists acceptance.
 * An intent without a receipt is reconciled before any retry is dispatched.
 */
export class RuntimeActivityRedispatchService {
  private readonly nextId: (namespace: string) => string;
  private readonly now: () => string;

  constructor(private readonly options: RuntimeActivityRedispatchServiceOptions) {
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${randomUUID()}`);
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async redispatch(
    command: RuntimeActivityRedispatchCommand
  ): Promise<RuntimeActivityRedispatchResult> {
    validateCommand(command);
    const signal = command.signal ?? new AbortController().signal;
    assertActive(signal);
    const startedAt = this.now();
    validTimestamp(startedAt, 'Activity redispatch clock');
    const lease = await this.acquire(command, startedAt);
    if (!lease) {
      throw new FrameworkError({
        code: 'RUNTIME_LEASE_UNAVAILABLE',
        message: 'Run lease is unavailable for Activity redispatch',
      });
    }
    const authorization = authorizationFor(lease);
    try {
      const evidence = await this.loadEvidence(command, startedAt);
      await this.options.revisions.validate(evidence);
      assertActive(signal);
      const prior = await this.findPrior(command);
      const requestEventId = prior?.id ?? this.nextId('activity-redispatch-event');
      if (!prior) {
        const scope = streamScope(command.scope);
        const head = await this.options.events.getStreamHead(scope);
        if (!head) corrupt('Run Event stream does not exist');
        await this.options.events.append({
          scope,
          events: [
            redispatchEvent(
              command,
              evidence.task,
              evidence.descriptor,
              evidence.approvalEventId,
              requestEventId
            ),
          ],
          expectedLastSequence: head.lastSequence,
          expectedRunRevision: head.runRevision,
          fencingToken: authorization.guard.fencingToken,
          idempotencyKey: `activity-redispatch:${command.idempotencyKey ?? command.commandId}`,
          transactionGroupId: runtimeActivityRedispatchIdentity(command),
        });
      }
      assertActive(signal);
      await this.options.runLeases.assertCurrent({
        scope: authorization.scope,
        guard: authorization.guard,
        checkedAt: this.now(),
      });
      const redispatchIdentity = runtimeActivityRedispatchIdentity(command);
      const attempt: RuntimeActivityRedispatchAttempt = {
        scope: command.scope,
        task: evidence.task,
        descriptor: evidence.descriptor,
        redispatchCommandId: redispatchIdentity,
        redispatchIdempotencyKey: redispatchIdentity,
        approvalEventId: evidence.approvalEventId,
        requestEventId,
        fencingToken: authorization.guard.fencingToken,
        signal,
      };
      const receipt = await this.findReceipt(command, requestEventId, redispatchIdentity);
      if (receipt) {
        return {
          commandId: command.commandId,
          requestEventId,
          receiptEventId: receipt.id,
          activityCommandId: receipt.activityCommandId,
          eventReused: prior !== null,
          receiptReused: true,
          commandReused: true,
          reconciled: receipt.source === 'reconcile',
        };
      }
      let accepted: { commandId: string; reused: boolean };
      let source: 'dispatch' | 'reconcile' = 'dispatch';
      if (prior) {
        const reconciliation = await this.options.dispatcher.reconcile(attempt);
        validateReconciliation(reconciliation);
        await this.assertLeaseCurrent(authorization);
        if (reconciliation.status === 'unknown') {
          await this.appendOutcomeUnknown(
            command,
            evidence,
            requestEventId,
            redispatchIdentity,
            reconciliation.reason,
            authorization
          );
          throw new FrameworkError({
            code: 'RUNTIME_ACTIVITY_OUTCOME_UNKNOWN',
            message:
              'Activity redispatch outcome is unknown; automatic redispatch is blocked pending reconciliation',
            context: {
              taskId: command.taskId,
              requestEventId,
              redispatchCommandId: redispatchIdentity,
              reason: reconciliation.reason,
            },
          });
        }
        if (reconciliation.status === 'accepted') {
          accepted = { commandId: reconciliation.commandId, reused: true };
          source = 'reconcile';
        } else {
          assertActive(signal);
          accepted = await this.options.dispatcher.dispatch(attempt);
          validateDispatchResult(accepted);
        }
      } else {
        accepted = await this.options.dispatcher.dispatch(attempt);
        validateDispatchResult(accepted);
      }
      await this.options.runLeases.assertCurrent({
        scope: authorization.scope,
        guard: authorization.guard,
        checkedAt: this.now(),
      });
      const receiptEventId = redispatchEvidenceEventId(redispatchIdentity, 'accepted');
      await this.appendAccepted(
        command,
        evidence,
        requestEventId,
        redispatchIdentity,
        receiptEventId,
        accepted,
        source,
        authorization
      );
      return {
        commandId: command.commandId,
        requestEventId,
        receiptEventId,
        activityCommandId: accepted.commandId,
        eventReused: prior !== null,
        receiptReused: false,
        commandReused: accepted.reused,
        reconciled: source === 'reconcile',
      };
    } finally {
      await this.release(authorization);
    }
  }

  private async loadEvidence(
    command: RuntimeActivityRedispatchCommand,
    checkedAt: string
  ): Promise<{
    task: RuntimeHumanTask;
    descriptor: RuntimeActivityDescriptor;
    approvalEventId: string;
  }> {
    const events = await this.options.events.read({ scope: streamScope(command.scope) });
    const task = projectRuntimeHumanTasks(events).find(
      (candidate) => candidate.taskId === command.taskId
    );
    if (!task) humanTaskError('HUMAN_TASK_NOT_FOUND', 'Human task was not found');
    assertRuntimeHumanTaskResume(task, {
      taskId: command.taskId,
      kind: task.kind,
      subjectRef: task.subjectRef,
      subjectHash: command.expectedSubjectHash,
      revision: command.expectedTaskRevision,
      requestedBy: task.requestedBy,
      resumedAt: checkedAt,
      ...(task.checkpointRef === undefined ? {} : { checkpointRef: task.checkpointRef }),
      ...(task.policyRef === undefined ? {} : { policyRef: task.policyRef }),
      ...(task.providerRevision === undefined ? {} : { providerRevision: task.providerRevision }),
      activityDescriptorRef: command.activityDescriptorRef,
      activityDescriptorHash: command.activityDescriptorHash,
    });
    const descriptor = await this.options.descriptors.get({
      activityDescriptorRef: command.activityDescriptorRef,
      activityDescriptorHash: command.activityDescriptorHash,
    });
    assertDescriptorIdentity(task, descriptor, command, checkedAt);
    const approvalEventId = approvedEventId(events, command);
    return { task, descriptor, approvalEventId };
  }

  private async findPrior(command: RuntimeActivityRedispatchCommand) {
    const events = await this.options.events.read({
      scope: streamScope(command.scope),
      types: ['activity.redispatch.requested'],
    });
    const prior = events.find((event) => {
      const payload = record(event.payload);
      const metadata = record(event.metadata);
      if (payload?.taskId !== command.taskId) return false;
      if (metadata?.expectedTaskRevision !== undefined) {
        return metadata.expectedTaskRevision === command.expectedTaskRevision;
      }
      return (
        payload.activityDescriptorRef === command.activityDescriptorRef &&
        payload.activityDescriptorHash === command.activityDescriptorHash
      );
    });
    if (!prior) return null;
    const payload = record(prior.payload);
    const metadata = record(prior.metadata);
    const expectedCommandHash = redispatchCommandHash(command);
    const redispatchIdentity = runtimeActivityRedispatchIdentity(command);
    const identityVersion = metadata?.redispatchIdentityVersion;
    const mismatches = [
      payload?.activityDescriptorRef !== command.activityDescriptorRef && 'descriptor_ref',
      payload?.activityDescriptorHash !== command.activityDescriptorHash && 'descriptor_hash',
      payload?.taskId !== command.taskId && 'task_id',
      prior.sessionId !== command.scope.sessionId && 'session_id',
      prior.workspaceId !== command.scope.workspaceId && 'workspace_id',
      metadata?.expectedTaskRevision !== undefined &&
        metadata.expectedTaskRevision !== command.expectedTaskRevision &&
        'task_revision',
      metadata?.subjectHash !== undefined &&
        metadata.subjectHash !== command.expectedSubjectHash &&
        'subject_hash',
      identityVersion === '1.0.0' &&
        metadata?.redispatchCommandHash !== expectedCommandHash &&
        'command_hash',
      identityVersion === '1.0.0' && prior.operationId !== redispatchIdentity && 'operation_id',
      identityVersion === '1.0.0' &&
        prior.idempotencyKey !== redispatchIdentity &&
        'idempotency_key',
    ].filter((mismatch): mismatch is string => typeof mismatch === 'string');
    if (mismatches.length > 0) {
      throw new FrameworkError({
        code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
        message: `Activity redispatch command was reused with different evidence: ${mismatches.join(
          ','
        )}`,
        context: { mismatches },
      });
    }
    return prior;
  }

  private async findReceipt(
    command: RuntimeActivityRedispatchCommand,
    requestEventId: string,
    redispatchIdentity: string
  ): Promise<{
    id: string;
    activityCommandId: string;
    source: 'dispatch' | 'reconcile';
  } | null> {
    const events = await this.options.events.read({
      scope: streamScope(command.scope),
      types: ['activity.redispatch.accepted'],
    });
    const receipt = events.find(
      (event) =>
        event.operationId === redispatchIdentity && record(event.payload)?.taskId === command.taskId
    );
    if (!receipt) return null;
    const payload = record(receipt.payload);
    const metadata = record(receipt.metadata);
    const mismatches = [
      payload?.requestEventId !== requestEventId && 'request_event_id',
      payload?.activityDescriptorRef !== command.activityDescriptorRef && 'descriptor_ref',
      payload?.activityDescriptorHash !== command.activityDescriptorHash && 'descriptor_hash',
      payload?.redispatchCommandId !== redispatchIdentity && 'redispatch_command_id',
      metadata?.expectedTaskRevision !== command.expectedTaskRevision && 'task_revision',
      metadata?.subjectHash !== command.expectedSubjectHash && 'subject_hash',
    ].filter((mismatch): mismatch is string => typeof mismatch === 'string');
    if (mismatches.length > 0) {
      throw new FrameworkError({
        code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
        message: `Activity redispatch receipt conflicts with command evidence: ${mismatches.join(
          ','
        )}`,
        context: { mismatches },
      });
    }
    if (
      typeof payload?.activityCommandId !== 'string' ||
      !payload.activityCommandId ||
      (payload.source !== 'dispatch' && payload.source !== 'reconcile')
    ) {
      corrupt('Activity redispatch receipt is incomplete');
    }
    return {
      id: receipt.id,
      activityCommandId: payload.activityCommandId,
      source: payload.source,
    };
  }

  private async appendAccepted(
    command: RuntimeActivityRedispatchCommand,
    evidence: {
      task: RuntimeHumanTask;
      descriptor: RuntimeActivityDescriptor;
      approvalEventId: string;
    },
    requestEventId: string,
    redispatchIdentity: string,
    receiptEventId: string,
    accepted: { commandId: string; reused: boolean },
    source: 'dispatch' | 'reconcile',
    authorization: RunLeaseAuthorization
  ): Promise<void> {
    const acceptedAt = this.now();
    validTimestamp(acceptedAt, 'Activity redispatch acceptance clock');
    await this.appendEvidenceEvent({
      command,
      event: redispatchAcceptedEvent({
        command,
        task: evidence.task,
        descriptor: evidence.descriptor,
        approvalEventId: evidence.approvalEventId,
        requestEventId,
        redispatchIdentity,
        receiptEventId,
        activityCommandId: accepted.commandId,
        commandReused: accepted.reused,
        source,
        acceptedAt,
      }),
      idempotencyKey: `${redispatchIdentity}:accepted`,
      authorization,
    });
  }

  private async appendOutcomeUnknown(
    command: RuntimeActivityRedispatchCommand,
    evidence: {
      task: RuntimeHumanTask;
      descriptor: RuntimeActivityDescriptor;
      approvalEventId: string;
    },
    requestEventId: string,
    redispatchIdentity: string,
    reason: string,
    authorization: RunLeaseAuthorization
  ): Promise<void> {
    const detectedAt = this.now();
    validTimestamp(detectedAt, 'Activity redispatch reconciliation clock');
    await this.appendEvidenceEvent({
      command,
      event: redispatchOutcomeUnknownEvent({
        command,
        task: evidence.task,
        descriptor: evidence.descriptor,
        approvalEventId: evidence.approvalEventId,
        requestEventId,
        redispatchIdentity,
        eventId: redispatchEvidenceEventId(redispatchIdentity, 'outcome-unknown'),
        reason,
        detectedAt,
      }),
      idempotencyKey: `${redispatchIdentity}:outcome-unknown`,
      authorization,
    });
  }

  private async appendEvidenceEvent(input: {
    command: RuntimeActivityRedispatchCommand;
    event: EventCreateInput;
    idempotencyKey: string;
    authorization: RunLeaseAuthorization;
  }): Promise<void> {
    const scope = streamScope(input.command.scope);
    const head = await this.options.events.getStreamHead(scope);
    if (!head) corrupt('Run Event stream does not exist');
    await this.options.events.append({
      scope,
      events: [input.event],
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: input.authorization.guard.fencingToken,
      idempotencyKey: input.idempotencyKey,
      transactionGroupId: runtimeActivityRedispatchIdentity(input.command),
    });
  }

  private async assertLeaseCurrent(authorization: RunLeaseAuthorization): Promise<void> {
    await this.options.runLeases.assertCurrent({
      scope: authorization.scope,
      guard: authorization.guard,
      checkedAt: this.now(),
    });
  }

  private acquire(
    command: RuntimeActivityRedispatchCommand,
    acquiredAt: string
  ): Promise<FencedRunLease | null> {
    const leaseId = this.nextId('activity-redispatch-lease');
    return this.options.runLeases.acquire({
      ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
      userId: command.scope.userId,
      runId: command.scope.runId,
      partitionKey: `runtime:${command.scope.runId}`,
      requestedLeaseId: leaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt,
      idempotencyKey: `${runtimeActivityRedispatchIdentity(command)}:lease:${leaseId}`,
    });
  }

  private async release(authorization: RunLeaseAuthorization): Promise<void> {
    try {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.now(),
      });
    } catch (error) {
      if (!isFrameworkError(error) || error.code !== 'RUNTIME_FENCING_REJECTED') throw error;
    }
  }
}

function redispatchEvent(
  command: RuntimeActivityRedispatchCommand,
  task: RuntimeHumanTask,
  descriptor: RuntimeActivityDescriptor,
  approvalEventId: string,
  eventId: string
): EventCreateInput {
  return {
    id: eventId,
    type: 'activity.redispatch.requested',
    version: '1.0.0',
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    ...(command.scope.workspaceId === undefined ? {} : { workspaceId: command.scope.workspaceId }),
    sessionId: command.scope.sessionId,
    runId: command.scope.runId,
    fsmState: task.stateId,
    correlationId: command.scope.runId,
    causationId: approvalEventId,
    parentEventId: approvalEventId,
    operationId: runtimeActivityRedispatchIdentity(command),
    idempotencyKey: runtimeActivityRedispatchIdentity(command),
    timestamp: command.requestedAt,
    payload: {
      commandId: command.commandId,
      taskId: task.taskId,
      activityId: descriptor.activityId,
      activityKind: descriptor.activityKind,
      activityDescriptorRef: command.activityDescriptorRef,
      activityDescriptorHash: command.activityDescriptorHash,
      idempotencyKey: descriptor.idempotencyKey,
      requestedAt: command.requestedAt,
    },
    metadata: {
      stateAttempt: task.stateAttempt,
      subjectHash: task.subjectHash,
      expectedTaskRevision: command.expectedTaskRevision,
      redispatchIdentityVersion: '1.0.0',
      redispatchCommandHash: redispatchCommandHash(command),
    },
  };
}

function redispatchAcceptedEvent(input: {
  command: RuntimeActivityRedispatchCommand;
  task: RuntimeHumanTask;
  descriptor: RuntimeActivityDescriptor;
  approvalEventId: string;
  requestEventId: string;
  redispatchIdentity: string;
  receiptEventId: string;
  activityCommandId: string;
  commandReused: boolean;
  source: 'dispatch' | 'reconcile';
  acceptedAt: string;
}): EventCreateInput {
  return {
    id: input.receiptEventId,
    type: 'activity.redispatch.accepted',
    version: '1.0.0',
    ...(input.command.scope.tenantId === undefined
      ? {}
      : { tenantId: input.command.scope.tenantId }),
    userId: input.command.scope.userId,
    ...(input.command.scope.workspaceId === undefined
      ? {}
      : { workspaceId: input.command.scope.workspaceId }),
    sessionId: input.command.scope.sessionId,
    runId: input.command.scope.runId,
    fsmState: input.task.stateId,
    correlationId: input.command.scope.runId,
    causationId: input.requestEventId,
    parentEventId: input.requestEventId,
    operationId: input.redispatchIdentity,
    idempotencyKey: `${input.redispatchIdentity}:accepted`,
    timestamp: input.acceptedAt,
    payload: {
      taskId: input.task.taskId,
      activityId: input.descriptor.activityId,
      activityDescriptorRef: input.command.activityDescriptorRef,
      activityDescriptorHash: input.command.activityDescriptorHash,
      redispatchCommandId: input.redispatchIdentity,
      activityCommandId: input.activityCommandId,
      requestEventId: input.requestEventId,
      approvalEventId: input.approvalEventId,
      commandReused: input.commandReused,
      source: input.source,
      acceptedAt: input.acceptedAt,
    },
    metadata: redispatchEvidenceMetadata(input.command, input.task),
  };
}

function redispatchOutcomeUnknownEvent(input: {
  command: RuntimeActivityRedispatchCommand;
  task: RuntimeHumanTask;
  descriptor: RuntimeActivityDescriptor;
  approvalEventId: string;
  requestEventId: string;
  redispatchIdentity: string;
  eventId: string;
  reason: string;
  detectedAt: string;
}): EventCreateInput {
  return {
    id: input.eventId,
    type: 'activity.redispatch.outcome_unknown',
    version: '1.0.0',
    ...(input.command.scope.tenantId === undefined
      ? {}
      : { tenantId: input.command.scope.tenantId }),
    userId: input.command.scope.userId,
    ...(input.command.scope.workspaceId === undefined
      ? {}
      : { workspaceId: input.command.scope.workspaceId }),
    sessionId: input.command.scope.sessionId,
    runId: input.command.scope.runId,
    fsmState: input.task.stateId,
    correlationId: input.command.scope.runId,
    causationId: input.requestEventId,
    parentEventId: input.requestEventId,
    operationId: input.redispatchIdentity,
    idempotencyKey: `${input.redispatchIdentity}:outcome-unknown`,
    timestamp: input.detectedAt,
    payload: {
      taskId: input.task.taskId,
      activityId: input.descriptor.activityId,
      activityDescriptorRef: input.command.activityDescriptorRef,
      activityDescriptorHash: input.command.activityDescriptorHash,
      redispatchCommandId: input.redispatchIdentity,
      requestEventId: input.requestEventId,
      approvalEventId: input.approvalEventId,
      reason: input.reason,
      detectedAt: input.detectedAt,
    },
    metadata: redispatchEvidenceMetadata(input.command, input.task),
  };
}

function redispatchEvidenceMetadata(
  command: RuntimeActivityRedispatchCommand,
  task: RuntimeHumanTask
): Record<string, unknown> {
  return {
    stateAttempt: task.stateAttempt,
    subjectHash: task.subjectHash,
    expectedTaskRevision: command.expectedTaskRevision,
    redispatchIdentityVersion: '1.0.0',
    redispatchCommandHash: redispatchCommandHash(command),
  };
}

function assertDescriptorIdentity(
  task: RuntimeHumanTask,
  descriptor: RuntimeActivityDescriptor,
  command: RuntimeActivityRedispatchCommand,
  checkedAt: string
): void {
  if (
    descriptor.runId !== command.scope.runId ||
    descriptor.stateId !== task.stateId ||
    descriptor.stateAttempt !== task.stateAttempt ||
    descriptorKindForTask(task.kind) !== descriptor.activityKind
  ) {
    humanTaskError(
      'HUMAN_TASK_RESUME_REVALIDATION_FAILED',
      'Activity descriptor no longer matches approved HumanTask evidence'
    );
  }
  if (
    descriptor.deadlineAt !== undefined &&
    Date.parse(descriptor.deadlineAt) <= Date.parse(checkedAt)
  ) {
    humanTaskError('HUMAN_TASK_EXPIRED', 'Activity descriptor expired before redispatch');
  }
}

function approvedEventId(
  events: readonly {
    id: string;
    type: string;
    payload: unknown;
  }[],
  command: RuntimeActivityRedispatchCommand
): string {
  const approval = events.find((event) => {
    if (event.type !== 'human.review.approved') return false;
    const payload = record(event.payload);
    return (
      payload?.taskId === command.taskId &&
      (payload.expectedRevision === undefined ||
        payload.expectedRevision === command.expectedTaskRevision - 1) &&
      (payload.expectedSubjectHash === undefined ||
        payload.expectedSubjectHash === command.expectedSubjectHash)
    );
  });
  if (!approval) {
    humanTaskError(
      'HUMAN_TASK_RESUME_REVALIDATION_FAILED',
      'Approved HumanTask decision Event was not found'
    );
  }
  return approval.id;
}

function descriptorKindForTask(
  kind: RuntimeHumanTask['kind']
): RuntimeActivityDescriptor['activityKind'] {
  if (kind === 'skill' || kind === 'prompt') return 'policy';
  return kind;
}

export function runtimeActivityRedispatchIdentity(
  command: Pick<RuntimeActivityRedispatchCommand, 'scope' | 'taskId' | 'expectedTaskRevision'>
): string {
  const digest = hashCanonicalJson({
    ...(command.scope.tenantId === undefined ? {} : { tenantId: command.scope.tenantId }),
    userId: command.scope.userId,
    runId: command.scope.runId,
    taskId: command.taskId,
    expectedTaskRevision: command.expectedTaskRevision,
  }).slice('sha256:'.length);
  return `activity-redispatch:${digest}`;
}

function redispatchEvidenceEventId(
  redispatchIdentity: string,
  kind: 'accepted' | 'outcome-unknown'
): string {
  return `${redispatchIdentity}:${kind}`;
}

function redispatchCommandHash(command: RuntimeActivityRedispatchCommand): string {
  return hashCanonicalJson({
    scope: command.scope,
    taskId: command.taskId,
    expectedTaskRevision: command.expectedTaskRevision,
    expectedSubjectHash: command.expectedSubjectHash,
    activityDescriptorRef: command.activityDescriptorRef,
    activityDescriptorHash: command.activityDescriptorHash,
  });
}

function streamScope(scope: RuntimeScope): EventStreamScope {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
  };
}

function authorizationFor(lease: FencedRunLease): RunLeaseAuthorization {
  return {
    scope: {
      ...(lease.tenantId === undefined ? {} : { tenantId: lease.tenantId }),
      userId: lease.userId,
      runId: lease.runId,
      partitionKey: lease.partitionKey,
    },
    guard: {
      leaseId: lease.id,
      ownerId: lease.ownerId,
      fencingToken: lease.fencingToken,
    },
  };
}

function validateCommand(command: RuntimeActivityRedispatchCommand): void {
  for (const [label, value] of [
    ['commandId', command.commandId],
    ['scope.userId', command.scope.userId],
    ['scope.sessionId', command.scope.sessionId],
    ['scope.runId', command.scope.runId],
    ['ownerId', command.ownerId],
    ['taskId', command.taskId],
    ['activityDescriptorRef', command.activityDescriptorRef],
  ] as const) {
    if (!value) invalid(`${label} is required`);
  }
  if (!Number.isSafeInteger(command.leaseTtlMs) || command.leaseTtlMs < 1) {
    invalid('leaseTtlMs must be a positive integer');
  }
  if (!Number.isSafeInteger(command.expectedTaskRevision) || command.expectedTaskRevision < 1) {
    invalid('expectedTaskRevision must be a positive integer');
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(command.expectedSubjectHash)) {
    invalid('expectedSubjectHash must be a sha256 digest');
  }
  if (!/^sha256:[a-f0-9]{64}$/u.test(command.activityDescriptorHash)) {
    invalid('activityDescriptorHash must be a sha256 digest');
  }
  if (!Number.isFinite(Date.parse(command.requestedAt))) {
    invalid('requestedAt must be a valid date-time');
  }
}

function validateDispatchResult(result: { commandId: string; reused: boolean }): void {
  if (!result.commandId || typeof result.reused !== 'boolean') {
    invalid('Activity redispatch result is invalid');
  }
}

function validateReconciliation(result: RuntimeActivityRedispatchReconciliation): void {
  if (result.status === 'accepted') {
    if (!result.commandId) invalid('Accepted Activity reconciliation requires commandId');
    return;
  }
  if (result.status === 'safe_to_dispatch') return;
  if (result.status === 'unknown' && result.reason) return;
  invalid('Activity redispatch reconciliation result is invalid');
}

function validTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
}

function assertActive(signal: AbortSignal): void {
  if (signal.aborted) {
    throw new FrameworkError({
      code: 'RUNTIME_CANCELLED',
      message: 'Activity redispatch was cancelled',
    });
  }
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function humanTaskError(code: string, message: string): never {
  throw new FrameworkError({ code, message });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
