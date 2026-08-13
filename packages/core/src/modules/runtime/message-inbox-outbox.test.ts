import { describe, expect, it } from 'vitest';
import type { RuntimeMessageEnvelopeInput } from '../../contracts/runtime-messages';
import {
  InMemoryMessageBus,
  createRuntimeMessageEnvelope,
  type MessageBus,
  type MessageDelivery,
} from './message-bus';
import {
  InMemoryRuntimeMessageInboxStore,
  InMemoryRuntimeMessageOutboxStore,
  RuntimeInboxProcessor,
  RuntimeOutboxDispatcher,
} from './message-inbox-outbox';

const initialTime = '2026-07-18T04:00:00.000Z';

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
    payload: { command: id },
    publishedAt: initialTime,
    producerId: 'runtime.test',
    ...overrides,
  };
}

async function nextDelivery(bus: InMemoryMessageBus): Promise<MessageDelivery> {
  const subscription = bus.subscribe({
    consumerId: 'worker.1',
    consumerGroup: 'runtime.commands',
    topic: 'hypha.runtime.commands',
    maxMessages: 1,
    idleTimeoutMs: 0,
    ackDeadlineMs: 1_000,
  });
  const result = await subscription[Symbol.asyncIterator]().next();
  if (result.done) throw new Error('Expected a delivery');
  return result.value;
}

function processor(
  inbox: InMemoryRuntimeMessageInboxStore,
  now: () => string = () => initialTime
): RuntimeInboxProcessor {
  return new RuntimeInboxProcessor({
    consumerId: 'runtime.commands',
    ownerId: 'worker.1',
    inbox,
    now,
    processingLeaseMs: 1_000,
  });
}

describe('Runtime Inbox', () => {
  it('turns duplicate physical delivery into one logical effect', async () => {
    const bus = new InMemoryMessageBus({ now: () => initialTime });
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const runtime = processor(inbox);
    await bus.publish({ envelope: envelope('message.inbox') });
    const delivery = await nextDelivery(bus);
    let applications = 0;
    const apply = async () => {
      applications += 1;
      return ['event.applied.1'];
    };

    await expect(runtime.handle(delivery, apply)).resolves.toMatchObject({
      disposition: 'applied',
      appliedEventIds: ['event.applied.1'],
    });
    await expect(runtime.handle(delivery, apply)).resolves.toMatchObject({
      disposition: 'duplicate',
      appliedEventIds: ['event.applied.1'],
    });
    expect(applications).toBe(1);
  });

  it('keeps Inbox applied when Ack is lost and deduplicates redelivery', async () => {
    let now = initialTime;
    const bus = new InMemoryMessageBus({ now: () => now, maxDeliveryAttempts: 3 });
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const runtime = processor(inbox, () => now);
    await bus.publish({ envelope: envelope('message.ack-loss') });
    const first = await nextDelivery(bus);
    const lostAck: MessageDelivery = {
      ...first,
      ack: async () => {
        throw new Error('ack response lost');
      },
    };
    let applications = 0;
    await expect(
      runtime.handle(lostAck, async () => {
        applications += 1;
        return ['event.ack-loss'];
      })
    ).resolves.toMatchObject({ disposition: 'applied', ackPending: true });

    now = '2026-07-18T04:00:02.000Z';
    const redelivery = await nextDelivery(bus);
    await expect(
      runtime.handle(redelivery, async () => {
        applications += 1;
        return [];
      })
    ).resolves.toMatchObject({ disposition: 'duplicate' });
    expect(applications).toBe(1);
  });

  it('reclaims failed and lease-expired processing without accepting hash drift', async () => {
    const inbox = new InMemoryRuntimeMessageInboxStore();
    const payloadHash = createRuntimeMessageEnvelope(envelope('message.claim')).payloadHash;
    await expect(
      inbox.claim({
        consumerId: 'runtime.commands',
        ownerId: 'worker.crashed',
        messageId: 'message.claim',
        payloadHash,
        receivedAt: initialTime,
        processingLeaseMs: 1_000,
      })
    ).resolves.toMatchObject({ disposition: 'claimed' });
    await expect(
      inbox.claim({
        consumerId: 'runtime.commands',
        ownerId: 'worker.2',
        messageId: 'message.claim',
        payloadHash,
        receivedAt: '2026-07-18T04:00:00.500Z',
        processingLeaseMs: 1_000,
      })
    ).resolves.toMatchObject({ disposition: 'busy' });
    await expect(
      inbox.claim({
        consumerId: 'runtime.commands',
        ownerId: 'worker.recovery',
        messageId: 'message.claim',
        payloadHash,
        receivedAt: '2026-07-18T04:00:02.000Z',
        processingLeaseMs: 1_000,
      })
    ).resolves.toMatchObject({ disposition: 'claimed' });
    await expect(
      inbox.claim({
        consumerId: 'runtime.commands',
        ownerId: 'worker.bad',
        messageId: 'message.claim',
        payloadHash: 'sha256:' + '0'.repeat(64),
        receivedAt: '2026-07-18T04:00:02.100Z',
        processingLeaseMs: 1_000,
      })
    ).resolves.toMatchObject({ disposition: 'conflict' });
  });
});

describe('Runtime Outbox', () => {
  it('publishes pending records and marks them durably completed', async () => {
    const bus = new InMemoryMessageBus({ now: () => initialTime });
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    await outbox.enqueue({
      id: 'outbox.1',
      eventId: 'event.1',
      envelope: createRuntimeMessageEnvelope(envelope('message.outbox.1')),
      createdAt: initialTime,
    });
    const dispatcher = new RuntimeOutboxDispatcher({
      ownerId: 'publisher.1',
      outbox,
      bus,
      now: () => initialTime,
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
    let now = initialTime;
    let calls = 0;
    const delegate = new InMemoryMessageBus({ now: () => now });
    const bus: MessageBus = {
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
    now = '2026-07-18T04:00:00.100Z';
    await expect(dispatcher.dispatch()).resolves.toMatchObject({ failed: 0, published: 1 });
    await expect(outbox.get('outbox.retry')).resolves.toMatchObject({
      state: 'published',
      attempts: 2,
    });
  });

  it('recovers publish-complete crashes using lease expiry and broker idempotency', async () => {
    let now = initialTime;
    const bus = new InMemoryMessageBus({ now: () => now });
    const outbox = new InMemoryRuntimeMessageOutboxStore();
    const persistedEnvelope = createRuntimeMessageEnvelope(envelope('message.outbox.crash'));
    await outbox.enqueue({ id: 'outbox.crash', envelope: persistedEnvelope, createdAt: now });
    const [claimed] = await outbox.claim({
      ownerId: 'publisher.crashed',
      now,
      leaseMs: 1_000,
      limit: 1,
    });
    await expect(bus.publish({ envelope: claimed.envelope })).resolves.toMatchObject({
      reused: false,
    });

    now = '2026-07-18T04:00:02.000Z';
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
  });
});
