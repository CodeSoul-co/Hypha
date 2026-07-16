import mongoose from 'mongoose';
import { ConversationModel, MessageModel } from '../../models/Conversation';
import { IConversation, IMessage } from '../../models/Conversation';
import {
  PermanentConversation,
  PermanentMessage,
  IPermanentStore,
  ListConversationsOptions,
  ListMessagesOptions,
  SearchOptions,
} from './types';
import { logger } from '../../utils/logger';
import { generateId, now } from '../../utils/helpers';

// Helper to convert Mongoose doc to plain object
function toPlainConversation(doc: IConversation): PermanentConversation {
  return {
    id: doc._id.toString(),
    userId: doc.userId,
    sessionId: doc.sessionId,
    agentId: doc.agentId,
    modelId: doc.modelId,
    modelProvider: doc.modelProvider,
    title: doc.title,
    tags: doc.tags,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    isArchived: doc.isArchived,
  };
}

function toPlainMessage(doc: IMessage): PermanentMessage {
  return {
    id: doc._id.toString(),
    conversationId: doc.conversationId.toString(),
    role: doc.role,
    content: doc.content,
    timestamp: doc.timestamp,
    modelId: doc.modelId,
    modelProvider: doc.modelProvider,
    tokens: doc.tokens,
    attachments: doc.attachments,
    metadata: doc.metadata,
  };
}

export class PermanentMemory implements IPermanentStore {
  async createConversation(
    conversation: Omit<PermanentConversation, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<PermanentConversation> {
    try {
      const doc = await ConversationModel.create({
        userId: conversation.userId,
        sessionId: conversation.sessionId,
        agentId: conversation.agentId,
        modelId: conversation.modelId,
        modelProvider: conversation.modelProvider,
        title: conversation.title,
        tags: conversation.tags || [],
        isArchived: conversation.isArchived || false,
      });

      logger.debug('Created conversation', { conversationId: doc._id });
      return toPlainConversation(doc);
    } catch (error: any) {
      if (error.code === 11000) {
        // Duplicate user/session pair - return the existing conversation.
        const existing = await ConversationModel.findOne({
          sessionId: conversation.sessionId,
          userId: conversation.userId,
        });
        if (existing) {
          return toPlainConversation(existing);
        }
      }
      logger.error('Failed to create conversation:', error);
      throw error;
    }
  }

  async getConversation(id: string): Promise<PermanentConversation | null> {
    try {
      const doc = await ConversationModel.findById(id);
      return doc ? toPlainConversation(doc) : null;
    } catch (error) {
      logger.error('Failed to get conversation:', error);
      return null;
    }
  }

  async getConversationBySessionId(
    sessionId: string,
    userId?: string
  ): Promise<PermanentConversation | null> {
    try {
      const doc = await ConversationModel.findOne({
        sessionId,
        ...(userId ? { userId } : {}),
      });
      return doc ? toPlainConversation(doc) : null;
    } catch (error) {
      logger.error('Failed to get conversation by sessionId:', error);
      return null;
    }
  }

  async updateConversation(
    id: string,
    updates: Partial<PermanentConversation>
  ): Promise<PermanentConversation | null> {
    try {
      const doc = await ConversationModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(updates.title !== undefined && { title: updates.title }),
            ...(updates.tags !== undefined && { tags: updates.tags }),
            ...(updates.isArchived !== undefined && {
              isArchived: updates.isArchived,
            }),
            ...(updates.agentId !== undefined && { agentId: updates.agentId }),
          },
        },
        { new: true }
      );

