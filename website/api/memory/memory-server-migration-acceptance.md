# `@codesoul-co/hypha-memory` / `memory-server-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runCanonicalConsumerMigrationAcceptance` | function | <code>runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Public runtime operation for run Canonical Consumer Migration Acceptance. |
| `runMemoryServerMigrationAcceptance` | function | <code>runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationAcceptanceReport&gt;</code> | Public runtime operation for run Memory Server Migration Acceptance. |
| `runPermanentMemoryMigrationAcceptance` | function | <code>runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Public runtime operation for run Permanent Memory Migration Acceptance. |
| `runRedisWorkingMemoryMigrationAcceptance` | function | <code>runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | Public runtime operation for run Redis Working Memory Migration Acceptance. |
| `CanonicalMemoryConsumerObservation` | interface | <code>interface CanonicalMemoryConsumerObservation</code> | Field contract for Canonical Memory Consumer Observation; see all contract members below. |
| `MemoryMigrationObservationPort` | interface | <code>interface MemoryMigrationObservationPort</code> | Field contract for Memory Migration Observation Port; see all contract members below. |
| `MemoryServerMigrationAcceptancePorts` | interface | <code>interface MemoryServerMigrationAcceptancePorts</code> | Field contract for Memory Server Migration Acceptance Ports; see all contract members below. |
| `MemoryServerMigrationAcceptanceReport` | interface | <code>interface MemoryServerMigrationAcceptanceReport</code> | Field contract for Memory Server Migration Acceptance Report; see all contract members below. |
| `MemoryServerMigrationFinding` | interface | <code>interface MemoryServerMigrationFinding</code> | Field contract for Memory Server Migration Finding; see all contract members below. |
| `MemoryServerMigrationSuiteReport` | interface | <code>interface MemoryServerMigrationSuiteReport</code> | Field contract for Memory Server Migration Suite Report; see all contract members below. |
| `PermanentMemoryFailureObservation` | interface | <code>interface PermanentMemoryFailureObservation</code> | Field contract for Permanent Memory Failure Observation; see all contract members below. |
| `RedisWorkingMemoryObservation` | interface | <code>interface RedisWorkingMemoryObservation</code> | Field contract for Redis Working Memory Observation; see all contract members below. |

## `CanonicalMemoryConsumerObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compositionReceipt` | property | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | Public composition Receipt property. |
| `consumerServiceInstanceIds` | property | <code>consumerServiceInstanceIds: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | Public consumer Service Instance Ids property. |
| `directStoreConsumers` | property | <code>directStoreConsumers: readonly MemoryServerConsumer[]</code> | Public direct Store Consumers property. |
| `legacyAdapterResponsibilities` | property | <code>legacyAdapterResponsibilities: readonly string[]</code> | Public legacy Adapter Responsibilities property. |
| `profileSwitches` | property | <code>profileSwitches: readonly CanonicalProfileSwitchObservation[]</code> | Public profile Switches property. |
| `runtimeDependencies` | property | <code>runtimeDependencies: readonly string[]</code> | Public runtime Dependencies property. |
| `secondWritePaths` | property | <code>secondWritePaths: readonly string[]</code> | Public second Write Paths property. |
| `serviceRegistrationCount` | property | <code>serviceRegistrationCount: number</code> | Public service Registration Count property. |
| `unresolvedDependencyRefs` | property | <code>unresolvedDependencyRefs: readonly string[]</code> | Public unresolved Dependency Refs property. |

## `MemoryMigrationObservationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observe` | method | <code>observe(fixture: MemoryServerMigrationSharedFixture): Promise&lt;T&gt;</code> | Public runtime operation for observe. |

## `MemoryServerMigrationAcceptancePorts` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalConsumer` | property | <code>canonicalConsumer: MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | Public canonical Consumer property. |
| `permanentMemory` | property | <code>permanentMemory: MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | Public permanent Memory property. |
| `redisWorkingMemory` | property | <code>redisWorkingMemory: MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | Public redis Working Memory property. |

## `MemoryServerMigrationAcceptanceReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractRef` | property | <code>contractRef: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").MemoryContractSpecRef</code> | Public contract Ref property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
| `suites` | property | <code>suites: readonly MemoryServerMigrationSuiteReport[]</code> | Public suites property. |

## `MemoryServerMigrationFinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `issue` | property | <code>issue: MemoryServerMigrationIssue</code> | Public issue property. |
| `message` | property | <code>message: string</code> | Public message property. |

## `MemoryServerMigrationSuiteReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `findings` | property | <code>findings: MemoryServerMigrationFinding[]</code> | Public findings property. |
| `issue` | property | <code>issue: MemoryServerMigrationIssue</code> | Public issue property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |

## `PermanentMemoryFailureObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `failureDisposition` | property | <code>failureDisposition: "none" &#124; "retry_reconcile_quarantine_or_dlq" &#124; "empty_result"</code> | Public failure Disposition property. |
| `normalizedFailure` | property | <code>normalizedFailure: NormalizedMemoryError</code> | Public normalized Failure property. |
| `notFoundReturnsEmpty` | property | <code>notFoundReturnsEmpty: boolean</code> | Public not Found Returns Empty property. |
| `providerFailureResult` | property | <code>providerFailureResult: "normalized_error" &#124; "success" &#124; "empty_result"</code> | Public provider Failure Result property. |

## `RedisWorkingMemoryObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cleanupStrategy` | property | <code>cleanupStrategy: "scan" &#124; "keys"</code> | Public cleanup Strategy property. |
| `newestReadStrategy` | property | <code>newestReadStrategy: "reverse_range" &#124; "forward_range" &#124; "reliable_metadata"</code> | Public newest Read Strategy property. |
| `trimArgumentSemantics` | property | <code>trimArgumentSemantics: "target_max_length" &#124; "deletion_count"</code> | Public trim Argument Semantics property. |
