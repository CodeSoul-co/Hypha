# `@codesoul-co/hypha-memory` / `external-provider-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/external-provider-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-acceptance.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertContractShape` | function | <code>assertContractShape(client: ExternalMemoryClient): void</code> | Asserts Contract Shape at this module boundary. |
| `runExternalProviderAcceptance` | function | <code>runExternalProviderAcceptance(client: ExternalMemoryClient, fixture: ExternalProviderAcceptanceFixture, signal?: AbortSignal, evidenceInput?: ExternalProviderAcceptanceEvidenceInput, hooks?: ExternalProviderAcceptanceHooks): Promise&lt;ExternalProviderAcceptanceReport&gt;</code> | Provider-neutral management acceptance flow shared by every external client. |
| `ExternalProviderAcceptanceEvidence` | interface | <code>interface ExternalProviderAcceptanceEvidence</code> | Field contract for External Provider Acceptance Evidence; see all contract members below. |
| `ExternalProviderAcceptanceEvidenceInput` | interface | <code>interface ExternalProviderAcceptanceEvidenceInput</code> | Field contract for External Provider Acceptance Evidence Input; see all contract members below. |
| `ExternalProviderAcceptanceFixture` | interface | <code>interface ExternalProviderAcceptanceFixture</code> | Field contract for External Provider Acceptance Fixture; see all contract members below. |
| `ExternalProviderAcceptanceHooks` | interface | <code>interface ExternalProviderAcceptanceHooks</code> | Field contract for External Provider Acceptance Hooks; see all contract members below. |
| `ExternalProviderAcceptanceReport` | interface | <code>interface ExternalProviderAcceptanceReport</code> | Field contract for External Provider Acceptance Report; see all contract members below. |
| `ExternalProviderFailureProbe` | interface | <code>interface ExternalProviderFailureProbe</code> | Field contract for External Provider Failure Probe; see all contract members below. |

## `ExternalProviderAcceptanceEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public capability Snapshot property. |
| `commitSha` | property | <code>commitSha: string</code> | Public commit Sha property. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public environment Hash property. |
| `finishedAt` | property | <code>finishedAt: string</code> | Public finished At property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |

## `ExternalProviderAcceptanceEvidenceInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commitSha` | property | <code>commitSha: string</code> | Public commit Sha property. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public environment Hash property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |

## `ExternalProviderAcceptanceFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | property | <code>add: MemoryAddRequest</code> | Public add property. |
| `delete` | method | <code>delete(memoryId: string): ManagedMemoryDeleteRequest</code> | Deletes delete at this module boundary. |
| `forbiddenGet` | method | <code>forbiddenGet(memoryId: string): MemoryGetRequest</code> | Public runtime operation for forbidden Get. |
| `get` | method | <code>get(memoryId: string): MemoryGetRequest</code> | Gets get at this module boundary. |
| `history` | method | <code>history(memoryId: string): MemoryHistoryRequest</code> | Public runtime operation for history. |
| `list` | property | <code>list: MemoryListRequest</code> | Public list property. |
| `resolveMemoryId` | method | <code>resolveMemoryId(result: { addedIds: string[]; searchedIds: string[]; listedIds: string[]; }): string &#124; undefined</code> | Resolves Memory Id at this module boundary. |
| `search` | property | <code>search: ManagedMemorySearchRequest</code> | Public search property. |
| `update` | method | <code>update(memoryId: string): ManagedMemoryUpdateRequest</code> | Public runtime operation for update. |

## `ExternalProviderAcceptanceHooks` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanup` | method | <code>cleanup(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for cleanup. |
| `failureProbes` | property | <code>failureProbes: readonly ExternalProviderFailureProbe[]</code> | Public failure Probes property. |
| `preparePagination` | method | <code>preparePagination(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for prepare Pagination. |
| `settleAdd` | method | <code>settleAdd(result: ManagedMemoryWriteResult, signal?: AbortSignal): Promise&lt;void&gt;</code> | Sets tle Add at this module boundary. |
| `verifyDelete` | method | <code>verifyDelete(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for verify Delete. |
| `verifyRestart` | method | <code>verifyRestart(memoryId: string, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for verify Restart. |

## `ExternalProviderAcceptanceReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `addStatus` | property | <code>addStatus: string</code> | Public add Status property. |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public capabilities property. |
| `deleteStatus` | property | <code>deleteStatus: string</code> | Public delete Status property. |
| `evidence` | property | <code>evidence: ExternalProviderAcceptanceEvidence</code> | Public evidence property. |
| `failureProbeCount` | property | <code>failureProbeCount: number</code> | Public failure Probe Count property. |
| `healthStatus` | property | <code>healthStatus: string</code> | Public health Status property. |
| `historyCount` | property | <code>historyCount: number</code> | Public history Count property. |
| `listCount` | property | <code>listCount: number</code> | Public list Count property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `paginationPageCount` | property | <code>paginationPageCount: number</code> | Public pagination Page Count property. |
| `restartVerified` | property | <code>restartVerified: boolean</code> | Public restart Verified property. |
| `scopeIsolationVerified` | property | <code>scopeIsolationVerified: boolean</code> | Public scope Isolation Verified property. |
| `searchCount` | property | <code>searchCount: number</code> | Public search Count property. |
| `status` | property | <code>status: "passed"</code> | Public status property. |
| `updateStatus` | property | <code>updateStatus: string</code> | Public update Status property. |

## `ExternalProviderFailureProbe` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedCodes` | property | <code>expectedCodes: readonly ("MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; ...</code> | Public expected Codes property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `run` | method | <code>run(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for run. |
