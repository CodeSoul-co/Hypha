# `@codesoul-co/hypha-tools` / `tool-families`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/tool-families.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)
- Exports: **4**

## Using this module

Use the Tool families module for using the public contracts and operations for this capability boundary. It exports 1 constant, 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  governedToolFamilySpecs,
  createGovernedToolFamilyBindings,
} from '@codesoul-co/hypha-tools';

import type {
  GovernedToolFamilyBinding,
  GovernedToolFamilyPort,
} from '@codesoul-co/hypha-tools';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `governedToolFamilySpecs` | constant | <code>const governedToolFamilySpecs: readonly ToolSpec[]</code> | Governed Tool Family Specs constant exported by the `tool-families` module. |
| `createGovernedToolFamilyBindings` | function | <code>createGovernedToolFamilyBindings(ports: Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;): GovernedToolFamilyBinding[]</code> | Create Governed Tool Family Bindings function with 1 public call signature; parameters and return types are listed below. |
| `GovernedToolFamilyBinding` | interface | <code>interface GovernedToolFamilyBinding</code> | Governed Tool Family Binding interface with 2 public fields or methods. |
| `GovernedToolFamilyPort` | interface | <code>interface GovernedToolFamilyPort</code> | Governed Tool Family Port interface with 1 public fields or methods. |

## `governedToolFamilySpecs`

Governed Tool Family Specs constant exported by the `tool-families` module.

- Kind: constant
- Import: `import { governedToolFamilySpecs } from '@codesoul-co/hypha-tools';`
- Source module: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### Declaration

```text
export declare const governedToolFamilySpecs: readonly ToolSpec[];
```

## `createGovernedToolFamilyBindings`

Create Governed Tool Family Bindings function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createGovernedToolFamilyBindings } from '@codesoul-co/hypha-tools';`
- Source module: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### Declaration

```text
export declare function createGovernedToolFamilyBindings(ports: Readonly<Record<string, GovernedToolFamilyPort>>): GovernedToolFamilyBinding[];
```

### Call signature

```text
createGovernedToolFamilyBindings(ports: Readonly<Record<string, GovernedToolFamilyPort>>): GovernedToolFamilyBinding[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `ports` | <code>Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `GovernedToolFamilyBinding[]`
- Description: The return contract is defined by the type shown above.

## `GovernedToolFamilyBinding`

Governed Tool Family Binding interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { GovernedToolFamilyBinding } from '@codesoul-co/hypha-tools';`
- Source module: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### Declaration

```text
export interface GovernedToolFamilyBinding {
    spec: ToolSpec;
    adapter: ToolAdapter;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedToolFamilyPort`

Governed Tool Family Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { GovernedToolFamilyPort } from '@codesoul-co/hypha-tools';`
- Source module: [`tool-families`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)

### Declaration

```text
export interface GovernedToolFamilyPort {
    execute(input: {
        toolId: string;
        input: Record<string, unknown>;
        context: ToolCallContext;
    }): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(input: { toolId: string; input: Record&lt;string, unknown&gt;; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
