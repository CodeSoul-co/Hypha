import type {
  RuntimeReplayDivergence,
  RuntimeReplayRequest,
  RuntimeReplayResult,
  RuntimeReplayServiceContract,
  RuntimeReplayVerificationRequest,
  RuntimeReplayVerificationResult,
} from '../../contracts/runtime-replay';
import {
  validateRuntimeReplayRequest,
  validateRuntimeReplayResult,
  validateRuntimeReplayVerificationRequest,
  validateRuntimeReplayVerificationResult,
} from '../../contracts/runtime-replay-schemas';
import type { PersistedFrameworkEvent } from '../../events';
import { FrameworkError, isFrameworkError } from '../../errors';
import { hashCanonicalJson } from './canonical-json';
import type { EventRuntime } from './event-runtime';
import type { EventStreamScope } from './event-store';
import {
  createRuntimeOrchestrationProjectionDefinition,
  RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
} from './orchestration-projection';
import type { RuntimeCheckpointService } from './runtime-checkpoint-service';

export interface RuntimeReplayServiceOptions {
  events: Pick<EventRuntime, 'read'>;
  checkpoints: Pick<RuntimeCheckpointService, 'load'>;
  now?: () => string;
}

export class RuntimeReplayService implements RuntimeReplayServiceContract {
  private readonly now: () => string;

  constructor(private readonly options: RuntimeReplayServiceOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async replay(input: RuntimeReplayRequest): Promise<RuntimeReplayResult> {
    const request = validateRuntimeReplayRequest(input);
    const checkpoint = await this.options.checkpoints.load({
      scope: request.scope,
      ...(request.checkpointId === undefined ? {} : { checkpointId: request.checkpointId }),
      checkedAt: request.requestedAt,
    });
    if (!checkpoint) divergence('Replay requires an Event-confirmed Checkpoint');
    assertAnchor(request, checkpoint.record);
    if (checkpoint.record.projectionVersion !== RUNTIME_ORCHESTRATION_PROJECTION_VERSION) {
      anchorDivergence(
        'projection_version',
        RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
        checkpoint.record.projectionVersion
      );
    }
    const targetSequence = request.toSequence ?? checkpoint.currentHeadSequence;
    if (
      targetSequence < checkpoint.record.lastEventSequence ||
      targetSequence > checkpoint.currentHeadSequence
    ) {
      invalid('Replay target sequence must be within the Checkpoint and current Event head');
    }
    const fromSequence = checkpoint.record.lastEventSequence + 1;
    const events =
      targetSequence < fromSequence
        ? []
        : await this.options.events.read({
            scope: streamScope(request),
            fromSequence,
            toSequence: targetSequence,
          });
    assertContiguous(events, fromSequence, targetSequence);

    const definition = createRuntimeOrchestrationProjectionDefinition(request.scope.runId);
    let snapshot = structuredClone(checkpoint.record.projectionSnapshot);
    let appliedEventCount = 0;
    try {
      for (const event of events) {
        if (!definition.applies(event)) continue;
        snapshot = definition.reduce(snapshot, structuredClone(event));
        appliedEventCount += 1;
      }
    } catch (error) {
      if (isFrameworkError(error) && error.code === 'RUNTIME_REPLAY_DIVERGENCE') throw error;
      throw new FrameworkError({
        code: 'RUNTIME_REPLAY_DIVERGENCE',
        message: 'Deterministic Replay failed while reducing historical Events',
        context: {
          runId: request.scope.runId,
          checkpointId: checkpoint.record.id,
          fromSequence,
          targetSequence,
        },
        cause: error,
      });
    }
    const completedAt = this.timestamp();
    return validateRuntimeReplayResult({
      sourceRunId: request.scope.runId,
      mode: 'deterministic',
      checkpointId: checkpoint.record.id,
      baseEventSequence: checkpoint.record.lastEventSequence,
      targetEventSequence: targetSequence,
      replayedEventCount: events.length,
      appliedEventCount,
      eventIds: events.map((event) => event.id),
      workflowRevision: checkpoint.record.workflowRevision,
      processHash: checkpoint.record.processHash,
      dependencySnapshotRef: checkpoint.record.dependencySnapshotRef,
      projectionVersion: checkpoint.record.projectionVersion,
      finalSnapshot: snapshot,
      finalSnapshotChecksum: hashCanonicalJson(snapshot),
      divergences: [],
      completedAt,
    });
  }

  async verify(input: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult> {
    const request = validateRuntimeReplayVerificationRequest(input);
    const replay = await this.replay(request.replay);
    const divergences: RuntimeReplayDivergence[] = [];
    if (replay.finalSnapshotChecksum !== request.expectedSnapshotChecksum) {
      divergences.push({
        kind: 'snapshot_checksum',
        expected: request.expectedSnapshotChecksum,
        actual: replay.finalSnapshotChecksum,
        message: 'Replayed Snapshot checksum differs from the expected Snapshot',
      });
    }
    return validateRuntimeReplayVerificationResult({
      replay,
      matches: divergences.length === 0,
      divergences,
    });
  }

  private timestamp(): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid('Replay clock must be a valid date-time');
    return value;
  }
}

function assertAnchor(
  request: RuntimeReplayRequest,
  record: {
    workflowRevision: string;
    processHash: string;
    dependencySnapshotRef: string;
  }
): void {
  if (record.workflowRevision !== request.expectedWorkflowRevision) {
    anchorDivergence(
      'workflow_revision',
      request.expectedWorkflowRevision,
      record.workflowRevision
    );
  }
  if (record.processHash !== request.expectedProcessHash) {
    anchorDivergence('process_hash', request.expectedProcessHash, record.processHash);
  }
  if (record.dependencySnapshotRef !== request.expectedDependencySnapshotRef) {
    anchorDivergence(
      'dependency_snapshot',
      request.expectedDependencySnapshotRef,
      record.dependencySnapshotRef
    );
  }
}

function assertContiguous(
  events: PersistedFrameworkEvent[],
  fromSequence: number,
  targetSequence: number
): void {
  const expectedCount = Math.max(0, targetSequence - fromSequence + 1);
  if (events.length !== expectedCount) {
    divergence('Replay Event range contains a sequence gap', {
      fromSequence,
      targetSequence,
      expectedCount,
      actualCount: events.length,
    });
  }
  for (let index = 0; index < events.length; index += 1) {
    const expectedSequence = fromSequence + index;
    if (events[index].sequence !== expectedSequence) {
      divergence('Replay Event sequence is not contiguous', {
        expectedSequence,
        actualSequence: events[index].sequence,
      });
    }
  }
}

function streamScope(request: RuntimeReplayRequest): EventStreamScope {
  return {
    ...(request.scope.tenantId === undefined ? {} : { tenantId: request.scope.tenantId }),
    userId: request.scope.userId,
    runId: request.scope.runId,
  };
}

function anchorDivergence(
  kind: Exclude<RuntimeReplayDivergence['kind'], 'snapshot_checksum'>,
  expected: string,
  actual: string
): never {
  divergence('Replay anchor does not match its Checkpoint', { kind, expected, actual });
}

function divergence(message: string, context: Record<string, unknown> = {}): never {
  throw new FrameworkError({ code: 'RUNTIME_REPLAY_DIVERGENCE', message, context });
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
