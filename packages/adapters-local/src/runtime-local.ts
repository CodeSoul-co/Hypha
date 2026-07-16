import { FrameworkError } from '@hypha/core';
import type { StructuredStoreProvider } from '@hypha/memory';
import {
  runtimeDeliveryDedupeKey,
  runtimeCommandDedupeKey,
  runtimeCommandQueueKey,
  validateRuntimeCommand,
  type MessageBus,
  type MessageBusHandler,
  type MessageBusMessage,
  type MessageBusPublishOptions,
  type MessageBusPublishResult,
  type MessageBusSubscription,
  type RuntimeCommand,
  type RuntimeCommandQueue,
  type RuntimeCommandQueueEnqueueResult,
  type RuntimeCommandQueueItem,
  type RuntimeDeliveryBox,
  type RuntimeDeliveryEnqueueOptions,
  type RuntimeDeliveryEnqueueResult,
  type RuntimeDeliveryLeaseOptions,
  type RuntimeDeliveryNackOptions,
  type RuntimeDeliveryRecord,
  type RuntimeDeliveryStatus,
  type RuntimeDeliveryStore,
  type RuntimeLease,
  type RuntimeLeaseAcquireResult,
  type RuntimeLeaseCoordinator,
} from '@hypha/harness';
import { createHash } from 'crypto';

export interface LocalRuntimeStoreOptions {
  structured: StructuredStoreProvider;
  now?: () => string;
  tablePrefix?: string;
}

export interface LocalRuntimeDeliveryStoreOptions extends LocalRuntimeStoreOptions {
  defaultMaxAttempts?: number;
}

export interface LocalRuntimeMessageBusOptions {
  delivery: RuntimeDeliveryStore;
  now?: () => string;
}

interface RuntimeIdempotencyRecord {
  id: string;
  recordId: string;
}

interface RuntimeSequenceRecord {
  id: string;
  value: number;
}

interface RuntimeCommandQueueRecord<TPayload = unknown> extends RuntimeCommandQueueItem<TPayload> {
  id: string;
  status: 'pending' | 'dequeued';
  dequeuedAt?: string;
}

export class LocalRuntimeCommandQueue implements RuntimeCommandQueue {
  private readonly structured: StructuredStoreProvider;
  private readonly now: () => string;
  private readonly tablePrefix: string;

  constructor(options: LocalRuntimeStoreOptions) {
    this.structured = options.structured;
    this.now = options.now ?? (() => new Date().toISOString());
    this.tablePrefix = options.tablePrefix ?? 'runtime';
  }

  async enqueue<TPayload = unknown>(
    command: RuntimeCommand<TPayload>
  ): Promise<RuntimeCommandQueueEnqueueResult<TPayload>> {
    return this.structured.transaction(async (tx) => {
      const validated = validateRuntimeCommand(command) as RuntimeCommand<TPayload>;
      const dedupeKey = runtimeCommandDedupeKey(validated);
      const existing = await tx.get<RuntimeIdempotencyRecord>(
        this.commandIdempotencyTable,
        dedupeKey
      );
      if (existing) {
        const record = await tx.get<RuntimeCommandQueueRecord<TPayload>>(
          this.commandTable,
          existing.recordId
        );
        if (record) {
          return { status: 'duplicate', item: commandItemFromRecord(record) };
        }
      }

      const sequence = await this.nextSequence(tx, 'command_queue');
      const item: RuntimeCommandQueueItem<TPayload> = {
        command: validated,
        queueKey: runtimeCommandQueueKey(validated.scope),
        sequence,
        enqueuedAt: this.now(),
      };
      const record: RuntimeCommandQueueRecord<TPayload> = {
        ...item,
        id: `command:${sequence}`,
        status: 'pending',
      };
      await tx.insert(this.commandTable, record);
      await tx.insert(this.commandIdempotencyTable, { id: dedupeKey, recordId: record.id });
      return { status: 'enqueued', item };
    });
  }

  async dequeue(
    scope: Pick<RuntimeCommand['scope'], 'userId' | 'sessionId'>
  ): Promise<RuntimeCommandQueueItem | null> {
    return this.structured.transaction(async (tx) => {
      const queueKey = runtimeCommandQueueKey(scope);
      const record = (await tx.query<RuntimeCommandQueueRecord>(this.commandTable, {}))
        .filter((candidate) => candidate.status === 'pending')
        .filter((candidate) => candidate.queueKey === queueKey)
        .sort((left, right) => left.sequence - right.sequence)[0];
      if (!record) return null;
      await tx.insert(this.commandTable, {
        ...record,
        status: 'dequeued',
        dequeuedAt: this.now(),
      });
      return commandItemFromRecord(record);
    });
  }

