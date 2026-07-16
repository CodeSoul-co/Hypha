import { z, type ZodType } from 'zod';
import {
  specMetadataSchema,
  versionedSpecSchema,
} from '@hypha/core';

export interface RuntimeScope {
  tenantId?: string;
  userId: string;
  workspaceId?: string;
  sessionId: string;
  runId: string;
  agentId?: string;
}

export type RuntimePrincipalType = 'user' | 'agent' | 'service' | 'system';

export interface RuntimePrincipal {
  principalId: string;
  type: RuntimePrincipalType;
  tenantId?: string;
  userId?: string;
  agentId?: string;
  roles?: string[];
  permissionScopes: string[];
  metadata?: Record<string, unknown>;
}

export type RuntimeActivityType =
  | 'model'
  | 'tool'
  | 'memory'
  | 'execution'
  | 'human'
  | 'custom';

export type RuntimeActivityStatus =
  | 'completed'
  | 'failed'
  | 'waiting'
  | 'cancelled'
  | 'unknown';

export interface NormalizedRuntimeActivityError {
  code: string;
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
  causeRef?: string;
}

export interface RuntimeActivityRequest<TInput = unknown> {
  activityId: string;
  activityType: RuntimeActivityType;
  scope: RuntimeScope;
  stateAttemptId: string;
  operationId: string;
  input: TInput;
  deadlineAt?: string;
  idempotencyKey?: string;
  fencingToken: number;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeActivityResult<TOutput = unknown> {
  activityId: string;
  status: RuntimeActivityStatus;
  output?: TOutput;
  artifactRefs?: string[];
  eventIds: string[];
  retryable?: boolean;
  error?: NormalizedRuntimeActivityError;
  metadata?: Record<string, unknown>;
}

export interface RuntimeActivityPort<TInput = unknown, TOutput = unknown> {
  execute(request: RuntimeActivityRequest<TInput>): Promise<RuntimeActivityResult<TOutput>>;
  cancel(activityId: string, reason?: string): Promise<void>;
  reconcile(activityId: string): Promise<RuntimeActivityResult<TOutput>>;
}

export type RuntimeStateAttemptStatus =
  | 'started'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface RuntimeStateAttempt {
  id: string;
  scope: RuntimeScope;
  fsmProcessId: string;
  stateId: string;
  attempt: number;
  status: RuntimeStateAttemptStatus;
  fencingToken: number;
  startedAt: string;
  completedAt?: string;
  activityIds?: string[];
  metadata?: Record<string, unknown>;
}

export type RuntimeCommandType =
  | 'session.create'
  | 'run.create'
  | 'run.start'
  | 'run.cancel'
  | 'run.resume'
  | 'run.signal'
  | 'activity.complete'
  | 'activity.fail'
  | 'custom';

export interface RuntimeCommand<TPayload = unknown> {
  id: string;
  type: RuntimeCommandType;
  scope: RuntimeScope;
  payload: TPayload;
  principal?: RuntimePrincipal;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  createdAt: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export type MessageDeliverySemantics = 'at_most_once' | 'at_least_once';

export type MessageBusEngine = 'memory' | 'redis' | 'kafka' | 'custom';

export interface MessageBusSpec {
  id: string;
  version: string;
  name?: string;
  description?: string;
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  engine: MessageBusEngine;
  delivery: MessageDeliverySemantics;
  supportsOrdering?: boolean;
  supportsDeduplication?: boolean;
  supportsDeadLetter?: boolean;
  topics?: string[];
}

export interface MessageBusMessage<TPayload = unknown> {
  id: string;
  topic: string;
  payload: TPayload;
  scope?: RuntimeScope;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  publishedAt: string;
  availableAt?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface MessageBusPublishOptions {
  topic?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  delayUntil?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface MessageBusPublishResult {
  messageId: string;
  topic: string;
  duplicate: boolean;
}

export interface MessageBusSubscription {
  id: string;
  topic: string;
  unsubscribe(): Promise<void>;
}

export type MessageBusHandler<TPayload = unknown> = (
  message: MessageBusMessage<TPayload>
) => Promise<void> | void;

export interface MessageBus {
  publish<TPayload = unknown>(
    message: Omit<MessageBusMessage<TPayload>, 'id' | 'publishedAt'> &
      Partial<Pick<MessageBusMessage<TPayload>, 'id' | 'publishedAt'>>,
    options?: MessageBusPublishOptions
  ): Promise<MessageBusPublishResult>;
  subscribe<TPayload = unknown>(
    topic: string,
    handler: MessageBusHandler<TPayload>
  ): Promise<MessageBusSubscription>;
  list(topic?: string): Promise<MessageBusMessage[]>;
}

export class InMemoryMessageBus implements MessageBus {
  private readonly messages: MessageBusMessage[] = [];
  private readonly subscribers = new Map<string, Map<string, MessageBusHandler>>();
  private readonly idempotency = new Map<string, string>();
  private sequence = 0;

  async publish<TPayload = unknown>(
    message: Omit<MessageBusMessage<TPayload>, 'id' | 'publishedAt'> &
      Partial<Pick<MessageBusMessage<TPayload>, 'id' | 'publishedAt'>>,
    options: MessageBusPublishOptions = {}
  ): Promise<MessageBusPublishResult> {
    const topic = options.topic ?? message.topic;
    const idempotencyKey = options.idempotencyKey ?? message.idempotencyKey;
    const dedupeKey = idempotencyKey ? `${topic}:${idempotencyKey}` : undefined;
    if (dedupeKey) {
      const existing = this.idempotency.get(dedupeKey);
      if (existing) {
        return { messageId: existing, topic, duplicate: true };
      }
    }

    const stored: MessageBusMessage<TPayload> = {
      ...message,
      id: message.id ?? this.nextMessageId(topic),
      topic,
      idempotencyKey,
      correlationId: options.correlationId ?? message.correlationId,
      causationId: options.causationId ?? message.causationId,
      publishedAt: message.publishedAt ?? new Date().toISOString(),
      availableAt: options.delayUntil ?? message.availableAt,
      expiresAt: options.expiresAt ?? message.expiresAt,
      metadata: { ...message.metadata, ...options.metadata },
    };
    this.messages.push(stored);
    if (dedupeKey) this.idempotency.set(dedupeKey, stored.id);

    const subscribers = this.subscribers.get(topic);
    if (subscribers) {
      for (const handler of subscribers.values()) {
        await handler(stored);
      }
    }

    return { messageId: stored.id, topic, duplicate: false };
  }

  async subscribe<TPayload = unknown>(
    topic: string,
    handler: MessageBusHandler<TPayload>
  ): Promise<MessageBusSubscription> {
    const id = this.nextSubscriptionId(topic);
    const topicSubscribers = this.subscribers.get(topic) ?? new Map<string, MessageBusHandler>();
    topicSubscribers.set(id, handler as MessageBusHandler);
    this.subscribers.set(topic, topicSubscribers);
    return {
      id,
      topic,
      unsubscribe: async () => {
        topicSubscribers.delete(id);
        if (topicSubscribers.size === 0) this.subscribers.delete(topic);
      },
    };
  }

  async list(topic?: string): Promise<MessageBusMessage[]> {
    return topic
      ? this.messages.filter((message) => message.topic === topic)
      : [...this.messages];
  }

  private nextMessageId(topic: string): string {
    this.sequence += 1;
    return `${topic}:${this.sequence}`;
  }

  private nextSubscriptionId(topic: string): string {
    this.sequence += 1;
    return `${topic}:subscription:${this.sequence}`;
  }
}

export const runtimeScopeSchema = z.object({
  tenantId: z.string().optional(),
  userId: z.string().min(1),
  workspaceId: z.string().optional(),
  sessionId: z.string().min(1),
  runId: z.string().min(1),
  agentId: z.string().optional(),
}) satisfies ZodType<RuntimeScope>;

export const runtimePrincipalSchema = z.object({
  principalId: z.string().min(1),
  type: z.enum(['user', 'agent', 'service', 'system']),
  tenantId: z.string().optional(),
  userId: z.string().optional(),
  agentId: z.string().optional(),
  roles: z.array(z.string()).optional(),
  permissionScopes: z.array(z.string()),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<RuntimePrincipal>;

export const normalizedRuntimeActivityErrorSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  retryable: z.boolean(),
  details: z.record(z.unknown()).optional(),
  causeRef: z.string().optional(),
}) satisfies ZodType<NormalizedRuntimeActivityError>;

export const runtimeActivityRequestSchema = z.object({
  activityId: z.string().min(1),
  activityType: z.enum(['model', 'tool', 'memory', 'execution', 'human', 'custom']),
  scope: runtimeScopeSchema,
  stateAttemptId: z.string().min(1),
  operationId: z.string().min(1),
  input: z.unknown(),
  deadlineAt: z.string().optional(),
  idempotencyKey: z.string().optional(),
  fencingToken: z.number().int().nonnegative(),
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) as unknown as ZodType<RuntimeActivityRequest>;

export const runtimeActivityResultSchema = z.object({
  activityId: z.string().min(1),
  status: z.enum(['completed', 'failed', 'waiting', 'cancelled', 'unknown']),
  output: z.unknown().optional(),
  artifactRefs: z.array(z.string()).optional(),
  eventIds: z.array(z.string()),
  retryable: z.boolean().optional(),
  error: normalizedRuntimeActivityErrorSchema.optional(),
  metadata: z.record(z.unknown()).optional(),
}) as unknown as ZodType<RuntimeActivityResult>;

export const runtimeStateAttemptSchema = z.object({
  id: z.string().min(1),
  scope: runtimeScopeSchema,
  fsmProcessId: z.string().min(1),
  stateId: z.string().min(1),
  attempt: z.number().int().positive(),
  status: z.enum(['started', 'waiting', 'completed', 'failed', 'cancelled']),
  fencingToken: z.number().int().nonnegative(),
  startedAt: z.string().min(1),
  completedAt: z.string().optional(),
  activityIds: z.array(z.string()).optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<RuntimeStateAttempt>;

export const runtimeCommandSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    'session.create',
    'run.create',
    'run.start',
    'run.cancel',
    'run.resume',
    'run.signal',
    'activity.complete',
    'activity.fail',
    'custom',
  ]),
  scope: runtimeScopeSchema,
  payload: z.unknown(),
  principal: runtimePrincipalSchema.optional(),
  idempotencyKey: z.string().optional(),
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  createdAt: z.string().min(1),
  expiresAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) as unknown as ZodType<RuntimeCommand>;

export const messageBusSpecSchema = versionedSpecSchema
  .merge(specMetadataSchema)
  .extend({
    engine: z.enum(['memory', 'redis', 'kafka', 'custom']),
    delivery: z.enum(['at_most_once', 'at_least_once']),
    supportsOrdering: z.boolean().optional(),
    supportsDeduplication: z.boolean().optional(),
    supportsDeadLetter: z.boolean().optional(),
    topics: z.array(z.string()).optional(),
  }) satisfies ZodType<MessageBusSpec>;

export const messageBusMessageSchema = z.object({
  id: z.string().min(1),
  topic: z.string().min(1),
  payload: z.unknown(),
  scope: runtimeScopeSchema.optional(),
  idempotencyKey: z.string().optional(),
  correlationId: z.string().optional(),
  causationId: z.string().optional(),
  publishedAt: z.string().min(1),
  availableAt: z.string().optional(),
  expiresAt: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) as unknown as ZodType<MessageBusMessage>;

export const messageBusSpecExample: MessageBusSpec = {
  id: 'runtime.message-bus.memory',
  version: '0.0.0',
  name: 'In-memory Runtime Message Bus',
  engine: 'memory',
  delivery: 'at_least_once',
  supportsOrdering: true,
  supportsDeduplication: true,
  supportsDeadLetter: false,
  topics: ['runtime.commands', 'runtime.events'],
};

export function validateRuntimeScope(input: unknown): RuntimeScope {
  return runtimeScopeSchema.parse(input);
}

export function validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest {
  return runtimeActivityRequestSchema.parse(input);
}

export function validateRuntimeActivityResult(input: unknown): RuntimeActivityResult {
  return runtimeActivityResultSchema.parse(input);
}

export function validateRuntimeStateAttempt(input: unknown): RuntimeStateAttempt {
  return runtimeStateAttemptSchema.parse(input);
}

export function validateRuntimeCommand(input: unknown): RuntimeCommand {
  return runtimeCommandSchema.parse(input);
}

export function validateMessageBusSpec(input: unknown): MessageBusSpec {
  return messageBusSpecSchema.parse(input);
}

export function validateMessageBusMessage(input: unknown): MessageBusMessage {
  return messageBusMessageSchema.parse(input);
}

export function createRuntimeActivityRequest<TInput = unknown>(input: {
  activityId: string;
  activityType: RuntimeActivityType;
  scope: RuntimeScope;
  stateAttemptId: string;
  operationId: string;
  payload: TInput;
  fencingToken: number;
  deadlineAt?: string;
  idempotencyKey?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, unknown>;
}): RuntimeActivityRequest<TInput> {
  return validateRuntimeActivityRequest({
    activityId: input.activityId,
    activityType: input.activityType,
    scope: input.scope,
    stateAttemptId: input.stateAttemptId,
    operationId: input.operationId,
    input: input.payload,
    deadlineAt: input.deadlineAt,
    idempotencyKey: input.idempotencyKey,
    fencingToken: input.fencingToken,
    correlationId: input.correlationId,
    causationId: input.causationId,
    metadata: input.metadata,
  }) as RuntimeActivityRequest<TInput>;
}
