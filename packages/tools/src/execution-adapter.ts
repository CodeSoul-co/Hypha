import { createHash } from 'crypto';
import { z } from 'zod';
import {
  FrameworkError,
  validateExecutionActivityResult,
  validateExecutionDispatchRequest,
  validateExecutionToolBinding,
  type ExecutionActivityResult,
  type ExecutionDispatchRequest,
  type ExecutionToolBinding,
  type NormalizedExecutionError,
} from '@hypha/core';
import { providerHealthSchema, type ProviderHealth, type ToolSource } from './contracts';
import type {
  AdapterCancellationRequest,
  AdapterExecutionRequest,
  ToolAdapter,
  ToolAdapterCapabilities,
  ToolCallContext,
  ToolExecutionEnvelope,
} from './index';

const boundedString = z.string().min(1).max(2_048);
const timestamp = z.string().datetime({ offset: true });
const sha256 = z.string().regex(/^[a-f0-9]{64}$/u);

export const EXECUTION_TOOL_TERMINAL_STATES = [
  'completed',
  'failed',
  'timed_out',
  'cancelled',
  'unknown',
  'quarantined',
] as const;

export type ExecutionToolTerminalState = (typeof EXECUTION_TOOL_TERMINAL_STATES)[number];

export interface ExecutionToolDispatchPlan {
  dispatch: ExecutionDispatchRequest;
  expectedRevision: number;
  approvalExpiresAt?: string;
}

export interface ExecutionToolDispatchFactoryRequest<
  TInput,
> extends AdapterExecutionRequest<TInput> {
  normalizedInput: TInput;
  inputHash: string;
  signal: AbortSignal;
}

export type ExecutionToolDispatchFactory<TInput = unknown> = (
  request: ExecutionToolDispatchFactoryRequest<TInput>
) => Promise<ExecutionToolDispatchPlan> | ExecutionToolDispatchPlan;

export interface ExecutionToolRuntimeRequest<TInput = unknown> {
  dispatch: ExecutionDispatchRequest;
  normalizedInput: TInput;
  inputHash: string;
  expectedRevision: number;
}

export interface ExecutionToolRuntimeScope {
  principalId: string;
  userId?: string;
  tenantId?: string;
  sessionId?: string;
  runId: string;
  workspaceId: string;
}

export interface ExecutionToolEvidence {
  kind: 'authorization' | 'event' | 'receipt' | 'artifact' | 'snapshot' | 'trace';
  ref: string;
  hash?: string;
  recordedAt?: string;
}

export interface ExecutionToolProvenance {
  providerId: string;
  authorizationEvidenceId: string;
  authorizationVerificationRef: string;
  terminalEventId: string;
  receivedAt: string;
  resultHash: string;
  receiptRef?: string;
}

export interface ExecutionToolRuntimeResult {
  activityResult: ExecutionActivityResult;
  scope: ExecutionToolRuntimeScope;
  toolId: string;
  toolRevision: string;
  contractSnapshotRef: string;
  toolOperation: ExecutionDispatchRequest['binding']['operation'];
  operationId: string;
  inputHash: string;
  revision: number;
  fencingToken: number;
  terminalState: ExecutionToolTerminalState;
  provenance: ExecutionToolProvenance;
  evidence: ExecutionToolEvidence[];
}

export interface ExecutionToolObservation extends ExecutionToolRuntimeResult {
  evidenceHash: string;
}

export interface ExecutionToolRuntimePort {
  execute(request: ExecutionToolRuntimeRequest, signal: AbortSignal): Promise<unknown>;
  health(signal: AbortSignal): Promise<unknown>;
  close?(): Promise<void>;
}

export interface ExecutionToolAdapterOptions {
  toolRevision: string;
  binding: ExecutionToolBinding;
  providerId: string;
  healthTimeoutMs?: number;
  maxEvidenceBytes?: number;
  now?: () => string;
}

