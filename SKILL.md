---
name: cognitive-guardrails
description: "Compatibility entry for the Cognitive Guardrails skill group; install the four focused skills under skills/ for new setups."
homepage: "https://github.com/vaynebobby-crypto/cognitive-guardrails"
license: "MIT"
metadata:
  openclaw:
    category: reasoning
  security:
    network_required: false
    credentials_required: false
---

# Cognitive Guardrails Compatibility Entry

This repository used to publish one combined `cognitive-guardrails` skill and later two phase-based skills. It now ships a focused cognitive guardrails skill group:

- `first-principles-prompt`: pre-execution first-principles prompt discipline.
- `adversarial-prompt-review`: pre-execution or in-flight adversarial review.
- `uncertainty-check`: pre-delivery uncertainty disclosure check.
- `omission-check`: pre-delivery omission and blind-spot check.

`instruction-intake-guardrails` and `final-response-guardrails` remain as compatibility aggregates. Install the skill directories under `skills/` rather than treating this root file as the primary skill.

## Migration

If your client already references `cognitive-guardrails`, keep this file as a compatibility pointer and update the client configuration to load:

- [skills/first-principles-prompt/SKILL.md](skills/first-principles-prompt/SKILL.md)
- [skills/adversarial-prompt-review/SKILL.md](skills/adversarial-prompt-review/SKILL.md)
- [skills/uncertainty-check/SKILL.md](skills/uncertainty-check/SKILL.md)
- [skills/omission-check/SKILL.md](skills/omission-check/SKILL.md)

Shared prompt examples remain in [references/prompt-templates.md](references/prompt-templates.md).
