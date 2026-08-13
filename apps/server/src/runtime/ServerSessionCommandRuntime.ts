import {
  DurableSessionCommandScheduler,
  DurableSessionCommandWorker,
  FrameworkError,
  SESSION_COMMAND_TYPES,
  type ArtifactSessionCommandPayloadStore,
  type ContinueReActCommandPayloadV1,
  type EnqueueSessionCommandRequest,
  type SessionCommandHandlerResult,
  type SessionCommandHandlerContext,
  type SessionCommandClaim,
  type SessionCommandRecord,
  type SessionCommandSchedulerResult,
  type SessionCommandType,
  type SessionCommandWorkerResult,
  type SessionQueue,
  type SessionQueueScope,
  type RuntimeOperationalTelemetry,
} from '@codesoul-co/core';
import type {
  EnqueueReActContinuationCommandRequest,
  ReActContinuationCommandIngress,
} from '@codesoul-co/harness';

export type ServerSessionCommandPayloads = Record<SessionCommandType, unknown>;

export interface ServerSessionCommandInput<
  TPayload,
  TCommandType extends SessionCommandType = SessionCommandType,
> {
  command: Readonly<SessionCommandRecord & { commandType: TCommandType }>;
  payload: TPayload;
  signal: AbortSignal;
  claimToken: string;
  leaseEpoch: number;
}

export interface ServerSessionCommandDefinition<
  TPayload,
  TCommandType extends SessionCommandType = SessionCommandType,
> {
  decode(payload: unknown): TPayload;
  handle(
    input: ServerSessionCommandInput<TPayload, TCommandType>
  ): Promise<SessionCommandHandlerResult>;
}

export type ServerSessionCommandDefinitions<TPayloads extends ServerSessionCommandPayloads> = {
  [TCommandType in SessionCommandType]?: ServerSessionCommandDefinition<
    TPayloads[TCommandType],
    TCommandType
  >;
};

export type EnqueueServerSessionCommandRequest<
  TPayloads extends ServerSessionCommandPayloads,
  TCommandType extends SessionCommandType,
> = Omit<EnqueueSessionCommandRequest, 'commandType' | 'payloadRef' | 'payloadHash'> & {
  commandType: TCommandType;
  payload: TPayloads[TCommandType];
};

export type ServerSessionCommandFailureClassifier = (
  error: unknown,
  command: Readonly<SessionCommandRecord>
) => SessionCommandHandlerResult;

export interface ServerSessionCommandRuntimeOptions<
  TPayloads extends ServerSessionCommandPayloads,
> {
  queue: SessionQueue;
  payloads: ArtifactSessionCommandPayloadStore;
  definitions: ServerSessionCommandDefinitions<TPayloads>;
  workerId: string;
  leaseMs: number;
  pollIntervalMs?: number;
  errorBackoffMs?: number;
  renewalIntervalMs?: number;
  maxHandlerDurationMs?: number;
  shutdownDrainMs?: number;
  now?: () => string;
  operationalTelemetry?: RuntimeOperationalTelemetry;
  monotonicNow?: () => number;
  classifyFailure?: ServerSessionCommandFailureClassifier;
  onResult?: (result: SessionCommandWorkerResult) => void;
  onError?: (error: unknown) => void;
  onLeaseRenewalFailure?: (error: unknown, claim: Readonly<SessionCommandClaim>) => void;
}

/** Owns durable command ingress and the single Server polling loop. */
export class ServerSessionCommandRuntime<TPayloads extends ServerSessionCommandPayloads> {
  private readonly definitions: ServerSessionCommandDefinitions<TPayloads>;
  private readonly worker: DurableSessionCommandWorker;
  private readonly scheduler: DurableSessionCommandScheduler;
  private controller?: AbortController;
  private loop?: Promise<SessionCommandSchedulerResult>;
  private closed = false;

  constructor(private readonly options: ServerSessionCommandRuntimeOptions<TPayloads>) {
    this.definitions = { ...options.definitions };
    this.worker = new DurableSessionCommandWorker({
      queue: options.queue,
      workerId: options.workerId,
      leaseMs: options.leaseMs,
      handlers: this.createHandlers(),
      ...(options.now === undefined ? {} : { now: options.now }),
      ...(options.renewalIntervalMs === undefined
        ? {}
        : { renewalIntervalMs: options.renewalIntervalMs }),
      ...(options.maxHandlerDurationMs === undefined
        ? {}
        : { maxHandlerDurationMs: options.maxHandlerDurationMs }),
      ...(options.onLeaseRenewalFailure === undefined
        ? {}
        : { onLeaseRenewalFailure: options.onLeaseRenewalFailure }),
      ...(options.operationalTelemetry === undefined
        ? {}
        : { operationalTelemetry: options.operationalTelemetry }),
      ...(options.monotonicNow === undefined ? {} : { monotonicNow: options.monotonicNow }),
    });
    this.scheduler = new DurableSessionCommandScheduler({
      worker: this.worker,
      ...(options.pollIntervalMs === undefined ? {} : { pollIntervalMs: options.pollIntervalMs }),
      ...(options.errorBackoffMs === undefined ? {} : { errorBackoffMs: options.errorBackoffMs }),
      ...(options.shutdownDrainMs === undefined
        ? {}
        : { shutdownDrainMs: options.shutdownDrainMs }),
      ...(options.onResult === undefined ? {} : { onResult: options.onResult }),
      ...(options.onError === undefined ? {} : { onError: options.onError }),
    });
  }

