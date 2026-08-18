# `@codesoul-co/hypha-memory` / `context-artifacts`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/context-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)
- 导出数: **11**

## 模块用法

用于使用该功能边界的公共契约与操作。Context artifacts 模块公开 2 类、2 函数、6 接口、1 类型。

### 从包入口导入

```ts
import {
  InMemoryContextArtifactStore,
  ProviderBackedContextArtifactStore,
  contextArtifactContentHash,
  validateContextArtifactReference,
} from '@codesoul-co/hypha-memory';

import type {
  ContextArtifactReadExpectation,
  ContextArtifactRecord,
  ContextArtifactRef,
  ContextArtifactStore,
  ContextArtifactWriteRequest,
  ProviderBackedContextArtifactStoreOptions,
  InMemoryContextArtifactBacking,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryContextArtifactStore` | 类 | <code>new InMemoryContextArtifactStore(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | In Memory Context Artifact Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ProviderBackedContextArtifactStore` | 类 | <code>new ProviderBackedContextArtifactStore(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Provider Backed Context Artifact Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `contextArtifactContentHash` | 函数 | <code>contextArtifactContentHash(content: string): string</code> | Context Artifact Content Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateContextArtifactReference` | 函数 | <code>validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void</code> | Validate Context Artifact Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ContextArtifactReadExpectation` | 接口 | <code>interface ContextArtifactReadExpectation</code> | Context Artifact Read Expectation 接口，共包含 2 个公开字段或方法。 |
| `ContextArtifactRecord` | 接口 | <code>interface ContextArtifactRecord</code> | Context Artifact Record 接口，共包含 2 个公开字段或方法。 |
| `ContextArtifactRef` | 接口 | <code>interface ContextArtifactRef</code> | Context Artifact Ref 接口，共包含 10 个公开字段或方法。 |
| `ContextArtifactStore` | 接口 | <code>interface ContextArtifactStore</code> | Context Artifact Store 接口，共包含 4 个公开字段或方法。 |
| `ContextArtifactWriteRequest` | 接口 | <code>interface ContextArtifactWriteRequest</code> | Context Artifact Write Request 接口，共包含 6 个公开字段或方法。 |
| `ProviderBackedContextArtifactStoreOptions` | 接口 | <code>interface ProviderBackedContextArtifactStoreOptions</code> | Provider Backed Context Artifact Store Options 接口，共包含 2 个公开字段或方法。 |
| `InMemoryContextArtifactBacking` | 类型 | <code>type InMemoryContextArtifactBacking = Map&lt;string, ContextArtifactRecord&gt;</code> | In Memory Context Artifact Backing 公共类型别名；完整类型表达式见声明。 |

## `InMemoryContextArtifactStore`

In Memory Context Artifact Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryContextArtifactStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export declare class InMemoryContextArtifactStore implements ContextArtifactStore {
    readonly durability: "ephemeral";
    constructor(records?: InMemoryContextArtifactBacking);
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ProviderBackedContextArtifactStore`

Provider Backed Context Artifact Store 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ProviderBackedContextArtifactStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export declare class ProviderBackedContextArtifactStore implements ContextArtifactStore {
    readonly durability: 'ephemeral' | 'durable';
    constructor(options: ProviderBackedContextArtifactStoreOptions);
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral" &#124; "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `contextArtifactContentHash`

Context Artifact Content Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { contextArtifactContentHash } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export declare function contextArtifactContentHash(content: string): string;
```

### 调用签名

```text
contextArtifactContentHash(content: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `content` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateContextArtifactReference`

Validate Context Artifact Reference 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateContextArtifactReference } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export declare function validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void;
```

### 调用签名

```text
validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `reference` | <code>ContextArtifactRef</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expected` | <code>ContextArtifactReadExpectation</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `ContextArtifactReadExpectation`

Context Artifact Read Expectation 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextArtifactReadExpectation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ContextArtifactReadExpectation {
    scopeHash: string;
    profileRevision: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextArtifactRecord`

Context Artifact Record 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextArtifactRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ContextArtifactRecord {
    reference: ContextArtifactRef;
    content: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reference` | 属性 | <code>reference: ContextArtifactRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextArtifactRef`

Context Artifact Ref 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextArtifactRef } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ContextArtifactRef {
    id: string;
    path: string;
    contentHash: string;
    sizeBytes: number;
    contentType: 'text/plain; charset=utf-8';
    scopeHash: string;
    profileRevision: string;
    sourceItemId: string;
    createdAt: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentType` | 属性 | <code>contentType: "text/plain; charset=utf-8"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceItemId` | 属性 | <code>sourceItemId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextArtifactStore`

Context Artifact Store 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextArtifactStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ContextArtifactStore {
    readonly durability: 'ephemeral' | 'durable';
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `durability` | 属性 | <code>readonly durability: "ephemeral" &#124; "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `put` | 方法 | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `read` | 方法 | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextArtifactWriteRequest`

Context Artifact Write Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextArtifactWriteRequest } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ContextArtifactWriteRequest {
    content: string;
    scopeHash: string;
    profileRevision: string;
    sourceItemId: string;
    createdAt: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceItemId` | 属性 | <code>sourceItemId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderBackedContextArtifactStoreOptions`

Provider Backed Context Artifact Store Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderBackedContextArtifactStoreOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export interface ProviderBackedContextArtifactStoreOptions {
    provider: ArtifactStoreProvider;
    durability?: 'ephemeral' | 'durable';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `durability` | 属性 | <code>durability?: "ephemeral" &#124; "durable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: ArtifactStoreProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryContextArtifactBacking`

In Memory Context Artifact Backing 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { InMemoryContextArtifactBacking } from '@codesoul-co/hypha-memory';`
- 源码模块: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### 声明

```text
export type InMemoryContextArtifactBacking = Map<string, ContextArtifactRecord>;
```
