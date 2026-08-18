# `@codesoul-co/hypha-testing` API

Trace, replay, fixture and deterministic assertion helpers.

- Install: `npm install @codesoul-co/hypha-testing@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-testing';`
- Public exports: **46**
- Source modules: **5**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 9 |
| function | 7 |
| interface | 28 |
| type | 2 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`evaluation`](/api/testing/evaluation) | Use the Evaluation module for using the public contracts and operations for this capability boundary. It exports 3 classes, 1 function, 10 interfaces, 1 type. | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts) |
| [`index`](/api/testing/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-testing`; applications import these symbols from the package entrypoint instead of internal file paths. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts) |
| [`mock-execution-provider`](/api/testing/mock-execution-provider) | Use the Mock execution provider module for binding external or local providers to Hypha ports. It exports 2 classes, 2 interfaces. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts) |
| [`regression`](/api/testing/regression) | Use the Regression module for using the public contracts and operations for this capability boundary. It exports 1 class, 5 interfaces, 1 type. | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts) |
| [`replay`](/api/testing/replay) | Use the Replay module for using the public contracts and operations for this capability boundary. It exports 3 classes, 3 functions, 10 interfaces. | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-testing` package entrypoint. Implementations under `packages/testing/src` that are not exported from that entrypoint are not part of the npm package contract.