const executionToolRuntimeResultSchema = z
  .object({
    activityResult: z.unknown(),
    scope: z
      .object({
        principalId: boundedString,
        userId: boundedString.optional(),
        tenantId: boundedString.optional(),
        sessionId: boundedString.optional(),
        runId: boundedString,
        workspaceId: boundedString,
      })
      .strict(),
    toolId: boundedString,
    toolRevision: boundedString,
    contractSnapshotRef: boundedString,
    toolOperation: z.enum(['file_read', 'file_write', 'command', 'sandbox', 'artifact']),
    operationId: boundedString,
    inputHash: sha256,
    revision: z.number().int().positive(),
    fencingToken: z.number().int().positive(),
    terminalState: z.enum(EXECUTION_TOOL_TERMINAL_STATES),
    provenance: z
      .object({
        providerId: boundedString,
        authorizationEvidenceId: boundedString,
        authorizationVerificationRef: boundedString,
        terminalEventId: boundedString,
        receivedAt: timestamp,
        resultHash: sha256,
        receiptRef: boundedString.optional(),
      })
      .strict(),
    evidence: z
      .array(
        z
          .object({
            kind: z.enum(['authorization', 'event', 'receipt', 'artifact', 'snapshot', 'trace']),
            ref: boundedString,
            hash: sha256.optional(),
            recordedAt: timestamp.optional(),
          })
          .strict()
      )
      .min(1)
      .max(32),
  })
  .strict();

const terminalStatusMap: Record<ExecutionToolTerminalState, ExecutionActivityResult['status']> = {
  completed: 'completed',
  failed: 'failed',
  timed_out: 'timeout',
  cancelled: 'cancelled',
  unknown: 'unknown',
  quarantined: 'unknown',
};

export class ExecutionToolTerminalError extends FrameworkError {
  readonly terminalState: Exclude<ExecutionToolTerminalState, 'completed'>;
  readonly executionError: NormalizedExecutionError;
  readonly observation: ExecutionToolObservation;

  constructor(observation: ExecutionToolObservation) {
    const terminalState = observation.terminalState as Exclude<
      ExecutionToolTerminalState,
      'completed'
    >;
    const executionError = observation.activityResult.error!;
    super({
      code: terminalErrorCode(terminalState),
      message: executionError.message,
      context: { terminalState, executionError, observation },
    });
    this.name = 'ExecutionToolTerminalError';
    this.terminalState = terminalState;
    this.executionError = executionError;
    this.observation = observation;
  }
}

/**
 * Recomputes the normalized input digest at the Execution boundary. Runtime-port
 * implementations must call this validator before delegating to a provider.
 */
export function validateExecutionToolRuntimeRequest<TInput>(
  input: ExecutionToolRuntimeRequest<TInput>
): ExecutionToolRuntimeRequest<TInput> {
  const dispatch = validateExecutionDispatchRequest(input.dispatch);
  const recomputedHash = hashExecutionToolInput(input.normalizedInput);
  if (input.inputHash !== recomputedHash || dispatch.authorization.inputHash !== recomputedHash) {
    throw new FrameworkError({
      code: 'EXECUTION_INPUT_HASH_MISMATCH',
      message: 'Execution input hash does not match the bound normalized Tool input.',
      context: {
        callerInputHash: input.inputHash,
        authorizationInputHash: dispatch.authorization.inputHash,
        recomputedInputHash: recomputedHash,
      },
    });
  }
  if (!Number.isInteger(input.expectedRevision) || input.expectedRevision < 1) {
    throw new FrameworkError({
      code: 'EXECUTION_REVISION_CONFLICT',
      message: 'Execution expectedRevision must be a positive integer.',
    });
  }
  return { ...input, dispatch };
}

export function normalizeExecutionToolInput<TInput>(input: TInput): TInput {
  return normalizeJson(input, new WeakSet<object>(), true) as TInput;
}

export function hashExecutionToolInput(input: unknown): string {
  return createHash('sha256').update(canonicalJson(input)).digest('hex');
}

export class ExecutionToolAdapter<TInput = unknown> implements ToolAdapter<
  TInput,
  ExecutionToolObservation
