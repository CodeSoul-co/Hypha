import { describe, expect, it } from 'vitest';
import type { FrameworkEvent } from '../../events';
import type {
  RuntimeEventCommitPort,
  RuntimeEventCommitRequest,
  RuntimeHelperExecutionScope,
} from '../../contracts/runtime-helpers';
import type { JsonSchema } from '../../specs';
import { hashCanonicalJson } from './canonical-json';
import { InMemoryEventSchemaRegistry } from './event-schema-registry';
import { InMemoryDurableEventStore } from './event-store';
import { InMemoryRuntimeResourceCoordinator } from './resource-coordinator';
import { InMemoryRunLeaseStore, runLeaseGuard } from './run-lease-store';
import { createRuntimeHelperSdk, InMemoryRuntimeDeterminismStore } from './runtime-helper-sdk';
import {
  createRuntimeIoHelperSdk,
  DefaultRuntimeEventHelper,
  DefaultRuntimeResourceHelper,
  DurableRuntimeEventCommitPort,
} from './runtime-io-helpers';

const execution: RuntimeHelperExecutionScope = {
  scope: {
    tenantId: 'tenant.example',
    userId: 'user.example',
    workspaceId: 'workspace.example',
    sessionId: 'session.example',
    runId: 'run.example',
    agentId: 'agent.example',
  },
  stateId: 'state.plan',
  stateAttempt: 1,
  fencingToken: 1,
  correlationId: 'correlation.example',
  causationId: 'event.state.entered',
};

class RecordingEventPort implements RuntimeEventCommitPort {
  readonly requests: RuntimeEventCommitRequest[] = [];
  readonly events: FrameworkEvent[] = [];

  async append(request: RuntimeEventCommitRequest): Promise<FrameworkEvent[]> {
    this.requests.push(structuredClone(request));
    const committed = request.events.map((event, index) => ({
      ...event,
      timestamp: event.timestamp ?? '2026-07-18T08:00:00.000Z',
      sequence: this.events.length + index + 1,
    })) as FrameworkEvent[];
    this.events.push(...committed);
    return structuredClone(committed);
  }

  async readSince(_scope: RuntimeHelperExecutionScope['scope'], sequence: number) {
    return structuredClone(this.events.filter((event) => (event.sequence ?? 0) >= sequence));
  }
}

function helperSdk(scope = execution) {
  let id = 0;
  return createRuntimeHelperSdk({
    scope: {
      tenantId: scope.scope.tenantId,
      userId: scope.scope.userId,
      runId: scope.scope.runId,
      stateId: scope.stateId,
      stateAttempt: scope.stateAttempt,
    },
    determinismStore: new InMemoryRuntimeDeterminismStore(),
    now: () => '2026-07-18T08:00:01.000Z',
    nextId: (namespace) => `${namespace}.${++id}`,
  });
}

