import {
  createFrameworkEvent,
  FrameworkError,
  type FrameworkEvent,
  type TraceRecorder,
} from '@hypha/core';

export type MessageAddressKind = 'runtime' | 'session' | 'workflow' | 'agent' | 'tool' | 'human';

export interface MessageAddress {
  kind: MessageAddressKind;
  id: string;
}

export type MessageStatus =
  | 'queued'
  | 'delivered'
  | 'acknowledged'
  | 'failed'
  | 'dead_lettered';

export interface RuntimeMessage<TPayload = unknown> {
  id: string;
  type: string;
  userId: string;
  sessionId: string;
  runId: string;
  from: MessageAddress;
  to: MessageAddress;
  payload: TPayload;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  correlationId?: string;
  causationId?: string;
  availableAt?: string;
  expiresAt?: string;
  attemptCount: number;
  metadata?: Record<string, unknown>;
}

export interface PublishMessageInput<TPayload = unknown> {
  id: string;
  type: string;
  userId: string;
  sessionId: string;
  runId: string;
  from: MessageAddress;
  to: MessageAddress;
  payload: TPayload;
  stepId?: string;
  agentId?: string;
  fsmState?: string;
  correlationId?: string;
  causationId?: string;
  availableAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface PullMessageFilter {
  userId: string;
  sessionId: string;
  to: MessageAddress;
  runId?: string;
  fsmState?: string;
  now?: string;
}

export interface MessageAckInput {
  id: string;
  userId: string;
  sessionId: string;
  runId?: string;
  handledBy?: MessageAddress;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface MessageFailInput extends MessageAckInput {
  reason?: string;
  deadLetter?: boolean;
}

export interface MessageListFilter {
  userId?: string;
  sessionId?: string;
  runId?: string;
  to?: MessageAddress;
  status?: MessageStatus;
}

export interface MessageBus {
  publish<TPayload = unknown>(input: PublishMessageInput<TPayload>): Promise<RuntimeMessage<TPayload>>;
  pull<TPayload = unknown>(filter: PullMessageFilter): Promise<RuntimeMessage<TPayload> | null>;
  acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null>;
  fail(input: MessageFailInput): Promise<RuntimeMessage | null>;
  list(filter?: MessageListFilter): Promise<RuntimeMessage[]>;
}

export interface InMemoryMessageBusOptions {
  trace?: TraceRecorder;
  now?: () => string;
}

export class InMemoryMessageBus implements MessageBus {
  private readonly messages = new Map<string, RuntimeMessage>();
  private readonly queues = new Map<string, string[]>();
  private readonly now: () => string;