  async list(
    scope: Pick<RuntimeCommand['scope'], 'userId' | 'sessionId'>
  ): Promise<RuntimeCommandQueueItem[]> {
    const queueKey = runtimeCommandQueueKey(scope);
    return (await this.structured.query<RuntimeCommandQueueRecord>(this.commandTable, {}))
      .filter((record) => record.status === 'pending')
      .filter((record) => record.queueKey === queueKey)
      .sort((left, right) => left.sequence - right.sequence)
      .map(commandItemFromRecord);
  }

  async size(scope: Pick<RuntimeCommand['scope'], 'userId' | 'sessionId'>): Promise<number> {
    return (await this.list(scope)).length;
  }

  private async nextSequence(store: StructuredStoreProvider, id: string): Promise<number> {
    const current = await store.get<RuntimeSequenceRecord>(this.sequenceTable, id);
    const value = (current?.value ?? 0) + 1;
    await store.insert(this.sequenceTable, { id, value });
    return value;
  }

  private get commandTable(): string {
    return `${this.tablePrefix}_command_queue`;
  }

  private get commandIdempotencyTable(): string {
    return `${this.tablePrefix}_command_idempotency`;
  }

  private get sequenceTable(): string {
    return `${this.tablePrefix}_sequences`;
  }
}

export class LocalRuntimeDeliveryStore implements RuntimeDeliveryStore {
  private readonly structured: StructuredStoreProvider;
  private readonly now: () => string;
  private readonly tablePrefix: string;
  private readonly defaultMaxAttempts: number;

  constructor(options: LocalRuntimeDeliveryStoreOptions) {
    this.structured = options.structured;
    this.now = options.now ?? (() => new Date().toISOString());
    this.tablePrefix = options.tablePrefix ?? 'runtime';
    this.defaultMaxAttempts = options.defaultMaxAttempts ?? 3;
  }

  async enqueue<TPayload = unknown>(
    box: RuntimeDeliveryBox,
    message: RuntimeDeliveryRecord<TPayload>['message'],
    options: RuntimeDeliveryEnqueueOptions = {}
  ): Promise<RuntimeDeliveryEnqueueResult<TPayload>> {
    return this.structured.transaction(async (tx) => {
      const dedupeKey = runtimeDeliveryDedupeKey(box, message, options.idempotencyKey);
      const existing = await tx.get<RuntimeIdempotencyRecord>(this.idempotencyTable, dedupeKey);
      if (existing) {
        const record = await tx.get<RuntimeDeliveryRecord<TPayload>>(
          this.deliveryTable,
          existing.recordId
        );
        if (record) return { status: 'duplicate', record };
      }

      const timestamp = this.now();
      const record: RuntimeDeliveryRecord<TPayload> = {
        id: options.recordId ?? (await this.nextDeliveryRecordId(tx, box)),
        box,
        topic: message.topic,
        message,
        status: 'pending',
        attempts: 0,
        maxAttempts: options.maxAttempts ?? this.defaultMaxAttempts,
        availableAt: options.availableAt ?? message.availableAt ?? timestamp,
        createdAt: timestamp,
        updatedAt: timestamp,
        metadata: options.metadata,
      };
      await tx.insert(this.deliveryTable, record);
      await tx.insert(this.idempotencyTable, { id: dedupeKey, recordId: record.id });
      return { status: 'enqueued', record };
    });
  }

  async leaseNext(options: RuntimeDeliveryLeaseOptions): Promise<RuntimeDeliveryRecord | null> {
    return this.structured.transaction(async (tx) => {
      const nowMs = Date.parse(this.now());
      const candidates = (await tx.query<RuntimeDeliveryRecord>(this.deliveryTable, {}))
        .filter((record) => record.box === options.box)
        .filter((record) => !options.topic || record.topic === options.topic)
        .filter((record) => this.isLeaseCandidate(record, nowMs))
        .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
      const record = candidates[0];
      if (!record) return null;

      const leaseToken = await this.nextSequence(tx, 'delivery_lease');
      const updated: RuntimeDeliveryRecord = {
        ...record,
        status: 'leased',
        attempts: record.attempts + 1,
        leaseOwnerId: options.ownerId,
        leaseToken,
        leaseExpiresAt: new Date(nowMs + options.ttlMs).toISOString(),
        updatedAt: this.now(),
      };
      await tx.insert(this.deliveryTable, updated);
      return updated;
    });
  }

