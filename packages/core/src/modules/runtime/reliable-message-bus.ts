import type { ProviderHealth } from '../../contracts/execution';
import type { RuntimePrincipal } from '../../contracts/runtime';
import { FrameworkError } from '../../errors';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

export const RUNTIME_MESSAGE_TYPES = [
  'runtime.command.start',
  'runtime.command.resume',
  'runtime.command.cancel',
  'runtime.signal',
  'runtime.timer.fire',
  'runtime.activity.requested',
  'runtime.activity.completed',
  'runtime.activity.failed',
  'runtime.agent.message',
  'runtime.child.completed',
  'runtime.projection.rebuild',
  'runtime.recovery.requested',
  'runtime.custom',
] as const;

export type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number];

export interface RuntimeMessageEnvelope<TPayload = unknown> {
  messageId: string;
  messageType: RuntimeMessageType;
  schemaVersion: string;
  topic: string;
  partitionKey: string;
  orderingKey?: string;
  sequence?: number;
  tenantId?: string;
  workspaceId?: string;
  userId?: string;
  sessionId?: string;
  runId?: string;
  stepId?: string;
  activityId?: string;
  agentId?: string;
  correlationId?: string;
  causationId?: string;
  traceId?: string;
  principal?: RuntimePrincipal;
  payload: TPayload;
  payloadHash: string;
  priority?: number;
  availableAt?: string;
  expiresAt?: string;
  publishedAt: string;
  producerId: string;
  producerRevision?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeMessageEnvelopeInput<TPayload = unknown> extends Omit<
  RuntimeMessageEnvelope<TPayload>,
  'payloadHash'
> {
  payloadHash?: string;
}

export interface MessagePublishRequest<TPayload = unknown> {
  envelope: RuntimeMessageEnvelopeInput<TPayload>;
}

export interface MessagePublishResult {
  messageId: string;
  topic: string;
  partitionKey: string;
  sequence: number;
  publishedAt: string;
  reused: boolean;
}

export interface MessageSubscriptionRequest {
  consumerId: string;
  consumerGroup?: string;
  topic: string;
  partitionKey?: string;
  maxMessages?: number;
  idleTimeoutMs?: number;
  ackDeadlineMs?: number;
  signal?: AbortSignal;
}

export interface MessageDelivery<TPayload = unknown> {
  envelope: RuntimeMessageEnvelope<TPayload>;
  deliveryId: string;
  attempt: number;
  receivedAt: string;
  ackDeadlineAt: string;
  ack(): Promise<void>;
  nack(options?: { delayMs?: number; reason?: string }): Promise<void>;
  deadLetter(reason: string): Promise<void>;
  extendAckDeadline(extensionMs: number): Promise<void>;
}

export interface MessageBusV2 {
  publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult>;
  publishBatch<TPayload>(
    requests: MessagePublishRequest<TPayload>[]
  ): Promise<MessagePublishResult[]>;
  subscribe<TPayload>(
    request: MessageSubscriptionRequest
  ): AsyncIterable<MessageDelivery<TPayload>>;
  health(): Promise<ProviderHealth>;
  close(): Promise<void>;
}

type TransportState = 'queued' | 'delivered' | 'acked' | 'dead_lettered';

interface TransportRecord {
  envelope: RuntimeMessageEnvelope;
  requestHash: string;
  state: TransportState;
  attempts: number;
  availableAt: string;
  deliveryId?: string;
  consumerId?: string;
  ackDeadlineAt?: string;
  lastFailureReason?: string;
}

export interface InMemoryMessageBusV2Options {
  now?: () => string;
  maxDeliveryAttempts?: number;
  defaultAckDeadlineMs?: number;
  maxMessageBytes?: number;
  maxQueueDepth?: number;
  pollIntervalMs?: number;
}

export class InMemoryMessageBusV2 implements MessageBusV2 {
  private readonly records = new Map<string, TransportRecord>();
  private readonly partitionSequences = new Map<string, number>();
  private readonly now: () => string;
  private readonly maxDeliveryAttempts: number;
  private readonly defaultAckDeadlineMs: number;
  private readonly maxMessageBytes: number;
  private readonly maxQueueDepth: number;
  private readonly pollIntervalMs: number;
  private closed = false;
  private deliverySequence = 0;

