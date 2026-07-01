import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITokenUsage extends Document {
  userId: string;
  sessionId?: string;
  conversationId?: mongoose.Types.ObjectId;
  modelId: string;
  modelProvider: string;
  promptTokens: number;
  /** Prompt tokens served from provider cache (e.g. DeepSeek prompt cache).
   *  Charged at a discounted rate; defaults to 0 for providers without caching. */
  cacheHitTokens: number;
  completionTokens: number;
  totalTokens: number;
  promptCost: number;
  completionCost: number;
  totalCost: number;
  endpoint: string;
  requestType: 'chat' | 'stream' | 'tool' | 'other';
  responseTimeMs: number;
  inputPricePerM: number;
  outputPricePerM: number;
  cacheHitPricePerM: number;
  createdAt: Date;
  updatedAt: Date;
}

// Static methods interface
export interface ITokenUsageModel extends Model<ITokenUsage> {
  getUserStats(userId: string, startDate?: Date, endDate?: Date): Promise<any>;
  getUserStatsByModel(userId: string, startDate?: Date, endDate?: Date): Promise<any>;
  getDailyStats(userId: string, days?: number): Promise<any>;
}

// Pricing per million tokens (USD) - as of 2026.
// `cacheHit` is the discounted rate for prompt tokens served from the
// provider's prompt cache (e.g. DeepSeek's ¥0.02 / ¥0.025 per M). Models
// without a cache tier fall back to `input` for the cache-hit bucket.
export const MODEL_PRICING: Record<string, { input: number; output: number; cacheHit?: number }> = {
  // Anthropic
  'claude-3-5-sonnet-20241022': { input: 3, output: 15 },
  'claude-3-5-haiku-20241022':  { input: 0.8, output: 4 },
  'claude-3-opus-20240229':     { input: 15, output: 75 },
  'claude-3-sonnet-20240229':   { input: 3, output: 15 },

  // OpenAI
  'gpt-4o':           { input: 2.5, output: 10 },
  'gpt-4-turbo':      { input: 10, output: 30 },
  'gpt-4':            { input: 30, output: 60 },
  'gpt-3.5-turbo':    { input: 0.5, output: 1.5 },

  // Google
  'gemini-2.0-flash':  { input: 0, output: 0.1 },
  'gemini-1.5-pro':    { input: 1.25, output: 5 },
  'gemini-1.5-flash':  { input: 0.075, output: 0.3 },

  // DeepSeek (CNY→USD at ~7:1, official 2026/06 pricing)
  //   v4-flash: ¥1 in (miss) / ¥0.02 in (cache hit) / ¥2 out per M
  //   v4-pro:   ¥3 in (miss) / ¥0.025 in (cache hit) / ¥6 out per M
  //   Legacy deepseek-chat/reasoner alias to v4-flash, deprecated 2026/07/24
  'deepseek-v4-flash': { input: 0.14, output: 0.28, cacheHit: 0.0028 },
  'deepseek-v4-pro':   { input: 0.42, output: 0.84, cacheHit: 0.0035 },
  'deepseek-chat':     { input: 0.14, output: 0.28, cacheHit: 0.0028 },
  'deepseek-reasoner': { input: 0.14, output: 0.28, cacheHit: 0.0028 },
  'deepseek-coder':    { input: 0.14, output: 0.28, cacheHit: 0.0028 },

  // Ollama (free, local)
  'llama2':            { input: 0, output: 0 },
  'llama3':            { input: 0, output: 0 },
  'mistral':           { input: 0, output: 0 },
  'codellama':         { input: 0, output: 0 },
  'phi3':              { input: 0, output: 0 },

  // SiliconFlow (OpenAI compatible — used by frontend by default)
  'Qwen/Qwen2.5-7B-Instruct': { input: 0, output: 0 },  // free tier
  'Qwen/Qwen3-32B':           { input: 0, output: 0 },  // free tier
  'deepseek-ai/DeepSeek-V2.5': { input: 0, output: 0 },  // free tier
  'THUDM/glm-4-9b-chat':       { input: 0, output: 0 },  // free tier

  // OpenAI Compatible
  'moonshot-v1-8k':    { input: 1, output: 2 },
  'moonshot-v1-32k':   { input: 1, output: 2 },
  'moonshot-v1-128k':  { input: 1, output: 2 },
};

export function getModelPricing(modelId: string, _provider: string):
  { input: number; output: number; cacheHit: number } {
  if (MODEL_PRICING[modelId]) {
    const p = MODEL_PRICING[modelId];
    return { input: p.input, output: p.output, cacheHit: p.cacheHit ?? p.input };
  }
  // Default pricing for unknown models
  return { input: 1, output: 3, cacheHit: 1 };
}

