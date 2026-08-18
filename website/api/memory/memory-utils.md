# `@codesoul-co/hypha-memory` / `memory-utils`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-utils.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hashMemoryContent` | function | <code>hashMemoryContent(content: unknown): string</code> | Checks whether h Memory Content at this module boundary. |
| `hashMemoryScope` | function | <code>hashMemoryScope(scope: ManagedMemoryScope): string</code> | Checks whether h Memory Scope at this module boundary. |
| `isNormalizedMemoryError` | function | <code>isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError</code> | Checks Normalized Memory Error at this module boundary. |
| `memoryError` | function | <code>memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record&lt;string, unknown&gt;): NormalizedMemoryError</code> | Public runtime operation for memory Error. |
| `normalizeMemoryError` | function | <code>normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError</code> | Normalizes Memory Error at this module boundary. |
| `sha256` | function | <code>sha256(value: unknown): string</code> | Public runtime operation for sha256. |
| `stableStringify` | function | <code>stableStringify(value: unknown): string</code> | Public runtime operation for stable Stringify. |
