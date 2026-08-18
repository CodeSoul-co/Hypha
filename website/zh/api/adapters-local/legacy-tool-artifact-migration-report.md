# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-report`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/legacy-tool-artifact-migration-report.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `isLegacyToolArtifactMigrationExecutionReportId` | 函数 | <code>isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string</code> | 判断 Legacy Tool Artifact Migration Execution Report Id。 |
| `isLegacyToolArtifactMigrationPlanHash` | 函数 | <code>isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string</code> | 判断 Legacy Tool Artifact Migration Plan Hash。 |
| `isLegacyToolArtifactMigrationRollbackReportId` | 函数 | <code>isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string</code> | 判断 Legacy Tool Artifact Migration Rollback Report Id。 |
| `legacyToolArtifactMigrationExecutionReportId` | 函数 | <code>legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string</code> | legacy Tool Artifact Migration Execution Report Id 的公开运行时操作。 |
| `legacyToolArtifactMigrationPlanHash` | 函数 | <code>legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string</code> | legacy Tool Artifact Migration Plan Hash 的公开运行时操作。 |
| `legacyToolArtifactMigrationRollbackReportId` | 函数 | <code>legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string</code> | legacy Tool Artifact Migration Rollback Report Id 的公开运行时操作。 |
| `LegacyToolArtifactMigrationExecutionEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationExecutionEvidence</code> | Legacy Tool Artifact Migration Execution Evidence 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationPlanEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationPlanEvidence</code> | Legacy Tool Artifact Migration Plan Evidence 的字段契约；完整字段见下表。 |
| `LegacyToolArtifactMigrationRollbackEvidence` | 接口 | <code>interface LegacyToolArtifactMigrationRollbackEvidence</code> | Legacy Tool Artifact Migration Rollback Evidence 的字段契约；完整字段见下表。 |

## `LegacyToolArtifactMigrationExecutionEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `items` | 属性 | <code>items: unknown[]</code> | items 字段。 |
| `mode` | 属性 | <code>mode: "execute" &#124; "dry_run"</code> | mode 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `reportId` | 属性 | <code>reportId: string</code> | report Id 字段。 |
| `skipped` | 属性 | <code>skipped: unknown[]</code> | skipped 字段。 |
| `summary` | 属性 | <code>summary: unknown</code> | summary 字段。 |

## `LegacyToolArtifactMigrationPlanEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `imports` | 属性 | <code>imports: unknown[]</code> | imports 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `skipped` | 属性 | <code>skipped: unknown[]</code> | skipped 字段。 |
| `totalBytes` | 属性 | <code>totalBytes: number</code> | total Bytes 字段。 |
| `totalEntries` | 属性 | <code>totalEntries: number</code> | total Entries 字段。 |

## `LegacyToolArtifactMigrationRollbackEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionReportId` | 属性 | <code>executionReportId: string</code> | execution Report Id 字段。 |
| `items` | 属性 | <code>items: unknown[]</code> | items 字段。 |
| `mode` | 属性 | <code>mode: "rollback" &#124; "dry_run"</code> | mode 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `reportId` | 属性 | <code>reportId: string</code> | report Id 字段。 |
| `summary` | 属性 | <code>summary: unknown</code> | summary 字段。 |
