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

export default router;
