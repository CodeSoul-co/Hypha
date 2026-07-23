import { describe, expect, it } from 'vitest';
import { createFrameworkEvent, type FrameworkEventType } from '../../events';
import type { RuntimePrincipal } from '../../contracts/runtime';
import {
  assertRuntimeHumanTaskDecision,
  assertRuntimeHumanTaskResume,
  projectRuntimeHumanTasks,
  runtimeHumanTaskResolutionEventId,
} from './runtime-human-task';

const reviewer: RuntimePrincipal = {
  principalId: 'reviewer-1',
  type: 'user',
  userId: 'reviewer-1',
  permissionScopes: ['runtime.human-task.decide'],
};

function event(type: FrameworkEventType, payload: Record<string, unknown>, index: number) {
  return createFrameworkEvent({
    id: `event-${index}`,
    type,
    runId: 'run-1',
    sessionId: 'session-1',
    userId: 'user-1',
    fsmState: 'AwaitApproval',
    timestamp: `2026-07-23T10:0${index}:00.000Z`,
    payload,
    metadata: { stateAttempt: 2 },
  });
}

describe('Generic Runtime HumanTask', () => {
  const requested = {
    taskId: 'human-task-1',
    runId: 'run-1',
    stateId: 'AwaitApproval',
    stateAttempt: 2,
    kind: 'tool',
    subjectRef: 'tool:filesystem.write@1.0.0',
    subjectHash: `sha256:${'a'.repeat(64)}`,
    status: 'pending',
    requestedBy: 'user-1',
    allowedDecisionScopes: ['runtime.human-task.decide'],
    requestedAt: '2026-07-23T10:00:00.000Z',
    expiresAt: '2026-07-24T10:00:00.000Z',
    revision: 1,
  };

  it.each(['tool', 'skill', 'prompt', 'memory', 'execution', 'mcp', 'policy'] as const)(
    'rebuilds %s tasks and terminal decisions after restart',
    (kind) => {
      const tasks = projectRuntimeHumanTasks([
        event('human.review.requested', { ...requested, kind }, 1),
        event(
          'human.review.approved',
          {
            taskId: requested.taskId,
            expectedRevision: 1,
            decidedBy: reviewer.principalId,
            decidedAt: '2026-07-23T10:02:00.000Z',
          },
          2
        ),
      ]);
      expect(tasks).toEqual([
        expect.objectContaining({
          taskId: requested.taskId,
          kind,
          status: 'approved',
          revision: 2,
        }),
      ]);
    }
  );

  it('validates revision, subject hash, expiry, and decision scope', () => {
    const task = projectRuntimeHumanTasks([event('human.review.requested', requested, 1)])[0];
    expect(
      assertRuntimeHumanTaskDecision(task, {
        expectedRevision: 1,
        expectedSubjectHash: requested.subjectHash,
        principal: reviewer,
        decidedAt: '2026-07-23T10:02:00.000Z',
      })
    ).toBe(task);
    expect(() =>
      assertRuntimeHumanTaskDecision(task, {
        expectedRevision: 2,
        expectedSubjectHash: requested.subjectHash,
        principal: reviewer,
        decidedAt: '2026-07-23T10:02:00.000Z',
      })
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_REVISION_CONFLICT' }));
    expect(() =>
      assertRuntimeHumanTaskDecision(task, {
        expectedRevision: 1,
        expectedSubjectHash: `sha256:${'b'.repeat(64)}`,
        principal: reviewer,
        decidedAt: '2026-07-23T10:02:00.000Z',
      })
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_SUBJECT_MISMATCH' }));
    expect(() =>
      assertRuntimeHumanTaskDecision(task, {
        expectedRevision: 1,
        expectedSubjectHash: requested.subjectHash,
        principal: { ...reviewer, permissionScopes: ['runtime.run.read'] },
        decidedAt: '2026-07-23T10:02:00.000Z',
      })
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_SCOPE_DENIED' }));
    expect(() =>
      assertRuntimeHumanTaskDecision(task, {
        expectedRevision: 1,
        expectedSubjectHash: requested.subjectHash,
        principal: reviewer,
        decidedAt: requested.expiresAt,
      })
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_EXPIRED' }));
  });

  it('uses one resolution identity for competing decisions at a revision', () => {
    const first = runtimeHumanTaskResolutionEventId({
      runId: requested.runId,
      taskId: requested.taskId,
      expectedRevision: 1,
    });
    expect(
      runtimeHumanTaskResolutionEventId({
        runId: requested.runId,
        taskId: requested.taskId,
        expectedRevision: 1,
      })
    ).toBe(first);
    expect(
      runtimeHumanTaskResolutionEventId({
        runId: requested.runId,
        taskId: requested.taskId,
        expectedRevision: 2,
      })
    ).not.toBe(first);
  });

  it('revalidates durable resume evidence after restart', () => {
    const approved = projectRuntimeHumanTasks([
      event(
        'human.review.requested',
        {
          ...requested,
          checkpointRef: 'checkpoint:run-1:2',
          policyRef: 'policy:agent-1@4',
          providerRevision: 'provider:7',
        },
        1
      ),
      event(
        'human.review.approved',
        {
          taskId: requested.taskId,
          expectedRevision: 1,
          decidedBy: reviewer.principalId,
          decidedAt: '2026-07-23T10:02:00.000Z',
        },
        2
      ),
    ])[0];
    const evidence = {
      taskId: requested.taskId,
      kind: 'tool' as const,
      subjectRef: requested.subjectRef,
      subjectHash: requested.subjectHash,
      revision: 2,
      requestedBy: requested.requestedBy,
      resumedAt: '2026-07-23T10:03:00.000Z',
      checkpointRef: 'checkpoint:run-1:2',
      policyRef: 'policy:agent-1@4',
      providerRevision: 'provider:7',
    };

    expect(assertRuntimeHumanTaskResume(approved, evidence)).toBe(approved);
    expect(() =>
      assertRuntimeHumanTaskResume(approved, {
        ...evidence,
        providerRevision: 'provider:8',
      })
    ).toThrow(expect.objectContaining({ code: 'HUMAN_TASK_RESUME_REVALIDATION_FAILED' }));
  });
});
