import type { NormalizedRuntimeError } from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import type { EventCreateInput, FrameworkEventType, PersistedFrameworkEvent } from '../../events';
import type { SpecRef } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import type { EventAppendResult, EventStreamScope } from './event-store';
import type { DurableEventRuntime } from './event-runtime';
import { projectRuntimeRun } from './run-manager';

export const PARALLEL_JOIN_POLICIES = ['all', 'any', 'first_success', 'quorum', 'custom'] as const;
export const PARALLEL_FAILURE_POLICIES = ['fail_fast', 'collect', 'ignore_optional'] as const;
export const PARALLEL_BRANCH_STATUSES = [
  'requested',
  'running',
  'completed',
  'failed',
  'cancelled',
  'cancellation_requested',
  'ignored',
] as const;

export type ParallelJoinPolicy = (typeof PARALLEL_JOIN_POLICIES)[number];
export type ParallelFailurePolicy = (typeof PARALLEL_FAILURE_POLICIES)[number];
export type ParallelBranchStatus = (typeof PARALLEL_BRANCH_STATUSES)[number];

interface ParallelCommandBase {
  scope: EventStreamScope;
  expectedLastSequence: number;
  expectedRunRevision?: number;
  fencingToken: number;
  idempotencyKey: string;
  operationId: string;
  correlationId?: string;
}

export interface ParallelBranchRequest {
  id: string;
  childRunId: string;
  workflowRef?: SpecRef;
  startState?: string;
  required?: boolean;
  input: unknown;
  inputHash?: string;
  metadata?: Record<string, unknown>;
}

export interface StartParallelRunRequest extends ParallelCommandBase {
  parallelId: string;
  stateId: string;
  branches: ParallelBranchRequest[];
  join: ParallelJoinPolicy;
  quorum?: number;
  failurePolicy: ParallelFailurePolicy;
  cancelRemainingOnJoin?: boolean;
  maxConcurrency?: number;
}

export interface MarkParallelBranchStartedRequest extends ParallelCommandBase {
  parallelId: string;
  branchId: string;
  childCreatedEventId?: string;
}

export interface RecordParallelBranchResultRequest extends ParallelCommandBase {
  parallelId: string;
  branchId: string;
  status: 'completed' | 'failed' | 'cancelled';
  output?: unknown;
  outputHash?: string;
  error?: NormalizedRuntimeError;
}

export interface ParallelBranchRecord {
  id: string;
  childRunId: string;
  workflowRef?: SpecRef;
  startState?: string;
  required: boolean;
  input: unknown;
  inputHash: string;
  metadata?: Record<string, unknown>;
  status: ParallelBranchStatus;
  lastSequence: number;
  requestedAt: string;
  startedAt?: string;
  resolvedAt?: string;
  childCreatedEventId?: string;
  output?: unknown;
  outputHash?: string;
  error?: NormalizedRuntimeError;
}

export interface ParallelJoinDecision {
  ready: boolean;
  succeeded?: boolean;
  reason: string;
  completedBranchIds: string[];
  failedBranchIds: string[];
  cancelledBranchIds: string[];
  ignoredBranchIds: string[];
  activeBranchIds: string[];
  cancelBranchIds: string[];
}

export interface ParallelRunRecord {
  id: string;
  parentRunId: string;
  stateId: string;
  status: 'running' | 'joined' | 'failed';
  join: ParallelJoinPolicy;
  quorum?: number;
  failurePolicy: ParallelFailurePolicy;
  cancelRemainingOnJoin: boolean;
  maxConcurrency: number;
  branches: ParallelBranchRecord[];
  createdAt: string;
  resolvedAt?: string;
  decision?: ParallelJoinDecision;
}

export interface ParallelRuntimeCommitResult {
  append: EventAppendResult;
  parallel: ParallelRunRecord;
}

export type CustomParallelJoinResolver = (
  parallel: Readonly<ParallelRunRecord>
) => ParallelJoinDecision;

export interface EventSourcedParallelRuntimeOptions {
  events: DurableEventRuntime;
  now?: () => string;
  customJoinResolver?: CustomParallelJoinResolver;
}

