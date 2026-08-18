# `@codesoul-co/hypha-core` / `contracts/runtime-integrity-audit`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-integrity-audit.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Runtime integrity audit 模块公开 9 接口。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CanonicalEventScanPort` | 接口 | <code>interface CanonicalEventScanPort</code> | Canonical Event Scan Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeIntegrityRepairCommand` | 接口 | <code>interface RuntimeIntegrityRepairCommand</code> | Runtime Integrity Repair Command 接口，共包含 6 个公开字段或方法。 |
| `RuntimeIntegrityRepairEvidence` | 接口 | <code>interface RuntimeIntegrityRepairEvidence</code> | Runtime Integrity Repair Evidence 接口，共包含 8 个公开字段或方法。 |
| `RuntimeIntegrityRepairPort` | 接口 | <code>interface RuntimeIntegrityRepairPort</code> | Runtime Integrity Repair Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeIntegrityRepairResult` | 接口 | <code>interface RuntimeIntegrityRepairResult</code> | Runtime Integrity Repair Result 接口，共包含 3 个公开字段或方法。 |
| `RuntimeIntegrityStore` | 接口 | <code>interface RuntimeIntegrityStore</code> | Runtime Integrity Store 接口，共包含 4 个公开字段或方法。 |
| `RuntimeIntegrityWatermark` | 接口 | <code>interface RuntimeIntegrityWatermark</code> | Runtime Integrity Watermark 接口，共包含 7 个公开字段或方法。 |
| `ScanCanonicalEventsRequest` | 接口 | <code>interface ScanCanonicalEventsRequest</code> | Scan Canonical Events Request 接口，共包含 3 个公开字段或方法。 |
| `ScanCanonicalEventsResult` | 接口 | <code>interface ScanCanonicalEventsResult</code> | Scan Canonical Events Result 接口，共包含 4 个公开字段或方法。 |

## `CanonicalEventScanPort`

Canonical Event Scan Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CanonicalEventScanPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface CanonicalEventScanPort {
    scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise<ScanCanonicalEventsResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scanCanonicalEvents` | 方法 | <code>scanCanonicalEvents(request: ScanCanonicalEventsRequest): Promise&lt;ScanCanonicalEventsResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeIntegrityRepairCommand`

Runtime Integrity Repair Command 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityRepairCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `findingHash` | 属性 | <code>findingHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairId` | 属性 | <code>repairId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedRevision` | 属性 | <code>requestedRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeIntegrityRepairEvidence`

Runtime Integrity Repair Evidence 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityRepairEvidence } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceRef` | 属性 | <code>evidenceRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `findingHash` | 属性 | <code>findingHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairedAt` | 属性 | <code>repairedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairedBy` | 属性 | <code>repairedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairedRevision` | 属性 | <code>repairedRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairId` | 属性 | <code>repairId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeIntegrityRepairPort`

Runtime Integrity Repair Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityRepairPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface RuntimeIntegrityRepairPort {
    repair(command: RuntimeIntegrityRepairCommand): Promise<RuntimeIntegrityRepairResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `repair` | 方法 | <code>repair(command: RuntimeIntegrityRepairCommand): Promise&lt;RuntimeIntegrityRepairResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeIntegrityRepairResult`

Runtime Integrity Repair Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityRepairResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface RuntimeIntegrityRepairResult {
    evidenceRef: string;
    evidenceHash: string;
    repairedRevision: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceRef` | 属性 | <code>evidenceRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `repairedRevision` | 属性 | <code>repairedRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeIntegrityStore`

Runtime Integrity Store 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface RuntimeIntegrityStore {
    getWatermark(): Promise<RuntimeIntegrityWatermark | null>;
    putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number | null): Promise<void>;
    getRepair(repairId: string): Promise<RuntimeIntegrityRepairEvidence | null>;
    putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getRepair` | 方法 | <code>getRepair(repairId: string): Promise&lt;RuntimeIntegrityRepairEvidence &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getWatermark` | 方法 | <code>getWatermark(): Promise&lt;RuntimeIntegrityWatermark &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putRepair` | 方法 | <code>putRepair(evidence: RuntimeIntegrityRepairEvidence): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putWatermark` | 方法 | <code>putWatermark(watermark: RuntimeIntegrityWatermark, expectedLastGlobalSequence: number &#124; null): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeIntegrityWatermark`

Runtime Integrity Watermark 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeIntegrityWatermark } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `auditedAt` | 属性 | <code>auditedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastGlobalSequence` | 属性 | <code>lastGlobalSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionRevision` | 属性 | <code>projectionRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reportHash` | 属性 | <code>reportHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaCatalogHash` | 属性 | <code>schemaCatalogHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streamFingerprintRevision` | 属性 | <code>streamFingerprintRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ScanCanonicalEventsRequest`

Scan Canonical Events Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ScanCanonicalEventsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface ScanCanonicalEventsRequest {
    afterGlobalSequence: number;
    limit: number;
    maxBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `afterGlobalSequence` | 属性 | <code>afterGlobalSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ScanCanonicalEventsResult`

Scan Canonical Events Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ScanCanonicalEventsResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-integrity-audit`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-integrity-audit.ts)

### 声明

```text
export interface ScanCanonicalEventsResult {
    events: PersistedFrameworkEvent[];
    scannedBytes: number;
    lastGlobalSequence: number;
    hasMore: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hasMore` | 属性 | <code>hasMore: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastGlobalSequence` | 属性 | <code>lastGlobalSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scannedBytes` | 属性 | <code>scannedBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