  async acknowledge(recordId: string, leaseToken: number): Promise<RuntimeDeliveryRecord> {
    return this.structured.transaction(async (tx) => {
      const record = await this.requireRecord(tx, recordId);
      this.assertDeliveryLease(record, leaseToken);
      const updated: RuntimeDeliveryRecord = {
        ...record,
        status: 'acknowledged',
        acknowledgedAt: this.now(),
        updatedAt: this.now(),
      };
      await tx.insert(this.deliveryTable, updated);
      return updated;
    });
  }

  async negativeAcknowledge(
    recordId: string,
    leaseToken: number,
    options: RuntimeDeliveryNackOptions = {}
  ): Promise<RuntimeDeliveryRecord> {
    return this.structured.transaction(async (tx) => {
      const record = await this.requireRecord(tx, recordId);
      this.assertDeliveryLease(record, leaseToken);
      const exhausted = record.attempts >= record.maxAttempts;
      const updated: RuntimeDeliveryRecord = {
        ...record,
        status: exhausted ? 'dead_lettered' : 'pending',
        leaseOwnerId: undefined,
        leaseToken: undefined,
        leaseExpiresAt: undefined,
        availableAt: exhausted
          ? record.availableAt
          : new Date(Date.parse(this.now()) + (options.retryAfterMs ?? 0)).toISOString(),
        updatedAt: this.now(),
        deadLetteredAt: exhausted ? this.now() : record.deadLetteredAt,
        deadLetterReason: exhausted ? options.reason ?? 'max_attempts_exhausted' : undefined,
      };
      await tx.insert(this.deliveryTable, updated);
      return updated;
    });
  }

  async list(filter: {
    box?: RuntimeDeliveryBox;
    topic?: string;
    status?: RuntimeDeliveryStatus;
  } = {}): Promise<RuntimeDeliveryRecord[]> {
    return (await this.structured.query<RuntimeDeliveryRecord>(this.deliveryTable, {}))
      .filter((record) => !filter.box || record.box === filter.box)
      .filter((record) => !filter.topic || record.topic === filter.topic)
      .filter((record) => !filter.status || record.status === filter.status)
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  }

  private isLeaseCandidate(record: RuntimeDeliveryRecord, nowMs: number): boolean {
    if (Date.parse(record.availableAt) > nowMs) return false;
    if (record.status === 'pending') return true;
    return record.status === 'leased' && Date.parse(record.leaseExpiresAt ?? '') <= nowMs;
  }

  private assertDeliveryLease(record: RuntimeDeliveryRecord, leaseToken: number): void {
    if (record.status !== 'leased' || record.leaseToken !== leaseToken) {
      throw new FrameworkError({
        code: 'RUNTIME_DELIVERY_STALE_LEASE',
        message: `Delivery record ${record.id} is not leased by token ${leaseToken}`,
        context: {
          recordId: record.id,
          expectedLeaseToken: record.leaseToken,
          actualLeaseToken: leaseToken,
          status: record.status,
        },
      });
    }
    if (Date.parse(record.leaseExpiresAt ?? '') <= Date.parse(this.now())) {
      throw new FrameworkError({
        code: 'RUNTIME_DELIVERY_LEASE_EXPIRED',
        message: `Delivery record ${record.id} lease has expired`,
        context: { recordId: record.id, leaseToken },
      });
    }
  }

  private async requireRecord(
    store: StructuredStoreProvider,
    recordId: string
  ): Promise<RuntimeDeliveryRecord> {
    const record = await store.get<RuntimeDeliveryRecord>(this.deliveryTable, recordId);
    if (!record) {
      throw new FrameworkError({
        code: 'RUNTIME_DELIVERY_RECORD_NOT_FOUND',
        message: `Delivery record not found: ${recordId}`,
        context: { recordId },
      });
    }
    return record;
  }

  private async nextDeliveryRecordId(
    store: StructuredStoreProvider,
    box: RuntimeDeliveryBox
  ): Promise<string> {
    return `${box}:${await this.nextSequence(store, `delivery_${box}`)}`;
  }

