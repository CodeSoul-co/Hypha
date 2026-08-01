# ADR 0008: Workspace Snapshot Manifest Invariants

## Status

Accepted

## Context

Workspace snapshot manifests are recovery and Cache-validity evidence. A structurally valid entry
can still be ambiguous when its `kind` contradicts its fields, and aggregate counters can drift
from the entries they summarize. Such ambiguity makes different providers hash, restore, or compare
the same manifest differently.

The E1 contract cannot prove filesystem state or Artifact integrity. It can, however, reject
self-contradictory evidence before a provider or Cache consumes it.

## Decision

1. A `symlink` entry requires a Workspace-relative `symlinkTarget`.
2. File and directory entries cannot carry `symlinkTarget`.
3. `fileCount` equals the number of file entries.
4. When every file entry reports `sizeBytes`, `totalBytes` equals their sum. A manifest may omit an
   entry size when the capture surface cannot provide it; in that case the contract does not infer
   a total from incomplete evidence.
5. Entry-kind conditions are represented in Zod validation and exported JSON Schema, with contract
   tests covering accepted and rejected forms.

## Consequences

- Providers cannot emit ambiguous symlink evidence or internally inconsistent complete byte totals.
- Runtime restore must still revalidate the live Workspace root, path policy, links, and expected
  snapshot hash; manifest validation is not filesystem confinement.
- Requiring content hashes or Artifact references for every file remains an E4 Artifact integration
  decision and is intentionally not introduced by this E1 contract.
