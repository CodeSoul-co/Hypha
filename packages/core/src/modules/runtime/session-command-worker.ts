import type {
  SessionCommandRecord,
  SessionCommandType,
  SessionQueueScope,
} from '../../contracts/session-queue';
import { FrameworkError } from '../../errors';
import type { SessionQueue } from './session-queue';

export type SessionCommandHandlerResult =
  | {
      disposition: 'applied';
      resultRunId?: string;
      resultEventIds?: string[];
    }
  | {
      disposition: 'retry';
      availableAt?: string;
    }
  | {
      disposition: 'failed';
      rejectionCode: string;
      deadLetter?: boolean;
    };

export type SessionCommandHandler = (
  command: Readonly<SessionCommandRecord>
) => Promise<SessionCommandHandlerResult>;

export interface DurableSessionCommandWorkerOptions {
  queue: SessionQueue;
  workerId: string;
  leaseMs: number;
  handlers: Partial<Record<SessionCommandType, SessionCommandHandler>>;
  now?: () => string;
}

export type SessionCommandWorkerDisposition =
  | 'idle'
  | 'applied'
  | 'retry_scheduled'
  | 'failed'
  | 'dead_lettered';

export interface SessionCommandWorkerResult {
  disposition: SessionCommandWorkerDisposition;
  commandId?: string;
  commandType?: SessionCommandType;
  attempts?: number;
  rejectionCode?: string;
}

/**
 * Claims and resolves one durable Session command without owning a polling loop.
 * Command handlers must explicitly classify expected retry and failure outcomes.
 */
export class DurableSessionCommandWorker {
  private readonly now: () => string;
  private readonly handlers: Partial<Record<SessionCommandType, SessionCommandHandler>>;

  constructor(private readonly options: DurableSessionCommandWorkerOptions) {
    nonEmpty(options.workerId, 'workerId');
    if (!Number.isInteger(options.leaseMs) || options.leaseMs < 1) {
      invalid('leaseMs must be a positive integer');
    }
    this.now = options.now ?? (() => new Date().toISOString());
    this.handlers = { ...options.handlers };
  }

  async processNext(scope?: SessionQueueScope): Promise<SessionCommandWorkerResult> {
    const command = await this.options.queue.claim({
      workerId: this.options.workerId,
      now: this.timestamp('claim'),
      leaseMs: this.options.leaseMs,
      ...(scope === undefined ? {} : { scope }),
    });
    if (!command) return { disposition: 'idle' };

    const handler = this.handlers[command.commandType];
    if (!handler) {
      return this.deadLetter(command, 'session_command_handler_unavailable');
    }

    let outcome: SessionCommandHandlerResult;
    try {
      outcome = await handler(Object.freeze(structuredClone(command)));
      validateHandlerResult(outcome);
    } catch {
      return this.deadLetter(command, 'session_command_handler_unexpected_error');
    }
    return this.applyOutcome(command, outcome);
  }

  private async applyOutcome(
    command: SessionCommandRecord,
    outcome: SessionCommandHandlerResult
  ): Promise<SessionCommandWorkerResult> {
    const completedAt = this.timestamp('handler completion');
    switch (outcome.disposition) {
      case 'applied':
        await this.options.queue.complete({
          commandId: command.id,
          workerId: this.options.workerId,
          completedAt,
          ...(outcome.resultRunId === undefined ? {} : { resultRunId: outcome.resultRunId }),
          ...(outcome.resultEventIds === undefined
            ? {}
            : { resultEventIds: outcome.resultEventIds }),
        });
        return result(command, 'applied');
      case 'retry': {
        await this.options.queue.release({
          commandId: command.id,
          workerId: this.options.workerId,
          releasedAt: completedAt,
          ...(outcome.availableAt === undefined ? {} : { availableAt: outcome.availableAt }),
        });
        return command.attempts >= command.maxAttempts
          ? result(command, 'dead_lettered', 'attempt_budget_exhausted')
          : result(command, 'retry_scheduled');
      }
      case 'failed':
        await this.options.queue.fail({
          commandId: command.id,
          workerId: this.options.workerId,
          failedAt: completedAt,
          rejectionCode: outcome.rejectionCode,
          ...(outcome.deadLetter === undefined ? {} : { deadLetter: outcome.deadLetter }),
        });
        return result(
          command,
          outcome.deadLetter ? 'dead_lettered' : 'failed',
          outcome.rejectionCode
        );
      default:
        return invalid('handler result disposition is invalid');
    }
  }

  private async deadLetter(
    command: SessionCommandRecord,
    rejectionCode: string
  ): Promise<SessionCommandWorkerResult> {
    await this.options.queue.fail({
      commandId: command.id,
      workerId: this.options.workerId,
      failedAt: this.timestamp('handler failure'),
      rejectionCode,
      deadLetter: true,
    });
    return result(command, 'dead_lettered', rejectionCode);
  }

  private timestamp(label: string): string {
    const value = this.now();
    if (!Number.isFinite(Date.parse(value))) invalid(`${label} timestamp must be valid`);
    return value;
  }
}

function validateHandlerResult(outcome: SessionCommandHandlerResult): void {
  if (!outcome || typeof outcome !== 'object') invalid('handler result must be an object');
  switch (outcome.disposition) {
    case 'applied':
      if (outcome.resultRunId !== undefined) nonEmpty(outcome.resultRunId, 'resultRunId');
      if (
        outcome.resultEventIds !== undefined &&
        (!Array.isArray(outcome.resultEventIds) ||
          outcome.resultEventIds.some((eventId) => typeof eventId !== 'string' || !eventId))
      ) {
        invalid('resultEventIds must contain only non-empty strings');
      }
      return;
    case 'retry':
      if (outcome.availableAt !== undefined && !Number.isFinite(Date.parse(outcome.availableAt))) {
        invalid('availableAt must be a valid timestamp');
      }
      return;
    case 'failed':
      nonEmpty(outcome.rejectionCode, 'handler rejectionCode');
      if (outcome.deadLetter !== undefined && typeof outcome.deadLetter !== 'boolean') {
        invalid('deadLetter must be a boolean');
      }
      return;
    default:
      invalid('handler result disposition is invalid');
  }
}

function result(
  command: SessionCommandRecord,
  disposition: Exclude<SessionCommandWorkerDisposition, 'idle'>,
  rejectionCode?: string
): SessionCommandWorkerResult {
  return {
    disposition,
    commandId: command.id,
    commandType: command.commandType,
    attempts: command.attempts,
    ...(rejectionCode === undefined ? {} : { rejectionCode }),
  };
}

function nonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
