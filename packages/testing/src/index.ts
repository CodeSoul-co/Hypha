export interface GoldenTraceFixture {
  id: string;
  version: string;
  events: unknown[];
}

export function assertEventTypes(fixture: GoldenTraceFixture, expectedTypes: string[]): boolean {
  const actual = fixture.events.map((event: any) => event.type);
  return expectedTypes.every((type) => actual.includes(type));
}
