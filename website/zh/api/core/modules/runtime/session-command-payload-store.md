# `@codesoul-co/hypha-core` / `modules/runtime/session-command-payload-store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/session-command-payload-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)
- 导出数: **5**

## 模块用法

用于持久化并读取该边界的数据。Session command payload store 模块公开 1 类、3 接口、1 类型。

### 从包入口导入

```ts
import {
  ArtifactSessionCommandPayloadStore,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactSessionCommandPayloadStoreOptions,
  PutSessionCommandPayloadRequest,
  SessionCommandPayloadReference,
  GetSessionCommandPayloadRequest,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactSessionCommandPayloadStore` | 类 | <code>new ArtifactSessionCommandPayloadStore(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Stores canonical command JSON outside the Queue while retaining a verified durable reference. |
| `ArtifactSessionCommandPayloadStoreOptions` | 接口 | <code>interface ArtifactSessionCommandPayloadStoreOptions</code> | Artifact Session Command Payload Store Options 接口，共包含 2 个公开字段或方法。 |
| `PutSessionCommandPayloadRequest` | 接口 | <code>interface PutSessionCommandPayloadRequest</code> | Put Session Command Payload Request 接口，共包含 2 个公开字段或方法。 |
| `SessionCommandPayloadReference` | 接口 | <code>interface SessionCommandPayloadReference</code> | Session Command Payload Reference 接口，共包含 2 个公开字段或方法。 |
| `GetSessionCommandPayloadRequest` | 类型 | <code>type GetSessionCommandPayloadRequest = SessionCommandPayloadReference</code> | Get Session Command Payload Request 公共类型别名；完整类型表达式见声明。 |

## `ArtifactSessionCommandPayloadStore`

Stores canonical command JSON outside the Queue while retaining a verified durable reference.

- 种类: 类
- 导入: `import { ArtifactSessionCommandPayloadStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### 声明

```text
export declare class ArtifactSessionCommandPayloadStore {
    constructor(options: ArtifactSessionCommandPayloadStoreOptions);
    put(request: PutSessionCommandPayloadRequest): Promise<SessionCommandPayloadReference>;
    get(request: GetSessionCommandPayloadRequest): Promise<unknown>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(request: GetSessionCommandPayloadRequest): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(request: PutSessionCommandPayloadRequest): Promise&lt;SessionCommandPayloadReference&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactSessionCommandPayloadStoreOptions`

Artifact Session Command Payload Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactSessionCommandPayloadStoreOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### 声明

```text
export interface ArtifactSessionCommandPayloadStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxPayloadBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPayloadBytes` | 属性 | <code>maxPayloadBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PutSessionCommandPayloadRequest`

Put Session Command Payload Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PutSessionCommandPayloadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### 声明

```text
export interface PutSessionCommandPayloadRequest {
    commandId: string;
    payload: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandPayloadReference`

Session Command Payload Reference 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandPayloadReference } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### 声明

```text
export interface SessionCommandPayloadReference {
    payloadRef: string;
    payloadHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadRef` | 属性 | <code>payloadRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `GetSessionCommandPayloadRequest`

Get Session Command Payload Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { GetSessionCommandPayloadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### 声明

```text
export type GetSessionCommandPayloadRequest = SessionCommandPayloadReference;
```
