# `@codesoul-co/hypha-tools` / `common-tool-catalog`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/common-tool-catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)
- Exports: **5**

## Using this module

Use the Common tool catalog module for registering and resolving versioned capabilities or implementations. It exports 2 constants, 2 functions, 1 type.

### Import from the package entrypoint

```ts
import {
  COMMON_TOOL_IDS,
  commonToolCatalogSpecs,
  assertCanonicalCommonToolCatalog,
  resolveCommonToolSpec,
} from '@codesoul-co/hypha-tools';

import type {
  CommonToolId,
} from '@codesoul-co/hypha-tools';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `COMMON_TOOL_IDS` | constant | <code>const COMMON_TOOL_IDS: Readonly&lt;{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource";...</code> | COMMON TOOL IDS constant exported by the `common-tool-catalog` module. |
| `commonToolCatalogSpecs` | constant | <code>const commonToolCatalogSpecs: readonly ToolSpec[]</code> | Common Tool Catalog Specs constant exported by the `common-tool-catalog` module. |
| `assertCanonicalCommonToolCatalog` | function | <code>assertCanonicalCommonToolCatalog(): void</code> | Assert Canonical Common Tool Catalog function with 1 public call signature; parameters and return types are listed below. |
| `resolveCommonToolSpec` | function | <code>resolveCommonToolSpec(id: string): ToolSpec &#124; null</code> | Resolve Common Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `CommonToolId` | type | <code>type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS]</code> | Public type alias for Common Tool ID; the declaration contains its complete type expression. |

## `COMMON_TOOL_IDS`

COMMON TOOL IDS constant exported by the `common-tool-catalog` module.

- Kind: constant
- Import: `import { COMMON_TOOL_IDS } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### Declaration

```text
export declare const COMMON_TOOL_IDS: Readonly<{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource"; readonly hashReference: "common.hash_reference"; }>;
```

## `commonToolCatalogSpecs`

Common Tool Catalog Specs constant exported by the `common-tool-catalog` module.

- Kind: constant
- Import: `import { commonToolCatalogSpecs } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### Declaration

```text
export declare const commonToolCatalogSpecs: readonly ToolSpec[];
```

## `assertCanonicalCommonToolCatalog`

Assert Canonical Common Tool Catalog function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertCanonicalCommonToolCatalog } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### Declaration

```text
export declare function assertCanonicalCommonToolCatalog(): void;
```

### Call signature

```text
assertCanonicalCommonToolCatalog(): void
```

#### Parameters

No parameters.

#### Returns

- Type: `void`
- Description: Returns no value.

## `resolveCommonToolSpec`

Resolve Common Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveCommonToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### Declaration

```text
export declare function resolveCommonToolSpec(id: string): ToolSpec | null;
```

### Call signature

```text
resolveCommonToolSpec(id: string): ToolSpec | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSpec`
- Description: The return contract is defined by the type shown above.

## `CommonToolId`

Public type alias for Common Tool ID; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CommonToolId } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tool-catalog`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)

### Declaration

```text
export type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS];
```
