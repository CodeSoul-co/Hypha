# `@codesoul-co/hypha-core` / `contracts/artifact-retention`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Artifact retention 模块公开 7 接口、2 类型。

### 从包入口导入

```ts
import type {
  ArtifactRetentionDecision,
  ArtifactRetentionEvaluationRequest,
  ArtifactRetentionEvaluator,
  ArtifactRetentionProcessor,
  ArtifactRetentionProcessRequest,
  ArtifactRetentionProcessResult,
  DefaultArtifactRetentionProcessorOptions,
  ArtifactRetentionAction,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactRetentionDecision` | 接口 | <code>interface ArtifactRetentionDecision</code> | Artifact Retention Decision 接口，共包含 3 个公开字段或方法。 |
| `ArtifactRetentionEvaluationRequest` | 接口 | <code>interface ArtifactRetentionEvaluationRequest</code> | Artifact Retention Evaluation Request 接口，共包含 3 个公开字段或方法。 |
| `ArtifactRetentionEvaluator` | 接口 | <code>interface ArtifactRetentionEvaluator</code> | Artifact Retention Evaluator 接口，共包含 1 个公开字段或方法。 |
| `ArtifactRetentionProcessor` | 接口 | <code>interface ArtifactRetentionProcessor</code> | Artifact Retention Processor 接口，共包含 1 个公开字段或方法。 |
| `ArtifactRetentionProcessRequest` | 接口 | <code>interface ArtifactRetentionProcessRequest</code> | Artifact Retention Process Request 接口，共包含 6 个公开字段或方法。 |
| `ArtifactRetentionProcessResult` | 接口 | <code>interface ArtifactRetentionProcessResult</code> | Artifact Retention Process Result 接口，共包含 7 个公开字段或方法。 |
| `DefaultArtifactRetentionProcessorOptions` | 接口 | <code>interface DefaultArtifactRetentionProcessorOptions</code> | Default Artifact Retention Processor Options 接口，共包含 4 个公开字段或方法。 |
| `ArtifactRetentionAction` | 类型 | <code>type ArtifactRetentionAction = 'retain' &#124; 'archive' &#124; 'delete'</code> | Artifact Retention Action 公共类型别名；完整类型表达式见声明。 |
| `ArtifactRetentionDecisionReason` | 类型 | <code>type ArtifactRetentionDecisionReason = 'not_due' &#124; 'already_terminal' &#124; 'archive_after' &#124; 'delete_after' &#124; 'expired' &#124; 'legal_hold' &#124; 'referenced' &#124; 'retain_final' &#124; 'retain_failure'</code> | Artifact Retention Decision Reason 公共类型别名；完整类型表达式见声明。 |

## `ArtifactRetentionDecision`

Artifact Retention Decision 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionDecision } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionDecision {
    action: ArtifactRetentionAction;
    reason: ArtifactRetentionDecisionReason;
    effectiveAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: ArtifactRetentionAction</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effectiveAt` | 属性 | <code>effectiveAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: ArtifactRetentionDecisionReason</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionEvaluationRequest`

Artifact Retention Evaluation Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionEvaluationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionEvaluationRequest {
    record: ArtifactRecord;
    profile: ArtifactProfileSpec;
    evaluatedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profile` | 属性 | <code>profile: ArtifactProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: ArtifactRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionEvaluator`

Artifact Retention Evaluator 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionEvaluator } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionEvaluator {
    evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactRetentionProcessor`

Artifact Retention Processor 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionProcessor {
    process(request: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `process` | 方法 | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactRetentionProcessRequest`

Artifact Retention Process Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionProcessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionProcessRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    evaluatedAt?: string;
    dryRun?: boolean;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dryRun` | 属性 | <code>dryRun?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionProcessResult`

Artifact Retention Process Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactRetentionProcessResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface ArtifactRetentionProcessResult {
    artifactId: string;
    versionId: string;
    workspaceId: string;
    decision: ArtifactRetentionDecision;
    /** True when this invocation applied the retention mutation. */
    applied: boolean;
    /** True when the same idempotent mutation was committed by an earlier attempt. */
    replayed: boolean;
    dryRun: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `applied` | 属性 | <code>applied: boolean</code> | True when this invocation applied the retention mutation. |
| `artifactId` | 属性 | <code>artifactId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: ArtifactRetentionDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dryRun` | 属性 | <code>dryRun: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayed` | 属性 | <code>replayed: boolean</code> | True when the same idempotent mutation was committed by an earlier attempt. |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DefaultArtifactRetentionProcessorOptions`

Default Artifact Retention Processor Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultArtifactRetentionProcessorOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export interface DefaultArtifactRetentionProcessorOptions {
    manager: ArtifactManager;
    repository: ArtifactRecordRepository;
    evaluator?: ArtifactRetentionEvaluator;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluator` | 属性 | <code>evaluator?: ArtifactRetentionEvaluator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manager` | 属性 | <code>manager: ArtifactManager</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `repository` | 属性 | <code>repository: ArtifactRecordRepository</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactRetentionAction`

Artifact Retention Action 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactRetentionAction } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export type ArtifactRetentionAction = 'retain' | 'archive' | 'delete';
```

## `ArtifactRetentionDecisionReason`

Artifact Retention Decision Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactRetentionDecisionReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### 声明

```text
export type ArtifactRetentionDecisionReason = 'not_due' | 'already_terminal' | 'archive_after' | 'delete_after' | 'expired' | 'legal_hold' | 'referenced' | 'retain_final' | 'retain_failure';
```
