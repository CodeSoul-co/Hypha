# `@codesoul-co/hypha-harness` / `index`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)
- Exports: **9**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-harness`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  InMemoryTraceRecorder,
  SessionProjector,
  UserScopedSessionQueue,
  createRunStartedEvent,
} from '@codesoul-co/hypha-harness';

import type {
  QueueTask,
  RegressionCase,
  ReplayFixture,
  RunRecord,
  SessionView,
} from '@codesoul-co/hypha-harness';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryTraceRecorder` | class | <code>new InMemoryTraceRecorder(): InMemoryTraceRecorder</code> | In Memory Trace Recorder class with 3 public constructor or member entries; its exact declarations are listed below. |
| `SessionProjector` | class | <code>new SessionProjector(): SessionProjector</code> | Session Projector class with 2 public constructor or member entries; its exact declarations are listed below. |
| `UserScopedSessionQueue` | class | <code>new UserScopedSessionQueue&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | User Scoped Session Queue class with 4 public constructor or member entries; its exact declarations are listed below. |
| `createRunStartedEvent` | function | <code>createRunStartedEvent(run: RunRecord): FrameworkEvent</code> | Create Run Started Event function with 1 public call signature; parameters and return types are listed below. |
| `QueueTask` | interface | <code>interface QueueTask</code> | Queue Task interface with 4 public fields or methods. |
| `RegressionCase` | interface | <code>interface RegressionCase</code> | Regression Case interface with 6 public fields or methods. |
| `ReplayFixture` | interface | <code>interface ReplayFixture</code> | Replay Fixture interface with 15 public fields or methods. |
| `RunRecord` | interface | <code>interface RunRecord</code> | Run Record interface with 10 public fields or methods. |
| `SessionView` | interface | <code>interface SessionView</code> | Session View interface with 5 public fields or methods. |

## `InMemoryTraceRecorder`

In Memory Trace Recorder class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryTraceRecorder } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export declare class InMemoryTraceRecorder implements TraceRecorder {
    record(event: FrameworkEvent): Promise<void>;
    list(filter?: EventFilter): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryTraceRecorder</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SessionProjector`

Session Projector class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SessionProjector } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export declare class SessionProjector {
    project(events: FrameworkEvent[]): SessionView[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SessionProjector</code> | Creates an instance of this class. |
| `project` | method | <code>project(events: FrameworkEvent[]): SessionView[]</code> | Public method; parameters and return type are shown in the signature. |

## `UserScopedSessionQueue`

User Scoped Session Queue class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { UserScopedSessionQueue } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export declare class UserScopedSessionQueue<T = unknown> {
    enqueue(task: QueueTask<T>): number;
    dequeue(userId: string, sessionId: string): QueueTask<T> | null;
    size(userId: string, sessionId: string): number;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;T = unknown&gt;(): UserScopedSessionQueue&lt;T&gt;</code> | Creates an instance of this class. |
| `dequeue` | method | <code>dequeue(userId: string, sessionId: string): QueueTask&lt;T&gt; &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(task: QueueTask&lt;T&gt;): number</code> | Public method; parameters and return type are shown in the signature. |
| `size` | method | <code>size(userId: string, sessionId: string): number</code> | Public method; parameters and return type are shown in the signature. |

## `createRunStartedEvent`

Create Run Started Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRunStartedEvent } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export declare function createRunStartedEvent(run: RunRecord): FrameworkEvent;
```

### Call signature

```text
createRunStartedEvent(run: RunRecord): FrameworkEvent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `run` | <code>RunRecord&lt;unknown, unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FrameworkEvent<unknown>`
- Description: The return contract is defined by the type shown above.

## `QueueTask`

Queue Task interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { QueueTask } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export interface QueueTask<T = unknown> {
    id: string;
    userId: string;
    sessionId: string;
    payload: T;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: T</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionCase`

Regression Case interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RegressionCase } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export interface RegressionCase {
    id: string;
    fixture: ReplayFixture;
    actualEvents?: FrameworkEvent[];
    requiredChecks?: Array<'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract'>;
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEvents` | property | <code>actualEvents?: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixture` | property | <code>fixture: ReplayFixture</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredChecks` | property | <code>requiredChecks?: ("output_contract" &#124; "state_path" &#124; "event_types" &#124; "tool_calls" &#124; "policy_decisions")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayFixture`

Replay Fixture interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ReplayFixture } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export interface ReplayFixture {
    id: string;
    version: string;
    runId: string;
    createdAt?: string;
    replaySpecRef?: SpecRef;
    events: FrameworkEvent[];
    eventTypes?: string[];
    statePath: string[];
    finalOutput?: unknown;
    toolCalls?: string[];
    modelCalls?: string[];
    policyDecisions?: string[];
    memoryReadSet?: string[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventTypes` | property | <code>eventTypes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalOutput` | property | <code>finalOutput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryReadSet` | property | <code>memoryReadSet?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisions` | property | <code>policyDecisions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replaySpecRef` | property | <code>replaySpecRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunRecord`

Run Record interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RunRecord } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export interface RunRecord<TInput = unknown, TOutput = unknown> {
    id: string;
    sessionId?: string;
    userId?: string;
    agentSystemId: string;
    status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
    input: TInput;
    output?: TOutput;
    fsmSnapshot?: FSMSnapshot;
    createdAt: string;
    completedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentSystemId` | property | <code>agentSystemId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmSnapshot` | property | <code>fsmSnapshot?: FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionView`

Session View interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SessionView } from '@codesoul-co/hypha-harness';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts)

### Declaration

```text
export interface SessionView {
    id: string;
    userId: string;
    runIds: string[];
    status: 'active' | 'closed';
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runIds` | property | <code>runIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "active" &#124; "closed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
