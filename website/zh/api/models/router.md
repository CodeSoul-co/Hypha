# `@codesoul-co/hypha-models` / `router`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 模块指南: [学习与组合说明](/zh/packages/models)
- 源码: [`packages/models/src/router.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ModelAliasRegistry` | 类 | <code>new ModelAliasRegistry(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Model Alias Registry 的运行时实现；公开构造函数与成员见下表。 |
| `ModelProviderError` | 类 | <code>new ModelProviderError(init: ModelProviderErrorInit): ModelProviderError</code> | Model Provider Error 的运行时实现；公开构造函数与成员见下表。 |
| `ModelRouter` | 类 | <code>new ModelRouter(options: ModelRouterOptions): ModelRouter</code> | Model Router 的运行时实现；公开构造函数与成员见下表。 |
| `normalizeModelProviderError` | 函数 | <code>normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError</code> | 规范化 Model Provider Error。 |
| `parseModelTarget` | 函数 | <code>parseModelTarget(target: string): Pick&lt;ResolvedModelRoute, "providerId" &#124; "providerModel"&gt; &#124; null</code> | 解析并校验 Model Target。 |
| `ModelProviderErrorInit` | 接口 | <code>interface ModelProviderErrorInit</code> | Model Provider Error Init 的字段契约；完整字段见下表。 |
| `ModelRouterOptions` | 接口 | <code>interface ModelRouterOptions</code> | Model Router Options 的字段契约；完整字段见下表。 |
| `NormalizedProviderErrorContext` | 接口 | <code>interface NormalizedProviderErrorContext</code> | Normalized Provider Error Context 的字段契约；完整字段见下表。 |
| `ResolvedModelRoute` | 接口 | <code>interface ResolvedModelRoute</code> | Resolved Model Route 的字段契约；完整字段见下表。 |
| `ModelProviderErrorCode` | 类型 | <code>type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' &#124; 'MODEL_PROVIDER_HTTP_ERROR' &#124; 'MODEL_PROVIDER_TIMEOUT' &#124; 'MODEL_PROVIDER_RATE_LIMITED' &#124; 'MODEL_PROVIDER_AUTH_FAILED' &#124; 'MODEL_PROVIDER_BAD_REQUEST' &#124; 'MODEL_PROVIDER_STREAM_ERROR' &#124; 'MODEL_PROVIDER_NOT_FOUND' &#124; 'MODEL_ALIAS_NOT_FOUND' &#124; 'MODEL_ROUTING_FAILED'</code> | Model Provider Error Code 的公共类型别名。 |

## `ModelAliasRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(): ModelAliasSpec[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(alias: ModelAliasSpec): void</code> | 注册 register。 |
| `registerTarget` | 方法 | <code>registerTarget(alias: string, target: string, version?: string): ModelAliasSpec</code> | 注册 Target。 |
| `resolve` | 方法 | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | 解析 resolve。 |

## `ModelProviderError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: ModelProviderErrorCode</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(init: ModelProviderErrorInit): ModelProviderError</code> | 创建该类的实例。 |
| `context` | 属性 | <code>context: Record&lt;string, unknown&gt;</code> | context 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `raw` | 属性 | <code>raw: unknown</code> | raw 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `status` | 属性 | <code>status: number</code> | status 字段。 |

## `ModelRouter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | capabilities 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: ModelRouterOptions): ModelRouter</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | generate 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `listAliases` | 方法 | <code>listAliases(): ModelAliasSpec[]</code> | 列出 Aliases。 |
| `resolve` | 方法 | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | 解析 resolve。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | stream 的公开运行时操作。 |

## `ModelProviderErrorInit` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: ModelProviderErrorCode</code> | code 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `raw` | 属性 | <code>raw: unknown</code> | raw 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |
| `status` | 属性 | <code>status: number</code> | status 字段。 |

## `ModelRouterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases: ModelAliasSpec[]</code> | aliases 字段。 |
| `fallbackAliases` | 属性 | <code>fallbackAliases: string[]</code> | fallback Aliases 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `registry` | 属性 | <code>registry: Pick&lt;ModelRegistry, "list" &#124; "get"&gt;</code> | registry 字段。 |
| `routing` | 属性 | <code>routing: ModelRoutingSpec</code> | routing 字段。 |

## `NormalizedProviderErrorContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `operation` | 属性 | <code>operation: "generate" &#124; "stream" &#124; "count_tokens" &#124; "health"</code> | operation 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |

## `ResolvedModelRoute` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alias` | 属性 | <code>alias: string</code> | alias 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerModel` | 属性 | <code>providerModel: string</code> | provider Model 字段。 |
| `spec` | 属性 | <code>spec: ModelAliasSpec</code> | spec 字段。 |
