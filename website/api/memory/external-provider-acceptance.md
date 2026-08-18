# `@codesoul-co/hypha-memory` / `external-provider-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/external-provider-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)
- Exports: **8**

## Using this module

Use the External provider acceptance module for binding external or local providers to Hypha ports. It exports 2 functions, 6 interfaces.

### Import from the package entrypoint

```ts
import {
  assertContractShape,
  runExternalProviderAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalProviderAcceptanceEvidence,
  ExternalProviderAcceptanceEvidenceInput,
  ExternalProviderAcceptanceFixture,
  ExternalProviderAcceptanceHooks,
  ExternalProviderAcceptanceReport,
  ExternalProviderFailureProbe,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertContractShape` | function | <code>assertContractShape(client: ExternalMemoryClient): void</code> | Assert Contract Shape function with 1 public call signature; parameters and return types are listed below. |
| `runExternalProviderAcceptance` | function | <code>runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise&lt;ExternalProviderAcceptanceReport&gt;</code> | Provider-neutral management acceptance flow shared by every external client. |
| `ExternalProviderAcceptanceEvidence` | interface | <code>interface ExternalProviderAcceptanceEvidence</code> | External Provider Acceptance Evidence interface with 8 public fields or methods. |
| `ExternalProviderAcceptanceEvidenceInput` | interface | <code>interface ExternalProviderAcceptanceEvidenceInput</code> | External Provider Acceptance Evidence Input interface with 6 public fields or methods. |
| `ExternalProviderAcceptanceFixture` | interface | <code>interface ExternalProviderAcceptanceFixture</code> | External Provider Acceptance Fixture interface with 9 public fields or methods. |
| `ExternalProviderAcceptanceHooks` | interface | <code>interface ExternalProviderAcceptanceHooks</code> | External Provider Acceptance Hooks interface with 6 public fields or methods. |
| `ExternalProviderAcceptanceReport` | interface | <code>interface ExternalProviderAcceptanceReport</code> | External Provider Acceptance Report interface with 15 public fields or methods. |
| `ExternalProviderFailureProbe` | interface | <code>interface ExternalProviderFailureProbe</code> | External Provider Failure Probe interface with 3 public fields or methods. |

## `assertContractShape`

Assert Contract Shape function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertContractShape } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export declare function assertContractShape(client: ExternalMemoryClient): void;
```

### Call signature

```text
assertContractShape(client: ExternalMemoryClient): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | <code>ExternalMemoryClient</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `runExternalProviderAcceptance`

Provider-neutral management acceptance flow shared by every external client.

- Kind: function
- Import: `import { runExternalProviderAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export declare function runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise<ExternalProviderAcceptanceReport>;
```

### Call signature

```text
runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise<ExternalProviderAcceptanceReport>
```

Provider-neutral management acceptance flow shared by every external client.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `client` | <code>ExternalMemoryClient</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `fixture` | <code>ExternalProviderAcceptanceFixture</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `signal` | <code>AbortSignal</code> | No | Optional parameter; accepted values are defined by the type column. |
| `evidenceInput` | <code>ExternalProviderAcceptanceEvidenceInput</code> | No | Optional parameter; accepted values are defined by the type column. |
| `hooks` | <code>ExternalProviderAcceptanceHooks</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<ExternalProviderAcceptanceReport>`
- Description: The return contract is defined by the type shown above.

## `ExternalProviderAcceptanceEvidence`

External Provider Acceptance Evidence interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderAcceptanceEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderAcceptanceEvidence {
    commitSha: string;
    providerId: string;
    providerVersion: string;
    profileHash: string;
    capabilitySnapshot: MemoryManagementCapabilities;
    environmentHash: string;
    startedAt: string;
    finishedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commitSha` | property | <code>commitSha: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finishedAt` | property | <code>finishedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalProviderAcceptanceEvidenceInput`

