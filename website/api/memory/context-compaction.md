# `@codesoul-co/hypha-memory` / `context-compaction`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-compaction.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-compaction.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicExtractiveContextCompactor` | class | <code>new DeterministicExtractiveContextCompactor(): DeterministicExtractiveContextCompactor</code> | Runtime implementation for Deterministic Extractive Context Compactor; see its public constructor and members below. |
| `ContextCompactionRequest` | interface | <code>interface ContextCompactionRequest</code> | Field contract for Context Compaction Request; see all contract members below. |
| `ContextCompactor` | interface | <code>interface ContextCompactor</code> | Field contract for Context Compactor; see all contract members below. |

## `DeterministicExtractiveContextCompactor` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compact` | method | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | Public runtime operation for compact. |
| `constructor` | constructor | <code>(): DeterministicExtractiveContextCompactor</code> | Creates an instance of this class. |
| `id` | property | <code>id: "context.compactor.extractive-v1"</code> | Public id property. |

## `ContextCompactionRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: ContextItem[]</code> | Public items property. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `tokenizer` | property | <code>tokenizer: TokenEstimator</code> | Public tokenizer property. |

## `ContextCompactor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compact` | method | <code>compact(request: ContextCompactionRequest): Promise&lt;ContextItem &#124; null&gt;</code> | Public runtime operation for compact. |
| `id` | property | <code>id: string</code> | Public id property. |
