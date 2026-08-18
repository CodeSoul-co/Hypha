# `@codesoul-co/hypha-harness` / `long-horizon-react-supervisor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/long-horizon-react-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)
- Exports: **15**

## Using this module

Use the Long horizon react supervisor module for using the public contracts and operations for this capability boundary. It exports 2 classes, 1 function, 11 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LongHorizonReActSupervisor,
  ServerIngressReActContinuationScheduler,
  reActContinuationIdempotencyKey,
} from '@codesoul-co/hypha-harness';

import type {
  CoordinateReActQuantumResultInput,
  EnqueueReActContinuationCommandRequest,
  LongHorizonReActQuantumInput,
  LongHorizonReActQuantumResult,
  LongHorizonReActSupervisorOptions,
  ReActContinuationCommandIngress,
  ReActContinuationIntent,
  ReActContinuationScheduler,
} from '@codesoul-co/hypha-harness';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LongHorizonReActSupervisor` | class | <code>new LongHorizonReActSupervisor(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision. |
| `ServerIngressReActContinuationScheduler` | class | <code>new ServerIngressReActContinuationScheduler(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation. |
| `reActContinuationIdempotencyKey` | function | <code>reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string</code> | Re Act Continuation Idempotency Key function with 1 public call signature; parameters and return types are listed below. |
| `CoordinateReActQuantumResultInput` | interface | <code>interface CoordinateReActQuantumResultInput</code> | Coordinate ReAct Quantum Result Input interface with 2 public fields or methods. |
| `EnqueueReActContinuationCommandRequest` | interface | <code>interface EnqueueReActContinuationCommandRequest</code> | Enqueue ReAct Continuation Command Request interface with 13 public fields or methods. |
| `LongHorizonReActQuantumInput` | interface | <code>interface LongHorizonReActQuantumInput</code> | Long Horizon ReAct Quantum Input interface with 3 public fields or methods. |
| `LongHorizonReActQuantumResult` | interface | <code>interface LongHorizonReActQuantumResult</code> | Long Horizon ReAct Quantum Result interface with 4 public fields or methods. |
| `LongHorizonReActSupervisorOptions` | interface | <code>interface LongHorizonReActSupervisorOptions</code> | Long Horizon ReAct Supervisor Options interface with 3 public fields or methods. |
| `ReActContinuationCommandIngress` | interface | <code>interface ReActContinuationCommandIngress</code> | ReAct Continuation Command Ingress interface with 1 public fields or methods. |
| `ReActContinuationIntent` | interface | <code>interface ReActContinuationIntent</code> | ReAct Continuation Intent interface with 6 public fields or methods. |
| `ReActContinuationScheduler` | interface | <code>interface ReActContinuationScheduler</code> | ReAct Continuation Scheduler interface with 1 public fields or methods. |
| `ReActContinuationScheduleRequest` | interface | <code>interface ReActContinuationScheduleRequest</code> | ReAct Continuation Schedule Request interface with 7 public fields or methods. |
| `ReActContinuationScheduleResult` | interface | <code>interface ReActContinuationScheduleResult</code> | ReAct Continuation Schedule Result interface with 2 public fields or methods. |
| `ServerIngressReActContinuationSchedulerOptions` | interface | <code>interface ServerIngressReActContinuationSchedulerOptions</code> | Server Ingress ReAct Continuation Scheduler Options interface with 2 public fields or methods. |
| `LongHorizonReActDisposition` | type | <code>type LongHorizonReActDisposition = 'completed' &#124; 'continuation_scheduled' &#124; 'continuation_required' &#124; 'waiting_human' &#124; 'cancelled' &#124; 'failed'</code> | Public type alias for Long Horizon ReAct Disposition; the declaration contains its complete type expression. |

## `LongHorizonReActSupervisor`

Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision.

- Kind: class
- Import: `import { LongHorizonReActSupervisor } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export declare class LongHorizonReActSupervisor {
    constructor(options: LongHorizonReActSupervisorOptions);
    runQuantum(input: LongHorizonReActQuantumInput): Promise<LongHorizonReActQuantumResult>;
    coordinateResult(input: CoordinateReActQuantumResultInput): Promise<LongHorizonReActQuantumResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Creates an instance of this class. |
| `coordinateResult` | method | <code>coordinateResult(input: CoordinateReActQuantumResultInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `runQuantum` | method | <code>runQuantum(input: LongHorizonReActQuantumInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ServerIngressReActContinuationScheduler`

Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation.

- Kind: class
- Import: `import { ServerIngressReActContinuationScheduler } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export declare class ServerIngressReActContinuationScheduler implements ReActContinuationScheduler {
    constructor(options: ServerIngressReActContinuationSchedulerOptions);
    schedule(input: ReActContinuationScheduleRequest): Promise<ReActContinuationScheduleResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Creates an instance of this class. |
| `schedule` | method | <code>schedule(input: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `reActContinuationIdempotencyKey`

Re Act Continuation Idempotency Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { reActContinuationIdempotencyKey } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export declare function reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string;
```

### Call signature

```text
reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>ContinueReActCommandPayloadV1</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `CoordinateReActQuantumResultInput`

Coordinate ReAct Quantum Result Input interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { CoordinateReActQuantumResultInput } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface CoordinateReActQuantumResultInput {
    react: ReActRunResult;
    continuation?: ReActContinuationIntent;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `continuation` | property | <code>continuation?: ReActContinuationIntent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `react` | property | <code>react: ReActRunResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EnqueueReActContinuationCommandRequest`

Enqueue ReAct Continuation Command Request interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { EnqueueReActContinuationCommandRequest } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface EnqueueReActContinuationCommandRequest {
    id: string;
    commandType: 'continue_react';
    idempotencyKey: string;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    targetRunId: string;
    priority?: number;
    maxAttempts?: number;
    payload: ContinueReActCommandPayloadV1;
    createdAt: string;
    availableAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandType` | property | <code>commandType: "continue_react"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: ContinueReActCommandPayloadV1</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LongHorizonReActQuantumInput`

Long Horizon ReAct Quantum Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LongHorizonReActQuantumInput } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface LongHorizonReActQuantumInput {
    context: ReActRunContext;
    control?: ReActRunControl;
    continuation?: ReActContinuationIntent;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ReActRunContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `continuation` | property | <code>continuation?: ReActContinuationIntent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `control` | property | <code>control?: ReActRunControl</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LongHorizonReActQuantumResult`

Long Horizon ReAct Quantum Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LongHorizonReActQuantumResult } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface LongHorizonReActQuantumResult {
    disposition: LongHorizonReActDisposition;
    react: ReActRunResult;
    scheduledTaskId?: string;
    scheduleReused?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: LongHorizonReActDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `react` | property | <code>react: ReActRunResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scheduledTaskId` | property | <code>scheduledTaskId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scheduleReused` | property | <code>scheduleReused?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LongHorizonReActSupervisorOptions`

Long Horizon ReAct Supervisor Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LongHorizonReActSupervisorOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface LongHorizonReActSupervisorOptions {
    runner: Pick<ReActRunner, 'run'>;
    scheduler?: ReActContinuationScheduler;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `runner` | property | <code>runner: Pick&lt;ReActRunner, "run"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scheduler` | property | <code>scheduler?: ReActContinuationScheduler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationCommandIngress`

ReAct Continuation Command Ingress interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationCommandIngress } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ReActContinuationCommandIngress {
    enqueue(request: EnqueueReActContinuationCommandRequest): Promise<Pick<SessionCommandRecord, 'id' | 'status'>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enqueue` | method | <code>enqueue(request: EnqueueReActContinuationCommandRequest): Promise&lt;Pick&lt;SessionCommandRecord, "id" &#124; "status"&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActContinuationIntent`

ReAct Continuation Intent interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationIntent } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ReActContinuationIntent {
    tenantId?: string;
    workspaceId?: string;
    availableAt?: string;
    priority?: number;
    maxAttempts?: number;
    buildPayload(checkpoint: Readonly<ReActContinuationCheckpoint>): ContinueReActCommandPayloadV1 | Promise<ContinueReActCommandPayloadV1>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `buildPayload` | method | <code>buildPayload(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): ContinueReActCommandPayloadV1 &#124; Promise&lt;ContinueReActCommandPayloadV1&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationScheduler`

ReAct Continuation Scheduler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationScheduler } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ReActContinuationScheduler {
    schedule(request: ReActContinuationScheduleRequest): Promise<ReActContinuationScheduleResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `schedule` | method | <code>schedule(request: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActContinuationScheduleRequest`

ReAct Continuation Schedule Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationScheduleRequest } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ReActContinuationScheduleRequest {
    version: '1.0.0';
    tenantId?: string;
    workspaceId?: string;
    payload: ContinueReActCommandPayloadV1;
    availableAt: string;
    priority?: number;
    maxAttempts?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: ContinueReActCommandPayloadV1</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationScheduleResult`

ReAct Continuation Schedule Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationScheduleResult } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ReActContinuationScheduleResult {
    taskId: string;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ServerIngressReActContinuationSchedulerOptions`

Server Ingress ReAct Continuation Scheduler Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ServerIngressReActContinuationSchedulerOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export interface ServerIngressReActContinuationSchedulerOptions {
    ingress: ReActContinuationCommandIngress;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ingress` | property | <code>ingress: ReActContinuationCommandIngress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |

## `LongHorizonReActDisposition`

Public type alias for Long Horizon ReAct Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LongHorizonReActDisposition } from '@codesoul-co/hypha-harness';`
- Source module: [`long-horizon-react-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)

### Declaration

```text
export type LongHorizonReActDisposition = 'completed' | 'continuation_scheduled' | 'continuation_required' | 'waiting_human' | 'cancelled' | 'failed';
```
