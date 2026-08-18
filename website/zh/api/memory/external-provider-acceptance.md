# `@codesoul-co/hypha-memory` / `external-provider-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/external-provider-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)
- 导出数: **8**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。External provider acceptance 模块公开 2 函数、6 接口。

### 从包入口导入

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

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertContractShape` | 函数 | <code>assertContractShape(client: ExternalMemoryClient): void</code> | Assert Contract Shape 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runExternalProviderAcceptance` | 函数 | <code>runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise&lt;ExternalProviderAcceptanceReport&gt;</code> | Provider-neutral management acceptance flow shared by every external client. |
| `ExternalProviderAcceptanceEvidence` | 接口 | <code>interface ExternalProviderAcceptanceEvidence</code> | External Provider Acceptance Evidence 接口，共包含 8 个公开字段或方法。 |
| `ExternalProviderAcceptanceEvidenceInput` | 接口 | <code>interface ExternalProviderAcceptanceEvidenceInput</code> | External Provider Acceptance Evidence Input 接口，共包含 6 个公开字段或方法。 |
| `ExternalProviderAcceptanceFixture` | 接口 | <code>interface ExternalProviderAcceptanceFixture</code> | External Provider Acceptance Fixture 接口，共包含 9 个公开字段或方法。 |
| `ExternalProviderAcceptanceHooks` | 接口 | <code>interface ExternalProviderAcceptanceHooks</code> | External Provider Acceptance Hooks 接口，共包含 6 个公开字段或方法。 |
| `ExternalProviderAcceptanceReport` | 接口 | <code>interface ExternalProviderAcceptanceReport</code> | External Provider Acceptance Report 接口，共包含 15 个公开字段或方法。 |
| `ExternalProviderFailureProbe` | 接口 | <code>interface ExternalProviderFailureProbe</code> | External Provider Failure Probe 接口，共包含 3 个公开字段或方法。 |

## `assertContractShape`

Assert Contract Shape 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertContractShape } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

```text
export declare function assertContractShape(client: ExternalMemoryClient): void;
```

### 调用签名

```text
assertContractShape(client: ExternalMemoryClient): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `client` | <code>ExternalMemoryClient</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `runExternalProviderAcceptance`

Provider-neutral management acceptance flow shared by every external client.

- 种类: 函数
- 导入: `import { runExternalProviderAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

```text
export declare function runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise<ExternalProviderAcceptanceReport>;
```

### 调用签名

```text
runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise<ExternalProviderAcceptanceReport>
```

Provider-neutral management acceptance flow shared by every external client.

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `client` | <code>ExternalMemoryClient</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `fixture` | <code>ExternalProviderAcceptanceFixture</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `signal` | <code>AbortSignal</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `evidenceInput` | <code>ExternalProviderAcceptanceEvidenceInput</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `hooks` | <code>ExternalProviderAcceptanceHooks</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<ExternalProviderAcceptanceReport>`
- 说明: 返回值契约由上述类型定义。

## `ExternalProviderAcceptanceEvidence`

External Provider Acceptance Evidence 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderAcceptanceEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commitSha` | 属性 | <code>commitSha: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finishedAt` | 属性 | <code>finishedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalProviderAcceptanceEvidenceInput`

External Provider Acceptance Evidence Input 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderAcceptanceEvidenceInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commitSha` | 属性 | <code>commitSha: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalProviderAcceptanceFixture`

External Provider Acceptance Fixture 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderAcceptanceFixture } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 属性 | <code>add: MemoryAddRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `delete` | 方法 | <code>delete(memoryId: string): ManagedMemoryDeleteRequest</code> | 公开方法；参数与返回类型以签名列为准。 |
| `forbiddenGet` | 方法 | <code>forbiddenGet?(memoryId: string): MemoryGetRequest</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(memoryId: string): MemoryGetRequest</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(memoryId: string): MemoryHistoryRequest</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 属性 | <code>list: MemoryListRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveMemoryId` | 方法 | <code>resolveMemoryId(result: { addedIds: string[]; searchedIds: string[]; listedIds: string[]; }): string &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 属性 | <code>search: ManagedMemorySearchRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `update` | 方法 | <code>update(memoryId: string): ManagedMemoryUpdateRequest</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExternalProviderAcceptanceHooks`

External Provider Acceptance Hooks 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderAcceptanceHooks } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanup` | 方法 | <code>cleanup?(signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `failureProbes` | 属性 | <code>failureProbes?: readonly ExternalProviderFailureProbe[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preparePagination` | 方法 | <code>preparePagination?(signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `settleAdd` | 方法 | <code>settleAdd?(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verifyDelete` | 方法 | <code>verifyDelete?(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verifyRestart` | 方法 | <code>verifyRestart?(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExternalProviderAcceptanceReport`

External Provider Acceptance Report 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderAcceptanceReport } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `addStatus` | 属性 | <code>addStatus: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deleteStatus` | 属性 | <code>deleteStatus: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence?: ExternalProviderAcceptanceEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureProbeCount` | 属性 | <code>failureProbeCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `healthStatus` | 属性 | <code>healthStatus: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `historyCount` | 属性 | <code>historyCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `listCount` | 属性 | <code>listCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `paginationPageCount` | 属性 | <code>paginationPageCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `restartVerified` | 属性 | <code>restartVerified: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeIsolationVerified` | 属性 | <code>scopeIsolationVerified: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `searchCount` | 属性 | <code>searchCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "passed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updateStatus` | 属性 | <code>updateStatus?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExternalProviderFailureProbe`

External Provider Failure Probe 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExternalProviderFailureProbe } from '@codesoul-co/hypha-memory';`
- 源码模块: [`external-provider-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)

### 声明

```text
export interface ExternalProviderFailureProbe {
    id: string;
    expectedCodes: readonly NormalizedMemoryError['code'][];
    run(signal?: AbortSignal): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedCodes` | 属性 | <code>expectedCodes: readonly ("MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; ...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `run` | 方法 | <code>run(signal?: AbortSignal): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
