# `@codesoul-co/hypha-memory` / `canonical-runtime-config`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/canonical-runtime-config.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)
- 导出数: **7**

## 模块用法

用于执行该边界的运行时行为。Canonical runtime config 模块公开 1 类、3 常量、3 接口。

### 从包入口导入

```ts
import {
  CanonicalMemoryRuntimeLoader,
  canonicalMemoryRuntimeConfigExample,
  canonicalMemoryRuntimeConfigJsonSchema,
  canonicalMemoryRuntimeConfigSchema,
} from '@codesoul-co/hypha-memory';

import type {
  CanonicalMemoryRuntimeConfig,
  LoadedCanonicalMemoryRuntimeConfig,
  MemoryRuntimeReferenceResolver,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CanonicalMemoryRuntimeLoader` | 类 | <code>new CanonicalMemoryRuntimeLoader(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Canonical Memory Runtime Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `canonicalMemoryRuntimeConfigExample` | 常量 | <code>const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig</code> | Canonical Memory Runtime Config 的有效示例值。 |
| `canonicalMemoryRuntimeConfigJsonSchema` | 常量 | <code>const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema</code> | Canonical Memory Runtime Config 的 JSON Schema。 |
| `canonicalMemoryRuntimeConfigSchema` | 常量 | <code>const canonicalMemoryRuntimeConfigSchema: ZodType&lt;CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig&gt;</code> | Canonical Memory Runtime Config 的运行时 Schema。 |
| `CanonicalMemoryRuntimeConfig` | 接口 | <code>interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig</code> | Canonical Memory Runtime Config 接口，共包含 3 个公开字段或方法。 |
| `LoadedCanonicalMemoryRuntimeConfig` | 接口 | <code>interface LoadedCanonicalMemoryRuntimeConfig</code> | Loaded Canonical Memory Runtime Config 接口，共包含 2 个公开字段或方法。 |
| `MemoryRuntimeReferenceResolver` | 接口 | <code>interface MemoryRuntimeReferenceResolver</code> | Memory Runtime Reference Resolver 接口，共包含 1 个公开字段或方法。 |

## `CanonicalMemoryRuntimeLoader`

Canonical Memory Runtime Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { CanonicalMemoryRuntimeLoader } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export declare class CanonicalMemoryRuntimeLoader {
    constructor(resolver: MemoryRuntimeReferenceResolver);
    load(input: unknown): Promise<LoadedCanonicalMemoryRuntimeConfig>;
    create(factory: MemoryRuntimeFactory, input: unknown): Promise<MemoryRuntime>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(factory: MemoryRuntimeFactory, input: unknown): Promise&lt;MemoryRuntime&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `load` | 方法 | <code>load(input: unknown): Promise&lt;LoadedCanonicalMemoryRuntimeConfig&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `canonicalMemoryRuntimeConfigExample`

Canonical Memory Runtime Config 的有效示例值。

- 种类: 常量
- 导入: `import { canonicalMemoryRuntimeConfigExample } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export declare const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig;
```

## `canonicalMemoryRuntimeConfigJsonSchema`

Canonical Memory Runtime Config 的 JSON Schema。

- 种类: 常量
- 导入: `import { canonicalMemoryRuntimeConfigJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export declare const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema;
```

## `canonicalMemoryRuntimeConfigSchema`

Canonical Memory Runtime Config 的运行时 Schema。

- 种类: 常量
- 导入: `import { canonicalMemoryRuntimeConfigSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export declare const canonicalMemoryRuntimeConfigSchema: ZodType<CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig>;
```

## `CanonicalMemoryRuntimeConfig`

Canonical Memory Runtime Config 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CanonicalMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig {
    schemaVersion: '1.0';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeProfile` | 属性 | <code>activeProfile: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profiles` | 属性 | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LoadedCanonicalMemoryRuntimeConfig`

Loaded Canonical Memory Runtime Config 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LoadedCanonicalMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export interface LoadedCanonicalMemoryRuntimeConfig {
    config: MemoryRuntimeConfig;
    references: ReadonlyMap<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: MemoryRuntimeConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `references` | 属性 | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryRuntimeReferenceResolver`

Memory Runtime Reference Resolver 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryRuntimeReferenceResolver } from '@codesoul-co/hypha-memory';`
- 源码模块: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### 声明

```text
export interface MemoryRuntimeReferenceResolver {
    resolve(reference: string, kind: 'connection' | 'secret' | 'environment' | 'dependency'): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolve` | 方法 | <code>resolve(reference: string, kind: "connection" &#124; "secret" &#124; "environment" &#124; "dependency"): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
