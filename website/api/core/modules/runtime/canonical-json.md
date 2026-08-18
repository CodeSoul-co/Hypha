# `@codesoul-co/hypha-core` / `modules/runtime/canonical-json`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/canonical-json.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalizeJson` | function | <code>canonicalizeJson(value: unknown): string</code> | Checks whether it can onicalize Json at this module boundary. |
| `hashCanonicalJson` | function | <code>hashCanonicalJson(value: unknown): string</code> | Checks whether h Canonical Json at this module boundary. |
| `CanonicalJsonValue` | type | <code>type CanonicalJsonValue = null &#124; boolean &#124; number &#124; string &#124; CanonicalJsonValue[] &#124; { [key: string]: CanonicalJsonValue; }</code> | Public type alias for Canonical Json Value. |
