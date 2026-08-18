# `@codesoul-co/hypha-serving-cache` API

Serving cache keys, stores, policies and cache coordination.

- Package guide: [`@codesoul-co/hypha-serving-cache`](/packages/serving-cache)
- Install: `npm install @codesoul-co/hypha-serving-cache@1.0.1`
- Public exports: **64**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 8 |
| interface | 23 |
| function | 15 |
| constant | 7 |
| type | 11 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`cache-manager`](/api/serving-cache/cache-manager) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts) |
| [`key`](/api/serving-cache/key) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts) |
| [`middleware/llm-cache-middleware`](/api/serving-cache/middleware/llm-cache-middleware) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts) |
| [`policies`](/api/serving-cache/policies) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts) |
| [`prefix-shape`](/api/serving-cache/prefix-shape) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts) |
| [`schemas`](/api/serving-cache/schemas) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts) |
| [`stores/memory-store`](/api/serving-cache/stores/memory-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts) |
| [`stores/redis-store`](/api/serving-cache/stores/redis-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts) |
| [`stores/sqlite-store`](/api/serving-cache/stores/sqlite-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts) |
| [`types`](/api/serving-cache/types) | 29 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
