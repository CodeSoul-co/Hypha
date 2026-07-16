# Common Utility Tools

The API server registers three deterministic local tools for data preparation inside governed agent
runs. They do not access the network, filesystem, process environment, or business data. Each tool
uses `sideEffectLevel: "none"`, a dedicated permission scope, strict input properties, a one-second
timeout, and input/output audit policy.

## `utility.json`

| Operation   | Required input              | Result                                                          |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| `parse`     | `text`                      | Parsed JSON in `value`.                                         |
| `stringify` | `value`; optional `pretty`  | Stable key-ordered JSON in `text`, or two-space formatted JSON. |
| `get`       | `value`, RFC 6901 `pointer` | `{ found, value? }`. Empty pointer selects the root.            |
| `keys`      | object `value`              | Sorted `keys` and `count`.                                      |

The implementation accepts only JSON-compatible values, finite numbers, at most 64 levels and
100,000 nodes, and at most 128 pointer segments. It rejects `__proto__`, `prototype`, and
`constructor` keys.

```json
{
  "operation": "get",
  "value": { "items": [{ "id": "item-1" }] },
  "pointer": "/items/0/id"
}
```

## `utility.text`

| Operation              | Important fields                                | Result                                                               |
| ---------------------- | ----------------------------------------------- | -------------------------------------------------------------------- |
| `length`               | `text`                                          | UTF-16 code units, Unicode code points, UTF-8 bytes, and line count. |
| `line_select`          | zero-based `start`, exclusive `end`             | Selected lines normalized with `\n`.                                 |
| `literal_find`         | `query`, optional `caseSensitive`, `maxResults` | UTF-16 indexes, count, and truncation flag.                          |
| `literal_replace`      | `query`, `replacement`, optional limits         | Replaced text, replacement count, and truncation flag.               |
| `slice`                | code-point `start`, exclusive `end`             | Unicode-safe substring.                                              |
| `normalize_whitespace` | `mode` (`spaces` or `lines`)                    | Normalized text.                                                     |

Search strings are escaped and treated literally; callers cannot inject a regular expression.
Inputs and outputs are limited to 1,000,000 characters, queries to 4,096 characters, and search or
replace results to 1,000.

```json
{
  "operation": "literal_replace",
  "text": "draft [name]",
  "query": "[name]",
  "replacement": "Hypha"
}
```

## `utility.hash`

`sha256_text` hashes `text`. `sha256_json` first applies the same JSON safety validation and stable
key ordering as `utility.json`, then hashes the canonical UTF-8 representation. The result contains
`algorithm`, `encoding`, the 64-character hexadecimal `digest`, and `inputBytes`.

```json
{
  "operation": "sha256_json",
  "value": { "version": 1, "name": "hypha" }
}
```

Canonical JSON hashing is useful for idempotency fingerprints and comparison, but it is not a
password hashing or signature API. Secrets should use a dedicated secret manager and cryptographic
protocol outside agent context.

## Registration and Governance

The contracts and pure executors are exported from `@hypha/tools`:

```ts
import {
  commonUtilityToolSpecs,
  executeHashUtility,
  executeJsonUtility,
  executeTextUtility,
} from '@hypha/tools';
```

The server registers them through `ToolManager` and exposes them through the same governed Tool
routes and `GovernedToolRunner` path as other local tools. Use permission scopes `utility.json`,
`utility.text`, and `utility.hash` when defining agent or workflow tool access.
