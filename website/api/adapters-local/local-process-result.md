# `@codesoul-co/hypha-adapters-local` / `local-process-result`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-result.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildLocalProcessResult` | function | <code>buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult</code> | Builds Local Process Result at this module boundary. |
| `BuildLocalProcessResultInput` | interface | <code>interface BuildLocalProcessResultInput</code> | Field contract for Build Local Process Result Input; see all contract members below. |
| `LocalProcessOutputArtifactRefs` | interface | <code>interface LocalProcessOutputArtifactRefs</code> | Field contract for Local Process Output Artifact Refs; see all contract members below. |

## `BuildLocalProcessResultInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles: FileMutation[]</code> | Public changed Files property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `outputArtifacts` | property | <code>outputArtifacts: LocalProcessOutputArtifactRefs</code> | Public output Artifacts property. |
| `processResult` | property | <code>processResult: LocalProcessRunResult</code> | Public process Result property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public request property. |
| `resourceAccountant` | property | <code>resourceAccountant: LocalProcessResourceAccountant</code> | Public resource Accountant property. |

## `LocalProcessOutputArtifactRefs` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `stderr` | property | <code>stderr: string</code> | Public stderr property. |
| `stdout` | property | <code>stdout: string</code> | Public stdout property. |
