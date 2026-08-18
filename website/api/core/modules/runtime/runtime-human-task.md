# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)
- Exports: **5**

## Using this module

Use the Runtime human task module for executing runtime behavior at this boundary. It exports 5 functions.

### Import from the package entrypoint

```ts
import {
  assertRuntimeHumanTaskDecision,
  assertRuntimeHumanTaskResume,
  projectRuntimeHumanTasks,
  runtimeHumanTaskKind,
  runtimeHumanTaskResolutionEventId,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertRuntimeHumanTaskDecision` | function | <code>assertRuntimeHumanTaskDecision&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, command: Pick&lt;RuntimeHumanTaskDecisionCommand, "expectedRevision" &#124; "expectedSubjectHash" &#124; "principal" &#124; "decidedAt" &#124; "decision"&gt;): TTask</code> | Assert Runtime Human Task Decision function with 1 public call signature; parameters and return types are listed below. |
| `assertRuntimeHumanTaskResume` | function | <code>assertRuntimeHumanTaskResume&lt;TTask extends RuntimeHumanTask&gt;(task: TTask &#124; undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask</code> | Assert Runtime Human Task Resume function with 1 public call signature; parameters and return types are listed below. |
| `projectRuntimeHumanTasks` | function | <code>projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]</code> | Project Runtime Human Tasks function with 1 public call signature; parameters and return types are listed below. |
| `runtimeHumanTaskKind` | function | <code>runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind &#124; undefined</code> | Runtime Human Task Kind function with 1 public call signature; parameters and return types are listed below. |
| `runtimeHumanTaskResolutionEventId` | function | <code>runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string</code> | Runtime Human Task Resolution Event ID function with 1 public call signature; parameters and return types are listed below. |

## `assertRuntimeHumanTaskDecision`

Assert Runtime Human Task Decision function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertRuntimeHumanTaskDecision } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### Declaration

```text
export declare function assertRuntimeHumanTaskDecision<TTask extends RuntimeHumanTask>(task: TTask | undefined, command: Pick<RuntimeHumanTaskDecisionCommand, 'expectedRevision' | 'expectedSubjectHash' | 'principal' | 'decidedAt' | 'decision'>): TTask;
```

### Call signature

```text
assertRuntimeHumanTaskDecision<TTask extends RuntimeHumanTask>(task: TTask | undefined, command: Pick<RuntimeHumanTaskDecisionCommand, "expectedRevision" | "expectedSubjectHash" | "principal" | "decidedAt" | "decision">): TTask
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task` | <code>TTask</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `command` | <code>Pick&lt;RuntimeHumanTaskDecisionCommand, "principal" &#124; "decidedAt" &#124; "expectedRevision" &#124; "expectedSubjectHash" &#124; "decision"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TTask`
- Description: The return contract is defined by the type shown above.

## `assertRuntimeHumanTaskResume`

Assert Runtime Human Task Resume function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertRuntimeHumanTaskResume } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### Declaration

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

### Call signature

```text
assertRuntimeHumanTaskResume<TTask extends RuntimeHumanTask>(task: TTask | undefined, expected: { taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }): TTask
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `task` | <code>TTask</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expected` | <code>{ taskId: string; kind: RuntimeHumanTaskKind; subjectRef: string; subjectHash: string; revision: number; requestedBy: string; resumedAt: string; checkpointRef?: string; policyRef?: string; providerRevision?: string; activityDescriptorRef?: string; activityDescriptorHash?: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TTask`
- Description: The return contract is defined by the type shown above.

## `projectRuntimeHumanTasks`

Project Runtime Human Tasks function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectRuntimeHumanTasks } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### Declaration

```text
export declare function projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[];
```

### Call signature

```text
projectRuntimeHumanTasks(events: readonly FrameworkEvent[]): RuntimeHumanTask[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>readonly FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeHumanTask[]`
- Description: The return contract is defined by the type shown above.

## `runtimeHumanTaskKind`

Runtime Human Task Kind function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runtimeHumanTaskKind } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### Declaration

```text
export declare function runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind | undefined;
```

### Call signature

```text
runtimeHumanTaskKind(value: string): RuntimeHumanTaskKind | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `"memory" | "skill" | "mcp" | "policy" | "tool" | "execution" | "prompt"`
- Description: The return contract is defined by the type shown above.

## `runtimeHumanTaskResolutionEventId`

Runtime Human Task Resolution Event ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runtimeHumanTaskResolutionEventId } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-task.ts)

### Declaration

```text
export declare function runtimeHumanTaskResolutionEventId(input: {
    runId: string;
    taskId: string;
    expectedRevision: number;
}): string;
```

### Call signature

```text
runtimeHumanTaskResolutionEventId(input: { runId: string; taskId: string; expectedRevision: number; }): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ runId: string; taskId: string; expectedRevision: number; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
