# `@codesoul-co/hypha-models` / `router`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Source: [`packages/models/src/router.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)
- Exports: **10**

## Using this module

Use the Router module for using the public contracts and operations for this capability boundary. It exports 3 classes, 2 functions, 4 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  ModelAliasRegistry,
  ModelProviderError,
  ModelRouter,
  normalizeModelProviderError,
  parseModelTarget,
} from '@codesoul-co/hypha-models';

import type {
  ModelProviderErrorInit,
  ModelRouterOptions,
  NormalizedProviderErrorContext,
  ResolvedModelRoute,
  ModelProviderErrorCode,
} from '@codesoul-co/hypha-models';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ModelAliasRegistry` | class | <code>new ModelAliasRegistry(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Model Alias Registry class with 5 public constructor or member entries; its exact declarations are listed below. |
| `ModelProviderError` | class | <code>new ModelProviderError(init: ModelProviderErrorInit): ModelProviderError</code> | Model Provider Error class with 15 public constructor or member entries; its exact declarations are listed below. |
| `ModelRouter` | class | <code>new ModelRouter(options: ModelRouterOptions): ModelRouter</code> | Model Router class with 7 public constructor or member entries; its exact declarations are listed below. |
| `normalizeModelProviderError` | function | <code>normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError</code> | Normalize Model Provider Error function with 1 public call signature; parameters and return types are listed below. |
| `parseModelTarget` | function | <code>parseModelTarget(target: string): Pick&lt;ResolvedModelRoute, "providerId" &#124; "providerModel"&gt; &#124; null</code> | Parse Model Target function with 1 public call signature; parameters and return types are listed below. |
| `ModelProviderErrorInit` | interface | <code>interface ModelProviderErrorInit</code> | Model Provider Error Init interface with 8 public fields or methods. |
| `ModelRouterOptions` | interface | <code>interface ModelRouterOptions</code> | Model Router Options interface with 5 public fields or methods. |
| `NormalizedProviderErrorContext` | interface | <code>interface NormalizedProviderErrorContext</code> | Normalized Provider Error Context interface with 3 public fields or methods. |
| `ResolvedModelRoute` | interface | <code>interface ResolvedModelRoute</code> | Resolved Model Route interface with 4 public fields or methods. |
| `ModelProviderErrorCode` | type | <code>type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' &#124; 'MODEL_PROVIDER_HTTP_ERROR' &#124; 'MODEL_PROVIDER_TIMEOUT' &#124; 'MODEL_PROVIDER_RATE_LIMITED' &#124; 'MODEL_PROVIDER_AUTH_FAILED' &#124; 'MODEL_PROVIDER_BAD_REQUEST' &#124; 'MODEL_PROVIDER_STREAM_ERROR' &#124; 'MODEL_PROVIDER_NOT_FOUND' &#124; 'MODEL_ALIAS_NOT_FOUND' &#124; 'MODEL_ROUTING_FAILED'</code> | Public type alias for Model Provider Error Code; the declaration contains its complete type expression. |

## `ModelAliasRegistry`

Model Alias Registry class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ModelAliasRegistry } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export declare class ModelAliasRegistry {
    constructor(aliases?: ModelAliasSpec[]);
    register(alias: ModelAliasSpec): void;
    registerTarget(alias: string, target: string, version?: string): ModelAliasSpec;
    resolve(aliasOrTarget: string): ResolvedModelRoute;
    list(): ModelAliasSpec[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Creates an instance of this class. |
| `list` | method | <code>list(): ModelAliasSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(alias: ModelAliasSpec): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerTarget` | method | <code>registerTarget(alias: string, target: string, version?: string): ModelAliasSpec</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | Public method; parameters and return type are shown in the signature. |

## `ModelProviderError`

