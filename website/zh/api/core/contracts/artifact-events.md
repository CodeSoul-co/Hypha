# `@codesoul-co/hypha-core` / `contracts/artifact-events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/artifact-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)
- 导出数: **7**

## 模块用法

用于声明并运行时校验契约。Artifact events 模块公开 2 接口、5 类型。

### 从包入口导入

```ts
import type {
  ArtifactEventPayload,
  ArtifactEventPublisher,
  ArtifactEventCreateInput,
  ArtifactEventPayloadMap,
  ArtifactEventPublication,
  ArtifactFrameworkEvent,
  ArtifactFrameworkEventType,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactEventPayload` | 接口 | <code>interface ArtifactEventPayload</code> | Artifact Event Payload 接口，共包含 19 个公开字段或方法。 |
| `ArtifactEventPublisher` | 接口 | <code>interface ArtifactEventPublisher</code> | Runtime-owned adapters must durably and idempotently publish by publication ID. |
| `ArtifactEventCreateInput` | 类型 | <code>type ArtifactEventCreateInput = Omit&lt;EventCreateInput&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Artifact Event Create Input 公共类型别名；完整类型表达式见声明。 |
| `ArtifactEventPayloadMap` | 类型 | <code>type ArtifactEventPayloadMap = { 'artifact.create.requested': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'workspaceId' &#124; 'profileRef'&gt;; 'artifact.created': ArtifactStatusEventPayload&lt;'draft'&gt; &amp; ArtifactEventPayloadWithRequired&lt;'logicalArtifactId' &#124; 'contentHash'&gt;; 'artifact.deduplicated': ArtifactEventPayloadWithRequired&lt;'operationId' &#124; 'artifactId' &#124; 'versionId' &#124; 'contentHash' &#124; 'deduplicated'&gt; &amp; { dedupli...</code> | Artifact Event Payload Map 公共类型别名；完整类型表达式见声明。 |
| `ArtifactEventPublication` | 类型 | <code>type ArtifactEventPublication = { id: string; type: TType; timestamp: string; payload: ArtifactEventPayloadMap[TType]; workspaceId?: string; sessionId?: string; runId?: string; agentId?: string; }</code> | Artifact Event Publication 公共类型别名；完整类型表达式见声明。 |
| `ArtifactFrameworkEvent` | 类型 | <code>type ArtifactFrameworkEvent = Omit&lt;FrameworkEvent&lt;ArtifactEventPayloadMap[TType]&gt;, 'type'&gt; &amp; { type: TType; }</code> | Artifact Framework Event 公共类型别名；完整类型表达式见声明。 |
| `ArtifactFrameworkEventType` | 类型 | <code>type ArtifactFrameworkEventType = 'artifact.create.requested' &#124; 'artifact.created' &#124; 'artifact.deduplicated' &#124; 'artifact.create.failed' &#124; 'artifact.read.requested' &#124; 'artifact.read.completed' &#124; 'artifact.version.created' &#124; 'artifact.finalized' &#124; 'artifact.archived' &#124; 'artifact.invalidated' &#124; 'artifact.delete.requested' &#124; 'artifact.delete.blocked' &#124; 'artifact.deleted' &#124; 'artifact.delete.failed' &#124; 'artifact.lineage....</code> | Artifact Framework Event Type 公共类型别名；完整类型表达式见声明。 |

## `ArtifactEventPayload`

Artifact Event Payload 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactEventPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export interface ArtifactEventPayload {
    operationId?: string;
    artifactId?: string;
    versionId?: string;
    logicalArtifactId?: string;
    profileRef?: SpecRef;
    workspaceId?: string;
    executionId?: string;
    artifactRefs?: string[];
    contentHash?: string;
    sizeBytes?: number;
    status?: ArtifactStatus;
    deduplicated?: boolean;
    candidateObjects?: number;
    deletedObjects?: number;
    missingObjects?: number;
    reclaimedBytes?: number;
    reason?: string;
    error?: NormalizedArtifactError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactId` | 属性 | <code>artifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidateObjects` | 属性 | <code>candidateObjects?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deduplicated` | 属性 | <code>deduplicated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deletedObjects` | 属性 | <code>deletedObjects?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedArtifactError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `logicalArtifactId` | 属性 | <code>logicalArtifactId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingObjects` | 属性 | <code>missingObjects?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reclaimedBytes` | 属性 | <code>reclaimedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: ArtifactStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `versionId` | 属性 | <code>versionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ArtifactEventPublisher`

Runtime-owned adapters must durably and idempotently publish by publication ID.

- 种类: 接口
- 导入: `import type { ArtifactEventPublisher } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export interface ArtifactEventPublisher {
    publish(publication: ArtifactEventPublication): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `publish` | 方法 | <code>publish(publication: ArtifactEventPublication): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ArtifactEventCreateInput`

Artifact Event Create Input 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactEventCreateInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export type ArtifactEventCreateInput<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = Omit<EventCreateInput<ArtifactEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ArtifactEventPayloadMap`

Artifact Event Payload Map 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactEventPayloadMap } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export type ArtifactEventPayloadMap = {
    'artifact.create.requested': ArtifactEventPayloadWithRequired<'operationId' | 'workspaceId' | 'profileRef'>;
    'artifact.created': ArtifactStatusEventPayload<'draft'> & ArtifactEventPayloadWithRequired<'logicalArtifactId' | 'contentHash'>;
    'artifact.deduplicated': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'versionId' | 'contentHash' | 'deduplicated'> & {
        deduplicated: true;
    };
    'artifact.create.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
    'artifact.read.requested': ArtifactEventPayloadWithRequired<'artifactId'>;
    'artifact.read.completed': ArtifactEventPayloadWithRequired<'artifactId' | 'versionId' | 'contentHash' | 'sizeBytes'>;
    'artifact.version.created': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'versionId' | 'logicalArtifactId' | 'contentHash' | 'status'>;
    'artifact.finalized': ArtifactStatusEventPayload<'final'>;
    'artifact.archived': ArtifactStatusEventPayload<'archived'>;
    'artifact.invalidated': ArtifactStatusEventPayload<'invalidated'>;
    'artifact.delete.requested': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId'>;
    'artifact.delete.blocked': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'error'>;
    'artifact.deleted': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'status'> & {
        status: 'deleted';
    };
    'artifact.delete.failed': ArtifactEventPayloadWithRequired<'operationId' | 'artifactId' | 'error'>;
    'artifact.lineage.recorded': ArtifactEventPayloadWithRequired<'artifactId' | 'artifactRefs'>;
    'artifact.retention.expired': ArtifactEventPayloadWithRequired<'artifactId' | 'versionId'>;
    'artifact.gc.completed': ArtifactEventPayloadWithRequired<'operationId' | 'candidateObjects' | 'deletedObjects' | 'missingObjects' | 'reclaimedBytes'>;
    'artifact.gc.failed': ArtifactEventPayloadWithRequired<'operationId' | 'error'>;
};
```

## `ArtifactEventPublication`

Artifact Event Publication 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactEventPublication } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export type ArtifactEventPublication<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = {
    id: string;
    type: TType;
    timestamp: string;
    payload: ArtifactEventPayloadMap[TType];
    workspaceId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
};
```

## `ArtifactFrameworkEvent`

Artifact Framework Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export type ArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType = ArtifactFrameworkEventType> = Omit<FrameworkEvent<ArtifactEventPayloadMap[TType]>, 'type'> & {
    type: TType;
};
```

## `ArtifactFrameworkEventType`

Artifact Framework Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ArtifactFrameworkEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/artifact-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-events.ts)

### 声明

```text
export type ArtifactFrameworkEventType = 'artifact.create.requested' | 'artifact.created' | 'artifact.deduplicated' | 'artifact.create.failed' | 'artifact.read.requested' | 'artifact.read.completed' | 'artifact.version.created' | 'artifact.finalized' | 'artifact.archived' | 'artifact.invalidated' | 'artifact.delete.requested' | 'artifact.delete.blocked' | 'artifact.deleted' | 'artifact.delete.failed' | 'artifact.lineage.recorded' | 'artifact.retention.expired' | 'artifact.gc.completed' | 'artifact.gc.failed';
```
