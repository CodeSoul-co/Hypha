import {
  FrameworkError,
  hashCanonicalJson,
  validateContinueReActCommandPayload,
  type ContinueReActCommandPayloadV1,
  type SessionCommandHandlerResult,
} from '@hypha/core';
import {
  LongHorizonReActSupervisor,
  createContinuationReActQuantumDescriptor,
  type ReActContinuationScheduler,
  type ReActQuantumExecutor,
} from '@hypha/harness';
import type {
  ReActContinuationCheckpoint,
  ReActContinuationCheckpointStore,
  ReActRunner,
} from '@hypha/kernel';
import type { ServerSessionCommandDefinition } from './ServerSessionCommandRuntime';

export interface ServerReActContinuationDefinitionOptions {
  executor: Pick<ReActQuantumExecutor, 'runOneQuantum'>;
  supervisor: Pick<LongHorizonReActSupervisor, 'coordinateResult'>;
  checkpoints: ReActContinuationCheckpointStore;
  checkpointReferenceFor?: (checkpoint: Readonly<ReActContinuationCheckpoint>) => string;
  now?: () => string;
  retryDelayMs?: number;
}

export interface ServerReActContinuationRuntimeOptions extends Omit<
  ServerReActContinuationDefinitionOptions,
  'supervisor'
> {
  runner: Pick<ReActRunner, 'run'>;
  scheduler: ReActContinuationScheduler;
}

export interface ServerReActContinuationRuntime {
  supervisor: LongHorizonReActSupervisor;
  definition: ServerSessionCommandDefinition<ContinueReActCommandPayloadV1, 'continue_react'>;
}

export function createServerReActContinuationRuntime(
  options: ServerReActContinuationRuntimeOptions
): ServerReActContinuationRuntime {
  const supervisor = new LongHorizonReActSupervisor({
    runner: options.runner,
    scheduler: options.scheduler,
    ...(options.now === undefined ? {} : { now: options.now }),
  });
  return Object.freeze({
    supervisor,
    definition: createServerReActContinuationDefinition({
      executor: options.executor,
      supervisor,
      checkpoints: options.checkpoints,
      ...(options.checkpointReferenceFor === undefined
        ? {}
        : { checkpointReferenceFor: options.checkpointReferenceFor }),
      ...(options.now === undefined ? {} : { now: options.now }),
      ...(options.retryDelayMs === undefined ? {} : { retryDelayMs: options.retryDelayMs }),
    }),
  });
}

/**
 * Converts a claimed durable command into one fenced quantum and one explicit
 * continuation decision. The handler itself never loops.
 */
export function createServerReActContinuationDefinition(
  options: ServerReActContinuationDefinitionOptions
): ServerSessionCommandDefinition<ContinueReActCommandPayloadV1, 'continue_react'> {
  const now = options.now ?? (() => new Date().toISOString());
  if (options.retryDelayMs !== undefined) {
    nonNegativeInteger(options.retryDelayMs, 'retryDelayMs');
  }
  const checkpointReferenceFor = options.checkpointReferenceFor ?? defaultCheckpointReference;

  return {
    decode: validateContinueReActCommandPayload,
    async handle(input): Promise<SessionCommandHandlerResult> {
      const descriptor = createContinuationReActQuantumDescriptor(input.command, input.payload);
      const result = await options.executor.runOneQuantum({
        command: input.command,
        descriptor,
        signal: input.signal,
      });
      if (result.disposition === 'terminal') {
        await options.checkpoints.delete(
          input.payload.runId,
          input.payload.stepId,
          input.payload.scopeHash
        );
        return applied(input.payload.runId);
      }
      if (!result.react) corrupt('ReAct quantum result does not contain execution evidence');

      if (input.signal.aborted) {
        throw new FrameworkError({
          code: 'RUNTIME_CANCELLED',
          message: 'Continuation command lost its execution lease before scheduling',
        });
      }

      const coordinated = await options.supervisor.coordinateResult({
        react: result.react,
        continuation: {
          ...(input.command.tenantId === undefined ? {} : { tenantId: input.command.tenantId }),
          ...(input.command.workspaceId === undefined
            ? {}
            : { workspaceId: input.command.workspaceId }),
          priority: input.command.priority,
          maxAttempts: input.command.maxAttempts,
          buildPayload: (checkpoint) =>
            advanceContinuationPayload(
              input.payload,
              checkpoint,
              checkpointReferenceFor(checkpoint),
              timestamp(now())
            ),
        },
      });

      switch (coordinated.disposition) {
        case 'completed':
        case 'cancelled':
          await options.checkpoints.delete(
            input.payload.runId,
            input.payload.stepId,
            input.payload.scopeHash
          );
          return applied(input.payload.runId);
        case 'continuation_scheduled':
        case 'continuation_required':
        case 'waiting_human':
          return applied(input.payload.runId);
        case 'failed':
          // The Outcome recorder has already persisted a terminal run.failed
          // fact. Retrying the same checkpoint would only replay a terminal
          // Run and can never repair the cause.
          return applied(input.payload.runId);
      }
    },
  };
}

export function advanceContinuationPayload(
  previous: Readonly<ContinueReActCommandPayloadV1>,
  checkpoint: Readonly<ReActContinuationCheckpoint>,
  checkpointRef: string,
  createdAt: string
): ContinueReActCommandPayloadV1 {
  if (
    checkpoint.runId !== previous.runId ||
    checkpoint.stepId !== previous.stepId ||
    checkpoint.scopeHash !== previous.scopeHash ||
    checkpoint.stepSequence <= previous.checkpointSequence
  ) {
    conflict('Next ReAct checkpoint does not advance the continuation identity');
  }
  return validateContinueReActCommandPayload({
    ...previous,
    checkpointRef,
    checkpointHash: hashCanonicalJson(checkpoint),
    checkpointSequence: checkpoint.stepSequence,
    createdAt: timestamp(createdAt),
  });
}

function applied(runId: string): SessionCommandHandlerResult {
  return { disposition: 'applied', resultRunId: runId };
}

function defaultCheckpointReference(checkpoint: Readonly<ReActContinuationCheckpoint>): string {
  return `react-checkpoint:${checkpoint.runId}:${checkpoint.stepId}:${checkpoint.stepSequence}`;
}

function timestamp(value: string): string {
  if (!Number.isFinite(Date.parse(value))) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: 'Runtime clock must return an ISO date-time',
    });
  }
  return value;
}

function nonNegativeInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new FrameworkError({
      code: 'RUNTIME_INVALID_INPUT',
      message: `${label} must be a non-negative integer`,
    });
  }
  return value;
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RUN_CONFLICT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
