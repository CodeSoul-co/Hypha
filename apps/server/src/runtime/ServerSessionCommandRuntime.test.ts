import {
  ArtifactSessionCommandPayloadStore,
  InMemorySessionQueue,
  type SessionCommandHandlerResult,
} from '@hypha/core';
import { InMemoryExecutionArtifactStore } from '@hypha/adapters-local';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';

interface TestPayloads extends ServerSessionCommandPayloads {
  start_run: { topic: string };
}

describe('ServerSessionCommandRuntime', () => {
  it('decodes, persists, enqueues, and applies a typed command', async () => {
    const queue = new InMemorySessionQueue();
    const payloads = new ArtifactSessionCommandPayloadStore({
      artifacts: new InMemoryExecutionArtifactStore(),
    });
    const handle = jest.fn(
      async (): Promise<SessionCommandHandlerResult> => ({
        disposition: 'applied',
        resultRunId: 'run.1',
        resultEventIds: ['event.1'],
      })
    );
    const runtime = new ServerSessionCommandRuntime<TestPayloads>({
      queue,
      payloads,
      workerId: 'server.test',
      leaseMs: 1_000,
      definitions: {
        start_run: {
          decode: topicPayload,
          handle,
        },
      },
    });

    const queued = await runtime.enqueue({
      id: 'command.1',
      commandType: 'start_run',
      idempotencyKey: 'request.1',
      userId: 'user.1',
      sessionId: 'session.1',
      payload: { topic: 'runtime' },
    });
    await expect(runtime.processNext()).resolves.toMatchObject({
      disposition: 'applied',
      commandId: 'command.1',
    });

    expect(queued.payloadRef).toMatch(/^artifact-ref:/u);
    expect(handle).toHaveBeenCalledWith({
      command: expect.objectContaining({ id: 'command.1', commandType: 'start_run' }),
      payload: { topic: 'runtime' },
    });
    await expect(
      queue.list({ scope: { userId: 'user.1', sessionId: 'session.1' } })
    ).resolves.toEqual([
      expect.objectContaining({
        id: 'command.1',
        status: 'applied',
        resultRunId: 'run.1',
        resultEventIds: ['event.1'],
      }),
    ]);
    await runtime.close();
  });

  it('rejects command types not enabled by the Server before persisting them', async () => {
    const artifacts = new InMemoryExecutionArtifactStore();
    const runtime = new ServerSessionCommandRuntime<TestPayloads>({
      queue: new InMemorySessionQueue(),
      payloads: new ArtifactSessionCommandPayloadStore({ artifacts }),
      workerId: 'server.test',
      leaseMs: 1_000,
      definitions: {},
    });

    await expect(
      runtime.enqueue({
        id: 'command.disabled',
        commandType: 'start_run',
        idempotencyKey: 'request.disabled',
        userId: 'user.1',
        sessionId: 'session.1',
        payload: { topic: 'runtime' },
      })
    ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    expect(artifacts.stats()).toEqual({ objects: 0, blobs: 0, storedBytes: 0 });
    await runtime.close();
  });

  it('maps handler failures explicitly instead of letting the Worker misclassify them', async () => {
    const now = () => '2026-07-22T08:00:00.000Z';
    const queue = new InMemorySessionQueue({ now });
    const runtime = new ServerSessionCommandRuntime<TestPayloads>({
      queue,
      payloads: new ArtifactSessionCommandPayloadStore({
        artifacts: new InMemoryExecutionArtifactStore(),
      }),
      workerId: 'server.test',
      leaseMs: 1_000,
      classifyFailure: () => ({
        disposition: 'retry',
        availableAt: '2026-07-22T08:00:01.000Z',
      }),
      definitions: {
        start_run: {
          decode: topicPayload,
          handle: async () => {
            throw new Error('temporary dependency failure');
          },
        },
      },
      now,
    });
    await runtime.enqueue({
      id: 'command.retry',
      commandType: 'start_run',
      idempotencyKey: 'request.retry',
      userId: 'user.1',
      sessionId: 'session.1',
      payload: { topic: 'runtime' },
    });

    await expect(runtime.processNext()).resolves.toMatchObject({
      disposition: 'retry_scheduled',
    });
    await expect(
      queue.list({ scope: { userId: 'user.1', sessionId: 'session.1' } })
    ).resolves.toEqual([
      expect.objectContaining({
        status: 'queued',
        attempts: 1,
        availableAt: '2026-07-22T08:00:01.000Z',
      }),
    ]);
    await runtime.close();
  });

  it('stops new claims and drains the active handler before closing', async () => {
    const queue = new InMemorySessionQueue();
    let releaseHandler: (() => void) | undefined;
    const handlerStarted = new Promise<void>((resolve) => {
      releaseHandler = resolve;
    });
    let markStarted: (() => void) | undefined;
    const started = new Promise<void>((resolve) => {
      markStarted = resolve;
    });
    const runtime = new ServerSessionCommandRuntime<TestPayloads>({
      queue,
      payloads: new ArtifactSessionCommandPayloadStore({
        artifacts: new InMemoryExecutionArtifactStore(),
      }),
      workerId: 'server.test',
      leaseMs: 1_000,
      pollIntervalMs: 1,
      definitions: {
        start_run: {
          decode: topicPayload,
          handle: async () => {
            markStarted?.();
            await handlerStarted;
            return { disposition: 'applied' };
          },
        },
      },
    });
    await runtime.enqueue({
      id: 'command.active',
      commandType: 'start_run',
      idempotencyKey: 'request.active',
      userId: 'user.1',
      sessionId: 'session.1',
      payload: { topic: 'runtime' },
    });
    runtime.start();
    await started;

    let closed = false;
    const closing = runtime.close().then(() => {
      closed = true;
    });
    await Promise.resolve();
    expect(closed).toBe(false);
    releaseHandler?.();
    await closing;

    expect(runtime.isRunning()).toBe(false);
    await expect(
      queue.list({ scope: { userId: 'user.1', sessionId: 'session.1' } })
    ).resolves.toEqual([expect.objectContaining({ status: 'applied' })]);
  });
});

function topicPayload(payload: unknown): { topic: string } {
  if (
    !payload ||
    typeof payload !== 'object' ||
    !('topic' in payload) ||
    typeof payload.topic !== 'string' ||
    payload.topic.length === 0
  ) {
    throw new TypeError('topic is required');
  }
  return { topic: payload.topic };
}
