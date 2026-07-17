import {
  FrameworkError,
  canonicalizeJson,
  createRuntimeMessageEnvelope,
  hashCanonicalJson,
  type MessageBusV2,
  type MessageDelivery,
  type MessagePublishRequest,
  type MessagePublishResult,
  type MessageSubscriptionRequest,
  type ProviderHealth,
  type RuntimeMessageEnvelope,
} from '@hypha/core';
import Redis, { type RedisOptions } from 'ioredis';

const PUBLISH_SCRIPT = `
local prior_hash = redis.call('HGET', KEYS[1], 'request_hash')
if prior_hash then
  if prior_hash ~= ARGV[1] then
    return redis.error_reply('HYPHA_IDEMPOTENCY_CONFLICT')
  end
  return {1, redis.call('HGET', KEYS[1], 'sequence'), redis.call('HGET', KEYS[1], 'stream_id')}
end
local envelope = cjson.decode(ARGV[2])
local current = tonumber(redis.call('GET', KEYS[2]) or '0')
local sequence = current + 1
if envelope['sequence'] ~= nil and tonumber(envelope['sequence']) ~= sequence then
  return redis.error_reply('HYPHA_SEQUENCE_CONFLICT')
end
envelope['sequence'] = sequence
local encoded = cjson.encode(envelope)
local stream_id = redis.call('XADD', KEYS[3], '*', 'envelope', encoded)
redis.call('SET', KEYS[2], sequence)
redis.call('HSET', KEYS[1], 'request_hash', ARGV[1], 'sequence', sequence, 'stream_id', stream_id)
return {0, tostring(sequence), stream_id}
`;

const DRAIN_DELAYED_SCRIPT = `
local entries = redis.call('ZRANGEBYSCORE', KEYS[1], '-inf', ARGV[1], 'LIMIT', 0, ARGV[2])
for _, member in ipairs(entries) do
  local item = cjson.decode(member)
  redis.call('XADD', KEYS[2], '*', 'envelope', cjson.encode(item['envelope']))
  redis.call('ZREM', KEYS[1], member)
end
return #entries
`;

export interface RedisStreamsMessageBusOptions {
  redis?: Redis;
  url?: string;
  redisOptions?: RedisOptions;
  keyPrefix?: string;
  now?: () => string;
  maxDeliveryAttempts?: number;
  defaultAckDeadlineMs?: number;
  maxMessageBytes?: number;
  blockMs?: number;
  closeProvidedClient?: boolean;
}

interface RedisStreamEntry {
  id: string;
  envelope: RuntimeMessageEnvelope;
}

export class RedisStreamsMessageBus implements MessageBusV2 {
  private readonly redis: Redis;
  private readonly ownsClient: boolean;
  private readonly closeProvidedClient: boolean;
  private readonly keyPrefix: string;
  private readonly now: () => string;
  private readonly maxDeliveryAttempts: number;
  private readonly defaultAckDeadlineMs: number;
  private readonly maxMessageBytes: number;
  private readonly blockMs: number;
  private closed = false;

  constructor(options: RedisStreamsMessageBusOptions = {}) {
    this.redis =
      options.redis ??
      (options.redisOptions
        ? new Redis(options.url ?? 'redis://127.0.0.1:6379', options.redisOptions)
        : new Redis(options.url ?? 'redis://127.0.0.1:6379'));
    this.ownsClient = options.redis === undefined;
    this.closeProvidedClient = options.closeProvidedClient ?? false;
    this.keyPrefix = options.keyPrefix ?? 'hypha:runtime:';
    this.now = options.now ?? (() => new Date().toISOString());
    this.maxDeliveryAttempts = positive(options.maxDeliveryAttempts ?? 5, 'maxDeliveryAttempts');
    this.defaultAckDeadlineMs = positive(
      options.defaultAckDeadlineMs ?? 30_000,
      'defaultAckDeadlineMs'
    );
    this.maxMessageBytes = positive(options.maxMessageBytes ?? 256 * 1024, 'maxMessageBytes');
    this.blockMs = positive(options.blockMs ?? 100, 'blockMs');
  }

