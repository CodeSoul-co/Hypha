# Orbit API 对接文档

> 基于后端 `backend/OrbitAgent/` + 前端 `Orbit/` 代码分析生成
> 更新时间: 2026-05-11

---

## 一、基础信息

| 项目 | 值 |
|------|-----|
| **Base URL** | `http://127.0.0.1:3000/api/v1` |
| **认证方式** | JWT Bearer Token |
| **Dev Token** | `POST /dev/token` (无需认证，开发环境专用) |
| **Token 存储** | `UserDefaults` key: `orbit_access_token` / `orbit_refresh_token` |

### 标准响应格式

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "message": null
}

{
  "success": false,
  "data": null,
  "error": {
    "code": "AUTH_TOKEN_EXPIRED",
    "message": "Token has expired"
  }
}
```

### 错误码范围

| 范围 | 类别 |
|------|------|
| 1000-1099 | 认证相关 |
| 2000-2099 | 参数校验 |
| 3000-3099 | 资源操作 |
| 4000-4099 | LLM 模型 |
| 5000-5099 | 记忆存储 |
| 6000-6099 | Skills |
| 7000-7099 | Tools/MCP |
| 8000-8099 | 工作流 |
| 9000-9099 | 系统 |

---

## 二、前端已对接 API

### 2.1 认证相关

#### 获取开发 Token (开发环境)
```
POST /dev/token
认证: 无
响应: {
  "success": true,
  "data": {
    "token": "jwt-token-string",
    "user": { ... }
  }
}
```

#### 注册
```
POST /auth/register
认证: 无
请求体:
{
  "email": "user@example.com",       // email 和 phone 二选一
  "phone": "+1234567890",
  "username": "myuser",              // 必填，3-30位字母数字
  "password": "min6chars",           // 必填，最少6位
  "displayName": "My Name"           // 可选
}
响应: {
  "data": {
    "user": UserDTO,
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```

#### 登录
```
POST /auth/login
认证: 无
请求体: { "email": "...", "password": "..." }
响应: 同注册
```

#### 获取当前用户
```
GET /auth/me
认证: Bearer Token
响应: { "data": UserDTO }
```

#### 刷新 Token
```
POST /auth/refresh
认证: 无
请求体: { "refreshToken": "..." }
响应: { "data": { "accessToken": "...", "refreshToken": "..." } }
```

---

### 2.2 聊天 (SSE 流式)

#### 发起流式聊天
```
POST /chat/stream
认证: Bearer Token

请求体:
{
  "message": "你好",
  "sessionId": "sess_abc123",                        // 可选，不传自动生成
  "model": "Qwen/Qwen2.5-7B-Instruct",               // 可选
  "provider": "siliconflow",                          // 可选
  "agentId": "default"                                 // 可选
}

响应: Server-Sent Events 流
data: {"type":"content","content":"你"}
data: {"type":"content","content":"好"}
data: {"type":"content","content":"！"}
...
data: {"type":"done","content":"完整响应","sessionId":"sess_xxx","usage":{"inputTokens":12,"outputTokens":45,"totalTokens":57}}
```

#### 获取聊天历史 (Redis 临时)
```
GET /chat/:sessionId?limit=50
认证: Bearer Token
响应: { "data": [Message] }
```

#### 清除聊天会话
```
POST /chat/:sessionId/clear
认证: Bearer Token
```

#### 删除聊天会话
```
DELETE /chat/:sessionId
认证: Bearer Token
```

---

### 2.3 用量统计

#### 获取 Token 使用统计
```
GET /usage/stats?startDate=2026-01-01&endDate=2026-12-31
认证: Bearer Token
响应: {
  "data": {
    "summary": {
      "totalPromptTokens": 123,
      "totalCompletionTokens": 456,
      "totalTokens": 579,
      "totalCost": 0.05,
      "requestCount": 10
    },
    "byModel": [...],
    "daily": [...]
  }
}
```

---

## 三、完整 API 清单 (后端提供，前端暂未对接)

### 3.1 永久记忆 (Memory)

```
GET  /memory/permanent
      ?page=1&pageSize=20&agentId=xxx&isArchived=false&startDate=...&endDate=...
POST /memory/permanent
      { "sessionId": "sess_xxx", "title": "...", "modelId": "...", "modelProvider": "...",
        "agentId": "default", "tags": ["important"] }
GET  /memory/permanent/:id
PUT  /memory/permanent/:id
      { "title": "...", "tags": [...], "isArchived": true }
DELETE /memory/permanent/:id
GET  /memory/permanent/:id/messages
      ?page=1&pageSize=50&roles=user,assistant
GET  /memory/permanent/search/conversations?q=keyword&page=1&pageSize=20
GET  /memory/permanent/search/messages?q=keyword&page=1&pageSize=20
GET  /memory/stats
```

### 3.2 用户档案 & 任务 (Ritual / 仪式)

> 这是「此刻」和「回响之谷」的核心 API

```
# 用户档案
GET  /users/profile                     → UserProfileDTO
PUT  /users/profile
      { "bio", "phone", "gender", "birthday", "location", "website", "avatar", "isPublic", "tags" }
POST /users/profile/check-in             → { "streak": 5, "badges": [...] }
GET  /users/profile/stats                → { "totalRituals", "totalLikes", "checkInStreak", ... }
GET  /users/profile/token-stats
GET  /users/profile/token-usage/recent?limit=20&skip=0

# 任务 / 仪式 (Tasks / Rituals)
POST /users/tasks                        创建仪式
      {
        "sessionId": "sess_xxx",
        "ritualQuestion": "今天是什么日子？",
        "ritualSymbols": { "triggers": ["乾","坤"], "stages": ["起","承"] },
        "symbols": ["🌊","🔥"],
        "modelId": "claude-3-5-sonnet-20241022",
        "modelProvider": "anthropic",
        "responseContent": "完整响应内容...",
        "keyInsight": "核心洞察",
        "exploreQuestions": ["探索问题1", "..."],
        "rounds": [{ "role": "user", "content": "...", "timestamp": "..." }],
        "tokenUsage": { "inputTokens": 100, "outputTokens": 200, "totalTokens": 300, "cost": 0.003 }
      }
GET  /users/tasks
      ?page=1&limit=20&archived=false&sortBy=createdAt&sortOrder=desc
GET  /users/tasks/feed                   全局公开 feed（「回响之谷」）
      ?page=1&limit=20
GET  /users/tasks/:taskId
PUT  /users/tasks/:taskId
      { "responseContent", "keyInsight", "exploreQuestions", "rounds", "isArchived", "isShared" }
POST /users/tasks/:taskId/like
POST /users/tasks/:taskId/archive
DELETE /users/tasks/:taskId
```

### 3.3 模型管理

```
GET  /models?provider=anthropic
GET  /models/:id
GET  /models/providers/list
GET  /models/health
POST /models/switch                      { "provider": "openai", "model": "gpt-4o" }
GET  /models/defaults/current
```

### 3.4 Skills / Tools / Workflows

```
GET  /skills
GET  /skills/:id
PATCH /skills/:id                        { "enabled": false, "config": {...} }

GET  /tools
GET  /tools/mcp/servers
GET  /tools/mcp/servers/:id/health
POST /tools/mcp/servers/:id/connect
POST /tools/mcp/servers/:id/disconnect
POST /tools/execute                       { "name": "calculator", "params": { "expression": "2+2" } }
GET  /tools/mcp/tools

GET  /workflows
GET  /workflows/:name?version=1.0.0
POST /workflows/:name/execute            { "version": "1.0.0", "context": {...} }
GET  /workflows/executions/:executionId
POST /workflows/executions/:executionId/cancel
```

### 3.5 API Key 管理

```
POST /auth/api-key                        { "name": "...", "permissions": ["chat:read"], "expiresAt": "..." }
GET  /auth/api-keys
DELETE /auth/api-key/:keyId
POST /auth/logout
```

### 3.6 健康检查

```
GET  /health
GET  /status
GET  /status/page                         → HTML 状态页
```

---

## 四、数据模型 (DTO)

### UserDTO
```json
{
  "_id": "user_id",
  "email": "user@example.com",
  "username": "myuser",
  "displayName": "My Name",
  "preferences": {
    "defaultModel": "claude-3-5-sonnet-20241022",
    "defaultProvider": "anthropic",
    "temperature": 0.7
  },
  "isActive": true,
  "lastLoginAt": "2026-05-11T10:00:00Z",
  "isAdmin": false,
  "createdAt": "2026-01-01T00:00:00Z"
}
```

### SSEMessage (SSE 流事件)
```json
// content 片段
{ "type": "content", "content": "你好" }

// 完成
{ "type": "done", "content": "完整响应...", "sessionId": "sess_xxx", "usage": { "inputTokens": 12, "outputTokens": 45, "totalTokens": 57 } }

// 错误
{ "type": "error", "error": { "type": "RATE_LIMIT", "message": "Rate limit exceeded" } }
```

### ConversationTask (Ritual 任务)
```json
{
  "_id": "task_id",
  "userId": "user_id",
  "sessionId": "sess_xxx",
  "ritualQuestion": "今天是什么日子？",
  "ritualSymbols": {
    "triggers": ["乾", "坤"],
    "stages": ["起", "承", "转", "合"]
  },
  "symbols": ["🌊", "🔥"],
  "modelId": "claude-3-5-sonnet-20241022",
  "modelProvider": "anthropic",
  "responseContent": "...",
  "keyInsight": "...",
  "exploreQuestions": ["..."],
  "rounds": [
    { "role": "user", "content": "...", "timestamp": "..." },
    { "role": "assistant", "content": "...", "timestamp": "..." }
  ],
  "tokenUsage": {
    "inputTokens": 100,
    "outputTokens": 200,
    "totalTokens": 300,
    "cost": 0.003
  },
  "isShared": false,
  "isArchived": false,
  "likeCount": 0,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 五、SSE 流式聊天完整流程

```
1. 客户端 POST /chat/stream
   Header: Authorization: Bearer <token>
   Body: { "message": "...", "sessionId": "...", "model": "...", "provider": "..." }

2. 服务端返回 HTTP 200，开始流式传输

3. 客户端逐条接收 data: {"type":"content","content":"..."} 事件
   → 实时拼接 content 字段到 UI

4. 最后收到 data: {"type":"done", ...} 事件
   → 流结束，sessionId 可用于后续查询历史

5. 出错时收到 data: {"type":"error", "error": {...}} 事件
```

---

## 六、模型定价参考 (USD / Million Tokens)

| 模型 | Input | Output |
|------|-------|--------|
| claude-3-5-sonnet-20241022 | $3.00 | $15.00 |
| claude-3-5-haiku-20241022 | $0.80 | $4.00 |
| gpt-4o | $2.50 | $10.00 |
| gemini-2.0-flash | $0.00 | $0.10 |
| deepseek-chat | $0.27 | $1.10 |
| Qwen/Qwen2.5-7B-Instruct (SiliconFlow) | $0.00 | $0.00 |
| Ollama 本地模型 | $0.00 | $0.00 |

---

## 七、数据库 Collections

| Collection | 用途 |
|-----------|------|
| `users` | 用户账户 |
| `user_profiles` | 扩展档案 (bio, streak, badges) |
| `api_keys` | API Key 存储 (SHA-256 hash) |
| `conversations` | 永久会话元数据 |
| `messages` | 会话消息 |
| `conversation_tasks` | Ritual 任务记录 |
| `token_usages` | Token 用量记录 |