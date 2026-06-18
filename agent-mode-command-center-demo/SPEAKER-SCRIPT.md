# Speaker Script

Session: GitHub Copilot Agent Mode - Code smarter, not harder  
Speaker: Torsten Mahr, Microsoft  
Date: June 18th, 2026, 9 am to 10 am  
Format: 50 minutes demo + 10 minutes Q&A

## Core Message

Inline Copilot helps with the next line. Agent Mode helps with the next outcome.

Today I want to show the shift from code completion to an engineering workflow: context, plan, code change, validation, recovery, and handoff.

## 0:00-0:04 - Opening

Say:

Welcome everyone. Most developers already know Copilot as inline suggestions or as a chat assistant. That is useful, but it is only part of the story.

Today we will look at Agent Mode as an autonomous pair programmer for multi-step tasks. The key difference is that the agent can understand context, create a plan, modify files, run commands, look at errors, and improve the result.

Show:

- `slides.html`, title slide
- `src/readiness.js`

Transition:

Instead of another calculator or toy app, I want to use a small release-readiness scenario. It is still simple enough for a live demo, but it looks more like real engineering work.

## 0:04-0:08 - Scenario

Say:

The scenario is a Launch Readiness Command Center for a checkout platform. Product wants to ship a release, but the signals are mixed: there is a production incident, a flaky E2E signal, and an unresolved EU privacy review.

The question is not just "can Copilot write code?" The question is: can Copilot help us reason through a release decision, change the code safely, validate it, and hand it back like a teammate?

Show:

- `requirements/launch-request.md`
- `src/signals.js`
- `tests/readiness.test.js`

Transition:

This is where inline suggestions stop being enough. We need planning first.

## 0:08-0:15 - Plan Mode

Live prompt:

> Read AGENTS.md and requirements/launch-request.md. Use Plan Mode. Create a small implementation plan, identify risks, and name the cheapest validation command. Do not edit files.

Say while it works:

Notice the constraint: do not edit files yet. Plan Mode is useful when I want the agent to understand the repo, find the controlling code path, and tell me how it would proceed before it changes anything.

What to call out:

- It reads `AGENTS.md`.
- It identifies `src/readiness.js` as the core logic.
- It identifies `tests/readiness.test.js` as validation.
- It should name `npm test` as the cheap validation command.

If Copilot is verbose:

Say:

This is a good moment to steer the agent. I can ask for a shorter plan or tell it to keep the implementation smaller.

Backup prompt:

> Shorten this to a 5-step plan and name only the files you expect to touch.

Transition:

Now that we have a plan, I want to show a pattern that is becoming more important: specialized perspectives instead of one giant generic prompt.

## 0:15-0:24 - Agent Council

Live prompt:

> Run an Agent Council for this change. Use Planner, Release Strategist, QA Analyst, Security Reviewer, and Implementer perspectives. Synthesize one recommendation instead of giving five disconnected reports.

Say:

The council is not magic. It is a structured way to ask Copilot to reason from multiple engineering perspectives. The important part is the synthesis: I do not want five separate essays. I want one recommendation.

Show:

- `.github/agents/council-orchestrator.agent.md`
- `.github/agents/qa-analyst.agent.md`
- `.github/agents/security-reviewer.agent.md`
- `.github/skills/agent-council/SKILL.md`

What to call out:

- Planner scopes.
- QA thinks about tests and regression.
- Security thinks about privacy and blockers.
- Implementer keeps the change small.
- The orchestrator should synthesize.

If the council is messy:

Backup prompt:

> Turn that into one decision table with Recommendation, Evidence, Risks, Smallest Change, and Validation.

Transition:

Now we move from reasoning to action. This is the part that is different from normal chat.

## 0:24-0:36 - Agent Mode Implementation

Live prompt:

> Implement the EU privacy-review hard blocker. Keep the change focused. Update tests. Run validation. Stop and report the result.

Say while it works:

Agent Mode can now edit files, run commands, inspect errors, and iterate. This is where I expect it to touch the readiness logic and the tests, not the whole project.

What should happen:

- `src/readiness.js` changes.
- `tests/readiness.test.js` gets EU and non-EU coverage.
- `npm test` runs.

If tests fail:

Say:

This is actually a useful part of the demo. The promise is not that the first attempt is always perfect. The promise is that the agent can inspect the failure, adjust the implementation, and validate again.

Backup prompt:

> The test failed. Read the failure, explain the root cause in one sentence, make the smallest fix, and rerun npm test.

If the agent changes too much:

Backup prompt:

> Reduce the diff. Only change readiness.js and readiness.test.js. Preserve the existing scoring model.

Transition:

So far everything was local to the repo. The next question is: what happens when the agent needs information from outside the repo?

## 0:36-0:42 - MCP Moment

Say:

MCP matters because real engineering work does not live only in source files. It lives in GitHub issues, docs, work items, deployment systems, browser tests, and internal tools.

Preferred prompt:

> Use available MCP tools to gather one piece of external evidence or create a follow-up artifact for this release decision. If no MCP tool is available, explain what you would use: GitHub issues, Playwright, Microsoft Learn, Azure, or work items.

If Microsoft Docs MCP is available:

> Use Microsoft Docs MCP to find official documentation for GitHub Copilot custom instructions, prompt files, custom agents, skills, and MCP. Summarize the links I should show in Q&A.

If no MCP works:

Say:

For today, the important point is the boundary. Agent Mode is the workflow; MCP is how the workflow reaches external systems. In a real team, I would connect GitHub issues, Microsoft Learn, Azure, Playwright, or work items depending on the scenario.

Transition:

The last step is handoff. This is important because teams do not need impressive chat transcripts. They need reviewable work.

## 0:42-0:50 - Handoff

Live prompt:

> Produce a reviewer-ready handoff: what changed, why, tests run, residual risks, and what the audience should notice about Agent Mode.

Say:

This is the key difference from a coding trick. The output should be reviewable: what changed, what was validated, what risk remains, and what a human should inspect.

Call out:

- planning before editing
- role-based reasoning
- skills and prompts as reusable team assets
- tests as guardrails
- handoff as the final product

Closing line:

Agent Mode is not a bigger autocomplete. It is a way to give Copilot context, constraints, tools, roles, validation, and a handoff discipline.

## 0:50-1:00 - Q&A

Seed questions if the room is quiet:

1. When should I use Agent Mode instead of inline suggestions?
2. How do I stop it from changing too much?
3. What is the difference between prompts, skills, and agents?
4. What does MCP add?
5. How do I make this safe in an enterprise repo?

Short answers:

- Use inline suggestions for local code. Use Agent Mode for multi-step outcomes.
- Use Plan Mode, narrow acceptance criteria, small diffs, and validation commands.
- Prompts are reusable workflows. Skills are reusable expertise. Agents are specialized roles with instructions and tool boundaries.
- MCP connects the agent to systems outside the repo.
- Safety comes from scoped instructions, human approval, tests, code review, and least-privilege tools.

## Emergency Compression

If running late:

- Skip the MCP live moment.
- Show `docs/MCP-MOMENTS.md` verbally.
- Move directly from tests to handoff.

If Copilot is slow:

- Use the prompts from `.github/prompts/` directly.
- Ask for a shorter response.
- Narrate the intended behavior and show the prepared files.

If implementation breaks badly:

- Stop live editing.
- Use the failure as the recovery story.
- Ask Copilot for root cause and next fix.
- Move to Q&A with the lesson: agentic work still needs validation.
