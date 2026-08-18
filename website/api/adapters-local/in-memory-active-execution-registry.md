# `@codesoul-co/hypha-adapters-local` / `in-memory-active-execution-registry`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-active-execution-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-active-execution-registry.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalActiveExecutionRegistry` | class | <code>new LocalActiveExecutionRegistry(): InMemoryActiveExecutionRegistry</code> | Coordinates active executions without owning Sandbox or provider process semantics. |
| `ActiveLocalExecutionHandle` | interface | <code>interface ActiveLocalExecutionHandle</code> | Field contract for Active Local Execution Handle; see all contract members below. |

## `LocalActiveExecutionRegistry` public members

Coordinates active executions without owning Sandbox or provider process semantics.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSandbox` | method | <code>abortSandbox(sandboxId: string, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for abort Sandbox. |
| `begin` | method | <code>begin(executionId: string, sandboxId: string): ActiveExecutionHandle</code> | Public runtime operation for begin. |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `complete` | method | <code>complete(executionId: string): void</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(): InMemoryActiveExecutionRegistry</code> | Creates an instance of this class. |
| `sandboxId` | method | <code>sandboxId(executionId: string): string &#124; undefined</code> | Public runtime operation for sandbox Id. |

## `ActiveLocalExecutionHandle` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
