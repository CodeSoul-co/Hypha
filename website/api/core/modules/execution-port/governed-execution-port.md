# `@codesoul-co/hypha-core` / `modules/execution-port/governed-execution-port`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-port/governed-execution-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/governed-execution-port.ts)
- Exports: **1**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedExecutionPort` | class | <code>new GovernedExecutionPort(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Runtime implementation for Governed Execution Port; see its public constructor and members below. |

## `GovernedExecutionPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(authorizationVerifier: ExecutionAuthorizationVerifier, dispatcher: ExecutionOperationDispatcher, now: () =&gt; string): GovernedExecutionPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(input: ExecutionDispatchRequest, abortSignal: AbortSignal): Promise&lt;ExecutionActivityResult&gt;</code> | Public runtime operation for execute. |
