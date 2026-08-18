# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-report`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-report.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)
- 导出数: **9**

## 模块用法

用于定义或实现 Provider-neutral Port。Legacy tool artifact migration report 模块公开 6 函数、3 接口。

### 从包入口导入

```ts
import {
  isLegacyToolArtifactMigrationExecutionReportId,
  isLegacyToolArtifactMigrationPlanHash,
  isLegacyToolArtifactMigrationRollbackReportId,
  legacyToolArtifactMigrationExecutionReportId,
  legacyToolArtifactMigrationPlanHash,
  legacyToolArtifactMigrationRollbackReportId,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationExecutionEvidence,
  LegacyToolArtifactMigrationPlanEvidence,
  LegacyToolArtifactMigrationRollbackEvidence,
} from '@codesoul-co/hypha-adapters-local';
```

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `isLegacyToolArtifactMigrationExecutionReportId` | 函数 | <code>isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Execution Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isLegacyToolArtifactMigrationPlanHash` | 函数 | <code>isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isLegacyToolArtifactMigrationRollbackReportId` | 函数 | <code>isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Rollback Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `legacyToolArtifactMigrationExecutionReportId` | 函数 | <code>legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string</code> | Legacy Tool Artifact Migration Execution Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `legacyToolArtifactMigrationPlanHash` | 函数 | <code>legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string</code> | Legacy Tool Artifact Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `legacyToolArtifactMigrationRollbackReportId` | 函数 | <code>legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string</code> | Legacy Tool Artifact Migration Rollback Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `LegacyToolArtifactMigrationExecutionEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionEvidence</code> | Legacy Tool Artifact Migration Execution Evidence 接口，共包含 6 个公开字段或方法。 |
| `LegacyToolArtifactMigrationPlanEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationPlanEvidence</code> | Legacy Tool Artifact Migration Plan Evidence 接口，共包含 5 个公开字段或方法。 |
| `LegacyToolArtifactMigrationRollbackEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackEvidence</code> | Legacy Tool Artifact Migration Rollback Evidence 接口，共包含 6 个公开字段或方法。 |

## `isLegacyToolArtifactMigrationExecutionReportId`

Is Legacy Tool Artifact Migration Execution Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isLegacyToolArtifactMigrationExecutionReportId } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string;
```

### 调用签名

```text
isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is string`
- 说明: 返回值契约由上述类型定义。

## `isLegacyToolArtifactMigrationPlanHash`

Is Legacy Tool Artifact Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isLegacyToolArtifactMigrationPlanHash } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string;
```

### 调用签名

```text
isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is string`
- 说明: 返回值契约由上述类型定义。

## `isLegacyToolArtifactMigrationRollbackReportId`

Is Legacy Tool Artifact Migration Rollback Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isLegacyToolArtifactMigrationRollbackReportId } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string;
```

### 调用签名

```text
isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is string`
- 说明: 返回值契约由上述类型定义。

## `legacyToolArtifactMigrationExecutionReportId`

Legacy Tool Artifact Migration Execution Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { legacyToolArtifactMigrationExecutionReportId } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string;
```

### 调用签名

```text
legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `report` | <code>LegacyToolArtifactMigrationExecutionEvidence</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `legacyToolArtifactMigrationPlanHash`

Legacy Tool Artifact Migration Plan Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { legacyToolArtifactMigrationPlanHash } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string;
```

### 调用签名

```text
legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `plan` | <code>LegacyToolArtifactMigrationPlanEvidence</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `legacyToolArtifactMigrationRollbackReportId`

Legacy Tool Artifact Migration Rollback Report ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { legacyToolArtifactMigrationRollbackReportId } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export declare function legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string;
```

### 调用签名

```text
legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `report` | <code>LegacyToolArtifactMigrationRollbackEvidence</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `LegacyToolArtifactMigrationExecutionEvidence`

Legacy Tool Artifact Migration Execution Evidence 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationExecutionEvidence } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationExecutionEvidence {
    planHash: string;
    mode: 'dry_run' | 'execute';
    items: unknown[];
    skipped: unknown[];
    summary: unknown;
    reportId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "execute" &#124; "dry_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportId` | 属性 | <code>reportId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationPlanEvidence`

Legacy Tool Artifact Migration Plan Evidence 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationPlanEvidence } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationPlanEvidence {
    imports: unknown[];
    skipped: unknown[];
    totalEntries: number;
    totalBytes: number;
    planHash?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `imports` | 属性 | <code>imports: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalEntries` | 属性 | <code>totalEntries: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LegacyToolArtifactMigrationRollbackEvidence`

Legacy Tool Artifact Migration Rollback Evidence 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LegacyToolArtifactMigrationRollbackEvidence } from '@codesoul-co/hypha-adapters-local';`
- 源码模块: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### 声明

```text
export interface LegacyToolArtifactMigrationRollbackEvidence {
    planHash: string;
    executionReportId: string;
    mode: 'dry_run' | 'rollback';
    items: unknown[];
    summary: unknown;
    reportId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionReportId` | 属性 | <code>executionReportId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `items` | 属性 | <code>items: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "rollback" &#124; "dry_run"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `planHash` | 属性 | <code>planHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportId` | 属性 | <code>reportId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
