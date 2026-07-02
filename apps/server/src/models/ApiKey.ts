import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export interface IApiKey extends Document {
  userId: mongoose.Types.ObjectId;
  keyId: string; // Public identifier
  keyHash: string; // Hashed version for lookup
  name: string;
  description?: string;
  permissions: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  verifyKey(plainKey: string): Promise<boolean>;
  markUsed(): Promise<void>;
}

// Static methods interface
export interface IApiKeyModel extends Model<IApiKey> {
  generateKey(prefix?: string): {
    keyId: string;
    plainKey: string;
    keyHash: string;
  };
}

const ApiKeySchema = new Schema<IApiKey>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    keyId: {
      type: String,
      required: true,
      unique: true,
    },
    keyHash: {
      type: String,
      required: true,
      select: false, // Don't include hash by default
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    permissions: {
      type: [String],
      default: ['chat:read', 'chat:write'],
    },
    expiresAt: Date,
    lastUsedAt: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'api_keys',
  }
);

// Static method to generate a new API key
ApiKeySchema.statics.generateKey = function (prefix: string = 'oa'): {
  keyId: string;
  plainKey: string;
  keyHash: string;
} {
  const keyId = `${prefix}_${crypto.randomBytes(8).toString('hex')}`;
  const plainKey = `${keyId}_${crypto.randomBytes(24).toString('base64url')}`;
  const keyHash = crypto.createHash('sha256').update(plainKey).digest('hex');

  return { keyId, plainKey, keyHash };
};

// Instance method to verify key
ApiKeySchema.methods.verifyKey = async function (plainKey: string): Promise<boolean> {
  const hash = crypto.createHash('sha256').update(plainKey).digest('hex');
  return this.keyHash === hash;
};

// Instance method to mark key as used
ApiKeySchema.methods.markUsed = async function (): Promise<void> {
  this.lastUsedAt = new Date();
  await this.save();
};

// Index
ApiKeySchema.index({ keyId: 1, isActive: 1 });
ApiKeySchema.index({ expiresAt: 1 }); // TTL index (will be handled at application level)

export const ApiKeyModel = mongoose.model<IApiKey, IApiKeyModel>('ApiKey', ApiKeySchema);

export default ApiKeyModel;
