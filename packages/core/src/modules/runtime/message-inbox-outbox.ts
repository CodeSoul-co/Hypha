import type { ProviderHealth } from '../../contracts/execution';
import type { NormalizedRuntimeError, RuntimeErrorCode } from '../../contracts/runtime';
import type {
  RuntimeMessageEnvelope,
  RuntimeMessageInboxRecord,
  RuntimeMessageOutboxRecord,
} from '../../contracts/runtime-messages';
import type { MessageBus, MessageDelivery } from './message-bus';
import {
  addMilliseconds,
  busError,
  createRuntimeMessageEnvelope,
  isAtOrBefore,
  nonEmpty,
  positive,
} from './message-bus';
import { hashCanonicalJson } from './canonical-json';

export interface InboxClaimRequest {
  consumerId: string;
  ownerId: string;
  messageId: string;
  payloadHash: string;
  receivedAt: string;
  processingLeaseMs: number;
  expiresAt?: string;
}

export interface InboxClaimResult {
  disposition: 'claimed' | 'duplicate' | 'busy' | 'conflict' | 'expired';
  record: RuntimeMessageInboxRecord;
}

export interface RuntimeMessageInboxStore {
  claim(request: InboxClaimRequest): Promise<InboxClaimResult>;
  complete(
    consumerId: string,
    messageId: string,
    ownerId: string,
    appliedEventIds: string[],
    completedAt: string
  ): Promise<void>;
  fail(
    consumerId: string,
    messageId: string,
    ownerId: string,
    error: NormalizedRuntimeError,
    failedAt: string
  ): Promise<void>;
  get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
  health(): Promise<ProviderHealth>;
}

export class InMemoryRuntimeMessageInboxStore implements RuntimeMessageInboxStore {
  private readonly records = new Map<string, RuntimeMessageInboxRecord>();

  async claim(request: InboxClaimRequest): Promise<InboxClaimResult> {
    validateInboxClaim(request);
    const key = inboxKey(request.consumerId, request.messageId);
    const existing = this.records.get(key);
    if (existing) {
      existing.lastReceivedAt = request.receivedAt;
      existing.attempts += 1;
      if (existing.payloadHash !== request.payloadHash) {
        return { disposition: 'conflict', record: structuredClone(existing) };
      }
      if (existing.status === 'applied' || existing.status === 'ignored') {
        return { disposition: 'duplicate', record: structuredClone(existing) };
      }
      if (
        existing.status === 'processing' &&
        existing.processingExpiresAt !== undefined &&
        !isAtOrBefore(existing.processingExpiresAt, request.receivedAt)
      ) {
        return { disposition: 'busy', record: structuredClone(existing) };
      }
      existing.status = 'processing';
      existing.processingOwner = request.ownerId;
      existing.processingExpiresAt = addMilliseconds(request.receivedAt, request.processingLeaseMs);
      delete existing.lastError;
      return { disposition: 'claimed', record: structuredClone(existing) };
    }

    const expired =
      request.expiresAt !== undefined && isAtOrBefore(request.expiresAt, request.receivedAt);
    const record: RuntimeMessageInboxRecord = {
      consumerId: request.consumerId,
      messageId: request.messageId,
      payloadHash: request.payloadHash,
      status: expired ? 'ignored' : 'processing',
      firstReceivedAt: request.receivedAt,
      lastReceivedAt: request.receivedAt,
      attempts: 1,
      ...(request.expiresAt === undefined ? {} : { expiresAt: request.expiresAt }),
      ...(expired
        ? {}
        : {
            processingOwner: request.ownerId,
            processingExpiresAt: addMilliseconds(request.receivedAt, request.processingLeaseMs),
          }),
    };
    this.records.set(key, record);
    return { disposition: expired ? 'expired' : 'claimed', record: structuredClone(record) };
  }

  async complete(
    consumerId: string,
    messageId: string,
    ownerId: string,
    appliedEventIds: string[],
    completedAt: string
  ): Promise<void> {
    timestamp(completedAt, 'completedAt');
    const record = this.requireOwnedProcessing(consumerId, messageId, ownerId, completedAt);
    record.status = 'applied';
    record.appliedEventIds = [...appliedEventIds];
    record.lastReceivedAt = completedAt;
    delete record.processingOwner;
    delete record.processingExpiresAt;
    delete record.lastError;
  }

  async fail(
    consumerId: string,
    messageId: string,
    ownerId: string,
    error: NormalizedRuntimeError,
    failedAt: string
  ): Promise<void> {
    timestamp(failedAt, 'failedAt');
    const record = this.requireOwnedProcessing(consumerId, messageId, ownerId, failedAt);
    record.status = 'failed';
    record.lastError = structuredClone(error);
    record.lastReceivedAt = failedAt;
    delete record.processingOwner;
    delete record.processingExpiresAt;
  }

