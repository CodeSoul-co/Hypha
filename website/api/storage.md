# `@codesoul-co/hypha-storage` API

Provider-neutral storage topology contracts and profile builders.

- Package guide: [`@codesoul-co/hypha-storage`](/packages/storage)
- Install: `npm install @codesoul-co/hypha-storage@1.0.1`
- Public exports: **51**

## Export overview

| Kind | Count |
| --- | ---: |
| constant | 17 |
| function | 19 |
| interface | 7 |
| type | 8 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/storage/entrypoint) | 46 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts) |
| [`recovery`](/api/storage/recovery) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
