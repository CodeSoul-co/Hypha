# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-redispatch-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)
- Exports: **9**

## Using this module

Use the Runtime activity redispatch service module for executing runtime behavior at this boundary. It exports 1 class, 1 function, 6 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  RuntimeActivityRedispatchService,
  runtimeActivityRedispatchIdentity,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityRedispatchAttempt,
  RuntimeActivityRedispatchCommand,
  RuntimeActivityRedispatchPort,
  RuntimeActivityRedispatchResult,
  RuntimeActivityRedispatchServiceOptions,
  RuntimeActivityRevisionValidator,
  RuntimeActivityRedispatchReconciliation,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeActivityRedispatchService` | class | <code>new RuntimeActivityRedispatchService(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched. |
| `runtimeActivityRedispatchIdentity` | function | <code>runtimeActivityRedispatchIdentity(command: Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;): string</code> | Runtime Activity Redispatch Identity function with 1 public call signature; parameters and return types are listed below. |
| `RuntimeActivityRedispatchAttempt` | interface | <code>interface RuntimeActivityRedispatchAttempt</code> | Runtime Activity Redispatch Attempt interface with 9 public fields or methods. |
| `RuntimeActivityRedispatchCommand` | interface | <code>interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference</code> | Runtime Activity Redispatch Command interface with 12 public fields or methods. |
| `RuntimeActivityRedispatchPort` | interface | <code>interface RuntimeActivityRedispatchPort</code> | Runtime Activity Redispatch Port interface with 2 public fields or methods. |
| `RuntimeActivityRedispatchResult` | interface | <code>interface RuntimeActivityRedispatchResult</code> | Runtime Activity Redispatch Result interface with 8 public fields or methods. |
| `RuntimeActivityRedispatchServiceOptions` | interface | <code>interface RuntimeActivityRedispatchServiceOptions</code> | Runtime Activity Redispatch Service Options interface with 12 public fields or methods. |
| `RuntimeActivityRevisionValidator` | interface | <code>interface RuntimeActivityRevisionValidator</code> | Runtime Activity Revision Validator interface with 1 public fields or methods. |
| `RuntimeActivityRedispatchReconciliation` | type | <code>type RuntimeActivityRedispatchReconciliation = { status: 'accepted'; commandId: string; } &#124; { status: 'safe_to_dispatch'; } &#124; { status: 'unknown'; reason: string; }</code> | Public type alias for Runtime Activity Redispatch Reconciliation; the declaration contains its complete type expression. |

## `RuntimeActivityRedispatchService`

Revalidates approved HumanTask evidence, records redispatch intent, invokes an Owner-provided idempotent Activity dispatcher, and persists acceptance. An intent without a receipt is reconciled before any retry is dispatched.

- Kind: class
- Import: `import { RuntimeActivityRedispatchService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export declare class RuntimeActivityRedispatchService {
    constructor(options: RuntimeActivityRedispatchServiceOptions);
    redispatch(command: RuntimeActivityRedispatchCommand): Promise<RuntimeActivityRedispatchResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeActivityRedispatchServiceOptions): RuntimeActivityRedispatchService</code> | Creates an instance of this class. |
| `redispatch` | method | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `runtimeActivityRedispatchIdentity`

Runtime Activity Redispatch Identity function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runtimeActivityRedispatchIdentity } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export declare function runtimeActivityRedispatchIdentity(command: Pick<RuntimeActivityRedispatchCommand, 'scope' | 'taskId' | 'expectedTaskRevision'>): string;
```

### Call signature

```text
runtimeActivityRedispatchIdentity(command: Pick<RuntimeActivityRedispatchCommand, "scope" | "taskId" | "expectedTaskRevision">): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `command` | <code>Pick&lt;RuntimeActivityRedispatchCommand, "scope" &#124; "taskId" &#124; "expectedTaskRevision"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `RuntimeActivityRedispatchAttempt`

