import {
  FrameworkError,
  canonicalizeJson,
  hashCanonicalJson,
  validateContinueReActCommandPayload,
  validateReActQuantumDescriptor,
  type ArtifactStoreProvider,
  type ContinueReActCommandPayloadV1,
  type ContinuationReActQuantumDescriptor,
  type ReActQuantumDescriptor,
  type SessionCommandRecord,
  type SpecRef,
} from '@hypha/core';
import type {
  ReActContinuationCheckpoint,
  ReActContinuationCheckpointStore,
  ReActRunContext,
  ReActRunResult,
  ReActRunner,
} from '@hypha/kernel';

export const REACT_CONTEXT_SNAPSHOT_VERSION = '1.0.0' as const;

export interface ReActContextSnapshot {
  version: typeof REACT_CONTEXT_SNAPSHOT_VERSION;
  runId: string;
  stepId: string;
  scopeHash: string;
  agentRef: SpecRef;
  context: ReActRunContext;
  createdAt: string;
}

export interface ReActContextSnapshotPutResult {
  snapshot: ReActContextSnapshot;
  snapshotHash: string;
  reused: boolean;
}

export interface ReActContextSnapshotStore {
  put(snapshot: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult>;
  get(scopeHash: string): Promise<ReActContextSnapshot | null>;
  delete(scopeHash: string): Promise<boolean>;
}

export interface ArtifactReActContextSnapshotStoreOptions {
  artifacts: ArtifactStoreProvider;
  maxSnapshotBytes?: number;
}

/** Durable content-addressed Context snapshots selected by the checkpoint scope hash. */
export class ArtifactReActContextSnapshotStore implements ReActContextSnapshotStore {
  private readonly maxSnapshotBytes: number;

  constructor(private readonly options: ArtifactReActContextSnapshotStoreOptions) {
    this.maxSnapshotBytes = positiveInteger(
      options.maxSnapshotBytes ?? 4 * 1024 * 1024,
      'maxSnapshotBytes'
    );
  }

  async put(input: ReActContextSnapshot): Promise<ReActContextSnapshotPutResult> {
    const snapshot = validateContextSnapshot(input);
    const snapshotHash = hashCanonicalJson(snapshot);
    const content = new TextEncoder().encode(canonicalizeJson(snapshot));
    this.assertSize(content.byteLength);
    const ref = snapshotRef(this.options.artifacts.id, snapshot.scopeHash);
    const existing = await this.options.artifacts.head(ref);
    if (existing) {
      if (existing.contentHash !== snapshotHash) {
        conflict('ReAct Context snapshot scope already contains different content');
      }
      return { snapshot, snapshotHash, reused: true };
    }
    await this.options.artifacts.put({
      operationId: `react-context:${scopeDigest(snapshot.scopeHash)}`,
      objectKey: ref.objectKey,
      content,
      expectedContentHash: snapshotHash,
      sizeBytes: content.byteLength,
      mimeType: 'application/json',
      metadata: { scopeHash: snapshot.scopeHash, snapshotHash },
      ifAbsent: true,
    });
    return { snapshot, snapshotHash, reused: false };
  }

  async get(scopeHash: string): Promise<ReActContextSnapshot | null> {
    validHash(scopeHash, 'scopeHash');
    const ref = snapshotRef(this.options.artifacts.id, scopeHash);
    if (!(await this.options.artifacts.exists(ref))) return null;
    const artifact = await this.options.artifacts.get({ ref });
    this.assertSize(artifact.sizeBytes);
    const bytes = await collect(artifact.stream, this.maxSnapshotBytes);
    if (bytes.byteLength !== artifact.sizeBytes) corrupt('Context snapshot size mismatch');
    let decoded: unknown;
    try {
      decoded = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch (error) {
      throw new FrameworkError({
        code: 'RUNTIME_EVENT_STREAM_CORRUPT',
        message: 'ReAct Context snapshot is not valid UTF-8 JSON',
        cause: error,
      });
    }
    const snapshot = validateContextSnapshot(decoded);
    if (snapshot.scopeHash !== scopeHash) corrupt('Context snapshot scopeHash mismatch');
    if (hashCanonicalJson(snapshot) !== artifact.contentHash) {
      corrupt('Context snapshot content hash mismatch');
    }
    return snapshot;
  }

  async delete(scopeHash: string): Promise<boolean> {
    validHash(scopeHash, 'scopeHash');
    const ref = snapshotRef(this.options.artifacts.id, scopeHash);
    if (!(await this.options.artifacts.exists(ref))) return false;
    await this.options.artifacts.delete(ref);
    return true;
  }

  private assertSize(sizeBytes: number): void {
    if (!Number.isSafeInteger(sizeBytes) || sizeBytes < 0)
      corrupt('Context snapshot size is invalid');
    if (sizeBytes > this.maxSnapshotBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `ReAct Context snapshot exceeds ${this.maxSnapshotBytes} bytes`,
      });
    }
  }
}