export class EventSourcedParallelRuntime {
  private readonly events: DurableEventRuntime;
  private readonly now: () => string;

  constructor(private readonly options: EventSourcedParallelRuntimeOptions) {
    this.events = options.events;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async start(request: StartParallelRunRequest): Promise<ParallelRuntimeCommitResult> {
    validateCommand(request);
    validateStart(request, Boolean(this.options.customJoinResolver));
    const reused = await this.reuse(request, request.parallelId);
    if (reused) return reused;
    const stream = await this.loadStream(request);
    const run = projectRuntimeRun(stream);
    if (!run || run.status !== 'running') {
      invalid('RUNTIME_RUN_CONFLICT', 'Parallel execution requires a running parent Run.');
    }
    if (projectParallelRun(stream, request.parallelId)) {
      invalid('RUNTIME_RUN_CONFLICT', `Parallel execution already exists: ${request.parallelId}`);
    }
    const at = this.now();
    const parallel: ParallelRunRecord = {
      id: request.parallelId,
      parentRunId: request.scope.runId,
      stateId: request.stateId,
      status: 'running',
      join: request.join,
      ...(request.quorum === undefined ? {} : { quorum: request.quorum }),
      failurePolicy: request.failurePolicy,
      cancelRemainingOnJoin: request.cancelRemainingOnJoin ?? false,
      maxConcurrency: request.maxConcurrency ?? request.branches.length,
      branches: request.branches.map((branch) => ({
        id: branch.id,
        childRunId: branch.childRunId,
        ...(branch.workflowRef === undefined ? {} : { workflowRef: clone(branch.workflowRef) }),
        ...(branch.startState === undefined ? {} : { startState: branch.startState }),
        required: branch.required ?? true,
        input: clone(branch.input),
        inputHash: branch.inputHash ?? hashCanonicalJson(branch.input),
        ...(branch.metadata === undefined ? {} : { metadata: clone(branch.metadata) }),
        status: 'requested',
        lastSequence: 1,
        requestedAt: at,
      })),
      createdAt: at,
    };
    const eventInputs: EventCreateInput[] = [
      event(request, at, 'runtime.parallel.started', 1, { parallel }),
      ...parallel.branches.map((branch, index) =>
        event(
          request,
          at,
          'runtime.parallel.branch.requested',
          index + 2,
          {
            parallelId: parallel.id,
            branchId: branch.id,
            branchSequence: 1,
            branch,
          },
          branch.id
        )
      ),
      event(request, at, 'run.waiting', parallel.branches.length + 2, {
        parallelId: parallel.id,
        stateId: parallel.stateId,
      }),
    ];
    const append = await this.append(request, eventInputs);
    return { append, parallel: await this.requireParallel(request.scope, request.parallelId) };
  }

  async markBranchStarted(
    request: MarkParallelBranchStartedRequest
  ): Promise<ParallelRuntimeCommitResult> {
    validateCommand(request);
    required(request.parallelId, 'parallelId');
    required(request.branchId, 'branchId');
    const reused = await this.reuse(request, request.parallelId);
    if (reused) return reused;
    const parallel = await this.loadParallel(request, request.parallelId);
    const branch = requireBranch(parallel, request.branchId);
    if (branch.status !== 'requested') {
      invalid('RUNTIME_RUN_CONFLICT', `Branch cannot start from ${branch.status}.`);
    }
    const at = this.now();
    const append = await this.append(request, [
      event(
        request,
        at,
        'runtime.parallel.branch.started',
        1,
        {
          parallelId: parallel.id,
          branchId: branch.id,
          branchSequence: branch.lastSequence + 1,
          childRunId: branch.childRunId,
          ...(request.childCreatedEventId === undefined
            ? {}
            : { childCreatedEventId: request.childCreatedEventId }),
        },
        branch.id
      ),
    ]);
    return { append, parallel: await this.requireParallel(request.scope, request.parallelId) };
  }

  async recordBranchResult(
    request: RecordParallelBranchResultRequest
  ): Promise<ParallelRuntimeCommitResult> {
    validateCommand(request);
    required(request.parallelId, 'parallelId');
    required(request.branchId, 'branchId');
    if (request.status === 'failed' && !request.error) {
      invalid('RUNTIME_INVALID_INPUT', 'A failed branch requires a normalized error.');
    }
    const reused = await this.reuse(request, request.parallelId);
    if (reused) return reused;
    const parallel = await this.loadParallel(request, request.parallelId);
    const branch = requireBranch(parallel, request.branchId);
    if (!['requested', 'running', 'cancellation_requested'].includes(branch.status)) {
      invalid('RUNTIME_RUN_CONFLICT', `Branch is already terminal: ${branch.id}`);
    }
    const at = this.now();
    const terminalType = `runtime.parallel.branch.${request.status}` as FrameworkEventType;
    const resultPayload = {
      parallelId: parallel.id,
      branchId: branch.id,
      branchSequence: branch.lastSequence + 1,
      childRunId: branch.childRunId,
      ...(request.output === undefined ? {} : { output: clone(request.output) }),
      ...(request.outputHash === undefined ? {} : { outputHash: request.outputHash }),
      ...(request.error === undefined ? {} : { error: clone(request.error) }),
    };
    const projected = applyBranchResult(clone(parallel), request, at);
    const decision = evaluateParallelJoin(projected, this.options.customJoinResolver);
    const events: EventCreateInput[] = [
      event(request, at, terminalType, 1, resultPayload, branch.id),
    ];
    if (parallel.status !== 'running') {
      const append = await this.append(request, events);
      return { append, parallel: await this.requireParallel(request.scope, request.parallelId) };
    }
    if (decision.ready) {
      events.push(
        event(
          request,
          at,
          decision.succeeded ? 'runtime.parallel.joined' : 'runtime.parallel.failed',
          2,
          { parallelId: parallel.id, decision }
        )
      );
      decision.cancelBranchIds.forEach((branchId, index) => {
        const remaining = requireBranch(projected, branchId);
        events.push(
          event(
            request,
            at,
            'runtime.child_run.cancel.requested',
            index + 3,
            {
              parallelId: parallel.id,
              branchId,
              branchSequence: remaining.lastSequence + 1,
              childRunId: remaining.childRunId,
              reason: 'parallel_join_resolved',
            },
            branchId
          )
        );
      });
      events.push(
        event(request, at, 'run.resumed', decision.cancelBranchIds.length + 3, {
          parallelId: parallel.id,
          joinSucceeded: decision.succeeded,
        })
      );
    }
    const append = await this.append(request, events);
    return { append, parallel: await this.requireParallel(request.scope, request.parallelId) };
  }

  async get(scope: EventStreamScope, parallelId: string): Promise<ParallelRunRecord | null> {
    return projectParallelRun(await this.events.read({ scope }), parallelId);
  }

  async pendingChildRuns(
    scope: EventStreamScope,
    parallelId: string
  ): Promise<ParallelBranchRecord[]> {
    const parallel = await this.get(scope, parallelId);
    if (!parallel) return [];
    const running = parallel.branches.filter((branch) => branch.status === 'running').length;
    const availableSlots = Math.max(0, parallel.maxConcurrency - running);
    return parallel.branches
      .filter((branch) => branch.status === 'requested')
      .slice(0, availableSlots)
      .map(clone);
  }

  private async loadStream(request: ParallelCommandBase): Promise<PersistedFrameworkEvent[]> {
    const stream = await this.events.read({ scope: request.scope });
    const actualSequence = stream.at(-1)?.sequence ?? 0;
    if (actualSequence !== request.expectedLastSequence) {
      invalid('RUNTIME_EVENT_APPEND_FAILED', 'Expected sequence conflict.');
    }
    return stream;
  }

  private async loadParallel(
    request: ParallelCommandBase,
    parallelId: string
  ): Promise<ParallelRunRecord> {
    const stream = await this.loadStream(request);
    const parallel = projectParallelRun(stream, parallelId);
    if (!parallel) invalid('RUNTIME_RUN_NOT_FOUND', `Parallel execution not found: ${parallelId}`);
    return parallel;
  }

  private async requireParallel(
    scope: EventStreamScope,
    parallelId: string
  ): Promise<ParallelRunRecord> {
    const parallel = await this.get(scope, parallelId);
    if (!parallel) invalid('RUNTIME_RUN_NOT_FOUND', `Parallel execution not found: ${parallelId}`);
    return parallel;
  }

  private async reuse(
    request: ParallelCommandBase,
    parallelId: string
  ): Promise<ParallelRuntimeCommitResult | null> {
    const stream = await this.events.read({ scope: request.scope });
    const prior = stream.filter(
      (item) =>
        item.operationId === request.operationId && item.idempotencyKey === request.idempotencyKey
    );
    if (prior.length === 0) return null;
    const append = await this.append(request, prior.map(toCreateInput));
    const parallel = projectParallelRun(stream, parallelId);
    if (!parallel) invalid('RUNTIME_RUN_NOT_FOUND', `Parallel execution not found: ${parallelId}`);
    return { append, parallel };
  }

  private append(
    request: ParallelCommandBase,
    events: EventCreateInput[]
  ): Promise<EventAppendResult> {
    return this.events.append({
      scope: clone(request.scope),
      events,
      expectedLastSequence: request.expectedLastSequence,
      ...(request.expectedRunRevision === undefined
        ? {}
        : { expectedRunRevision: request.expectedRunRevision }),
      fencingToken: request.fencingToken,
      idempotencyKey: request.idempotencyKey,
      transactionGroupId: request.operationId,
    });
  }
}

export function evaluateParallelJoin(
  parallel: Readonly<ParallelRunRecord>,
  customResolver?: CustomParallelJoinResolver
): ParallelJoinDecision {
  const completed = ids(parallel, 'completed');
  const failed = ids(parallel, 'failed');
  const cancelled = ids(parallel, 'cancelled');
  const ignored = ids(parallel, 'ignored');
  const active = parallel.branches
    .filter((branch) => branch.status === 'requested' || branch.status === 'running')
    .map((branch) => branch.id);
  const requiredFailure = parallel.branches.some(
    (branch) => branch.required && (branch.status === 'failed' || branch.status === 'cancelled')
  );
  const base = {
    completedBranchIds: completed,
    failedBranchIds: failed,
    cancelledBranchIds: cancelled,
    ignoredBranchIds: ignored,
    activeBranchIds: active,
  };
  if (parallel.join === 'custom') {
    if (!customResolver)
      invalid('RUNTIME_INVALID_INPUT', 'Custom join resolver is not configured.');
    return normalizeDecision(customResolver(clone(parallel)), parallel, base);
  }
  if (parallel.failurePolicy === 'fail_fast' && requiredFailure) {
    return readyDecision(false, 'required_branch_failed_fast', parallel, base);
  }

  if (parallel.join === 'all') {
    if (active.length > 0) return pendingDecision('waiting_for_all_branches', base);
    const succeeded = !requiredFailure;
    return readyDecision(
      succeeded,
      succeeded ? 'all_branches_completed' : 'required_branch_failed',
      parallel,
      base
    );
  }
  if (parallel.join === 'any') {
    const terminalCount = completed.length + failed.length + cancelled.length + ignored.length;
    if (terminalCount === 0) return pendingDecision('waiting_for_any_branch', base);
    return readyDecision(
      completed.length > 0,
      completed.length > 0 ? 'branch_completed' : 'first_terminal_branch_failed',
      parallel,
      base
    );
  }
  if (parallel.join === 'first_success') {
    if (completed.length > 0) {
      return readyDecision(true, 'first_success_observed', parallel, base);
    }
    if (active.length === 0) return readyDecision(false, 'no_branch_succeeded', parallel, base);
    return pendingDecision('waiting_for_first_success', base);
  }

  const quorum = parallel.quorum ?? 0;
  if (completed.length >= quorum) {
    return readyDecision(true, 'quorum_reached', parallel, base);
  }
  if (completed.length + active.length < quorum) {
    return readyDecision(false, 'quorum_unreachable', parallel, base);
  }
  return pendingDecision('waiting_for_quorum', base);
}

export function projectParallelRun(
  events: readonly PersistedFrameworkEvent[],
  parallelId: string
): ParallelRunRecord | null {
  let parallel: ParallelRunRecord | null = null;
  for (const item of events) {
    if (item.type === 'runtime.parallel.started') {
      const payload = payloadRecord(item);
      const candidate = payload.parallel as ParallelRunRecord | undefined;
      if (candidate?.id !== parallelId) continue;
      if (parallel) invalid('RUNTIME_REPLAY_DIVERGENCE', 'Parallel execution started twice.');
      parallel = clone(candidate);
      continue;
    }
    if (!parallel) continue;
    const payload = payloadRecord(item);
    if (payload.parallelId !== parallelId) continue;
    if (item.type === 'runtime.child_run.cancel.requested') {
      const branch = requireBranch(parallel, requiredPayloadString(payload, 'branchId'));
      advanceBranchSequence(branch, payload);
      if (branch.status === 'requested' || branch.status === 'running') {
        branch.status = 'cancellation_requested';
      }
    } else if (item.type.startsWith('runtime.parallel.branch.')) {
      const branchId = requiredPayloadString(payload, 'branchId');
      const branch = requireBranch(parallel, branchId);
      if (item.type === 'runtime.parallel.branch.requested') {
        if (requiredPayloadInteger(payload, 'branchSequence') !== 1) {
          invalid('RUNTIME_REPLAY_DIVERGENCE', 'Branch request must start at sequence 1.');
        }
        continue;
      }
      advanceBranchSequence(branch, payload);
      if (item.type === 'runtime.parallel.branch.started') {
        if (parallel.status !== 'running') {
          invalid('RUNTIME_REPLAY_DIVERGENCE', 'A branch started after parallel resolution.');
        }
        if (branch.status !== 'requested') {
          invalid('RUNTIME_REPLAY_DIVERGENCE', `Branch started from ${branch.status}.`);
        }
        branch.status = 'running';
        branch.startedAt = item.timestamp;
        if (typeof payload.childCreatedEventId === 'string') {
          branch.childCreatedEventId = payload.childCreatedEventId;
        }
      } else {
        if (!['requested', 'running', 'cancellation_requested'].includes(branch.status)) {
          invalid('RUNTIME_REPLAY_DIVERGENCE', `Branch completed from ${branch.status}.`);
        }
        branch.status = branchStatusFromEvent(item.type);
        branch.resolvedAt = item.timestamp;
        if (payload.output !== undefined) branch.output = clone(payload.output);
        if (typeof payload.outputHash === 'string') branch.outputHash = payload.outputHash;
        if (payload.error !== undefined) {
          branch.error = clone(payload.error as NormalizedRuntimeError);
        }
      }
    } else if (item.type === 'runtime.parallel.joined' || item.type === 'runtime.parallel.failed') {
      if (parallel.status !== 'running') {
        invalid('RUNTIME_REPLAY_DIVERGENCE', 'Parallel execution resolved twice.');
      }
      parallel.status = item.type === 'runtime.parallel.joined' ? 'joined' : 'failed';
      parallel.resolvedAt = item.timestamp;
      parallel.decision = clone(payload.decision as ParallelJoinDecision);
    }
  }
  return parallel ? clone(parallel) : null;
}

function applyBranchResult(
  parallel: ParallelRunRecord,
  request: RecordParallelBranchResultRequest,
  at: string
): ParallelRunRecord {
  const branch = requireBranch(parallel, request.branchId);
  branch.status = request.status;
  branch.resolvedAt = at;
  if (request.output !== undefined) branch.output = clone(request.output);
  if (request.outputHash !== undefined) branch.outputHash = request.outputHash;
  if (request.error !== undefined) branch.error = clone(request.error);
  return parallel;
}

function readyDecision(
  succeeded: boolean,
  reason: string,
  parallel: Readonly<ParallelRunRecord>,
  base: Omit<ParallelJoinDecision, 'ready' | 'succeeded' | 'reason' | 'cancelBranchIds'>
): ParallelJoinDecision {
  return {
    ready: true,
    succeeded,
    reason,
    ...base,
    cancelBranchIds: parallel.cancelRemainingOnJoin ? [...base.activeBranchIds] : [],
  };
}

function pendingDecision(
  reason: string,
  base: Omit<ParallelJoinDecision, 'ready' | 'succeeded' | 'reason' | 'cancelBranchIds'>
): ParallelJoinDecision {
  return { ready: false, reason, ...base, cancelBranchIds: [] };
}

function normalizeDecision(
  decision: ParallelJoinDecision,
  parallel: Readonly<ParallelRunRecord>,
  base: Omit<ParallelJoinDecision, 'ready' | 'succeeded' | 'reason' | 'cancelBranchIds'>
): ParallelJoinDecision {
  if (decision.ready && decision.succeeded === undefined) {
    invalid('RUNTIME_INVALID_INPUT', 'A ready custom join decision requires succeeded.');
  }
  const branchIds = new Set(parallel.branches.map((branch) => branch.id));
  if (decision.cancelBranchIds.some((id) => !branchIds.has(id))) {
    invalid('RUNTIME_INVALID_INPUT', 'Custom join returned an unknown branch id.');
  }
  return { ...decision, ...base, cancelBranchIds: [...decision.cancelBranchIds] };
}

function ids(parallel: Readonly<ParallelRunRecord>, status: ParallelBranchStatus): string[] {
  return parallel.branches.filter((branch) => branch.status === status).map((branch) => branch.id);
}

function branchStatusFromEvent(type: FrameworkEventType): ParallelBranchStatus {
  if (type === 'runtime.parallel.branch.completed') return 'completed';
  if (type === 'runtime.parallel.branch.failed') return 'failed';
  if (type === 'runtime.parallel.branch.cancelled') return 'cancelled';
  invalid('RUNTIME_REPLAY_DIVERGENCE', `Unsupported branch terminal event: ${type}`);
}

function advanceBranchSequence(
  branch: ParallelBranchRecord,
  payload: Record<string, unknown>
): void {
  const sequence = requiredPayloadInteger(payload, 'branchSequence');
  if (sequence !== branch.lastSequence + 1) {
    invalid(
      'RUNTIME_REPLAY_DIVERGENCE',
      `Branch sequence gap for ${branch.id}: expected ${branch.lastSequence + 1}, got ${sequence}.`
    );
  }
  branch.lastSequence = sequence;
}

function requireBranch(parallel: ParallelRunRecord, branchId: string): ParallelBranchRecord {
  const branch = parallel.branches.find((item) => item.id === branchId);
  if (!branch) invalid('RUNTIME_INVALID_INPUT', `Parallel branch not found: ${branchId}`);
  return branch;
}

function validateStart(request: StartParallelRunRequest, hasCustomResolver: boolean): void {
  required(request.parallelId, 'parallelId');
  required(request.stateId, 'stateId');
  if (!PARALLEL_JOIN_POLICIES.includes(request.join)) {
    invalid('RUNTIME_INVALID_INPUT', `Unsupported join policy: ${request.join}`);
  }
  if (!PARALLEL_FAILURE_POLICIES.includes(request.failurePolicy)) {
    invalid('RUNTIME_INVALID_INPUT', `Unsupported failure policy: ${request.failurePolicy}`);
  }
  if (!Array.isArray(request.branches) || request.branches.length === 0) {
    invalid('RUNTIME_INVALID_INPUT', 'Parallel execution requires at least one branch.');
  }
  const ids = new Set<string>();
  const childRunIds = new Set<string>();
  for (const branch of request.branches) {
    required(branch.id, 'branch.id');
    required(branch.childRunId, 'branch.childRunId');
    hashCanonicalJson(branch.input);
    if (ids.has(branch.id) || childRunIds.has(branch.childRunId)) {
      invalid('RUNTIME_INVALID_INPUT', 'Parallel branch and child Run ids must be unique.');
    }
    ids.add(branch.id);
    childRunIds.add(branch.childRunId);
  }
  if (
    request.join === 'quorum' &&
    (!Number.isInteger(request.quorum) ||
      (request.quorum ?? 0) < 1 ||
      (request.quorum ?? 0) > request.branches.length)
  ) {
    invalid('RUNTIME_INVALID_INPUT', 'Quorum must be within the branch count.');
  }
  if (request.join !== 'quorum' && request.quorum !== undefined) {
    invalid('RUNTIME_INVALID_INPUT', 'Quorum is only valid for the quorum join policy.');
  }
  if (request.join === 'custom' && !hasCustomResolver) {
    invalid('RUNTIME_INVALID_INPUT', 'Custom join requires a resolver.');
  }
  const concurrency = request.maxConcurrency ?? request.branches.length;
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > request.branches.length) {
    invalid('RUNTIME_INVALID_INPUT', 'maxConcurrency must be within the branch count.');
  }
}

