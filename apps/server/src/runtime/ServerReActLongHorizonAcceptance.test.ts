import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  ArtifactSessionCommandPayloadStore,
  DurableEventRuntime,
  InMemoryEventSchemaRegistry,
  ProjectionEngine,
  RuntimeQueryService,
  hashCanonicalJson,
  type ContinueReActCommandPayloadV1,
  type ContinuationReActQuantumDescriptor,
  type EventCreateInput,
  type EventSchemaDefinition,
  type EventStreamHead,
  type RuntimeOrchestrationProjection,
} from '@codesoul-co/core';
import {
  InMemoryExecutionArtifactStore,
  SQLiteDurableEventStore,
  SQLiteProjectionStore,
  SQLiteReActContinuationCheckpointStore,
  SQLiteSessionQueue,
} from '@codesoul-co/adapters-local';
import type {
  ReActContinuationScheduleRequest,
  ReActContinuationScheduler,
  ReActQuantumExecutor,
} from '@codesoul-co/harness';
import {
  ServerIngressReActContinuationScheduler,
  reActContinuationIdempotencyKey,
} from '@codesoul-co/harness';
import { type ReActContinuationCheckpoint, type ReActRunResult } from '@codesoul-co/kernel';
import {
  createServerReActContinuationCommandIngress,
  ServerSessionCommandRuntime,
  type ServerSessionCommandPayloads,
} from './ServerSessionCommandRuntime';
import {
  createServerReActContinuationRuntime,
  type ServerReActContinuationRuntime,
} from './ServerReActContinuationRuntime';

interface AcceptancePayloads extends ServerSessionCommandPayloads {
  continue_react: ContinueReActCommandPayloadV1;
}

interface DurablePaths {
  events: string;
  projections: string;
  queue: string;
  checkpoints: string;
}

interface RuntimeNode {
  commands: ServerSessionCommandRuntime<AcceptancePayloads>;
  queue: SQLiteSessionQueue;
  payloads: ArtifactSessionCommandPayloadStore;
  checkpoints: SQLiteReActContinuationCheckpointStore;
  events: DurableEventRuntime;
  eventStore: SQLiteDurableEventStore;
  projectionStore: SQLiteProjectionStore<RuntimeOrchestrationProjection>;
  query: RuntimeQueryService;
  close(): Promise<void>;
}

const scope = {
  tenantId: 'tenant.long-horizon',
  userId: 'user.long-horizon',
  sessionId: 'session.long-horizon',
  runId: 'run.long-horizon',
};
const stepId = 'react';
const scopeHash = `sha256:${'1'.repeat(64)}`;
const eventSchema = {
  type: 'object',
  additionalProperties: true,
} as const;
const eventDefinitions: readonly EventSchemaDefinition[] = [
  'run.created',
  'run.started',
  'fsm.transition.accepted',
  'fsm.state.entered',
  'run.completed',
].map((eventType) => ({
  eventType,
  version: '1.0.0',
  schema: eventSchema,
  schemaHash: hashCanonicalJson(eventSchema),
}));

