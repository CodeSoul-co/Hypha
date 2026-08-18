# `@codesoul-co/hypha-memory` / `memory-server-migration-acceptance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-acceptance.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runCanonicalConsumerMigrationAcceptance` | 函数 | <code>runCanonicalConsumerMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["canonicalConsumer"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | run Canonical Consumer Migration Acceptance 的公开运行时操作。 |
| `runMemoryServerMigrationAcceptance` | 函数 | <code>runMemoryServerMigrationAcceptance(ports: MemoryServerMigrationAcceptancePorts, acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationAcceptanceReport&gt;</code> | run Memory Server Migration Acceptance 的公开运行时操作。 |
| `runPermanentMemoryMigrationAcceptance` | 函数 | <code>runPermanentMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["permanentMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | run Permanent Memory Migration Acceptance 的公开运行时操作。 |
| `runRedisWorkingMemoryMigrationAcceptance` | 函数 | <code>runRedisWorkingMemoryMigrationAcceptance(port: MemoryServerMigrationAcceptancePorts["redisWorkingMemory"], acceptance?: MemoryServerMigrationAcceptance): Promise&lt;MemoryServerMigrationSuiteReport&gt;</code> | run Redis Working Memory Migration Acceptance 的公开运行时操作。 |
| `CanonicalMemoryConsumerObservation` | 接口 | <code>interface CanonicalMemoryConsumerObservation</code> | Canonical Memory Consumer Observation 的字段契约；完整字段见下表。 |
| `MemoryMigrationObservationPort` | 接口 | <code>interface MemoryMigrationObservationPort</code> | Memory Migration Observation Port 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationAcceptancePorts` | 接口 | <code>interface MemoryServerMigrationAcceptancePorts</code> | Memory Server Migration Acceptance Ports 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationAcceptanceReport` | 接口 | <code>interface MemoryServerMigrationAcceptanceReport</code> | Memory Server Migration Acceptance Report 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationFinding` | 接口 | <code>interface MemoryServerMigrationFinding</code> | Memory Server Migration Finding 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationSuiteReport` | 接口 | <code>interface MemoryServerMigrationSuiteReport</code> | Memory Server Migration Suite Report 的字段契约；完整字段见下表。 |
| `PermanentMemoryFailureObservation` | 接口 | <code>interface PermanentMemoryFailureObservation</code> | Permanent Memory Failure Observation 的字段契约；完整字段见下表。 |
| `RedisWorkingMemoryObservation` | 接口 | <code>interface RedisWorkingMemoryObservation</code> | Redis Working Memory Observation 的字段契约；完整字段见下表。 |

## `CanonicalMemoryConsumerObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compositionReceipt` | 属性 | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | composition Receipt 字段。 |
| `consumerServiceInstanceIds` | 属性 | <code>consumerServiceInstanceIds: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | consumer Service Instance Ids 字段。 |
| `directStoreConsumers` | 属性 | <code>directStoreConsumers: readonly MemoryServerConsumer[]</code> | direct Store Consumers 字段。 |
| `legacyAdapterResponsibilities` | 属性 | <code>legacyAdapterResponsibilities: readonly string[]</code> | legacy Adapter Responsibilities 字段。 |
| `profileSwitches` | 属性 | <code>profileSwitches: readonly CanonicalProfileSwitchObservation[]</code> | profile Switches 字段。 |
| `runtimeDependencies` | 属性 | <code>runtimeDependencies: readonly string[]</code> | runtime Dependencies 字段。 |
| `secondWritePaths` | 属性 | <code>secondWritePaths: readonly string[]</code> | second Write Paths 字段。 |
| `serviceRegistrationCount` | 属性 | <code>serviceRegistrationCount: number</code> | service Registration Count 字段。 |
| `unresolvedDependencyRefs` | 属性 | <code>unresolvedDependencyRefs: readonly string[]</code> | unresolved Dependency Refs 字段。 |

## `MemoryMigrationObservationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `observe` | 方法 | <code>observe(fixture: MemoryServerMigrationSharedFixture): Promise&lt;T&gt;</code> | observe 的公开运行时操作。 |

## `MemoryServerMigrationAcceptancePorts` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalConsumer` | 属性 | <code>canonicalConsumer: MemoryMigrationObservationPort&lt;CanonicalMemoryConsumerObservation&gt;</code> | canonical Consumer 字段。 |
| `permanentMemory` | 属性 | <code>permanentMemory: MemoryMigrationObservationPort&lt;PermanentMemoryFailureObservation&gt;</code> | permanent Memory 字段。 |
| `redisWorkingMemory` | 属性 | <code>redisWorkingMemory: MemoryMigrationObservationPort&lt;RedisWorkingMemoryObservation&gt;</code> | redis Working Memory 字段。 |

## `MemoryServerMigrationAcceptanceReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractRef` | 属性 | <code>contractRef: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").MemoryContractSpecRef</code> | contract Ref 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |
| `suites` | 属性 | <code>suites: readonly MemoryServerMigrationSuiteReport[]</code> | suites 字段。 |

## `MemoryServerMigrationFinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `issue` | 属性 | <code>issue: MemoryServerMigrationIssue</code> | issue 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |

## `MemoryServerMigrationSuiteReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `findings` | 属性 | <code>findings: MemoryServerMigrationFinding[]</code> | findings 字段。 |
| `issue` | 属性 | <code>issue: MemoryServerMigrationIssue</code> | issue 字段。 |
| `passed` | 属性 | <code>passed: boolean</code> | passed 字段。 |

## `PermanentMemoryFailureObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `failureDisposition` | 属性 | <code>failureDisposition: "none" &#124; "retry_reconcile_quarantine_or_dlq" &#124; "empty_result"</code> | failure Disposition 字段。 |
| `normalizedFailure` | 属性 | <code>normalizedFailure: NormalizedMemoryError</code> | normalized Failure 字段。 |
| `notFoundReturnsEmpty` | 属性 | <code>notFoundReturnsEmpty: boolean</code> | not Found Returns Empty 字段。 |
| `providerFailureResult` | 属性 | <code>providerFailureResult: "normalized_error" &#124; "success" &#124; "empty_result"</code> | provider Failure Result 字段。 |

## `RedisWorkingMemoryObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cleanupStrategy` | 属性 | <code>cleanupStrategy: "scan" &#124; "keys"</code> | cleanup Strategy 字段。 |
| `newestReadStrategy` | 属性 | <code>newestReadStrategy: "reverse_range" &#124; "forward_range" &#124; "reliable_metadata"</code> | newest Read Strategy 字段。 |
| `trimArgumentSemantics` | 属性 | <code>trimArgumentSemantics: "target_max_length" &#124; "deletion_count"</code> | trim Argument Semantics 字段。 |
