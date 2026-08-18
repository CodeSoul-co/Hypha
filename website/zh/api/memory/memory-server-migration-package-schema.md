# `@codesoul-co/hypha-memory` / `memory-server-migration-package-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-package-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)
- 导出数: **3**

## 模块用法

用于声明并运行时校验契约。Memory server migration package schema 模块公开 2 常量、1 函数。

### 从包入口导入

```ts
import {
  memoryServerMigrationPackageSpecJsonSchema,
  memoryServerMigrationPackageSpecSchema,
  validateMemoryServerMigrationPackageSpec,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpecJsonSchema` | 常量 | <code>const memoryServerMigrationPackageSpecJsonSchema: JsonSchema</code> | Memory Server Migration Package Spec 的 JSON Schema。 |
| `memoryServerMigrationPackageSpecSchema` | 常量 | <code>const memoryServerMigrationPackageSpecSchema: ZodType&lt;MemoryServerMigrationPackageSpec, ZodTypeDef, MemoryServerMigrationPackageSpec&gt;</code> | Memory Server Migration Package Spec 的运行时 Schema。 |
| `validateMemoryServerMigrationPackageSpec` | 函数 | <code>validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec</code> | Validate Memory Server Migration Package Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `memoryServerMigrationPackageSpecJsonSchema`

Memory Server Migration Package Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryServerMigrationPackageSpecJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### 声明

```text
export declare const memoryServerMigrationPackageSpecJsonSchema: JsonSchema;
```

## `memoryServerMigrationPackageSpecSchema`

Memory Server Migration Package Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryServerMigrationPackageSpecSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### 声明

```text
export declare const memoryServerMigrationPackageSpecSchema: ZodType<MemoryServerMigrationPackageSpec, ZodTypeDef, MemoryServerMigrationPackageSpec>;
```

## `validateMemoryServerMigrationPackageSpec`

Validate Memory Server Migration Package Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryServerMigrationPackageSpec } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)

### 声明

```text
export declare function validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec;
```

### 调用签名

```text
validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryServerMigrationPackageSpec`
- 说明: 返回值契约由上述类型定义。
