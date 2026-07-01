import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { getLLMManager } from '../core/llm/LLMFactory';
import { checkDatabasesHealth } from '../services/database';

const router = Router();

function escapeHtml(str: string): string {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m] || m));
}

// ===================== AUTH =====================
const authEndpoints = [
  {
    method: 'POST',
    path: '/auth/register',
    desc: 'Register a new user',
    auth: 'None',
    body: `{
  "email": "user@example.com",
  "username": "username",
  "password": "your-password",
  "displayName": "User Name"
}`,
    response: `{
  "success": true,
  "data": {
    "user": { "id", "email", "username", "displayName", ... },
    "token": "jwt-token"
  }
}`,
  },
  {
    method: 'POST',
    path: '/auth/login',
    desc: 'Login with email and password',
    auth: 'None',
    body: `{
  "email": "user@example.com",
  "password": "your-password"
}`,
    response: `{
  "success": true,
  "data": {
    "user": { "id", "email", "username", ... },
    "token": "jwt-token"
  }
}`,
  },
  {
    method: 'GET',
    path: '/auth/me',
    desc: 'Get current user profile',
    auth: 'JWT Bearer Token',
    headers: `Authorization: Bearer <token>`,
    response: `{
  "success": true,
  "data": { "id", "email", "username", "displayName", "preferences", ... }
}`,
  },
  {
    method: 'PUT',
    path: '/auth/me',
    desc: 'Update current user profile',
    auth: 'JWT Bearer Token',
    body: `{
  "displayName": "New Name",
  "preferences": { "theme": "dark", "defaultModel": "claude-3-5-sonnet-20241022" }
}`,
    response: `{
  "success": true,
  "data": { "id", "email", "username", "preferences", ... }
}`,
  },
  {
    method: 'POST',
    path: '/auth/api-key',
    desc: 'Create a new API key',
    auth: 'JWT Bearer Token',
    body: `{
  "name": "My API Key",
  "permissions": ["chat:read", "chat:write"]
}`,
    response: `{
  "success": true,
  "data": {
    "key": "oa_xxxxxxxxxxxxxxxxxxxx",
    "name": "My API Key",
    "permissions": ["chat:read", "chat:write"]
  }
}`,
  },
  {
    method: 'GET',
    path: '/auth/api-keys',
    desc: 'List all API keys',
    auth: 'JWT Bearer Token',
    response: `{
  "success": true,
  "data": [{ "keyId", "name", "permissions", "lastUsedAt", "isActive", ... }]
}`,
  },
  {
    method: 'DELETE',
    path: '/auth/api-key/:keyId',
    desc: 'Delete an API key',
    auth: 'JWT Bearer Token',
    response: `{
  "success": true,
  "message": "API key deleted"
}`,
  },
  {
    method: 'POST',
    path: '/auth/refresh',
    desc: 'Refresh JWT token',
    auth: 'JWT Bearer Token',
    response: `{
  "success": true,
  "data": { "token": "new-jwt-token" }
}`,
  },
];

