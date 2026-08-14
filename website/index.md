---
layout: home

hero:
  name: 'HYPHA 1.0'
  text: 'Build governed agent systems from composable modules.'
  tagline: Event-first ReAct + FSM execution, production harnesses, Domain Packs, replay, policy and provider-neutral memory—available as 15 focused npm packages.
  image:
    src: /hypha-logo.png
    alt: Hypha
  actions:
    - theme: brand
      text: Start building
      link: /guide/getting-started
    - theme: alt
      text: Explore packages
      link: /packages/
    - theme: alt
      text: View v1.0.1
      link: https://github.com/CodeSoul-co/Hypha/releases/tag/v1.0.1

features:
  - icon: '01'
    title: Specs before providers
    details: Versioned TypeScript contracts and runtime validation keep application code independent of infrastructure.
    link: /packages/contracts
  - icon: '02'
    title: ReAct + FSM execution
    details: Keep the protected Harness lifecycle separate from the application workflow topology you own.
    link: /guide/fsm-control
  - icon: '03'
    title: Every effect is governed
    details: Tools, MCP, memory and external writes pass through policy, trace and Harness boundaries.
    link: /packages/capabilities
  - icon: '04'
    title: Events remain authoritative
    details: Session is a projected product view. Replay and evaluation derive state from the Event stream.
    link: /guide/architecture
  - icon: '05'
    title: Local-first composition
    details: Start with SQLite, files and deterministic adapters, then replace providers without moving product contracts.
    link: /packages/product-runtime
  - icon: '06'
    title: One complete example
    details: Tour all 15 packages, compile a Domain Pack, run a custom FSM and submit durable commands.
    link: /guide/examples
---

<div class="version-strip">
  <span>RELEASE v1.0.1</span>
  <span>15 PUBLIC PACKAGES</span>
  <span>NODE ≥ 22</span>
  <span>TYPESCRIPT</span>
</div>

## A framework boundary, not an application template

Hypha supplies contracts and execution boundaries. Your application supplies the Domain Pack, prompts, workflows, capability selections, policies and deployment overlay. Start with the [architecture map](/guide/architecture), then choose only the [packages](/packages/) needed by your composition.
