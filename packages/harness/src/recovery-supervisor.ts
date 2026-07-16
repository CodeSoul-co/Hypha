import {
  createFrameworkEvent,
  defaultRecoveryConvergencePolicy,
  recoveryEvidenceHash,
  recoveryFailureFingerprint,
  recoveryKnowledgeKeyMatches,
  type FrameworkEventType,
  type RecoveryAttemptRecord,
  type RecoveryCaseSnapshot,
  type RecoveryConvergencePolicy,
  type RecoveryEvidence,
  type RecoveryFailure,
  type RecoveryKnowledge,
  type RecoveryKnowledgeKey,
  type RecoveryKnowledgePort,
  type RecoveryModule,
  type RecoveryStrategy,
  type TraceRecorder,
} from '@hypha/core';
import { FSMRuntime, type FSMAnomaly, type FSMRecoveryDecision } from '@hypha/fsm';

export interface RecoveryParticipantResult<TOutput = unknown> {
  output: TOutput;
  evidence: RecoveryEvidence;
  metadata?: Record<string, unknown>;
}

export interface RecoveryParticipantContext {
  caseId: string;
  runId: string;
  participantId: string;
  module: RecoveryModule;
  cycle: number;
  outputs: Readonly<Record<string, unknown>>;
  snapshot?: Readonly<RecoveryCaseSnapshot>;
  failure?: RecoveryFailure;
  signal?: AbortSignal;
}

export type RecoveryParticipantAction<TOutput = unknown> = (
  context: RecoveryParticipantContext
) => Promise<RecoveryParticipantResult<TOutput>>;

export interface RecoveryParticipant<TOutput = unknown> {
  id: string;
  module: RecoveryModule;
  dependsOn?: string[];
  execute: RecoveryParticipantAction<TOutput>;
  classify(
    error: unknown,
    context: RecoveryParticipantContext
  ): RecoveryFailure | Promise<RecoveryFailure>;
  reconcile?: RecoveryParticipantAction<TOutput>;
  fallback?: RecoveryParticipantAction<TOutput>;
  degrade?: RecoveryParticipantAction<TOutput>;
  compensate?: RecoveryParticipantAction<TOutput>;
}

export interface RecoverySupervisorScheduler {
  wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise<void>;
}

export interface RecoverySupervisorOptions {
  fsm: FSMRuntime;
  caseId: string;
  participants: RecoveryParticipant[];
  policy?: Partial<RecoveryConvergencePolicy>;
  knowledge?: RecoveryKnowledgePort;
  trace?: TraceRecorder;
  sessionId?: string;
  workspaceId?: string;
  stepId?: string;
  agentId?: string;
  scheduler?: RecoverySupervisorScheduler;
  maxInlineDelayMs?: number;
  signal?: AbortSignal;
  now?: () => string;
  metadata?: Record<string, unknown>;
}

export interface RecoverySupervisorResult {
  status:
    | 'succeeded'
    | 'degraded'
    | 'compensated'
    | 'suspended'
    | 'quarantined'
    | 'failed'
    | 'cancelled';
  outputs: Record<string, unknown>;
  snapshot?: RecoveryCaseSnapshot;
  failure?: RecoveryFailure;
  error?: unknown;
}

/**
 * Runs a dependency-ordered, FSM-governed recovery workflow. A participant is
 * retried only while its evidence changes or the bounded strategy budget has
 * not been exhausted. Completed upstream participants are not repeated.
 */
