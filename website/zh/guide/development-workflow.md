# 开发与发布流程

Hypha 采用常规的双分支发布模型。`dev` 是当前开发集成分支、完整系统验证分支和发布候选来源；`main` 保存稳定发布版本并驱动公共文档部署。

```text
feature/* | fix/* | docs/* | chore/*
                  ↓
                 dev
                  ↓
                main
```

## 从 dev 开始

普通变更都从最新 `dev` 创建短期分支：

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
git switch -c feature/<name>
```

根据内容也可以使用 `fix/*`、`docs/*` 或 `chore/*`。PR 应保持目标集中；当一个完整行为确实需要同时修改契约、实现、测试和文档时，可以跨多个 package，不再要求拆到永久模块分支逐级合并。

## 验证并合入 dev

短期工作分支统一合入 `dev`。模块所有权通过目录边界、评审、公共契约和测试保证，不再通过长期模块分支链保证。

发布前，精确的 `dev` 候选必须通过格式、lint、类型检查、构建、单元测试、包契约测试和集成测试。涉及运行时的发布还要验证 Cache 开启/关闭、Replay、Regression、DomainPack 加载与运行时冒烟路径。

## 发布到 main

只有完成验证的 `dev` 提交可以进入 `main`。发布合并完成后，应让 `dev` 追平 `main` 的精确头提交，再开始下一个开发周期。

`dev-merge` 与 `dev-domain-merge` 已退役，只作为兼容历史引用保留。原来的模块、Domain、Cache 多级分支链不再是开发或发布的必经路径。
