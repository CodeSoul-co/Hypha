# `@codesoul-co/hypha-inference` / `prefix`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/prefix.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultPrefixSegmenter` | class | <code>new DefaultPrefixSegmenter(): DefaultPrefixSegmenter</code> | Runtime implementation for Default Prefix Segmenter; see its public constructor and members below. |
| `estimateTokenCount` | function | <code>estimateTokenCount(content: string): number</code> | Public runtime operation for estimate Token Count. |

## `DefaultPrefixSegmenter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultPrefixSegmenter</code> | Creates an instance of this class. |
| `segment` | method | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | Public runtime operation for segment. |