export async function runRecoverySupervisor(
  options: RecoverySupervisorOptions
): Promise<RecoverySupervisorResult> {
  assertParticipants(options.participants);
  const policy: RecoveryConvergencePolicy = {
    ...defaultRecoveryConvergencePolicy,
    ...options.policy,
  };
  const now = options.now ?? (() => new Date().toISOString());
  const runId = options.fsm.getSnapshot().runId;
  const outputs: Record<string, unknown> = {};
  const completed = new Set<string>();
  const recorder = new RecoveryEventRecorder(options, runId, now);
  let snapshot: RecoveryCaseSnapshot | undefined;
  let degraded = false;

  for (const participant of options.participants) {
    assertDependencies(participant, completed);
    let action: RecoveryStrategy = 'retry';
    let lastFailure: RecoveryFailure | undefined;

    while (!completed.has(participant.id)) {
      if (options.signal?.aborted) {
        const failure = cancellationFailure(participant, options, now());
        snapshot = openOrUpdateCase(snapshot, options, failure, outputs, now());
        snapshot.status = 'cancelled';
        snapshot.updatedAt = now();
        await recorder.record('recovery.case.escalated', snapshot, {
          strategy: 'cancel',
          failure,
        });
        await transitionIfNeeded(options.fsm, 'Cancelled', failure, 'cancel');
        return { status: 'cancelled', outputs, snapshot, failure, error: options.signal.reason };
      }

      const context = participantContext(
        options,
        participant,
        snapshot,
        outputs,
        snapshot?.cycles ?? 0,
        lastFailure
      );
      try {
        const result = await participant.execute(context);
        outputs[participant.id] = result.output;
        completed.add(participant.id);
        if (snapshot && lastFailure) {
          snapshot.lastEvidenceHash = recoveryEvidenceHash(result.evidence);
          snapshot.updatedAt = now();
          options.fsm.registerRecoverySuccess(lastFailure.circuitKey ?? lastFailure.module, now());
          await resumeFSM(options.fsm, snapshot.fsmState, lastFailure, 'retry_succeeded');
          await recorder.record('recovery.progress.detected', snapshot, {
            participantId: participant.id,
            evidence: result.evidence,
            evidenceHash: snapshot.lastEvidenceHash,
          });
        }
        break;
      } catch (error) {
        const failure = await participant.classify(error, context);
        validateFailure(participant, failure);
        lastFailure = failure;
        snapshot = openOrUpdateCase(snapshot, options, failure, outputs, now());
        const fingerprint = recoveryFailureFingerprint(failure);
        const evidenceHash = recoveryEvidenceHash(failure.evidence);
        const previousFailure = snapshot.lastFailure;
        const noProgress =
          previousFailure !== undefined &&
          recoveryFailureFingerprint(previousFailure) === fingerprint &&
          snapshot.lastEvidenceHash === evidenceHash;
        snapshot.cycles += 1;
        snapshot.noProgressCycles = noProgress ? snapshot.noProgressCycles + 1 : 0;
        snapshot.updatedAt = now();
        snapshot.lastFailure = failure;
        snapshot.lastEvidenceHash = evidenceHash;
        if (snapshot.cycles === 1) {
          await recorder.record('recovery.case.opened', snapshot, { failure, fingerprint });
        }

        const fsmDecision = await options.fsm.decideRecovery(toFSMAnomaly(failure, participant), {
          stateId: snapshot.fsmState,
          now: now(),
        });
        action = await selectStrategy(
          participant,
          failure,
          snapshot,
          fsmDecision,
          policy,
          options.knowledge,
          now()
        );
        await recorder.record('recovery.strategy.selected', snapshot, {
          participantId: participant.id,
          strategy: action,
          noProgress,
          noProgressCycles: snapshot.noProgressCycles,
          fsmDecision,
        });

        if (isExhausted(snapshot, policy, now())) {
          action = escalationStrategy(policy.onExhausted);
        }
        if (isTerminalStrategy(action)) {
          return await finishTerminal(
            action,
            participant,
            failure,
            error,
            snapshot,
            outputs,
            options,
            recorder,
            now()
          );
        }

        if (action === 'wait') {
          await transitionIfNeeded(options.fsm, fsmDecision.transitionState, failure, action);
          if (
            !options.scheduler ||
            fsmDecision.delayMs > Math.max(0, options.maxInlineDelayMs ?? 0)
          ) {
            snapshot.status = 'suspended';
            return { status: 'suspended', outputs, snapshot, failure, error };
          }
          await options.scheduler.wait(fsmDecision.delayMs, fsmDecision, options.signal);
          await resumeFSM(options.fsm, snapshot.fsmState, failure, 'wait_completed');
          continue;
        }

        if (action === 'retry') {
          await transitionIfNeeded(options.fsm, fsmDecision.transitionState, failure, action);
          if (fsmDecision.delayMs > 0) {
            if (
              !options.scheduler ||
              fsmDecision.delayMs > Math.max(0, options.maxInlineDelayMs ?? 0)
            ) {
              snapshot.status = 'suspended';
              return { status: 'suspended', outputs, snapshot, failure, error };
            }
            await options.scheduler.wait(fsmDecision.delayMs, fsmDecision, options.signal);
          }
          await resumeFSM(options.fsm, snapshot.fsmState, failure, 'retry');
          continue;
        }

        const handler = participantAction(participant, action);
        if (!handler) {
          return await finishTerminal(
            'human_review',
            participant,
            failure,
            error,
            snapshot,
            outputs,
            options,
            recorder,
            now()
          );
        }

        await transitionIfNeeded(
          options.fsm,
          action === 'compensate' ? 'Compensating' : 'Recovering',
          failure,
          action
        );
        const record = startedAttempt(snapshot, participant, action, failure, now());
        snapshot.attempts.push(record);
        await recorder.record('recovery.attempt.started', snapshot, { attempt: record });
        try {
          const recovered = await handler(
            participantContext(options, participant, snapshot, outputs, snapshot.cycles, failure)
          );
          completeAttempt(record, recovered.evidence, now());
          outputs[participant.id] = recovered.output;
          completed.add(participant.id);
          snapshot.lastEvidenceHash = record.evidenceAfterHash ?? snapshot.lastEvidenceHash;
          snapshot.updatedAt = now();
          await recorder.record('recovery.attempt.completed', snapshot, { attempt: record });
          await rememberOutcome(
            options.knowledge,
            participant,
            failure,
            action,
            action === 'degrade'
              ? 'degraded'
              : action === 'compensate'
                ? 'compensated'
                : 'recovered',
            snapshot.lastEvidenceHash,
            now()
          );

          if (action === 'compensate') {
            snapshot.status = 'compensated';
            await recorder.record('recovery.case.resolved', snapshot, { strategy: action });
            return { status: 'compensated', outputs, snapshot, failure, error };
          }
          if (action === 'degrade' || action === 'fallback') {
            degraded = true;
            if (!snapshot.degradedParticipants.includes(participant.id)) {
              snapshot.degradedParticipants.push(participant.id);
            }
          }
          options.fsm.registerRecoverySuccess(failure.circuitKey ?? failure.module, now());
          await resumeFSM(options.fsm, snapshot.fsmState, failure, `${action}_succeeded`);
        } catch (actionError) {
          record.status = 'failed';
          record.completedAt = now();
          record.errorCode = errorCode(actionError);
          await recorder.record('recovery.attempt.completed', snapshot, { attempt: record });
          await rememberOutcome(
            options.knowledge,
            participant,
            failure,
            action,
            'failed',
            snapshot.lastEvidenceHash,
            now()
          );
          await resumeFSM(options.fsm, snapshot.fsmState, failure, `${action}_failed`);
          lastFailure = await participant.classify(
            actionError,
            participantContext(options, participant, snapshot, outputs, snapshot.cycles, failure)
          );
        }
      }
    }
  }

  if (snapshot) {
    snapshot.status = degraded ? 'degraded' : 'recovered';
    snapshot.outputs = { ...outputs };
    snapshot.updatedAt = now();
    await recorder.record('recovery.case.resolved', snapshot, {
      status: snapshot.status,
      degradedParticipants: snapshot.degradedParticipants,
    });
  }
  return { status: degraded ? 'degraded' : 'succeeded', outputs, snapshot };
}

