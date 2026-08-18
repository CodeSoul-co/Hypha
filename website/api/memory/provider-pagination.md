# `@codesoul-co/hypha-memory` / `provider-pagination`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-pagination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)
- Exports: **5**

## Using this module

Use the Provider pagination module for binding external or local providers to Hypha ports. It exports 3 functions, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  beginProviderPage,
  encodeProviderCursor,
  finishProviderPage,
} from '@codesoul-co/hypha-memory';

import type {
  ProviderPageContext,
  ProviderPaginationBudget,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beginProviderPage` | function | <code>beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest &#124; undefined, nowMs?: number): ProviderPageContext</code> | Begin Provider Page function with 1 public call signature; parameters and return types are listed below. |
| `encodeProviderCursor` | function | <code>encodeProviderCursor(envelope: ProviderCursorEnvelope): string</code> | Encode Provider Cursor function with 1 public call signature; parameters and return types are listed below. |
| `finishProviderPage` | function | <code>finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }</code> | Finish Provider Page function with 1 public call signature; parameters and return types are listed below. |
| `ProviderPageContext` | interface | <code>interface ProviderPageContext</code> | Provider Page Context interface with 5 public fields or methods. |
| `ProviderPaginationBudget` | interface | <code>interface ProviderPaginationBudget</code> | Provider Pagination Budget interface with 5 public fields or methods. |

## `beginProviderPage`

Begin Provider Page function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { beginProviderPage } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### Declaration

```text
export declare function beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest | undefined, nowMs?: number): ProviderPageContext;
```

### Call signature

```text
beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest | undefined, nowMs?: number): ProviderPageContext
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `scope` | <code>ManagedMemoryScope</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `pagination` | <code>PaginationRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `nowMs` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ProviderPageContext`
- Description: The return contract is defined by the type shown above.

## `encodeProviderCursor`

Encode Provider Cursor function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { encodeProviderCursor } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### Declaration

```text
export declare function encodeProviderCursor(envelope: ProviderCursorEnvelope): string;
```

### Call signature

```text
encodeProviderCursor(envelope: ProviderCursorEnvelope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `envelope` | <code>ProviderCursorEnvelope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `finishProviderPage`

Finish Provider Page function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { finishProviderPage } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### Declaration

```text
export declare function finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): {
    nextCursor?: string;
    hasMore: boolean;
};
```

### Call signature

```text
finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | <code>ProviderPageContext</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `providerId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `scope` | <code>ManagedMemoryScope</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `records` | <code>unknown[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `nextProviderCursor` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |
| `nowMs` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ nextCursor?: string; hasMore: boolean; }`
- Description: The return contract is defined by the type shown above.

## `ProviderPageContext`

Provider Page Context interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderPageContext } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### Declaration

```text
export interface ProviderPageContext {
    providerCursor?: string;
    envelope?: ProviderCursorEnvelope;
    budget: ProviderPaginationBudget;
    startedAt: string;
    nowMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budget` | property | <code>budget: ProviderPaginationBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope?: ProviderCursorEnvelope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nowMs` | property | <code>nowMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCursor` | property | <code>providerCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderPaginationBudget`

Provider Pagination Budget interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ProviderPaginationBudget } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-pagination`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)

### Declaration

```text
export interface ProviderPaginationBudget {
    maxPages: number;
    maxItems: number;
    maxBytes: number;
    maxDurationMs: number;
    maxCalls: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCalls` | property | <code>maxCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDurationMs` | property | <code>maxDurationMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItems` | property | <code>maxItems: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPages` | property | <code>maxPages: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
