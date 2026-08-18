# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)
- 导出数: **6**

## 模块用法

用于编写确定性测试与契约断言。Memory server permanent migration fixtures 模块公开 1 常量、2 函数、2 接口、1 类型。

### 从包入口导入

```ts
import {
  permanentMemoryFailureFixtures,
  createPermanentMemoryMigrationAdapterHarness,
  createReferencePermanentMemoryMigrationHarness,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryFailureFixture,
  PermanentMemoryMigrationAcceptanceHarness,
  PermanentMemoryMigrationHarnessFactory,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `permanentMemoryFailureFixtures` | 常量 | <code>const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[]</code> | 由 `memory-server-permanent-migration-fixtures` 模块导出的 Permanent Memory Failure Fixtures 常量。 |
| `createPermanentMemoryMigrationAdapterHarness` | 函数 | <code>createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Create Permanent Memory Migration Adapter Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createReferencePermanentMemoryMigrationHarness` | 函数 | <code>createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Create Reference Permanent Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `PermanentMemoryFailureFixture` | 接口 | <code>interface PermanentMemoryFailureFixture</code> | Permanent Memory Failure Fixture 接口，共包含 10 个公开字段或方法。 |
| `PermanentMemoryMigrationAcceptanceHarness` | 接口 | <code>interface PermanentMemoryMigrationAcceptanceHarness</code> | Permanent Memory Migration Acceptance Harness 接口，共包含 2 个公开字段或方法。 |
| `PermanentMemoryMigrationHarnessFactory` | 类型 | <code>type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) =&gt; PermanentMemoryMigrationAcceptanceHarness</code> | Permanent Memory Migration Harness Factory 公共类型别名；完整类型表达式见声明。 |

## `permanentMemoryFailureFixtures`

由 `memory-server-permanent-migration-fixtures` 模块导出的 Permanent Memory Failure Fixtures 常量。

- 种类: 常量
- 导入: `import { permanentMemoryFailureFixtures } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export declare const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[];
```

## `createPermanentMemoryMigrationAdapterHarness`

Create Permanent Memory Migration Adapter Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createPermanentMemoryMigrationAdapterHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export declare function createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness;
```

### 调用签名

```text
createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `fixture` | <code>PermanentMemoryFailureFixture</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PermanentMemoryMigrationAcceptanceHarness`
- 说明: 返回值契约由上述类型定义。

## `createReferencePermanentMemoryMigrationHarness`

Create Reference Permanent Memory Migration Harness 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createReferencePermanentMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export declare function createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness;
```

### 调用签名

```text
createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `fixture` | <code>PermanentMemoryFailureFixture</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `PermanentMemoryMigrationAcceptanceHarness`
- 说明: 返回值契约由上述类型定义。

## `PermanentMemoryFailureFixture`

Permanent Memory Failure Fixture 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryFailureFixture } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export interface PermanentMemoryFailureFixture {
    id: string;
    operation: PermanentMemoryMigrationOperation;
    providerError: Record<string, unknown>;
    expectedCode?: NormalizedMemoryError['code'];
    expectedRetryable?: boolean;
    expectedDisposition?: PermanentMemoryFailureDisposition;
    expectedFinalState?: PermanentMemoryFailureFinalState;
    expectedEmpty?: 'null' | 'array' | 'false';
    attempt?: number;
    maxAttempts?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedCode` | 属性 | <code>expectedCode?: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PR...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedDisposition` | 属性 | <code>expectedDisposition?: PermanentMemoryFailureDisposition</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedEmpty` | 属性 | <code>expectedEmpty?: "array" &#124; "null" &#124; "false"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedFinalState` | 属性 | <code>expectedFinalState?: PermanentMemoryFailureFinalState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRetryable` | 属性 | <code>expectedRetryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: PermanentMemoryMigrationOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerError` | 属性 | <code>providerError: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryMigrationAcceptanceHarness`

Permanent Memory Migration Acceptance Harness 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PermanentMemoryMigrationAcceptanceHarness } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export interface PermanentMemoryMigrationAcceptanceHarness {
    port: PermanentMemoryMigrationPort;
    events: PermanentMemoryFailureEvent[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PermanentMemoryFailureEvent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `port` | 属性 | <code>port: PermanentMemoryMigrationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PermanentMemoryMigrationHarnessFactory`

Permanent Memory Migration Harness Factory 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PermanentMemoryMigrationHarnessFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### 声明

```text
export type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) => PermanentMemoryMigrationAcceptanceHarness;
```
