# `@codesoul-co/hypha-domain` API

Domain Pack validation and compilation into runtime-owned contracts.

- Package guide: [`@codesoul-co/hypha-domain`](/packages/domain)
- Install: `npm install @codesoul-co/hypha-domain@1.0.1`
- Public exports: **81**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 4 |
| constant | 32 |
| function | 12 |
| interface | 25 |
| type | 8 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/domain/entrypoint) | 80 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts) |
| [`research-evidence-example`](/api/domain/research-evidence-example) | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/research-evidence-example.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
