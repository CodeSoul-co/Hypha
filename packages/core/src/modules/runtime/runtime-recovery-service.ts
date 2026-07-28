import type {
  RuntimeActivityInvocation,
  RuntimeActivityObservation,
} from '../../contracts/runtime-activities';
import {
  validateRuntimeActivityInvocation,
  validateRuntimeActivityObservation,
} from '../../contracts/runtime-activity-schemas';
import { validateRuntimeCancelCommand } from '../../contracts/runtime-cancellation-schemas';
import type {
  RunLeaseAuthorization,
  RunLeaseStore,
  StateExecutionClaimStore,
} from '../../contracts/runtime-coordination';
import type { RuntimeOrchestrationProjection } from '../../contracts/runtime-projection';
import type {
  RuntimeActivityReconciliationPort,
  RuntimeActivityReconciliationResult,
  RuntimeCancellationRecoveryPort,
  RuntimeRecoveryCandidate,
  RuntimeRecoveryCommand,
  RuntimeRecoveryDisposition,
  RuntimeRecoveryRequeuePort,
  RuntimeRecoveryResult,
  RuntimeRecoveryScanRequest,
  RuntimeRecoveryScanResult,
} from '../../contracts/runtime-recovery';
import {
  validateRuntimeActivityReconciliationResult,
  validateRuntimeActivityCompensationResult,
  validateRuntimeRecoveryCandidate,
  validateRuntimeRecoveryCommand,
  validateRuntimeRecoveryResult,
  validateRuntimeRecoveryScanRequest,
  validateRuntimeRecoveryScanResult,
} from '../../contracts/runtime-recovery-schemas';
import type {
  EventCreateInput,
  PersistedFrameworkEvent,
  RuntimeActivityEventType,
} from '../../events';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import { eventStreamKey, type EventStreamScope } from './event-store';
import {
  createRuntimeOrchestrationProjectionDefinition,
  RUNTIME_ORCHESTRATION_PROJECTION_ID,
  RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
} from './orchestration-projection';
import type { ProjectionEngine, ProjectionStore } from './projection';
import type {
  RuntimeActivityRedispatchCommand,
  RuntimeActivityRedispatchResult,
} from './runtime-activity-redispatch-service';

const REQUEUE_STATUSES = new Set([
  'created',
  'queued',
  'starting',
  'acquiring',
  'running',
  'retry_scheduled',
  'recovering',
]);
const TERMINAL_ACTIVITY_STATUSES = new Set(['completed', 'failed', 'cancelled']);

export interface RuntimeRecoveryServiceOptions {
  events: EventRuntime;
  projections: ProjectionEngine;
  projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
  runLeases: RunLeaseStore;
  stateClaims: StateExecutionClaimStore;
  activities: RuntimeActivityReconciliationPort;
  redispatches: RuntimeActivityRedispatchRecoveryPort;
  cancellations: RuntimeCancellationRecoveryPort;
  requeue: RuntimeRecoveryRequeuePort;
  now?: () => string;
  nextId?: (namespace: string) => string;
}

export interface RuntimeActivityRedispatchRecoveryPort {
  redispatch(command: RuntimeActivityRedispatchCommand): Promise<RuntimeActivityRedispatchResult>;
}

export class RuntimeRecoveryService {
  private readonly now: () => string;
  private readonly nextId: (namespace: string) => string;

  constructor(private readonly options: RuntimeRecoveryServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    let sequence = 0;
    this.nextId = options.nextId ?? ((namespace) => `${namespace}.${++sequence}`);
  }

