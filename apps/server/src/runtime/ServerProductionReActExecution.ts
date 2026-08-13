import {
  FrameworkError,
  hashCanonicalJson,
  validateContinueReActCommandPayload,
  validateReActQuantumDescriptor,
  type ContinueReActCommandPayloadV1,
  type InitialReActQuantumDescriptor,
  type ReActGlobalBudget,
  type ReActQuantumDescriptor,
} from '@codesoul-co/core';
import {
  ArtifactReActContextSnapshotStore,
  ReActQuantumExecutor,
  type ReActContextSnapshot,
  type ReActQuantumRuntimeState,
} from '@codesoul-co/harness';
import type { InferenceProvider } from '@codesoul-co/inference';
import type {
  ReActAgentRuntime,
  ReActContinuationCheckpoint,
  ReActContinuationCheckpointStore,
  ReActObservation,
  ReActRunResult,
  ReActStep,
} from '@codesoul-co/kernel';
import { reActContinuationScopeHash } from '@codesoul-co/kernel';
import type { ToolRunner } from '@codesoul-co/tools';
import type { ArtifactStoreProvider } from '@codesoul-co/core';
import { harnessStateForReActPhase } from '@codesoul-co/fsm';
import type {
  CanonicalReActRunFacts,
  PreparedCanonicalReActExecution,
  StartRunInput,
} from '../services/EventRuntime';
import type { ScopedReActRunnerFactory } from './RuntimeCompositionRoot';

const evidenceKey = 'canonicalReActEvidence';

export interface ServerProductionReActExecutionLimits {
  quantumIterations: number;
  maxIterations: number;
  maxModelCalls: number;
  maxToolCalls: number;
  maxTotalTokens: number;
}

export interface ServerProductionReActExecutionSource {
  prepare(input: StartRunInput, runId: string): Promise<PreparedCanonicalReActExecution | null>;
  recordContextPrepared(input: {
    runId: string;
    stepId: string;
    scopeHash: string;
    messageCount: number;
    activeSkillIds: readonly string[];
  }): Promise<void>;
  readRunFacts(descriptor: Readonly<ReActQuantumDescriptor>): Promise<CanonicalReActRunFacts>;
  recordStep(runId: string, step: Readonly<ReActStep>): Promise<void>;
  recordCheckpoint(runId: string, checkpoint: Readonly<ReActContinuationCheckpoint>): Promise<void>;
  recordResume(runId: string, checkpoint: Readonly<ReActContinuationCheckpoint>): Promise<void>;
  syncMemory(
    context: Readonly<ReActContextSnapshot['context']>,
    observation: Readonly<ReActObservation>
  ): Promise<void>;
  recordOutcome(runId: string, result: Readonly<ReActRunResult>): Promise<void>;
}

export interface ServerProductionReActExecutionOptions {
  artifacts: ArtifactStoreProvider;
  checkpoints: ReActContinuationCheckpointStore;
  scopedRunners: ScopedReActRunnerFactory;
  inference: InferenceProvider;
  toolRunner: ToolRunner;
  reactRuntime: ReActAgentRuntime;
  source: ServerProductionReActExecutionSource;
  limits: ServerProductionReActExecutionLimits;
  now?: () => string;
}

/**
 * Production bridge from a durable start_run envelope to one bounded quantum.
 * Context and provider evidence are immutable Artifacts; live Run state is
 * replayed from Events before every resumed quantum.
 */
export class ServerProductionReActExecution {
  readonly executor: ReActQuantumExecutor;
  readonly checkpoints: ReActContinuationCheckpointStore;
  private readonly snapshots: ArtifactReActContextSnapshotStore;
  private readonly now: () => string;
  private readonly limits: ServerProductionReActExecutionLimits;