  constructor(options: InMemoryMessageBusV2Options = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.maxDeliveryAttempts = positive(options.maxDeliveryAttempts ?? 5, 'maxDeliveryAttempts');
    this.defaultAckDeadlineMs = positive(
      options.defaultAckDeadlineMs ?? 30_000,
      'defaultAckDeadlineMs'
    );
    this.maxMessageBytes = positive(options.maxMessageBytes ?? 256 * 1024, 'maxMessageBytes');
    this.maxQueueDepth = positive(options.maxQueueDepth ?? 10_000, 'maxQueueDepth');
    this.pollIntervalMs = positive(options.pollIntervalMs ?? 10, 'pollIntervalMs');
  }

  async publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult> {
    this.assertOpen();
    const envelope = normalizeEnvelope(request.envelope);
    const requestHash = hashCanonicalJson(envelope);
    const existing = this.records.get(envelope.messageId);
    if (existing) {
      if (existing.requestHash !== requestHash) {
        throw messageError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Message id was reused with different content: ${envelope.messageId}`
        );
      }
      return publishResult(existing.envelope, true);
    }
    const queued = Array.from(this.records.values()).filter(
      (record) => record.state === 'queued'
    ).length;
    if (queued >= this.maxQueueDepth) {
      throw messageError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Message queue depth limit reached.');
    }
    const bytes = Buffer.byteLength(canonicalizeJson(envelope), 'utf8');
    if (bytes > this.maxMessageBytes) {
      throw messageError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message exceeds maxMessageBytes.', {
        messageId: envelope.messageId,
        bytes,
        maxMessageBytes: this.maxMessageBytes,
      });
    }
    const partition = partitionId(envelope.topic, envelope.partitionKey);
    const nextSequence = (this.partitionSequences.get(partition) ?? 0) + 1;
    if (envelope.sequence !== undefined && envelope.sequence !== nextSequence) {
      throw messageError(
        'RUNTIME_MESSAGE_SCHEMA_INVALID',
        'Message partition sequence is invalid.',
        {
          expectedSequence: nextSequence,
          actualSequence: envelope.sequence,
        }
      );
    }
    const sequenced = { ...envelope, sequence: nextSequence };
    this.partitionSequences.set(partition, nextSequence);
    this.records.set(sequenced.messageId, {
      envelope: sequenced,
      requestHash,
      state: 'queued',
      attempts: 0,
      availableAt: sequenced.availableAt ?? sequenced.publishedAt,
    });
    return publishResult(sequenced, false);
  }

  async publishBatch<TPayload>(
    requests: MessagePublishRequest<TPayload>[]
  ): Promise<MessagePublishResult[]> {
    const results: MessagePublishResult[] = [];
    for (const request of requests) results.push(await this.publish(request));
    return results;
  }

  async *subscribe<TPayload>(
    request: MessageSubscriptionRequest
  ): AsyncIterable<MessageDelivery<TPayload>> {
    assertNonEmpty(request.consumerId, 'consumerId');
    assertNonEmpty(request.topic, 'topic');
    const maxMessages = request.maxMessages ?? Number.POSITIVE_INFINITY;
    const idleTimeoutMs = request.idleTimeoutMs ?? Number.POSITIVE_INFINITY;
    const startedAt = Date.now();
    let delivered = 0;
    while (!this.closed && !request.signal?.aborted && delivered < maxMessages) {
      const next = this.nextDelivery<TPayload>(request);
      if (next) {
        delivered += 1;
        yield next;
        continue;
      }
      if (Date.now() - startedAt >= idleTimeoutMs) return;
      await wait(this.pollIntervalMs, request.signal);
    }
  }

  async health(): Promise<ProviderHealth> {
    const deadLetters = Array.from(this.records.values()).filter(
      (record) => record.state === 'dead_lettered'
    ).length;
    return {
      status: this.closed ? 'unhealthy' : 'healthy',
      checkedAt: this.now(),
      details: { messages: this.records.size, deadLetters },
    };
  }

  async close(): Promise<void> {
    this.closed = true;
  }

  listDeadLetters(): RuntimeMessageEnvelope[] {
    return Array.from(this.records.values())
      .filter((record) => record.state === 'dead_lettered')
      .map((record) => structuredClone(record.envelope));
  }

  private nextDelivery<TPayload>(
    request: MessageSubscriptionRequest
  ): MessageDelivery<TPayload> | null {
    this.recoverExpiredDeliveries();
    const now = this.now();
    const record = Array.from(this.records.values())
      .filter(
        (candidate) =>
          candidate.state === 'queued' &&
          candidate.envelope.topic === request.topic &&
          (request.partitionKey === undefined ||
            candidate.envelope.partitionKey === request.partitionKey) &&
          candidate.availableAt <= now
      )
      .sort(compareTransportRecords)[0];
    if (!record) return null;
    if (record.envelope.expiresAt && record.envelope.expiresAt <= now) {
      record.state = 'dead_lettered';
      record.lastFailureReason = 'message_expired';
      return this.nextDelivery(request);
    }
    record.attempts += 1;
    if (record.attempts > this.maxDeliveryAttempts) {
      record.state = 'dead_lettered';
      record.lastFailureReason = 'delivery_attempt_budget_exhausted';
      return this.nextDelivery(request);
    }
    const ackDeadlineMs = positive(
      request.ackDeadlineMs ?? this.defaultAckDeadlineMs,
      'ackDeadlineMs'
    );
    const deliveryId = `${record.envelope.messageId}:delivery:${++this.deliverySequence}`;
    record.state = 'delivered';
    record.deliveryId = deliveryId;
    record.consumerId = request.consumerId;
    record.ackDeadlineAt = addMilliseconds(now, ackDeadlineMs);
    return this.createDelivery<TPayload>(record);
  }

  private createDelivery<TPayload>(record: TransportRecord): MessageDelivery<TPayload> {
    const deliveryId = record.deliveryId as string;
    const receivedAt = this.now();
    const assertCurrent = (): void => {
      if (record.deliveryId !== deliveryId || record.state !== 'delivered') {
        throw messageError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Delivery is no longer current.');
      }
    };
    return {
      envelope: structuredClone(record.envelope) as RuntimeMessageEnvelope<TPayload>,
      deliveryId,
      attempt: record.attempts,
      receivedAt,
      ackDeadlineAt: record.ackDeadlineAt as string,
      ack: async () => {
        if (record.state === 'acked') return;
        assertCurrent();
        record.state = 'acked';
      },
      nack: async (options = {}) => {
        assertCurrent();
        if (record.attempts >= this.maxDeliveryAttempts) {
          record.state = 'dead_lettered';
          record.lastFailureReason = options.reason ?? 'delivery_attempt_budget_exhausted';
          return;
        }
        record.state = 'queued';
        record.availableAt = addMilliseconds(this.now(), Math.max(0, options.delayMs ?? 0));
        record.lastFailureReason = options.reason;
      },
      deadLetter: async (reason) => {
        assertCurrent();
        record.state = 'dead_lettered';
        record.lastFailureReason = reason;
      },
      extendAckDeadline: async (extensionMs) => {
        assertCurrent();
        if (record.state !== 'delivered') {
          throw messageError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Delivery is not active.');
        }
        record.ackDeadlineAt = addMilliseconds(
          record.ackDeadlineAt as string,
          positive(extensionMs)
        );
      },
    };
  }

  private recoverExpiredDeliveries(): void {
    const now = this.now();
    for (const record of this.records.values()) {
      if (record.state !== 'delivered' || !record.ackDeadlineAt || record.ackDeadlineAt > now) {
        continue;
      }
      if (record.attempts >= this.maxDeliveryAttempts) {
        record.state = 'dead_lettered';
        record.lastFailureReason = 'ack_deadline_exhausted';
      } else {
        record.state = 'queued';
        record.availableAt = now;
      }
    }
  }

  private assertOpen(): void {
    if (this.closed)
      throw messageError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Message bus is closed.');
  }
}

export type RuntimeMessageInboxStatus = 'processing' | 'applied' | 'ignored' | 'failed';

export interface RuntimeMessageInboxRecord {
  consumerId: string;
  messageId: string;
  payloadHash: string;
  status: RuntimeMessageInboxStatus;
  appliedEventIds?: string[];
  firstReceivedAt: string;
  lastReceivedAt: string;
  attempts: number;
  expiresAt?: string;
  lastError?: string;
}

export interface InboxClaimResult {
  disposition: 'claimed' | 'duplicate' | 'busy' | 'conflict';
  record: RuntimeMessageInboxRecord;
}

export interface RuntimeMessageInboxStore {
  claim(input: {
    consumerId: string;
    messageId: string;
    payloadHash: string;
    receivedAt: string;
    expiresAt?: string;
  }): Promise<InboxClaimResult>;
  complete(
    consumerId: string,
    messageId: string,
    appliedEventIds: string[],
    completedAt: string
  ): Promise<void>;
  fail(consumerId: string, messageId: string, error: string, failedAt: string): Promise<void>;
  get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
}

export class InMemoryRuntimeMessageInboxStore implements RuntimeMessageInboxStore {
  private readonly records = new Map<string, RuntimeMessageInboxRecord>();

  async claim(input: {
    consumerId: string;
    messageId: string;
    payloadHash: string;
    receivedAt: string;
    expiresAt?: string;
  }): Promise<InboxClaimResult> {
    assertNonEmpty(input.consumerId, 'consumerId');
    assertNonEmpty(input.messageId, 'messageId');
    const key = inboxKey(input.consumerId, input.messageId);
    const existing = this.records.get(key);
    if (existing) {
      existing.lastReceivedAt = input.receivedAt;
      existing.attempts += 1;
      if (existing.payloadHash !== input.payloadHash) {
        return { disposition: 'conflict', record: structuredClone(existing) };
      }
      if (existing.status === 'applied' || existing.status === 'ignored') {
        return { disposition: 'duplicate', record: structuredClone(existing) };
      }
      if (existing.status === 'processing') {
        return { disposition: 'busy', record: structuredClone(existing) };
      }
      existing.status = 'processing';
      existing.lastError = undefined;
      return { disposition: 'claimed', record: structuredClone(existing) };
    }
    const record: RuntimeMessageInboxRecord = {
      consumerId: input.consumerId,
      messageId: input.messageId,
      payloadHash: input.payloadHash,
      status: 'processing',
      firstReceivedAt: input.receivedAt,
      lastReceivedAt: input.receivedAt,
      attempts: 1,
      ...(input.expiresAt === undefined ? {} : { expiresAt: input.expiresAt }),
    };
    this.records.set(key, record);
    return { disposition: 'claimed', record: structuredClone(record) };
  }

  async complete(
    consumerId: string,
    messageId: string,
    appliedEventIds: string[],
    completedAt: string
  ): Promise<void> {
    const record = this.require(consumerId, messageId);
    record.status = 'applied';
    record.appliedEventIds = [...appliedEventIds];
    record.lastReceivedAt = completedAt;
    record.lastError = undefined;
  }

  async fail(
    consumerId: string,
    messageId: string,
    error: string,
    failedAt: string
  ): Promise<void> {
    const record = this.require(consumerId, messageId);
    record.status = 'failed';
    record.lastError = error;
    record.lastReceivedAt = failedAt;
  }

  async get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null> {
    const record = this.records.get(inboxKey(consumerId, messageId));
    return record ? structuredClone(record) : null;
  }

  private require(consumerId: string, messageId: string): RuntimeMessageInboxRecord {
    const record = this.records.get(inboxKey(consumerId, messageId));
    if (!record) throw messageError('RUNTIME_INTERNAL_ERROR', 'Inbox claim was not found.');
    return record;
  }
}

export interface RuntimeInboxHandleResult {
  disposition: 'applied' | 'duplicate' | 'busy' | 'failed' | 'dead_lettered';
  appliedEventIds: string[];
}

export class RuntimeInboxProcessor {
  constructor(
    private readonly consumerId: string,
    private readonly inbox: RuntimeMessageInboxStore,
    private readonly now: () => string = () => new Date().toISOString()
  ) {
    assertNonEmpty(consumerId, 'consumerId');
  }

  async handle(
    delivery: MessageDelivery,
    apply: (envelope: RuntimeMessageEnvelope) => Promise<string[]>
  ): Promise<RuntimeInboxHandleResult> {
    const receivedAt = this.now();
    const claim = await this.inbox.claim({
      consumerId: this.consumerId,
      messageId: delivery.envelope.messageId,
      payloadHash: delivery.envelope.payloadHash,
      receivedAt,
      ...(delivery.envelope.expiresAt === undefined
        ? {}
        : { expiresAt: delivery.envelope.expiresAt }),
    });
    if (claim.disposition === 'conflict') {
      await delivery.deadLetter('inbox_payload_hash_conflict');
      return { disposition: 'dead_lettered', appliedEventIds: [] };
    }
    if (claim.disposition === 'duplicate') {
      await delivery.ack();
      return {
        disposition: 'duplicate',
        appliedEventIds: [...(claim.record.appliedEventIds ?? [])],
      };
    }
    if (claim.disposition === 'busy') {
      await delivery.nack({ reason: 'inbox_claim_busy' });
      return { disposition: 'busy', appliedEventIds: [] };
    }
    try {
      const appliedEventIds = await apply(structuredClone(delivery.envelope));
      await this.inbox.complete(
        this.consumerId,
        delivery.envelope.messageId,
        appliedEventIds,
        this.now()
      );
      await delivery.ack();
      return { disposition: 'applied', appliedEventIds: [...appliedEventIds] };
    } catch (error) {
      await this.inbox.fail(
        this.consumerId,
        delivery.envelope.messageId,
        error instanceof Error ? error.message : String(error),
        this.now()
      );
      await delivery.nack({ reason: 'inbox_apply_failed' });
      return { disposition: 'failed', appliedEventIds: [] };
    }
  }
}

export type RuntimeMessageOutboxState =
  | 'pending'
  | 'publishing'
  | 'published'
  | 'failed'
  | 'dead_letter';

export interface RuntimeMessageOutboxRecord {
  id: string;
  eventId?: string;
  messageId: string;
  topic: string;
  partitionKey: string;
  envelope: RuntimeMessageEnvelope;
  state: RuntimeMessageOutboxState;
  attempts: number;
  availableAt: string;
  leaseOwner?: string;
  leaseExpiresAt?: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RuntimeMessageOutboxStore {
  enqueue(input: {
    id: string;
    eventId?: string;
    envelope: RuntimeMessageEnvelope;
    availableAt?: string;
    createdAt: string;
  }): Promise<RuntimeMessageOutboxRecord>;
  claim(input: {
    ownerId: string;
    now: string;
    leaseMs: number;
    limit: number;
  }): Promise<RuntimeMessageOutboxRecord[]>;
  markPublished(id: string, ownerId: string, publishedAt: string): Promise<void>;
  markFailed(input: {
    id: string;
    ownerId: string;
    failedAt: string;
    error: string;
    retryAt?: string;
    deadLetter?: boolean;
  }): Promise<void>;
  get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
}

export class InMemoryRuntimeMessageOutboxStore implements RuntimeMessageOutboxStore {
  private readonly records = new Map<string, RuntimeMessageOutboxRecord>();
  private readonly idsByMessage = new Map<string, string>();

  async enqueue(input: {
    id: string;
    eventId?: string;
    envelope: RuntimeMessageEnvelope;
    availableAt?: string;
    createdAt: string;
  }): Promise<RuntimeMessageOutboxRecord> {
    assertNonEmpty(input.id, 'outbox.id');
    assertTimestamp(input.createdAt, 'createdAt');
    const normalized = normalizeEnvelope(input.envelope);
    const existingId = this.idsByMessage.get(normalized.messageId);
    if (existingId) {
      const existing = this.records.get(existingId) as RuntimeMessageOutboxRecord;
      if (hashCanonicalJson(existing.envelope) !== hashCanonicalJson(normalized)) {
        throw messageError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Outbox message was reused with different content: ${normalized.messageId}`
        );
      }
      return structuredClone(existing);
    }
    if (this.records.has(input.id)) {
      throw messageError('RUNTIME_IDEMPOTENCY_CONFLICT', `Outbox id already exists: ${input.id}`);
    }
    const availableAt = input.availableAt ?? input.createdAt;
    assertTimestamp(availableAt, 'availableAt');
    const record: RuntimeMessageOutboxRecord = {
      id: input.id,
      ...(input.eventId === undefined ? {} : { eventId: input.eventId }),
      messageId: normalized.messageId,
      topic: normalized.topic,
      partitionKey: normalized.partitionKey,
      envelope: normalized,
      state: 'pending',
      attempts: 0,
      availableAt,
      createdAt: input.createdAt,
      updatedAt: input.createdAt,
    };
    this.records.set(record.id, record);
    this.idsByMessage.set(record.messageId, record.id);
    return structuredClone(record);
  }

