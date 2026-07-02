---
id: context-enrichment
name: Context Enrichment
description: Adds derived signals (message length, history depth, language hint) to the skill context variables
version: 1.0.0
priority: 10
enabled: true
triggers:
  - type: always
---

# Context Enrichment

Runs on every turn. Sets three variables on the chat context that
downstream skills / agents can read:

- `messageLength` — number of characters in the current user message
- `historyTurns` — how many prior messages are in this session
- `language` — `zh` if the message contains any CJK character, else `en`

These are cheap to compute and help later steps (e.g. choosing a model
or deciding whether to summarise) without an extra LLM call.
