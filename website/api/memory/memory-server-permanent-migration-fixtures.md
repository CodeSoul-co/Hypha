# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `permanentMemoryFailureFixtures` | constant | <code>const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[]</code> | permanent Memory Failure Fixtures constant exported by the `memory-server-permanent-migration-fixtures` module. |
| `createPermanentMemoryMigrationAdapterHarness` | function | <code>createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Creates Permanent Memory Migration Adapter Harness at this module boundary. |
| `createReferencePermanentMemoryMigrationHarness` | function | <code>createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Creates Reference Permanent Memory Migration Harness at this module boundary. |
| `PermanentMemoryFailureFixture` | interface | <code>interface PermanentMemoryFailureFixture</code> | Field contract for Permanent Memory Failure Fixture; see all contract members below. |
| `PermanentMemoryMigrationAcceptanceHarness` | interface | <code>interface PermanentMemoryMigrationAcceptanceHarness</code> | Field contract for Permanent Memory Migration Acceptance Harness; see all contract members below. |
| `PermanentMemoryMigrationHarnessFactory` | type | <code>type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) =&gt; PermanentMemoryMigrationAcceptanceHarness</code> | Public type alias for Permanent Memory Migration Harness Factory. |

## `PermanentMemoryFailureFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `expectedCode` | property | <code>expectedCode: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PRO...</code> | Public expected Code property. |
| `expectedDisposition` | property | <code>expectedDisposition: PermanentMemoryFailureDisposition</code> | Public expected Disposition property. |
| `expectedEmpty` | property | <code>expectedEmpty: "array" &#124; "null" &#124; "false"</code> | Public expected Empty property. |
| `expectedFinalState` | property | <code>expectedFinalState: PermanentMemoryFailureFinalState</code> | Public expected Final State property. |
| `expectedRetryable` | property | <code>expectedRetryable: boolean</code> | Public expected Retryable property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `operation` | property | <code>operation: PermanentMemoryMigrationOperation</code> | Public operation property. |
| `providerError` | property | <code>providerError: Record&lt;string, unknown&gt;</code> | Public provider Error property. |

## `PermanentMemoryMigrationAcceptanceHarness` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PermanentMemoryFailureEvent[]</code> | Public events property. |
| `port` | property | <code>port: PermanentMemoryMigrationPort</code> | Public port property. |
