# `@codesoul-co/hypha-serving-cache` / `policies`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/policies.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)
- 导出数: **4**

## 模块用法

用于使用该功能边界的公共契约与操作。Policies 模块公开 1 常量、3 函数。

### 从包入口导入

```ts
import {
  defaultCachePolicy,
  cacheModeAllowsRead,
  cacheModeAllowsWrite,
  normalizeCachePolicy,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultCachePolicy` | 常量 | <code>const defaultCachePolicy: CachePolicy</code> | 由 `policies` 模块导出的 Default Cache Policy 常量。 |
| `cacheModeAllowsRead` | 函数 | <code>cacheModeAllowsRead(mode: CacheMode): boolean</code> | Cache Mode Allows Read 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `cacheModeAllowsWrite` | 函数 | <code>cacheModeAllowsWrite(mode: CacheMode): boolean</code> | Cache Mode Allows Write 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeCachePolicy` | 函数 | <code>normalizeCachePolicy(policy?: Partial&lt;CachePolicy&gt;): CachePolicy</code> | Normalize Cache Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `defaultCachePolicy`

由 `policies` 模块导出的 Default Cache Policy 常量。

- 种类: 常量
- 导入: `import { defaultCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### 声明

```text
export declare const defaultCachePolicy: CachePolicy;
```

## `cacheModeAllowsRead`

Cache Mode Allows Read 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { cacheModeAllowsRead } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### 声明

```text
export declare function cacheModeAllowsRead(mode: CacheMode): boolean;
```

### 调用签名

```text
cacheModeAllowsRead(mode: CacheMode): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `mode` | <code>CacheMode</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `cacheModeAllowsWrite`

Cache Mode Allows Write 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { cacheModeAllowsWrite } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### 声明

```text
export declare function cacheModeAllowsWrite(mode: CacheMode): boolean;
```

### 调用签名

```text
cacheModeAllowsWrite(mode: CacheMode): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `mode` | <code>CacheMode</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `normalizeCachePolicy`

Normalize Cache Policy 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### 声明

```text
export declare function normalizeCachePolicy(policy?: Partial<CachePolicy>): CachePolicy;
```

### 调用签名

```text
normalizeCachePolicy(policy?: Partial<CachePolicy>): CachePolicy
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `policy` | <code>Partial&lt;CachePolicy&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `CachePolicy`
- 说明: 返回值契约由上述类型定义。