  constructor(private readonly options: ServerProductionReActExecutionOptions) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.limits = validateLimits(options.limits);
    this.checkpoints = options.checkpoints;
    this.snapshots = new ArtifactReActContextSnapshotStore({ artifacts: options.artifacts });
    this.executor = new ReActQuantumExecutor({
      checkpoints: options.checkpoints,
      contextSnapshots: this.snapshots,
      runtime: { replay: (descriptor) => this.replay(descriptor) },
      runnerFactory: {
        create: async ({ descriptor, snapshot, signal }) =>
          this.createRunner(descriptor, snapshot, signal),
      },
      outcomeRecorder: {
        record: async ({ descriptor, react }) => {
          if (react.status !== 'human_review_required' || react.checkpoint) {
            await options.source.recordOutcome(descriptor.runId, react);
            return;
          }
          const checkpoint = await options.checkpoints.get(
            descriptor.runId,
            descriptor.stepId,
            descriptor.scopeHash
          );
          if (!checkpoint) {
            corrupt('Human review outcome is missing its retained ReAct checkpoint');
          }
          await options.source.recordOutcome(descriptor.runId, { ...react, checkpoint });
        },
      },
      quantumIterations: this.limits.quantumIterations,
      now: this.now,
    });
  }

  async prepareInitial(
    input: StartRunInput,
    runId: string,
    signal?: AbortSignal
  ): Promise<InitialReActQuantumDescriptor | null> {
    assertSignal(signal, 'before ReAct preparation');
    const prepared = await this.options.source.prepare(input, runId);
    assertSignal(signal, 'after ReAct preparation');
    if (!prepared) return null;
    if (
      input.react?.deadlineAt !== undefined &&
      Date.parse(this.now()) >= Date.parse(input.react.deadlineAt)
    ) {
      throw new FrameworkError({
        code: 'RUNTIME_RUN_TIMEOUT',
        message: 'Canonical ReAct deadline elapsed during preparation',
      });
    }
    const createdAt = timestamp(this.now(), 'ReAct preparation clock');
    const scopeHash = scopeHashFor(prepared);
    const globalBudget = resolveBudget(input, this.limits);
    const promptSnapshotRef = `artifact:${this.options.artifacts.id}:runtime/react-context/${scopeHash.slice('sha256:'.length)}.json#/context/agent`;
    const memoryContextRef = prepared.memoryContextRef
      ? `artifact:${this.options.artifacts.id}:runtime/react-context/${scopeHash.slice('sha256:'.length)}.json#/context/metadata/memoryContext`
      : undefined;
    const evidence = {
      domainPackRef: prepared.domainPackRef,
      workflowRef: prepared.workflowRef,
      promptSnapshotRef,
      promptSnapshotHash: prepared.promptSnapshotHash,
      capabilitySnapshotRef: prepared.capabilitySnapshotRef,
      capabilitySnapshotHash: prepared.capabilitySnapshotHash,
      ...(memoryContextRef === undefined ? {} : { memoryContextRef }),
      sessionId: input.sessionId,
      userId: input.userId,
      globalBudget,
      ...(input.react?.deadlineAt === undefined ? {} : { deadlineAt: input.react.deadlineAt }),
      cancellationRevision: 0,
      descriptorCreatedAt: createdAt,
    };
    const snapshot: ReActContextSnapshot = {
      version: '1.0.0',
      runId,
      stepId: prepared.context.stepId,
      scopeHash,
      agentRef: { id: prepared.context.agent.id, version: prepared.context.agent.version },
      context: {
        ...structuredClone(prepared.context),
        metadata: {
          ...structuredClone(prepared.context.metadata ?? {}),
          [evidenceKey]: evidence,
        },
      },
      createdAt,
    };
    await this.snapshots.put(snapshot);
    assertSignal(signal, 'after ReAct Context persistence');
    await this.options.source.recordContextPrepared({
      runId,
      stepId: snapshot.stepId,
      scopeHash,
      messageCount: snapshot.context.messages.length,
      activeSkillIds: snapshot.context.activeSkills?.map((skill) => skill.id) ?? [],
    });
    assertSignal(signal, 'after ReAct Context Event commit');
    return validateReActQuantumDescriptor({
      version: '1.0.0',
      trigger: 'initial',
      runId,
      sessionId: input.sessionId,
      userId: input.userId,
      stepId: snapshot.stepId,
      scopeHash,
      agentRef: snapshot.agentRef,
      domainPackRef: prepared.domainPackRef,
      workflowRef: prepared.workflowRef,
      promptSnapshotRef,
      promptSnapshotHash: prepared.promptSnapshotHash,
      capabilitySnapshotRef: prepared.capabilitySnapshotRef,
      capabilitySnapshotHash: prepared.capabilitySnapshotHash,
      ...(memoryContextRef === undefined ? {} : { memoryContextRef }),
      globalBudget,
      ...(input.react?.deadlineAt === undefined ? {} : { deadlineAt: input.react.deadlineAt }),
      cancellationRevision: 0,
      createdAt,
    }) as InitialReActQuantumDescriptor;
  }

  /** Rebuilds a continuation envelope only from durable Context and checkpoint evidence. */
  async buildContinuationPayload(
    checkpoint: Readonly<ReActContinuationCheckpoint>,
    createdAt = this.now()
  ): Promise<ContinueReActCommandPayloadV1> {
    const snapshot = await this.snapshots.get(checkpoint.scopeHash);
    if (!snapshot) corrupt('Canonical ReAct Context snapshot is missing during reconciliation');
    if (
      snapshot.runId !== checkpoint.runId ||
      snapshot.stepId !== checkpoint.stepId ||
      snapshot.scopeHash !== checkpoint.scopeHash ||
      snapshot.agentRef.id !== checkpoint.agentRef.id ||
      snapshot.agentRef.version !== checkpoint.agentRef.version
    ) {
      corrupt('Canonical ReAct checkpoint does not match its Context snapshot');
    }
    const evidence = evidenceFrom(snapshot);
    return validateContinueReActCommandPayload({
      version: '1.0.0',
      runId: checkpoint.runId,
      sessionId: evidence.sessionId,
      userId: evidence.userId,
      stepId: checkpoint.stepId,
      checkpointRef: `react-checkpoint:${checkpoint.runId}:${checkpoint.stepId}:${checkpoint.stepSequence}`,
      checkpointHash: hashCanonicalJson(checkpoint),
      checkpointSequence: checkpoint.stepSequence,
      scopeHash: checkpoint.scopeHash,
      agentRef: checkpoint.agentRef,
      domainPackRef: evidence.domainPackRef,
      ...(evidence.workflowRef === undefined ? {} : { workflowRef: evidence.workflowRef }),
      promptSnapshotRef: evidence.promptSnapshotRef,
      promptSnapshotHash: evidence.promptSnapshotHash,
      capabilitySnapshotRef: evidence.capabilitySnapshotRef,
      capabilitySnapshotHash: evidence.capabilitySnapshotHash,
      ...(evidence.memoryContextRef === undefined
        ? {}
        : { memoryContextRef: evidence.memoryContextRef }),
      globalBudget: evidence.globalBudget,
      ...(evidence.deadlineAt === undefined ? {} : { deadlineAt: evidence.deadlineAt }),
      cancellationRevision: evidence.cancellationRevision,
      createdAt: timestamp(createdAt, 'ReAct continuation reconciliation clock'),
    });
  }

  async failBeforeQuantum(runId: string, error: unknown, signal?: AbortSignal): Promise<void> {
    assertSignal(signal, 'before recording pre-quantum failure');
    await this.options.source.recordOutcome(runId, {
      runId,
      status: 'failed',
      steps: [],
      error,
    });
    assertSignal(signal, 'after recording pre-quantum failure');
  }

  private async replay(
    descriptor: Readonly<ReActQuantumDescriptor>
  ): Promise<ReActQuantumRuntimeState> {
    const snapshot = await this.snapshots.get(descriptor.scopeHash);
    if (!snapshot) corrupt('Canonical ReAct Context snapshot is missing during replay');
    const evidence = evidenceFrom(snapshot);
    if (
      evidence.promptSnapshotRef !== descriptor.promptSnapshotRef ||
      evidence.promptSnapshotHash !== descriptor.promptSnapshotHash ||
      evidence.capabilitySnapshotRef !== descriptor.capabilitySnapshotRef ||
      evidence.capabilitySnapshotHash !== descriptor.capabilitySnapshotHash ||
      evidence.memoryContextRef !== descriptor.memoryContextRef
    ) {
      conflict('Canonical ReAct snapshot evidence does not match the execution descriptor');
    }
    const facts = await this.options.source.readRunFacts(descriptor);
    if (facts.status === 'created') {
      conflict('Canonical ReAct Run has not entered running state');
    }
    return {
      runId: facts.runId,
      sessionId: facts.sessionId,
      userId: facts.userId,
      status: facts.status,
      cancellationRevision: facts.cancellationRevision,
      agentRef: facts.agentRef,
      domainPackRef: facts.domainPackRef,
      ...(facts.workflowRef === undefined ? {} : { workflowRef: facts.workflowRef }),
      promptSnapshotHash: evidence.promptSnapshotHash,
      capabilitySnapshotHash: evidence.capabilitySnapshotHash,
    };
  }

  private createRunner(
    descriptor: Readonly<ReActQuantumDescriptor>,
    snapshot: Readonly<ReActContextSnapshot>,
    signal: AbortSignal
  ) {
    let currentFSMState = snapshot.context.toolExecutionScope?.fsmState;
    const assertLease = (): void => {
      if (signal.aborted) {
        throw new FrameworkError({
          code: 'RUNTIME_CANCELLED',
          message: 'Canonical ReAct lease expired before a durable side effect',
        });
      }
    };
    const assertExternalWindow = (): void => {
      assertLease();
      if (
        descriptor.deadlineAt !== undefined &&
        Date.parse(this.now()) >= Date.parse(descriptor.deadlineAt)
      ) {
        throw new FrameworkError({
          code: 'RUNTIME_RUN_TIMEOUT',
          message: 'Canonical ReAct deadline expired before a durable side effect',
        });
      }
    };
    const leaseFenced = async <T>(operation: () => Promise<T>): Promise<T> => {
      assertLease();
      const result = await operation();
      assertLease();
      return result;
    };
    const externalFenced = async <T>(operation: () => Promise<T>): Promise<T> => {
      assertExternalWindow();
      const result = await operation();
      assertExternalWindow();
      return result;
    };
    return this.options.scopedRunners.create(this.options.reactRuntime, {
      inference: this.options.inference,
      toolRunner: this.options.toolRunner,
      checkpointStore: this.options.checkpoints,
      retainCheckpointUntilOutcome: true,
      continueAfterTool: true,
      resolveToolExecutionScope: (context) => ({
        ...context.toolExecutionScope,
        ...(currentFSMState === undefined ? {} : { fsmState: currentFSMState }),
      }),
      onStep: async (step) => {
        await leaseFenced(() => this.options.source.recordStep(snapshot.runId, step));
        currentFSMState = fsmStateFor(step) ?? currentFSMState;
      },
      onCheckpoint: (checkpoint) =>
        leaseFenced(() => this.options.source.recordCheckpoint(snapshot.runId, checkpoint)),
      onResume: (checkpoint) =>
        leaseFenced(() => this.options.source.recordResume(snapshot.runId, checkpoint)),
      syncMemory: (context, observation) =>
        externalFenced(() => this.options.source.syncMemory(context, observation)),
      now: this.now,
    });
  }
}

