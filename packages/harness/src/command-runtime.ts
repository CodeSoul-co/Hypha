import {
  createFrameworkEvent,
  InMemoryAppendOnlyEventStore,
  type AppendOnlyEventStore,
  type EventAppendResult,
  type FrameworkEvent,
  type FrameworkEventType,
} from '@hypha/core';
import {
  InMemoryMessageBus,
  validateRuntimeCommand,
  type MessageBus,
  type MessageBusPublishResult,
  type RuntimeCommand,
  type RuntimeCommandType,
  type RuntimeScope,
} from './contracts';
import {
  runtimeSessionLeaseResource,
  type RuntimeLeaseCoordinator,
} from './delivery-runtime';

export type RuntimeCommandQueueEnqueueStatus = 'enqueued' | 'duplicate';

export interface RuntimeCommandQueueItem<TPayload = unknown> {
  command: RuntimeCommand<TPayload>;
  queueKey: string;
  sequence: number;
  enqueuedAt: string;
}

export interface RuntimeCommandQueueEnqueueResult<TPayload = unknown> {
  status: RuntimeCommandQueueEnqueueStatus;
  item: RuntimeCommandQueueItem<TPayload>;
}

export interface RuntimeCommandQueue {
  enqueue<TPayload = unknown>(
    command: RuntimeCommand<TPayload>
  ): Promise<RuntimeCommandQueueEnqueueResult<TPayload>>;
  dequeue(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): Promise<RuntimeCommandQueueItem | null>;
  list(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): Promise<RuntimeCommandQueueItem[]>;
  size(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): Promise<number>;
}

export interface InMemoryRuntimeCommandQueueOptions {
  now?: () => string;
}

export class InMemoryRuntimeCommandQueue implements RuntimeCommandQueue {
  private readonly queues = new Map<string, RuntimeCommandQueueItem[]>();
  private readonly idempotency = new Map<string, RuntimeCommandQueueItem>();
  private sequence = 0;
  private readonly now: () => string;

  constructor(options: InMemoryRuntimeCommandQueueOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async enqueue<TPayload = unknown>(
    command: RuntimeCommand<TPayload>
  ): Promise<RuntimeCommandQueueEnqueueResult<TPayload>> {
    const validated = validateRuntimeCommand(command) as RuntimeCommand<TPayload>;
    const queueKey = runtimeCommandQueueKey(validated.scope);
    const dedupeKey = runtimeCommandDedupeKey(validated);
    const duplicate = this.idempotency.get(dedupeKey);
    if (duplicate) {
      return {
        status: 'duplicate',
        item: duplicate as RuntimeCommandQueueItem<TPayload>,
      };
    }

    this.sequence += 1;
    const item: RuntimeCommandQueueItem<TPayload> = {
      command: validated,
      queueKey,
      sequence: this.sequence,
      enqueuedAt: this.now(),
    };
    const queue = this.queues.get(queueKey) ?? [];
    queue.push(item);
    this.queues.set(queueKey, queue);
    this.idempotency.set(dedupeKey, item);
    return { status: 'enqueued', item };
  }

  async dequeue(
    scope: Pick<RuntimeScope, 'userId' | 'sessionId'>
  ): Promise<RuntimeCommandQueueItem | null> {
    const queueKey = runtimeCommandQueueKey(scope);
    const queue = this.queues.get(queueKey) ?? [];
    const item = queue.shift() ?? null;
    if (queue.length === 0) {
      this.queues.delete(queueKey);
    } else {
      this.queues.set(queueKey, queue);
    }
    return item;
  }

  async list(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): Promise<RuntimeCommandQueueItem[]> {
    return [...(this.queues.get(runtimeCommandQueueKey(scope)) ?? [])];
  }

  async size(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): Promise<number> {
    return (await this.list(scope)).length;
  }
}

export interface RuntimeCommandSubmitResult<TPayload = unknown> {
  queue: RuntimeCommandQueueEnqueueResult<TPayload>;
  enqueueEvent: EventAppendResult;
  commandMessage?: MessageBusPublishResult;
}

export interface RuntimeCommandProcessResult {
  commandId: string;
  commandType: RuntimeCommandType;
  queueKey: string;
  eventAppends: EventAppendResult[];
  eventMessages: MessageBusPublishResult[];
}

export type RuntimeCommandEventMapper = (command: RuntimeCommand) => FrameworkEvent[];

export interface RuntimeCommandProcessorOptions {
  queue?: RuntimeCommandQueue;
  events?: AppendOnlyEventStore;
  bus?: MessageBus;
  leaseCoordinator?: RuntimeLeaseCoordinator;
  workerId?: string;
  leaseTtlMs?: number;
  commandTopic?: string;
  eventTopic?: string;
  now?: () => string;
  mapCommand?: RuntimeCommandEventMapper;
}

export class RuntimeCommandProcessor {
  private readonly queue: RuntimeCommandQueue;
  private readonly events: AppendOnlyEventStore;
  private readonly bus: MessageBus;
  private readonly leaseCoordinator?: RuntimeLeaseCoordinator;
  private readonly workerId: string;
  private readonly leaseTtlMs: number;
  private readonly commandTopic: string;
  private readonly eventTopic: string;
  private readonly now: () => string;
  private readonly mapCommand: RuntimeCommandEventMapper;

  constructor(options: RuntimeCommandProcessorOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.queue = options.queue ?? new InMemoryRuntimeCommandQueue({ now: this.now });
    this.events = options.events ?? new InMemoryAppendOnlyEventStore();
    this.bus = options.bus ?? new InMemoryMessageBus();
    this.leaseCoordinator = options.leaseCoordinator;
    this.workerId = options.workerId ?? 'runtime-command-processor';
    this.leaseTtlMs = options.leaseTtlMs ?? 30000;
    this.commandTopic = options.commandTopic ?? 'runtime.commands';
    this.eventTopic = options.eventTopic ?? 'runtime.events';
    this.mapCommand = options.mapCommand ?? ((command) => mapRuntimeCommandToEvents(command, this.now));
  }

  async submit<TPayload = unknown>(
    command: RuntimeCommand<TPayload>
  ): Promise<RuntimeCommandSubmitResult<TPayload>> {
    const queue = await this.queue.enqueue(command);
    const enqueueEvent = await this.appendLifecycleEvent(queue.item.command, 'runtime.command.enqueued', {
      queueKey: queue.item.queueKey,
      sequence: queue.item.sequence,
      duplicate: queue.status === 'duplicate',
    });
    const commandMessage =
      queue.status === 'enqueued'
        ? await this.bus.publish(
            {
              topic: this.commandTopic,
              payload: {
                commandId: queue.item.command.id,
                commandType: queue.item.command.type,
                queueKey: queue.item.queueKey,
              },
              scope: queue.item.command.scope,
              idempotencyKey: `${runtimeCommandDedupeKey(queue.item.command)}:message`,
              correlationId: queue.item.command.correlationId,
              causationId: queue.item.command.causationId,
            },
            { topic: this.commandTopic }
          )
        : undefined;
    return { queue, enqueueEvent, commandMessage };
  }

