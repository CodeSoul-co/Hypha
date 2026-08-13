import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  ArtifactSessionCommandPayloadStore,
  InMemoryTelemetryRecorder,
  RUNTIME_OPERATIONAL_METRIC_NAMES,
  RuntimeOperationalTelemetry,
} from '@codesoul-co/hypha-core';
import { InMemoryExecutionArtifactStore, SQLiteSessionQueue } from '@codesoul-co/hypha-adapters-local';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandInput,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';

interface GovernancePayload {
  version: '1.0.0';
  runId: string;
  mode: 'apply' | 'hold' | 'poison';
}

interface AcceptancePayloads extends ServerSessionCommandPayloads {
  signal: GovernancePayload;
}

describe('Server Session Command governance acceptance', () => {
  it('enforces Session, user, and global backpressure through Server ingress', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-command-backpressure-'));
    const queue = new SQLiteSessionQueue({
      filename: path.join(root, 'queue.sqlite'),
      maxPendingPerSession: 2,
      maxPendingPerUser: 3,
      maxPendingGlobal: 4,
    });
    const runtime = createRuntime({
      queue,
      payloads: payloadStore(),
      workerId: 'worker.backpressure',
      handle: apply,
    });

    try {
      await enqueue(runtime, 'command.session.1', 'user.1', 'session.1', 'run.1');
      await enqueue(runtime, 'command.session.2', 'user.1', 'session.1', 'run.1');
      await expect(
        enqueue(runtime, 'command.session.rejected', 'user.1', 'session.1', 'run.1')
      ).rejects.toMatchObject({
        code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
        context: { sessionId: 'session.1', maxPendingPerSession: 2 },
      });

      await enqueue(runtime, 'command.user.3', 'user.1', 'session.2', 'run.2');
      await expect(
        enqueue(runtime, 'command.user.rejected', 'user.1', 'session.3', 'run.3')
      ).rejects.toMatchObject({
        code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
        context: { userId: 'user.1', maxPendingPerUser: 3 },
      });

      await enqueue(runtime, 'command.global.4', 'user.2', 'session.4', 'run.4');
      await expect(
        enqueue(runtime, 'command.global.rejected', 'user.3', 'session.5', 'run.5')
      ).rejects.toMatchObject({
        code: 'RUNTIME_SESSION_QUEUE_OVERFLOW',
        context: { maxPendingGlobal: 4 },
      });

      await expect(queue.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          totalCommands: 4,
          pendingCommands: 4,
          queuedCommands: 4,
          claimedCommands: 0,
        },
      });
      await expect(
        queue.list({ scope: { userId: 'user.1', sessionId: 'session.1' } })
      ).resolves.toHaveLength(2);
      await expect(
        queue.list({ scope: { userId: 'user.1', sessionId: 'session.2' } })
      ).resolves.toMatchObject([{ id: 'command.user.3', status: 'queued' }]);
      await expect(
        queue.list({ scope: { userId: 'user.2', sessionId: 'session.4' } })
      ).resolves.toMatchObject([{ id: 'command.global.4', status: 'queued' }]);
    } finally {
      await runtime.close();
      queue.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('ages durable priority so old work is not starved after restart', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-command-priority-'));
    const filename = path.join(root, 'queue.sqlite');
    const payloads = payloadStore();
    const handled: string[] = [];
    let now = '2026-07-31T00:00:00.000Z';
    let queue = new SQLiteSessionQueue({
      filename,
      priorityAgingMs: 1_000,
      now: () => now,
    });
    let runtime = createRuntime({
      queue,
      payloads,
      workerId: 'worker.priority.before-restart',
      now: () => now,
      handle: async (input) => {
        handled.push(input.command.id);
        return apply(input);
      },
    });

    try {
      await enqueue(runtime, 'command.old-low', 'user.1', 'session.old', 'run.old', {
        priority: 0,
        createdAt: now,
        availableAt: now,
      });
      now = '2026-07-31T00:01:41.000Z';
      await enqueue(runtime, 'command.new-high', 'user.1', 'session.new', 'run.new', {
        priority: 100,
        createdAt: now,
        availableAt: now,
      });

      await runtime.close();
      queue.close();
      queue = new SQLiteSessionQueue({
        filename,
        priorityAgingMs: 1_000,
        now: () => now,
      });
      runtime = createRuntime({
        queue,
        payloads,
        workerId: 'worker.priority.after-restart',
        now: () => now,
        handle: async (input) => {
          handled.push(input.command.id);
          return apply(input);
        },
      });

      await expect(runtime.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: 'command.old-low',
      });
      await expect(runtime.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: 'command.new-high',
      });
      expect(handled).toEqual(['command.old-low', 'command.new-high']);
    } finally {
      await runtime.close();
      queue.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('fences a cancelled in-flight Run while preserving other work and health evidence', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-command-cancellation-'));
    const filename = path.join(root, 'queue.sqlite');
    const scope = { userId: 'user.1', sessionId: 'session.1' };
    const payloads = payloadStore();
    const gate = holdGate();
    const handled: string[] = [];
    const recorder = new InMemoryTelemetryRecorder();
    let now = '2026-07-31T01:00:00.000Z';
    let monotonicNow = 0;
    let queue = new SQLiteSessionQueue({ filename, now: () => now });
    const runtime = createRuntime({
      queue,
      payloads,
      workerId: 'worker.cancellation',
      now: () => now,
      handle: async (input) => {
        if (input.payload.mode === 'hold') {
          gate.markStarted();
          await gate.wait;
        }
        if (input.payload.mode === 'poison') {
          return {
            disposition: 'failed',
            rejectionCode: 'acceptance_poison_command',
            deadLetter: true,
          };
        }
        handled.push(input.command.id);
        return apply(input);
      },
      operationalTelemetry: new RuntimeOperationalTelemetry({
        recorder,
        now: () => now,
      }),
      monotonicNow: () => {
        monotonicNow += 2;
        return monotonicNow;
      },
    });

    try {
      await enqueue(runtime, 'command.run-a.in-flight', scope.userId, scope.sessionId, 'run.a', {
        mode: 'hold',
      });
      await enqueue(runtime, 'command.run-a.queued', scope.userId, scope.sessionId, 'run.a');
      await enqueue(runtime, 'command.run-b', scope.userId, scope.sessionId, 'run.b');
      await enqueue(runtime, 'command.poison', 'user.2', 'session.poison', 'run.poison', {
        mode: 'poison',
      });

      const inFlight = runtime.processNext(scope);
      await gate.started;
      now = '2026-07-31T01:00:00.100Z';
      const cancellation = {
        version: '1.0.0' as const,
        scope,
        targetRunId: 'run.a',
        cancellationCommandId: 'command.cancel.run-a',
        reason: 'Run cancelled during handler execution',
        cancelledAt: now,
      };
      await expect(queue.cancelPending(cancellation)).resolves.toEqual({
        targetRunId: 'run.a',
        cancelledCommandIds: ['command.run-a.in-flight', 'command.run-a.queued'],
        alreadyCancelledCommandIds: [],
        alreadyTerminalCommandIds: [],
      });
      gate.release();
      await expect(inFlight).resolves.toMatchObject({
        disposition: 'lease_lost',
        commandId: 'command.run-a.in-flight',
      });

      await expect(runtime.processNext(scope)).resolves.toMatchObject({
        disposition: 'applied',
        commandId: 'command.run-b',
      });
      await expect(
        runtime.processNext({ userId: 'user.2', sessionId: 'session.poison' })
      ).resolves.toMatchObject({
        disposition: 'dead_lettered',
        commandId: 'command.poison',
        rejectionCode: 'acceptance_poison_command',
      });
      expect(handled).toEqual(['command.run-a.in-flight', 'command.run-b']);
      expect(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalTotal)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: 1,
            attributes: { resource: 'session_command', outcome: 'failed' },
          }),
          expect.objectContaining({
            value: 1,
            attributes: { resource: 'session_command', outcome: 'succeeded' },
          }),
        ])
      );
      expect(
        JSON.stringify(recorder.list(RUNTIME_OPERATIONAL_METRIC_NAMES.leaseRenewalTotal))
      ).not.toMatch(/run\.|session\.|command\.|sha256:/u);

      await runtime.close();
      queue.close();
      queue = new SQLiteSessionQueue({ filename, now: () => now });
      await expect(queue.cancelPending(cancellation)).resolves.toEqual({
        targetRunId: 'run.a',
        cancelledCommandIds: [],
        alreadyCancelledCommandIds: ['command.run-a.in-flight', 'command.run-a.queued'],
        alreadyTerminalCommandIds: [],
      });
      await expect(queue.list({ scope })).resolves.toMatchObject([
        {
          id: 'command.run-a.in-flight',
          status: 'rejected',
          rejectionCode: 'RUNTIME_RUN_CANCELLED',
        },
        {
          id: 'command.run-a.queued',
          status: 'rejected',
          rejectionCode: 'RUNTIME_RUN_CANCELLED',
        },
        {
          id: 'command.run-b',
          status: 'applied',
          resultRunId: 'run.b',
        },
      ]);
      await expect(queue.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          totalCommands: 4,
          pendingCommands: 0,
          queuedCommands: 0,
          claimedCommands: 0,
          deadLetterCommands: 1,
        },
      });
    } finally {
      gate.release();
      await runtime.close();
      queue.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

function createRuntime(input: {
  queue: SQLiteSessionQueue;
  payloads: ArtifactSessionCommandPayloadStore;
  workerId: string;
  handle(
    input: ServerSessionCommandInput<GovernancePayload, 'signal'>
  ): Promise<
    | { disposition: 'applied'; resultRunId: string; resultEventIds: string[] }
    | { disposition: 'failed'; rejectionCode: string; deadLetter: true }
  >;
  now?: () => string;
  operationalTelemetry?: RuntimeOperationalTelemetry;
  monotonicNow?: () => number;
}): ServerSessionCommandRuntime<AcceptancePayloads> {
  return new ServerSessionCommandRuntime<AcceptancePayloads>({
    queue: input.queue,
    payloads: input.payloads,
    workerId: input.workerId,
    leaseMs: 1_000,
    renewalIntervalMs: 500,
    maxHandlerDurationMs: 2_000,
    definitions: {
      signal: {
        decode: decodePayload,
        handle: input.handle,
      },
    },
    ...(input.now === undefined ? {} : { now: input.now }),
    ...(input.operationalTelemetry === undefined
      ? {}
      : { operationalTelemetry: input.operationalTelemetry }),
    ...(input.monotonicNow === undefined ? {} : { monotonicNow: input.monotonicNow }),
  });
}

function payloadStore(): ArtifactSessionCommandPayloadStore {
  return new ArtifactSessionCommandPayloadStore({
    artifacts: new InMemoryExecutionArtifactStore(),
  });
}

function enqueue(
  runtime: ServerSessionCommandRuntime<AcceptancePayloads>,
  id: string,
  userId: string,
  sessionId: string,
  runId: string,
  options: {
    mode?: GovernancePayload['mode'];
    priority?: number;
    createdAt?: string;
    availableAt?: string;
  } = {}
) {
  return runtime.enqueue({
    id,
    commandType: 'signal',
    idempotencyKey: id,
    userId,
    sessionId,
    targetRunId: runId,
    payload: {
      version: '1.0.0',
      runId,
      mode: options.mode ?? 'apply',
    },
    ...(options.priority === undefined ? {} : { priority: options.priority }),
    ...(options.createdAt === undefined ? {} : { createdAt: options.createdAt }),
    ...(options.availableAt === undefined ? {} : { availableAt: options.availableAt }),
  });
}

async function apply(
  input: ServerSessionCommandInput<GovernancePayload, 'signal'>
): Promise<{ disposition: 'applied'; resultRunId: string; resultEventIds: string[] }> {
  return {
    disposition: 'applied',
    resultRunId: input.payload.runId,
    resultEventIds: [`event.${input.command.id}`],
  };
}

function decodePayload(value: unknown): GovernancePayload {
  const record =
    value && typeof value === 'object' ? (value as Record<string, unknown>) : undefined;
  if (
    !record ||
    record.version !== '1.0.0' ||
    typeof record.runId !== 'string' ||
    !['apply', 'hold', 'poison'].includes(String(record.mode))
  ) {
    throw new Error('Governance payload is invalid');
  }
  return {
    version: '1.0.0',
    runId: record.runId,
    mode: record.mode as GovernancePayload['mode'],
  };
}

function holdGate() {
  let markStarted!: () => void;
  let release!: () => void;
  const started = new Promise<void>((resolve) => {
    markStarted = resolve;
  });
  const wait = new Promise<void>((resolve) => {
    release = resolve;
  });
  let released = false;
  return {
    started,
    wait,
    markStarted,
    release() {
      if (released) return;
      released = true;
      release();
    },
  };
}
