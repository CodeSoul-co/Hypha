import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { adminOnly, authMiddleware } from '../middleware/auth';
import { getEventRuntime, type StartRunInput } from '../services/EventRuntime';
import { HTTP_STATUS } from '../constants';
import { agentPromptSpecSchema } from '@hypha/inference';
import {
  sessionCommandStatusSchema,
  type SessionCommandRecord,
  type SessionCommandStatus,
} from '@hypha/core';
import { z } from 'zod';

const router = Router();

router.use(authMiddleware(true));

const startRunCommandBodySchema = z
  .object({
    input: z.unknown().optional(),
    agentId: z.string().trim().min(1).optional(),
    workflowRef: z
      .object({
        id: z.string().trim().min(1),
        version: z.string().trim().min(1).optional(),
        revision: z.string().trim().min(1).optional(),
      })
      .strict()
      .optional(),
    domainPack: z.unknown().optional(),
    fsm: z.unknown().optional(),
    metadata: z.record(z.unknown()).optional(),
  })
  .strict();

const cancelRunCommandBodySchema = z
  .object({
    runId: z.string().trim().min(1),
    reason: z.string().trim().min(1).optional(),
  })
  .strict();

const sessionCommandListQuerySchema = z
  .object({
    status: z.string().trim().min(1).optional(),
    fromSequence: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().min(1).max(1000).optional(),
  })
  .strict();

router.post(
  '/sessions/:sessionId/commands/start-run',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = authenticatedUserId(req);
    if (!userId) return unauthorized(res);

    const idempotencyKey = requireIdempotencyKey(req, res);
    if (!idempotencyKey) return;

    const parsed = startRunCommandBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return invalidSessionCommand(
        res,
        'start_run command body is invalid',
        parsed.error.flatten()
      );
    }

    const payload = parsed.data as Omit<StartRunInput, 'userId' | 'sessionId'>;
    const command = await getEventRuntime().enqueueStartRun(
      {
        ...payload,
        userId,
        sessionId: req.params.sessionId,
      },
      idempotencyKey
    );
    res.status(HTTP_STATUS.ACCEPTED).json({ success: true, data: publicSessionCommand(command) });
  })
);

router.post(
  '/sessions/:sessionId/commands/cancel-run',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = authenticatedUserId(req);
    if (!userId) return unauthorized(res);

    const idempotencyKey = requireIdempotencyKey(req, res);
    if (!idempotencyKey) return;
    const parsed = cancelRunCommandBodySchema.safeParse(req.body);
    if (!parsed.success) {
      return invalidSessionCommand(res, 'cancel command body is invalid', parsed.error.flatten());
    }

    const runtime = getEventRuntime();
    const run = await runtime.findOwnedRunScope(parsed.data.runId, userId);
    if (!run || run.clientSessionId !== req.params.sessionId) return runNotFound(res);
    const command = await runtime.enqueueCancelRun(
      {
        userId,
        sessionId: req.params.sessionId,
        runId: parsed.data.runId,
        reason: parsed.data.reason,
      },
      idempotencyKey
    );
    res.status(HTTP_STATUS.ACCEPTED).json({ success: true, data: publicSessionCommand(command) });
  })
);

router.get(
  '/sessions/:sessionId/commands',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = authenticatedUserId(req);
    if (!userId) return unauthorized(res);

    const parsed = sessionCommandListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return invalidSessionCommand(res, 'Session Command query is invalid', parsed.error.flatten());
    }

    const statuses = parseSessionCommandStatuses(parsed.data.status);
    if (statuses === null) {
      return invalidSessionCommand(res, 'status contains an unsupported Session Command status');
    }
    const commands = await getEventRuntime().listSessionCommands(
      { userId, sessionId: req.params.sessionId },
      {
        ...(statuses === undefined ? {} : { statuses }),
        ...(parsed.data.fromSequence === undefined
          ? {}
          : { fromSequence: parsed.data.fromSequence }),
        ...(parsed.data.limit === undefined ? {} : { limit: parsed.data.limit }),
      }
    );
    res.json({ success: true, data: commands.map(publicSessionCommand) });
  })
);

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
    await getEventRuntime().registerAgentPrompt(parsed.data);
    res.status(HTTP_STATUS.CREATED).json({ success: true, data: parsed.data });
  })
);

router.delete(
  '/agent-prompts/:id',
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
  const userId = authenticatedUserId(req);
  if (!userId) {
    unauthorized(res);
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

function authenticatedUserId(req: Request): string | undefined {
  return req.user?.userId ?? req.apiKey?.userId;
}

function unauthorized(res: Response): Response {
  return res.status(HTTP_STATUS.UNAUTHORIZED).json({
    success: false,
    error: { code: 'UNAUTHORIZED', message: 'User ID required' },
  });
}

function invalidSessionCommand(res: Response, message: string, details?: unknown): Response {
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    error: {
      code: 'INVALID_SESSION_COMMAND',
      message,
      ...(details === undefined ? {} : { details }),
    },
  });
}

function requireIdempotencyKey(req: Request, res: Response): string | undefined {
  const idempotencyKey = req.get('Idempotency-Key')?.trim();
  if (!idempotencyKey || idempotencyKey.length > 256) {
    invalidSessionCommand(res, 'Idempotency-Key header must contain between 1 and 256 characters');
    return undefined;
  }
  return idempotencyKey;
}

function runNotFound(res: Response): Response {
  return res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    error: { code: 'RUN_NOT_FOUND', message: 'Run not found' },
  });
}

function parseSessionCommandStatuses(value?: string): SessionCommandStatus[] | undefined | null {
  if (value === undefined) return undefined;
  const statuses = value.split(',').map((status) => status.trim());
  const parsed = z.array(sessionCommandStatusSchema).min(1).safeParse(statuses);
  return parsed.success ? parsed.data : null;
}

function publicSessionCommand(command: SessionCommandRecord) {
  const {
    payloadRef: _payloadRef,
    payloadHash: _payloadHash,
    claimedBy: _claimedBy,
    leaseExpiresAt: _leaseExpiresAt,
    ...publicRecord
  } = command;
  return publicRecord;
}

export default router;
