import mongoose, { Schema, Document, Model } from 'mongoose';
import { PermanentConversation, PermanentMessage } from '../core/memory/types';

export interface IConversation extends Document {
  userId: string;
  sessionId: string;
  agentId: string;
  modelId: string;
  modelProvider: string;
  title?: string;
  tags: string[];
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    userId: {
      type: String,
      required: true,
      // Indexed via the { userId: 1, createdAt: -1 } compound below.
    },
    sessionId: {
      type: String,
      required: true,
      // Uniqueness enforced via the compound { sessionId, userId } index below.
    },
    agentId: {
      type: String,
      required: true,
      default: 'default',
    },
    modelId: {
      type: String,
      required: true,
    },
    modelProvider: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'New Conversation',
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'conversations',
  }
);

// Compound indexes (single-field indexes are declared inline on the schema
// via `index: true` — do not re-declare them here or Mongoose warns about
// duplicate indexes).
ConversationSchema.index({ userId: 1, createdAt: -1 });
ConversationSchema.index({ userId: 1, agentId: 1, createdAt: -1 });
// `sessionId` already has a non-unique single-field index above; we add a
// separate unique compound so lookups by session AND user stay O(1).
ConversationSchema.index({ sessionId: 1, userId: 1 }, { unique: true });

export interface IMessage extends Document {
  conversationId: mongoose.Types.ObjectId;
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  timestamp: Date;
  modelId?: string;
  modelProvider?: string;
  tokens?: number;
  attachments: Array<{
    type: 'image' | 'file' | 'audio';
    url: string;
    name?: string;
    mimeType?: string;
  }>;
  metadata: Record<string, any>;
}

const MessageSchema = new Schema<IMessage>(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
      index: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['system', 'user', 'assistant', 'function'],
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    modelId: String,
    modelProvider: String,
    tokens: Number,
    attachments: [
      {
        type: {
          type: String,
          enum: ['image', 'file', 'audio'],
        },
        url: String,
        name: String,
        mimeType: String,
      },
    ],
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: false,
    collection: 'messages',
  }
);

// Compound indexes
MessageSchema.index({ conversationId: 1, timestamp: -1 });
MessageSchema.index({ conversationId: 1, role: 1 });

// Model exports
export const ConversationModel: Model<IConversation> = mongoose.model<IConversation>(
  'Conversation',
  ConversationSchema
);

export const MessageModel: Model<IMessage> = mongoose.model<IMessage>('Message', MessageSchema);

export default { ConversationModel, MessageModel };
