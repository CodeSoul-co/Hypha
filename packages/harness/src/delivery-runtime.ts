import { FrameworkError } from '@hypha/core';
import type { MessageBusMessage, RuntimeScope } from './contracts';

export type RuntimeDeliveryBox = 'inbox' | 'outbox';

export type RuntimeDeliveryStatus =
  | 'pending'
  | 'leased'
  | 'acknowledged'
  | 'dead_lettered';

export interface RuntimeDeliveryRecord<TPayload = unknown> {
  id: string;
  box: RuntimeDeliveryBox;
  topic: string;
  message: MessageBusMessage<TPayload>;
  status: RuntimeDeliveryStatus;
  attempts: number;
  maxAttempts: number;
  availableAt: string;
  createdAt: string;
  updatedAt: string;
  leaseOwnerId?: string;
  leaseToken?: number;
  leaseExpiresAt?: string;
  acknowledgedAt?: string;
  deadLetteredAt?: string;
  deadLetterReason?: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeDeliveryEnqueueOptions {
  recordId?: string;
  idempotencyKey?: string;
  availableAt?: string;
  maxAttempts?: number;
  metadata?: Record<string, unknown>;
}

export interface RuntimeDeliveryEnqueueResult<TPayload = unknown> {
  status: 'enqueued' | 'duplicate';
  record: RuntimeDeliveryRecord<TPayload>;
}

export interface RuntimeDeliveryLeaseOptions {
  box: RuntimeDeliveryBox;
  topic?: string;
  ownerId: string;
  ttlMs: number;
}

export interface RuntimeDeliveryNackOptions {
  reason?: string;
  retryAfterMs?: number;
}

export interface RuntimeDeliveryStore {
  enqueue<TPayload = unknown>(
    box: RuntimeDeliveryBox,
    message: MessageBusMessage<TPayload>,
    options?: RuntimeDeliveryEnqueueOptions
  ): Promise<RuntimeDeliveryEnqueueResult<TPayload>>;
  leaseNext(options: RuntimeDeliveryLeaseOptions): Promise<RuntimeDeliveryRecord | null>;
  acknowledge(recordId: string, leaseToken: number): Promise<RuntimeDeliveryRecord>;
  negativeAcknowledge(
    recordId: string,
    leaseToken: number,
    options?: RuntimeDeliveryNackOptions
  ): Promise<RuntimeDeliveryRecord>;
  list(filter?: {
    box?: RuntimeDeliveryBox;
    topic?: string;
    status?: RuntimeDeliveryStatus;
  }): Promise<RuntimeDeliveryRecord[]>;
}

export interface InMemoryRuntimeDeliveryStoreOptions {
  now?: () => string;
  defaultMaxAttempts?: number;
}

export class InMemoryRuntimeDeliveryStore implements RuntimeDeliveryStore {
  private readonly records = new Map<string, RuntimeDeliveryRecord>();
  private readonly idempotency = new Map<string, string>();
  private sequence = 0;
  private leaseSequence = 0;
  private readonly now: () => string;
  private readonly defaultMaxAttempts: number;

  constructor(options: InMemoryRuntimeDeliveryStoreOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
    this.defaultMaxAttempts = options.defaultMaxAttempts ?? 3;
  }

