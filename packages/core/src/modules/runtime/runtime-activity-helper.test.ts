import { describe, expect, it } from 'vitest';
import { createFrameworkEvent } from '../../events';
import type {
  RuntimeActivityDispatchPort,
  RuntimeActivityInvocation,
  RuntimeActivityLifecycleCommitPort,
  RuntimeActivityLifecycleCommitRequest,
} from '../../contracts/runtime-activities';
import { InMemoryRuntimeDeterminismStore, createRuntimeHelperSdk } from './runtime-helper-sdk';
import { DefaultRuntimeActivityHelper } from './runtime-activity-helper';

const execution = {
  scope: {
    tenantId: 'tenant.1',
    userId: 'user.1',
    workspaceId: 'workspace.1',
    sessionId: 'session.1',
    runId: 'run.1',
    agentId: 'agent.1',
  },
  stateId: 'Acting',
  stateAttempt: 2,
  fencingToken: 7,
  correlationId: 'correlation.1',
  causationId: 'event.parent',
} as const;

class RecordingLifecyclePort implements RuntimeActivityLifecycleCommitPort {
  readonly requests: RuntimeActivityLifecycleCommitRequest[] = [];

  async append(request: RuntimeActivityLifecycleCommitRequest) {
    this.requests.push(structuredClone(request));
    return createFrameworkEvent(request.event);
  }
}

function createFixture(
  dispatch?: RuntimeActivityDispatchPort,
  abortSignal = new AbortController().signal,
  lifecycleOverride?: RuntimeActivityLifecycleCommitPort
) {
  let idSequence = 0;
  let clockSequence = 0;
  const helpers = createRuntimeHelperSdk({
    scope: {
      tenantId: 'tenant.1',
      userId: 'user.1',
      runId: 'run.1',
      stateId: 'Acting',
      stateAttempt: 2,
    },
    determinismStore: new InMemoryRuntimeDeterminismStore(),
    nextId: (namespace) => `${namespace}.${++idSequence}`,
    now: () => `2026-07-18T00:00:0${clockSequence++}.000Z`,
  });
  const lifecycle = new RecordingLifecyclePort();
  const invocations: RuntimeActivityInvocation[] = [];
  const activityDispatch: RuntimeActivityDispatchPort =
    dispatch ??
    ({
      async dispatch(invocation) {
        invocations.push(structuredClone(invocation));
        return {
          activityId: invocation.activityId,
          status: 'completed',
          eventIds: ['provider.completed'],
          output: { ok: true },
        };
      },
    } satisfies RuntimeActivityDispatchPort);
  return {
    lifecycle,
    invocations,
    helper: new DefaultRuntimeActivityHelper({
      execution,
      ids: helpers.ids,
      clock: helpers.clock,
      dispatch: activityDispatch,
      lifecycle: lifecycleOverride ?? lifecycle,
      abortSignal,
    }),
  };
}

describe('DefaultRuntimeActivityHelper', () => {
  it('enriches an Activity and commits requested before completed', async () => {
    const fixture = createFixture();

    const observation = await fixture.helper.tool({
      target: 'tool.search',
      input: { query: 'runtime' },
      options: {
        effect: 'idempotent',
        timeoutMs: 5000,
        retry: { maxAttempts: 3, initialDelayMs: 100 },
      },
    });

    expect(observation).toEqual({
      activityId: 'activity.1',
      status: 'completed',
      eventIds: ['provider.completed'],
      output: { ok: true },
    });
    expect(Object.isFrozen(observation)).toBe(true);
    expect(fixture.invocations).toEqual([
      expect.objectContaining({
        activityId: 'activity.1',
        operationId: 'operation.2',
        activityType: 'tool',
        target: 'tool.search',
        stateId: 'Acting',
        stateAttempt: 2,
        fencingToken: 7,
        correlationId: 'correlation.1',
        causationId: 'event.parent',
        idempotencyKey: 'runtime-activity:activity.1',
        effect: 'idempotent',
        timeoutMs: 5000,
      }),
    ]);
    expect(fixture.lifecycle.requests.map((request) => request.event.type)).toEqual([
      'runtime.activity.requested',
      'runtime.activity.completed',
    ]);
    expect(fixture.lifecycle.requests[0]).toMatchObject({
      fencingToken: 7,
      event: {
        runId: 'run.1',
        sessionId: 'session.1',
        fsmState: 'Acting',
        metadata: { activityType: 'tool', stateAttempt: 2, fencingToken: 7 },
      },
    });
  });

  it.each([
    ['memory', 'memory.read', 'idempotent'],
    ['model', 'model.chat', 'idempotent'],
    ['execution', 'execution.python', 'external_effect'],
    ['custom', 'activity.review', 'external_effect'],
  ] as const)(
    'routes %s through the same governed dispatch contract',
    async (method, target, effect) => {
      const fixture = createFixture();
      await fixture.helper[method]({ target, input: {} });
      expect(fixture.invocations[0]).toMatchObject({ activityType: method, target, effect });
    }
  );

  it('fails closed on mismatched observations after recording the request', async () => {
    const fixture = createFixture({
      async dispatch() {
        return { activityId: 'activity.other', status: 'completed', eventIds: [] };
      },
    });

    await expect(fixture.helper.model({ target: 'model.chat', input: {} })).rejects.toMatchObject({
      code: 'RUNTIME_INVALID_INPUT',
    });
    expect(fixture.lifecycle.requests.map((request) => request.event.type)).toEqual([
      'runtime.activity.requested',
    ]);
  });

  it('does not allocate or persist an Activity after cancellation', async () => {
    const controller = new AbortController();
    controller.abort();
    const fixture = createFixture(undefined, controller.signal);

    await expect(
      fixture.helper.custom({ target: 'activity.cancelled', input: {} })
    ).rejects.toMatchObject({ code: 'RUNTIME_CANCELLED' });
    expect(fixture.lifecycle.requests).toHaveLength(0);
    expect(fixture.invocations).toHaveLength(0);
  });

  it('leaves durable requested evidence when dispatch crashes before returning', async () => {
    const fixture = createFixture({
      async dispatch() {
        throw new Error('simulated dispatch crash');
      },
    });

    await expect(
      fixture.helper.execution({ target: 'execution.python', input: { code: 'print(1)' } })
    ).rejects.toThrow('simulated dispatch crash');
    expect(fixture.lifecycle.requests.map((request) => request.event.type)).toEqual([
      'runtime.activity.requested',
    ]);
  });

  it('leaves durable requested evidence when the provider returns before result commit', async () => {
    const lifecycle = new RecordingLifecyclePort();
    const interruptedLifecycle: RuntimeActivityLifecycleCommitPort = {
      append: async (request) => {
        if (request.event.type !== 'runtime.activity.requested') {
          throw new Error('simulated result commit crash');
        }
        return lifecycle.append(request);
      },
    };
    const fixture = createFixture(undefined, new AbortController().signal, interruptedLifecycle);

    await expect(
      fixture.helper.memory({ target: 'memory.write', input: { value: 'durable' } })
    ).rejects.toThrow('simulated result commit crash');
    expect(fixture.invocations).toHaveLength(1);
    expect(lifecycle.requests.map((request) => request.event.type)).toEqual([
      'runtime.activity.requested',
    ]);
  });
});