  async processNext(
    scope: Pick<RuntimeScope, 'userId' | 'sessionId'>
  ): Promise<RuntimeCommandProcessResult | null> {
    const resourceId = runtimeSessionLeaseResource(scope);
    const lease = this.leaseCoordinator
      ? await this.leaseCoordinator.acquire(resourceId, this.workerId, this.leaseTtlMs)
      : undefined;
    if (lease && lease.status === 'busy') return null;
    try {
      const item = await this.queue.dequeue(scope);
      if (!item) return null;

      const eventAppends: EventAppendResult[] = [];
      for (const event of this.mapCommand(item.command)) {
        eventAppends.push(
          await this.events.appendToStream(event, {
            streamId: event.streamId ?? runtimeCommandStreamId(item.command),
            idempotencyKey:
              event.idempotencyKey ?? `${runtimeCommandDedupeKey(item.command)}:${event.type}`,
          })
        );
      }

      eventAppends.push(
        await this.appendLifecycleEvent(item.command, 'runtime.command.applied', {
          queueKey: item.queueKey,
          sequence: item.sequence,
          eventIds: eventAppends.map((append) => append.event.id),
          fencingToken: lease?.lease?.fencingToken,
        })
      );

      const eventMessages: MessageBusPublishResult[] = [];
      for (const append of eventAppends) {
        if (append.status === 'duplicate') continue;
        eventMessages.push(
          await this.bus.publish(
            {
              topic: this.eventTopic,
              payload: { eventId: append.event.id, eventType: append.event.type },
              scope: item.command.scope,
              idempotencyKey: `${append.event.id}:message`,
              correlationId: item.command.correlationId,
              causationId: item.command.id,
            },
            { topic: this.eventTopic }
          )
        );
      }

      return {
        commandId: item.command.id,
        commandType: item.command.type,
        queueKey: item.queueKey,
        eventAppends,
        eventMessages,
      };
    } finally {
      if (lease?.lease) {
        await this.leaseCoordinator?.release(
          resourceId,
          this.workerId,
          lease.lease.fencingToken
        );
      }
    }
  }

  async drain(
    scope: Pick<RuntimeScope, 'userId' | 'sessionId'>,
    limit = 100
  ): Promise<RuntimeCommandProcessResult[]> {
    const results: RuntimeCommandProcessResult[] = [];
    for (let index = 0; index < limit; index += 1) {
      const result = await this.processNext(scope);
      if (!result) break;
      results.push(result);
    }
    return results;
  }

  private async appendLifecycleEvent(
    command: RuntimeCommand,
    type: FrameworkEventType,
    payload: Record<string, unknown>
  ): Promise<EventAppendResult> {
    const event = createRuntimeCommandEvent(command, type, payload, this.now());
    return this.events.appendToStream(event, {
      streamId: runtimeCommandStreamId(command),
      idempotencyKey: `${runtimeCommandDedupeKey(command)}:${type}`,
    });
  }
}

export function mapRuntimeCommandToEvents(
  command: RuntimeCommand,
  now: () => string = () => new Date().toISOString()
): FrameworkEvent[] {
  const eventType = eventTypeForRuntimeCommand(command.type);
  if (!eventType) return [];
  return [
    createRuntimeCommandEvent(command, eventType, command.payload as Record<string, unknown>, now()),
  ];
}

export function runtimeCommandQueueKey(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): string {
  return `${scope.userId}:${scope.sessionId}`;
}

export function runtimeCommandStreamId(command: RuntimeCommand): string {
  return command.scope.runId || command.scope.sessionId;
}

export function runtimeCommandDedupeKey(command: RuntimeCommand): string {
  return command.idempotencyKey ?? command.id;
}

function createRuntimeCommandEvent(
  command: RuntimeCommand,
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  timestamp: string
): FrameworkEvent {
  return createFrameworkEvent({
    id: `${command.id}:${type}`,
    type,
    runId: command.scope.runId,
    sessionId: command.scope.sessionId,
    workspaceId: command.scope.workspaceId,
    agentId: command.scope.agentId,
    timestamp,
    payload: {
      ...payload,
      commandId: command.id,
      commandType: command.type,
    },
    idempotencyKey: `${runtimeCommandDedupeKey(command)}:${type}`,
    correlationId: command.correlationId,
    causationId: command.causationId,
    metadata: {
      ...command.metadata,
      tenantId: command.scope.tenantId,
      userId: command.scope.userId,
      principalId: command.principal?.principalId,
    },
  });
}

function eventTypeForRuntimeCommand(type: RuntimeCommandType): FrameworkEventType | null {
  switch (type) {
    case 'session.create':
      return 'session.created';
    case 'run.create':
      return 'run.created';
    case 'run.start':
      return 'run.started';
    case 'run.cancel':
      return 'run.cancelled';
    case 'run.resume':
    case 'run.signal':
    case 'activity.complete':
    case 'activity.fail':
    case 'custom':
      return null;
  }
}
