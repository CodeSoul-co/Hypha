# `@codesoul-co/hypha-memory` / `provider-pagination`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-pagination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beginProviderPage` | function | <code>beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest &#124; undefined, nowMs?: number): ProviderPageContext</code> | Public runtime operation for begin Provider Page. |
| `encodeProviderCursor` | function | <code>encodeProviderCursor(envelope: ProviderCursorEnvelope): string</code> | Public runtime operation for encode Provider Cursor. |
| `finishProviderPage` | function | <code>finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }</code> | Public runtime operation for finish Provider Page. |
| `ProviderPageContext` | interface | <code>interface ProviderPageContext</code> | Field contract for Provider Page Context; see all contract members below. |
| `ProviderPaginationBudget` | interface | <code>interface ProviderPaginationBudget</code> | Field contract for Provider Pagination Budget; see all contract members below. |

## `ProviderPageContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budget` | property | <code>budget: ProviderPaginationBudget</code> | Public budget property. |
| `envelope` | property | <code>envelope: ProviderCursorEnvelope</code> | Public envelope property. |
| `nowMs` | property | <code>nowMs: number</code> | Public now Ms property. |
| `providerCursor` | property | <code>providerCursor: string</code> | Public provider Cursor property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |

## `ProviderPaginationBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `maxCalls` | property | <code>maxCalls: number</code> | Public max Calls property. |
| `maxDurationMs` | property | <code>maxDurationMs: number</code> | Public max Duration Ms property. |
| `maxItems` | property | <code>maxItems: number</code> | Public max Items property. |
| `maxPages` | property | <code>maxPages: number</code> | Public max Pages property. |
