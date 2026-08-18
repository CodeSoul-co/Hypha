# 开发与发布流程

Hypha 只维护 `dev` 和 `main` 两个分支。

```text
dev  ──完整验证──>  main
```

`dev` 是日常开发、集成和发布候选分支。功能实现、Bug 修复、测试、文档、示例、依赖、工具链与发布准备都直接提交到 `dev`。

`main` 是稳定发布分支和文档部署来源，只接收完成全部验证的 `dev` 候选。

## 直接更新 dev

```bash
git fetch origin --prune
git switch dev
git pull --ff-only origin dev
```

直接在 `dev` 上完成目标集中的提交，推送前检查精确差异并运行适用门禁。

不再创建或维护 feature、fix、docs、chore、模块、Domain、Cache 或个人远端分支。模块边界由目录、评审、公共契约和测试保证，不再由分支名称保证。

## 同步到 main

精确的 `dev` 候选必须通过格式、lint、类型检查、构建、单元测试、包契约测试和集成测试。涉及运行时的发布还要验证 Cache 开启/关闭、Replay、Regression、DomainPack 加载与运行时冒烟路径。

验证完成后，将 `main` fast-forward 到同一个 `dev` 提交。正常情况下，每次发布完成时 `dev` 与 `main` 应指向同一提交。

## 已退役分支

`dev-merge`、`dev-domain-merge` 以及全部模块、Domain 和 Cache 分支只保留为历史引用，不再更新，也不参与开发、集成或发布。
