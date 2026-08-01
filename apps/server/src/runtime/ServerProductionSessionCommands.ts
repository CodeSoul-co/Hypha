import { LocalFilesystemExecutionArtifactStore } from '@hypha/adapters-local';
import {
  ArtifactSessionCommandPayloadStore,
  FrameworkError,
  hashCanonicalJson,
  type ArtifactStoreProvider,
  type ContinueReActCommandPayloadV1,
  type InitialReActQuantumDescriptor,
  type ListSessionCommandsRequest,
  type SessionCommandRecord,
  type SessionCommandType,
  type SessionCommandWorkerResult,
  type SessionQueue,
  type SessionQueueScope,
  type SpecRef,
} from '@hypha/core';
import {
  LongHorizonReActSupervisor,
  ServerIngressReActContinuationScheduler,
  type ReActContinuationScheduler,
} from '@hypha/harness';
import { reactAgentSpecSchema, type ReActContinuationCheckpoint } from '@hypha/kernel';
import { validateDomainPackSpec, type DomainPackSpec } from '@hypha/domain';
import { fsmProcessSpecSchema, validateFSMProcessSpec, type FSMProcessSpec } from '@hypha/fsm';
import type { ServerStartRunCommandIngress, StartRunInput } from '../services/EventRuntime';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';
import type { ServerSessionCommandLoop } from './ServerRuntimeWorkerLifecycle';
import { createServerReActContinuationDefinition } from './ServerReActContinuationRuntime';
import type { ServerProductionReActExecution } from './ServerProductionReActExecution';

type StartRunCommandPayload = Omit<StartRunInput, 'userId' | 'sessionId'>;

interface ProductionCommandPayloads extends ServerSessionCommandPayloads {
  start_run: StartRunCommandPayload;
  continue_react: ContinueReActCommandPayloadV1;
}

export interface ServerProductionSessionCommandsOptions {
  queue: SessionQueue;
  artifactRoot?: string;
  artifacts?: ArtifactStoreProvider;
  workerId: string;
  leaseMs: number;
  pollIntervalMs: number;
  errorBackoffMs: number;
  renewalIntervalMs: number;
  maxHandlerDurationMs: number;
  shutdownDrainMs: number;
  startRun(input: StartRunInput, runId: string): Promise<{ runId: string }>;
  react?: ServerProductionReActExecution;
  now?: () => string;
  onResult?: (result: SessionCommandWorkerResult) => void;
  onError?: (error: unknown) => void;
}

