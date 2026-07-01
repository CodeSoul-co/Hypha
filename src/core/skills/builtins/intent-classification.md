---
id: intent-classification
name: Intent Classification
description: Classifies the user's intent via keyword/regex heuristics and writes it to context.variables.intent
version: 1.0.0
priority: 5
enabled: true
triggers:
  - type: always
---

# Intent Classification

Inspects the current message and writes one of four intent labels to
`context.variables.intent` for downstream consumption:

- `help` — message contains `help`, `usage`, `how to`, `怎么`, `如何`, `帮助`
- `question` — message contains `?` / `？` or an English wh-word
- `command` — message starts with `/` or `!`
- `chat` — anything else

This is intentionally heuristic. For higher-fidelity intent detection,
swap this skill for one that calls a small classification model.
