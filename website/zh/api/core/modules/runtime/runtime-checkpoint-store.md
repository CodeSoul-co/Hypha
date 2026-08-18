# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-checkpoint-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)
- 导出数: **3**

## 模块用法

用于持久化并读取该边界的数据。Runtime checkpoint store 模块公开 1 类、2 函数。

### 从包入口导入

```ts
import {
  InMemoryRuntimeCheckpointStore,
  runtimeCheckpointChecksum,
  verifyRuntimeCheckpointChecksum,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRuntimeCheckpointStore` | 类 | <code>new InMemoryRuntimeCheckpointStore(): InMemoryRuntimeCheckpointStore</code> | In Memory Runtime Checkpoint Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `runtimeCheckpointChecksum` | 函数 | <code>runtimeCheckpointChecksum(record: Omit&lt;RuntimeCheckpointRecord, "checksum"&gt; &#124; RuntimeCheckpointRecord): string</code> | Runtime Checkpoint Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `verifyRuntimeCheckpointChecksum` | 函数 | <code>verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void</code> | Verify Runtime Checkpoint Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `InMemoryRuntimeCheckpointStore`

In Memory Runtime Checkpoint Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryRuntimeCheckpointStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### 声明

```text
export declare class InMemoryRuntimeCheckpointStore implements RuntimeCheckpointStore {
    put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeCheckpointStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `runtimeCheckpointChecksum`

Runtime Checkpoint Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runtimeCheckpointChecksum } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### 声明

```text
export declare function runtimeCheckpointChecksum(record: Omit<RuntimeCheckpointRecord, 'checksum'> | RuntimeCheckpointRecord): string;
```

### 调用签名

```text
runtimeCheckpointChecksum(record: Omit<RuntimeCheckpointRecord, "checksum"> | RuntimeCheckpointRecord): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `record` | <code>RuntimeCheckpointRecord &#124; Omit&lt;RuntimeCheckpointRecord, "checksum"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `verifyRuntimeCheckpointChecksum`

Verify Runtime Checkpoint Checksum 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { verifyRuntimeCheckpointChecksum } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-checkpoint-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-store.ts)

### 声明

```text
export declare function verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void;
```

### 调用签名

```text
verifyRuntimeCheckpointChecksum(record: RuntimeCheckpointRecord): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `record` | <code>RuntimeCheckpointRecord</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。
