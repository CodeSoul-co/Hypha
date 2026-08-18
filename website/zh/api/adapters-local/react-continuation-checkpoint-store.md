# `@codesoul-co/hypha-adapters-local` / `react-continuation-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/react-continuation-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)
- 导出数: **2**

## 模块用法

用于持久化并读取该边界的数据。React continuation checkpoint store 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  SQLiteReActContinuationCheckpointStore,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteReActContinuationCheckpointStoreOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SQLiteReActContinuationCheckpointStore` | 类 | <code>new SQLiteReActContinuationCheckpointStore(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers. |
| `SQLiteReActContinuationCheckpointStoreOptions` | 接口 | <code>interface SQLiteReActContinuationCheckpointStoreOptions</code> | SQLite ReAct Continuation Checkpoint Store Options 接口，共包含 3 个公开字段或方法。 |

## `SQLiteReActContinuationCheckpointStore`

Local durable materialization for resumable ReAct work. Runtime Events remain the execution truth. This store contains only bounded, schema-validated continuation material and rejects stale checkpoint writers.

- 种类: 类
- 导入: `import { SQLiteReActContinuationCheckpointStore } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`react-continuation-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)

### 声明

```text
export declare class SQLiteReActContinuationCheckpointStore implements ReActContinuationCheckpointStore {
    constructor(options: SQLiteReActContinuationCheckpointStoreOptions);
    put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
    close(): void;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SQLiteReActContinuationCheckpointStoreOptions): SQLiteReActContinuationCheckpointStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SQLiteReActContinuationCheckpointStoreOptions`

SQLite ReAct Continuation Checkpoint Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SQLiteReActContinuationCheckpointStoreOptions } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`react-continuation-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/react-continuation-checkpoint-store.ts)

### 声明

```text
export interface SQLiteReActContinuationCheckpointStoreOptions {
    filename: string;
    maxIdempotencyRecordsPerCheckpoint?: number;
    maxCheckpointBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filename` | 属性 | <code>filename: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCheckpointBytes` | 属性 | <code>maxCheckpointBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIdempotencyRecordsPerCheckpoint` | 属性 | <code>maxIdempotencyRecordsPerCheckpoint?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
