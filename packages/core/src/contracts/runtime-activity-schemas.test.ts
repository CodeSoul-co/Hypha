import { describe, expect, it } from 'vitest';
import {
  runtimeActivityContractJsonSchemas,
  validateRuntimeActivityInvocation,
  validateRuntimeActivityObservation,
  validateRuntimeActivityRequest,
} from './runtime-activity-schemas';

describe('runtime Activity schemas', () => {
  it('validates governed requests and exports their JSON schema', () => {
    expect(
      validateRuntimeActivityRequest({
        target: 'tool.search',
        input: { query: 'event sourcing' },
        options: {
          effect: 'idempotent',
          timeoutMs: 5000,
          retry: { maxAttempts: 3, initialDelayMs: 100, maxDelayMs: 1000 },
        },
      })
    ).toMatchObject({ target: 'tool.search' });
    expect(runtimeActivityContractJsonSchemas.RuntimeActivityRequest).toMatchObject({
      type: 'object',
      required: ['target', 'input'],
    });
  });

  it('rejects invalid retry ranges and malformed invocations', () => {
    expect(() =>
      validateRuntimeActivityRequest({
        target: 'tool.search',
        input: {},
        options: { retry: { maxAttempts: 2, initialDelayMs: 1000, maxDelayMs: 100 } },
      })
    ).toThrow(/maxDelayMs/u);
    expect(() =>
      validateRuntimeActivityInvocation({
        activityId: 'activity.1',
        operationId: 'operation.1',
        activityType: 'tool',
        target: 'tool.search',
        input: {},
        scope: { userId: 'user.1', sessionId: 'session.1', runId: 'run.1' },
        stateId: 'Acting',
        stateAttempt: 0,
        fencingToken: 1,
        correlationId: 'correlation.1',
        idempotencyKey: 'activity.1',
        requestedAt: '2026-07-18T00:00:00.000Z',
        effect: 'idempotent',
      })
    ).toThrow();
  });

  it('requires normalized errors only for failed observations', () => {
    expect(() =>
      validateRuntimeActivityObservation({
        activityId: 'activity.1',
        status: 'failed',
        eventIds: [],
      })
    ).toThrow(/require an error/u);
    expect(() =>
      validateRuntimeActivityObservation({
        activityId: 'activity.1',
        status: 'completed',
        eventIds: [],
        error: { code: 'RUNTIME_INTERNAL_ERROR', message: 'late error', retryable: false },
      })
    ).toThrow(/Only failed/u);
  });
});