function resolveBudget(
  input: StartRunInput,
  limits: ServerProductionReActExecutionLimits
): ReActGlobalBudget {
  const requested = input.react?.budget ?? {};
  return {
    iterations: bounded(
      requested.iterations ?? limits.maxIterations,
      limits.maxIterations,
      'iterations'
    ),
    modelCalls: bounded(
      requested.modelCalls ?? limits.maxModelCalls,
      limits.maxModelCalls,
      'modelCalls'
    ),
    toolCalls: bounded(
      requested.toolCalls ?? limits.maxToolCalls,
      limits.maxToolCalls,
      'toolCalls',
      true
    ),
    totalTokens: bounded(
      requested.totalTokens ?? limits.maxTotalTokens,
      limits.maxTotalTokens,
      'totalTokens'
    ),
  };
}

function bounded(value: number, maximum: number, label: string, allowZero = false): number {
  if (!Number.isSafeInteger(value) || value < (allowZero ? 0 : 1) || value > maximum) {
    throw new FrameworkError({
      code: 'RUNTIME_RESOURCE_EXHAUSTED',
      message: `Canonical ReAct ${label} must be between ${allowZero ? 0 : 1} and ${maximum}`,
    });
  }
  return value;
}

function validateLimits(
  limits: ServerProductionReActExecutionLimits
): ServerProductionReActExecutionLimits {
  for (const [label, value] of Object.entries(limits)) {
    if (!Number.isSafeInteger(value) || value < 1) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: `Canonical ReAct limit ${label} must be a positive integer`,
      });
    }
  }
  return { ...limits };
}

