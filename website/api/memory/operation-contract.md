# `@codesoul-co/hypha-memory` / `operation-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/operation-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)
- Exports: **12**

## Using this module

Use the Operation contract module for declaring and runtime-validating contracts. It exports 8 constants, 4 functions.

### Import from the package entrypoint

```ts
import {
  managedMemoryDeleteRequestSchema,
  managedMemorySearchRequestSchema,
  managedMemoryUpdateRequestSchema,
  memoryAddRequestExample,
  memoryAddRequestSchema,
  memoryPatchSchema,
  memorySearchFilterSchema,
  paginationRequestSchema,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 8 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { managedMemoryDeleteRequestSchema } from '@codesoul-co/hypha-memory';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = managedMemoryDeleteRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `managedMemoryDeleteRequestSchema` | constant | <code>const managedMemoryDeleteRequestSchema: z.ZodType&lt;ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest&gt;</code> | Runtime schema for Managed Memory Delete Request. |
| `managedMemorySearchRequestSchema` | constant | <code>const managedMemorySearchRequestSchema: z.ZodType&lt;ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest&gt;</code> | Runtime schema for Managed Memory Search Request. |
| `managedMemoryUpdateRequestSchema` | constant | <code>const managedMemoryUpdateRequestSchema: z.ZodType&lt;ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest&gt;</code> | Runtime schema for Managed Memory Update Request. |
| `memoryAddRequestExample` | constant | <code>const memoryAddRequestExample: MemoryAddRequest</code> | Valid example value for Memory Add Request. |
| `memoryAddRequestSchema` | constant | <code>const memoryAddRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata:...</code> | Runtime schema for Memory Add Request. |
| `memoryPatchSchema` | constant | <code>const memoryPatchSchema: z.ZodEffects&lt;z.ZodObject&lt;{ content: z.ZodOptional&lt;z.ZodUnknown&gt;; canonicalText: z.ZodOptional&lt;z.ZodString&gt;; summary: z.ZodOptional&lt;z.ZodString&gt;; confidence: z.ZodOptional&lt;z.ZodNumber&gt;; importance: z.ZodOptional&lt;z.ZodNumber&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; status: z.ZodOptional&lt;z.ZodEnum&lt;["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending",...</code> | Runtime schema for Memory Patch. |
| `memorySearchFilterSchema` | constant | <code>const memorySearchFilterSchema: z.ZodType&lt;MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter&gt;</code> | Runtime schema for Memory Search Filter. |
| `paginationRequestSchema` | constant | <code>const paginationRequestSchema: z.ZodType&lt;PaginationRequest, z.ZodTypeDef, PaginationRequest&gt;</code> | Runtime schema for Pagination Request. |
| `validateManagedMemoryDeleteRequest` | function | <code>validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest</code> | Validate Managed Memory Delete Request function with 1 public call signature; parameters and return types are listed below. |
| `validateManagedMemorySearchRequest` | function | <code>validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest</code> | Validate Managed Memory Search Request function with 1 public call signature; parameters and return types are listed below. |
| `validateManagedMemoryUpdateRequest` | function | <code>validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest</code> | Validate Managed Memory Update Request function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryAddRequest` | function | <code>validateMemoryAddRequest(input: unknown): MemoryAddRequest</code> | Validate Memory Add Request function with 1 public call signature; parameters and return types are listed below. |

## `managedMemoryDeleteRequestSchema`

Runtime schema for Managed Memory Delete Request.

- Kind: constant
- Import: `import { managedMemoryDeleteRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const managedMemoryDeleteRequestSchema: z.ZodType<ManagedMemoryDeleteRequest, z.ZodTypeDef, ManagedMemoryDeleteRequest>;
```

## `managedMemorySearchRequestSchema`

Runtime schema for Managed Memory Search Request.

- Kind: constant
- Import: `import { managedMemorySearchRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const managedMemorySearchRequestSchema: z.ZodType<ManagedMemorySearchRequest, z.ZodTypeDef, ManagedMemorySearchRequest>;
```

## `managedMemoryUpdateRequestSchema`

Runtime schema for Managed Memory Update Request.

- Kind: constant
- Import: `import { managedMemoryUpdateRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const managedMemoryUpdateRequestSchema: z.ZodType<ManagedMemoryUpdateRequest, z.ZodTypeDef, ManagedMemoryUpdateRequest>;
```

## `memoryAddRequestExample`

Valid example value for Memory Add Request.

- Kind: constant
- Import: `import { memoryAddRequestExample } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const memoryAddRequestExample: MemoryAddRequest;
```

## `memoryAddRequestSchema`

Runtime schema for Memory Add Request.

- Kind: constant
- Import: `import { memoryAddRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const memoryAddRequestSchema: (typeof import('@codesoul-co/hypha-memory'))['memoryAddRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `memoryPatchSchema`

Runtime schema for Memory Patch.

- Kind: constant
- Import: `import { memoryPatchSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const memoryPatchSchema: z.ZodEffects<z.ZodObject<{ content: z.ZodOptional<z.ZodUnknown>; canonicalText: z.ZodOptional<z.ZodString>; summary: z.ZodOptional<z.ZodString>; confidence: z.ZodOptional<z.ZodNumber>; importance: z.ZodOptional<z.ZodNumber>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; status: z.ZodOptional<z.ZodEnum<["pending", "active", "dormant", "superseded", "invalidated", "deletion_pending", "failed"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }>, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }, { status?: "pending" | "failed" | "active" | "dormant" | "superseded" | "invalidated" | "deletion_pending" | undefined; tags?: string[] | undefined; metadata?: Record<string, unknown> | undefined; confidence?: number | undefined; canonicalText?: string | undefined; content?: unknown; importance?: number | undefined; summary?: string | undefined; }>;
```

## `memorySearchFilterSchema`

Runtime schema for Memory Search Filter.

- Kind: constant
- Import: `import { memorySearchFilterSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const memorySearchFilterSchema: z.ZodType<MemorySearchFilter, z.ZodTypeDef, MemorySearchFilter>;
```

## `paginationRequestSchema`

Runtime schema for Pagination Request.

- Kind: constant
- Import: `import { paginationRequestSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare const paginationRequestSchema: z.ZodType<PaginationRequest, z.ZodTypeDef, PaginationRequest>;
```

## `validateManagedMemoryDeleteRequest`

Validate Managed Memory Delete Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateManagedMemoryDeleteRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare function validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest;
```

### Call signature

```text
validateManagedMemoryDeleteRequest(input: unknown): ManagedMemoryDeleteRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ManagedMemoryDeleteRequest`
- Description: The return contract is defined by the type shown above.

## `validateManagedMemorySearchRequest`

Validate Managed Memory Search Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateManagedMemorySearchRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare function validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest;
```

### Call signature

```text
validateManagedMemorySearchRequest(input: unknown): ManagedMemorySearchRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ManagedMemorySearchRequest`
- Description: The return contract is defined by the type shown above.

## `validateManagedMemoryUpdateRequest`

Validate Managed Memory Update Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateManagedMemoryUpdateRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare function validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest;
```

### Call signature

```text
validateManagedMemoryUpdateRequest(input: unknown): ManagedMemoryUpdateRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ManagedMemoryUpdateRequest`
- Description: The return contract is defined by the type shown above.

## `validateMemoryAddRequest`

Validate Memory Add Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryAddRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`operation-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/operation-contract.ts)

### Declaration

```text
export declare function validateMemoryAddRequest(input: unknown): MemoryAddRequest;
```

### Call signature

```text
validateMemoryAddRequest(input: unknown): MemoryAddRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryAddRequest`
- Description: The return contract is defined by the type shown above.
