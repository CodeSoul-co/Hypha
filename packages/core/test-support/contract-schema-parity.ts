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
  expectSchemaNodeParity(pair.zod, pair.json, pair.name, true);
}

function expectSchemaNodeParity(
  zodSchema: ZodTypeAny,
  jsonSchema: JsonSchema,
  path: string,
  enforceUnknownFieldPolicy = false
): void {
  const schema = unwrapSchema(zodSchema);

  if (schema instanceof z.ZodNullable) {
    expectNullableParity(schema, jsonSchema, path);
    return;
  }
  if (schema instanceof z.ZodObject) {
    expectObjectParity(schema, jsonSchema, path, enforceUnknownFieldPolicy);
    return;
  }
  if (schema instanceof z.ZodString) {
    expectStringParity(schema, jsonSchema, path);
    return;
  }
  if (schema instanceof z.ZodNumber) {
    expectNumberParity(schema, jsonSchema, path);
    return;
  }
  if (schema instanceof z.ZodBoolean) {
    expect(jsonPrimitiveType(jsonSchema), path).toBe('boolean');
    return;
  }
  if (schema instanceof z.ZodEnum) {
    if (jsonSchema.const !== undefined) {
      expect(schema.options, `${path} enum drift`).toContain(jsonSchema.const);
    } else {
      expect(jsonSchema.enum, `${path} enum drift`).toEqual(schema.options);
    }
    return;
  }
  if (schema instanceof z.ZodLiteral) {
    const literal = schema.value as unknown;
    const jsonLiteral = jsonSchema.const ?? jsonSchema.enum;
    expect(jsonLiteral, `${path} literal drift`).toEqual(
      jsonSchema.const === undefined ? [literal] : literal
    );
    return;
  }
  if (schema instanceof z.ZodArray) {
    expectArrayParity(schema, jsonSchema, path);
    return;
  }
  if (schema instanceof z.ZodUnion) {
    expectUnionParity(schema, jsonSchema, path);
  }
}

function expectObjectParity(
  schema: z.ZodObject<ZodRawShape>,
  jsonSchema: JsonSchema,
  path: string,
  enforceUnknownFieldPolicy: boolean
): void {
  const shape = schema.shape;
  const zodKeys = sortStrings(Object.keys(shape));
  const jsonKeys = sortStrings(Object.keys(jsonSchema.properties ?? {}));
  const zodRequired = sortStrings(
    Object.entries(shape)
      .filter(([, field]) => !field.isOptional())
      .map(([key]) => key)
  );
  const jsonRequired = sortStrings(jsonSchema.required ?? []);

  expect(jsonSchema.type, path).toBe('object');
  expect(jsonKeys, `${path} property drift`).toEqual(zodKeys);
  expect(jsonRequired, `${path} required-field drift`).toEqual(zodRequired);

  if (enforceUnknownFieldPolicy && jsonSchema.additionalProperties === false) {
    expect(schema._def.unknownKeys, `${path} unknown-field policy drift`).toBe('strict');
  }

  for (const [key, field] of Object.entries(shape)) {
    const jsonField = jsonSchema.properties?.[key];
    if (!jsonField) throw new TypeError(`missing JSON Schema property ${path}.${key}`);
    expectSchemaNodeParity(field, jsonField, `${path}.${key}`);
  }
}