export type ReActQuantumRuntimeStatus =
  | 'created'
  | 'running'
  | 'waiting_human'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ReActQuantumRuntimeState {
  runId: string;
  sessionId: string;
  userId: string;
  status: ReActQuantumRuntimeStatus;
  cancellationRevision: number;
  agentRef: SpecRef;
  domainPackRef: SpecRef;
  workflowRef?: SpecRef;
  promptSnapshotHash: string;
  capabilitySnapshotHash: string;
}

export interface ReActQuantumRuntimeReader {
  replay(descriptor: Readonly<ReActQuantumDescriptor>): Promise<ReActQuantumRuntimeState>;
}

export interface ReActQuantumRevisionValidator {
  validate(
    descriptor: Readonly<ReActQuantumDescriptor>,
    state: Readonly<ReActQuantumRuntimeState>
  ): Promise<void>;
}

export interface ReActOperationReceiptReconciler {
  reconcile(input: {
    descriptor: Readonly<ReActQuantumDescriptor>;
    receiptRefs: readonly string[];
    signal: AbortSignal;
  }): Promise<void>;
}

export interface ReActQuantumRunnerFactory {
  create(input: {
    descriptor: Readonly<ReActQuantumDescriptor>;
    state: Readonly<ReActQuantumRuntimeState>;
    snapshot: Readonly<ReActContextSnapshot>;
    signal: AbortSignal;
  }): Promise<Pick<ReActRunner, 'run'>>;
}

export interface ReActQuantumOutcomeRecorder {
  record(input: {
    descriptor: Readonly<ReActQuantumDescriptor>;
    state: Readonly<ReActQuantumRuntimeState>;
    react: Readonly<ReActRunResult>;
    disposition: Exclude<ExecuteReActQuantumResult['disposition'], 'terminal'>;
    signal: AbortSignal;
  }): Promise<void>;
}

export interface ReActQuantumExecutorOptions {
  checkpoints: ReActContinuationCheckpointStore;
  contextSnapshots: ReActContextSnapshotStore;
  runtime: ReActQuantumRuntimeReader;
  runnerFactory: ReActQuantumRunnerFactory;
  outcomeRecorder: ReActQuantumOutcomeRecorder;
  revisionValidator?: ReActQuantumRevisionValidator;
  receiptReconciler?: ReActOperationReceiptReconciler;
  checkpointReferenceFor?: (checkpoint: Readonly<ReActContinuationCheckpoint>) => string;
  quantumIterations: number;
  now?: () => string;
}

export interface ExecuteReActQuantumRequest {
  command?: Readonly<SessionCommandRecord>;
  descriptor: ReActQuantumDescriptor;
  signal: AbortSignal;
}

export interface ExecuteReActQuantumResult {
  disposition: 'completed' | 'suspended' | 'waiting_human' | 'cancelled' | 'failed' | 'terminal';
  react?: ReActRunResult;
}

