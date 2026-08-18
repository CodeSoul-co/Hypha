# `@codesoul-co/hypha-memory` / `external-provider-url`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/external-provider-url.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `isLoopbackHostname` | function | <code>isLoopbackHostname(hostname: string): boolean</code> | Checks Loopback Hostname at this module boundary. |
| `normalizeExternalProviderBaseUrl` | function | <code>normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string</code> | Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination. |
| `ExternalProviderBaseUrlOptions` | interface | <code>interface ExternalProviderBaseUrlOptions</code> | Field contract for External Provider Base Url Options; see all contract members below. |

## `ExternalProviderBaseUrlOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests: boolean</code> | Public allow Insecure For Tests property. |
| `allowLoopbackHttp` | property | <code>allowLoopbackHttp: boolean</code> | Public allow Loopback Http property. |
| `providerName` | property | <code>providerName: string</code> | Public provider Name property. |