  async publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult> {
    this.assertOpen();
    const envelope = createRuntimeMessageEnvelope(request.envelope);
    const encoded = canonicalizeJson(envelope);
    const bytes = Buffer.byteLength(encoded, 'utf8');
    if (bytes > this.maxMessageBytes) {
      throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message exceeds maxMessageBytes.', {
        bytes,
        maxMessageBytes: this.maxMessageBytes,
      });
    }
    const requestHash = hashCanonicalJson(envelope);
    try {
      const response = (await this.redis.eval(
        PUBLISH_SCRIPT,
        3,
        this.idempotencyKey(envelope.messageId),
        this.sequenceKey(envelope.topic, envelope.partitionKey),
        this.streamKey(envelope.topic),
        requestHash,
        JSON.stringify(envelope)
      )) as [number | string, number | string, string];
      return {
        messageId: envelope.messageId,
        topic: envelope.topic,
        partitionKey: envelope.partitionKey,
        sequence: Number(response[1]),
        publishedAt: envelope.publishedAt,
        reused: Number(response[0]) === 1,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes('HYPHA_IDEMPOTENCY_CONFLICT')) {
        throw busError(
          'RUNTIME_IDEMPOTENCY_CONFLICT',
          `Message id was reused with different content: ${envelope.messageId}`
        );
      }
      if (message.includes('HYPHA_SEQUENCE_CONFLICT')) {
        throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', 'Message partition sequence is invalid.');
      }
      throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Redis Streams publish failed.', {
        cause: message,
      });
    }
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
    this.assertOpen();
    required(request.consumerId, 'consumerId');
    required(request.topic, 'topic');
    const stream = this.streamKey(request.topic);
    const group = request.consumerGroup ?? request.consumerId;
    const consumer = request.consumerId;
    const ackDeadlineMs = positive(
      request.ackDeadlineMs ?? this.defaultAckDeadlineMs,
      'ackDeadlineMs'
    );
    const maxMessages = request.maxMessages ?? Number.POSITIVE_INFINITY;
    const idleTimeoutMs = request.idleTimeoutMs ?? Number.POSITIVE_INFINITY;
    await this.ensureGroup(stream, group);
    const startedAt = Date.now();
    let delivered = 0;
    let claimCursor = '0-0';
    while (!this.closed && !request.signal?.aborted && delivered < maxMessages) {
      await this.drainDelayed(request.topic);
      const claimed = await this.claimExpired(stream, group, consumer, ackDeadlineMs, claimCursor);
      claimCursor = claimed.cursor;
      let entries = claimed.entries;
      if (entries.length === 0) {
        entries = await this.readNew(stream, group, consumer);
      }
      for (const entry of entries) {
        const delivery = await this.prepareDelivery<TPayload>(
          stream,
          group,
          consumer,
          entry,
          ackDeadlineMs
        );
        if (!delivery) continue;
        delivered += 1;
        yield delivery;
        if (delivered >= maxMessages) return;
      }
      if (entries.length === 0 && Date.now() - startedAt >= idleTimeoutMs) return;
    }
  }

  async health(): Promise<ProviderHealth> {
    const checkedAt = this.now();
    try {
      const response = await this.redis.ping();
      return {
        status: response === 'PONG' && !this.closed ? 'healthy' : 'degraded',
        checkedAt,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        checkedAt,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;
    if (this.ownsClient || this.closeProvidedClient) await this.redis.quit();
  }

  private async prepareDelivery<TPayload>(
    stream: string,
    group: string,
    consumer: string,
    entry: RedisStreamEntry,
    ackDeadlineMs: number
  ): Promise<MessageDelivery<TPayload> | null> {
    const now = this.now();
    if (entry.envelope.availableAt && entry.envelope.availableAt > now) {
      await this.defer(stream, group, entry, entry.envelope.availableAt);
      return null;
    }
    if (entry.envelope.expiresAt && entry.envelope.expiresAt <= now) {
      await this.moveToDeadLetter(stream, group, entry, 'message_expired', 0);
      return null;
    }
    const attempt = await this.redis.hincrby(this.attemptsKey(group), entry.envelope.messageId, 1);
    if (attempt > this.maxDeliveryAttempts) {
      await this.moveToDeadLetter(
        stream,
        group,
        entry,
        'delivery_attempt_budget_exhausted',
        attempt
      );
      return null;
    }
    const deliveryId = `${stream}:${group}:${entry.id}`;
    const receivedAt = now;
    let terminal = false;
    const assertActive = (): void => {
      if (terminal)
        throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Delivery is no longer active.');
    };
    return {
      envelope: clone(entry.envelope) as RuntimeMessageEnvelope<TPayload>,
      deliveryId,
      attempt,
      receivedAt,
      ackDeadlineAt: addMs(now, ackDeadlineMs),
      ack: async () => {
        if (terminal) return;
        await this.redis.xack(stream, group, entry.id);
        terminal = true;
      },
      nack: async (options = {}) => {
        assertActive();
        if (attempt >= this.maxDeliveryAttempts) {
          await this.moveToDeadLetter(
            stream,
            group,
            entry,
            options.reason ?? 'delivery_attempt_budget_exhausted',
            attempt
          );
        } else {
          await this.defer(
            stream,
            group,
            entry,
            addMs(this.now(), Math.max(0, options.delayMs ?? 0))
          );
        }
        terminal = true;
      },
      deadLetter: async (reason) => {
        assertActive();
        await this.moveToDeadLetter(stream, group, entry, reason, attempt);
        terminal = true;
      },
      extendAckDeadline: async (extensionMs) => {
        assertActive();
        positive(extensionMs, 'extensionMs');
        await this.redis.xclaim(stream, group, consumer, 0, entry.id, 'IDLE', 0, 'JUSTID');
      },
    };
  }

  private async ensureGroup(stream: string, group: string): Promise<void> {
    try {
      await this.redis.xgroup('CREATE', stream, group, '0', 'MKSTREAM');
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes('BUSYGROUP')) throw error;
    }
  }

  private async readNew(
    stream: string,
    group: string,
    consumer: string
  ): Promise<RedisStreamEntry[]> {
    const response = (await this.redis.xreadgroup(
      'GROUP',
      group,
      consumer,
      'COUNT',
      20,
      'BLOCK',
      this.blockMs,
      'STREAMS',
      stream,
      '>'
    )) as unknown;
    return parseReadResponse(response);
  }

  private async claimExpired(
    stream: string,
    group: string,
    consumer: string,
    minimumIdleMs: number,
    cursor: string
  ): Promise<{ cursor: string; entries: RedisStreamEntry[] }> {
    try {
      const response = (await this.redis.xautoclaim(
        stream,
        group,
        consumer,
        minimumIdleMs,
        cursor,
        'COUNT',
        20
      )) as unknown;
      if (!Array.isArray(response)) return { cursor: '0-0', entries: [] };
      return {
        cursor: String(response[0] ?? '0-0'),
        entries: parseEntries(response[1]),
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('NOGROUP')) {
        await this.ensureGroup(stream, group);
        return { cursor: '0-0', entries: [] };
      }
      throw error;
    }
  }

  private async defer(
    stream: string,
    group: string,
    entry: RedisStreamEntry,
    availableAt: string
  ): Promise<void> {
    const member = JSON.stringify({ envelope: entry.envelope, nonce: entry.id });
    const transaction = this.redis.multi();
    transaction.zadd(this.delayedKey(entry.envelope.topic), Date.parse(availableAt), member);
    transaction.xack(stream, group, entry.id);
    await transaction.exec();
  }

  private async drainDelayed(topic: string): Promise<void> {
    await this.redis.eval(
      DRAIN_DELAYED_SCRIPT,
      2,
      this.delayedKey(topic),
      this.streamKey(topic),
      Date.parse(this.now()),
      100
    );
  }

  private async moveToDeadLetter(
    stream: string,
    group: string,
    entry: RedisStreamEntry,
    reason: string,
    attempt: number
  ): Promise<void> {
    const transaction = this.redis.multi();
    transaction.xadd(
      this.deadLetterKey(entry.envelope.topic),
      '*',
      'envelope',
      JSON.stringify(entry.envelope),
      'reason',
      reason,
      'attempt',
      String(attempt),
      'source_id',
      entry.id
    );
    transaction.xack(stream, group, entry.id);
    await transaction.exec();
  }

  private streamKey(topic: string): string {
    return `${this.keyPrefix}stream:${topic}`;
  }

  private delayedKey(topic: string): string {
    return `${this.keyPrefix}delayed:${topic}`;
  }

  private deadLetterKey(topic: string): string {
    return `${this.keyPrefix}dead-letter:${topic}`;
  }

  private idempotencyKey(messageId: string): string {
    return `${this.keyPrefix}message:${messageId}`;
  }

  private sequenceKey(topic: string, partitionKey: string): string {
    return `${this.keyPrefix}sequence:${topic}:${partitionKey}`;
  }

  private attemptsKey(group: string): string {
    return `${this.keyPrefix}attempts:${group}`;
  }

  private assertOpen(): void {
    if (this.closed) throw busError('RUNTIME_MESSAGE_BUS_UNAVAILABLE', 'Message bus is closed.');
  }
}

