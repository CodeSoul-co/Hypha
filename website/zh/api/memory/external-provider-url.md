# `@codesoul-co/hypha-memory` / `external-provider-url`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/external-provider-url.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)
- 导出数: **3**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。External provider url 模块公开 2 函数、1 接口。

### 从包入口导入

```ts
import {
  isLoopbackHostname,
  normalizeExternalProviderBaseUrl,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalProviderBaseUrlOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `isLoopbackHostname` | 函数 | <code>isLoopbackHostname(hostname: string): boolean</code> | Is Loopback Hostname 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeExternalProviderBaseUrl` | 函数 | <code>normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string</code> | Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination. |
| `ExternalProviderBaseUrlOptions` | 接口 | <code>interface ExternalProviderBaseUrlOptions</code> | External Provider Base URL Options 接口，共包含 3 个公开字段或方法。 |

## `isLoopbackHostname`

Is Loopback Hostname 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isLoopbackHostname } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### 声明

```text
export declare function isLoopbackHostname(hostname: string): boolean;
```

### 调用签名

```text
isLoopbackHostname(hostname: string): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `hostname` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `normalizeExternalProviderBaseUrl`

Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination.

- 种类: 函数
- 导入: `import { normalizeExternalProviderBaseUrl } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### 声明

```text
export declare function normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string;
```

### 调用签名

```text
normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string
```

Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>ExternalProviderBaseUrlOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `ExternalProviderBaseUrlOptions`

External Provider Base URL Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderBaseUrlOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### 声明

```text
export interface ExternalProviderBaseUrlOptions {
    providerName: string;
    allowLoopbackHttp?: boolean;
    allowInsecureForTests?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowLoopbackHttp` | 属性 | <code>allowLoopbackHttp?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerName` | 属性 | <code>providerName: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
