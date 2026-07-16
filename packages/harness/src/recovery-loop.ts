import {
  classifyFSMAnomaly,
  FSMRuntime,
  type FSMAnomaly,
  type FSMAnomalySource,
  type FSMRecoveryDecision,
} from '@hypha/fsm';

export interface FSMRecoveryAttemptContext {
  attempt: number;
  signal?: AbortSignal;
}

export interface FSMRecoveryLoopScheduler {
  wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}

export interface FSMRecoveryLoopOptions<TOutput> {
  fsm: FSMRuntime;
  source: FSMAnomalySource;
  execute(context: FSMRecoveryAttemptContext): Promise<TOutput>;
  classify?: (
    error: unknown,
    context: FSMRecoveryAttemptContext
  ) => FSMAnomaly | Promise<FSMAnomaly>;
  compensate?: (decision: FSMRecoveryDecision, context: FSMRecoveryAttemptContext) => Promise<void>;
  scheduler?: FSMRecoveryLoopScheduler;
  maxInlineDelayMs?: number;
  signal?: AbortSignal;
  now?: () => string;
}

export interface FSMRecoveryLoopResult<TOutput> {
  status: 'succeeded' | 'suspended' | 'compensated' | 'failed' | 'cancelled';
  output?: TOutput;
  error?: unknown;
  decision?: FSMRecoveryDecision;
  attempts: number;
}

/**
 * Runs only the bounded recovery loop described by the FSM recovery policy.
 * Delayed retries are suspended by default; a caller must inject a scheduler
 * and explicitly opt into an inline delay budget to keep them in-process.
 */
export async function runFSMRecoveryLoop<TOutput>(
  options: FSMRecoveryLoopOptions<TOutput>
): Promise<FSMRecoveryLoopResult<TOutput>> {
  const now = options.now ?? (() => new Date().toISOString());
  const maxInlineDelayMs = Math.max(0, options.maxInlineDelayMs ?? 0);
  let attempts = 0;
  let lastDecision: FSMRecoveryDecision | undefined;
  let shouldAttempt = true;

  while (shouldAttempt) {
    shouldAttempt = false;
    attempts += 1;
    const context: FSMRecoveryAttemptContext = { attempt: attempts, signal: options.signal };
    if (options.signal?.aborted) {
      const error = abortReason(options.signal);
      const anomaly = classifyFSMAnomaly(error, {
        id: anomalyId(options.fsm, attempts),
        source: options.source,
        occurredAt: now(),
        sideEffectState: 'none',
      });
      const decision = await options.fsm.decideRecovery(anomaly, { now: now() });
      await transitionForDecision(options.fsm, decision);
      return { status: 'cancelled', error, decision, attempts: attempts - 1 };
    }

    try {
      const output = await options.execute(context);
      if (lastDecision) {
        options.fsm.registerRecoverySuccess(lastDecision.circuitKey, now());
      }
      return { status: 'succeeded', output, decision: lastDecision, attempts };
    } catch (error) {
      const anomaly = options.classify
        ? await options.classify(error, context)
        : classifyFSMAnomaly(error, {
            id: anomalyId(options.fsm, attempts),
            source: options.source,
            occurredAt: now(),
            sideEffectState: 'none',
          });
      const decision = await options.fsm.decideRecovery(anomaly, { now: now() });
      lastDecision = decision;
      await transitionForDecision(options.fsm, decision);

      if (decision.action === 'retry') {
        if (decision.delayMs > 0) {
          if (!options.scheduler || decision.delayMs > maxInlineDelayMs) {
            return { status: 'suspended', error, decision, attempts };
          }
          await options.scheduler.wait(decision.delayMs, decision, options.signal);
        }
        await resumeRetry(options.fsm, decision);
        shouldAttempt = true;
        continue;
      }

      if (decision.action === 'compensate') {
        if (!options.compensate) {
          await transitionIfNeeded(options.fsm, decision.quarantineState, {
            phase: 'recovery_compensation_unavailable',
            anomalyId: decision.anomaly.id,
          });
          return { status: 'suspended', error, decision, attempts };
        }
        try {
          await options.compensate(decision, context);
          if (decision.afterCompensationState) {
            await transitionIfNeeded(options.fsm, decision.afterCompensationState, {
              phase: 'recovery_compensated',
              anomalyId: decision.anomaly.id,
              recoveryAction: decision.afterCompensationAction,
            });
          }
          return { status: 'compensated', error, decision, attempts };
        } catch (compensationError) {
          await transitionIfNeeded(options.fsm, decision.quarantineState, {
            phase: 'recovery_compensation_failed',
            anomalyId: decision.anomaly.id,
            error:
              compensationError instanceof Error
                ? compensationError.message
                : String(compensationError),
          });
          return { status: 'suspended', error: compensationError, decision, attempts };
        }
      }

      if (
        decision.action === 'wait' ||
        decision.action === 'human_review' ||
        decision.action === 'quarantine'
      ) {
        return { status: 'suspended', error, decision, attempts };
      }
      if (decision.action === 'cancel') {
        return { status: 'cancelled', error, decision, attempts };
      }
      return { status: 'failed', error, decision, attempts };
    }
  }

  throw new Error('FSM recovery loop ended without a terminal decision.');
}

async function transitionForDecision(
  fsm: FSMRuntime,
  decision: FSMRecoveryDecision
): Promise<void> {
  await transitionIfNeeded(fsm, decision.transitionState, {
    phase: 'recovery_decision',
    anomalyId: decision.anomaly.id,
    anomalySource: decision.anomaly.source,
    anomalyCategory: decision.anomaly.category,
    recoveryAction: decision.action,
    recoveryAttempt: decision.attempt,
    recoveryDelayMs: decision.delayMs,
    circuitKey: decision.circuitKey,
    circuitStatus: decision.circuitStatus,
  });
}

async function resumeRetry(fsm: FSMRuntime, decision: FSMRecoveryDecision): Promise<void> {
  if (!decision.resumeState) {
    throw new Error(`Retry decision ${decision.anomaly.id} has no resume state.`);
  }
  await transitionIfNeeded(fsm, decision.resumeState, {
    phase: 'recovery_retry_resumed',
    anomalyId: decision.anomaly.id,
    recoveryAttempt: decision.attempt,
  });
}

async function transitionIfNeeded(
  fsm: FSMRuntime,
  stateId: string,
  metadata: Record<string, unknown>
): Promise<void> {
  if (fsm.getSnapshot().currentState === stateId) return;
  await fsm.transition(stateId, { metadata });
}

function anomalyId(fsm: FSMRuntime, attempt: number): string {
  return `${fsm.getSnapshot().runId}:recovery:${fsm.getSnapshot().currentState}:${attempt}`;
}

function abortReason(signal: AbortSignal): unknown {
  if (signal.reason instanceof Error) return signal.reason;
  const error = new Error(signal.reason ? String(signal.reason) : 'Operation cancelled.');
  error.name = 'AbortError';
  return error;
}
