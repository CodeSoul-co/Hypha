# `@codesoul-co/hypha-inference` / `reasoning-sources`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/reasoning-sources.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)
- Exports: **3**

## Using this module

Use the Reasoning sources module for using the public contracts and operations for this capability boundary. It exports 2 constants, 1 function.

### Import from the package entrypoint

```ts
import {
  BUILT_IN_REASONING_STRATEGY_DESCRIPTORS,
  REACT_OFFICIAL_REFERENCES,
  builtInReasoningDescriptor,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `BUILT_IN_REASONING_STRATEGY_DESCRIPTORS` | constant | <code>const BUILT_IN_REASONING_STRATEGY_DESCRIPTORS: ReasoningStrategyDescriptor[]</code> | BUILT IN REASONING STRATEGY DESCRIPTORS constant exported by the `reasoning-sources` module. |
| `REACT_OFFICIAL_REFERENCES` | constant | <code>const REACT_OFFICIAL_REFERENCES: ReasoningStrategyReference[]</code> | REACT OFFICIAL REFERENCES constant exported by the `reasoning-sources` module. |
| `builtInReasoningDescriptor` | function | <code>builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor</code> | Built In Reasoning Descriptor function with 1 public call signature; parameters and return types are listed below. |

## `BUILT_IN_REASONING_STRATEGY_DESCRIPTORS`

BUILT IN REASONING STRATEGY DESCRIPTORS constant exported by the `reasoning-sources` module.

- Kind: constant
- Import: `import { BUILT_IN_REASONING_STRATEGY_DESCRIPTORS } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### Declaration

```text
export declare const BUILT_IN_REASONING_STRATEGY_DESCRIPTORS: ReasoningStrategyDescriptor[];
```

## `REACT_OFFICIAL_REFERENCES`

REACT OFFICIAL REFERENCES constant exported by the `reasoning-sources` module.

- Kind: constant
- Import: `import { REACT_OFFICIAL_REFERENCES } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### Declaration

```text
export declare const REACT_OFFICIAL_REFERENCES: ReasoningStrategyReference[];
```

## `builtInReasoningDescriptor`

Built In Reasoning Descriptor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { builtInReasoningDescriptor } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### Declaration

```text
export declare function builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor;
```

### Call signature

```text
builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReasoningStrategyDescriptor`
- Description: The return contract is defined by the type shown above.