  async scan(input: RuntimeRecoveryScanRequest): Promise<RuntimeRecoveryScanResult> {
    const request = validateRuntimeRecoveryScanRequest(input);
    const page = await this.options.events.listStreamHeads({
      limit: request.limit,
      ...(request.cursor === undefined ? {} : { cursor: request.cursor }),
    });
    const candidates: RuntimeRecoveryCandidate[] = [];
    for (const head of page.heads) {
      const record = await this.options.projectionStore.get(
        RUNTIME_ORCHESTRATION_PROJECTION_ID,
        eventStreamKey(head.scope)
      );
      const currentLease = await this.options.runLeases.get(
        leaseScope(head.scope),
        request.checkedAt
      );
      if (
        !record ||
        record.projectionVersion !== RUNTIME_ORCHESTRATION_PROJECTION_VERSION ||
        record.lastSequence < head.lastSequence
      ) {
        candidates.push(
          candidate({
            scope: head.scope,
            reason: 'PROJECTION_BEHIND',
            safeAction: 'rebuild_projection',
            eventHeadSequence: head.lastSequence,
            ...(record === null ? {} : { projectionSequence: record.lastSequence }),
            ...(currentLease === null ? {} : { currentLease }),
            detectedAt: request.checkedAt,
          })
        );
        continue;
      }

      const projection = record.state;
      const streamEvents = await this.options.events.read({ scope: head.scope });
      const completedCandidates = completedCandidateIds(streamEvents);
      const addCandidate = (input: RuntimeRecoveryCandidate): void => {
        if (!completedCandidates.has(input.candidateId)) candidates.push(input);
      };
      for (const requestEvent of incompleteRedispatchRequests(streamEvents)) {
        const payload = payloadRecord(requestEvent);
        addCandidate(
          candidate({
            scope: head.scope,
            reason: 'ACTIVITY_REDISPATCH_INCOMPLETE',
            safeAction: 'reconcile_redispatch',
            eventHeadSequence: head.lastSequence,
            projectionSequence: record.lastSequence,
            activityId: requiredString(payload.activityId, 'Redispatch Activity id'),
            redispatchRequestEventId: requestEvent.id,
            ...(currentLease === null ? {} : { currentLease }),
            detectedAt: request.checkedAt,
          })
        );
      }
      for (const activityId of projection.pendingActivityIds) {
        addCandidate(
          candidate({
            scope: head.scope,
            reason: 'ACTIVITY_RESULT_UNAPPLIED',
            safeAction: 'apply_observation',
            eventHeadSequence: head.lastSequence,
            projectionSequence: record.lastSequence,
            activityId,
            ...(currentLease === null ? {} : { currentLease }),
            detectedAt: request.checkedAt,
          })
        );
      }
      for (const activityId of compensationActivityIds(streamEvents)) {
        addCandidate(
          candidate({
            scope: head.scope,
            reason: 'ACTIVITY_COMPENSATION_REQUIRED',
            safeAction: 'compensate_activity',
            eventHeadSequence: head.lastSequence,
            projectionSequence: record.lastSequence,
            activityId,
            ...(currentLease === null ? {} : { currentLease }),
            detectedAt: request.checkedAt,
          })
        );
      }
      if (projection.runStatus === 'cancelling') {
        addCandidate(
          candidate({
            scope: head.scope,
            reason: 'CANCELLATION_INCOMPLETE',
            safeAction: 'apply_observation',
            eventHeadSequence: head.lastSequence,
            projectionSequence: record.lastSequence,
            ...(currentLease === null ? {} : { currentLease }),
            detectedAt: request.checkedAt,
          })
        );
      } else if (
        REQUEUE_STATUSES.has(projection.runStatus) &&
        currentLease === null &&
        projection.currentState &&
        projection.stateAttempt > 0
      ) {
        const stateClaim = await this.options.stateClaims.get(
          {
            ...(head.scope.tenantId === undefined ? {} : { tenantId: head.scope.tenantId }),
            userId: head.scope.userId,
            runId: head.scope.runId,
            stateId: projection.currentState,
            stateAttempt: projection.stateAttempt,
          },
          request.checkedAt
        );
        if (stateClaim?.status === 'expired') {
          addCandidate(
            candidate({
              scope: head.scope,
              reason: 'STATE_CLAIM_EXPIRED',
              safeAction: 'requeue',
              eventHeadSequence: head.lastSequence,
              projectionSequence: record.lastSequence,
              stateId: projection.currentState,
              stateAttempt: projection.stateAttempt,
              detectedAt: request.checkedAt,
            })
          );
        }
      }
    }
    return validateRuntimeRecoveryScanResult({
      candidates,
      scannedStreams: page.heads.length,
      ...(page.nextCursor === undefined ? {} : { nextCursor: page.nextCursor }),
    });
  }

  async recover(input: RuntimeRecoveryCommand): Promise<RuntimeRecoveryResult> {
    const command = validateRuntimeRecoveryCommand(input);
    const prior = await this.operationEvents(command);
    const complete = completedRecovery(prior);
    if (complete) return this.reusedResult(command, prior, complete);

    const head = await this.options.events.getStreamHead(streamScope(command.candidate));
    if (!head) return result(command, 'stale');
    if (prior.length === 0 && head.lastSequence !== command.candidate.eventHeadSequence) {
      return result(command, 'stale');
    }
    if (command.candidate.reason === 'ACTIVITY_REDISPATCH_INCOMPLETE') {
      return this.recoverRedispatch(command);
    }
    if (command.candidate.reason === 'CANCELLATION_INCOMPLETE') {
      return this.recoverCancellation(command);
    }

    const authorization = await this.acquireRunLease(command);
    if (!authorization) return result(command, 'lease_unavailable');
    try {
      let operation = await this.operationEvents(command);
      if (!operation.some((event) => event.type === 'recovery.case.opened')) {
        await this.append(
          command,
          authorization,
          [this.recoveryEvent(command, 'recovery.case.opened')],
          'opened'
        );
        operation = await this.operationEvents(command);
      }
      if (command.candidate.reason === 'PROJECTION_BEHIND') {
        return await this.rebuildProjection(command, authorization, operation);
      }
      if (command.candidate.reason === 'ACTIVITY_RESULT_UNAPPLIED') {
        return await this.reconcileActivity(command, authorization, operation);
      }
      if (command.candidate.reason === 'ACTIVITY_COMPENSATION_REQUIRED') {
        return await this.compensateActivity(command, authorization, operation);
      }
      if (
        command.candidate.reason === 'LEASE_EXPIRED' ||
        command.candidate.reason === 'STATE_CLAIM_EXPIRED'
      ) {
        return await this.requeue(command, authorization, operation);
      }
      return await this.escalate(
        command,
        authorization,
        operation,
        'Recovery action is unsupported'
      );
    } finally {
      await this.release(authorization);
    }
  }

