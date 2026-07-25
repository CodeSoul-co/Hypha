import type { ProviderHealth } from '../../contracts/execution';
import type {
  RuntimeMessageEnvelope,
  RuntimeMessageEnvelopeInput,
} from '../../contracts/runtime-messages';
import { validateRuntimeMessageEnvelopeInput } from '../../contracts/runtime-message-schemas';
import { FrameworkError } from '../../errors';
import { canonicalizeJson, hashCanonicalJson } from './canonical-json';

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

export interface MessageBus {
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

type DeliveryStateName = 'queued' | 'delivered' | 'acked' | 'dead_lettered';

interface ConsumerDeliveryState {
  state: DeliveryStateName;
  attempts: number;
  availableAt: string;
  deliveryId?: string;
  ackDeadlineAt?: string;
  lastFailureReason?: string;
}

interface TransportRecord {
  envelope: RuntimeMessageEnvelope;
  requestHash: string;
  consumerStates: Map<string, ConsumerDeliveryState>;
}

export interface InMemoryMessageBusOptions {
  now?: () => string;
  maxDeliveryAttempts?: number;
  defaultAckDeadlineMs?: number;
  maxMessageBytes?: number;
  maxQueueDepth?: number;
  pollIntervalMs?: number;
}

export class InMemoryMessageBus implements MessageBus {
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
  private writeBarrier = Promise.resolve();

  constructor(options: InMemoryMessageBusOptions = {}) {
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
    return (await this.publishBatch([request]))[0];
  }

  async publishBatch<TPayload>(
    requests: MessagePublishRequest<TPayload>[]
  ): Promise<MessagePublishResult[]> {
    this.assertOpen();
    if (requests.length === 0) return [];
    const normalized = requests.map((request) => createRuntimeMessageEnvelope(request.envelope));
    const previousWrite = this.writeBarrier;
    let releaseWrite = (): void => undefined;
    this.writeBarrier = new Promise<void>((resolve) => {
      releaseWrite = resolve;
    });
    await previousWrite;
    try {
      return this.publishBatchExclusive(normalized);
    } finally {
      releaseWrite();
    }
  }

  async *subscribe<TPayload>(
    request: MessageSubscriptionRequest
  ): AsyncIterable<MessageDelivery<TPayload>> {
    this.assertOpen();
    nonEmpty(request.consumerId, 'consumerId');
    nonEmpty(request.topic, 'topic');
    const maxMessages = request.maxMessages ?? Number.POSITIVE_INFINITY;
    const idleTimeoutMs = request.idleTimeoutMs ?? Number.POSITIVE_INFINITY;
    if (maxMessages !== Number.POSITIVE_INFINITY) positive(maxMessages, 'maxMessages');
    if (idleTimeoutMs !== Number.POSITIVE_INFINITY) nonNegative(idleTimeoutMs, 'idleTimeoutMs');
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
    const states = [...this.records.values()].flatMap((record) => [
      ...record.consumerStates.values(),
    ]);
    return {
      status: this.closed ? 'unhealthy' : 'healthy',
      checkedAt: this.now(),
      details: {
        messages: this.records.size,
        inFlight: states.filter((state) => state.state === 'delivered').length,
        deadLetters: states.filter((state) => state.state === 'dead_lettered').length,
      },
    };
  }

  async close(): Promise<void> {
    this.closed = true;
  }

  listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[] {
    nonEmpty(consumerGroup, 'consumerGroup');
    return [...this.records.values()]
      .filter((record) => record.consumerStates.get(consumerGroup)?.state === 'dead_lettered')
      .map((record) => structuredClone(record.envelope));
  }