      return doc ? toPlainConversation(doc) : null;
    } catch (error) {
      logger.error('Failed to update conversation:', error);
      return null;
    }
  }

  async deleteConversation(id: string): Promise<boolean> {
    try {
      const result = await ConversationModel.findByIdAndDelete(id);
      if (result) {
        // Also delete all messages in this conversation
        await MessageModel.deleteMany({ conversationId: id });
        logger.debug('Deleted conversation and its messages', {
          conversationId: id,
        });
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Failed to delete conversation:', error);
      return false;
    }
  }

  async listConversations(
    userId: string,
    options: ListConversationsOptions = {}
  ): Promise<PermanentConversation[]> {
    try {
      const { page = 1, pageSize = 20, agentId, isArchived, startDate, endDate } = options;

      const filter: Record<string, any> = { userId };

      if (agentId) filter.agentId = agentId;
      if (isArchived !== undefined) filter.isArchived = isArchived;
      if (startDate || endDate) {
        filter.createdAt = {};
        if (startDate) filter.createdAt.$gte = startDate;
        if (endDate) filter.createdAt.$lte = endDate;
      }

      const skip = (page - 1) * pageSize;

      const docs = await ConversationModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pageSize);

      return docs.map(toPlainConversation);
    } catch (error) {
      logger.error('Failed to list conversations:', error);
      return [];
    }
  }

  async addMessage(
    conversationId: string,
    message: Omit<PermanentMessage, 'id' | 'conversationId' | 'timestamp'>
  ): Promise<PermanentMessage> {
    try {
      const doc = await MessageModel.create({
        conversationId: new mongoose.Types.ObjectId(conversationId),
        role: message.role,
        content: message.content,
        timestamp: now(),
        modelId: message.modelId,
        modelProvider: message.modelProvider,
        tokens: message.tokens,
        attachments: message.attachments || [],
        metadata: message.metadata || {},
      });

      // Update conversation's updatedAt timestamp
      await ConversationModel.findByIdAndUpdate(conversationId, {
        updatedAt: now(),
      });

      logger.debug('Added message to conversation', {
        conversationId,
        messageId: doc._id,
      });
      return toPlainMessage(doc);
    } catch (error) {
      logger.error('Failed to add message:', error);
      throw error;
    }
  }

  async getMessages(
    conversationId: string,
    options: ListMessagesOptions = {}
  ): Promise<PermanentMessage[]> {
    try {
      const { page = 1, pageSize = 50, startDate, endDate, roles } = options;

      const filter: Record<string, any> = {
        conversationId: new mongoose.Types.ObjectId(conversationId),
      };

      if (startDate || endDate) {
        filter.timestamp = {};
        if (startDate) filter.timestamp.$gte = startDate;
        if (endDate) filter.timestamp.$lte = endDate;
      }

      if (roles && roles.length > 0) {
        filter.role = { $in: roles };
      }

      const skip = (page - 1) * pageSize;

      const docs = await MessageModel.find(filter)
        .sort({ timestamp: 1 })
        .skip(skip)
        .limit(pageSize);

      return docs.map(toPlainMessage);
    } catch (error) {
      logger.error('Failed to get messages:', error);
      return [];
    }
  }

  async deleteMessage(conversationId: string, messageId: string): Promise<boolean> {
    try {
      const result = await MessageModel.findOneAndDelete({
        _id: new mongoose.Types.ObjectId(messageId),
        conversationId: new mongoose.Types.ObjectId(conversationId),
      });

      return !!result;
    } catch (error) {
      logger.error('Failed to delete message:', error);
      return false;
    }
  }

  async searchConversations(
    userId: string,
    query: string,
    options: SearchOptions = {}
  ): Promise<PermanentConversation[]> {
    try {
      const { page = 1, pageSize = 20 } = options;
      const skip = (page - 1) * pageSize;

      const docs = await ConversationModel.find({
        userId,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } },
        ],
      })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(pageSize);

      return docs.map(toPlainConversation);
    } catch (error) {
      logger.error('Failed to search conversations:', error);
      return [];
    }
  }

  async searchMessages(
    userId: string,
    query: string,
    options: SearchOptions = {}
  ): Promise<PermanentMessage[]> {
    try {
      const { page = 1, pageSize = 20 } = options;
      const skip = (page - 1) * pageSize;

      // First get user's conversation IDs
      const conversations = await ConversationModel.find({ userId }).select('_id');
      const conversationIds = conversations.map((c) => c._id);

      const docs = await MessageModel.find({
        conversationId: { $in: conversationIds },
        content: { $regex: query, $options: 'i' },
      })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(pageSize);

      return docs.map(toPlainMessage);
    } catch (error) {
      logger.error('Failed to search messages:', error);
      return [];
    }
  }

  async getConversationStats(userId: string): Promise<{
    totalConversations: number;
    totalMessages: number;
    lastConversation?: Date;
  }> {
    try {
      const [stats, lastConv] = await Promise.all([
        ConversationModel.aggregate([
          { $match: { userId } },
          {
            $group: {
              _id: null,
              totalConversations: { $sum: 1 },
            },
          },
        ]),
        ConversationModel.findOne({ userId }).sort({ updatedAt: -1 }).select('updatedAt'),
      ]);

      const totalConversations = stats[0]?.totalConversations || 0;

      const messageStats = await MessageModel.aggregate([
        {
          $lookup: {
            from: 'conversations',
            localField: 'conversationId',
            foreignField: '_id',
            as: 'conversation',
          },
        },
        {
          $unwind: '$conversation',
        },
        {
          $match: { 'conversation.userId': userId },
        },
        {
          $group: {
            _id: null,
            totalMessages: { $sum: 1 },
          },
        },
      ]);

      const totalMessages = messageStats[0]?.totalMessages || 0;

      return {
        totalConversations,
        totalMessages,
        lastConversation: lastConv?.updatedAt,
      };
    } catch (error) {
      logger.error('Failed to get conversation stats:', error);
      return { totalConversations: 0, totalMessages: 0 };
    }
  }

  async archiveOldConversations(archiveAfter: number): Promise<number> {
    try {
      const cutoffDate = new Date(Date.now() - archiveAfter);

      const result = await ConversationModel.updateMany(
        {
          isArchived: false,
          updatedAt: { $lt: cutoffDate },
        },
        { $set: { isArchived: true } }
      );

      if (result.modifiedCount > 0) {
        logger.info('Archived old conversations', {
          count: result.modifiedCount,
        });
      }

      return result.modifiedCount;
    } catch (error) {
      logger.error('Failed to archive conversations:', error);
      return 0;
    }
  }
}

// Singleton instance
let permanentMemoryInstance: PermanentMemory | null = null;

export function getPermanentMemory(): PermanentMemory {
  if (!permanentMemoryInstance) {
    permanentMemoryInstance = new PermanentMemory();
  }
  return permanentMemoryInstance;
}

export default PermanentMemory;
