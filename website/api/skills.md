# `@codesoul-co/hypha-skills` API

Versioned Skill definitions and progressive-loading registry.

- Install: `npm install @codesoul-co/hypha-skills@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-skills';`
- Public exports: **51**
- Source modules: **2**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 7 |
| constant | 9 |
| function | 6 |
| interface | 28 |
| type | 1 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`index`](/api/skills/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-skills`; applications import these symbols from the package entrypoint instead of internal file paths. | 42 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts) |
| [`remote-registry`](/api/skills/remote-registry) | Use the Remote registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 8 interfaces. | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-skills` package entrypoint. Implementations under `packages/skills/src` that are not exported from that entrypoint are not part of the npm package contract.
