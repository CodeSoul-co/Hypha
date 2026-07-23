import { createFrameworkEvent, type FrameworkEventType } from '@hypha/core';
import { humanTaskResolutionEventId, projectHumanTasks } from './HumanTask';

function event(type: FrameworkEventType, payload: Record<string, unknown>, index: number) {
  return createFrameworkEvent({
    id: `event-${index}`,
    type,
    runId: 'run-1',
    userId: 'user-1',
    fsmState: 'HumanReview',
    timestamp: `2026-07-23T00:00:0${index}.000Z`,
    payload,
    metadata: { stateAttempt: 1 },
  });
}

describe('Generic HumanTask Server projection', () => {
  const requested = {
    taskId: 'review-1',
    taskKind: 'agent_prompt',
    kind: 'prompt',
    runId: 'run-1',
    stateId: 'HumanReview',
    stateAttempt: 1,
    subjectType: 'agent_prompt',
    subjectId: 'prompt-1',
    subjectRevision: '1.0.0:1',
    subjectRef: 'agent_prompt:prompt-1@1.0.0:1',
    subjectHash: `sha256:${'a'.repeat(64)}`,
    principalId: 'user-1',
    requestedBy: 'user-1',
    allowedDecisionScopes: ['runtime.human-task.decide'],
    agentId: 'agent-1',
    requestedAt: '2026-07-23T00:00:00.000Z',
    expiresAt: '2026-07-24T00:00:00.000Z',
    status: 'pending',
    revision: 1,
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
      expect.objectContaining({
        taskId: requested.taskId,
        kind: 'prompt',
        taskKind: 'agent_prompt',
        status,
        revision: 2,
      }),
    ]);
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
