import type { FrameworkEvent, FrameworkEventType } from '@hypha/core';

export * from './evaluation';
export * from './replay';
export * from './regression';

export interface GoldenTraceFixture {
  id: string;
  version: string;
  events: FrameworkEvent[];
  statePath?: string[];
}

export function assertEventTypes(
  fixture: GoldenTraceFixture,
  expectedTypes: FrameworkEventType[]
): boolean {
  const actual = fixture.events.map((event) => event.type);
  return expectedTypes.every((type) => actual.includes(type));
}

export function assertStatePath(fixture: GoldenTraceFixture, expectedPath: string[]): boolean {
  if (!fixture.statePath) return false;
  return expectedPath.every((state, index) => fixture.statePath?.[index] === state);
}

export function collectEventTypes(events: FrameworkEvent[]): FrameworkEventType[] {
  return events.map((event) => event.type);
}
