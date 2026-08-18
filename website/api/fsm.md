# `@codesoul-co/hypha-fsm` API

FSM specifications, topology analysis, snapshots, transitions and recovery.

- Install: `npm install @codesoul-co/hypha-fsm@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-fsm';`
- Public exports: **77**
- Source modules: **2**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 1 |
| constant | 20 |
| function | 22 |
| interface | 24 |
| type | 10 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`index`](/api/fsm/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-fsm`; applications import these symbols from the package entrypoint instead of internal file paths. | 50 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts) |
| [`recovery`](/api/fsm/recovery) | Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 7 constants, 5 functions, 10 interfaces, 5 types. | 27 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-fsm` package entrypoint. Implementations under `packages/fsm/src` that are not exported from that entrypoint are not part of the npm package contract.
