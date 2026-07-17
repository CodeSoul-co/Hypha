import { describe, expect, it } from 'vitest';
import {
  InMemoryMessageBusV2,
  InMemoryRuntimeMessageInboxStore,
  InMemoryRuntimeMessageOutboxStore,
  RuntimeInboxProcessor,
  RuntimeOutboxDispatcher,
  createRuntimeMessageEnvelope,
  type MessageDelivery,
  type MessageBusV2,
  type RuntimeMessageEnvelopeInput,
} from './reliable-message-bus';

const publishedAt = '2026-07-17T09:00:00.000Z';

function envelope(
  id: string,
  overrides: Partial<RuntimeMessageEnvelopeInput> = {}
): RuntimeMessageEnvelopeInput {
  return {
    messageId: id,
    messageType: 'runtime.command.start',
    schemaVersion: '1.0.0',
    topic: 'hypha.runtime.commands',
    partitionKey: 'session.1',
    userId: 'user.1',
    sessionId: 'session.1',
    runId: 'run.1',
    payload: { command: id },
    publishedAt,
    producerId: 'runtime.test',
    ...overrides,
  };
}

async function nextDelivery(
  bus: InMemoryMessageBusV2,
  consumerId = 'worker.1'
): Promise<MessageDelivery> {
  const subscription = bus.subscribe({
    consumerId,
    topic: 'hypha.runtime.commands',
    maxMessages: 1,
    idleTimeoutMs: 0,
    ackDeadlineMs: 1_000,
  });
  const iterator = subscription[Symbol.asyncIterator]();
  const result = await iterator.next();
  if (result.done) throw new Error('Expected a message delivery.');
  return result.value;
}

describe('InMemoryMessageBusV2 contract', () => {
  it('hashes payloads, assigns partition sequence, and reuses identical publishes', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });
    const first = await bus.publish({ envelope: envelope('message.1') });
    const second = await bus.publish({ envelope: envelope('message.2') });
    const reused = await bus.publish({ envelope: envelope('message.1') });

    expect(first).toMatchObject({ sequence: 1, reused: false });
    expect(second).toMatchObject({ sequence: 2, reused: false });
    expect(reused).toMatchObject({ sequence: 1, reused: true });
    const delivery = await nextDelivery(bus);
    expect(delivery.envelope).toMatchObject({
      messageId: 'message.1',
      sequence: 1,
      payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
    });
  });

  it('rejects payload hash mismatch and conflicting message reuse', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });

    await expect(
      bus.publish({ envelope: envelope('message.hash', { payloadHash: 'wrong' }) })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await bus.publish({ envelope: envelope('message.conflict') });
    await expect(
      bus.publish({ envelope: envelope('message.conflict', { payload: { changed: true } }) })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('delivers each partition in publish order and acknowledges terminally', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });
    await bus.publishBatch([
      { envelope: envelope('message.1') },
      { envelope: envelope('message.2') },
    ]);

    const first = await nextDelivery(bus);
    expect(first.envelope.messageId).toBe('message.1');
    await first.ack();
    await first.ack();
    const second = await nextDelivery(bus);
    expect(second.envelope.messageId).toBe('message.2');
    await second.ack();
  });

  it('redelivers Nacked messages and dead-letters exhausted attempts', async () => {
    const bus = new InMemoryMessageBusV2({
      now: () => publishedAt,
      maxDeliveryAttempts: 2,
    });
    await bus.publish({ envelope: envelope('message.retry') });

    const first = await nextDelivery(bus);
    expect(first.attempt).toBe(1);
    await first.nack({ reason: 'temporary' });
    const second = await nextDelivery(bus);
    expect(second.attempt).toBe(2);
    await second.nack({ reason: 'poison' });

    expect(bus.listDeadLetters()).toEqual([
      expect.objectContaining({ messageId: 'message.retry' }),
    ]);
  });

  it('redelivers an unacknowledged message after its Ack deadline', async () => {
    let now = publishedAt;
    const bus = new InMemoryMessageBusV2({ now: () => now, maxDeliveryAttempts: 3 });
    await bus.publish({ envelope: envelope('message.deadline') });
    const first = await nextDelivery(bus);
    expect(first.attempt).toBe(1);

    now = '2026-07-17T09:00:02.000Z';
    const redelivered = await nextDelivery(bus);
    expect(redelivered).toMatchObject({ attempt: 2 });
    expect(redelivered.deliveryId).not.toBe(first.deliveryId);
    await redelivered.ack();
  });

  it('dead-letters expired messages without yielding them', async () => {
    const bus = new InMemoryMessageBusV2({
      now: () => '2026-07-17T09:00:02.000Z',
    });
    await bus.publish({
      envelope: envelope('message.expired', { expiresAt: '2026-07-17T09:00:01.000Z' }),
    });
    const subscription = bus.subscribe({
      consumerId: 'worker.1',
      topic: 'hypha.runtime.commands',
      maxMessages: 1,
      idleTimeoutMs: 0,
    });
    const iterator = subscription[Symbol.asyncIterator]();

    await expect(iterator.next()).resolves.toMatchObject({ done: true });
    expect(bus.listDeadLetters()).toHaveLength(1);
  });
});

