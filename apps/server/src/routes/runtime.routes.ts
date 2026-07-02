import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware } from '../middleware/auth';
import { getEventRuntime } from '../services/EventRuntime';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.use(authMiddleware(true));

router.get('/runs/:runId', asyncHandler(async (req: Request, res: Response) => {
  const run = await getEventRuntime().projectRun(req.params.runId);
  if (!run) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'RUN_NOT_FOUND', message: 'Run not found' },
    });
  }
  res.json({ success: true, data: run });
}));

router.get('/runs/:runId/events', asyncHandler(async (req: Request, res: Response) => {
  const events = await getEventRuntime().listEvents(req.params.runId);
  res.json({ success: true, data: events });
}));

router.get('/runs/:runId/replay', asyncHandler(async (req: Request, res: Response) => {
  const replay = await getEventRuntime().projectReplay(req.params.runId);
  res.json({ success: true, data: replay });
}));

router.get('/runs/:runId/audit', asyncHandler(async (req: Request, res: Response) => {
  const audit = await getEventRuntime().projectAudit(req.params.runId);
  res.json({ success: true, data: audit });
}));

router.get('/runs/:runId/regression', asyncHandler(async (req: Request, res: Response) => {
  const regression = await getEventRuntime().projectRegression(req.params.runId);
  res.json({ success: true, data: regression });
}));

export default router;