export function createContinuationReActQuantumDescriptor(
  command: Readonly<SessionCommandRecord>,
  input: unknown
): ContinuationReActQuantumDescriptor {
  const payload = validateContinueReActCommandPayload(input);
  if (
    command.commandType !== 'continue_react' ||
    command.status !== 'claimed' ||
    !command.claimToken ||
    command.leaseEpoch < 1 ||
    command.payloadHash !== hashCanonicalJson(payload) ||
    command.userId !== payload.userId ||
    command.sessionId !== payload.sessionId ||
    command.targetRunId !== payload.runId
  ) {
    conflict('Claimed continuation command does not match its durable payload');
  }
  return {
    version: '1.0.0',
    trigger: 'continuation',
    runId: payload.runId,
    sessionId: payload.sessionId,
    userId: payload.userId,
    stepId: payload.stepId,
    scopeHash: payload.scopeHash,
    agentRef: payload.agentRef,
    domainPackRef: payload.domainPackRef,
    ...(payload.workflowRef === undefined ? {} : { workflowRef: payload.workflowRef }),
    promptSnapshotRef: payload.promptSnapshotRef,
    promptSnapshotHash: payload.promptSnapshotHash,
    capabilitySnapshotRef: payload.capabilitySnapshotRef,
    capabilitySnapshotHash: payload.capabilitySnapshotHash,
    ...(payload.memoryContextRef === undefined
      ? {}
      : { memoryContextRef: payload.memoryContextRef }),
    ...(payload.workspaceRef === undefined ? {} : { workspaceRef: payload.workspaceRef }),
    ...(payload.executionRef === undefined ? {} : { executionRef: payload.executionRef }),
    ...(payload.pendingOperationReceipts === undefined
      ? {}
      : { pendingOperationReceipts: payload.pendingOperationReceipts }),
    globalBudget: payload.globalBudget,
    ...(payload.deadlineAt === undefined ? {} : { deadlineAt: payload.deadlineAt }),
    cancellationRevision: payload.cancellationRevision,
    createdAt: payload.createdAt,
    commandId: command.id,
    commandPayloadHash: command.payloadHash,
    claimToken: command.claimToken,
    leaseEpoch: command.leaseEpoch,
    checkpointRef: payload.checkpointRef,
    checkpointHash: payload.checkpointHash,
    checkpointSequence: payload.checkpointSequence,
  };
}

export class ContinuationIdentityValidator {
  validateCommand(
    command: Readonly<SessionCommandRecord>,
    descriptor: Readonly<ContinuationReActQuantumDescriptor>
  ): void {
    if (
      command.id !== descriptor.commandId ||
      command.commandType !== 'continue_react' ||
      command.payloadHash !== descriptor.commandPayloadHash ||
      command.claimToken !== descriptor.claimToken ||
      command.leaseEpoch !== descriptor.leaseEpoch ||
      command.userId !== descriptor.userId ||
      command.sessionId !== descriptor.sessionId ||
      command.targetRunId !== descriptor.runId
    ) {
      conflict('Continuation command identity does not match its quantum descriptor');
    }
  }

  validateCheckpoint(
    descriptor: Readonly<ContinuationReActQuantumDescriptor>,
    checkpoint: Readonly<ReActContinuationCheckpoint>,
    checkpointRef: string
  ): void {
    if (
      checkpoint.runId !== descriptor.runId ||
      checkpoint.stepId !== descriptor.stepId ||
      checkpoint.scopeHash !== descriptor.scopeHash ||
      checkpoint.stepSequence !== descriptor.checkpointSequence ||
      checkpointRef !== descriptor.checkpointRef ||
      !sameSpecRef(checkpoint.agentRef, descriptor.agentRef)
    ) {
      corrupt('Continuation checkpoint identity does not match its command payload');
    }
    if (hashCanonicalJson(checkpoint) !== descriptor.checkpointHash) {
      corrupt('Continuation checkpoint hash does not match its command payload');
    }
    if (
      checkpoint.iterations > descriptor.globalBudget.iterations ||
      checkpoint.modelCalls > descriptor.globalBudget.modelCalls ||
      checkpoint.toolCalls > descriptor.globalBudget.toolCalls ||
      checkpoint.totalTokens > descriptor.globalBudget.totalTokens
    ) {
      conflict('Continuation checkpoint already exceeds its global execution budget');
    }
  }

  validateSnapshot(
    descriptor: Readonly<ReActQuantumDescriptor>,
    snapshot: Readonly<ReActContextSnapshot>
  ): void {
    if (
      snapshot.runId !== descriptor.runId ||
      snapshot.stepId !== descriptor.stepId ||
      snapshot.scopeHash !== descriptor.scopeHash ||
      !sameSpecRef(snapshot.agentRef, descriptor.agentRef) ||
      snapshot.context.runId !== descriptor.runId ||
      snapshot.context.stepId !== descriptor.stepId ||
      !sameSpecRef(snapshot.context.agent, descriptor.agentRef)
    ) {
      corrupt('ReAct Context snapshot identity does not match its continuation payload');
    }
  }