  async enqueue<TPayload = unknown>(
    box: RuntimeDeliveryBox,
    message: MessageBusMessage<TPayload>,
    options: RuntimeDeliveryEnqueueOptions = {}
  ): Promise<RuntimeDeliveryEnqueueResult<TPayload>> {
    const dedupeKey = runtimeDeliveryDedupeKey(box, message, options.idempotencyKey);
    const existingId = this.idempotency.get(dedupeKey);
    if (existingId) {
      return {
        status: 'duplicate',
        record: this.requireRecord(existingId) as RuntimeDeliveryRecord<TPayload>,
      };
    }

    const timestamp = this.now();
    const record: RuntimeDeliveryRecord<TPayload> = {
      id: options.recordId ?? this.nextRecordId(box),
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
    this.records.set(record.id, record);
    this.idempotency.set(dedupeKey, record.id);
    return { status: 'enqueued', record };
  }

  async leaseNext(options: RuntimeDeliveryLeaseOptions): Promise<RuntimeDeliveryRecord | null> {
    const nowMs = Date.parse(this.now());
    const candidates = Array.from(this.records.values())
      .filter((record) => record.box === options.box)
      .filter((record) => !options.topic || record.topic === options.topic)
      .filter((record) => record.status === 'pending')
      .filter((record) => Date.parse(record.availableAt) <= nowMs)
      .sort((left, right) => left.createdAt.localeCompare(right.createdAt));
    const record = candidates[0];
    if (!record) return null;

    this.leaseSequence += 1;
    const updated: RuntimeDeliveryRecord = {
      ...record,
      status: 'leased',
      attempts: record.attempts + 1,
      leaseOwnerId: options.ownerId,
      leaseToken: this.leaseSequence,
      leaseExpiresAt: new Date(nowMs + options.ttlMs).toISOString(),
      updatedAt: this.now(),
    };
    this.records.set(updated.id, updated);
    return updated;
  }

  async acknowledge(recordId: string, leaseToken: number): Promise<RuntimeDeliveryRecord> {
    const record = this.requireRecord(recordId);
    this.assertLease(record, leaseToken);
    const updated: RuntimeDeliveryRecord = {
      ...record,
      status: 'acknowledged',
      acknowledgedAt: this.now(),
      updatedAt: this.now(),
    };
    this.records.set(recordId, updated);
    return updated;
  }

  async negativeAcknowledge(
    recordId: string,
    leaseToken: number,
    options: RuntimeDeliveryNackOptions = {}
  ): Promise<RuntimeDeliveryRecord> {
    const record = this.requireRecord(recordId);
    this.assertLease(record, leaseToken);
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
    this.records.set(recordId, updated);
    return updated;
  }

  async list(filter: {
    box?: RuntimeDeliveryBox;
    topic?: string;
    status?: RuntimeDeliveryStatus;
  } = {}): Promise<RuntimeDeliveryRecord[]> {
    return Array.from(this.records.values()).filter((record) => {
      if (filter.box && record.box !== filter.box) return false;
      if (filter.topic && record.topic !== filter.topic) return false;
      if (filter.status && record.status !== filter.status) return false;
      return true;
    });
  }

  private assertLease(record: RuntimeDeliveryRecord, leaseToken: number): void {
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
    const expiresAt = record.leaseExpiresAt ? Date.parse(record.leaseExpiresAt) : 0;
    if (expiresAt <= Date.parse(this.now())) {
      throw new FrameworkError({
        code: 'RUNTIME_DELIVERY_LEASE_EXPIRED',
        message: `Delivery record ${record.id} lease has expired`,
        context: { recordId: record.id, leaseToken },
      });
    }
  }

  private requireRecord(recordId: string): RuntimeDeliveryRecord {
    const record = this.records.get(recordId);
    if (!record) {
      throw new FrameworkError({
        code: 'RUNTIME_DELIVERY_RECORD_NOT_FOUND',
        message: `Delivery record not found: ${recordId}`,
        context: { recordId },
      });
    }
    return record;
  }

  private nextRecordId(box: RuntimeDeliveryBox): string {
    this.sequence += 1;
    return `${box}:${this.sequence}`;
  }
}

export type RuntimeLeaseStatus = 'acquired' | 'busy';

export interface RuntimeLease {
  resourceId: string;
  ownerId: string;
  fencingToken: number;
  acquiredAt: string;
  expiresAt: string;
  metadata?: Record<string, unknown>;
}

export interface RuntimeLeaseAcquireResult {
  status: RuntimeLeaseStatus;
  lease?: RuntimeLease;
  current?: RuntimeLease;
}

export interface RuntimeLeaseCoordinator {
  acquire(
    resourceId: string,
    ownerId: string,
    ttlMs: number,
    metadata?: Record<string, unknown>
  ): Promise<RuntimeLeaseAcquireResult>;
  renew(resourceId: string, ownerId: string, fencingToken: number, ttlMs: number): Promise<RuntimeLease>;
  release(resourceId: string, ownerId: string, fencingToken: number): Promise<void>;
  assert(resourceId: string, fencingToken: number): Promise<void>;
  get(resourceId: string): Promise<RuntimeLease | null>;
}

export interface InMemoryRuntimeLeaseCoordinatorOptions {
  now?: () => string;
}

export class InMemoryRuntimeLeaseCoordinator implements RuntimeLeaseCoordinator {
  private readonly leases = new Map<string, RuntimeLease>();
  private fencingSequence = 0;
  private readonly now: () => string;

  constructor(options: InMemoryRuntimeLeaseCoordinatorOptions = {}) {
    this.now = options.now ?? (() => new Date().toISOString());
  }

  async acquire(
    resourceId: string,
    ownerId: string,
    ttlMs: number,
    metadata?: Record<string, unknown>
  ): Promise<RuntimeLeaseAcquireResult> {
    const current = await this.get(resourceId);
    if (current && current.ownerId !== ownerId) {
      return { status: 'busy', current };
    }

    this.fencingSequence += 1;
    const acquiredAt = this.now();
    const lease: RuntimeLease = {
      resourceId,
      ownerId,
      fencingToken: this.fencingSequence,
      acquiredAt,
      expiresAt: new Date(Date.parse(acquiredAt) + ttlMs).toISOString(),
      metadata,
    };
    this.leases.set(resourceId, lease);
    return { status: 'acquired', lease };
  }

  async renew(
    resourceId: string,
    ownerId: string,
    fencingToken: number,
    ttlMs: number
  ): Promise<RuntimeLease> {
    const current = this.requireLease(resourceId);
    this.assertLeaseOwner(current, ownerId, fencingToken);
    const renewed: RuntimeLease = {
      ...current,
      expiresAt: new Date(Date.parse(this.now()) + ttlMs).toISOString(),
    };
    this.leases.set(resourceId, renewed);
    return renewed;
  }

  async release(resourceId: string, ownerId: string, fencingToken: number): Promise<void> {
    const current = this.requireLease(resourceId);
    this.assertLeaseOwner(current, ownerId, fencingToken);
    this.leases.delete(resourceId);
  }

  async assert(resourceId: string, fencingToken: number): Promise<void> {
    const current = this.requireLease(resourceId);
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
    const current = this.leases.get(resourceId);
    if (!current) return null;
    if (Date.parse(current.expiresAt) <= Date.parse(this.now())) {
      this.leases.delete(resourceId);
      return null;
    }
    return current;
  }

  private requireLease(resourceId: string): RuntimeLease {
    const current = this.leases.get(resourceId);
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
}

export function runtimeDeliveryDedupeKey(
  box: RuntimeDeliveryBox,
  message: Pick<MessageBusMessage, 'id' | 'topic' | 'idempotencyKey'>,
  idempotencyKey?: string
): string {
  return `${box}:${message.topic}:${idempotencyKey ?? message.idempotencyKey ?? message.id}`;
}

export function runtimeSessionLeaseResource(scope: Pick<RuntimeScope, 'userId' | 'sessionId'>): string {
  return `runtime.session:${scope.userId}:${scope.sessionId}`;
}
