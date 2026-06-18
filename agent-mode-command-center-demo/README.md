# Agent Mode Command Center Demo

This demo is for an audience that mostly knows inline suggestions and basic chat. It shows the jump from "Copilot suggests code" to "Copilot runs an engineering workflow".

It supports the session **GitHub Copilot Agent Mode - Code smarter, not harder**, presented by Torsten Mahr from Microsoft on June 18th, 2026, from 9 am to 10 am. The session focuses on Agent Mode as an autonomous pair programmer for multi-step tasks: analyzing context, generating plans, modifying code, and iteratively improving upon errors.

The scenario is a Launch Readiness Command Center for a fictional checkout platform. Copilot must inspect requirements, reason over code and data, coordinate an Agent Council, make a small code change, run tests, use skills/prompts, optionally call MCP tools, and hand back a release recommendation.

## What You Demo

- Plan Mode: turn a messy release question into a scoped plan
- Agent Mode: edit code, run tests, and iterate
- `AGENTS.md`: repo-local operating instructions
- Skills: reusable domain expertise under `.github/skills/`
- Prompts: repeatable demo workflows under `.github/prompts/`
- Sub-agents / Council: specialized roles under `.github/agents/`
- MCP: optional tool moment for GitHub issues, docs lookup, Playwright, Azure, or work items
- Validation: terminal tests with `node --test`

## Story

The fictional product team wants to launch a checkout release. Signals are mixed: core checks are mostly green, but there is one production incident, one flaky test, and one privacy review item. The agent has to decide whether to ship, hold, or use a limited rollout.

This is more interesting than a calculator because it looks like real engineering work: ambiguous ask, domain rules, risk tradeoffs, code, tests, and an accountable handoff.

## Quick Start

```powershell
cd agent-mode-command-center-demo
npm test
npm start
```

Open `slides.html` in a browser to present the explanation deck.

Open `SPEAKER-SCRIPT.md` on a second screen or tablet for the presenter script.

## Best First Live Prompt

```text
Use this folder as the demo workspace. First use Plan Mode: inspect AGENTS.md, README.md, src, tests, prompts, and skills. Explain how you would demo Agent Mode to an audience that mostly knows inline suggestions. Do not edit files yet.
```

## Best Council Prompt

```text
Use the Agent Council pattern. Coordinate Planner, Release Strategist, QA Analyst, Security Reviewer, and Implementer. Decide whether the checkout release should ship, hold, or use limited rollout. Do not edit yet; show the council result in chat.
```

## Best Implementation Prompt

```text
Implement one small improvement from the council recommendation. Keep the change narrow, update or add tests, run validation, and give me a PR-style handoff.
```

## Demo Files To Open On Stage

- `AGENTS.md`
- `.github/agents/council-orchestrator.agent.md`
- `.github/prompts/run-release-council.prompt.md`
- `.github/skills/release-readiness/SKILL.md`
- `src/readiness.js`
- `tests/readiness.test.js`
