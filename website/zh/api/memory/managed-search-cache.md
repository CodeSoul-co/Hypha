# `@codesoul-co/hypha-memory` / `managed-search-cache`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/managed-search-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedMemoryManagementProvider` | 类 | <code>new CachedMemoryManagementProvider(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect. |
| `InMemoryMemorySearchCacheStore` | 类 | <code>new InMemoryMemorySearchCacheStore(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | In Memory Memory Search Cache Store 的运行时实现；公开构造函数与成员见下表。 |
| `RedisMemorySearchCacheStore` | 类 | <code>new RedisMemorySearchCacheStore(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Shared Store for local, self-hosted, or managed Redis-compatible deployments. |
| `managedMemorySearchResultSchema` | 常量 | <code>const managedMemorySearchResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodSt...</code> | managed Memory Search Result 的运行时 Schema。 |
| `memorySearchCacheRecordSchema` | 常量 | <code>const memorySearchCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scopeHash: z.ZodString; scopeRevision: z.ZodString; requestHash: z.ZodString; profileRevision: z.ZodString; providerRevision: z.ZodString; results: z.ZodArray&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumb...</code> | memory Search Cache Record 的运行时 Schema。 |
| `composeMemorySearchCacheProvider` | 函数 | <code>composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider</code> | Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store. |
| `validateManagedMemorySearchResults` | 函数 | <code>validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]</code> | 校验 Managed Memory Search Results。 |
| `validateMemorySearchCacheRecord` | 函数 | <code>validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord</code> | 校验 Memory Search Cache Record。 |
| `CachedMemoryManagementProviderOptions` | 接口 | <code>interface CachedMemoryManagementProviderOptions</code> | Cached Memory Management Provider Options 的字段契约；完整字段见下表。 |
| `InMemoryMemorySearchCacheOptions` | 接口 | <code>interface InMemoryMemorySearchCacheOptions</code> | In Memory Memory Search Cache Options 的字段契约；完整字段见下表。 |
| `MemorySearchCacheAuthorizationDecision` | 接口 | <code>interface MemorySearchCacheAuthorizationDecision</code> | Memory Search Cache Authorization Decision 的字段契约；完整字段见下表。 |
| `MemorySearchCacheAuthorizationPort` | 接口 | <code>interface MemorySearchCacheAuthorizationPort</code> | Memory Search Cache Authorization Port 的字段契约；完整字段见下表。 |
| `MemorySearchCacheEvent` | 接口 | <code>interface MemorySearchCacheEvent</code> | Memory Search Cache Event 的字段契约；完整字段见下表。 |
| `MemorySearchCacheStore` | 接口 | <code>interface MemorySearchCacheStore</code> | Memory Search Cache Store 的字段契约；完整字段见下表。 |
| `RedisLikeMemorySearchCacheClient` | 接口 | <code>interface RedisLikeMemorySearchCacheClient</code> | Redis Like Memory Search Cache Client 的字段契约；完整字段见下表。 |
| `RedisMemorySearchCacheOptions` | 接口 | <code>interface RedisMemorySearchCacheOptions</code> | Redis Memory Search Cache Options 的字段契约；完整字段见下表。 |
| `MemorySearchCacheCompositionOptions` | 类型 | <code>type MemorySearchCacheCompositionOptions = { mode: 'disabled'; provider: MemoryManagementProvider; } &#124; (CachedMemoryManagementProviderOptions &amp; { mode: 'enabled'; })</code> | Memory Search Cache Composition Options 的公共类型别名。 |
| `MemorySearchCacheFailureMode` | 类型 | <code>type MemorySearchCacheFailureMode = 'bypass' &#124; 'strict'</code> | Memory Search Cache Failure Mode 的公共类型别名。 |
| `MemorySearchCacheMode` | 类型 | <code>type MemorySearchCacheMode = 'enabled' &#124; 'disabled'</code> | Memory Search Cache Mode 的公共类型别名。 |
| `MemorySearchCacheRecord` | 类型 | <code>type MemorySearchCacheRecord = z.infer&lt;typeof memorySearchCacheRecordSchema&gt;</code> | Memory Search Cache Record 的公共类型别名。 |

## `CachedMemoryManagementProvider` 公开成员

Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(rawRequest: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `InMemoryMemorySearchCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 读取 Scope Revision。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, rawRecord: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |
| `stats` | 方法 | <code>stats(): { entries: number; sizeBytes: number; evictions: number; }</code> | stats 的公开运行时操作。 |

## `RedisMemorySearchCacheStore` 公开成员

Shared Store for local, self-hosted, or managed Redis-compatible deployments.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 读取 Scope Revision。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, input: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `CachedMemoryManagementProviderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache: MemorySearchCacheStore</code> | cache 字段。 |
| `cacheAuthorization` | 属性 | <code>cacheAuthorization: MemorySearchCacheAuthorizationPort</code> | cache Authorization 字段。 |
| `failureMode` | 属性 | <code>failureMode: MemorySearchCacheFailureMode</code> | failure Mode 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `maxScopeRevisionRetries` | 属性 | <code>maxScopeRevisionRetries: number</code> | max Scope Revision Retries 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs: number</code> | operation Timeout Ms 字段。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | provider 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `requireCacheAuthorization` | 属性 | <code>requireCacheAuthorization: boolean</code> | require Cache Authorization 字段。 |
| `requiredScopeFields` | 属性 | <code>requiredScopeFields: readonly (keyof ManagedMemoryScope)[]</code> | required Scope Fields 字段。 |
| `singleflight` | 属性 | <code>singleflight: boolean</code> | singleflight 字段。 |
| `trace` | 方法 | <code>trace(event: MemorySearchCacheEvent): Promise&lt;void&gt; &#124; void</code> | trace 的公开运行时操作。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |

## `InMemoryMemorySearchCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |

## `MemorySearchCacheAuthorizationDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |

## `MemorySearchCacheAuthorizationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `authorize` | 方法 | <code>authorize(request: ManagedMemorySearchRequest): Promise&lt;MemorySearchCacheAuthorizationDecision&gt;</code> | authorize 的公开运行时操作。 |

## `MemorySearchCacheEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs: number</code> | age Ms 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `reason` | 属性 | <code>reason: "not_found" &#124; "expired" &#124; "scope_mismatch" &#124; "store_unavailable" &#124; "entry_oversized" &#124; "corrupt" &#124; "revision_changed" &#124; "access_stats_requested" &#124; "profile_revision_missing" &#124; "scope_incomplete" &#124; "invalidation_pending"</code> | reason 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `type` | 属性 | <code>type: "memory.cache.lookup" &#124; "memory.cache.hit" &#124; "memory.cache.miss" &#124; "memory.cache.write" &#124; "memory.cache.invalidate" &#124; "memory.cache.bypass"</code> | type 字段。 |

## `MemorySearchCacheStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `getScopeRevision` | 方法 | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | 读取 Scope Revision。 |
| `invalidateScope` | 方法 | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | invalidate Scope 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, record: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `RedisLikeMemorySearchCacheClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `incr` | 方法 | <code>incr(key: string): Promise&lt;number&gt;</code> | incr 的公开运行时操作。 |
| `pexpire` | 方法 | <code>pexpire(key: string, durationMilliseconds: number): Promise&lt;number&gt;</code> | pexpire 的公开运行时操作。 |
| `sadd` | 方法 | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | sadd 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | 写入 set。 |
| `smembers` | 方法 | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | smembers 的公开运行时操作。 |
| `srem` | 方法 | <code>srem(key: string, ...members: string[]): Promise&lt;number&gt;</code> | srem 的公开运行时操作。 |

## `RedisMemorySearchCacheOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeMemorySearchCacheClient</code> | client 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
