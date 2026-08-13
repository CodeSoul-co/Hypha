import { Router, type Request, type Response } from 'express';
import type { MemoryLifecycleWorkerType } from '@codesoul-co/hypha-memory';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';
import { getServerMemoryAdministration } from '../services/ServerMemoryAdministration';

const router = Router();
router.use(authMiddleware(true), adminOnly);

router.get(
  '/health',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await getServerMemoryAdministration().health() });
  })
);

router.post(
  '/profile/validate',
  asyncHandler(async (req: Request, res: Response) => {
    const document = Object.prototype.hasOwnProperty.call(req.body ?? {}, 'document')
      ? req.body.document
      : undefined;
    res.json({
      success: true,
      data: await getServerMemoryAdministration().validateProfile(document),
    });
  })
);

router.get(
  '/migrations/:migrationId/plan',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      data: await getServerMemoryAdministration().migrationPlan({
        migrationId: req.params.migrationId,
        userId: requestedUserId(req),
      }),
    });
  })
);

router.post(
  '/migrations/:migrationId/reconcile',
  asyncHandler(async (req: Request, res: Response) => {
    res.json({
      success: true,
      data: await getServerMemoryAdministration().reconcile({
        migrationId: req.params.migrationId,
        userId: requestedUserId(req),
      }),
    });
  })
);

router.get(
  '/dlq',
  asyncHandler(async (req: Request, res: Response) => {
    const workerType = optionalWorkerType(req.query.workerType);
    const scopeHash = optionalString(req.query.scopeHash);
    res.json({
      success: true,
      data: await getServerMemoryAdministration().inspectDeadLetters({ workerType, scopeHash }),
    });
  })
);

function requestedUserId(req: Request): string {
  return optionalString(req.query.userId) ?? optionalString(req.body?.userId) ?? req.user!.userId;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function optionalWorkerType(value: unknown): MemoryLifecycleWorkerType | undefined {
  const candidate = optionalString(value);
  if (!candidate) return undefined;
  const allowed: MemoryLifecycleWorkerType[] = [
    'retention',
    'decay',
    'consolidation',
    'deletion',
    'reindex',
    'provider_reconciliation',
  ];
  if (!allowed.includes(candidate as MemoryLifecycleWorkerType)) {
    throw new Error(`Unsupported Memory worker type ${candidate}.`);
  }
  return candidate as MemoryLifecycleWorkerType;
}

export default router;
