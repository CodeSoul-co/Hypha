# Contributing to Hypha

Hypha uses a conventional two-branch release model. Short-lived work branches merge into `dev`, and a fully validated `dev` release candidate merges into `main`.

## Start from dev

Update the shared development baseline before starting work:

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
git switch -c feature/<name>
```

Use `fix/*`, `docs/*`, or `chore/*` when those prefixes describe the change better. Do not create username-prefixed, agent-prefixed, date-only, `tmp/*`, or `wip/*` remote branches.

## Integration and release flow

```text
feature/* | fix/* | docs/* | chore/*
                  ↓
                 dev
                  ↓
                main
```

`dev` is the development integration branch, full-system validation branch, and release-candidate source. It assumes the role previously assigned to `dev-merge`.

`dev-merge` and `dev-domain-merge` are retired compatibility refs. Existing module, Domain, and Cache branches are legacy refs or optional collaboration branches; they no longer form a mandatory merge ladder.

## Branch responsibilities

- Make implementation, test, documentation, and example changes on a short-lived branch created from `dev`.
- Open a focused pull request into `dev`.
- Module ownership is enforced through package boundaries, reviewers, public contracts, and tests rather than permanent module branches.
- A coherent behavior may cross package boundaries when its contract, implementation, tests, and documentation must change together. Keep unrelated work separate.
- `main` receives only a completely validated `dev` release candidate.
- Do not force-push shared `dev` or `main` history.
- Delete short-lived remote branches after merge when no longer needed.

## Validation

Work branches run checks appropriate to their changes. Package contract changes require `npm run test:packages`; API and runtime behavior changes require integration coverage.

Before merging `dev` into `main`, the exact candidate must pass:

```bash
npm ci
npm run format
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:packages
npm run test:integration
```

Final validation also covers Cache enabled and disabled, Replay, Regression, DomainPack loading, runtime smoke tests, public examples, and documentation builds when those surfaces are affected.

After a release merge creates a main-only merge commit, fast-forward `dev` to the exact `main` head before starting the next development cycle.

## Hotfixes

An urgent production fix starts from `main` on `hotfix/<name>`. Validate and merge it into `main`, then immediately merge or cherry-pick the exact fix into `dev`. The hotfix is incomplete while `dev` lacks the released change.

## Production readiness and acceptance evidence

- Liveness is not traffic readiness. `/health` may report that the process is alive, but `/ready` must fail closed until the canonical Event authority, execution graph, Session Command worker, timer/recovery workers, and every required provider are configured and have completed startup probes.
- A maintenance worker is not an execution worker. Timer or projection-recovery sweeps do not prove that new or continued Runs can execute.
- Release acceptance requires real dependencies with zero skipped cases. Docker, PostgreSQL, S3-compatible storage, Remote Sandbox, Redis Sentinel, MongoDB replica set, managed Memory, MCP, and Remote Skill evidence cannot be replaced by mocks or conditional skips.
- Acceptance evidence is commit-specific. Record the exact commit, immutable image or service revision, topology, executed and skipped counts, failure injection, timeout, cancellation, restart, cleanup, and resource-recovery results.
- An unavailable required environment is a release blocker, not a passing test.
- Test commands must terminate naturally. `--forceExit`, blanket timeout inflation, swallowed cleanup failures, and pass-on-missing-environment behavior are forbidden in release gates.

## Dependency and runtime compatibility

- Root dependency, lockfile, Node engine, TypeScript, lint, and test-runner changes belong on a focused `chore/*` branch based on `dev`.
- Validate the declared minimum Node version when a security or dependency upgrade changes transitive engine or platform requirements.
- Do not use `npm audit fix --force` on `dev` or `main`. Review dependency paths, exploitability, engine compatibility, and lockfile changes.
- Installed-but-unreachable vulnerable code still requires a documented decision: remove or upgrade it, or record the bounded exposure and compensating control.

## FSM recovery engineering rules

- Represent recovery with explicit FSM states, transitions, persisted counters, and trace callbacks. Do not add hidden or unbounded agent retry loops.
- Normalize errors into stable source/category/code contracts before selecting a response. Keep provider payloads behind adapters and secrets out of recovery metadata.
- Bound attempts per state, total attempts, elapsed time, backoff, jitter, and circuit probes. Cancellation terminates the current attempt and propagates through schedulers and adapters.
- Never retry an external write whose commit state is unknown. Quarantine it until receipt or reconciliation evidence is available.
- Deterministic validation, policy, authentication, authorization, and invariant failures are not transient provider failures.
- Reconstruct from versioned specs, FSM snapshots, append-only Events, invocation records, receipts, leases, and fencing tokens—not Cache, Session views, or UI state.
- Every fallible framework module exposes a stable classifier or adapter boundary producing `RecoveryFailure` plus revision, receipt, checksum, idempotency, or provider-state evidence.
- Cross-module recovery uses dependency-ordered participants and bounded no-progress detection.
- Cache failures may degrade or bypass only when the primary operation remains correct. Recovery knowledge is a revision-matched hint revalidated on every hit.
- Message delivery uses bounded requeue/backoff and a dead-letter terminal state.
- Domain workflow compilation preserves the shared recovery envelope so application workflows cannot remove required supervisor paths.

## Common tool engineering rules

- Common tools remain provider-neutral and domain-neutral. Business workflow, prompts, routes, schemas, and product-specific behavior belong in a DomainPack or application surface.
- Declare strict input/output schemas, side-effect level, permission scope, timeout, audit behavior, and size/depth/result limits.
- Treat caller search text as literal unless the contract explicitly declares a bounded regex feature.
- Reject prototype-pollution keys and non-JSON values in generic data tools.
- Do not expose arbitrary shell, filesystem, network, environment, secret, or dynamic-code access through utility tools.
- Preserve structured error codes so FSM recovery can distinguish validation, policy, transient dependency, timeout, conflict, and uncertain side-effect failures.

## Documentation

Public README, guides, API references, examples, package metadata, and release notes describe only capabilities proven by the final `main` commit. Internal audit, remediation, temporary plans, local paths, credentials, and contributor attribution stay out of public documentation.

Documentation changes follow the same short-lived branch → `dev` → `main` path as implementation changes.
