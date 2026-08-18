# `@codesoul-co/hypha-fsm` API

FSM specifications, topology analysis, snapshots, transitions and recovery.

- Package guide: [`@codesoul-co/hypha-fsm`](/packages/fsm)
- Install: `npm install @codesoul-co/hypha-fsm@1.0.1`
- Public exports: **77**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 1 |
| constant | 20 |
| function | 22 |
| interface | 24 |
| type | 10 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/fsm/entrypoint) | 50 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts) |
| [`recovery`](/api/fsm/recovery) | 27 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
