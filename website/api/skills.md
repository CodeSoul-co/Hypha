# `@codesoul-co/hypha-skills` API

Versioned Skill definitions and progressive-loading registry.

- Package guide: [`@codesoul-co/hypha-skills`](/packages/skills)
- Install: `npm install @codesoul-co/hypha-skills@1.0.1`
- Public exports: **50**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 7 |
| constant | 9 |
| function | 5 |
| interface | 28 |
| type | 1 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`index`](/api/skills/entrypoint) | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts) |
| [`remote-registry`](/api/skills/remote-registry) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
