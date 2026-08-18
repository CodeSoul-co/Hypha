# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-event-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/orchestration-event-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)
- 导出数: **14**

## 模块用法

用于声明并运行时校验契约。Orchestration event schemas 模块公开 8 常量、2 函数、4 类型。

### 从包入口导入

```ts
import {
  RUNTIME_CANONICAL_EVENT_TYPES,
  RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION,
  RUNTIME_ORCHESTRATION_EVENT_TYPES,
  RUNTIME_RUN_MANAGER_EVENT_TYPES,
  RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES,
  RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES,
  runtimeEventSchemaDefinitions,
  runtimeOrchestrationEventSchemaDefinitions,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCanonicalEventType,
  RuntimeOrchestrationEventType,
  RuntimeRunManagerEventType,
  RuntimeServiceEmittableEventType,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 8 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CANONICAL_EVENT_TYPES` | 常量 | <code>const RUNTIME_CANONICAL_EVENT_TYPES: readonly RuntimeCanonicalEventType[]</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME CANONICAL EVENT TYPES 常量。 |
| `RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION` | 常量 | <code>const RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION: "1.0.0"</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME ORCHESTRATION EVENT SCHEMA VERSION 常量。 |
| `RUNTIME_ORCHESTRATION_EVENT_TYPES` | 常量 | <code>const RUNTIME_ORCHESTRATION_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runt...</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME ORCHESTRATION EVENT TYPES 常量。 |
| `RUNTIME_RUN_MANAGER_EVENT_TYPES` | 常量 | <code>const RUNTIME_RUN_MANAGER_EVENT_TYPES: readonly ["session.created", "run.created", "run.started", "run.waiting_human", "run.completed", "run.failed", "run.cancelled", "fsm.transition.accepted", "fsm.state.entered", "human.review.requested", "human.review.approved", "human.review.rejected", "context.build.started", "context.build.completed", "context.compacted", "skill.selected", "skill.loaded", "skill.completed", ...</code> | Event families emitted directly by the Harness RunManager. This list is the migration boundary for the canonical Server RunManager. Module-owned events such as Tool, Model, and Memory observations are not included and must be written through their owning event ports. |
| `RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES` | 常量 | <code>const RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES: readonly ("session.created" &#124; "run.created" &#124; "run.started" &#124; "run.waiting_human" &#124; "run.completed" &#124; "run.failed" &#124; "run.cancelled" &#124; "fsm.transition.accepted" &#124; "fsm.state.entered" &#124; "thinking.started" &#124; "thinking.completed" &#124; "agent.deliberation.started" &#124; "agent.deliberation.completed" &#124; "reasoning.decision.recorded" &#124; "react.step.completed" &#124; "react.continuatio...</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME RUN MANAGER MIGRATION EVENT TYPES 常量。 |
| `RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES` | 常量 | <code>const RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "...</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME SERVICE EMITTABLE EVENT TYPES 常量。 |
| `runtimeEventSchemaDefinitions` | 常量 | <code>const runtimeEventSchemaDefinitions: readonly EventSchemaDefinition[]</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 Runtime Event Schema Definitions 常量。 |
| `runtimeOrchestrationEventSchemaDefinitions` | 常量 | <code>const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[]</code> | 由 `modules/runtime/orchestration-event-schemas` 模块导出的 Runtime Orchestration Event Schema Definitions 常量。 |
| `assertRuntimeEventCatalogComplete` | 函数 | <code>assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void</code> | Assert Runtime Event Catalog Complete 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerRuntimeOrchestrationEventSchemas` | 函数 | <code>registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise&lt;void&gt;</code> | Register Runtime Orchestration Event Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RuntimeCanonicalEventType` | 类型 | <code>type RuntimeCanonicalEventType = RuntimeServiceEmittableEventType &#124; RuntimeRunManagerEventType</code> | Runtime Canonical Event Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeOrchestrationEventType` | 类型 | <code>type RuntimeOrchestrationEventType = (typeof RUNTIME_ORCHESTRATION_EVENT_TYPES)[number]</code> | Runtime Orchestration Event Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRunManagerEventType` | 类型 | <code>type RuntimeRunManagerEventType = (typeof RUNTIME_RUN_MANAGER_EVENT_TYPES)[number]</code> | Runtime Run Manager Event Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeServiceEmittableEventType` | 类型 | <code>type RuntimeServiceEmittableEventType = (typeof RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES)[number]</code> | Runtime Service Emittable Event Type 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_CANONICAL_EVENT_TYPES`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME CANONICAL EVENT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CANONICAL_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_CANONICAL_EVENT_TYPES: readonly RuntimeCanonicalEventType[];
```

## `RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME ORCHESTRATION EVENT SCHEMA VERSION 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION: "1.0.0";
```

## `RUNTIME_ORCHESTRATION_EVENT_TYPES`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME ORCHESTRATION EVENT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ORCHESTRATION_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_ORCHESTRATION_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runtime.cancellation.propagated", "runtime.cancellation.failed", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.activity.waiting", "runtime.activity.cancelled", "runtime.activity.compensation.requested", "runtime.activity.compensation.completed", "runtime.activity.compensation.failed", "activity.redispatch.requested", "activity.redispatch.accepted", "activity.redispatch.outcome_unknown", "recovery.case.opened", "recovery.case.resolved", "recovery.case.escalated", "fsm.state.entered", "fsm.state.exited", "fsm.transition.accepted"];
```

## `RUNTIME_RUN_MANAGER_EVENT_TYPES`

Event families emitted directly by the Harness RunManager. This list is the migration boundary for the canonical Server RunManager. Module-owned events such as Tool, Model, and Memory observations are not included and must be written through their owning event ports.

- 种类: 常量
- 导入: `import { RUNTIME_RUN_MANAGER_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_RUN_MANAGER_EVENT_TYPES: readonly ["session.created", "run.created", "run.started", "run.waiting_human", "run.completed", "run.failed", "run.cancelled", "fsm.transition.accepted", "fsm.state.entered", "human.review.requested", "human.review.approved", "human.review.rejected", "context.build.started", "context.build.completed", "context.compacted", "skill.selected", "skill.loaded", "skill.completed", "thinking.started", "thinking.completed", "agent.deliberation.started", "agent.deliberation.completed", "reasoning.decision.recorded", "react.step.completed", "react.continuation.checkpointed", "react.continuation.suspended", "react.continuation.resumed", "react.continuation.quarantined"];
```

## `RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME RUN MANAGER MIGRATION EVENT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES: readonly ("session.created" | "run.created" | "run.started" | "run.waiting_human" | "run.completed" | "run.failed" | "run.cancelled" | "fsm.transition.accepted" | "fsm.state.entered" | "thinking.started" | "thinking.completed" | "agent.deliberation.started" | "agent.deliberation.completed" | "reasoning.decision.recorded" | "react.step.completed" | "react.continuation.checkpointed" | "react.continuation.suspended" | "react.continuation.resumed" | "skill.selected" | "skill.loaded" | "skill.completed" | "context.build.started" | "context.build.completed" | "context.compacted" | "react.continuation.quarantined" | "human.review.requested" | "human.review.approved" | "human.review.rejected")[];
```

## `RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 RUNTIME SERVICE EMITTABLE EVENT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runtime.cancellation.propagated", "runtime.cancellation.failed", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.activity.waiting", "runtime.activity.cancelled", "runtime.activity.compensation.requested", "runtime.activity.compensation.completed", "runtime.activity.compensation.failed", "activity.redispatch.requested", "activity.redispatch.accepted", "activity.redispatch.outcome_unknown", "recovery.case.opened", "recovery.case.resolved", "recovery.case.escalated", "fsm.state.entered", "fsm.state.exited", "fsm.transition.accepted", "runtime.checkpoint.created", "runtime.checkpoint.failed", "fsm.transition.requested", "fsm.transition.rejected", "human.review.requested", "human.review.approved", "human.review.rejected", "human.review.expired", "human.review.cancelled", "human.review.superseded", "human.review.resume.started", "human.review.resume.revalidated", "human.review.resume.failed", "human.review.resolved"];
```

## `runtimeEventSchemaDefinitions`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 Runtime Event Schema Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeEventSchemaDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const runtimeEventSchemaDefinitions: readonly EventSchemaDefinition[];
```

## `runtimeOrchestrationEventSchemaDefinitions`

由 `modules/runtime/orchestration-event-schemas` 模块导出的 Runtime Orchestration Event Schema Definitions 常量。

- 种类: 常量
- 导入: `import { runtimeOrchestrationEventSchemaDefinitions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[];
```

## `assertRuntimeEventCatalogComplete`

Assert Runtime Event Catalog Complete 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertRuntimeEventCatalogComplete } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare function assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void;
```

### 调用签名

```text
assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `definitions` | <code>readonly EventSchemaDefinition[]</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `requiredEventTypes` | <code>readonly RuntimeCanonicalEventType[]</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `registerRuntimeOrchestrationEventSchemas`

Register Runtime Orchestration Event Schemas 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerRuntimeOrchestrationEventSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export declare function registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise<void>;
```

### 调用签名

```text
registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise<void>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `registry` | <code>EventSchemaRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `RuntimeCanonicalEventType`

Runtime Canonical Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCanonicalEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export type RuntimeCanonicalEventType = RuntimeServiceEmittableEventType | RuntimeRunManagerEventType;
```

## `RuntimeOrchestrationEventType`

Runtime Orchestration Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeOrchestrationEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export type RuntimeOrchestrationEventType = (typeof RUNTIME_ORCHESTRATION_EVENT_TYPES)[number];
```

## `RuntimeRunManagerEventType`

Runtime Run Manager Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRunManagerEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export type RuntimeRunManagerEventType = (typeof RUNTIME_RUN_MANAGER_EVENT_TYPES)[number];
```

## `RuntimeServiceEmittableEventType`

Runtime Service Emittable Event Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeServiceEmittableEventType } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### 声明

```text
export type RuntimeServiceEmittableEventType = (typeof RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES)[number];
```
