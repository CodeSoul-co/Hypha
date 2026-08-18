# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-planner`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)
- Exports: **11**

## Using this module

Use the Legacy tool artifact migration planner module for using the public contracts and operations for this capability boundary. It exports 2 classes, 7 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  LegacyToolArtifactMigrationPlanError,
  LegacyToolArtifactMigrationPlanner,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationImportPlanItem,
  LegacyToolArtifactMigrationImportResolution,
  LegacyToolArtifactMigrationPlan,
  LegacyToolArtifactMigrationPlannerOptions,
  LegacyToolArtifactMigrationPlanRequest,
  LegacyToolArtifactMigrationSkipPlanItem,
  LegacyToolArtifactMigrationSkipResolution,
  LegacyToolArtifactMigrationPlanErrorCode,
} from '@codesoul-co/hypha-adapters-local';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactMigrationPlanError` | class | <code>new LegacyToolArtifactMigrationPlanError(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Legacy Tool Artifact Migration Plan Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `LegacyToolArtifactMigrationPlanner` | class | <code>new LegacyToolArtifactMigrationPlanner(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities. |
| `LegacyToolArtifactMigrationImportPlanItem` | interface | <code>interface LegacyToolArtifactMigrationImportPlanItem</code> | Legacy Tool Artifact Migration Import Plan Item interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationImportResolution` | interface | <code>interface LegacyToolArtifactMigrationImportResolution</code> | Legacy Tool Artifact Migration Import Resolution interface with 5 public fields or methods. |
| `LegacyToolArtifactMigrationPlan` | interface | <code>interface LegacyToolArtifactMigrationPlan</code> | Legacy Tool Artifact Migration Plan interface with 5 public fields or methods. |
| `LegacyToolArtifactMigrationPlannerOptions` | interface | <code>interface LegacyToolArtifactMigrationPlannerOptions</code> | Legacy Tool Artifact Migration Planner Options interface with 1 public fields or methods. |
| `LegacyToolArtifactMigrationPlanRequest` | interface | <code>interface LegacyToolArtifactMigrationPlanRequest</code> | Legacy Tool Artifact Migration Plan Request interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationSkipPlanItem` | interface | <code>interface LegacyToolArtifactMigrationSkipPlanItem</code> | Legacy Tool Artifact Migration Skip Plan Item interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationSkipResolution` | interface | <code>interface LegacyToolArtifactMigrationSkipResolution</code> | Legacy Tool Artifact Migration Skip Resolution interface with 2 public fields or methods. |
| `LegacyToolArtifactMigrationPlanErrorCode` | type | <code>type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' &#124; 'LEGACY_MIGRATION_DUPLICATE_SOURCE' &#124; 'LEGACY_MIGRATION_LIMIT_EXCEEDED' &#124; 'LEGACY_MIGRATION_INVALID_RESOLUTION'</code> | Public type alias for Legacy Tool Artifact Migration Plan Error Code; the declaration contains its complete type expression. |
| `LegacyToolArtifactMigrationResolution` | type | <code>type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution &#124; LegacyToolArtifactMigrationSkipResolution</code> | Public type alias for Legacy Tool Artifact Migration Resolution; the declaration contains its complete type expression. |

## `LegacyToolArtifactMigrationPlanError`

Legacy Tool Artifact Migration Plan Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationPlanError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationPlanError extends Error {
    readonly code: LegacyToolArtifactMigrationPlanErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: LegacyToolArtifactMigrationPlanErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactMigrationPlanErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactMigrationPlanError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactMigrationPlanner`

Creates a deterministic migration plan without reading, importing, or deleting Artifact bytes. Historical path segments are never identities.

- Kind: class
- Import: `import { LegacyToolArtifactMigrationPlanner } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export declare class LegacyToolArtifactMigrationPlanner {
    constructor(options?: LegacyToolArtifactMigrationPlannerOptions);
    plan(request: LegacyToolArtifactMigrationPlanRequest): Promise<LegacyToolArtifactMigrationPlan>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: LegacyToolArtifactMigrationPlannerOptions): LegacyToolArtifactMigrationPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(request: LegacyToolArtifactMigrationPlanRequest): Promise&lt;LegacyToolArtifactMigrationPlan&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactMigrationImportPlanItem`

Legacy Tool Artifact Migration Import Plan Item interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationImportPlanItem } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationImportPlanItem {
    source: LegacyToolArtifactInventoryEntry;
    request: LegacyToolArtifactImportRequest;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `request` | property | <code>request: LegacyToolArtifactImportRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: LegacyToolArtifactInventoryEntry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationImportResolution`

Legacy Tool Artifact Migration Import Resolution interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationImportResolution } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationImportResolution {
    action: 'import';
    context: ToolArtifactManagerContext;
    toolId: string;
    invocationId: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "import"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: ToolArtifactManagerContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationPlan`

Legacy Tool Artifact Migration Plan interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationPlan } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationPlan {
    planHash: string;
    imports: LegacyToolArtifactMigrationImportPlanItem[];
    skipped: LegacyToolArtifactMigrationSkipPlanItem[];
    totalEntries: number;
    totalBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `imports` | property | <code>imports: LegacyToolArtifactMigrationImportPlanItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: LegacyToolArtifactMigrationSkipPlanItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalEntries` | property | <code>totalEntries: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationPlannerOptions`

Legacy Tool Artifact Migration Planner Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationPlannerOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationPlannerOptions {
    maxEntries?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationPlanRequest`

Legacy Tool Artifact Migration Plan Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationPlanRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationPlanRequest {
    inventory: LegacyToolArtifactInventoryResult;
    resolve: (entry: Readonly<LegacyToolArtifactInventoryEntry>) => LegacyToolArtifactMigrationResolution | Promise<LegacyToolArtifactMigrationResolution>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inventory` | property | <code>inventory: LegacyToolArtifactInventoryResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolve` | method | <code>resolve(entry: Readonly&lt;LegacyToolArtifactInventoryEntry&gt;): LegacyToolArtifactMigrationResolution &#124; Promise&lt;LegacyToolArtifactMigrationResolution&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactMigrationSkipPlanItem`

Legacy Tool Artifact Migration Skip Plan Item interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationSkipPlanItem } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationSkipPlanItem {
    source: LegacyToolArtifactInventoryEntry;
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: LegacyToolArtifactInventoryEntry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationSkipResolution`

Legacy Tool Artifact Migration Skip Resolution interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationSkipResolution } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationSkipResolution {
    action: 'skip';
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: "skip"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationPlanErrorCode`

Public type alias for Legacy Tool Artifact Migration Plan Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactMigrationPlanErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export type LegacyToolArtifactMigrationPlanErrorCode = 'LEGACY_MIGRATION_INVALID_INVENTORY' | 'LEGACY_MIGRATION_DUPLICATE_SOURCE' | 'LEGACY_MIGRATION_LIMIT_EXCEEDED' | 'LEGACY_MIGRATION_INVALID_RESOLUTION';
```

## `LegacyToolArtifactMigrationResolution`

Public type alias for Legacy Tool Artifact Migration Resolution; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactMigrationResolution } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-planner`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-planner.ts)

### Declaration

```text
export type LegacyToolArtifactMigrationResolution = LegacyToolArtifactMigrationImportResolution | LegacyToolArtifactMigrationSkipResolution;
```
