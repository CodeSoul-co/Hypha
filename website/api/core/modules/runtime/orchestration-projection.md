# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/orchestration-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)
- Exports: **4**

## Using this module

Use the Orchestration projection module for executing runtime behavior at this boundary. It exports 2 constants, 2 functions.

### Import from the package entrypoint

```ts
import {
  RUNTIME_ORCHESTRATION_PROJECTION_ID,
  RUNTIME_ORCHESTRATION_PROJECTION_VERSION,
  createRuntimeOrchestrationProjectionDefinition,
  reduceRuntimeOrchestrationProjection,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ORCHESTRATION_PROJECTION_ID` | constant | <code>const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration"</code> | RUNTIME ORCHESTRATION PROJECTION ID constant exported by the `modules/runtime/orchestration-projection` module. |
| `RUNTIME_ORCHESTRATION_PROJECTION_VERSION` | constant | <code>const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0"</code> | RUNTIME ORCHESTRATION PROJECTION VERSION constant exported by the `modules/runtime/orchestration-projection` module. |
| `createRuntimeOrchestrationProjectionDefinition` | function | <code>createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | Create Runtime Orchestration Projection Definition function with 1 public call signature; parameters and return types are listed below. |
| `reduceRuntimeOrchestrationProjection` | function | <code>reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection</code> | Reduce Runtime Orchestration Projection function with 1 public call signature; parameters and return types are listed below. |

## `RUNTIME_ORCHESTRATION_PROJECTION_ID`

RUNTIME ORCHESTRATION PROJECTION ID constant exported by the `modules/runtime/orchestration-projection` module.

- Kind: constant
- Import: `import { RUNTIME_ORCHESTRATION_PROJECTION_ID } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### Declaration

```text
export declare const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration";
```

## `RUNTIME_ORCHESTRATION_PROJECTION_VERSION`

RUNTIME ORCHESTRATION PROJECTION VERSION constant exported by the `modules/runtime/orchestration-projection` module.

- Kind: constant
- Import: `import { RUNTIME_ORCHESTRATION_PROJECTION_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### Declaration

```text
export declare const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0";
```

## `createRuntimeOrchestrationProjectionDefinition`

Create Runtime Orchestration Projection Definition function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeOrchestrationProjectionDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### Declaration

```text
export declare function createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition<RuntimeOrchestrationProjection>;
```

### Call signature

```text
createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition<RuntimeOrchestrationProjection>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `runId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ProjectionDefinition<RuntimeOrchestrationProjection>`
- Description: The return contract is defined by the type shown above.

## `reduceRuntimeOrchestrationProjection`

Reduce Runtime Orchestration Projection function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { reduceRuntimeOrchestrationProjection } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/orchestration-projection`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)

### Declaration

```text
export declare function reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection;
```

### Call signature

```text
reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | <code>RuntimeOrchestrationProjection</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `event` | <code>PersistedFrameworkEvent&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeOrchestrationProjection`
- Description: The return contract is defined by the type shown above.
