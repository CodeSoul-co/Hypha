# `@codesoul-co/hypha-adapters-local` / `in-memory-active-execution-registry`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-active-execution-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)
- Exports: **2**

## Using this module

Use the In memory active execution registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalActiveExecutionRegistry,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ActiveLocalExecutionHandle,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalActiveExecutionRegistry` | class | <code>new LocalActiveExecutionRegistry(): InMemoryActiveExecutionRegistry</code> | Coordinates active executions without owning Sandbox or provider process semantics. |
| `ActiveLocalExecutionHandle` | interface | <code>interface ActiveLocalExecutionHandle</code> | Active Local Execution Handle interface with 3 public fields or methods. |

## `LocalActiveExecutionRegistry`

Coordinates active executions without owning Sandbox or provider process semantics.

- Kind: class
- Import: `import { LocalActiveExecutionRegistry } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-active-execution-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)

### Declaration

```text
export declare class InMemoryActiveExecutionRegistry {
    begin(executionId: string, sandboxId: string): ActiveExecutionHandle;
    sandboxId(executionId: string): string | undefined;
    cancel(request: ExecutionCancelRequest): Promise<void>;
    abortSandbox(sandboxId: string, reason: string): Promise<void>;
    complete(executionId: string): void;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSandbox` | method | <code>abortSandbox(sandboxId: string, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `begin` | method | <code>begin(executionId: string, sandboxId: string): ActiveExecutionHandle</code> | Public method; parameters and return type are shown in the signature. |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(executionId: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryActiveExecutionRegistry</code> | Creates an instance of this class. |
| `sandboxId` | method | <code>sandboxId(executionId: string): string &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |

## `ActiveLocalExecutionHandle`

Active Local Execution Handle interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ActiveLocalExecutionHandle } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-active-execution-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)

### Declaration

```text
export interface ActiveExecutionHandle {
    sandboxId: string;
    revision: number;
    signal: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