describe('Runtime IO Helpers', () => {
  it('enriches observation events and rejects lifecycle event bypasses', async () => {
    const helpers = helperSdk();
    const port = new RecordingEventPort();
    const events = new DefaultRuntimeEventHelper({
      execution,
      ids: helpers.ids,
      clock: helpers.clock,
      port,
    });

    const event = await events.append(
      'runtime.observation.plan.created',
      { planRef: 'artifact://plan/example' },
      { metadata: { source: 'planner' } }
    );
    expect(event).toMatchObject({
      id: 'event.1',
      type: 'runtime.observation.plan.created',
      tenantId: 'tenant.example',
      userId: 'user.example',
      workspaceId: 'workspace.example',
      sessionId: 'session.example',
      runId: 'run.example',
      stepId: 'state.plan:1',
      fsmState: 'state.plan',
      correlationId: 'correlation.example',
      causationId: 'event.state.entered',
      idempotencyKey: 'runtime-observation:event.1',
      timestamp: '2026-07-18T08:00:01.000Z',
      metadata: { source: 'planner', stateAttempt: 1, fencingToken: 1 },
    });
    expect(port.requests[0].fencingToken).toBe(1);
    await expect(events.append('run.completed' as never, {} as never)).rejects.toThrow();
  });

  it('commits observation batches once and reads by sequence', async () => {
    const helpers = helperSdk();
    const port = new RecordingEventPort();
    const events = new DefaultRuntimeEventHelper({
      execution,
      ids: helpers.ids,
      clock: helpers.clock,
      port,
    });

    const committed = await events.appendBatch([
      { type: 'runtime.observation.a', payload: { value: 1 } },
      { type: 'runtime.observation.b', payload: { value: 2 } },
    ]);
    expect(committed).toHaveLength(2);
    expect(port.requests).toHaveLength(1);
    expect(await events.readSince(2)).toHaveLength(1);
    await expect(events.readSince(0)).rejects.toThrow('positive integer');
  });

  it('uses the durable event store CAS and rejects a stale fencing token', async () => {
    const registry = new InMemoryEventSchemaRegistry();
    const payloadSchema: JsonSchema = {
      type: 'object',
      required: ['value'],
      properties: { value: { type: 'string' } },
      additionalProperties: false,
    };
    await registry.register({
      eventType: 'runtime.observation.note',
      version: '1.0.0',
      schema: payloadSchema,
      schemaHash: hashCanonicalJson(payloadSchema),
    });
    const store = new InMemoryDurableEventStore({
      schemaRegistry: registry,
      now: () => '2026-07-18T08:00:02.000Z',
    });
    const port = new DurableRuntimeEventCommitPort(store);
    const currentExecution = { ...execution, fencingToken: 2 };
    const currentSdk = helperSdk(currentExecution);
    const current = new DefaultRuntimeEventHelper({
      execution: currentExecution,
      ids: currentSdk.ids,
      clock: currentSdk.clock,
      port,
    });
    await current.append('runtime.observation.note', { value: 'current' });

    const staleSdk = createRuntimeHelperSdk({
      scope: {
        tenantId: execution.scope.tenantId,
        userId: execution.scope.userId,
        runId: execution.scope.runId,
        stateId: execution.stateId,
        stateAttempt: execution.stateAttempt,
      },
      determinismStore: new InMemoryRuntimeDeterminismStore(),
      now: () => '2026-07-18T08:00:03.000Z',
      nextId: (namespace) => `${namespace}.stale`,
    });
    const stale = new DefaultRuntimeEventHelper({
      execution,
      ids: staleSdk.ids,
      clock: staleSdk.clock,
      port,
    });
    await expect(
      stale.append('runtime.observation.note', { value: 'stale' })
    ).rejects.toMatchObject({ code: 'RUNTIME_FENCING_REJECTED' });
  });

  it('binds resource lifecycle operations to one run and state', async () => {
    const runLeaseStore = new InMemoryRunLeaseStore();
    const lease = (await runLeaseStore.acquire({
      tenantId: execution.scope.tenantId,
      userId: execution.scope.userId,
      runId: execution.scope.runId,
      partitionKey: 'session:tenant.example:user.example:session.example',
      requestedLeaseId: 'lease.run.1',
      ownerId: 'worker.1',
      ttlMs: 120_000,
      acquiredAt: '2026-07-18T08:00:00.000Z',
      idempotencyKey: 'lease:run:1',
    }))!;
    const coordinator = new InMemoryRuntimeResourceCoordinator({ runLeaseStore });
    const helpers = helperSdk();
    const resources = new DefaultRuntimeResourceHelper({
      runLease: {
        scope: {
          tenantId: execution.scope.tenantId,
          userId: execution.scope.userId,
          runId: execution.scope.runId,
          partitionKey: 'session:tenant.example:user.example:session.example',
        },
        guard: runLeaseGuard(lease),
      },
      coordinator,
      ids: helpers.ids,
      clock: helpers.clock,
      stateId: execution.stateId,
    });

    const claims = await resources.acquire(
      [
        {
          resourceType: 'workspace',
          resourceKey: 'workspace:example',
          mode: 'exclusive',
        },
      ],
      { ttlMs: 30_000 }
    );
    expect(claims[0]).toMatchObject({
      id: 'resource-claim.1',
      runId: 'run.example',
      stateId: 'state.plan',
      ownerId: 'worker.1',
      runFencingToken: 1,
    });
    await expect(resources.assertCurrent(claims[0])).resolves.toEqual(claims[0]);
    const renewed = await resources.renew(claims, { ttlMs: 60_000 });
    expect(renewed[0].expiresAt).toBe('2026-07-18T08:01:01.000Z');
    await resources.release(renewed);
    expect(
      await coordinator.list({
        tenantId: execution.scope.tenantId,
        resourceType: 'workspace',
        resourceKey: 'workspace:example',
        checkedAt: '2026-07-18T08:00:02.000Z',
      })
    ).toEqual([]);
  });

  it('rejects mixed fenced scopes when composing IO helpers', async () => {
    const runLeaseStore = new InMemoryRunLeaseStore();
    const lease = (await runLeaseStore.acquire({
      tenantId: execution.scope.tenantId,
      userId: execution.scope.userId,
      runId: execution.scope.runId,
      partitionKey: 'run:example',
      requestedLeaseId: 'lease.run.1',
      ownerId: 'worker.1',
      ttlMs: 30_000,
      acquiredAt: '2026-07-18T08:00:00.000Z',
      idempotencyKey: 'lease:run:1',
    }))!;
    const helpers = helperSdk();
    const port = new RecordingEventPort();

    expect(() =>
      createRuntimeIoHelperSdk({
        event: {
          execution: { ...execution, fencingToken: 2 },
          ids: helpers.ids,
          clock: helpers.clock,
          port,
        },
        resource: {
          runLease: {
            scope: {
              tenantId: execution.scope.tenantId,
              userId: execution.scope.userId,
              runId: execution.scope.runId,
              partitionKey: 'run:example',
            },
            guard: runLeaseGuard(lease),
          },
          coordinator: new InMemoryRuntimeResourceCoordinator({ runLeaseStore }),
          ids: helpers.ids,
          clock: helpers.clock,
          stateId: execution.stateId,
        },
      })
    ).toThrow('one fenced execution scope');
  });
});
