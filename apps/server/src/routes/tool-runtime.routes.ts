import { Router, type Request, type Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, adminOnly } from '../middleware/auth';
import { HTTP_STATUS } from '../constants';
import { getEventRuntime } from '../services/EventRuntime';

const invocationRouter = Router();
const approvalRouter = Router();

invocationRouter.use(authMiddleware(true));
approvalRouter.use(authMiddleware(true), adminOnly);

invocationRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const invocation = await getEventRuntime().getToolInvocation(req.params.id);
    if (!invocation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'TOOL_INVOCATION_NOT_FOUND', message: 'Tool invocation not found' },
      });
    }
    if (!canAccessInvocation(req, invocation.scope?.userId)) {
      return invocationAccessDenied(res);
    }
    res.json({ success: true, data: invocation });
  })
);

invocationRouter.post(
  '/:id/cancel',
  asyncHandler(async (req: Request, res: Response) => {
    const invocation = await getEventRuntime().getToolInvocation(req.params.id);
    if (!invocation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'TOOL_INVOCATION_NOT_FOUND', message: 'Tool invocation not found' },
      });
    }
    if (!canAccessInvocation(req, invocation.scope?.userId)) {
      return invocationAccessDenied(res);
    }
    const result = await getEventRuntime().cancelToolInvocation(
      req.params.id,
      typeof req.body?.reason === 'string' ? req.body.reason : undefined
    );
    res.json({ success: true, data: result });
  })
);

function canAccessInvocation(req: Request, ownerUserId: string | undefined): boolean {
  if (req.user?.isAdmin) return true;
  const requesterUserId = req.user?.userId ?? req.apiKey?.userId;
  return Boolean(requesterUserId && ownerUserId && requesterUserId === ownerUserId);
}

function invocationAccessDenied(res: Response): Response {
  return res.status(HTTP_STATUS.FORBIDDEN).json({
    success: false,
    error: {
      code: 'TOOL_INVOCATION_ACCESS_DENIED',
      message: 'Tool invocation belongs to another user',
    },
  });
}

approvalRouter.post(
  '/:id/approve',
  asyncHandler(async (req: Request, res: Response) => {
    const approvedBy = req.user?.userId || req.apiKey?.userId;
    if (!approvedBy) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Approver identity required' },
      });
    }
    const result = await getEventRuntime().approveToolInvocation(req.params.id, approvedBy);
    res.json({ success: true, data: result });
  })
);

approvalRouter.post(
  '/:id/reject',
  asyncHandler(async (req: Request, res: Response) => {
    const result = await getEventRuntime().rejectToolInvocation(req.params.id);
    res.json({ success: true, data: result });
  })
);

export { invocationRouter, approvalRouter };