  async get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null> {
    const record = this.records.get(inboxKey(consumerId, messageId));
    return record ? structuredClone(record) : null;
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: new Date().toISOString(),
      details: { records: this.records.size },
    };
  }

  private requireOwnedProcessing(
    consumerId: string,
    messageId: string,
    ownerId: string,
    at: string
  ): RuntimeMessageInboxRecord {
    const record = this.records.get(inboxKey(consumerId, messageId));
    if (!record) throw busError('RUNTIME_INTERNAL_ERROR', 'Inbox claim was not found');
    if (
      record.status !== 'processing' ||
      record.processingOwner !== ownerId ||
      record.processingExpiresAt === undefined ||
      isAtOrBefore(record.processingExpiresAt, at)
    ) {
      throw busError('RUNTIME_LEASE_CONFLICT', 'Inbox processing lease is not owned');
    }
    return record;
  }
}

export interface RuntimeInboxHandleResult {
  disposition: 'applied' | 'duplicate' | 'busy' | 'failed' | 'dead_lettered' | 'expired';
  appliedEventIds: string[];
  ackPending?: boolean;
}

export interface RuntimeInboxProcessorOptions {
  consumerId: string;
  ownerId: string;
  inbox: RuntimeMessageInboxStore;
  now?: () => string;
  processingLeaseMs?: number;
}

export class RuntimeInboxProcessor {
  private readonly now: () => string;
  private readonly processingLeaseMs: number;

  constructor(private readonly options: RuntimeInboxProcessorOptions) {
    nonEmpty(options.consumerId, 'consumerId');
    nonEmpty(options.ownerId, 'ownerId');
    this.now = options.now ?? (() => new Date().toISOString());
    this.processingLeaseMs = positive(options.processingLeaseMs ?? 30_000, 'processingLeaseMs');
  }