  private async nextSequence(store: StructuredStoreProvider, id: string): Promise<number> {
    const current = await store.get<RuntimeSequenceRecord>(this.sequenceTable, id);
    const value = (current?.value ?? 0) + 1;
    await store.insert(this.sequenceTable, { id, value });
    return value;
  }

  private get deliveryTable(): string {
    return `${this.tablePrefix}_delivery_records`;
  }

  private get idempotencyTable(): string {
    return `${this.tablePrefix}_delivery_idempotency`;
  }

  private get sequenceTable(): string {
    return `${this.tablePrefix}_sequences`;
  }
}

export class LocalRuntimeMessageBus implements MessageBus {
  private readonly delivery: RuntimeDeliveryStore;
  private readonly now: () => string;
  private readonly subscribers = new Map<string, Map<string, MessageBusHandler>>();
  private sequence = 0;

  constructor(options: LocalRuntimeMessageBusOptions) {
    this.delivery = options.delivery;
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async publish<TPayload = unknown>(
    message: Omit<MessageBusMessage<TPayload>, 'id' | 'publishedAt'> &
      Partial<Pick<MessageBusMessage<TPayload>, 'id' | 'publishedAt'>>,
    options: MessageBusPublishOptions = {}
  ): Promise<MessageBusPublishResult> {
    const topic = options.topic ?? message.topic;
    const idempotencyKey = options.idempotencyKey ?? message.idempotencyKey;
    const stored: MessageBusMessage<TPayload> = {
      ...message,
      id: message.id ?? this.nextMessageId(topic, message, idempotencyKey),
      topic,
      idempotencyKey,
      correlationId: options.correlationId ?? message.correlationId,
      causationId: options.causationId ?? message.causationId,
      publishedAt: message.publishedAt ?? this.now(),
      availableAt: options.delayUntil ?? message.availableAt,
      expiresAt: options.expiresAt ?? message.expiresAt,
      metadata: { ...message.metadata, ...options.metadata },
    };
    const result = await this.delivery.enqueue('outbox', stored, { idempotencyKey });
    if (result.status === 'enqueued' && this.isAvailable(stored)) {
      await this.notifySubscribers(stored);
    }
    return {
      messageId: result.record.message.id,
      topic,
      duplicate: result.status === 'duplicate',
    };
  }

  async subscribe<TPayload = unknown>(
    topic: string,
    handler: MessageBusHandler<TPayload>
  ): Promise<MessageBusSubscription> {
    this.sequence += 1;
    const id = `${topic}:subscription:${this.sequence}`;
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
    const records = await this.delivery.list({ box: 'outbox', topic });
    return records.map((record) => record.message);
  }

  private async notifySubscribers(message: MessageBusMessage): Promise<void> {
    const subscribers = this.subscribers.get(message.topic);
    if (!subscribers) return;
    for (const handler of subscribers.values()) {
      await handler(message);
    }
  }

  private isAvailable(message: MessageBusMessage): boolean {
    if (!message.availableAt) return true;
    return Date.parse(message.availableAt) <= Date.parse(this.now());
  }

  private nextMessageId(
    topic: string,
    message: { payload: unknown; correlationId?: string; causationId?: string },
    idempotencyKey?: string
  ): string {
    if (!idempotencyKey) {
      this.sequence += 1;
      return `${topic}:${this.sequence}`;
    }
    return `${topic}:${hash(`${idempotencyKey}:${message.correlationId ?? ''}:${message.causationId ?? ''}:${JSON.stringify(message.payload)}`)}`;
  }
}

export class LocalRuntimeLeaseCoordinator implements RuntimeLeaseCoordinator {
  private readonly structured: StructuredStoreProvider;
  private readonly now: () => string;
  private readonly tablePrefix: string;

  constructor(options: LocalRuntimeStoreOptions) {
    this.structured = options.structured;
    this.now = options.now ?? (() => new Date().toISOString());
    this.tablePrefix = options.tablePrefix ?? 'runtime';
  }

  async acquire(
    resourceId: string,
    ownerId: string,
    ttlMs: number,
    metadata?: Record<string, unknown>
  ): Promise<RuntimeLeaseAcquireResult> {
    return this.structured.transaction(async (tx) => {
      const current = await this.getFrom(tx, resourceId);
      if (current && current.ownerId !== ownerId) {
        return { status: 'busy', current };
      }

      const acquiredAt = this.now();
      const lease: RuntimeLease = {
        resourceId,
        ownerId,
        fencingToken: await this.nextSequence(tx, 'lease_fencing'),
        acquiredAt,
        expiresAt: new Date(Date.parse(acquiredAt) + ttlMs).toISOString(),
        metadata,
      };
      await tx.insert(this.leaseTable, { ...lease, id: resourceId });
      return { status: 'acquired', lease };
    });
  }

