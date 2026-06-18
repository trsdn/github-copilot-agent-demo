# One-Hour Demo Script

## Title

GitHub Copilot Agent Mode - Code Smarter, Not Harder

Presented by Torsten Mahr, Microsoft, June 18th, 2026, 9 am to 10 am.

## Positioning

Say this:

> Inline Copilot helps with the next line. Agent Mode helps with the next outcome.

Then connect it to the session promise:

> Today we will look at Agent Mode as an autonomous pair programmer for multi-step tasks: it analyzes context, creates a plan, modifies code, validates, and improves when something fails.

Then show that the repo contains not only code, but also instructions, prompts, skills, and custom agents.

## 1. Baseline: What They Know Already - 4 min

Open `src/readiness.js` and show normal JavaScript. Explain that inline suggestions are useful here, but not enough for a release decision that touches requirements, risks, tests, and handoff.

## 2. The Task - 4 min

Open `requirements/launch-request.md`.

Say:

> This is no longer a line-completion problem. It needs product judgment, code changes, tests, and a release recommendation.

## 3. Plan Mode - 7 min

Prompt:

```text
Read AGENTS.md and requirements/launch-request.md. Use Plan Mode. Create a small implementation plan, identify risks, and name the cheapest validation command. Do not edit files.
```

Show that Copilot reads instructions, finds the controlling code, identifies tests, and proposes a bounded change before touching files.

## 4. Agent Council - 9 min

Prompt:

```text
Run an Agent Council for this change. Use Planner, Release Strategist, QA Analyst, Security Reviewer, and Implementer perspectives. Synthesize one recommendation instead of giving five disconnected reports.
```

Show custom agents, the `agent-council` skill, explicit roles, and one synthesized recommendation.

## 5. Agent Mode Implementation - 12 min

Prompt:

```text
Implement the EU privacy-review hard blocker. Keep the change focused. Update tests. Run validation. Stop and report the result.
```

Show the agent editing code, updating tests, running `npm test`, and repairing failures if needed.

## 6. MCP Moment - 6 min

Use `docs/MCP-MOMENTS.md`.

Prompt:

```text
Use available MCP tools to gather one piece of external evidence or create a follow-up artifact for this release decision. If no MCP tool is available, explain what you would use: GitHub issues, Playwright, Microsoft Learn, Azure, or work items.
```

The message:

> Agent Mode becomes more useful when it can reach the systems where engineering work actually lives.

## 7. Handoff - 8 min

Prompt:

```text
Produce a reviewer-ready handoff: what changed, why, tests run, residual risks, and what the audience should notice about Agent Mode.
```

## 8. Q&A - 10 min

Expected questions:

- When should I use Agent Mode instead of inline suggestions?
- How do I prevent it from changing too much?
- What are skills versus prompts versus agents?
- How does MCP change the workflow?
- How do I make this safe for enterprise repos?
