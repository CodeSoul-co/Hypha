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
});
