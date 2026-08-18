# `@codesoul-co/hypha-adapters-local` / `local-process-result`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-process-result.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildLocalProcessResult` | 函数 | <code>buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult</code> | 构建 Local Process Result。 |
| `BuildLocalProcessResultInput` | 接口 | <code>interface BuildLocalProcessResultInput</code> | Build Local Process Result Input 的字段契约；完整字段见下表。 |
| `LocalProcessOutputArtifactRefs` | 接口 | <code>interface LocalProcessOutputArtifactRefs</code> | Local Process Output Artifact Refs 的字段契约；完整字段见下表。 |

## `BuildLocalProcessResultInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `changedFiles` | 属性 | <code>changedFiles: FileMutation[]</code> | changed Files 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `outputArtifacts` | 属性 | <code>outputArtifacts: LocalProcessOutputArtifactRefs</code> | output Artifacts 字段。 |
| `processResult` | 属性 | <code>processResult: LocalProcessRunResult</code> | process Result 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest</code> | request 字段。 |
| `resourceAccountant` | 属性 | <code>resourceAccountant: LocalProcessResourceAccountant</code> | resource Accountant 字段。 |

## `LocalProcessOutputArtifactRefs` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `stderr` | 属性 | <code>stderr: string</code> | stderr 字段。 |
| `stdout` | 属性 | <code>stdout: string</code> | stdout 字段。 |
