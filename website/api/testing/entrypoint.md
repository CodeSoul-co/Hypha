# `@codesoul-co/hypha-testing` / `index`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Source: [`packages/testing/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)
- Exports: **4**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-testing`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  assertEventTypes,
  assertStatePath,
  collectEventTypes,
} from '@codesoul-co/hypha-testing';

import type {
  GoldenTraceFixture,
} from '@codesoul-co/hypha-testing';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertEventTypes` | function | <code>assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean</code> | Assert Event Types function with 1 public call signature; parameters and return types are listed below. |
| `assertStatePath` | function | <code>assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean</code> | Assert State Path function with 1 public call signature; parameters and return types are listed below. |
| `collectEventTypes` | function | <code>collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]</code> | Collect Event Types function with 1 public call signature; parameters and return types are listed below. |
| `GoldenTraceFixture` | interface | <code>interface GoldenTraceFixture</code> | Golden Trace Fixture interface with 4 public fields or methods. |

## `assertEventTypes`

Assert Event Types function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertEventTypes } from '@codesoul-co/hypha-testing';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### Declaration

```text
export declare function assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean;
```

### Call signature

```text
assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: FrameworkEventType[]): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fixture` | <code>GoldenTraceFixture</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedTypes` | <code>FrameworkEventType[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `assertStatePath`

Assert State Path function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertStatePath } from '@codesoul-co/hypha-testing';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### Declaration

```text
export declare function assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean;
```

### Call signature

```text
assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fixture` | <code>GoldenTraceFixture</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedPath` | <code>string[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `collectEventTypes`

Collect Event Types function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { collectEventTypes } from '@codesoul-co/hypha-testing';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### Declaration

```text
export declare function collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[];
```

### Call signature

```text
collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FrameworkEventType[]`
- Description: The return contract is defined by the type shown above.

## `GoldenTraceFixture`

Golden Trace Fixture interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { GoldenTraceFixture } from '@codesoul-co/hypha-testing';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts)

### Declaration

```text
export interface GoldenTraceFixture {
    id: string;
    version: string;
    events: FrameworkEvent[];
    statePath?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
