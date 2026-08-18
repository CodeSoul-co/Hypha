# `@codesoul-co/hypha-memory` / `external-provider-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/external-provider-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assertContractShape` | 函数 | <code>assertContractShape(client: ExternalMemoryClient): void</code> | 断言 Contract Shape。 |
| `runExternalProviderAcceptance` | 函数 | <code>runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise&lt;ExternalProviderAcceptanceReport&gt;</code> | Provider-neutral management acceptance flow shared by every external client. |
| `ExternalProviderAcceptanceEvidence` | 接口 | <code>interface ExternalProviderAcceptanceEvidence</code> | External Provider Acceptance Evidence 的字段契约；完整字段见下表。 |
| `ExternalProviderAcceptanceEvidenceInput` | 接口 | <code>interface ExternalProviderAcceptanceEvidenceInput</code> | External Provider Acceptance Evidence Input 的字段契约；完整字段见下表。 |
| `ExternalProviderAcceptanceFixture` | 接口 | <code>interface ExternalProviderAcceptanceFixture</code> | External Provider Acceptance Fixture 的字段契约；完整字段见下表。 |
| `ExternalProviderAcceptanceHooks` | 接口 | <code>interface ExternalProviderAcceptanceHooks</code> | External Provider Acceptance Hooks 的字段契约；完整字段见下表。 |
| `ExternalProviderAcceptanceReport` | 接口 | <code>interface ExternalProviderAcceptanceReport</code> | External Provider Acceptance Report 的字段契约；完整字段见下表。 |
| `ExternalProviderFailureProbe` | 接口 | <code>interface ExternalProviderFailureProbe</code> | External Provider Failure Probe 的字段契约；完整字段见下表。 |

## `ExternalProviderAcceptanceEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | capability Snapshot 字段。 |
| `commitSha` | 属性 | <code>commitSha: string</code> | commit Sha 字段。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | environment Hash 字段。 |
| `finishedAt` | 属性 | <code>finishedAt: string</code> | finished At 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |

## `ExternalProviderAcceptanceEvidenceInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commitSha` | 属性 | <code>commitSha: string</code> | commit Sha 字段。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | environment Hash 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |

## `ExternalProviderAcceptanceFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 属性 | <code>add: MemoryAddRequest</code> | add 字段。 |
| `delete` | 方法 | <code>delete(memoryId: string): ManagedMemoryDeleteRequest</code> | 删除 delete。 |
| `forbiddenGet` | 方法 | <code>forbiddenGet(memoryId: string): MemoryGetRequest</code> | forbidden Get 的公开运行时操作。 |
| `get` | 方法 | <code>get(memoryId: string): MemoryGetRequest</code> | 读取 get。 |
| `history` | 方法 | <code>history(memoryId: string): MemoryHistoryRequest</code> | history 的公开运行时操作。 |
| `list` | 属性 | <code>list: MemoryListRequest</code> | list 字段。 |
| `resolveMemoryId` | 方法 | <code>resolveMemoryId(result: { addedIds: string[]; searchedIds: string[]; listedIds: string[]; }): string &#124; undefined</code> | 解析 Memory Id。 |
| `search` | 属性 | <code>search: ManagedMemorySearchRequest</code> | search 字段。 |
| `update` | 方法 | <code>update(memoryId: string): ManagedMemoryUpdateRequest</code> | update 的公开运行时操作。 |

## `ExternalProviderAcceptanceHooks` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanup` | 方法 | <code>cleanup(signal?: AbortSignal): Promise&lt;void&gt;</code> | cleanup 的公开运行时操作。 |
| `failureProbes` | 属性 | <code>failureProbes: readonly ExternalProviderFailureProbe[]</code> | failure Probes 字段。 |
| `preparePagination` | 方法 | <code>preparePagination(signal?: AbortSignal): Promise&lt;void&gt;</code> | prepare Pagination 的公开运行时操作。 |
| `settleAdd` | 方法 | <code>settleAdd(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise&lt;void&gt;</code> | 写入 tle Add。 |
| `verifyDelete` | 方法 | <code>verifyDelete(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | verify Delete 的公开运行时操作。 |
| `verifyRestart` | 方法 | <code>verifyRestart(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | verify Restart 的公开运行时操作。 |

## `ExternalProviderAcceptanceReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `addStatus` | 属性 | <code>addStatus: string</code> | add Status 字段。 |
| `capabilities` | 属性 | <code>capabilities: MemoryManagementCapabilities</code> | capabilities 字段。 |
| `deleteStatus` | 属性 | <code>deleteStatus: string</code> | delete Status 字段。 |
| `evidence` | 属性 | <code>evidence: ExternalProviderAcceptanceEvidence</code> | evidence 字段。 |
| `failureProbeCount` | 属性 | <code>failureProbeCount: number</code> | failure Probe Count 字段。 |
| `healthStatus` | 属性 | <code>healthStatus: string</code> | health Status 字段。 |
| `historyCount` | 属性 | <code>historyCount: number</code> | history Count 字段。 |
| `listCount` | 属性 | <code>listCount: number</code> | list Count 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `paginationPageCount` | 属性 | <code>paginationPageCount: number</code> | pagination Page Count 字段。 |
| `restartVerified` | 属性 | <code>restartVerified: boolean</code> | restart Verified 字段。 |
| `scopeIsolationVerified` | 属性 | <code>scopeIsolationVerified: boolean</code> | scope Isolation Verified 字段。 |
| `searchCount` | 属性 | <code>searchCount: number</code> | search Count 字段。 |
| `status` | 属性 | <code>status: "passed"</code> | status 字段。 |
| `updateStatus` | 属性 | <code>updateStatus: string</code> | update Status 字段。 |

## `ExternalProviderFailureProbe` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedCodes` | 属性 | <code>expectedCodes: readonly ("MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; ...</code> | expected Codes 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `run` | 方法 | <code>run(signal?: AbortSignal): Promise&lt;void&gt;</code> | run 的公开运行时操作。 |
