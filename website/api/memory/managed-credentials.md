# `@codesoul-co/hypha-memory` / `managed-credentials`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/managed-credentials.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RenewableCredentialManager` | class | <code>new RenewableCredentialManager(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Runtime implementation for Renewable Credential Manager; see its public constructor and members below. |
| `staticCredentialProvider` | function | <code>staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider</code> | Public runtime operation for static Credential Provider. |
| `ManagedCredentialLease` | interface | <code>interface ManagedCredentialLease</code> | Field contract for Managed Credential Lease; see all contract members below. |
| `RenewableCredentialManagerOptions` | interface | <code>interface RenewableCredentialManagerOptions</code> | Field contract for Renewable Credential Manager Options; see all contract members below. |
| `RenewableCredentialProvider` | interface | <code>interface RenewableCredentialProvider</code> | Field contract for Renewable Credential Provider; see all contract members below. |

## `RenewableCredentialManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Creates an instance of this class. |
| `get` | method | <code>get(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | Gets get at this module boundary. |
| `invalidate` | method | <code>invalidate(): void</code> | Public runtime operation for invalidate. |

## `ManagedCredentialLease` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `token` | property | <code>token: string</code> | Public token property. |
| `tokenType` | property | <code>tokenType: "api_token" &#124; "oauth_bearer"</code> | Public token Type property. |

## `RenewableCredentialManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `provider` | property | <code>provider: RenewableCredentialProvider</code> | Public provider property. |
| `refreshSkewMs` | property | <code>refreshSkewMs: number</code> | Public refresh Skew Ms property. |

## `RenewableCredentialProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | Public runtime operation for acquire. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `revoke` | method | <code>revoke(lease: ManagedCredentialLease, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for revoke. |
