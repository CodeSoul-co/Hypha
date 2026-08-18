# `@codesoul-co/hypha-mcp` API

MCP integration specs, clients, policy and lifecycle management.

- Install: `npm install @codesoul-co/hypha-mcp@1.0.1`
- Entrypoint import: `import { ... } from '@codesoul-co/hypha-mcp';`
- Public exports: **122**
- Source modules: **7**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 12 |
| constant | 32 |
| function | 14 |
| interface | 56 |
| type | 8 |

## Source modules

| Module | Use when | Exports | Source |
| --- | --- | ---: | --- |
| [`catalog`](/api/mcp/catalog) | Use the Catalog module for registering and resolving versioned capabilities or implementations. It exports 6 classes, 4 constants, 1 function, 11 interfaces, 2 types. | 24 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts) |
| [`connection-manager`](/api/mcp/connection-manager) | Use the Connection manager module for using the public contracts and operations for this capability boundary. It exports 2 classes, 4 constants, 2 functions, 9 interfaces, 1 type. | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts) |
| [`contracts`](/api/mcp/contracts) | Use the Contracts module for declaring and runtime-validating contracts. It exports 14 constants, 9 interfaces, 2 types. | 25 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts) |
| [`coordination`](/api/mcp/coordination) | Use the Coordination module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 interfaces. | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts) |
| [`governance`](/api/mcp/governance) | Use the Governance module for applying policy and governance checks. It exports 1 class, 5 functions, 3 interfaces, 2 types. | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts) |
| [`index`](/api/mcp/entrypoint) | Aggregates the public entrypoint exports for `@codesoul-co/hypha-mcp`; applications import these symbols from the package entrypoint instead of internal file paths. | 32 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts) |
| [`oauth`](/api/mcp/oauth) | Use the Oauth module for using the public contracts and operations for this capability boundary. It exports 1 class, 2 functions, 5 interfaces. | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts) |

## Import boundary

This page documents only the public API exported by the `@codesoul-co/hypha-mcp` package entrypoint. Implementations under `packages/mcp/src` that are not exported from that entrypoint are not part of the npm package contract.
