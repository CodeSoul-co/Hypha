# `@codesoul-co/hypha-skills`

`hypha-skills` manages versioned instruction assets. It supports local Markdown skills, registry lookup, dependency locks, policy-based selection, progressive context loading and supply-chain metadata.

```bash
npm install @codesoul-co/hypha-skills@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `SkillSpec` / `SkillRef` | Versioned skill metadata and references |
| `skillSpecDefinition` | Parse a skill spec and export JSON Schema |
| `SkillRegistry` | Register and resolve available skills |
| `SkillSelector` | Select candidates under capability/policy constraints |
| `SkillContextLoader` | Load full instruction/assets after selection |
| `LocalSkillLoader` | Read controlled local skill directories |
| `HttpsSkillRegistryClient` | Retrieve signed remote registry entries |
| `DefaultSkillPolicy` | Baseline trust and activation checks |

## Register a skill

```ts
import {
  SkillRegistry,
  SkillSelector,
  skillSpecDefinition,
} from '@codesoul-co/hypha-skills';

const skill = skillSpecDefinition.parse({
  ...skillSpecDefinition.example,
  id: 'skill.release-research',
  version: '1.0.0',
  name: 'Release research',
});

const registry = new SkillRegistry();
registry.register(skill);

const selector = new SkillSelector(registry);
```

The selector is intentionally separate from loading. Keep the index/description small, select under policy, then load only the chosen instruction body and assets.

## Local Markdown layout

Use `loadSkillMarkdownFile` or `LocalSkillLoader` for controlled files. A skill commonly contains frontmatter/metadata, concise routing text, full instructions and optional referenced assets. Resolve relative assets inside the skill root and reject path traversal.

## Activation flow

```text
Domain Pack allow-list
  → registry resolution by id/version
  → trust + dependency-lock verification
  → policy/activation decision
  → progressive instruction and asset loading
  → capability snapshot recorded in trace
```

The model may propose a skill, but trusted composition decides whether it exists, is compatible and may be loaded.

## Remote registries

For remote skills, verify signatures, hashes, SBOM/transparency data and dependency locks before activation. Cache content by immutable identity; never let a mutable remote body silently change a replayed Run.

## Tests

- Unknown or disallowed skills are rejected.
- Version and dependency locks are honored.
- Untrusted assets cannot escape their root.
- Progressive loading omits unrelated skill bodies.
- Effective capability snapshots change when a skill adds/removes Tool access.

