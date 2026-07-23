import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { AppError } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { HTTP_STATUS } from '../constants';
import { getToolManager } from '../core/tools/ToolManager';
import { getEventRuntime, type OwnedRunScope } from '../services/EventRuntime';

type MCPContextManager = {
  listMCPContextCapabilities?: (
    serverId: string,
    kind: 'resource' | 'prompt'
  ) => Promise<unknown>;
  readMCPResource?: (
    serverId: string,
    uri: string,
    runId: string,
    scope: OwnedRunScope
  ) => Promise<unknown>;
  renderMCPPrompt?: (
    serverId: string,
    name: string,
    args: Record<string, string>,
    runId: string,
    scope: OwnedRunScope
  ) => Promise<unknown>;
};

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
  '/servers/:serverId/context/:kind',
  asyncHandler(async (req: Request, res: Response) => {
    const kind = req.params.kind;
    if (kind !== 'resource' && kind !== 'prompt') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: { code: 'INVALID_MCP_CONTEXT_KIND', message: 'kind must be resource or prompt' },
      });
    }
    const scope = await requireOwnedMCPRun(req, res, req.query.runId);
    if (!scope) return;
    const manager = getToolManager() as unknown as MCPContextManager;
    if (!manager.listMCPContextCapabilities) return unavailableMCPContext(res);
    res.json({
      success: true,
      data: await manager.listMCPContextCapabilities(req.params.serverId, kind),
    });
  })
);

router.post(
  '/servers/:serverId/resources/read',
  asyncHandler(async (req: Request, res: Response) => {
    const scope = await requireOwnedMCPRun(req, res, req.body?.runId);
    if (!scope) return;
    const uri = typeof req.body?.uri === 'string' ? req.body.uri.trim() : '';
    if (!uri) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: { code: 'INVALID_MCP_RESOURCE_URI', message: 'uri is required' },
      });
    }
    const manager = getToolManager() as unknown as MCPContextManager;
    if (!manager.readMCPResource) return unavailableMCPContext(res);
    const output = await manager.readMCPResource(
      req.params.serverId,
      uri,
      scope.runId,
      scope
    );
    res.json({ success: true, data: sanitizeMCPContextOutput(output) });
  })
);

router.post(
  '/servers/:serverId/prompts/:name/render',
  asyncHandler(async (req: Request, res: Response) => {
    const scope = await requireOwnedMCPRun(req, res, req.body?.runId);
    if (!scope) return;
    const args =
      req.body?.arguments && typeof req.body.arguments === 'object'
        ? Object.fromEntries(
            Object.entries(req.body.arguments).map(([key, value]) => [key, String(value)])
          )
        : {};
    const manager = getToolManager() as unknown as MCPContextManager;
    if (!manager.renderMCPPrompt) return unavailableMCPContext(res);
    const output = await manager.renderMCPPrompt(
      req.params.serverId,
      req.params.name,
      args,
      scope.runId,
      scope
    );
    res.json({ success: true, data: sanitizeMCPContextOutput(output) });
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

async function requireOwnedMCPRun(
  req: Request,
  res: Response,
  runIdValue: unknown
): Promise<OwnedRunScope | null> {
  const userId = req.user?.userId ?? req.apiKey?.userId;
  const runId = typeof runIdValue === 'string' ? runIdValue.trim() : '';
  if (!userId || !runId) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      error: { code: 'MCP_OWNED_RUN_REQUIRED', message: 'An owned runId is required.' },
    });
    return null;
  }
  try {
    return await getEventRuntime().requireOwnedRunScope(runId, userId);
  } catch {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'RUN_NOT_FOUND', message: 'Run not found' },
    });
    return null;
  }
}

function unavailableMCPContext(res: Response): void {
  res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
    success: false,
    error: {
      code: 'MCP_CONTEXT_UNAVAILABLE',
      message: 'MCP context capabilities are not available in this composition.',
    },
  });
}

function sanitizeMCPContextOutput(input: unknown): unknown {
  const redacted = redactMCPValue(input);
  const serialized = JSON.stringify(redacted);
  const maxBytes = Number(process.env.HYPHA_MCP_CONTEXT_MAX_BYTES ?? 1_048_576);
  if (Buffer.byteLength(serialized, 'utf8') > maxBytes) {
    throw new AppError(
      'MCP_CONTEXT_TOO_LARGE',
      'MCP context response exceeds the configured byte limit.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  const record = redacted && typeof redacted === 'object' ? (redacted as Record<string, unknown>) : {};
  const contentType = String(record.contentType ?? record.mimeType ?? '').toLowerCase();
  if (
    contentType &&
    !['application/json', 'text/plain', 'text/markdown'].some((allowed) =>
      contentType.startsWith(allowed)
    )
  ) {
    throw new AppError(
      'MCP_CONTEXT_CONTENT_TYPE_REJECTED',
      'MCP context response content type is not allowed.',
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return redacted;
}

function redactMCPValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactMCPValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [
        key,
        /secret|token|password|authorization|api[-_]?key/i.test(key)
          ? '[REDACTED]'
          : redactMCPValue(child),
      ])
    );
  }
  if (typeof value === 'string') {
    return value
      .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/giu, 'Bearer [REDACTED]')
      .replace(/\bsk-[A-Za-z0-9_-]{8,}\b/gu, '[REDACTED]');
  }
  return value;
}
