# `@codesoul-co/hypha-adapters-local` / `in-memory-execution-cache-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryExecutionCacheStore` | class | <code>new InMemoryExecutionCacheStore(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Bounded local reference store. Durable or shared providers implement the same Core port. |
| `NodeExecutionFingerprintHasher` | class | <code>new NodeExecutionFingerprintHasher(): NodeExecutionFingerprintHasher</code> | Runtime implementation for Node Execution Fingerprint Hasher; see its public constructor and members below. |
| `InMemoryExecutionCacheStoreOptions` | interface | <code>interface InMemoryExecutionCacheStoreOptions</code> | Field contract for In Memory Execution Cache Store Options; see all contract members below. |
| `InMemoryExecutionCacheStoreStats` | interface | <code>interface InMemoryExecutionCacheStoreStats</code> | Field contract for In Memory Execution Cache Store Stats; see all contract members below. |

## `InMemoryExecutionCacheStore` public members

Bounded local reference store. Durable or shared providers implement the same Core port.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(key: string, rawRecord: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `stats` | method | <code>stats(): InMemoryExecutionCacheStoreStats</code> | Public runtime operation for stats. |

## `NodeExecutionFingerprintHasher` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `algorithm` | property | <code>algorithm: "sha256"</code> | Public algorithm property. |
| `constructor` | constructor | <code>(): NodeExecutionFingerprintHasher</code> | Creates an instance of this class. |
| `hashUtf8` | method | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | Checks whether h Utf8 at this module boundary. |

## `InMemoryExecutionCacheStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |

## `InMemoryExecutionCacheStoreStats` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: number</code> | Public entries property. |
| `evictions` | property | <code>evictions: number</code> | Public evictions property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
