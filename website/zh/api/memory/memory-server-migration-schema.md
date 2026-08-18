# `@codesoul-co/hypha-memory` / `memory-server-migration-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)
- 导出数: **3**

## 模块用法

用于声明并运行时校验契约。Memory server migration schema 模块公开 2 常量、1 函数。

### 从包入口导入

```ts
import {
  memoryServerMigrationAcceptanceJsonSchema,
  memoryServerMigrationAcceptanceSchema,
  validateMemoryServerMigrationAcceptance,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptanceJsonSchema` | 常量 | <code>const memoryServerMigrationAcceptanceJsonSchema: JsonSchema</code> | Memory Server Migration Acceptance 的 JSON Schema。 |
| `memoryServerMigrationAcceptanceSchema` | 常量 | <code>const memoryServerMigrationAcceptanceSchema: ZodType&lt;MemoryServerMigrationAcceptance, ZodTypeDef, MemoryServerMigrationAcceptance&gt;</code> | Memory Server Migration Acceptance 的运行时 Schema。 |
| `validateMemoryServerMigrationAcceptance` | 函数 | <code>validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance</code> | Validate Memory Server Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `memoryServerMigrationAcceptanceJsonSchema`

Memory Server Migration Acceptance 的 JSON Schema。

- 种类: 常量
- 导入: `import { memoryServerMigrationAcceptanceJsonSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### 声明

```text
export declare const memoryServerMigrationAcceptanceJsonSchema: JsonSchema;
```

## `memoryServerMigrationAcceptanceSchema`

Memory Server Migration Acceptance 的运行时 Schema。

- 种类: 常量
- 导入: `import { memoryServerMigrationAcceptanceSchema } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### 声明

```text
export declare const memoryServerMigrationAcceptanceSchema: ZodType<MemoryServerMigrationAcceptance, ZodTypeDef, MemoryServerMigrationAcceptance>;
```

## `validateMemoryServerMigrationAcceptance`

Validate Memory Server Migration Acceptance 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateMemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-schema`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)

### 声明

```text
export declare function validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance;
```

### 调用签名

```text
validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryServerMigrationAcceptance`
- 说明: 返回值契约由上述类型定义。
