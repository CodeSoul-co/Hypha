# `@codesoul-co/hypha-tools` / `common-tools`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/common-tools.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)
- Exports: **17**

## Using this module

Use the Common tools module for using the public contracts and operations for this capability boundary. It exports 6 constants, 5 functions, 2 interfaces, 4 types.

### Import from the package entrypoint

```ts
import {
  COMMON_TOOL_LIMITS,
  commonUtilityToolSpecs,
  hashUtilityToolSpec,
  jsonUtilityToolSpec,
  textUtilityToolSpec,
  timeUtilityToolSpec,
  executeHashUtility,
  executeJsonUtility,
} from '@codesoul-co/hypha-tools';

import type {
  JsonObject,
  TextUtilityInput,
  HashUtilityInput,
  JsonUtilityInput,
  JsonValue,
  TimeUtilityInput,
} from '@codesoul-co/hypha-tools';

// The complete export list is documented below.
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 6 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `COMMON_TOOL_LIMITS` | constant | <code>const COMMON_TOOL_LIMITS: Readonly&lt;{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }&gt;</code> | COMMON TOOL LIMITS constant exported by the `common-tools` module. |
| `commonUtilityToolSpecs` | constant | <code>const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | Common Utility Tool Specs constant exported by the `common-tools` module. |
| `hashUtilityToolSpec` | constant | <code>const hashUtilityToolSpec: ToolSpec</code> | Hash Utility Tool Spec constant exported by the `common-tools` module. |
| `jsonUtilityToolSpec` | constant | <code>const jsonUtilityToolSpec: ToolSpec</code> | JSON Utility Tool Spec constant exported by the `common-tools` module. |
| `textUtilityToolSpec` | constant | <code>const textUtilityToolSpec: ToolSpec</code> | Text Utility Tool Spec constant exported by the `common-tools` module. |
| `timeUtilityToolSpec` | constant | <code>const timeUtilityToolSpec: ToolSpec</code> | Time Utility Tool Spec constant exported by the `common-tools` module. |
| `executeHashUtility` | function | <code>executeHashUtility(input: HashUtilityInput): Record&lt;string, unknown&gt;</code> | Execute Hash Utility function with 1 public call signature; parameters and return types are listed below. |
| `executeJsonUtility` | function | <code>executeJsonUtility(input: JsonUtilityInput): Record&lt;string, unknown&gt;</code> | Execute JSON Utility function with 1 public call signature; parameters and return types are listed below. |
| `executeTextUtility` | function | <code>executeTextUtility(input: TextUtilityInput): Record&lt;string, unknown&gt;</code> | Execute Text Utility function with 1 public call signature; parameters and return types are listed below. |
| `executeTimeUtility` | function | <code>executeTimeUtility(input: TimeUtilityInput, now?: () =&gt; Date): Record&lt;string, unknown&gt;</code> | Execute Time Utility function with 1 public call signature; parameters and return types are listed below. |
| `sanitizeJsonValue` | function | <code>sanitizeJsonValue(value: unknown): JsonValue</code> | Sanitize JSON Value function with 1 public call signature; parameters and return types are listed below. |
| `JsonObject` | interface | <code>interface JsonObject</code> | JSON Object interface with 0 public fields or methods. |
| `TextUtilityInput` | interface | <code>interface TextUtilityInput</code> | Text Utility Input interface with 11 public fields or methods. |
| `HashUtilityInput` | type | <code>type HashUtilityInput = { operation: 'sha256_text'; text: string; } &#124; { operation: 'sha256_json'; value: unknown; }</code> | Public type alias for Hash Utility Input; the declaration contains its complete type expression. |
| `JsonUtilityInput` | type | <code>type JsonUtilityInput = { operation: 'parse'; text: string; } &#124; { operation: 'stringify'; value: unknown; pretty?: boolean; } &#124; { operation: 'get'; value: unknown; pointer: string; } &#124; { operation: 'keys'; value: unknown; } &#124; { operation: 'validate'; value: unknown; schema: JsonSchema; }</code> | Public type alias for JSON Utility Input; the declaration contains its complete type expression. |
| `JsonValue` | type | <code>type JsonValue = null &#124; boolean &#124; number &#124; string &#124; JsonValue[] &#124; JsonObject</code> | Public type alias for JSON Value; the declaration contains its complete type expression. |
| `TimeUtilityInput` | type | <code>type TimeUtilityInput = { operation: 'now'; } &#124; { operation: 'parse'; value: string; } &#124; { operation: 'format'; value: string &#124; number; timeZone?: string; locale?: string; }</code> | Public type alias for Time Utility Input; the declaration contains its complete type expression. |

## `COMMON_TOOL_LIMITS`

COMMON TOOL LIMITS constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { COMMON_TOOL_LIMITS } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const COMMON_TOOL_LIMITS: Readonly<{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }>;
```

## `commonUtilityToolSpecs`

