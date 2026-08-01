# ADR 0007: Workspace Path Policy Precedence

## Status

Accepted

## Context

Workspace path policy exposes read-only, writable, executable, and denied path lists. Without a
stable precedence rule, the same effective path may be both granted and denied, and different
providers may make opposite authorization decisions. Case-insensitive filesystems and alternate
separator or Unicode forms make visually different entries capable of addressing the same path.

Contract validation remains distinct from filesystem confinement. Runtime adapters must still
resolve existing ancestors and final targets, enforce link policy, and defend against TOCTOU races.

## Decision

1. `deniedPaths` is the final deny boundary and always takes precedence over read-only, writable,
   and executable grants. Parent grants may intentionally contain a more specific denied child.
2. A policy list cannot contain the same path twice after NFKC, separator, trailing-separator, and
   declared case-sensitivity normalization.
3. `caseSensitivity: insensitive` folds policy paths for comparison. `sensitive` preserves case.
   `platform` defers filesystem case behavior to the provider and does not make contract validation
   depend on the machine that parsed the spec.
4. `followSymlinksForRead: true` requires `allowSymlinks: true`. Allowing symlink entries without
   following them remains valid for listing or evidence purposes.
5. These rules are represented in TypeScript documentation, runtime schema validation, exported
   JSON Schema, fixtures, and contract tests.

## Consequences

- A broad Workspace grant cannot override a protected child path.
- Equivalent duplicate entries fail early rather than producing provider-dependent behavior.
- Provider implementations remain responsible for canonical final-target checks, symlink,
  junction, hardlink, and handle-level race protection.
- Changing deny precedence or platform case semantics is a public compatibility change and
  requires a new ADR.
