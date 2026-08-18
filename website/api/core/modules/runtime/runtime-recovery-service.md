# `@codesoul-co/hypha-core` / `modules/runtime/runtime-recovery-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-recovery-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)
- Exports: **3**

## Using this module

Use the Runtime recovery service module for executing runtime behavior at this boundary. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  RuntimeRecoveryService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityRedispatchRecoveryPort,
  RuntimeRecoveryServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeRecoveryService` | class | <code>new RuntimeRecoveryService(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Runtime Recovery Service class with 3 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeActivityRedispatchRecoveryPort` | interface | <code>interface RuntimeActivityRedispatchRecoveryPort</code> | Runtime Activity Redispatch Recovery Port interface with 1 public fields or methods. |
| `RuntimeRecoveryServiceOptions` | interface | <code>interface RuntimeRecoveryServiceOptions</code> | Runtime Recovery Service Options interface with 11 public fields or methods. |

## `RuntimeRecoveryService`

Runtime Recovery Service class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeRecoveryService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### Declaration

```text
export declare class RuntimeRecoveryService {
    constructor(options: RuntimeRecoveryServiceOptions);
    scan(input: RuntimeRecoveryScanRequest): Promise<RuntimeRecoveryScanResult>;
    recover(input: RuntimeRecoveryCommand): Promise<RuntimeRecoveryResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Creates an instance of this class. |
| `recover` | method | <code>recover(input: RuntimeRecoveryCommand): Promise&lt;RuntimeRecoveryResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scan` | method | <code>scan(input: RuntimeRecoveryScanRequest): Promise&lt;RuntimeRecoveryScanResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityRedispatchRecoveryPort`

Runtime Activity Redispatch Recovery Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRedispatchRecoveryPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### Declaration

```text
export interface RuntimeActivityRedispatchRecoveryPort {
    redispatch(command: RuntimeActivityRedispatchCommand): Promise<RuntimeActivityRedispatchResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `redispatch` | method | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeRecoveryServiceOptions`

Runtime Recovery Service Options interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### Declaration

```text
export interface RuntimeRecoveryServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    stateClaims: StateExecutionClaimStore;
    activities: RuntimeActivityReconciliationPort;
    redispatches: RuntimeActivityRedispatchRecoveryPort;
    cancellations: RuntimeCancellationRecoveryPort;
    requeue: RuntimeRecoveryRequeuePort;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: RuntimeActivityReconciliationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellations` | property | <code>cancellations: RuntimeCancellationRecoveryPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redispatches` | property | <code>redispatches: RuntimeActivityRedispatchRecoveryPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requeue` | property | <code>requeue: RuntimeRecoveryRequeuePort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateClaims` | property | <code>stateClaims: StateExecutionClaimStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