function openOrUpdateCase(
  snapshot: RecoveryCaseSnapshot | undefined,
  options: RecoverySupervisorOptions,
  failure: RecoveryFailure,
  outputs: Record<string, unknown>,
  now: string
): RecoveryCaseSnapshot {
  if (snapshot) {
    snapshot.outputs = { ...outputs };
    return snapshot;
  }
  return {
    id: options.caseId,
    runId: options.fsm.getSnapshot().runId,
    fsmState: options.fsm.getSnapshot().currentState,
    rootFingerprint: recoveryFailureFingerprint(failure),
    status: 'active',
    openedAt: now,
    updatedAt: now,
    cycles: 0,
    noProgressCycles: 0,
    lastEvidenceHash: recoveryEvidenceHash(failure.evidence),
    attempts: [],
    outputs: { ...outputs },
    degradedParticipants: [],
    metadata: options.metadata,
  };
}

async function selectStrategy(
  participant: RecoveryParticipant,
  failure: RecoveryFailure,
  snapshot: RecoveryCaseSnapshot,
  decision: FSMRecoveryDecision,
  policy: RecoveryConvergencePolicy,
  knowledge: RecoveryKnowledgePort | undefined,
  now: string
): Promise<RecoveryStrategy> {
  const repeatedStrategy = snapshot.attempts.filter(
    (attempt) =>
      attempt.participantId === participant.id &&
      attempt.strategy === decision.action &&
      attempt.fingerprint === recoveryFailureFingerprint(failure)
  ).length;
  if (
    snapshot.noProgressCycles >= policy.maxNoProgressCycles ||
    repeatedStrategy >= policy.maxSameStrategyAttempts
  ) {
    if (participant.fallback) return 'fallback';
    if (participant.degrade) return 'degrade';
    return availableEscalation(policy.onNoProgress, participant);
  }

  const key = knowledgeKey(participant, failure);
  const hint = await knowledge?.get(key);
  if (hint) {
    const validTime = !hint.expiresAt || Date.parse(hint.expiresAt) > Date.parse(now);
    if (!recoveryKnowledgeKeyMatches(key, hint.key) || !validTime) {
      await knowledge?.invalidate(key, !validTime ? 'expired' : 'revision_mismatch');
    } else if (
      hint.validation.status === 'verified' &&
      participantAction(participant, hint.strategy)
    ) {
      return hint.strategy;
    }
  }
  return decision.action;
}

