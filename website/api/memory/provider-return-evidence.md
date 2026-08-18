# `@codesoul-co/hypha-memory` / `provider-return-evidence`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-return-evidence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)
- Exports: **6**

## Using this module

Use the Provider return evidence module for binding external or local providers to Hypha ports. It exports 1 constant, 2 functions, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  memoryProviderReturnEvidenceSchema,
  createMemoryProviderReturnEvidence,
  verifyMemoryProviderReturnEvidence,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryProviderEvidenceContext,
  MemoryProviderRecordBinding,
  MemoryProviderReturnEvidence,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryProviderReturnEvidenceSchema` | constant | <code>const memoryProviderReturnEvidenceSchema: ZodType&lt;MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence&gt;</code> | Runtime schema for Memory Provider Return Evidence. |
| `createMemoryProviderReturnEvidence` | function | <code>createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence</code> | Create Memory Provider Return Evidence function with 1 public call signature; parameters and return types are listed below. |
| `verifyMemoryProviderReturnEvidence` | function | <code>verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;): MemoryProviderReturnEvidence</code> | Verify Memory Provider Return Evidence function with 1 public call signature; parameters and return types are listed below. |
| `MemoryProviderEvidenceContext` | interface | <code>interface MemoryProviderEvidenceContext</code> | Memory Provider Evidence Context interface with 10 public fields or methods. |
| `MemoryProviderRecordBinding` | interface | <code>interface MemoryProviderRecordBinding</code> | Memory Provider Record Binding interface with 5 public fields or methods. |
| `MemoryProviderReturnEvidence` | interface | <code>interface MemoryProviderReturnEvidence</code> | Memory Provider Return Evidence interface with 12 public fields or methods. |

## `memoryProviderReturnEvidenceSchema`

Runtime schema for Memory Provider Return Evidence.

- Kind: constant
- Import: `import { memoryProviderReturnEvidenceSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export declare const memoryProviderReturnEvidenceSchema: ZodType<MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence>;
```

## `createMemoryProviderReturnEvidence`

Create Memory Provider Return Evidence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export declare function createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence;
```

### Call signature

```text
createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | <code>MemoryProviderEvidenceContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryProviderReturnEvidence`
- Description: The return contract is defined by the type shown above.

## `verifyMemoryProviderReturnEvidence`

Verify Memory Provider Return Evidence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { verifyMemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export declare function verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit<MemoryProviderEvidenceContext, 'status' | 'error'>): MemoryProviderReturnEvidence;
```

### Call signature

```text
verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit<MemoryProviderEvidenceContext, "status" | "error">): MemoryProviderReturnEvidence
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `evidence` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryProviderReturnEvidence`
- Description: The return contract is defined by the type shown above.

## `MemoryProviderEvidenceContext`

Memory Provider Evidence Context interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderEvidenceContext } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export interface MemoryProviderEvidenceContext {
    operationId: string;
    operation: MemoryActivityOperation;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    providerId: string;
    providerRevision?: string;
    input: unknown;
    output: unknown;
    status: MemoryProviderReturnEvidence['terminal']['status'];
    error?: NormalizedMemoryError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderRecordBinding`

Memory Provider Record Binding interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderRecordBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export interface MemoryProviderRecordBinding {
    memoryId: string;
    versionId: string;
    revision: number;
    scopeHash: string;
    providerId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderReturnEvidence`

Memory Provider Return Evidence interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderReturnEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-return-evidence`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)

### Declaration

```text
export interface MemoryProviderReturnEvidence {
    schemaVersion: '1.0';
    operationId: string;
    operation: MemoryActivityOperation;
    inputHash: string;
    principalHash: string;
    scopeHash: string;
    providerId: string;
    providerRevision?: string;
    outputHash: string;
    recordBindings: MemoryProviderRecordBinding[];
    terminal: {
        status: 'completed' | 'partial' | 'failed' | 'cancelled';
        error?: NormalizedMemoryError;
    };
    proofHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalHash` | property | <code>principalHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `proofHash` | property | <code>proofHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordBindings` | property | <code>recordBindings: MemoryProviderRecordBinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminal` | property | <code>terminal: { status: "completed" &#124; "partial" &#124; "failed" &#124; "cancelled"; error?: NormalizedMemoryError; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
