import { InMemorySessionQueue } from '@codesoul-co/core';
import { InMemoryExecutionArtifactStore } from '@codesoul-co/adapters-local';
import { createServerProductionSessionCommands } from './ServerProductionSessionCommands';

describe('ServerProductionSessionCommands', () => {
  it('persists, reuses, and applies a scoped start_run command', async () => {
    const queue = new InMemorySessionQueue();
    const startRun = jest.fn(async (_input, runId: string) => ({ runId }));
    const commands = await createServerProductionSessionCommands({
      queue,
      artifacts: new InMemoryExecutionArtifactStore(),
      workerId: 'server.test.commands',
      leaseMs: 30_000,
      pollIntervalMs: 100,
      errorBackoffMs: 1_000,
      renewalIntervalMs: 10_000,
      maxHandlerDurationMs: 60_000,
      shutdownDrainMs: 1_000,
      startRun,
    });

    try {
      expect(commands.supportedCommandTypes()).toEqual(['start_run']);
      const first = await commands.enqueueStartRun(
        {
          userId: 'user.1',
          sessionId: 'session.1',
          input: { task: 'durable' },
          metadata: { surface: 'runtime.command' },
        },
        'request.1'
      );
      const reused = await commands.enqueueStartRun(
        {
          userId: 'user.1',
          sessionId: 'session.1',
          input: { task: 'durable' },
          metadata: { surface: 'runtime.command' },
        },
        'request.1'
      );
      expect(reused).toMatchObject({ id: first.id, status: 'reused' });

      await expect(commands.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: first.id,
        commandType: 'start_run',
      });
      expect(startRun).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: 'user.1',
          sessionId: 'session.1',
          input: { task: 'durable' },
        }),
        first.targetRunId
      );
      await expect(
        commands.listSessionCommands({ userId: 'user.1', sessionId: 'session.1' })
      ).resolves.toEqual([
        expect.objectContaining({
          id: first.id,
          status: 'applied',
          resultRunId: first.targetRunId,
        }),
      ]);
    } finally {
      await commands.close();
    }
  });

  it('rejects undeclared start payload fields before writing an Artifact', async () => {
    const commands = await createServerProductionSessionCommands({
      queue: new InMemorySessionQueue(),
      artifacts: new InMemoryExecutionArtifactStore(),
      workerId: 'server.test.commands',
      leaseMs: 30_000,
      pollIntervalMs: 100,
      errorBackoffMs: 1_000,
      renewalIntervalMs: 10_000,
      maxHandlerDurationMs: 60_000,
      shutdownDrainMs: 1_000,
      startRun: async (_input, runId) => ({ runId }),
    });

    try {
      await expect(
        commands.enqueueStartRun(
          {
            userId: 'user.1',
            sessionId: 'session.1',
            unexpected: 'must-not-cross-boundary',
          } as never,
          'request.invalid'
        )
      ).rejects.toMatchObject({ code: 'RUNTIME_INVALID_INPUT' });
    } finally {
      await commands.close();
    }
  });
});
