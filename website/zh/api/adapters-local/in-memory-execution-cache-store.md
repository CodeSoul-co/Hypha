# `@codesoul-co/hypha-adapters-local` / `in-memory-execution-cache-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/in-memory-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-execution-cache-store.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryExecutionCacheStore` | 类 | <code>new InMemoryExecutionCacheStore(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | Bounded local reference store. Durable or shared providers implement the same Core port. |
| `NodeExecutionFingerprintHasher` | 类 | <code>new NodeExecutionFingerprintHasher(): NodeExecutionFingerprintHasher</code> | Node Execution Fingerprint Hasher 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryExecutionCacheStoreOptions` | 接口 | <code>interface InMemoryExecutionCacheStoreOptions</code> | In Memory Execution Cache Store Options 的字段契约；完整字段见下表。 |
| `InMemoryExecutionCacheStoreStats` | 接口 | <code>interface InMemoryExecutionCacheStoreStats</code> | In Memory Execution Cache Store Stats 的字段契约；完整字段见下表。 |

## `InMemoryExecutionCacheStore` 公开成员

Bounded local reference store. Durable or shared providers implement the same Core port.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: InMemoryExecutionCacheStoreOptions): InMemoryExecutionCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(key: string, rawRecord: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |
| `stats` | 方法 | <code>stats(): InMemoryExecutionCacheStoreStats</code> | stats 的公开运行时操作。 |

## `NodeExecutionFingerprintHasher` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `algorithm` | 属性 | <code>algorithm: "sha256"</code> | algorithm 字段。 |
| `constructor` | 构造函数 | <code>(): NodeExecutionFingerprintHasher</code> | 创建该类的实例。 |
| `hashUtf8` | 方法 | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | 判断是否存在 h Utf8。 |

## `InMemoryExecutionCacheStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |

## `InMemoryExecutionCacheStoreStats` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `entries` | 属性 | <code>entries: number</code> | entries 字段。 |
| `evictions` | 属性 | <code>evictions: number</code> | evictions 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
