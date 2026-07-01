import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, apiKeyMiddleware } from '../middleware/auth';
import { getTokenService } from '../services/TokenService';
import { MODEL_PRICING } from '../models/TokenUsage';

const router = Router();

// Aggregation result types (eliminate `any`)
interface ByModelResult {
  _id: { modelId: string; modelProvider: string };
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

interface DailyResult {
  _id: { year: number; month: number; day: number };
  totalPromptTokens: number;
  totalCompletionTokens: number;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
}

// All routes require authentication
router.use(apiKeyMiddleware);
router.use(authMiddleware(false));

// Get user total stats
router.get('/stats', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.apiKey?.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User ID required' },
    });
  }

  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate as string) : undefined;
  const end = endDate ? new Date(endDate as string) : undefined;

  const tokenService = getTokenService();
  const [totalStats, byModel, dailyStats] = await Promise.all([
    tokenService.getUserTotalStats(userId, start, end),
    tokenService.getUserStatsByModel(userId, start, end),
    tokenService.getDailyStats(userId, 30),
  ]);

  res.json({
    success: true,
    data: {
      summary: totalStats,
      byModel: byModel.map((m: ByModelResult) => ({
        modelId: m._id.modelId,
        modelProvider: m._id.modelProvider,
        totalPromptTokens: m.totalPromptTokens,
        totalCompletionTokens: m.totalCompletionTokens,
        totalTokens: m.totalTokens,
        totalCost: m.totalCost,
        requestCount: m.requestCount,
      })),
      daily: dailyStats.map((d: DailyResult) => ({
        date: `${d._id.year}-${String(d._id.month).padStart(2, '0')}-${String(d._id.day).padStart(2, '0')}`,
        totalPromptTokens: d.totalPromptTokens,
        totalCompletionTokens: d.totalCompletionTokens,
        totalTokens: d.totalTokens,
        totalCost: d.totalCost,
        requestCount: d.requestCount,
      })),
    },
  });
}));

// Get recent usage records
router.get('/recent', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.apiKey?.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User ID required' },
    });
  }

  const limit = Math.min(parseInt(req.query.limit as string) || 50, 200);
  const skip = parseInt(req.query.skip as string) || 0;

  const tokenService = getTokenService();
  const records = await tokenService.getRecentUsage(userId, limit, skip);

  res.json({
    success: true,
    data: records,
    pagination: { limit, skip },
  });
}));

// Get usage for a specific conversation
router.get('/conversation/:conversationId', asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId || req.apiKey?.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User ID required' },
    });
  }

  const { conversationId } = req.params;

  const tokenService = getTokenService();
  const records = await tokenService.getConversationUsage(conversationId);

  // Calculate totals
  const totals = records.reduce(
    (acc, r) => ({
      promptTokens: acc.promptTokens + r.promptTokens,
      completionTokens: acc.completionTokens + r.completionTokens,
      totalTokens: acc.totalTokens + r.totalTokens,
      totalCost: acc.totalCost + r.totalCost,
    }),
    { promptTokens: 0, completionTokens: 0, totalTokens: 0, totalCost: 0 }
  );

  res.json({
    success: true,
    data: {
      records,
      totals,
    },
  });
}));

// Get model pricing reference
router.get('/pricing', asyncHandler(async (_req: Request, res: Response) => {
  const pricing = Object.entries(MODEL_PRICING).map(([modelId, p]) => ({
    modelId,
    inputPricePerM: p.input,
    outputPricePerM: p.output,
    // Cache-hit tier is a discounted input rate (e.g. DeepSeek's prompt cache).
    // Models without an explicit cacheHit tier fall back to the regular input
    // rate, which is what we'll bill at when no cacheHit is reported.
    cacheHitPricePerM: p.cacheHit ?? p.input,
    currency: 'USD',
  }));

  res.json({
    success: true,
    data: pricing,
  });
}));