describe('RuntimeInboxProcessor', () => {
  it('turns duplicate physical delivery into one logical command effect', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const processor = new RuntimeInboxProcessor('worker.1', inbox, () => publishedAt);
    await bus.publish({ envelope: envelope('message.inbox') });
    const delivery = await nextDelivery(bus);
    let applications = 0;
    const apply = async () => {
      applications += 1;
      return ['event.applied.1'];
    };

    await expect(processor.handle(delivery, apply)).resolves.toEqual({
      disposition: 'applied',
      appliedEventIds: ['event.applied.1'],
    });
    await expect(processor.handle(delivery, apply)).resolves.toEqual({
      disposition: 'duplicate',
      appliedEventIds: ['event.applied.1'],
    });
    expect(applications).toBe(1);
    await expect(inbox.get('worker.1', 'message.inbox')).resolves.toMatchObject({
      status: 'applied',
      attempts: 2,
    });
  });

  it('releases failed effects for a later at-least-once retry', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const processor = new RuntimeInboxProcessor('worker.1', inbox, () => publishedAt);
    await bus.publish({ envelope: envelope('message.inbox.retry') });
    const first = await nextDelivery(bus);

    await expect(
      processor.handle(first, async () => {
        throw new Error('temporary apply failure');
      })
    ).resolves.toMatchObject({ disposition: 'failed' });
    const retry = await nextDelivery(bus);
    await expect(processor.handle(retry, async () => ['event.applied.2'])).resolves.toEqual({
      disposition: 'applied',
      appliedEventIds: ['event.applied.2'],
    });
    await expect(inbox.get('worker.1', 'message.inbox.retry')).resolves.toMatchObject({
      status: 'applied',
      attempts: 2,
    });
  });

  it('creates envelopes with a deterministic payload hash', () => {
    const first = createRuntimeMessageEnvelope(
      envelope('message.canonical', { payload: { b: 2, a: 1 } })
    );
    const second = createRuntimeMessageEnvelope(
      envelope('message.canonical', { payload: { a: 1, b: 2 } })
    );
    expect(first.payloadHash).toBe(second.payloadHash);
  });
});