function validateCommand(request: ParallelCommandBase): void {
  required(request.scope.userId, 'scope.userId');
  required(request.scope.runId, 'scope.runId');
  required(request.idempotencyKey, 'idempotencyKey');
  required(request.operationId, 'operationId');
  if (!Number.isInteger(request.expectedLastSequence) || request.expectedLastSequence < 0) {
    invalid('RUNTIME_INVALID_INPUT', 'expectedLastSequence must be non-negative.');
  }
  if (!Number.isInteger(request.fencingToken) || request.fencingToken < 1) {
    invalid('RUNTIME_INVALID_INPUT', 'fencingToken must be positive.');
  }
}

function event(
  request: ParallelCommandBase,
  at: string,
  type: FrameworkEventType,
  ordinal: number,
  payload: Record<string, unknown>,
  branchId?: string
): EventCreateInput {
  return {
    id: `${request.operationId}:${ordinal}:${type}`,
    type,
    version: '1.0.0',
    ...(request.scope.tenantId === undefined ? {} : { tenantId: request.scope.tenantId }),
    userId: request.scope.userId,
    runId: request.scope.runId,
    ...(branchId === undefined ? {} : { branchId }),
    operationId: request.operationId,
    idempotencyKey: request.idempotencyKey,
    ...(request.correlationId === undefined ? {} : { correlationId: request.correlationId }),
    timestamp: at,
    payload: clone(payload),
  };
}