  private publishBatchExclusive(envelopes: RuntimeMessageEnvelopeInput[]): MessagePublishResult[] {
    const nextSequences = new Map(this.partitionSequences);
    const planned = new Map<string, TransportRecord>();
    const results: MessagePublishResult[] = [];
    for (const envelope of envelopes) {
      const requestHash = messageRequestHash(envelope);
      const existing = planned.get(envelope.messageId) ?? this.records.get(envelope.messageId);
      if (existing) {
        if (existing.requestHash !== requestHash) {
          throw busError(
            'RUNTIME_IDEMPOTENCY_CONFLICT',
            `Message id was reused with different content: ${envelope.messageId}`
          );
        }
        results.push(publishResult(existing.envelope, true));
        continue;
      }
      const bytes = Buffer.byteLength(canonicalizeJson(envelope), 'utf8');
      if (bytes > this.maxMessageBytes) {
        throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message exceeds maxMessageBytes', {
          messageId: envelope.messageId,
          bytes,
          maxMessageBytes: this.maxMessageBytes,
        });
      }
      const partition = partitionId(envelope.topic, envelope.partitionKey);
      const sequence = (nextSequences.get(partition) ?? 0) + 1;
      if (envelope.sequence !== undefined && envelope.sequence !== sequence) {
        throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message partition sequence is invalid', {
          expectedSequence: sequence,
          actualSequence: envelope.sequence,
        });
      }
      const sequenced = { ...envelope, sequence } as RuntimeMessageEnvelope;
      const record: TransportRecord = {
        envelope: sequenced,
        requestHash,
        consumerStates: new Map(),
      };
      planned.set(sequenced.messageId, record);
      nextSequences.set(partition, sequence);
      results.push(publishResult(sequenced, false));
    }
    if (this.records.size + planned.size > this.maxQueueDepth) {
      throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Message queue depth limit reached');
    }
    for (const [messageId, record] of planned) this.records.set(messageId, record);
    for (const [partition, sequence] of nextSequences) {
      this.partitionSequences.set(partition, sequence);
    }
    return structuredClone(results);
  }

  private nextDelivery<TPayload>(
    request: MessageSubscriptionRequest
  ): MessageDelivery<TPayload> | null {
    const group = request.consumerGroup ?? request.consumerId;
    this.recoverExpiredDeliveries(group);
    const now = this.now();
    const record = [...this.records.values()]
      .filter((candidate) => {
        if (candidate.envelope.topic !== request.topic) return false;
        if (
          request.partitionKey !== undefined &&
          candidate.envelope.partitionKey !== request.partitionKey
        ) {
          return false;
        }
        const state = this.consumerState(candidate, group);
        return (
          state.state === 'queued' &&
          isAtOrBefore(state.availableAt, now) &&
          this.isPartitionHead(candidate, group)
        );
      })
      .sort(compareTransportRecords)[0];
    if (!record) return null;
    const state = this.consumerState(record, group);
    if (record.envelope.expiresAt && isAtOrBefore(record.envelope.expiresAt, now)) {
      state.state = 'dead_lettered';
      state.lastFailureReason = 'message_expired';
      return this.nextDelivery(request);
    }
    state.attempts += 1;
    if (state.attempts > this.maxDeliveryAttempts) {
      state.state = 'dead_lettered';
      state.lastFailureReason = 'delivery_attempt_budget_exhausted';
      return this.nextDelivery(request);
    }
    const ackDeadlineMs = positive(
      request.ackDeadlineMs ?? this.defaultAckDeadlineMs,
      'ackDeadlineMs'
    );
    state.state = 'delivered';
    state.deliveryId = `${record.envelope.messageId}:${group}:${++this.deliverySequence}`;
    state.ackDeadlineAt = addMilliseconds(now, ackDeadlineMs);
    return this.createDelivery<TPayload>(record, state, group);
  }

  private createDelivery<TPayload>(
    record: TransportRecord,
    state: ConsumerDeliveryState,
    group: string
  ): MessageDelivery<TPayload> {
    const deliveryId = state.deliveryId as string;
    const assertCurrent = (): void => {
      if (state.deliveryId !== deliveryId || state.state !== 'delivered') {
        throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Delivery is no longer current');
      }
    };
    return {
      envelope: structuredClone(record.envelope) as RuntimeMessageEnvelope<TPayload>,
      deliveryId,
      attempt: state.attempts,
      receivedAt: this.now(),
      ackDeadlineAt: state.ackDeadlineAt as string,
      ack: async () => {
        if (state.state === 'acked') return;
        assertCurrent();
        state.state = 'acked';
      },
      nack: async (options = {}) => {
        assertCurrent();
        if (state.attempts >= this.maxDeliveryAttempts) {
          state.state = 'dead_lettered';
          state.lastFailureReason = options.reason ?? 'delivery_attempt_budget_exhausted';
          return;
        }
        state.state = 'queued';
        state.availableAt = addMilliseconds(this.now(), nonNegative(options.delayMs ?? 0));
        state.lastFailureReason = options.reason;
      },
      deadLetter: async (reason) => {
        assertCurrent();
        nonEmpty(reason, 'deadLetter.reason');
        state.state = 'dead_lettered';
        state.lastFailureReason = reason;
      },
      extendAckDeadline: async (extensionMs) => {
        assertCurrent();
        state.ackDeadlineAt = addMilliseconds(
          state.ackDeadlineAt as string,
          positive(extensionMs, 'extensionMs')
        );
      },
    };
  }

  private consumerState(record: TransportRecord, group: string): ConsumerDeliveryState {
    const current = record.consumerStates.get(group);
    if (current) return current;
    const created: ConsumerDeliveryState = {
      state: 'queued',
      attempts: 0,
      availableAt: record.envelope.availableAt ?? record.envelope.publishedAt,
    };
    record.consumerStates.set(group, created);
    return created;
  }

  private isPartitionHead(record: TransportRecord, group: string): boolean {
    return ![...this.records.values()].some((candidate) => {
      if (
        candidate === record ||
        candidate.envelope.topic !== record.envelope.topic ||
        candidate.envelope.partitionKey !== record.envelope.partitionKey ||
        (candidate.envelope.sequence as number) >= (record.envelope.sequence as number)
      ) {
        return false;
      }
      const state = this.consumerState(candidate, group);
      return state.state !== 'acked' && state.state !== 'dead_lettered';
    });
  }

  private recoverExpiredDeliveries(group: string): void {
    const now = this.now();
    for (const record of this.records.values()) {
      const state = record.consumerStates.get(group);
      if (
        state?.state !== 'delivered' ||
        !state.ackDeadlineAt ||
        !isAtOrBefore(state.ackDeadlineAt, now)
      )
        continue;
      if (state.attempts >= this.maxDeliveryAttempts) {
        state.state = 'dead_lettered';
        state.lastFailureReason = 'ack_deadline_exhausted';
      } else {
        state.state = 'queued';
        state.availableAt = now;
      }
    }
  }

  private assertOpen(): void {
    if (this.closed) throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Message bus is closed');
  }
}

