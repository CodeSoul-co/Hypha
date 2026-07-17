import { expect } from 'vitest';
import { z, type ZodRawShape, type ZodTypeAny } from 'zod';
import type { JsonSchema } from '../src/specs';

export interface ContractSchemaPair {
  name: string;
  zod: ZodTypeAny;
  json: JsonSchema;
}

export function requireJsonSchemaProperty(schema: JsonSchema, property: string): JsonSchema {
  const result = schema.properties?.[property];
  if (!result) throw new TypeError(`missing JSON Schema property ${property}`);
  return result;
}

export function requireJsonSchemaItems(schema: JsonSchema, property: string): JsonSchema {
  const items = requireJsonSchemaProperty(schema, property).items;
  if (!items) throw new TypeError(`missing JSON Schema items for ${property}`);
  return items;
}

export function sortStrings(values: readonly string[]): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

export function expectContractParity(pair: ContractSchemaPair): void {
  const shape = unwrapObjectSchema(pair.zod).shape;
  const zodKeys = sortStrings(Object.keys(shape));
  const jsonKeys = sortStrings(Object.keys(pair.json.properties ?? {}));
  const zodRequired = sortStrings(
    Object.entries(shape)
      .filter(([, field]) => !field.isOptional())
      .map(([key]) => key)
  );
  const jsonRequired = sortStrings(pair.json.required ?? []);

  expect(pair.json.type, pair.name).toBe('object');
  expect(pair.json.additionalProperties, pair.name).toBe(false);
  expect(jsonKeys, `${pair.name} property drift`).toEqual(zodKeys);
  expect(jsonRequired, `${pair.name} required-field drift`).toEqual(zodRequired);
}

function unwrapObjectSchema(schema: ZodTypeAny): z.ZodObject<ZodRawShape> {
  let current = schema;
  while (current instanceof z.ZodEffects) current = current.innerType();
  if (!(current instanceof z.ZodObject)) {
    throw new TypeError('contract parity requires an object Zod schema');
  }
  return current;
}
