# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/orchestration-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)
- 导出数: **4**

## 模块用法

用于执行该边界的运行时行为。Orchestration projection 模块公开 2 常量、2 函数。

### 从包入口导入

```ts
import {
  RUNTIME_ORCHESTRATION_PROJECTION_ID,
  RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
  createRuntimeOrchestrationProjectionDefinition,
  reduceRuntimeOrchestrationProjection,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ORCHESTRATION_PROJECTION_ID` | 常量 | <code>const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration"</code> | 由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION ID 常量。 |
| `RUNTIME_ORCHESTRATION_PROJECTION_VERSION` | 常量 | <code>const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0"</code> | 由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION VERSION 常量。 |
| `createRuntimeOrchestrationProjectionDefinition` | 函数 | <code>createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | Create Runtime Orchestration Projection Definition 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `reduceRuntimeOrchestrationProjection` | 函数 | <code>reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection</code> | Reduce Runtime Orchestration Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `RUNTIME_ORCHESTRATION_PROJECTION_ID`

由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION ID 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ORCHESTRATION_PROJECTION_ID } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### 声明

```text
export declare const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration";
```

## `RUNTIME_ORCHESTRATION_PROJECTION_VERSION`

由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION VERSION 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ORCHESTRATION_PROJECTION_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### 声明

```text
export declare const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0";
```

## `createRuntimeOrchestrationProjectionDefinition`

Create Runtime Orchestration Projection Definition 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeOrchestrationProjectionDefinition } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### 声明

```text
export declare function createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition<RuntimeOrchestrationProjection>;
```

### 调用签名

```text
createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition<RuntimeOrchestrationProjection>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `runId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ProjectionDefinition<RuntimeOrchestrationProjection>`
- 说明: 返回值契约由上述类型定义。

## `reduceRuntimeOrchestrationProjection`

Reduce Runtime Orchestration Projection 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { reduceRuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### 声明

```text
export declare function reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection;
```

### 调用签名

```text
reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `state` | <code>RuntimeOrchestrationProjection</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `event` | <code>PersistedFrameworkEvent&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeOrchestrationProjection`
- 说明: 返回值契约由上述类型定义。
