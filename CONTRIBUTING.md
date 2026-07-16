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