describe('RuntimeOutboxDispatcher', () => {
  it('publishes pending records and marks them durably completed', async () => {
    const bus = new InMemoryMessageBusV2({ now: () => publishedAt });
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    await outbox.enqueue({
      id: 'outbox.1',
      eventId: 'event.1',
      envelope: createRuntimeMessageEnvelope(envelope('message.outbox.1')),
      createdAt: publishedAt,
    });
    const dispatcher = new RuntimeOutboxDispatcher({
      ownerId: 'publisher.1',
      outbox,
      bus,
      now: () => publishedAt,
    });

    await expect(dispatcher.dispatch()).resolves.toEqual({
      claimed: 1,
      published: 1,
      failed: 0,
      deadLettered: 0,
    });
    await expect(outbox.get('outbox.1')).resolves.toMatchObject({
      state: 'published',
      attempts: 1,
    });
    expect((await nextDelivery(bus)).envelope.messageId).toBe('message.outbox.1');
  });

  it('retries transient publication failures after backoff', async () => {
    let now = publishedAt;
    let calls = 0;
    const delegate = new InMemoryMessageBusV2({ now: () => now });
    const bus: MessageBusV2 = {
      publish: async (request) => {
        calls += 1;
        if (calls === 1) throw new Error('broker unavailable');
        return delegate.publish(request);
      },
      publishBatch: (requests) => delegate.publishBatch(requests),
      subscribe: (request) => delegate.subscribe(request),
      health: () => delegate.health(),
      close: () => delegate.close(),
    };
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    await outbox.enqueue({
      id: 'outbox.retry',
      envelope: createRuntimeMessageEnvelope(envelope('message.outbox.retry')),
      createdAt: now,
    });
    const dispatcher = new RuntimeOutboxDispatcher({
      ownerId: 'publisher.1',
      outbox,
      bus,
      now: () => now,
      retryDelayMs: () => 100,
    });

    await expect(dispatcher.dispatch()).resolves.toMatchObject({ failed: 1, published: 0 });
    await expect(outbox.get('outbox.retry')).resolves.toMatchObject({ state: 'failed' });
    now = '2026-07-17T09:00:00.100Z';
    await expect(dispatcher.dispatch()).resolves.toMatchObject({ failed: 0, published: 1 });
    await expect(outbox.get('outbox.retry')).resolves.toMatchObject({
      state: 'published',
      attempts: 2,
    });
  });

  it('recovers a publish-complete crash through lease expiry and broker idempotency', async () => {
    let now = publishedAt;
    const bus = new InMemoryMessageBusV2({ now: () => now });
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    const persistedEnvelope = createRuntimeMessageEnvelope(envelope('message.outbox.crash'));
    await outbox.enqueue({ id: 'outbox.crash', envelope: persistedEnvelope, createdAt: now });
    const [claimed] = await outbox.claim({
      ownerId: 'publisher.crashed',
      now,
      leaseMs: 1_000,
      limit: 1,
    });
    const firstPublish = await bus.publish({ envelope: claimed.envelope });
    expect(firstPublish.reused).toBe(false);

    now = '2026-07-17T09:00:02.000Z';
    const recovered = new RuntimeOutboxDispatcher({
      ownerId: 'publisher.recovery',
      outbox,
      bus,
      now: () => now,
    });
    await expect(recovered.dispatch()).resolves.toMatchObject({ claimed: 1, published: 1 });
    await expect(outbox.get('outbox.crash')).resolves.toMatchObject({
      state: 'published',
      attempts: 2,
    });
    const delivery = await nextDelivery(bus);
    expect(delivery.envelope.messageId).toBe('message.outbox.crash');
  });

  it('dead-letters outbox records when publication attempts are exhausted', async () => {
    const delegate = new InMemoryMessageBusV2({ now: () => publishedAt });
    const bus: MessageBusV2 = {
      publish: async () => {
        throw new Error('permanent broker failure');
      },
      publishBatch: (requests) => delegate.publishBatch(requests),
      subscribe: (request) => delegate.subscribe(request),
      health: () => delegate.health(),
      close: () => delegate.close(),
    };
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    await outbox.enqueue({
      id: 'outbox.dead',
      envelope: createRuntimeMessageEnvelope(envelope('message.outbox.dead')),
      createdAt: publishedAt,
    });
    const dispatcher = new RuntimeOutboxDispatcher({
      ownerId: 'publisher.1',
      outbox,
      bus,
      now: () => publishedAt,
      maxAttempts: 1,
    });

    await expect(dispatcher.dispatch()).resolves.toMatchObject({ deadLettered: 1 });
    await expect(outbox.get('outbox.dead')).resolves.toMatchObject({
      state: 'dead_letter',
      attempts: 1,
    });
  });
});
