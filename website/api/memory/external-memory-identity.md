# `@codesoul-co/hypha-memory` / `external-memory-identity`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/external-memory-identity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-memory-identity.ts)
- Exports: **1**

## Using this module

Use the External memory identity module for using the public contracts and operations for this capability boundary. It exports 1 function.

### Import from the package entrypoint

```ts
import {
  createExternalMemoryId,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createExternalMemoryId` | function | <code>createExternalMemoryId(providerId: string, externalId: string): string</code> | Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId. |

## `createExternalMemoryId`

Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId.

- Kind: function
- Import: `import { createExternalMemoryId } from '@codesoul-co/hypha-memory';`
- Source module: [`external-memory-identity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-memory-identity.ts)

### Declaration

```text
export declare function createExternalMemoryId(providerId: string, externalId: string): string;
```

### Call signature

```text
createExternalMemoryId(providerId: string, externalId: string): string
```

Builds the stable Hypha-owned identifier for an external provider record. The provider identifier is retained separately as providerExternalId.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `externalId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
