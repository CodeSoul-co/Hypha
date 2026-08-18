# Development Workflow

Hypha maintains only `dev` and `main`.

```text
dev  ──full validation──>  main
```

`dev` is the active development, integration, and release-candidate branch. Implementation, fixes, tests, documentation, examples, dependencies, tooling, and release preparation are committed directly to `dev`.

`main` is the stable release branch. It receives only a fully validated `dev` candidate and drives the public documentation deployment.

## Update dev

Start by updating `dev`, then make and commit the change on that branch:

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
```

Keep commits focused, review the exact diff, and run the checks appropriate to the change before pushing `dev`.

Do not create or maintain feature, fix, documentation, chore, module, Domain, Cache, or personal remote branches. Temporary local branches or detached worktrees may be used for isolated inspection, but they do not enter the remote workflow.

## Synchronize dev to main

Only the exact `dev` candidate that passed formatting, lint, typecheck, build, unit, package-contract, and integration gates may update `main`. Runtime releases also verify Cache-enabled and Cache-disabled operation, Replay, Regression, DomainPack loading, and runtime smoke.

Prefer a fast-forward synchronization so `dev` and `main` point at the same validated commit:

```bash
git switch main
git pull --ff-only origin main
git merge --ff-only dev
git push origin main
```

## Retired branches

`dev-merge`, `dev-domain-merge`, and all module, Domain, and Cache branches are retired historical refs. They are not updated and are not part of development, integration, or release.

An urgent production correction may be committed directly to `main` only when waiting for the normal `dev` release is unsafe. The exact correction must then be synchronized immediately back to `dev`.
