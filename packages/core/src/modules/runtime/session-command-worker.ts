import type {
  SessionCommandClaim,
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
  context: Readonly<SessionCommandHandlerContext>
) => Promise<SessionCommandHandlerResult>;

export interface SessionCommandHandlerContext {
  command: Readonly<SessionCommandRecord>;
  signal: AbortSignal;
  claimToken: string;
  leaseEpoch: number;
}

export interface DurableSessionCommandWorkerOptions {
  queue: SessionQueue;
  workerId: string;
  leaseMs: number;
  handlers: Partial<Record<SessionCommandType, SessionCommandHandler>>;
  now?: () => string;
  renewalIntervalMs?: number;
  maxHandlerDurationMs?: number;
  wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
  onLeaseRenewalFailure?: (error: unknown, claim: Readonly<SessionCommandClaim>) => void;
}

export type SessionCommandWorkerDisposition =
  | 'idle'
  | 'applied'
  | 'retry_scheduled'
  | 'failed'
  | 'dead_lettered'
  | 'lease_lost'
  | 'aborted';

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
  private readonly renewalIntervalMs: number;
  private readonly maxHandlerDurationMs: number;
  private readonly wait: (delayMs: number, signal: AbortSignal) => Promise<void>;

  constructor(private readonly options: DurableSessionCommandWorkerOptions) {
    nonEmpty(options.workerId, 'workerId');
    if (!Number.isInteger(options.leaseMs) || options.leaseMs < 1) {
      invalid('leaseMs must be a positive integer');
    }
    this.now = options.now ?? (() => new Date().toISOString());
    this.handlers = { ...options.handlers };
    this.renewalIntervalMs = positiveInteger(
      options.renewalIntervalMs ?? Math.max(1, Math.floor(options.leaseMs / 3)),
      'renewalIntervalMs'
    );
    if (this.renewalIntervalMs >= options.leaseMs) {
      invalid('renewalIntervalMs must be shorter than leaseMs');
    }
    this.maxHandlerDurationMs = positiveInteger(
      options.maxHandlerDurationMs ?? Math.max(options.leaseMs, 300_000),
      'maxHandlerDurationMs'
    );
    this.wait = options.wait ?? abortableDelay;
  }

  async processNext(
    scope?: SessionQueueScope,
    signal?: AbortSignal
  ): Promise<SessionCommandWorkerResult> {
    if (signal?.aborted) return { disposition: 'aborted' };
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

    const claim = claimFromCommand(command);
    const handlerController = new AbortController();
    const heartbeatController = new AbortController();
    const forwardAbort = () => handlerController.abort('session_command_worker_aborted');
    signal?.addEventListener('abort', forwardAbort, { once: true });
    if (signal?.aborted) forwardAbort();
    let leaseLost = false;
    const heartbeat = this.maintainLease(
      claim,
      heartbeatController.signal,
      handlerController,
      () => {
        leaseLost = true;
      }
    );
    const timeout = setTimeout(
      () => handlerController.abort('session_command_handler_timeout'),
      this.maxHandlerDurationMs
    );
    const handlerPromise = Promise.resolve().then(() =>
      handler(
        Object.freeze({
          command: Object.freeze(structuredClone(command)),
          signal: handlerController.signal,
          claimToken: claim.claimToken,
          leaseEpoch: claim.leaseEpoch,
        })
      )
    );
    handlerPromise.catch(() => undefined);

    try {
      const outcome = await Promise.race([
        handlerPromise,
        rejectWhenAborted(handlerController.signal),
      ]);
      validateHandlerResult(outcome);
      heartbeatController.abort();
      await heartbeat;
      if (leaseLost) return result(command, 'lease_lost', 'session_command_claim_lost');
      if (handlerController.signal.aborted) {
        return result(command, 'aborted', abortCode(handlerController.signal));
      }
      if (!(await this.verifyClaim(claim, handlerController))) {
        return result(command, 'lease_lost', 'session_command_claim_lost');
      }
      return this.applyOutcome(command, claim, outcome);
    } catch {
      heartbeatController.abort();
      await heartbeat;
      if (leaseLost) return result(command, 'lease_lost', 'session_command_claim_lost');
      if (handlerController.signal.aborted) {
        return result(command, 'aborted', abortCode(handlerController.signal));
      }
      if (!(await this.verifyClaim(claim, handlerController))) {
        return result(command, 'lease_lost', 'session_command_claim_lost');
      }
      return this.deadLetter(command, 'session_command_handler_unexpected_error');
    } finally {
      clearTimeout(timeout);
      heartbeatController.abort();
      signal?.removeEventListener('abort', forwardAbort);
    }
  }

  private async applyOutcome(
    command: SessionCommandRecord,
    claim: SessionCommandClaim,
    outcome: SessionCommandHandlerResult
  ): Promise<SessionCommandWorkerResult> {
    const completedAt = this.timestamp('handler completion');
    switch (outcome.disposition) {
      case 'applied':
        await this.options.queue.complete({
          commandId: command.id,
          workerId: this.options.workerId,
          claimToken: claim.claimToken,
          leaseEpoch: claim.leaseEpoch,
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
          claimToken: claim.claimToken,
          leaseEpoch: claim.leaseEpoch,
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
          claimToken: claim.claimToken,
          leaseEpoch: claim.leaseEpoch,
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
      claimToken: command.claimToken!,
      leaseEpoch: command.leaseEpoch,
      failedAt: this.timestamp('handler failure'),
      rejectionCode,
      deadLetter: true,
    });
    return result(command, 'dead_lettered', rejectionCode);
  }

  private async maintainLease(
    claim: SessionCommandClaim,
    signal: AbortSignal,
    handlerController: AbortController,
    onLeaseLost: () => void
  ): Promise<void> {
    while (!signal.aborted) {
      await this.wait(this.renewalIntervalMs, signal);
      if (signal.aborted) return;
      try {
        const renewed = await this.options.queue.renew({
          commandId: claim.commandId,
          workerId: claim.workerId,
          claimToken: claim.claimToken,
          leaseEpoch: claim.leaseEpoch,
          renewedAt: this.timestamp('lease renewal'),
          leaseMs: this.options.leaseMs,
        });
        claim.leaseExpiresAt = renewed.leaseExpiresAt;
      } catch (error) {
        onLeaseLost();
        notify(() => this.options.onLeaseRenewalFailure?.(error, Object.freeze({ ...claim })));
        handlerController.abort('session_command_claim_lost');
        return;
      }
    }
  }

  private async verifyClaim(
    claim: SessionCommandClaim,
    handlerController: AbortController
  ): Promise<boolean> {
    try {
      const renewed = await this.options.queue.renew({
        commandId: claim.commandId,
        workerId: claim.workerId,
        claimToken: claim.claimToken,
        leaseEpoch: claim.leaseEpoch,
        renewedAt: this.timestamp('post-handler fencing'),
        leaseMs: this.options.leaseMs,
      });
      claim.leaseExpiresAt = renewed.leaseExpiresAt;
      return true;
    } catch (error) {
      notify(() => this.options.onLeaseRenewalFailure?.(error, Object.freeze({ ...claim })));
      handlerController.abort('session_command_claim_lost');
      return false;
    }
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

function claimFromCommand(command: SessionCommandRecord): SessionCommandClaim {
  if (
    command.status !== 'claimed' ||
    command.claimedBy === undefined ||
    command.claimToken === undefined ||
    command.leaseExpiresAt === undefined
  ) {
    return invalid('claimed command is missing its claim identity');
  }
  return {
    commandId: command.id,
    workerId: command.claimedBy,
    claimToken: command.claimToken,
    leaseEpoch: command.leaseEpoch,
    leaseExpiresAt: command.leaseExpiresAt,
  };
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function rejectWhenAborted(signal: AbortSignal): Promise<never> {
  return new Promise((_, reject) => {
    const abort = () => reject(new Error(abortCode(signal)));
    signal.addEventListener('abort', abort, { once: true });
    if (signal.aborted) abort();
  });
}

function abortCode(signal: AbortSignal): string {
  return signal.reason === 'session_command_handler_timeout'
    ? 'session_command_handler_timeout'
    : 'session_command_worker_aborted';
}

function notify(callback: () => void): void {
  try {
    callback();
  } catch {
    // Telemetry cannot take ownership of a durable command.
  }
}

function abortableDelay(delayMs: number, signal: AbortSignal): Promise<void> {
  if (signal.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const finish = () => {
      clearTimeout(timer);
      signal.removeEventListener('abort', finish);
      resolve();
    };
    const timer = setTimeout(finish, delayMs);
    signal.addEventListener('abort', finish, { once: true });
    if (signal.aborted) finish();
  });
}

function nonEmpty(value: string, label: string): void {
  if (typeof value !== 'string' || value.length === 0) invalid(`${label} must be non-empty`);
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
