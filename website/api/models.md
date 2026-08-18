# `@codesoul-co/hypha-models` API

Model provider registry, routing and deterministic mock providers.

- Package guide: [`@codesoul-co/hypha-models`](/packages/models)
- Install: `npm install @codesoul-co/hypha-models@1.0.1`
- Public exports: **55**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 8 |
| constant | 16 |
| function | 8 |
| interface | 21 |
| type | 2 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/models/entrypoint) | 36 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts) |
| [`providers`](/api/models/providers) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts) |
| [`router`](/api/models/router) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
