# `@codesoul-co/hypha-serving-cache` / `policies`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/policies.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultCachePolicy` | constant | <code>const defaultCachePolicy: CachePolicy</code> | default Cache Policy constant exported by the `policies` module. |
| `cacheModeAllowsRead` | function | <code>cacheModeAllowsRead(mode: CacheMode): boolean</code> | Public runtime operation for cache Mode Allows Read. |
| `cacheModeAllowsWrite` | function | <code>cacheModeAllowsWrite(mode: CacheMode): boolean</code> | Public runtime operation for cache Mode Allows Write. |
| `normalizeCachePolicy` | function | <code>normalizeCachePolicy(policy?: Partial&lt;CachePolicy&gt;): CachePolicy</code> | Normalizes Cache Policy at this module boundary. |