  async claim(input: {
    ownerId: string;
    now: string;
    leaseMs: number;
    limit: number;
  }): Promise<RuntimeMessageOutboxRecord[]> {
    assertNonEmpty(input.ownerId, 'ownerId');
    assertTimestamp(input.now, 'now');
    positive(input.leaseMs, 'leaseMs');
    positive(input.limit, 'limit');
    const eligible = Array.from(this.records.values())
      .filter(
        (record) =>
          (record.state === 'pending' ||
            record.state === 'failed' ||
            (record.state === 'publishing' &&
              record.leaseExpiresAt !== undefined &&
              record.leaseExpiresAt <= input.now)) &&
          record.availableAt <= input.now
      )
      .sort(
        (left, right) =>
          left.availableAt.localeCompare(right.availableAt) ||
          left.createdAt.localeCompare(right.createdAt) ||
          left.id.localeCompare(right.id)
      )
      .slice(0, input.limit);
    for (const record of eligible) {
      record.state = 'publishing';
      record.attempts += 1;
      record.leaseOwner = input.ownerId;
      record.leaseExpiresAt = addMilliseconds(input.now, input.leaseMs);
      record.updatedAt = input.now;
    }
    return structuredClone(eligible);
  }

  async markPublished(id: string, ownerId: string, publishedAt: string): Promise<void> {
    const record = this.requireOwnedPublishing(id, ownerId);
    assertTimestamp(publishedAt, 'publishedAt');
    record.state = 'published';
    record.updatedAt = publishedAt;
    delete record.leaseOwner;
    delete record.leaseExpiresAt;
    delete record.lastError;
  }

