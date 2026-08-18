# `@codesoul-co/hypha-inference` / `cache`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InferenceCacheManager` | class | <code>new InferenceCacheManager(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | Runtime implementation for Inference Cache Manager; see its public constructor and members below. |
| `InferenceCacheOperationTimeoutError` | class | <code>new InferenceCacheOperationTimeoutError(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | Runtime implementation for Inference Cache Operation Timeout Error; see its public constructor and members below. |
| `hashContent` | function | <code>hashContent(content: string): string</code> | Checks whether h Content at this module boundary. |
| `inferenceCacheScopeHash` | function | <code>inferenceCacheScopeHash(scope: InferenceCacheScope &#124; undefined): string</code> | Public runtime operation for inference Cache Scope Hash. |
| `isKvCacheExpired` | function | <code>isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean</code> | Checks Kv Cache Expired at this module boundary. |
| `runInferenceCacheOperation` | function | <code>runInferenceCacheOperation&lt;T&gt;(operation: InferenceCacheOperation, task: () =&gt; Promise&lt;T&gt;, timeoutMs: number): Promise&lt;T&gt;</code> | Public runtime operation for run Inference Cache Operation. |
| `InferenceCacheManagerOptions` | interface | <code>interface InferenceCacheManagerOptions</code> | Field contract for Inference Cache Manager Options; see all contract members below. |
| `KvCacheCreateInput` | interface | <code>interface KvCacheCreateInput</code> | Field contract for Kv Cache Create Input; see all contract members below. |
| `PrefixCacheCreateInput` | interface | <code>interface PrefixCacheCreateInput</code> | Field contract for Prefix Cache Create Input; see all contract members below. |
| `InferenceCacheOperation` | type | <code>type InferenceCacheOperation = 'prefix_read' &#124; 'prefix_write' &#124; 'kv_read' &#124; 'kv_write' &#124; 'invalidate'</code> | Public type alias for Inference Cache Operation. |

## `InferenceCacheManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | Creates an instance of this class. |
| `getKv` | method | <code>getKv(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | Gets Kv at this module boundary. |
| `getPrefix` | method | <code>getPrefix(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | Gets Prefix at this module boundary. |
| `putKv` | method | <code>putKv(input: KvCacheCreateInput, value: unknown): Promise&lt;KvCacheRef&gt;</code> | Public runtime operation for put Kv. |
| `putPrefix` | method | <code>putPrefix(input: PrefixCacheCreateInput): Promise&lt;PrefixCacheRef&gt;</code> | Public runtime operation for put Prefix. |

## `InferenceCacheOperationTimeoutError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "INFERENCE_CACHE_OPERATION_TIMEOUT"</code> | Public code property. |
| `constructor` | constructor | <code>(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `operation` | property | <code>operation: InferenceCacheOperation</code> | Public operation property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `InferenceCacheManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCache` | property | <code>kvCache: KvCacheProvider</code> | Public kv Cache property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs: number</code> | Public operation Timeout Ms property. |
| `prefixCache` | property | <code>prefixCache: PrefixCacheProvider</code> | Public prefix Cache property. |

## `KvCacheCreateInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `scope` | property | <code>scope: KvCacheScope</code> | Public scope property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `PrefixCacheCreateInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public token Count property. |
| `version` | property | <code>version: string</code> | Public version property. |
