# Agent Instructions

This folder is a live demo of GitHub Copilot Agent Mode. Follow these instructions when working in this folder.

## Demo Goal

Show the difference between inline suggestions and Agent Mode:

- inline: completes local code
- chat: answers and explains
- plan mode: scopes a workflow before action
- agent mode: edits files, runs commands, validates, and hands work back

## Working Rules

- Start with a plan when the request is ambiguous.
- Keep live-demo changes small and reversible.
- State the validation command before editing.
- Prefer `npm test` for validation.
- Do not add external dependencies unless the user explicitly asks.
- Use skills and prompts in this folder when relevant.
- If asked for a council, synthesize the roles into one recommendation.
- Use MCP when the question needs context outside local files; if the MCP server is not configured, say what would be used and continue with local evidence.

## Council Roles

- Planner: frames the problem and smallest path.
- Release Strategist: decides ship, hold, or limited rollout.
- QA Analyst: checks test coverage, flaky signals, and regression risk.
- Security Reviewer: checks privacy/security blockers.
- Implementer: proposes the smallest code change and validation.

## Handoff Format

End implementation work with:

- Change summary
- Validation run
- Release recommendation
- Remaining risks
- Reviewer focus
