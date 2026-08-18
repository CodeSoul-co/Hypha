# `@codesoul-co/hypha-memory` / `working-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/working-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryWorkingMemoryStore` | class | <code>new InMemoryWorkingMemoryStore(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | Runtime implementation for In Memory Working Memory Store; see its public constructor and members below. |
| `RedisWorkingMemoryStore` | class | <code>new RedisWorkingMemoryStore(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Runtime implementation for Redis Working Memory Store; see its public constructor and members below. |
| `RedisLikeWorkingMemoryClient` | interface | <code>interface RedisLikeWorkingMemoryClient</code> | Field contract for Redis Like Working Memory Client; see all contract members below. |
| `RedisWorkingMemoryStoreOptions` | interface | <code>interface RedisWorkingMemoryStoreOptions</code> | Field contract for Redis Working Memory Store Options; see all contract members below. |
| `WorkingMemoryEntry` | interface | <code>interface WorkingMemoryEntry</code> | Field contract for Working Memory Entry; see all contract members below. |
| `WorkingMemoryStore` | interface | <code>interface WorkingMemoryStore</code> | Field contract for Working Memory Store; see all contract members below. |

## `InMemoryWorkingMemoryStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public runtime operation for clear Scope. |
| `constructor` | constructor | <code>(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Sets set at this module boundary. |

## `RedisWorkingMemoryStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public runtime operation for clear Scope. |
| `constructor` | constructor | <code>(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number &#124; undefined): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Sets set at this module boundary. |

## `RedisLikeWorkingMemoryClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `ping` | method | <code>ping(): Promise&lt;string&gt;</code> | Public runtime operation for ping. |
| `scan` | method | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public runtime operation for scan. |
| `set` | method | <code>set(key: string, value: string, mode?: "EX", durationSeconds?: number): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |

## `RedisWorkingMemoryStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeWorkingMemoryClient</code> | Public client property. |
| `defaultTtlSeconds` | property | <code>defaultTtlSeconds: number</code> | Public default Ttl Seconds property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `nowMs` | method | <code>nowMs(): number</code> | Public runtime operation for now Ms. |
| `scanBudget` | property | <code>scanBudget: Partial&lt;Omit&lt;RedisScanBudget, "count"&gt;&gt;</code> | Public scan Budget property. |
| `scanCount` | property | <code>scanCount: number</code> | Public scan Count property. |

## `WorkingMemoryEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `value` | property | <code>value: TValue</code> | Public value property. |

## `WorkingMemoryStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | Public runtime operation for clear Scope. |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | Sets set at this module boundary. |