function participantAction(
  participant: RecoveryParticipant,
  strategy: RecoveryStrategy
): RecoveryParticipantAction | undefined {
  switch (strategy) {
    case 'reconcile':
      return participant.reconcile;
    case 'fallback':
      return participant.fallback;
    case 'degrade':
      return participant.degrade;
    case 'compensate':
      return participant.compensate;
    default:
      return undefined;
  }
}

function toFSMAnomaly(failure: RecoveryFailure, participant: RecoveryParticipant): FSMAnomaly {
  return {
    id: failure.id,
    source: failure.module,
    category: failure.category,
    code: failure.code,
    message: failure.message,
    occurredAt: failure.occurredAt,
    retryable: failure.retryable,
    retryAfterMs: failure.retryAfterMs,
    circuitKey: failure.circuitKey ?? failure.evidence.dependencyKey ?? failure.module,
    sideEffectState: failure.sideEffectState,
    compensationAvailable: failure.compensationAvailable && Boolean(participant.compensate),
    reconciliationAvailable: Boolean(participant.reconcile),
    fallbackAvailable: Boolean(participant.fallback),
    degradationAvailable: Boolean(participant.degrade),
    metadata: {
      ...failure.metadata,
      rootCauseKey: failure.rootCauseKey,
      evidenceHash: recoveryEvidenceHash(failure.evidence),
    },
  };
}

function startedAttempt(
  snapshot: RecoveryCaseSnapshot,
  participant: RecoveryParticipant,
  strategy: RecoveryStrategy,
  failure: RecoveryFailure,
  now: string
): RecoveryAttemptRecord {
  return {
    cycle: snapshot.cycles,
    participantId: participant.id,
    module: participant.module,
    strategy,
    fingerprint: recoveryFailureFingerprint(failure),
    startedAt: now,
    status: 'started',
    evidenceBeforeHash: recoveryEvidenceHash(failure.evidence),
  };
}

function completeAttempt(
  record: RecoveryAttemptRecord,
  evidence: RecoveryEvidence,
  now: string
): void {
  record.completedAt = now;
  record.evidenceAfterHash = recoveryEvidenceHash(evidence);
  record.status =
    record.evidenceAfterHash === record.evidenceBeforeHash ? 'no_progress' : 'succeeded';
}

