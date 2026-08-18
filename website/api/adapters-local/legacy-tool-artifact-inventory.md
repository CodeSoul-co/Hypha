# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-inventory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-inventory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)
- Exports: **6**

## Using this module

Use the Legacy tool artifact inventory module for using the public contracts and operations for this capability boundary. It exports 2 classes, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LegacyToolArtifactInventory,
  LegacyToolArtifactInventoryError,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactInventoryEntry,
  LegacyToolArtifactInventoryOptions,
  LegacyToolArtifactInventoryResult,
  LegacyToolArtifactInventoryErrorCode,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactInventory` | class | <code>new LegacyToolArtifactInventory(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | Builds a deterministic, bounded, read-only inventory of old Tool outputs. |
| `LegacyToolArtifactInventoryError` | class | <code>new LegacyToolArtifactInventoryError(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | Legacy Tool Artifact Inventory Error class with 10 public constructor or member entries; its exact declarations are listed below. |
| `LegacyToolArtifactInventoryEntry` | interface | <code>interface LegacyToolArtifactInventoryEntry</code> | Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities. |
| `LegacyToolArtifactInventoryOptions` | interface | <code>interface LegacyToolArtifactInventoryOptions</code> | Legacy Tool Artifact Inventory Options interface with 4 public fields or methods. |
| `LegacyToolArtifactInventoryResult` | interface | <code>interface LegacyToolArtifactInventoryResult</code> | Legacy Tool Artifact Inventory Result interface with 2 public fields or methods. |
| `LegacyToolArtifactInventoryErrorCode` | type | <code>type LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_ROOT' &#124; 'LEGACY_INVENTORY_INVALID_LAYOUT' &#124; 'LEGACY_INVENTORY_LIMIT_EXCEEDED' &#124; 'LEGACY_INVENTORY_SOURCE_CHANGED'</code> | Public type alias for Legacy Tool Artifact Inventory Error Code; the declaration contains its complete type expression. |

## `LegacyToolArtifactInventory`

Builds a deterministic, bounded, read-only inventory of old Tool outputs.

- Kind: class
- Import: `import { LegacyToolArtifactInventory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export declare class LegacyToolArtifactInventory {
    constructor(options: LegacyToolArtifactInventoryOptions);
    scan(): Promise<LegacyToolArtifactInventoryResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | Creates an instance of this class. |
| `scan` | method | <code>scan(): Promise&lt;LegacyToolArtifactInventoryResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LegacyToolArtifactInventoryError`

Legacy Tool Artifact Inventory Error class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LegacyToolArtifactInventoryError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export declare class LegacyToolArtifactInventoryError extends Error {
    readonly code: LegacyToolArtifactInventoryErrorCode;
    readonly details?: Record<string, unknown> | undefined;
    constructor(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record<string, unknown> | undefined);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>readonly code: LegacyToolArtifactInventoryErrorCode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | Creates an instance of this class. |
| `details` | property | <code>readonly details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stack` | property | <code>stack?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `static captureStackTrace` | method | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public method; parameters and return type are shown in the signature. |
| `static stackTraceLimit` | property | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactInventoryEntry`

Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities.

- Kind: interface
- Import: `import type { LegacyToolArtifactInventoryEntry } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export interface LegacyToolArtifactInventoryEntry {
    relativePath: string;
    legacyArtifactId: string;
    contentHash: string;
    sizeBytes: number;
    mimeType: 'application/json' | 'text/plain';
    legacyToolPathSegment: string;
    legacyInvocationPathSegment: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyInvocationPathSegment` | property | <code>legacyInvocationPathSegment: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyToolPathSegment` | property | <code>legacyToolPathSegment: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType: "application/json" &#124; "text/plain"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactInventoryOptions`

Legacy Tool Artifact Inventory Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactInventoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export interface LegacyToolArtifactInventoryOptions {
    legacyRootPath: string;
    maxEntries?: number;
    maxFileBytes?: number;
    maxTotalBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyRootPath` | property | <code>legacyRootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxEntries` | property | <code>maxEntries?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxFileBytes` | property | <code>maxFileBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalBytes` | property | <code>maxTotalBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactInventoryResult`

Legacy Tool Artifact Inventory Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactInventoryResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export interface LegacyToolArtifactInventoryResult {
    entries: LegacyToolArtifactInventoryEntry[];
    totalBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: LegacyToolArtifactInventoryEntry[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactInventoryErrorCode`

Public type alias for Legacy Tool Artifact Inventory Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LegacyToolArtifactInventoryErrorCode } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-inventory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)

### Declaration

```text
export type LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_ROOT' | 'LEGACY_INVENTORY_INVALID_LAYOUT' | 'LEGACY_INVENTORY_LIMIT_EXCEEDED' | 'LEGACY_INVENTORY_SOURCE_CHANGED';
```