function parseReadResponse(value: unknown): RedisStreamEntry[] {
  if (!Array.isArray(value)) return [];
  const entries: RedisStreamEntry[] = [];
  for (const stream of value) {
    if (!Array.isArray(stream)) continue;
    entries.push(...parseEntries(stream[1]));
  }
  return entries;
}

function parseEntries(value: unknown): RedisStreamEntry[] {
  if (!Array.isArray(value)) return [];
  const entries: RedisStreamEntry[] = [];
  for (const item of value) {
    if (!Array.isArray(item) || item.length < 2 || !Array.isArray(item[1])) continue;
    const fields = item[1] as unknown[];
    const envelopeIndex = fields.findIndex((field) => String(field) === 'envelope');
    if (envelopeIndex < 0 || envelopeIndex + 1 >= fields.length) continue;
    entries.push({
      id: String(item[0]),
      envelope: JSON.parse(String(fields[envelopeIndex + 1])) as RuntimeMessageEnvelope,
    });
  }
  return entries;
}

function addMs(timestamp: string, milliseconds: number): string {
  return new Date(Date.parse(timestamp) + milliseconds).toISOString();
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function required(value: unknown, label: string): asserts value is string {
  if (typeof value !== 'string' || value.length === 0) {
    throw busError('RUNTIME_MESSAGE_SCHEMA_INVALID', `${label} must be a non-empty string.`);
  }
}

function positive(value: number, label: string): number {
  if (!Number.isFinite(value) || value <= 0) {
    throw busError('RUNTIME_INVALID_INPUT', `${label} must be positive.`);
  }
  return value;
}

function busError(
  code: string,
  message: string,
  context?: Record<string, unknown>
): FrameworkError {
  return new FrameworkError({ code, message, ...(context === undefined ? {} : { context }) });
}