// ===================== CHAT =====================
const chatEndpoints = [
  {
    method: 'POST',
    path: '/chat',
    desc: 'Send a chat message',
    auth: 'JWT Bearer Token or X-API-Key',
    headers: `Authorization: Bearer <token>\nX-API-Key: <api-key>`,
    body: `{
  "sessionId": "sess_abc123",      // optional, auto-generated if not provided
  "message": "Hello, how are you?",
  "model": "claude-3-5-sonnet-20241022",  // optional, uses default
  "provider": "anthropic",         // optional
  "agentId": "default"             // optional
}`,
    response: `{
  "success": true,
  "data": {
    "sessionId": "sess_abc123",
    "messageId": "msg_xxx",
    "content": "Hello! I'm doing well...",
    "model": "claude-3-5-sonnet-20241022",
    "provider": "anthropic",
    "finishReason": "stop",
    "usage": {
      "inputTokens": 12,
      "outputTokens": 45,
      "totalTokens": 57
    },
    "toolCalls": []  // if tool calling is used
  }
}`,
  },
  {
    method: 'POST',
    path: '/chat/stream',
    desc: 'Stream a chat response (SSE)',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "sessionId": "sess_abc123",
  "message": "Write a story...",
  "model": "claude-3-5-sonnet-20241022",
  "provider": "anthropic"
}`,
    response: `data: {"type":"content","content":"Once "}
data: {"type":"content","content":"upon "}
...
data: {"type":"done","content":"Full response..."}`,
  },
  {
    method: 'GET',
    path: '/chat/:sessionId',
    desc: 'Get chat history from Redis',
    auth: 'JWT Bearer Token or X-API-Key',
    params: `sessionId: Chat session ID`,
    query: `?limit=50`,
    response: `{
  "success": true,
  "data": [
    { "id", "role": "user", "content", "timestamp", ... },
    { "id", "role": "assistant", "content", "timestamp", ... }
  ]
}`,
  },
  {
    method: 'POST',
    path: '/chat/:sessionId/clear',
    desc: 'Clear chat history (Redis temporary memory)',
    auth: 'JWT Bearer Token or X-API-Key',
    params: `sessionId: Chat session ID`,
    response: `{
  "success": true,
  "message": "Chat cleared"
}`,
  },
  {
    method: 'DELETE',
    path: '/chat/:sessionId',
    desc: 'Delete a chat session (Redis + MongoDB)',
    auth: 'JWT Bearer Token or X-API-Key',
    params: `sessionId: Chat session ID`,
    response: `{
  "success": true,
  "message": "Session deleted"
}`,
  },
];

// ===================== MEMORY =====================
const memoryEndpoints = [
  {
    method: 'GET',
    path: '/memory/temp/:sessionId',
    desc: 'Get temporary memory (Redis) for a session',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [{ "id", "role", "content", "timestamp", ... }]
}`,
  },
  {
    method: 'GET',
    path: '/memory/temp',
    desc: 'List all temporary sessions for current user',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [{ "sessionId", "messageCount", "lastMessage", ... }]
}`,
  },
  {
    method: 'DELETE',
    path: '/memory/temp/:sessionId',
    desc: 'Delete temporary memory for a session',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "message": "Session deleted"
}`,
  },
  {
    method: 'GET',
    path: '/memory/permanent',
    desc: 'List all permanent conversations (MongoDB)',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?page=1&limit=20&archived=false`,
    response: `{
  "success": true,
  "data": {
    "conversations": [{ "id", "sessionId", "title", "modelId", "createdAt", ... }],
    "pagination": { "total", "page", "limit" }
  }
}`,
  },
  {
    method: 'POST',
    path: '/memory/permanent',
    desc: 'Create a permanent conversation',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "sessionId": "sess_abc123",
  "title": "My Conversation",
  "modelId": "claude-3-5-sonnet-20241022",
  "modelProvider": "anthropic",
  "agentId": "default"
}`,
    response: `{
  "success": true,
  "data": { "id", "sessionId", "title", ... }
}`,
  },
  {
    method: 'GET',
    path: '/memory/permanent/:id',
    desc: 'Get a permanent conversation',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": { "id", "sessionId", "title", "messages", ... }
}`,
  },
  {
    method: 'GET',
    path: '/memory/permanent/:id/messages',
    desc: 'Get messages for a permanent conversation',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?limit=50&role=`,
    response: `{
  "success": true,
  "data": [{ "id", "role", "content", "tokens", "timestamp", ... }]
}`,
  },
  {
    method: 'PUT',
    path: '/memory/permanent/:id',
    desc: 'Update a permanent conversation (title, tags, archive)',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "title": "Updated Title",
  "tags": ["important", "project"],
  "isArchived": false
}`,
    response: `{
  "success": true,
  "data": { "id", "title", "tags", ... }
}`,
  },
  {
    method: 'DELETE',
    path: '/memory/permanent/:id',
    desc: 'Delete a permanent conversation',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "message": "Conversation deleted"
}`,
  },
  {
    method: 'GET',
    path: '/memory/permanent/search/conversations',
    desc: 'Search conversations by title/tags',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?q=project&tags=ai&page=1&limit=20`,
    response: `{
  "success": true,
  "data": { "conversations": [...], "pagination": { "total", "page", "limit" } }
}`,
  },
  {
    method: 'GET',
    path: '/memory/permanent/search/messages',
    desc: 'Search messages by content',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?q=error&conversationId=&page=1&limit=20`,
    response: `{
  "success": true,
  "data": {
    "messages": [{ "id", "content", "conversationId", "timestamp", ... }],
    "pagination": { "total", "page", "limit" }
  }
}`,
  },
  {
    method: 'GET',
    path: '/memory/stats',
    desc: 'Get memory statistics',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": {
    "temporary": { "sessionCount", "totalMessages", ... },
    "permanent": { "conversationCount", "messageCount", ... }
  }
}`,
  },
];

// ===================== MODELS =====================
const modelEndpoints = [
  {
    method: 'GET',
    path: '/models',
    desc: 'List all available models from all providers',
    auth: 'None',
    response: `{
  "success": true,
  "data": [
    {
      "id": "claude-3-5-sonnet-20241022",
      "name": "Claude 3.5 Sonnet",
      "provider": "anthropic",
      "displayName": "Claude 3.5 Sonnet",
      "description": "Most intelligent model...",
      "contextWindow": 200000,
      "supportedFeatures": { "streaming": true, "toolCalling": true, "vision": true },
      "pricing": { "input": 3, "output": 15, "currency": "USD" }
    },
    ...
  ]
}`,
  },
  {
    method: 'GET',
    path: '/models/:id',
    desc: 'Get details of a specific model',
    auth: 'None',
    response: `{
  "success": true,
  "data": { "id", "name", "provider", "contextWindow", "features", "pricing" }
}`,
  },
  {
    method: 'GET',
    path: '/models/providers/list',
    desc: 'List all LLM providers',
    auth: 'None',
    response: `{
  "success": true,
  "data": [
    { "name": "anthropic", "enabled": true, "modelCount": 4 },
    { "name": "openai", "enabled": true, "modelCount": 4 },
    ...
  ]
}`,
  },
  {
    method: 'GET',
    path: '/models/defaults/current',
    desc: 'Get current default model settings',
    auth: 'JWT Bearer Token',
    response: `{
  "success": true,
  "data": { "defaultModel": "claude-3-5-sonnet-20241022", "defaultProvider": "anthropic", "temperature": 1.0 }
}`,
  },
  {
    method: 'POST',
    path: '/models/switch',
    desc: 'Switch default model for user',
    auth: 'JWT Bearer Token',
    body: `{
  "model": "gpt-4o",
  "provider": "openai"
}`,
    response: `{
  "success": true,
  "data": { "defaultModel": "gpt-4o", "defaultProvider": "openai" }
}`,
  },
  {
    method: 'GET',
    path: '/models/health',
    desc: 'Health check all LLM providers',
    auth: 'None',
    response: `{
  "success": true,
  "data": {
    "anthropic": true,
    "openai": true,
    "google": false,
    "ollama": false
  }
}`,
  },
];

// ===================== SKILLS =====================
const skillEndpoints = [
  {
    method: 'GET',
    path: '/skills',
    desc: 'List all available skills',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [
    {
      "id": "summarizer",
      "name": "Text Summarizer",
      "description": "Summarizes long text...",
      "trigger": "/summarize",
      "enabled": true
    },
    ...
  ]
}`,
  },
  {
    method: 'GET',
    path: '/skills/:id',
    desc: 'Get skill details',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": { "id", "name", "description", "config", "enabled" }
}`,
  },
  {
    method: 'PATCH',
    path: '/skills/:id',
    desc: 'Update skill (enable/disable/config)',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "enabled": false,
  "config": { "maxLength": 500 }
}`,
    response: `{
  "success": true,
  "data": { "id", "name", "enabled", "config" }
}`,
  },
];

