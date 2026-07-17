import { describe, expect, it, vi } from 'vitest';
import type { RuntimeActivityRequest } from '../../contracts/runtime';
import {
  HumanRuntimeActivityPort,
  type HumanRuntimeActivityInput,
  type RuntimeHumanReviewProvider,
  type RuntimeHumanReviewState,
} from './human-activity-port';

const request: RuntimeActivityRequest<HumanRuntimeActivityInput> = {
  activityId: 'activity.human.publish-approval',
  activityType: 'human',
  runId: 'run.example',
  sessionId: 'session.example',
  stateAttemptId: 'state-attempt.publish.1',
  operationId: 'operation.human.publish-approval',
  idempotencyKey: 'idempotency.human.publish-approval',
  fencingToken: 3,
  correlationId: 'correlation.example',
  causationId: 'event.state.entered',
  input: {
    summary: 'Approve publication',
    details: { artifactRef: 'artifact.draft' },
    expiresAt: '2026-07-18T09:00:00.000Z',
  },
};

describe('HumanRuntimeActivityPort', () => {
  it('creates a durable human wait with Runtime-owned identity', async () => {
    const requestReview = vi.fn(async () => reviewState('pending'));
    const port = new HumanRuntimeActivityPort(provider({ request: requestReview }));

    await expect(port.execute(request)).resolves.toMatchObject({
      activityId: request.activityId,
      status: 'waiting',
      output: { status: 'pending' },
    });
    expect(requestReview).toHaveBeenCalledWith(
      expect.objectContaining({
        reviewId: request.activityId,
        runId: request.runId,
        sessionId: request.sessionId,
        stateAttemptId: request.stateAttemptId,
        operationId: request.operationId,
        idempotencyKey: request.idempotencyKey,
        summary: request.input.summary,
      })
    );
  });

  it.each([
    ['approved', 'completed'],
    ['rejected', 'failed'],
    ['expired', 'failed'],
    ['cancelled', 'cancelled'],
  ] as const)('maps reconciled %s review to %s Activity status', async (reviewStatus, status) => {
    const port = new HumanRuntimeActivityPort(
      provider({ get: vi.fn(async () => reviewState(reviewStatus)) })
    );

    await expect(port.reconcile(request.activityId)).resolves.toMatchObject({ status });
  });

  it('returns unknown for a missing review and delegates cancellation', async () => {
    const cancel = vi.fn(async () => undefined);
    const port = new HumanRuntimeActivityPort(provider({ get: vi.fn(async () => null), cancel }));

    await expect(port.reconcile(request.activityId)).resolves.toEqual({
      activityId: request.activityId,
      status: 'unknown',
      eventIds: [],
    });
    await port.cancel(request.activityId, 'run_cancelled');
    expect(cancel).toHaveBeenCalledWith(request.activityId, 'run_cancelled');
  });
});

function reviewState(
  status: RuntimeHumanReviewState['status']
): RuntimeHumanReviewState<{ approved: boolean }> {
  return {
    reviewId: request.activityId,
    status,
    decision: status === 'approved' ? { approved: true } : undefined,
    reason: status === 'rejected' ? 'Reviewer rejected publication.' : undefined,
    eventIds: [`event.human.${status}`],
  };
}

function provider(
  overrides: Partial<RuntimeHumanReviewProvider<{ approved: boolean }>> = {}
): RuntimeHumanReviewProvider<{ approved: boolean }> {
  return {
    request: vi.fn(async () => reviewState('pending')),
    cancel: vi.fn(async () => undefined),
    get: vi.fn(async () => reviewState('pending')),
    ...overrides,
  };
}
