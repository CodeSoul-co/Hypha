# `@codesoul-co/hypha-core` / `modules/workspace/events`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/workspace/events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)
- 导出数: **9**

## 模块用法

用于声明并实施 Workspace 作用域边界。Events 模块公开 6 常量、3 函数。

### 从包入口导入

```ts
import {
  workspaceEventJsonSchemas,
  workspaceEventPayloadRequirements,
  workspaceFrameworkEventExample,
  workspaceFrameworkEventJsonSchema,
  workspaceFrameworkEventTypes,
  workspaceFrameworkEventTypeSchema,
  createWorkspaceFrameworkEvent,
  validateWorkspaceEventPayloadForType,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 6 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { workspaceFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = workspaceFrameworkEventTypeSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workspaceEventJsonSchemas` | 常量 | <code>const workspaceEventJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/workspace/events` 模块导出的 Workspace Event JSON Schemas 常量。 |
| `workspaceEventPayloadRequirements` | 常量 | <code>const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: reado...</code> | 由 `modules/workspace/events` 模块导出的 Workspace Event Payload Requirements 常量。 |
| `workspaceFrameworkEventExample` | 常量 | <code>const workspaceFrameworkEventExample: WorkspaceFrameworkEvent&lt;"workspace.ready"&gt;</code> | Workspace Framework Event 的有效示例值。 |
| `workspaceFrameworkEventJsonSchema` | 常量 | <code>const workspaceFrameworkEventJsonSchema: JsonSchema</code> | Workspace Framework Event 的 JSON Schema。 |
| `workspaceFrameworkEventTypes` | 常量 | <code>const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "wor...</code> | 由 `modules/workspace/events` 模块导出的 Workspace Framework Event Types 常量。 |
| `workspaceFrameworkEventTypeSchema` | 常量 | <code>const workspaceFrameworkEventTypeSchema: z.ZodEnum&lt;["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked"...</code> | Workspace Framework Event Type 的运行时 Schema。 |
| `createWorkspaceFrameworkEvent` | 函数 | <code>createWorkspaceFrameworkEvent&lt;TType extends WorkspaceFrameworkEventType&gt;(input: WorkspaceEventCreateInput&lt;TType&gt;): WorkspaceFrameworkEvent&lt;TType&gt;</code> | Create Workspace Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceEventPayloadForType` | 函数 | <code>validateWorkspaceEventPayloadForType&lt;TType extends WorkspaceFrameworkEventType&gt;(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]</code> | Validate Workspace Event Payload For Type 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkspaceFrameworkEvent` | 函数 | <code>validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent</code> | Validate Workspace Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `workspaceEventJsonSchemas`

由 `modules/workspace/events` 模块导出的 Workspace Event JSON Schemas 常量。

- 种类: 常量
- 导入: `import { workspaceEventJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceEventJsonSchemas: Record<string, JsonSchema>;
```

## `workspaceEventPayloadRequirements`

由 `modules/workspace/events` 模块导出的 Workspace Event Payload Requirements 常量。

- 种类: 常量
- 导入: `import { workspaceEventPayloadRequirements } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceEventPayloadRequirements: { readonly 'workspace.create.requested': { readonly required: readonly ["operationId", "profileRef"]; }; readonly 'workspace.created': { readonly required: readonly ["operationId", "profileRef", "status"]; }; readonly 'workspace.ready': { readonly required: readonly ["operationId", "status"]; readonly status: "ready"; }; readonly 'workspace.busy': { readonly required: readonly ["operationId", "status"]; readonly status: "busy"; }; readonly 'workspace.path.resolved': { readonly required: readonly ["operationId"]; }; readonly 'workspace.path.denied': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.quota.exceeded': { readonly required: readonly ["operationId"]; readonly atLeastOne: readonly ["bytes", "files"]; }; readonly 'workspace.snapshot.requested': { readonly required: readonly ["operationId"]; }; readonly 'workspace.snapshot.created': { readonly required: readonly ["operationId", "snapshotManifestHash", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'workspace.snapshot.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.restore.requested': { readonly required: readonly ["operationId", "artifactRefs"]; readonly nonEmptyArtifactRefs: true; }; readonly 'workspace.restored': { readonly required: readonly ["operationId", "workspaceSnapshotHash"]; }; readonly 'workspace.restore.failed': { readonly required: readonly ["operationId", "error"]; }; readonly 'workspace.patch.checked': { readonly required: readonly ["operationId"]; }; readonly 'workspace.patch.applied': { readonly required: readonly ["operationId", "workspaceSnapshotHash"]; }; readonly 'workspace.patch.conflict': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.started': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.completed': { readonly required: readonly ["operationId"]; }; readonly 'workspace.cleanup.failed': { readonly required: readonly ["operationId", "error"]; }; };
```

## `workspaceFrameworkEventExample`

Workspace Framework Event 的有效示例值。

- 种类: 常量
- 导入: `import { workspaceFrameworkEventExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceFrameworkEventExample: WorkspaceFrameworkEvent<"workspace.ready">;
```

## `workspaceFrameworkEventJsonSchema`

Workspace Framework Event 的 JSON Schema。

- 种类: 常量
- 导入: `import { workspaceFrameworkEventJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceFrameworkEventJsonSchema: JsonSchema;
```

## `workspaceFrameworkEventTypes`

由 `modules/workspace/events` 模块导出的 Workspace Framework Event Types 常量。

- 种类: 常量
- 导入: `import { workspaceFrameworkEventTypes } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceFrameworkEventTypes: readonly ["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "workspace.patch.applied", "workspace.patch.conflict", "workspace.cleanup.started", "workspace.cleanup.completed", "workspace.cleanup.failed"];
```

## `workspaceFrameworkEventTypeSchema`

Workspace Framework Event Type 的运行时 Schema。

- 种类: 常量
- 导入: `import { workspaceFrameworkEventTypeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare const workspaceFrameworkEventTypeSchema: z.ZodEnum<["workspace.create.requested", "workspace.created", "workspace.ready", "workspace.busy", "workspace.path.resolved", "workspace.path.denied", "workspace.quota.exceeded", "workspace.snapshot.requested", "workspace.snapshot.created", "workspace.snapshot.failed", "workspace.restore.requested", "workspace.restored", "workspace.restore.failed", "workspace.patch.checked", "workspace.patch.applied", "workspace.patch.conflict", "workspace.cleanup.started", "workspace.cleanup.completed", "workspace.cleanup.failed"]>;
```

## `createWorkspaceFrameworkEvent`

Create Workspace Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createWorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare function createWorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType>(input: WorkspaceEventCreateInput<TType>): WorkspaceFrameworkEvent<TType>;
```

### 调用签名

```text
createWorkspaceFrameworkEvent<TType extends WorkspaceFrameworkEventType>(input: WorkspaceEventCreateInput<TType>): WorkspaceFrameworkEvent<TType>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>WorkspaceEventCreateInput&lt;TType&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceFrameworkEvent<TType>`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceEventPayloadForType`

Validate Workspace Event Payload For Type 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceEventPayloadForType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare function validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(type: TType, input: unknown): WorkspaceEventPayloadMap[TType];
```

### 调用签名

```text
validateWorkspaceEventPayloadForType<TType extends WorkspaceFrameworkEventType>(type: TType, input: unknown): WorkspaceEventPayloadMap[TType]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `type` | <code>TType</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceEventPayloadMap[TType]`
- 说明: 返回值契约由上述类型定义。

## `validateWorkspaceFrameworkEvent`

Validate Workspace Framework Event 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkspaceFrameworkEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/workspace/events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/workspace/events.ts)

### 声明

```text
export declare function validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent;
```

### 调用签名

```text
validateWorkspaceFrameworkEvent(input: unknown): WorkspaceFrameworkEvent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkspaceFrameworkEvent`
- 说明: 返回值契约由上述类型定义。