  async markFailed(input: {
    id: string;
    ownerId: string;
    failedAt: string;
    error: string;
    retryAt?: string;
    deadLetter?: boolean;
  }): Promise<void> {
    const record = this.requireOwnedPublishing(input.id, input.ownerId);
    assertTimestamp(input.failedAt, 'failedAt');
    if (input.retryAt) assertTimestamp(input.retryAt, 'retryAt');
    record.state = input.deadLetter ? 'dead_letter' : 'failed';
    record.availableAt = input.retryAt ?? input.failedAt;
    record.lastError = input.error;
    record.updatedAt = input.failedAt;
    delete record.leaseOwner;
    delete record.leaseExpiresAt;
  }

  async get(id: string): Promise<RuntimeMessageOutboxRecord | null> {
    const record = this.records.get(id);
    return record ? structuredClone(record) : null;
  }

  private requireOwnedPublishing(id: string, ownerId: string): RuntimeMessageOutboxRecord {
    const record = this.records.get(id);
    if (!record) throw messageError('RUNTIME_INTERNAL_ERROR', `Outbox record not found: ${id}`);
    if (record.state !== 'publishing' || record.leaseOwner !== ownerId) {
      throw messageError('RUNTIME_LEASE_CONFLICT', `Outbox lease is not owned: ${id}`);
    }
    return record;
  }
}

