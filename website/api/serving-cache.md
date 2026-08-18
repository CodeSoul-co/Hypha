# `@codesoul-co/hypha-serving-cache` API

Serving cache keys, stores, policies and cache coordination.

- Install: `npm install @codesoul-co/hypha-serving-cache@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-serving-cache';`
- Public exports: **64**
- Source modules: **10**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 8 |
| interface | 23 |
| function | 15 |
| constant | 7 |
| type | 11 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`cache-manager`](/api/serving-cache/cache-manager) | Use the Cache manager module for reading, writing, or coordinating cache state. It exports 2 classes, 1 interface. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts) |
| [`key`](/api/serving-cache/key) | Use the Key module for using the public contracts and operations for this capability boundary. It exports 6 functions. | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts) |
| [`middleware/llm-cache-middleware`](/api/serving-cache/middleware/llm-cache-middleware) | Use the Llm cache middleware module for reading, writing, or coordinating cache state. It exports 1 class, 2 functions. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts) |
| [`policies`](/api/serving-cache/policies) | Use the Policies module for using the public contracts and operations for this capability boundary. It exports 1 constant, 3 functions. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts) |
| [`prefix-shape`](/api/serving-cache/prefix-shape) | Use the Prefix shape module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts) |
| [`schemas`](/api/serving-cache/schemas) | Use the Schemas module for declaring and runtime-validating contracts. It exports 6 constants, 4 functions. | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts) |
| [`stores/memory-store`](/api/serving-cache/stores/memory-store) | Use the Memory store module for persisting and reading data at this boundary. It exports 2 classes. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts) |
| [`stores/redis-store`](/api/serving-cache/stores/redis-store) | Use the Redis store module for persisting and reading data at this boundary. It exports 1 class, 2 interfaces. | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts) |
| [`stores/sqlite-store`](/api/serving-cache/stores/sqlite-store) | Use the Sqlite store module for persisting and reading data at this boundary. It exports 1 class, 1 interface. | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts) |
| [`types`](/api/serving-cache/types) | Use the Types module for declaring and runtime-validating contracts. It exports 18 interfaces, 11 types. | 29 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-serving-cache` package entrypoint. Implementations under `packages/serving-cache/src` that are not exported from that entrypoint are not part of the npm package contract.