> {
  readonly source: ToolSource = 'execution';
  private readonly active = new Map<string, AbortController>();
  private readonly now: () => string;
  private readonly healthTimeoutMs: number;
  private readonly maxEvidenceBytes: number;

  constructor(
    readonly id: string,
    private readonly port: ExecutionToolRuntimePort,
    private readonly createDispatch: ExecutionToolDispatchFactory<TInput>,
    private readonly options: ExecutionToolAdapterOptions
  ) {
    if (!options.toolRevision) {
      throw new FrameworkError({
        code: 'EXECUTION_INVALID_REQUEST',
        message: 'Execution Tool adapters require an expected Tool revision.',
      });
    }
    if (!options.providerId) {
      throw new FrameworkError({
        code: 'EXECUTION_INVALID_REQUEST',
        message: 'Execution Tool adapters require an expected provider identity.',
      });
    }
    const binding = validateExecutionToolBinding(options.binding);
    if (binding.toolId !== id) {
      throw new FrameworkError({
        code: 'EXECUTION_INVALID_REQUEST',
        message: 'Execution Tool adapter binding must match its Tool id.',
      });
    }
    this.now = options.now ?? (() => new Date().toISOString());
    this.healthTimeoutMs = options.healthTimeoutMs ?? 5_000;
    this.maxEvidenceBytes = options.maxEvidenceBytes ?? 64 * 1_024;
  }

  async capabilities(): Promise<ToolAdapterCapabilities> {
    return { execute: true, cancel: true, health: true, close: true };
  }

  async execute(
    request: AdapterExecutionRequest<TInput>
  ): Promise<ToolExecutionEnvelope<ExecutionToolObservation>> {
    const invocationId = request.context.invocationId;
    if (!invocationId) {
      throw executionError('EXECUTION_INVALID_REQUEST', 'Execution Tool invocationId is required.');
    }
    if (this.active.has(invocationId)) {
      throw executionError(
        'TOOL_INVOCATION_STATE_CONFLICT',
        `Execution invocation is already active: ${invocationId}`
      );
    }

    const controller = new AbortController();
    const unlinkSignals = linkSignals(controller, [
      request.context.signal,
      request.context.abortSignal,
    ]);
    this.active.set(invocationId, controller);
    try {
      assertNotAborted(controller.signal);
      assertNotExpired(request.context.deadlineAt, this.now(), 'Execution Tool deadline expired.');
      const normalizedInput = normalizeExecutionToolInput(request.input);
      const inputHash = hashExecutionToolInput(normalizedInput);
      const plan = await abortable(
        Promise.resolve(
          this.createDispatch({
            ...request,
            input: normalizedInput,
            normalizedInput,
            inputHash,
            signal: controller.signal,
          })
        ),
        controller.signal
      );
      assertNotAborted(controller.signal);
      const runtimeRequest = validateExecutionToolRuntimeRequest({
        dispatch: plan.dispatch,
        normalizedInput,
        inputHash,
        expectedRevision: plan.expectedRevision,
      });
      this.assertDispatchMatchesInvocation(request.context, invocationId, runtimeRequest, plan);
      const rawResult = await abortable(
        this.port.execute(runtimeRequest, controller.signal),
        controller.signal
      );
      const result = this.validateRuntimeResult(rawResult, runtimeRequest, request.context);
      const observation: ExecutionToolObservation = {
        ...result,
        evidenceHash: hashExecutionToolInput(result.evidence),
      };
      if (observation.terminalState !== 'completed') {
        throw new ExecutionToolTerminalError(observation);
      }
      return {
        kind: 'tool_execution_envelope',
        output: observation,
        artifactRefs: observation.activityResult.artifactRefs,
        content: observation.activityResult.artifactRefs?.map((artifactRef) => ({
          type: 'artifact' as const,
          artifactRef,
        })),
        externalReceipt: observation.provenance.receiptRef
          ? {
              provider: observation.provenance.providerId,
              receiptId: observation.provenance.receiptRef,
              status: 'committed',
              committedAt: observation.provenance.receivedAt,
              metadata: {
                activityId: observation.activityResult.activityId,
                terminalEventId: observation.provenance.terminalEventId,
              },
            }
          : undefined,
        metadata: {
          terminalState: observation.terminalState,
          evidenceHash: observation.evidenceHash,
          evidenceCount: observation.evidence.length,
        },
      };
    } finally {
      unlinkSignals();
      this.active.delete(invocationId);
    }
  }

  async cancel(request: AdapterCancellationRequest): Promise<void> {
    this.active.get(request.invocationId)?.abort(request.reason ?? 'Tool invocation cancelled.');
  }

  async health(): Promise<ProviderHealth> {
    const startedAt = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(`Execution health check timed out after ${this.healthTimeoutMs}ms.`),
      this.healthTimeoutMs
    );
    try {
      const health = providerHealthSchema.parse(
        await abortable(this.port.health(controller.signal), controller.signal)
      );
      return {
        ...health,
        latencyMs: health.latencyMs ?? Date.now() - startedAt,
        details: { ...health.details, adapter: this.id, activeExecutions: this.active.size },
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt: this.now(),
        latencyMs: Date.now() - startedAt,
        message: error instanceof Error ? error.message : String(error),
        details: {
          adapter: this.id,
          activeExecutions: this.active.size,
          timedOut: controller.signal.aborted,
        },
      };
    } finally {
      clearTimeout(timeout);
    }
  }

  async close(): Promise<void> {
    for (const controller of this.active.values()) {
      controller.abort('Execution Tool adapter closed.');
    }
    this.active.clear();
    await this.port.close?.();
  }

  private assertDispatchMatchesInvocation(
    context: ToolCallContext,
    invocationId: string,
    runtimeRequest: ExecutionToolRuntimeRequest<TInput>,
    plan: ExecutionToolDispatchPlan
  ): void {
    const { dispatch } = runtimeRequest;
    const principal = dispatch.activity.request.principal;
    const commandScope = dispatch.activity.request as {
      userId?: string;
      tenantId?: string;
      sessionId?: string;
    };
    const expectedPrincipalId = context.principal?.principalId ?? context.principal?.id;
    const expectedUserId = context.userId ?? context.principal?.userId;
    const expectedTenantId = context.tenantId ?? context.principal?.tenantId;
    const expectedWorkspaceId = context.workspaceId ?? context.principal?.workspaceId;
    const expectedSessionId = context.sessionId;
    const requestUserId = commandScope.userId ?? principal.userId;
    const requestTenantId = commandScope.tenantId ?? principal.tenantId;
    const contextDeadline = context.deadlineAt ? Date.parse(context.deadlineAt) : undefined;
    const dispatchDeadline = dispatch.activity.deadlineAt
      ? Date.parse(dispatch.activity.deadlineAt)
      : undefined;
    const mismatches = [
      dispatch.binding.toolId !== this.id && 'binding.toolId',
      hashExecutionToolInput(dispatch.binding) !== hashExecutionToolInput(this.options.binding) &&
        'binding',
      dispatch.authorization.toolId !== this.id && 'authorization.toolId',
      dispatch.authorization.invocationId !== invocationId && 'authorization.invocationId',
      dispatch.activity.runId !== context.runId && 'activity.runId',
      dispatch.authorization.runId !== context.runId && 'authorization.runId',
      dispatch.activity.workspaceId !== expectedWorkspaceId && 'activity.workspaceId',
      principal.principalId !== expectedPrincipalId && 'principal.principalId',
      requestUserId !== expectedUserId && 'request.userId',
      requestTenantId !== expectedTenantId && 'request.tenantId',
      commandScope.sessionId !== expectedSessionId && 'request.sessionId',
      dispatch.activity.operationId !== context.operationId && 'activity.operationId',
      dispatch.authorization.toolRevision !== this.options.toolRevision &&
        'authorization.toolRevision',
      dispatch.authorization.contractSnapshotRef !== context.contractSnapshotRef &&
        'authorization.contractSnapshotRef',
      contextDeadline !== undefined &&
        (dispatchDeadline === undefined || dispatchDeadline > contextDeadline) &&
        'activity.deadlineAt',
    ].filter(Boolean);
    if (mismatches.length > 0) {
      throw executionError(
        'EXECUTION_POLICY_DENIED',
        'Execution dispatch does not match the governed Tool invocation.',
        { invocationId, mismatches }
      );
    }
    assertNotExpired(
      dispatch.activity.deadlineAt,
      this.now(),
      'Execution activity deadline expired.'
    );
    assertNotExpired(
      dispatch.authorization.expiresAt,
      this.now(),
      'Execution authorization evidence expired.',
      'EXECUTION_AUTHORIZATION_EXPIRED'
    );
    if (!dispatch.authorization.expiresAt) {
      throw executionError(
        'EXECUTION_POLICY_DENIED',
        'Execution authorization evidence must declare an expiry.'
      );
    }
    if (dispatch.riskAssessment.requiresApproval) {
      if (!plan.approvalExpiresAt) {
        throw executionError(
          'EXECUTION_APPROVAL_EXPIRED',
          'Approved Execution dispatch must declare approval expiry.'
        );
      }
      assertNotExpired(
        plan.approvalExpiresAt,
        this.now(),
        'Execution approval expired.',
        'EXECUTION_APPROVAL_EXPIRED'
      );
    }
  }

  private validateRuntimeResult(
    rawResult: unknown,
    request: ExecutionToolRuntimeRequest<TInput>,
    context: ToolCallContext
  ): ExecutionToolRuntimeResult {
    let parsed: ExecutionToolRuntimeResult;
    try {
      const envelope = executionToolRuntimeResultSchema.parse(rawResult);
      parsed = {
        ...envelope,
        activityResult: validateExecutionActivityResult(envelope.activityResult),
      } as ExecutionToolRuntimeResult;
    } catch (cause) {
      throw executionError(
        'EXECUTION_RESULT_INVALID',
        'Execution runtime returned a malformed result.',
        undefined,
        cause
      );
    }
    const dispatch = request.dispatch;
    const principal = dispatch.activity.request.principal;
    const commandScope = dispatch.activity.request as {
      userId?: string;
      tenantId?: string;
      sessionId?: string;
    };
    const requestUserId = commandScope.userId ?? principal.userId;
    const requestTenantId = commandScope.tenantId ?? principal.tenantId;
    const mismatches = [
      parsed.activityResult.activityId !== dispatch.activity.activityId &&
        'activityResult.activityId',
      parsed.scope.principalId !== principal.principalId && 'scope.principalId',
      parsed.scope.userId !== requestUserId && 'scope.userId',
      parsed.scope.tenantId !== requestTenantId && 'scope.tenantId',
      parsed.scope.sessionId !== commandScope.sessionId && 'scope.sessionId',
      parsed.scope.runId !== dispatch.activity.runId && 'scope.runId',
      parsed.scope.workspaceId !== dispatch.activity.workspaceId && 'scope.workspaceId',
      parsed.toolId !== dispatch.binding.toolId && 'toolId',
      parsed.toolRevision !== dispatch.authorization.toolRevision && 'toolRevision',
      parsed.contractSnapshotRef !== dispatch.authorization.contractSnapshotRef &&
        'contractSnapshotRef',
      parsed.toolOperation !== dispatch.binding.operation && 'toolOperation',
      parsed.operationId !== dispatch.activity.operationId && 'operationId',
      parsed.inputHash !== request.inputHash && 'inputHash',
      parsed.revision !== request.expectedRevision && 'revision',
      parsed.fencingToken !== dispatch.activity.fencingToken && 'fencingToken',
      parsed.activityResult.status !== terminalStatusMap[parsed.terminalState] && 'terminalState',
      parsed.provenance.providerId !== this.options.providerId && 'provenance.providerId',
      parsed.provenance.authorizationEvidenceId !== dispatch.authorization.id &&
        'provenance.authorizationEvidenceId',
      parsed.provenance.resultHash !== hashExecutionToolInput(parsed.activityResult) &&
        'provenance.resultHash',
      !parsed.activityResult.eventIds.includes(parsed.provenance.terminalEventId) &&
        'provenance.terminalEventId',
      !parsed.evidence.some(
        (item) =>
          item.kind === 'authorization' &&
          item.ref === parsed.provenance.authorizationVerificationRef
      ) && 'evidence.authorization',
      !parsed.evidence.some(
        (item) => item.kind === 'event' && item.ref === parsed.provenance.terminalEventId
      ) && 'evidence.terminalEvent',
      parsed.terminalState === 'completed' &&
        !parsed.activityResult.executionId &&
        'activityResult.executionId',
      parsed.terminalState === 'completed' &&
        !parsed.provenance.receiptRef &&
        'provenance.receiptRef',
      parsed.provenance.receiptRef &&
        !parsed.evidence.some(
          (item) => item.kind === 'receipt' && item.ref === parsed.provenance.receiptRef
        ) &&
        'evidence.receipt',
      context.contractSnapshotRef !== parsed.contractSnapshotRef && 'context.contractSnapshotRef',
    ].filter(Boolean);
    if (mismatches.length > 0) {
      throw executionError(
        'EXECUTION_RESULT_MISMATCH',
        'Execution runtime result is not bound to the dispatched invocation.',
        { activityId: dispatch.activity.activityId, mismatches }
      );
    }
    if (Buffer.byteLength(canonicalJson(parsed.evidence), 'utf8') > this.maxEvidenceBytes) {
      throw executionError(
        'EXECUTION_RESULT_INVALID',
        'Execution evidence exceeds the configured bounded observation size.',
        { maxEvidenceBytes: this.maxEvidenceBytes }
      );
    }
    return parsed;
  }
}

