# `@codesoul-co/hypha-memory` / `provider-pagination`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-pagination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)
- 导出数: **5**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider pagination 模块公开 3 函数、2 接口。

### 从包入口导入

```ts
import {
  beginProviderPage,
  encodeProviderCursor,
  finishProviderPage,
} from '@codesoul-co/hypha-memory';

import type {
  ProviderPageContext,
  ProviderPaginationBudget,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beginProviderPage` | 函数 | <code>beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest &#124; undefined, nowMs?: number): ProviderPageContext</code> | Begin Provider Page 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `encodeProviderCursor` | 函数 | <code>encodeProviderCursor(envelope: ProviderCursorEnvelope): string</code> | Encode Provider Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `finishProviderPage` | 函数 | <code>finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }</code> | Finish Provider Page 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ProviderPageContext` | 接口 | <code>interface ProviderPageContext</code> | Provider Page Context 接口，共包含 5 个公开字段或方法。 |
| `ProviderPaginationBudget` | 接口 | <code>interface ProviderPaginationBudget</code> | Provider Pagination Budget 接口，共包含 5 个公开字段或方法。 |

## `beginProviderPage`

Begin Provider Page 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { beginProviderPage } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### 声明

```text
export declare function beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest | undefined, nowMs?: number): ProviderPageContext;
```

### 调用签名

```text
beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest | undefined, nowMs?: number): ProviderPageContext
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `scope` | <code>ManagedMemoryScope</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `pagination` | <code>PaginationRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `nowMs` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ProviderPageContext`
- 说明: 返回值契约由上述类型定义。

## `encodeProviderCursor`

Encode Provider Cursor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { encodeProviderCursor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### 声明

```text
export declare function encodeProviderCursor(envelope: ProviderCursorEnvelope): string;
```

### 调用签名

```text
encodeProviderCursor(envelope: ProviderCursorEnvelope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `envelope` | <code>ProviderCursorEnvelope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `finishProviderPage`

Finish Provider Page 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { finishProviderPage } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### 声明

```text
export declare function finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): {
    nextCursor?: string;
    hasMore: boolean;
};
```

### 调用签名

```text
finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `context` | <code>ProviderPageContext</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `providerId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `scope` | <code>ManagedMemoryScope</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `records` | <code>unknown[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `nextProviderCursor` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `nowMs` | <code>number</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ nextCursor?: string; hasMore: boolean; }`
- 说明: 返回值契约由上述类型定义。

## `ProviderPageContext`

Provider Page Context 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderPageContext } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### 声明

```text
export interface ProviderPageContext {
    providerCursor?: string;
    envelope?: ProviderCursorEnvelope;
    budget: ProviderPaginationBudget;
    startedAt: string;
    nowMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budget` | 属性 | <code>budget: ProviderPaginationBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `envelope` | 属性 | <code>envelope?: ProviderCursorEnvelope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nowMs` | 属性 | <code>nowMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerCursor` | 属性 | <code>providerCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderPaginationBudget`

Provider Pagination Budget 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderPaginationBudget } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### 声明

```text
export interface ProviderPaginationBudget {
    maxPages: number;
    maxItems: number;
    maxBytes: number;
    maxDurationMs: number;
    maxCalls: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCalls` | 属性 | <code>maxCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPages` | 属性 | <code>maxPages: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
