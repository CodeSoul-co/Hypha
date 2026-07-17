import { createRuntimeMessageEnvelope } from '@hypha/core';
import Redis from 'ioredis';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { RedisStreamsMessageBus } from './redis-streams-message-bus';

const redisUrl = process.env.HYPHA_REDIS_TEST_URL;
const suite = redisUrl ? describe : describe.skip;
const topic = 'hypha.runtime.commands.contract';
const keyPrefix = `hypha:test:${process.pid}:${Date.now()}:`;
let redis: Redis;
let bus: RedisStreamsMessageBus;

function envelope(messageId: string, messageTopic = topic) {
  return createRuntimeMessageEnvelope({
    messageId,
    messageType: 'runtime.command.start',
    schemaVersion: '1.0.0',
    topic: messageTopic,
    partitionKey: 'session.contract',
    userId: 'user.contract',
    sessionId: 'session.contract',
    runId: 'run.contract',
    payload: { messageId },
    publishedAt: new Date().toISOString(),
    producerId: 'contract.test',
  });
}

suite('RedisStreamsMessageBus contract', () => {
  beforeAll(async () => {
    redis = new Redis(redisUrl!);
    bus = new RedisStreamsMessageBus({
      redis,
      keyPrefix,
      maxDeliveryAttempts: 2,
      defaultAckDeadlineMs: 50,
      blockMs: 20,
    });
    await expect(bus.health()).resolves.toMatchObject({ status: 'healthy' });
  });

  afterAll(async () => {
    if (!redis) return;
    let cursor = '0';
    do {
      const [next, keys] = await redis.scan(cursor, 'MATCH', `${keyPrefix}*`, 'COUNT', 100);
      cursor = next;
      if (keys.length > 0) await redis.del(...keys);
    } while (cursor !== '0');
    await bus.close();
    await redis.quit();
  });

  it('publishes idempotently and preserves partition order', async () => {
    const messageTopic = `${topic}.order`;
    const firstEnvelope = envelope('redis.message.1', messageTopic);
    const first = await bus.publish({ envelope: firstEnvelope });
    const reused = await bus.publish({ envelope: firstEnvelope });
    const second = await bus.publish({ envelope: envelope('redis.message.2', messageTopic) });
    expect(first).toMatchObject({ sequence: 1, reused: false });
    expect(reused).toMatchObject({ sequence: 1, reused: true });
    expect(second).toMatchObject({ sequence: 2, reused: false });

    const deliveries = bus.subscribe({
      consumerGroup: 'contract.order',
      consumerId: 'worker.order',
      topic: messageTopic,
      maxMessages: 2,
      idleTimeoutMs: 500,
    });
    const received: string[] = [];
    for await (const delivery of deliveries) {
      received.push(delivery.envelope.messageId);
      await delivery.ack();
    }
    expect(received).toEqual(['redis.message.1', 'redis.message.2']);
  });

  it('redelivers Nacked work and dead-letters exhausted attempts', async () => {
    const messageTopic = `${topic}.retry`;
    await bus.publish({ envelope: envelope('redis.message.retry', messageTopic) });
    const firstSubscription = bus.subscribe({
      consumerGroup: 'contract.retry',
      consumerId: 'worker.retry.1',
      topic: messageTopic,
      maxMessages: 1,
      idleTimeoutMs: 500,
    });
    const firstIterator = firstSubscription[Symbol.asyncIterator]();
    const first = await firstIterator.next();
    expect(first.done).toBe(false);
    expect(first.value?.attempt).toBe(1);
    await first.value?.nack({ reason: 'temporary' });

    const retrySubscription = bus.subscribe({
      consumerGroup: 'contract.retry',
      consumerId: 'worker.retry.2',
      topic: messageTopic,
      maxMessages: 1,
      idleTimeoutMs: 500,
    });
    const retryIterator = retrySubscription[Symbol.asyncIterator]();
    const retry = await retryIterator.next();
    expect(retry.value?.attempt).toBe(2);
    await retry.value?.nack({ reason: 'poison' });
    await expect(redis.xlen(`${keyPrefix}dead-letter:${messageTopic}`)).resolves.toBe(1);
  });

  it('reclaims unacknowledged pending entries after the Ack deadline', async () => {
    const messageTopic = `${topic}.deadline`;
    await bus.publish({ envelope: envelope('redis.message.deadline', messageTopic) });
    const firstSubscription = bus.subscribe({
      consumerGroup: 'contract.deadline',
      consumerId: 'worker.deadline.old',
      topic: messageTopic,
      maxMessages: 1,
      idleTimeoutMs: 500,
      ackDeadlineMs: 50,
    });
    const firstIterator = firstSubscription[Symbol.asyncIterator]();
    const first = await firstIterator.next();
    expect(first.value?.attempt).toBe(1);
    await new Promise((resolve) => setTimeout(resolve, 80));

    const recoveredSubscription = bus.subscribe({
      consumerGroup: 'contract.deadline',
      consumerId: 'worker.deadline.new',
      topic: messageTopic,
      maxMessages: 1,
      idleTimeoutMs: 500,
      ackDeadlineMs: 50,
    });
    const recoveredIterator = recoveredSubscription[Symbol.asyncIterator]();
    const recovered = await recoveredIterator.next();
    expect(recovered.value).toMatchObject({ attempt: 2 });
    await recovered.value?.ack();
  });
});