function terminalErrorCode(state: Exclude<ExecutionToolTerminalState, 'completed'>): string {
  return {
    failed: 'EXECUTION_FAILED',
    timed_out: 'EXECUTION_TIMEOUT',
    cancelled: 'EXECUTION_CANCELLED',
    unknown: 'EXECUTION_RESULT_UNKNOWN',
    quarantined: 'EXECUTION_RESULT_QUARANTINED',
  }[state];
}

function executionError(
  code: string,
  message: string,
  context?: Record<string, unknown>,
  cause?: unknown
): FrameworkError {
  return new FrameworkError({ code, message, context, cause });
}

function assertNotExpired(
  value: string | undefined,
  now: string,
  message: string,
  code = 'EXECUTION_TIMEOUT'
): void {
  if (value && Date.parse(value) <= Date.parse(now)) {
    throw executionError(code, message, { expiresAt: value, now });
  }
}

function assertNotAborted(signal: AbortSignal): void {
  if (signal.aborted) {
    throw executionError(
      'EXECUTION_CANCELLED',
      String(signal.reason ?? 'Execution Tool invocation cancelled.')
    );
  }
}

function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) {
    return Promise.reject(
      executionError('EXECUTION_CANCELLED', String(signal.reason ?? 'Execution cancelled.'))
    );
  }
  return new Promise<T>((resolve, reject) => {
    const abort = (): void => {
      reject(
        executionError('EXECUTION_CANCELLED', String(signal.reason ?? 'Execution cancelled.'))
      );
    };
    signal.addEventListener('abort', abort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener('abort', abort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener('abort', abort);
        reject(error);
      }
    );
  });
}

