# `@codesoul-co/hypha-core` / `contracts/runtime-integrity-audit`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-integrity-audit.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)
- Exports: **9**

## Using this module

Use the Runtime integrity audit module for declaring and runtime-validating contracts. It exports 9 interfaces.

### Import from the package entrypoint

```ts
import type {
  CanonicalEventScanPort,
  RuntimeIntegrityRepairCommand,
  RuntimeIntegrityRepairEvidence,
  RuntimeIntegrityRepairPort,
  RuntimeIntegrityRepairResult,
  RuntimeIntegrityStore,
  RuntimeIntegrityWatermark,
  ScanCanonicalEventsRequest,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CanonicalEventScanPort` | interface | <code>interface CanonicalEventScanPort</code> | Canonical Event Scan Port interface with 1 public fields or methods. |
| `RuntimeIntegrityRepairCommand` | interface | <code>interface RuntimeIntegrityRepairCommand</code> | Runtime Integrity Repair Command interface with 6 public fields or methods. |
| `RuntimeIntegrityRepairEvidence` | interface | <code>interface RuntimeIntegrityRepairEvidence</code> | Runtime Integrity Repair Evidence interface with 8 public fields or methods. |
| `RuntimeIntegrityRepairPort` | interface | <code>interface RuntimeIntegrityRepairPort</code> | Runtime Integrity Repair Port interface with 1 public fields or methods. |
| `RuntimeIntegrityRepairResult` | interface | <code>interface RuntimeIntegrityRepairResult</code> | Runtime Integrity Repair Result interface with 3 public fields or methods. |
| `RuntimeIntegrityStore` | interface | <code>interface RuntimeIntegrityStore</code> | Runtime Integrity Store interface with 4 public fields or methods. |
| `RuntimeIntegrityWatermark` | interface | <code>interface RuntimeIntegrityWatermark</code> | Runtime Integrity Watermark interface with 7 public fields or methods. |
| `ScanCanonicalEventsRequest` | interface | <code>interface ScanCanonicalEventsRequest</code> | Scan Canonical Events Request interface with 3 public fields or methods. |
| `ScanCanonicalEventsResult` | interface | <code>interface ScanCanonicalEventsResult</code> | Scan Canonical Events Result interface with 4 public fields or methods. |

## `CanonicalEventScanPort`

Canonical Event Scan Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { CanonicalEventScanPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface CanonicalEventScanPort {
    scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise<ScanCanonicalEventsResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scanCanonicalEvents` | method | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeIntegrityRepairCommand`

Runtime Integrity Repair Command interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityRepairCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityRepairCommand {
    version: '1.0.0';
    repairId: string;
    findingHash: string;
    requestedRevision: string;
    requestedBy: string;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `findingHash` | property | <code>findingHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairId` | property | <code>repairId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedRevision` | property | <code>requestedRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeIntegrityRepairEvidence`

Runtime Integrity Repair Evidence interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityRepairEvidence } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityRepairEvidence {
    version: '1.0.0';
    repairId: string;
    findingHash: string;
    repairedRevision: string;
    evidenceRef: string;
    evidenceHash: string;
    repairedBy: string;
    repairedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceRef` | property | <code>evidenceRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `findingHash` | property | <code>findingHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairedAt` | property | <code>repairedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairedBy` | property | <code>repairedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairedRevision` | property | <code>repairedRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairId` | property | <code>repairId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeIntegrityRepairPort`

Runtime Integrity Repair Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityRepairPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityRepairPort {
    repair(command: RuntimeIntegrityRepairCommand): Promise<RuntimeIntegrityRepairResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `repair` | method | <code>repair(command: RuntimeIntegrityRepairCommand): Promise&lt;RuntimeIntegrityRepairResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeIntegrityRepairResult`

Runtime Integrity Repair Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityRepairResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityRepairResult {
    evidenceRef: string;
    evidenceHash: string;
    repairedRevision: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceRef` | property | <code>evidenceRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repairedRevision` | property | <code>repairedRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeIntegrityStore`

Runtime Integrity Store interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityStore {
    getWatermark(): Promise<RuntimeIntegrityWatermark | null>;
    putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number | null): Promise<void>;
    getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null>;
    putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getRepair` | method | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getWatermark` | method | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putRepair` | method | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `putWatermark` | method | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeIntegrityWatermark`

Runtime Integrity Watermark interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeIntegrityWatermark } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface RuntimeIntegrityWatermark {
    version: '1.0.0';
    lastGlobalSequence: number;
    projectionRevision: string;
    schemaCatalogHash: string;
    streamFingerprintRevision: string;
    reportHash: string;
    auditedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `auditedAt` | property | <code>auditedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastGlobalSequence` | property | <code>lastGlobalSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionRevision` | property | <code>projectionRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportHash` | property | <code>reportHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaCatalogHash` | property | <code>schemaCatalogHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streamFingerprintRevision` | property | <code>streamFingerprintRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ScanCanonicalEventsRequest`

Scan Canonical Events Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ScanCanonicalEventsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface ScanCanonicalEventsRequest {
    afterGlobalSequence: number;
    limit: number;
    maxBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterGlobalSequence` | property | <code>afterGlobalSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ScanCanonicalEventsResult`

Scan Canonical Events Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ScanCanonicalEventsResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### Declaration

```text
export interface ScanCanonicalEventsResult {
    events: PersistedFrameworkEvent[];
    scannedBytes: number;
    lastGlobalSequence: number;
    hasMore: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hasMore` | property | <code>hasMore: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastGlobalSequence` | property | <code>lastGlobalSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scannedBytes` | property | <code>scannedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