Runtime Activity Redispatch Attempt interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchAttempt } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchAttempt {
    scope: Readonly<RuntimeScope>;
    task: Readonly<RuntimeHumanTask>;
    descriptor: Readonly<RuntimeActivityDescriptor>;
    redispatchCommandId: string;
    redispatchIdempotencyKey: string;
    approvalEventId: string;
    requestEventId: string;
    fencingToken: number;
    signal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalEventId` | property | <code>approvalEventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `descriptor` | property | <code>descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redispatchCommandId` | property | <code>redispatchCommandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redispatchIdempotencyKey` | property | <code>redispatchIdempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestEventId` | property | <code>requestEventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `task` | property | <code>task: Readonly&lt;RuntimeHumanTask&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRedispatchCommand`

Runtime Activity Redispatch Command interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchCommand } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchCommand extends RuntimeActivityDescriptorReference {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    taskId: string;
    expectedTaskRevision: number;
    expectedSubjectHash: string;
    requestedAt: string;
    idempotencyKey?: string;
    signal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSubjectHash` | property | <code>expectedSubjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedTaskRevision` | property | <code>expectedTaskRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRedispatchPort`

Runtime Activity Redispatch Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchPort {
    dispatch(input: RuntimeActivityRedispatchAttempt): Promise<{
        commandId: string;
        reused: boolean;
    }>;
    /**
     * Resolves the crash window between an accepted external dispatch and its
     * durable Runtime receipt. `safe_to_dispatch` is an authoritative absence
     * result; uncertainty must be returned as `unknown`.
     */
    reconcile(input: RuntimeActivityRedispatchAttempt): Promise<RuntimeActivityRedispatchReconciliation>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dispatch` | method | <code>dispatch(input: RuntimeActivityRedispatchAttempt): Promise&lt;{ commandId: string; reused: boolean; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile(input: RuntimeActivityRedispatchAttempt): Promise&lt;RuntimeActivityRedispatchReconciliation&gt;</code> | Resolves the crash window between an accepted external dispatch and its durable Runtime receipt. `safe_to_dispatch` is an authoritative absence result; uncertainty must be returned as `unknown`. |

## `RuntimeActivityRedispatchResult`

Runtime Activity Redispatch Result interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchResult {
    commandId: string;
    requestEventId: string;
    receiptEventId: string;
    activityCommandId: string;
    eventReused: boolean;
    receiptReused: boolean;
    commandReused: boolean;
    reconciled: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityCommandId` | property | <code>activityCommandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandReused` | property | <code>commandReused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventReused` | property | <code>eventReused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptEventId` | property | <code>receiptEventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptReused` | property | <code>receiptReused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciled` | property | <code>reconciled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestEventId` | property | <code>requestEventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRedispatchServiceOptions`

Runtime Activity Redispatch Service Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchServiceOptions {
    events: EventRuntime;
    runLeases: RunLeaseStore;
    descriptors: RuntimeActivityDescriptorStore;
    revisions: RuntimeActivityRevisionValidator;
    dispatcher: RuntimeActivityRedispatchPort;
    renewalIntervalMs?: number;
    wait?: (delayMs: number, signal: AbortSignal) => Promise<void>;
    onLeaseRenewalFailure?: (error: unknown, commandId: string) => void;
    operationalTelemetry?: RuntimeOperationalTelemetry;
    monotonicNow?: () => number;
    nextId?: (namespace: string) => string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `descriptors` | property | <code>descriptors: RuntimeActivityDescriptorStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dispatcher` | property | <code>dispatcher: RuntimeActivityRedispatchPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `monotonicNow` | method | <code>monotonicNow?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onLeaseRenewalFailure` | method | <code>onLeaseRenewalFailure?(error: unknown, commandId: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `operationalTelemetry` | property | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewalIntervalMs` | property | <code>renewalIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revisions` | property | <code>revisions: RuntimeActivityRevisionValidator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `wait` | method | <code>wait?(delayMs: number, signal: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityRevisionValidator`

Runtime Activity Revision Validator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRevisionValidator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export interface RuntimeActivityRevisionValidator {
    validate(input: {
        task: Readonly<RuntimeHumanTask>;
        descriptor: Readonly<RuntimeActivityDescriptor>;
    }): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `validate` | method | <code>validate(input: { task: Readonly&lt;RuntimeHumanTask&gt;; descriptor: Readonly&lt;RuntimeActivityDescriptor&gt;; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityRedispatchReconciliation`

Public type alias for Runtime Activity Redispatch Reconciliation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityRedispatchReconciliation } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-redispatch-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-redispatch-service.ts)

### Declaration

```text
export type RuntimeActivityRedispatchReconciliation = {
    status: 'accepted';
    commandId: string;
} | {
    status: 'safe_to_dispatch';
} | {
    status: 'unknown';
    reason: string;
};
```