export function calculateCost(
  modelId: string,
  promptTokens: number,
  completionTokens: number,
  cacheHitTokens: number = 0,
): { promptCost: number; completionCost: number; totalCost: number } {
  const pricing = getModelPricing(modelId, '');

  // DeepSeek reports prompt_tokens as the sum of cache hits + misses, so
  // subtract the cached portion to avoid double-charging.
  const missTokens = Math.max(0, promptTokens - cacheHitTokens);
  const missCost = (missTokens / 1_000_000) * pricing.input;
  const hitCost  = (cacheHitTokens / 1_000_000) * pricing.cacheHit;
  const promptCost = missCost + hitCost;
  const completionCost = (completionTokens / 1_000_000) * pricing.output;
  return {
    promptCost: Math.round(promptCost * 1_000_000) / 1_000_000,
    completionCost: Math.round(completionCost * 1_000_000) / 1_000_000,
    totalCost: Math.round((promptCost + completionCost) * 1_000_000) / 1_000_000,
  };
}

const TokenUsageSchema = new Schema<ITokenUsage>(
  {
    userId: {
      type: String,
      required: true,
      // Indexed via compound { userId: 1, createdAt: -1 } below — declaring
      // it as `index: true` here would warn about a duplicate.
    },
    sessionId: {
      type: String,
      index: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
    modelId: {
      type: String,
      required: true,
      index: true,
    },
    modelProvider: {
      type: String,
      required: true,
      index: true,
    },
    promptTokens: {
      type: Number,
      default: 0,
    },
    cacheHitTokens: {
      type: Number,
      default: 0,
    },
    completionTokens: {
      type: Number,
      default: 0,
    },
    totalTokens: {
      type: Number,
      default: 0,
    },
    promptCost: {
      type: Number,
      default: 0,
    },
    completionCost: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    endpoint: {
      type: String,
      default: '/chat',
    },
    requestType: {
      type: String,
      enum: ['chat', 'stream', 'tool', 'other'],
      default: 'chat',
    },
    responseTimeMs: {
      type: Number,
      default: 0,
    },
    inputPricePerM: {
      type: Number,
      default: 0,
    },
    outputPricePerM: {
      type: Number,
      default: 0,
    },
    cacheHitPricePerM: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'token_usages',
  }
);

// Compound indexes for common queries. The leading `userId` of these
// compounds satisfies the single-field index on `userId`, so we don't
// re-declare a separate { userId: 1 } index here.
TokenUsageSchema.index({ userId: 1, createdAt: -1 });
TokenUsageSchema.index({ userId: 1, modelProvider: 1, createdAt: -1 });
TokenUsageSchema.index({ userId: 1, modelId: 1, createdAt: -1 });
TokenUsageSchema.index({ conversationId: 1, createdAt: -1 });

// Static aggregation methods
TokenUsageSchema.statics.getUserStats = async function (userId: string, startDate?: Date, endDate?: Date) {
  const match: Record<string, any> = { userId };
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = startDate;
    if (endDate) match.createdAt.$lte = endDate;
  }

  const stats = await this.aggregate([
    { $match: match },
    {
      $group: {
        _id: null,
        totalPromptTokens: { $sum: '$promptTokens' },
        totalCompletionTokens: { $sum: '$completionTokens' },
        totalTokens: { $sum: '$totalTokens' },
        totalCost: { $sum: '$totalCost' },
        requestCount: { $sum: 1 },
      },
    },
  ]);

  return stats[0] || {
    totalPromptTokens: 0,
    totalCompletionTokens: 0,
    totalTokens: 0,
    totalCost: 0,
    requestCount: 0,
  };
};

TokenUsageSchema.statics.getUserStatsByModel = async function (userId: string, startDate?: Date, endDate?: Date) {
  const match: Record<string, any> = { userId };
  if (startDate || endDate) {
    match.createdAt = {};
    if (startDate) match.createdAt.$gte = startDate;
    if (endDate) match.createdAt.$lte = endDate;
  }

  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: { modelId: '$modelId', modelProvider: '$modelProvider' },
        totalPromptTokens: { $sum: '$promptTokens' },
        totalCompletionTokens: { $sum: '$completionTokens' },
        totalTokens: { $sum: '$totalTokens' },
        totalCost: { $sum: '$totalCost' },
        requestCount: { $sum: 1 },
      },
    },
    { $sort: { totalCost: -1 } },
  ]);
};

TokenUsageSchema.statics.getDailyStats = async function (userId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    { $match: { userId, createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
        },
        totalPromptTokens: { $sum: '$promptTokens' },
        totalCompletionTokens: { $sum: '$completionTokens' },
        totalTokens: { $sum: '$totalTokens' },
        totalCost: { $sum: '$totalCost' },
        requestCount: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
  ]);
};

export const TokenUsageModel = mongoose.model<ITokenUsage, ITokenUsageModel>('TokenUsage', TokenUsageSchema);

export default TokenUsageModel;
