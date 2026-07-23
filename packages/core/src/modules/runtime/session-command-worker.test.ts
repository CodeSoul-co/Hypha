import { describe, expect, it, vi } from 'vitest';
import type {
  EnqueueSessionCommandRequest,
  SessionQueueScope,
} from '../../contracts/session-queue';
import { InMemorySessionQueue } from './session-queue';
import { DurableSessionCommandWorker } from './session-command-worker';

const initialTime = '2026-07-22T08:00:00.000Z';
const payloadHash = 'sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08';
const scope: SessionQueueScope = { userId: 'user.worker', sessionId: 'session.worker' };

function command(
  id: string,
  overrides: Partial<EnqueueSessionCommandRequest> = {}
): EnqueueSessionCommandRequest {
  return {
    id,
    commandType: 'user_input',
    idempotencyKey: `idempotency.${id}`,
    userId: scope.userId,
    sessionId: scope.sessionId,
    payloadHash,
    createdAt: initialTime,
    ...overrides,
  };
}

describe('DurableSessionCommandWorker', () => {
  it('completes an applied command with its Run and Event results', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    const handler = vi.fn(async () => ({
      disposition: 'applied' as const,
      resultRunId: 'run.1',
      resultEventIds: ['event.1', 'event.2'],
    }));
    await queue.enqueue(command('command.applied'));

    await expect(worker(queue, { user_input: handler }).processNext()).resolves.toMatchObject({
      disposition: 'applied',
      commandId: 'command.applied',
      attempts: 1,
    });
    expect(handler).toHaveBeenCalledWith(expect.objectContaining({ attempts: 1 }));
    await expect(queue.list({ scope })).resolves.toMatchObject([
      {
        status: 'applied',
        resultRunId: 'run.1',
        resultEventIds: ['event.1', 'event.2'],
      },
    ]);
  });

  it('releases an explicitly retryable command until its delay elapses', async () => {
    let now = initialTime;
    const queue = new InMemorySessionQueue({ now: () => now });
    await queue.enqueue(command('command.retry'));
    const active = worker(
      queue,
      {
        user_input: async () => ({
          disposition: 'retry',
          availableAt: '2026-07-22T08:00:02.000Z',
        }),
      },
      () => now
    );

    await expect(active.processNext()).resolves.toMatchObject({ disposition: 'retry_scheduled' });
    now = '2026-07-22T08:00:01.000Z';
    await expect(active.processNext()).resolves.toEqual({ disposition: 'idle' });
    now = '2026-07-22T08:00:02.000Z';
    await expect(active.processNext()).resolves.toMatchObject({ attempts: 2 });
  });

  it('dead-letters a retry outcome after the command consumes its final attempt', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.exhausted', { maxAttempts: 1 }));
    const active = worker(queue, {
      user_input: async () => ({ disposition: 'retry' }),
    });

    await expect(active.processNext()).resolves.toMatchObject({
      disposition: 'dead_lettered',
      rejectionCode: 'attempt_budget_exhausted',
    });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { status: 'dead_letter', rejectionCode: 'attempt_budget_exhausted' },
    ]);
  });

  it('records explicit terminal failures without retrying them', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.failed'));
    const active = worker(queue, {
      user_input: async () => ({
        disposition: 'failed',
        rejectionCode: 'policy_denied',
      }),
    });

    await expect(active.processNext()).resolves.toMatchObject({
      disposition: 'failed',
      rejectionCode: 'policy_denied',
    });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { status: 'failed', rejectionCode: 'policy_denied' },
    ]);
  });

  it.each([
    ['missing handler', {}, 'session_command_handler_unavailable'],
    [
      'unexpected handler exception',
      { user_input: async () => Promise.reject(new Error('provider failed')) },
      'session_command_handler_unexpected_error',
    ],
    [
      'invalid handler result',
      { user_input: async () => ({ disposition: 'failed' as const, rejectionCode: '' }) },
      'session_command_handler_unexpected_error',
    ],
  ])('fails closed for %s', async (_label, handlers, rejectionCode) => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command(`command.${rejectionCode}`));

    await expect(worker(queue, handlers).processNext()).resolves.toMatchObject({
      disposition: 'dead_lettered',
      rejectionCode,
    });
    await expect(queue.list({ scope })).resolves.toMatchObject([
      { status: 'dead_letter', rejectionCode },
    ]);
  });

  it('claims only the requested Session scope', async () => {
    const queue = new InMemorySessionQueue({ now: () => initialTime });
    await queue.enqueue(command('command.other', { userId: 'user.other', sessionId: 'other' }));
    await queue.enqueue(command('command.target'));
    const active = worker(queue, {
      user_input: async () => ({ disposition: 'applied' }),
    });

    await expect(active.processNext(scope)).resolves.toMatchObject({
      commandId: 'command.target',
    });
    await expect(
      queue.list({ scope: { userId: 'user.other', sessionId: 'other' } })
    ).resolves.toMatchObject([{ status: 'queued' }]);
  });
});

function worker(
  queue: InMemorySessionQueue,
  handlers: ConstructorParameters<typeof DurableSessionCommandWorker>[0]['handlers'],
  now: () => string = () => initialTime
): DurableSessionCommandWorker {
  return new DurableSessionCommandWorker({
    queue,
    workerId: 'session-command-worker.test',
    leaseMs: 1_000,
    handlers,
    now,
  });
}
