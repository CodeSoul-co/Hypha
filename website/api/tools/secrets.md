# `@codesoul-co/hypha-tools` / `secrets`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/secrets.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CredentialLease` | interface | <code>interface CredentialLease</code> | Field contract for Credential Lease; see all contract members below. |
| `SecretProvider` | interface | <code>interface SecretProvider</code> | Field contract for Secret Provider; see all contract members below. |
| `SecretResolutionContext` | interface | <code>interface SecretResolutionContext</code> | Field contract for Secret Resolution Context; see all contract members below. |
| `SecretResolver` | interface | <code>interface SecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |
| `ToolSecretResolver` | interface | <code>interface ToolSecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |

## `CredentialLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `read` | method | <code>read(): string</code> | Public runtime operation for read. |
| `release` | method | <code>release(): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(): Promise&lt;CredentialLease&gt;</code> | Public runtime operation for renew. |
| `renewable` | property | <code>renewable: boolean</code> | Public renewable property. |

## `SecretProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `scheme` | property | <code>scheme: string</code> | Public scheme property. |

## `SecretResolutionContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `minimumValidityMs` | property | <code>minimumValidityMs: number</code> | Public minimum Validity Ms property. |
| `purpose` | property | <code>purpose: "tool" &#124; "other" &#124; "mcp_authorization" &#124; "mcp_headers"</code> | Public purpose property. |

## `SecretResolver` contract members

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `resolve` | method | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | Resolves resolve at this module boundary. |

## `ToolSecretResolver` contract members

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public runtime operation for acquire. |
| `resolve` | method | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | Resolves resolve at this module boundary. |
