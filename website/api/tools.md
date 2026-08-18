# `@codesoul-co/hypha-tools` API

Tool contracts, registries, governed execution and workspace boundaries.

- Install: `npm install @codesoul-co/hypha-tools@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-tools';`
- Public exports: **263**
- Source modules: **11**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 21 |
| constant | 76 |
| function | 26 |
| interface | 120 |
| type | 20 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`adapter-factory`](/api/tools/adapter-factory) | Use the Adapter factory module for binding external or local providers to Hypha ports. It exports 2 classes, 3 constants, 3 functions, 8 interfaces, 1 type. | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts) |
| [`common-tool-catalog`](/api/tools/common-tool-catalog) | Use the Common tool catalog module for registering and resolving versioned capabilities or implementations. It exports 2 constants, 2 functions, 1 type. | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts) |
| [`common-tool-ports`](/api/tools/common-tool-ports) | Use the Common tool ports module for defining or implementing provider-neutral ports. It exports 9 constants, 1 function, 4 interfaces. | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts) |
| [`common-tools`](/api/tools/common-tools) | Use the Common tools module for using the public contracts and operations for this capability boundary. It exports 6 constants, 5 functions, 2 interfaces, 4 types. | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts) |
| [`contracts`](/api/tools/contracts) | Use the Contracts module for declaring and runtime-validating contracts. It exports 38 constants, 4 functions, 32 interfaces, 2 types. | 76 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts) |
| [`execution-adapter`](/api/tools/execution-adapter) | Use the Execution adapter module for binding external or local providers to Hypha ports. It exports 2 classes, 1 constant, 3 functions, 10 interfaces, 2 types. | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts) |
| [`index`](/api/tools/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-tools`; applications import these symbols from the package entrypoint instead of internal file paths. | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts) |
| [`media`](/api/tools/media) | Use the Media module for declaring text, image, audio, and binary Tool inputs and outputs. It exports 4 constants, 2 functions, 10 interfaces, 2 types. | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts) |
| [`secrets`](/api/tools/secrets) | Use the Secrets module for passing governed secret references and resolution contracts. It exports 5 interfaces. | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts) |
| [`tool-families`](/api/tools/tool-families) | Use the Tool families module for using the public contracts and operations for this capability boundary. It exports 1 constant, 1 function, 2 interfaces. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts) |
| [`workspace`](/api/tools/workspace) | Use the Workspace module for declaring and enforcing workspace scope boundaries. It exports 3 interfaces, 1 type. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-tools` package entrypoint. Implementations under `packages/tools/src` that are not exported from that entrypoint are not part of the npm package contract.
