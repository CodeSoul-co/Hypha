# `@codesoul-co/hypha-testing` API

Trace, replay, fixture and deterministic assertion helpers.

- Package guide: [`@codesoul-co/hypha-testing`](/packages/testing)
- Install: `npm install @codesoul-co/hypha-testing@1.0.1`
- Public exports: **46**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 9 |
| function | 7 |
| interface | 28 |
| type | 2 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`evaluation`](/api/testing/evaluation) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts) |
| [`index`](/api/testing/entrypoint) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts) |
| [`mock-execution-provider`](/api/testing/mock-execution-provider) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts) |
| [`regression`](/api/testing/regression) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts) |
| [`replay`](/api/testing/replay) | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
