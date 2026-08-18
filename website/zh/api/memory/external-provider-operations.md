# `@codesoul-co/hypha-memory` / `external-provider-operations`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/external-provider-operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)
- 导出数: **10**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。External provider operations 模块公开 2 类、1 常量、4 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryExternalProviderOperationStore,
  StructuredExternalProviderOperationStore,
  externalProviderOperationSchema,
  createExternalProviderOperation,
  externalProviderOperationId,
  fingerprintExternalOperationFailure,
  resolveExternalProviderOperationStore,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalProviderOperation,
  ExternalProviderOperationStore,
  ExternalProviderOperationState,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryExternalProviderOperationStore` | 类 | <code>new InMemoryExternalProviderOperationStore(): InMemoryExternalProviderOperationStore</code> | In Memory External Provider Operation Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `StructuredExternalProviderOperationStore` | 类 | <code>new StructuredExternalProviderOperationStore(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Structured External Provider Operation Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `externalProviderOperationSchema` | 常量 | <code>const externalProviderOperationSchema: ZodType&lt;ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation&gt;</code> | External Provider Operation 的运行时 Schema。 |
| `createExternalProviderOperation` | 函数 | <code>createExternalProviderOperation(input: Omit&lt;ExternalProviderOperation, "id" &#124; "scopeHash" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt"&gt; &amp; { now?: string; }): ExternalProviderOperation</code> | Create External Provider Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `externalProviderOperationId` | 函数 | <code>externalProviderOperationId(providerId: string, operationId: string): string</code> | External Provider Operation ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `fingerprintExternalOperationFailure` | 函数 | <code>fingerprintExternalOperationFailure(error: NormalizedMemoryError): string</code> | Fingerprint External Operation Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveExternalProviderOperationStore` | 函数 | <code>resolveExternalProviderOperationStore(store: ExternalProviderOperationStore &#124; undefined, profile: "production" &#124; "test" &#124; "ephemeral"): ExternalProviderOperationStore</code> | Resolve External Provider Operation Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ExternalProviderOperation` | 接口 | <code>interface ExternalProviderOperation</code> | External Provider Operation 接口，共包含 19 个公开字段或方法。 |
| `ExternalProviderOperationStore` | 接口 | <code>interface ExternalProviderOperationStore</code> | External Provider Operation Store 接口，共包含 5 个公开字段或方法。 |
| `ExternalProviderOperationState` | 类型 | <code>type ExternalProviderOperationState = 'pending' &#124; 'running' &#124; 'reconcile_required' &#124; 'succeeded' &#124; 'failed' &#124; 'cancelled' &#124; 'dead_letter'</code> | External Provider Operation State 公共类型别名；完整类型表达式见声明。 |

## `InMemoryExternalProviderOperationStore`

In Memory External Provider Operation Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare class InMemoryExternalProviderOperationStore implements ExternalProviderOperationStore {
    readonly durability: "ephemeral";
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
            operation: ExternalProviderOperation;
            created: boolean;
        }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): InMemoryExternalProviderOperationStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredExternalProviderOperationStore`

Structured External Provider Operation Store 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare class StructuredExternalProviderOperationStore implements ExternalProviderOperationStore {
    readonly durability: "durable";
    constructor(options: {
            store: StructuredStoreProvider;
            table?: string;
        });
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
            operation: ExternalProviderOperation;
            created: boolean;
        }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>readonly durability: "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `externalProviderOperationSchema`

External Provider Operation 的运行时 Schema。

- 种类: 常量
- 导入: `import { externalProviderOperationSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare const externalProviderOperationSchema: ZodType<ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation>;
```

## `createExternalProviderOperation`

Create External Provider Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createExternalProviderOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare function createExternalProviderOperation(input: Omit<ExternalProviderOperation, 'id' | 'scopeHash' | 'attempts' | 'createdAt' | 'updatedAt'> & {
    now?: string;
}): ExternalProviderOperation;
```

### 调用签名

```text
createExternalProviderOperation(input: Omit<ExternalProviderOperation, "id" | "scopeHash" | "attempts" | "createdAt" | "updatedAt"> & { now?: string; }): ExternalProviderOperation
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;ExternalProviderOperation, "id" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt" &#124; "scopeHash"&gt; &amp; { now?: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExternalProviderOperation`
- 说明: 返回值契约由上述类型定义。

## `externalProviderOperationId`

External Provider Operation ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { externalProviderOperationId } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare function externalProviderOperationId(providerId: string, operationId: string): string;
```

### 调用签名

```text
externalProviderOperationId(providerId: string, operationId: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `operationId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `fingerprintExternalOperationFailure`

Fingerprint External Operation Failure 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { fingerprintExternalOperationFailure } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare function fingerprintExternalOperationFailure(error: NormalizedMemoryError): string;
```

### 调用签名

```text
fingerprintExternalOperationFailure(error: NormalizedMemoryError): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>NormalizedMemoryError</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `resolveExternalProviderOperationStore`

Resolve External Provider Operation Store 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export declare function resolveExternalProviderOperationStore(store: ExternalProviderOperationStore | undefined, profile: 'production' | 'test' | 'ephemeral'): ExternalProviderOperationStore;
```

### 调用签名

```text
resolveExternalProviderOperationStore(store: ExternalProviderOperationStore | undefined, profile: "production" | "test" | "ephemeral"): ExternalProviderOperationStore
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `store` | <code>ExternalProviderOperationStore</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `profile` | <code>"ephemeral" &#124; "production" &#124; "test"</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ExternalProviderOperationStore`
- 说明: 返回值契约由上述类型定义。

## `ExternalProviderOperation`

External Provider Operation 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export interface ExternalProviderOperation {
    id: string;
    providerId: string;
    operationId: string;
    externalOperationId?: string;
    kind: 'mem0_event' | 'vertex_lro' | 'hindsight_operation' | 'unknown_write';
    state: ExternalProviderOperationState;
    scope: ManagedMemoryScope;
    scopeHash: string;
    profileRef: MemoryContractSpecRef;
    principal: {
        principalId: string;
        userId?: string;
    };
    attempts: number;
    deadlineAt?: string;
    nextAttemptAt?: string;
    cancellationRequestedAt?: string;
    failure?: NormalizedMemoryError;
    failureFingerprint?: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRequestedAt` | 属性 | <code>cancellationRequestedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `externalOperationId` | 属性 | <code>externalOperationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure?: NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureFingerprint` | 属性 | <code>failureFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "mem0_event" &#124; "vertex_lro" &#124; "hindsight_operation" &#124; "unknown_write"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextAttemptAt` | 属性 | <code>nextAttemptAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: { principalId: string; userId?: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: ExternalProviderOperationState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalProviderOperationStore`

External Provider Operation Store 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export interface ExternalProviderOperationStore {
    readonly durability: 'ephemeral' | 'durable';
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
        operation: ExternalProviderOperation;
        created: boolean;
    }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claim` | 方法 | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral" &#124; "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `get` | 方法 | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listRecoverable` | 方法 | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExternalProviderOperationState`

External Provider Operation State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExternalProviderOperationState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### 声明

```text
export type ExternalProviderOperationState = 'pending' | 'running' | 'reconcile_required' | 'succeeded' | 'failed' | 'cancelled' | 'dead_letter';
```