/** Durable Server command ingress. Only handlers returned by supportedCommandTypes are active. */
export class ServerProductionSessionCommands
  implements ServerSessionCommandLoop, ServerStartRunCommandIngress
{
  private readonly artifacts: ArtifactStoreProvider;
  private readonly runtime: ServerSessionCommandRuntime<ProductionCommandPayloads>;
  private closed = false;

  constructor(private readonly options: ServerProductionSessionCommandsOptions) {
    if (!options.artifacts && !options.artifactRoot?.trim()) {
      invalid('artifactRoot is required when no Artifact Store is injected');
    }
    this.artifacts =
      options.artifacts ??
      new LocalFilesystemExecutionArtifactStore({
        id: 'artifact-store.local-filesystem.session-commands',
        rootPath: options.artifactRoot!,
      });
    const scheduler = options.react ? this.createContinuationScheduler() : undefined;
    const supervisor = scheduler
      ? new LongHorizonReActSupervisor({ runner: unavailableSupervisorRunner(), scheduler })
      : undefined;
    this.runtime = new ServerSessionCommandRuntime<ProductionCommandPayloads>({
      queue: options.queue,
      payloads: new ArtifactSessionCommandPayloadStore({ artifacts: this.artifacts }),
      workerId: options.workerId,
      leaseMs: options.leaseMs,
      pollIntervalMs: options.pollIntervalMs,
      errorBackoffMs: options.errorBackoffMs,
      renewalIntervalMs: options.renewalIntervalMs,
      maxHandlerDurationMs: options.maxHandlerDurationMs,
      shutdownDrainMs: options.shutdownDrainMs,
      definitions: {
        start_run: {
          decode: decodeStartRunCommandPayload,
          handle: async ({ command, payload, signal }) => {
            if (!command.targetRunId) invalid('start_run command requires targetRunId');
            assertActive(signal);
            const run = await options.startRun(
              { ...payload, userId: command.userId, sessionId: command.sessionId },
              command.targetRunId
            );
            assertActive(signal);
            if (options.react && supervisor) {
              const startInput = {
                ...payload,
                userId: command.userId,
                sessionId: command.sessionId,
              };
              let descriptor: InitialReActQuantumDescriptor | null;
              try {
                descriptor = await options.react.prepareInitial(startInput, run.runId, signal);
              } catch (error) {
                if (isRunTimeout(error)) {
                  await options.react.failBeforeQuantum(run.runId, error, signal);
                  return { disposition: 'applied', resultRunId: run.runId };
                }
                throw error;
              }
              if (descriptor) {
                assertActive(signal);
                const checkpoint = await options.react.checkpoints.get(
                  descriptor.runId,
                  descriptor.stepId,
                  descriptor.scopeHash
                );
                assertActive(signal);
                if (checkpoint) {
                  assertActive(signal);
                  await scheduler!.schedule({
                    version: '1.0.0',
                    payload: initialContinuationPayload(descriptor, checkpoint),
                    availableAt: timestamp(options.now?.() ?? new Date().toISOString()),
                  });
                } else {
                  const result = await options.react.executor.runOneQuantum({
                    descriptor,
                    signal,
                  });
                  if (result.react) {
                    assertActive(signal);
                    await coordinateInitialQuantum(supervisor, descriptor, result.react);
                  }
                }
              }
            }
            return { disposition: 'applied', resultRunId: run.runId };
          },
        },
        ...(options.react && supervisor
          ? {
              continue_react: createServerReActContinuationDefinition({
                executor: options.react.executor,
                supervisor,
                checkpoints: options.react.checkpoints,
              }),
            }
          : {}),
      },
      ...(options.now === undefined ? {} : { now: options.now }),
      ...(options.onResult === undefined ? {} : { onResult: options.onResult }),
      ...(options.onError === undefined ? {} : { onError: options.onError }),
    });
  }

  async initialize(): Promise<this> {
    const health = await this.artifacts.health();
    if (health.status !== 'healthy') {
      throw new FrameworkError({
        code: 'RUNTIME_STARTUP_INCOMPLETE',
        message: `Session Command Artifact Store is ${health.status}`,
      });
    }
    return this;
  }

  supportedCommandTypes(): readonly SessionCommandType[] {
    return this.options.react ? ['start_run', 'continue_react'] : ['start_run'];
  }

  async enqueueStartRun(
    input: StartRunInput,
    idempotencyKey: string
  ): Promise<SessionCommandRecord> {
    this.assertOpen();
    const key = idempotencyKey.trim();
    if (!key || key.length > 256) invalid('idempotencyKey must contain 1 to 256 characters');
    const digest = hashCanonicalJson({
      commandType: 'start_run',
      userId: input.userId,
      sessionId: input.sessionId,
      idempotencyKey: key,
    }).slice('sha256:'.length);
    const { userId, sessionId, ...payload } = input;
    return this.runtime.enqueue({
      id: `session-command:${digest}`,
      commandType: 'start_run',
      idempotencyKey: key,
      userId,
      sessionId,
      targetRunId: `run:${digest}`,
      payload,
    });
  }

  listSessionCommands(
    scope: SessionQueueScope,
    options: Omit<ListSessionCommandsRequest, 'scope'> = {}
  ): Promise<SessionCommandRecord[]> {
    this.assertOpen();
    return this.options.queue.list({ scope, ...options });
  }

  processNext(
    scope?: SessionQueueScope,
    signal?: AbortSignal
  ): Promise<SessionCommandWorkerResult> {
    return this.runtime.processNext(scope, signal);
  }

  start(scope?: SessionQueueScope): void {
    this.runtime.start(scope);
  }

  isRunning(): boolean {
    return this.runtime.isRunning();
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    const results = await Promise.allSettled([
      this.runtime.close(),
      this.artifacts.close?.() ?? Promise.resolve(),
    ]);
    const failures = results
      .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
      .map((result) => result.reason);
    if (failures.length > 0) {
      throw new AggregateError(failures, 'Session Command Runtime failed to close');
    }
  }

  private assertOpen(): void {
    if (this.closed) {
      throw new FrameworkError({
        code: 'RUNTIME_SESSION_QUEUE_CONFLICT',
        message: 'Server Session Command Runtime is closed',
      });
    }
  }

  private createContinuationScheduler(): ReActContinuationScheduler {
    return new ServerIngressReActContinuationScheduler({
      ingress: {
        enqueue: (request) => this.runtime.enqueue(request),
      },
      ...(this.options.now === undefined ? {} : { now: this.options.now }),
    });
  }
}