describe('Server ReAct long-horizon acceptance', () => {
  it('converges three durable quanta across restart, takeover, and duplicate delivery', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-long-horizon-'));
    const paths: DurablePaths = {
      events: path.join(root, 'events.sqlite'),
      projections: path.join(root, 'projections.sqlite'),
      queue: path.join(root, 'queue.sqlite'),
      checkpoints: path.join(root, 'checkpoints.sqlite'),
    };
    const artifacts = new InMemoryExecutionArtifactStore();
    let now = '2026-07-29T16:00:00.000Z';
    let quantumCount = 0;
    let node: RuntimeNode | undefined;

    try {
      node = await createNode({
        workerId: 'worker.before-restart',
        paths,
        artifacts,
        now: () => now,
        execute: async (activeNode, descriptor) => {
          quantumCount += 1;
          return executeQuantum(activeNode, descriptor.checkpointSequence, quantumCount, now);
        },
      });
      await seedRun(node.events, now);
      const initialCheckpoint = checkpoint(1, now);
      await node.checkpoints.put(initialCheckpoint, 'seed.checkpoint');
      const initialPayload = payload(initialCheckpoint, now);
      await node.commands.enqueue({
        id: 'command.quantum.1',
        commandType: 'continue_react',
        idempotencyKey: 'command.quantum.1',
        tenantId: scope.tenantId,
        userId: scope.userId,
        sessionId: scope.sessionId,
        targetRunId: scope.runId,
        payload: initialPayload,
        createdAt: now,
        availableAt: now,
      });

      await expect(node.commands.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: 'command.quantum.1',
      });
      const beforeRestart = await node.events.getStreamHead(streamScope());
      expect(beforeRestart).toMatchObject({ lastSequence: 3, runRevision: 2 });
      await expect(node.query.getRun({ scope })).resolves.toMatchObject({
        projection: { runStatus: 'running', currentState: 'Quantum1' },
        projectionLastSequence: 3,
        eventHeadSequence: 3,
        projectionLag: 0,
      });
      const secondCommand = await queuedCommand(node.queue);
      const secondPayload = await commandPayload(node.payloads, secondCommand);
      expect(secondPayload.checkpointSequence).toBe(beforeRestart!.runRevision);
      await expect(node.checkpoints.get(scope.runId, stepId, scopeHash)).resolves.toMatchObject({
        stepSequence: beforeRestart!.runRevision,
      });

      await node.close();
      node = undefined;
      now = '2026-07-29T16:00:01.000Z';
      node = await createNode({
        workerId: 'worker.after-restart',
        paths,
        artifacts,
        now: () => now,
        execute: async (activeNode, descriptor) => {
          quantumCount += 1;
          return executeQuantum(activeNode, descriptor.checkpointSequence, quantumCount, now);
        },
      });
      await expect(node.events.getStreamHead(streamScope())).resolves.toEqual(beforeRestart);
      await expect(node.checkpoints.get(scope.runId, stepId, scopeHash)).resolves.toMatchObject({
        stepSequence: beforeRestart!.runRevision,
      });

      const staleClaim = await node.queue.claim({
        workerId: 'worker.crashed',
        now,
        leaseMs: 100,
      });
      expect(staleClaim).toMatchObject({
        id: secondCommand.id,
        claimedBy: 'worker.crashed',
        leaseEpoch: 1,
      });
      now = '2026-07-29T16:00:02.000Z';
      await expect(node.commands.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: secondCommand.id,
      });
      await expect(
        node.queue.complete({
          commandId: staleClaim!.id,
          workerId: 'worker.crashed',
          claimToken: staleClaim!.claimToken!,
          leaseEpoch: staleClaim!.leaseEpoch,
          completedAt: now,
        })
      ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });

      const afterTakeover = await node.events.getStreamHead(streamScope());
      expect(afterTakeover).toMatchObject({ lastSequence: 5, runRevision: 3 });
      const thirdCommand = await queuedCommand(node.queue);
      const thirdPayload = await commandPayload(node.payloads, thirdCommand);
      expect(thirdPayload.checkpointSequence).toBe(afterTakeover!.runRevision);
      const duplicateBeforeDelivery = await enqueueDuplicate(
        node.commands,
        thirdCommand,
        thirdPayload
      );
      expect(duplicateBeforeDelivery.status).toBe('reused');

      now = '2026-07-29T16:00:03.000Z';
      await expect(node.commands.processNext()).resolves.toMatchObject({
        disposition: 'applied',
        commandId: thirdCommand.id,
      });
      expect((await enqueueDuplicate(node.commands, thirdCommand, thirdPayload)).status).toBe(
        'reused'
      );
      await expect(node.commands.processNext()).resolves.toMatchObject({
        disposition: 'idle',
      });

      expect(quantumCount).toBe(3);
      const finalHead = await node.events.getStreamHead(streamScope());
      expect(finalHead).toMatchObject({ lastSequence: 8, runRevision: 4 });
      await expect(node.query.getRun({ scope })).resolves.toMatchObject({
        projection: {
          runStatus: 'completed',
          currentState: 'Quantum3',
          statePath: ['Quantum1', 'Quantum2', 'Quantum3'],
        },
        projectionLastSequence: 8,
        eventHeadSequence: 8,
        projectionLag: 0,
      });
      await expect(node.checkpoints.get(scope.runId, stepId, scopeHash)).resolves.toBeNull();
      await expect(
        node.queue.list({
          scope: {
            tenantId: scope.tenantId,
            userId: scope.userId,
            sessionId: scope.sessionId,
          },
        })
      ).resolves.toEqual([
        expect.objectContaining({ id: 'command.quantum.1', status: 'applied' }),
        expect.objectContaining({
          id: secondCommand.id,
          status: 'applied',
          leaseEpoch: 2,
        }),
        expect.objectContaining({ id: thirdCommand.id, status: 'applied' }),
      ]);
    } finally {
      await node?.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });

  it('sustains repeated restarts, lease takeovers, and duplicate delivery for 24 quanta', async () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-long-horizon-stress-'));
    const paths: DurablePaths = {
      events: path.join(root, 'events.sqlite'),
      projections: path.join(root, 'projections.sqlite'),
      queue: path.join(root, 'queue.sqlite'),
      checkpoints: path.join(root, 'checkpoints.sqlite'),
    };
    const artifacts = new InMemoryExecutionArtifactStore();
    const terminalQuantum = 24;
    const restartAfter = new Set([6, 12, 18]);
    const takeoverAt = new Set([5, 11, 17, 23]);
    let now = '2026-07-29T17:00:00.000Z';
    let quantumCount = 0;
    let workerGeneration = 0;
    let node: RuntimeNode | undefined;

    const openNode = async (): Promise<RuntimeNode> => {
      workerGeneration += 1;
      return createNode({
        workerId: `worker.stress.${workerGeneration}`,
        paths,
        artifacts,
        now: () => now,
        execute: async (activeNode, descriptor) => {
          quantumCount += 1;
          return executeQuantum(
            activeNode,
            descriptor.checkpointSequence,
            quantumCount,
            now,
            terminalQuantum
          );
        },
      });
    };

    try {
      node = await openNode();
      await seedRun(node.events, now);
      const initialCheckpoint = checkpoint(1, now);
      await node.checkpoints.put(initialCheckpoint, 'stress.seed.checkpoint');
      const initialPayload = payload(initialCheckpoint, now);
      await node.commands.enqueue({
        id: 'command.stress.quantum.1',
        commandType: 'continue_react',
        idempotencyKey: reActContinuationIdempotencyKey(initialPayload),
        tenantId: scope.tenantId,
        userId: scope.userId,
        sessionId: scope.sessionId,
        targetRunId: scope.runId,
        payload: initialPayload,
        createdAt: now,
        availableAt: now,
      });

      for (let quantum = 1; quantum <= terminalQuantum; quantum += 1) {
        const command = await queuedCommand(node.queue);
        const commandValue = await commandPayload(node.payloads, command);
        const beforeQuantum = await requiredHead(node.events);
        expect(beforeQuantum.runRevision).toBe(quantum);
        expect(commandValue.checkpointSequence).toBe(beforeQuantum.runRevision);
        expect((await enqueueDuplicate(node.commands, command, commandValue)).status).toBe(
          'reused'
        );

        if (takeoverAt.has(quantum)) {
          const staleWorkerId = `worker.stale.${quantum}`;
          const staleClaim = await node.queue.claim({
            workerId: staleWorkerId,
            now,
            leaseMs: 100,
          });
          expect(staleClaim).toMatchObject({
            id: command.id,
            claimedBy: staleWorkerId,
            leaseEpoch: 1,
          });
          now = advanceClock(now);
          await expect(node.commands.processNext()).resolves.toMatchObject({
            disposition: 'applied',
            commandId: command.id,
          });
          await expect(
            node.queue.complete({
              commandId: staleClaim!.id,
              workerId: staleWorkerId,
              claimToken: staleClaim!.claimToken!,
              leaseEpoch: staleClaim!.leaseEpoch,
              completedAt: now,
            })
          ).rejects.toMatchObject({ code: 'RUNTIME_SESSION_QUEUE_CONFLICT' });
        } else {
          await expect(node.commands.processNext()).resolves.toMatchObject({
            disposition: 'applied',
            commandId: command.id,
          });
        }

        expect((await enqueueDuplicate(node.commands, command, commandValue)).status).toBe(
          'reused'
        );
        const terminal = quantum === terminalQuantum;
        const afterQuantum = await requiredHead(node.events);
        expect(afterQuantum).toMatchObject({
          lastSequence: terminal ? quantum * 2 + 2 : quantum * 2 + 1,
          runRevision: quantum + 1,
        });
        await expect(node.query.getRun({ scope })).resolves.toMatchObject({
          projection: {
            runStatus: terminal ? 'completed' : 'running',
            currentState: `Quantum${quantum}`,
          },
          projectionLastSequence: afterQuantum.lastSequence,
          eventHeadSequence: afterQuantum.lastSequence,
          projectionLag: 0,
        });
        if (terminal) {
          await expect(node.checkpoints.get(scope.runId, stepId, scopeHash)).resolves.toBeNull();
        } else {
          await expect(node.checkpoints.get(scope.runId, stepId, scopeHash)).resolves.toMatchObject(
            {
              stepSequence: afterQuantum.runRevision,
            }
          );
        }

        if (restartAfter.has(quantum)) {
          await node.close();
          node = undefined;
          now = advanceClock(now);
          node = await openNode();
          await expect(node.events.getStreamHead(streamScope())).resolves.toEqual(afterQuantum);
          await expect(node.query.getRun({ scope })).resolves.toMatchObject({
            projectionLastSequence: afterQuantum.lastSequence,
            eventHeadSequence: afterQuantum.lastSequence,
            projectionLag: 0,
          });
        }
        now = advanceClock(now);
      }

      expect(quantumCount).toBe(terminalQuantum);
      await expect(node.commands.processNext()).resolves.toMatchObject({
        disposition: 'idle',
      });
      const commands = await node.queue.list({
        scope: {
          tenantId: scope.tenantId,
          userId: scope.userId,
          sessionId: scope.sessionId,
        },
      });
      expect(commands).toHaveLength(terminalQuantum);
      expect(commands.every((command) => command.status === 'applied')).toBe(true);
      expect(new Set(commands.map((command) => command.id)).size).toBe(terminalQuantum);
      expect(commands.filter((command) => command.leaseEpoch === 2)).toHaveLength(takeoverAt.size);
      await expect(node.query.getRun({ scope })).resolves.toMatchObject({
        projection: {
          runStatus: 'completed',
          currentState: `Quantum${terminalQuantum}`,
          statePath: Array.from({ length: terminalQuantum }, (_, index) => `Quantum${index + 1}`),
        },
        projectionLastSequence: 50,
        eventHeadSequence: 50,
        projectionLag: 0,
      });
    } finally {
      await node?.close();
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
});

