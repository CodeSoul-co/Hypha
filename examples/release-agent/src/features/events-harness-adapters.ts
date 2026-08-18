import { createLocalStorageProfiles } from '@codesoul-co/hypha-adapters-local';
import { createFrameworkEvent } from '@codesoul-co/hypha-core';
import { InMemoryTraceRecorder, SessionProjector } from '@codesoul-co/hypha-harness';

/** Record an Event, rebuild a Session projection and inspect local adapters. */
export async function runEventsHarnessAdaptersExample() {
  const event = createFrameworkEvent({
    id: 'event-tour-1',
    type: 'run.created',
    userId: 'owner',
    sessionId: 'session-tour',
    runId: 'run-tour',
    payload: { agentSystemId: 'system.tour' },
  });
  const traces = new InMemoryTraceRecorder();
  await traces.record(event);
  const sessions = new SessionProjector().project(await traces.list());

  const profiles = createLocalStorageProfiles({
    eventDbFilename: './var/events.sqlite',
    structuredDbFilename: './var/structured.sqlite',
    vectorFilename: './var/vectors.json',
    artifactRootPath: './var/artifacts',
  });

  return {
    eventId: event.id,
    sessionIds: sessions.map((session) => session.id),
    localAdapterEngines: profiles.map((profile) => profile.engine),
  };
}