function toCreateInput(item: PersistedFrameworkEvent): EventCreateInput {
  const { sequence, globalSequence, recordedAt, payloadHash, ...input } = item;
  void sequence;
  void globalSequence;
  void recordedAt;
  void payloadHash;
  return clone(input);
}

function payloadRecord(item: PersistedFrameworkEvent): Record<string, unknown> {
  if (!item.payload || typeof item.payload !== 'object' || Array.isArray(item.payload)) {
    invalid('RUNTIME_REPLAY_DIVERGENCE', `Invalid payload for ${item.type}.`);
  }
  return item.payload as Record<string, unknown>;
}

function requiredPayloadString(payload: Record<string, unknown>, key: string): string {
  const value = payload[key];
  if (typeof value !== 'string' || value.length === 0) {
    invalid('RUNTIME_REPLAY_DIVERGENCE', `Missing event payload field: ${key}.`);
  }
  return value;
}

function requiredPayloadInteger(payload: Record<string, unknown>, key: string): number {
  const value = payload[key];
  if (!Number.isInteger(value) || Number(value) < 1) {
    invalid('RUNTIME_REPLAY_DIVERGENCE', `Missing event payload field: ${key}.`);
  }
  return Number(value);
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    invalid('RUNTIME_INVALID_INPUT', `${label} must be a non-empty string.`);
  }
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function invalid(code: string, message: string): never {
  throw new FrameworkError({ code, message });
}
