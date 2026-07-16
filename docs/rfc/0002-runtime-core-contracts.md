# RFC 0002: Runtime Core Contracts

## Motivation

Hypha runtime currently has event-first run projections, FSM execution, and
package-level ReAct/FSM wiring. It does not yet expose stable contracts for
durable activity execution, message transport, command envelopes, or state
attempt lifecycle records.

This RFC introduces the first framework-level contracts needed for a durable
runtime substrate while keeping transport, model, tool, memory, and execution
implementations behind ports.

## Scope

This proposal covers:

- `RuntimeScope` and `RuntimePrincipal`
- `RuntimeActivityRequest`, `RuntimeActivityResult`, and `RuntimeActivityPort`
- `RuntimeStateAttempt`
- `RuntimeCommand`
- `RuntimeCommandQueue`, `InMemoryRuntimeCommandQueue`, and
  `RuntimeCommandProcessor`
- `RuntimeDeliveryStore`, `InMemoryRuntimeDeliveryStore`, inbox/outbox records,
  acknowledgement, redelivery, and dead-letter state
- `RuntimeLeaseCoordinator`, `InMemoryRuntimeLeaseCoordinator`, session lease
  resources, and fencing tokens
- `defaultRuntimeLoopFSMProcessSpec`, `RuntimeLoopProjector`, runtime message
  events, context transform/convert contracts, and render-event projection
- `RuntimeLoopRunner`, the minimal FSM-controlled loop runner that composes
  context transformation, model-message conversion, and state-attempt execution
- `RuntimeStateAttemptExecutor`, state-attempt lifecycle events, activity-port
  execution, and per-attempt lease/fencing
- `RuntimeStateAttemptRecoveryExecutor`, waiting-attempt projection, and
  activity reconciliation
- `RuntimeRecoveryScanner`, recovery scan policy, and activity-port resolution
- `ServerRuntimeAdapter` for package-level server projections
- `MessageBusSpec`, `MessageBusMessage`, and `MessageBus`
- `InMemoryMessageBus` for local contract tests and offline development

## Change Classification

来源 Agent：
Runtime Owner workstream.

来源业务需求：
General durable agent runtime requirements derived from the runtime harness
engineering spec and the Pi Agent loop reference design.

现有 Hypha 能力：
Hypha already had event-first run projection, ReAct/FSM harness execution,
basic session queue primitives, and server runtime routes for run/event/replay
projection.

当前缺口：
Hypha did not yet expose stable package-level contracts for durable command
queues, activity ports, state attempts, message delivery, leases, recovery
scanning, FSM-controlled interactive loop projection, or server runtime
projection adapters.

为什么不能仅在业务项目中解决：
These concerns define framework runtime semantics and cross-agent reliability
boundaries. Implementing them in a business project would duplicate core
runtime behavior, bypass the event-first contract, and make replay/recovery
inconsistent across future agents.

是否跨业务可复用：
Yes. The contracts are domain-neutral and apply to learning, legal, coding,
operations, and any future Hypha-based agent that needs durable runs,
recoverable activities, and ordered event projections.

属于 Framework、Domain 抽象还是 App Surface：
Framework runtime capability with a small App Surface adapter. No business
DomainPack, prompt, workflow instance, customer data, or UI implementation is
included.

目标源头分支：
`runtime-r0-core-contracts`.

目标目录或 Package：

- `packages/core`
- `packages/harness`
- `apps/server` only as an API surface adapter
- `docs/rfc`
- `docs/api`

需要新增或修改的 Spec：

- Runtime activity port contract
- Runtime command contract
- Message bus contract
- Delivery store contract
- Lease coordinator contract
- Runtime loop context and projection contract
- State-attempt execution and recovery contract
- Server runtime projection adapter contract

需要新增的 Event：

- `runtime.loop.*`
- `runtime.turn.*`
- `runtime.command.*`
- `runtime.state_attempt.*`
- `runtime.steering.drained`
- `runtime.follow_up.drained`
- `runtime.context.transformed`
- `runtime.context.converted`
- `runtime.message.*`
- `runtime.activity.*`

兼容性影响：
Existing runtime APIs remain available. New contracts are additive. Server
routes add projection endpoints without changing existing runtime route
responses.

测试方案：
Package contract tests cover validation, idempotency, FIFO ordering, event
append sequencing, delivery retry/dead-letter behavior, lease/fencing,
FSM-controlled loop progression, state-attempt execution, recovery scan, and
server adapter projection.

