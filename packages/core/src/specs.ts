export interface VersionedSpec {
  id: string;
  version: string;
}

export interface SpecMetadata {
  name?: string;
  description?: string;
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface JsonSchema {
  type?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  additionalProperties?: boolean | JsonSchema;
  [key: string]: unknown;
}

export type SideEffectLevel = 'none' | 'read' | 'write' | 'external_effect' | 'irreversible';

export interface OutputContractSpec extends VersionedSpec, SpecMetadata {
  schema: JsonSchema;
}
