import { TokenUsageModel, ITokenUsage, calculateCost, getModelPricing } from '../models/TokenUsage';
import { logger } from '../utils/logger';

export interface TokenUsageRecord {
  userId: string;
  sessionId?: string;
  conversationId?: string;
  modelId: string;
  modelProvider: string;
  promptTokens: number;
  /** Optional. Prompt tokens served from the provider cache (e.g. DeepSeek).
   *  Cost is computed at the discounted cacheHit rate; the remaining
   *  (promptTokens - cacheHitTokens) is charged at the regular input rate. */
  cacheHitTokens?: number;
  completionTokens: number;
  totalTokens: number;
  endpoint: string;
  requestType: 'chat' | 'stream' | 'tool' | 'other';
  responseTimeMs: number;
}

class TokenService {
  /**
   * Record token usage for a request
   */
  async recordUsage(record: TokenUsageRecord): Promise<ITokenUsage> {
    try {
      const cacheHit = Math.max(0, record.cacheHitTokens ?? 0);
      const costs = calculateCost(
        record.modelId,
        record.promptTokens,
        record.completionTokens,
        cacheHit,
      );
      const pricing = getModelPricing(record.modelId, record.modelProvider);

      const usage = new TokenUsageModel({
        userId: record.userId,
        sessionId: record.sessionId,
        conversationId: record.conversationId,
        modelId: record.modelId,
        modelProvider: record.modelProvider,
        promptTokens: record.promptTokens,
        cacheHitTokens: cacheHit,
        completionTokens: record.completionTokens,
        totalTokens: record.totalTokens,
        promptCost: costs.promptCost,
        completionCost: costs.completionCost,
        totalCost: costs.totalCost,
        endpoint: record.endpoint,
        requestType: record.requestType,
        responseTimeMs: record.responseTimeMs,
        inputPricePerM: pricing.input,
        outputPricePerM: pricing.output,
        cacheHitPricePerM: pricing.cacheHit,
      });

      await usage.save();
      return usage;
    } catch (error) {
      logger.error('Failed to record token usage:', error);
      throw error;
    }
  }

  /**
   * Get user's total usage stats
   */
  async getUserTotalStats(userId: string, startDate?: Date, endDate?: Date) {
    return TokenUsageModel.getUserStats(userId, startDate, endDate);
  }

  /**
   * Get user's usage stats grouped by model
   */
  async getUserStatsByModel(userId: string, startDate?: Date, endDate?: Date) {
    return TokenUsageModel.getUserStatsByModel(userId, startDate, endDate);
  }

  /**
   * Get user's daily usage for the last N days
   */
  async getDailyStats(userId: string, days: number = 30) {
    return TokenUsageModel.getDailyStats(userId, days);
  }

  /**
   * Get user's recent usage records
   */
  async getRecentUsage(userId: string, limit: number = 50, skip: number = 0) {
    return TokenUsageModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  }

  /**
   * Get usage records for a specific conversation
   */
  async getConversationUsage(conversationId: string) {
    return TokenUsageModel
      .find({ conversationId })
      .sort({ createdAt: 1 })
      .lean();
  }

  /**
   * Delete usage records for a user (GDPR compliance)
   */
  async deleteUserUsage(userId: string) {
    const result = await TokenUsageModel.deleteMany({ userId });
    logger.info(`Deleted ${result.deletedCount} token usage records for user ${userId}`);
    return result;
  }
}

// Singleton instance
let tokenServiceInstance: TokenService | null = null;

export function getTokenService(): TokenService {
  if (!tokenServiceInstance) {
    tokenServiceInstance = new TokenService();
  }
  return tokenServiceInstance;
}

export default getTokenService;
