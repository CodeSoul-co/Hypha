# `@codesoul-co/hypha-core` / `events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryEventStore` | class | <code>new InMemoryEventStore(): InMemoryEventStore</code> | Runtime implementation for In Memory Event Store; see its public constructor and members below. |
| `createFrameworkEvent` | function | <code>createFrameworkEvent&lt;TPayload = unknown&gt;(input: EventCreateInput&lt;TPayload&gt;): FrameworkEvent&lt;TPayload&gt;</code> | Creates Framework Event at this module boundary. |
| `EventCreateInput` | interface | <code>interface EventCreateInput</code> | Field contract for Event Create Input; see all contract members below. |
| `EventFilter` | interface | <code>interface EventFilter</code> | Field contract for Event Filter; see all contract members below. |
| `EventStore` | interface | <code>interface EventStore</code> | Field contract for Event Store; see all contract members below. |
| `FrameworkEvent` | interface | <code>interface FrameworkEvent</code> | Field contract for Framework Event; see all contract members below. |
| `PersistedFrameworkEvent` | interface | <code>interface PersistedFrameworkEvent extends FrameworkEvent&lt;TPayload&gt;</code> | Field contract for Persisted Framework Event; see all contract members below. |
| `TraceRecorder` | interface | <code>interface TraceRecorder</code> | Field contract for Trace Recorder; see all contract members below. |
| `FrameworkEventType` | type | <code>type FrameworkEventType = 'session.created' &#124; 'session.updated' &#124; 'session.closed' &#124; 'run.created' &#124; 'run.started' &#124; 'run.resume.requested' &#124; 'run.resumed' &#124; 'run.cancel.requested' &#124; 'run.cancelling' &#124; 'run.waiting_human' &#124; 'run.waiting_signal' &#124; 'run.waiting_timer' &#124; 'run.paused' &#124; 'run.completed' &#124; 'run.failed' &#124; 'run.cancelled' &#124; 'runtime.wait.created' &#124; 'runtime.wait.resolved' &#124; 'runtime.signal.received' &#124; 'ru...</code> | Public type alias for Framework Event Type. |
| `RuntimeActivityEventType` | type | <code>type RuntimeActivityEventType = 'runtime.activity.requested' &#124; 'runtime.activity.completed' &#124; 'runtime.activity.failed' &#124; 'runtime.activity.waiting' &#124; 'runtime.activity.cancelled' &#124; 'runtime.activity.compensation.requested' &#124; 'runtime.activity.compensation.completed' &#124; 'runtime.activity.compensation.failed' &#124; 'activity.redispatch.requested' &#124; 'activity.redispatch.accepted' &#124; 'activity.redispatch.outcome_unknown'</code> | Public type alias for Runtime Activity Event Type. |
| `RuntimeObservationEventType` | type | <code>type RuntimeObservationEventType = `runtime.observation.${string}`</code> | Public type alias for Runtime Observation Event Type. |

## `InMemoryEventStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(): InMemoryEventStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Lists list at this module boundary. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `EventCreateInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `branchId` | property | <code>branchId: string</code> | Public branch Id property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `type` | property | <code>type: FrameworkEventType</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `EventFilter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `type` | property | <code>type: FrameworkEventType</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `EventStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Lists list at this module boundary. |

## `FrameworkEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `branchId` | property | <code>branchId: string</code> | Public branch Id property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `globalSequence` | property | <code>globalSequence: number</code> | Public global Sequence property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public recorded At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `type` | property | <code>type: FrameworkEventType</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `PersistedFrameworkEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `branchId` | property | <code>branchId: string</code> | Public branch Id property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `globalSequence` | property | <code>globalSequence: number</code> | Public global Sequence property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `parentEventId` | property | <code>parentEventId: string</code> | Public parent Event Id property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public recorded At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `type` | property | <code>type: FrameworkEventType</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `TraceRecorder` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Records record at this module boundary. |
