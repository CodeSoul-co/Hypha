# `@codesoul-co/hypha-core` / `modules/artifact/events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)
- 导出数: **16**

## 模块用法

用于创建、记录或读取 Event 契约。Events 模块公开 11 常量、4 函数、1 接口。

### 从包入口导入

```ts
import {
  artifactEventJsonSchemas,
  artifactEventPayloadJsonSchema,
  artifactEventPayloadRequirements,
  artifactEventPayloadSchema,
  artifactEventPublicationJsonSchema,
  artifactEventPublicationSchema,
  artifactFrameworkEventEnvelopeSchema,
  artifactFrameworkEventExample,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactEventPayloadRequirement,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 11 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { artifactEventPayloadSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactEventPayloadSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactEventJsonSchemas` | 常量 | <code>const artifactEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/events` 模块导出的 Artifact Event JSON Schemas 常量。 |
| `artifactEventPayloadJsonSchema` | 常量 | <code>const artifactEventPayloadJsonSchema: JsonSchema</code> | Artifact Event Payload 的 JSON Schema。 |
| `artifactEventPayloadRequirements` | 常量 | <code>const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", ...</code> | 由 `modules/artifact/events` 模块导出的 Artifact Event Payload Requirements 常量。 |
| `artifactEventPayloadSchema` | 常量 | <code>const artifactEventPayloadSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodOptional&lt;z.ZodString&gt;; artifactId: z.ZodOptional&lt;z.ZodString&gt;; versionId: z.ZodOptional&lt;z.ZodString&gt;; logicalArtifactId: z.ZodOptional&lt;z.ZodString&gt;; profileRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string ...</code> | Artifact Event Payload 的运行时 Schema。 |
| `artifactEventPublicationJsonSchema` | 常量 | <code>const artifactEventPublicationJsonSchema: JsonSchema</code> | Artifact Event Publication 的 JSON Schema。 |
| `artifactEventPublicationSchema` | 常量 | <code>const artifactEventPublicationSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artif...</code> | Artifact Event Publication 的运行时 Schema。 |
| `artifactFrameworkEventEnvelopeSchema` | 常量 | <code>const artifactFrameworkEventEnvelopeSchema: z.ZodObject&lt;{ id: z.ZodString; type: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", ...</code> | Artifact Framework Event Envelope 的运行时 Schema。 |
| `artifactFrameworkEventExample` | 常量 | <code>const artifactFrameworkEventExample: ArtifactFrameworkEvent&lt;"artifact.created"&gt;</code> | Artifact Framework Event 的有效示例值。 |
| `artifactFrameworkEventJsonSchema` | 常量 | <code>const artifactFrameworkEventJsonSchema: JsonSchema</code> | Artifact Framework Event 的 JSON Schema。 |
| `artifactFrameworkEventTypes` | 常量 | <code>const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.rec...</code> | 由 `modules/artifact/events` 模块导出的 Artifact Framework Event Types 常量。 |
| `artifactFrameworkEventTypeSchema` | 常量 | <code>const artifactFrameworkEventTypeSchema: z.ZodEnum&lt;["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.linea...</code> | Artifact Framework Event Type 的运行时 Schema。 |
| `createArtifactFrameworkEvent` | 函数 | <code>createArtifactFrameworkEvent&lt;TType extends ArtifactFrameworkEventType&gt;(input: ArtifactEventCreateInput&lt;TType&gt;): ArtifactFrameworkEvent&lt;TType&gt;</code> | Create Artifact Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactEventPayloadForType` | 函数 | <code>validateArtifactEventPayloadForType&lt;TType extends ArtifactFrameworkEventType&gt;(type: TType, input: unknown): ArtifactEventPayloadMap[TType]</code> | Validate Artifact Event Payload For Type 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactEventPublication` | 函数 | <code>validateArtifactEventPublication(input: unknown): ArtifactEventPublication</code> | Validate Artifact Event Publication 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactFrameworkEvent` | 函数 | <code>validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent</code> | Validate Artifact Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ArtifactEventPayloadRequirement` | 接口 | <code>interface ArtifactEventPayloadRequirement</code> | Artifact Event Payload Requirement 接口，共包含 5 个公开字段或方法。 |

## `artifactEventJsonSchemas`

由 `modules/artifact/events` 模块导出的 Artifact Event JSON Schemas 常量。

- 种类: 常量
- 导入: `import { artifactEventJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactEventJsonSchemas: Record<string, JsonSchema>;
```

## `artifactEventPayloadJsonSchema`

Artifact Event Payload 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactEventPayloadJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactEventPayloadJsonSchema: JsonSchema;
```

## `artifactEventPayloadRequirements`

由 `modules/artifact/events` 模块导出的 Artifact Event Payload Requirements 常量。

- 种类: 常量
- 导入: `import { artifactEventPayloadRequirements } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactEventPayloadRequirements: { readonly 'artifact.create.requested': { readonly required: readonly ["operationId", "workspaceId", "profileRef"]; }; readonly 'artifact.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; readonly status: "draft"; }; readonly 'artifact.deduplicated': { readonly required: readonly ["operationId", "artifactId", "versionId", "contentHash", "deduplicated"]; readonly deduplicated: true; }; readonly 'artifact.create.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'artifact.read.requested': { readonly required: readonly ["artifactId"]; }; readonly 'artifact.read.completed': { readonly required: readonly ["artifactId", "versionId", "contentHash", "sizeBytes"]; }; readonly 'artifact.version.created': { readonly required: readonly ["operationId", "artifactId", "versionId", "logicalArtifactId", "contentHash", "status"]; }; readonly 'artifact.finalized': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "final"; }; readonly 'artifact.archived': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "archived"; }; readonly 'artifact.invalidated': { readonly required: readonly ["operationId", "artifactId", "versionId", "status"]; readonly status: "invalidated"; }; readonly 'artifact.delete.requested': { readonly required: readonly ["operationId", "artifactId"]; }; readonly 'artifact.delete.blocked': { readonly required: readonly ["operationId", "artifactId", "error"]; readonly errorCodes: readonly ["ARTIFACT_DELETE_BLOCKED"]; }; readonly 'artifact.deleted': { readonly required: readonly ["operationId", "artifactId", "status"]; readonly status: "deleted"; }; readonly 'artifact.delete.failed': { readonly required: readonly ["operationId", "artifactId", "error"]; }; readonly 'artifact.lineage.recorded': { readonly required: readonly ["artifactId", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'artifact.retention.expired': { readonly required: readonly ["artifactId", "versionId"]; }; readonly 'artifact.gc.completed': { readonly required: readonly ["operationId", "candidateObjects", "deletedObjects", "missingObjects", "reclaimedBytes"]; }; readonly 'artifact.gc.failed': { readonly required: readonly ["operationId", "error"]; }; };
```

## `artifactEventPayloadSchema`

Artifact Event Payload 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactEventPayloadSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const artifactEventPayloadSchema: (typeof import('@codesoul-co/hypha-core'))['artifactEventPayloadSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `artifactEventPublicationJsonSchema`

Artifact Event Publication 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactEventPublicationJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactEventPublicationJsonSchema: JsonSchema;
```

## `artifactEventPublicationSchema`

Artifact Event Publication 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactEventPublicationSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactEventPublicationSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>; timestamp: z.ZodString; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; payload: z.ZodEffects<z.ZodUnknown, {} | null, unknown>; }, "strict", z.ZodTypeAny, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; timestamp: string; payload: {} | null; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; agentId?: string | undefined; }, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; timestamp: string; workspaceId?: string | undefined; sessionId?: string | undefined; runId?: string | undefined; agentId?: string | undefined; payload?: unknown; }>;
```

## `artifactFrameworkEventEnvelopeSchema`

Artifact Framework Event Envelope 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactFrameworkEventEnvelopeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactFrameworkEventEnvelopeSchema: z.ZodObject<{ id: z.ZodString; type: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>; workspaceId: z.ZodOptional<z.ZodString>; sessionId: z.ZodOptional<z.ZodString>; runId: z.ZodString; stepId: z.ZodOptional<z.ZodString>; agentId: z.ZodOptional<z.ZodString>; fsmState: z.ZodOptional<z.ZodString>; timestamp: z.ZodString; payload: z.ZodEffects<z.ZodUnknown, {} | null, unknown>; metadata: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>; }, "strict", z.ZodTypeAny, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; runId: string; timestamp: string; payload: {} | null; workspaceId?: string | undefined; metadata?: Record<string, unknown> | undefined; sessionId?: string | undefined; stepId?: string | undefined; agentId?: string | undefined; fsmState?: string | undefined; }, { type: "artifact.create.requested" | "artifact.created" | "artifact.deduplicated" | "artifact.create.failed" | "artifact.read.requested" | "artifact.read.completed" | "artifact.version.created" | "artifact.finalized" | "artifact.archived" | "artifact.invalidated" | "artifact.delete.requested" | "artifact.delete.blocked" | "artifact.deleted" | "artifact.delete.failed" | "artifact.lineage.recorded" | "artifact.retention.expired" | "artifact.gc.completed" | "artifact.gc.failed"; id: string; runId: string; timestamp: string; workspaceId?: string | undefined; metadata?: Record<string, unknown> | undefined; sessionId?: string | undefined; stepId?: string | undefined; agentId?: string | undefined; fsmState?: string | undefined; payload?: unknown; }>;
```

## `artifactFrameworkEventExample`

Artifact Framework Event 的有效示例值。

- 种类: 常量
- 导入: `import { artifactFrameworkEventExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactFrameworkEventExample: ArtifactFrameworkEvent<"artifact.created">;
```

## `artifactFrameworkEventJsonSchema`

Artifact Framework Event 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactFrameworkEventJsonSchema: JsonSchema;
```

## `artifactFrameworkEventTypes`

由 `modules/artifact/events` 模块导出的 Artifact Framework Event Types 常量。

- 种类: 常量
- 导入: `import { artifactFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactFrameworkEventTypes: readonly ["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"];
```

## `artifactFrameworkEventTypeSchema`

Artifact Framework Event Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare const artifactFrameworkEventTypeSchema: z.ZodEnum<["artifact.create.requested", "artifact.created", "artifact.deduplicated", "artifact.create.failed", "artifact.read.requested", "artifact.read.completed", "artifact.version.created", "artifact.finalized", "artifact.archived", "artifact.invalidated", "artifact.delete.requested", "artifact.delete.blocked", "artifact.deleted", "artifact.delete.failed", "artifact.lineage.recorded", "artifact.retention.expired", "artifact.gc.completed", "artifact.gc.failed"]>;
```

## `createArtifactFrameworkEvent`

Create Artifact Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare function createArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType>(input: ArtifactEventCreateInput<TType>): ArtifactFrameworkEvent<TType>;
```

### 调用签名

```text
createArtifactFrameworkEvent<TType extends ArtifactFrameworkEventType>(input: ArtifactEventCreateInput<TType>): ArtifactFrameworkEvent<TType>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>ArtifactEventCreateInput&lt;TType&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactFrameworkEvent<TType>`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactEventPayloadForType`

Validate Artifact Event Payload For Type 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactEventPayloadForType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare function validateArtifactEventPayloadForType<TType extends ArtifactFrameworkEventType>(type: TType, input: unknown): ArtifactEventPayloadMap[TType];
```

### 调用签名

```text
validateArtifactEventPayloadForType<TType extends ArtifactFrameworkEventType>(type: TType, input: unknown): ArtifactEventPayloadMap[TType]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactEventPayloadMap[TType]`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactEventPublication`

Validate Artifact Event Publication 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactEventPublication } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare function validateArtifactEventPublication(input: unknown): ArtifactEventPublication;
```

### 调用签名

```text
validateArtifactEventPublication(input: unknown): ArtifactEventPublication
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactEventPublication`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactFrameworkEvent`

Validate Artifact Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export declare function validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent;
```

### 调用签名

```text
validateArtifactFrameworkEvent(input: unknown): ArtifactFrameworkEvent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactFrameworkEvent`
- 说明: 返回值契约由上述类型定义。

## `ArtifactEventPayloadRequirement`

Artifact Event Payload Requirement 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ArtifactEventPayloadRequirement } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/events.ts)

### 声明

```text
export interface ArtifactEventPayloadRequirement {
    required: readonly (keyof ArtifactEventPayload)[];
    status?: ArtifactEventPayload['status'];
    deduplicated?: true;
    nonEmptyArtifactRefs?: boolean;
    errorCodes?: readonly string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deduplicated` | 属性 | <code>deduplicated?: true</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `errorCodes` | 属性 | <code>errorCodes?: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nonEmptyArtifactRefs` | 属性 | <code>nonEmptyArtifactRefs?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required: readonly (keyof ArtifactEventPayload)[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").ArtifactStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
