import { describe, expect, it } from 'vitest';
import type { RuntimeMessageEnvelopeInput } from '../../contracts/runtime-messages';
import {
  InMemoryMessageBus,
  createRuntimeMessageEnvelope,
  type MessageDelivery,
} from './message-bus';

const publishedAt = '2026-07-18T03:00:00.000Z';

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
    publishedAt,
    producerId: 'runtime.test',
    ...overrides,
  };
}

async function nextDelivery(
  bus: InMemoryMessageBus,
  options: { consumerId?: string; consumerGroup?: string; partitionKey?: string } = {}
): Promise<MessageDelivery | null> {
  const subscription = bus.subscribe({
    consumerId: options.consumerId ?? 'worker.1',
    consumerGroup: options.consumerGroup,
    topic: 'hypha.runtime.commands',
    partitionKey: options.partitionKey,
    maxMessages: 1,
    idleTimeoutMs: 0,
    ackDeadlineMs: 1_000,
  });
  const result = await subscription[Symbol.asyncIterator]().next();
  return result.done ? null : result.value;
}

describe('InMemoryMessageBus', () => {
  it('hashes payloads, allocates partition sequences, and reuses identical publishes', async () => {
    const bus = new InMemoryMessageBus({ now: () => publishedAt });
    await expect(bus.publish({ envelope: envelope('message.1') })).resolves.toMatchObject({
      sequence: 1,
      reused: false,
    });
    await expect(bus.publish({ envelope: envelope('message.2') })).resolves.toMatchObject({
      sequence: 2,
      reused: false,
    });
    await expect(bus.publish({ envelope: envelope('message.1') })).resolves.toMatchObject({
      sequence: 1,
      reused: true,
    });
    const delivery = await nextDelivery(bus);
    expect(delivery?.envelope).toMatchObject({
      messageId: 'message.1',
      sequence: 1,
      payloadHash: expect.stringMatching(/^sha256:[a-f0-9]{64}$/u),
    });
  });

  it('publishes a batch atomically when a later message is invalid', async () => {
    const bus = new InMemoryMessageBus({ now: () => publishedAt });
    await expect(
      bus.publishBatch([
        { envelope: envelope('message.atomic.1') },
        { envelope: envelope('message.atomic.2', { sequence: 9 }) },
      ])
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });

    await expect(
      bus.publish({ envelope: envelope('message.after-failure') })
    ).resolves.toMatchObject({ sequence: 1 });
  });

  it('rejects payload hash drift and conflicting message reuse', async () => {
    const bus = new InMemoryMessageBus({ now: () => publishedAt });
    await expect(
      bus.publish({
        envelope: envelope('message.hash', { payloadHash: 'sha256:' + '0'.repeat(64) }),
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_MESSAGE_SCHEMA_INVALID' });
    await bus.publish({ envelope: envelope('message.conflict') });
    await expect(
      bus.publish({ envelope: envelope('message.conflict', { payload: { changed: true } }) })
    ).rejects.toMatchObject({ code: 'RUNTIME_IDEMPOTENCY_CONFLICT' });
  });

  it('does not deliver sequence two while sequence one is unacknowledged', async () => {
    const bus = new InMemoryMessageBus({ now: () => publishedAt });
    await bus.publishBatch([
      { envelope: envelope('message.1') },
      { envelope: envelope('message.2') },
    ]);
    const first = await nextDelivery(bus);
    expect(first?.envelope.messageId).toBe('message.1');
    expect(await nextDelivery(bus)).toBeNull();
    await first?.ack();
    expect((await nextDelivery(bus))?.envelope.messageId).toBe('message.2');
  });

  it('allows another partition to progress and isolates consumer-group acknowledgements', async () => {
    const bus = new InMemoryMessageBus({ now: () => publishedAt });
    await bus.publishBatch([
      { envelope: envelope('message.partition.1') },
      { envelope: envelope('message.partition.2', { partitionKey: 'session.2' }) },
    ]);
    const groupOneFirst = await nextDelivery(bus, { consumerGroup: 'group.1' });
    const groupOneSecond = await nextDelivery(bus, { consumerGroup: 'group.1' });
    expect([groupOneFirst?.envelope.messageId, groupOneSecond?.envelope.messageId].sort()).toEqual([
      'message.partition.1',
      'message.partition.2',
    ]);
    await groupOneFirst?.ack();
    await groupOneSecond?.ack();

    const groupTwo = await nextDelivery(bus, { consumerId: 'worker.2', consumerGroup: 'group.2' });
    expect(groupTwo?.envelope.messageId).toBe('message.partition.1');
  });

  it('redelivers after Nack or Ack deadline and dead-letters exhausted attempts', async () => {
    let now = publishedAt;
    const bus = new InMemoryMessageBus({ now: () => now, maxDeliveryAttempts: 2 });
    await bus.publish({ envelope: envelope('message.retry') });
    const first = await nextDelivery(bus, { consumerGroup: 'group.retry' });
    await first?.nack({ reason: 'temporary' });
    const second = await nextDelivery(bus, { consumerGroup: 'group.retry' });
    expect(second?.attempt).toBe(2);
    await second?.nack({ reason: 'poison' });
    expect(bus.listDeadLetters('group.retry')).toHaveLength(1);

    await bus.publish({ envelope: envelope('message.deadline') });
    const deadlineFirst = await nextDelivery(bus, { consumerGroup: 'group.deadline' });
    now = '2026-07-18T03:00:02.000Z';
    const deadlineSecond = await nextDelivery(bus, { consumerGroup: 'group.deadline' });
    expect(deadlineSecond?.attempt).toBe(2);
    expect(deadlineSecond?.deliveryId).not.toBe(deadlineFirst?.deliveryId);
  });

  it('creates immutable canonical envelopes', () => {
    const input = envelope('message.canonical', { payload: { b: 2, a: 1 } });
    const created = createRuntimeMessageEnvelope(input);
    (input.payload as Record<string, unknown>).a = 9;
    expect(created.payload).toEqual({ a: 1, b: 2 });
  });
});
