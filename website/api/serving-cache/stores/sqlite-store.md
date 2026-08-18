# `@codesoul-co/hypha-serving-cache` / `stores/sqlite-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/stores/sqlite-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteCacheStore` | class | <code>new SQLiteCacheStore(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | Runtime implementation for SQ Lite Cache Store; see its public constructor and members below. |
| `SQLiteCacheStoreOptions` | interface | <code>interface SQLiteCacheStoreOptions</code> | Field contract for SQ Lite Cache Store Options; see all contract members below. |

## `SQLiteCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `touch` | method | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | Public runtime operation for touch. |

## `SQLiteCacheStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
