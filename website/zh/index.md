---
layout: home

hero:
  name: 'HYPHA 1.0'
  text: '使用可组合模块搭建可治理的 Agent 系统。'
  tagline: Event-first ReAct + FSM 执行、生产级 Harness、Domain Pack、回放、策略与 Provider-neutral Memory，共 15 个独立 npm 包。
  image:
    src: /hypha-logo.png
    alt: Hypha
  actions:
    - theme: brand
      text: 开始搭建
      link: /zh/guide/getting-started
    - theme: alt
      text: 查看模块
      link: /zh/packages/
    - theme: alt
      text: 完整 API
      link: /zh/api/
    - theme: alt
      text: 查看 v1.0.1
      link: https://github.com/CodeSoul-co/Hypha/releases/tag/v1.0.1

features:
  - icon: '01'
    title: Spec 先于 Provider
    details: 版本化 TypeScript 契约与运行时校验，使应用代码不与基础设施实现绑定。
    link: /zh/packages/core
  - icon: '02'
    title: ReAct + FSM 执行
    details: 将受保护的 Harness 生命周期与应用自己定义的工作流拓扑明确分离。
    link: /zh/guide/fsm-control
  - icon: '03'
    title: 所有副作用均受治理
    details: Tool、MCP、Memory 与外部写入统一经过 Policy、Trace 和 Harness 边界。
    link: /zh/packages/tools
  - icon: '04'
    title: Event 始终是事实来源
    details: Session 是产品视图；回放与评估均从 Event 流派生状态。
    link: /zh/guide/architecture
  - icon: '05'
    title: Local-first 组合
    details: 从 SQLite、文件和确定性适配器开始，之后可替换 Provider 而不迁移产品契约。
    link: /zh/packages/adapters-local
  - icon: '06'
    title: 可运行功能示例
    details: 运行 7 个独立功能入口，覆盖全部 15 个包，编译 Domain Pack 并提交持久化命令。
    link: /zh/guide/examples
---

<div class="version-strip">
  <span>RELEASE v1.0.1</span>
  <span>15 个公开包</span>
  <span>NODE ≥ 22</span>
  <span>TYPESCRIPT</span>
</div>

## 框架边界，而不是应用模板

Hypha 提供契约与执行边界；应用提供 Domain Pack、Prompt、Workflow、能力选择、Policy 与部署覆盖配置。[完整 API 参考](/zh/api/)记录全部公共导出、声明、参数、返回值与成员，[可运行示例](/zh/guide/examples)展示这些 API 在应用代码中的用法。