async function rememberOutcome(
  knowledge: RecoveryKnowledgePort | undefined,
  participant: RecoveryParticipant,
  failure: RecoveryFailure,
  strategy: RecoveryStrategy,
  outcome: RecoveryKnowledge['outcome'],
  evidenceHash: string,
  now: string
): Promise<void> {
  if (!knowledge) return;
  await knowledge.put({
    key: knowledgeKey(participant, failure),
    strategy,
    outcome,
    evidenceHash,
    learnedAt: now,
    validation: { status: outcome === 'failed' ? 'negative' : 'verified' },
  });
}

function knowledgeKey(
  participant: RecoveryParticipant,
  failure: RecoveryFailure
): RecoveryKnowledgeKey {
  return {
    fingerprint: recoveryFailureFingerprint(failure),
    participantId: participant.id,
    policyRevision: failure.evidence.policyRevision,
    specRevision: failure.evidence.specRevision,
    providerRevision: failure.evidence.providerRevision,
  };
}

async function finishTerminal(
  strategy: RecoveryStrategy,
  participant: RecoveryParticipant,
  failure: RecoveryFailure,
  error: unknown,
  snapshot: RecoveryCaseSnapshot,
  outputs: Record<string, unknown>,
  options: RecoverySupervisorOptions,
  recorder: RecoveryEventRecorder,
  now: string
): Promise<RecoverySupervisorResult> {
  const target = terminalState(strategy);
  if (
    target !== 'Cancelled' &&
    options.fsm.getSnapshot().currentState !== 'Recovering' &&
    options.fsm.getSnapshot().currentState !== 'Compensating' &&
    options.fsm.getSnapshot().currentState !== 'Quarantined'
  ) {
    await transitionIfNeeded(options.fsm, 'Recovering', failure, strategy);
  }
  await transitionIfNeeded(options.fsm, target, failure, strategy);
  snapshot.status = terminalStatus(strategy);
  snapshot.updatedAt = now;
  await recorder.record('recovery.case.escalated', snapshot, {
    participantId: participant.id,
    strategy,
    failure,
  });
  return {
    status:
      snapshot.status === 'quarantined'
        ? 'quarantined'
        : snapshot.status === 'cancelled'
          ? 'cancelled'
          : snapshot.status === 'suspended'
            ? 'suspended'
            : 'failed',
    outputs,
    snapshot,
    failure,
    error,
  };
}

function isExhausted(
  snapshot: RecoveryCaseSnapshot,
  policy: RecoveryConvergencePolicy,
  now: string
): boolean {
  return (
    snapshot.cycles > policy.maxCycles ||
    Date.parse(now) - Date.parse(snapshot.openedAt) > policy.maxElapsedMs
  );
}

function escalationStrategy(strategy: RecoveryConvergencePolicy['onExhausted']): RecoveryStrategy {
  return strategy;
}

function availableEscalation(
  strategy: RecoveryConvergencePolicy['onNoProgress'],
  participant: RecoveryParticipant
): RecoveryStrategy {
  if (strategy === 'fallback' && participant.fallback) return strategy;
  if (strategy === 'degrade' && participant.degrade) return strategy;
  return strategy === 'quarantine' || strategy === 'fail' ? strategy : 'human_review';
}

function isTerminalStrategy(strategy: RecoveryStrategy): boolean {
  return (
    strategy === 'human_review' ||
    strategy === 'quarantine' ||
    strategy === 'fail' ||
    strategy === 'cancel'
  );
}

function terminalState(strategy: RecoveryStrategy): string {
  switch (strategy) {
    case 'human_review':
      return 'HumanReview';
    case 'quarantine':
      return 'Quarantined';
    case 'cancel':
      return 'Cancelled';
    default:
      return 'Failed';
  }
}

function terminalStatus(strategy: RecoveryStrategy): RecoveryCaseSnapshot['status'] {
  switch (strategy) {
    case 'human_review':
      return 'suspended';
    case 'quarantine':
      return 'quarantined';
    case 'cancel':
      return 'cancelled';
    default:
      return 'failed';
  }
}

function participantContext(
  options: RecoverySupervisorOptions,
  participant: RecoveryParticipant,
  snapshot: RecoveryCaseSnapshot | undefined,
  outputs: Record<string, unknown>,
  cycle: number,
  failure?: RecoveryFailure
): RecoveryParticipantContext {
  return {
    caseId: options.caseId,
    runId: options.fsm.getSnapshot().runId,
    participantId: participant.id,
    module: participant.module,
    cycle,
    outputs,
    snapshot,
    failure,
    signal: options.signal,
  };
}

