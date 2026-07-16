# RFC: Execution Cache Fingerprint Boundary Contract

## Summary

Execution must provide stable validity facts to Cache without implementing a Cache Store or copying
large execution outputs. This increment adds the engineering specification's
`ExecutionCacheValidityInput` and `ExecutionEnvironmentFingerprint`, plus bounded command
fingerprint material, environment-resolution, result-metadata, Artifact-reference, and reuse
assessment contracts.

## Ownership and Dependency Direction

- Execution owns command, source, environment, policy, Secret-version-set, and Artifact-content
  fingerprint facts.
- Cache owns lookup, persistence, TTL, eviction, scope, and hit/miss behavior.
- Artifact owns Artifact content and the future canonical `ArtifactRef` object.
- Provider adapters resolve environment facts and implement the platform-neutral SHA-256 port.

`@hypha/core` does not import `@hypha/serving-cache`. Cache implementations may store
`ExecutionCacheEntryProjection` as the generic `CacheEntry.value`, so the dependency remains from
Cache to Core rather than from Core to Cache.

## Stable Fingerprint Material

The engineering specification's Command fingerprint is represented as
`ExecutionCommandFingerprintInput`. Raw arguments are reduced to `argsHash`, relevant environment
variables to `relevantEnvHash`, and Secret versions to `secretVersionSetHash`. Raw environment maps,
Secret values, stdin, stdout, stderr, and Artifact bytes are not part of the boundary.

`canonicalizeExecutionFingerprintInput` sorts object keys recursively and preserves array order.
`ExecutionFingerprintHasher` is a platform-neutral SHA-256 port: adapters hash the canonical UTF-8
string and return an algorithm-qualified value such as `sha256:<digest>`. This matches the
`cache-base` stable-JSON key semantics without importing Node `crypto` into Core.

## Environment Fail-Closed Rule

An `ExecutionEnvironmentFingerprint` is accepted when it has either:

- an immutable image digest; or
- a platform plus at least one detected executable version.

If a Provider cannot resolve those facts, it returns
`ExecutionEnvironmentFingerprintResolution { status: "unavailable" }`. Callers must not invent a
fingerprint hash. The reuse assessment then returns
`environment_fingerprint_unavailable`.

## Cache Entry Projection

`ExecutionCacheEntryProjection` contains only:

- bounded Execution result metadata;
- Artifact references paired with content hashes;
- command and validity hashes;
- the exact validity input.

It rejects extra fields, so stdout, stderr, raw file content, raw environment values, and Secret
values cannot be placed in the projection. String Artifact references are a temporary bridge until
the Artifact owner publishes the canonical `ArtifactRef` contract.

## Side Effects and Receipts

Workspace-local `none`, `read`, and `write` operations may be reusable when their environment is
resolved. `external_effect` and `irreversible` operations are explicitly not reusable solely from a
Result Cache. A Provider receipt hash may be retained in result metadata, but receipt evidence does
not make an external side effect safe to replay or skip.

## Compatibility

The contract is compatible with `origin/cache-base` because it uses that branch's generic
`CacheEntry<T>` boundary and the same recursively sorted JSON semantics. This increment does not
modify `packages/serving-cache`, Cache policies, stores, middleware, or key prefixes.

## Acceptance

- engineering-spec validity and environment interfaces are exported from Core;
- command material excludes raw environment and Secret values;
- environment probing fails closed;
- external and irreversible effects are not Result-Cache reusable;
- Cache projections contain metadata, references, and hashes only;
- TypeScript, Zod, JSON Schema, examples, and tests agree;
- no Cache Store, Artifact Store, Provider, Runtime, or concrete hashing implementation changes.
