# `@codesoul-co/hypha-adapters-local` / `runtime-integrity-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/runtime-integrity-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。Runtime integrity store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteRuntimeIntegrityStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteRuntimeIntegrityStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteRuntimeIntegrityStore` | 类 | <code>new SQLiteRuntimeIntegrityStore(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | SQLite Runtime Integrity Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SQLiteRuntimeIntegrityStoreOptions` | 接口 | <code>interface SQLiteRuntimeIntegrityStoreOptions</code> | SQLite Runtime Integrity Store Options 接口，共包含 1 个公开字段或方法。 |

## `SQLiteRuntimeIntegrityStore`

SQLite Runtime Integrity Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SQLiteRuntimeIntegrityStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-integrity-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)

### 声明

```text
export declare class SQLiteRuntimeIntegrityStore implements RuntimeIntegrityStore {
    constructor(options: SQLiteRuntimeIntegrityStoreOptions);
    getWatermark(): Promise<RuntimeIntegrityWatermark | null>;
    putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number | null): Promise<void>;
    getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null>;
    putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteRuntimeIntegrityStoreOptions): SQLiteRuntimeIntegrityStore</code> | 创建该类的实例。 |
| `getRepair` | 方法 | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getWatermark` | 方法 | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putRepair` | 方法 | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putWatermark` | 方法 | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteRuntimeIntegrityStoreOptions`

SQLite Runtime Integrity Store Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteRuntimeIntegrityStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`runtime-integrity-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/runtime-integrity-store.ts)

### 声明

```text
export interface SQLiteRuntimeIntegrityStoreOptions {
    filename: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
