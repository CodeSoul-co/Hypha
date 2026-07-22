import type { FrameworkEvent, FrameworkEventType } from '@hypha/core';
import { projectSkillHumanReviewTasks } from './EventRuntime';

function reviewEvent(
  type: FrameworkEventType,
  payload: Record<string, unknown>,
  index: number
): FrameworkEvent {
  return {
    id: `review-event-${index}`,
    type,
    runId: 'run-1',
    sessionId: 'session-1',
    userId: 'owner-1',
    timestamp: `2026-07-22T00:00:0${index}.000Z`,
    payload: { taskKind: 'skill_activation', ...payload },
  };
}

describe('durable Skill human-review projection', () => {
  const requested = {
    taskId: 'skill-review:run-1:skill-a:hash-a',
    runId: 'run-1',
    skillId: 'skill-a',
    skillVersion: '1.0.0',
    skillRevision: '1.0.0:hash-a',
    contentHash: 'a'.repeat(64),
    userId: 'owner-1',
    agentId: 'agent-1',
    domainId: 'domain-1',
    requestedAt: '2026-07-22T00:00:00.000Z',
    expiresAt: '2026-07-23T00:00:00.000Z',
  };

  it('rebuilds an exact approved revision after restart', () => {
    const tasks = projectSkillHumanReviewTasks([
      reviewEvent('human.review.requested', requested, 1),
      reviewEvent(
        'human.review.approved',
        {
          ...requested,
          decision: 'approved',
          decidedBy: 'reviewer-1',
          decidedAt: '2026-07-22T00:00:02.000Z',
        },
        2
      ),
    ]);

    expect(tasks).toEqual([
      expect.objectContaining({
        taskId: requested.taskId,
        skillRevision: requested.skillRevision,
        contentHash: requested.contentHash,
        status: 'approved',
        decidedBy: 'reviewer-1',
      }),
    ]);
  });

  it('keeps changed and expired revisions non-approved', () => {
    const changed = { ...requested, taskId: `${requested.taskId}:changed`, skillRevision: '2.0.0:b' };
    const tasks = projectSkillHumanReviewTasks([
      reviewEvent('human.review.requested', requested, 1),
      reviewEvent('human.review.approved', { ...requested, decision: 'approved' }, 2),
      reviewEvent('human.review.requested', changed, 3),
      reviewEvent('human.review.expired', { ...changed, decidedAt: '2026-07-24T00:00:00.000Z' }, 4),
    ]);

    expect(tasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ taskId: requested.taskId, status: 'approved' }),
        expect.objectContaining({ taskId: changed.taskId, status: 'expired' }),
      ])
    );
  });
});
