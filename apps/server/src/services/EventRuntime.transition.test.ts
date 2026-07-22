import fs from 'fs';
import os from 'os';
import path from 'path';
import { getEventRuntime } from './EventRuntime';

describe('EventRuntime canonical transitions', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-runtime-transition-'));
  process.env.HYPHA_RUNTIME_EVENT_DB = path.join(root, 'legacy.sqlite');
  process.env.HYPHA_CANONICAL_RUNTIME_DB = path.join(root, 'canonical.sqlite');
  process.env.HYPHA_TOOL_RUNTIME_STORE = path.join(root, 'tools.json');
  process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT = path.join(root, 'tool-snapshots');
  process.env.HYPHA_TOOL_ARTIFACT_ROOT = path.join(root, 'tool-artifacts');
  process.env.HYPHA_TOOL_OBSERVATION_ROOT = path.join(root, 'tool-observations');
  process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT = path.join(root, 'session-command-artifacts');
  const runtime = getEventRuntime();

  beforeAll(async () => {
    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });
  });

  afterAll(async () => {
    await runtime.close();
  });

  it('executes State transitions through the fenced driver and completes once', async () => {
    const run = await runtime.startRun({
      userId: 'user.transition',
      sessionId: 'session.complete',
      input: { task: 'complete' },
    });
    for (const state of [
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
      'Acting',
      'ObservationRecorded',
      'Verifying',
      'MemorySync',
    ]) {
      await runtime.transition(run.runId, state);
    }
    await runtime.completeRun(run.runId, { answer: 42 });

    const events = await runtime.listEvents(run.runId);
    const completed = events.filter((event) => event.type === 'run.completed');
    expect(completed).toHaveLength(1);
    expect(completed[0]?.payload).toMatchObject({
      terminalState: 'Completed',
      output: { answer: 42 },
    });
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({
      status: 'completed',
    });
    expect(events.filter((event) => event.type === 'fsm.transition.accepted')).toHaveLength(9);
  });

  it('normalizes a failed State result and emits one failed terminal fact', async () => {
    const run = await runtime.startRun({
      userId: 'user.transition',
      sessionId: 'session.failed',
      input: { task: 'fail' },
    });
    await runtime.failRun(run.runId, new Error('expected failure'));

    const events = await runtime.listEvents(run.runId);
    const failed = events.filter((event) => event.type === 'run.failed');
    expect(failed).toHaveLength(1);
    expect(failed[0]?.payload).toMatchObject({
      terminalState: 'Failed',
      error: {
        code: 'RUNTIME_INTERNAL_ERROR',
        message: 'expected failure',
        retryable: false,
        stateId: 'RunInitialized',
      },
    });
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'failed' });
  });

  it('recovers a durable start_run command through the Server scheduler exactly once', async () => {
    expect(runtime.isSessionCommandSchedulerRunning()).toBe(false);
    await runtime.startSessionCommandScheduler();
    expect(runtime.isSessionCommandSchedulerRunning()).toBe(true);

    const input = {
      userId: 'user.command',
      sessionId: 'session.command',
      input: { task: 'queued' },
      metadata: { surface: 'test.session-command' },
    };
    const first = await runtime.enqueueStartRun(input, 'request.command.1');
    const reused = await runtime.enqueueStartRun(input, 'request.command.1');
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: first.targetRunId,
      }),
    ]);
    await expect(runtime.projectRun(first.targetRunId!)).resolves.toMatchObject({
      id: first.targetRunId,
      sessionId: expect.any(String),
      status: 'running',
    });
  });

  it('cancels an owned Run through a durable Session command exactly once', async () => {
    if (!runtime.isSessionCommandSchedulerRunning()) await runtime.startSessionCommandScheduler();
    const input = {
      userId: 'user.cancel-command',
      sessionId: 'session.cancel-command',
    };
    const run = await runtime.startRun({ ...input, input: { task: 'cancel-me' } });
    const first = await runtime.enqueueCancelRun(
      { ...input, runId: run.runId, reason: 'No longer required' },
      'request.cancel.1'
    );
    const reused = await runtime.enqueueCancelRun(
      { ...input, runId: run.runId, reason: 'No longer required' },
      'request.cancel.1'
    );
    expect(reused).toMatchObject({ id: first.id, status: 'reused' });

    const scope = { userId: input.userId, sessionId: input.sessionId };
    await runtime.drainSessionCommands(scope);
    const commands = await runtime.listSessionCommands(scope);
    expect(commands).toEqual([
      expect.objectContaining({
        id: first.id,
        status: 'applied',
        attempts: 1,
        resultRunId: run.runId,
      }),
    ]);
    expect(Array.isArray(commands[0]?.resultEventIds)).toBe(true);
    expect(commands[0]?.resultEventIds?.length).toBeGreaterThan(0);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({ status: 'cancelled' });
  });
});
