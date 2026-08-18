# `@codesoul-co/hypha-core` / `contracts/runtime-integrity-audit`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-integrity-audit.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CanonicalEventScanPort` | interface | <code>interface CanonicalEventScanPort</code> | Field contract for Canonical Event Scan Port; see all contract members below. |
| `RuntimeIntegrityRepairCommand` | interface | <code>interface RuntimeIntegrityRepairCommand</code> | Field contract for Runtime Integrity Repair Command; see all contract members below. |
| `RuntimeIntegrityRepairEvidence` | interface | <code>interface RuntimeIntegrityRepairEvidence</code> | Field contract for Runtime Integrity Repair Evidence; see all contract members below. |
| `RuntimeIntegrityRepairPort` | interface | <code>interface RuntimeIntegrityRepairPort</code> | Field contract for Runtime Integrity Repair Port; see all contract members below. |
| `RuntimeIntegrityRepairResult` | interface | <code>interface RuntimeIntegrityRepairResult</code> | Field contract for Runtime Integrity Repair Result; see all contract members below. |
| `RuntimeIntegrityStore` | interface | <code>interface RuntimeIntegrityStore</code> | Field contract for Runtime Integrity Store; see all contract members below. |
| `RuntimeIntegrityWatermark` | interface | <code>interface RuntimeIntegrityWatermark</code> | Field contract for Runtime Integrity Watermark; see all contract members below. |
| `ScanCanonicalEventsRequest` | interface | <code>interface ScanCanonicalEventsRequest</code> | Field contract for Scan Canonical Events Request; see all contract members below. |
| `ScanCanonicalEventsResult` | interface | <code>interface ScanCanonicalEventsResult</code> | Field contract for Scan Canonical Events Result; see all contract members below. |

## `CanonicalEventScanPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `scanCanonicalEvents` | method | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | Public runtime operation for scan Canonical Events. |

## `RuntimeIntegrityRepairCommand` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `findingHash` | property | <code>findingHash: string</code> | Public finding Hash property. |
| `repairId` | property | <code>repairId: string</code> | Public repair Id property. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public requested At property. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public requested By property. |
| `requestedRevision` | property | <code>requestedRevision: string</code> | Public requested Revision property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `RuntimeIntegrityRepairEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public evidence Hash property. |
| `evidenceRef` | property | <code>evidenceRef: string</code> | Public evidence Ref property. |
| `findingHash` | property | <code>findingHash: string</code> | Public finding Hash property. |
| `repairedAt` | property | <code>repairedAt: string</code> | Public repaired At property. |
| `repairedBy` | property | <code>repairedBy: string</code> | Public repaired By property. |
| `repairedRevision` | property | <code>repairedRevision: string</code> | Public repaired Revision property. |
| `repairId` | property | <code>repairId: string</code> | Public repair Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `RuntimeIntegrityRepairPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `repair` | method | <code>repair(command: RuntimeIntegrityRepairCommand): Promise&lt;RuntimeIntegrityRepairResult&gt;</code> | Public runtime operation for repair. |

## `RuntimeIntegrityRepairResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidenceHash` | property | <code>evidenceHash: string</code> | Public evidence Hash property. |
| `evidenceRef` | property | <code>evidenceRef: string</code> | Public evidence Ref property. |
| `repairedRevision` | property | <code>repairedRevision: string</code> | Public repaired Revision property. |

## `RuntimeIntegrityStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getRepair` | method | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | Gets Repair at this module boundary. |
| `getWatermark` | method | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | Gets Watermark at this module boundary. |
| `putRepair` | method | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | Public runtime operation for put Repair. |
| `putWatermark` | method | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | Public runtime operation for put Watermark. |

## `RuntimeIntegrityWatermark` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `auditedAt` | property | <code>auditedAt: string</code> | Public audited At property. |
| `lastGlobalSequence` | property | <code>lastGlobalSequence: number</code> | Public last Global Sequence property. |
| `projectionRevision` | property | <code>projectionRevision: string</code> | Public projection Revision property. |
| `reportHash` | property | <code>reportHash: string</code> | Public report Hash property. |
| `schemaCatalogHash` | property | <code>schemaCatalogHash: string</code> | Public schema Catalog Hash property. |
| `streamFingerprintRevision` | property | <code>streamFingerprintRevision: string</code> | Public stream Fingerprint Revision property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `ScanCanonicalEventsRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterGlobalSequence` | property | <code>afterGlobalSequence: number</code> | Public after Global Sequence property. |
| `limit` | property | <code>limit: number</code> | Public limit property. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |

## `ScanCanonicalEventsResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `hasMore` | property | <code>hasMore: boolean</code> | Public has More property. |
| `lastGlobalSequence` | property | <code>lastGlobalSequence: number</code> | Public last Global Sequence property. |
| `scannedBytes` | property | <code>scannedBytes: number</code> | Public scanned Bytes property. |