function linkSignals(
  controller: AbortController,
  signals: Array<AbortSignal | undefined>
): () => void {
  const removers: Array<() => void> = [];
  for (const signal of new Set(signals.filter(Boolean) as AbortSignal[])) {
    const abort = (): void => controller.abort(signal.reason);
    if (signal.aborted) {
      abort();
    } else {
      signal.addEventListener('abort', abort, { once: true });
      removers.push(() => signal.removeEventListener('abort', abort));
    }
  }
  return () => removers.forEach((remove) => remove());
}

function canonicalJson(value: unknown): string {
  return JSON.stringify(normalizeJson(value, new WeakSet<object>(), false));
}

function normalizeJson(value: unknown, seen: WeakSet<object>, strict: boolean): unknown {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return value;
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (value === undefined && !strict) return undefined;
  if (!value || typeof value !== 'object') {
    throw executionError(
      'EXECUTION_INVALID_REQUEST',
      'Execution Tool input must be JSON-compatible.'
    );
  }
  if (seen.has(value)) {
    throw executionError('EXECUTION_INVALID_REQUEST', 'Execution Tool input must not be circular.');
  }
  seen.add(value);
  if (Array.isArray(value)) {
    const normalized = value.map((item) => normalizeJson(item, seen, strict));
    seen.delete(value);
    return Object.freeze(normalized);
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) {
    throw executionError(
      'EXECUTION_INVALID_REQUEST',
      'Execution Tool input must contain only plain JSON objects.'
    );
  }
  const normalized: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>).sort()) {
    if (key === '__proto__' || key === 'prototype' || key === 'constructor') {
      throw executionError('EXECUTION_INVALID_REQUEST', `Unsafe Execution Tool input key: ${key}`);
    }
    normalized[key] = normalizeJson((value as Record<string, unknown>)[key], seen, strict);
  }
  seen.delete(value);
  return Object.freeze(normalized);
}