  constructor(private readonly options: InMemoryMessageBusOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async publish<TPayload = unknown>(
    input: PublishMessageInput<TPayload>
  ): Promise<RuntimeMessage<TPayload>> {
    assertRequired(input.id, 'id');
    assertRequired(input.type, 'type');
    assertRequired(input.userId, 'userId');
    assertRequired(input.sessionId, 'sessionId');
    assertRequired(input.runId, 'runId');
    const timestamp = this.now();
    const message: RuntimeMessage<TPayload> = {
      id: input.id,
      type: input.type,
      userId: input.userId,
      sessionId: input.sessionId,
      runId: input.runId,
      from: input.from,
      to: input.to,
      payload: input.payload,
      status: 'queued',
      createdAt: timestamp,
      updatedAt: timestamp,
      stepId: input.stepId,
      agentId: input.agentId,
      fsmState: input.fsmState,
      correlationId: input.correlationId,
      causationId: input.causationId,
      availableAt: input.availableAt,
      expiresAt: input.expiresAt,
      attemptCount: 0,
      metadata: input.metadata,
    };
    if (this.messages.has(message.id)) {
      throw new FrameworkError({
        code: 'MESSAGE_ALREADY_EXISTS',
        message: `Message already exists: ${message.id}`,
        context: { messageId: message.id },
      });
    }
    this.messages.set(message.id, message as RuntimeMessage);
    this.queueFor(message).push(message.id);
    await this.record('message.enqueued', message);
    return message;
  }

  async pull<TPayload = unknown>(
    filter: PullMessageFilter
  ): Promise<RuntimeMessage<TPayload> | null> {
    const queue = this.queues.get(queueKey(filter.userId, filter.sessionId, filter.to)) ?? [];
    const now = filter.now ?? this.now();
    for (let index = 0; index < queue.length; index += 1) {
      const message = this.messages.get(queue[index]);
      if (!message || message.status !== 'queued') continue;
      if (filter.runId && message.runId !== filter.runId) continue;
      if (filter.fsmState && message.fsmState !== filter.fsmState) continue;
      if (message.availableAt && message.availableAt > now) continue;
      if (message.expiresAt && message.expiresAt <= now) {
        await this.markFailed(message, {
          id: message.id,
          userId: message.userId,
          sessionId: message.sessionId,
          runId: message.runId,
          deadLetter: true,
          reason: 'expired',
          timestamp: now,
        });
        continue;
      }
      queue.splice(index, 1);
      const delivered = this.update(message, {
        status: 'delivered',
        updatedAt: now,
        attemptCount: message.attemptCount + 1,
      });
      await this.record('message.delivered', delivered, { recipient: filter.to });
      return delivered as RuntimeMessage<TPayload>;
    }
    this.setQueue(filter.userId, filter.sessionId, filter.to, queue);
    return null;
  }

  async acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null> {
    const message = this.requireOwnedMessage(input.id, input.userId, input.sessionId, input.runId);
    if (!message) return null;
    const acknowledged = this.update(message, {
      status: 'acknowledged',
      updatedAt: input.timestamp ?? this.now(),
      metadata: { ...message.metadata, ...input.metadata },
    });
    await this.record('message.acknowledged', acknowledged, { handledBy: input.handledBy });
    return acknowledged;
  }

  async fail(input: MessageFailInput): Promise<RuntimeMessage | null> {
    const message = this.requireOwnedMessage(input.id, input.userId, input.sessionId, input.runId);
    if (!message) return null;
    return this.markFailed(message, input);
  }

  async list(filter: MessageListFilter = {}): Promise<RuntimeMessage[]> {
    return Array.from(this.messages.values()).filter((message) => {
      if (filter.userId && message.userId !== filter.userId) return false;
      if (filter.sessionId && message.sessionId !== filter.sessionId) return false;
      if (filter.runId && message.runId !== filter.runId) return false;
      if (filter.status && message.status !== filter.status) return false;
      if (filter.to && queueKey(message.userId, message.sessionId, message.to) !== queueKey(message.userId, message.sessionId, filter.to)) {
        return false;
      }
      return true;
    });
  }

  private async markFailed(
    message: RuntimeMessage,
    input: MessageFailInput
  ): Promise<RuntimeMessage> {
    const failed = this.update(message, {
      status: input.deadLetter ? 'dead_lettered' : 'failed',
      updatedAt: input.timestamp ?? this.now(),
      metadata: {
        ...message.metadata,
        ...input.metadata,
        failureReason: input.reason,
      },
    });
    await this.record(input.deadLetter ? 'message.dead_lettered' : 'message.failed', failed, {
      reason: input.reason,
      handledBy: input.handledBy,
    });
    return failed;
  }

  private requireOwnedMessage(
    id: string,
    userId: string,
    sessionId: string,
    runId?: string
  ): RuntimeMessage | null {
    const message = this.messages.get(id);
    if (!message) return null;
    if (message.userId !== userId || message.sessionId !== sessionId) {
      throw new FrameworkError({
        code: 'MESSAGE_SCOPE_MISMATCH',
        message: `Message scope mismatch: ${id}`,
        context: { messageId: id, userId, sessionId },
      });
    }
    if (runId && message.runId !== runId) return null;
    return message;
  }

  private update(message: RuntimeMessage, patch: Partial<RuntimeMessage>): RuntimeMessage {
    const updated = { ...message, ...patch };
    this.messages.set(updated.id, updated);
    return updated;
  }

  private queueFor(message: RuntimeMessage): string[] {
    const key = queueKey(message.userId, message.sessionId, message.to);
    const queue = this.queues.get(key) ?? [];
    this.queues.set(key, queue);
    return queue;
  }

  private setQueue(
    userId: string,
    sessionId: string,
    address: MessageAddress,
    queue: string[]
  ): void {
    const key = queueKey(userId, sessionId, address);
    if (queue.length === 0) {
      this.queues.delete(key);
    } else {
      this.queues.set(key, queue);
    }
  }

  private async record(
    type: FrameworkEvent['type'],
    message: RuntimeMessage,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    await this.options.trace?.record(
      createFrameworkEvent({
        id: `${message.id}:${type}:${message.updatedAt}`,
        type,
        runId: message.runId,
        sessionId: message.sessionId,
        stepId: message.stepId,
        agentId: message.agentId,
        fsmState: message.fsmState,
        timestamp: message.updatedAt,
        payload: { message },
        metadata: {
          ...metadata,
          userId: message.userId,
          messageId: message.id,
          messageType: message.type,
          messageStatus: message.status,
        },
      })
    );
  }
}

function queueKey(userId: string, sessionId: string, address: MessageAddress): string {
  return `${userId}:${sessionId}:${address.kind}:${address.id}`;
}

function assertRequired(value: string | undefined, field: string): void {
  if (value) return;
  throw new FrameworkError({
    code: 'MESSAGE_REQUIRED_FIELD',
    message: `Message requires ${field}`,
    context: { field },
  });
}