  validateRuntimeState(
    descriptor: Readonly<ReActQuantumDescriptor>,
    state: Readonly<ReActQuantumRuntimeState>
  ): void {
    if (
      state.runId !== descriptor.runId ||
      state.sessionId !== descriptor.sessionId ||
      state.userId !== descriptor.userId ||
      !sameSpecRef(state.agentRef, descriptor.agentRef) ||
      !sameSpecRef(state.domainPackRef, descriptor.domainPackRef) ||
      !sameOptionalSpecRef(state.workflowRef, descriptor.workflowRef) ||
      state.promptSnapshotHash !== descriptor.promptSnapshotHash ||
      state.capabilitySnapshotHash !== descriptor.capabilitySnapshotHash
    ) {
      conflict('Current Runtime state does not match the continuation envelope');
    }
    if (state.cancellationRevision !== descriptor.cancellationRevision) {
      throw new FrameworkError({
        code: 'RUNTIME_CANCELLED',
        message: 'Continuation cancellation revision is stale',
      });
    }
  }
}

/** Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence. */
export class ReActQuantumExecutor {
  private readonly identity = new ContinuationIdentityValidator();
  private readonly quantumIterations: number;
  private readonly now: () => string;
  private readonly checkpointReferenceFor: (
    checkpoint: Readonly<ReActContinuationCheckpoint>
  ) => string;

  constructor(private readonly options: ReActQuantumExecutorOptions) {
    this.quantumIterations = positiveInteger(options.quantumIterations, 'quantumIterations');
    this.now = options.now ?? (() => new Date().toISOString());
    this.checkpointReferenceFor = options.checkpointReferenceFor ?? defaultCheckpointReference;
  }

  async runOneQuantum(input: ExecuteReActQuantumRequest): Promise<ExecuteReActQuantumResult> {
    if (!(input.signal instanceof AbortSignal)) invalid('signal must be an AbortSignal');
    const descriptor = validateReActQuantumDescriptor(input.descriptor);
    if (descriptor.trigger === 'continuation') {
      if (!input.command) invalid('Continuation quantum requires its claimed command');
      this.identity.validateCommand(input.command, descriptor);
      if (
        hashCanonicalJson(continuationPayloadFromDescriptor(descriptor)) !==
        descriptor.commandPayloadHash
      ) {
        corrupt('Continuation command payload hash does not match its descriptor');
      }
    } else if (input.command) {
      invalid('Initial quantum must not contain a Session command');
    }
    this.assertLease(input.signal);

    const state = await this.options.runtime.replay(descriptor);
    this.identity.validateRuntimeState(descriptor, state);
    if (isTerminal(state.status)) return { disposition: 'terminal' };
    if (state.status === 'waiting_human') return { disposition: 'waiting_human' };

    const checkpoint =
      descriptor.trigger === 'continuation'
        ? await this.options.checkpoints.get(
            descriptor.runId,
            descriptor.stepId,
            descriptor.scopeHash
          )
        : null;
    if (descriptor.trigger === 'continuation') {
      if (!checkpoint) corrupt('Continuation checkpoint is missing');
      this.identity.validateCheckpoint(
        descriptor,
        checkpoint,
        this.checkpointReferenceFor(checkpoint)
      );
    }

    const snapshot = await this.options.contextSnapshots.get(descriptor.scopeHash);
    if (!snapshot) corrupt('ReAct Context snapshot is missing');
    this.identity.validateSnapshot(descriptor, snapshot);

    await this.options.revisionValidator?.validate(descriptor, state);
    this.assertLease(input.signal);
    if (this.deadlineElapsed(descriptor)) {
      return this.recordPreExecutionTimeout(descriptor, state, input.signal);
    }
    if ((descriptor.pendingOperationReceipts?.length ?? 0) > 0 && !this.options.receiptReconciler) {
      throw new FrameworkError({
        code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
        message: 'Pending operation receipts require a configured reconciler',
      });
    }
    await this.options.receiptReconciler?.reconcile({
      descriptor,
      receiptRefs: descriptor.pendingOperationReceipts ?? [],
      signal: input.signal,
    });
    this.assertLease(input.signal);
    if (this.deadlineElapsed(descriptor)) {
      return this.recordPreExecutionTimeout(descriptor, state, input.signal);
    }

    const runner = await this.options.runnerFactory.create({
      descriptor,
      state,
      snapshot,
      signal: input.signal,
    });
    const runnerResult = await runner.run(snapshot.context, {
      ...(checkpoint === null ? {} : { checkpoint }),
      executionBudget: {
        maxIterations: descriptor.globalBudget.iterations,
        maxModelCalls: descriptor.globalBudget.modelCalls,
        maxToolCalls: descriptor.globalBudget.toolCalls,
        maxTotalTokens: descriptor.globalBudget.totalTokens,
        quantumIterations: this.quantumIterations,
        ...(descriptor.deadlineAt === undefined ? {} : { deadlineAt: descriptor.deadlineAt }),
      },
      abortSignal: input.signal,
    });
    // A worker that lost its lease may not publish. A worker that still owns
    // the lease but crossed its deadline must persist a fail-closed timeout
    // fact instead of leaving a live Run with an orphaned checkpoint.
    this.assertLease(input.signal);
    const react = this.deadlineElapsed(descriptor)
      ? timedOutResult(runnerResult, descriptor.deadlineAt!)
      : runnerResult;
    const disposition = dispositionFor(react);
    await this.options.outcomeRecorder.record({
      descriptor,
      state,
      react,
      disposition,
      signal: input.signal,
    });
    this.assertLease(input.signal);
    if (react.status === 'completed' || react.status === 'failed' || react.status === 'cancelled') {
      await this.options.checkpoints.delete(
        descriptor.runId,
        descriptor.stepId,
        descriptor.scopeHash
      );
    }
    return { disposition, react };
  }