export function createRuntimeMessageEnvelope<TPayload>(
  input: RuntimeMessageEnvelopeInput<TPayload>
): RuntimeMessageEnvelope<TPayload> {
  const parsed = validateRuntimeMessageEnvelopeInput(
    input
  ) as RuntimeMessageEnvelopeInput<TPayload>;
  const payloadHash = hashCanonicalJson(parsed.payload);
  if (parsed.payloadHash !== undefined && parsed.payloadHash !== payloadHash) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message payload hash does not match');
  }
  return structuredClone({ ...parsed, payloadHash }) as RuntimeMessageEnvelope<TPayload>;
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
  return (
    (right.envelope.priority ?? 0) - (left.envelope.priority ?? 0) ||
    parseTimestamp(left.envelope.publishedAt, 'publishedAt') -
      parseTimestamp(right.envelope.publishedAt, 'publishedAt') ||
    left.envelope.partitionKey.localeCompare(right.envelope.partitionKey) ||
    (left.envelope.sequence as number) - (right.envelope.sequence as number)
  );
}

function partitionId(topic: string, partitionKey: string): string {
  return `${topic}\u0000${partitionKey}`;
}

export function addMilliseconds(timestamp: string, milliseconds: number): string {
  return new Date(parseTimestamp(timestamp, 'timestamp') + milliseconds).toISOString();
}

export function isAtOrBefore(left: string, right: string): boolean {
  return parseTimestamp(left, 'timestamp') <= parseTimestamp(right, 'timestamp');
}

export function positive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be positive`);
  }
  return value;
}

export function nonNegative(value: number, label = 'value'): number {
  if (!Number.isFinite(value) || value < 0) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be non-negative`);
  }
  return value;
}

export function nonEmpty(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a non-empty string`);
  }
}

export function busError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, ...(context === undefined ? {} : { context }) });
}

function messageRequestHash(envelope: RuntimeMessageEnvelopeInput): string {
  const content = { ...envelope };
  delete content.sequence;
  return hashCanonicalJson(content);
}

function parseTimestamp(value: string, label: string): number {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a valid timestamp`);
  }
  return timestamp;
}

function wait(milliseconds: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    const timeout = setTimeout(done, milliseconds);
    function done(): void {
      clearTimeout(timeout);
      signal?.removeEventListener('abort', done);
      resolve();
    }
    signal?.addEventListener('abort', done, { once: true });
  });
}
