# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-wait-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-human-wait-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)
- Exports: **6**

## Using this module

Use the Runtime human wait service module for executing runtime behavior at this boundary. It exports 1 class, 5 interfaces.

### Import from the package entrypoint

```ts
import {
  RuntimeHumanWaitService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeHumanWaitCreateCommand,
  RuntimeHumanWaitResolveCommand,
  RuntimeHumanWaitResult,
  RuntimeHumanWaitServiceOptions,
  RuntimeHumanWaitSupersedeCommand,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeHumanWaitService` | class | <code>new RuntimeHumanWaitService(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Runtime Human Wait Service class with 4 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeHumanWaitCreateCommand` | interface | <code>interface RuntimeHumanWaitCreateCommand</code> | Runtime Human Wait Create Command interface with 10 public fields or methods. |
| `RuntimeHumanWaitResolveCommand` | interface | <code>interface RuntimeHumanWaitResolveCommand</code> | Runtime Human Wait Resolve Command interface with 11 public fields or methods. |
| `RuntimeHumanWaitResult` | interface | <code>interface RuntimeHumanWaitResult</code> | Runtime Human Wait Result interface with 5 public fields or methods. |
| `RuntimeHumanWaitServiceOptions` | interface | <code>interface RuntimeHumanWaitServiceOptions</code> | Runtime Human Wait Service Options interface with 6 public fields or methods. |
| `RuntimeHumanWaitSupersedeCommand` | interface | <code>interface RuntimeHumanWaitSupersedeCommand</code> | Runtime Human Wait Supersede Command interface with 11 public fields or methods. |

## `RuntimeHumanWaitService`

Runtime Human Wait Service class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeHumanWaitService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export declare class RuntimeHumanWaitService {
    constructor(options: RuntimeHumanWaitServiceOptions);
    create(input: RuntimeHumanWaitCreateCommand): Promise<RuntimeHumanWaitResult>;
    resolve(input: RuntimeHumanWaitResolveCommand): Promise<RuntimeHumanWaitResult>;
    supersede(input: RuntimeHumanWaitSupersedeCommand): Promise<RuntimeHumanWaitResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: RuntimeHumanWaitCreateCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(input: RuntimeHumanWaitResolveCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `supersede` | method | <code>supersede(input: RuntimeHumanWaitSupersedeCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeHumanWaitCreateCommand`

Runtime Human Wait Create Command interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanWaitCreateCommand } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export interface RuntimeHumanWaitCreateCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId: string;
    pendingActionRef: string;
    reason: string;
    requestedAt: string;
    humanTasks?: RuntimeHumanTaskRequest[];
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanTasks` | property | <code>humanTasks?: RuntimeHumanTaskRequest[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanWaitResolveCommand`

Runtime Human Wait Resolve Command interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanWaitResolveCommand } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export interface RuntimeHumanWaitResolveCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId?: string;
    pendingActionRef: string;
    principalId: string;
    decision: 'approved' | 'rejected' | 'expired' | 'cancelled';
    resolvedAt: string;
    humanTaskDecision?: RuntimeHumanTaskDecisionCommand;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanTaskDecision` | property | <code>humanTaskDecision?: RuntimeHumanTaskDecisionCommand</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedAt` | property | <code>resolvedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanWaitResult`

Runtime Human Wait Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanWaitResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export interface RuntimeHumanWaitResult {
    commandId: string;
    disposition: 'applied' | 'reused' | 'lease_unavailable';
    eventIds: string[];
    runRevision: number;
    projection: RuntimeOrchestrationProjection;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanWaitServiceOptions`

Runtime Human Wait Service Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanWaitServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export interface RuntimeHumanWaitServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: EventRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextId` | method | <code>nextId?(namespace: string): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projections` | property | <code>projections: ProjectionEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionStore` | property | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanWaitSupersedeCommand`

Runtime Human Wait Supersede Command interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanWaitSupersedeCommand } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### Declaration

```text
export interface RuntimeHumanWaitSupersedeCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId?: string;
    pendingActionRef: string;
    principalId: string;
    supersededAt: string;
    humanTaskDecision: RuntimeHumanTaskDecisionCommand;
    replacementTask: RuntimeHumanTaskRequest;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanTaskDecision` | property | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replacementTask` | property | <code>replacementTask: RuntimeHumanTaskRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supersededAt` | property | <code>supersededAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