// ===================== TOOLS =====================
const toolEndpoints = [
  {
    method: 'GET',
    path: '/tools',
    desc: 'List all available tools',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [
    {
      "name": "calculator",
      "description": "Performs mathematical calculations",
      "source": "local"
    },
    ...
  ]
}`,
  },
  {
    method: 'GET',
    path: '/tools/mcp/servers',
    desc: 'List all MCP server configurations',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [{ "id", "name", "url", "status", "toolCount" }]
}`,
  },
  {
    method: 'GET',
    path: '/tools/mcp/servers/:id/health',
    desc: 'Check MCP server health',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": { "status": "healthy", "latencyMs": 45 }
}`,
  },
  {
    method: 'POST',
    path: '/tools/mcp/servers/:id/connect',
    desc: 'Connect to an MCP server',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": { "status": "connected", "tools": [...] }
}`,
  },
  {
    method: 'POST',
    path: '/tools/mcp/servers/:id/disconnect',
    desc: 'Disconnect from an MCP server',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "message": "Disconnected"
}`,
  },
  {
    method: 'POST',
    path: '/tools/execute',
    desc: 'Execute a tool directly',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "toolName": "calculator",
  "input": { "expression": "2 + 2" }
}`,
    response: `{
  "success": true,
  "data": { "result": 4 }
}`,
  },
  {
    method: 'GET',
    path: '/tools/mcp/tools',
    desc: 'List all tools from connected MCP servers',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [{ "name", "description", "inputSchema", "serverId" }]
}`,
  },
];

// ===================== WORKFLOWS =====================
const workflowEndpoints = [
  {
    method: 'GET',
    path: '/workflows',
    desc: 'List all available workflows',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [
    {
      "name": "data-analysis",
      "description": "Analyzes data from multiple sources",
      "steps": 3,
      "enabled": true
    },
    ...
  ]
}`,
  },
  {
    method: 'GET',
    path: '/workflows/:name',
    desc: 'Get workflow details',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": { "name", "description", "steps", "variables" }
}`,
  },
  {
    method: 'POST',
    path: '/workflows/:name/execute',
    desc: 'Execute a workflow',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "variables": { "input": "data.csv" },
  "sessionId": "sess_abc123"
}`,
    response: `{
  "success": true,
  "data": {
    "executionId": "exec_xxx",
    "status": "completed",
    "result": { ... }
  }
}`,
  },
  {
    method: 'GET',
    path: '/workflows/executions/:executionId',
    desc: 'Get workflow execution status',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": {
    "executionId": "exec_xxx",
    "status": "completed",
    "steps": [{ "name", "status", "result", "duration" }],
    "totalDuration": 5000
  }
}`,
  },
  {
    method: 'POST',
    path: '/workflows/executions/:executionId/cancel',
    desc: 'Cancel a running workflow',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "message": "Execution cancelled"
}`,
  },
  {
    method: 'POST',
    path: '/workflows',
    desc: 'Create a new workflow',
    auth: 'JWT Bearer Token or X-API-Key',
    body: `{
  "name": "my-workflow",
  "description": "My custom workflow",
  "steps": [{ "name": "step1", "action": "chat", "params": { ... } }]
}`,
    response: `{
  "success": true,
  "data": { "name", "description", "enabled" }
}`,
  },
  {
    method: 'DELETE',
    path: '/workflows/:name',
    desc: 'Delete a workflow',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "message": "Workflow deleted"
}`,
  },
];

// ===================== USAGE (TOKEN TRACKING) =====================
const usageEndpoints = [
  {
    method: 'GET',
    path: '/usage/stats',
    desc: 'Get token usage statistics',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?startDate=2026-01-01&endDate=2026-12-31`,
    response: `{
  "success": true,
  "data": {
    "summary": {
      "totalPromptTokens": 50000,
      "totalCompletionTokens": 120000,
      "totalTokens": 170000,
      "totalCost": 2.45,
      "requestCount": 250
    },
    "byModel": [
      {
        "modelId": "claude-3-5-sonnet-20241022",
        "modelProvider": "anthropic",
        "totalTokens": 170000,
        "totalCost": 2.25,
        "requestCount": 200
      }
    ],
    "daily": [
      {
        "date": "2026-04-03",
        "totalTokens": 5000,
        "totalCost": 0.075,
        "requestCount": 25
      }
    ]
  }
}`,
  },
  {
    method: 'GET',
    path: '/usage/recent',
    desc: 'Get recent token usage records',
    auth: 'JWT Bearer Token or X-API-Key',
    query: `?limit=50&skip=0`,
    response: `{
  "success": true,
  "data": [
    {
      "modelId": "claude-3-5-sonnet-20241022",
      "modelProvider": "anthropic",
      "promptTokens": 25,
      "completionTokens": 150,
      "totalTokens": 175,
      "totalCost": 0.00225,
      "endpoint": "/chat",
      "requestType": "chat",
      "createdAt": "2026-04-03T10:00:00Z"
    }
  ],
  "pagination": { "limit": 50, "skip": 0 }
}`,
  },
  {
    method: 'GET',
    path: '/usage/conversation/:conversationId',
    desc: 'Get token usage for a specific conversation',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": {
    "records": [...],
    "totals": {
      "promptTokens": 1000,
      "completionTokens": 3000,
      "totalTokens": 4000,
      "totalCost": 0.045
    }
  }
}`,
  },
  {
    method: 'GET',
    path: '/usage/pricing',
    desc: 'Get model pricing reference',
    auth: 'JWT Bearer Token or X-API-Key',
    response: `{
  "success": true,
  "data": [
    { "modelId": "claude-3-5-sonnet-20241022", "inputPricePerM": 3, "outputPricePerM": 15, "currency": "USD" },
    { "modelId": "gpt-4o", "inputPricePerM": 2.5, "outputPricePerM": 10, "currency": "USD" }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/usage/page',
    desc: 'Token usage dashboard (HTML page)',
    auth: 'None (optional ?userId=xxx)',
    response: `HTML page with usage stats, charts, and recent records`,
  },
];