对其他模块的影响：
Tool, Memory, Execution, Model, and Human activity internals remain behind
ports. DomainPack and app-specific business logic are not changed.

This proposal does not implement:

- Redis or Kafka transport adapters
- persistent inbox or outbox stores
- distributed lease backends or cross-process resource coordination
- persistent timers or signal stores
- server route migration
- business-specific workflow, prompt, or scheduling logic
- UI framework state management or application-specific rendering

## Proposed API Shape

Runtime activity ports provide a common boundary for model, tool, memory,
execution, human, and custom activities:

```ts
interface RuntimeActivityPort<TInput = unknown, TOutput = unknown> {
  execute(request: RuntimeActivityRequest<TInput>): Promise<RuntimeActivityResult<TOutput>>;
  cancel(activityId: string, reason?: string): Promise<void>;
  reconcile(activityId: string): Promise<RuntimeActivityResult<TOutput>>;
}
```

Each request carries:

- `scope` for tenant, user, session, run, and agent boundaries
- `stateAttemptId` to bind side effects to a specific FSM state attempt
- `operationId` and optional `idempotencyKey`
- `fencingToken` for future stale-worker rejection
- `correlationId` and `causationId` for event and message tracing

Message bus contracts provide a transport-neutral path for runtime commands and
events:

```ts
interface MessageBus {
  publish(message, options?): Promise<MessageBusPublishResult>;
  subscribe(topic, handler): Promise<MessageBusSubscription>;
  list(topic?): Promise<MessageBusMessage[]>;
}
```

The in-memory implementation is intended only for contract tests, local
development, and deterministic fixtures.

Runtime command processing provides the first queue-to-event loop:

```ts
const processor = new RuntimeCommandProcessor();
await processor.submit(command);
await processor.drain({ userId, sessionId });
```

`submit()` validates a `RuntimeCommand`, enqueues it by user/session, records a
`runtime.command.enqueued` event, and publishes a `runtime.commands` message.
`processNext()` and `drain()` consume FIFO commands for the session, map known
commands such as `run.create`, `run.start`, and `run.cancel` to framework
events, append those facts to the event stream idempotently, record
`runtime.command.applied`, and publish `runtime.events` messages.

This processor is not the final durable worker. It is the package-level contract
and deterministic in-memory reference that future inbox, outbox, dead-letter,
lease, fencing, and transport adapters must preserve.

Inbox/outbox delivery records provide the durable-message contract:

```ts
const delivery = new InMemoryRuntimeDeliveryStore();
await delivery.enqueue('outbox', message);
const record = await delivery.leaseNext({ box: 'outbox', ownerId, ttlMs });
await delivery.acknowledge(record.id, record.leaseToken);
```

Delivery records move through `pending`, `leased`, `acknowledged`, and
`dead_lettered`. `negativeAcknowledge()` returns a message to `pending` until
`maxAttempts` is exhausted, then moves it to dead-letter state with a reason.
Acknowledgement requires the active `leaseToken`, which is the local fencing
boundary for stale workers.

Session leases provide the concurrency boundary for command processing:

```ts
const resourceId = runtimeSessionLeaseResource({ userId, sessionId });
await leases.acquire(resourceId, workerId, ttlMs);
```

`RuntimeCommandProcessor` can use `RuntimeLeaseCoordinator` to acquire a session
lease before draining commands. If another worker owns the lease, processing
returns without dequeuing. Lease assertions and releases require the current
fencing token.

State-attempt execution binds FSM-owned state progress to side-effect ports:

```ts
const executor = new RuntimeStateAttemptExecutor();
await executor.execute(plan, activityPort);
```

The executor acquires a per-attempt lease, creates a `RuntimeStateAttempt`,
records `runtime.state_attempt.started`, creates a fenced
`RuntimeActivityRequest`, records `runtime.activity.prepared`, calls only the
provided `RuntimeActivityPort`, records `runtime.activity.finalized`, and then
records one terminal or waiting state-attempt event. Waiting attempts remain
open for durable resume. Busy leases return without executing the activity.

The executor does not own model, tool, memory, execution, human-review, or
custom activity internals. Those remain behind their ports and policies.

Waiting state attempts can be recovered from events:

```ts
const waiting = projectWaitingRuntimeStateAttempts(events);
await recovery.recover({ attempt: waiting[0], activityId }, activityPort);
```