  async handle(
    delivery: MessageDelivery,
    apply: (envelope: RuntimeMessageEnvelope) => Promise<string[]>
  ): Promise<RuntimeInboxHandleResult> {
    const receivedAt = this.now();
    const claim = await this.options.inbox.claim({
      consumerId: this.options.consumerId,
      ownerId: this.options.ownerId,
      messageId: delivery.envelope.messageId,
      payloadHash: delivery.envelope.payloadHash,
      receivedAt,
      processingLeaseMs: this.processingLeaseMs,
      ...(delivery.envelope.expiresAt === undefined
        ? {}
        : { expiresAt: delivery.envelope.expiresAt }),
    });
    if (claim.disposition === 'conflict') {
      await delivery.deadLetter('inbox_payload_hash_conflict');
      return { disposition: 'dead_lettered', appliedEventIds: [] };
    }
    if (claim.disposition === 'busy') {
      await delivery.nack({ reason: 'inbox_claim_busy' });
      return { disposition: 'busy', appliedEventIds: [] };
    }
    if (claim.disposition === 'duplicate' || claim.disposition === 'expired') {
      const ackPending = !(await tryAcknowledge(delivery));
      return {
        disposition: claim.disposition,
        appliedEventIds: [...(claim.record.appliedEventIds ?? [])],
        ...(ackPending ? { ackPending } : {}),
      };
    }

    let appliedEventIds: string[];
    try {
      appliedEventIds = await apply(structuredClone(delivery.envelope));
      await this.options.inbox.complete(
        this.options.consumerId,
        delivery.envelope.messageId,
        this.options.ownerId,
        appliedEventIds,
        this.now()
      );
    } catch (error) {
      await this.options.inbox.fail(
        this.options.consumerId,
        delivery.envelope.messageId,
        this.options.ownerId,
        normalizeRuntimeError(error, 'RUNTIME_INTERNAL_ERROR', true),
        this.now()
      );
      await delivery.nack({ reason: 'inbox_apply_failed' });
      return { disposition: 'failed', appliedEventIds: [] };
    }

    const ackPending = !(await tryAcknowledge(delivery));
    return {
      disposition: 'applied',
      appliedEventIds: [...appliedEventIds],
      ...(ackPending ? { ackPending } : {}),
    };
  }
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
    error: NormalizedRuntimeError;
    retryAt?: string;
    deadLetter?: boolean;
  }): Promise<void>;
  get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
  health(): Promise<ProviderHealth>;
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
    nonEmpty(input.id, 'outbox.id');
    timestamp(input.createdAt, 'createdAt');
    const envelope = createRuntimeMessageEnvelope(input.envelope);
    const existingId = this.idsByMessage.get(envelope.messageId);
    if (existingId) {
      const existing = this.records.get(existingId) as RuntimeMessageOutboxRecord;
      if (hashCanonicalJson(existing.envelope) !== hashCanonicalJson(envelope)) {
        throw busError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Outbox message was reused with different content: ${envelope.messageId}`
        );
      }
      return structuredClone(existing);
    }
    if (this.records.has(input.id)) {
      throw busError('RUNTIME_IDEMPOTENCY_CONFLICT', `Outbox id already exists: ${input.id}`);
    }
    const availableAt = input.availableAt ?? input.createdAt;
    timestamp(availableAt, 'availableAt');
    const record: RuntimeMessageOutboxRecord = {
      id: input.id,
      ...(input.eventId === undefined ? {} : { eventId: input.eventId }),
      messageId: envelope.messageId,
      topic: envelope.topic,
      partitionKey: envelope.partitionKey,
      envelope,
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
    nonEmpty(input.ownerId, 'ownerId');
    timestamp(input.now, 'now');
    positive(input.leaseMs, 'leaseMs');
    positive(input.limit, 'limit');
    const eligible = [...this.records.values()]
      .filter(
        (record) =>
          (record.state === 'pending' ||
            record.state === 'failed' ||
            (record.state === 'publishing' &&
              record.leaseExpiresAt !== undefined &&
              isAtOrBefore(record.leaseExpiresAt, input.now))) &&
          isAtOrBefore(record.availableAt, input.now)
      )
      .sort(
        (left, right) =>
          Date.parse(left.availableAt) - Date.parse(right.availableAt) ||
          Date.parse(left.createdAt) - Date.parse(right.createdAt) ||
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
    const record = this.requireOwnedPublishing(id, ownerId, publishedAt);
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
    error: NormalizedRuntimeError;
    retryAt?: string;
    deadLetter?: boolean;
  }): Promise<void> {
    const record = this.requireOwnedPublishing(input.id, input.ownerId, input.failedAt);
    if (input.retryAt) timestamp(input.retryAt, 'retryAt');
    record.state = input.deadLetter ? 'dead_letter' : 'failed';
    record.availableAt = input.retryAt ?? input.failedAt;
    record.lastError = structuredClone(input.error);
    record.updatedAt = input.failedAt;
    delete record.leaseOwner;
    delete record.leaseExpiresAt;
  }

  async get(id: string): Promise<RuntimeMessageOutboxRecord | null> {
    const record = this.records.get(id);
    return record ? structuredClone(record) : null;
  }

  async health(): Promise<ProviderHealth> {
    return {
      status: 'healthy',
      checkedAt: new Date().toISOString(),
      details: { records: this.records.size },
    };
  }

  private requireOwnedPublishing(
    id: string,
    ownerId: string,
    at: string
  ): RuntimeMessageOutboxRecord {
    timestamp(at, 'outbox operation timestamp');
    const record = this.records.get(id);
    if (!record) throw busError('RUNTIME_INTERNAL_ERROR', `Outbox record not found: ${id}`);
    if (
      record.state !== 'publishing' ||
      record.leaseOwner !== ownerId ||
      record.leaseExpiresAt === undefined ||
      isAtOrBefore(record.leaseExpiresAt, at)
    ) {
      throw busError('RUNTIME_LEASE_CONFLICT', `Outbox lease is not owned: ${id}`);
    }
    return record;
  }
}

export interface RuntimeOutboxDispatcherOptions {
  ownerId: string;
  outbox: RuntimeMessageOutboxStore;
  bus: MessageBus;
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
    nonEmpty(options.ownerId, 'ownerId');
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
      } catch (error) {
        const failedAt = this.now();
        const deadLetter = record.attempts >= this.maxAttempts;
        await this.options.outbox.markFailed({
          id: record.id,
          ownerId: this.options.ownerId,
          failedAt,
          error: normalizeRuntimeError(error, 'RUNTIME_MESSAGE_BUS_UNAVAILABLE', !deadLetter),
          deadLetter,
          ...(!deadLetter
            ? { retryAt: addMilliseconds(failedAt, this.retryDelayMs(record.attempts)) }
            : {}),
        });
        if (deadLetter) result.deadLettered += 1;
        else result.failed += 1;
        continue;
      }
      await this.options.outbox.markPublished(record.id, this.options.ownerId, this.now());
      result.published += 1;
    }
    return result;
  }
}

function validateInboxClaim(request: InboxClaimRequest): void {
  nonEmpty(request.consumerId, 'consumerId');
  nonEmpty(request.ownerId, 'ownerId');
  nonEmpty(request.messageId, 'messageId');
  if (!/^sha256:[a-f0-9]{64}$/u.test(request.payloadHash)) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'payloadHash is invalid');
  }
  timestamp(request.receivedAt, 'receivedAt');
  if (request.expiresAt) timestamp(request.expiresAt, 'expiresAt');
  positive(request.processingLeaseMs, 'processingLeaseMs');
}

function inboxKey(consumerId: string, messageId: string): string {
  return `${consumerId}\u0000${messageId}`;
}

function timestamp(value: string, label: string): void {
  if (!Number.isFinite(Date.parse(value))) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a valid timestamp`);
  }
}

function normalizeRuntimeError(
  error: unknown,
  code: RuntimeErrorCode,
  retryable: boolean
): NormalizedRuntimeError {
  return {
    code,
    message: error instanceof Error ? error.message : String(error),
    retryable,
  };
}

async function tryAcknowledge(delivery: MessageDelivery): Promise<boolean> {
  try {
    await delivery.ack();
    return true;
  } catch {
    return false;
  }
}