export interface RuntimeOutboxDispatcherOptions {
  ownerId: string;
  outbox: RuntimeMessageOutboxStore;
  bus: MessageBusV2;
  now?: () => string;
  leaseMs?: number;
  maxAttempts?: number;
  retryDelayMs?: (attempt: number) => number;
}

export interface RuntimeOutboxDispatchResult {
  claimed: number;
  published: number;
  failed: number;
  deadLettered: number;
}

export class RuntimeOutboxDispatcher {
  private readonly now: () => string;
  private readonly leaseMs: number;
  private readonly maxAttempts: number;
  private readonly retryDelayMs: (attempt: number) => number;

  constructor(private readonly options: RuntimeOutboxDispatcherOptions) {
    assertNonEmpty(options.ownerId, 'ownerId');
    this.now = options.now ?? (() => new Date().toISOString());
    this.leaseMs = positive(options.leaseMs ?? 30_000, 'leaseMs');
    this.maxAttempts = positive(options.maxAttempts ?? 10, 'maxAttempts');
    this.retryDelayMs =
      options.retryDelayMs ?? ((attempt) => Math.min(30_000, 250 * 2 ** (attempt - 1)));
  }

  async dispatch(limit = 100): Promise<RuntimeOutboxDispatchResult> {
    const claimed = await this.options.outbox.claim({
      ownerId: this.options.ownerId,
      now: this.now(),
      leaseMs: this.leaseMs,
      limit: positive(limit, 'limit'),
    });
    const result: RuntimeOutboxDispatchResult = {
      claimed: claimed.length,
      published: 0,
      failed: 0,
      deadLettered: 0,
    };
    for (const record of claimed) {
      try {
        await this.options.bus.publish({ envelope: record.envelope });
        await this.options.outbox.markPublished(record.id, this.options.ownerId, this.now());
        result.published += 1;
      } catch (error) {
        const failedAt = this.now();
        const deadLetter = record.attempts >= this.maxAttempts;
        await this.options.outbox.markFailed({
          id: record.id,
          ownerId: this.options.ownerId,
          failedAt,
          error: error instanceof Error ? error.message : String(error),
          deadLetter,
          ...(!deadLetter
            ? { retryAt: addMilliseconds(failedAt, this.retryDelayMs(record.attempts)) }
            : {}),
        });
        if (deadLetter) result.deadLettered += 1;
        else result.failed += 1;
      }
    }
    return result;
  }
}

