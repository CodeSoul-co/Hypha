import fs from 'fs';
import os from 'os';
import path from 'path';
import { getEventRuntime } from './EventRuntime';

describe('EventRuntime Generic HumanTask restart', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-human-task-restart-'));
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

  it('rebuilds a non-Tool task and applies its queued resume after two restarts', async () => {
    const userId = 'user.human-task-restart';
    const sessionId = 'session.human-task-restart';
    const taskId = 'human-task.memory.write';
    const subjectHash = `sha256:${'a'.repeat(64)}`;
    const run = await runtime.startRun({
      userId,
      sessionId,
      input: { task: 'approve a durable memory operation' },
    });
    await runtime.waitForHumanReview(run.runId, {
      waitId: `wait:${taskId}`,
      pendingActionRef: 'memory:profile.write@1',
      reason: 'Memory write requires operator approval',
      tasks: [
        {
          taskId,
          kind: 'memory',
          subjectRef: 'memory:profile.write@1',
          subjectHash,
          requestedBy: userId,
          allowedDecisionScopes: ['runtime.human-task.decide'],
          requestedAt: '2026-07-23T08:00:00.000Z',
          expiresAt: '2099-07-24T08:00:00.000Z',
          checkpointRef: `run:${run.runId}:state:RunInitialized:attempt:1`,
          policyRef: 'policy:memory-write@1',
          providerRevision: 'memory-provider@7',
        },
      ],
    });
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({
      status: 'waiting_human',
    });

    await runtime.close();
    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });

    const [recovered] = await runtime.listHumanReviews(run.runId, userId);
    expect(recovered).toMatchObject({
      taskId,
      kind: 'memory',
      status: 'pending',
      revision: 1,
      subjectHash,
    });
    await expect(
      runtime.decideHumanReview({
        runId: run.runId,
        taskId,
        expectedRevision: 1,
        expectedSubjectHash: subjectHash,
        decision: 'approved',
        decidedBy: userId,
        permissionScopes: ['runtime.human-task.decide'],
      })
    ).resolves.toMatchObject({
      taskId,
      kind: 'memory',
      status: 'approved',
      revision: 2,
    });
    const scope = { userId, sessionId };
    await expect(runtime.listSessionCommands(scope)).resolves.toEqual([
      expect.objectContaining({
        commandType: 'resume',
        targetRunId: run.runId,
        status: 'queued',
      }),
    ]);

    await runtime.close();
    await runtime.initializeCanonicalRuntime({
      filename: process.env.HYPHA_CANONICAL_RUNTIME_DB,
    });
    await runtime.startSessionCommandScheduler();
    await runtime.drainSessionCommands(scope);

    await expect(runtime.listSessionCommands(scope)).resolves.toEqual([
      expect.objectContaining({
        commandType: 'resume',
        targetRunId: run.runId,
        status: 'applied',
        attempts: 1,
      }),
    ]);
    await expect(runtime.projectRun(run.runId)).resolves.toMatchObject({
      status: 'running',
    });
    const events = await runtime.listEvents(run.runId);
    expect(events.filter((event) => event.type === 'human.review.requested')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'human.review.approved')).toHaveLength(1);
    expect(events.filter((event) => event.type === 'human.review.resume.revalidated')).toHaveLength(
      1
    );
    expect(events.filter((event) => event.type === 'run.resumed')).toHaveLength(1);
  });
});
