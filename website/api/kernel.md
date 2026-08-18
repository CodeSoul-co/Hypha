# `@codesoul-co/hypha-kernel` API

ReAct Agent specification and kernel composition contracts.

- Package guide: [`@codesoul-co/hypha-kernel`](/packages/kernel)
- Install: `npm install @codesoul-co/hypha-kernel@1.0.1`
- Public exports: **85**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 12 |
| constant | 21 |
| function | 8 |
| interface | 39 |
| type | 5 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/kernel/entrypoint) | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
