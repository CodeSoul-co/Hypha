import { createFrameworkEvent, type FrameworkEventType } from '@hypha/core';
import {
  assertHumanTaskCAS,
  humanTaskResolutionEventId,
  projectHumanTasks,
} from './HumanTask';

function event(type: FrameworkEventType, payload: Record<string, unknown>, index: number) {
  return createFrameworkEvent({
    id: `event-${index}`,
    type,
    runId: 'run-1',
    timestamp: `2026-07-23T00:00:0${index}.000Z`,
    payload,
  });
}

describe('Generic HumanTask projection', () => {
  const requested = {
    taskId: 'review-1',
    taskKind: 'agent_prompt',
    runId: 'run-1',
    subjectType: 'agent_prompt',
    subjectId: 'prompt-1',
    subjectRevision: '1.0.0:1',
    subjectHash: 'a'.repeat(64),
    principalId: 'user-1',
    agentId: 'agent-1',
    requestedAt: '2026-07-23T00:00:00.000Z',
    expiresAt: '2026-07-24T00:00:00.000Z',
  };

  it.each([
    ['human.review.approved', 'approved'],
    ['human.review.rejected', 'rejected'],
    ['human.review.expired', 'expired'],
    ['human.review.cancelled', 'cancelled'],
  ] as const)('rebuilds %s across a restart', (type, status) => {
    const tasks = projectHumanTasks([
      event('human.review.requested', requested, 1),
      event(type, { taskId: requested.taskId, expectedRevision: 1 }, 2),
    ]);
    expect(tasks).toEqual([
      expect.objectContaining({ taskId: requested.taskId, status, revision: 2 }),
    ]);
  });

  it('enforces compare-and-set revision and pending state', () => {
    const requestedTask = projectHumanTasks([
      event('human.review.requested', requested, 1),
    ])[0];
    expect(() =>
      assertHumanTaskCAS(requestedTask, 2, '2026-07-23T01:00:00.000Z')
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_REVISION_CONFLICT' }));
    expect(assertHumanTaskCAS(requestedTask, 1, '2026-07-23T01:00:00.000Z')).toBe(
      requestedTask
    );
  });

  it('uses one durable terminal event identity per task revision', () => {
    const first = humanTaskResolutionEventId({
      runId: requested.runId,
      taskId: requested.taskId,
      expectedRevision: 1,
    });
    expect(
      humanTaskResolutionEventId({
        runId: requested.runId,
        taskId: requested.taskId,
        expectedRevision: 1,
      })
    ).toBe(first);
    expect(
      humanTaskResolutionEventId({
        runId: requested.runId,
        taskId: requested.taskId,
        expectedRevision: 2,
      })
    ).not.toBe(first);
  });
});