  private async recordPreExecutionTimeout(
    descriptor: ReActQuantumDescriptor,
    state: ReActQuantumRuntimeState,
    signal: AbortSignal
  ): Promise<ExecuteReActQuantumResult> {
    const react = timedOutResult(
      { runId: descriptor.runId, status: 'failed', steps: [] },
      descriptor.deadlineAt!
    );
    await this.options.outcomeRecorder.record({
      descriptor,
      state,
      react,
      disposition: 'failed',
      signal,
    });
    this.assertLease(signal);
    await this.options.checkpoints.delete(
      descriptor.runId,
      descriptor.stepId,
      descriptor.scopeHash
    );
    return { disposition: 'failed', react };
  }

  private assertLease(signal: AbortSignal): void {
    if (signal.aborted) {
      throw new FrameworkError({ code: 'RUNTIME_CANCELLED', message: 'ReAct quantum was aborted' });
    }
  }

  private deadlineElapsed(descriptor: ReActQuantumDescriptor): boolean {
    if (descriptor.deadlineAt === undefined) return false;
    const now = this.now();
    if (!Number.isFinite(Date.parse(now))) invalid('Executor now must be a valid date-time');
    return Date.parse(now) >= Date.parse(descriptor.deadlineAt);
  }
}

function timedOutResult(result: ReActRunResult, deadlineAt: string): ReActRunResult {
  return {
    runId: result.runId,
    status: 'failed',
    steps: result.steps,
    error: new FrameworkError({
      code: 'RUNTIME_RUN_TIMEOUT',
      message: `ReAct execution crossed its deadline ${deadlineAt}`,
    }),
  };
}

function validateContextSnapshot(input: unknown): ReActContextSnapshot {
  const candidate = input as Partial<ReActContextSnapshot>;
  if (!candidate || typeof candidate !== 'object') invalid('Context snapshot must be an object');
  if (candidate.version !== REACT_CONTEXT_SNAPSHOT_VERSION) {
    invalid('Unsupported ReAct Context snapshot version');
  }
  required(candidate.runId, 'snapshot.runId');
  required(candidate.stepId, 'snapshot.stepId');
  validHash(candidate.scopeHash, 'snapshot.scopeHash');
  if (!candidate.agentRef || typeof candidate.agentRef !== 'object') {
    invalid('snapshot.agentRef is required');
  }
  required(candidate.agentRef.id, 'snapshot.agentRef.id');
  if (!candidate.context || typeof candidate.context !== 'object') {
    invalid('snapshot.context is required');
  }
  required(candidate.context.runId, 'snapshot.context.runId');
  required(candidate.context.stepId, 'snapshot.context.stepId');
  required(candidate.context.agent?.id, 'snapshot.context.agent.id');
  if (!candidate.createdAt || !Number.isFinite(Date.parse(candidate.createdAt))) {
    invalid('snapshot.createdAt must be a valid date-time');
  }
  return structuredClone(candidate as ReActContextSnapshot);
}

