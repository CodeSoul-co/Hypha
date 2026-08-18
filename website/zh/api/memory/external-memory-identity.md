# `@codesoul-co/hypha-memory` / `external-memory-identity`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/external-memory-identity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-memory-identity.ts)
- 导出数: **1**

## 模块用法

用于使用该功能边界的公共契约与操作。External memory identity 模块公开 1 函数。

### 从包入口导入

```ts
import {
  createExternalMemoryId,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createExternalMemoryId` | 函数 | <code>createExternalMemoryId(providerId: string, externalId: string): string</code> | Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId. |

## `createExternalMemoryId`

Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId.

- 种类: 函数
- 导入: `import { createExternalMemoryId } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-memory-identity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-memory-identity.ts)

### 声明

```text
export declare function createExternalMemoryId(providerId: string, externalId: string): string;
```

### 调用签名

```text
createExternalMemoryId(providerId: string, externalId: string): string
```

Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `externalId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。
