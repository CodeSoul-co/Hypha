import { LocalFilesystemExecutionArtifactStore } from '@hypha/adapters-local';
import {
  ArtifactSessionCommandPayloadStore,
  FrameworkError,
  hashCanonicalJson,
  type ArtifactStoreProvider,
  type ContinueReActCommandPayloadV1,
  type ListSessionCommandsRequest,
  type SessionCommandRecord,
  type SessionCommandType,
  type SessionCommandWorkerResult,
  type SessionQueue,
  type SessionQueueScope,
  type SpecRef,
} from '@hypha/core';
import { validateDomainPackSpec, type DomainPackSpec } from '@hypha/domain';
import { fsmProcessSpecSchema, validateFSMProcessSpec, type FSMProcessSpec } from '@hypha/fsm';
import type { ServerStartRunCommandIngress, StartRunInput } from '../services/EventRuntime';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';
import type { ServerSessionCommandLoop } from './ServerRuntimeWorkerLifecycle';

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
          handle: async ({ command, payload }) => {
            if (!command.targetRunId) invalid('start_run command requires targetRunId');
            const run = await options.startRun(
              { ...payload, userId: command.userId, sessionId: command.sessionId },
              command.targetRunId
            );
            return { disposition: 'applied', resultRunId: run.runId };
          },
        },
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
    return ['start_run'];
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
}

export function createServerProductionSessionCommands(
  options: ServerProductionSessionCommandsOptions
): Promise<ServerProductionSessionCommands> {
  return new ServerProductionSessionCommands(options).initialize();
}

function decodeStartRunCommandPayload(value: unknown): StartRunCommandPayload {
  const payload = record(value);
  if (!payload) invalid('start_run payload must be an object');
  const allowed = new Set(['input', 'agentId', 'workflowRef', 'domainPack', 'fsm', 'metadata']);
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
  if ('metadata' in payload) {
    const metadata = record(payload.metadata);
    if (!metadata) invalid('metadata must be an object');
    decoded.metadata = structuredClone(metadata);
  }
  return decoded;
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

function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

function invalid(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_INVALID_INPUT', message });
}
