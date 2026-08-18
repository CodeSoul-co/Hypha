# `@codesoul-co/hypha-tools` API

Tool contracts, registries, governed execution and workspace boundaries.

- Package guide: [`@codesoul-co/hypha-tools`](/packages/tools)
- Install: `npm install @codesoul-co/hypha-tools@1.0.1`
- Public exports: **263**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 21 |
| constant | 76 |
| function | 26 |
| interface | 120 |
| type | 20 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`adapter-factory`](/api/tools/adapter-factory) | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts) |
| [`common-tool-catalog`](/api/tools/common-tool-catalog) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts) |
| [`common-tool-ports`](/api/tools/common-tool-ports) | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts) |
| [`common-tools`](/api/tools/common-tools) | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts) |
| [`contracts`](/api/tools/contracts) | 76 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts) |
| [`execution-adapter`](/api/tools/execution-adapter) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts) |
| [`index`](/api/tools/entrypoint) | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts) |
| [`media`](/api/tools/media) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts) |
| [`secrets`](/api/tools/secrets) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts) |
| [`tool-families`](/api/tools/tool-families) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts) |
| [`workspace`](/api/tools/workspace) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