// ===================== STATUS =====================
const statusEndpoints = [
  {
    method: 'GET',
    path: '/health',
    desc: 'Basic health check',
    auth: 'None',
    response: `{
  "success": true,
  "data": { "status": "healthy", "timestamp", "uptime" }
}`,
  },
  {
    method: 'GET',
    path: '/status',
    desc: 'Service status with all components',
    auth: 'None',
    response: `{
  "success": true,
  "data": {
    "service": "OrbitAgent",
    "version": "1.0.0",
    "databases": { "mongodb": { "status": "connected" }, "redis": { "status": "connected" } },
    "llm": { "health": { "anthropic": true, ... }, "availableProviders": [...], "modelCount": 15 }
  }
}`,
  },
  {
    method: 'GET',
    path: '/status/page',
    desc: 'Status dashboard (HTML page)',
    auth: 'None',
    response: `HTML page with service status, models, and endpoints`,
  },
];

function renderEndpoints(endpoints: any[], _accentColor: string): string {
  return endpoints.map((ep: any) => `
    <div class="endpoint-card">
      <div class="endpoint-header">
        <span class="method ${ep.method.toLowerCase()}">${ep.method}</span>
        <span class="endpoint-path">${escapeHtml(ep.path)}</span>
        ${ep.auth !== 'None' ? `<span class="auth-badge">${escapeHtml(ep.auth)}</span>` : ''}
      </div>
      <div class="endpoint-body">
        <div class="endpoint-desc">${escapeHtml(ep.desc)}</div>
        ${ep.params ? `<div class="detail"><strong>Path Params:</strong> ${escapeHtml(ep.params)}</div>` : ''}
        ${ep.query ? `<div class="detail"><strong>Query:</strong> <code>${escapeHtml(ep.query)}</code></div>` : ''}
        ${ep.headers ? `<div class="detail"><strong>Headers:</strong> <pre>${escapeHtml(ep.headers)}</pre></div>` : ''}
        ${ep.body ? `<div class="detail"><strong>Body:</strong> <pre><code>${escapeHtml(ep.body)}</code></pre></div>` : ''}
        ${ep.response ? `<div class="detail"><strong>Response:</strong> <pre><code>${escapeHtml(ep.response)}</code></pre></div>` : ''}
      </div>
    </div>
  `).join('');
}