async function createNode(input: {
  workerId: string;
  paths: DurablePaths;
  artifacts: InMemoryExecutionArtifactStore;
  now: () => string;
  execute(
    node: RuntimeNode,
    descriptor: ContinuationReActQuantumDescriptor
  ): ReturnType<ReActQuantumExecutor['runOneQuantum']>;
}): Promise<RuntimeNode> {
  const schemas = new InMemoryEventSchemaRegistry();
  for (const definition of eventDefinitions) await schemas.register(definition);
  const eventStore = new SQLiteDurableEventStore({
    filename: input.paths.events,
    schemaRegistry: schemas,
    now: input.now,
  });
  const events = new DurableEventRuntime({ store: eventStore, now: input.now });
  const projectionStore = new SQLiteProjectionStore<RuntimeOrchestrationProjection>({
    filename: input.paths.projections,
    now: input.now,
  });
  const query = new RuntimeQueryService({
    events,
    projections: new ProjectionEngine({ events, now: input.now }),
    projectionStore,
    now: input.now,
  });
  const queue = new SQLiteSessionQueue({
    filename: input.paths.queue,
    now: input.now,
  });
  const checkpoints = new SQLiteReActContinuationCheckpointStore({
    filename: input.paths.checkpoints,
  });
  const payloads = new ArtifactSessionCommandPayloadStore({ artifacts: input.artifacts });
  const binding: {
    node?: RuntimeNode;
    delegate?: ReActContinuationScheduler;
  } = {};
  const scheduler: ReActContinuationScheduler = {
    schedule(request: ReActContinuationScheduleRequest) {
      if (!binding.delegate) throw new Error('Continuation scheduler is not attached');
      return binding.delegate.schedule(request);
    },
  };
  const continuation: ServerReActContinuationRuntime = createServerReActContinuationRuntime({
    executor: {
      runOneQuantum: (request) => {
        if (request.descriptor.trigger !== 'continuation') {
          throw new Error('Expected a continuation quantum descriptor');
        }
        if (!binding.node) throw new Error('Runtime node is not attached');
        return input.execute(binding.node, request.descriptor);
      },
    },
    runner: { run: jest.fn() },
    scheduler,
    checkpoints,
    now: input.now,
  });
  const commands = new ServerSessionCommandRuntime<AcceptancePayloads>({
    queue,
    payloads,
    workerId: input.workerId,
    leaseMs: 500,
    renewalIntervalMs: 50,
    definitions: {
      continue_react: continuation.definition,
    },
    now: input.now,
  });
  let closed = false;
  const node: RuntimeNode = {
    commands,
    queue,
    payloads,
    checkpoints,
    events,
    eventStore,
    projectionStore,
    query,
    async close() {
      if (closed) return;
      closed = true;
      await commands.close();
      queue.close();
      checkpoints.close();
      projectionStore.close();
      eventStore.close();
    },
  };
  binding.node = node;
  binding.delegate = new ServerIngressReActContinuationScheduler({
    ingress: createServerReActContinuationCommandIngress(commands),
    now: input.now,
  });
  return node;
}

