import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authMiddleware, apiKeyMiddleware } from '../middleware/auth';
import { getTemporaryMemory } from '../core/memory/TemporaryMemory';
import { getPermanentMemory } from '../core/memory/PermanentMemory';
import { HTTP_STATUS } from '../constants';

const router = Router();

router.use(apiKeyMiddleware);
router.use(authMiddleware(false));

// Get user ID helper
const getUserId = (req: Request): string => {
  return req.user?.userId || req.apiKey?.userId || '';
};

// Temporary Memory Routes

// Get temporary memory for session
router.get(
  '/temp/:sessionId',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { limit } = req.query;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    const messages = await tempMemory.getMessages(
      sessionId,
      limit ? parseInt(limit as string) : undefined,
      userId
    );

    // Get session info
    const sessionInfo = await tempMemory.getSessionInfo(sessionId, userId);

    res.json({
      success: true,
      data: {
        sessionId,
        messages,
        ...sessionInfo,
      },
    });
  })
);

// Get all sessions for user
router.get(
  '/temp',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    const sessions = await tempMemory.getAllSessions(userId);

    res.json({
      success: true,
      data: sessions,
    });
  })
);

// Clear temporary memory
router.delete(
  '/temp/:sessionId',
  asyncHandler(async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const tempMemory = getTemporaryMemory();
    await tempMemory.clearMessages(sessionId, userId);

    res.json({
      success: true,
      message: 'Temporary memory cleared',
    });
  })
);

// Permanent Memory Routes

// List conversations
router.get(
  '/permanent',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { page, pageSize, agentId, isArchived, startDate, endDate } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const conversations = await permanentMemory.listConversations(userId, {
      page: page ? parseInt(page as string) : 1,
      pageSize: pageSize ? parseInt(pageSize as string) : 20,
      agentId: agentId as string,
      isArchived: isArchived ? isArchived === 'true' : undefined,
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res.json({
      success: true,
      data: conversations,
    });
  })
);

// Get conversation
router.get(
  '/permanent/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const conversation = await permanentMemory.getConversation(id);

    if (!conversation || conversation.userId !== userId) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    res.json({
      success: true,
      data: conversation,
    });
  })
);

// Get conversation messages
router.get(
  '/permanent/:id/messages',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { page, pageSize, roles } = req.query;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const conversation = await permanentMemory.getConversation(id);
    if (!conversation || conversation.userId !== userId) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    const messages = await permanentMemory.getMessages(id, {
      page: page ? parseInt(page as string) : 1,
      pageSize: pageSize ? parseInt(pageSize as string) : 50,
      roles: roles ? ((roles as string).split(',') as any) : undefined,
    });

    res.json({
      success: true,
      data: messages,
    });
  })
);

// Create conversation
router.post(
  '/permanent',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { sessionId, agentId, modelId, modelProvider, title, tags } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const conversation = await permanentMemory.createConversation({
      userId,
      sessionId,
      agentId: agentId || 'default',
      modelId,
      modelProvider,
      title,
      tags: tags || [],
      isArchived: false,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      data: conversation,
    });
  })
);

// Update conversation
router.put(
  '/permanent/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, tags, isArchived } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const existing = await permanentMemory.getConversation(id);
    if (!existing || existing.userId !== userId) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    const conversation = await permanentMemory.updateConversation(id, {
      title,
      tags,
      isArchived,
    });

    if (!conversation) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    res.json({
      success: true,
      data: conversation,
    });
  })
);

// Delete conversation
router.delete(
  '/permanent/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const existing = await permanentMemory.getConversation(id);
    if (!existing || existing.userId !== userId) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    const deleted = await permanentMemory.deleteConversation(id);

    if (!deleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Conversation not found' },
      });
    }

    res.json({
      success: true,
      message: 'Conversation deleted',
    });
  })
);

// Search conversations
router.get(
  '/permanent/search/conversations',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { q, page, pageSize } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    if (!q) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'MISSING_QUERY',
          message: 'Query parameter q is required',
        },
      });
    }

    const permanentMemory = getPermanentMemory();
    const results = await permanentMemory.searchConversations(userId, q as string, {
      page: page ? parseInt(page as string) : 1,
      pageSize: pageSize ? parseInt(pageSize as string) : 20,
    });

    res.json({
      success: true,
      data: results,
    });
  })
);

// Search messages
router.get(
  '/permanent/search/messages',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);
    const { q, page, pageSize } = req.query;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    if (!q) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        error: {
          code: 'MISSING_QUERY',
          message: 'Query parameter q is required',
        },
      });
    }

    const permanentMemory = getPermanentMemory();
    const results = await permanentMemory.searchMessages(userId, q as string, {
      page: page ? parseInt(page as string) : 1,
      pageSize: pageSize ? parseInt(pageSize as string) : 20,
    });

    res.json({
      success: true,
      data: results,
    });
  })
);

// Get memory stats
router.get(
  '/stats',
  asyncHandler(async (req: Request, res: Response) => {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'User ID required' },
      });
    }

    const permanentMemory = getPermanentMemory();
    const stats = await permanentMemory.getConversationStats(userId);

    res.json({
      success: true,
      data: stats,
    });
  })
);

export default router;
