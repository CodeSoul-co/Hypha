# `@codesoul-co/hypha-models` API

Model provider registry, routing and deterministic mock providers.

- Install: `npm install @codesoul-co/hypha-models@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-models';`
- Public exports: **55**
- Source modules: **3**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 8 |
| constant | 16 |
| function | 8 |
| interface | 21 |
| type | 2 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`index`](/api/models/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-models`; applications import these symbols from the package entrypoint instead of internal file paths. | 36 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts) |
| [`providers`](/api/models/providers) | Use the Providers module for binding external or local providers to Hypha ports. It exports 3 classes, 3 functions, 3 interfaces. | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts) |
| [`router`](/api/models/router) | Use the Router module for using the public contracts and operations for this capability boundary. It exports 3 classes, 2 functions, 4 interfaces, 1 type. | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-models` package entrypoint. Implementations under `packages/models/src` that are not exported from that entrypoint are not part of the npm package contract.