// Token usage page (HTML)
router.get('/page', asyncHandler(async (req: Request, res: Response) => {
  const tokenService = getTokenService();
  const userId = req.query.userId as string || 'demo';

  const [totalStats, byModel, dailyStats, recent] = await Promise.all([
    tokenService.getUserTotalStats(userId),
    tokenService.getUserStatsByModel(userId),
    tokenService.getDailyStats(userId, 14),
    tokenService.getRecentUsage(userId, 20),
  ]);

  const byModelRows = byModel.map((m: ByModelResult) => `
    <tr>
      <td>${m._id.modelProvider}</td>
      <td>${m._id.modelId}</td>
      <td>${m.requestCount}</td>
      <td>${m.totalPromptTokens.toLocaleString()}</td>
      <td>${m.totalCompletionTokens.toLocaleString()}</td>
      <td>${m.totalTokens.toLocaleString()}</td>
      <td>$${m.totalCost.toFixed(6)}</td>
    </tr>
  `).join('');

  const dailyRows = dailyStats.map((d: DailyResult) => `
    <tr>
      <td>${d._id.year}-${String(d._id.month).padStart(2, '0')}-${String(d._id.day).padStart(2, '0')}</td>
      <td>${d.requestCount}</td>
      <td>${d.totalTokens.toLocaleString()}</td>
      <td>$${d.totalCost.toFixed(6)}</td>
    </tr>
  `).join('');

  const recentRows = recent.map(r => `
    <tr>
      <td>${new Date(r.createdAt).toLocaleString()}</td>
      <td><span class="badge provider">${r.modelProvider}</span></td>
      <td>${r.modelId}</td>
      <td>${r.promptTokens.toLocaleString()}</td>
      <td>${r.completionTokens.toLocaleString()}</td>
      <td>$${r.totalCost.toFixed(6)}</td>
    </tr>
  `).join('');

  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OrbitAgent - Token Usage</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #1a1a2e, #16213e); min-height: 100vh; color: #fff; padding: 40px 20px; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { text-align: center; font-size: 2.5em; margin-bottom: 10px; background: linear-gradient(90deg, #00d9ff, #00ff88); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .subtitle { text-align: center; color: #888; margin-bottom: 40px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .stat-card { background: rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); text-align: center; }
    .stat-value { font-size: 2em; font-weight: bold; color: #00d9ff; }
    .stat-label { color: #888; margin-top: 8px; }
    .stat-cost { color: #00ff88; }
    .section { background: rgba(255,255,255,0.03); border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; }
    .section h2 { margin-bottom: 20px; color: #00d9ff; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); }
    th { color: #888; font-weight: 500; }
    tr:hover { background: rgba(255,255,255,0.05); }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 0.8em; background: rgba(0,217,255,0.2); color: #00d9ff; }
    .badge.provider { background: rgba(0,255,136,0.2); color: #00ff88; }
    .api-note { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 16px; margin-bottom: 20px; color: #888; }
    .api-note code { background: rgba(0,217,255,0.1); padding: 2px 8px; border-radius: 4px; color: #00d9ff; }
    .footer { text-align: center; margin-top: 40px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Token Usage</h1>
    <p class="subtitle">Track your API token consumption and costs</p>

    <div class="api-note">
      Query usage via API: <code>GET /api/v1/usage/stats</code> |
      <code>GET /api/v1/usage/recent</code> |
      <code>GET /api/v1/usage/pricing</code>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${totalStats.requestCount.toLocaleString()}</div>
        <div class="stat-label">Total Requests</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalStats.totalTokens.toLocaleString()}</div>
        <div class="stat-label">Total Tokens</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalStats.totalPromptTokens.toLocaleString()}</div>
        <div class="stat-label">Prompt Tokens</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${totalStats.totalCompletionTokens.toLocaleString()}</div>
        <div class="stat-label">Completion Tokens</div>
      </div>
      <div class="stat-card">
        <div class="stat-value stat-cost">$${totalStats.totalCost.toFixed(6)}</div>
        <div class="stat-label">Total Cost (USD)</div>
      </div>
    </div>

    <div class="section">
      <h2>Usage by Model</h2>
      <table>
        <thead>
          <tr><th>Provider</th><th>Model</th><th>Requests</th><th>Prompt Tokens</th><th>Completion Tokens</th><th>Total Tokens</th><th>Cost</th></tr>
        </thead>
        <tbody>
          ${byModelRows || '<tr><td colspan="7" style="text-align:center;color:#666">No data</td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Daily Usage (Last 14 Days)</h2>
      <table>
        <thead>
          <tr><th>Date</th><th>Requests</th><th>Total Tokens</th><th>Cost</th></tr>
        </thead>
        <tbody>
          ${dailyRows || '<tr><td colspan="4" style="text-align:center;color:#666">No data</td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>Recent Requests</h2>
      <table>
        <thead>
          <tr><th>Time</th><th>Provider</th><th>Model</th><th>Prompt</th><th>Completion</th><th>Cost</th></tr>
        </thead>
        <tbody>
          ${recentRows || '<tr><td colspan="6" style="text-align:center;color:#666">No data</td></tr>'}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <p>OrbitAgent Token Usage Tracker</p>
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
}));

export default router;
