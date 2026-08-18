# `@codesoul-co/hypha-core` / `modules/execution-port/governed-execution-port`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-port/governed-execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)
- Exports: **1**

## Using this module

Use the Governed execution port module for defining or implementing provider-neutral ports. It exports 1 class.

### Import from the package entrypoint

```ts
import {
  GovernedExecutionPort,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedExecutionPort` | class | <code>new GovernedExecutionPort(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Governed Execution Port class with 2 public constructor or member entries; its exact declarations are listed below. |

## `GovernedExecutionPort`

Governed Execution Port class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { GovernedExecutionPort } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-port/governed-execution-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)

### Declaration

```text
export declare class GovernedExecutionPort implements ExecutionPort {
    constructor(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () => string);
    execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise<ExecutionActivityResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
