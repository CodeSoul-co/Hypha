import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { HTTP_STATUS } from '../constants';
import { getToolManager, type MCPContextRunAccess } from '../core/tools/ToolManager';
import { getEventRuntime } from '../services/EventRuntime';

const sideEffectLevels = new Set([
  'none',
  'read',
  'write',
  'external_effect',
  'irreversible',
] as const);

const router = Router();
router.use(authMiddleware(true));

async function runMCPContextOperation<T>(input: {
  userId: string;
  serverId: string;
  capabilityId: string;
  kind: 'resource' | 'prompt';
  operation: (access: MCPContextRunAccess) => Promise<T>;
}): Promise<{ runId: string; data: T }> {
  const runtime = getEventRuntime();
  const stepId = `mcp:${input.kind}:${input.serverId}`;
  const run = await runtime.startRun({
    userId: input.userId,
    sessionId: `mcp-context:${input.serverId}:${input.kind}`,
    input: {
      serverId: input.serverId,
      capabilityId: input.capabilityId,
      kind: input.kind,
    },
    workflowRef: { id: 'mcp-context-access', version: '1.0.0' },
    metadata: { surface: `http.mcp.${input.kind}` },
  });

  try {
    for (const state of [
      'ContextBuilt',
      'Reasoning',
      'ActionSelected',
      'PolicyChecked',
      'Acting',
    ]) {
      await runtime.transition(run.runId, state, { stepId, kind: input.kind });
    }
    await runtime.record(
      run.runId,
      'mcp.call.started',
      {
        source: 'mcp',
        serverId: input.serverId,
        capabilityId: input.capabilityId,
        operation: input.kind,
      },
      stepId
    );
    const data = await input.operation({
      runId: run.runId,
      principalId: input.userId,
      userId: input.userId,
      permissionScopes: [input.kind === 'resource' ? 'mcp.resource.read' : 'mcp.prompt.render'],
      deadlineAt: new Date(Date.now() + 45_000).toISOString(),
    });
    await runtime.record(
      run.runId,
      'mcp.call.completed',
      {
        source: 'mcp',
        serverId: input.serverId,
        capabilityId: input.capabilityId,
        operation: input.kind,
      },
      stepId
    );
    for (const state of ['ObservationRecorded', 'Verifying', 'MemorySync']) {
      await runtime.transition(run.runId, state, { stepId, kind: input.kind });
    }
    await runtime.completeRun(run.runId, {
      serverId: input.serverId,
      capabilityId: input.capabilityId,
      kind: input.kind,
    });
    return { runId: run.runId, data };
  } catch (error) {
    await runtime
      .record(
        run.runId,
        'mcp.call.failed',
        {
          source: 'mcp',
          serverId: input.serverId,
          capabilityId: input.capabilityId,
          operation: input.kind,
          errorCode:
            typeof error === 'object' && error && 'code' in error
              ? String(error.code)
              : 'MCP_CONTEXT_CALL_FAILED',
        },
        stepId
      )
      .catch(() => undefined);
    await runtime.failRun(run.runId, error).catch(() => undefined);
    throw error;
  }
}

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
    const userId = req.user?.userId ?? req.apiKey?.userId;
    if (!userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }
    const result = await runMCPContextOperation({
      userId,
      serverId: req.params.serverId,
      capabilityId: uri,
      kind: 'resource',
      operation: (access) => getToolManager().readMCPResource(req.params.serverId, uri, access),
    });
    res.json({
      success: true,
      runId: result.runId,
      data: result.data,
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
    const userId = req.user?.userId ?? req.apiKey?.userId;
    if (!userId) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }
    const result = await runMCPContextOperation({
      userId,
      serverId: req.params.serverId,
      capabilityId: req.params.name,
      kind: 'prompt',
      operation: (access) =>
        getToolManager().renderMCPPrompt(req.params.serverId, req.params.name, args, access),
    });
    res.json({
      success: true,
      runId: result.runId,
      data: result.data,
    });
  })
);

router.post(
  '/servers/:serverId/capabilities/:capabilityId/approve',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    if (
      req.body?.sideEffectLevel !== undefined &&
      !sideEffectLevels.has(req.body.sideEffectLevel)
    ) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'sideEffectLevel is invalid.',
        },
      });
    }
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
      sideEffectLevel: sideEffectLevels.has(req.body?.sideEffectLevel)
        ? req.body.sideEffectLevel
        : undefined,
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