  private async recoverRedispatch(command: RuntimeRecoveryCommand): Promise<RuntimeRecoveryResult> {
    const request = await this.redispatchRequest(command.candidate);
    if (!request) return result(command, 'stale');
    const payload = payloadRecord(request);
    const metadata = recordValue(request.metadata);
    if (!metadata) invalid('Redispatch request metadata must be an object');
    try {
      const recovered = await this.options.redispatches.redispatch({
        commandId: requiredString(payload.commandId, 'Redispatch command id'),
        scope: {
          ...(request.tenantId === undefined ? {} : { tenantId: request.tenantId }),
          userId: request.userId,
          ...(request.workspaceId === undefined ? {} : { workspaceId: request.workspaceId }),
          sessionId: requiredString(request.sessionId, 'Redispatch Session id'),
          runId: request.runId,
          ...(request.agentId === undefined ? {} : { agentId: request.agentId }),
        },
        ownerId: command.ownerId,
        leaseTtlMs: command.leaseTtlMs,
        taskId: requiredString(payload.taskId, 'Redispatch task id'),
        expectedTaskRevision: requiredPositiveInteger(
          metadata.expectedTaskRevision,
          'Redispatch expected task revision'
        ),
        expectedSubjectHash: requiredString(
          metadata.subjectHash,
          'Redispatch expected subject hash'
        ),
        activityDescriptorRef: requiredString(
          payload.activityDescriptorRef,
          'Redispatch Activity descriptor reference'
        ),
        activityDescriptorHash: requiredString(
          payload.activityDescriptorHash,
          'Redispatch Activity descriptor hash'
        ),
        requestedAt: requiredString(payload.requestedAt, 'Redispatch requested timestamp'),
        idempotencyKey: request.idempotencyKey ?? request.id,
      });
      if (recovered.requestEventId !== request.id) {
        invalid('Redispatch recovery returned a different request Event id');
      }
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: recovered.receiptReused ? 'reused' : 'recovered',
        eventIds: [recovered.requestEventId, recovered.receiptEventId],
        projection: await this.project(command.candidate),
      });
    } catch (error) {
      if (!isFrameworkError(error)) throw error;
      if (error.code === 'RUNTIME_LEASE_UNAVAILABLE') {
        return result(command, 'lease_unavailable');
      }
      if (error.code !== 'RUNTIME_ACTIVITY_OUTCOME_UNKNOWN') throw error;
      const outcome = await this.redispatchOutcomeUnknown(command.candidate, request.id);
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: 'requires_review',
        eventIds: [request.id, ...(outcome === null ? [] : [outcome.id])],
        projection: await this.project(command.candidate),
      });
    }
  }

  private async redispatchRequest(
    candidateInput: RuntimeRecoveryCandidate
  ): Promise<PersistedFrameworkEvent | null> {
    const requestEventId = candidateInput.redispatchRequestEventId;
    if (!requestEventId) invalid('Redispatch recovery candidate is missing request Event id');
    const requests = await this.options.events.read({
      scope: streamScope(candidateInput),
      types: ['activity.redispatch.requested'],
    });
    return requests.find((event) => event.id === requestEventId) ?? null;
  }

  private async redispatchOutcomeUnknown(
    candidateInput: RuntimeRecoveryCandidate,
    requestEventId: string
  ): Promise<PersistedFrameworkEvent | null> {
    const outcomes = await this.options.events.read({
      scope: streamScope(candidateInput),
      types: ['activity.redispatch.outcome_unknown'],
    });
    return (
      outcomes.find((event) => payloadString(event, 'requestEventId') === requestEventId) ?? null
    );
  }

  private async rebuildProjection(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    operation: PersistedFrameworkEvent[]
  ): Promise<RuntimeRecoveryResult> {
    const definition = createRuntimeOrchestrationProjectionDefinition(
      command.candidate.scope.runId
    );
    await this.options.projections.rebuild(
      definition,
      this.options.projectionStore,
      streamScope(command.candidate)
    );
    await this.heartbeat(command, authorization);
    const appended = await this.append(
      command,
      authorization,
      [this.recoveryEvent(command, 'recovery.case.resolved', { disposition: 'recovered' })],
      'resolved'
    );
    const projection = await this.project(command.candidate);
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition: appended.reused ? 'reused' : 'recovered',
      eventIds: [
        ...operation.map((event) => event.id),
        ...appended.events.map((event) => event.id),
      ],
      projection,
    });
  }

  private async reconcileActivity(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    operation: PersistedFrameworkEvent[]
  ): Promise<RuntimeRecoveryResult> {
    const invocation = await this.activityInvocation(command.candidate);
    if (!invocation) {
      return this.escalate(
        command,
        authorization,
        operation,
        'Activity invocation is missing or invalid'
      );
    }
    let reconciliation = validateRuntimeActivityReconciliationResult(
      await this.options.activities.reconcile({
        invocation,
        checkedAt: command.requestedAt,
        idempotencyKey: `${operationId(command)}:query`,
      })
    );
    await this.heartbeat(command, authorization);
    if (reconciliation.activityId !== invocation.activityId) {
      invalid('Activity reconciliation returned a different activityId');
    }
    if (reconciliation.status === 'unknown') {
      if (invocation.effect === 'external_effect' || invocation.effect === 'irreversible') {
        return this.escalate(
          command,
          authorization,
          operation,
          'Side-effecting Activity state is unknown'
        );
      }
      try {
        reconciliation = await this.retryActivity(command, authorization, invocation);
      } catch (error) {
        if (!isFrameworkError(error) || error.code !== 'RUNTIME_STATE_EXECUTION_UNAVAILABLE') {
          throw error;
        }
        return this.escalate(
          command,
          authorization,
          operation,
          'Activity provider cannot safely retry the unresolved invocation'
        );
      }
    } else if (reconciliation.status === 'not_started') {
      try {
        reconciliation = await this.retryActivity(command, authorization, invocation);
      } catch (error) {
        if (!isFrameworkError(error) || error.code !== 'RUNTIME_STATE_EXECUTION_UNAVAILABLE') {
          throw error;
        }
        return this.escalate(
          command,
          authorization,
          operation,
          'Activity provider cannot safely start the unresolved invocation'
        );
      }
    }
    if (reconciliation.status === 'waiting') {
      return this.escalate(
        command,
        authorization,
        operation,
        'Activity is waiting for an external or human decision'
      );
    }

    const observation = reconciliation.observation;
    if (!observation) invalid('Reconciled Activity result has no observation');
    const eventType: RuntimeActivityEventType = `runtime.activity.${observation.status}`;
    const appended = await this.append(
      command,
      authorization,
      [
        this.activityEvent(command, invocation, observation, eventType),
        this.recoveryEvent(command, 'recovery.case.resolved', {
          disposition: 'recovered',
          activityStatus: observation.status,
          providerRevision: reconciliation.providerRevision,
          receiptId: reconciliation.receiptId,
        }),
      ],
      'resolved'
    );
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition: appended.reused ? 'reused' : 'recovered',
      eventIds: [
        ...operation.map((event) => event.id),
        ...appended.events.map((event) => event.id),
      ],
      projection: await this.project(command.candidate),
    });
  }

  private async retryActivity(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    invocation: RuntimeActivityInvocation
  ): Promise<RuntimeActivityReconciliationResult> {
    const observation = validateRuntimeActivityObservation(
      await this.options.activities.retry({
        invocation,
        checkedAt: command.requestedAt,
        fencingToken: authorization.guard.fencingToken,
        idempotencyKey: `${operationId(command)}:retry`,
      })
    );
    await this.heartbeat(command, authorization);
    if (observation.activityId !== invocation.activityId) {
      invalid('Activity retry returned a different activityId');
    }
    return { activityId: invocation.activityId, status: observation.status, observation };
  }

  private async compensateActivity(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    operation: PersistedFrameworkEvent[]
  ): Promise<RuntimeRecoveryResult> {
    const invocation = await this.activityInvocation(command.candidate);
    if (!invocation) {
      return this.escalate(
        command,
        authorization,
        operation,
        'Compensation Activity invocation is missing or invalid'
      );
    }
    if (
      invocation.effect !== 'external_effect' ||
      invocation.metadata?.compensationAvailable !== true
    ) {
      return this.escalate(
        command,
        authorization,
        operation,
        'Activity is not declared safely compensatable'
      );
    }
    if (!this.options.activities.compensate) {
      return this.escalate(
        command,
        authorization,
        operation,
        'Activity provider does not expose compensation'
      );
    }

    const compensationId = `${command.candidate.candidateId}:compensation`;
    if (!operation.some((event) => event.type === 'runtime.activity.compensation.requested')) {
      const requested = await this.append(
        command,
        authorization,
        [
          this.compensationEvent(command, invocation, 'runtime.activity.compensation.requested', {
            compensationId,
            reason: command.candidate.reason,
            requestedAt: command.requestedAt,
          }),
        ],
        'compensation-requested'
      );
      operation = [...operation, ...requested.events];
    }
    await this.heartbeat(command, authorization);

    let compensation;
    try {
      compensation = validateRuntimeActivityCompensationResult(
        await this.options.activities.compensate({
          invocation,
          reason: command.candidate.reason,
          requestedAt: command.requestedAt,
          fencingToken: authorization.guard.fencingToken,
          idempotencyKey: `${operationId(command)}:compensate`,
        })
      );
      if (compensation.activityId !== invocation.activityId) {
        invalid('Activity compensation returned a different activityId');
      }
    } catch (error) {
      const errorCode =
        error instanceof FrameworkError ? error.code : 'runtime_activity_compensation_failed';
      const appended = await this.append(
        command,
        authorization,
        [
          this.compensationEvent(command, invocation, 'runtime.activity.compensation.failed', {
            compensationId,
            status: 'failed',
            errorCode,
          }),
          this.recoveryEvent(command, 'recovery.case.escalated', {
            disposition: 'requires_review',
            reason: 'Activity compensation provider failed',
            errorCode,
          }),
        ],
        'compensation-failed'
      );
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: 'requires_review',
        eventIds: [
          ...operation.map((event) => event.id),
          ...appended.events.map((event) => event.id),
        ],
        projection: await this.project(command.candidate),
      });
    }
    await this.heartbeat(command, authorization);

    if (compensation.status !== 'completed') {
      const appended = await this.append(
        command,
        authorization,
        [
          this.compensationEvent(command, invocation, 'runtime.activity.compensation.failed', {
            compensationId,
            status: compensation.status,
            providerRevision: compensation.providerRevision,
            errorCode: compensation.errorCode,
          }),
          this.recoveryEvent(command, 'recovery.case.escalated', {
            disposition: 'requires_review',
            reason: 'Activity compensation requires operator review',
            compensationStatus: compensation.status,
          }),
        ],
        'compensation-review'
      );
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: 'requires_review',
        eventIds: [
          ...operation.map((event) => event.id),
          ...appended.events.map((event) => event.id),
        ],
        projection: await this.project(command.candidate),
      });
    }

    const appended = await this.append(
      command,
      authorization,
      [
        this.compensationEvent(command, invocation, 'runtime.activity.compensation.completed', {
          compensationId,
          status: compensation.status,
          providerRevision: compensation.providerRevision,
          receiptId: compensation.receiptId,
        }),
        this.recoveryEvent(command, 'recovery.case.resolved', {
          disposition: 'compensated',
          activityId: invocation.activityId,
          receiptId: compensation.receiptId,
        }),
      ],
      'compensation-completed'
    );
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition: appended.reused ? 'reused' : 'compensated',
      eventIds: [
        ...operation.map((event) => event.id),
        ...appended.events.map((event) => event.id),
      ],
      projection: await this.project(command.candidate),
    });
  }

  private async requeue(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    operation: PersistedFrameworkEvent[]
  ): Promise<RuntimeRecoveryResult> {
    try {
      await this.options.requeue.requeue({
        scope: command.candidate.scope,
        reason: command.candidate.reason,
        requestedAt: command.requestedAt,
        fencingToken: authorization.guard.fencingToken,
        ...(command.candidate.stateId === undefined
          ? {}
          : { expectedStateId: command.candidate.stateId }),
        ...(command.candidate.stateAttempt === undefined
          ? {}
          : { expectedStateAttempt: command.candidate.stateAttempt }),
        idempotencyKey: `${operationId(command)}:requeue`,
      });
    } catch (error) {
      if (!isFrameworkError(error) || error.code !== 'RUNTIME_STATE_EXECUTION_UNAVAILABLE') {
        throw error;
      }
      return this.escalate(
        command,
        authorization,
        operation,
        'Runtime owner cannot safely requeue the interrupted State attempt'
      );
    }
    await this.heartbeat(command, authorization);
    const appended = await this.append(
      command,
      authorization,
      [this.recoveryEvent(command, 'recovery.case.resolved', { disposition: 'requeued' })],
      'resolved'
    );
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition: appended.reused ? 'reused' : 'requeued',
      eventIds: [
        ...operation.map((event) => event.id),
        ...appended.events.map((event) => event.id),
      ],
      projection: await this.project(command.candidate),
    });
  }

  private async recoverCancellation(
    command: RuntimeRecoveryCommand
  ): Promise<RuntimeRecoveryResult> {
    const events = await this.options.events.read({ scope: streamScope(command.candidate) });
    const requested = events.find((event) => event.type === 'run.cancel.requested');
    const storedCommand = requested ? payloadRecord(requested).command : undefined;
    if (!storedCommand) return result(command, 'requires_review');
    const cancelCommand = validateRuntimeCancelCommand({
      ...(storedCommand as Record<string, unknown>),
      ownerId: command.ownerId,
      leaseTtlMs: command.leaseTtlMs,
    });
    const cancellation = await this.options.cancellations.cancel(cancelCommand);
    const authorization = await this.acquireRunLease(command);
    if (!authorization) {
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: 'recovered',
        eventIds: cancellation.eventIds,
        projection: cancellation.projection,
      });
    }
    try {
      const appended = await this.append(
        command,
        authorization,
        [
          this.recoveryEvent(command, 'recovery.case.opened'),
          this.recoveryEvent(command, 'recovery.case.resolved', { disposition: 'recovered' }),
        ],
        'cancellation-resolved'
      );
      return validateRuntimeRecoveryResult({
        candidateId: command.candidate.candidateId,
        disposition: appended.reused ? 'reused' : 'recovered',
        eventIds: appended.events.map((event) => event.id),
        projection: await this.project(command.candidate),
      });
    } finally {
      await this.release(authorization);
    }
  }

  private async escalate(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    operation: PersistedFrameworkEvent[],
    reason: string
  ): Promise<RuntimeRecoveryResult> {
    const appended = await this.append(
      command,
      authorization,
      [
        this.recoveryEvent(command, 'recovery.case.escalated', {
          disposition: 'requires_review',
          reason,
        }),
      ],
      'escalated'
    );
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition: 'requires_review',
      eventIds: [
        ...operation.map((event) => event.id),
        ...appended.events.map((event) => event.id),
      ],
      projection: await this.project(command.candidate),
    });
  }

  private async activityInvocation(
    candidate: RuntimeRecoveryCandidate
  ): Promise<RuntimeActivityInvocation | null> {
    const requested = (await this.options.events.read({ scope: streamScope(candidate) })).find(
      (event) =>
        event.type === 'runtime.activity.requested' &&
        activityIdFromRequested(event) === candidate.activityId
    );
    if (!requested) return null;
    try {
      return validateRuntimeActivityInvocation(payloadRecord(requested).invocation);
    } catch {
      return null;
    }
  }

  private async acquireRunLease(
    command: RuntimeRecoveryCommand
  ): Promise<RunLeaseAuthorization | null> {
    const requestedLeaseId = this.nextId('runtime-recovery-lease');
    const lease = await this.options.runLeases.acquire({
      ...(command.candidate.scope.tenantId === undefined
        ? {}
        : { tenantId: command.candidate.scope.tenantId }),
      userId: command.candidate.scope.userId,
      runId: command.candidate.scope.runId,
      partitionKey: `runtime:${command.candidate.scope.runId}`,
      requestedLeaseId,
      ownerId: command.ownerId,
      ttlMs: command.leaseTtlMs,
      acquiredAt: this.timestamp('Recovery Lease acquisition'),
      idempotencyKey: `${operationId(command)}:lease:${requestedLeaseId}`,
    });
    if (!lease) return null;
    return {
      scope: leaseScope(command.candidate.scope),
      guard: {
        leaseId: lease.id,
        ownerId: lease.ownerId,
        fencingToken: lease.fencingToken,
      },
    };
  }

  private async release(authorization: RunLeaseAuthorization): Promise<void> {
    try {
      await this.options.runLeases.release({
        scope: authorization.scope,
        guard: authorization.guard,
        releasedAt: this.timestamp('Recovery Lease release'),
      });
    } catch (error) {
      if (!isFrameworkError(error) || error.code !== 'RUNTIME_FENCING_REJECTED') throw error;
    }
  }

  private async heartbeat(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization
  ): Promise<void> {
    await this.options.runLeases.heartbeat({
      scope: authorization.scope,
      guard: authorization.guard,
      ttlMs: command.leaseTtlMs,
      heartbeatAt: this.timestamp('Recovery Lease heartbeat'),
    });
  }

  private async append(
    command: RuntimeRecoveryCommand,
    authorization: RunLeaseAuthorization,
    events: EventCreateInput[],
    phase: string
  ) {
    const scope = streamScope(command.candidate);
    const head = await this.options.events.getStreamHead(scope);
    if (!head) invalid('Recovery Event stream does not exist');
    return this.options.events.append({
      scope,
      events,
      expectedLastSequence: head.lastSequence,
      expectedRunRevision: head.runRevision,
      fencingToken: authorization.guard.fencingToken,
      idempotencyKey: `${operationId(command)}:${phase}`,
      transactionGroupId: `${operationId(command)}:${phase}`,
    });
  }

  private recoveryEvent(
    command: RuntimeRecoveryCommand,
    type: Extract<
      EventCreateInput['type'],
      'recovery.case.opened' | 'recovery.case.resolved' | 'recovery.case.escalated'
    >,
    details: Record<string, unknown> = {}
  ): EventCreateInput {
    const status =
      type === 'recovery.case.opened'
        ? 'active'
        : type === 'recovery.case.resolved'
          ? 'recovered'
          : 'suspended';
    return this.event(
      command.candidate,
      type,
      withoutUndefined({
        caseId: command.candidate.candidateId,
        rootFingerprint: candidateHash(command.candidate),
        status,
        cycles: 1,
        candidateId: command.candidate.candidateId,
        candidateHash: candidateHash(command.candidate),
        reason: command.candidate.reason,
        safeAction: command.candidate.safeAction,
        activityId: command.candidate.activityId,
        stateId: command.candidate.stateId,
        stateAttempt: command.candidate.stateAttempt,
        ...withoutUndefined(details),
      })
    );
  }

  private activityEvent(
    command: RuntimeRecoveryCommand,
    invocation: RuntimeActivityInvocation,
    observation: RuntimeActivityObservation,
    type: RuntimeActivityEventType
  ): EventCreateInput {
    return {
      ...this.event(command.candidate, type, {
        activityId: invocation.activityId,
        observation,
        reconciledBy: command.candidate.candidateId,
      }),
      operationId: invocation.operationId,
      idempotencyKey: `${invocation.idempotencyKey}:event:${observation.status}:reconciled`,
      fsmState: invocation.stateId,
      metadata: {
        stateAttempt: invocation.stateAttempt,
        recoveryCandidateId: command.candidate.candidateId,
      },
    };
  }

  private compensationEvent(
    command: RuntimeRecoveryCommand,
    invocation: RuntimeActivityInvocation,
    type: Extract<
      EventCreateInput['type'],
      | 'runtime.activity.compensation.requested'
      | 'runtime.activity.compensation.completed'
      | 'runtime.activity.compensation.failed'
    >,
    details: Record<string, unknown>
  ): EventCreateInput {
    return {
      ...this.event(command.candidate, type, {
        activityId: invocation.activityId,
        ...withoutUndefined(details),
      }),
      operationId: invocation.operationId,
      idempotencyKey: `${operationId(command)}:${type}`,
      fsmState: invocation.stateId,
      metadata: {
        stateAttempt: invocation.stateAttempt,
        recoveryCandidateId: command.candidate.candidateId,
      },
    };
  }

  private event(
    candidateInput: RuntimeRecoveryCandidate,
    type: EventCreateInput['type'],
    payload: Record<string, unknown>
  ): EventCreateInput {
    return {
      id: this.nextId('runtime-recovery-event'),
      type,
      version: '1.0.0',
      ...(candidateInput.scope.tenantId === undefined
        ? {}
        : { tenantId: candidateInput.scope.tenantId }),
      userId: candidateInput.scope.userId,
      runId: candidateInput.scope.runId,
      correlationId: candidateInput.scope.runId,
      operationId: `runtime-recovery:${candidateInput.candidateId}`,
      idempotencyKey: candidateInput.candidateId,
      timestamp: this.timestamp('Recovery Event timestamp'),
      payload,
      metadata: { recoveryCandidateId: candidateInput.candidateId },
    };
  }

  private async operationEvents(
    command: RuntimeRecoveryCommand
  ): Promise<PersistedFrameworkEvent[]> {
    const events = (
      await this.options.events.read({ scope: streamScope(command.candidate) })
    ).filter((event) => event.operationId === operationId(command));
    if (events.length === 0) return [];
    const recordedHash = payloadString(events[0], 'candidateHash');
    if (recordedHash !== candidateHash(command.candidate)) {
      throw new FrameworkError({
        code: 'RUNTIME_IDEMPOTENCY_CONFLICT',
        message: 'Recovery candidate id was reused with different input',
      });
    }
    return events;
  }

  private async reusedResult(
    command: RuntimeRecoveryCommand,
    events: PersistedFrameworkEvent[],
    complete: PersistedFrameworkEvent
  ): Promise<RuntimeRecoveryResult> {
    const recorded = payloadString(complete, 'disposition');
    const disposition: RuntimeRecoveryDisposition =
      recorded === 'requires_review'
        ? 'requires_review'
        : recorded === 'requeued'
          ? 'requeued'
          : 'reused';
    return validateRuntimeRecoveryResult({
      candidateId: command.candidate.candidateId,
      disposition,
      eventIds: events.map((event) => event.id),
      projection: await this.project(command.candidate),
    });
  }

  private project(
    candidateInput: RuntimeRecoveryCandidate
  ): Promise<RuntimeOrchestrationProjection> {
    return this.options.projections
      .update(
        createRuntimeOrchestrationProjectionDefinition(candidateInput.scope.runId),
        this.options.projectionStore,
        streamScope(candidateInput)
      )
      .then((record) => record.state);
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid(`${label} must be a valid date-time`);
    return value;
  }
}

