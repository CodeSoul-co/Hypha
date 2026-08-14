# `@codesoul-co/hypha-skills`

`hypha-skills` 管理版本化指令资产，支持本地 Markdown、Registry、Dependency Lock、Policy Selection、渐进式 Context Loading 与供应链元数据。

```bash
npm install @codesoul-co/hypha-skills@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `SkillSpec` / `SkillRef` | 版本化元数据与引用 |
| `skillSpecDefinition` | Parser 与 JSON Schema |
| `SkillRegistry` | 注册和解析 Skill |
| `SkillSelector` | 在能力/Policy 约束下选择 |
| `SkillContextLoader` | 选择后加载完整指令/资产 |
| `LocalSkillLoader` | 读取受控本地目录 |
| `HttpsSkillRegistryClient` | 获取签名远程 Registry 条目 |
| `DefaultSkillPolicy` | 基础信任与 Activation 检查 |

## 注册 Skill

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

Selection 与 Loading 是刻意分开的：先加载小型索引/描述，在 Policy 下选中后，才加载完整正文和资产。

## Activation 流程

```text
Domain Pack Allow-list → 按 id/version 解析 Registry
→ Trust + Dependency Lock → Policy/Activation 决策
→ 渐进加载 → 记录 Effective Capability Snapshot
```

模型可以建议 Skill，但可信组合层决定它是否存在、兼容且允许加载。本地资产要防 Path Traversal；远程资产要验证签名、Hash、SBOM/Transparency 与依赖锁，不能让可变正文静默改变 Replay。

测试未知/禁用 Skill、版本锁、资产根目录、渐进加载以及 Tool 权限变化。
