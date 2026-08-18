# `@codesoul-co/hypha-core` / `errors`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/errors.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/errors.ts)
- Exports: **3**

## Using this module

Use the Errors module for normalizing, classifying, or exposing error contracts. It exports 1 class, 1 function, 1 interface.

### Import from the package entrypoint

```ts
import {
  FrameworkError,
  isFrameworkError,
} from '@codesoul-co/hypha-core';

import type {
  FrameworkErrorInit,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FrameworkError` | class | <code>new FrameworkError(init: FrameworkErrorInit): FrameworkError</code> | Framework Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `isFrameworkError` | function | <code>isFrameworkError(error: unknown): error is FrameworkError</code> | Is Framework Error function with 1 public call signature; parameters and return types are listed below. |
| `FrameworkErrorInit` | interface | <code>interface FrameworkErrorInit</code> | Framework Error Init interface with 4 public fields or methods. |

## `FrameworkError`

Framework Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FrameworkError } from '@codesoul-co/hypha-core';`
- Source module: [`errors`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/errors.ts)

### Declaration

```text
export declare class FrameworkError extends Error {
    readonly code: string;
    readonly context?: Record<string, unknown>;
    readonly cause?: unknown;
    constructor(init: FrameworkErrorInit);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>readonly cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(init: FrameworkErrorInit): FrameworkError</code> | Creates an instance of this class. |
| `context` | property | <code>readonly context?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `isFrameworkError`

Is Framework Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isFrameworkError } from '@codesoul-co/hypha-core';`
- Source module: [`errors`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/errors.ts)

### Declaration

```text
export declare function isFrameworkError(error: unknown): error is FrameworkError;
```

### Call signature

```text
isFrameworkError(error: unknown): error is FrameworkError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `error is FrameworkError`
- Description: The return contract is defined by the type shown above.

## `FrameworkErrorInit`

Framework Error Init interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { FrameworkErrorInit } from '@codesoul-co/hypha-core';`
- Source module: [`errors`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/errors.ts)

### Declaration

```text
export interface FrameworkErrorInit {
    code: string;
    message: string;
    context?: Record<string, unknown>;
    cause?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