function candidate(input: Omit<RuntimeRecoveryCandidate, 'candidateId'>): RuntimeRecoveryCandidate {
  const target =
    input.redispatchRequestEventId ??
    input.activityId ??
    (input.stateId === undefined || input.stateAttempt === undefined
      ? `run:${input.eventHeadSequence}`
      : `state:${input.stateId}:${input.stateAttempt}`);
  return validateRuntimeRecoveryCandidate({
    ...input,
    candidateId: `recovery:${input.scope.runId}:${input.reason}:${target}`,
  });
}

function candidateHash(input: RuntimeRecoveryCandidate): string {
  return hashCanonicalJson(
    withoutUndefined({
      candidateId: input.candidateId,
      scope: input.scope,
      reason: input.reason,
      safeAction: input.safeAction,
      activityId: input.activityId,
      redispatchRequestEventId: input.redispatchRequestEventId,
      stateId: input.stateId,
      stateAttempt: input.stateAttempt,
    })
  );
}

function operationId(command: RuntimeRecoveryCommand): string {
  return `runtime-recovery:${command.candidate.candidateId}`;
}

function streamScope(candidateInput: RuntimeRecoveryCandidate): EventStreamScope {
  return {
    ...(candidateInput.scope.tenantId === undefined
      ? {}
      : { tenantId: candidateInput.scope.tenantId }),
    userId: candidateInput.scope.userId,
    runId: candidateInput.scope.runId,
  };
}

