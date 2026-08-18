# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)
- 导出数: **5**

## 模块用法

用于执行该边界的运行时行为。Runtime human task 模块公开 5 函数。

### 从包入口导入

```ts
import {
  assertRuntimeHumanTaskDecision,
  assertRuntimeHumanTaskResume,
  projectRuntimeHumanTasks,
  runtimeHumanTaskKind,
  runtimeHumanTaskResolutionEventId,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertRuntimeHumanTaskDecision` | 函数 | <code>assertRuntimeHumanTaskDecision&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, command: Pick&lt;RuntimeHumanTaskDecisionCommand, "expectedRevision" &#124; "expectedSubjectHash" &#124; "principal" &#124; "decidedAt" &#124; "decision"&gt;): TTask</code> | Assert Runtime Human Task Decision 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `assertRuntimeHumanTaskResume` | 函数 | <code>assertRuntimeHumanTaskResume&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask</code> | Assert Runtime Human Task Resume 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `projectRuntimeHumanTasks` | 函数 | <code>projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]</code> | Project Runtime Human Tasks 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runtimeHumanTaskKind` | 函数 | <code>runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind &#124; undefined</code> | Runtime Human Task Kind 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runtimeHumanTaskResolutionEventId` | 函数 | <code>runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string</code> | Runtime Human Task Resolution Event ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `assertRuntimeHumanTaskDecision`

Assert Runtime Human Task Decision 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertRuntimeHumanTaskDecision } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### 声明

```text
export declare function assertRuntimeHumanTaskDecision<TTask extends RuntimeHumanTask>(task: TTask | undefined, command: Pick<RuntimeHumanTaskDecisionCommand, 'expectedRevision' | 'expectedSubjectHash' | 'principal' | 'decidedAt' | 'decision'>): TTask;
```

### 调用签名

```text
assertRuntimeHumanTaskDecision<TTask extends RuntimeHumanTask>(task: TTask | undefined, command: Pick<RuntimeHumanTaskDecisionCommand, "expectedRevision" | "expectedSubjectHash" | "principal" | "decidedAt" | "decision">): TTask
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `task` | <code>TTask</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `command` | <code>Pick&lt;RuntimeHumanTaskDecisionCommand, "principal" &#124; "decidedAt" &#124; "expectedRevision" &#124; "expectedSubjectHash" &#124; "decision"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TTask`
- 说明: 返回值契约由上述类型定义。

## `assertRuntimeHumanTaskResume`

Assert Runtime Human Task Resume 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertRuntimeHumanTaskResume } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### 声明

```text
export declare function assertRuntimeHumanTaskResume<TTask extends RuntimeHumanTask>(task: TTask | undefined, expected: {
    taskId: string;
    kind: RuntimeHumanTaskKind;
    subjectRef: string;
    subjectHash: string;
    revision: number;
    requestedBy: string;
    resumedAt: string;
    checkpointRef?: string;
    policyRef?: string;
    providerRevision?: string;
    activityDescriptorRef?: string;
    activityDescriptorHash?: string;
}): TTask;
```

### 调用签名

```text
assertRuntimeHumanTaskResume<TTask extends RuntimeHumanTask>(task: TTask | undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `task` | <code>TTask</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expected` | <code>{ taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TTask`
- 说明: 返回值契约由上述类型定义。

## `projectRuntimeHumanTasks`

Project Runtime Human Tasks 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { projectRuntimeHumanTasks } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### 声明

```text
export declare function projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[];
```

### 调用签名

```text
projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `events` | <code>readonly FrameworkEvent&lt;unknown&gt;[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeHumanTask[]`
- 说明: 返回值契约由上述类型定义。

## `runtimeHumanTaskKind`

Runtime Human Task Kind 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runtimeHumanTaskKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### 声明

```text
export declare function runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind | undefined;
```

### 调用签名

```text
runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind | undefined
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `"memory" | "skill" | "mcp" | "policy" | "tool" | "execution" | "prompt"`
- 说明: 返回值契约由上述类型定义。

## `runtimeHumanTaskResolutionEventId`

Runtime Human Task Resolution Event ID 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runtimeHumanTaskResolutionEventId } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### 声明

```text
export declare function runtimeHumanTaskResolutionEventId(input: {
    runId: string;
    taskId: string;
    expectedRevision: number;
}): string;
```

### 调用签名

```text
runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ runId: string; taskId: string; expectedRevision: number; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。