async function executeQuantum(
  node: RuntimeNode,
  checkpointSequence: number,
  quantum: number,
  now: string,
  terminalQuantum = 3
): Promise<Awaited<ReturnType<ReActQuantumExecutor['runOneQuantum']>>> {
  const current = await node.checkpoints.get(scope.runId, stepId, scopeHash);
  expect(current).toMatchObject({ stepSequence: checkpointSequence });
  const head = await requiredHead(node.events);
  expect(checkpointSequence).toBe(head.runRevision);
  const terminal = quantum === terminalQuantum;
  const appended = await node.events.append({
    scope: streamScope(),
    events: [
      ...(quantum === 1
        ? []
        : [
            event(`event.quantum.${quantum}.transition`, 'fsm.transition.accepted', now, {
              from: `Quantum${quantum - 1}`,
              to: `Quantum${quantum}`,
              checkpointSequence,
            }),
          ]),
      event(`event.quantum.${quantum}`, 'fsm.state.entered', now, {
        stateId: `Quantum${quantum}`,
        checkpointSequence,
      }),
      ...(terminal ? [event('event.run.completed', 'run.completed', now, {})] : []),
    ],
    expectedLastSequence: head.lastSequence,
    expectedRunRevision: head.runRevision,
    idempotencyKey: `quantum.${quantum}`,
  });
  if (terminal) return { disposition: 'terminal' };

  const nextCheckpoint = checkpoint(appended.runRevision, now);
  await node.checkpoints.put(nextCheckpoint, `checkpoint.quantum.${quantum}`);
  const react: ReActRunResult = {
    runId: scope.runId,
    status: 'suspended',
    steps: [],
    checkpoint: nextCheckpoint,
    suspension: {
      reason: 'quantum_exhausted',
      retryable: true,
      requiresHumanReview: false,
      message: 'Continue in the next durable command',
    },
  };
  return { disposition: 'suspended', react };
}

