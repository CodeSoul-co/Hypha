import { Request, Response, Router } from 'express';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { getHealthService } from '../services/HealthService';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.get('/live', (_req: Request, res: Response) => {
  res.json({ success: true, data: getHealthService().liveness() });
});

router.get(
  '/ready',
  asyncHandler(async (_req: Request, res: Response) => {
    const readiness = await getHealthService().readiness();
    res.status(readiness.ready ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      success: readiness.ready,
      data: readiness,
    });
  })
);

router.get(
  '/health',
  asyncHandler(async (_req: Request, res: Response) => {
    const readiness = await getHealthService().readiness();
    res.json({
      success: true,
      data: {
        status: readiness.ready ? 'healthy' : 'degraded',
        timestamp: readiness.timestamp,
        uptime: process.uptime(),
      },
    });
  })
);

router.get(
  '/health/details',
  authMiddleware(true),
  adminOnly,
  asyncHandler(async (_req: Request, res: Response) => {
    const readiness = await getHealthService().readiness();
    res.status(readiness.ready ? HTTP_STATUS.OK : HTTP_STATUS.SERVICE_UNAVAILABLE).json({
      success: readiness.ready,
      data: readiness,
    });
  })
);

export default router;
