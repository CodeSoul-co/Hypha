# `@codesoul-co/hypha-memory` / `managed-search-cache`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/managed-search-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-search-cache.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedMemoryManagementProvider` | class | <code>new CachedMemoryManagementProvider(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect. |
| `InMemoryMemorySearchCacheStore` | class | <code>new InMemoryMemorySearchCacheStore(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | Runtime implementation for In Memory Memory Search Cache Store; see its public constructor and members below. |
| `RedisMemorySearchCacheStore` | class | <code>new RedisMemorySearchCacheStore(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Shared Store for local, self-hosted, or managed Redis-compatible deployments. |
| `managedMemorySearchResultSchema` | constant | <code>const managedMemorySearchResultSchema: z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumber; type: z.ZodEnum&lt;["working", "episodic", "semantic", "procedural", "preference", "artifact", "governance", "reflection", "custom"]&gt;; subtype: z.ZodOptional&lt;z.ZodString&gt;; content: z.ZodUnknown; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodSt...</code> | Runtime schema for managed Memory Search Result. |
| `memorySearchCacheRecordSchema` | constant | <code>const memorySearchCacheRecordSchema: z.ZodEffects&lt;z.ZodObject&lt;{ schemaVersion: z.ZodLiteral&lt;"1.0"&gt;; keyVersion: z.ZodLiteral&lt;"1"&gt;; key: z.ZodString; scopeHash: z.ZodString; scopeRevision: z.ZodString; requestHash: z.ZodString; profileRevision: z.ZodString; providerRevision: z.ZodString; results: z.ZodArray&lt;z.ZodObject&lt;{ record: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; versionId: z.ZodString; revision: z.ZodNumb...</code> | Runtime schema for memory Search Cache Record. |
| `composeMemorySearchCacheProvider` | function | <code>composeMemorySearchCacheProvider(options: MemorySearchCacheCompositionOptions): MemoryManagementProvider</code> | Explicit product-composition boundary for Search Cache mode. Disabled mode returns the canonical provider without opening or consulting a Cache Store. |
| `validateManagedMemorySearchResults` | function | <code>validateManagedMemorySearchResults(input: unknown): ManagedMemorySearchResult[]</code> | Validates Managed Memory Search Results at this module boundary. |
| `validateMemorySearchCacheRecord` | function | <code>validateMemorySearchCacheRecord(input: unknown, maxEntryBytes?: number): MemorySearchCacheRecord</code> | Validates Memory Search Cache Record at this module boundary. |
| `CachedMemoryManagementProviderOptions` | interface | <code>interface CachedMemoryManagementProviderOptions</code> | Field contract for Cached Memory Management Provider Options; see all contract members below. |
| `InMemoryMemorySearchCacheOptions` | interface | <code>interface InMemoryMemorySearchCacheOptions</code> | Field contract for In Memory Memory Search Cache Options; see all contract members below. |
| `MemorySearchCacheAuthorizationDecision` | interface | <code>interface MemorySearchCacheAuthorizationDecision</code> | Field contract for Memory Search Cache Authorization Decision; see all contract members below. |
| `MemorySearchCacheAuthorizationPort` | interface | <code>interface MemorySearchCacheAuthorizationPort</code> | Field contract for Memory Search Cache Authorization Port; see all contract members below. |
| `MemorySearchCacheEvent` | interface | <code>interface MemorySearchCacheEvent</code> | Field contract for Memory Search Cache Event; see all contract members below. |
| `MemorySearchCacheStore` | interface | <code>interface MemorySearchCacheStore</code> | Field contract for Memory Search Cache Store; see all contract members below. |
| `RedisLikeMemorySearchCacheClient` | interface | <code>interface RedisLikeMemorySearchCacheClient</code> | Field contract for Redis Like Memory Search Cache Client; see all contract members below. |
| `RedisMemorySearchCacheOptions` | interface | <code>interface RedisMemorySearchCacheOptions</code> | Field contract for Redis Memory Search Cache Options; see all contract members below. |
| `MemorySearchCacheCompositionOptions` | type | <code>type MemorySearchCacheCompositionOptions = { mode: 'disabled'; provider: MemoryManagementProvider; } &#124; (CachedMemoryManagementProviderOptions &amp; { mode: 'enabled'; })</code> | Public type alias for Memory Search Cache Composition Options. |
| `MemorySearchCacheFailureMode` | type | <code>type MemorySearchCacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Memory Search Cache Failure Mode. |
| `MemorySearchCacheMode` | type | <code>type MemorySearchCacheMode = 'enabled' &#124; 'disabled'</code> | Public type alias for Memory Search Cache Mode. |
| `MemorySearchCacheRecord` | type | <code>type MemorySearchCacheRecord = z.infer&lt;typeof memorySearchCacheRecordSchema&gt;</code> | Public type alias for Memory Search Cache Record. |

## `CachedMemoryManagementProvider` public members

Managed-memory read-through cache. Mutations always execute against the provider first and then invalidate the exact scope. Access-stat searches are never cached because a hit would skip their intended write side effect.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;import("./contracts").MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: CachedMemoryManagementProviderOptions): CachedMemoryManagementProvider</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(rawRequest: ManagedMemorySearchRequest): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `InMemoryMemorySearchCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options?: InMemoryMemorySearchCacheOptions): InMemoryMemorySearchCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Gets Scope Revision at this module boundary. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, rawRecord: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `stats` | method | <code>stats(): { entries: number; sizeBytes: number; evictions: number; }</code> | Public runtime operation for stats. |

## `RedisMemorySearchCacheStore` public members

Shared Store for local, self-hosted, or managed Redis-compatible deployments.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisMemorySearchCacheOptions): RedisMemorySearchCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Gets Scope Revision at this module boundary. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, input: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `CachedMemoryManagementProviderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache: MemorySearchCacheStore</code> | Public cache property. |
| `cacheAuthorization` | property | <code>cacheAuthorization: MemorySearchCacheAuthorizationPort</code> | Public cache Authorization property. |
| `failureMode` | property | <code>failureMode: MemorySearchCacheFailureMode</code> | Public failure Mode property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `maxScopeRevisionRetries` | property | <code>maxScopeRevisionRetries: number</code> | Public max Scope Revision Retries property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `operationTimeoutMs` | property | <code>operationTimeoutMs: number</code> | Public operation Timeout Ms property. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public provider property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `requireCacheAuthorization` | property | <code>requireCacheAuthorization: boolean</code> | Public require Cache Authorization property. |
| `requiredScopeFields` | property | <code>requiredScopeFields: readonly (keyof ManagedMemoryScope)[]</code> | Public required Scope Fields property. |
| `singleflight` | property | <code>singleflight: boolean</code> | Public singleflight property. |
| `trace` | method | <code>trace(event: MemorySearchCacheEvent): Promise&lt;void&gt; &#124; void</code> | Public runtime operation for trace. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |

## `InMemoryMemorySearchCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |

## `MemorySearchCacheAuthorizationDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |

## `MemorySearchCacheAuthorizationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(request: ManagedMemorySearchRequest): Promise&lt;MemorySearchCacheAuthorizationDecision&gt;</code> | Public runtime operation for authorize. |

## `MemorySearchCacheEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs: number</code> | Public age Ms property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `reason` | property | <code>reason: "not_found" &#124; "expired" &#124; "scope_mismatch" &#124; "store_unavailable" &#124; "entry_oversized" &#124; "corrupt" &#124; "revision_changed" &#124; "access_stats_requested" &#124; "profile_revision_missing" &#124; "scope_incomplete" &#124; "invalidation_pending"</code> | Public reason property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `type` | property | <code>type: "memory.cache.lookup" &#124; "memory.cache.hit" &#124; "memory.cache.miss" &#124; "memory.cache.write" &#124; "memory.cache.invalidate" &#124; "memory.cache.bypass"</code> | Public type property. |

## `MemorySearchCacheStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;MemorySearchCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `getScopeRevision` | method | <code>getScopeRevision(scopeHash: string): Promise&lt;string&gt;</code> | Gets Scope Revision at this module boundary. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public runtime operation for invalidate Scope. |
| `set` | method | <code>set(key: string, record: MemorySearchCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `RedisLikeMemorySearchCacheClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `incr` | method | <code>incr(key: string): Promise&lt;number&gt;</code> | Public runtime operation for incr. |
| `pexpire` | method | <code>pexpire(key: string, durationMilliseconds: number): Promise&lt;number&gt;</code> | Public runtime operation for pexpire. |
| `sadd` | method | <code>sadd(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public runtime operation for sadd. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |
| `smembers` | method | <code>smembers(key: string): Promise&lt;string[]&gt;</code> | Public runtime operation for smembers. |
| `srem` | method | <code>srem(key: string, ...members: string[]): Promise&lt;number&gt;</code> | Public runtime operation for srem. |

## `RedisMemorySearchCacheOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeMemorySearchCacheClient</code> | Public client property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
