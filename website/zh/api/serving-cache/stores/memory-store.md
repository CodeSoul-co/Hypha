# `@codesoul-co/hypha-serving-cache` / `stores/memory-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/stores/memory-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryCacheStore` | 类 | <code>new MemoryCacheStore(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Memory Cache Store 的运行时实现；公开构造函数与成员见下表。 |
| `NoopCacheStore` | 类 | <code>new NoopCacheStore(): NoopCacheStore</code> | Noop Cache Store 的运行时实现；公开构造函数与成员见下表。 |

## `MemoryCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | health 的公开运行时操作。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 写入 set。 |
| `stats` | 方法 | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | stats 的公开运行时操作。 |
| `touch` | 方法 | <code>touch(key: string): Promise&lt;void&gt;</code> | touch 的公开运行时操作。 |

## `NoopCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): NoopCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set&lt;T&gt;(): Promise&lt;void&gt;</code> | 写入 set。 |