Common Utility Tool Specs constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { commonUtilityToolSpecs } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec];
```

## `hashUtilityToolSpec`

Hash Utility Tool Spec constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { hashUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const hashUtilityToolSpec: ToolSpec;
```

## `jsonUtilityToolSpec`

JSON Utility Tool Spec constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { jsonUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const jsonUtilityToolSpec: ToolSpec;
```

## `textUtilityToolSpec`

Text Utility Tool Spec constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { textUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const textUtilityToolSpec: ToolSpec;
```

## `timeUtilityToolSpec`

Time Utility Tool Spec constant exported by the `common-tools` module.

- Kind: constant
- Import: `import { timeUtilityToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare const timeUtilityToolSpec: ToolSpec;
```

## `executeHashUtility`

Execute Hash Utility function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { executeHashUtility } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare function executeHashUtility(input: HashUtilityInput): Record<string, unknown>;
```

### Call signature

```text
executeHashUtility(input: HashUtilityInput): Record<string, unknown>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>HashUtilityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, unknown>`
- Description: The return contract is defined by the type shown above.

## `executeJsonUtility`

Execute JSON Utility function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { executeJsonUtility } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare function executeJsonUtility(input: JsonUtilityInput): Record<string, unknown>;
```

### Call signature

```text
executeJsonUtility(input: JsonUtilityInput): Record<string, unknown>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>JsonUtilityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, unknown>`
- Description: The return contract is defined by the type shown above.

## `executeTextUtility`

Execute Text Utility function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { executeTextUtility } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare function executeTextUtility(input: TextUtilityInput): Record<string, unknown>;
```

### Call signature

```text
executeTextUtility(input: TextUtilityInput): Record<string, unknown>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>TextUtilityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, unknown>`
- Description: The return contract is defined by the type shown above.

## `executeTimeUtility`

Execute Time Utility function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { executeTimeUtility } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare function executeTimeUtility(input: TimeUtilityInput, now?: () => Date): Record<string, unknown>;
```

### Call signature

```text
executeTimeUtility(input: TimeUtilityInput, now?: () => Date): Record<string, unknown>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>TimeUtilityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>() =&gt; Date</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, unknown>`
- Description: The return contract is defined by the type shown above.

## `sanitizeJsonValue`

Sanitize JSON Value function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { sanitizeJsonValue } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export declare function sanitizeJsonValue(value: unknown): JsonValue;
```

### Call signature

```text
sanitizeJsonValue(value: unknown): JsonValue
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `JsonValue`
- Description: The return contract is defined by the type shown above.

## `JsonObject`

JSON Object interface with 0 public fields or methods.

- Kind: interface
- Import: `import type { JsonObject } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export interface JsonObject {
    [key: string]: JsonValue;
}
```

## `TextUtilityInput`

Text Utility Input interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { TextUtilityInput } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export interface TextUtilityInput {
    operation: 'length' | 'line_select' | 'literal_find' | 'literal_replace' | 'slice' | 'normalize_whitespace' | 'split' | 'join';
    text?: string;
    parts?: string[];
    separator?: string;
    start?: number;
    end?: number;
    query?: string;
    replacement?: string;
    caseSensitive?: boolean;
    maxResults?: number;
    mode?: 'spaces' | 'lines';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseSensitive` | property | <code>caseSensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `end` | property | <code>end?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxResults` | property | <code>maxResults?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode?: "spaces" &#124; "lines"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: "length" &#124; "line_select" &#124; "literal_find" &#124; "literal_replace" &#124; "slice" &#124; "normalize_whitespace" &#124; "split" &#124; "join"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parts` | property | <code>parts?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replacement` | property | <code>replacement?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `separator` | property | <code>separator?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `start` | property | <code>start?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HashUtilityInput`

Public type alias for Hash Utility Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { HashUtilityInput } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export type HashUtilityInput = {
    operation: 'sha256_text';
    text: string;
} | {
    operation: 'sha256_json';
    value: unknown;
};
```

## `JsonUtilityInput`

Public type alias for JSON Utility Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { JsonUtilityInput } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export type JsonUtilityInput = {
    operation: 'parse';
    text: string;
} | {
    operation: 'stringify';
    value: unknown;
    pretty?: boolean;
} | {
    operation: 'get';
    value: unknown;
    pointer: string;
} | {
    operation: 'keys';
    value: unknown;
} | {
    operation: 'validate';
    value: unknown;
    schema: JsonSchema;
};
```

## `JsonValue`

Public type alias for JSON Value; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { JsonValue } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;
```

## `TimeUtilityInput`

Public type alias for Time Utility Input; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { TimeUtilityInput } from '@codesoul-co/hypha-tools';`
- Source module: [`common-tools`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)

### Declaration

```text
export type TimeUtilityInput = {
    operation: 'now';
} | {
    operation: 'parse';
    value: string;
} | {
    operation: 'format';
    value: string | number;
    timeZone?: string;
    locale?: string;
};
```
