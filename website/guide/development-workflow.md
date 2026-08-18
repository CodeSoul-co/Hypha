# Development and release workflow

Hypha maintains only `dev` and `main`.

```text
dev  ──full validation──>  main
```

`dev` is the active development, integration, and release-candidate branch. Implementation, fixes, tests, documentation, examples, dependencies, tooling, and release preparation are committed directly to `dev`.

`main` is the stable release branch and documentation deployment source. It receives only a fully validated `dev` candidate.

## Work directly on dev

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
```

Make focused commits directly on `dev`, inspect their exact diff, and run the relevant checks before pushing.

Do not create or maintain additional remote work branches. Module ownership is enforced through package boundaries, review, public contracts, and tests—not branch names.

## Synchronize to main

The exact `dev` candidate must pass formatting, lint, typecheck, build, unit tests, package-contract tests, and integration tests. Runtime releases also verify Cache-enabled and Cache-disabled operation, Replay, Regression, DomainPack loading, and runtime smoke.

After validation, fast-forward `main` to the same `dev` commit. `dev` and `main` should normally point at the same commit immediately after release.

## Retired branches

`dev-merge`, `dev-domain-merge`, and all module, Domain, and Cache branches are retired historical refs. They receive no updates and are not part of development or release.