Model Provider Error class with 15 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ModelProviderError } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export declare class ModelProviderError extends FrameworkError {
    readonly code: ModelProviderErrorCode;
    readonly providerId?: string;
    readonly modelAlias?: string;
    readonly status?: number;
    readonly retryable: boolean;
    readonly raw?: unknown;
    constructor(init: ModelProviderErrorInit);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>readonly cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: ModelProviderErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(init: ModelProviderErrorInit): ModelProviderError</code> | Creates an instance of this class. |
| `context` | property | <code>readonly context?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>readonly modelAlias?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>readonly providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `raw` | property | <code>readonly raw?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>readonly retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `status` | property | <code>readonly status?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelRouter`

Model Router class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ModelRouter } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export declare class ModelRouter implements ModelProvider<ModelRequest, ModelResponse> {
    readonly id: string;
    constructor(options: ModelRouterOptions);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
    resolve(aliasOrTarget: string): ResolvedModelRoute;
    listAliases(): ModelAliasSpec[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: ModelRouterOptions): ModelRouter</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `listAliases` | method | <code>listAliases(): ModelAliasSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `normalizeModelProviderError`

Normalize Model Provider Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeModelProviderError } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export declare function normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError;
```

### Call signature

```text
normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>NormalizedProviderErrorContext</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelProviderError`
- Description: The return contract is defined by the type shown above.

## `parseModelTarget`

Parse Model Target function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseModelTarget } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export declare function parseModelTarget(target: string): Pick<ResolvedModelRoute, 'providerId' | 'providerModel'> | null;
```

### Call signature

```text
parseModelTarget(target: string): Pick<ResolvedModelRoute, "providerId" | "providerModel"> | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `target` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Pick<ResolvedModelRoute, "providerId" | "providerModel">`
- Description: The return contract is defined by the type shown above.

## `ModelProviderErrorInit`

Model Provider Error Init interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ModelProviderErrorInit } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export interface ModelProviderErrorInit {
    code: ModelProviderErrorCode;
    message: string;
    providerId?: string;
    modelAlias?: string;
    status?: number;
    retryable?: boolean;
    raw?: unknown;
    cause?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: ModelProviderErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `raw` | property | <code>raw?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelRouterOptions`

Model Router Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ModelRouterOptions } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export interface ModelRouterOptions {
    id?: string;
    registry: Pick<ModelRegistry, 'get' | 'list'>;
    aliases?: ModelAliasSpec[];
    routing?: ModelRoutingSpec;
    fallbackAliases?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases?: ModelAliasSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackAliases` | property | <code>fallbackAliases?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `registry` | property | <code>registry: Pick&lt;ModelRegistry, "list" &#124; "get"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `routing` | property | <code>routing?: ModelRoutingSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedProviderErrorContext`

Normalized Provider Error Context interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedProviderErrorContext } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export interface NormalizedProviderErrorContext {
    providerId?: string;
    modelAlias?: string;
    operation?: 'generate' | 'stream' | 'count_tokens' | 'health';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `modelAlias` | property | <code>modelAlias?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation?: "generate" &#124; "stream" &#124; "count_tokens" &#124; "health"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedModelRoute`

Resolved Model Route interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedModelRoute } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export interface ResolvedModelRoute {
    alias: string;
    providerId: string;
    providerModel: string;
    spec?: ModelAliasSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alias` | property | <code>alias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerModel` | property | <code>providerModel: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec?: ModelAliasSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelProviderErrorCode`

Public type alias for Model Provider Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ModelProviderErrorCode } from '@codesoul-co/hypha-models';`
- Source module: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### Declaration

```text
export type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' | 'MODEL_PROVIDER_HTTP_ERROR' | 'MODEL_PROVIDER_TIMEOUT' | 'MODEL_PROVIDER_RATE_LIMITED' | 'MODEL_PROVIDER_AUTH_FAILED' | 'MODEL_PROVIDER_BAD_REQUEST' | 'MODEL_PROVIDER_STREAM_ERROR' | 'MODEL_PROVIDER_NOT_FOUND' | 'MODEL_ALIAS_NOT_FOUND' | 'MODEL_ROUTING_FAILED';
```
