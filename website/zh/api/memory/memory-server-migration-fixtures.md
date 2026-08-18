# `@codesoul-co/hypha-memory` / `memory-server-migration-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)
- 导出数: **2**

## 模块用法

用于编写确定性测试与契约断言。Memory server migration fixtures 模块公开 2 常量。

### 从包入口导入

```ts
import {
  compliantMemoryServerSkeletonPorts,
  legacyMemoryServerGapPorts,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compliantMemoryServerSkeletonPorts` | 常量 | <code>const compliantMemoryServerSkeletonPorts: MemoryServerMigrationAcceptancePorts</code> | Minimal positive fixture proving that the acceptance runner is adapter-neutral. |
| `legacyMemoryServerGapPorts` | 常量 | <code>const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts</code> | Reproduces the three audited legacy gaps without importing Server-owned code. |

## `compliantMemoryServerSkeletonPorts`

Minimal positive fixture proving that the acceptance runner is adapter-neutral.

- 种类: 常量
- 导入: `import { compliantMemoryServerSkeletonPorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)

### 声明

```text
export declare const compliantMemoryServerSkeletonPorts: MemoryServerMigrationAcceptancePorts;
```

## `legacyMemoryServerGapPorts`

Reproduces the three audited legacy gaps without importing Server-owned code.

- 种类: 常量
- 导入: `import { legacyMemoryServerGapPorts } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-fixtures.ts)

### 声明

```text
export declare const legacyMemoryServerGapPorts: MemoryServerMigrationAcceptancePorts;
```
