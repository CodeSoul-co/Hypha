# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-permanent-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `permanentMemoryFailureFixtures` | 常量 | <code>const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[]</code> | 由 `memory-server-permanent-migration-fixtures` 模块导出的 permanent Memory Failure Fixtures 常量。 |
| `createPermanentMemoryMigrationAdapterHarness` | 函数 | <code>createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | 创建 Permanent Memory Migration Adapter Harness。 |
| `createReferencePermanentMemoryMigrationHarness` | 函数 | <code>createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | 创建 Reference Permanent Memory Migration Harness。 |
| `PermanentMemoryFailureFixture` | 接口 | <code>interface PermanentMemoryFailureFixture</code> | Permanent Memory Failure Fixture 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationAcceptanceHarness` | 接口 | <code>interface PermanentMemoryMigrationAcceptanceHarness</code> | Permanent Memory Migration Acceptance Harness 的字段契约；完整字段见下表。 |
| `PermanentMemoryMigrationHarnessFactory` | 类型 | <code>type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) =&gt; PermanentMemoryMigrationAcceptanceHarness</code> | Permanent Memory Migration Harness Factory 的公共类型别名。 |

## `PermanentMemoryFailureFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `expectedCode` | 属性 | <code>expectedCode: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PRO...</code> | expected Code 字段。 |
| `expectedDisposition` | 属性 | <code>expectedDisposition: PermanentMemoryFailureDisposition</code> | expected Disposition 字段。 |
| `expectedEmpty` | 属性 | <code>expectedEmpty: "array" &#124; "null" &#124; "false"</code> | expected Empty 字段。 |
| `expectedFinalState` | 属性 | <code>expectedFinalState: PermanentMemoryFailureFinalState</code> | expected Final State 字段。 |
| `expectedRetryable` | 属性 | <code>expectedRetryable: boolean</code> | expected Retryable 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `operation` | 属性 | <code>operation: PermanentMemoryMigrationOperation</code> | operation 字段。 |
| `providerError` | 属性 | <code>providerError: Record&lt;string, unknown&gt;</code> | provider Error 字段。 |

## `PermanentMemoryMigrationAcceptanceHarness` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: PermanentMemoryFailureEvent[]</code> | events 字段。 |
| `port` | 属性 | <code>port: PermanentMemoryMigrationPort</code> | port 字段。 |
