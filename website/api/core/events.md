# `@codesoul-co/hypha-core` / `events`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)
- Exports: **11**

## Using this module

Use the Events module for creating, recording, or reading Event contracts. It exports 1 class, 1 function, 6 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  InMemoryEventStore,
  createFrameworkEvent,
} from '@codesoul-co/hypha-core';

import type {
  EventCreateInput,
  EventFilter,
  EventStore,
  FrameworkEvent,
  PersistedFrameworkEvent,
  TraceRecorder,
  FrameworkEventType,
  RuntimeActivityEventType,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryEventStore` | class | <code>new InMemoryEventStore(): InMemoryEventStore</code> | In Memory Event Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `createFrameworkEvent` | function | <code>createFrameworkEvent&lt;TPayload = unknown&gt;(input: EventCreateInput&lt;TPayload&gt;): FrameworkEvent&lt;TPayload&gt;</code> | Create Framework Event function with 1 public call signature; parameters and return types are listed below. |
| `EventCreateInput` | interface | <code>interface EventCreateInput</code> | Event Create Input interface with 20 public fields or methods. |
| `EventFilter` | interface | <code>interface EventFilter</code> | Event Filter interface with 6 public fields or methods. |
| `EventStore` | interface | <code>interface EventStore</code> | Event Store interface with 2 public fields or methods. |
| `FrameworkEvent` | interface | <code>interface FrameworkEvent</code> | Framework Event interface with 24 public fields or methods. |
| `PersistedFrameworkEvent` | interface | <code>interface PersistedFrameworkEvent extends FrameworkEvent&lt;TPayload&gt;</code> | Persisted Framework Event interface with 24 public fields or methods. |
| `TraceRecorder` | interface | <code>interface TraceRecorder</code> | Trace Recorder interface with 1 public fields or methods. |
| `FrameworkEventType` | type | <code>type FrameworkEventType = 'session.created' &#124; 'session.updated' &#124; 'session.closed' &#124; 'run.created' &#124; 'run.started' &#124; 'run.resume.requested' &#124; 'run.resumed' &#124; 'run.cancel.requested' &#124; 'run.cancelling' &#124; 'run.waiting_human' &#124; 'run.waiting_signal' &#124; 'run.waiting_timer' &#124; 'run.paused' &#124; 'run.completed' &#124; 'run.failed' &#124; 'run.cancelled' &#124; 'runtime.wait.created' &#124; 'runtime.wait.resolved' &#124; 'runtime.signal.received' &#124; 'ru...</code> | Public type alias for Framework Event Type; the declaration contains its complete type expression. |
| `RuntimeActivityEventType` | type | <code>type RuntimeActivityEventType = 'runtime.activity.requested' &#124; 'runtime.activity.completed' &#124; 'runtime.activity.failed' &#124; 'runtime.activity.waiting' &#124; 'runtime.activity.cancelled' &#124; 'runtime.activity.compensation.requested' &#124; 'runtime.activity.compensation.completed' &#124; 'runtime.activity.compensation.failed' &#124; 'activity.redispatch.requested' &#124; 'activity.redispatch.accepted' &#124; 'activity.redispatch.outcome_unknown'</code> | Public type alias for Runtime Activity Event Type; the declaration contains its complete type expression. |
| `RuntimeObservationEventType` | type | <code>type RuntimeObservationEventType = `runtime.observation.${string}`</code> | Public type alias for Runtime Observation Event Type; the declaration contains its complete type expression. |

## `InMemoryEventStore`

In Memory Event Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryEventStore } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export declare class InMemoryEventStore implements EventStore, TraceRecorder {
    append(event: FrameworkEvent): Promise<void>;
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryEventStore</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createFrameworkEvent`

Create Framework Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export declare function createFrameworkEvent<TPayload = unknown>(input: EventCreateInput<TPayload>): FrameworkEvent<TPayload>;
```

### Call signature

```text
createFrameworkEvent<TPayload = unknown>(input: EventCreateInput<TPayload>): FrameworkEvent<TPayload>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>EventCreateInput&lt;TPayload&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FrameworkEvent<TPayload>`
- Description: The return contract is defined by the type shown above.

## `EventCreateInput`

Event Create Input interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { EventCreateInput } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface EventCreateInput<TPayload = unknown> {
    id: string;
    type: FrameworkEventType;
    version?: string;
    tenantId?: string;
    userId?: string;
    runId: string;
    payload: TPayload;
    workspaceId?: string;
    sessionId?: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    branchId?: string;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    idempotencyKey?: string;
    operationId?: string;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `branchId` | property | <code>branchId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: FrameworkEventType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventFilter`

Event Filter interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { EventFilter } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface EventFilter {
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    type?: FrameworkEventType;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: FrameworkEventType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventStore`

Event Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { EventStore } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface EventStore {
    append(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FrameworkEvent`

Framework Event interface with 24 public fields or methods.

- Kind: interface
- Import: `import type { FrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface FrameworkEvent<TPayload = unknown> {
    id: string;
    type: FrameworkEventType;
    version?: string;
    tenantId?: string;
    userId?: string;
    workspaceId?: string;
    sessionId?: string;
    runId: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    branchId?: string;
    sequence?: number;
    globalSequence?: number;
    correlationId?: string;
    causationId?: string;
    parentEventId?: string;
    idempotencyKey?: string;
    operationId?: string;
    timestamp: string;
    recordedAt?: string;
    payload: TPayload;
    payloadHash?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `branchId` | property | <code>branchId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalSequence` | property | <code>globalSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordedAt` | property | <code>recordedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: FrameworkEventType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PersistedFrameworkEvent`

Persisted Framework Event interface with 24 public fields or methods.

- Kind: interface
- Import: `import type { PersistedFrameworkEvent } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface PersistedFrameworkEvent<TPayload = unknown> extends FrameworkEvent<TPayload> {
    version: string;
    userId: string;
    sequence: number;
    globalSequence: number;
    recordedAt: string;
    payloadHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `branchId` | property | <code>branchId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalSequence` | property | <code>globalSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentEventId` | property | <code>parentEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordedAt` | property | <code>recordedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: FrameworkEventType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceRecorder`

Trace Recorder interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { TraceRecorder } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export interface TraceRecorder {
    record(event: FrameworkEvent): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `FrameworkEventType`

Public type alias for Framework Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FrameworkEventType } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export type FrameworkEventType = 'session.created' | 'session.updated' | 'session.closed' | 'run.created' | 'run.started' | 'run.resume.requested' | 'run.resumed' | 'run.cancel.requested' | 'run.cancelling' | 'run.waiting_human' | 'run.waiting_signal' | 'run.waiting_timer' | 'run.paused' | 'run.completed' | 'run.failed' | 'run.cancelled' | 'runtime.wait.created' | 'runtime.wait.resolved' | 'runtime.signal.received' | 'runtime.timer.created' | 'runtime.timer.fired' | 'runtime.checkpoint.created' | 'runtime.checkpoint.failed' | 'runtime.cancellation.propagated' | 'runtime.cancellation.failed' | 'recovery.case.opened' | 'recovery.strategy.selected' | 'recovery.attempt.started' | 'recovery.attempt.completed' | 'recovery.progress.detected' | 'recovery.case.resolved' | 'recovery.case.escalated' | 'recovery.knowledge.invalidated' | 'fsm.transition.requested' | 'fsm.transition.accepted' | 'fsm.transition.rejected' | 'fsm.state.entered' | 'fsm.state.exited' | 'thinking.started' | 'thinking.completed' | 'agent.deliberation.started' | 'agent.deliberation.completed' | 'reasoning.decision.recorded' | 'agent.reasoning.started' | 'agent.reasoning.completed' | 'agent.action.selected' | 'react.step.completed' | 'react.continuation.checkpointed' | 'react.continuation.suspended' | 'react.continuation.resumed' | 'inference.requested' | 'inference.completed' | 'inference.failed' | 'model.call.started' | 'model.call.completed' | 'model.call.failed' | 'llm.cache.lookup' | 'llm.cache.hit' | 'llm.cache.miss' | 'llm.cache.write' | 'llm.cache.bypass' | 'workcache.lookup' | 'workcache.hit' | 'workcache.miss' | 'workcache.write' | 'workcache.invalidate' | 'workcache.bypass' | 'workcache.prefix.materialized' | 'tool.call.requested' | 'tool.authorization.checked' | 'tool.invocation.state.changed' | 'tool.policy.checked' | 'tool.call.approved' | 'tool.call.rejected' | 'tool.call.started' | 'tool.call.completed' | 'tool.call.failed' | 'tool.call.timeout' | 'tool.call.retrying' | 'tool.call.cancellation.requested' | 'tool.call.cancelled' | 'tool.call.late_result' | 'tool.output.validated' | 'tool.output.invalid' | 'tool.resolved' | 'tool.contract.snapshot.created' | 'tool.contract.snapshot.resolved' | 'tool.idempotency.reused' | 'tool.idempotency.conflict' | 'tool.external_receipt.reconciled' | 'tool.cache.lookup' | 'tool.cache.hit' | 'tool.cache.miss' | 'tool.cache.write' | 'tool.cache.bypass' | 'mcp.capability.discovered' | 'mcp.capability.trust.evaluated' | 'mcp.capability.drift.detected' | 'mcp.capability.quarantined' | 'mcp.catalog.updated' | 'mcp.server.state.changed' | 'mcp.connection.starting' | 'mcp.connection.initialized' | 'mcp.connection.ready' | 'mcp.connection.degraded' | 'mcp.connection.reconnecting' | 'mcp.connection.closed' | 'mcp.connection.failed' | 'mcp.capability.discovery.started' | 'mcp.capability.normalized' | 'mcp.capability.imported' | 'mcp.capability.removed' | 'mcp.capability.approved' | 'mcp.catalog.refreshed' | 'mcp.request.started' | 'mcp.request.cancelled' | 'mcp.request.completed' | 'mcp.request.failed' | 'mcp.tool.normalized' | 'mcp.resource.normalized' | 'mcp.call.started' | 'mcp.call.completed' | 'mcp.call.failed' | 'tool.target.resolved' | 'tool.preview.generated' | 'tool.progress.reported' | 'skill.selected' | 'skill.loaded' | 'skill.executed' | 'skill.completed' | 'skill.failed' | 'workflow.stage.started' | 'workflow.stage.completed' | 'workflow.stage.failed' | 'workflow.condition.evaluated' | 'memory.extraction.requested' | 'memory.extraction.queued' | 'memory.extraction.started' | 'memory.extraction.candidate.extracted' | 'memory.extraction.candidate.rejected' | 'memory.extraction.awaiting_review' | 'memory.extraction.completed' | 'memory.extraction.failed' | 'memory.extraction.cancelled' | 'memory.extraction.cursor.advanced' | 'memory.maintenance.lookup.started' | 'memory.maintenance.lookup.completed' | 'memory.maintenance.decision.planned' | 'memory.maintenance.decision.applied' | 'memory.maintenance.decision.conflict' | 'memory.maintenance.review.requested' | 'memory.retrieval.candidates.generated' | 'memory.retrieval.ranking.completed' | 'memory.retrieval.rerank.failed' | 'memory.activity.requested' | 'memory.activity.completed' | 'memory.activity.failed' | 'memory.activity.cancelled' | 'memory.search.requested' | 'memory.search.completed' | 'memory.search.failed' | 'memory.write.reused' | 'memory.write.failed' | 'memory.update.requested' | 'memory.update.committed' | 'memory.update.conflict' | 'memory.update.failed' | 'memory.delete.requested' | 'memory.delete.partial' | 'memory.delete.completed' | 'memory.delete.failed' | 'memory.index.requested' | 'memory.index.started' | 'memory.index.completed' | 'memory.index.partial' | 'memory.index.failed' | 'memory.consolidation.started' | 'memory.consolidation.completed' | 'memory.consolidation.failed' | 'memory.decay.evaluated' | 'memory.reinforced' | 'memory.superseded' | 'memory.invalidated' | 'memory.retention.expired' | 'memory.context.build.requested' | 'memory.context.source.collected' | 'memory.context.item.filtered' | 'memory.context.item.ranked' | 'memory.context.item.truncated' | 'memory.context.item.compacted' | 'memory.context.provenance.attached' | 'memory.context.build.completed' | 'memory.context.build.failed' | 'context.source.loaded' | 'context.item.selected' | 'context.item.rejected' | 'context.build.failed' | 'memory.worker.started' | 'memory.worker.stopped' | 'memory.worker.failed' | 'memory.worker.dead_lettered' | 'memory.read.requested' | 'memory.read.completed' | 'memory.read.failed' | 'memory.write.requested' | 'memory.write.validated' | 'memory.write.committed' | 'memory.write.rejected' | 'context.build.started' | 'context.build.completed' | 'context.compacted' | 'react.continuation.quarantined' | 'human.review.requested' | 'human.review.approved' | 'human.review.rejected' | 'human.review.expired' | 'human.review.cancelled' | 'human.review.superseded' | 'human.review.resume.started' | 'human.review.resume.revalidated' | 'human.review.resume.failed' | 'human.review.resolved' | 'message.enqueued' | 'message.delivered' | 'message.acknowledged' | 'message.failed' | 'message.retrying' | 'message.dead_lettered' | 'eval.started' | 'eval.completed' | 'eval.failed' | 'replay.started' | 'replay.completed' | 'replay.failed' | 'regression.started' | 'regression.completed' | 'regression.failed' | 'workspace.create.requested' | 'workspace.created' | 'workspace.ready' | 'workspace.busy' | 'workspace.path.resolved' | 'workspace.path.denied' | 'workspace.quota.exceeded' | 'workspace.snapshot.requested' | 'workspace.snapshot.created' | 'workspace.snapshot.failed' | 'workspace.restore.requested' | 'workspace.restored' | 'workspace.restore.failed' | 'workspace.patch.checked' | 'workspace.patch.applied' | 'workspace.patch.conflict' | 'workspace.cleanup.started' | 'workspace.cleanup.completed' | 'workspace.cleanup.failed' | 'sandbox.create.requested' | 'sandbox.created' | 'sandbox.started' | 'sandbox.ready' | 'sandbox.degraded' | 'sandbox.terminate.requested' | 'sandbox.terminated' | 'sandbox.cleanup.completed' | 'sandbox.cleanup.failed' | 'command.execution.requested' | 'command.execution.validated' | 'command.execution.approval.required' | 'command.execution.queued' | 'command.execution.started' | 'command.execution.output.truncated' | 'command.execution.resource.exceeded' | 'command.execution.oom_killed' | 'command.execution.timeout' | 'command.execution.cancellation.requested' | 'command.execution.cancelled' | 'command.execution.completed' | 'command.execution.failed' | 'command.execution.result.unknown' | 'command.execution.recovered' | 'network.authorization.requested' | 'network.authorization.granted' | 'network.authorization.denied' | 'network.authorization.revoked' | 'artifact.create.requested' | 'artifact.created' | 'artifact.deduplicated' | 'artifact.create.failed' | 'artifact.read.requested' | 'artifact.read.completed' | 'artifact.version.created' | 'artifact.finalized' | 'artifact.archived' | 'artifact.invalidated' | 'artifact.delete.requested' | 'artifact.delete.blocked' | 'artifact.deleted' | 'artifact.delete.failed' | 'artifact.lineage.recorded' | 'artifact.retention.expired' | 'artifact.gc.completed' | 'artifact.gc.failed'
/** @deprecated Use the explicit Artifact lifecycle event names. */
 | 'artifact.updated'
/** @deprecated Use artifact.version.created. */
 | 'artifact.versioned' | RuntimeObservationEventType | RuntimeActivityEventType;
```

## `RuntimeActivityEventType`

Public type alias for Runtime Activity Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityEventType } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export type RuntimeActivityEventType = 'runtime.activity.requested' | 'runtime.activity.completed' | 'runtime.activity.failed' | 'runtime.activity.waiting' | 'runtime.activity.cancelled' | 'runtime.activity.compensation.requested' | 'runtime.activity.compensation.completed' | 'runtime.activity.compensation.failed' | 'activity.redispatch.requested' | 'activity.redispatch.accepted' | 'activity.redispatch.outcome_unknown';
```

## `RuntimeObservationEventType`

Public type alias for Runtime Observation Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeObservationEventType } from '@codesoul-co/hypha-core';`
- Source module: [`events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/events.ts)

### Declaration

```text
export type RuntimeObservationEventType = `runtime.observation.${string}`;
```