function expectStringParity(schema: z.ZodString, jsonSchema: JsonSchema, path: string): void {
  expect(jsonPrimitiveType(jsonSchema), path).toBe('string');
  const checks = schema._def.checks as Array<{
    kind: string;
    value?: number;
    regex?: RegExp;
  }>;
  let minLength: number | undefined;
  let maxLength: number | undefined;
  let pattern: string | undefined;
  let format: string | undefined;

  for (const check of checks) {
    if (check.kind === 'min') minLength = check.value;
    if (check.kind === 'max') maxLength = check.value;
    if (check.kind === 'length') minLength = maxLength = check.value;
    if (check.kind === 'regex') pattern = check.regex?.source;
    if (check.kind === 'datetime') format = 'date-time';
    if (check.kind === 'uuid') format = 'uuid';
    if (check.kind === 'email') format = 'email';
    if (check.kind === 'url') format = 'uri';
  }

  if (minLength !== undefined) {
    expect(jsonNumber(jsonSchema, 'minLength'), `${path} minLength drift`).toBe(minLength);
  }
  if (maxLength !== undefined) {
    expect(jsonNumber(jsonSchema, 'maxLength'), `${path} maxLength drift`).toBe(maxLength);
  }
  if (pattern !== undefined) {
    expect(jsonString(jsonSchema, 'pattern'), `${path} pattern drift`).toBe(pattern);
  }
  if (format !== undefined) {
    expect(jsonString(jsonSchema, 'format'), `${path} format drift`).toBe(format);
  }
}

function expectNumberParity(schema: z.ZodNumber, jsonSchema: JsonSchema, path: string): void {
  const checks = schema._def.checks as Array<{
    kind: string;
    value?: number;
    inclusive?: boolean;
  }>;
  const integer = checks.some((check) => check.kind === 'int');
  let minimum: number | undefined;
  let maximum: number | undefined;
  let exclusiveMinimum: number | undefined;
  let exclusiveMaximum: number | undefined;

  for (const check of checks) {
    if (check.kind === 'min' && check.inclusive !== false) minimum = check.value;
    if (check.kind === 'max' && check.inclusive !== false) maximum = check.value;
    if (check.kind === 'min' && check.inclusive === false) exclusiveMinimum = check.value;
    if (check.kind === 'max' && check.inclusive === false) exclusiveMaximum = check.value;
  }

  expect(jsonPrimitiveType(jsonSchema), path).toBe(integer ? 'integer' : 'number');
  const constant = typeof jsonSchema.const === 'number' ? jsonSchema.const : undefined;
  if (minimum !== undefined) {
    if (constant !== undefined) {
      expect(constant, `${path} minimum drift`).toBeGreaterThanOrEqual(minimum);
    } else {
      expect(jsonNumber(jsonSchema, 'minimum'), `${path} minimum drift`).toBe(minimum);
    }
  }
  if (maximum !== undefined) {
    if (constant !== undefined) {
      expect(constant, `${path} maximum drift`).toBeLessThanOrEqual(maximum);
    } else {
      expect(jsonNumber(jsonSchema, 'maximum'), `${path} maximum drift`).toBe(maximum);
    }
  }
  if (exclusiveMinimum !== undefined) {
    if (constant !== undefined) {
      expect(constant, `${path} exclusiveMinimum drift`).toBeGreaterThan(exclusiveMinimum);
    } else {
      const jsonExclusiveMinimum = jsonNumber(jsonSchema, 'exclusiveMinimum');
      const equivalentIntegerMinimum = integer ? Math.floor(exclusiveMinimum) + 1 : undefined;
      expect(
        jsonExclusiveMinimum === exclusiveMinimum ||
          jsonNumber(jsonSchema, 'minimum') === equivalentIntegerMinimum,
        `${path} exclusiveMinimum drift`
      ).toBe(true);
    }
  }
  if (exclusiveMaximum !== undefined) {
    if (constant !== undefined) {
      expect(constant, `${path} exclusiveMaximum drift`).toBeLessThan(exclusiveMaximum);
    } else {
      const jsonExclusiveMaximum = jsonNumber(jsonSchema, 'exclusiveMaximum');
      const equivalentIntegerMaximum = integer ? Math.ceil(exclusiveMaximum) - 1 : undefined;
      expect(
        jsonExclusiveMaximum === exclusiveMaximum ||
          jsonNumber(jsonSchema, 'maximum') === equivalentIntegerMaximum,
        `${path} exclusiveMaximum drift`
      ).toBe(true);
    }
  }
}

