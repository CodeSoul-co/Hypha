# `@codesoul-co/hypha-storage` API

Provider-neutral storage topology contracts and profile builders.

- Install: `npm install @codesoul-co/hypha-storage@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-storage';`
- Public exports: **51**
- Source modules: **2**

## Export overview

| Kind | Count |
| --- | ---: |
| constant | 17 |
| function | 19 |
| interface | 7 |
| type | 8 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`index`](/api/storage/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-storage`; applications import these symbols from the package entrypoint instead of internal file paths. | 46 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts) |
| [`recovery`](/api/storage/recovery) | Use the Recovery module for handling bounded recovery, retry, or degradation. It exports 2 functions, 2 interfaces, 1 type. | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-storage` package entrypoint. Implementations under `packages/storage/src` that are not exported from that entrypoint are not part of the npm package contract.
