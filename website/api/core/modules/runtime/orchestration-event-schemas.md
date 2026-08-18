# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-event-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/orchestration-event-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)
- Exports: **14**

## Using this module

Use the Orchestration event schemas module for declaring and runtime-validating contracts. It exports 8 constants, 2 functions, 4 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 8 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CANONICAL_EVENT_TYPES` | constant | <code>const RUNTIME_CANONICAL_EVENT_TYPES: readonly RuntimeCanonicalEventType[]</code> | RUNTIME CANONICAL EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION` | constant | <code>const RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION: "1.0.0"</code> | RUNTIME ORCHESTRATION EVENT SCHEMA VERSION constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `RUNTIME_ORCHESTRATION_EVENT_TYPES` | constant | <code>const RUNTIME_ORCHESTRATION_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runt...</code> | RUNTIME ORCHESTRATION EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `RUNTIME_RUN_MANAGER_EVENT_TYPES` | constant | <code>const RUNTIME_RUN_MANAGER_EVENT_TYPES: readonly ["session.created", "run.created", "run.started", "run.waiting_human", "run.completed", "run.failed", "run.cancelled", "fsm.transition.accepted", "fsm.state.entered", "human.review.requested", "human.review.approved", "human.review.rejected", "context.build.started", "context.build.completed", "context.compacted", "skill.selected", "skill.loaded", "skill.completed", ...</code> | Event families emitted directly by the Harness RunManager. This list is the migration boundary for the canonical Server RunManager. Module-owned events such as Tool, Model, and Memory observations are not included and must be written through their owning event ports. |
| `RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES` | constant | <code>const RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES: readonly ("session.created" &#124; "run.created" &#124; "run.started" &#124; "run.waiting_human" &#124; "run.completed" &#124; "run.failed" &#124; "run.cancelled" &#124; "fsm.transition.accepted" &#124; "fsm.state.entered" &#124; "thinking.started" &#124; "thinking.completed" &#124; "agent.deliberation.started" &#124; "agent.deliberation.completed" &#124; "reasoning.decision.recorded" &#124; "react.step.completed" &#124; "react.continuatio...</code> | RUNTIME RUN MANAGER MIGRATION EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES` | constant | <code>const RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "...</code> | RUNTIME SERVICE EMITTABLE EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `runtimeEventSchemaDefinitions` | constant | <code>const runtimeEventSchemaDefinitions: readonly EventSchemaDefinition[]</code> | Runtime Event Schema Definitions constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `runtimeOrchestrationEventSchemaDefinitions` | constant | <code>const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[]</code> | Runtime Orchestration Event Schema Definitions constant exported by the `modules/runtime/orchestration-event-schemas` module. |
| `assertRuntimeEventCatalogComplete` | function | <code>assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void</code> | Assert Runtime Event Catalog Complete function with 1 public call signature; parameters and return types are listed below. |
| `registerRuntimeOrchestrationEventSchemas` | function | <code>registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise&lt;void&gt;</code> | Register Runtime Orchestration Event Schemas function with 1 public call signature; parameters and return types are listed below. |
| `RuntimeCanonicalEventType` | type | <code>type RuntimeCanonicalEventType = RuntimeServiceEmittableEventType &#124; RuntimeRunManagerEventType</code> | Public type alias for Runtime Canonical Event Type; the declaration contains its complete type expression. |
| `RuntimeOrchestrationEventType` | type | <code>type RuntimeOrchestrationEventType = (typeof RUNTIME_ORCHESTRATION_EVENT_TYPES)[number]</code> | Public type alias for Runtime Orchestration Event Type; the declaration contains its complete type expression. |
| `RuntimeRunManagerEventType` | type | <code>type RuntimeRunManagerEventType = (typeof RUNTIME_RUN_MANAGER_EVENT_TYPES)[number]</code> | Public type alias for Runtime Run Manager Event Type; the declaration contains its complete type expression. |
| `RuntimeServiceEmittableEventType` | type | <code>type RuntimeServiceEmittableEventType = (typeof RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES)[number]</code> | Public type alias for Runtime Service Emittable Event Type; the declaration contains its complete type expression. |

## `RUNTIME_CANONICAL_EVENT_TYPES`

RUNTIME CANONICAL EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { RUNTIME_CANONICAL_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_CANONICAL_EVENT_TYPES: readonly RuntimeCanonicalEventType[];
```

## `RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION`

RUNTIME ORCHESTRATION EVENT SCHEMA VERSION constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_ORCHESTRATION_EVENT_SCHEMA_VERSION: "1.0.0";
```

## `RUNTIME_ORCHESTRATION_EVENT_TYPES`

RUNTIME ORCHESTRATION EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { RUNTIME_ORCHESTRATION_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_ORCHESTRATION_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runtime.cancellation.propagated", "runtime.cancellation.failed", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.activity.waiting", "runtime.activity.cancelled", "runtime.activity.compensation.requested", "runtime.activity.compensation.completed", "runtime.activity.compensation.failed", "activity.redispatch.requested", "activity.redispatch.accepted", "activity.redispatch.outcome_unknown", "recovery.case.opened", "recovery.case.resolved", "recovery.case.escalated", "fsm.state.entered", "fsm.state.exited", "fsm.transition.accepted"];
```

## `RUNTIME_RUN_MANAGER_EVENT_TYPES`

Event families emitted directly by the Harness RunManager. This list is the migration boundary for the canonical Server RunManager. Module-owned events such as Tool, Model, and Memory observations are not included and must be written through their owning event ports.

- Kind: constant
- Import: `import { RUNTIME_RUN_MANAGER_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_RUN_MANAGER_EVENT_TYPES: readonly ["session.created", "run.created", "run.started", "run.waiting_human", "run.completed", "run.failed", "run.cancelled", "fsm.transition.accepted", "fsm.state.entered", "human.review.requested", "human.review.approved", "human.review.rejected", "context.build.started", "context.build.completed", "context.compacted", "skill.selected", "skill.loaded", "skill.completed", "thinking.started", "thinking.completed", "agent.deliberation.started", "agent.deliberation.completed", "reasoning.decision.recorded", "react.step.completed", "react.continuation.checkpointed", "react.continuation.suspended", "react.continuation.resumed", "react.continuation.quarantined"];
```

## `RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES`

RUNTIME RUN MANAGER MIGRATION EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_RUN_MANAGER_MIGRATION_EVENT_TYPES: readonly ("session.created" | "run.created" | "run.started" | "run.waiting_human" | "run.completed" | "run.failed" | "run.cancelled" | "fsm.transition.accepted" | "fsm.state.entered" | "thinking.started" | "thinking.completed" | "agent.deliberation.started" | "agent.deliberation.completed" | "reasoning.decision.recorded" | "react.step.completed" | "react.continuation.checkpointed" | "react.continuation.suspended" | "react.continuation.resumed" | "skill.selected" | "skill.loaded" | "skill.completed" | "context.build.started" | "context.build.completed" | "context.compacted" | "react.continuation.quarantined" | "human.review.requested" | "human.review.approved" | "human.review.rejected")[];
```

## `RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES`

RUNTIME SERVICE EMITTABLE EVENT TYPES constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES: readonly ["run.created", "run.started", "run.resume.requested", "run.resumed", "run.cancel.requested", "run.cancelling", "run.waiting_human", "run.waiting_signal", "run.waiting_timer", "run.paused", "run.completed", "run.failed", "run.cancelled", "runtime.wait.created", "runtime.wait.resolved", "runtime.signal.received", "runtime.timer.created", "runtime.timer.fired", "runtime.cancellation.propagated", "runtime.cancellation.failed", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.activity.waiting", "runtime.activity.cancelled", "runtime.activity.compensation.requested", "runtime.activity.compensation.completed", "runtime.activity.compensation.failed", "activity.redispatch.requested", "activity.redispatch.accepted", "activity.redispatch.outcome_unknown", "recovery.case.opened", "recovery.case.resolved", "recovery.case.escalated", "fsm.state.entered", "fsm.state.exited", "fsm.transition.accepted", "runtime.checkpoint.created", "runtime.checkpoint.failed", "fsm.transition.requested", "fsm.transition.rejected", "human.review.requested", "human.review.approved", "human.review.rejected", "human.review.expired", "human.review.cancelled", "human.review.superseded", "human.review.resume.started", "human.review.resume.revalidated", "human.review.resume.failed", "human.review.resolved"];
```

## `runtimeEventSchemaDefinitions`

Runtime Event Schema Definitions constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { runtimeEventSchemaDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const runtimeEventSchemaDefinitions: readonly EventSchemaDefinition[];
```

## `runtimeOrchestrationEventSchemaDefinitions`

Runtime Orchestration Event Schema Definitions constant exported by the `modules/runtime/orchestration-event-schemas` module.

- Kind: constant
- Import: `import { runtimeOrchestrationEventSchemaDefinitions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare const runtimeOrchestrationEventSchemaDefinitions: readonly EventSchemaDefinition[];
```

## `assertRuntimeEventCatalogComplete`

Assert Runtime Event Catalog Complete function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertRuntimeEventCatalogComplete } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare function assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void;
```

### Call signature

```text
assertRuntimeEventCatalogComplete(definitions?: readonly EventSchemaDefinition[], requiredEventTypes?: readonly RuntimeCanonicalEventType[]): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `definitions` | <code>readonly EventSchemaDefinition[]</code> | No | Optional parameter; accepted values are defined by the type column. |
| `requiredEventTypes` | <code>readonly RuntimeCanonicalEventType[]</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `registerRuntimeOrchestrationEventSchemas`

Register Runtime Orchestration Event Schemas function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { registerRuntimeOrchestrationEventSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export declare function registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise<void>;
```

### Call signature

```text
registerRuntimeOrchestrationEventSchemas(registry: EventSchemaRegistry): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `registry` | <code>EventSchemaRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `RuntimeCanonicalEventType`

Public type alias for Runtime Canonical Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeCanonicalEventType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export type RuntimeCanonicalEventType = RuntimeServiceEmittableEventType | RuntimeRunManagerEventType;
```

## `RuntimeOrchestrationEventType`

Public type alias for Runtime Orchestration Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeOrchestrationEventType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export type RuntimeOrchestrationEventType = (typeof RUNTIME_ORCHESTRATION_EVENT_TYPES)[number];
```

## `RuntimeRunManagerEventType`

Public type alias for Runtime Run Manager Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRunManagerEventType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export type RuntimeRunManagerEventType = (typeof RUNTIME_RUN_MANAGER_EVENT_TYPES)[number];
```

## `RuntimeServiceEmittableEventType`

Public type alias for Runtime Service Emittable Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeServiceEmittableEventType } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-event-schemas`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-event-schemas.ts)

### Declaration

```text
export type RuntimeServiceEmittableEventType = (typeof RUNTIME_SERVICE_EMITTABLE_EVENT_TYPES)[number];
```
