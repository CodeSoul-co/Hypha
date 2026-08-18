# `@codesoul-co/hypha-core` / `modules/execution-output/planner`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-output/planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)
- Exports: **2**

## Using this module

Use the Planner module for executing runtime behavior at this boundary. It exports 1 class, 1 function.

### Import from the package entrypoint

```ts
import {
  DefaultExecutionOutputPlanner,
  classifyExecutionOutput,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionOutputPlanner` | class | <code>new DefaultExecutionOutputPlanner(): DefaultExecutionOutputPlanner</code> | Default Execution Output Planner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `classifyExecutionOutput` | function | <code>classifyExecutionOutput(relativePath: string): ArtifactClassification</code> | Classify Execution Output function with 1 public call signature; parameters and return types are listed below. |

## `DefaultExecutionOutputPlanner`

Default Execution Output Planner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultExecutionOutputPlanner } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)

### Declaration

```text
export declare class DefaultExecutionOutputPlanner implements ExecutionOutputPlanner {
    plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultExecutionOutputPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | Public method; parameters and return type are shown in the signature. |

## `classifyExecutionOutput`

Classify Execution Output function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { classifyExecutionOutput } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)

### Declaration

```text
export declare function classifyExecutionOutput(relativePath: string): ArtifactClassification;
```

### Call signature

```text
classifyExecutionOutput(relativePath: string): ArtifactClassification
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `relativePath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactClassification`
- Description: The return contract is defined by the type shown above.
