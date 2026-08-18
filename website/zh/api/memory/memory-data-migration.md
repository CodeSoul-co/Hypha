# `@codesoul-co/hypha-memory` / `memory-data-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-data-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)
- 导出数: **8**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory data migration 模块公开 2 类、1 函数、5 接口。

### 从包入口导入

```ts
import {
  MemoryDataMigrationCoordinator,
  StructuredMemoryDataMigrationStateStore,
  migrationPlanHash,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryDataMigrationCoordinatorOptions,
  MemoryDataMigrationPlan,
  MemoryDataMigrationState,
  MemoryDataMigrationStateStore,
  MemoryDataMigrationStep,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryDataMigrationCoordinator` | 类 | <code>new MemoryDataMigrationCoordinator(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Resumable migration/rollback runner. Step implementations remain with the data owner. |
| `StructuredMemoryDataMigrationStateStore` | 类 | <code>new StructuredMemoryDataMigrationStateStore(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Structured Memory Data Migration State Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `migrationPlanHash` | 函数 | <code>migrationPlanHash(plan: MemoryDataMigrationPlan): string</code> | Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryDataMigrationCoordinatorOptions` | 接口 | <code>interface MemoryDataMigrationCoordinatorOptions</code> | Memory Data Migration Coordinator Options 接口，共包含 2 个公开字段或方法。 |
| `MemoryDataMigrationPlan` | 接口 | <code>interface MemoryDataMigrationPlan</code> | Memory Data Migration Plan 接口，共包含 5 个公开字段或方法。 |
| `MemoryDataMigrationState` | 接口 | <code>interface MemoryDataMigrationState</code> | Memory Data Migration State 接口，共包含 9 个公开字段或方法。 |
| `MemoryDataMigrationStateStore` | 接口 | <code>interface MemoryDataMigrationStateStore</code> | Memory Data Migration State Store 接口，共包含 2 个公开字段或方法。 |
| `MemoryDataMigrationStep` | 接口 | <code>interface MemoryDataMigrationStep</code> | Memory Data Migration Step 接口，共包含 3 个公开字段或方法。 |

## `MemoryDataMigrationCoordinator`

Resumable migration/rollback runner. Step implementations remain with the data owner.

- 种类: 类
- 导入: `import { MemoryDataMigrationCoordinator } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export declare class MemoryDataMigrationCoordinator {
    constructor(options: MemoryDataMigrationCoordinatorOptions);
    apply(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState>;
    rollback(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | 创建该类的实例。 |
| `rollback` | 方法 | <code>rollback(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `StructuredMemoryDataMigrationStateStore`

Structured Memory Data Migration State Store 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { StructuredMemoryDataMigrationStateStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export declare class StructuredMemoryDataMigrationStateStore implements MemoryDataMigrationStateStore {
    constructor(store: StructuredStoreProvider, table?: string);
    get(planId: string): Promise<MemoryDataMigrationState | null>;
    save(state: MemoryDataMigrationState): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `migrationPlanHash`

Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { migrationPlanHash } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export declare function migrationPlanHash(plan: MemoryDataMigrationPlan): string;
```

### 调用签名

```text
migrationPlanHash(plan: MemoryDataMigrationPlan): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `plan` | <code>MemoryDataMigrationPlan</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `MemoryDataMigrationCoordinatorOptions`

Memory Data Migration Coordinator Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDataMigrationCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export interface MemoryDataMigrationCoordinatorOptions {
    stateStore: MemoryDataMigrationStateStore;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stateStore` | 属性 | <code>stateStore: MemoryDataMigrationStateStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDataMigrationPlan`

Memory Data Migration Plan 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDataMigrationPlan } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export interface MemoryDataMigrationPlan {
    id: string;
    version: string;
    source: string;
    target: string;
    steps: readonly MemoryDataMigrationStep[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `steps` | 属性 | <code>steps: readonly MemoryDataMigrationStep[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDataMigrationState`

Memory Data Migration State 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDataMigrationState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export interface MemoryDataMigrationState {
    id: string;
    planId: string;
    planVersion: string;
    planHash: string;
    state: 'pending' | 'applying' | 'applied' | 'rolling_back' | 'rolled_back' | 'failed';
    appliedStepIds: string[];
    activeStepId?: string;
    lastError?: ReturnType<typeof normalizeMemoryError>;
    updatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeStepId` | 属性 | <code>activeStepId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `appliedStepIds` | 属性 | <code>appliedStepIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastError` | 属性 | <code>lastError?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planId` | 属性 | <code>planId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planVersion` | 属性 | <code>planVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: "failed" &#124; "applied" &#124; "pending" &#124; "applying" &#124; "rolling_back" &#124; "rolled_back"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryDataMigrationStateStore`

Memory Data Migration State Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDataMigrationStateStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export interface MemoryDataMigrationStateStore {
    get(planId: string): Promise<MemoryDataMigrationState | null>;
    save(state: MemoryDataMigrationState): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryDataMigrationStep`

Memory Data Migration Step 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDataMigrationStep } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### 声明

```text
export interface MemoryDataMigrationStep {
    id: string;
    apply(): Promise<void>;
    rollback(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rollback` | 方法 | <code>rollback(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