export function createServerProductionSessionCommands(
  options: ServerProductionSessionCommandsOptions
): Promise<ServerProductionSessionCommands> {
  return new ServerProductionSessionCommands(options).initialize();
}

function decodeStartRunCommandPayload(value: unknown): StartRunCommandPayload {
  const payload = record(value);
  if (!payload) invalid('start_run payload must be an object');
  const allowed = new Set([
    'input',
    'agentId',
    'workflowRef',
    'domainPack',
    'fsm',
    'react',
    'metadata',
  ]);
  const unexpected = Object.keys(payload).find((key) => !allowed.has(key));
  if (unexpected) invalid(`start_run payload contains an unknown field: ${unexpected}`);

  const decoded: StartRunCommandPayload = {};
  if ('input' in payload) decoded.input = payload.input;
  if ('agentId' in payload) decoded.agentId = requiredString(payload.agentId, 'agentId');
  if ('workflowRef' in payload) decoded.workflowRef = decodeSpecRef(payload.workflowRef);
  if ('domainPack' in payload) {
    decoded.domainPack = validateDomainPackSpec(payload.domainPack) as DomainPackSpec;
  }
  if ('fsm' in payload) {
    const fsm = fsmProcessSpecSchema.parse(payload.fsm) as FSMProcessSpec;
    validateFSMProcessSpec(fsm);
    decoded.fsm = fsm;
  }
  if ('react' in payload) decoded.react = decodeStartReActPayload(payload.react);
  if ('metadata' in payload) {
    const metadata = record(payload.metadata);
    if (!metadata) invalid('metadata must be an object');
    decoded.metadata = structuredClone(metadata);
  }
  return decoded;
}

function decodeStartReActPayload(value: unknown): NonNullable<StartRunInput['react']> {
  const candidate = record(value);
  if (!candidate) invalid('react must be an object');
  const allowed = new Set([
    'stepId',
    'modelAlias',
    'messages',
    'systemPrompt',
    'agentSpec',
    'budget',
    'deadlineAt',
  ]);
  const unexpected = Object.keys(candidate).find((key) => !allowed.has(key));
  if (unexpected) invalid(`react contains an unknown field: ${unexpected}`);
  if (!Array.isArray(candidate.messages) || candidate.messages.length < 1) {
    invalid('react.messages must be a non-empty array');
  }
  const messages = candidate.messages.map((value, index) => {
    const message = record(value);
    if (!message) invalid(`react.messages[${index}] must be an object`);
    const unknown = Object.keys(message).find(
      (key) => key !== 'role' && key !== 'content' && key !== 'name'
    );
    if (unknown) invalid(`react.messages[${index}] contains an unknown field: ${unknown}`);
    if (!['system', 'user', 'assistant'].includes(String(message.role))) {
      invalid(`react.messages[${index}].role is invalid`);
    }
    if (typeof message.content !== 'string') {
      invalid(`react.messages[${index}].content must be a string`);
    }
    const name = optionalString(message.name, `react.messages[${index}].name`);
    return {
      role: message.role as 'system' | 'user' | 'assistant',
      content: message.content,
      ...(name === undefined ? {} : { name }),
    };
  });
  const budgetRecord = candidate.budget === undefined ? undefined : record(candidate.budget);
  if (candidate.budget !== undefined && !budgetRecord) invalid('react.budget must be an object');
  if (budgetRecord) {
    const unknown = Object.keys(budgetRecord).find(
      (key) => !['iterations', 'modelCalls', 'toolCalls', 'totalTokens'].includes(key)
    );
    if (unknown) invalid(`react.budget contains an unknown field: ${unknown}`);
  }
  const budget = budgetRecord
    ? Object.fromEntries(
        Object.entries(budgetRecord).map(([key, entry]) => {
          if (!Number.isSafeInteger(entry)) invalid(`react.budget.${key} must be an integer`);
          return [key, entry as number];
        })
      )
    : undefined;
  let agentSpec: NonNullable<StartRunInput['react']>['agentSpec'];
  if (candidate.agentSpec !== undefined) {
    const parsed = reactAgentSpecSchema.partial().strict().safeParse(candidate.agentSpec);
    if (!parsed.success) invalid('react.agentSpec does not satisfy the Agent contract');
    agentSpec = parsed.data;
  }
  return {
    messages,
    ...(candidate.stepId === undefined
      ? {}
      : { stepId: requiredString(candidate.stepId, 'react.stepId') }),
    ...(candidate.modelAlias === undefined
      ? {}
      : { modelAlias: requiredString(candidate.modelAlias, 'react.modelAlias') }),
    ...(candidate.systemPrompt === undefined
      ? {}
      : { systemPrompt: stringValue(candidate.systemPrompt, 'react.systemPrompt') }),
    ...(agentSpec === undefined ? {} : { agentSpec: structuredClone(agentSpec) }),
    ...(budget === undefined ? {} : { budget }),
    ...(candidate.deadlineAt === undefined
      ? {}
      : { deadlineAt: requiredString(candidate.deadlineAt, 'react.deadlineAt') }),
  };
}

