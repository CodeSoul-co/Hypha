# `@codesoul-co/hypha-serving-cache` / `stores/sqlite-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/stores/sqlite-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteCacheStore` | 类 | <code>new SQLiteCacheStore(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | SQ Lite Cache Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteCacheStoreOptions` | 接口 | <code>interface SQLiteCacheStoreOptions</code> | SQ Lite Cache Store Options 的字段契约；完整字段见下表。 |

## `SQLiteCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteCacheStoreOptions): SQLiteCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 写入 set。 |
| `touch` | 方法 | <code>touch(key: string, timestamp: number): Promise&lt;void&gt;</code> | touch 的公开运行时操作。 |

## `SQLiteCacheStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
| `maxEntries` | 属性 | <code>maxEntries: number</code> | max Entries 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
