import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { getLLMManager } from '../core/llm/LLMFactory';
import { checkDatabasesHealth } from '../services/database';

const router = Router();

function escapeHtml(str: string): string {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, m => map[m] || m);
}

router.get('/page', asyncHandler(async (_req: Request, res: Response) => {
  const dbHealth = await checkDatabasesHealth();
  const llmManager = getLLMManager();
  const llmHealth = await llmManager.healthCheck();
  const models = await llmManager.listAllModels();

  let providersHtml = '';
  let modelsHtml = '';

  for (const [name, healthy] of Object.entries(llmHealth)) {
    const providerModels = models.filter(m => m.provider === name);
    const status = healthy ? 'healthy' : 'unavailable';
    const statusBadge = healthy ? '<span class="badge success">healthy</span>' : '<span class="badge warning">unavailable</span>';

    providersHtml += `<div style="margin: 8px 0;">
      <strong>${escapeHtml(name.toUpperCase())}</strong>: ${statusBadge}
      <span style="color:#666;font-size:0.85em">(${providerModels.length} models)</span>
    </div>`;

    const modelNames = providerModels.slice(0, 5).map(m => `<span class="model-item">${escapeHtml(m.displayName || m.id)}</span>`).join('');
    modelsHtml += `<div style="margin: 16px 0;">
      <strong style="color:#00d9ff">${escapeHtml(name.toUpperCase())}</strong>
      <div class="model-list">${modelNames || '<span style="color:#666">No models loaded</span>'}</div>
    </div>`;
  }

  const mongoStatus = dbHealth.mongodb ? 'Connected' : 'Disconnected';
  const mongoClass = dbHealth.mongodb ? 'success' : 'warning';
  const redisStatus = dbHealth.redis ? 'Connected' : 'Disconnected';
  const redisClass = dbHealth.redis ? 'success' : 'warning';

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OrbitAgent - API Status</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e); min-height: 100vh; color: #fff; padding: 40px 20px; }
    .container { max-width: 900px; margin: 0 auto; }
    h1 { text-align: center; font-size: 2.5em; margin-bottom: 10px; background: linear-gradient(90deg, #00d9ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { text-align: center; color: #888; margin-bottom: 40px; }
    .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); }
    .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .status-dot { width: 12px; height: 12px; border-radius: 50%; animation: pulse 2s infinite; }
    .status-dot.healthy { background: #00ff88; box-shadow: 0 0 10px #00ff88; }
    .status-dot.unavailable { background: #ff4757; box-shadow: 0 0 10px #ff4757; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .card-title { font-size: 1.2em; font-weight: 600; }
    .card-content { color: #aaa; line-height: 1.8; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; margin: 4px; }
    .badge.success { background: rgba(0,255,136,0.2); color: #00ff88; }
    .badge.warning { background: rgba(255,193,7,0.2); color: #ffc107; }
    .api-section { background: rgba(255,255,255,0.03); border-radius: 16px; padding: 30px; border: 1px solid rgba(255,255,255,0.1); }
    .api-section h2 { margin-bottom: 20px; color: #00d9ff; }
    .endpoint { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; margin: 12px 0; display: flex; align-items: center; gap: 16px; }
    .method { padding: 6px 12px; border-radius: 6px; font-weight: bold; font-size: 0.85em; min-width: 70px; text-align: center; }
    .method.get { background: #00d9ff; color: #000; }
    .method.post { background: #00ff88; color: #000; }
    .method.delete { background: #ff4757; color: #fff; }
    .endpoint-path { font-family: monospace; color: #fff; flex: 1; }
    .endpoint-desc { color: #888; font-size: 0.9em; }
    .model-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
    .model-item { background: rgba(0,217,255,0.1); padding: 6px 14px; border-radius: 20px; font-size: 0.85em; color: #00d9ff; }
    .footer { text-align: center; margin-top: 40px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>OrbitAgent</h1>
    <p class="subtitle">Modular AI Agent Backend Service</p>
    <div class="status-grid">
      <div class="card">
        <div class="card-header">
          <div class="status-dot ${dbHealth.mongodb ? 'healthy' : 'unavailable'}"></div>
          <span class="card-title">MongoDB</span>
        </div>
        <div class="card-content">
          <div>Database: <strong>orbit_agent</strong></div>
          <div>Status: <span class="badge ${mongoClass}">${mongoStatus}</span></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="status-dot ${dbHealth.redis ? 'healthy' : 'unavailable'}"></div>
          <span class="card-title">Redis</span>
        </div>
        <div class="card-content">
          <div>Memory: <strong>Temporary (Stream)</strong></div>
          <div>Status: <span class="badge ${redisClass}">${redisStatus}</span></div>
          <div>Max Pairs: <strong>50</strong></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <div class="status-dot healthy"></div>
          <span class="card-title">LLM Providers</span>
        </div>
        <div class="card-content">${providersHtml}</div>
      </div>
    </div>
    <div class="api-section">
      <h2>Available API Endpoints</h2>
      <div class="endpoint"><span class="method post">POST</span><div><div class="endpoint-path">/auth/register</div><div class="endpoint-desc">Register new user</div></div></div>
      <div class="endpoint"><span class="method post">POST</span><div><div class="endpoint-path">/auth/login</div><div class="endpoint-desc">Login and get JWT token</div></div></div>
      <div class="endpoint"><span class="method post">POST</span><div><div class="endpoint-path">/chat</div><div class="endpoint-desc">Send chat message (requires auth)</div></div></div>
      <div class="endpoint"><span class="method get">GET</span><div><div class="endpoint-path">/chat/:sessionId</div><div class="endpoint-desc">Get chat history from Redis</div></div></div>
      <div class="endpoint"><span class="method get">GET</span><div><div class="endpoint-path">/memory/permanent</div><div class="endpoint-desc">List conversations from MongoDB</div></div></div>
      <div class="endpoint"><span class="method get">GET</span><div><div class="endpoint-path">/models</div><div class="endpoint-desc">List all available LLM models</div></div></div>
      <div class="endpoint"><span class="method get">GET</span><div><div class="endpoint-path">/health</div><div class="endpoint-desc">Service health check</div></div></div>
    </div>
    <div class="api-section" style="margin-top:20px;">
      <h2>Available Models</h2>
      ${modelsHtml}
    </div>
    <div class="footer">
      <p>OrbitAgent v1.0.0 | All systems operational</p>
      <p style="margin-top:8px">Base URL: <code style="background:rgba(0,217,255,0.1);padding:4px 8px;border-radius:4px">http://localhost:3000/api/v1</code></p>
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}));

router.get('/', asyncHandler(async (_req: Request, res: Response) => {
  const dbHealth = await checkDatabasesHealth();
  const llmManager = getLLMManager();
  const llmHealth = await llmManager.healthCheck();
  const models = await llmManager.listAllModels();

  res.json({
    success: true,
    data: {
      service: 'OrbitAgent',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      databases: {
        mongodb: { status: dbHealth.mongodb ? 'connected' : 'disconnected', database: 'orbit_agent' },
        redis: { status: dbHealth.redis ? 'connected' : 'disconnected', type: 'temporary_memory' }
      },
      llm: {
        health: llmHealth,
        availableProviders: Object.keys(llmHealth),
        modelCount: models.length
      },
      endpoints: {
        baseUrl: '/api/v1',
        auth: ['/auth/register', '/auth/login', '/auth/me'],
        chat: ['/chat', '/chat/:sessionId', '/chat/:sessionId/clear'],
        memory: ['/memory/permanent', '/memory/temp/:sessionId'],
        models: ['/models', '/models/switch']
      }
    }
  });
}));

export default router;
