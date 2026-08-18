# `@codesoul-co/hypha-memory` / `managed-credentials`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/managed-credentials.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)
- 导出数: **5**

## 模块用法

用于使用该功能边界的公共契约与操作。Managed credentials 模块公开 1 类、1 函数、3 接口。

### 从包入口导入

```ts
import {
  RenewableCredentialManager,
  staticCredentialProvider,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedCredentialLease,
  RenewableCredentialManagerOptions,
  RenewableCredentialProvider,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RenewableCredentialManager` | 类 | <code>new RenewableCredentialManager(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Renewable Credential Manager 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `staticCredentialProvider` | 函数 | <code>staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider</code> | Static Credential Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ManagedCredentialLease` | 接口 | <code>interface ManagedCredentialLease</code> | Managed Credential Lease 接口，共包含 3 个公开字段或方法。 |
| `RenewableCredentialManagerOptions` | 接口 | <code>interface RenewableCredentialManagerOptions</code> | Renewable Credential Manager Options 接口，共包含 3 个公开字段或方法。 |
| `RenewableCredentialProvider` | 接口 | <code>interface RenewableCredentialProvider</code> | Renewable Credential Provider 接口，共包含 3 个公开字段或方法。 |

## `RenewableCredentialManager`

Renewable Credential Manager 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RenewableCredentialManager } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### 声明

```text
export declare class RenewableCredentialManager {
    constructor(options: RenewableCredentialManagerOptions);
    get(signal?: AbortSignal): Promise<ManagedCredentialLease>;
    invalidate(): void;
    close(signal?: AbortSignal): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `staticCredentialProvider`

Static Credential Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { staticCredentialProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### 声明

```text
export declare function staticCredentialProvider(token: string, tokenType: ManagedCredentialLease['tokenType']): RenewableCredentialProvider;
```

### 调用签名

```text
staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `token` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `tokenType` | <code>"api_token" &#124; "oauth_bearer"</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RenewableCredentialProvider`
- 说明: 返回值契约由上述类型定义。

## `ManagedCredentialLease`

Managed Credential Lease 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedCredentialLease } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### 声明

```text
export interface ManagedCredentialLease {
    token: string;
    tokenType: 'api_token' | 'oauth_bearer';
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `token` | 属性 | <code>token: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenType` | 属性 | <code>tokenType: "api_token" &#124; "oauth_bearer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RenewableCredentialManagerOptions`

Renewable Credential Manager Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RenewableCredentialManagerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### 声明

```text
export interface RenewableCredentialManagerOptions {
    provider: RenewableCredentialProvider;
    refreshSkewMs?: number;
    now?: () => Date;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `provider` | 属性 | <code>provider: RenewableCredentialProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshSkewMs` | 属性 | <code>refreshSkewMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RenewableCredentialProvider`

Renewable Credential Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RenewableCredentialProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### 声明

```text
export interface RenewableCredentialProvider {
    acquire(signal?: AbortSignal): Promise<ManagedCredentialLease>;
    revoke?(lease: ManagedCredentialLease, signal?: AbortSignal): Promise<void>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acquire` | 方法 | <code>acquire(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `revoke` | 方法 | <code>revoke?(lease: ManagedCredentialLease, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