Recovery only accepts attempts whose latest projected status is `waiting`.
It acquires the same per-attempt lease, records
`runtime.state_attempt.reconciled`, calls `RuntimeActivityPort.reconcile()`,
records `runtime.activity.reconciled`, and appends the next state-attempt status
event. This lets human review, async tools, long-running model calls, and custom
activities resume without mutable session state.

Recovery scanning is a separate scheduler layer:

```ts
const scanner = new RuntimeRecoveryScanner({ events, policy });
await scanner.scanAndRecover(activityPortResolver);
```

`RuntimeRecoveryScanner` projects waiting attempts from the append-only event
stream, applies bounded selection policy such as run filters, state exclusions,
minimum wait time, and limit, resolves an activity port for each selected
attempt, and delegates reconciliation to `RuntimeStateAttemptRecoveryExecutor`.
The scanner never implements activity internals itself.

The minimal runtime loop runner composes the package-level pieces:

```ts
const runner = new RuntimeLoopRunner({ events });
await runner.run({ context, modelPort });
```

`RuntimeLoopRunner` advances `defaultRuntimeLoopFSMProcessSpec`, drains steering
and follow-up queues, records context transform and conversion events, executes
the model state through `RuntimeStateAttemptExecutor`, records turn and loop
completion events, and returns a `RuntimeLoopProjector` view. It is intentionally
minimal: concrete model, tool, memory, execution, and human activity semantics
remain behind ports.

`ServerRuntimeAdapter` gives app surfaces a package-level projection boundary:

```ts
const adapter = new ServerRuntimeAdapter(eventSource);
await adapter.projectLoop(runId);
await adapter.projectStateAttempts(runId);
```

The server app can expose these projections without defining runtime semantics
inside route handlers or service code.

## Reference Mapping: Pi Agent Loop

Pi Agent's data-flow design is useful as a reference for interactive agent
ergonomics, but Hypha keeps different runtime authority boundaries:

| Pi reference idea | Hypha runtime mapping |
| --- | --- |
| User input starts an agent lifecycle | `RuntimeCommand` and `runtime.loop.started` append facts before projection |
| Inner work loop plus outer follow-up loop | `defaultRuntimeLoopFSMProcessSpec` states: `SteeringDrain`, `ModelStreaming`, `ActivityPrepare`, `ActivityExecute`, `ActivityFinalize`, `FollowUpDrain` |
| `transformContext` then `convertToLlm` | `RuntimeLoopContextTransformer` and `RuntimeModelMessageConverter` stay separate contracts |
| In-place `partialMessage` updates | `runtime.message.started`, `runtime.message.updated`, and `runtime.message.completed` events are appended; `RuntimeLoopProjector` derives the current streaming message |
| Tool `prepare -> execute -> finalize` | `runtime.activity.prepared`, `RuntimeActivityPort.execute()`, and `runtime.activity.finalized` |
| `processEvents` updates state before listener notification | `RuntimeLoopProjector.apply()` updates `RuntimeLoopView` before returning a `RuntimeRenderEvent` |

The important divergence is intentional: Hypha does not make the loop's mutable
context array the source of truth. The append-only event stream remains the
source of truth, FSM controls legal loop progression, and UI render events are
derived surface notifications.

## Compatibility

The contracts are added under `@hypha/harness` and exported from the package
entrypoint. Existing runtime APIs remain unchanged.

Server code can continue using `EventFirstRuntime`, `RunManager`, and
`HarnessedReActFSMRunner` while future work migrates server-owned runtime
semantics into package-level command, queue, and activity handlers.

## Follow-Up Work

1. Add persistent inbox/outbox adapters backed by Redis, Kafka, or SQL storage
   while preserving `RuntimeDeliveryStore`.
2. Add distributed lease backends while preserving `RuntimeLeaseCoordinator`.
3. Add persistent queue adapters for Redis/Kafka while preserving
   `RuntimeCommandQueue`.
4. Extend FSM lifecycle events to state enter, execute, exit, transition
   proposal, guard check, acceptance, rejection, and snapshot projection.
5. Add persistent timer sources and backoff schedules for recovery scans.
6. Expand server migration from projections into command/query adapters for run
   start, loop execution, and recovery scheduling.

## Open Questions

- Should durable message transport adapters live in `@hypha/harness` or
  `@hypha/adapters-local` with only contracts in harness?
- Should `RuntimeCommand` become part of `@hypha/core` once command sourcing is
  introduced?
- How should event stream revisions map to session queue sequence numbers?
