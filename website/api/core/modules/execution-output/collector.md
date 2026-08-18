# `@codesoul-co/hypha-core` / `modules/execution-output/collector`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-output/collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)
- Exports: **1**

## Using this module

Use the Collector module for executing runtime behavior at this boundary. It exports 1 class.

### Import from the package entrypoint

```ts
import {
  DefaultExecutionOutputCollector,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionOutputCollector` | class | <code>new DefaultExecutionOutputCollector(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Default Execution Output Collector class with 2 public constructor or member entries; its exact declarations are listed below. |

## `DefaultExecutionOutputCollector`

Default Execution Output Collector class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultExecutionOutputCollector } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-output/collector`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)

### Declaration

```text
export declare class DefaultExecutionOutputCollector implements ExecutionOutputCollector {
    constructor(artifacts: ExecutionOutputArtifactManager);
    collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise<ExecutionOutputCollectionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Creates an instance of this class. |
