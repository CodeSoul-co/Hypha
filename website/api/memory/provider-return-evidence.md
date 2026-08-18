# `@codesoul-co/hypha-memory` / `provider-return-evidence`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-return-evidence.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-return-evidence.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryProviderReturnEvidenceSchema` | constant | <code>const memoryProviderReturnEvidenceSchema: ZodType&lt;MemoryProviderReturnEvidence, ZodTypeDef, MemoryProviderReturnEvidence&gt;</code> | Runtime schema for memory Provider Return Evidence. |
| `createMemoryProviderReturnEvidence` | function | <code>createMemoryProviderReturnEvidence(context: MemoryProviderEvidenceContext): MemoryProviderReturnEvidence</code> | Creates Memory Provider Return Evidence at this module boundary. |
| `verifyMemoryProviderReturnEvidence` | function | <code>verifyMemoryProviderReturnEvidence(evidence: unknown, context: Omit&lt;MemoryProviderEvidenceContext, "status" &#124; "error"&gt;): MemoryProviderReturnEvidence</code> | Public runtime operation for verify Memory Provider Return Evidence. |
| `MemoryProviderEvidenceContext` | interface | <code>interface MemoryProviderEvidenceContext</code> | Field contract for Memory Provider Evidence Context; see all contract members below. |
| `MemoryProviderRecordBinding` | interface | <code>interface MemoryProviderRecordBinding</code> | Field contract for Memory Provider Record Binding; see all contract members below. |
| `MemoryProviderReturnEvidence` | interface | <code>interface MemoryProviderReturnEvidence</code> | Field contract for Memory Provider Return Evidence; see all contract members below. |

## `MemoryProviderEvidenceContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public operation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | Public status property. |

## `MemoryProviderRecordBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |

## `MemoryProviderReturnEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inputHash` | property | <code>inputHash: string</code> | Public input Hash property. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public operation property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `principalHash` | property | <code>principalHash: string</code> | Public principal Hash property. |
| `proofHash` | property | <code>proofHash: string</code> | Public proof Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `recordBindings` | property | <code>recordBindings: MemoryProviderRecordBinding[]</code> | Public record Bindings property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `terminal` | property | <code>terminal: { status: "completed" &#124; "partial" &#124; "failed" &#124; "cancelled"; error?: NormalizedMemoryError; }</code> | Public terminal property. |