export function createRuntimeMessageEnvelope<TPayload>(
  input: RuntimeMessageEnvelopeInput<TPayload>
): RuntimeMessageEnvelope<TPayload> {
  return normalizeEnvelope(input);
}

function normalizeEnvelope<TPayload>(
  input: RuntimeMessageEnvelopeInput<TPayload>
): RuntimeMessageEnvelope<TPayload> {
  assertNonEmpty(input.messageId, 'messageId');
  assertNonEmpty(input.messageType, 'messageType');
  assertNonEmpty(input.schemaVersion, 'schemaVersion');
  assertNonEmpty(input.topic, 'topic');
  assertNonEmpty(input.partitionKey, 'partitionKey');
  assertNonEmpty(input.publishedAt, 'publishedAt');
  assertNonEmpty(input.producerId, 'producerId');
  assertTimestamp(input.publishedAt, 'publishedAt');
  if (input.availableAt) assertTimestamp(input.availableAt, 'availableAt');
  if (input.expiresAt) assertTimestamp(input.expiresAt, 'expiresAt');
  const payloadHash = hashCanonicalJson(input.payload);
  if (input.payloadHash !== undefined && input.payloadHash !== payloadHash) {
    throw messageError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message payload hash does not match.');
  }
  return structuredClone({ ...input, payloadHash });
}