  async renew(
    resourceId: string,
    ownerId: string,
    fencingToken: number,
    ttlMs: number
  ): Promise<RuntimeLease> {
    return this.structured.transaction(async (tx) => {
      const current = await this.requireLease(tx, resourceId);
      this.assertLeaseOwner(current, ownerId, fencingToken);
      const renewed: RuntimeLease = {
        ...current,
        expiresAt: new Date(Date.parse(this.now()) + ttlMs).toISOString(),
      };
      await tx.insert(this.leaseTable, { ...renewed, id: resourceId });
      return renewed;
    });
  }

  async release(resourceId: string, ownerId: string, fencingToken: number): Promise<void> {
    await this.structured.transaction(async (tx) => {
      const current = await this.requireLease(tx, resourceId);
      this.assertLeaseOwner(current, ownerId, fencingToken);
      await tx.update(this.leaseTable, resourceId, {
        expiresAt: '1970-01-01T00:00:00.000Z',
      });
    });
  }

  async assert(resourceId: string, fencingToken: number): Promise<void> {
    const current = await this.requireLease(this.structured, resourceId);
    if (current.fencingToken !== fencingToken || Date.parse(current.expiresAt) <= Date.parse(this.now())) {
      throw new FrameworkError({
        code: 'RUNTIME_LEASE_STALE_FENCING_TOKEN',
        message: `Lease fencing token is stale for ${resourceId}`,
        context: {
          resourceId,
          expectedFencingToken: current.fencingToken,
          actualFencingToken: fencingToken,
        },
      });
    }
  }

  async get(resourceId: string): Promise<RuntimeLease | null> {
    return this.getFrom(this.structured, resourceId);
  }

  private async getFrom(
    store: StructuredStoreProvider,
    resourceId: string
  ): Promise<RuntimeLease | null> {
    const record = await store.get<RuntimeLease & { id: string }>(this.leaseTable, resourceId);
    if (!record || Date.parse(record.expiresAt) <= Date.parse(this.now())) return null;
    return stripStorageId(record);
  }

  private async requireLease(
    store: StructuredStoreProvider,
    resourceId: string
  ): Promise<RuntimeLease> {
    const current = await this.getFrom(store, resourceId);
    if (!current) {
      throw new FrameworkError({
        code: 'RUNTIME_LEASE_NOT_FOUND',
        message: `Lease not found for ${resourceId}`,
        context: { resourceId },
      });
    }
    return current;
  }

  private assertLeaseOwner(lease: RuntimeLease, ownerId: string, fencingToken: number): void {
    if (lease.ownerId !== ownerId || lease.fencingToken !== fencingToken) {
      throw new FrameworkError({
        code: 'RUNTIME_LEASE_OWNER_MISMATCH',
        message: `Lease owner or fencing token mismatch for ${lease.resourceId}`,
        context: {
          resourceId: lease.resourceId,
          expectedOwnerId: lease.ownerId,
          actualOwnerId: ownerId,
          expectedFencingToken: lease.fencingToken,
          actualFencingToken: fencingToken,
        },
      });
    }
  }

  private async nextSequence(store: StructuredStoreProvider, id: string): Promise<number> {
    const current = await store.get<RuntimeSequenceRecord>(this.sequenceTable, id);
    const value = (current?.value ?? 0) + 1;
    await store.insert(this.sequenceTable, { id, value });
    return value;
  }

  private get leaseTable(): string {
    return `${this.tablePrefix}_leases`;
  }

  private get sequenceTable(): string {
    return `${this.tablePrefix}_sequences`;
  }
}

function stripStorageId(record: RuntimeLease & { id?: string }): RuntimeLease {
  const { id: _id, ...lease } = record;
  return lease;
}

function commandItemFromRecord<TPayload = unknown>(
  record: RuntimeCommandQueueRecord<TPayload>
): RuntimeCommandQueueItem<TPayload> {
  return {
    command: record.command,
    queueKey: record.queueKey,
    sequence: record.sequence,
    enqueuedAt: record.enqueuedAt,
  };
}

function hash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 16);
}
