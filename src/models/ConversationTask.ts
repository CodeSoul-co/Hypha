import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Ritual symbols associated with a conversation task
 */
export interface IRitualSymbols {
  triggers: string[];
  stages: string[];
}

/**
 * Token usage for a single conversation task
 */
export interface ITaskTokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost?: number;
  modelId: string;
  modelProvider: string;
}

/**
 * Sub-document: a single round in the ritual
 */
export interface IRitualRound {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
}

/**
 * A ritual conversation task — each "问一问" invocation creates one of these.
 */
export interface IConversationTask extends Document {
  userId: string;
  sessionId: string;
  ritualQuestion: string;
  ritualSymbols: IRitualSymbols;
  symbols: string[];
  modelId: string;
  modelProvider: string;
  responseContent: string;
  keyInsight?: string;
  exploreQuestions: string[];
  rounds: IRitualRound[];
  tokenUsage?: ITaskTokenUsage;
  isArchived: boolean;
  isShared: boolean;
  sharedCount: number;
  likedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const RitualSymbolsSchema = new Schema<IRitualSymbols>(
  {
    triggers: { type: [String], default: [] },
    stages: { type: [String], default: [] },
  },
  { _id: false }
);

const TokenUsageSchema = new Schema<ITaskTokenUsage>(
  {
    inputTokens: { type: Number, default: 0 },
    outputTokens: { type: Number, default: 0 },
    totalTokens: { type: Number, default: 0 },
    cost: Number,
    modelId: { type: String, required: true },
    modelProvider: { type: String, required: true },
  },
  { _id: false }
);

const RitualRoundSchema = new Schema<IRitualRound>(
  {
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    tokens: Number,
  },
  { _id: false }
);

const ConversationTaskSchema = new Schema<IConversationTask>(
  {
    userId: {
      type: String,
      required: true,
      // Indexed via compound { userId: 1, createdAt: -1 } below.
    },
    sessionId: {
      type: String,
      required: true,
      // sessionId is a queryable foreign key but not on a hot path; rely on
      // the existing compound { userId, sessionId, userId } uniqueness rather
      // than a separate single-field index.
    },
    ritualQuestion: {
      type: String,
      required: true,
    },
    ritualSymbols: {
      type: RitualSymbolsSchema,
      default: () => ({
        triggers: ['乾', '坤', '震'],
        stages: ['起', '承', '转', '合', '观', '悟'],
      }),
    },
    symbols: {
      type: [String],
      default: [],
    },
    modelId: {
      type: String,
      required: true,
    },
    modelProvider: {
      type: String,
      required: true,
    },
    responseContent: {
      type: String,
      default: '',
    },
    keyInsight: String,
    exploreQuestions: {
      type: [String],
      default: [],
    },
    rounds: {
      type: [RitualRoundSchema],
      default: [],
    },
    tokenUsage: {
      type: TokenUsageSchema,
      default: undefined,
    },
    isArchived: {
      type: Boolean,
      default: false,
      // Covered by the compound { userId, isArchived, createdAt } index below.
    },
    isShared: {
      type: Boolean,
      default: false,
    },
    sharedCount: {
      type: Number,
      default: 0,
    },
    likedCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'conversation_tasks',
  }
);

// Compound / sort indexes (single-field indexes are inline on the schema).
ConversationTaskSchema.index({ userId: 1, createdAt: -1 });
ConversationTaskSchema.index({ userId: 1, isArchived: 1, createdAt: -1 });
ConversationTaskSchema.index({ likedCount: -1 });
ConversationTaskSchema.index({ sharedCount: -1 });

export const ConversationTaskModel: Model<IConversationTask> = mongoose.model<IConversationTask>(
  'ConversationTask',
  ConversationTaskSchema
);

export default ConversationTaskModel;