function validateFailure(participant: RecoveryParticipant, failure: RecoveryFailure): void {
  if (failure.module !== participant.module) {
    throw new Error(
      `Recovery participant ${participant.id} classified ${failure.module}, expected ${participant.module}.`
    );
  }
  if (!failure.evidence.operationKey) {
    throw new Error(`Recovery failure ${failure.id} requires evidence.operationKey.`);
  }
}

function assertParticipants(participants: RecoveryParticipant[]): void {
  if (participants.length === 0) throw new Error('Recovery supervisor requires participants.');
  const ids = new Set<string>();
  for (const participant of participants) {
    if (!participant.id) throw new Error('Recovery participant requires id.');
    if (ids.has(participant.id))
      throw new Error(`Duplicate recovery participant: ${participant.id}`);
    ids.add(participant.id);
  }
  for (const participant of participants) {
    for (const dependency of participant.dependsOn ?? []) {
      if (!ids.has(dependency)) {
        throw new Error(
          `Recovery participant ${participant.id} has unknown dependency ${dependency}.`
        );
      }
    }
  }
}

function assertDependencies(participant: RecoveryParticipant, completed: Set<string>): void {
  const missing = (participant.dependsOn ?? []).filter((dependency) => !completed.has(dependency));
  if (missing.length > 0) {
    throw new Error(
      `Recovery participant ${participant.id} has incomplete dependencies: ${missing.join(', ')}.`
    );
  }
}

function cancellationFailure(
  participant: RecoveryParticipant,
  options: RecoverySupervisorOptions,
  now: string
): RecoveryFailure {
  return {
    id: `${options.caseId}:${participant.id}:cancelled`,
    module: participant.module,
    category: 'cancellation',
    code: 'RECOVERY_CANCELLED',
    message: 'Recovery workflow was cancelled.',
    occurredAt: now,
    retryable: false,
    sideEffectState: 'none',
    evidence: {
      observedAt: now,
      operationKey: `${options.caseId}:${participant.id}`,
      state: 'cancelled',
    },
  };
}

async function transitionIfNeeded(
  fsm: FSMRuntime,
  state: string,
  failure: RecoveryFailure,
  strategy: RecoveryStrategy
): Promise<void> {
  if (fsm.getSnapshot().currentState === state) return;
  await fsm.transition(state, {
    metadata: {
      phase: 'recovery_supervisor',
      failureId: failure.id,
      failureCode: failure.code,
      recoveryStrategy: strategy,
    },
  });
}

async function resumeFSM(
  fsm: FSMRuntime,
  state: string,
  failure: RecoveryFailure,
  phase: string
): Promise<void> {
  if (fsm.getSnapshot().currentState === state) return;
  await fsm.transition(state, {
    metadata: {
      phase,
      failureId: failure.id,
      failureCode: failure.code,
    },
  });
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) return String(error.code);
  if (error instanceof Error) return error.name;
  return 'UNKNOWN';
}

class RecoveryEventRecorder {
  private sequence = 0;

  constructor(
    private readonly options: RecoverySupervisorOptions,
    private readonly runId: string,
    private readonly now: () => string
  ) {}

  async record(
    type: FrameworkEventType,
    snapshot: RecoveryCaseSnapshot,
    payload: Record<string, unknown>
  ): Promise<void> {
    if (!this.options.trace) return;
    this.sequence += 1;
    await this.options.trace.record(
      createFrameworkEvent({
        id: `${snapshot.id}:${String(this.sequence).padStart(4, '0')}:${type}`,
        type,
        runId: this.runId,
        sessionId: this.options.sessionId,
        workspaceId: this.options.workspaceId,
        stepId: this.options.stepId,
        agentId: this.options.agentId,
        fsmState: this.options.fsm.getSnapshot().currentState,
        timestamp: this.now(),
        payload: {
          caseId: snapshot.id,
          rootFingerprint: snapshot.rootFingerprint,
          status: snapshot.status,
          cycles: snapshot.cycles,
          ...payload,
        },
        metadata: this.options.metadata,
      })
    );
  }
}
