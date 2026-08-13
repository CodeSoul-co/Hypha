import fs from 'fs';
import os from 'os';
import path from 'path';
import { ArtifactSessionCommandPayloadStore, type SessionCommandWorkerResult } from '@codesoul-co/core';
import { InMemoryExecutionArtifactStore, SQLiteSessionQueue } from '@codesoul-co/adapters-local';
import {
  ServerSessionCommandRuntime,
  type ServerSessionCommandInput,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';

interface ConcurrencyPayload {
  version: '1.0.0';
  tenantId: string;
  userId: string;
  sessionId: string;
  runId: string;
  sessionSequence: number;
  runSequence: number;
}

interface AcceptancePayloads extends ServerSessionCommandPayloads {
  signal: ConcurrencyPayload;
}

interface SessionFixture {
  tenantId: string;
  userId: string;
  sessionId: string;
  runIds: readonly [string, string];
}

interface WorkerNode {
  id: string;
  runtime: ServerSessionCommandRuntime<AcceptancePayloads>;
  queue: SQLiteSessionQueue;
}

interface HoldGate {
  commandId: string;
  started: Promise<void>;
  wait: Promise<void>;
  signal?: AbortSignal;
  markStarted(signal: AbortSignal): void;
  release(): void;
}

describe('Server Session Command concurrent acceptance', () => {
  it('isolates ordered work across Sessions and Runs through restart and shutdown drain', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-session-concurrency-'));
    const queueFile = path.join(root, 'session-queue.sqlite');
    const artifacts = new InMemoryExecutionArtifactStore();
    const payloads = new ArtifactSessionCommandPayloadStore({ artifacts });
    const fixtures = createFixtures();
    const holdGate = createHoldGate('command.shutdown-drain');
    const tracker = createTracker(holdGate);
    let workers: WorkerNode[] = [];

    try {
      workers = openWorkers({
        generation: 'before-restart',
        queueFile,
        payloads,
        tracker,
      });
      await enqueueFixtureCommands(workers[0].runtime, fixtures);

      await expect(processExactly(workers, 24)).resolves.toBe(24);
      await expect(totalApplied(workers[0].queue, fixtures)).resolves.toBe(24);
      await closeWorkers(workers);
      workers = [];

      workers = openWorkers({
        generation: 'after-restart',
        queueFile,
        payloads,
        tracker,
      });
      await expect(processExactly(workers, 24)).resolves.toBe(24);
      await expect(totalApplied(workers[0].queue, fixtures)).resolves.toBe(48);

      const shutdownScope = {
        tenantId: 'tenant.shutdown',
        userId: 'user.shutdown',
        sessionId: 'session.shutdown',
      };
      await workers[0].runtime.enqueue({
        id: holdGate.commandId,
        commandType: 'signal',
        idempotencyKey: holdGate.commandId,
        ...shutdownScope,
        targetRunId: 'run.shutdown',
        payload: {
          version: '1.0.0',
          ...shutdownScope,
          runId: 'run.shutdown',
          sessionSequence: 1,
          runSequence: 1,
        },
      });
      workers[0].runtime.start(shutdownScope);
      await holdGate.started;

      let shutdownCompleted = false;
      const shutdown = workers[0].runtime.close().then(() => {
        shutdownCompleted = true;
      });
      await delay(10);
      expect(shutdownCompleted).toBe(false);
      expect(holdGate.signal?.aborted).toBe(false);
      holdGate.release();
      await shutdown;
      expect(shutdownCompleted).toBe(true);
      await expect(workers[0].queue.list({ scope: shutdownScope })).resolves.toMatchObject([
        {
          id: holdGate.commandId,
          status: 'applied',
          resultRunId: 'run.shutdown',
          resultEventIds: ['event.command.shutdown-drain'],
        },
      ]);

      await closeWorkers(workers);
      workers = [];
      const verifier = openQueue(queueFile);
      workers.push({
        id: 'verifier',
        queue: verifier,
        runtime: createRuntime({
          workerId: 'worker.verifier',
          queue: verifier,
          payloads,
          tracker,
        }),
      });

      for (const fixture of fixtures) {
        const records = await verifier.list({ scope: fixture });
        expect(records).toHaveLength(6);
        expect(records.map((record) => record.enqueueSequence)).toEqual([1, 2, 3, 4, 5, 6]);
        expect(records.every((record) => record.status === 'applied')).toBe(true);
        expect(records.every((record) => record.userId === fixture.userId)).toBe(true);
        expect(records.every((record) => record.sessionId === fixture.sessionId)).toBe(true);
        expect(records.every((record) => fixture.runIds.includes(record.resultRunId!))).toBe(true);
        expect(records.every((record) => record.resultEventIds?.length === 1)).toBe(true);
        expect(tracker.sessionHistory.get(fixture.sessionId)).toEqual([1, 2, 3, 4, 5, 6]);
        for (const runId of fixture.runIds) {
          expect(tracker.runHistory.get(runId)).toEqual([1, 2, 3]);
        }
      }

      expect(tracker.violations).toEqual([]);
      expect(tracker.peakActiveSessions).toBe(3);
      expect([...tracker.peakActiveSessionsByUser.values()].every((peak) => peak <= 2)).toBe(true);
      expect(
        [...tracker.workerIds].filter((workerId) => workerId.includes('before-restart'))
      ).toHaveLength(3);
      expect(
        [...tracker.workerIds].filter((workerId) => workerId.includes('after-restart'))
      ).toHaveLength(3);
      await expect(verifier.health()).resolves.toMatchObject({
        status: 'healthy',
        details: {
          totalCommands: 49,
          pendingCommands: 0,
          queuedCommands: 0,
          claimedCommands: 0,
          deadLetterCommands: 0,
        },
      });
    } finally {
      holdGate.release();
      await closeWorkers(workers);
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

function openWorkers(input: {
  generation: string;
  queueFile: string;
  payloads: ArtifactSessionCommandPayloadStore;
  tracker: ReturnType<typeof createTracker>;
}): WorkerNode[] {
  return Array.from({ length: 3 }, (_, index) => {
    const queue = openQueue(input.queueFile);
    const id = `worker.${input.generation}.${index + 1}`;
    return {
      id,
      queue,
      runtime: createRuntime({
        workerId: id,
        queue,
        payloads: input.payloads,
        tracker: input.tracker,
      }),
    };
  });
}

function openQueue(filename: string): SQLiteSessionQueue {
  return new SQLiteSessionQueue({
    filename,
    maxConcurrentSessions: 3,
    maxConcurrentSessionsPerUser: 2,
    drainPollMs: 1,
  });
}

function createRuntime(input: {
  workerId: string;
  queue: SQLiteSessionQueue;
  payloads: ArtifactSessionCommandPayloadStore;
  tracker: ReturnType<typeof createTracker>;
}): ServerSessionCommandRuntime<AcceptancePayloads> {
  return new ServerSessionCommandRuntime<AcceptancePayloads>({
    queue: input.queue,
    payloads: input.payloads,
    workerId: input.workerId,
    leaseMs: 1_000,
    renewalIntervalMs: 200,
    maxHandlerDurationMs: 2_000,
    shutdownDrainMs: 500,
    pollIntervalMs: 5,
    definitions: {
      signal: {
        decode: decodePayload,
        handle: input.tracker.handle,
      },
    },
  });
}

function createTracker(holdGate: HoldGate) {
  const activeSessions = new Set<string>();
  const activeSessionsByUser = new Map<string, number>();
  const peakActiveSessionsByUser = new Map<string, number>();
  const sessionHistory = new Map<string, number[]>();
  const runHistory = new Map<string, number[]>();
  const workerIds = new Set<string>();
  const violations: string[] = [];
  let peakActiveSessions = 0;

  const handle = async (
    input: ServerSessionCommandInput<ConcurrencyPayload, 'signal'>
  ): Promise<{
    disposition: 'applied';
    resultRunId: string;
    resultEventIds: string[];
  }> => {
    const { command, payload, signal } = input;
    if (
      command.tenantId !== payload.tenantId ||
      command.userId !== payload.userId ||
      command.sessionId !== payload.sessionId ||
      command.targetRunId !== payload.runId
    ) {
      violations.push(`scope mismatch for ${command.id}`);
    }
    if (activeSessions.has(payload.sessionId)) {
      violations.push(`concurrent work entered ${payload.sessionId}`);
    }
    activeSessions.add(payload.sessionId);
    const userKey = `${payload.tenantId}:${payload.userId}`;
    const activeForUser = (activeSessionsByUser.get(userKey) ?? 0) + 1;
    activeSessionsByUser.set(userKey, activeForUser);
    peakActiveSessions = Math.max(peakActiveSessions, activeSessions.size);
    peakActiveSessionsByUser.set(
      userKey,
      Math.max(peakActiveSessionsByUser.get(userKey) ?? 0, activeForUser)
    );
    if (command.claimedBy) workerIds.add(command.claimedBy);

    try {
      if (command.id === holdGate.commandId) {
        holdGate.markStarted(signal);
        await holdGate.wait;
      } else {
        await delay(4);
      }
      if (signal.aborted) violations.push(`handler aborted before completion: ${command.id}`);
      append(sessionHistory, payload.sessionId, payload.sessionSequence);
      append(runHistory, payload.runId, payload.runSequence);
      return {
        disposition: 'applied',
        resultRunId: payload.runId,
        resultEventIds: [`event.${command.id}`],
      };
    } finally {
      activeSessions.delete(payload.sessionId);
      activeSessionsByUser.set(userKey, (activeSessionsByUser.get(userKey) ?? 1) - 1);
    }
  };

  return {
    handle,
    sessionHistory,
    runHistory,
    workerIds,
    violations,
    peakActiveSessionsByUser,
    get peakActiveSessions() {
      return peakActiveSessions;
    },
  };
}

async function enqueueFixtureCommands(
  runtime: ServerSessionCommandRuntime<AcceptancePayloads>,
  fixtures: readonly SessionFixture[]
): Promise<void> {
  let commandIndex = 0;
  for (let sessionSequence = 1; sessionSequence <= 6; sessionSequence += 1) {
    for (const fixture of fixtures) {
      commandIndex += 1;
      const runIndex = (sessionSequence - 1) % 2;
      const runId = fixture.runIds[runIndex];
      const runSequence = Math.floor((sessionSequence - 1) / 2) + 1;
      const id = `command.${fixture.sessionId}.${sessionSequence}`;
      const createdAt = new Date(
        Date.parse('2026-07-31T00:00:00.000Z') + commandIndex
      ).toISOString();
      await runtime.enqueue({
        id,
        commandType: 'signal',
        idempotencyKey: id,
        tenantId: fixture.tenantId,
        userId: fixture.userId,
        sessionId: fixture.sessionId,
        targetRunId: runId,
        payload: {
          version: '1.0.0',
          tenantId: fixture.tenantId,
          userId: fixture.userId,
          sessionId: fixture.sessionId,
          runId,
          sessionSequence,
          runSequence,
        },
        createdAt,
        availableAt: createdAt,
      });
    }
  }
}

async function processExactly(workers: readonly WorkerNode[], count: number): Promise<number> {
  let processed = 0;
  while (processed < count) {
    const results = await Promise.all(workers.map((worker) => worker.runtime.processNext()));
    const progress = results.filter(
      (result): result is SessionCommandWorkerResult & { commandId: string } =>
        result.disposition !== 'idle' && result.commandId !== undefined
    );
    if (progress.length === 0) throw new Error('Session command workers stopped making progress');
    if (progress.some((result) => result.disposition !== 'applied')) {
      throw new Error(`Unexpected worker result: ${JSON.stringify(progress)}`);
    }
    processed += progress.length;
  }
  if (processed !== count) throw new Error(`Processed ${processed} commands; expected ${count}`);
  return processed;
}

async function totalApplied(
  queue: SQLiteSessionQueue,
  fixtures: readonly SessionFixture[]
): Promise<number> {
  const records = await Promise.all(
    fixtures.map((fixture) => queue.list({ scope: fixture, statuses: ['applied'] }))
  );
  return records.reduce((total, sessionRecords) => total + sessionRecords.length, 0);
}

async function closeWorkers(workers: readonly WorkerNode[]): Promise<void> {
  await Promise.all(workers.map((worker) => worker.runtime.close()));
  for (const worker of workers) worker.queue.close();
}

function createFixtures(): SessionFixture[] {
  return Array.from({ length: 8 }, (_, index) => {
    const tenantId = `tenant.${index < 4 ? 'a' : 'b'}`;
    const userId = `user.${index % 2}`;
    const sessionId = `session.${index + 1}`;
    return {
      tenantId,
      userId,
      sessionId,
      runIds: [`run.${index + 1}.a`, `run.${index + 1}.b`],
    };
  });
}

function createHoldGate(commandId: string): HoldGate {
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
    commandId,
    started,
    wait,
    markStarted(signal) {
      this.signal = signal;
      markStarted();
    },
    release() {
      if (released) return;
      released = true;
      release();
    },
  };
}

function decodePayload(value: unknown): ConcurrencyPayload {
  const record =
    value && typeof value === 'object' ? (value as Record<string, unknown>) : undefined;
  if (
    !record ||
    record.version !== '1.0.0' ||
    typeof record.tenantId !== 'string' ||
    typeof record.userId !== 'string' ||
    typeof record.sessionId !== 'string' ||
    typeof record.runId !== 'string' ||
    !Number.isInteger(record.sessionSequence) ||
    !Number.isInteger(record.runSequence)
  ) {
    throw new Error('Invalid concurrency acceptance payload');
  }
  return record as unknown as ConcurrencyPayload;
}

function append(map: Map<string, number[]>, key: string, value: number): void {
  const values = map.get(key) ?? [];
  values.push(value);
  map.set(key, values);
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