function publishResult(envelope: RuntimeMessageEnvelope, reused: boolean): MessagePublishResult {
  return {
    messageId: envelope.messageId,
    topic: envelope.topic,
    partitionKey: envelope.partitionKey,
    sequence: envelope.sequence as number,
    publishedAt: envelope.publishedAt,
    reused,
  };
}

function compareTransportRecords(left: TransportRecord, right: TransportRecord): number {
  const partitionOrder = left.envelope.partitionKey.localeCompare(right.envelope.partitionKey);
  if (partitionOrder !== 0) return partitionOrder;
  return (left.envelope.sequence as number) - (right.envelope.sequence as number);
}

function partitionId(topic: string, partitionKey: string): string {
  return `${topic}\u0000${partitionKey}`;
}

function inboxKey(consumerId: string, messageId: string): string {
  return `${consumerId}\u0000${messageId}`;
}

function addMilliseconds(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function positive(value: number, label = 'value'): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw messageError('RUNTIME_INVALID_INPUT', `${label} must be positive.`);
  }
  return value;
}

function assertNonEmpty(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw messageError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a non-empty string.`);
  }
}

function assertTimestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw messageError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a valid timestamp.`);
  }
}

function messageError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, ...(context === undefined ? {} : { context }) });
}

function wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve();
      return;
    }
    const timeout = setTimeout(done, milliseconds);
    function done(): void {
      clearTimeout(timeout);
      signal?.removeEventListener('abort', done);
      resolve();
    }
    signal?.addEventListener('abort', done, { once: true });
  });
}
