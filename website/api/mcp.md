# `@codesoul-co/hypha-mcp` API

MCP integration specs, clients, policy and lifecycle management.

- Package guide: [`@codesoul-co/hypha-mcp`](/packages/mcp)
- Install: `npm install @codesoul-co/hypha-mcp@1.0.1`
- Public exports: **122**

## Export overview

| Kind | Count |
| --- | ---: |
| class | 12 |
| constant | 32 |
| function | 14 |
| interface | 56 |
| type | 8 |

## Source modules

| Module | Exports | Source |
| --- | ---: | --- |
| [`catalog`](/api/mcp/catalog) | 24 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts) |
| [`connection-manager`](/api/mcp/connection-manager) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts) |
| [`contracts`](/api/mcp/contracts) | 25 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts) |
| [`coordination`](/api/mcp/coordination) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts) |
| [`governance`](/api/mcp/governance) | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts) |
| [`index`](/api/mcp/entrypoint) | 32 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts) |
| [`oauth`](/api/mcp/oauth) | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts) |

## Reading order

Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.

## Usage conventions

- Import from the package entrypoint instead of relying on unexported internal files.
- Parse configuration, network requests and persisted data with runtime schemas.
- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.
- Use the [runnable examples](/guide/examples) to verify real call order.