// ===================== API DOCS PAGE =====================
router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const dbHealth = await checkDatabasesHealth();
  const llmManager = getLLMManager();
  const models = await llmManager.listAllModels();

  const baseUrl = '/api/v1';
  const timestamp = new Date().toISOString();

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OrbitAgent - API Documentation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0e17; color: #e6edf3; min-height: 100vh; }
    .sidebar { position: fixed; top: 0; left: 0; width: 260px; height: 100vh; background: #111827; border-right: 1px solid #1f2937; overflow-y: auto; padding: 20px 0; z-index: 100; }
    .sidebar-logo { padding: 0 20px 24px; border-bottom: 1px solid #1f2937; margin-bottom: 16px; }
    .sidebar-logo h1 { font-size: 1.4em; background: linear-gradient(90deg, #00d9ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .sidebar-logo p { font-size: 0.8em; color: #6b7280; margin-top: 4px; }
    .nav-group { padding: 0 12px; margin-bottom: 8px; }
    .nav-group-title { font-size: 0.7em; text-transform: uppercase; letter-spacing: 0.1em; color: #6b7280; padding: 8px 8px 4px; font-weight: 600; }
    .nav-link { display: block; padding: 6px 12px; color: #9ca3af; text-decoration: none; font-size: 0.88em; border-radius: 6px; transition: all 0.15s; }
    .nav-link:hover { background: #1f2937; color: #e6edf3; }
    .nav-link.active { background: rgba(0,217,255,0.1); color: #00d9ff; }
    .main { margin-left: 260px; padding: 40px 48px; max-width: 1000px; }
    .hero { margin-bottom: 48px; }
    .hero h1 { font-size: 2.5em; margin-bottom: 12px; background: linear-gradient(90deg, #00d9ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { color: #9ca3af; font-size: 1.1em; line-height: 1.6; }
    .hero-meta { display: flex; gap: 24px; margin-top: 20px; }
    .hero-meta span { display: flex; align-items: center; gap: 6px; color: #6b7280; font-size: 0.85em; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; }
    .status-dot.green { background: #00ff88; box-shadow: 0 0 6px #00ff88; }
    .status-dot.red { background: #ff4757; }
    .section { margin-bottom: 56px; }
    .section-title { font-size: 1.5em; color: #00d9ff; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #1f2937; display: flex; align-items: center; gap: 10px; }
    .section-title .count { font-size: 0.7em; background: rgba(0,217,255,0.15); padding: 3px 10px; border-radius: 12px; color: #00d9ff; }
    .endpoint-card { background: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px; overflow: hidden; transition: border-color 0.2s; }
    .endpoint-card:hover { border-color: #374151; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: rgba(255,255,255,0.02); border-bottom: 1px solid #1f2937; }
    .method { padding: 4px 10px; border-radius: 5px; font-size: 0.78em; font-weight: 700; min-width: 56px; text-align: center; }
    .method.get { background: rgba(0,217,255,0.15); color: #00d9ff; }
    .method.post { background: rgba(0,255,136,0.15); color: #00ff88; }
    .method.put { background: rgba(255,193,7,0.15); color: #ffc107; }
    .method.patch { background: rgba(255,193,7,0.15); color: #ffc107; }
    .method.delete { background: rgba(255,71,87,0.15); color: #ff4757; }
    .endpoint-path { font-family: 'SF Mono', 'Fira Code', monospace; color: #e6edf3; font-size: 0.9em; flex: 1; }
    .auth-badge { font-size: 0.72em; padding: 3px 8px; border-radius: 4px; background: rgba(139,92,246,0.15); color: #a78bfa; }
    .endpoint-body { padding: 16px 18px; }
    .endpoint-desc { color: #9ca3af; margin-bottom: 12px; font-size: 0.9em; }
    .detail { margin-top: 10px; }
    .detail strong { color: #6b7280; font-size: 0.8em; text-transform: uppercase; letter-spacing: 0.05em; }
    .detail pre { background: #0a0e17; border: 1px solid #1f2937; border-radius: 8px; padding: 12px 14px; margin-top: 6px; overflow-x: auto; font-size: 0.8em; line-height: 1.6; color: #a5d6ff; }
    .detail code { color: #a5d6ff; }
    .quick-start { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 24px; margin-bottom: 40px; }
    .quick-start h3 { color: #00d9ff; margin-bottom: 16px; }
    .quick-start pre { background: #0a0e17; border: 1px solid #1f2937; border-radius: 8px; padding: 16px; font-size: 0.85em; line-height: 1.8; overflow-x: auto; color: #a5d6ff; }
    .quick-start pre .comment { color: #6b7280; }
    .quick-start pre .string { color: #a5d6ff; }
    .quick-start pre .keyword { color: #ff7b72; }
    .footer { text-align: center; padding: 40px 0; color: #4b5563; border-top: 1px solid #1f2937; margin-top: 60px; font-size: 0.85em; }
    .toc { background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 20px 24px; margin-bottom: 40px; }
    .toc h3 { color: #00d9ff; margin-bottom: 16px; }
    .toc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 8px; }
    .toc-item { display: flex; align-items: center; gap: 8px; padding: 6px 0; }
    .toc-item a { color: #9ca3af; text-decoration: none; font-size: 0.85em; }
    .toc-item a:hover { color: #00d9ff; }
    .search-bar { margin-bottom: 32px; }
    .search-bar input { width: 100%; background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 12px 16px; color: #e6edf3; font-size: 0.95em; outline: none; transition: border-color 0.2s; }
    .search-bar input:focus { border-color: #00d9ff; }
    .search-bar input::placeholder { color: #4b5563; }
    .hidden { display: none !important; }
    .no-results { text-align: center; padding: 40px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="sidebar">
    <div class="sidebar-logo">
      <h1>OrbitAgent</h1>
      <p>API Documentation v1.0.0</p>
    </div>
    <div class="nav-group">
      <div class="nav-group-title">Overview</div>
      <a href="#overview" class="nav-link active" data-section="overview">Overview</a>
      <a href="#quick-start" class="nav-link" data-section="quick-start">Quick Start</a>
      <a href="#authentication" class="nav-link" data-section="authentication">Authentication</a>
    </div>
    <div class="nav-group">
      <div class="nav-group-title">Endpoints</div>
      <a href="#auth" class="nav-link" data-section="auth">Auth <span class="count">${authEndpoints.length}</span></a>
      <a href="#chat" class="nav-link" data-section="chat">Chat <span class="count">${chatEndpoints.length}</span></a>
      <a href="#memory" class="nav-link" data-section="memory">Memory <span class="count">${memoryEndpoints.length}</span></a>
      <a href="#models" class="nav-link" data-section="models">Models <span class="count">${modelEndpoints.length}</span></a>
      <a href="#skills" class="nav-link" data-section="skills">Skills <span class="count">${skillEndpoints.length}</span></a>
      <a href="#tools" class="nav-link" data-section="tools">Tools <span class="count">${toolEndpoints.length}</span></a>
      <a href="#workflows" class="nav-link" data-section="workflows">Workflows <span class="count">${workflowEndpoints.length}</span></a>
      <a href="#usage" class="nav-link" data-section="usage">Usage <span class="count">${usageEndpoints.length}</span></a>
      <a href="#status" class="nav-link" data-section="status">Status <span class="count">${statusEndpoints.length}</span></a>
    </div>
  </div>

  <div class="main">
    <div class="hero" id="overview">
      <h1>OrbitAgent API</h1>
      <p>A modular AI agent backend service with multi-LLM support, temporary and permanent memory, tool calling, workflows, and comprehensive token usage tracking.</p>
      <div class="hero-meta">
        <span><div class="status-dot ${dbHealth.mongodb ? 'green' : 'red'}"></div> MongoDB ${dbHealth.mongodb ? 'Connected' : 'Disconnected'}</span>
        <span><div class="status-dot ${dbHealth.redis ? 'green' : 'red'}"></div> Redis ${dbHealth.redis ? 'Connected' : 'Disconnected'}</span>
        <span>${models.length} Models Available</span>
        <span>Base: <code>http://localhost:3000${baseUrl}</code></span>
      </div>
    </div>

    <div class="toc" id="toc">
      <h3>Table of Contents</h3>
      <div class="toc-grid">
        <div class="toc-item"><span class="method post" style="font-size:0.7em;padding:2px 6px">POST</span><a href="#auth">Auth</a></div>
        <div class="toc-item"><span class="method post" style="font-size:0.7em;padding:2px 6px">POST</span><a href="#chat">Chat</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#memory">Memory</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#models">Models</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#skills">Skills</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#tools">Tools</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#workflows">Workflows</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#usage">Usage</a></div>
        <div class="toc-item"><span class="method get" style="font-size:0.7em;padding:2px 6px">GET</span><a href="#status">Status</a></div>
      </div>
    </div>

    <div class="search-bar">
      <input type="text" id="search" placeholder="Search endpoints... (e.g. /chat, token, model)">
    </div>

    <div class="quick-start" id="quick-start">
      <h3>Quick Start</h3>
      <pre><code><span class="comment"># 1. Register a user</span>
<span class="keyword">POST</span> ${baseUrl}/auth/register
{
  "email": "user@example.com",
  "username": "myuser",
  "password": "mypassword"
}

<span class="comment"># 2. Login to get JWT token</span>
<span class="keyword">POST</span> ${baseUrl}/auth/login
{
  "email": "user@example.com",
  "password": "mypassword"
}

<span class="comment"># 3. Send a chat message</span>
<span class="keyword">POST</span> ${baseUrl}/chat
<span class="string">Authorization: Bearer &lt;token&gt;</span>
{
  "message": "Hello!",
  "model": "claude-3-5-sonnet-20241022"
}

<span class="comment"># 4. Check token usage</span>
<span class="keyword">GET</span> ${baseUrl}/usage/stats
<span class="string">Authorization: Bearer &lt;token&gt;</span></code></pre>
    </div>

    <div class="section" id="authentication">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        Authentication
        <span class="count">2 methods</span>
      </div>
      <p style="color:#9ca3af;margin-bottom:20px;font-size:0.9em;">Two authentication methods are supported. For browser-based apps, use JWT Bearer tokens. For programmatic access, use API keys.</p>
      <div class="quick-start" style="margin-bottom:20px;">
        <h3>JWT Bearer Token</h3>
        <pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</code></pre>
        <h3 style="margin-top:16px;">API Key</h3>
        <pre><code>X-API-Key: oa_xxxxxxxxxxxxxxxxxxxxxxxxxxxx</code></pre>
        <p style="color:#6b7280;font-size:0.85em;margin-top:12px;">Get your API key via <code>POST /auth/api-key</code></p>
      </div>
    </div>

    <div class="section" id="auth">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Auth
        <span class="count">${authEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(authEndpoints, '#00d9ff')}
    </div>

    <div class="section" id="chat">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        Chat
        <span class="count">${chatEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(chatEndpoints, '#00ff88')}
    </div>

    <div class="section" id="memory">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l8 5 8-5M4 7l8-5 8 5"/></svg>
        Memory
        <span class="count">${memoryEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(memoryEndpoints, '#a78bfa')}
    </div>

    <div class="section" id="models">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        Models
        <span class="count">${modelEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(modelEndpoints, '#f59e0b')}
    </div>

    <div class="section" id="skills">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
        Skills
        <span class="count">${skillEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(skillEndpoints, '#ec4899')}
    </div>

    <div class="section" id="tools">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
        Tools
        <span class="count">${toolEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(toolEndpoints, '#14b8a6')}
    </div>

    <div class="section" id="workflows">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
        Workflows
        <span class="count">${workflowEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(workflowEndpoints, '#f97316')}
    </div>

    <div class="section" id="usage">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
        Usage & Token Tracking
        <span class="count">${usageEndpoints.length} endpoints</span>
      </div>
      <p style="color:#9ca3af;margin-bottom:20px;font-size:0.9em;">Track prompt tokens, completion tokens, and costs in USD. Token usage is automatically recorded on every chat request.</p>
      ${renderEndpoints(usageEndpoints, '#22c55e')}
    </div>

    <div class="section" id="status">
      <div class="section-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00d9ff" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        Status & Health
        <span class="count">${statusEndpoints.length} endpoints</span>
      </div>
      ${renderEndpoints(statusEndpoints, '#6366f1')}
    </div>

    <div class="footer">
      <p>OrbitAgent API Documentation | Generated at ${timestamp}</p>
      <p style="margin-top:8px;">All endpoints return JSON. Base URL: <code>http://localhost:3000${baseUrl}</code></p>
      <p style="margin-top:4px;"><a href="${baseUrl}/status/page" style="color:#00d9ff;text-decoration:none;">Status Page</a> | <a href="${baseUrl}/usage/page" style="color:#00d9ff;text-decoration:none;">Token Usage Page</a></p>
    </div>
  </div>

  <script>
    // Search functionality
    const searchInput = document.getElementById('search');
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.endpoint-card');
    const navLinks = document.querySelectorAll('.nav-link');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      let hasResults = false;

      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = query === '' || text.includes(query);
        card.classList.toggle('hidden', !match);
        if (match) hasResults = true;
      });

      // Show/hide sections based on visible cards
      sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.endpoint-card:not(.hidden)');
        const noResults = section.querySelector('.no-results');
        if (visibleCards.length === 0) {
          if (!noResults) {
            const msg = document.createElement('div');
            msg.className = 'no-results';
            msg.textContent = 'No matching endpoints';
            section.appendChild(msg);
          }
        } else {
          if (noResults) noResults.remove();
        }
      });
    });

    // Smooth scroll navigation
    document.querySelectorAll('.nav-link, .toc-item a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update active nav
          navLinks.forEach(l => l.classList.remove('active'));
          document.querySelectorAll('.nav-link[data-section="' + link.getAttribute('href').slice(1) + '"]').forEach(l => l.classList.add('active'));
        }
      });
    });

    // Highlight active section on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          document.querySelectorAll('.nav-link[data-section="' + entry.target.id + '"]').forEach(l => l.classList.add('active'));
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}));

// JSON API documentation endpoint
router.get('/json', asyncHandler(async (_req: Request, res: Response) => {
  const llmManager = getLLMManager();
  const models = await llmManager.listAllModels();

  const docs = {
    info: {
      name: 'OrbitAgent API',
      version: '1.0.0',
      description: 'Modular AI Agent Backend Service',
      baseUrl: '/api/v1',
    },
    models: models.map(m => ({
      id: m.id,
      name: m.name,
      provider: m.provider,
      contextWindow: m.contextWindow,
      features: m.supportedFeatures,
      pricing: m.pricing,
    })),
    endpoints: {
      auth: authEndpoints,
      chat: chatEndpoints,
      memory: memoryEndpoints,
      models: modelEndpoints,
      skills: skillEndpoints,
      tools: toolEndpoints,
      workflows: workflowEndpoints,
      usage: usageEndpoints,
      status: statusEndpoints,
    },
  };

  res.json({ success: true, data: docs });
}));

export default router;