async function seedRun(events: DurableEventRuntime, now: string): Promise<void> {
  await events.append({
    scope: streamScope(),
    events: [
      event('event.run.created', 'run.created', now, {}),
      event('event.run.started', 'run.started', now, {}),
    ],
    expectedLastSequence: 0,
    expectedRunRevision: 0,
    idempotencyKey: 'seed.run',
  });
}

function checkpoint(stepSequence: number, now: string): ReActContinuationCheckpoint {
  return {
    version: '1.0.0',
    runId: scope.runId,
    stepId,
    scopeHash,
    agentRef: { id: 'agent.long-horizon', version: '1.0.0' },
    nextPhase: 'reason',
    messages: [{ role: 'user', content: 'Continue' }],
    iterations: stepSequence,
    modelCalls: stepSequence,
    toolCalls: 0,
    totalTokens: stepSequence * 10,
    toolInvocationSequence: 0,
    stepSequence,
    consecutiveNoProgress: 0,
    createdAt: '2026-07-29T16:00:00.000Z',
    updatedAt: now,
  };
}

function payload(
  value: Readonly<ReActContinuationCheckpoint>,
  createdAt: string
): ContinueReActCommandPayloadV1 {
  return {
    version: '1.0.0',
    runId: scope.runId,
    sessionId: scope.sessionId,
    userId: scope.userId,
    stepId,
    checkpointRef: checkpointRef(value),
    checkpointHash: hashCanonicalJson(value),
    checkpointSequence: value.stepSequence,
    scopeHash,
    agentRef: value.agentRef,
    domainPackRef: { id: 'domain.long-horizon', version: '1.0.0' },
    promptSnapshotRef: 'prompt-snapshot:long-horizon',
    promptSnapshotHash: `sha256:${'2'.repeat(64)}`,
    capabilitySnapshotRef: 'capability-snapshot:long-horizon',
    capabilitySnapshotHash: `sha256:${'3'.repeat(64)}`,
    globalBudget: {
      iterations: 20,
      modelCalls: 20,
      toolCalls: 10,
      totalTokens: 50_000,
    },
    cancellationRevision: 0,
    createdAt,
  };
}

