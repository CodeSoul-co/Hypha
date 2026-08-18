# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store-foundation`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-execution-store-foundation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-foundation.ts)
- Exports: **1**

## Using this module

Use the Sqlite execution store foundation module for persisting and reading data at this boundary. It exports 1 class.

### Import from the package entrypoint

```ts
import {
  SQLiteExecutionStoreError,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteExecutionStoreError` | class | <code>new SQLiteExecutionStoreError(code: SQLiteExecutionStoreFoundationErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined, cause?: unknown): SQLiteExecutionStoreFoundationError</code> | SQLite Execution Store Error class with 10 public constructor or member entries; its exact declarations are listed below. |

## `SQLiteExecutionStoreError`

SQLite Execution Store Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteExecutionStoreError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-execution-store-foundation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-foundation.ts)

### Declaration

```text
export declare class SQLiteExecutionStoreFoundationError extends Error {
    readonly code: SQLiteExecutionStoreFoundationErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: SQLiteExecutionStoreFoundationErrorCode, message: string, details?: Record<string, unknown> | undefined, cause?: unknown);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: SQLiteExecutionStoreFoundationErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: SQLiteExecutionStoreFoundationErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined, cause?: unknown): SQLiteExecutionStoreFoundationError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
