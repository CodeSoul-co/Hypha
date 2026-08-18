# `@codesoul-co/hypha-models` / `router`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Package guide: [learning and composition guide](/packages/models)
- Source: [`packages/models/src/router.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ModelAliasRegistry` | class | <code>new ModelAliasRegistry(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Runtime implementation for Model Alias Registry; see its public constructor and members below. |
| `ModelProviderError` | class | <code>new ModelProviderError(init: ModelProviderErrorInit): ModelProviderError</code> | Runtime implementation for Model Provider Error; see its public constructor and members below. |
| `ModelRouter` | class | <code>new ModelRouter(options: ModelRouterOptions): ModelRouter</code> | Runtime implementation for Model Router; see its public constructor and members below. |
| `normalizeModelProviderError` | function | <code>normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError</code> | Normalizes Model Provider Error at this module boundary. |
| `parseModelTarget` | function | <code>parseModelTarget(target: string): Pick&lt;ResolvedModelRoute, "providerId" &#124; "providerModel"&gt; &#124; null</code> | Parses and validates Model Target at this module boundary. |
| `ModelProviderErrorInit` | interface | <code>interface ModelProviderErrorInit</code> | Field contract for Model Provider Error Init; see all contract members below. |
| `ModelRouterOptions` | interface | <code>interface ModelRouterOptions</code> | Field contract for Model Router Options; see all contract members below. |
| `NormalizedProviderErrorContext` | interface | <code>interface NormalizedProviderErrorContext</code> | Field contract for Normalized Provider Error Context; see all contract members below. |
| `ResolvedModelRoute` | interface | <code>interface ResolvedModelRoute</code> | Field contract for Resolved Model Route; see all contract members below. |
| `ModelProviderErrorCode` | type | <code>type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' &#124; 'MODEL_PROVIDER_HTTP_ERROR' &#124; 'MODEL_PROVIDER_TIMEOUT' &#124; 'MODEL_PROVIDER_RATE_LIMITED' &#124; 'MODEL_PROVIDER_AUTH_FAILED' &#124; 'MODEL_PROVIDER_BAD_REQUEST' &#124; 'MODEL_PROVIDER_STREAM_ERROR' &#124; 'MODEL_PROVIDER_NOT_FOUND' &#124; 'MODEL_ALIAS_NOT_FOUND' &#124; 'MODEL_ROUTING_FAILED'</code> | Public type alias for Model Provider Error Code. |

## `ModelAliasRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Creates an instance of this class. |
| `list` | method | <code>list(): ModelAliasSpec[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(alias: ModelAliasSpec): void</code> | Registers register at this module boundary. |
| `registerTarget` | method | <code>registerTarget(alias: string, target: string, version?: string): ModelAliasSpec</code> | Registers Target at this module boundary. |
| `resolve` | method | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | Resolves resolve at this module boundary. |

## `ModelProviderError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: ModelProviderErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(init: ModelProviderErrorInit): ModelProviderError</code> | Creates an instance of this class. |
| `context` | property | <code>context: Record&lt;string, unknown&gt;</code> | Public context property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `raw` | property | <code>raw: unknown</code> | Public raw property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `status` | property | <code>status: number</code> | Public status property. |

## `ModelRouter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public runtime operation for capabilities. |
| `constructor` | constructor | <code>(options: ModelRouterOptions): ModelRouter</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public runtime operation for generate. |
| `id` | property | <code>id: string</code> | Public id property. |
| `listAliases` | method | <code>listAliases(): ModelAliasSpec[]</code> | Lists Aliases at this module boundary. |
| `resolve` | method | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | Resolves resolve at this module boundary. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public runtime operation for stream. |

## `ModelProviderErrorInit` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: ModelProviderErrorCode</code> | Public code property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `raw` | property | <code>raw: unknown</code> | Public raw property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |
| `status` | property | <code>status: number</code> | Public status property. |

## `ModelRouterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases: ModelAliasSpec[]</code> | Public aliases property. |
| `fallbackAliases` | property | <code>fallbackAliases: string[]</code> | Public fallback Aliases property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `registry` | property | <code>registry: Pick&lt;ModelRegistry, "list" &#124; "get"&gt;</code> | Public registry property. |
| `routing` | property | <code>routing: ModelRoutingSpec</code> | Public routing property. |

## `NormalizedProviderErrorContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `operation` | property | <code>operation: "generate" &#124; "stream" &#124; "count_tokens" &#124; "health"</code> | Public operation property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |

## `ResolvedModelRoute` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alias` | property | <code>alias: string</code> | Public alias property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerModel` | property | <code>providerModel: string</code> | Public provider Model property. |
| `spec` | property | <code>spec: ModelAliasSpec</code> | Public spec property. |
