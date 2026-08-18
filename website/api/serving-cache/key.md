# `@codesoul-co/hypha-serving-cache` / `key`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/key.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildPromptPrefixMetadata` | function | <code>buildPromptPrefixMetadata(input: LLMCacheKeyInput): PromptPrefixMetadata</code> | Builds Prompt Prefix Metadata at this module boundary. |
| `canonicalize` | function | <code>canonicalize(value: unknown): unknown</code> | Checks whether it can onicalize at this module boundary. |
| `createLLMCacheKey` | function | <code>createLLMCacheKey(input: LLMCacheKeyInput): string</code> | Creates LLM Cache Key at this module boundary. |
| `hashStableJson` | function | <code>hashStableJson(value: unknown): string</code> | Checks whether h Stable Json at this module boundary. |
| `normalizeLLMCacheKeyInput` | function | <code>normalizeLLMCacheKeyInput(input: LLMCacheKeyInput): LLMCacheKeyInput</code> | Normalizes LLM Cache Key Input at this module boundary. |
| `stableJson` | function | <code>stableJson(value: unknown): string</code> | Public runtime operation for stable Json. |
