# `@codesoul-co/hypha-core` / `contracts/runtime-replay`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-replay.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)
- 导出数: **8**

## 模块用法

用于声明并运行时校验契约。Runtime replay 模块公开 1 常量、6 接口、1 类型。

### 从包入口导入

```ts
import {
  RUNTIME_REPLAY_DIVERGENCE_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeReplayDivergence,
  RuntimeReplayRequest,
  RuntimeReplayResult,
  RuntimeReplayServiceContract,
  RuntimeReplayVerificationRequest,
  RuntimeReplayVerificationResult,
  RuntimeReplayDivergenceKind,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_REPLAY_DIVERGENCE_KINDS` | 常量 | <code>const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"]</code> | 由 `contracts/runtime-replay` 模块导出的 RUNTIME REPLAY DIVERGENCE KINDS 常量。 |
| `RuntimeReplayDivergence` | 接口 | <code>interface RuntimeReplayDivergence</code> | Runtime Replay Divergence 接口，共包含 4 个公开字段或方法。 |
| `RuntimeReplayRequest` | 接口 | <code>interface RuntimeReplayRequest</code> | Runtime Replay Request 接口，共包含 7 个公开字段或方法。 |
| `RuntimeReplayResult` | 接口 | <code>interface RuntimeReplayResult</code> | Runtime Replay Result 接口，共包含 16 个公开字段或方法。 |
| `RuntimeReplayServiceContract` | 接口 | <code>interface RuntimeReplayServiceContract</code> | Runtime Replay Service Contract 接口，共包含 2 个公开字段或方法。 |
| `RuntimeReplayVerificationRequest` | 接口 | <code>interface RuntimeReplayVerificationRequest</code> | Runtime Replay Verification Request 接口，共包含 2 个公开字段或方法。 |
| `RuntimeReplayVerificationResult` | 接口 | <code>interface RuntimeReplayVerificationResult</code> | Runtime Replay Verification Result 接口，共包含 3 个公开字段或方法。 |
| `RuntimeReplayDivergenceKind` | 类型 | <code>type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number]</code> | Runtime Replay Divergence Kind 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_REPLAY_DIVERGENCE_KINDS`

由 `contracts/runtime-replay` 模块导出的 RUNTIME REPLAY DIVERGENCE KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_REPLAY_DIVERGENCE_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export declare const RUNTIME_REPLAY_DIVERGENCE_KINDS: readonly ["workflow_revision", "process_hash", "dependency_snapshot", "projection_version", "snapshot_checksum"];
```

## `RuntimeReplayDivergence`

Runtime Replay Divergence 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayDivergence } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayDivergence {
    kind: RuntimeReplayDivergenceKind;
    expected: string;
    actual: string;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actual` | 属性 | <code>actual: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expected` | 属性 | <code>expected: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "workflow_revision" &#124; "process_hash" &#124; "dependency_snapshot" &#124; "projection_version" &#124; "snapshot_checksum"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeReplayRequest`

Runtime Replay Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayRequest {
    scope: RuntimeScope;
    checkpointId?: string;
    expectedWorkflowRevision: string;
    expectedProcessHash: string;
    expectedDependencySnapshotRef: string;
    toSequence?: number;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedDependencySnapshotRef` | 属性 | <code>expectedDependencySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedProcessHash` | 属性 | <code>expectedProcessHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedWorkflowRevision` | 属性 | <code>expectedWorkflowRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toSequence` | 属性 | <code>toSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeReplayResult`

Runtime Replay Result 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayResult {
    sourceRunId: string;
    mode: 'deterministic';
    checkpointId: string;
    baseEventSequence: number;
    targetEventSequence: number;
    replayedEventCount: number;
    appliedEventCount: number;
    eventIds: string[];
    workflowRevision: string;
    processHash: string;
    dependencySnapshotRef: string;
    projectionVersion: string;
    finalSnapshot: RuntimeOrchestrationProjection;
    finalSnapshotChecksum: string;
    divergences: RuntimeReplayDivergence[];
    completedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appliedEventCount` | 属性 | <code>appliedEventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseEventSequence` | 属性 | <code>baseEventSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `divergences` | 属性 | <code>divergences: RuntimeReplayDivergence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalSnapshot` | 属性 | <code>finalSnapshot: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalSnapshotChecksum` | 属性 | <code>finalSnapshotChecksum: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "deterministic"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processHash` | 属性 | <code>processHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayedEventCount` | 属性 | <code>replayedEventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceRunId` | 属性 | <code>sourceRunId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetEventSequence` | 属性 | <code>targetEventSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeReplayServiceContract`

Runtime Replay Service Contract 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayServiceContract } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayServiceContract {
    replay(request: RuntimeReplayRequest): Promise<RuntimeReplayResult>;
    verify(request: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `replay` | 方法 | <code>replay(request: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verify` | 方法 | <code>verify(request: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeReplayVerificationRequest`

Runtime Replay Verification Request 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayVerificationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayVerificationRequest {
    replay: RuntimeReplayRequest;
    expectedSnapshotChecksum: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSnapshotChecksum` | 属性 | <code>expectedSnapshotChecksum: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replay` | 属性 | <code>replay: RuntimeReplayRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeReplayVerificationResult`

Runtime Replay Verification Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeReplayVerificationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export interface RuntimeReplayVerificationResult {
    replay: RuntimeReplayResult;
    matches: boolean;
    divergences: RuntimeReplayDivergence[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `divergences` | 属性 | <code>divergences: RuntimeReplayDivergence[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matches` | 属性 | <code>matches: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replay` | 属性 | <code>replay: RuntimeReplayResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeReplayDivergenceKind`

Runtime Replay Divergence Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeReplayDivergenceKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-replay`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay.ts)

### 声明

```text
export type RuntimeReplayDivergenceKind = (typeof RUNTIME_REPLAY_DIVERGENCE_KINDS)[number];
```
