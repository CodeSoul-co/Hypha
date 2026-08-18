# `@codesoul-co/hypha-core` / `contracts/execution-output`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-output.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)
- 导出数: **11**

## 模块用法

用于声明并运行时校验契约。Execution output 模块公开 9 接口、2 类型。

### 从包入口导入

```ts
import type {
  CollectedExecutionOutput,
  ExecutionOutputArtifactManager,
  ExecutionOutputCollectionContext,
  ExecutionOutputCollectionItem,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionPolicy,
  ExecutionOutputCollectionResult,
  ExecutionOutputCollector,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CollectedExecutionOutput` | 接口 | <code>interface CollectedExecutionOutput</code> | Collected Execution Output 接口，共包含 6 个公开字段或方法。 |
| `ExecutionOutputArtifactManager` | 接口 | <code>interface ExecutionOutputArtifactManager</code> | Minimal Artifact Manager port required by output collection. |
| `ExecutionOutputCollectionContext` | 接口 | <code>interface ExecutionOutputCollectionContext</code> | Identity and Artifact policy context supplied by the Execution composition root. |
| `ExecutionOutputCollectionItem` | 接口 | <code>interface ExecutionOutputCollectionItem</code> | A bounded, content-addressed file that may be handed to Artifact collection. |
| `ExecutionOutputCollectionPlan` | 接口 | <code>interface ExecutionOutputCollectionPlan</code> | Deterministic output of policy evaluation; creating Artifact records is a later side effect. |
| `ExecutionOutputCollectionPolicy` | 接口 | <code>interface ExecutionOutputCollectionPolicy</code> | Framework-level rules for collecting files produced by an Execution. |
| `ExecutionOutputCollectionResult` | 接口 | <code>interface ExecutionOutputCollectionResult</code> | Execution Output Collection Result 接口，共包含 5 个公开字段或方法。 |
| `ExecutionOutputCollector` | 接口 | <code>interface ExecutionOutputCollector</code> | Execution Output Collector 接口，共包含 1 个公开字段或方法。 |
| `ExecutionOutputPlanner` | 接口 | <code>interface ExecutionOutputPlanner</code> | Execution Output Planner 接口，共包含 1 个公开字段或方法。 |
| `ExecutionOutputSkipReason` | 类型 | <code>type ExecutionOutputSkipReason = 'not_included' &#124; 'excluded' &#124; 'unsupported_mutation' &#124; 'missing_integrity_evidence' &#124; 'artifact_limit' &#124; 'byte_limit'</code> | Execution Output Skip Reason 公共类型别名；完整类型表达式见声明。 |
| `ExecutionOutputTerminalStatus` | 类型 | <code>type ExecutionOutputTerminalStatus = Exclude&lt;CommandExecutionStatus, 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling'&gt;</code> | Execution Output Terminal Status 公共类型别名；完整类型表达式见声明。 |

## `CollectedExecutionOutput`

Collected Execution Output 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CollectedExecutionOutput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface CollectedExecutionOutput {
    relativePath: string;
    artifactRef: string;
    versionId: string;
    contentHash: string;
    sizeBytes: number;
    status: ArtifactStatus;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: ArtifactStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputArtifactManager`

Minimal Artifact Manager port required by output collection.

- 种类: 接口
- 导入: `import type { ExecutionOutputArtifactManager } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputArtifactManager {
    createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createFromWorkspace` | 方法 | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `finalize` | 方法 | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionOutputCollectionContext`

Identity and Artifact policy context supplied by the Execution composition root.

- 种类: 接口
- 导入: `import type { ExecutionOutputCollectionContext } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollectionContext {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    idempotencyKeyPrefix?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKeyPrefix` | 属性 | <code>idempotencyKeyPrefix?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputCollectionItem`

A bounded, content-addressed file that may be handed to Artifact collection.

- 种类: 接口
- 导入: `import type { ExecutionOutputCollectionItem } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollectionItem {
    relativePath: string;
    contentHash: string;
    sizeBytes: number;
    kind: ArtifactKind;
    mimeType?: string;
    existingArtifactRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `existingArtifactRef` | 属性 | <code>existingArtifactRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: ArtifactKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mimeType` | 属性 | <code>mimeType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relativePath` | 属性 | <code>relativePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputCollectionPlan`

Deterministic output of policy evaluation; creating Artifact records is a later side effect.

- 种类: 接口
- 导入: `import type { ExecutionOutputCollectionPlan } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollectionPlan {
    executionId: string;
    status: ExecutionOutputTerminalStatus;
    items: ExecutionOutputCollectionItem[];
    existingArtifactRefs: string[];
    totalBytes: number;
    finalize: boolean;
    skipped: Record<ExecutionOutputSkipReason, number>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `existingArtifactRefs` | 属性 | <code>existingArtifactRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalize` | 属性 | <code>finalize: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `items` | 属性 | <code>items: ExecutionOutputCollectionItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skipped` | 属性 | <code>skipped: Record&lt;ExecutionOutputSkipReason, number&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: ExecutionOutputTerminalStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputCollectionPolicy`

Framework-level rules for collecting files produced by an Execution.

- 种类: 接口
- 导入: `import type { ExecutionOutputCollectionPolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollectionPolicy {
    includePatterns?: string[];
    excludePatterns?: string[];
    maxArtifacts?: number;
    maxTotalBytes?: number;
    classifyByExtension?: boolean;
    finalizeOnSuccess?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classifyByExtension` | 属性 | <code>classifyByExtension?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `excludePatterns` | 属性 | <code>excludePatterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalizeOnSuccess` | 属性 | <code>finalizeOnSuccess?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includePatterns` | 属性 | <code>includePatterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxArtifacts` | 属性 | <code>maxArtifacts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalBytes` | 属性 | <code>maxTotalBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputCollectionResult`

Execution Output Collection Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionOutputCollectionResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollectionResult {
    executionId: string;
    collected: CollectedExecutionOutput[];
    existingArtifactRefs: string[];
    artifactRefs: string[];
    finalizedArtifactRefs: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `collected` | 属性 | <code>collected: CollectedExecutionOutput[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `existingArtifactRefs` | 属性 | <code>existingArtifactRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalizedArtifactRefs` | 属性 | <code>finalizedArtifactRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionOutputCollector`

Execution Output Collector 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionOutputCollector } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputCollector {
    collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise<ExecutionOutputCollectionResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionOutputPlanner`

Execution Output Planner 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionOutputPlanner } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export interface ExecutionOutputPlanner {
    plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `plan` | 方法 | <code>plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionOutputSkipReason`

Execution Output Skip Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionOutputSkipReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export type ExecutionOutputSkipReason = 'not_included' | 'excluded' | 'unsupported_mutation' | 'missing_integrity_evidence' | 'artifact_limit' | 'byte_limit';
```

## `ExecutionOutputTerminalStatus`

Execution Output Terminal Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionOutputTerminalStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### 声明

```text
export type ExecutionOutputTerminalStatus = Exclude<CommandExecutionStatus, 'queued' | 'starting' | 'running' | 'cancelling'>;
```
