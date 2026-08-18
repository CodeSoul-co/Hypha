# Development and release workflow

Hypha uses a conventional two-branch release model. `dev` is the active integration branch, full-system validation branch, and release-candidate source. `main` contains stable releases and drives the public documentation deployment.

```text
feature/* | fix/* | docs/* | chore/*
                  ↓
                 dev
                  ↓
                main
```

## Start from dev

Create every ordinary change from the latest `dev`:

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
git switch -c feature/<name>
```

Choose `fix/*`, `docs/*`, or `chore/*` when appropriate. Keep pull requests focused, but a coherent behavior may cross package boundaries when its contracts, implementation, tests, and documentation need to change together.

## Validate and merge

Short-lived branches merge into `dev`. Module ownership is expressed by package boundaries, reviewers, public contracts, and tests—not by a chain of permanent module branches.

Before release, the exact `dev` candidate must pass formatting, lint, typecheck, build, unit tests, package-contract tests, and integration tests. Runtime releases also verify Cache-enabled and Cache-disabled operation, replay, regression, DomainPack loading, and the runtime smoke path.

## Release to main

Only validated `dev` commits merge into `main`. After the release merge, update `dev` to the exact `main` head before starting the next cycle.

`dev-merge` and `dev-domain-merge` are retired compatibility refs. The previous module/Domain/Cache branch ladder is no longer a required development or release path.