async function coordinateInitialQuantum(
  supervisor: LongHorizonReActSupervisor,
  descriptor: Readonly<InitialReActQuantumDescriptor>,
  react: Parameters<LongHorizonReActSupervisor['coordinateResult']>[0]['react']
): Promise<void> {
  await supervisor.coordinateResult({
    react,
    continuation: {
      buildPayload: (checkpoint) => initialContinuationPayload(descriptor, checkpoint),
    },
  });
}

function initialContinuationPayload(
  descriptor: Readonly<InitialReActQuantumDescriptor>,
  checkpoint: Readonly<ReActContinuationCheckpoint>
): ContinueReActCommandPayloadV1 {
  return {
    version: '1.0.0',
    runId: descriptor.runId,
    sessionId: descriptor.sessionId,
    userId: descriptor.userId,
    stepId: descriptor.stepId,
    checkpointRef: `react-checkpoint:${checkpoint.runId}:${checkpoint.stepId}:${checkpoint.stepSequence}`,
    checkpointHash: hashCanonicalJson(checkpoint),
    checkpointSequence: checkpoint.stepSequence,
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

function unavailableSupervisorRunner() {
  return {
    run: async (): Promise<never> => {
      throw new FrameworkError({
        code: 'RUNTIME_STATE_EXECUTION_UNAVAILABLE',
        message: 'Production continuation supervisor does not execute an implicit runner loop',
      });
    },
  };
}

function assertActive(signal: AbortSignal): void {
  if (signal.aborted) {
    throw new FrameworkError({
      code: 'RUNTIME_CANCELLED',
      message: 'Session Command lost its execution lease before continuation scheduling',
    });
  }
}

function timestamp(value: string): string {
  if (!Number.isFinite(Date.parse(value))) invalid('Runtime clock must return an ISO date-time');
  return value;
}

function decodeSpecRef(value: unknown): SpecRef {
  const candidate = record(value);
  if (!candidate) invalid('workflowRef must be an object');
  const id = requiredString(candidate.id, 'workflowRef.id');
  const version = optionalString(candidate.version, 'workflowRef.version');
  const revision = optionalString(candidate.revision, 'workflowRef.revision');
  const unknown = Object.keys(candidate).find(
    (key) => key !== 'id' && key !== 'version' && key !== 'revision'
  );
  if (unknown) invalid(`workflowRef contains an unknown field: ${unknown}`);
  return {
    id,
    ...(version === undefined ? {} : { version }),
    ...(revision === undefined ? {} : { revision }),
  };
}

function requiredString(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value.trim()) invalid(`${label} must be a non-empty string`);
  return value.trim();
}

function optionalString(value: unknown, label: string): string | undefined {
  if (value === undefined) return undefined;
  return requiredString(value, label);
}

function stringValue(value: unknown, label: string): string {
  if (typeof value !== 'string') invalid(`${label} must be a string`);
  return value;
}

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}

function isRunTimeout(error: unknown): boolean {
  return error instanceof FrameworkError && error.code === 'RUNTIME_RUN_TIMEOUT';
}