function leaseScope(scope: RuntimeRecoveryCandidate['scope']) {
  return {
    ...(scope.tenantId === undefined ? {} : { tenantId: scope.tenantId }),
    userId: scope.userId,
    runId: scope.runId,
    partitionKey: `runtime:${scope.runId}`,
  };
}

function completedRecovery(events: PersistedFrameworkEvent[]): PersistedFrameworkEvent | undefined {
  return events.find(
    (event) => event.type === 'recovery.case.resolved' || event.type === 'recovery.case.escalated'
  );
}

function completedCandidateIds(events: PersistedFrameworkEvent[]): Set<string> {
  return new Set(
    events
      .filter(
        (event) =>
          event.type === 'recovery.case.resolved' || event.type === 'recovery.case.escalated'
      )
      .map((event) => payloadString(event, 'candidateId') ?? payloadString(event, 'caseId'))
      .filter((candidateId): candidateId is string => candidateId !== undefined)
  );
}

function compensationActivityIds(events: PersistedFrameworkEvent[]): string[] {
  const requested = new Map<string, RuntimeActivityInvocation>();
  const settled = new Set<string>();
  const failed = new Set<string>();
  for (const event of events) {
    if (event.type === 'runtime.activity.requested') {
      try {
        const invocation = validateRuntimeActivityInvocation(payloadRecord(event).invocation);
        requested.set(invocation.activityId, invocation);
      } catch {
        // Invalid invocation is handled by the existing recovery review path.
      }
      continue;
    }
    const activityId = activityIdFromEvent(event);
    if (!activityId) continue;
    if (event.type === 'runtime.activity.failed') failed.add(activityId);
    if (
      event.type === 'runtime.activity.compensation.completed' ||
      event.type === 'runtime.activity.compensation.failed'
    ) {
      settled.add(activityId);
    }
  }
  return [...failed]
    .filter((activityId) => {
      const invocation = requested.get(activityId);
      return (
        !settled.has(activityId) &&
        invocation?.effect === 'external_effect' &&
        invocation.metadata?.compensationAvailable === true
      );
    })
    .sort();
}