function expectNullableParity(
  schema: z.ZodNullable<ZodTypeAny>,
  jsonSchema: JsonSchema,
  path: string
): void {
  const variants = jsonSchema.oneOf;
  if (!Array.isArray(variants)) {
    throw new TypeError(`nullable JSON Schema ${path} must declare oneOf`);
  }
  const typedVariants = variants.filter(isJsonSchema);
  expect(typedVariants, `${path} nullable variant drift`).toHaveLength(2);
  expect(
    typedVariants.some((variant) => variant.type === 'null'),
    `${path} null variant drift`
  ).toBe(true);
  const valueVariant = typedVariants.find((variant) => variant.type !== 'null');
  if (!valueVariant)
    throw new TypeError(`nullable JSON Schema ${path} is missing its value variant`);
  expectSchemaNodeParity(schema.unwrap(), valueVariant, path);
}

function expectArrayParity(
  schema: z.ZodArray<ZodTypeAny>,
  jsonSchema: JsonSchema,
  path: string
): void {
  expect(jsonSchema.type, path).toBe('array');
  if (schema._def.minLength) {
    expect(jsonNumber(jsonSchema, 'minItems'), `${path} minItems drift`).toBe(
      schema._def.minLength.value
    );
  }
  if (schema._def.maxLength) {
    expect(jsonNumber(jsonSchema, 'maxItems'), `${path} maxItems drift`).toBe(
      schema._def.maxLength.value
    );
  }
  if (!jsonSchema.items) throw new TypeError(`missing JSON Schema items for ${path}`);
  expectSchemaNodeParity(schema.element, jsonSchema.items, `${path}[]`);
}

function expectUnionParity(
  schema: z.ZodUnion<[ZodTypeAny, ZodTypeAny, ...ZodTypeAny[]]>,
  jsonSchema: JsonSchema,
  path: string
): void {
  const literalValues = schema.options.flatMap((option) => {
    const unwrapped = unwrapSchema(option);
    return unwrapped instanceof z.ZodLiteral ? [unwrapped.value as unknown] : [];
  });
  if (literalValues.length === schema.options.length) {
    expect(jsonSchema.enum, `${path} enum drift`).toEqual(literalValues);
    return;
  }

  const variants = jsonSchema.oneOf;
  if (!Array.isArray(variants)) return;
  expect(variants, `${path} union variant drift`).toHaveLength(schema.options.length);
  schema.options.forEach((option, index) => {
    const variant = variants[index];
    if (!isJsonSchema(variant))
      throw new TypeError(`invalid JSON Schema variant ${path}[${index}]`);
    expectSchemaNodeParity(option, variant, `${path}[${index}]`);
  });
}

function unwrapSchema(schema: ZodTypeAny): ZodTypeAny {
  if (schema instanceof z.ZodEffects) return unwrapSchema(schema.innerType());
  if (schema instanceof z.ZodOptional) {
    return unwrapSchema(schema.unwrap());
  }
  if (schema instanceof z.ZodDefault || schema instanceof z.ZodCatch) {
    return unwrapSchema(schema._def.innerType);
  }
  if (schema instanceof z.ZodBranded || schema instanceof z.ZodReadonly) {
    return unwrapSchema(schema.unwrap());
  }
  return schema;
}

function jsonNumber(schema: JsonSchema, key: string): number | undefined {
  const value = schema[key];
  if (value === undefined) return undefined;
  if (typeof value !== 'number') throw new TypeError(`JSON Schema ${key} must be a number`);
  return value;
}

function jsonString(schema: JsonSchema, key: string): string | undefined {
  const value = schema[key];
  if (value === undefined) return undefined;
  if (typeof value !== 'string') throw new TypeError(`JSON Schema ${key} must be a string`);
  return value;
}

function jsonPrimitiveType(schema: JsonSchema): string | undefined {
  if (schema.type) return schema.type;
  const constant = schema.const;
  if (typeof constant === 'string') return 'string';
  if (typeof constant === 'boolean') return 'boolean';
  if (typeof constant === 'number') return Number.isInteger(constant) ? 'integer' : 'number';
  if (constant === null) return 'null';
  return undefined;
}

function isJsonSchema(value: unknown): value is JsonSchema {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
