# `@codesoul-co/hypha-memory` / `provider-pagination`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-pagination.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-pagination.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beginProviderPage` | 函数 | <code>beginProviderPage(providerId: string, scope: ManagedMemoryScope, pagination: PaginationRequest &#124; undefined, nowMs?: number): ProviderPageContext</code> | begin Provider Page 的公开运行时操作。 |
| `encodeProviderCursor` | 函数 | <code>encodeProviderCursor(envelope: ProviderCursorEnvelope): string</code> | encode Provider Cursor 的公开运行时操作。 |
| `finishProviderPage` | 函数 | <code>finishProviderPage(context: ProviderPageContext, providerId: string, scope: ManagedMemoryScope, records: unknown[], nextProviderCursor?: string, nowMs?: number): { nextCursor?: string; hasMore: boolean; }</code> | finish Provider Page 的公开运行时操作。 |
| `ProviderPageContext` | 接口 | <code>interface ProviderPageContext</code> | Provider Page Context 的字段契约；完整字段见下表。 |
| `ProviderPaginationBudget` | 接口 | <code>interface ProviderPaginationBudget</code> | Provider Pagination Budget 的字段契约；完整字段见下表。 |

## `ProviderPageContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `budget` | 属性 | <code>budget: ProviderPaginationBudget</code> | budget 字段。 |
| `envelope` | 属性 | <code>envelope: ProviderCursorEnvelope</code> | envelope 字段。 |
| `nowMs` | 属性 | <code>nowMs: number</code> | now Ms 字段。 |
| `providerCursor` | 属性 | <code>providerCursor: string</code> | provider Cursor 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |

## `ProviderPaginationBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `maxCalls` | 属性 | <code>maxCalls: number</code> | max Calls 字段。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs: number</code> | max Duration Ms 字段。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | max Items 字段。 |
| `maxPages` | 属性 | <code>maxPages: number</code> | max Pages 字段。 |