function dispositionFor(
  react: ReActRunResult
): Exclude<ExecuteReActQuantumResult['disposition'], 'terminal'> {
  if (react.status === 'completed') return 'completed';
  if (react.status === 'suspended') return 'suspended';
  if (react.status === 'human_review_required') return 'waiting_human';
  if (react.status === 'cancelled') return 'cancelled';
  return 'failed';
}

function isTerminal(status: ReActQuantumRuntimeStatus): boolean {
  return status === 'completed' || status === 'failed' || status === 'cancelled';
}

function sameSpecRef(left: SpecRef, right: SpecRef): boolean {
  return (
    left.id === right.id &&
    (left.version ?? null) === (right.version ?? null) &&
    (left.revision ?? null) === (right.revision ?? null)
  );
}

function sameOptionalSpecRef(left?: SpecRef, right?: SpecRef): boolean {
  if (left === undefined || right === undefined) return left === right;
  return sameSpecRef(left, right);
}

function snapshotRef(storeId: string, scopeHash: string) {
  return {
    storeId,
    objectKey: `runtime/react-context/${scopeDigest(scopeHash)}.json`,
  };
}

function defaultCheckpointReference(checkpoint: Readonly<ReActContinuationCheckpoint>): string {
  return `react-checkpoint:${checkpoint.runId}:${checkpoint.stepId}:${checkpoint.stepSequence}`;
}

function continuationPayloadFromDescriptor(
  descriptor: Readonly<ContinuationReActQuantumDescriptor>
): ContinueReActCommandPayloadV1 {
  return {
    version: '1.0.0',
    runId: descriptor.runId,
    sessionId: descriptor.sessionId,
    userId: descriptor.userId,
    stepId: descriptor.stepId,
    checkpointRef: descriptor.checkpointRef,
    checkpointHash: descriptor.checkpointHash,
    checkpointSequence: descriptor.checkpointSequence,
    scopeHash: descriptor.scopeHash,
    agentRef: descriptor.agentRef,
    domainPackRef: descriptor.domainPackRef,
    ...(descriptor.workflowRef === undefined ? {} : { workflowRef: descriptor.workflowRef }),
    promptSnapshotRef: descriptor.promptSnapshotRef,
    promptSnapshotHash: descriptor.promptSnapshotHash,
    capabilitySnapshotRef: descriptor.capabilitySnapshotRef,
    capabilitySnapshotHash: descriptor.capabilitySnapshotHash,
    ...(descriptor.memoryContextRef === undefined
      ? {}
      : { memoryContextRef: descriptor.memoryContextRef }),
    ...(descriptor.workspaceRef === undefined ? {} : { workspaceRef: descriptor.workspaceRef }),
    ...(descriptor.executionRef === undefined ? {} : { executionRef: descriptor.executionRef }),
    ...(descriptor.pendingOperationReceipts === undefined
      ? {}
      : { pendingOperationReceipts: descriptor.pendingOperationReceipts }),
    globalBudget: descriptor.globalBudget,
    ...(descriptor.deadlineAt === undefined ? {} : { deadlineAt: descriptor.deadlineAt }),
    cancellationRevision: descriptor.cancellationRevision,
    createdAt: descriptor.createdAt,
  };
}

function scopeDigest(scopeHash: string): string {
  validHash(scopeHash, 'scopeHash');
  return scopeHash.slice('sha256:'.length);
}

async function collect(stream: AsyncIterable<Uint8Array>, maxBytes: number): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  for await (const chunk of stream) {
    size += chunk.byteLength;
    if (size > maxBytes) {
      throw new FrameworkError({
        code: 'RUNTIME_RESOURCE_EXHAUSTED',
        message: `ReAct Context snapshot stream exceeds ${maxBytes} bytes`,
      });
    }
    chunks.push(chunk);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) invalid(`${label} must be non-empty`);
}

function validHash(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || !/^sha256:[a-f0-9]{64}$/u.test(value)) {
    invalid(`${label} must be a sha256 digest`);
  }
}

function positiveInteger(value: number, label: string): number {
  if (!Number.isSafeInteger(value) || value < 1) invalid(`${label} must be a positive integer`);
  return value;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_RUN_CONFLICT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