External Provider Acceptance Evidence Input interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderAcceptanceEvidenceInput } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderAcceptanceEvidenceInput {
    commitSha: string;
    providerId: string;
    providerVersion: string;
    profileHash: string;
    environmentHash: string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commitSha` | property | <code>commitSha: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalProviderAcceptanceFixture`

External Provider Acceptance Fixture interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderAcceptanceFixture } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderAcceptanceFixture {
    add: MemoryAddRequest;
    search: ManagedMemorySearchRequest;
    list: MemoryListRequest;
    get(memoryId: string): MemoryGetRequest;
    update(memoryId: string): ManagedMemoryUpdateRequest;
    history(memoryId: string): MemoryHistoryRequest;
    delete(memoryId: string): ManagedMemoryDeleteRequest;
    forbiddenGet?(memoryId: string): MemoryGetRequest;
    resolveMemoryId(result: {
        addedIds: string[];
        searchedIds: string[];
        listedIds: string[];
    }): string | undefined;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | property | <code>add: MemoryAddRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `delete` | method | <code>delete(memoryId: string): ManagedMemoryDeleteRequest</code> | Public method; parameters and return type are shown in the signature. |
| `forbiddenGet` | method | <code>forbiddenGet?(memoryId: string): MemoryGetRequest</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(memoryId: string): MemoryGetRequest</code> | Public method; parameters and return type are shown in the signature. |
| `history` | method | <code>history(memoryId: string): MemoryHistoryRequest</code> | Public method; parameters and return type are shown in the signature. |
| `list` | property | <code>list: MemoryListRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveMemoryId` | method | <code>resolveMemoryId(result: { addedIds: string[]; searchedIds: string[]; listedIds: string[]; }): string &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `search` | property | <code>search: ManagedMemorySearchRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `update` | method | <code>update(memoryId: string): ManagedMemoryUpdateRequest</code> | Public method; parameters and return type are shown in the signature. |

## `ExternalProviderAcceptanceHooks`

External Provider Acceptance Hooks interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderAcceptanceHooks } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderAcceptanceHooks {
    settleAdd?(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise<void>;
    preparePagination?(signal?: AbortSignal): Promise<void>;
    verifyRestart?(memoryId: string, signal?: AbortSignal): Promise<void>;
    verifyDelete?(memoryId: string, signal?: AbortSignal): Promise<void>;
    failureProbes?: readonly ExternalProviderFailureProbe[];
    cleanup?(signal?: AbortSignal): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanup` | method | <code>cleanup?(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `failureProbes` | property | <code>failureProbes?: readonly ExternalProviderFailureProbe[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preparePagination` | method | <code>preparePagination?(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `settleAdd` | method | <code>settleAdd?(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verifyDelete` | method | <code>verifyDelete?(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verifyRestart` | method | <code>verifyRestart?(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExternalProviderAcceptanceReport`

External Provider Acceptance Report interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderAcceptanceReport } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderAcceptanceReport {
    status: 'passed';
    capabilities: MemoryManagementCapabilities;
    memoryId: string;
    addStatus: string;
    searchCount: number;
    listCount: number;
    updateStatus?: string;
    historyCount?: number;
    deleteStatus: string;
    healthStatus: string;
    paginationPageCount: number;
    scopeIsolationVerified: boolean;
    restartVerified: boolean;
    failureProbeCount: number;
    evidence?: ExternalProviderAcceptanceEvidence;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `addStatus` | property | <code>addStatus: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deleteStatus` | property | <code>deleteStatus: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence?: ExternalProviderAcceptanceEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureProbeCount` | property | <code>failureProbeCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `healthStatus` | property | <code>healthStatus: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `historyCount` | property | <code>historyCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `listCount` | property | <code>listCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `paginationPageCount` | property | <code>paginationPageCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `restartVerified` | property | <code>restartVerified: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeIsolationVerified` | property | <code>scopeIsolationVerified: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `searchCount` | property | <code>searchCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "passed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updateStatus` | property | <code>updateStatus?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalProviderFailureProbe`

External Provider Failure Probe interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderFailureProbe } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### Declaration

```text
export interface ExternalProviderFailureProbe {
    id: string;
    expectedCodes: readonly NormalizedMemoryError['code'][];
    run(signal?: AbortSignal): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedCodes` | property | <code>expectedCodes: readonly ("MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; ...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `run` | method | <code>run(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