function incompleteRedispatchRequests(
  events: PersistedFrameworkEvent[]
): PersistedFrameworkEvent[] {
  const acceptedRequestIds = new Set(
    events
      .filter((event) => event.type === 'activity.redispatch.accepted')
      .map((event) => payloadString(event, 'requestEventId'))
      .filter((requestEventId): requestEventId is string => requestEventId !== undefined)
  );
  return events
    .filter(
      (event) => event.type === 'activity.redispatch.requested' && !acceptedRequestIds.has(event.id)
    )
    .sort((left, right) => left.sequence - right.sequence);
}

function result(
  command: RuntimeRecoveryCommand,
  disposition: RuntimeRecoveryDisposition
): RuntimeRecoveryResult {
  return validateRuntimeRecoveryResult({
    candidateId: command.candidate.candidateId,
    disposition,
    eventIds: [],
  });
}

function activityIdFromRequested(event: PersistedFrameworkEvent): string | undefined {
  const payload = payloadRecord(event);
  const invocation = recordValue(payload.invocation);
  const activityId = invocation?.activityId ?? payload.activityId;
  return typeof activityId === 'string' ? activityId : undefined;
}

function activityIdFromEvent(event: PersistedFrameworkEvent): string | undefined {
  const payload = payloadRecord(event);
  if (typeof payload.activityId === 'string') return payload.activityId;
  const observation = recordValue(payload.observation);
  return typeof observation?.activityId === 'string' ? observation.activityId : undefined;
}

function payloadRecord(event: PersistedFrameworkEvent): Record<string, unknown> {
  const value = recordValue(event.payload);
  if (!value) invalid('Recovery Event payload must be an object');
  return value;
}

function payloadString(event: PersistedFrameworkEvent, property: string): string | undefined {
  const value = payloadRecord(event)[property];
  return typeof value === 'string' ? value : undefined;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function requiredString(value: unknown, label: string): string {
  if (typeof value !== 'string' || value.length === 0)
    invalid(`${label} must be a non-empty string`);
  return value;
}

function requiredPositiveInteger(value: unknown, label: string): number {
  if (!Number.isInteger(value) || (value as number) <= 0) {
    invalid(`${label} must be a positive integer`);
  }
  return value as number;
}

function withoutUndefined(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined));
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
