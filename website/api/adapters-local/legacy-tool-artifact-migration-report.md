# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-migration-report`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-migration-report.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)
- Exports: **9**

## Using this module

Use the Legacy tool artifact migration report module for defining or implementing provider-neutral ports. It exports 6 functions, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  isLegacyToolArtifactMigrationExecutionReportId,
  isLegacyToolArtifactMigrationPlanHash,
  isLegacyToolArtifactMigrationRollbackReportId,
  legacyToolArtifactMigrationExecutionReportId,
  legacyToolArtifactMigrationPlanHash,
  legacyToolArtifactMigrationRollbackReportId,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LegacyToolArtifactMigrationExecutionEvidence,
  LegacyToolArtifactMigrationPlanEvidence,
  LegacyToolArtifactMigrationRollbackEvidence,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `isLegacyToolArtifactMigrationExecutionReportId` | function | <code>isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Execution Report ID function with 1 public call signature; parameters and return types are listed below. |
| `isLegacyToolArtifactMigrationPlanHash` | function | <code>isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Plan Hash function with 1 public call signature; parameters and return types are listed below. |
| `isLegacyToolArtifactMigrationRollbackReportId` | function | <code>isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string</code> | Is Legacy Tool Artifact Migration Rollback Report ID function with 1 public call signature; parameters and return types are listed below. |
| `legacyToolArtifactMigrationExecutionReportId` | function | <code>legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string</code> | Legacy Tool Artifact Migration Execution Report ID function with 1 public call signature; parameters and return types are listed below. |
| `legacyToolArtifactMigrationPlanHash` | function | <code>legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string</code> | Legacy Tool Artifact Migration Plan Hash function with 1 public call signature; parameters and return types are listed below. |
| `legacyToolArtifactMigrationRollbackReportId` | function | <code>legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string</code> | Legacy Tool Artifact Migration Rollback Report ID function with 1 public call signature; parameters and return types are listed below. |
| `LegacyToolArtifactMigrationExecutionEvidence` | interface | <code>interface LegacyToolArtifactMigrationExecutionEvidence</code> | Legacy Tool Artifact Migration Execution Evidence interface with 6 public fields or methods. |
| `LegacyToolArtifactMigrationPlanEvidence` | interface | <code>interface LegacyToolArtifactMigrationPlanEvidence</code> | Legacy Tool Artifact Migration Plan Evidence interface with 5 public fields or methods. |
| `LegacyToolArtifactMigrationRollbackEvidence` | interface | <code>interface LegacyToolArtifactMigrationRollbackEvidence</code> | Legacy Tool Artifact Migration Rollback Evidence interface with 6 public fields or methods. |

## `isLegacyToolArtifactMigrationExecutionReportId`

Is Legacy Tool Artifact Migration Execution Report ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isLegacyToolArtifactMigrationExecutionReportId } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string;
```

### Call signature

```text
isLegacyToolArtifactMigrationExecutionReportId(value: unknown): value is string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is string`
- Description: The return contract is defined by the type shown above.

## `isLegacyToolArtifactMigrationPlanHash`

Is Legacy Tool Artifact Migration Plan Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isLegacyToolArtifactMigrationPlanHash } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string;
```

### Call signature

```text
isLegacyToolArtifactMigrationPlanHash(value: unknown): value is string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is string`
- Description: The return contract is defined by the type shown above.

## `isLegacyToolArtifactMigrationRollbackReportId`

Is Legacy Tool Artifact Migration Rollback Report ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isLegacyToolArtifactMigrationRollbackReportId } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string;
```

### Call signature

```text
isLegacyToolArtifactMigrationRollbackReportId(value: unknown): value is string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is string`
- Description: The return contract is defined by the type shown above.

## `legacyToolArtifactMigrationExecutionReportId`

Legacy Tool Artifact Migration Execution Report ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { legacyToolArtifactMigrationExecutionReportId } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string;
```

### Call signature

```text
legacyToolArtifactMigrationExecutionReportId(report: LegacyToolArtifactMigrationExecutionEvidence): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `report` | <code>LegacyToolArtifactMigrationExecutionEvidence</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `legacyToolArtifactMigrationPlanHash`

Legacy Tool Artifact Migration Plan Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { legacyToolArtifactMigrationPlanHash } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string;
```

### Call signature

```text
legacyToolArtifactMigrationPlanHash(plan: LegacyToolArtifactMigrationPlanEvidence): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `plan` | <code>LegacyToolArtifactMigrationPlanEvidence</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `legacyToolArtifactMigrationRollbackReportId`

Legacy Tool Artifact Migration Rollback Report ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { legacyToolArtifactMigrationRollbackReportId } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export declare function legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string;
```

### Call signature

```text
legacyToolArtifactMigrationRollbackReportId(report: LegacyToolArtifactMigrationRollbackEvidence): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `report` | <code>LegacyToolArtifactMigrationRollbackEvidence</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `LegacyToolArtifactMigrationExecutionEvidence`

Legacy Tool Artifact Migration Execution Evidence interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationExecutionEvidence } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationExecutionEvidence {
    planHash: string;
    mode: 'dry_run' | 'execute';
    items: unknown[];
    skipped: unknown[];
    summary: unknown;
    reportId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "execute" &#124; "dry_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportId` | property | <code>reportId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationPlanEvidence`

Legacy Tool Artifact Migration Plan Evidence interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationPlanEvidence } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationPlanEvidence {
    imports: unknown[];
    skipped: unknown[];
    totalEntries: number;
    totalBytes: number;
    planHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `imports` | property | <code>imports: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalEntries` | property | <code>totalEntries: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyToolArtifactMigrationRollbackEvidence`

Legacy Tool Artifact Migration Rollback Evidence interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyToolArtifactMigrationRollbackEvidence } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`legacy-tool-artifact-migration-report`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-migration-report.ts)

### Declaration

```text
export interface LegacyToolArtifactMigrationRollbackEvidence {
    planHash: string;
    executionReportId: string;
    mode: 'dry_run' | 'rollback';
    items: unknown[];
    summary: unknown;
    reportId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionReportId` | property | <code>executionReportId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `items` | property | <code>items: unknown[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "rollback" &#124; "dry_run"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reportId` | property | <code>reportId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
