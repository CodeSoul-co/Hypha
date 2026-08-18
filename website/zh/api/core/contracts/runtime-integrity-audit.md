# `@codesoul-co/hypha-core` / `contracts/runtime-integrity-audit`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-integrity-audit.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CanonicalEventScanPort` | 接口 | <code>interface CanonicalEventScanPort</code> | Canonical Event Scan Port 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityRepairCommand` | 接口 | <code>interface RuntimeIntegrityRepairCommand</code> | Runtime Integrity Repair Command 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityRepairEvidence` | 接口 | <code>interface RuntimeIntegrityRepairEvidence</code> | Runtime Integrity Repair Evidence 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityRepairPort` | 接口 | <code>interface RuntimeIntegrityRepairPort</code> | Runtime Integrity Repair Port 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityRepairResult` | 接口 | <code>interface RuntimeIntegrityRepairResult</code> | Runtime Integrity Repair Result 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityStore` | 接口 | <code>interface RuntimeIntegrityStore</code> | Runtime Integrity Store 的字段契约；完整字段见下表。 |
| `RuntimeIntegrityWatermark` | 接口 | <code>interface RuntimeIntegrityWatermark</code> | Runtime Integrity Watermark 的字段契约；完整字段见下表。 |
| `ScanCanonicalEventsRequest` | 接口 | <code>interface ScanCanonicalEventsRequest</code> | Scan Canonical Events Request 的字段契约；完整字段见下表。 |
| `ScanCanonicalEventsResult` | 接口 | <code>interface ScanCanonicalEventsResult</code> | Scan Canonical Events Result 的字段契约；完整字段见下表。 |

## `CanonicalEventScanPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scanCanonicalEvents` | 方法 | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | scan Canonical Events 的公开运行时操作。 |

## `RuntimeIntegrityRepairCommand` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `findingHash` | 属性 | <code>findingHash: string</code> | finding Hash 字段。 |
| `repairId` | 属性 | <code>repairId: string</code> | repair Id 字段。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | requested At 字段。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | requested By 字段。 |
| `requestedRevision` | 属性 | <code>requestedRevision: string</code> | requested Revision 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `RuntimeIntegrityRepairEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | evidence Hash 字段。 |
| `evidenceRef` | 属性 | <code>evidenceRef: string</code> | evidence Ref 字段。 |
| `findingHash` | 属性 | <code>findingHash: string</code> | finding Hash 字段。 |
| `repairedAt` | 属性 | <code>repairedAt: string</code> | repaired At 字段。 |
| `repairedBy` | 属性 | <code>repairedBy: string</code> | repaired By 字段。 |
| `repairedRevision` | 属性 | <code>repairedRevision: string</code> | repaired Revision 字段。 |
| `repairId` | 属性 | <code>repairId: string</code> | repair Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `RuntimeIntegrityRepairPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `repair` | 方法 | <code>repair(command: RuntimeIntegrityRepairCommand): Promise&lt;RuntimeIntegrityRepairResult&gt;</code> | repair 的公开运行时操作。 |

## `RuntimeIntegrityRepairResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | evidence Hash 字段。 |
| `evidenceRef` | 属性 | <code>evidenceRef: string</code> | evidence Ref 字段。 |
| `repairedRevision` | 属性 | <code>repairedRevision: string</code> | repaired Revision 字段。 |

## `RuntimeIntegrityStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getRepair` | 方法 | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | 读取 Repair。 |
| `getWatermark` | 方法 | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | 读取 Watermark。 |
| `putRepair` | 方法 | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | put Repair 的公开运行时操作。 |
| `putWatermark` | 方法 | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | put Watermark 的公开运行时操作。 |

## `RuntimeIntegrityWatermark` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `auditedAt` | 属性 | <code>auditedAt: string</code> | audited At 字段。 |
| `lastGlobalSequence` | 属性 | <code>lastGlobalSequence: number</code> | last Global Sequence 字段。 |
| `projectionRevision` | 属性 | <code>projectionRevision: string</code> | projection Revision 字段。 |
| `reportHash` | 属性 | <code>reportHash: string</code> | report Hash 字段。 |
| `schemaCatalogHash` | 属性 | <code>schemaCatalogHash: string</code> | schema Catalog Hash 字段。 |
| `streamFingerprintRevision` | 属性 | <code>streamFingerprintRevision: string</code> | stream Fingerprint Revision 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `ScanCanonicalEventsRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterGlobalSequence` | 属性 | <code>afterGlobalSequence: number</code> | after Global Sequence 字段。 |
| `limit` | 属性 | <code>limit: number</code> | limit 字段。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |

## `ScanCanonicalEventsResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | has More 字段。 |
| `lastGlobalSequence` | 属性 | <code>lastGlobalSequence: number</code> | last Global Sequence 字段。 |
| `scannedBytes` | 属性 | <code>scannedBytes: number</code> | scanned Bytes 字段。 |
