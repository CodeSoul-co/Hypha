# `@codesoul-co/hypha-inference` API

Provider-neutral inference requests, routing, control and streaming.

- Package guide: [`@codesoul-co/hypha-inference`](/packages/inference)
- Install: `npm install @codesoul-co/hypha-inference@1.0.1`
- Public exports: **151**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 24 |
| constant | 8 |
| function | 15 |
| interface | 81 |
| type | 23 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`agent-prompts`](/api/inference/agent-prompts) | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts) |
| [`backends`](/api/inference/backends) | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts) |
| [`cache`](/api/inference/cache) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts) |
| [`drivers`](/api/inference/drivers) | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts) |
| [`manager`](/api/inference/manager) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts) |
| [`pipeline`](/api/inference/pipeline) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts) |
| [`plasmod`](/api/inference/plasmod) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts) |
| [`prefix`](/api/inference/prefix) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts) |
| [`prompt`](/api/inference/prompt) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts) |
| [`prompt-profile`](/api/inference/prompt-profile) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts) |
| [`reasoning`](/api/inference/reasoning) | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts) |
| [`reasoning-registry`](/api/inference/reasoning-registry) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts) |
| [`reasoning-sources`](/api/inference/reasoning-sources) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts) |
| [`recovery`](/api/inference/recovery) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts) |
| [`types`](/api/inference/types) | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
