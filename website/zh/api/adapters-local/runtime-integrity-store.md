# `@codesoul-co/hypha-adapters-local` / `runtime-integrity-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-integrity-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRuntimeIntegrityStore` | 类 | <code>new SQLiteRuntimeIntegrityStore(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | SQ Lite Runtime Integrity Store 的运行时实现；公开构造函数与成员见下表。 |
| `SQLiteRuntimeIntegrityStoreOptions` | 接口 | <code>interface SQLiteRuntimeIntegrityStoreOptions</code> | SQ Lite Runtime Integrity Store Options 的字段契约；完整字段见下表。 |

## `SQLiteRuntimeIntegrityStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | 创建该类的实例。 |
| `getRepair` | 方法 | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | 读取 Repair。 |
| `getWatermark` | 方法 | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | 读取 Watermark。 |
| `putRepair` | 方法 | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | put Repair 的公开运行时操作。 |
| `putWatermark` | 方法 | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | put Watermark 的公开运行时操作。 |

## `SQLiteRuntimeIntegrityStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | filename 字段。 |