  async enqueue<TCommandType extends SessionCommandType>(
    request: EnqueueServerSessionCommandRequest<TPayloads, TCommandType>
  ): Promise<SessionCommandRecord> {
    this.assertOpen();
    const definition = this.requireDefinition(request.commandType);
    const payload = definition.decode(request.payload);
    const reference = await this.options.payloads.put({ commandId: request.id, payload });
    const { payload: _payload, ...command } = request;
    return this.options.queue.enqueue({ ...command, ...reference });
  }

  processNext(
    scope?: SessionQueueScope,
    signal?: AbortSignal
  ): Promise<SessionCommandWorkerResult> {
    this.assertOpen();
    return this.worker.processNext(scope, signal);
  }

  start(scope?: SessionQueueScope): void {
    this.assertOpen();
    if (this.loop) conflict('Server Session Command Runtime is already running');
    const controller = new AbortController();
    this.controller = controller;
    const loop = this.scheduler.run({
      signal: controller.signal,
      ...(scope === undefined ? {} : { scope }),
    });
    this.loop = loop;
    const clearLoop = () => {
      if (this.loop === loop) {
        this.loop = undefined;
        this.controller = undefined;
      }
    };
    void loop.then(clearLoop, clearLoop);
  }

  isRunning(): boolean {
    return this.loop !== undefined;
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    const loop = this.loop;
    this.controller?.abort();
    await loop;
  }

  private createHandlers() {
    return Object.fromEntries(
      SESSION_COMMAND_TYPES.flatMap((commandType) => {
        const definition = this.definitions[commandType];
        return definition
          ? [
              [
                commandType,
                (context: SessionCommandHandlerContext) => this.dispatch(context, definition),
              ],
            ]
          : [];
      })
    );
  }

  private async dispatch(
    context: Readonly<SessionCommandHandlerContext>,
    definition: ServerSessionCommandDefinition<unknown>
  ): Promise<SessionCommandHandlerResult> {
    const { command, signal, claimToken, leaseEpoch } = context;
    try {
      if (!command.payloadRef) corrupt('Session Command does not contain a payloadRef');
      const stored = await this.options.payloads.get({
        payloadRef: command.payloadRef,
        payloadHash: command.payloadHash,
      });
      const payload = definition.decode(stored);
      return await definition.handle({ command, payload, signal, claimToken, leaseEpoch });
    } catch (error) {
      return (this.options.classifyFailure ?? defaultFailure)(error, command);
    }
  }

  private requireDefinition<TCommandType extends SessionCommandType>(
    commandType: TCommandType
  ): ServerSessionCommandDefinition<TPayloads[TCommandType], TCommandType> {
    const definition = this.definitions[commandType];
    if (!definition) {
      throw new FrameworkError({
        code: 'RUNTIME_INVALID_INPUT',
        message: `Session Command type is not enabled by this Server: ${commandType}`,
      });
    }
    return definition;
  }

  private assertOpen(): void {
    if (this.closed) conflict('Server Session Command Runtime is closed');
  }
}

export function createServerReActContinuationCommandIngress<
  TPayloads extends ServerSessionCommandPayloads & {
    continue_react: ContinueReActCommandPayloadV1;
  },
>(runtime: ServerSessionCommandRuntime<TPayloads>): ReActContinuationCommandIngress {
  return {
    enqueue: (request: EnqueueReActContinuationCommandRequest) => runtime.enqueue(request),
  };
}

function defaultFailure(error: unknown): SessionCommandHandlerResult {
  const code = failureCode(error);
  return { disposition: 'failed', rejectionCode: code, deadLetter: true };
}

function failureCode(error: unknown): string {
  if (error instanceof FrameworkError) return error.code.toLowerCase();
  if (error && typeof error === 'object' && 'normalizedError' in error) {
    const normalized = error.normalizedError;
    if (normalized && typeof normalized === 'object' && 'code' in normalized) {
      const code = normalized.code;
      if (typeof code === 'string' && code.length > 0) return code.toLowerCase();
    }
  }
  return 'session_command_handler_unexpected_error';
}

function conflict(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT', message });
}

function corrupt(message: string): never {
  throw new FrameworkError({ code: 'RUNTIME_EVENT_STREAM_CORRUPT', message });
}
