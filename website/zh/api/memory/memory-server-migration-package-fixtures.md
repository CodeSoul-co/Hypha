# `@codesoul-co/hypha-memory` / `memory-server-migration-package-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-package-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)
- 导出数: **3**

## 模块用法

用于编写确定性测试与契约断言。Memory server migration package fixtures 模块公开 3 常量。

### 从包入口导入

```ts
import {
  canonicalNativeMemoryServerMigrationPackagePorts,
  compliantFrameworkMemoryServerMigrationPackagePorts,
  legacyMemoryServerMigrationPackagePorts,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalNativeMemoryServerMigrationPackagePorts` | 常量 | <code>const canonicalNativeMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Canonical Native fixture: real runtime receipt plus concrete migration adapters. |
| `compliantFrameworkMemoryServerMigrationPackagePorts` | 常量 | <code>const compliantFrameworkMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Framework reference fixture: adapter-neutral in-memory behavior with canonical contracts. |
| `legacyMemoryServerMigrationPackagePorts` | 常量 | <code>const legacyMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts</code> | Legacy failure fixture: every suite preserves at least one audited defect. |

## `canonicalNativeMemoryServerMigrationPackagePorts`

Canonical Native fixture: real runtime receipt plus concrete migration adapters.

- 种类: 常量
- 导入: `import { canonicalNativeMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### 声明

```text
export declare const canonicalNativeMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```

## `compliantFrameworkMemoryServerMigrationPackagePorts`

Framework reference fixture: adapter-neutral in-memory behavior with canonical contracts.

- 种类: 常量
- 导入: `import { compliantFrameworkMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### 声明

```text
export declare const compliantFrameworkMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```

## `legacyMemoryServerMigrationPackagePorts`

Legacy failure fixture: every suite preserves at least one audited defect.

- 种类: 常量
- 导入: `import { legacyMemoryServerMigrationPackagePorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-package-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-fixtures.ts)

### 声明

```text
export declare const legacyMemoryServerMigrationPackagePorts: MemoryServerMigrationPackagePorts;
```
