---
id: skill.release-research
name: Release Research
description: Collects bounded public evidence and preserves source provenance.
version: 1.0.0
priority: 20
enabled: true
triggers:
  - type: always
---

# Release Research

- Use `search` only when the supplied context does not already answer the question.
- Keep every factual statement tied to a returned source.
- If evidence is insufficient, say so instead of guessing.
- Produce `{ "answer": string, "sources": string[] }`.
