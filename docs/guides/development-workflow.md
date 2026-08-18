# Development Workflow

Hypha uses a conventional `dev` to `main` branch model. The current `dev` branch is the development integration branch, the full-system validation branch, and the release-candidate source that previously belonged to `dev-merge`.

```text
feature/* | fix/* | docs/* | chore/*
                  ↓
                 dev
                  ↓
                main
```

## Start work

Create short-lived branches from the latest `dev`:

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
git switch -c feature/<name>
```

Use `fix/*`, `docs/*`, or `chore/*` when those prefixes better describe the change. Module ownership is enforced through package boundaries, review, contracts, and tests rather than through permanent module branches.

## Merge into dev

Open focused pull requests into `dev`. A coherent cross-package feature may update multiple modules, but unrelated changes and broad mechanical formatting must remain separate.

Run the checks appropriate to the change before merging. Public package contract changes require `npm run test:packages`; API or runtime changes require integration tests.

## Release dev to main

Only a fully validated `dev` commit may enter `main`. The release candidate runs lint, typecheck, build, unit, package-contract, and integration gates, including Cache-enabled and Cache-disabled integration coverage.

After a non-fast-forward release merge creates a main-only merge commit, fast-forward `dev` to `main` so the next development cycle starts from the exact released state.

## Retired integration branches

`dev-merge` and `dev-domain-merge` are retired and no longer accept changes. The old module, Domain, and Cache branch ladder is not a required release path. Existing refs may remain read-only for historical traceability until maintainers separately archive them.
