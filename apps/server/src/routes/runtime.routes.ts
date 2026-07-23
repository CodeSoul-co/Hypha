import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { getEventRuntime } from '../services/EventRuntime';
import { HTTP_STATUS } from '../constants';
import { agentPromptSpecSchema } from '@hypha/inference';

const router = Router();

router.use(authMiddleware(true));

router.get('/reasoning/strategies', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: getEventRuntime().listReasoningStrategies(),
  });
});

router.get(
  '/agent-prompts',
  asyncHandler(async (_req: Request, res: Response) => {
    res.json({ success: true, data: await getEventRuntime().listAgentPrompts() });
  })
);

router.post(
  '/agent-prompts',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = agentPromptSpecSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_AGENT_PROMPT',
          message: 'Agent prompt spec is invalid',
          details: parsed.error.flatten(),
        },
      });
    }
    const stored = await getEventRuntime().registerAgentPrompt(parsed.data);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: stored });
  })
);

router.put(
  '/agent-prompts/:id/:version',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const parsed = agentPromptSpecSchema.safeParse({
      ...req.body,
      id: req.params.id,
      version: req.params.version,
    });
    const expectedRevision = Number(req.header('if-match'));
    if (!parsed.success || !Number.isInteger(expectedRevision) || expectedRevision < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_AGENT_PROMPT_UPDATE',
          message: 'A valid prompt and numeric If-Match revision are required.',
        },
      });
    }
    const stored = await getEventRuntime().registerAgentPrompt(parsed.data, { expectedRevision });
    res.json({ success: true, data: stored });
  })
);

router.delete(
  '/agent-prompts/:id',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const version = typeof req.query.version === 'string' ? req.query.version : undefined;
    const removed = await getEventRuntime().unregisterAgentPrompt(req.params.id, version);
    if (!removed) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'AGENT_PROMPT_NOT_FOUND', message: 'Agent prompt not found' },
      });
    }
    res.json({ success: true, data: { id: req.params.id, version } });
  })
);

router.get(
  '/runs/:runId',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    const { run } = owned;
    res.json({ success: true, data: run });
  })
);

router.get(
  '/runs/:runId/events',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    const events = await owned.runtime.listEvents(req.params.runId);
    res.json({ success: true, data: events });
  })
);

router.get(
  '/runs/:runId/human-reviews',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    res.json({
      success: true,
      data: await owned.runtime.listHumanReviews(req.params.runId, owned.run.userId),
    });
  })
);

router.post(
  '/runs/:runId/human-reviews/:taskId/decision',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const decision = req.body?.decision;
    if (!['approved', 'rejected', 'cancelled'].includes(decision)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_HUMAN_REVIEW_DECISION',
          message: 'decision must be approved, rejected, or cancelled',
        },
      });
    }
    const expectedRevision = Number(req.body?.expectedRevision);
    if (!Number.isInteger(expectedRevision) || expectedRevision < 1) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_HUMAN_REVIEW_REVISION',
          message: 'expectedRevision must be a positive integer',
        },
      });
    }
    const decidedBy = req.user?.userId ?? req.apiKey?.userId;
    if (!decidedBy) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Reviewer identity required' },
      });
    }
    const task = await getEventRuntime().decideHumanReview({
      runId: req.params.runId,
      taskId: req.params.taskId,
      expectedRevision,
      decision,
      decidedBy,
      reason: typeof req.body?.reason === 'string' ? req.body.reason : undefined,
    });
    res.json({ success: true, data: task });
  })
);

router.get(
  '/runs/:runId/human-reviews/skills',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    res.json({
      success: true,
      data: await owned.runtime.listSkillHumanReviews(req.params.runId, owned.run.userId),
    });
  })
);

router.post(
  '/runs/:runId/human-reviews/skills/:taskId/decision',
  adminOnly,
  asyncHandler(async (req: Request, res: Response) => {
    const decision = req.body?.decision;
    if (decision !== 'approved' && decision !== 'rejected') {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'INVALID_HUMAN_REVIEW_DECISION',
          message: 'decision must be approved or rejected',
        },
      });
    }
    const decidedBy = req.user?.userId ?? req.apiKey?.userId;
    if (!decidedBy) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Reviewer identity required' },
      });
    }
    const task = await getEventRuntime().decideSkillHumanReview({
      runId: req.params.runId,
      taskId: req.params.taskId,
      decision,
      decidedBy,
      reason: typeof req.body?.reason === 'string' ? req.body.reason : undefined,
    });
    res.json({ success: true, data: task });
  })
);

router.get(
  '/runs/:runId/replay',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    const replay = await owned.runtime.projectReplay(req.params.runId);
    res.json({ success: true, data: replay });
  })
);

router.get(
  '/runs/:runId/audit',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    const audit = await owned.runtime.projectAudit(req.params.runId);
    res.json({ success: true, data: audit });
  })
);

router.get(
  '/runs/:runId/regression',
  asyncHandler(async (req: Request, res: Response) => {
    const owned = await findOwnedRun(req, res);
    if (!owned) return;
    const regression = await owned.runtime.projectRegression(req.params.runId);
    res.json({ success: true, data: regression });
  })
);

async function findOwnedRun(req: Request, res: Response) {
  const userId = req.user?.userId ?? req.apiKey?.userId;
  if (!userId) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'User ID required' },
    });
    return null;
  }

  const runtime = getEventRuntime();
  const run = await runtime.projectOwnedRun(req.params.runId, userId);
  if (!run) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      success: false,
      error: { code: 'RUN_NOT_FOUND', message: 'Run not found' },
    });
    return null;
  }
  return { runtime, run };
}

export default router;