function scopeHashFor(prepared: PreparedCanonicalReActExecution): string {
  return reActContinuationScopeHash(prepared.context);
}

function evidenceFrom(snapshot: Readonly<ReActContextSnapshot>): PreparedEvidence {
  const value = snapshot.context.metadata?.[evidenceKey];
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    corrupt('Canonical ReAct Context snapshot is missing provider evidence');
  }
  const evidence = value as Partial<PreparedEvidence>;
  for (const key of [
    'sessionId',
    'userId',
    'promptSnapshotRef',
    'promptSnapshotHash',
    'capabilitySnapshotRef',
    'capabilitySnapshotHash',
  ] as const) {
    if (typeof evidence[key] !== 'string' || !evidence[key]) {
      corrupt(`Canonical ReAct Context evidence is missing ${key}`);
    }
  }
  if (
    evidence.memoryContextRef !== undefined &&
    (typeof evidence.memoryContextRef !== 'string' || !evidence.memoryContextRef)
  ) {
    corrupt('Canonical ReAct Context evidence has an invalid memoryContextRef');
  }
  if (!evidence.domainPackRef || typeof evidence.domainPackRef !== 'object') {
    corrupt('Canonical ReAct Context evidence is missing domainPackRef');
  }
  if (!evidence.globalBudget || typeof evidence.globalBudget !== 'object') {
    corrupt('Canonical ReAct Context evidence is missing globalBudget');
  }
  if (!Number.isSafeInteger(evidence.cancellationRevision) || evidence.cancellationRevision! < 0) {
    corrupt('Canonical ReAct Context evidence has an invalid cancellationRevision');
  }
  if (
    typeof evidence.descriptorCreatedAt !== 'string' ||
    !Number.isFinite(Date.parse(evidence.descriptorCreatedAt))
  ) {
    corrupt('Canonical ReAct Context evidence has an invalid descriptorCreatedAt');
  }
  return evidence as PreparedEvidence;
}

interface PreparedEvidence {
  sessionId: string;
  userId: string;
  domainPackRef: InitialReActQuantumDescriptor['domainPackRef'];
  workflowRef?: InitialReActQuantumDescriptor['workflowRef'];
  promptSnapshotRef: string;
  promptSnapshotHash: string;
  capabilitySnapshotRef: string;
  capabilitySnapshotHash: string;
  memoryContextRef?: string;
  globalBudget: ReActGlobalBudget;
  deadlineAt?: string;
  cancellationRevision: number;
  descriptorCreatedAt: string;
}

function fsmStateFor(step: Readonly<ReActStep>): string | undefined {
  return harnessStateForReActPhase(step.phase);
}

function timestamp(value: string, label: string): string {
  if (!Number.isFinite(Date.parse(value))) {
    throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message: `${label} is invalid` });
  }
  return value;
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RUN_CONFLICT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}

function assertSignal(signal: AbortSignal | undefined, phase: string): void {
  if (signal?.aborted) {
    throw new FrameworkError({
      code: 'RUNTIME_CANCELLED',
      message: `Session Command lost its lease ${phase}`,
    });
  }
}
