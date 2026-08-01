import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { HTTP_STATUS } from '../constants';
import { getToolManager } from '../core/tools/ToolManager';

const router = Router();
router.use(authMiddleware(true));

router.get('/servers', (_req: Request, res: Response) => {
  res.json({ success: true, data: getToolManager().listMCPClients() });
});

router.post(
  '/servers/:id/connect',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const manager = getToolManager();
    if (!manager.hasMCPServer(req.params.id)) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'MCP_SERVER_NOT_FOUND', message: 'MCP server not found' },
      });
    }
    await manager.connectMCPServer(req.params.id);
    res.json({ success: true, data: { serverId: req.params.id, status: 'connected' } });
  })
);

router.post(
  '/servers/:id/disconnect',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    await getToolManager().disconnectMCPServer(req.params.id);
    res.json({ success: true, data: { serverId: req.params.id, status: 'disconnected' } });
  })
);

router.get(
  '/capabilities',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await getToolManager().listMCPCapabilities() });
  })
);

router.get(
  '/drifts',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await getToolManager().listMCPDrifts() });
  })
);

router.get(
  '/servers/:serverId/resources',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      data: await getToolManager().listMCPContextCapabilities(req.params.serverId, 'resource'),
    });
  })
);

router.post(
  '/servers/:serverId/resources/read',
  asyncHandler(async (req: Request, res: Response) => {
    const uri = typeof req.body?.uri === 'string' ? req.body.uri : '';
    if (!uri) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Resource URI is required.' },
      });
    }
    const runId =
      typeof req.body?.runId === 'string'
        ? req.body.runId
        : `mcp-context:${req.user?.userId ?? req.apiKey?.userId ?? 'anonymous'}`;
    res.json({
      success: true,
      data: await getToolManager().readMCPResource(req.params.serverId, uri, runId),
    });
  })
);

router.get(
  '/servers/:serverId/prompts',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      data: await getToolManager().listMCPContextCapabilities(req.params.serverId, 'prompt'),
    });
  })
);

router.post(
  '/servers/:serverId/prompts/:name/render',
  asyncHandler(async (req: Request, res: Response) => {
    const args =
      req.body?.arguments && typeof req.body.arguments === 'object'
        ? Object.fromEntries(
            Object.entries(req.body.arguments).map(([key, value]) => [key, String(value)])
          )
        : {};
    const runId =
      typeof req.body?.runId === 'string'
        ? req.body.runId
        : `mcp-context:${req.user?.userId ?? req.apiKey?.userId ?? 'anonymous'}`;
    res.json({
      success: true,
      data: await getToolManager().renderMCPPrompt(
        req.params.serverId,
        req.params.name,
        args,
        runId
      ),
    });
  })
);

router.post(
  '/servers/:serverId/capabilities/:capabilityId/approve',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    await getToolManager().approveMCPCapability({
      serverId: req.params.serverId,
      capabilityId: req.params.capabilityId,
      capabilityHash:
        typeof req.body?.capabilityHash === 'string' ? req.body.capabilityHash : undefined,
      approvedBy: req.user?.userId ?? req.apiKey?.userId ?? 'admin',
      restrictions: Array.isArray(req.body?.restrictions)
        ? req.body.restrictions.map(String)
        : undefined,
      expiresAt: typeof req.body?.expiresAt === 'string' ? req.body.expiresAt : undefined,
    });
    res.json({ success: true, data: { status: 'approved' } });
  })
);

router.post(
  '/servers/:serverId/capabilities/:capabilityId/quarantine',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim() : '';
    if (!reason) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Quarantine reason is required.' },
      });
    }
    await getToolManager().quarantineMCPCapability({
      serverId: req.params.serverId,
      capabilityId: req.params.capabilityId,
      capabilityHash:
        typeof req.body?.capabilityHash === 'string' ? req.body.capabilityHash : undefined,
      reason,
    });
    res.json({ success: true, data: { status: 'quarantined' } });
  })
);

export default router;
