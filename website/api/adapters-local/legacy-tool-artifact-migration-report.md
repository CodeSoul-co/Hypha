# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-report`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-report.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `isLegacyToolArtifactMigrationExecutionReportId` | function | <code>isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string</code> | Checks Legacy Tool Artifact Migration Execution Report Id at this module boundary. |
| `isLegacyToolArtifactMigrationPlanHash` | function | <code>isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string</code> | Checks Legacy Tool Artifact Migration Plan Hash at this module boundary. |
| `isLegacyToolArtifactMigrationRollbackReportId` | function | <code>isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string</code> | Checks Legacy Tool Artifact Migration Rollback Report Id at this module boundary. |
| `legacyToolArtifactMigrationExecutionReportId` | function | <code>legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string</code> | Public runtime operation for legacy Tool Artifact Migration Execution Report Id. |
| `legacyToolArtifactMigrationPlanHash` | function | <code>legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string</code> | Public runtime operation for legacy Tool Artifact Migration Plan Hash. |
| `legacyToolArtifactMigrationRollbackReportId` | function | <code>legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string</code> | Public runtime operation for legacy Tool Artifact Migration Rollback Report Id. |
| `LegacyToolArtifactMigrationExecutionEvidence` | interface | <code>interface LegacyToolArtifactMigrationExecutionEvidence</code> | Field contract for Legacy Tool Artifact Migration Execution Evidence; see all contract members below. |
| `LegacyToolArtifactMigrationPlanEvidence` | interface | <code>interface LegacyToolArtifactMigrationPlanEvidence</code> | Field contract for Legacy Tool Artifact Migration Plan Evidence; see all contract members below. |
| `LegacyToolArtifactMigrationRollbackEvidence` | interface | <code>interface LegacyToolArtifactMigrationRollbackEvidence</code> | Field contract for Legacy Tool Artifact Migration Rollback Evidence; see all contract members below. |

## `LegacyToolArtifactMigrationExecutionEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: unknown[]</code> | Public items property. |
| `mode` | property | <code>mode: "execute" &#124; "dry_run"</code> | Public mode property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `reportId` | property | <code>reportId: string</code> | Public report Id property. |
| `skipped` | property | <code>skipped: unknown[]</code> | Public skipped property. |
| `summary` | property | <code>summary: unknown</code> | Public summary property. |

## `LegacyToolArtifactMigrationPlanEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `imports` | property | <code>imports: unknown[]</code> | Public imports property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `skipped` | property | <code>skipped: unknown[]</code> | Public skipped property. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public total Bytes property. |
| `totalEntries` | property | <code>totalEntries: number</code> | Public total Entries property. |

## `LegacyToolArtifactMigrationRollbackEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionReportId` | property | <code>executionReportId: string</code> | Public execution Report Id property. |
| `items` | property | <code>items: unknown[]</code> | Public items property. |
| `mode` | property | <code>mode: "rollback" &#124; "dry_run"</code> | Public mode property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `reportId` | property | <code>reportId: string</code> | Public report Id property. |
| `summary` | property | <code>summary: unknown</code> | Public summary property. |