function checkpointRef(value: Readonly<ReActContinuationCheckpoint>): string {
  return `react-checkpoint:${value.runId}:${value.stepId}:${value.stepSequence}`;
}

async function queuedCommand(queue: SQLiteSessionQueue) {
  const commands = await queue.list({
    scope: {
      tenantId: scope.tenantId,
      userId: scope.userId,
      sessionId: scope.sessionId,
    },
    statuses: ['queued'],
  });
  expect(commands).toHaveLength(1);
  return commands[0];
}

async function commandPayload(
  payloads: ArtifactSessionCommandPayloadStore,
  command: Awaited<ReturnType<typeof queuedCommand>>
): Promise<ContinueReActCommandPayloadV1> {
  return (await payloads.get({
    payloadRef: command.payloadRef!,
    payloadHash: command.payloadHash,
  })) as ContinueReActCommandPayloadV1;
}

function enqueueDuplicate(
  runtime: ServerSessionCommandRuntime<AcceptancePayloads>,
  command: Awaited<ReturnType<typeof queuedCommand>>,
  value: ContinueReActCommandPayloadV1
) {
  return runtime.enqueue({
    id: command.id,
    commandType: 'continue_react',
    idempotencyKey: reActContinuationIdempotencyKey(value),
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    targetRunId: scope.runId,
    priority: command.priority,
    maxAttempts: command.maxAttempts,
    payload: value,
    createdAt: command.createdAt,
    availableAt: command.availableAt,
  });
}

async function requiredHead(events: DurableEventRuntime): Promise<EventStreamHead> {
  const head = await events.getStreamHead(streamScope());
  if (!head) throw new Error('Expected Runtime Event stream head');
  return head;
}

function streamScope() {
  return {
    tenantId: scope.tenantId,
    userId: scope.userId,
    runId: scope.runId,
  };
}

function advanceClock(timestamp: string): string {
  return new Date(Date.parse(timestamp) + 1_000).toISOString();
}

function event(
  id: string,
  type: EventCreateInput['type'],
  timestamp: string,
  eventPayload: Record<string, unknown>
): EventCreateInput {
  return {
    id,
    type,
    version: '1.0.0',
    tenantId: scope.tenantId,
    userId: scope.userId,
    sessionId: scope.sessionId,
    runId: scope.runId,
    timestamp,
    payload: eventPayload,
  };
}
