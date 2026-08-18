# `@codesoul-co/hypha-tools` / `secrets`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/secrets.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)
- Exports: **5**

## Using this module

Use the Secrets module for passing governed secret references and resolution contracts. It exports 5 interfaces.

### Import from the package entrypoint

```ts
import type {
  CredentialLease,
  SecretProvider,
  SecretResolutionContext,
  SecretResolver,
  ToolSecretResolver,
} from '@codesoul-co/hypha-tools';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CredentialLease` | interface | <code>interface CredentialLease</code> | Credential Lease interface with 5 public fields or methods. |
| `SecretProvider` | interface | <code>interface SecretProvider</code> | Secret Provider interface with 2 public fields or methods. |
| `SecretResolutionContext` | interface | <code>interface SecretResolutionContext</code> | Secret Resolution Context interface with 2 public fields or methods. |
| `SecretResolver` | interface | <code>interface SecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |
| `ToolSecretResolver` | interface | <code>interface ToolSecretResolver</code> | Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values. |

## `CredentialLease`

Credential Lease interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { CredentialLease } from '@codesoul-co/hypha-tools';`
- Source module: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### Declaration

```text
export interface CredentialLease {
    readonly expiresAt?: string;
    readonly renewable: boolean;
    read(): string;
    renew?(): Promise<CredentialLease>;
    release?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>readonly expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `read` | method | <code>read(): string</code> | Public method; parameters and return type are shown in the signature. |
| `release` | method | <code>release?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renew` | method | <code>renew?(): Promise&lt;CredentialLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `renewable` | property | <code>readonly renewable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SecretProvider`

Secret Provider interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SecretProvider } from '@codesoul-co/hypha-tools';`
- Source module: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### Declaration

```text
export interface SecretProvider {
    readonly scheme: string;
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `scheme` | property | <code>readonly scheme: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SecretResolutionContext`

Secret Resolution Context interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SecretResolutionContext } from '@codesoul-co/hypha-tools';`
- Source module: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### Declaration

```text
export interface SecretResolutionContext {
    purpose?: 'tool' | 'mcp_authorization' | 'mcp_headers' | 'other';
    minimumValidityMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `minimumValidityMs` | property | <code>minimumValidityMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `purpose` | property | <code>purpose?: "tool" &#124; "other" &#124; "mcp_authorization" &#124; "mcp_headers"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SecretResolver`

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

- Kind: interface
- Import: `import type { SecretResolver } from '@codesoul-co/hypha-tools';`
- Source module: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### Declaration

```text
export interface SecretResolver {
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
    resolve(reference: string, context?: SecretResolutionContext): Promise<string | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolSecretResolver`

Provider-neutral boundary for resolving opaque references at the last responsible moment. Implementations must never persist or log lease values.

- Kind: interface
- Import: `import type { ToolSecretResolver } from '@codesoul-co/hypha-tools';`
- Source module: [`secrets`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts)

### Declaration

```text
export interface SecretResolver {
    acquire(reference: string, context?: SecretResolutionContext): Promise<CredentialLease | null>;
    resolve(reference: string, context?: SecretResolutionContext): Promise<string | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(reference: string, context?: SecretResolutionContext): Promise&lt;CredentialLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(reference: string, context?: SecretResolutionContext): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
