---
name: release-readiness
description: Decide whether a software release should ship, hold, or use limited rollout based on readiness signals, blockers, warnings, and validation evidence.
---

# Release Readiness Skill

Use this skill when deciding whether a release can ship.

## Decision Rules

- Failed production incident watch usually means hold.
- Multiple warnings usually mean limited rollout unless mitigated.
- EU privacy review concerns must be explicit in the recommendation.
- A release recommendation must include validation evidence.
- If evidence is missing, say what would change the decision.

## Output

- Recommendation
- Evidence
- Blockers
- Warnings
- Required validation
- Handoff language
