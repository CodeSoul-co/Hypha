# Contributing to Hypha

Hypha uses source branches, parent integration branches, two-stage joint integration, and a
single release branch. Feature and bug-fix work belongs to the source branch that owns the
affected module; integration branches do not take ownership of source implementation fixes.

## Daily local baseline

At the start of every workday, update the shared Framework + DomainPack baseline:

```bash
git fetch origin --prune
git switch dev-domain-merge
git pull --ff-only origin dev-domain-merge
```

Use this checkout to inspect the current integrated state and run cross-domain checks. It is a
local baseline update, not a source-branch merge rule. After updating it, switch to the branch
that owns the work and synchronize that branch from its parent:

| Work branch                                                                    | Update from         | Merge completed work into |
| ------------------------------------------------------------------------------ | ------------------- | ------------------------- |
| `memory`, `tools`, `runtime`, `execution`, and other Framework source branches | `origin/dev`        | `dev`                     |
| `domain-*`                                                                     | `origin/domain`     | `domain`                  |
| `cache-feature-*`                                                              | `origin/cache-base` | `cache-base`              |

Do not merge `dev-domain-merge` directly into Framework, Domain, or Cache source branches. That
would move DomainPack integration into branches that do not own it.

## Integration flow

```text
Framework source branches → dev ───────────────┐
                                                ├→ dev-domain-merge
Domain source branches    → domain ────────────┘

dev → cache-base
cache-feature-* → cache-base

dev-domain-merge + cache-base → dev-merge → main
```

`dev-domain-merge` first validates Framework + DomainPack. `dev-merge` then adds Cache and is the
only branch allowed to enter `main`. Direct feature development and source fixes are forbidden on
both joint integration branches.

## Restricted remote branch updates

Only the GitHub user `erwinmsmith` may push to or merge a pull request into these remote branches:

- `cache-base` and any other Cache integration or release branch;
- `dev-domain-merge`;
- `dev-merge`;
- `main`.

Cache contributors may push to the `cache-feature-*` branch that owns their work. After that branch
passes its source-level checks, `erwinmsmith` performs the reviewed merge into `cache-base` and the
remaining release flow. Other contributors may prepare a pull request for a restricted branch, but
they must not merge it or update the restricted remote ref themselves.

An unauthorized restricted-branch update stops the release flow. The repository maintainer reverts
the remote content without rewriting shared history, records the actual push actor separately from
the commit author, and requires the change to restart from the correct owner branch.

## Bug routing

- Framework defect: fix the owning Framework source branch, merge it into `dev`, then update
  `dev-domain-merge`, `cache-base`, and `dev-merge` in that order.
- Domain defect: fix the owning `domain-*` branch, merge it into `domain`, then update
  `dev-domain-merge` and `dev-merge`.
- Cache defect: fix the owning `cache-feature-*` branch, merge it into `cache-base`, then update
  `dev-merge`.

Never patch a source-owned defect only on `dev-domain-merge`, `dev-merge`, or `main`.

## Validation

Source branches run at least `npm run typecheck` and `npm run test:unit`; contract changes also run
`npm run test:packages`, and API behavior changes run integration tests. Parent integration branches
run typecheck, build, and unit tests. Cache integration also runs package tests.

Before updating `main`, `dev-merge` must pass:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
npm run test:unit
npm run test:packages
npm run test:integration
```

The final validation also covers Cache enabled and disabled modes, replay, regression, DomainPack
loading, and runtime smoke tests.

## FSM recovery engineering rules

- Runtime recovery must be represented by explicit FSM states, transitions, persisted counters,
  and trace callbacks. Do not add an unbounded or hidden agent retry loop.
- Normalize errors into a stable source/category/code contract before selecting a response. Keep
  provider payloads behind adapters and keep secrets out of recovery metadata.
- Every retry policy must bound attempts per state, total attempts, elapsed time, backoff, jitter,
  and circuit probes. Cancellation terminates the current attempt and propagates through schedulers
  and adapters.
- Never retry an external write whose commit state is unknown. Quarantine it until receipt or
  reconciliation evidence is available. A known committed effect may be compensated only by an
  explicit, idempotent compensation handler.
- Deterministic validation, policy, authentication, authorization, and invariant failures are not
  transient provider failures. Route them to corrected input, human review, quarantine, or failure.
- Cache, Session views, and UI state are not recovery sources of truth. Reconstruct from versioned
  specs, FSM snapshots, append-only events, invocation records, receipts, leases, and fencing tokens.
- Recovery defects discovered during integration still return to the owning source branch. The FSM
  coordinator does not grant an integration branch ownership of Runtime, Tool, Memory, Domain, or
  Cache implementation.
- Every fallible framework module must expose a stable classifier or adapter boundary that produces
  `RecoveryFailure` plus revision-, receipt-, checksum-, idempotency-, or provider-state evidence.
  Human-readable error text, elapsed time, and repeated log messages are not proof of progress.
- Cross-module recovery must use dependency-ordered participants. A completed upstream participant
  is not executed again; repeated fingerprints with unchanged evidence consume the no-progress
  budget and switch to a declared fallback/degradation path or escalate.
- Inference Cache, Serving Cache, and WorkCache failures may degrade or bypass only when the primary
  operation remains correct. Recovery knowledge is a revision-matched hint, must be revalidated on
  every hit, and must be invalidated on policy/spec/provider drift, expiry, or negative outcomes.
- Message delivery uses bounded requeue/backoff and a dead-letter terminal state. A poison or
  expired message must not block the recipient queue or restart an unbounded agent loop.
- Domain workflow compilation must preserve the shared recovery envelope (`Recovering`,
  `Compensating`, `Quarantined`, `HumanReview`, `Failed`, and `Cancelled`) so application workflows
  cannot accidentally remove the FSM paths required by the runtime supervisor.

## Common tool engineering rules

- Common tools must remain provider-neutral and domain-neutral. Business workflow, prompt, route,
  schema, or product-specific behavior belongs in a DomainPack or application surface.
- Declare strict input/output schemas, side-effect level, permission scope, timeout, audit behavior,
  and size/depth/result limits. Validate again inside handlers that can be called outside the
  governed runner.
- Treat caller search text as a literal unless the public contract explicitly declares a bounded
  regex feature. Reject invalid or unsafe schema patterns instead of evaluating them unchecked.
- Reject prototype-pollution keys and non-JSON values in generic data tools. Do not expose arbitrary
  shell, filesystem, network, environment, secret, or dynamic-code access through a utility tool.
- Preserve structured error codes through application adapters so FSM recovery can distinguish
  validation, policy, transient dependency, timeout, conflict, and uncertain side-effect failures.
