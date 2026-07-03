<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<h1 align="center">hypha</h1>

<p align="center">
  <strong>面向生产级 LLM Agent 应用的 harness-oriented agent system framework。</strong>
</p>

<p align="center">
  <a href="README.md">English</a> | 中文
</p>

## 概览

hypha 是一个基于 TypeScript 的 LLM Agent 系统框架，用于通过稳定 API 构建可运行、可追踪、可回放、可治理、可评估、可扩展的 agent system。

框架将可复用的 agent-system 契约和展示媒介分离。API Server、CLI 和 Web 客户端都应作为同一套框架模型的调用入口，而不是核心运行时行为的定义位置。

## 核心模型

hypha 采用 ReAct + FSM 执行模型。ReAct 描述 agent 的观察、推理、行动、观察结果和验证循环；FSM 将这个循环显式表达为状态、受 guard 控制的转移、重试、trace event 和终态结果。

运行时模型以事件为先：

- `DomainPack` 声明领域级定义，包括任务结构、WorkflowSpec、工具、MCP profile、memory profile、skill policy、权限、评估规则和输出契约。
- `Session` 是运行时的用户或业务上下文容器，可以引用某个 DomainPack，并按 SessionProfile 初始化 metadata。
- `Run` 是 Session 下的一次具体执行实例。
- `Event` 是最小事实记录。trace、replay、audit、regression 和 state projection 都从 events 派生。

## API 文档

公开文档以 API 和字段说明为主：

- [文档索引](docs/README.md)：架构、包边界、指南和 API reference 的入口。
- [HTTP API](docs/api/http.md)：REST endpoint、鉴权方式、请求体、响应结构和运行时约定。
- [Framework API](docs/api/framework.md)：DomainPack、Session、Run、Event、inference、memory、tool、MCP、skill 和 model provider 的 TypeScript 契约。
- [架构说明](docs/reference/architecture.md)：package 职责、harness 语义、runtime 模型和扩展边界。
- [Storage](docs/reference/storage.md)：document、messaging、relational、vector 和 artifact 存储在本地、自托管、托管云部署中的配置约定。
- [Domain Pack 指南](docs/guides/domain-packs.md)：声明 workflow、tool、memory、skill、policy、评估和输出契约的字段约定与示例。

服务启动后，也可以访问 `/api/v1/docs` 查看运行时路由索引。

## 运行模式

hypha 默认采用单用户运行模式，适合本地和自托管部署。系统会根据 `auth.singleUser` 准备 owner 账号，公开注册默认关闭；只有显式启用多用户模式时才开放注册。

内部 API 仍保留 `userId` 边界，用于 session、memory、token usage、API key 和 session queue。这样默认部署保持简单，同时保留多用户客户端需要的并发模型。

## 开发命令

```bash
npm install
npm run dev
npm run build
npm run typecheck
npm test
npm run lint
npm run cli -- --help
```

- `npm run dev`：使用 dotenv 启动 Express API server。
- `npm run build`：编译 framework packages、API server 和 CLI。
- `npm test`：运行 unit、package 和 integration 测试套件。
- `npm run cli -- --help`：查看 CLI client 命令。

## 支持协议

MIT
