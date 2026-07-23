import fs from 'fs';
import os from 'os';
import path from 'path';
import { getEventRuntime } from './EventRuntime';

describe('EventRuntime canonical stream integrity', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-event-runtime-integrity-'));
  const canonicalDb = path.join(root, 'canonical.sqlite');
  process.env.HYPHA_RUNTIME_EVENT_DB = path.join(root, 'legacy.sqlite');
  process.env.HYPHA_CANONICAL_RUNTIME_DB = canonicalDb;
  process.env.HYPHA_TOOL_RUNTIME_STORE = path.join(root, 'tools.json');
  process.env.HYPHA_TOOL_CONTRACT_SNAPSHOT_ROOT = path.join(root, 'tool-snapshots');
  process.env.HYPHA_TOOL_ARTIFACT_ROOT = path.join(root, 'tool-artifacts');
  process.env.HYPHA_TOOL_OBSERVATION_ROOT = path.join(root, 'tool-observations');
  process.env.HYPHA_SESSION_COMMAND_ARTIFACT_ROOT = path.join(root, 'session-command-artifacts');
  const runtime = getEventRuntime();

  afterAll(async () => {
    await runtime.close();
  });

  it('rejects startup before workers can use a corrupt canonical Run stream', async () => {
    await runtime.initializeCanonicalRuntime({ filename: canonicalDb });
    await runtime.canonicalRuntime().events.append({
      scope: { userId: 'user.integrity', runId: 'run.corrupt' },
      events: [
        {
          id: 'event.corrupt.state-entered',
          type: 'fsm.state.entered',
          version: '1.0.0',
          userId: 'user.integrity',
          runId: 'run.corrupt',
          fsmState: 'Acting',
          timestamp: '2026-07-23T10:00:00.000Z',
          payload: { stateId: 'Acting' },
          metadata: { stateAttempt: 1 },
        },
      ],
      expectedLastSequence: 0,
      expectedRunRevision: 0,
      idempotencyKey: 'seed-corrupt-canonical-stream',
    });
    await runtime.close();

    const failures: unknown[] = [];
    runtime.setRuntimeFailureReporter((error) => failures.push(error));
    await expect(
      runtime.initializeCanonicalRuntime({ filename: canonicalDb })
    ).rejects.toMatchObject({
      code: 'RUNTIME_REPLAY_DIVERGENCE',
    });

    expect(runtime.isCanonicalRuntimeInitialized()).toBe(false);
    expect(runtime.runtimeReadinessStatus().backbone).toBe(false);
    expect(runtime.getCanonicalStreamIntegrityReport()).toMatchObject({
      scannedStreams: 1,
      validatedStreams: 0,
      quarantinedStreams: 1,
      entries: [
        {
          userId: 'user.integrity',
          runId: 'run.corrupt',
          eventId: 'event.corrupt.state-entered',
          eventType: 'fsm.state.entered',
        },
      ],
    });
    expect(failures).toHaveLength(1);
  });
});
